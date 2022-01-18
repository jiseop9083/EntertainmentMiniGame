
// instance 모음
let playerBar1 = document.querySelector('#playerBar1');
let playerBar2 = document.querySelector('#playerBar2');
let pushBar = document.querySelector('#pushBar');
let pushBarPos = 380;
let mainView = document.querySelector('#gameComponent');
let isShoot = [false, false];
let playerBarDegree1 = 90;
let playerBarDegree2 = 270;
let ballArray = [];
let blockArray = [];
const ballColor = ["#000000",
	"#DB631F","#E57733","#D2691E","#E0904C","#FF8200","#FF8C0A","#FF9614","#FFA01E","#FFAA28","#FFB432",
	"#FFC314","#FFC81E","#FFCD28","#FFD232","#FFD73C","#FFDC3C","#FFE146","#FFE650","#FFEB5A","#FFF064",
	"#FFF56E","#FFFA78","#FFFA82","#FFFF8C","#FFFF96","#FAFA96","#FAFAA0","#FAFAAA","#FAFAB4","#FAFABE",
	"#FAFAD2","#FAFAD2" ];

let keySet = new Set();


//entities
let Ball = function(posX, posY, velX, velY, ball, power) {
	this.posX = posX;
	this.posY = posY;
	this.velX = velX;
	this.velY = velY;
	this.ball = ball;
	this.power = power;
}

let MultiplyBlock = function(posX, posY, width, height, block, multiply, type) { 
	this.posX = posX;
	this.posY = posY;
	this.width = width;
	this.height = height;
	this.block = block;
	this.type = type;
	if(multiply === 2){
		this.block.innerText  = "X2";
		this.block.style.backgroundColor = "green";
	}	
	else if(multiply === 3){
		this.block.innerText  = "X3";
		this.block.style.backgroundColor = "blue";
	}
	else if(multiply === 4){
		this.block.innerText  = "X4";
		this.block.style.backgroundColor = "red";
	}
	else{
		this.block.innerText = "X5";
		this.block.style.backgroundColor = "purple";
	}
		
};




//function

// add ball component
const addBall = (velX, velY, posX, posY) => {
	const newBall = document.createElement('div');
	mainView.appendChild(newBall);
	newBall.className = "ball";
	newBall.style.position = "absolute";
	newBall.style.left = posX + "px";
	newBall.style.top = posY + "px";
	ballArray.push(new Ball(posX, posY, velX, velY, newBall, 1));
}


// add multiplyBlocks component
const addMultiplyBlocks = (type) => { //type 0: downSide, 1: upSide
	
	// get Random number
	// This will be used to multiplied number or number of multiplyBlocks
	const getRandomNum = () => {
		let number = Math.floor(Math.random() * 10);
		if(number < 4)
			return 2;
		else if(number < 7)
			return 3;
		else if(number < 9)
			return 4;
		else 
			return 5;
	};
	
	const blockCnt = getRandomNum() - 1;
		if(type === 0){ // down side

			let totalheight = 710 - pushBarPos;
			while(blockCnt * 30 > totalheight)
				blockCnt--;
			let pos = pushBarPos + 40;
			for(let i = 0; i < blockCnt; i++) {
				let posX = Math.floor(Math.random() * 440);
				let posY = Math.floor((Math.random() * ((totalheight / blockCnt) - 30)) + pos);
				const newBlock = document.createElement('div');
				mainView.appendChild(newBlock);
				newBlock.className = "block";
				newBlock.style.position = "absolute";
				newBlock.style.left = posX + "px";
				newBlock.style.top = posY + "px";
				blockArray.push(new MultiplyBlock(posX, posY, 60, 30, newBlock, getRandomNum() ,0));
				
				pos += (totalheight / blockCnt);
			}
		}
		else if(type === 1) { //up side
			let totalheight = pushBarPos - 50;
			while(blockCnt * 30 > totalheight)
				blockCnt--;
			console.log(totalheight / blockCnt + "\n" + blockCnt);
			let pos = 50;
			for(let i = 0; i < blockCnt; i++) {
				let posX = Math.floor(Math.random() * 440);
				let posY = Math.floor((Math.random() * ((totalheight / blockCnt) - 30)) + pos);
				const newBlock = document.createElement('div');
				mainView.appendChild(newBlock);
				newBlock.className = "block";
				newBlock.style.position = "absolute";
				newBlock.style.left = posX + "px";
				newBlock.style.top = posY + "px";
				blockArray.push(new MultiplyBlock(posX, posY, 60, 30, newBlock, getRandomNum(), 1));
				pos += (totalheight / blockCnt);
			}
			
		}else {
			console.log("error");
		}
	

	
};


// check game over
const checkGame = () => {
	
	if(pushBarPos < 50 || 710 < pushBarPos ){
		let winner = "";
		if(pushBarPos < 50)
			winner = "player1";
		else winner = "player2";
		if(confirm("winner is " + winner + "!!\n Try again?"));
			init();
	}
};


// remove ball component
const removeBall = (cnt) => {
	mainView.removeChild(ballArray[cnt].ball);
	ballArray.splice(cnt, 1);
};


// remove block component
const removeBlock = (cnt) => {
	mainView.removeChild(blockArray[cnt].block);
	blockArray.splice(cnt, 1);
};

// change all entities status
const changeEntities = () => {
	// move all balls
	for (let i = 0; i < ballArray.length; i++) {
    	ballArray[i].posX += ballArray[i].velX;
		ballArray[i].posY += ballArray[i].velY;
		ballArray[i].ball.style.left = ballArray[i].posX + "px";
		ballArray[i].ball.style.top = ballArray[i].posY + "px";
		let power = ballArray[i].power;
		if(power < 32)
			ballArray[i].ball.style.backgroundColor = ballColor[power];
		else
			ballArray[i].ball.style.backgroundColor = "#ffffff";
		ballArray[i].ball.innerText = power;
	}   
	
	//move pushBar
	pushBar.style.top = pushBarPos + "px";
};


//detect Collision with ball
const detectCollision = () => {
	for (let i = 0; i < ballArray.length; i++) {
		let x = ballArray[i].posX;
		let y = ballArray[i].posY;
		// collision with pushBar
		if(pushBarPos - 30 < y && y < pushBarPos + 40){
			if(pushBarPos >= y){ // up side 
				ballArray[i].power--;
				pushBarPos += 10;
				ballArray[i].posY = pushBarPos - 40;
				if(ballArray[i].power === 0){
					removeBall(i);
					i--;
					isShoot[1] = false;
					for(let j = 0;  j < blockArray.length; j++){
						if(blockArray[j].type === 1){
							removeBlock(j);
							j--;
						}
					}
					addMultiplyBlocks(1);
				}
			}
			else { // down side
				ballArray[i].power--;
				pushBarPos -= 10;
				ballArray[i].posY = pushBarPos + 53;
				if(ballArray[i].power === 0){
					removeBall(i);
					i--;
					isShoot[0] = false;
					for(let j = 0;  j < blockArray.length; j++){
						if(blockArray[j].type === 0){
							removeBlock(j);
							j--;
						}
					}
					addMultiplyBlocks(0);
				}
			}
		}
		// collision with Wall
		if(0 > x || x > 470)
			ballArray[i].velX = -ballArray[i].velX;
		if(0 > y || y > 800)
			ballArray[i].velY = -ballArray[i].velY;
		// collision with multiplyBlocks
		for(let j = 0; j < blockArray.length; j++){
			let x1 = x;
			let x2 = x + 32;
			let x3 = blockArray[j].posX;
			let x4 = blockArray[j].posX + blockArray[j].width; 
			let y1 = y;
			let y2 = y + 32;
			let y3 = blockArray[j].posY;
			let y4 = blockArray[j].posY + blockArray[j].height; 
			
			if((x1 <= x4 && x3 <= x2) && (y1 <= y4 && y3 <= y2)){
				let cnt = blockArray[j].block.innerText;
				if(cnt === "X2"){
					ballArray[i].power *= 2;
				} else if(cnt === "X3") {
					ballArray[i].power *= 3;
				}
				else if(cnt === "X4") {
					ballArray[i].power *= 4;
				} else {
					ballArray[i].power *= 5;
				}
				removeBlock(j);
				j--;
			}
		}
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


//init
const init = () => {
	addMultiplyBlocks(0);
	addMultiplyBlocks(1);
}
init();



// game
setInterval(() => {
	checkGame();
	if (keySet.has("ArrowRight") && playerBarDegree1 <= 165)
		playerBarDegree1 += 5;
	if(keySet.has("ArrowLeft") && playerBarDegree1 >= 15)
		playerBarDegree1 -= 5;
	if (keySet.has("d") && playerBarDegree2 >= 195) 
		playerBarDegree2 -= 5;
	if(keySet.has("a") && playerBarDegree2 <= 345)
		playerBarDegree2 += 5;
	if(keySet.has("ArrowUp") && isShoot[0] === false){
		addBall(-10 * Math.cos(Math.PI * playerBarDegree1 / 180), -10 * Math.sin(Math.PI * playerBarDegree1 / 180), 235, 755);
		isShoot[0] = true;
	}
	if(keySet.has(" ") && isShoot[1] === false){
		addBall(-10 * Math.cos(Math.PI * playerBarDegree2 / 180), -10 * Math.sin(Math.PI * playerBarDegree2 / 180), 235, 8);
		isShoot[1] = true;
	}
	
	changeEntities();
	detectCollision();
	playerBar1.style.transform = 'rotate(' + playerBarDegree1 + 'deg)';
	playerBar2.style.transform = 'rotate(' + playerBarDegree2+ 'deg)';
	}, 1000 / 30);






