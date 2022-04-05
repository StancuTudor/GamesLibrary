class Tile{
	constructor(x,y)
	{
		this.x = x;
		this.y = y;
	}
}
var snake = new Array(Tile);

var map=[];
var directionX = 0;
var directionY = 1;
var game = true;

function tileDisplay(tile, im)
{
	document.getElementById(String(tile.x)+String(tile.y)).src = im;
}

function lose()
{
	game = false;
	alert("Loser.");
}

function checkLose(x,y)
{
	if(x < 0 || x > 9) return true;
	if(y < 0 || y > 9) return true;
	if(map[x][y] == 1) return true;
	return false;
}

function move()
{
	let last = snake.length - 1;
	if(checkLose(snake[last].x + directionX, snake[last].y + directionY)) {lose(); return;}
	
	if(map[snake[last].x + directionX][snake[last].y + directionY] == 2){
		snakeGrow(snake[last].x + directionX, snake[last].y + directionY);
		randomApple();
	}
	else snakeMove();
	setTimeout(move, 200);
}

function headMove()
{
	let last = snake.length - 1;
	snake[last].x += directionX;
	snake[last].y += directionY;
	
	map[snake[last].x][snake[last].y] = 1;
	tileDisplay(snake[last], "images/snake.png");
}

function snakeMove()
{
	if(!game) return;
	
	tileDisplay(snake[1], "images/empty.png");
	map[snake[1].x][snake[1].y] = 0;
	
	for(let i = 1; i < snake.length - 1; i++)
	{
		snake[i].x = snake[i + 1].x;
		snake[i].y = snake[i + 1].y;
	}
	
	headMove();
}

function snakeGrow(x,y)
{
	let tile = new Tile(x,y);
	snake.push(tile);
	
	map[tile.x][tile.y] = 1;
	tileDisplay(tile, "images/snake.png");
}

function randomApple()
{
	let x = Math.floor(Math.random() * 10);
	let y = Math.floor(Math.random() * 10);
	if(map[x][y] != 0)
	{
		randomApple();
		return;
	}
	map[x][y] = 2;
	document.getElementById(String(x)+String(y)).src = "images/apple.jpg";
}

window.onload = function()
{	
	for(let i = 0; i < 10; i++)
	{
		map.push([]);
		for(let j = 0; j < 10; j++)
		{
			map[i].push(0);
			let tile = document.createElement("img");
			tile.setAttribute("src", "images/empty.png");
			tile.setAttribute("class", "grid-item");
			tile.setAttribute("id", String(i)+String(j));
			document.getElementById("board").appendChild(tile);
		}
	}
	snakeGrow(4,1);
	snakeGrow(4,2);
	snakeGrow(4,3);
	randomApple();
	randomApple();
	move();
}

document.addEventListener("keypress", function onEvent(event) {
	if(!game)return;
    if(event. key == 'a' && directionX != 0)
	{
		directionX = 0;
		directionY = -1;
	}
	if(event. key == 'd' && directionX != 0)
	{
		directionX = 0;
		directionY = 1;
	}
	if(event. key == 'w' && directionY != 0)
	{
		directionX = -1;
		directionY = 0;
	}
	if(event. key == 's' && directionY != 0)
	{
		directionX = 1;
		directionY = 0;
	}
	//move();
});

function reload()
{
	location.reload();
}
