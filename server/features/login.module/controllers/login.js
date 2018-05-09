const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const loginServices = require("../services");
const config = require("../../../../config");
const server = require("../../../common/services/errors/server");

let authentication = function(req, res) {
	let login = req.swagger.params.login.value.trim();
	let password = req.swagger.params.password.value.trim();
    
	loginServices.authentication(login, password)
		.then((user) => {
			if (!user) {
				server.sendError(res, {obj: {message: "No user found"}, status: 400});

				return;
			}

			let passwordIsValid = bcrypt.compareSync(password, user.password);
			if (!passwordIsValid) {
				server.sendError(res, {obj: {message: "Password is invalid", auth: false}, status: 401});

				return;
			}

			let token = jwt.sign({ id: user._id, login: user.login }, config.secret);
			res.write(JSON.stringify({ auth: true, token: token }, null, 4));
			res.end();
		});
};

module.exports = {
	authentication: authentication
};