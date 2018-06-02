const mongoConnectionManager = require("../../../common/baseMongo/MongoConnectionManager");
const LoginErrors = require("./LoginErrors");
const loginErrors = new LoginErrors();
const config = require("../../../../config");

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

let authentication = function(login, password) {
	return mongoConnectionManager.collections.usersDal.findByLogin(login)
		.then((user) => {
			if (!user) {
				loginErrors.noUserFound();
			}

			let passwordIsValid = bcryptjs.compareSync(password, user.password);
			if (!passwordIsValid) {
				loginErrors.invalidPassword();
			}

			let token = jwt.sign({ id: user._id, login: user.login }, config.secret);

			return Promise.resolve(token);
		});
};

module.exports = {
	authentication: authentication
};