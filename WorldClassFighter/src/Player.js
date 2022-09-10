class Player extends Sprite {
	constructor({position, color, velocity, playerType, imageSrc, frameMax=1, scale=1}){
		super({position, size: playerData[`${playerType}`].size, color, imageSrc, frameMax, scale});
		this.playerData = playerData[`${playerType}`];
		this.velocity = velocity;
		this.isAttacking = 0;
		this.attackCooltime = 0;
		this.direction = false; // false가 오른쪽봄, true가 왼쪽 봄
		this.maxHealth = this.playerData.maxHealth; // 100%라는 뜻임
		this.health = this.playerData.maxHealth;
		this.power = this.playerData.attack.basic.power; // 20%라는 뜻임
		this.isJump = false;
		this.action = "standing";
		this.attackBox = new Hitbox({
			position: this.position,
			size: {
				width: this.playerData.attack.basic.distance,
				height: 50,
			},
			color: "blue",
		});
	}
	
	
	
	draw() {
		super.draw();
		if (this.isAttacking) {
			this.attackBox.draw();
		}
	}
	
	update(enemyPosX) {
		super.update();
		if(this.position.x < enemyPosX)
			this.direction = false;
		else this.direction = true;
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
		if (this.position.y + this.size.height + this.velocity.y >= canvas.height - 100){
			this.isJump = false;
			this.velocity.y = 0;
		}
		else this.velocity.y += gravity;
		if(this.attackCooltime)
			this.attackCooltime--;
		if(this.isAttacking)
			this.isAttacking--;
		else this.changeAction("standing");
	}
	
	attack(attackType) {
		this.isAttacking = true;
		this.attackCooltime = this.playerData.attackDelay;
		
		this.power = this.playerData.attack[`${attackType}`].power;
		this.attackBox.size.width = this.playerData.attack[`${attackType}`].distance;
		if(attackType === "upper"){
			this.attackBox.size.height = this.size.height;
			this.attackBox.offset.right.y = 0;
			this.attackBox.offset.left.y = 0;
		} else{
			this.attackBox.size.height = 50;
			this.attackBox.offset.right.y = 50;
			this.attackBox.offset.left.y = 50;
		}
		this.attackBox.offset.left.x = (this.size.width / 2) - this.attackBox.size.width;
		this.attackBox.offset.right.x = (this.size.width / 2);
		
		if(this.direction){ //왼쪽
			this.attackBox.position = {
				x: this.position.x + this.attackBox.offset.left.x,
				y: this.position.y + this.attackBox.offset.left.y,
			};
		} else {
			
			this.attackBox.position = { //오른쪽
				x: this.position.x + this.attackBox.offset.right.x,
				y: this.position.y + this.attackBox.offset.right.y,	
			};
		}
		this.isAttacking = 30;
	}
	
	moveLeft() {
		this.velocity.x = -this.playerData.speed;
	}
	moveRight() {
		this.velocity.x = this.playerData.speed;
	}
	jump(){ 
		this.velocity.y = -this.playerData.jump;
		this.isJump = true;
	}
	
	damage(amount){
		this.health -= amount;
		if(this.health < 0)
			this.health = 0;
	}
	
	changeAction(action){
		switch (action) {
			case "standing":
				if (this.action !== action) {
					this.action = "standing";
					this.image.src = this.playerData.image.stand.src;
					this.frameMax = this.playerData.image.stand.frameMax;
					this.frameCurrent = 0;
					this.framesElapsed = 0;
				}else{
					console.log("ddd");
				}
				break;
			case "attacking":
				if (this.action !== action) {
					this.action = "attacking";
					this.image.src = this.playerData.image.attack.src;
					this.frameMax = this.playerData.image.attack.frameMax;
					this.frameCurrent = 0;
					this.framesElapsed = 0;
					
				}
							
				break;
		}
	}
}
