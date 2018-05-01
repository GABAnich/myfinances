const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const loginServices = require("../../server/login/services");
const config = require("../../config");

let authentication = function(req, res) {
	let login = req.swagger.params.login.value.trim();
	let password = req.swagger.params.password.value.trim();
    
	loginServices.authentication(login, password)
		.then((user) => {
			if (!user) {
				res.status(404);
				res.write(JSON.stringify({ message: "No user found" }, null, 4));
				res.end();
                
				return;
			}

			let passwordIsValid = bcrypt.compareSync(password, user.password);
			if (!passwordIsValid) {
				res.status(401);
				res.write(JSON.stringify({ auth: false }, null, 4));
				res.end();

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