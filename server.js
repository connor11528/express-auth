var express = require('express');
var app = express();

var jade = require('jade');
var http = require('http');
var server = http.createServer(app);

// chain on express server to listen for connections from same address and port
var io = require('socket.io').listen(server);


app.set('views', __dirname + '/views'); // serve templates from '/views'
app.set('view engine', 'jade');
app.set("view options", { layout: false });  // disable express layouts

// serve public folder to the client
app.configure(function() {
	app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res){
  res.render('home.jade'); // serve home.jade file
});

// fired when client tries to connect to the server
// socket.io creates a new socket for them
io.sockets.on('connection', function(socket){
	
	socket.on('setPseudo', function(data){  // takes the data from client
		// assign a variable to the socket
		socket.set('pseudo', data);
	});
	
	// message event
	socket.on('message', function(message){
		socket.get('pseudo', function(error, name){
			var data = { 'message' : message, pseudo: name };
			socket.broadcast.emit('message', data);
			console.log("user " + name + " sent: " + message);
		})
	});
	
});

server.listen(3000);
