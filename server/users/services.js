const mongoConnectionManager = require("../../server/baseMongo/MongoConnectionManager");

let createUser = function(login, password, firstName, lastName) {
	// Validation params

	return mongoConnectionManager.collections.usersDal.createUser(login, password, firstName, lastName);
};

let getUserById = function(userId) {
	// Validations params

	return mongoConnectionManager.collections.usersDal.findById(userId);
};

let getUserByLogin = function(userLogin) {
	// Validations params

	return mongoConnectionManager.collections.usersDal.findByLogin(userLogin);
};

let updateUserById = function(userId, firstName, lastName) {
	// Validation params

	return mongoConnectionManager.collections.usersDal.updateById(userId, {
		$set: {
			firstName: firstName,
			lastName: lastName
		}
	});
}

let updateUserByLogin = function(userLogin, firstName, lastName) {
	// Validation params

	return mongoConnectionManager.collections.usersDal.updateByLogin(userLogin, {
		$set: {
			firstName: firstName,
			lastName: lastName
		}
	})
}

let deleteUserById = function(userId) {
	// Validations params

	return mongoConnectionManager.collections.usersDal.deleteById(userId);
};

let deleteUserByLogin = function(userLogin) {
	// Validation params

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