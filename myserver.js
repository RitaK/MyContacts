var http = require('http');
var fs = require('fs');
var path = require('path');  

var mongoose = require('mongoose');
var contactsModel;

connectToDB();

http.createServer(function(req, res) {
	

	if(req.url == "" || req.url == "index.html")
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
	else
		if(req.url == "newContact")
		{
			var contact;
			req.on('data', function (chunk) {
			totalRequest+= chunk;
			});

			req.on('end', function () {
			  contact = totalRequest;
			});
			var jsonContact = JSON.parse(contact);
			createNewContact(jsonContact);
		}
}).listen(8080);


function readFile(localPath, cb) {
	
	if(localPath === "")
		localPath = "index.html";

    filePath = path.join(__dirname, localPath);

	fs.readFile(filePath, 'utf8', cb);
}


function connectToDB()
{
	var uristring = 
  	process.env.MONGODB_URI || 'mongodb://localhost/MongooseContacts';


	var theport = process.env.PORT || 5000;


	mongoose.connect(uristring, function (err, res) {
	  if (err) { 
	    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
	  } else {
	    console.log ('Succeeded connected to: ' + uristring);
	  }
	});

	var contactsSchema = new mongoose.Schema({
	  contact: {
	    name: String,
	    number: String
	  }
	});

	contactsModel = mongoose.model('PowerUsers', contactsSchema);
}

function createNewContact(contact)
{
	//creating a contact
	var newContact = new contactsModel ({
	  contact: { name: contact.name, number: contact.number }
	});
	newContact.save(function (error) {if (error) console.log ('Error when saving a new contact to the DB')});
	//return "OK";
}