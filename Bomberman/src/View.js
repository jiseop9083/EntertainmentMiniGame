let main = document.querySelector("#main");
let gameView = document.querySelector("#gameComponent");
let settingView = document.querySelector("#setting");

class View {
	constructor(){
		
	}
	
	play(){
		main.removeChild(settingView);
		main.appendChild(gameView);
	}
	
	stop (){
		main.removeChild(gameView);
		main.appendChild(settingView);
	}
}