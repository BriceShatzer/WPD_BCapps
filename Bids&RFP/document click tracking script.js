$(/* all document anchor tags */).click(
// ---start click handler 
function(event) {
// -- click function start 
event.preventDefault();

var Bid_RFP = "{module_pagename}";
var documentURL;
var documentName;
$(this).attr('href' function(i,path) {
	documentURL = path;
	documentName = path.substring(path.lastIndexOf('/')+1) 
})

var documentDownloadRecord ={
FirstName:"{module_firstname}",
LastName:"{module_lastname}",
EmailAddress:"{module_emailaddress}",
CAT_Custom_381331: Bid_RFP,
CAT_Custom_381329: documentName
}

console.log(documentDownloadRecord.param());

/*
$.post ("http://www.wheelingparkdistrict.com/FormProcessv2.aspx?WebFormID=97416&OID={module_oid}&OTYPE={module_otype}&EID={module_eid}&CID={module_cid}&JSON=1", documentDownloadRecord.param() )
	.done(function() {
	// call link 
	})
*/

// ---end click function 
}
// ---end click handler 
);