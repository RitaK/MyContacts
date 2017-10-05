
var contacts;

$( document ).ready(function() {
    getAllContacts();
});



function getAllContacts() {
    var result = $.get("http://vm029600.cloudapp.net:8080/getContacts", function(data, status){
    	if(status ==="success")
    	{
        	contacts = JSON.parse(data);
        	fillTableWithContacts(contacts);
    	}
        else
        {
        	console.log("The request to get all contacts returned the response status: "+status+ ".");
        }
    });
}

function fillTableWithContacts(contacts){
	for (var i = 0; i < contacts.length; i += 1) {
		var name = (contacts[i].contact.name !== "") ? contacts[i].contact.name: "-";
		var number = (contacts[i].contact.number !== "") ? contacts[i].contact.number: "-";
		var email = (contacts[i].contact.email !== "") ? contacts[i].contact.email: "-";
	$('#contactsGrid').append(
	  '<div class="contact-row">' +
	    '<div class="col-md-4 cell" onmouseover = "mouseOverCell(this)" onmouseleave = "mouseLeaveCell(this)">' + name + '</div>' +
	    '<div class="col-md-4 cell" onmouseover = "mouseOverCell(this)" onmouseleave = "mouseLeaveCell(this)">' + number + '</div>' +
	  	'<div class="col-md-4 cell" onmouseover = "mouseOverCell(this)" onmouseleave = "mouseLeaveCell(this)">' + email + '</div>' +
	'</div>');
	}
}

//Filtering and presenting only cntacts relevent to search. In sescending order.
function searchFilter() {
    var input, filter, row, i, name, number, rowChildren;
    input = $('#searchBar');
    if(input[0])
    {
    	filter = input[0].value.toUpperCase();
    	var rows = $('.contact-row');
    for (i = 0; i < rows.length; i++) {
	        rowChildren = rows[i].childNodes;
	        name = rowChildren[0].innerText; 
	        number = rowChildren[1].innerText;
	        if (name.toUpperCase().indexOf(filter) > -1 || number.toUpperCase().indexOf(filter) > -1) {
	            rows[i].style.display = "";
	        } else {
	            rows[i].style.display = "none";
	        }
    	}
    }
    
}

function checkUser(){
	var name = $('#name')[0].value;
	var number = $('#phoneNumber')[0].value;
	var email = $('#email')[0].value;
	if(name === "" || number === "" )
		{
			alert("Name and number fields cannot be empty.");
		    return false;
		}
	for (var i=0; i<contacts.length; i++) {
			if (contacts[i].contact.name === name) {
			    alert("A contact with this name already exists.");
			    return false;
			  }
	}
}

function mouseOverCell(cell)
{
	var siblings = cell.parentNode.childNodes;
	for (var i =0; i< siblings.length ; i++)
		siblings[i].style.backgroundColor = '#DCDCDC';
}

function mouseLeaveCell(cell){
	var siblings = cell.parentNode.childNodes;
	for (var i =0; i< siblings.length ; i++)
		siblings[i].style.backgroundColor = 'white';
}
