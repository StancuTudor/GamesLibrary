var board = [];
var player = 1;
var game = true;
var moves = 0;

window.onload = function()
{	
	for(let j = 1; j <= 7; j++)
	{
		let tile = document.createElement("img");
		tile.setAttribute("src", "images/empty.png");
		tile.setAttribute("class", "upper-item");
		tile.setAttribute("id", String(0)+String(j));
		document.getElementById("board").appendChild(tile);
	}
	board.push([]);
	for(let i = 1; i < 7; i++)
	{
		board.push([]);
		board[i].push(0);
		for(let j = 1; j <= 7; j++)
		{
			board[i].push(0);
			let tile = document.createElement("img");
			tile.setAttribute("src", "images/empty.png");
			tile.setAttribute("class", "grid-item " + String(j));
			tile.setAttribute("id", String(i)+String(j));
			tile.setAttribute("onmouseover", "preMove(id)");
			tile.setAttribute("onmouseout", "notMove(id)");
			tile.setAttribute("onclick", "move(id)");
			
			document.getElementById("board").appendChild(tile);
		}
	}
}

function checkWin(x,y)
{
	// vertical check
	let i = x, j = y, nr = 0;
	while(i < 7 && board[i][j] == player)
	{
		i++;
		nr++;
	}
	if(nr >= 4) return true;
	
	// horizontal check
	i = x, j = y, nr = 0;
	while(j <= 7 && board[i][j] == player)
	{
		j++;
		nr++;
	}
	j = y - 1;
	while(j > 0 && board[i][j] == player)
	{
		j--;
		nr++;
	}
	if(nr >= 4) return true;
	
	// diagonal 1 check
	i = x, j = y, nr = 0;
	while(j <= 7 && i < 7 && board[i][j] == player)
	{
		i++;
		j++;
		nr++;
	}
	j = y - 1; i = x - 1;
	while(j > 0 && i > 0 && board[i][j] == player)
	{
		i--;
		j--;
		nr++;
	}
	if(nr >= 4) return true;
	
	// diagonal 2 check
	i = x, j = y, nr = 0;
	while(j <= 7 && i > 0 && board[i][j] == player)
	{
		i--;
		j++;
		nr++;
	}
	j = y - 1; i = x + 1;
	while(j > 0 && i < 7 && board[i][j] == player)
	{
		i++;
		j--;
		nr++;
	}
	if(nr >= 4) return true;
	
	return false;
}

function displayWin()
{
	let winMsg = document.getElementById("winMessage");
	if(player == 1) winMsg.innerHTML = "Green wins.";
	if(player == 2) winMsg.innerHTML = "Red wins.";
}

function move(id)
{
	if(!game) return;
	let c = parseInt(id) % 10;
	let l = 0;
	while(l < 6 && board[l+1][c] == 0)
		l++;
	if(l == 0) return;
	board[l][c] = player;
	document.getElementById(String(l)+String(c)).src = "images/"+String(player)+".png";
	if(checkWin(l,c)){
		game = false;
		notMove(String(l)+String(c));
		displayWin();
		return;
	}
	player = player % 2 + 1;
	moves++;
	if(moves == 42){
		document.getElementById("winMessage").innerHTML = "Draw.";
		game = 0;
		notMove(String(l)+String(c));
		return;
	}
	preMove(String(l)+String(c));
}

function preMove(id)
{
	if(!game) return;
	let c = parseInt(id) % 10;
	let column = document.getElementsByClassName(String(c));
	for(let i = 0; i < 6; i++)
		column[i].style.backgroundColor = "yellow";
	document.getElementById("0"+String(c)).src="images/"+String(player)+".png";
}

function notMove(id)
{
	let c = parseInt(id) % 10;
	let column = document.getElementsByClassName(String(c));
	for(let i = 0; i < 6; i++)
		column[i].style.backgroundColor = "white";
	document.getElementById("0"+String(c)).src="images/empty.png";
}

function reload()
{
	location.reload();
}
