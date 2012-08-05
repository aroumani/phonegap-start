function resetGame(type){
	//should probably warn the user:
	localStorage.clear();
	localStorage.day=1;
	localStorage.money=0;
	localStorage.health=100;
	localStorage.hunger=50;
	localStorage.totalDays=60;
	alert('Game has been reset');
	window.location="index.html";
}