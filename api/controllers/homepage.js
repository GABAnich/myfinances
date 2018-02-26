var fs = require('fs');

module.exports = {
	index_get: index_get
};

function index_get(req, res) {
	if ( global.mongoConnectionManager === undefined) {
		// rework
		console.log("White few seconds while server is starting...");
		return;
	}

	res.set('Content-Type', 'text/html');
	fs.readFile(__dirname + '../../../app_client/index.html', function(err, data) {
		if (err) throw err;

		res.write(data.toString('utf-8'));
		res.end();
	});
}