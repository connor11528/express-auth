var env = process.env.NODE_ENV || 'development',
	envConfig = require('./env')[env];

module.exports ={
	"facebookAuth": {
		"clientID": "1410203245974944",
		"clientSecret": "8b16bad23626ded12e58b8c0aef4f2f6",
		"callbackURL": envConfig.callbackURL + "/auth/facebook/callback"
	},
	"spotifyAuth": {
		"clientID": "8bf6626d6a0d46d5b825d1904a9944c9",
		"clientSecret": "171820e9114e4c4989ee59735370866b",
		"callbackURL": envConfig.callbackURL + "/auth/spotify/callback"
	}
};