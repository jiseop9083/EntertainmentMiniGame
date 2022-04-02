class Block extends Entity {
	constructor(posY , posX, imgName, className){
		super(posY, posX, className);
		this.type = className;
		this.img.src = `./assets/Block/${imgName}.png`;
	}
	
	destroy(){
		super.destroy();
	}
};

class UnbreakableBlock extends Block {
	constructor(posY , posX){
		super(posY, posX, "unbreakableBlock", "UnbreakableBlock");
	}
};

class BreakableBlock extends Block {
	constructor(posY, posX){
		super(posY, posX, "breakableBlock", "BreakableBlock");
	}
};

class SpeedItemBlock extends Block {
	constructor(posY, posX){
		super(posY, posX, "breakableBlock", "BreakableBlock");
	}
};

class PowerItemBlock extends Block {
	constructor(posY , posX){
		super(posY, posX, "breakableBlock", "BreakableBlock");
	}
};

class CntUpItemBlock extends Block {
	constructor(posY , posX){
		super(posY, posX, "breakableBlock", "BreakableBlock");
	}
};

class Bomb extends Block {
	constructor(posY, posX, power, owner, timer=FPS*2){
		super(posY, posX, "bomb", "Bomb");
		this.power = power;
		this.owner = owner;
		this.timer =timer;
	}
	
	destroy(){
		super.destroy();
		return this.owner;
	}
	
	countDown(){
		this.timer--;
		if(this.timer <= 0)
			return 1;
		return 0;
	}
};

class ExplodingBlock extends Block {
	constructor(posY, posX, remain="", timer=FPS*0.5){
		super(posY, posX, "explodingBlock", "ExplodingBlock");
		this.remain = remain;
		this.timer =timer;
	}

	countDown(){
		this.timer--;
		if(this.timer <= 0)
			return 1;
		return 0;
	}
};