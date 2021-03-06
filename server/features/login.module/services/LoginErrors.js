const BaseErrors = require("../../../common/services/errors/BaseErrors");

class LoginErrors extends BaseErrors {
	noUserFound() {
		throw {obj: {auth: false, message: "No user found"}, status: 400};
	}

	invalidPassword() {
		throw {obj: {auth: false, message: "Password is invalid"}, status: 401};
	}
}

module.exports = LoginErrors;

