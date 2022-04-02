// Use Case
// Controll all Entity in the map


class Map{
	constructor(playData){
		this.mapEffect = Array.from(Array(playData.mapSize), () => Array(playData.mapSize).fill(0));
		this.blockList = Array.from(Array(playData.mapSize), () => Array(playData.mapSize).fill(null));
		this.player1 = null;
		this.player2 = null;
		this.playerInfo1 = null;
		this.playerInfo2 = null;
		this.isPlay = false;
	}
	
	
	stop(){
		this.mapFile = Array.from(Array(playData.mapSize), () => Array(playData.mapSize).fill(0));
		for(let i = 0; i < this.mapFile.length; i++){
			for(let j = 0; j < this.mapFile.length; j++){
				this.replaceBlock(i,j,0);
			}
		}
		this.player1.destroy();
		this.player2.destroy();
		this.playerInfo1.destroy();
		this.playerInfo2.destroy();
		
		this.isPlay = false;
	}
	
	
	play(playData){
		this.isPlay = true;
		this.mapNumber = playData.mapNumber;
		this.mapFile = Array.from(Array(playData.mapSize), () => Array(playData.mapSize).fill(0));
		for(let i = 0; i < this.mapFile.length; i++){
			for(let j = 0; j < this.mapFile.length; j++){
				if(playData.isItemRandom && 
				   MapList[this.mapNumber].mapFile[i][j] !== 0 && 
				   MapList[this.mapNumber].mapFile[i][j] !== 1){
					let temp = Math.floor(10 * Math.random());
					if(temp === 0)
						this.mapFile[i][j] = 3;
					else if(temp === 1)
						this.mapFile[i][j] = 4;
					else if(temp === 1)
						this.mapFile[i][j] = 5;
					else
						this.mapFile[i][j] = 2;
				} else
					this.mapFile[i][j] = MapList[this.mapNumber].mapFile[i][j];
			}
		}
		this.mapEffect = Array.from(Array(playData.mapSize), () => Array(playData.mapSize).fill(0));
		this.blockList = Array.from(Array(playData.mapSize), () => Array(playData.mapSize).fill(null));
		this.player1 = new Player(0,0, playData.player1);
		this.player2 = new Player(playData.mapSize - 1, playData.mapSize - 1, playData.player2);
		
		this.playerInfo1 = new InfoPlayer(50, -40, playData.player1);
		this.playerInfo2 = new InfoPlayer(50, 1070, playData.player2);
	}
	
	
	render(){
		this.player1.render();
		this.player2.render();
		this.playerInfo1.setText(this.player1);
		this.playerInfo2.setText(this.player2);
		
		for(let i = 0; i < this.mapFile.length; i++){
			for(let j = 0; j < this.mapFile.length; j++){
				if(this.mapEffect[i][j] !== this.mapFile[i][j]){
					this.mapEffect[i][j] = this.mapFile[i][j];
					switch(this.mapFile[i][j]){
						case 1:
							this.replaceBlock(i, j , 1);
							break;
						case 2:
							this.replaceBlock(i, j , 2);
							break;
						case 3:
							this.replaceBlock(i, j , 3);
							break;
						case 4:
							this.replaceBlock(i, j , 4);
							break;
						case 5:
							this.replaceBlock(i, j , 5);
							break;
					}
				}
			}
			
		}
	}
	
	replaceBlock(y, x, blockCnt){
		if(this.blockList[y][x] !== null)
			this.blockList[y][x].destroy();
		switch(blockCnt){
		case 0:
			this.blockList[y][x] = null;
			break;
		case 1:
			this.blockList[y][x] = new UnbreakableBlock(y, x);
			break;
		case 2:
			this.blockList[y][x] = new BreakableBlock(y, x);
			break;
		case 3:
			this.blockList[y][x] = new SpeedItemBlock(y, x);
			break;
		case 4:
			this.blockList[y][x] = new PowerItemBlock(y, x);
			break;
		case 5:
			this.blockList[y][x] = new CntUpItemBlock(y, x);
			break;
		case 7:
			this.blockList[y][x] = new ExplodingBlock(y, x);
			break;
		case 8:
			this.blockList[y][x] = new SpeedItem(y, x);
			break;
		case 9:
			this.blockList[y][x] = new PowerItem(y, x);
			break;
		case 10:
			this.blockList[y][x] = new CntItem(y, x);
			break;
		}
		this.mapFile[y][x] = blockCnt;
	}
	
	getOnBlock(x1, x2, y1, y2){
		let ret = [];
		for(let i = Math.floor(y1/blockSize); i <= Math.floor(y2/blockSize); i++){
			for(let j = Math.floor(x1/blockSize); j <= Math.floor(x2/blockSize); j++){
				if(i < 0 || j < 0 || i > playData.mapSize - 1 || j > playData.mapSize - 1)
					continue;
				ret.push([i,j]);
			}
		}
		return ret;
	}
	
	isCollisionWithBlock(player, direction){
		let x1 = player.posX;
		let x2 = player.posX + player.size;
		let y1 = player.posY;
		let y2 = player.posY + player.size;
		let originRet = this.getOnBlock(x1, x2, y1, y2);
		switch(direction){
			case 0:
				y1 -= player.speed;
				y2 -= player.speed;
				break;
			case 1:
				x1 -= player.speed;
				x2 -= player.speed;
				break;
			case 2:
				y1 += player.speed;
				y2 += player.speed;
				break;
			case 3:
				x1 += player.speed;
				x2 += player.speed;
				break;
		}
		let afterMoveRet = this.getOnBlock(x1, x2, y1, y2);
		let bomb = false;
		
		for(let i = 0; i < originRet.length; i++){
			let blockType = this.mapFile[originRet[i][0]][originRet[i][1]];
			if(blockType === 6)
				bomb = true;
		}
		
		for(let i = 0; i < afterMoveRet.length; i++){
			let blockType = this.mapFile[afterMoveRet[i][0]][afterMoveRet[i][1]];
			if(x1 < 0 || x2 > mainViewHeight || y1 < 0 || y2 > mainViewHeight)
				return true;
			if(blockType >= 1 && blockType <= 5)
				return  true;
			if(blockType === 6 && !bomb)
				return true;
		}
		return false;
	}
	
	isCollisionWithBomb(player, collisionRatio=0.25){
		let x1 = player.posX + player.size*collisionRatio;
		let x2 = player.posX + player.size*(1-collisionRatio);
		let y1 = player.posY + player.size*collisionRatio;
		let y2 = player.posY + player.size*(1-collisionRatio);
		let temp = this.getOnBlock(x1, x2, y1,y2);
		for(let i = 0; i < temp.length; i++){
			let blockType = this.mapFile[temp[i][0]][temp[i][1]]; 
			if(blockType === 7){
				this.render();
				alert(`Game over!\n${player.name} Lose!!`);
				this.stop();
				return;
			}
			if(blockType === 8){
				player.getSpeed();
				this.replaceBlock(temp[i][0],temp[i][1], 0);
			}
			if(blockType === 9){
				player.getPower();
				this.replaceBlock(temp[i][0],temp[i][1], 0);
			}
			if(blockType === 10){
				player.getBomb();
				this.replaceBlock(temp[i][0],temp[i][1], 0);
			}
		}
	}
	
	bombExplode(bomb){
		const dx = [0, 0, 1, -1];
		const dy = [1, -1, 0, 0];
		let x = Math.floor(bomb.posX/blockSize);
		let y = Math.floor(bomb.posY/blockSize);
		bomb.owner.bombCnt++;
		this.blockList[y][x].destroy();
		this.blockList[y][x] = new ExplodingBlock(y, x);
		this.mapFile[y][x] = 7;
		for(let i = 0; i < 4; i++){
			for(let j = 1;j <= bomb.power; j++){
				let xx = x + dx[i]*j;
				let yy = y + dy[i]*j;
				if(xx < 0 || xx > playData.mapSize - 1 ||
				   yy < 0 || yy > playData.mapSize - 1)
					continue;
				if(this.mapFile[yy][xx] === 0){
					this.blockList[yy][xx] = new ExplodingBlock(yy,xx);
					this.mapFile[yy][xx] = 7;
				}
				if(this.mapFile[yy][xx] === 1){
					break;
				}
				if(this.mapFile[yy][xx] === 6){
					this.bombExplode(this.blockList[yy][xx]);
					continue;
				}
				if(this.mapFile[yy][xx] === 7){
					continue;
				}
				if(this.mapFile[yy][xx] === 3){
					this.blockList[yy][xx].destroy();
					this.blockList[yy][xx] = new ExplodingBlock(yy, xx, "SpeedItem");
					this.mapFile[yy][xx] = 7;
					break;
				}
				if(this.mapFile[yy][xx] === 4){
					this.blockList[yy][xx].destroy();
					this.blockList[yy][xx] = new ExplodingBlock(yy ,xx, "PowerItem");
					this.mapFile[yy][xx] = 7;
					break;
				}
				if(this.mapFile[yy][xx] === 5){
					this.blockList[yy][xx].destroy();
					this.blockList[yy][xx] = new ExplodingBlock(yy, xx, "CntItem");
					this.mapFile[yy][xx] = 7;
					break;
				} else { // Item and breakableBlock
					this.blockList[yy][xx].destroy();
					this.blockList[yy][xx] = new ExplodingBlock(yy,xx);
					if(this.mapFile[yy][xx] === 2){
						this.mapFile[yy][xx] = 7;
						break;
					}	
					this.mapFile[yy][xx] = 7;
				}
			}
			
		}
	}
	
	update(){
		this.player1.update();
		this.player2.update();
		this.isCollisionWithBomb(this.player1);
		this.isCollisionWithBomb(this.player2);
		if(!this.isPlay)
			return this.isPlay;
		if(keyState[0] &&
		  !this.isCollisionWithBlock(this.player1, 0))
			this.player1.moveUp();
		if(keyState[1] &&
		  !this.isCollisionWithBlock(this.player1, 1))
			this.player1.moveLeft();
		if(keyState[2] &&
		  !this.isCollisionWithBlock(this.player1, 2))
			this.player1.moveDown();
		if(keyState[3] &&
		  !this.isCollisionWithBlock(this.player1, 3))
			this.player1.moveRight();
		if(keyState[4]){
			const posX = Math.floor(this.player1.getPosX() / blockSize);
			const posY = Math.floor(this.player1.getPosY() / blockSize);
			if(this.mapFile[posY][posX] === 0){
				const power = this.player1.installBomb();
				if(power){
					this.blockList[posY][posX] = new Bomb(posY, posX, power, this.player1);
					this.mapFile[posY][posX] = 6;
				}
			}
		} 
		if(keyState[5] &&
		  !this.isCollisionWithBlock(this.player2, 0))
			this.player2.moveUp();
		if(keyState[6] &&
		  !this.isCollisionWithBlock(this.player2, 1))
			this.player2.moveLeft();
		if(keyState[7] &&
		  !this.isCollisionWithBlock(this.player2, 2))
			this.player2.moveDown();
		if(keyState[8] &&
		  !this.isCollisionWithBlock(this.player2, 3))
			this.player2.moveRight();
		if(keyState[9]){
			const posX = Math.floor(this.player2.getPosX() / blockSize);
			const posY = Math.floor(this.player2.getPosY() / blockSize);
			if(this.mapFile[posY][posX] === 0){
				const power = this.player2.installBomb();
				if(power){
					this.blockList[posY][posX] = new Bomb(posY, posX, power, this.player2);
					this.mapFile[posY][posX] = 6;
				}
			}
		} 
		for(let i = 0; i < this.blockList.length; i++){
			for(let j = 0; j < this.blockList.length; j++){
				if(this.blockList[i][j] !== null){
					if(this.blockList[i][j].type === "Bomb" && this.blockList[i][j].countDown())
						this.bombExplode(this.blockList[i][j]);
					else if(this.blockList[i][j].type === "ExplodingBlock" && this.blockList[i][j].countDown()){
	
						if(this.blockList[i][j].remain === "SpeedItem")
							this.replaceBlock(i, j, 8);
						else if(this.blockList[i][j].remain === "PowerItem")
							this.replaceBlock(i, j, 9);
						else if(this.blockList[i][j].remain === "CntItem")
							this.replaceBlock(i, j, 10);
						else
							this.replaceBlock(i, j, 0);
					}
				}
			}
		}
		
		return this.isPlay;
	}
};