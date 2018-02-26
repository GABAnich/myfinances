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

module.exports = {
    createUser: createUser,
    getUserById: getUserById,
    getUserByLogin: getUserByLogin
}