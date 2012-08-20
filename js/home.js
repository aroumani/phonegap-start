var currentImg=1;

var playingClip=true;

var obeseHungry=new Array("images/ObeseDracoStanding.gif", "images/ObeseHungryDraco1.gif", "images/ObeseHungryDraco2.gif", "images/ObeseDragoThinkingRunning.gif");
var obeseNotHungry=new Array("images/ObeseDracoStanding.gif", "images/ObeseDragoThinkingRunning.gif")
var fatHungry=new Array("images/FatDragoThinkingRunning.gif", "images/FatHungryDraco2.gif", "images/FatDragoStanding.gif", "images/FatHungryDraco1.gif");
var fatNotHungry=new Array("images/FatDragoStanding.gif", "images/FatDragoThinkingRunning.gif");
var fitHungry=new Array("images/HealthyDraco.gif", "images/HealhtyHungryDraco1.gif", "images/HealhtyHungryDraco2.gif");
var fitNotHungry=new Array("images/HealthyDraco.gif");

function loadDatabase(){
	if(typeof(Storage)!=="undefined"){
		var day = localStorage.day;
		if (!day || day==0){
					
			localStorage.day=1;
			localStorage.money=0;
			localStorage.debug="true";
			localStorage.sleepValue="280";
			localStorage.pollValue="50";
			localStorage.sensitivityValue="0.86";
			localStorage.health=100;
			localStorage.hunger=49;
			localStorage.totalDays=60;
			
			navigator.notification.vibrate(100);
			playBirth();
			return true;
		}
	}else{
		alert('Opps! Serious error...your device does not support web storage...');
	}
	return false;
}

function playBirth(){
	playingClip=true;
	$("#dracoImg").attr("src","images/eggWiggling.gif");
	setTimeout(function(){
		$("#dracoImg").attr("src","images/eggWiggling2.gif");
		setTimeout(function(){
			$("#dracoImg").attr("src","images/dracoBirthWide.gif");
			setTimeout(function(){
				loadUI();
			}, 20000);
		}, 5000);
	}, 5000);
}

function onPageLoad(){
	document.addEventListener("deviceready", phonegapReady, false);
}

function onPause() {
alert('Pausing application');
}

function onResume() {
alert('Resuming Application');
}

function phonegapReady(){
	document.addEventListener("resume", onResume, false);
	document.addEventListener("pause", onPause, false);
	document.addEventListener("backbutton", function(){}, false);
	
	var isBorn = loadDatabase();
	
	checkHealthStatus();
	
	$("#healthBar").progressbar({});
	$("#healthBar").progressbar( "option", "value", Number(localStorage.health));
	
	//$("#hungerBar").progressbar({});
	//$("#hungerBar").progressbar( "option", "value", Number(localStorage.hunger));
	
	if (!isBorn){
		loadUI();
	}
	
};

function loadUI(){

	var health = Number(localStorage.health);
	var hunger = Number(localStorage.hunger);
	
	var arrToUse = fitNotHungry;
	if (health < 33 && hunger<50){
		arrToUse=obeseHungry;
	}else if (health < 33){
		arrToUse=obeseNotHungry;
	}else if (health < 66 && hunger<50){
		arrToUse=fatHungry;
	}else if (health < 66){
		arrToUse=fatNotHungry;
	}else if (health >= 66 && hunger <50){
		arrToUse=fitHungry;
	}else{
		arrToUse=fitNotHungry;
	}
	
	$("#dracoImg").attr("src",arrToUse[0]);
	currentImg++;
	
	window.setInterval(function(){
		if (currentImg==arrToUse.length){
			currentImg=0;
		}

		$("#dracoImg").attr("src",arrToUse[currentImg]);
		currentImg++;
	}, 5000);
	
	playingClip=false;
	
	$("#healthScore").html(health + "%");
	$("#hungerScore").html(hunger + "%");
}

function checkHealthStatus(){
	
	$('#coins').html("$: " + localStorage.money);
	
	var today = new Date();
	var first = new Date(today.getFullYear(), 0, 1);
	
	var dayOfYear = Math.round(((today - first) / 1000 / 60 / 60 / 24) + .5, 0);
	var hour = today.getHours(); //Number of hours (0-23);
	var year = Number(today.getFullYear()); //full year
	
	if (!localStorage.initDayOfYear){
		localStorage.initDayOfYear=dayOfYear;
		localStorage.initYear=year;
		localStorage.day=1;
		
	}else{
		var initDayOfYear =  Number(localStorage.initDayOfYear);
		var initYear = Number(localStorage.initYear);
		
		var currnetDay=1;
		if (year==initYear){
			currnetDay=dayOfYear-initDayOfYear+1;
		}else{
			var daysPassedInLastYear = Math.abs(364-initDayOfYear)+1;
			currnetDay = daysPassedInLastYear+dayOfYear;
		}
		
		localStorage.day=currnetDay;
	}
	
	$('#days').html("Day: " + localStorage.day + " of " + localStorage.totalDays);
	if (localStorage.dayOfYear){
	
	
		var prevDayOfYear = Number(localStorage.dayOfYear);
		var prevHour = Number(localStorage.hour);
		var prevYear = Number(localStorage.year);
		
		var hoursPassed=0;
		//Lets compute how many hours have passed since they have played last..
		//Same Day:
		if (prevYear==year && prevDayOfYear==dayOfYear){ //same day
			hoursPassed=hour-prevHour;
		}else if (prevYear==year){ //same year different day
			var hoursPassedOnFirstDay=23-prevHour;
			var daysPassed=dayOfYear-prevDayOfYear+1;
			var hoursInDaysNotPlayed=daysPassed*24;
			var hoursMissedInCurrentDay=hour;
			
			hoursPassed=hoursPassedOnFirstDay+hoursInDaysNotPlayed+hoursMissedInCurrentDay
		}else{ //year has changed
			var hoursPassedOnFirstDay=23-prevHour;
			var daysLastYearPassed=Math.abs(364-prevDayOfYear);
			var daysThisYearPassed=dayOfYear;
			var hoursInDaysNotPlayed=(daysLastYearPassed+daysThisYearPassed)*24;
			var hoursMissedInCurrentDay=hour;
			
			hoursPassed=hoursPassedOnFirstDay+hoursInDaysNotPlayed+hoursMissedInCurrentDay;
		}
		
		
		localStorage.health = Number(localStorage.health) - hoursPassed*2;
		$("#healthBar").progressbar( "option", "value", Number(localStorage.health));
		
		
	}
	
	localStorage.dayOfYear = dayOfYear;
	localStorage.hour = hour;
	localStorage.year = year;

}

function workout(){
	if (!playingClip){
		navigator.notification.vibrate(15);
		window.location="chooseWorkout.html";
	}
}

function play(){
	if (!playingClip){
		navigator.notification.vibrate(15);
		window.location="choosePlay.html";
	}
}

function work(){
	alert("I went to work and earned 10 Dollars! Tip: To maximize earnings, keep my HP as high as possible.");
}
function food(){
	if (!playingClip){
		//Add logic to figure out what popup should say
		//Since money for this version is only used for food, just use as much as you need
		//One serving is 5HP
		try{
			navigator.notification.vibrate(15);
		}catch(e){}
		if (true){
			alert("Thanks, that cost you 5 dollars. I have gained 5HP! I'm still hungry...");
			alert("Thanks, that cost you 5 dollars. I have gained 5HP!");
		}else{
			alert('That will cost you 5 dollars.');
		}	
	}
}

function clean(){
	window.location="clean.html";
}
