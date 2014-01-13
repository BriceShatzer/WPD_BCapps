var pin_{tag_counter} = new google.maps.Marker({
name:'{tag_name_nolink}',
num:'{tag_counter}',
type:'{tag_type}',
latlng:'{tag_addressglatlng}',
lat:'{tag_addresslatitude}',
lng:'{tag_addresslongitude}',
});

--

var obj_{tag_counter} ={
name:'{tag_name_nolink}',
num:'{tag_counter}',
type:'{tag_type}',
desc:'{tag_description}',
BC_latlng: new google.maps.LatLng({tag_addresslatitude},{tag_addresslongitude}),
custom_lat:'{tag_custom_lat}',
custom_lng:'{tag_custom_lng}',
custom_latlng: new google.maps.LatLng({tag_custom_lat}01,{tag_custom_lng}01),
pin_latlng: function() { 
	if ( !this.custom_lat || !this.custom_lng) 
		{return this.BC_latlng } 
	else {return this.custom_latlng } 
	}
};

var info_{tag_counter} = new google.maps.InfoWindow({
	content: obj_{tag_counter}.desc
});

var pin_{tag_counter} = new google.maps.Marker({
	position: obj_{tag_counter}.pin_latlng(), 
	map: map,
	title: obj_{tag_counter}.name
});

google.maps.event.addListener(pin_{tag_counter}, 'click', function() {
    info_{tag_counter}.open(map,pin_{tag_counter});
  });

--

pin_{tag_counter}.setMap(map);


if( obj_{tag_counter}.custom_lat && obj_{tag_counter}.custom_lng ){ obj_{tag_counter}.BC_latlng } 
	 else { new google.maps.LatLng({ {tag_custom_lat}, {tag_custom_lng} }) }