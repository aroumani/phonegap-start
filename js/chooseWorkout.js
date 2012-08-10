function onload() {
        document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady(){
}

function startWorkout(type){
	if (type==1){
		try{navigator.notification.vibrate(10);}catch(e){}
			window.location="workout.html?difficulty=easy";
	}else if (type==2){
		try{navigator.notification.vibrate(10);}catch(e){}
		window.location="workout.html?difficulty=med";
	}else if (type==3){
		try{navigator.notification.vibrate(10);}catch(e){}
		window.location="workout.html?difficulty=hard";
	}
}