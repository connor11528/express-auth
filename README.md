Authentication with node.js
===========

Authentication implementation using express 3, passport, mongoose and angular.js

# Client side

`AuthCtrl` handles login and signup user interactions. HTTP calls come from the `Auth` service.


# Getting started

```
$ npm install
$ bower install
$ grunt 	# This will inject script and link tags into index.html
$ npm start 	# Runs server on port 3000
```

# express 4

ft. http://stackoverflow.com/questions/25590001/does-everyauth-or-passport-works-in-expressjs-4

scotch.io updates: https://scotch.io/tutorials/upgrading-our-easy-node-authentication-series-to-expressjs-4-0

```
var bodyParser   = require('body-parser'),
    cookieParser = require('cookie-parser'),
    express      = require('express'),
    session      = require('express-session'),
    passport     = require('passport');

var app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  secret: 'secrit cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
```