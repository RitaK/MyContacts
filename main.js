
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
    var result = $.get("http://localhost:8080/getContacts", function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
        console.log(data + "     "+ status);
    });

}