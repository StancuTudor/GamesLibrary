var n = 1;
var b = [[0,0,0],[0,0,0],[0,0,0]];
var game = true;

function win(player)
{
	game = false;
	document.getElementById("winMessage").innerHTML = player + " won!";
}

function checkWin()
{
	for(let i = 0; i < 3; i++)
	{
		if(b[i][0] != 0 && b[i][0] == b[i][1] && b[i][0] == b[i][2]) return true;
	}
	for(let j = 0; j < 3; j++)
	{
		if(b[0][j] != 0 && b[0][j] == b[1][j] && b[0][j] == b[2][j]) return true;
	}
	if(b[0][0] != 0 && b[0][0] == b[1][1] && b[0][0] == b[2][2]) return true;
	if(b[2][0] != 0 && b[2][0] == b[1][1] && b[2][0] == b[0][2]) return true;
	
	return false;
}

function display(place)
{
	if(!game)return;
	let p = document.getElementById(place);
	if(n % 2 === 1){
		p.src = "images/x.png";
	}
	else {
		p.src = "images/o.png";
	}
	p.style.opacity=0.25;
}
function remove(place)
{
	let p = document.getElementById(place);
	p.src = "images/empty.png";
	p.style.opacity=1;
}

function turn_taken(place)
{
	if(!game)return;
	let p = document.getElementById(place);
	p.onclick = "";
	p.onmouseover = "";
	p.onmouseout = "";
	p.style.opacity=1;
	
	let i = Math.floor(parseInt(place) / 10) - 1;
	let j = parseInt(place) % 10 - 1;
	
	if(n % 2 === 1){
		p.src = "images/x.png";
		b[i][j] = 1;
		if(checkWin()) win("X");
	}
	else {
		p.src = "images/o.png";
		b[i][j] = 2;
		if(checkWin()) win("O");
	}
	n++;
	if(game && n == 10)
		document.getElementById("winMessage").innerHTML = "Draw.";
}

function reload()
{
	location.reload();
}