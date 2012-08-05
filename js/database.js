$(document).ready(function() {
	if(typeof(Storage)!=="undefined"){
		var day = localStorage.day;
		if (!day){
			alert('Welcome to Draco...');
			localStorage.day=1;
			localStorage.money=0;
			localStorage.health=100;
			localStorage.hunger=50;
			localStorage.totalDays=60;
			window.location.reload();
		}
	}else{
		alert('Opps! Serious error...your device does not support web storage...');
	}
});