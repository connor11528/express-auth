// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express'),
	app = express(),
	mongoose = require('mongoose'),
	path = require('path'),
	passport = require('passport'),
	env = process.env.NODE_ENV || 'development',
	envConfig = require('./server/config/env')[env];

// configuration ===============================================================
// database config
mongoose.connect(envConfig.db);

// passport config
require('./server/config/passport')(passport);

// express config
app.configure(function() {
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser()); // read cookies (needed for auth)
	app.use(express.bodyParser()); // get information from html forms

	// required for passport
	app.use(express.session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
});

// ROUTES ======================================================================
// require('./config/api_routes')(app); // routes for a REST API that doesn't exist yet..
require('./server/config/routes')(app, passport); // load our routes and pass in our app and fully configured passport

// Everything else handled by Angular
app.get('/*', function(req, res) {
	res.sendfile('./public/index.html');
});

// launch ======================================================================
app.listen(envConfig.port, function(){
	console.log('Server started on port ' + envConfig.port);
})