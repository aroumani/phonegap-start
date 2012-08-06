var currentImg=0;

$(document).ready(function() {
	
	
	$("#healthBar").progressbar({});
	$("#healthBar").progressbar( "option", "value", Number(localStorage.health));
	
	$("#hungerBar").progressbar({});
	$("#hungerBar").progressbar( "option", "value", Number(localStorage.hunger));
	
	
	window.setInterval(function(){
		currentImg++;
		if (currentImg==2){
			currentImg=0;
		}
		
		if (currentImg==0){ //show first image
			$("#dracoImg").attr("src","images/dragoStationaryBlinking.gif");
		}else if(currentImg==1){ //show 2nd image
			$("#dracoImg").attr("src","images/dragoStationaryTailMoving.gif");
		}
	}, 5000);
});

function foodClick(){
	window.location="store.html";
}

function healthClick(){
	window.location="chooseWorkout.html";
}