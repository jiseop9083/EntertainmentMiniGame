
// instance 모음
let playerBar1 = document.querySelector('#playerBar1');
let playerBar2 = document.querySelector('#playerBar2');
let playerBarDegree1 = 0;
let playerBarDegree2 = 0;

let keySet = new Set();

window.addEventListener("keydown", (e) => {
	const key = e.key;
	keySet.add(key);
	console.log(keySet);
});

window.addEventListener("keyup", (e) => {
	const key = e.key;
	keySet.delete(key);
	console.log(keySet);
});

setInterval(() => {
	if (keySet.has("ArrowRight") && playerBarDegree1 <= 65) {
		playerBarDegree1 += 5;
		playerBar1.style.transform = 'rotate(' + playerBarDegree1 + 'deg)';
	}
	if(keySet.has("ArrowLeft") && playerBarDegree1 >= -65){
		playerBarDegree1 -= 5;
		playerBar1.style.transform = 'rotate(' + playerBarDegree1 + 'deg)';
	}
	if (keySet.has("a") && playerBarDegree2 <= 65) {
		playerBarDegree2 += 5;
		playerBar2.style.transform = 'rotate(' + playerBarDegree2 + 'deg)';
	}
	if(keySet.has("d") && playerBarDegree2 >= -65){
		playerBarDegree2 -= 5;
		playerBar2.style.transform = 'rotate(' + playerBarDegree2+ 'deg)';
	}
	}, 1000 / 30);