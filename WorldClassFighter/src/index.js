const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
let playerHealth = document.querySelector("#playerHealth");
let enemyHealth = document.querySelector("#enemyHealth");
let timer= document.querySelector('#timer');


canvas.width = canvasWidth;
canvas.height = canvasHeight;

c.fillRect(0, 0, canvas.width, canvas.height);


// 임시 표시

const playerCharacter = "muscleMemory";
const enemyCharacter = "muscleMemory";
const playerInfo = playerData[`${playerCharacter}`];
const enemyInfo = playerData[`${playerCharacter}`];

const background = new Sprite({
	position: { 
		x: 0,
		y: 0,
	},
	offset: {
		x: 0,
		y: 0,
	},
	size: {
		width: canvas.width,
		height: canvas.height,
	},
	color: "blue",
	imageSrc: "./assets/background.jpg",
	scale: 1.45,
});

const player = new Player({
	position: {
		x: 220,
		y: canvas.height - 260,
	},
	color: "green",
	velocity: {
		x: 0,
		y: 0,
	},
	
	playerType: playerCharacter,
	size: playerInfo.size,
	imageSrc: playerInfo.posture.stand.src,
	offset: playerInfo.posture.stand.offset,
	frameMax: playerInfo.posture.stand.frameMax,
	scale: playerInfo.posture.scale,
});

const enemy = new Player({
	position: {
		x: 700,
		y: canvas.height - 260,
	},
	color: "red",
	velocity: {
		x: 0,
		y: 0,
	},
	playerType: enemyCharacter,
	size: {
		width: 50,
		height: 50,
	},
	imageSrc: enemyInfo.posture.stand.src,
	offset: enemyInfo.posture.stand.offset,
	frameMax: enemyInfo.posture.stand.frameMax,
	scale: enemyInfo.posture.scale,
});
let playTime = 99 * 60;	




//wasd이동, t공격, y피살기, 화살표이동, 4공격, 5피살기
const keys = {
	a: {
		pressed: false,
	},
	d: {
		pressed: false,
	},
	w: {
    	pressed: false,
  	},
	s: {
    	pressed: false,
  	},
	t: {
    	pressed: false,
  	},
	y: {
    	pressed: false,
  	},
	ArrowUp: {
    	pressed: false,
  	},
	ArrowRight: {
    	pressed: false,
  	},
	ArrowDown: {
    	pressed: false,
  	},
	ArrowLeft: {
    	pressed: false,
  	},
	key4: {
    	pressed: false,
  	},
	key5: {
    	pressed: false,
  	},
};

const collision = ({entity1, entity2}) => {
	return (	
		entity1.position.x <= entity2.position.x + entity2.size.width&&
		entity2.position.x <= entity1.position.x + entity1.size.width&&
		entity1.position.y <= entity2.position.y + entity2.size.height&&
		entity2.position.y <= entity1.position.y + entity1.size.height);
};

const isEnd = () => {
	if(player.health === 0){
		alert("player2 win!!");
		player.health = player.maxHealth;
	}
	else if(enemy.health === 0){
		alert("player1 win!!");
		enemy.health = enemy.maxHealth;
	}
}




// run game

background.draw();
player.draw();
enemy.draw();

const animate = () => {
	window.requestAnimationFrame(animate);
	c.fillStyle = "black";
	c.fillRect(0, 0, canvas.width, canvas.height);
	background.update();
	player.update(enemy.position.x);
	enemy.update(player.position.x); 
	
	
	player.velocity.x = 0;
	enemy.velocity.x = 0;
	if (keys.t.pressed && player.attackCooltime <= 0) {
		if(keys.d.pressed){
			if(player.direction)
				player.attack("back");
			else 
				player.attack("front");
		} else if(keys.s.pressed){
			player.attack("under");
		} else if(keys.a.pressed){
			if(player.direction)
				player.attack("front");
			else 
				player.attack("back");
		} else if(keys.w.pressed){
			player.attack("upper");
		} else{
			player.attack("basic");
		}
		player.changeAction("attacking");
	} else {
		if (keys.a.pressed ) {
			player.moveLeft();
		} if (keys.d.pressed ) {
			player.moveRight();
		} if (keys.w.pressed && !player.isJump) {
			player.jump();
		} 
	} if (keys.key4.pressed && enemy.attackCooltime <= 0) {
		if(keys.ArrowRight.pressed){
			if(enemy.direction)
				enemy.attack("back");
			else 
				enemy.attack("front");
		} else if(keys.ArrowDown.pressed){
			enemy.attack("under");
		} else if(keys.ArrowLeft.pressed){
			if(enemy.direction)
				enemy.attack("front");
			else 
				enemy.attack("back");
		} else if(keys.ArrowUp.pressed){
			enemy.attack("upper");
		} else{
			enemy.attack("basic");
		}
		enemy.changeAction("attacking");
		
	}  else {
		if (keys.ArrowLeft.pressed ) {
			enemy.moveLeft();
		} if (keys.ArrowRight.pressed ) {
			enemy.moveRight();
		} if (keys.ArrowUp.pressed && !enemy.isJump) {
			enemy.jump();
		} 
	}
	
	//collision
	//
	if(collision({entity1: player.attackBox, entity2: enemy}) && player.isAttacking && player.frameCurrent === Math.floor((player.frameMax + 1)/ 2)){
		enemy.damage(player.power);
		player.power = 0;
	}
	if(collision({entity1: enemy.attackBox, entity2: player}) && enemy.isAttacking && enemy.frameCurrent === Math.floor((enemy.frameMax + 1)/ 2)){
		player.damage(enemy.power);
		enemy.power = 0;
	}
	playerHealth.style.width = Math.floor((player.health / player.maxHealth) * 100) + "%";
	enemyHealth.style.width = Math.floor((enemy.health / enemy.maxHealth) * 100) + "%";

	//timer
	if(playTime > 0){
		playTime--;
		timer.innerHTML = Math.round(playTime / 60);
	}
	isEnd();
}

animate();

// EventListener
window.addEventListener("keydown", (event) => {
	switch (event.key) {
		case "d":
			keys.d.pressed = true;
			break;
		case "a":
			keys.a.pressed = true;
			break;
		case "w":
			keys.w.pressed = true;
			break;
		case "s":
			keys.s.pressed = true;
			break;
		case "t":
			keys.t.pressed = true;
			break;
		case "ArrowUp":
			keys.ArrowUp.pressed = true;
			break;
		case "ArrowLeft":
			keys.ArrowLeft.pressed = true;
			break;
		case "ArrowRight":
			keys.ArrowRight.pressed = true;
			break;
		case "ArrowDown":
			keys.ArrowDown.pressed = true;
			break;
		case "4":
			keys.key4.pressed = true;
			break;
  	}
});

window.addEventListener("keyup", (event) => {
	switch (event.key) {
		case "d":
			keys.d.pressed = false;
			break;
		case "a":
			keys.a.pressed = false;
			break;
		case "w":
			keys.w.pressed = false;
			break;
		case "s":
			keys.s.pressed = false;
			break;
		case "t":
			keys.t.pressed = false;
			break;
		case "ArrowUp":
			keys.ArrowUp.pressed = false;
			break;
		case "ArrowLeft":
			keys.ArrowLeft.pressed = false;
			break;
		case "ArrowRight":
			keys.ArrowRight.pressed = false;
			break;
		case "ArrowDown":
			keys.ArrowDown.pressed = false;
			break;
		case "4":
			keys.key4.pressed = false;
			break;
	
  	}
});