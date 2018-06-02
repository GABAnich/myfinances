const usersServices = require("./services/user.service");
const server = require("../../common/services/errors/server");

let createUser = function(req, res) {
	let login = req.swagger.params.login.value.trim();
	let password = req.swagger.params.password.value.trim();
	let firstName = req.swagger.params.firstName.value.trim();
	let lastName = req.swagger.params.lastName.value.trim();

	usersServices.createUser(login, password, firstName, lastName)
		.then((token) => {
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
		});
};

let updateUserById = function(req, res) {
	let userId = req.swagger.params.userId.value.trim();
	let firstName = req.swagger.params.firstName.value.trim();
	let lastName = req.swagger.params.lastName.value.trim();
	let token = req.headers["x-access-token"];

	usersServices.updateUserById(userId, firstName, lastName, token)
		.then((doc) => {
			res.write(JSON.stringify(doc, null, 4));
			res.end();
		})
		.catch((err) => {
			server.sendError(res, err);
		});
};

let updateUserByLogin = function(req, res) {
	let userLogin = req.swagger.params.userLogin.value.trim();
	let firstName = req.swagger.params.firstName.value.trim();
	let lastName = req.swagger.params.lastName.value.trim();
	let token = req.headers["x-access-token"];

	usersServices.updateUserByLogin(userLogin, firstName, lastName, token)
		.then((doc) => {
			res.write(JSON.stringify(doc, null, 4));
			res.end();
		})
		.catch((err) => {
			server.sendError(res, err);
		});
};

let deleteUserById = function(req, res) {
	let userId = req.swagger.params.userId.value.trim();
	let token = req.headers["x-access-token"];

	usersServices.deleteUserById(userId, token)
		.then((doc) => {
			res.write(JSON.stringify(doc, null, 4));
			res.end();
		})
		.catch((err) => {
			server.sendError(res, err);
		});
};

let deleteUserByLogin = function(req, res) {
	let userLogin = req.swagger.params.userLogin.value.trim();
	let token = req.headers["x-access-token"];

	usersServices.deleteUserByLogin(userLogin, token)
		.then((doc) => {
			res.write(JSON.stringify(doc, null, 4));
			res.end();
		})
		.catch((err) => {
			server.sendError(res, err);
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