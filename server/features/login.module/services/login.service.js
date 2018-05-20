const mongoConnectionManager = require("../../../common/baseMongo/MongoConnectionManager");

let authentication = function(login) {
	return mongoConnectionManager.collections.usersDal.findByLogin(login);
};

module.exports = {
	authentication: authentication
};