class Server {
	sendError(res, err) {
		res.status(err.status || 500);
		res.json({message: err.message});
		res.send();
	}
}

module.exports = new Server();