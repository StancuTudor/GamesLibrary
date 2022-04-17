var answer = "";
var game = true;
var result = 0;
var guess = 0;
var games_list = [
"75/5+4*3", "10-2*3+3", "90-7*8/2", "1021-983", "2*10-3*4", "212-10*5", "2*(10-3)",
"39+45+23", "(24-9)*3"
]
var freq = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var board = "";

window.onload = function()
{
	let random_index = Math.floor(Math.random() * games_list.length);
	answer = games_list[random_index];
	result = eval(answer);
	
	for(let j = 0; j < 6; j++){
		for(let i = 0; i < answer.length; i++)
		{
			let tile = document.createElement("div");
			tile.setAttribute("class", "tile");
			tile.setAttribute("id", String(j) + String(i));
			document.getElementById("board").appendChild(tile);
		}
		document.getElementById("board").appendChild(document.createElement('br'));
	}
	document.getElementById("result").innerHTML = "Result: " + String(result);
}

function isOperation(op)
{
	if(op == '+' || op == '-' || op == '*' || op == '/' || op == '(' || op == ')') return true;
	return false;
}

function checkCheat()
{
	if(board[0] == '0' && !isOperation(board[1])) return true;
	for(let i = 1; i < board.length - 1; i++)
		if(board[i] == '0' && isOperation(board[i-1]) && !isOperation(board[i+1])) return true;
	return false;
}

function clicked(id)
{
	if(!game) return;
	if(board.length == answer.length) return;
	document.getElementById(String(guess)+String(board.length)).innerHTML = id;
	board += id;
}

function backspace()
{
	if(!game) return;
	if(board.length == 0) return;
	board = board.slice(0, -1);
	document.getElementById(String(guess)+String(board.length)).innerHTML = "";
}

function color(pos, clr)
{
	document.getElementById(String(guess) + String(pos)).style.backgroundColor = clr;
	let btn = document.getElementById(board[pos]);
	
	if(btn.style.backgroundColor == "green") return;
	if(btn.style.backgroundColor == "#ffcc00" && clr == "red") return;
	
	btn.style.backgroundColor = clr;
}

function setFreq(chr, val)
{
	let i;
	if(chr >= '0' && chr <= '9') i = parseInt(chr);
	if(chr == '+') i = 10;
	if(chr == '-') i = 11;
	if(chr == '*') i = 12;
	if(chr == '/') i = 13;
	if(chr == '(') i = 14;
	if(chr == ')') i = 15;
	freq[i] += val;
	return freq[i];
}

function checkChr(pos)
{
	if(setFreq(board[pos], 0) > 0){
		setFreq(board[pos], -1);
		color(pos, "#ffcc00");
	}
	else color(pos,"red");
}

function colorBoard()
{
	let win = true;
	
	for(let i = 0; i < answer.length; i++)
		setFreq(answer[i], 1);
	
	for(let i = 0; i < board.length; i++)
	{
		if(answer[i] == board[i]) {
			color(i, "green");
			setFreq(answer[i], -1);
		}
		else win = false;
	}
	
	for(let i = 0; i < board.length; i++)
		if(answer[i] != board[i]) checkChr(i);
	
	for(let i = 0; i < 16; i++)
		freq[i] = 0;
	
	return win;
}

function enter()
{
	if(checkCheat()) return;
	if(board.length != answer.length) return;
	if(eval(board) != result) return;
	let win = colorBoard();
	
	if(win) {
		game = false;
		return;
	}
	
	board = [];
	guess++;
	if(guess == 6) {
		alert(answer);
		game = false;
	}
}

document.addEventListener("keypress", function onEvent(event) {
	if(event.key == "Enter") enter();
	else {
		if(event.key == " ") backspace();
		if(setFreq(event.key, 0) != 0) return;
		clicked(event.key);
	}
});

function reload()
{
	location.reload();
}