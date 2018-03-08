const usersServices = require("../../server/users/services");

let createUser = function(req, res) {
	let login = req.swagger.params.login.value;
	let password = req.swagger.params.password.value;
	let firstName = req.swagger.params.firstName.value;
	let lastName = req.swagger.params.lastName.value;

	usersServices.createUser(login, password, firstName, lastName)
		.then((doc) => {
			res.set("Content-Type", "application/json");
			res.write(JSON.stringify(doc, null, 4));
			res.end();
		});
};

let getUserById = function(req, res) {
	let userId = req.swagger.params.userId.value;

	usersServices.getUserById(userId)
		.then((doc) => {
			res.set("Content-Type", "application/json");
			res.write(JSON.stringify(doc, null, 4));
			res.end();
		});
};

let getUserByLogin = function(req, res) {
	let userLogin = req.swagger.params.userLogin.value;

	usersServices.getUserByLogin(userLogin)
		.then((doc) => {
			res.set("Content-Type", "application/json");
			res.write(JSON.stringify(doc, null, 4));
			res.end();
		});
};

let updateUserById = function(req, res) {
	let userId = req.swagger.params.userId.value;
	let firstName = req.swagger.params.firstName.value;
	let lastName = req.swagger.params.lastName.value;

	usersServices.updateUserById(userId, firstName, lastName)
		.then((doc) => {
			res.set("Content-Type", "application/json");
			res.write(JSON.stringify(doc, null, 4));
			res.end();
		});
};

let updateUserByLogin = function(req, res) {
	let userLogin = req.swagger.params.userLogin.value;
	let firstName = req.swagger.params.firstName.value;
	let lastName = req.swagger.params.lastName.value;

	usersServices.updateUserByLogin(userLogin, firstName, lastName)
		.then((doc) => {
			res.set("Content-Type", "application/json");
			res.write(JSON.stringify(doc, null, 4));
			res.end();
		});
};

let deleteUserById = function(req, res) {
	let userId = req.swagger.params.userId.value;

	usersServices.deleteUserById(userId)
		.then((doc) => {
			res.set("Content-Type", "application/json");
			res.write(JSON.stringify(doc, null, 4));
			res.end();
		});
};

let deleteUserByLogin = function(req, res) {
	let userLogin = req.swagger.params.userLogin.value;

	usersServices.deleteUserByLogin(userLogin)
		.then((doc) => {
			res.set("Content-Type", "application/json");
			res.write(JSON.stringify(doc, null, 4));
			res.end();
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