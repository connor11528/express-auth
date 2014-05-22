// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express'),
	path = require('path'),
	app = express(),
	port = process.env.PORT || 3000,
	mongoose = require('mongoose'),
	passport = require('passport'),
	flash = require('connect-flash'),
	env = process.env.NODE_ENV || 'development',
	configDB = require('./config/database')[env];

// configuration ===============================================================
// database config
mongoose.connect(configDB.db);

// passport config
require('./config/passport')(passport);

// express config
app.configure(function() {
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser()); // read cookies (needed for auth)
	app.use(express.bodyParser()); // get information from html forms

	app.use(express.favicon(path.join(__dirname, "/public/favicon.ico"))); // not working :(
	app.set('view engine', 'ejs');


	// required for passport
	app.use(express.session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session
});

// ROUTES ======================================================================
// require('./config/api_routes')(app); // routes for a REST API that doesn't exist yet..
require('./config/routes')(app, passport); // load our routes and pass in our app and fully configured passport

// Everything else handled by Angular
app.get('/*', function(req, res) {
	res.sendfile('./public/index.html');
});

// launch ======================================================================
app.listen(port);
console.log('Server started on port ' + port);
