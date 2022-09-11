const playerData = {
	muscleMemory: { 
		src: null,
		size: {
			width: 84,
			height: 151,
		},
		maxHealth: 300,
		speed: 3, 
		jump: 8,
		attackDelay: 0.5 * 60,
		posture: { // y범위 : basic, front, back은 중간 살짝 위, upper는 전체, under는 아래
			scale: 2.4,
			offset: {
					x: -192,
					y: -165,
			},
			stand: {  // 35X63
				src: "./assets/player/muscleMemory/standing.png",
				frameMax: 4,
				frameCnt: 10,
			},
			attacked: {
				src: "./assets/player/muscleMemory/attacked.png",
				frameMax: 4,
				frameCnt: 3,
			},
			basic: { // 실전에서는 데미지 3배 올리기
				power: 30,
				distance: 43 + 42, // 비확정
				src: "./assets/player/muscleMemory/attacking.png",
				frameMax: 7,
				frameCnt: 2,
			},
			front: {
				power: 35,
				distance: 45 + 42, // 57 X 2.4 픽셀
				src: "./assets/player/muscleMemory/attacking.png",
				frameMax: 7,
				frameCnt: 3,
			},
			back: {
				power: 45,
				distance: 40 + 42, // 비확정
				src: "./assets/player/muscleMemory/attacking.png",
				frameMax: 7,
				frameCnt: 5,
			},
			upper: { 
				power: 70,
				distance: 30 + 42, // 비확정
				src: "./assets/player/muscleMemory/attacking.png",
				frameMax: 7,
				frameCnt: 7,
			},
			under: { 
				power: 50,
				distance: 40 + 42, // 비확정
				src: "./assets/player/muscleMemory/attacking.png",
				frameMax: 7,
				frameCnt: 5,
			},
		},
	},
	
};