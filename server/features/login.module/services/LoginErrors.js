const server = require("../../../common/services/errors/server");
const BaseErrors = require("../../../common/services/errors/BaseErrors");

class LoginErrors extends BaseErrors {
	noUserFound(res) {
		return server.sendError(res, {obj: {auth: false, message: "No user found"}, status: 400});
	}

	invalidPassword(res) {
		return server.sendError(res, {obj: {auth: false, message: "Password is invalid"}, status: 401});
	}
}

module.exports = LoginErrors;

