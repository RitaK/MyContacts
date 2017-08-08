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
	    name: String,
	    number: String,
	    email: String
	  }
	});

	contactsModel = mongoose.model('contact', contactsSchema);
}

function createNewContact(contact, res)
{
	//creating a contact
	var newContact = new contactsModel ({
	  contact: { name: contact.name, number: contact.number, email: contact.email }
	});
	newContact.save(function (err) {
        if (err) { 
            console.log ('Error when saving a new contact to the DB');
        }
        else {
            console.log(newContact);
        }
    });

	//newContact.save(function (error) {if (error) console.log ('Error when saving a new contact to the DB')});

	var buf = new Buffer.from(JSON.stringify(newContact));
	res.end(buf);

	//console.log(newContact);
	//return "OK";
}

function getAllContacts(res)
{
	var contacts;
	var query = contactsModel.find({});
	query.exec(function (err, docs) {
	var buf2 = new Buffer.from(JSON.stringify(docs));
	res.end(buf2);
	});

	//res.end();
}

