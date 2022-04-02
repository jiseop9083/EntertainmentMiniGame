class PlayerSetting{
	constructor(playerCnt, playerNumber){
		this.playerNumber = playerNumber;
		this.playerCnt = playerCnt;
		this.playerInfo = playerList[this.playerCnt];
		
		
		this.nameSelector = document.querySelector(`#player${playerNumber} .nameSelector`);
		this.leftNext = document.querySelector(`#player${playerNumber} .leftNext`);
		this.rightNext = document.querySelector(`#player${playerNumber} .rightNext`);
		
		this.leftNext.addEventListener("mousedown", () => {
			this.playerCnt = (playerList.length + this.playerCnt - 1) % playerList.length;
			this.playerInfo = playerList[playerCnt];
		});
		this.rightNext.addEventListener("mousedown", () => {
			this.playerCnt = (playerList.length + this.playerCnt + 1) % playerList.length;
			this.playerInfo = playerList[playerCnt];
		});
		this.imgDiv = document.querySelector(`#player${playerNumber} .imgDiv`);
		this.img = document.createElement("img");
		this.imgDiv.appendChild(this.img);
		this.img.style.width = "100%";
		this.img.style.height = "100%";
		
		
		
		this.powerBar = document.querySelector(`#player${playerNumber} .powerBar`);
		this.cntBar = document.querySelector(`#player${playerNumber} .cntBar`);
		this.speedBar = document.querySelector(`#player${playerNumber} .speedBar`);
		this.sizeBar = document.querySelector(`#player${playerNumber} .sizeBar`);
	}
	
	update(){
		this.playerInfo = playerList[this.playerCnt];
		if(this.playerNumber === 1)
			playData.player1 = this.playerInfo;
		else playData.player2 = this.playerInfo;
		
		this.powerBar.innerText = "Power: " + this.playerInfo.power;
		this.cntBar.innerText = "Bomb number: " + this.playerInfo.cnt;
		this.speedBar.innerText = "Speed: " + this.playerInfo.speed;
		this.sizeBar.innerText = "Size: " + this.playerInfo.size;
		this.img.src = `./assets/Player/${this.playerInfo.imgName}.png`;
		this.nameSelector.innerText = this.playerInfo.name;
	}
};

class Setting {
	constructor(firstPlayer=1, secondPlayer=2, mapNumber=0){
		this.firstPlayer = new PlayerSetting(0, firstPlayer);
		this.secondPlayer = new PlayerSetting(0, secondPlayer);
		
		this.mapName =  document.querySelector("#mapview .nameSelector"); 
		this.leftNext =  document.querySelector("#mapview .leftNext");
		this.rightNext =  document.querySelector("#mapview .rightNext");
		this.imgDiv =  document.querySelector("#mapview .imgDiv");
		this.randomOption =  document.querySelector("#random");
		this.mapNumber = mapNumber;
		
		this.blockList = Array.from(Array(MapList[this.mapNumber].mapFile.length), () => Array(MapList[this.mapNumber].mapFile.length).fill(null));
		this.changeMiniMap();
		
		this.start = document.querySelector("#start");
		this.start.addEventListener("mousedown", () => {
			if(this.firstPlayer.playerCnt === 0){
				this.firstPlayer.playerCnt = Math.floor(Math.random() * (playerList.length - 1)) + 1;
				this.firstPlayer.playerInfo = playerList[this.firstPlayer.playerCnt];
			}
			if(this.secondPlayer.playerCnt === 0){
				this.secondPlayer.playerCnt = Math.floor(Math.random() * (playerList.length - 1)) + 1;
				this.secondPlayer.playerInfo = playerList[this.secondPlayer.playerCnt];
			}
			if(this.mapNumber === 0){
				this.mapNumber = Math.floor(Math.random() * (MapList.length - 1)) + 1;
			}
			this.isPlay = false;
		});
		
		this.randomOption.addEventListener("mousedown", () => {
			if(playData.isItemRandom){
				this.randomOption.style.fontWeight = "400";
				this.randomOption.style.textShadow = "none";
				this.randomOption.style.marginLeft = "4px";
				playData.isItemRandom = false;
			} else{
				this.randomOption.style.fontWeight = "600";
				this.randomOption.style.textShadow = "3px 3px red";
				this.randomOption.style.marginLeft = "0px";
				playData.isItemRandom = true;
			}
		});
		
		this.leftNext.addEventListener("mousedown", () => {
			this.mapNumber = (MapList.length + this.mapNumber - 1) % MapList.length;
			this.changeMiniMap();
		});
		
		this.rightNext.addEventListener("mousedown", () => {
			this.mapNumber = (MapList.length + this.mapNumber + 1) % MapList.length;
			this.changeMiniMap();
		});
		
		
		
	}
	
	changeMiniMap(){
		const miniMapSize = 260;
		const length = MapList[this.mapNumber].mapFile.length;
		if(this.mapNumber === 0){
			for(let i = 0; i < length; i++){
				for(let j = 0; j < length; j++){
					if(this.blockList[i][j] !== null){
						this.imgDiv.removeChild(this.blockList[i][j]);
						this.blockList[i][j] = null;
					}
				}
			}
			this.blockList[0][0] = document.createElement("div");
			this.imgDiv.appendChild(this.blockList[0][0]);
			this.blockList[0][0].style.width = (miniMapSize) + "px";
			this.blockList[0][0].style.height = (miniMapSize) + "px";
			let img = document.createElement("img");
			this.blockList[0][0].appendChild(img);
			img.style.widh = "100%";
			img.style.height = "100%";
			img.src = "./assets/Player/random.png";
			return;
		}
		for(let i = 0; i < length; i++){
			for(let j = 0; j < length; j++){
				if(this.blockList[i][j] !== null){
					this.imgDiv.removeChild(this.blockList[i][j]);
					this.blockList[i][j] = null;
				}
				if(MapList[this.mapNumber].mapFile[i][j] !== 0){
					this.blockList[i][j] = document.createElement("div");
					this.imgDiv.appendChild(this.blockList[i][j]);
					this.blockList[i][j].style.position = "absolute";
					this.blockList[i][j].style.width = (miniMapSize/length) + "px";
					this.blockList[i][j].style.height = (miniMapSize/length) + "px";
					this.blockList[i][j].style.left = (j*(miniMapSize/length)) + "px";
					this.blockList[i][j].style.top = (i*(miniMapSize/length)) + "px";
					let img = document.createElement("img");
					this.blockList[i][j].appendChild(img);
					img.style.widh = "100%";
					img.style.height = "100%";
					if(MapList[this.mapNumber].mapFile[i][j] !== 1){
						img.src = "./assets/Block/breakableBlock.png";
					} else img.src = "./assets/Block/unbreakableBlock.png";
				}
			}
		}
	}
	
	update(){
		this.firstPlayer.update()
		this.secondPlayer.update();
		this.mapName.innerText = MapList[this.mapNumber].mapName;
		playData.mapNumber = this.mapNumber;
		return this.isPlay;
	}
	
	stop(){
		this.isPlay = false;
	}
	
	play() {
		this.isPlay = true;
		this.changeMiniMap();
	}
	
};