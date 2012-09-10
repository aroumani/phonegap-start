var stepGoal=50;
var stepsTaken=1;
var currentImg=0;
var diff="easy";
var isSleeping=false;
var shouldListen=true;
var px=0;
var py=0;
var pz=0;

function onload() {
	
	
	$("#stepBar").progressbar({});
	$("#stepBar").progressbar( "option", "value", 0);
	
	$("#bgImg").attr("src","images/workoutBG3.jpg");
	stepGoal=20;
	totalSeconds=1000;
	secondsRemain=1000;
	
	document.addEventListener("deviceready", onDeviceReady, false);
}
// Cordova is ready
    //
function onDeviceReady() {

	try{
		navigator.notification.vibrate(1250);
	}catch(e){
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
	$("#poopImg").attr("height",(newStepProg)+"%");
	
	$("#stepBar").progressbar( "option", "value", 100-newStepProg);
	
	
	
}

function workoutComplete(success){

	try{
		navigator.notification.vibrate(1250);
		var msg="You have cleaned your Pet! ";
		if (success==false){
			msg="No HP gained.";
		}else{
			
			localStorage.clean= Number(localStorage.clean)-1;
			localStorage.hp= Number(localStorage.hp)+2;
			
			if (Number(localStorage.hp)>100){ //health is over 100
				localStorage.hp=100;
			}
		}
		
		navigator.notification.confirm(
			msg,  // message
			function(button){
				window.location="index.html";
			},              // callback to invoke with index of button pressed
			'Clean Complete',            // title
			'Proceed'          // buttonLabels
		);
	}catch(e){
		window.location="index.html";
	}
	
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