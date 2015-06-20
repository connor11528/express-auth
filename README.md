Authentication with node.js
===========

Login with email/password, facebook and spotify. Link and unlink accounts. Login with multiple providers to the same account.

Technologies used: mongodb, mongoose, express, ejs, passportjs

# Getting started

**config/auth.js** should look something like this:

```
module.exports ={
	"facebookAuth": {
		"clientID": client_id
		"clientSecret": secret_id
		"callbackURL": "http://localhost:3000/auth/facebook/callback"
	},
	"spotifyAuth": {
		"clientID": client_id,
		"clientSecret": secret_id,
		"callbackURL": "http://localhost:3000/auth/spotify/callback"
	}
};
```

Install dependencies and run server:

```
$ npm install
$ node server
```
