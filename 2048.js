// 각종 변수
var board=[[0,0,2,0],[0,0,0,0],[0,0,0,2],[0,0,0,0]];
var score = 0;
var highScore= 0;


// dom객체
var up = document.querySelector('#up');
var down = document.querySelector('#down');
var left = document.querySelector('#left');
var right= document.querySelector('#right');
var rs = document.querySelector('#reset');


up.addEventListener('click',moveUp);
down.addEventListener('click',moveDown);
right.addEventListener('click',moveRight);
left.addEventListener('click',moveLeft);
rs.addEventListener('click', reset);

alert('debug');
show();
//-----------------------------------
// 함수
//-----------------------------------

// 화면을 보여주는 함수
function show(){
	var numbers = 	document.querySelectorAll('#board tr td');
	var cnt = 0;
	for(var i = 0; i<4; i++){
		for(var j = 0; j<4; j++){
			switch (board[i][j]){
				case 2:
					numbers[(i*4) +j].innerText = 2;
					numbers[(i*4) +j].style.fontSize = "50px";
					numbers[(i*4) +j].style.color = "black";
					numbers[(i*4) +j].style.backgroundColor = "#ffffbb";
					break;
				
				case 4:
					numbers[(i*4) +j].innerText = 4;
					numbers[(i*4) +j].style.fontSize = "50px";
					numbers[(i*4) +j].style.color = "black";
					numbers[(i*4) +j].style.backgroundColor = "#ffee66";
					break;
					
					case 8:
					numbers[(i*4) +j].innerText = 8;
					numbers[(i*4) +j].style.fontSize = "50px";
					numbers[(i*4) +j].style.color = "black";
					numbers[(i*4) +j].style.backgroundColor = "#ffee00";
					break;
					
					case 16:
					numbers[(i*4) +j].innerText = 16;
					numbers[(i*4) +j].style.fontSize = "50px";
					numbers[(i*4) +j].style.color = "black";
					numbers[(i*4) +j].style.backgroundColor = "#ffcc66";
					break;
					
					case 32:
					numbers[(i*4) +j].innerText = 32;
					numbers[(i*4) +j].style.fontSize = "50px";
					numbers[(i*4) +j].style.color = "black";
					numbers[(i*4) +j].style.backgroundColor = "#ff8844";
					break;
					
					case 64:
					numbers[(i*4) +j].innerText = 64;
					numbers[(i*4) +j].style.fontSize = "50px";
					numbers[(i*4) +j].style.color = "black";
					numbers[(i*4) +j].style.backgroundColor = "#ff5533";
					break;
					
					case 128:
					numbers[(i*4) +j].innerText = 128;
					numbers[(i*4) +j].style.fontSize = "45px";
					numbers[(i*4) +j].style.color = "black";
					numbers[(i*4) +j].style.backgroundColor = "#ff2222";
					break;
					
					case 256:
					numbers[(i*4) +j].innerText = 256;
					numbers[(i*4) +j].style.fontSize = "45px";
					numbers[(i*4) +j].style.color = "black";
					numbers[(i*4) +j].style.backgroundColor = "#cc1111";
					break;
					
					case 512:
					numbers[(i*4) +j].innerText = 512;
					numbers[(i*4) +j].style.fontSize = "45px";
					numbers[(i*4) +j].style.backgroundColor = "#990000";
					numbers[(i*4) +j].style.color = "white";
					break;
					
					case 1024:
					numbers[(i*4) +j].innerText = 1024;
					numbers[(i*4) +j].style.fontSize = "40px";
					numbers[(i*4) +j].style.backgroundColor = "#660000";
					numbers[(i*4) +j].style.color = "white";
					break;
					
					case 2048:
					numbers[(i*4) +j].innerText = 2048;
					numbers[(i*4) +j].style.fontSize = "40px";
					numbers[(i*4) +j].style.backgroundColor = "#330000";
					numbers[(i*4) +j].style.color = "white";
					break;
					
					case 4096:
					numbers[(i*4) +j].innerText = 4096;
					numbers[(i*4) +j].style.fontSize = "40px";
					numbers[(i*4) +j].style.backgroundColor = "#000000";
					numbers[(i*4) +j].style.color = "white";
					break;
					
					case 8192:
					numbers[(i*4) +j].innerText = 8192;
					numbers[(i*4) +j].style.fontSize = "40px";
					numbers[(i*4) +j].style.color = "black";
					numbers[(i*4) +j].style.backgroundColor = "#ccffff";
					break;
					
					case 16384:
					numbers[(i*4) +j].innerText = 16384;
					numbers[(i*4) +j].style.fontSize = "35px";
					numbers[(i*4) +j].style.color = "black";
					numbers[(i*4) +j].style.backgroundColor = "#66ffff";
					break;
					
					case 32768:
					numbers[(i*4) +j].innerText = 32768;
					numbers[(i*4) +j].style.fontSize = "35px";
					numbers[(i*4) +j].style.color = "black";
					numbers[(i*4) +j].style.backgroundColor = "#00ffff";
					break;
					
					case 65536:
					numbers[(i*4) +j].innerText = 65536;
					numbers[(i*4) +j].style.fontSize = "35px";
					numbers[(i*4) +j].style.color = "black";
					numbers[(i*4) +j].style.backgroundColor = "#00ddff";
					break;
					
					case 131072:
					numbers[(i*4) +j].innerText = 131072;
					numbers[(i*4) +j].style.fontSize = "30px";
					numbers[(i*4) +j].style.color = "black";
					numbers[(i*4) +j].style.backgroundColor = "#D670F6";
					break;
					
					default:
						numbers[(i*4) +j].innerText = "";
					numbers[(i*4) +j].style.backgroundColor = "white";
			}
		}
	}
	var sc= document.querySelector('#sc');
	sc.innerText = "현재 점수: " + score;
	sc.style.fontSize = "50px";
	var tier= document.querySelector('#tier');
	tier.style.fontSize = "50px";
	if(score < 350){
		tier.innerText = "스톤즈";
		tier.style.color = "#323232";
	} else if(score < 1250){
		tier.innerText = "브론즈";
		tier.style.color = "#8b5927";
	}
	else if(score < 4500){
		tier.innerText = "실버";
		tier.style.color = "#c8c8c8";
	}
	else if(score < 10000){
	 tier.innerText = "골드";
	 tier.style.color = "#ffc800";
	}
	else if(score < 22000){
	 tier.innerText = "플래티넘";
	 tier.style.color = "#52e4dc";
	}
	else if(score < 45000){
	 tier.innerText = "다이아";
	 tier.style.color = "#288cff";
	}
	else if(score < 88888){
	 tier.innerText = "마스터";
	 tier.style.color = "#1e821e";
	}
	else if(score < 450000){
	 tier.innerText = "챌린저";
	 tier.style.color = "#800080";
	}
	else if(score < 1000000){
	 tier.innerText = "챔피언";
	}
	else {
	 tier.innerText = "럭키";
	}
}

//reset하는 함수
function reset(){
	for(var i = 0; i<4; i++){
		for(var j = 0; j<4; j++){
			board[i][j] = 0;
		}
	}
	board[0][2] = 2;
	board[2][3] = 2;
 score = 0;
 show();
 alert("reset complete!");
}

//숫자 이동 함수
function moveUp(){
	var ret = 0;
	var isMove = 0;
	var number = 0;
	for(var j = 0; j < 4; j++){
		var last = 0;
		var cnt = 0;
		for(var i = 0; i < 4; i++){
			if(board[i][j] == 0)
				number++;
			else if(board[i][j] == last){
				board[cnt-1][j] += last;
				ret += last;
				board[i][j] = 0;
				last = 0;
				isMove = 1;
			}
			else{
				let temp = board[i][j];
				board[i][j] = 0;
				board[cnt][j] = temp;
				last = temp;
				if(cnt != i)
					isMove = 1;
				cnt++;
			}
		}
	}
	if(isEnd() == 1){
	alert("게임이 끝났습니다. \n최종 점수: " + score);
	 highScore = score;
	if(score > highScore){
	 hs = document.querySelector("#hs");
	 hs.innerText = "최고 점수: " + highScore;
	 }
	reset();
	return;
	}
	if(isMove == 1)
		addNum();
	score += ret;
	show();
}

function moveDown(){
	var ret = 0;
	var isMove = 0;
	var number = 0;
	for(var j = 0; j < 4; j++){
		var last = 0;
		var cnt = 3;
		for(var i = 3; i >= 0; i--){
			if(board[i][j] == 0)
				number++;
			else if(board[i][j] == last){
				board[cnt+1][j] += last;
				ret += last;
				board[i][j] = 0;
				last = 0;
				isMove = 1;
			}
			else{
				let temp = board[i][j];
				board[i][j] = 0;
				board[cnt][j] = temp;
				last = temp;
				if(cnt != i)
					isMove = 1;
				cnt--;
			}
		}
	}
	if(isEnd() == 1){
	 alert("게임이 끝났습니다.\n최종 점수: " + score);
 if(score > highScore){
  highScore = score;
	 hs = document.querySelector("#hs");
	 hs.innerText = "최고 점수: " + highScore;
	 }
	reset();
	return;
	}
	if(isMove == 1)
	 addNum();
	score += ret;
	show();
}

function moveRight(){
	var ret = 0;
	var isMove = 0;
	var number = 0;
	for(var i = 0; i < 4; i++){
		var last = 0;
		var cnt = 3;
		for(var j = 3; j >= 0; j--){
			if(board[i][j] == 0)
				number++;
			else if(board[i][j] == last){
				board[i][cnt+1] += last;
				ret += last;
				board[i][j] = 0;
				last = 0;
				isMove = 1;
			}
			else{
				let temp = board[i][j];
				board[i][j] = 0;
				board[i][cnt] = temp;
				last = temp;
				if(cnt != j)
					isMove = 1;
				cnt--;
			}
		}
	}
	if(isEnd() == 1){
	alert("게임이 끝났습니다.\n최종 점수: " + score);
	if(score > highScore){
	 highScore = score;
	 hs = document.querySelector("#hs");
	 hs.innerText = "최고 점수: " + highScore;
	 }
	reset();
	return;
	}
	if(isMove == 1)
	 addNum();
	score += ret;
	show();
}

function moveLeft(){
	var ret = 0;
	var isMove = 0;
	var number = 0;
	for(var i = 0; i < 4; i++){
		var last = 0;
		var cnt = 0;
		for(var j = 0; j < 4; j++){
			if(board[i][j] == 0)
				number++;
			else if(board[i][j] == last){
				board[i][cnt-1] += last;
				ret += last;
				board[i][j] = 0;
				last = 0;
				isMove = 1;
			}
			else{
				let temp = board[i][j];
				board[i][j] = 0;
				board[i][cnt] = temp;
				last = temp;
				if(cnt != j)
					isMove = 1;
				cnt++;
			}
		}
	}
	if(isEnd() == 1){
	alert("게임이 끝났습니다.\n최종 점수: " + score);
	if(score > highScore){
	 highScore = score;
	 hs = document.querySelector("#hs");
	 hs.innerText = "최고 점수: " + highScore;
	 }
	reset();
	return;
	}
	if(isMove == 1)
	 addNum();
	score += ret;
	show();
}

function isEnd(){
 var dx = [1,-1,0,0];
 var dy = [0,0,1,-1];
 var ret = 1;
 for(var y = 0; y < 4; y++){
  for(var x = 0; x < 4; x++){
   for(var i = 0; i < 4; i++){
    let xx = x + dx[i];
    let yy = y + dy[i];
    if(xx < 0 || xx >= 4 || yy < 0 || yy >= 4){
     continue;
    }
    if(board[y][x] == 0)
     ret = 0;
    if(board[y][x] == board[yy][xx]){
     ret = 0;
    }
   }
  }
 }
 return ret;
}

// 랜덤으로 숫자 하나 추가
// 10% 4, 90% 2
function addNum(){
	var cnt = 0;
	var numList = new Array();
 for(var i = 0; i < 4; i++){
 	for(var j = 0; j < 4; j++){
 		if(board[i][j] ==0){
 		 numList.push(new Array(i,j));
 		}
 	}
 }
 let num = Math.floor(Math.random() * numList.length);
 board[numList[num][0]][numList[num][1]] = (Math.random() <= 0.1? 4 : 2);
}