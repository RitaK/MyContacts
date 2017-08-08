
var contacts;

getAllContacts();

function getAllContacts() {
    var result = $.get("http://localhost:8080/getContacts", function(data, status){
    	if(status ==="success")
    	{
        	contacts = data;
        	fillTableWithContacts(contacts);
    	}
        
        else
        {
        	console.log("The request to get all contacts returned the response status: "+status+ ".");
        }
    });
}

function fillTableWithContacts(contacts){
	var contactsObj = JSON.parse(contacts); 
	for (var i = 0; i < contactsObj.length; i += 1) {
	$('#contactsGrid').append(
	  '<div class="contact-row">' +
	    '<div class="col-md-4 cell">' + contactsObj[i].contact.name + '</div>' +
	    '<div class="col-md-4 cell">' + contactsObj[i].contact.number + '</div>' +
	  	'<div class="col-md-4 cell">' + contactsObj[i].contact.email + '</div>' +
	'</div>');
	}
}
