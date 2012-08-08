var currentImg=0;
var fatHungry=new Array("images/new/UnhappyDracoLean.gif","images/new/HungryDraco2Lean.gif");

$(document).ready(function() {
	
	
	$("#healthBar").progressbar({});
	$("#healthBar").progressbar( "option", "value", Number(localStorage.health));
	
	$("#hungerBar").progressbar({});
	$("#hungerBar").progressbar( "option", "value", Number(localStorage.hunger));
	
	
	window.setInterval(function(){
		if (currentImg==fatHungry.length){
			currentImg=0;
		}
		
		$("#dracoImg").attr("src",fatHungry[currentImg]);
		currentImg++;
	}, 5000);
});

function foodClick(){
	window.location="store.html";
}

function healthClick(){
	window.location="chooseWorkout.html";
}