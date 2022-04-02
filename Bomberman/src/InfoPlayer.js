class InfoPlayer{
	constructor(posY, posX, playerData){
		this.div = document.createElement("div");
		this.nameDiv = document.createElement("div");
		this.imgDiv = document.createElement("div");
		this.powerDiv = document.createElement("div");
		this.cntDiv = document.createElement("div");
		this.speedDiv = document.createElement("div");
		
		main.appendChild(this.div);
		this.div.appendChild(this.nameDiv);
		this.div.appendChild(this.imgDiv);
		this.div.appendChild(this.powerDiv);
		this.div.appendChild(this.cntDiv);
		this.div.appendChild(this.speedDiv);
		
		
		this.div.className = "player";
		
		this.div.style.position = "absolute";
		this.div.style.left = (posX) + "px";
		this.div.style.top = (posY) + "px";
		
		this.nameDiv.className = "Bar";
		this.nameDiv.style.fontSize = "32px";
		this.nameDiv.innerText = playerData.name;
		
		this.imgDiv.className = "imgDiv";
		this.img =  document.createElement("img");
		this.imgDiv.appendChild(this.img);
		this.img.style.width = "100%";
		this.img.style.height = "100%";
		this.img.src = `./assets/Player/${playerData.imgName}.png`;
		
		this.powerDiv.className = "Bar";
		this.cntDiv.className = "Bar";
		this.speedDiv.className = "Bar";
	}
	
	setText(player){
		this.powerDiv.innerText = "Power: " + player.power;
		this.cntDiv.innerText = "Bomb number: " + player.maxBombCnt;
		this.speedDiv.innerText = "Speed: " + player.speedLevel;
	}
	
	destroy (){
		main.removeChild(this.div);
		return;
	}
};