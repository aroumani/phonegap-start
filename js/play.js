    var currXPos = 0, currYPos = 0;;
    var width = 300, height = 300;
    var rectWidth = 20, rectHeight = 20;
    var xDir = 1, yDir = 1, xStep = 2, yStep = 2, interval = 60;
    var changeAccelerationInterval = 4000; //4 seconds
    var changeXDir = true, changeYDir = true;
    var stopAnimation = true;
    var scoreStartTime, acceStartTime = 0;

    var gameOver=false;
    function onload(){
		
		gameOver=false;
		$("#stepBar").progressbar({});
		$("#stepBar").progressbar( "option", "value", 0);
		
		$("#bgImg").attr("src","images/workoutBG3.jpg");
		stepGoal=20;
		totalSeconds=1000;
		secondsRemain=1000;
		
		document.addEventListener("deviceready", onDeviceReady, false);
		
    };
    
	
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
		
		var up=0;
		var right=0;
		if (xx > 0.5){
			xDir=1;
		}else if(xx < 0.5){
			xDir=-1;
		}
		
		if (yy > 0.5){
			yDir=-1;
		}else if(yy < 0.5){
			yDir=1;
		}
	};

	function onError() {
		$("#stepRemain").html("Error watching Acceleration..");
	};

	
	var options = { frequency: Number(localStorage.pollValue) };
	
    var watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
	
	// Register the event listener
    //document.addEventListener("backbutton", onBackKeyDown, false);
	
	can1 = $("#canvas1")[0];
    ctx = can1.getContext("2d");
        
	$(document).keydown(handleKeyDown);
	$(document).keyup(handleKeyUp);
	$("#startBtn").click (startGame);
	startGame();
}

    function startGame()
    {
        xDir = yDir = 1;
        xStep = yStep = 2;
        interval = 60;
        changeXDir = changeYDir = true;
        currXPos = (width / 2) - (rectWidth / 2);
        currYPos = (height / 2) - (rectHeight / 2);
        
        stopAnimation = false;
        scoreStartTime = acceStartTime = (new Date()).getTime();
        $("#startBtn").hide();
        $("#scoreDiv").hide();
        animateFunc();
        intervalId = window.setInterval(animateFunc, interval);
    }
    
    function stopGame()
    {
	gameOver=true;
        var timePlayed = (new Date()).getTime() - scoreStartTime;
        var score = new Number(timePlayed / (1000 * 2)).toFixed(0); 
        /*$("#startBtn").show();
        window.clearInterval(intervalId);
        stopAnimation = true;
        $("#scoreDiv").html("You scored " + score + " points").show();*/
		var play = Number(localStorage.play);
		var hp = Number(localStorage.hp);
		
		if (play!=0){
			localStorage.play= play-1;
			localStorage.hp= hp+5;
		}
		
		navigator.notification.confirm(
			"You scored " + score + " points. Thanks for playing with me!" ,  // message
			function(button){
				window.location="index.html";
			},              // callback to invoke with index of button pressed
			'Play',            // title
			'Proceed'          // buttonLabels
		);
    }
    
    function accelerate()
    {
        if (interval > 3)
            interval -= 3;
        
        xStep++; yStep++;
        window.clearInterval(intervalId);
        acceStartTime = new Date().getTime();
        intervalId = window.setInterval(animateFunc, interval);
    }
    
    function isTimeToaccelerate()
    {
        if (((new Date()).getTime() - acceStartTime) > changeAccelerationInterval)
            return true;
        return false;
    }
    
    function handleKeyDown (event)
    {
        if (stopAnimation || (!changeXDir && !changeYDir))
            return;
        
        if (event.which < 37 || event.which > 40)
            return;
            
        if ((event.which == 38 || event.which == 40) && changeYDir)
        {
            if (event.which == 38) //up
                yDir = -1;
            else //down
                yDir = 1; 
            changeYDir = false;
            event.preventDefault();
        } 
        else if ((event.which == 37 || event.which == 39) && changeXDir)
        {
            if (event.which == 37) //left
                xDir = -1;
            else // right
                xDir = 1;
            changeXDir = false;
            event.preventDefault();
        }
    }
    
    function handleKeyUp (event)
    {
        switch (event.which)
        {
            case 38: //up
            case 40: //down
                changeYDir = true;
                event.preventDefault();
                break;
            case 37: //left
            case 39: //right
                changeXDir = true;
                event.preventDefault();
                break;
        }
    }
    
    function animateFunc()
    {
        ctx.beginPath();
        ctx.clearRect(0,0,width,height);
		ctx.fillStyle = '#8ED6FF';
        ctx.rect(currXPos,currYPos, rectWidth,rectHeight);
        ctx.stroke();
		
        
        currXPos += xStep * xDir;
        currYPos += yStep * yDir;
        
        if (currXPos <= 0 || currXPos >= (width - rectWidth) ||
            currYPos <= 0 || currYPos >= (height - rectHeight))
        {
            stopGame();
            return;
        }
    
        if (isTimeToaccelerate())
            accelerate();
    }
    
    // get random number between X and Y
    function getRand(x, y) {
        return Math.floor(Math.random()*y)+x;
    }    