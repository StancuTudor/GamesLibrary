class Tile{
	constructor(x,y)
	{
		this.x = x;
		this.y = y;
	}
}

var filling = false;
var board = [];
var visited = [];
var score = 0;
var memoryCandy = new Tile(-1,-1);
// fun changes
var timer = 100; // 100
var colorsNr = 6; // 6

function resetVisited()
{
	for(let i = 0; i < 10; i++)
		for(let j = 0; j < 10; j++)
			visited[i][j] = 0;
}

function boardDisplay()
{
	for(let i = 0; i < 10; i++)
		for(let j = 0; j < 10; j++){
			document.getElementById(String(i)+String(j)).src = "images/" + String(board[i][j]) + ".png";
			document.getElementById(String(i)+String(j)).style.backgroundColor = "white";
		}
	document.getElementById("score").innerHTML = "Score: " + String(score);
}

function fillBoard()
{
	filling = true;
	boardDisplay();
	let isGap = false;
	for(let i = 9; i > 0; i--)
		for(let j = 0; j < 10; j++)
			if(board[i][j] == 0)
			{
				isGap = true;
				board[i][j] = board[i-1][j];
				board[i-1][j] = 0;
			}
	for(let j = 0; j < 10; j++)
		if(board[0][j] == 0)
		{
			isGap = true;
			board[0][j] = Math.floor(Math.random() * colorsNr) + 1;
		}
	if(isGap) setTimeout(fillBoard, timer);
	else{
		setTimeout(lookForPacks, timer);
	}
}

function destroy(x,y,candy)
{
	if(x < 0 || x > 9 || y < 0 || y > 9) return;
	if(board[x][y] != candy) return;
	board[x][y] = 0;
	score++;
	destroy(x-1,y,candy);
	destroy(x+1,y,candy);
	destroy(x,y-1,candy);
	destroy(x,y+1,candy);
}

function searchPack(x,y,candy)
{
	if(x < 0 || x > 9 || y < 0 || y > 9) return 0;
	if(board[x][y] != candy || visited[x][y] == 1) return 0;
	visited[x][y] = 1;
	return 1 + searchPack(x-1,y,candy) + searchPack(x+1,y,candy) + searchPack(x,y-1,candy) + searchPack(x,y+1,candy);
}

function lookForPacks()
{
	resetVisited();
	let destroyed = false;
	for(let i = 0; i < 10; i++)
		for(let j = 0; j < 10; j++)
			if(visited[i][j] == 0)
				if(searchPack(i,j,board[i][j]) >= 3){
					destroy(i,j,board[i][j]);
					destroyed = true;
				}
	if(destroyed) setTimeout(fillBoard,timer);
	else filling = false;
}

function clicked(id)
{
	if(filling) return;
	let x = Math.floor(parseInt(id) / 10);
	let y = parseInt(id) % 10;
	document.getElementById(id).style.backgroundColor = "#ff99ff";
	
	if(memoryCandy.x == -1){
		memoryCandy.x = x;
		memoryCandy.y = y;
	}
	else
	{
		if(!((Math.abs(memoryCandy.x - x) == 0 && Math.abs(memoryCandy.y - y) == 1) || (Math.abs(memoryCandy.x - x) == 1 && Math.abs(memoryCandy.y - y) == 0))){
			boardDisplay();
			document.getElementById(id).style.backgroundColor = "#ff99ff";
			memoryCandy.x = x;
			memoryCandy.y = y;
			return;
		}
			
		
		let aux = board[x][y];
		board[x][y] = board[memoryCandy.x][memoryCandy.y];
		board[memoryCandy.x][memoryCandy.y] = aux;
		memoryCandy.x = -1;
		setTimeout(fillBoard,timer*2);
	}
}

window.onload = function()
{	
	
	for(let i = 0; i < 10; i++)
	{
		board.push([]);
		visited.push([]);
		for(let j = 0; j < 10; j++)
		{
			board[i].push(0);
			visited[i].push(0);
			let tile = document.createElement("img");
			tile.setAttribute("src", "images/empty.png");
			tile.setAttribute("class", "grid-item " + String(j));
			tile.setAttribute("id", String(i)+String(j));
			tile.setAttribute("onclick", "clicked(id)");
			
			document.getElementById("board").appendChild(tile);
		}
	}
	fillBoard();
}


function reload()
{
	location.reload();
}
