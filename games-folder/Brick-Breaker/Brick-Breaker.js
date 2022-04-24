class Tuple{
	constructor(x,y)
	{
		this.x = x;
		this.y = y;
	}
}

function eq(a,b)
{
	if(Math.abs(a-b) < 1.5) return true;
	return false;
}

class Tile{
	constructor(t, nr, stage)
	{
		this.id = "tile" + String(nr);
		this.t = t;
		this.stage = stage;
	}
	checkColision()
	{
		if((eq(current.x, this.t.x + 20) || eq(current.x + 20, this.t.x)) && (current.y < this.t.y + 50 && current.y + 20 > this.t.y))
		{
			d.x *= -1;
			this.stage--;
			if(this.stage == 0){
				document.getElementById(this.id).style.opacity = "0%";
				score++;
			}
			else
			document.getElementById(this.id).src = "images/" + String(this.stage) + ".png";
			
			return true;
		}
		if((current.x < this.t.x + 20 && current.x + 20 > this.t.x) && (eq(current.y, this.t.y + 50) || eq(current.y + 20, this.t.y)))
		{
			d.y *= -1;
			this.stage--;
			if(this.stage == 0){
				document.getElementById(this.id).style.opacity = "0%";
				score++;
			}
			else
			document.getElementById(this.id).src = "images/" + String(this.stage) + ".png";
			
			return true;
		}
		return false;
	}
}

var game = true;
var d = new Tuple(-2,1.1);
var current = new Tuple(442,240);
var tiles = [], nrTiles = 0;
var platformY = 200;
var score = 0;
var timer = 10;

function clicked()
{
}

function checkMarginColision()
{
	if(current.x > 480){
		alert("Lose.");
		game = false;
	}
	if(current.x < 0) d.x *= -1;
	
	if(current.y < 0) d.y *= -1;
	if(current.y > 480) d.y *= -1;
	
}

function checkPlatformColision()
{
	if(d.x > 0 && current.x >= 442 && current.x <= 450 && (current.y + 20 > platformY && current.y < platformY + 100)){
		d.x *= -1;
		d.y = (current.y + 10 - (platformY + 50)) / 25;
		d.x = Math.sign(d.x) * (3 - Math.abs(d.y));
	}
	
}

function checkTileColision()
{
	let win = true;
	for(let i = 0; i < tiles.length; i++)
		if(tiles[i].stage != 0){
			if(tiles[i].checkColision()){
				timer -= 0.2;
				return;
			}
			win = false;
		}
	if(win){
		game = false;
		alert("Winner!");
	}
}

function checkColisions()
{
	checkMarginColision();
	checkPlatformColision();
	checkTileColision();
}

function followBall()
{
	if(current.y + 10 < platformY) 
		platformY = current.y;
	if(current.y - 90 > platformY) 
		platformY = current.y - 80;
	document.getElementById("platform").style.left = String(platformY)+"px";
}

function move()
{
	if(!game) return;
	let ball = document.getElementById("ball");
	
	current.x += d.x;
	current.y += d.y;
	
	ball.style.top = String(current.x) + "px";
	ball.style.left = String(current.y) + "px";
	
	// followBall();
	
	checkColisions();
	setTimeout(move, 1);
}

function createTile(x,y,stage)
{
	if(stage > 3) stage = 3;
	let board = document.getElementById("board");
	let t = document.createElement("img");
	t.setAttribute("id", "tile" + String(nrTiles));
	t.setAttribute("class", "tile");
	t.setAttribute("src", "images/"+String(stage)+".png");
	t.style.top = String(x) + "px";
	t.style.left = String(y) + "px";
	board.appendChild(t);
	tiles.push(new Tile(new Tuple(x,y), nrTiles, stage));
	nrTiles++;
}

function createPlatform()
{
	let board = document.getElementById("board");
	let t = document.createElement("img");
	t.setAttribute("id", "platform");
	t.setAttribute("src", "images/2.png");
	t.style.bottom = "30px";
	t.style.left = "200px";
	board.appendChild(t);
}

function createTileLine(stage)
{
	for(let i = 0; i < nrTiles; i++)
	{
		let t = tiles[i];
		t.t.x += 30;
		document.getElementById(t.id).style.top = String(t.t.x) + "px";
	}
	for(let j = 15; j <= 435; j+=60)
		createTile(10,j,stage);
}

window.onload = function()
{
	for(let i = 1; i <= 3; i++)
		createTileLine(i);
	createPlatform();
	move();
}

document.addEventListener("keypress", function onEvent(event) {
    if(event.key == "a"){
		if(platformY < 0)return;
		platformY -= 10;
		document.getElementById("platform").style.left = String(platformY)+"px";
	}
	if(event.key == "d"){
		if(platformY > 400)return;
		platformY += 10;
		document.getElementById("platform").style.left = String(platformY)+"px";
	}
});

function reload()
{
	location.reload();
}
