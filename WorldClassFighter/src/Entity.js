class Entity {
	constructor( {position, size, color, scale=1}) {
		this.position = position;
		this.size = size;
		this.color = color;
		this.scale = scale;
	}
	
	update() {
		this.draw();
	}

	draw() {
		c.fillStyle = this.color;
		c.fillRect(this.position.x, this.position.y, this.size.width * this.scale, this.size.height * this.scale);
		
	}
}

class Sprite extends Entity {
	constructor( {position, size, color, imageSrc, frameMax=1, scale=1} ) {
		super({position, size, color, scale});
		this.image = new Image();
		this.image.src = imageSrc;
		this.frameMax = frameMax;
		this.frameCurrent = 0;
		this.framesElapsed = 0;
	}
	
	draw() {
		//super.draw();
		if(this.image !== null)
			//c.drawImage(this.image, this.position.x, this.position.y, this.size.width * this.scale, this.size.height * this.scale);
		
			c.drawImage(this.image, 
						this.frameCurrent * (this.image.width / this.frameMax), 0,
						this.image.width / this.frameMax, 
						this.image.height, 
						this.position.x, 
						this.position.y,
						this.size.width * this.scale, this.size.height * this.scale);
	}
	
	update() {
		super.update();
		this.framesElapsed = ((this.framesElapsed + 1) % 10);
		if(this.framesElapsed === 0){
			this.frameCurrent = (this.frameCurrent + 1) % this.frameMax;
		}	
	}
}

class Hitbox extends Entity {
	constructor({position, size, color}){
		super({position, size, color});
		this.offset = { 
			right: { // 오른쪽을 바라봄
				x: 20,
				y: 50,
			}, 
			left: {
				x: -70,
				y: 50,
			}
		};
	}
	
	draw() {
		super.draw();
	}
	
}

