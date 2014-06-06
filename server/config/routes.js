module.exports = function(app, passport){
	
	// process login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));

	
	// process signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash: true
		
	}));
	
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
