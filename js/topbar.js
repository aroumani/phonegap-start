$(document).ready(function() {
	$('#days').html("Day: " + localStorage.day + " of " + localStorage.totalDays);
	$('#coins').html("Money: " + localStorage.money);
});