'use strict';

const mongoConnectionManager = require("./server/baseMongo/MongoConnectionManager");

mongoConnectionManager.connect()
.then(() => {
    console.log("Connected");
})
.then(() => {
    mongoConnectionManager.setCollections();
})
.then(() => {
    console.log("Collections inizialized");
});
// .then(() => {
//     global.mongoConnectionManager = mongoConnectionManager;
// });

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

// mongoConnectionManager.connect()
// 	.then(() => {
// 		mongoConnectionManager.setDals();
// 	})
// 	// .then(() => {
// 	// 	return mongoConnectionManager.collections.usersDal
// 	// 		.findByLogin("email@gmail.com");
// 	// })
// 	// .then((doc) => {
// 	// 	console.log(doc);
// 	// });
// 	.then(() => {
// 		return mongoConnectionManager.collections.collectionDal
// 			.findOne({});
// 	})
// 	.then((doc) => {
// 		console.log(doc);
// 	})

// mongoConnectionManager.connect()
// 	.then(() => {
// 		mongoConnectionManager.setDals();
// 	})
// 	.then(() => {
// 		mongoConnectionManager.collections.usersDal
// 			.createUser("email@gmail.com", "123456789", "Magnus", "Carlsen");
// 	})
// 	.then(() => {
// 		return mongoConnectionManager.collections.usersDal
// 			.findByLogin("email@gmail.com");
// 	})
// 	.then(doc => {
// 		console.log(doc);
// 	})
// 	.then(() => {
// 		mongoConnectionManager.collections.usersDal
// 			.updateByLogin("email@gmail.com", {
// 				$set: {
// 					password: "987654321"
// 				}
// 			});
// 	})
// 	.then(() => {
// 		return mongoConnectionManager.collections.usersDal
// 			.findByLogin("email@gmail.com");
// 	})
// 	.then(doc => {
// 		console.log(doc);
// 	})
// .then(() => {
// 	mongoConnectionManager.collections.usersDal
// 		.deleteByLogin("email@gmail.com");
// });

// mongoConnectionManager.connect()
// 	.then(() => {
// 		mongoConnectionManager.setDals();
// 	})
// 	.then(() => {
// 		mongoConnectionManager.collections.usersDal.updateById("5a89a37d7cca8330eccded9c", {
// 			$set: {
// 				name: "James Franco"
// 			}
// 		})
// 	})
// 	.then(() => {
// 		return mongoConnectionManager.collections.usersDal.findById("5a89a37d7cca8330eccded9c");
// 	})
// 	.then((doc) => {
// 		console.log(doc);
// 	})
// 	.then(() => {
// 		mongoConnectionManager.closeConnection();
// 	})
// 	.catch(err => {
// 		if (err) {
// 			console.log(err);
// 		}
// 	});

// let UserDal = require("./server/users/UserDal");

// const mongoConnectionManager = require("./server/baseMongo/MongoConnectionManager");
// mongoConnectionManager.connect()
// 	.then(() => {
// 		return new UserDal(mongoConnectionManager.connection, "collection");
// 	})
// 	.then((userDal) => {
// 		return userDal.findById("5a86e7dfb8378027c05c8b3f");
// 	})
// 	.then((doc) => {
// 		console.log(doc);
// 	});
