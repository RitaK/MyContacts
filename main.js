
var contacts;
//GetAllContacts();


function createContact(contactName, contactNumder, contactEmail)
{
	var contact = {name: contactName, number: contactNumder, email: contactEmail};
	PostContactData(contact);
}


function addContactRowToGrid(contact)
{

}


/*function PostContactData(contact) {
	$.post("vm029600.cloudapp.net:8080/newContact",
    contact,
    function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });
}*/

