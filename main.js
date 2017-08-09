
var contacts;

$( document ).ready(function() {
    getAllContacts();
});



function getAllContacts() {
    var result = $.get("http://vm029600.cloudapp.net:8080/getContacts", function(data, status){
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

//Filtering and presenting only cntacts relevent to search. In sescending order.
function searchFilter() {
    var input, filter, row, i, name;
    input = $('#searchBar');
    if(input[0])
    {
    	filter = input[0].value.toUpperCase();
    	var rows = $('.contact-row');

    for (i = 0; i < rows.length; i++) {
	        name = rows[i].firstChild.innerText;
	        if (name.toUpperCase().indexOf(filter) > -1) {
	            rows[i].style.display = "";
	        } else {
	            rows[i].style.display = "none";
	        }
    	}
    }
    
}