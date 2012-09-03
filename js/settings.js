function resetGame(type){
	apprise('Are you sure?', {'confirm':true}, function(r) {
		if(r) { 
			if(typeof(r)=='string'){
			}else{ 
				$('#returns').text('True'); 
					localStorage.day=0;
					localStorage.clear();
					window.location="index.html";
				}
		}else{ 
			$('#returns').text('False');
		}
	});
}


$(function() {
		$( "#sensitivitySlider" ).slider({ max: 100, min: 55, value: Number(localStorage.sensitivityValue)*100});
		$( "#sensitivitySlider" ).slider({
			change: function(event, ui) {
				localStorage.sensitivityValue= $("#sensitivitySlider" ).slider ("value")/100;
			}
		});
});