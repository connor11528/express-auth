// configure environments
//========================
var path = require('path'),
	rootPath = path.normalize(__dirname + '/../../');

module.exports = {
	development: {
		db: 'mongodb://localhost/express-auth', // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
		rootPath: rootPath,
		port: process.env.PORT || 3000
	},
	test: {},
	production: {}
};