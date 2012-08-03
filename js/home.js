var currentImg=0;

$(document).ready(function() {
    $('.my-health-progress-bar').simpleProgressBar();
	$('.my-food-progress-bar').simpleProgressBar();
	
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
	
}

function healthClick(){
	window.location="chooseWorkout.html";
}