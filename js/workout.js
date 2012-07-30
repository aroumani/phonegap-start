var stepGoal=500;
var secondsRemain=300;
var stepsTaken=0;
var timerID=null;
var shouldListen=true;
var prevAx=null;
$(document).ready(function() {
    $('.my-step-progress-bar').simpleProgressBar();
	$('.my-time-progress-bar').simpleProgressBar();
	
	timerID=window.setInterval(incrementTime, 1000);

	window.addEventListener("devicemotion", function(event) {
		
		var ax = event.accelerationIncludingGravity.x;
		var ay = event.accelerationIncludingGravity.y;
		var az = event.accelerationIncludingGravity.z;
		step();
		/*if (prevAx == null || Math.abs(prevAx-ax) > 0.1){
			prevAx=ax;
			
		}*/

}, true);
});

function step(){
	if (!shouldListen){
		return;
	}
	stepsTaken++;
	if (stepsTaken>=stepGoal){
		shouldListen=false;
		alert('done');
		return;
	}
	
	var newStepProg=((stepGoal-stepsTaken)/stepGoal)*100;
	$('.my-step-progress-bar').attr("data-bar-length", 100-newStepProg);
	$('.my-step-progress-bar').html('');
	$('.my-step-progress-bar').simpleProgressBar();
	
}
function incrementTime() { 
	secondsRemain--;
	if (secondsRemain==0){
		alert('workout done!');
		timerID=window.clearInterval(timerID);
	}else{
		var newProg=((300-secondsRemain)/300)*100;
		$('.my-time-progress-bar').attr("data-bar-length", 100-newProg);
		$('.my-time-progress-bar').html('');
		$('.my-time-progress-bar').simpleProgressBar();
	}
}

