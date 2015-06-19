module.exports = function(app, passport){
	
	app.get('/', function(req, res){
		res.render('index.ejs');
	});

	app.get('/login', function(req, res){
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	app.get('/signup', function(req, res){
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

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
	
	app.get('/profile', isLoggedIn, function(req, res){
		res.render('profile.ejs', {
			user: req.user	// get user from session, pass to template
		})
	});

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

};

function isLoggedIn(req, res, next){
	if (req.isAuthenticated())
		return next();
	
	res.redirect('/');
}
