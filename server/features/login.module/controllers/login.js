const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const loginServices = require("../services");
const config = require("../../../../config");
const LoginErrors = require("../LoginErrors");
const loginErrors = new LoginErrors();

let authentication = function(req, res) {
	let login = req.swagger.params.login.value.trim();
	let password = req.swagger.params.password.value.trim();
    
	loginServices.authentication(login, password)
		.then((user) => {
			if (!user) {
				return loginErrors.noUserFound(res);
			}

			let passwordIsValid = bcrypt.compareSync(password, user.password);
			if (!passwordIsValid) {
				return loginErrors.invalidPassword(res);
			}

			let token = jwt.sign({ id: user._id, login: user.login }, config.secret);
			res.write(JSON.stringify({ auth: true, token: token }, null, 4));
			res.end();
		});
};

module.exports = {
	authentication: authentication
};