"use strict";

const mongoConnectionManager = require("./server/common/baseMongo/MongoConnectionManager");
const addControllersDirsToSwagger = require("./server/common/addControllersDirsToSwagger");

addControllersDirsToSwagger.init();

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

let SwaggerExpress = require("swagger-express-mw");
let app = require("express")();
app.use( (req, res, next) => {
	res.header("Content-Type", "application/json");
	next();
});

module.exports = app;

let config = {
	appRoot: __dirname
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
	if (err) { throw err; }

	// install middleware
	swaggerExpress.register(app);

	let port = process.env.PORT || 3000;
	app.listen(port, function(err) {
		if (err) throw err;

		console.log("Server is running on http://localhost:3000");
	});
});
