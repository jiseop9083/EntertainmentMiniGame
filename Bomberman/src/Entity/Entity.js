
class Entity{
	constructor(posY, posX, className, size=blockSize){
		this.size = size;
		this.posX = posX*size;
		this.posY = posY*size;
		this.div = document.createElement("div");
		this.img = document.createElement("img");
		
		gameView.append(this.div);
		this.div.style.position = "absolute";
		this.div.style.left = (posX*blockSize) + "px";
		this.div.style.top = (posY*blockSize) + "px";
		this.div.className = className;
		
		this.div.appendChild(this.img);
		this.img.style.width = "100%";
		this.img.style.height = "100%";
	}
	
	destroy(){
		gameView.removeChild(this.div);
		return;
	}
};
