class Server {
	sendError(res, err) {
		res.status(err.status || 500);
		res.json(err.obj);
		res.send();
	}
}

module.exports = new Server();