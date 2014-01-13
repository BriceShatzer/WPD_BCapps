$( document ).ready(function() {
	
	$('#webAppItem_list div').each( function() {
		var rowInsert = $('<tr></tr>');
		var name = $(this).attr('id');
		var bid_number = $(this).attr('data-bid_number');
		var due_date = $(this).attr('data-bid_due_date').split("-");
		var bid_doc1 = $(this).attr('data-bid_doc1');
		var bid_doc2 = $(this).attr('data-bid_doc2');
		var bid_doc3 = $(this).attr('data-bid_doc3');
		var bid_doc4 = $(this).attr('data-bid_doc4');
		var bid_doc5 = $(this).attr('data-bid_doc5');
		var addendum_doc1 = $(this).attr('data-addendum_doc1');	
		var addendum_doc2 = $(this).attr('data-addendum_doc2');
		var addendum_doc3 = $(this).attr('data-addendum_doc3');
		var addendum_doc4 = $(this).attr('data-addendum_doc4');
		var addendum_doc5 = $(this).attr('data-addendum_doc5');
		var contact_name = $(this).attr('data-contact_name');
		var contact_email = $(this).attr('data-contact_email');
		var contact_phone = $(this).attr('data-contact_phone');
		var bid_tabulation = $(this).attr('data-bid_tabulation');


		$('<td></td>').append(name).appendTo(rowInsert);
		$('<td></td>').append(bid_number).appendTo(rowInsert);
		var date 
		$('<td></td>').append(due_date[1]+"/"+due_date[0]+"/"+due_date[2]).appendTo(rowInsert);
		
		var bid_documents = $('<td class="docs"></td>')
		var bid_doc_vars = [bid_doc1, bid_doc2, bid_doc3, bid_doc4, bid_doc5];
		for(i=0; i<6; i++ ){
			if ( bid_doc_vars[i]) {
				$('<a target="_blank"></a>').attr('href', bid_doc_vars[i] ).append( $( '<span class="glyphicon glyphicon-file" style="font-size: 18px;"></span>' )	).appendTo(bid_documents);
			}

		}
		bid_documents.appendTo(rowInsert);

		var addendum_documents = $('<td class="addendum"></td>')
		var addendum_doc_vars = [addendum_doc1, addendum_doc2, addendum_doc3, addendum_doc4, addendum_doc5];
		for(i=0; i<6; i++ ){
			if ( addendum_doc_vars[i] ){
				$('<a target="_blank"></a>').attr('href', addendum_doc_vars[i] ).append( $( '<span class="glyphicon glyphicon-file" style="font-size: 18px;"></span>' )	).appendTo(addendum_documents);
			  }
		}
		addendum_documents.appendTo(rowInsert);

		$('<td></td>').append(contact_name+'<br />').append(contact_phone+'<br />').append('<a href=mailto:"'+contact_email+'">'+contact_email+'</a>').appendTo(rowInsert);


		var bid_tabulation_cell = $('<td></td>');
		if ( bid_tabulation) {
				$('<a target="_blank"></a>').attr('href', bid_tabulation ).append( $( '<span class="glyphicon glyphicon-file" style="font-size: 18px;"></span>' )	).appendTo(bid_tabulation_cell);
			}			$('<td></td>').append(bid_tabulation_cell).appendTo(rowInsert);

		$('table').append(rowInsert);
	});

});