
var express  = require('express'),
	app = express(),
	engine = require('ejs-mate'),
	mongoose = require('mongoose'),
	path = require('path'),
	passport = require('passport'),
	env = process.env.NODE_ENV || 'development',
	envConfig = require('./config/env')[env],
	flash = require('connect-flash'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	cookieParser = require('cookie-parser');

// database config
mongoose.connect(envConfig.db);

// passport config
require('./config/passport')(passport);

// express config
app.use(cookieParser());
app.use(bodyParser());

app.engine('ejs', engine);
app.set('view engine', 'ejs');

// required for passport
app.use(session({ secret: 'thisisverys3crett', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./server/routes')(app, passport);

app.listen(envConfig.port, function(){
	console.log('Server started on port ' + envConfig.port);
})