let isEmptyParams = function(params) {
	Object.keys(params).forEach((property) => {
		if (params[property].length === 0) {
			// tmp
			throw new Error(property + " is empty");
		}
	});
};

let isCorrectLogin = function(login) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
	if ( !re.test( login.toLowerCase() ) ) {
		// tmp
		throw new Error("Bad login");
	}
};

module.exports = {
	isEmptyParams: isEmptyParams,
	isCorrectLogin: isCorrectLogin
};