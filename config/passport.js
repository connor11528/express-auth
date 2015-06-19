
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var SpotifyStrategy = require('passport-spotify').Strategy;
var User = require('../server/models/user');

var configAuth = require('./auth');

module.exports = function(passport) {

    // passport needs ability to serialize and unserialize users out of session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        // mongoose method: http://mongoosejs.com/docs/api.html#model_Model.findById
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // provided a strategy to passport called local-signup
    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    }, function(req, email, password, done) { // callback with email and password from our form

        // Calling done will make the flow jump back into passport.authenticate
        // If the user was passed, the middleware will call req.login 
        // (a passport function attached to the request).
        // req.login will call our passport.serializeUser method we've defined earlier.
        // It's its job to determine what data from the user object should be stored in the session
        // The result is attached to the request as req.user.
        // Once done, our requestHandler is invoked
        //=======
        // http://toon.io/understanding-passportjs-authentication-flow/
        

        User.findOne({ 'local.email':  email }, function(err, user) {

            if (err) { return done(err); }

            // check if there's already a user with provided email
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.')); // req.flash comes from connect-flash
            } else {

				// if there is no user with that email create the user
                var newUser = new User();

                newUser.local.email = email;
                newUser.local.password = newUser.generateHash(password);

				// save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });    

    }));
    
    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    }, function(req, email, password, done) {

        // Calling done will make the flow jump back into passport.authenticate

        User.findOne({ 'local.email': email }, function(err, user) {
            if (err){ return done(err); }

            // no user is found
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.'));

			// password is wrong (method from User model)
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

            // all good
            return done(null, user);
        });

    }));


    // Facebook
    passport.use(new FacebookStrategy({
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        passReqToCallback: true
    }, function(req, token, refreshToken, profile, done){

        // user is not logged in
        if(!req.user){
            User.findOne({ 'facebook.id': profile.id }, function(err, user){
                if(err) return done(err);

                // if user found, log them in
                if(user){
                    // previously unlinked their facebook,
                    // now they want to log in with facebook again
                    // readd their credentials

                    if (!user.facebook.token) {
                        user.facebook.token = token;
                        user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                        user.facebook.email = profile.emails[0].value;

                        user.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, user);
                        });
                    } else {
                        return done(null, user); // user found, return that user
                    }
                    
                } else {
                    // if no user found create them
                    var newUser = new User();

                    newUser.facebook.id = profile.id;
                    newUser.facebook.token = token;
                    newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                    newUser.facebook.email = profile.emails[0].value;

                    newUser.save(function(err){
                        if(err) throw err;

                        // success, return the newUser
                        return done(null, newUser);
                    });
                }
            });
        } else {
            // user already exists and is logged in (link accounts)
            var user = req.user;

            user.facebook.id = profile.id;
            user.facebook.token = token;
            user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
            user.facebook.email = profile.emails[0].value;

            user.save(function(err){
                if(err) throw err;

                return done(null, user);
            });
        }
    }));

    
    // Spotify
    passport.use(new SpotifyStrategy({
        clientID: configAuth.spotifyAuth.clientID,
        clientSecret: configAuth.spotifyAuth.clientSecret,
        callbackURL: configAuth.spotifyAuth.callbackURL,
        passReqToCallback: true
    }, function(req, token, refreshToken, profile, done) {

        // user is not logged in
        if(!req.user){
            User.findOne({ 'spotify.id': profile.id }, function(err, user){
                if(err) return done(err);

                
                if(user){
                    // previously unlinked their spotify,
                    // now they want to log in with spotify again
                    // readd their credentials
                    if (!user.spotify.token) {

                        user.spotify.id = profile.id;
                        user.spotify.token = token;
                        user.spotify.name  = profile.displayName;
                        user.spotify.username = profile.username;
                        user.spotify.email = profile.emails[0].value;

                        user.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, user);
                        });
                    } else {

                        // user found, return that user
                        return done(null, user);
                    }

                } else {
                    // first time logging in, create new User
                    var newUser = new User();

                    newUser.spotify.id = profile.id;
                    newUser.spotify.token = token;
                    newUser.spotify.name  = profile.displayName;
                    newUser.spotify.username = profile.username;
                    newUser.spotify.email = profile.emails[0].value;

                    newUser.save(function(err){
                        if(err) throw err;

                        return done(null, newUser);
                    });

                }

            });

        } else {
            // user already exists and is logged in (link accounts)
            var user = req.user;

            user.spotify.id = profile.id;
            user.spotify.token = token;
            user.spotify.name  = profile.displayName;
            user.spotify.username = profile.username;
            user.spotify.email = profile.emails[0].value;


            user.save(function(err){
                if(err) throw err;

                return done(null, user);
            });

        }

    }));







};
