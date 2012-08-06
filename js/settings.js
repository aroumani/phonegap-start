function resetGame(type){
	//should probably warn the user:
	localStorage.day=null;
	localStorage.clear();
	alert('Game has been reset');
	window.location="index.html";
}

$(function() {
		$( "#sensitivitySlider" ).slider({ max: 100, min: 55, value: Number(localStorage.sensitivityValue)*100});
		$( "#sensitivitySlider" ).slider({
			change: function(event, ui) {
				localStorage.sensitivityValue= $("#sensitivitySlider" ).slider ("value")/100;
			}
		});
});