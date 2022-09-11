class Player extends Sprite {
	constructor({position, color, velocity, playerType, size, imageSrc, offset, frameMax=1, scale=1}){
		super({position, size, color, imageSrc, offset, frameMax, scale});
		this.playerData = playerData[`${playerType}`];
		this.velocity = velocity;
		this.isAttacking = 0;
		this.isAttacked = 0;
		this.attackCooltime = 0;
		this.direction = false; // false가 오른쪽봄, true가 왼쪽 봄
		this.maxHealth = this.playerData.maxHealth; // 100%라는 뜻임
		this.health = this.playerData.maxHealth;
		this.power = this.playerData.posture.basic.power; // 20%라는 뜻임
		this.isJump = false;
		this.action = "standing";
		this.attackBox = new Hitbox({
			position: this.position,
			size: {
				width: this.playerData.posture.basic.distance,
				height: 50,
			},
			color: "black",
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
		if(this.position.x < enemyPosX){
			this.direction = false;
			this.isFlip = false;
		} else {
			this.direction = true;
			this.isFlip = true;
		}
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
		if(this.isAttacked)
			this.isAttacked--;
		this.changeAction("standing");
	}
	
	attack(attackType) {
		if(this.isAttacked)
			return;
		this.isAttacking = true;
		this.attackCooltime = this.playerData.attackDelay;
		let atkType = this.playerData.posture[`${attackType}`];
		this.power = atkType.power;
		this.attackBox.size.width = atkType.distance;
		if(attackType === "upper"){
			this.attackBox.size.height = this.size.height;
			this.attackBox.offset.right.y = 0;
			this.attackBox.offset.left.y = 0;
		} else if(attackType === "under"){
			this.attackBox.size.height = 50;
			this.attackBox.offset.right.y = this.size.height - 50;
			this.attackBox.offset.left.y = this.size.height - 50;
		} else{
			this.attackBox.size.height = 50;
			this.attackBox.offset.right.y = (this.size.height / 4);
			this.attackBox.offset.left.y = (this.size.height / 4);
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
		this.isAttacking = atkType.frameMax * atkType.frameCnt;
	}
	
	moveLeft() {
		if(this.isAttacking && !this.isJump)
			return;
		if(this.isAttacked)
			return;
		this.velocity.x = -this.playerData.speed;
	}
	moveRight() {
		if(this.isAttacking && !this.isJump)
			return;
		if(this.isAttacked)
			return;
		this.velocity.x = this.playerData.speed;
	}
	jump(){ 
		if(this.isAttacked)
			return;
		this.velocity.y = -this.playerData.jump;
		this.isJump = true;
	}
	
	damage(amount){
		if(this.isAttacked)
			return;
		this.health -= amount;
		this.changeAction("attacked");
		this.isAttacked = this.frameMax * this.frameCnt;
		this.isAttacking = 0;
		if(this.health < 0)
			this.health = 0;
	}
	
	changeAction(action){
		
		if (this.action === "attacking" && this.isAttacking){
			return;
		}
		if (this.action === "attacked" && this.isAttacked){
					console.log(this.isAttacked);
			return;
		}
		switch (action) {
			case "standing":
				if (this.action !== action) {
					this.action = "standing";
					this.image = new Image();
					this.image.src = this.playerData.posture.stand.src;
					this.frameMax = this.playerData.posture.stand.frameMax;
					this.frameCnt = this.playerData.posture.stand.frameCnt;
					this.frameCurrent = 0;
					this.framesElapsed = 0;
				}
				break;
			case "attacked":
				if (this.action !== action) {
					this.action = "attacked";
					this.image = new Image();
					this.image.src = this.playerData.posture.attacked.src;
					this.frameMax = this.playerData.posture.attacked.frameMax;
					this.frameCnt = this.playerData.posture.attacked.frameCnt;
					this.frameCurrent = 0;
					this.framesElapsed = 0;
				}
				break;	
			case "attacking": //front attack
				if (this.action !== action) {
					this.action = "attacking";
					this.image = new Image();
					this.image.src = this.playerData.posture.front.src;
					this.frameMax = this.playerData.posture.front.frameMax;
					this.frameCnt = this.playerData.posture.front.frameCnt;
					this.frameCurrent = 0;
					this.framesElapsed = 0;
					
				}
							
				break;
		}
	}
}
