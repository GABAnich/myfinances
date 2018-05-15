const jwt = require("jsonwebtoken");
const usersServices = require("../services");
const config = require("../../../../config");
const server = require("../../../common/services/errors/server");
const UserErrors = require("../UserErrors");
const userErrors = new UserErrors();

let createUser = function(req, res) {
	let login = req.swagger.params.login.value.trim();
	let password = req.swagger.params.password.value.trim();
	let firstName = req.swagger.params.firstName.value.trim();
	let lastName = req.swagger.params.lastName.value.trim();

	usersServices.createUser(login, password, firstName, lastName)
		.then((user) => {
			let token = jwt.sign({ id: user.insertedId, login: user.ops[0].login }, config.secret);

			res.status(201);
			res.write(JSON.stringify({ auth: true, token: token }, null, 4));
			res.end();
		})
		.catch((err) => {
			server.sendError(res, err);
		});
};

let getUserById = function(req, res) {
	let userId = req.swagger.params.userId.value.trim();

	usersServices.getUserById(userId)
		.then((doc) => {
			res.write(JSON.stringify(doc, null, 4));
			res.end();
		});
};

let getUserByLogin = function(req, res) {
	let userLogin = req.swagger.params.userLogin.value.trim();

	usersServices.getUserByLogin(userLogin)
		.then((doc) => {
			res.write(JSON.stringify(doc, null, 4));
			res.end();
		})
		.catch((err) => {
			server.sendError(res, err);
		});
};

let updateUserById = function(req, res) {
	let userId = req.swagger.params.userId.value.trim();
	let firstName = req.swagger.params.firstName.value.trim();
	let lastName = req.swagger.params.lastName.value.trim();
	let token = req.headers["x-access-token"];

	if (!token) {
		return userErrors.noToken(res);
	}

	jwt.verify(token, config.secret, function(err, decodedUser) {
		if (err) {
			return userErrors.failedAuthenticate(res);
		}

		if (userId != decodedUser.id) {
			return userErrors.accessDenied(res);
		}

		usersServices.updateUserById(userId, firstName, lastName)
			.then((doc) => {
				res.write(JSON.stringify(doc, null, 4));
				res.end();
			});
	});
};

let updateUserByLogin = function(req, res) {
	let userLogin = req.swagger.params.userLogin.value.trim();
	let firstName = req.swagger.params.firstName.value.trim();
	let lastName = req.swagger.params.lastName.value.trim();
	let token = req.headers["x-access-token"];

	if (!token) {
		return userErrors.noToken(res);
	}

	jwt.verify(token, config.secret, function(err, decodedUser) {
		if (err) {
			return userErrors.failedAuthenticate(res);
		}

		if (userLogin != decodedUser.login) {
			return userErrors.accessDenied(res);
		}

		usersServices.updateUserByLogin(userLogin, firstName, lastName)
			.then((doc) => {
				res.write(JSON.stringify(doc, null, 4));
				res.end();
			})
			.catch((err) => {
				server.sendError(res, err);
			});
	});
};

let deleteUserById = function(req, res) {
	let userId = req.swagger.params.userId.value.trim();
	let token = req.headers["x-access-token"];

	if (!token) {
		return userErrors.noToken(res);
	}

	jwt.verify(token, config.secret, function(err, decodedUser) {
		if (err) {
			return userErrors.failedAuthenticate(res);
		}

		if (userId != decodedUser.id) {
			return userErrors.accessDenied(res);
		}

		usersServices.deleteUserById(userId)
			.then((doc) => {
				res.write(JSON.stringify(doc, null, 4));
				res.end();
			});
	});
};

let deleteUserByLogin = function(req, res) {
	let userLogin = req.swagger.params.userLogin.value.trim();
	let token = req.headers["x-access-token"];

	if (!token) {
		return userErrors.noToken(res);
	}

	jwt.verify(token, config.secret, function(err, decodedUser) {
		if (err) {
			return userErrors.failedAuthenticate(res);
		}

		if (userLogin != decodedUser.login) {
			return userErrors.accessDenied(res);
		}

		usersServices.deleteUserByLogin(userLogin)
			.then((doc) => {
				res.write(JSON.stringify(doc, null, 4));
				res.end();
			})
			.catch((err) => {
				server.sendError(res, err);
			});
	});
};

module.exports = {
	createUser: createUser,
	getUserById: getUserById,
	getUserByLogin: getUserByLogin,
	updateUserById: updateUserById,
	updateUserByLogin: updateUserByLogin,
	deleteUserById: deleteUserById,
	deleteUserByLogin: deleteUserByLogin
};