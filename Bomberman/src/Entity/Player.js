const speedList = [0, 3, 4, 5, 7, 10 ,12, 15];

class Player extends Entity{
	constructor(posY, posX, playerData){
		super(posY, posX, "Player", blockSize*(0.05*playerData.size + 0.60));
		
		this.posX = posX*blockSize + ((blockSize - this.size)/2);
		this.posY = posY*blockSize + ((blockSize - this.size)/2);
		
		this.speedLevel = playerData.speed;
		this.speed = speedList[this.speedLevel];
		this.maxBombCnt = playerData.cnt;
		this.bombCnt = this.maxBombCnt;
		this.power = playerData.power;
		this.name = playerData.name;
		this.installCool = FPS * 0.3;
		
		this.div.style.position ="absolute";
		this.div.style.width = this.size + "px";
		this.div.style.height = this.size + "px";
		this.img.src = `./assets/Player/${playerData.imgName}.png`;
		
	}
	
	getPosX(){
		return this.posX + (this.size/2);
	}
	
	getPosY(){
		return this.posY + (this.size/2);
	}
	
	moveUp(){
		this.posY -= this.speed;
	}
	
	moveDown(){
		this.posY += this.speed;
	}
	
	moveLeft(){
		this.posX -= this.speed;
	}
	
	moveRight(){
		this.posX += this.speed;
	}
	
	render(){
		this.div.style.left = this.posX + "px";
		this.div.style.top = this.posY + "px";
	}
	
	update(){
		this.installCool--;
	}
	
	installBomb(){
		if(this.bombCnt === 0 || this.installCool > 0)
			return 0;
		this.bombCnt--;
		this.installCool = FPS * 0.15;
		return this.power;
	}
	
	addBomb(){
		if(this.bombCnt < this.maxBombCnt)
			this.bombCnt++;
	}
	
	getBomb(){
		if(this.maxBombCnt < 5){
			this.maxBombCnt++;
			this.bombCnt++;
		}
	}
	
	getSpeed(){
		if(this.speedLevel < 5){
			this.speedLevel++;
			this.speed = speedList[this.speedLevel];
		}
	}
	
	getPower(){
		if(this.power < 5)
			this.power++;
	}
}