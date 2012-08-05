var stepGoal=500;
var totalSeconds=300;
var secondsRemain=300;
var stepsTaken=0;
var timerID=null;
var timerID2=null;
var currentImg=0;
var diff="easy";
var isSleeping=false;
var shouldListen=true;
var px=0;
var py=0;
var pz=0;

$(document).ready(function() {

	document.addEventListener("deviceready", onDeviceReady, false);

	$("#timeBar").progressbar({});
	$("#timeBar").progressbar( "option", "value", 100);
	
	$("#stepBar").progressbar({});
	$("#stepBar").progressbar( "option", "value", 0);
	
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

	
});

// Cordova is ready
    //
function onDeviceReady() {
	
	function onSuccess(acceleration) {
		var xx = acceleration.x;
		var yy = acceleration.y;
		var zz = acceleration.z;
		
		
		var dotProduct = (px * xx) + (py * yy) + (pz * zz);
	    var a = Math.abs(Math.sqrt(px * px + py * py + pz * pz));
        var b = Math.abs(Math.sqrt(xx * xx + yy * yy + zz * zz));
		
		dotProduct = dotProduct / (a * b);
		if (dotProduct==0){
			1; //dont go to if statement.
		}else{
			dotProduct = dotProduct / (a * b);
		}
		if (dotProduct <= 0.82) {
			if (!isSleeping) {
				isSleeping = true;
				
				//sleep for 300 millis
				setTimeout(function() {
						isSleeping=false;
				}, 300);
				step();
			}
		}
    
		px = xx; 
		py = yy; 
		pz = zz;
	};

	function onError() {
		$("#stepRemain").html("Error watching Acceleration..");
	};

	var options = { frequency: 100 };
	
    var watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
}
	
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
	$("#stepRemain").html("Steps: <b><i>" + stepsTaken + " of " + stepGoal + "</i></b>");
	stepsTaken++;
	if (stepsTaken>=stepGoal){
		shouldListen=false;
		alert('Workout Success!');
		window.location="index.html";
	}
	
	var newStepProg=((stepGoal-stepsTaken)/stepGoal)*100;
	$("#stepBar").progressbar( "option", "value", 100-newStepProg);
	
	
	
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
	
	$("#timeRemain").html("Time: <b><i>" + timeStr + "</i></b>");
		
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
		$("#timeBar").progressbar( "option", "value", 100-newProg);
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