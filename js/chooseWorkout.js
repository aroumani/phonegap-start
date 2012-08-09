document.addEventListener("deviceready", function(){
	alert('device is readyy');
});

function startWorkout(type){
	var platform="blackberry";
	try{
		platform = device.platform;
	}catch(e){}
	
	if (type==1){
		if (platform != null && platform.toLowerCase().indexOf("androi") != -1){
			navigator.notification.vibrate(10);
			navigator.app.loadUrl("workout.html?difficulty=easy");
		}else{
			window.location="workout.html?difficulty=easy";
		}
	}else if (type==2){
		if (platform != null && platform.toLowerCase().indexOf("androi") != -1){
			navigator.notification.vibrate(10);
			navigator.app.loadUrl("workout.html?difficulty=med");
		}else{
			window.location="workout.html?difficulty=med";
		}
	}else if (type==3){
		if (platform != null && platform.toLowerCase().indexOf("androi") != -1){
			navigator.notification.vibrate(10);
			navigator.app.loadUrl("workout.html?difficulty=hard");
		}else{
			window.location="workout.html?difficulty=hard";
		}
	}
}