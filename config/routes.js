module.exports = function(app, passport){
	app.get('/', function(req, res){
		res.render('../app/views/index.ejs');
	});
	
	app.get('/login', function(req, res){
		res.render('../app/views/login.ejs', { message: req.flash('loginMessage') });
	});
	
	// process login form
	app.post('/login', function(req, res){
		// passport stuff
	});
	
	app.get('/signup', function(req, res){
		res.render('../app/views/signup.ejs', { message: req.flash('signupMessage') });
	});
	
	// process signup form
	app.post('/signup', function(req, res){
		
	});
	
	app.get('/profile', isLoggedIn, function(req, res){
		res.render('../app/views/profile.ejs', {
			user: req.user
		});
	});
};

function isLoggedIn(req, res, next){
	if (req.isAuthenticated())
		return next();
	
	res.redirect('/');
}
