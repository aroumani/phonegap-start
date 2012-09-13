//0.075 cals per step
//110 steps / min
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
var lock=false;

/*var grass_x = 0;
var clouds_x = 0;

function ani_loop() {
		grass_x = grass_x - 1;
		clouds_x = clouds_x - .2;
		document.getElementById('draco').style.backgroundPosition = grass_x+'px 0, '+clouds_x+'px 0';
		t = setTimeout('ani_loop()',10);
}*/
	
function onload() {

	timerID=window.setInterval(incrementTime, 1000);
	$("#stepRemain").html("<b><i>"+(stepGoal-stepsTaken) + " steps left</i></b>");
	$("#cals").html("<b><i>"+Math.round(0.067*stepsTaken) + "~Calories Burned</i></b>");
	$("#timeBar").progressbar({});
	$("#timeBar").progressbar( "option", "value", 100);
	
	$("#stepBar").progressbar({});
	$("#stepBar").progressbar( "option", "value", 0);
	
	diff=getParameterByName("difficulty");
	if (diff=="1"){
		$("#bgImg").attr("src","images/workoutBG2.jpg");
		stepGoal=900;
		totalSeconds=600;
		secondsRemain=600;
	}else if (diff=="2"){
		$("#bgImg").attr("src","images/workoutBG3.jpg");
		stepGoal=1100;
		totalSeconds=600;
		secondsRemain=600;
	}else if (diff=="3"){
		$("#bgImg").attr("src","images/workoutBG4.jpg");
		stepGoal=2200;
		totalSeconds=1200;
		secondsRemain=1200;
	}else if (diff=="4"){
		$("#bgImg").attr("src","images/workoutBG4.jpg");
		stepGoal=2400;
		totalSeconds=1200;
		secondsRemain=1200;
	}
	
	$("#dracoImg").attr("src","images/dracoWalk.gif");
	
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
    $("#stepRemain").html("<b><i>"+(stepGoal-stepsTaken) + " steps left</i></b>");
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
	$("#stepRemain").html("<b><i>"+(stepGoal-stepsTaken) + " steps left</i></b>");
	stepsTaken++;
	if (stepsTaken>=stepGoal){
		shouldListen=false;
		workoutComplete(true);
	}
	
	var newStepProg=((stepGoal-stepsTaken)/stepGoal)*100;
	$("#stepBar").progressbar( "option", "value", 100-newStepProg);
	
	$("#cals").html("<b><i>"+Math.round(0.067*stepsTaken) + "~Calories Burned</i></b>");
	
	
}

function workoutComplete(success){

	try{
		shouldListen=false;
		navigator.notification.vibrate(1250);
		var msg="You have successfully completed your workout! ";
		if (success==false){
			msg="Draco was unable to get the exercise he needed... No HP gained.";
		}else{
			if (Number(localStorage.exercise)!=0){
				if (diff=="1" || diff=="2"){
					localStorage.exercise= Number(localStorage.exercise)-1;
					msg += "You have gained: 5 HP";
					localStorage.hp= Number(localStorage.hp)+5;
				}else{
					if (Number(localStorage.exercise)==1){
						msg += "You have gained: 5 HP";
						localStorage.hp= Number(localStorage.hp)+5;
					}else{
						msg += "You have gained: 10 HP";
						localStorage.hp= Number(localStorage.hp)+10;
					}
					
					localStorage.exercise= Number(localStorage.exercise)-2;
				}
			}
			
			if (Number(localStorage.exercise) < 0){
				localStorage.exercise=0;
			}
			
			if (Number(localStorage.hp)>100){ //health is over 100
				localStorage.hp=100;
			}
		}
		
		navigator.notification.confirm(
			msg,  // message
			function(button){
				window.location="index.html";
			},              // callback to invoke with index of button pressed
			'Workout Complete',            // title
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
	
	$("#timeRemain").html("<b><i>" + timeStr + "</i></b>");
		
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
		
function playpause(){
	shouldListen = !shouldListen;
	if (shouldListen){
		$("#playPauseIcon").attr("src","images/pause.png");
	}else{
		$("#playPauseIcon").attr("src","images/playIcon.png");
	}
	
}

function lockScreen(){
	
	lock=true;
	$.blockUI({ 
	    css: { top: '10px' } ,
            message: "Hold unlock button for 3 Seconds To Unlock"
	});
	  
        $('.blockOverlay').attr('title','Hold to unblock').bind('touchstart',function(event){
		lock=true;
		$('.blockUI').html('3');
		setTimeout(function() {
			if (!lock){return;}
			$('.blockUI').html('2');
			setTimeout(function() {
				if (!lock){return;}
				$('.blockUI').html('1');
				setTimeout(function() {
					if (!lock){return;}
					$('.blockUI').html('0');
					$.unblockUI();
				}, 1000);
			}, 1000);
		}, 1000);
		
		
	});
	
	$('.blockOverlay').attr('title','Hold to unblock').bind('touchend',function(event){
		$('.blockUI').html("Hold for 3 Seconds To Unlock");
		lock=false;
	});
}

function stop(){
	if (shouldListen){
		playpause();
	}
	apprise('Are you sure (No HP will be earned)?', {'confirm':true}, function(r) {
		if(r) { 
			if(typeof(r)=='string'){
			}else{ 
				$('#returns').text('True'); 
					window.location="index.html";
				}
		}else{ 
			$('#returns').text('False');
		}
	});
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