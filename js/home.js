var currentImg=1;
var tutorialImage=0;
var playingClip=true;
var playingTutorial=false;
var dracoClickIgnor=true;

var tutorialImages=new Array("images/tutorial1.gif", "images/tutorial2.gif", "images/tutorial3.gif", "images/tutorial4.gif", "images/tutorial5.gif");
//var obeseHungry=new Array("images/ObeseDracoStanding.gif", "images/ObeseHungryDraco1.gif", "images/ObeseHungryDraco2.gif", "images/ObeseDragoThinkingRunning.gif");
var obeseNotHungry=new Array("images/ObeseDracoStanding.gif", "images/ObeseDragoThinkingRunning.gif")
//var fatHungry=new Array("images/FatDragoThinkingRunning.gif", "images/FatHungryDraco2.gif", "images/FatDragoStanding.gif", "images/FatHungryDraco1.gif");
var fatNotHungry=new Array("images/FatDragoStanding.gif", "images/FatDragoThinkingRunning.gif");
//var fitHungry=new Array("images/HealthyDraco.gif", "images/HealhtyHungryDraco1.gif", "images/HealhtyHungryDraco2.gif");
var fitNotHungry=new Array("images/dragoStationaryTailMoving.gif", "images/dragoStationaryBlinking.gif");

var thoughts=new Array("images/ballonBlank.png", "images/ballonHeart.png", "images/ballonPlay.png", "images/ballonWalks.png", "images/ballonSup.png", "images/ballonPetting.png", "images/ballonLikeYou.png", "images/ballonHi.png", "images/ballonHealth.png");


function dracoClick(){
	
	if(dracoClickIgnor){
		return;
	}
	
	dracoClickIgnor=true;
	$("#thoughts").attr("src", thoughts[Math.floor(Math.random()*thoughts.length)]);
	$("#thoughts").show();
	setTimeout(function(){
		dracoClickIgnor=false;
		$("#thoughts").hide();
		
	}, 2750);
	
}


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
	$('#healthSection').fadeIn('15000', function() {
	});
	$("#workoutButton").hide();
	$("#foodButton").hide();
	$("#thoughts").hide();
	$("#playButton").hide();
	$("#cleanButton").hide();

	playingClip=true;
	playingTutorial=false;
	$("#dracoImg").attr("src","images/eggWiggling.gif");
	setTimeout(function(){
		navigator.notification.vibrate(1000);
		$("#dracoImg").attr("src","images/eggWiggling2.gif");
		setTimeout(function(){
			navigator.notification.vibrate(2000);
			try{
				var snd = new Audio("sounds/testSound.mp3"); // buffers automatically when created
				snd.load();
				snd.play();
			}catch(e){}

			
			$("#dracoImg").attr("src","images/dracoBirthWide.gif");
			setTimeout(function(){
				playingTutorial=true;
				tutorial();
			}, 20000);
		}, 5000);
	}, 5000);
}

function deathScene(){
	
	localStorage.day=0;
	localStorage.clear();
	
	$("#h").hide();
	$("#healthSection").hide();
	$("#workoutButton").hide();
	$("#foodButton").hide();
	$("#thoughts").hide();
	$("#playButton").hide();
	$("#cleanButton").hide();
	$("#dracoImg").hide();
	
	$('#h').fadeOut('slow', function() {});
	$('#healthSection').fadeOut('slow', function() {});
	$('#workoutButton').fadeOut('slow', function() {});
	$('#foodButton').fadeOut('slow', function() {});
	$('#thoughts').fadeOut('slow', function() {});
	$('#playButton').fadeOut('slow', function() {});
	$('#cleanButton').fadeOut('slow', function() {});
	$('#dracoImg').fadeOut('slow', function() {});
	
	setTimeout(function(){
		$('#backgrImg').hide();
		$("#backgrImg").attr("src", "images/dracoDeath.gif");
		$('#backgrImg').fadeIn	('slow', function() {});
		$("#content").click(function() {
			window.location="index.html";
		});
	}, 500);
	
}

function tutorial(){
	if (playingClip && !playingTutorial){return;}
	
	$("#h").hide();
	$("#healthSection").hide();
	$("#workoutButton").hide();
	$("#foodButton").hide();
	$("#thoughts").hide();
	$("#playButton").hide();
	$("#cleanButton").hide();
	$("#dracoImg").hide();
	
	$('#h').fadeOut('slow', function() {});
	$('#healthSection').fadeOut('slow', function() {});
	$('#workoutButton').fadeOut('slow', function() {});
	$('#foodButton').fadeOut('slow', function() {});
	$('#thoughts').fadeOut('slow', function() {});
	$('#playButton').fadeOut('slow', function() {});
	$('#cleanButton').fadeOut('slow', function() {});
	$('#dracoImg').fadeOut('slow', function() {});
	
	playingClip=true;
	tutorialImage=0;
	
	setTimeout(function(){
		$('#backgrImg').hide();
		$("#backgrImg").attr("src", tutorialImages[tutorialImage]);
		$('#backgrImg').fadeIn	('slow', function() {});
		$("#content").click(function() {
			nextTutorialSlide();
		});
	}, 500);
	
}

function nextTutorialSlide(){
	tutorialImage++;
	if (tutorialImage >= tutorialImages.length){
		playingTutorial=false;
		playingClip=false;
		$("#content").unbind('click');
		$('#backgrImg').hide();
		$("#backgrImg").attr("src", "images/bg1.jpg");
		$('#backgrImg').fadeIn	(1000, function() {});
		loadUI();
	}else{
		$('#backgrImg').hide();
		$("#backgrImg").attr("src", tutorialImages[tutorialImage]);
		$('#backgrImg').fadeIn	('slow', function() {});
	}
}

function onPageLoad(){
	document.addEventListener("deviceready", phonegapReady, false);
}

function onPause() {
//alert('Pausing application');
}

function onResume() {
//alert('Resuming Application');
}

function phonegapReady(){
	document.addEventListener("resume", onResume, false);
	document.addEventListener("pause", onPause, false);
	document.addEventListener("backbutton", function(){}, false);
	
	var isBorn = loadDatabase();
	
	//checkHealthStatus();
	
	isBorn = isBorn || updateHP();
	
	$("#healthBar").progressbar({});
	$("#healthBar").progressbar( "option", "value", Number(localStorage.hp));
	
	//$("#hungerBar").progressbar({});
	//$("#hungerBar").progressbar( "option", "value", Number(localStorage.hunger));
	
	if (!isBorn){
		loadUI();
	}
	
	setTimeout(function(){
		window.location="index.html";
	}, 30000000);
	
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
	
	if (prevHP<=0){
		deathScene();
		return true;
	}else{
		return false;
	}
}

function getDaysPassed(){
	//set day in program
	var today = new Date();
	var first = new Date(today.getFullYear(), 0, 1);
	
	var dayOfYear = Math.round(((today - first) / 1000 / 60 / 60 / 24) + .5, 0);
	var hour = today.getHours(); //Number of hours (0-23);
	var year = Number(today.getFullYear()); //full year
				
	var startDay =  Number(localStorage.startDay);
	var startYear = Number(localStorage.startYear);
	
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

	try{
		var snd = new Audio("sounds/select.ogg"); // buffers automatically when created
		snd.load();
		snd.play();
	}catch(e){}
	
	$("#h").show();
	$("#dracoImg").show();
	$("#healthSection").show();
	$("#workoutButton").show();
	$("#foodButton").show();
	$("#playButton").show();
	$("#cleanButton").show();
	$("#thoughts").hide();
	dracoClickIgnor=false;
	
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
	
	$('#coins').html("$" + localStorage.money);
	
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
			window.location="chooseWorkout.html";
		}else{
			apprise("Draco will not earn any HP for this workout, are you sure you want to continue?", {'confirm':true}, function(r) {
				if(r) { 
					if(typeof(r)=='string'){
					}else{ 
						$('#returns').text('True'); 
							window.location="chooseWorkout.html";
						}
				}else{ 
					$('#returns').text('False');
				}
			});
		}
	}
}

function play(){
	if (!playingClip){
		var play = Number(localStorage.play);
		var hp = Number(localStorage.hp);
		
		if (play>=1){
			window.location="play.html";
		}else{
			apprise("Draco will not earn any HP for playing, are you sure you want to continue?", {'confirm':true}, function(r) {
				if(r) { 
					if(typeof(r)=='string'){
					}else{ 
						$('#returns').text('True'); 
							window.location="play.html";
						}
				}else{ 
					$('#returns').text('False');
				}
			});
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
			navigator.notification.confirm(
				"I went to work and earned "+ (Math.round(10*hp)) +" Dollars! Tip: To maximize earnings, keep my HP as high as possible." ,  // message
				function(button){
					window.location="index.html";
				},              // callback to invoke with index of button pressed
				'No Money',            // title
				'Proceed'          // buttonLabels
			);
			
		}else{
			navigator.notification.confirm(
				"I'm tired...I cant work any more today..." ,  // message
				function(button){
				},              // callback to invoke with index of button pressed
				'No Money',            // title
				'Proceed'          // buttonLabels
			);
		}
		
	}
}
function food(){
	
	
		if (playingClip){return;}
		var money = Number(localStorage.money);
		var food = Number(localStorage.food);
		var hp = Number(localStorage.hp);
		//Add logic to figure out what popup should say
		//Since money for this version is only used for food, just use as much as you need
		//One serving is 5HP
		if (food < 1){
			navigator.notification.confirm(
					"I'm Not Hungry!!" ,  // message
					function(button){
					},              // callback to invoke with index of button pressed
					'Nope!',            // title
					'Proceed'          // buttonLabels
			);
			return;
		}
		if (money >= 3){
			money -=3;
			food -= 1;
			localStorage.food= food;
			localStorage.money= money;
			localStorage.hp= hp+3;
			
			if (food >= 1){
				navigator.notification.confirm(
					"Thanks, that cost you 3 dollars. I have gained 3HP! I'm still hungry..." ,  // message
					function(button){
						window.location="index.html";
					},              // callback to invoke with index of button pressed
					'Thanks',            // title
					'Proceed'          // buttonLabels
				);
			}else{
				navigator.notification.confirm(
					"Thanks, that cost you 3 dollars. I have gained 3HP!" ,  // message
					function(button){
						window.location="index.html";
					},              // callback to invoke with index of button pressed
					'Thanks',            // title
					'Proceed'          // buttonLabels
				);
			}
			
		}else{
			navigator.notification.confirm(
				'Not enough money! Work to earn some cash! (Briefcase on the top of the screen)' ,  // message
				function(button){
				},              // callback to invoke with index of button pressed
				'No Money',            // title
				'Proceed'          // buttonLabels
			);
		}	
		
		
	}

function clean(){
	if (playingClip){return;}
	var clean = Number(localStorage.clean);
	var hp = Number(localStorage.hp);
		
	if (clean>=1){
		window.location="clean.html";
	}else{
		navigator.notification.confirm(
			"I'm already clean!" ,  // message
			function(button){
			},              // callback to invoke with index of button pressed
			'Clean',            // title
			'Proceed'          // buttonLabels
		);
	}

	//window.location="clean.html";
}

function settings(){
	if (playingClip){return;}
	window.location='settings.html';
}



