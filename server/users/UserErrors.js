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

	errorExistLogin(login, res) {
		res.status(401);
		return JSON.stringify({ status: '', auth: false, message: err.message + " login is already exist" });
	}
}

module.exports = UserErrors;