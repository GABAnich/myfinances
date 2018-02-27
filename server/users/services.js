const mongoConnectionManager = require("../../server/baseMongo/MongoConnectionManager");

let createUser = function(login, password, firstName, lastName) {
    // Validation params

    return mongoConnectionManager.collections.usersDal.createUser(login, password, firstName, lastName);
}

let getUserById = function(userId) {
    // Validations params

    return mongoConnectionManager.collections.usersDal.findById(userId);
}

let getUserByLogin = function(userLogin) {
    // Validations params

    return mongoConnectionManager.collections.usersDal.findByLogin(userLogin);
}

let deleteUserById = function(userId) {
    // Validations params

    return mongoConnectionManager.collections.usersDal.deleteById(userId);
}

let deleteUserByLogin = function(userLogin) {
    // Validation params

    return mongoConnectionManager.collections.usersDal.deleteByLogin(userLogin);
}

module.exports = {
    createUser: createUser,
    getUserById: getUserById,
    getUserByLogin: getUserByLogin,
    deleteUserById: deleteUserById,
    deleteUserByLogin: deleteUserByLogin
}