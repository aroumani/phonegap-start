var currentImg=1;

var playingClip=true;

var obeseHungry=new Array("images/draco/ObeseDracoStanding.gif", "images/draco/ObeseHungryDraco1.gif", "images/draco/ObeseHungryDraco2.gif", "images/draco/ObeseDracoStanding.gif");
var obeseNotHungry=new Array("images/draco/ObeseDracoStanding.gif", "images/draco/ObeseDracoStanding.gif")
var fatHungry=new Array("images/draco/FatDragoThinkingRunning.gif", "images/draco/FatHungryDraco2.gif", "images/draco/FatDragoStanding.gif", "images/draco/FatHungryDraco1.gif");
var fatNotHungry=new Array("images/draco/FatDragoStanding.gif", "images/draco/FatDragoThinkingRunning.gif");
var fitHungry=new Array("images/draco/HealthyDraco.gif", "images/draco/HealhtyHungryDraco1.gif", "images/draco/HealhtyHungryDraco2.gif");
var fitNotHungry=new Array("images/draco/HealthyDraco.gif");

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
	$("#dracoImg").attr("src","images/draco/birth/eggWiggling.gif");
	setTimeout(function(){
		$("#dracoImg").attr("src","images/draco/birth/eggWiggling2.gif");
		setTimeout(function(){
			$("#dracoImg").attr("src","images/draco/birth/dracoBirth.gif");
			setTimeout(function(){
				loadUI();
			}, 20000);
		}, 5000);
	}, 5000);
}

$(document).ready(function() {
	
	var isBorn = loadDatabase();
	
	checkHealthStatus();
	
	$("#healthBar").progressbar({});
	$("#healthBar").progressbar( "option", "value", Number(localStorage.health));
	
	$("#hungerBar").progressbar({});
	$("#hungerBar").progressbar( "option", "value", Number(localStorage.hunger));
	
	if (!isBorn){
		loadUI();
	}

	
	
});

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
	
	$('#coins').html("Money: " + localStorage.money);
	
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
		
		
		localStorage.health = Number(localStorage.health) - hoursPassed*2.4;
		$("#healthBar").progressbar( "option", "value", Number(localStorage.health));
		
		
	}
	
	localStorage.dayOfYear = dayOfYear;
	localStorage.hour = hour;
	localStorage.year = year;

}

function foodClick(){
	if (!playingClip){
		window.location="store.html";
	}
}

function healthClick(){
	if (!playingClip){
		window.location="chooseWorkout.html";
	}
}