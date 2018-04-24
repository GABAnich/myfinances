const jwt = require("jsonwebtoken");
const usersServices = require("../../server/users/services");
const userErrors = new ( require("../../server/users/UserErrors") );
const config = require("../../config");

let createUser = function(req, res) {
	let login = req.swagger.params.login.value.trim();
	let password = req.swagger.params.password.value.trim();
	let firstName = req.swagger.params.firstName.value.trim();
	let lastName = req.swagger.params.lastName.value.trim();

	usersServices.createUser(login, password, firstName, lastName)
		.then((user) => {
			let token = jwt.sign({ id: user.insertedId }, config.secret);

			res.set("Content-Type", "application/json");
			res.write(JSON.stringify({ auth: true, token: token }, null, 4));
			res.end();
		})
		.catch((err) => {
			console.log(err.message);
			res.status(409);
			res.json({message: err.message});
		});
};

let getUserById = function(req, res) {
	let userId = req.swagger.params.userId.value.trim();

	usersServices.getUserById(userId)
		.then((doc) => {
			res.set("Content-Type", "application/json");
			res.write(JSON.stringify(doc, null, 4));
			res.end();
		});
};

let getUserByLogin = function(req, res) {
	let userLogin = req.swagger.params.userLogin.value.trim();

	usersServices.getUserByLogin(userLogin)
		.then((doc) => {
			res.set("Content-Type", "application/json");
			res.write(JSON.stringify(doc, null, 4));
			res.end();
		});
};

let updateUserById = function(req, res) {
	let userId = req.swagger.params.userId.value.trim();
	let firstName = req.swagger.params.firstName.value.trim();
	let lastName = req.swagger.params.lastName.value.trim();

	usersServices.updateUserById(userId, firstName, lastName)
		.then((doc) => {
			res.set("Content-Type", "application/json");
			res.write(JSON.stringify(doc, null, 4));
			res.end();
		});
};

let updateUserByLogin = function(req, res) {
	let userLogin = req.swagger.params.userLogin.value.trim();
	let firstName = req.swagger.params.firstName.value.trim();
	let lastName = req.swagger.params.lastName.value.trim();

	usersServices.updateUserByLogin(userLogin, firstName, lastName)
		.then((doc) => {
			res.set("Content-Type", "application/json");
			res.write(JSON.stringify(doc, null, 4));
			res.end();
		});
};

let deleteUserById = function(req, res) {
	let userId = req.swagger.params.userId.value.trim();

	usersServices.deleteUserById(userId)
		.then((doc) => {
			res.set("Content-Type", "application/json");
			res.write(JSON.stringify(doc, null, 4));
			res.end();
		});
};

let deleteUserByLogin = function(req, res) {
	let userLogin = req.swagger.params.userLogin.value.trim();

	usersServices.deleteUserByLogin(userLogin)
		.then((doc) => {
			res.set("Content-Type", "application/json");
			res.write(JSON.stringify(doc, null, 4));
			res.end();
		});
};

// Деструктирізація
module.exports = {
	createUser: createUser,
	getUserById: getUserById,
	getUserByLogin: getUserByLogin,
	updateUserById: updateUserById,
	updateUserByLogin: updateUserByLogin,
	deleteUserById: deleteUserById,
	deleteUserByLogin: deleteUserByLogin
};