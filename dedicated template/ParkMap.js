$( document ).ready(function() {

//==============================================================================
var activeItem;

function initialize() {
//-----------start variable scope for each object----------------------	
	var mapOptions = {
		zoom: 13,
		center: new google.maps.LatLng(42.139541,-87.928747)
	};
	
	var map = new google.maps.Map(document.getElementById('map'), mapOptions);

	var infoWindow = new google.maps.InfoWindow({ 
			maxWidth: Math.round( $('#map').width()*.65 )
		});
	
	$('#map_objects > div[data-visible="true"]').each(function(){
	//-----------start building map objects-----------
		var id = $(this).attr('id');
		var type = $(this).data('type');
		var parkDetails = this.outerHTML;
		//var infoWidth = ;
		var pin_latlng;
		var pinImage;

	//creating pin location from GPS coordinates either manually inputed or derived from the provided address
		if ( $(this).data('custom_lat') && $(this).data('custom_lng')  ){
			pin_latlng = new google.maps.LatLng( $(this).data('custom_lat') , $(this).data('custom_lng') )
		}
		else{
			pin_latlng = new google.maps.LatLng( $(this).data('BC_lat') , $(this).data('BC_lng') )
		};

	//setting pin color based on 'type'
		if (type == 'Pool'){pinImage = 'http://maps.google.com/mapfiles/ms/micons/blue.png'}
		else if (type == 'Country Club'){pinImage = 'http://maps.google.com/mapfiles/ms/micons/lightblue.png'}
		else if (type == 'Golf Course'){pinImage = 'http://maps.google.com/mapfiles/ms/micons/orange.png'}
		else if (type == 'Park'){pinImage = 'http://maps.google.com/mapfiles/ms/micons/green.png'}
		else if (type == 'Recreation Center'){pinImage = 'http://maps.google.com/mapfiles/ms/micons/red.png'}
		else {pinImage = 'http://maps.google.com/mapfiles/ms/micons/red.png'};


		var marker = new google.maps.Marker({	
			map: map,
			position: pin_latlng,
			title: $(this).data('name'),
			icon: pinImage
		});
//result 
	
		google.maps.event.addListener( marker, 'click', function() {
			infoWindow.close()
			infoWindow.setContent( parkDetails )
			infoWindow.open( map, marker);			
		});	

		if( $(this).data('active') == 'true' ) {
			activeItem = marker;
			//infoWindow.open(map, marker)
		}
	//-----------end building map objects-----------

	});
	
};

//==============================================================================

function filterMapObjects() {
	var typeSpecified = $('#typeToggles label input:checked').length>=1;
	var featureSpecified = $('#featureToggles label input:checked').length>=1;
	
	function setVisibleType(){
		$('#typeToggles label input:checked').each( function(){
			var type =  $(this).parent().attr('id').slice( $(this).parent().attr('id').indexOf('_')+1 ).replace(/-/,' ');
			$('#map_objects').children('div[data-type="'+type+'"]').attr('data-visible','true')
		}) 
	};
	
	function setVisibleFeature(){
		$('#featureToggles label input:checked').each( function() {
			$('#map_objects').children('div[data-features*="'+$(this).val()+'"]').attr('data-visible', 'true') ;
		});		
	};

	if ( typeSpecified || featureSpecified)  
		{ $('#map_objects').children('div').attr('data-visible', 'false'); }
	else 
		{ $('#map_objects').children('div').attr('data-visible', 'true'); };

	if (featureSpecified && !typeSpecified) 
		{ setVisibleFeature() };

	if (!featureSpecified && typeSpecified) 
		{ setVisibleType() };

	if (featureSpecified && typeSpecified) {
		
		setVisibleType()

		var array = $('#map_objects').children('div[data-visible="true"]');
		
		array.each( function() 
			{ $(this).attr('data-visible', 'false');	
		});

		$('#featureToggles label input:checked').each( function() {
			array.filter( $('div[data-features*="'+$(this).val()+'"]') ).attr('data-visible', 'true')
		});		
	};

}


//==============================================================================




$('#typeToggles label input').change( function(){
	filterMapObjects()
//	$('#map_objects').children('div').attr('data-visible', 'true')
	$('body').trigger('mapRefresh'); 
});

//==============================================================================

$('#featureToggles label input').change( function() {
	filterMapObjects()
	$('body').trigger('mapRefresh'); 
});

//==============================================================================


$('body').on('mapRefresh', function(event) {
	initialize();
		
	if(activeItem){
		google.maps.event.trigger(activeItem, 'click' );
	}

//-----------end initialize function----------------------

});

initialize();

});	

