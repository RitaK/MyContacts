var http = require('http');
var fs = require('fs');
var path = require('path');  

var mongoose = require('mongoose');

connectToDB();

http.createServer(function(req, res) {
	

	if(req.url)
	{
		readFile(req.url, function(err, data){//data - the file's data
			if(err)
			{
				res.end("Path is incorrect.");
			}
			else
			{
				res.end(data);//response is file's data
			}
		});
	}
}).listen(8080);


function readFile(localPath, cb) {
	
   
    filePath = path.join(__dirname, localPath);

	fs.readFile(filePath, 'utf8', cb);
}

function connectToDB()
{
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
	  console.log("connection to DB established");
	});
}