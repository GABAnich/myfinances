const mongoConnectionManager = require("../../server/baseMongo/MongoConnectionManager");

let authentication = function(login, password) {
	return mongoConnectionManager.collections.usersDal.findByLogin(login);
};

module.exports = {
	authentication: authentication
};