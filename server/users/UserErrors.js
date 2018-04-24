const BaseErrors = require("../commonServices/errors/BaseErrors");

class UserErrors extends BaseErrors {
	errorEmptyParams(property) {
		throw new Error(property + " is empty");
	}

	errorBadLogin() {
		throw new Error("Bad login");
	}

	errorCorrectName(property) {
		throw new Error(property + " must contain only letters");
	}

	errorBadPassword() {
		throw new Error("Bad password");
	}

	errorExistLogin(login) {
		throw new Error("User with login ${login} is already exist");
	}
}

module.exports = UserErrors;