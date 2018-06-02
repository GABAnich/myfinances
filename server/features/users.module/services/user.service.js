const mongoConnectionManager = require("../../../../server/common/baseMongo/MongoConnectionManager");
const validator = require("./validator");
const UserErrors = require("./UserErrors");
const userErrors = new UserErrors();
const config = require("../../../../config");

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

function createUser(login, password, firstName, lastName) {
	return getUserByLogin(login)
		.then((user) => {
			if (user) {
				userErrors.errorExistLogin(login);
			}

			validator.isCorrectLogin(login);

			validator.isEmptyParams({
				login: login,
				password: password,
				firstName: firstName,
				lastName: lastName
			});

			validator.isCorrectPassword(password);

			validator.isCorrectName({
				firstName: firstName,
				lastName: lastName
			});

			let hashedPassword = bcryptjs.hashSync(password);

			return mongoConnectionManager.collections.usersDal.createUser(login, hashedPassword, firstName, lastName);
		})
		.then((user) => {
			let token = jwt.sign({ login: user.ops[0].login }, config.secret);

			return Promise.resolve(token);
		});
}

function getUserById(userId) {
	return mongoConnectionManager.collections.usersDal.findById(userId);
}

function getUserByLogin(userLogin) {
	return mongoConnectionManager.collections.usersDal.findByLogin(userLogin);
}

function updateUserById(userId, firstName, lastName, token) {
	return mongoConnectionManager.collections.usersDal.findById(userId)
		.then((user) => {
			if (!token) {
				userErrors.noToken();
			}

			validator.isEmptyParams({
				userId: userId,
				firstName: firstName,
				lastName: lastName
			});

			validator.isCorrectName({
				firstName: firstName,
				lastName: lastName
			});

			jwt.verify(token, config.secret, function(err, decodedUser) {
				if (err) {
					userErrors.failedAuthenticate();
				}
		
				if (!user || user.login != decodedUser.login) {
					userErrors.accessDenied();
				}
			});

			return mongoConnectionManager.collections.usersDal.updateById(userId, {
				$set: {
					firstName: firstName,
					lastName: lastName
				}
			});
		});
}

function updateUserByLogin(userLogin, firstName, lastName, token) {
	return Promise.resolve()
		.then(() => {
			validator.isEmptyParams({
				firstName: firstName,
				lastName: lastName
			});
		
			validator.isCorrectLogin(userLogin);
		
			validator.isCorrectName({
				firstName: firstName,
				lastName: lastName
			});
		
			if (!token) {
				userErrors.noToken();
			}

			jwt.verify(token, config.secret, function(err, decodedUser) {
				if (err) {
					userErrors.failedAuthenticate();
				}
		
				if (userLogin != decodedUser.login) {
					userErrors.accessDenied();
				}	
			});

			return mongoConnectionManager.collections.usersDal.updateByLogin(userLogin, {
				$set: {
					firstName: firstName,
					lastName: lastName
				}
			});
		});
}

function deleteUserById(userId, token) {
	return mongoConnectionManager.collections.usersDal.findById(userId)
		.then((user) => {
			if (!token) {
				userErrors.noToken();
			}

			jwt.verify(token, config.secret, function(err, decodedUser) {
				if (err) {
					userErrors.failedAuthenticate();
				}
		
				if (!user || user.login != decodedUser.login) {
					userErrors.accessDenied();
				}
			});

			return mongoConnectionManager.collections.usersDal.deleteById(userId); 
		});
}

function deleteUserByLogin(userLogin, token) {
	return Promise.resolve()
		.then(() => {
			validator.isCorrectLogin(userLogin);

			if (!token) {
				userErrors.noToken();
			}

			jwt.verify(token, config.secret, function(err, decodedUser) {
				if (err) {
					userErrors.failedAuthenticate();
				}

				if (userLogin != decodedUser.login) {
					return userErrors.accessDenied();
				}	
			});

			return mongoConnectionManager.collections.usersDal.deleteByLogin(userLogin);
		});
}

module.exports = {
	createUser: createUser,
	getUserById: getUserById,
	getUserByLogin: getUserByLogin,
	updateUserById: updateUserById,
	updateUserByLogin: updateUserByLogin,
	deleteUserById: deleteUserById,
	deleteUserByLogin: deleteUserByLogin
};