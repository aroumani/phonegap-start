var stepGoal=500;
var totalSeconds=300;
var secondsRemain=300;
var stepsTaken=1;
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

	$("#timeBar").progressbar({});
	$("#timeBar").progressbar( "option", "value", 100);
	
	$("#stepBar").progressbar({});
	$("#stepBar").progressbar( "option", "value", 0);
	
	diff=getParameterByName("difficulty");
	if (diff=="easy"){
		$("#bgImg").attr("src","images/workoutBG2.jpg");
		stepGoal=900;
		totalSeconds=600;
		secondsRemain=600;
	}else if (diff=="med"){
		$("#bgImg").attr("src","images/workoutBG3.jpg");
		stepGoal=1800;
		totalSeconds=900;
		secondsRemain=900;
	}else if (diff=="hard"){
		$("#bgImg").attr("src","images/workoutBG4.jpg");
		stepGoal=2800;
		totalSeconds=1800;
		secondsRemain=1800;
	}

	/*timerID2 = window.setInterval(function(){
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
	}, 5000);*/
	
	timerID=window.setInterval(incrementTime, 1000);

	
});

function onload() {
        document.addEventListener("deviceready", onDeviceReady, false);
}
// Cordova is ready
    //
function onDeviceReady() {
	alert('Device Rdy!');
	try{
		navigator.notification.vibrate(1000);
	}catch(e){
		alert(e);
		$("#stepRemain").html(e);
	}
			
	function onSuccess(acceleration) {
		var xx = acceleration.x;
		var yy = acceleration.y;
		var zz = acceleration.z;
		
		
		var dotProduct = (px * xx) + (py * yy) + (pz * zz);
	    var a = Math.abs(Math.sqrt(px * px + py * py + pz * pz));
        var b = Math.abs(Math.sqrt(xx * xx + yy * yy + zz * zz));
		
		if ((a * b)==0){
			dotProduct=1; //dont go to if statement.
		}else{
			dotProduct = dotProduct / (a * b);
		}
		if (dotProduct <= Number(localStorage.sensitivityValue)) {
			if (!isSleeping) {
				isSleeping = true;
				
				//sleep for 300 millis
				setTimeout(function() {
						isSleeping=false;
				}, Number(localStorage.sleepValue));
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

	
	var options = { frequency: Number(localStorage.pollValue) };
	
    var watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
	
	// Register the event listener
    document.addEventListener("backbutton", onBackKeyDown, false);
}

// Handle the back button
function onBackKeyDown() {
}
	
function powerStep(){
	for (i=0; i<1000; i++)
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
		workoutComplete(true);
	}
	
	var newStepProg=((stepGoal-stepsTaken)/stepGoal)*100;
	$("#stepBar").progressbar( "option", "value", 100-newStepProg);
	
	
	
}

function workoutComplete(success){
	navigator.notification.vibrate(1000);
	var msg="You have successfulley completed your workout! ";
	if (success==false){
		msg="You have failed your workout!";
	}
	navigator.notification.confirm(
        msg,  // message
        function(button){
			if (success){
				if (diff=="easy"){
					msg += "You have gained: 3 coins and 11 HP";
					localStorage.money = Number(localStorage.money)+3;
					localStorage.health= Number(localStorage.health)+5;
				}else if (diff=="med"){
					msg += "You have gained: 4 coins and 8 HP";
					localStorage.money = Number(localStorage.money)+4;
					localStorage.health= Number(localStorage.health)+8;
				}else if (diff=="hard"){
					msg += "You have gained: 6 coins and 11 HP";
					localStorage.money = Number(localStorage.money)+6;
					localStorage.health= Number(localStorage.health)+11;
				}
				
				if (Number(localStorage.health)>100){ //health is over 100
					localStorage.health=100;
				}
			}
			window.location="index.html";
		},              // callback to invoke with index of button pressed
        'Workout has ended.',            // title
        'Proceede'          // buttonLabels
    );
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
		timerID=window.clearInterval(timerID);
		timerID2=window.clearInterval(timerID2);
		//perhaps want to make draco stop moving.
		$("#dracoImg").attr("src","images/dragoStationaryBlinking.gif");
		
		if (stepsTaken>=stepGoal){
			workoutComplete(true);
		}else{
			workoutComplete(false);
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