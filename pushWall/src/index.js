
// instance 모음
let playerBar1 = document.querySelector('#playerBar1');
let playerBar2 = document.querySelector('#playerBar2');
let pushBar = document.querySelector('#pushBar');
let pushBarPos = 380;
let mainView = document.querySelector('#gameComponent');
let isShoot = [false, false];
let playerBarDegree1 = 90;
let playerBarDegree2 = 270;
var Ball = function(posX, posY, velX, velY, ball) {
	this.posX = posX;
	this.posY = posY;
	this.velX = velX;
	this.velY = velY;
	this.ball = ball;
}
let ballArray = [];

let keySet = new Set();

//function

// add ball component
const addBall = (velX, velY, posX, posY) => {
	const newBall = document.createElement('div');
	mainView.appendChild(newBall);
	newBall.className = "ball";
	newBall.style.position = "absolute";
	newBall.style.left = posX + "px";
	newBall.style.top = posY + "px";
	ballArray.push(new Ball(posX, posY, velX, velY, newBall));
}

// remove ball component
const removeBall = (cnt) => {
	mainView.removeChild(ballArray[cnt].ball);
	ballArray.splice(cnt, 1);
};

// move all ball
const moveBall = () => {
	for (let i = 0; i < ballArray.length; i++) {
    	ballArray[i].posX += ballArray[i].velX;
		ballArray[i].posY += ballArray[i].velY;
		ballArray[i].ball.style.left = ballArray[i].posX + "px";
		ballArray[i].ball.style.top = ballArray[i].posY + "px";
	}   
};

const detectCollision = () => {
	for (let i = 0; i < ballArray.length; i++) {
		let x = ballArray[i].posX;
		let y = ballArray[i].posY;
		// collision with pushBar
		if(pushBarPos - 30 <= y && y <= pushBarPos + 40){
			removeBall(i);
			if(pushBarPos >= y){
				isShoot[1] = false;
			}
			else {
				isShoot[0] = false;
			}
		}
		// collision with Wall
		if(0 > x || x > 470)
			ballArray[i].velX = -ballArray[i].velX;
	}
};

window.addEventListener("keydown", (e) => {
	const key = e.key;
	keySet.add(key);
});

window.addEventListener("keyup", (e) => {
	const key = e.key;
	keySet.delete(key);
});



// game
setInterval(() => {
	if (keySet.has("ArrowRight") && playerBarDegree1 <= 165)
		playerBarDegree1 += 5;
	if(keySet.has("ArrowLeft") && playerBarDegree1 >= 15)
		playerBarDegree1 -= 5;
	if (keySet.has("d") && playerBarDegree2 >= 195) 
		playerBarDegree2 -= 5;
	if(keySet.has("a") && playerBarDegree2 <= 345)
		playerBarDegree2 += 5;
	if(keySet.has("ArrowUp") && !isShoot[0]){
		addBall(-10 * Math.cos(Math.PI * playerBarDegree1 / 180), -10 * Math.sin(Math.PI * playerBarDegree1 / 180), 235, 755);
		isShoot[0] = true;
	}
	if(keySet.has(" ") && !isShoot[1]){
		addBall(-10 * Math.cos(Math.PI * playerBarDegree2 / 180), -10 * Math.sin(Math.PI * playerBarDegree2 / 180), 235, 8);
		isShoot[1] = true;
	}
	moveBall();
	detectCollision();
	playerBar1.style.transform = 'rotate(' + playerBarDegree1 + 'deg)';
	playerBar2.style.transform = 'rotate(' + playerBarDegree2+ 'deg)';
	}, 1000 / 30);






