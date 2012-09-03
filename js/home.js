var currentImg=1;

var playingClip=true;

//var obeseHungry=new Array("images/ObeseDracoStanding.gif", "images/ObeseHungryDraco1.gif", "images/ObeseHungryDraco2.gif", "images/ObeseDragoThinkingRunning.gif");
var obeseNotHungry=new Array("images/ObeseDracoStanding.gif", "images/ObeseDragoThinkingRunning.gif")
//var fatHungry=new Array("images/FatDragoThinkingRunning.gif", "images/FatHungryDraco2.gif", "images/FatDragoStanding.gif", "images/FatHungryDraco1.gif");
var fatNotHungry=new Array("images/FatDragoStanding.gif", "images/FatDragoThinkingRunning.gif");
//var fitHungry=new Array("images/HealthyDraco.gif", "images/HealhtyHungryDraco1.gif", "images/HealhtyHungryDraco2.gif");
var fitNotHungry=new Array("images/HealthyDraco.gif");

function loadDatabase(){
	if(typeof(Storage)!=="undefined"){
		var day = localStorage.day;
		if (!day || day==0){
					
			localStorage.day=1;
			localStorage.money=1;
			localStorage.debug="true";
			localStorage.sleepValue="280";
			localStorage.pollValue="50";
			localStorage.sensitivityValue="0.89";
			localStorage.totalDays=60;
			localStorage.hp=80;
			
			//Last time settings
			var today = new Date();
			var first = new Date(today.getFullYear(), 0, 1);
	
			var dayOfYear = Math.round(((today - first) / 1000 / 60 / 60 / 24) + .5, 0);
			var hour = today.getHours(); //Number of hours (0-23);
			var year = Number(today.getFullYear()); //full year
			
			localStorage.year=year;
			localStorage.day=dayOfYear;
			localStorage.hour=hour;
			
			localStorage.startDay=dayOfYear;
			localStorage.startYear=year;
			
			//counter limits
			localStorage.exercise=2;
			localStorage.food=1;
			localStorage.play=1;
			localStorage.clean=1;
			localStorage.work=1;
			
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

	
	$("#healthSection").hide();
	$("#workoutButton").hide();
	$("#foodButton").hide();
	$("#playButton").hide();
	$("#cleanButton").hide();

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
	
	//checkHealthStatus();
	
	updateHP();
	
	$("#healthBar").progressbar({});
	$("#healthBar").progressbar( "option", "value", Number(localStorage.hp));
	
	//$("#hungerBar").progressbar({});
	//$("#hungerBar").progressbar( "option", "value", Number(localStorage.hunger));
	
	if (!isBorn){
		loadUI();
	}
	
};

function updateHP(){
	var today = new Date();
	var first = new Date(today.getFullYear(), 0, 1);
	var dayOfYear = Math.round(((today - first) / 1000 / 60 / 60 / 24) + .5, 0);
	var hour = today.getHours(); //Number of hours (0-23);
	var year = Number(today.getFullYear()); //full year
	

	var prevYear = Number(localStorage.year);
	var prevDay = Number(localStorage.dayOfYear);
	var prevHour = Number(localStorage.hour);
	var prevHP = Number(localStorage.hp);
	
	//counter limits
	var e = Number(localStorage.exercise);
	var f = Number(localStorage.food);
	var p = Number(localStorage.play);
	var c = Number(localStorage.clean);
	var w = Number(localStorage.work);
	
	var daysPassed=getDaysPassed();
	
	var extraMorning = 1;
	if (prevHour>6){
		extraMorning=1;
	}else{
		extraMorning=0;
	}
	
	var extraAfternoon = 1;
	if (prevHour>18){
		extraAfternoon=1;
	}else{
		extraAfternoon=0;
	}
	
	if ((prevHour < 6 && hour >= 6) || (daysPassed >= 1)){ //Started Before 6am.
		prevHP -= 15 + (15 * daysPassed) - (15 * extraMorning);
		e += 2 + (2 * daysPassed) - (2 * extraMorning);
		f += 1 + (1 * daysPassed) - (1 * extraMorning);
		p += 0 + (0 * daysPassed) - (0 * extraMorning);
		c += 1 + (1 * daysPassed) - (1 * extraMorning);
		w += 1 + (1 * daysPassed) - (1 * extraMorning);
	}
	
	
	if ((prevHour < 18 && hour >=  18) || (daysPassed >= 1)){ //Started Before 6am.
		prevHP -= 10 + (10 * daysPassed) - (10 * extraAfternoon);
		e += 0 + (0 * daysPassed) - (0 * extraAfternoon);
		f += 1 + (1 * daysPassed) - (1 * extraAfternoon);
		p += 1 + (1 * daysPassed) - (1 * extraAfternoon);
		c += 1 + (1 * daysPassed) - (1 * extraAfternoon);
		w += 0 + (0 * daysPassed) - (0 * extraAfternoon);
	}
	
	
	if (w>1){ //make sure work never goes over 1
		w=1;
	}
	
	localStorage.year=year;
	localStorage.dayOfYear=dayOfYear;
	localStorage.hour=hour;
	localStorage.hp=prevHP;
	localStorage.exercise=e;
	localStorage.food=f;
	localStorage.play=p;
	localStorage.clean=c;
	localStorage.work=w;
	
}

function getDaysPassed(){
	//set day in program
	var today = new Date();
	var first = new Date(today.getFullYear(), 0, 1);
	
	var dayOfYear = Math.round(((today - first) / 1000 / 60 / 60 / 24) + .5, 0);
	var hour = today.getHours(); //Number of hours (0-23);
	var year = Number(today.getFullYear()); //full year
	
			
	var startDay =  Number(localStorage.dayOfYear);
	var startYear = Number(localStorage.year);
	
	var currnetDay=0;
	
	if (year==startYear){ //same year
		currnetDay=dayOfYear-startDay;
	}else{
		var daysPassedInLastYear = Math.abs(364-startDay);
		currnetDay = daysPassedInLastYear+dayOfYear;
	}

	return currnetDay;
}

function loadUI(){

	$("#healthSection").show();
	$("#workoutButton").show();
	$("#foodButton").show();
	$("#playButton").show();
	$("#cleanButton").show();
	
	var health = Number(localStorage.hp);
	
	var arrToUse = fitNotHungry;
	
	if (health < 33){
		arrToUse=obeseNotHungry;
	}else if (health < 66){
		arrToUse=fatNotHungry;
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
	
	$('#coins').html("$:" + localStorage.money);
	
	//set day in program
	var today = new Date();
	var first = new Date(today.getFullYear(), 0, 1);
	
	var dayOfYear = Math.round(((today - first) / 1000 / 60 / 60 / 24) + .5, 0);
	var hour = today.getHours(); //Number of hours (0-23);
	var year = Number(today.getFullYear()); //full year
	
			
	var startDay =  Number(localStorage.startDay);
	var startYear = Number(localStorage.startYear);
	
	var currnetDay=1;
	
	if (year==startYear){ //same year
		currnetDay=dayOfYear-startDay+1;
	}else{
		var daysPassedInLastYear = Math.abs(364-startDay)+1;
		currnetDay = daysPassedInLastYear+dayOfYear;
	}
	
	localStorage.day=currnetDay;
	
	$('#days').html("Day: " + localStorage.day + " of " + localStorage.totalDays);
	
	if (currnetDay > Number(localStorage.totalDays)){
		//Draco is gone now....
		alert('The game is over...draco is gone...good job..');
	}
					
	//Set icons based on counts.
	
	if (Number(localStorage.exercise>=2)){
		$("#workoutButton").attr("src","images/runFlashingRed.gif");
	}else if (Number(localStorage.exercise==1)){
		$("#workoutButton").attr("src","images/runFlashing.gif");
	}else{
		$("#workoutButton").attr("src","images/run.png");
	}
	
	if (Number(localStorage.food>=2)){
		$("#foodButton").attr("src","images/foodFlashingRed.gif");
	}else if (Number(localStorage.food==1)){
		$("#foodButton").attr("src","images/foodFlashing.gif");
	}else{
		$("#foodButton").attr("src","images/food.png");
	}
	
	if (Number(localStorage.play>=2)){
		$("#playButton").attr("src","images/playRedFlashing.gif");
	}else if (Number(localStorage.play==1)){
		$("#playButton").attr("src","images/playFlashing.gif");
	}else{
		$("#playButton").attr("src","images/play.png");
	}
	
	if (Number(localStorage.clean>=2)){
		$("#cleanButton").attr("src","images/tolietFlashingRed.gif");
	}else if (Number(localStorage.clean==1)){
		$("#cleanButton").attr("src","images/tolietFlashing.gif");
	}else{
		$("#cleanButton").attr("src","images/toilet.png");
	}
	
	
}

function workout(){
	if (!playingClip){
	
		var exercise = Number(localStorage.exercise);
		var hp = Number(localStorage.hp);
		
		if (exercise>=1){
			navigator.notification.vibrate(15);
			window.location="chooseWorkout.html";
		}else{
			alert("I dont feel like running right now.");
		}
	}
}

function play(){
	if (!playingClip){
		var play = Number(localStorage.play);
		var hp = Number(localStorage.hp);
		
		if (play>=1){
			navigator.notification.vibrate(15);
			window.location="play.html";
		}else{
			alert("I dont feel like playing right now.");
		}
	}
}

function work(){
	if (!playingClip){
	
		var work = Number(localStorage.work);
		var money = Number(localStorage.money);
		var hp = Number(localStorage.hp) / 100;
		
		if (work>=1){
			localStorage.work= work-1;
			localStorage.money= money+ Math.round(10*hp);
			alert("I went to work and earned "+ (Math.round(10*hp)) +" Dollars! Tip: To maximize earnings, keep my HP as high as possible.");
			window.location="index.html";
		}else{
			alert("I'm tired...I cant work any more today...");
		}
		
	}
}
function food(){
	
	if (!playingClip){
	
		var money = Number(localStorage.money);
		var food = Number(localStorage.food);
		var hp = Number(localStorage.hp);
		//Add logic to figure out what popup should say
		//Since money for this version is only used for food, just use as much as you need
		//One serving is 5HP
		try{
			navigator.notification.vibrate(15);
		}catch(e){}
		if (food < 1){
			alert("I'm Not Hungry!!");
			return;
		}
		if (money >= 3){
			money -=3;
			food -= 1;
			localStorage.food= food;
			localStorage.money= money;
			localStorage.hp= hp+3;
			
			if (food >= 1){
				alert("Thanks, that cost you 3 dollars. I have gained 3HP! I'm still hungry...");
			}else{
				alert("Thanks, that cost you 3 dollars. I have gained 3HP!");
			}
			
		}else{
			alert('Not enough money! Work to earn some cash!');
		}	
		
		window.location="index.html";
	}
}

function clean(){

	var clean = Number(localStorage.clean);
	var hp = Number(localStorage.hp);
		
	if (clean>=1){
		window.location="clean.html";
	}else{
		alert("I'm already clean!");
	}

	//window.location="clean.html";
}
