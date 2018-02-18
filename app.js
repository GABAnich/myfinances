'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
module.exports = app; // for testing

var config = {
	appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
	if (err) { throw err; }

	// install middleware
	swaggerExpress.register(app);

	var port = process.env.PORT || 3000;
	app.listen(port, function(err) {
		if (err) throw err;

		console.log("Server is running on http://localhost:3000");
	});

	if (swaggerExpress.runner.swagger.paths['/hello']) {
		// console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
	}
});

// let UserDal = require("./server/users/UserDal");

// const mongoConnectionManager = require("./server/baseMongo/MongoConnectionManager");
// mongoConnectionManager.connect()
// 	.then(() => {
// 		return new UserDal(mongoConnectionManager.connection, "collection");
// 	})
// 	.then((userDal) => {
// 		return userDal.findById("5a85dfb99ec98dddd5aeff8f");
// 	})
// 	.then((doc) => {
// 		console.log(doc);
// 	});
