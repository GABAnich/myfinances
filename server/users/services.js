const mongoConnectionManager = require("../../server/baseMongo/MongoConnectionManager");
const validator = require("./validator");
const userErrors = new ( require("./UserErrors") );

const bcryptjs = require("bcryptjs");

let wait = function(ms) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
      now = Date.now();
    }
}

let createUser = function(login, password, firstName, lastName) {
	return getUserByLogin(login)
		.then((user) => {
			if (user) {
				userErrors.errorExistLogin(login);
			}

			// artificial delay for testing
			wait(3000);

			validator.isEmptyParams({
				login: login,
				password: password,
				firstName: firstName,
				lastName: lastName
			});

			validator.isCorrectLogin(login);

			validator.isCorrectPassword(password);

			validator.isCorrectName({
				firstName: firstName,
				lastName: lastName
			});

			let hashedPassword = bcryptjs.hashSync(password);

			return mongoConnectionManager.collections.usersDal.createUser(login, hashedPassword, firstName, lastName);
		});
		// catch if user not found and other
};

let getUserById = function(userId) {
	return mongoConnectionManager.collections.usersDal.findById(userId);
};

let getUserByLogin = function(userLogin) {
	validator.isCorrectLogin(userLogin);

	return mongoConnectionManager.collections.usersDal.findByLogin(userLogin);
};

let updateUserById = function(userId, firstName, lastName) {
	validator.isEmptyParams({
		userId: userId,
		firstName: firstName,
		lastName: lastName
	});

	validator.isCorrectName({
		firstName: firstName,
		lastName: lastName
	});

	return mongoConnectionManager.collections.usersDal.updateById(userId, {
		$set: {
			firstName: firstName,
			lastName: lastName
		}
	});
};

let updateUserByLogin = function(userLogin, firstName, lastName) {
	validator.isEmptyParams({
		userLogin: userLogin,
		firstName: firstName,
		lastName: lastName
	});

	validator.isCorrectLogin(userLogin);

	validator.isCorrectName({
		firstName: firstName,
		lastName: lastName
	});

	return mongoConnectionManager.collections.usersDal.updateByLogin(userLogin, {
		$set: {
			firstName: firstName,
			lastName: lastName
		}
	});
};

let deleteUserById = function(userId) {
	return mongoConnectionManager.collections.usersDal.deleteById(userId);
};

function deleteUserByLogin(userLogin) {
	validator.isCorrectLogin(userLogin);

	return mongoConnectionManager.collections.usersDal.deleteByLogin(userLogin);
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

// деструктиризація
// function Name() {}