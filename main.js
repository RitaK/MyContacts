var http = require('http');
var fs = require('fs');
var path = require('path');  



function createContact(contactName, contactNumder)
{
	var contact = {name: contactName, number: contactNumder};
	PostContactData(contact);
}

function PostContactData(contact) {

  var post_options = {
      host: 'vm029600.cloudapp.net',
      port: '8080',
      path: '/newContact',
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(contact)
      }
  };

  var post_req = http.request(post_options, function(res) {
      res.setEncoding('utf8');
      var totalResponse ="";

      res.on('data', function (chunk) {
          totalResponse+= chunk;
      });

      res.on('end', function () {
          //chunk should be the result of the insertion (OK or ERROR)
          addContactRowToGrid(contact);
      });
  });

  // post the data
  post_req.write(contact);
  post_req.end();

}

function addContactRowToGrid(contact)
{
	
}