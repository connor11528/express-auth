module.exports = function(app, passport){
	// home page
	app.get('/', function(req, res){
		res.render('../app/views/index.ejs');
	});
	
	// login page
	app.get('/login', function(req, res){
		res.render('../app/views/login.ejs', { message: req.flash('loginMessage') });
	});
	
	// process login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));
	
	// sign up page
	app.get('/signup', function(req, res){
		res.render('../app/views/signup.ejs', { message: req.flash('signupMessage') });
	});
	
	// process signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash: true
		
	}));
	
	// profile page
	app.get('/profile', isLoggedIn, function(req, res){
		res.render('../app/views/profile.ejs', {
			user: req.user
		});
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
