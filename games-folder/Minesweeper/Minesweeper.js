function reload()
{
	location.reload();
}
var map = [];
var m = 10, n = 10;
var game = true;
var goodTiles = 0;
var nrBombs = 0;
var nrFlags = 0;

function random()
{
	nrBombs = Math.floor(m*n/8);
	for(let i = 1; i <= nrBombs; i++)
	{
		let x = Math.floor(Math.random() * m);
		let y = Math.floor(Math.random() * n);
		if(map[x][y] == -1) i--;
		else map[x][y] = -1;
	}
	
}

window.onload = function()
{
	let board = document.getElementById("board");
	
	for(let i = 0; i < m; i++)
	{
		map.push([]);
		for(let j = 0; j < n; j++)
			map[i].push(0);
	}
	
	random();
	document.getElementById("bombNr").innerHTML = "Bombs: "+String(nrBombs - nrFlags);
	
	for(let i = 0; i < m; i++)
		for(let j = 0; j < n; j++)
		{
			let tile = document.createElement("img");
			tile.setAttribute("class", "tile");
			tile.setAttribute("src", "images/empty.png");
			tile.setAttribute("id", String(i) + String(j));
			tile.setAttribute("onclick", "tileClick(id)");
			tile.setAttribute("ondblclick", "shortcut(id)");
			tile.setAttribute("onmousedown", "grey(id)");
			tile.setAttribute("onmouseup", "ungrey(id)");
			
			board.appendChild(tile);
		}
}

function grey(id)
{
	let flag = document.getElementById("flagSwitch").checked;
	if(flag) return;
	let x = Math.floor(parseInt(id) / 10);
	let y = parseInt(id) % 10;
	if(!game || (map[x][y] != 0 && map[x][y] != -1)) return;
    document.getElementById("emoji").src="images/wowEmoji.png";
	document.getElementById(id).src = "images/Tiles/0.png";
}

function ungrey(id)
{
	if(!game) return;
    document.getElementById("emoji").src="images/happyEmoji.png";
	if(map[x][y] != 0 && map[x][y] != -1) return;
	document.getElementById(id).src = "images/empty.png";
}

function bomb(x,y)
{
	document.getElementById(String(x)+String(y)).src="images/bomb.png";
}

function lose()
{
	game = false;
	for(let i = 0; i < m; i++)
		for(let j = 0; j < n; j++)
		{
			if(map[i][j] == -1)bomb(i, j);
			if(map[i][j] == 2)document.getElementById(String(i)+String(j)).src = "images/wrongFlag.png";
		}
	document.getElementById("emoji").src="images/deadEmoji.png";
}

function win()
{
	game = false;
	for(let i = 0; i < m; i++)
		for(let j = 0; j < n; j++)
			if(map[i][j] == -1)bomb(i, j);
	document.getElementById("emoji").src="images/winEmoji.webp";
}

function count(x,y)
{
	let cnt = 0;
	if(x > 0 && map[x-1][y] < 0) cnt++;
	if(x < m - 1 && map[x+1][y] < 0) cnt++;
	if(y > 0 && map[x][y-1] < 0) cnt++;
	if(y < n - 1 && map[x][y+1] < 0) cnt++;
	if(x > 0 && y > 0 && map[x-1][y-1] < 0) cnt++;
	if(x > 0 && y < n - 1 && map[x-1][y+1] < 0) cnt++;
	if(x < m - 1 && y > 0 && map[x+1][y-1] < 0) cnt++;
	if(x < m - 1 && y < n - 1 && map[x+1][y+1] < 0) cnt++;
	return cnt;
}

function flagCount(x,y)
{
	let cnt = 0;
	if(x > 0 && Math.abs(map[x-1][y]) == 2) cnt++;
	if(x < m - 1 && Math.abs(map[x+1][y]) == 2) cnt++;
	if(y > 0 && Math.abs(map[x][y-1]) == 2) cnt++;
	if(y < n - 1 && Math.abs(map[x][y+1]) == 2) cnt++;
	if(x > 0 && y > 0 && Math.abs(map[x-1][y-1]) == 2) cnt++;
	if(x > 0 && y < n - 1 && Math.abs(map[x-1][y+1]) == 2) cnt++;
	if(x < m - 1 && y > 0 && Math.abs(map[x+1][y-1]) == 2) cnt++;
	if(x < m - 1 && y < n - 1 && Math.abs(map[x+1][y+1]) == 2) cnt++;
	return cnt;
}

function displaySurroundings(x,y)
{
	if(x > 0) display(x-1, y);
		if(x < m-1) display(x+1, y);
		if(y > 0) display(x, y-1);
		if(y < n-1) display(x, y+1);
		if(x > 0 && y > 0) display(x-1, y-1);
		if(x < m-1 && y < n-1) display(x+1, y+1);
		if(x < m-1 && y > 0) display(x+1, y-1);
		if(x > 0 && y < n-1) display(x-1, y+1);
}

function display(x, y)
{
	if(map[x][y] == -1) {lose();}
	if(map[x][y] != 0 || !game) return;
	goodTiles++;
	map[x][y] = 1;
	let cnt = count(x,y);
	document.getElementById(String(x)+String(y)).src = "images/Tiles/" + String(cnt) + ".png";
	if(goodTiles == m*n-nrBombs) win();
	if(cnt == 0)displaySurroundings(x,y);
}
function shortcut(tile)
{
	if(!game)return;
	let x = Math.floor(parseInt(tile) / 10);
	let y = parseInt(tile) % 10;
	if(map[x][y] != 1) return;
	if(count(x,y) == flagCount(x,y)) displaySurroundings(x,y);
}

function displayFlag(x, y)
{
	if(map[x][y] == 0)
	{
		document.getElementById(String(x)+String(y)).src = "images/flag.png";
		map[x][y] = 2;
		nrFlags++;
		document.getElementById("bombNr").innerHTML = "Bombs: "+String(nrBombs - nrFlags);
	}
	else
	if(map[x][y] == 2)
	{
		document.getElementById(String(x)+String(y)).src = "images/empty.png";
		map[x][y] = 0;
		nrFlags--;
		document.getElementById("bombNr").innerHTML = "Bombs: "+String(nrBombs - nrFlags);
	}
	else
	if(map[x][y] == -1)
	{
		document.getElementById(String(x)+String(y)).src = "images/flag.png";
		map[x][y] = -2;
		nrFlags++;
		document.getElementById("bombNr").innerHTML = "Bombs: "+String(nrBombs - nrFlags);
	}
	else
	if(map[x][y] == -2)
	{
		document.getElementById(String(x)+String(y)).src = "images/empty.png";
		map[x][y] = -1;
		nrFlags--;
		document.getElementById("bombNr").innerHTML = "Bombs: "+String(nrBombs - nrFlags);
	}
}

function tileClick(tile)
{
	if(!game)return;
	let x = Math.floor(parseInt(tile) / 10);
	let y = parseInt(tile) % 10;
	let flag = document.getElementById("flagSwitch").checked;
	if(flag){displayFlag(x,y); return;}
	
	if(map[x][y] == -1){lose(); return;}
	
	display(x,y);
}
