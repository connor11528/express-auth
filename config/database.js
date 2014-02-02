var path = require('path'),
	rootPath = path.normalize(__dirname + '/..');

module.exports = {
	development: {
		db: 'mongodb://localhost/express-auth', // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
		root: rootPath
	},
	test: {},
	production: {}
};
