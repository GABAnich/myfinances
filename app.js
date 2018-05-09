"use strict";

const mongoConnectionManager = require("./server/common/baseMongo/MongoConnectionManager");
require("./server/common/addControllersDirsToSwagger");

mongoConnectionManager.connect()
	.then(() => {
		console.log("Connected");
	})
	.then(() => {
		mongoConnectionManager.setCollections();
	})
	.then(() => {
		console.log("Collections inizialized");
	})
	.catch((err) => {
		if (err) throw err;
	});

var SwaggerExpress = require("swagger-express-mw");
var app = require("express")();
app.use( (req, res, next) => {
	res.header("Content-Type", "application/json");
	next();
});

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
});
