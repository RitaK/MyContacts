var http = require('http');
var fs = require('fs');
var path = require('path'); 
var url = require('url'); 

var mongoose = require('mongoose');
var contactsModel;

connectToDB();

http.createServer(function(req, res) {
	var url_parts = url.parse(req.url, true);
			var query = url_parts.query;
		if(query.name){
			createNewContact(query, res);
		}
		else if(req.url == "/getContacts")
		{
			getAllContacts(res);
		}
		else
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
	
	if(localPath === "/")
		localPath = "/index.html";

    filePath = path.join(__dirname, localPath);

	fs.readFile(filePath, 'utf8', cb);
}


function connectToDB()
{
	var uristring = 
  	process.env.MONGODB_URI || 'mongodb://localhost/MongoContacts';


	var theport = process.env.PORT || 27017;


	mongoose.connect(uristring, function (err, res) {
	  if (err) { 
	    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
	  } else {
	    console.log ('Succeeded connected to: ' + uristring);
	  }
	});

	var contactsSchema = new mongoose.Schema({
	  contact: {
	    name: {type: String, unique: true, index: true},
	    number: String,
	    email: String
	  }
	});

	contactsModel = mongoose.model('contact', contactsSchema);
}

function createNewContact(contact, res)
{
	var buf;
	//creating a contact
	var newContact = new contactsModel ({
	  contact: { name: contact.name, number: contact.number, email: contact.email }
	});
	newContact.save(function (err) {
        if (err) { 
        	if(err.code === 11000)
        	{
        		var errMessage = 'A contact with this name already exists.';
        		console.log (errMessage);
        		buf = new Buffer.from(JSON.stringify(errMessage));
				res.end(buf);
        	}
        	else
        	{
        		var errMessage  = 'Error when saving a new contact to the DB';
        		console.log (errMessage);
        		buf = new Buffer.from(JSON.stringify(errMessage));
				res.end(buf);
        	}
        }
        else {
            console.log(newContact);
            readFile("/index.html", function(err, data){//data - the file's data
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
    });
}

function getAllContacts(res)
{
	var contacts;
	var buf;
	var query = contactsModel.find({}).sort({"contact.name" : 1});//get all documents for descending order according to contact's name
	query.exec(function (err, docs) {
		if (err) 
		{ 
			var errMessage = err.message;
			console.log(errMessage);//printing to log the error message
			buf = new Buffer.from(JSON.stringify(err.code));//sending the client the error code
			res.setHeader('Access-Control-Allow-Origin', 'https://vm029600.cloudapp.net');
			res.end(buf);
		}
		else
		{
			buf = new Buffer.from(JSON.stringify(docs));
			console.log(docs);
			res.setHeader('Access-Control-Allow-Origin', 'https://vm029600.cloudapp.net');
			res.end(buf);
		}
	
	});
}

