function getLocation(){
  if (navigator.geolocation){
	navigator.geolocation.getCurrentPosition(showPosition);
  }else{
	alert("Geolocation is not availible...");
  }
}


function showPosition(position){
	
	var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	
	var myOptions = {
    zoom: 15,
    center: latlng,
    mapTypeControl: false,
    navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
    mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	var map = new google.maps.Map(document.getElementById("map"), myOptions);
  
	  var marker = new google.maps.Marker({
		  position: latlng, 
		  map: map, 
		  title:"You are here! (at least within a "+position.coords.accuracy+" meter radius)"
	  });
}