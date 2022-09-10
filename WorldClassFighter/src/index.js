const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
let playerHealth = document.querySelector("#playerHealth");
let enemyHealth = document.querySelector("#enemyHealth");
let timer= document.querySelector('#timer');


canvas.width = canvasWidth;
canvas.height = canvasHeight;

c.fillRect(0, 0, canvas.width, canvas.height);


// 임시 표시

const background = new Sprite({
	position: {
		x: 0,
		y: 0,
	},
	size: {
		width: canvas.width,
		height: canvas.height,
	},
	color: "black",
	imageSrc: "./assets/background.jpg",
});

const player = new Player({
	position: {
		x: 100,
		y: canvas.height - 260,
	},
	color: "green",
	velocity: {
		x: 0,
		y: 0,
	},
	playerType: "muscleMemory",
	imageSrc: "./assets/player/muscleMemory/stand.png",
	frameMax: 2,
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
	playerType: "muscleMemory",
	imageSrc: "./assets/player/muscleMemory/stand.png",
	frameMax: 2,
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
	} else if(!player.isAttacking) {
		//console.log("move");
		//player.changeAction("standing");
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
		
	}  else if(!enemy.isAttacking) {
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
	
	if(collision({entity1: player.attackBox, entity2: enemy}) && player.isAttacking){
		enemy.damage(player.power);
		player.isAttacking = false;
	}
	if(collision({entity1: enemy.attackBox, entity2: player}) && enemy.isAttacking){
		player.damage(enemy.power);
		enemy.isAttacking = false;
	}
	playerHealth.style.width = Math.floor((player.health / player.maxHealth) * 100) + "%";
	enemyHealth.style.width = Math.floor((enemy.health / enemy.maxHealth) * 100) + "%";

	//timer
	if(playTime > 0){
		playTime--;
		timer.innerHTML = Math.round(playTime / 60);
	}
	
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