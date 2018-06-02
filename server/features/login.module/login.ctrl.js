const loginServices = require("./services/login.service");
const server = require("../../common/services/errors/server");

let authentication = function(req, res) {
	let login = req.swagger.params.login.value.trim();
	let password = req.swagger.params.password.value.trim();
    
	loginServices.authentication(login, password)
		.then((token) => {
			res.write(JSON.stringify({ auth: true, token: token }, null, 4));
			res.end();
		})
		.catch((err) => {
			server.sendError(res, err);
		});
};

module.exports = {
	authentication: authentication
};