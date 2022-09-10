const playerData = {
	muscleMemory: {
		src: null,
		size: {
			width: 80,
			height: 150,
		},
		maxHealth: 300,
		speed: 3, 
		jump: 8,
		attackDelay: 0.5 * 60,
		attack: { // y범위 : basic, front, back은 중간 살짝 위, upper는 전체, under는 아래
			basic: { // 실전에서는 데미지 3배 올리기
				power: 30,
				distance: 75 + 40,
			},
			front: {
				power: 40,
				distance: 100 + 40,
			},
			back: {
				power: 60,
				distance: 60 + 40,
			},
			upper: { 
				power: 70,
				distance: 40 + 40,
			},
			under: { 
				power: 50,
				distance: 70 + 40,
			},
		},
		image: {
			stand: {
				src: "./assets/player/muscleMemory/stand.png",
				frameMax: 2,
			},
			attack: {
				src: "./assets/player/muscleMemory/attack.png",
				frameMax: 3,
			},
		}
	},
	
};