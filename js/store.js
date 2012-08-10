function purchase(type){
	
	var money = Number(localStorage.money);
	var hunger = Number(localStorage.hunger);
	if (type==1){
		money -= 1;
		hunger += 1;
		
	}else if (type==2){
		money -= 2;
		hunger += 2;
		
	}else if (type==2){
		money -= 3;
		hunger += 4;
		
	}else if (type==3){
		money -= 4;
		hunger += 6;
		
	}else if (type==4){
		money -= 5;
		hunger += 8;
		
	}else if (type==5){
		money -= 6;
		hunger += 10;
	}
	
	if (money<0){
		alert('Oops ... not enough money for this purchase')
	}else{
		if (hunger > 100){
			hunger=100;
		}
		
		localStorage.money = money;
		localStorage.hunger = hunger;
		window.location="index.html";
	}
}