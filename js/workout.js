var stepGoal=500;
var totalSeconds=300;
var secondsRemain=300;
var stepsTaken=0;
var timerID=null;
var timerID2=null;
var currentImg=0;
var diff="easy";
var shouldListen=true;
var prevAx=null;
$(document).ready(function() {

	diff=getParameterByName("difficulty");
	if (diff=="easy"){
		$("#bgImg").attr("src","images/workoutBG2.jpg");
		stepGoal=500;
		totalSeconds=300;
		secondsRemain=300;
	}else if (diff=="med"){
		$("#bgImg").attr("src","images/workoutBG3.jpg");
		stepGoal=1200;
		totalSeconds=600;
		secondsRemain=600;
	}else if (diff=="hard"){
		$("#bgImg").attr("src","images/workoutBG4.jpg");
		stepGoal=2000;
		totalSeconds=900;
		secondsRemain=900;
	}
	
	
    $('.my-step-progress-bar').simpleProgressBar();
	$('.my-time-progress-bar').simpleProgressBar();
		
	timerID2 = window.setInterval(function(){
		currentImg++;
		if (currentImg==3){
			currentImg=0;
		}
		
		if (currentImg==0){ //show first image
			$("#dracoImg").attr("src","images/easyRun.gif");
		}else if(currentImg==1){ //show 2nd image
			$("#dracoImg").attr("src","images/mediumRun.gif");
		}else if(currentImg==2){ //show 3rd image
			$("#dracoImg").attr("src","images/hardRun.gif");
		}
	}, 5000);
	
	timerID=window.setInterval(incrementTime, 1000);

	window.addEventListener("devicemotion", function(event) {
		
		var ax = event.accelerationIncludingGravity.x;
		var ay = event.accelerationIncludingGravity.y;
		var az = event.accelerationIncludingGravity.z;
		if (prevAx == null){
			prevAx=ax;
		}
		
		if (Math.abs(prevAx-ax) > 0.1){
			step();	
		}
	}, true);
	
});

function powerStep(){
	for (i=0; i<100; i++)
	{
		step();
	}
}
function step(){
	if (!shouldListen){
		return;
	}
	stepsTaken++;
	if (stepsTaken>=stepGoal){
		shouldListen=false;
		alert('Workout Success!');
		window.location="index.html";
	}
	
	var newStepProg=((stepGoal-stepsTaken)/stepGoal)*100;
	$('.my-step-progress-bar').attr("data-bar-length", 100-newStepProg);
	$('.my-step-progress-bar').html('');
	$('.my-step-progress-bar').simpleProgressBar();
	
}
function incrementTime() { 

	if (!shouldListen){
		return;
	}
	
	secondsRemain--;
	
	var displaySeconds=secondsRemain;
	var minutes = Math.floor(displaySeconds / 60);
	displaySeconds -= minutes * (60);
	

    var timeStr = (LeadingZero(minutes) + ":" + LeadingZero(displaySeconds));
	
	$("#timeRemain").html("Time Left: <b><i>" + timeStr + "</i></b>");
		
	if (secondsRemain==0){
		shouldListen=false;
		alert('workout done!');
		timerID=window.clearInterval(timerID);
		timerID2=window.clearInterval(timerID2);
		//perhaps want to make draco stop moving.
		$("#dracoImg").attr("src","images/dragoStationaryBlinking.gif");
		
		if (stepsTaken>=stepGoal){
			alert('Workout Success!');
			window.location="index.html";
		}else{
			alert('Workout Failed!');
			window.location="index.html";
		}
	}else{
		var newProg=((totalSeconds-secondsRemain)/totalSeconds)*100;
		$('.my-time-progress-bar').attr("data-bar-length", 100-newProg);
		$('.my-time-progress-bar').html('');
		$('.my-time-progress-bar').simpleProgressBar();
	}
}

function LeadingZero(time) {
        return (time < 10) ? "0" + time : + time;
}

function getParameterByName(name)
{
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}