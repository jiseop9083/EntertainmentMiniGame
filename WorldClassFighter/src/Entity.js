class Entity {
	constructor( {position, size, color=`rgba(0,0,0,0)`, imageSrc=null}) {
		this.position = position;
		this.size = size;
		this.color = color;
	}
	
	update() {
		this.draw();
	}

	draw() {
		c.fillStyle = this.color;
		c.fillRect(this.position.x, this.position.y, this.size.width, this.size.heigh);
		
	}
}

class Sprite extends Entity {
	constructor( {position, size, color, imageSrc, offset, isFlip=false, frameMax=1, scale=1, frameCnt=10} ) {
		super({position, size, color});
		this.image = new Image();
		this.image.src = imageSrc;
		this.frameMax = frameMax;
		this.frameCurrent = 0;
		this.framesElapsed = 0;
		this.scale = scale;
		this.offset = offset;
		this.frameCnt = frameCnt;
		this.isFlip = isFlip;
	}
	// ctx.scale(scaleH, scaleV); // Set scale to flip the image
    //ctx.drawImage(img, posX, posY, width, height); // draw the image
	draw() {
		if(this.image !== null)
			c.save();
			this.isFlip ? c.scale(-1, 1) : c.scale(1, 1);
			c.drawImage(this.image, 
						this.frameCurrent * (this.image.width / this.frameMax), 0,
						this.image.width / this.frameMax, 
						this.image.height, 
						(this.isFlip ? ((this.offset.x/2)-(this.image.width / this.frameMax)-this.position.x) : (this.position.x + this.offset.x)), 
						this.position.y + this.offset.y,
						(this.image.width / this.frameMax) * this.scale,
      					this.image.height * this.scale);
			c.restore();
		
		 
     
	}
	
	update() {
		super.update();
		this.framesElapsed = ((this.framesElapsed + 1) % this.frameCnt);
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

