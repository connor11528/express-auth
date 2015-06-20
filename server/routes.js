var User = require('./models/user');

module.exports = function(app, passport){
	
	// local gets
	app.get('/', function(req, res){
		res.render('index.ejs');
	});

	app.get('/login', function(req, res){
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	app.get('/signup', function(req, res){
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	app.get('/profile', isLoggedIn, function(req, res){
		res.render('profile.ejs', {
			user: req.user	// get user from session, pass to template
		})
	});

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

	app.get('/deleteAccount', function(req, res){

		User.findOneAndRemove(req.user._id, function(err) {
  			if (err) throw err;
			res.redirect('/');
		});

	});

	// local posts
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));


	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile',  // could use a callback here (http://stackoverflow.com/questions/15711127/express-passport-node-js-error-handling)
		failureRedirect: '/signup',
		failureFlash: true
	}));

	// Log in with Facebook
	app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect: '/profile',
			failureRedirect: '/'
		}));

	// Connect facebook account (already logged in)
	app.get('/connect/facebook', passport.authorize('facebook', { scope: 'email' }));

	app.get('/connect/facebook/callback', passport.authorize('facebook', {
		successRedirect: '/profile',
		failureRedirect: '/'
	}));

	// unlink facebook
	app.get('/unlink/facebook', function(req, res) {
        var user = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });


    // Log in with Spotify
    app.get('/auth/spotify', passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private'] }));

    app.get('/auth/spotify/callback',
		passport.authenticate('spotify', {
			successRedirect: '/profile',
			failureRedirect: '/'
		}));

    app.get('/connect/spotify', passport.authorize('spotify', {scope: ['user-read-email', 'user-read-private'] }));

	app.get('/connect/spotify/callback', passport.authorize('spotify', {
		successRedirect: '/profile',
		failureRedirect: '/'
	}));

	app.get('/unlink/spotify', function(req, res) {
        var user = req.user;
        user.spotify.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });


};

function isLoggedIn(req, res, next){
	if (req.isAuthenticated())
		return next();
	
	res.redirect('/');
}
