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
}

module.exports = UserErrors;