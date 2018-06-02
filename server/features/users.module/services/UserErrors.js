const BaseErrors = require("../../../common/services/errors/BaseErrors");

class UserErrors extends BaseErrors {
	errorEmptyParams(property) {
		throw {obj: {message: `${property} is empty`}, status: 400};
	}

	errorBadLogin() {
		throw {obj: {message: "Bad login"}, status: 400};
	}

	errorCorrectName(property) {
		throw {obj: {message: `${property} must contain only letters`}, status: 400};
	}

	errorBadPassword() {
		throw {obj: {message: "Bad password"}, status: 400};
	}

	errorExistLogin(login) {
		throw {obj: {message: `User with login ${login} is already exist`}, status: 409};
	}

	noToken() {
		throw {obj: {auth: false, message: "No token provided."}, status: 401};
	}

	accessDenied() {
		throw {obj: {auth: false, message: "Access is denied."}, status: 403};
	}
	
	failedAuthenticate() {
		throw {obj: {auth: false, message: "Failed to authenticate token."}, status: 500};
	}
}

module.exports = UserErrors;