const mongoConnectionManager = require("../../server/baseMongo/MongoConnectionManager");
const validator = require("./validator");
const UserErrors = require("./UserErrors");
const userErrors = new UserErrors();

const bcryptjs = require("bcryptjs");

let wait = function(ms) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
      now = Date.now();
    }
}

function createUser(login, password, firstName, lastName) {
	return getUserByLogin(login)
		.then((user) => {
			if (user) {
				console.log( JSON.stringify(user) );
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
		})		
};

function getUserById(userId) {
	return mongoConnectionManager.collections.usersDal.findById(userId);
};

function getUserByLogin(userLogin) {
	validator.isCorrectLogin(userLogin);

	return mongoConnectionManager.collections.usersDal.findByLogin(userLogin);
};

function updateUserById(userId, firstName, lastName) {
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

function updateUserByLogin(userLogin, firstName, lastName) {
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

function deleteUserById(userId) {
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