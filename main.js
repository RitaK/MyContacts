
var contacts;
//GetAllContacts();
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
    $.get("http://vm029600.cloudapp.net:8080/getContacts", function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });
}