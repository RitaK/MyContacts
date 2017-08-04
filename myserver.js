var http = require('http');

http.createServer(function(req, res) {
	res.end(req.url);
}).listen(8080);