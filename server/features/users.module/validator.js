let userErrors = new ( require("./UserErrors") )();

let isEmptyParams = function(params) {
	Object.keys(params).forEach((property) => {
		if (params[property].length === 0) {
			userErrors.errorEmptyParams(property);
		}
	});
};

let isCorrectLogin = function(login) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
	if ( !re.test( login.toLowerCase() ) ) {
		userErrors.errorBadLogin();
	}
};

let isCorrectPassword = function(password) {
	// Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
	var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+=-\`<>?,./])[A-Za-z\d~!@#$%^&*()_+=-\`<>?,./]{8,}/;

	if ( !re.test(password) ) {
		userErrors.errorBadPassword();
	}
};

let isCorrectName = function(obj) {
	Object.keys(obj).forEach((property) => {
		if ( !/^[a-zA-Z]+$/.test(obj[property]) ) {
			userErrors.errorCorrectName(property);
		}
	});
};

module.exports = {
	isEmptyParams: isEmptyParams,
	isCorrectLogin: isCorrectLogin,
	isCorrectName: isCorrectName,
	isCorrectPassword: isCorrectPassword
};