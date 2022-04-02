let keyState = [false, false, false, false, false, false, false, false, false, false];

let map = new Map(playData);
let setting = new Setting();

let gameState = false;
let gameEffect = true;
let view = new View();

setInterval(() => {
	if(gameState !== gameEffect){
		gameEffect = gameState;
		if(gameEffect){
			view.play();
			setting.stop();
			map.play(playData);
		} else{
			view.stop();
			setting.play();
			for(let i = 0; i < keyState.length; i++)
				keyState[i] = false;
		}
	}
	if(gameState){
		gameState = map.update();
		if(gameState)
			map.render();
	} else {
		gameState = !setting.update();
	}
	
	window.addEventListener("keyup", (e) => {
		const key = e.key;
		switch(key){
			case 'w':
				keyState[0] = false;
				break;
			case 'a':
				keyState[1] = false;
				break;
			case 's':
				keyState[2] = false;
				break;
			case 'd':
				keyState[3] = false;
				break;
			case ' ':
				keyState[4] = false;
				break;
			case 'ArrowUp':
				keyState[5] = false;
				break;
			case 'ArrowLeft':
				keyState[6] = false;
				break;
			case 'ArrowDown':
				keyState[7] = false;
				break;
			case 'ArrowRight':
				keyState[8] = false;
				break;
			case 'Enter':
				keyState[9] = false;
				break;
				
		}
	});
	
	window.addEventListener("keydown", (e) => {
		const key = e.key;
		switch(key){
			case 'w':
				keyState[0] = true;
				break;
			case 'a':
				keyState[1] = true;
				break;
			case 's':
				keyState[2] = true;
				break;
			case 'd':
				keyState[3] = true;
				break;
			case ' ':
				keyState[4] = true;
				break;
			case 'ArrowUp':
				keyState[5] = true;
				break;
			case 'ArrowLeft':
				keyState[6] = true;
				break;
			case 'ArrowDown':
				keyState[7] = true;
				break;
			case 'ArrowRight':
				keyState[8] = true;
				break;
			case 'Enter':
				keyState[9] = true;
				break;
				
		}
	});
	
}, 1000/FPS);