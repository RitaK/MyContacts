
var contacts;

getAllContacts();

function createContact(contactName, contactNumder, contactEmail)
{
	var contact = {name: contactName, number: contactNumder, email: contactEmail};
	PostContactData(contact);
}


function addContactRowToGrid(contact)
{

}


function getAllContacts() {
    var result = $.get("http://localhost:8080/getContacts", function(data, status){
    	if(status ==="success")
        	contacts = data;
        else
        {
        	console.log("The request to get all contacts returned the response status: "+status+ ".");
        }
    });

}