const BaseErrors = require("../commonServices/errors/BaseErrors");

class UserErrors extends BaseErrors {
	errorEmptyParams(property) {
		throw {message: `${property} is empty`, status: 400};
	}

	errorBadLogin() {
		throw {message: "Bad login", status: 400};
		// throw new Error("Bad login");
	}

	errorCorrectName(property) {
		throw {message: `${property} must contain only letters`, status: 400};
	}

	errorBadPassword() {
		throw {message: "Bad password", status: 400};
	}

	errorExistLogin(login) {
		throw {message: `User with login ${login} is already exist`, status: 409};
	}
}

module.exports = UserErrors;