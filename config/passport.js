
var LocalStrategy = require('passport-local').Strategy;
var User = require('../server/models/user');

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

};
