class Item extends Block{
	constructor(posY , posX, imgName, className, size=42){
		super(posY, posX, imgName, className);
		
		this.size = size;
		this.div.style.left = posX*blockSize + (blockSize - size)/2 + "px";
		this.div.style.top = posY*blockSize + (blockSize - size)/2 + "px";
	}
};

class CntItem extends Item{
	constructor(posY, posX){
		super(posY, posX, "cntItem", "Item");
	}
};

class PowerItem extends Item{
	constructor(posY , posX){
		super(posY, posX, "powerItem", "Item");
	}
};


class SpeedItem extends Item{
	constructor(posY , posX){
		super(posY, posX, "speedItem", "Item");
	}
};