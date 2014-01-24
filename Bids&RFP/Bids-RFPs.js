$(document).ready(function() {


if (BidsAndRFPs_detailView){
// -----  detail view script start -----

//build page
	$('#content>ol.breadcrumb>li.active ').before('<li><a href="/bids-rfps">Bids & RFPs</a></li>');
		
	var $infoBlocks      = [];
	var bid_doc_all      = $.grep( [bid_doc1, bid_doc2, bid_doc3, bid_doc4, bid_doc5], function(string,i){return string.length>0});
	var addendum_doc_all = $.grep( [addendum_doc1, addendum_doc2, addendum_doc3, addendum_doc4, addendum_doc5], function(string, i){return string.length>0}) ;
			
	//due date 
	if (due_date){
		$infoBlocks.push(
			$('<div style="text-align:center;margin-bottom:15px;" class="col-xs-6"></div>')		
				.append( '<span style="font-weight:bold;">Bid Due Date: </span>' )
				.append(due_date[1] + "/" + due_date[0] + "/" + due_date[2])
		)
	}
		
	//bid number 
	if (bid_number){
		$infoBlocks.push(			
			$('<div style="text-align:center;margin-bottom:15px;" class="col-xs-6"></div>')		
				.append( '<span style="font-weight:bold;">Bid Number: </span>' )
				.append(bid_number)	
		)
	}

	//bid tabulation 
	if (bid_tabulation){
		$infoBlocks.push(		
			$('<div style="margin-bottom:15px;padding-left:0px;padding-right:0px;text-align:center;"></div>')
				.append( 
					$('<a class="docLink" target="_blank"></a>')
						.attr('href', bid_tabulation )
						.append( '<span class="glyphicon glyphicon-file" style="font-size: 26px;float:left;"></span>' )						
						.append( '<span style="float:left;line-height:1em;">View Bid<br class="hidden-xs"> Tabulation</span>' )
				)			
		)
	}
	
	$.each($infoBlocks, function() {
		switch ($infoBlocks.length) {
	        case 1: $(this).addClass('col-sm-6'); break;	    
	        case 2: $(this).addClass('col-sm-3'); break;	    
	        case 3: $(this).addClass('col-sm-2'); break;
	    }
	    
		$(this).addClass('col-xs-12').appendTo('#generalInfo');	    
    });
	
	if(bid_doc_all.length>0){
		$('<div class="col-sm-6 clearfix"><div class="panel panel-default col-xs-12 clearfix" id="bidDocsArea" style="margin-top:20px;padding-bottom:20px;"><h3>Documents</h3></div></div>').appendTo('#content');

		
		$.each(bid_doc_all, function(){
			$('<div style="clear:left;margin-bottom:8px;" class="clearfix"></div>')
				.append( 
					$('<a class="docLink" target="_blank"></a>')
						.attr('href', this )
						.append( '<div style="float:left;"><span class="glyphicon glyphicon-file" style="font-size: 26px;"></span></div>' )						
						.append( '<span style="vertical-align:top;margin-left:5px;">'+this.substring(this.lastIndexOf('/')+1) + '</span>' )
				)
				.appendTo('#bidDocsArea') 
		});
		
	}
	if(addendum_doc_all.length>0){
		$('<div class="col-sm-6 clearfix"><div class="panel panel-default col-xs-12 clearfix" id="addendumDocsArea" style="margin-top:20px;padding-bottom:20px;"><h3>Addenda</h3></div></div>').appendTo('#content');
		
		$.each(addendum_doc_all, function() {
			$('<div style="clear:left;margin-bottom:8px" class="clearfix"></div>')
				.append( 
					$('<a class="docLink" target="_blank"></a>')
						.attr('href', this )
						.append( '<div style="float:left;"><span class="glyphicon glyphicon-file" style="font-size: 26px;"></span></div>' )						
						.append( '<span style="vertical-align:top;margin-left:5px;">'+this.substring(this.lastIndexOf('/')+1) + '</span>' )
				)
				.appendTo('#addendumDocsArea')
		});
	}
//end of page build

//document click tracking
	$('a.docLink').click( function(event) {
		event.preventDefault();
		
		//gather info on clicked item
		var documentURL  = $(this).attr('href'); 
		var documentName = documentURL.substring(documentURL.lastIndexOf('/')+1); 
		
		//create record to be sent to BC
		var record       = {
			CAT_Custom_381331: pageName,
			CAT_Custom_381329: documentName
		};
		
		//merge info about the currently logged in user into the record
		$.extend(record,user);
		
		//check for and fix missing required fields
		$.each(record,function(key,value){
			if(value==""){ user[key]="---"}
		});

		//submit record to BC, then open document
		$.ajax({
			url: notificationURL,
			type: 'POST',
			data: $.param(record),
			async: false
		})
		.always(function() {
			var win=window.open(documentURL,'_blank');
			win.focus();
		});

	}); 			
	
// -----  detail view script end -----
return
}		

if(BidsAndRFPs_listView){
// -----  list view script start -----	
    $('#webAppItem_list div').each(function() {
		var $rowInsert       = $('<tr></tr>');
		var name             = $(this).attr('id');
		var bid_number       = $(this).attr('data-bid_number');
		var due_date         = $(this).attr('data-bid_due_date').split("-");
		var details_url      = $(this).attr('data-details_url');
		var contact_name     = $(this).attr('data-contact_name');
		var contact_email    = $(this).attr('data-contact_email');
		var contact_phone    = $(this).attr('data-contact_phone');
	//build row
        //cell
        $('<td style="max-width: 250px"></td>').append(name).appendTo($rowInsert);

        //cell
        $('<td class="hidden-xs"></td>').append(bid_number).appendTo($rowInsert);

        //cell
        $('<td style="text-align:center;"></td>').append(due_date[1] + "/" + due_date[0] + "/" + due_date[2]).appendTo($rowInsert);
        
        //cell
        $('<td class="hidden-xs"></td>').append(contact_name + '<br />').append(contact_phone + '<br />').append('<a href=mailto:"' + contact_email + '">' + contact_email + '</a>').appendTo($rowInsert);        

        //cell
        var $bid_documents = $('<td class="docs" style="text-align:center"></td>')
        $('<a target="_blank"></a>').attr('href', details_url).append($('<span class="glyphicon glyphicon-file" style="font-size: 26px;"></span>')).appendTo($bid_documents);

        $bid_documents.appendTo($rowInsert);
    
	//add row to table
	$('table').append($rowInsert);
    
    });
// -----  list view script end -----
}
return

});