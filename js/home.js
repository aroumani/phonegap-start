var currentImg=1;
var fatHungry=new Array("images/draco/BabyDraco.gif","images/draco/HealthyDraco.gif",
						"images/draco/HealthyHungryDraco3.gif","images/draco/HealhtyHungryDraco2.gif",
						"images/draco/HealhtyHungryDraco1.gif","images/draco/FatDragoStanding.gif",
						"images/draco/FatHungryDraco1.gif","images/draco/FatHungryDraco2.gif",
						"images/draco/FatDragoThinkingRunning.gif",
						"images/draco/ObeseDracoStanding.gif","images/draco/ObeseHungryDraco1.gif",
						"images/draco/ObeseHungryDraco2.gif","images/draco/ObeseDragoThinkingRunning.gif");

$(document).ready(function() {
	
	
	$("#healthBar").progressbar({});
	$("#healthBar").progressbar( "option", "value", Number(localStorage.health));
	
	$("#hungerBar").progressbar({});
	$("#hungerBar").progressbar( "option", "value", Number(localStorage.hunger));
	
	
	$("#dracoImg").attr("src",fatHungry[0]);
	currentImg++;
	
	window.setInterval(function(){
		if (currentImg==fatHungry.length){
			currentImg=0;
		}

		$("#dracoImg").attr("src",fatHungry[currentImg]);
		currentImg++;
	}, 5000);
	
	checkHealthStatus();
	
});

function checkHealthStatus(){
	
	$('#coins').html("Money: " + localStorage.money);
	
	var today = new Date();
	var first = new Date(today.getFullYear(), 0, 1);
	
	var dayOfYear = Math.round(((today - first) / 1000 / 60 / 60 / 24) + .5, 0);
	var hour = today.getHours(); //Number of hours (0-23);
	var year = Number(today.getFullYear()); //full year
	
	alert(localStorage.initDayOfYear);
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
	window.location="store.html";
}

function healthClick(){
	window.location="chooseWorkout.html";
}