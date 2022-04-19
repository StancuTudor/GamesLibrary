class Tile{
	constructor(x,y)
	{
		this.x = x;
		this.y = y;
	}
}

class PieceOrientation{
	constructor(t1,t2,t3,t4) // tiles
	{
		this.t1 = t1;
		this.t2 = t2;
		this.t3 = t3;
		this.t4 = t4;
	}
}

class Piece{
	constructor(o1,o2,o3,o4) // orientations
	{
		this.o = o1;
		this.phase = 1;
		
		this.o1 = o1;
		this.o2 = o2;
		this.o3 = o3;
		this.o4 = o4;
	}
	onBoard(tile, val)
	{
		let x, y;
		x = tile.x + this.o.t1.x;
		y = tile.y + this.o.t1.y;
		if(x >= 0 && x < 20 && y >= 0 && y < 10) board[x][y] = val;
		x = tile.x + this.o.t2.x;
		y = tile.y + this.o.t2.y;
		if(x >= 0 && x < 20 && y >= 0 && y < 10) board[x][y] = val;
		x = tile.x + this.o.t3.x;
		y = tile.y + this.o.t3.y;
		if(x >= 0 && x < 20 && y >= 0 && y < 10) board[x][y] = val;
		x = tile.x + this.o.t4.x;
		y = tile.y + this.o.t4.y;
		if(x >= 0 && x < 20 && y >= 0 && y < 10) board[x][y] = val;
	}
	checkRotate(way)
	{
		let next = this.phase + way;
		let o;
		if(next == 5) next = 1;
		if(next == 0) next = 4;
		if(next == 1) o = this.o1;
		if(next == 2) o = this.o2;
		if(next == 3) o = this.o3;
		if(next == 4) o = this.o4;
		
		let x, y;
		x = currentTile.x + o.t1.x;
		y = currentTile.y + o.t1.y;
		if(x < 0 || x >= 20 || y < 0 || y >= 10 || board[x][y] == 2) return false;
		x = currentTile.x + o.t2.x;
		y = currentTile.y + o.t2.y;
		if(x < 0 || x >= 20 || y < 0 || y >= 10 || board[x][y] == 2) return false;
		x = currentTile.x + o.t3.x;
		y = currentTile.y + o.t3.y;
		if(x < 0 || x >= 20 || y < 0 || y >= 10 || board[x][y] == 2) return false;
		x = currentTile.x + o.t4.x;
		y = currentTile.y + o.t4.y;
		if(x < 0 || x >= 20 || y < 0 || y >= 10 || board[x][y] == 2) return false;
		return true;
	}
	rotate(way)
	{
		if(!this.checkRotate(way)) return;
		
		this.onBoard(currentTile, 0);
		this.phase += way;
		if(this.phase == 5) this.phase = 1;
		if(this.phase == 0) this.phase = 4;
		if(this.phase == 1) this.o = this.o1;
		if(this.phase == 2) this.o = this.o2;
		if(this.phase == 3) this.o = this.o3;
		if(this.phase == 4) this.o = this.o4;
		this.onBoard(currentTile, 1);
		boardDisplay();
	}
}

var score = 0;
var board = [];
var timer = 300;
var pieces = new Array(Piece);
var currentPiece = new Piece(0,0,0,0);
var currentTile = new Tile(0,0);
var game = true;

function createLinePiece()
{
	let t1 = new Tile(-2,0);
	let t2 = new Tile(-1,0);
	let t3 = new Tile(0,0);
	let t4 = new Tile(1,0);
	let t5 = new Tile(2,0);
	let t6 = new Tile(0,-2);
	let t7 = new Tile(0,-1);
	let t8 = new Tile(0,1);
	let t9 = new Tile(0,2);
	
	let o1 = new PieceOrientation(t3,t1,t2,t4);
	let o2 = new PieceOrientation(t3,t7,t8,t9);
	let o3 = new PieceOrientation(t3,t2,t4,t5);
	let o4 = new PieceOrientation(t3,t6,t7,t8);
	
	let p = new Piece(o1,o2,o3,o4);
	pieces.push(p);
}

function createLPiece()
{
	let t1 = new Tile(-1,1); // susd
	let t2 = new Tile(-1,0); // sus1
	let t3 = new Tile(0,0);  // 0
	let t4 = new Tile(1,0);  // jos1
	let t5 = new Tile(1,-1);  // js
	let t6 = new Tile(-1,-1); // stangas
	let t7 = new Tile(0,-1); // stanga1
	let t8 = new Tile(0,1);  // dreapta1
	let t9 = new Tile(1,1);  // dj
	
	let o1 = new PieceOrientation(t3,t2,t4,t9);
	let o2 = new PieceOrientation(t3,t8,t7,t5);
	let o3 = new PieceOrientation(t3,t4,t2,t6);
	let o4 = new PieceOrientation(t3,t7,t8,t1);
	
	let p = new Piece(o1,o2,o3,o4);
	pieces.push(p);
}

function createRLPiece()
{
	let t1 = new Tile(-1,1); // susd
	let t2 = new Tile(-1,0); // sus1
	let t3 = new Tile(0,0);  // 0
	let t4 = new Tile(1,0);  // jos1
	let t5 = new Tile(1,-1);  // js
	let t6 = new Tile(-1,-1); // stangas
	let t7 = new Tile(0,-1); // stanga1
	let t8 = new Tile(0,1);  // dreapta1
	let t9 = new Tile(1,1);  // dj
	
	let o1 = new PieceOrientation(t3,t2,t4,t5);
	let o2 = new PieceOrientation(t3,t8,t7,t6);
	let o3 = new PieceOrientation(t3,t4,t2,t1);
	let o4 = new PieceOrientation(t3,t7,t8,t9);
	
	let p = new Piece(o1,o2,o3,o4);
	pieces.push(p);
}
function createTPiece()
{
	let t1 = new Tile(-2,0); // sus2
	let t2 = new Tile(-1,0); // sus1
	let t3 = new Tile(0,0);  // 0
	let t4 = new Tile(1,0);  // jos1
	let t5 = new Tile(2,0);  // jos2
	let t6 = new Tile(0,-2); // stanga2
	let t7 = new Tile(0,-1); // stanga1
	let t8 = new Tile(0,1);  // dreapta1
	let t9 = new Tile(0,2);  // dreapta2
	
	let o1 = new PieceOrientation(t3,t2,t8,t4);
	let o2 = new PieceOrientation(t3,t8,t4,t7);
	let o3 = new PieceOrientation(t3,t4,t7,t2);
	let o4 = new PieceOrientation(t3,t7,t2,t8);
	
	let p = new Piece(o1,o2,o3,o4);
	pieces.push(p);
}
function createSPiece()
{
	let t1 = new Tile(-1,1); // susd
	let t2 = new Tile(-1,0); // sus1
	let t3 = new Tile(0,0);  // 0
	let t4 = new Tile(1,0);  // jos1
	let t5 = new Tile(1,-1);  // js
	let t6 = new Tile(-1,-1); // stangas
	let t7 = new Tile(0,-1); // stanga1
	let t8 = new Tile(0,1);  // dreapta1
	let t9 = new Tile(1,1);  // dj
	
	let o1 = new PieceOrientation(t3,t2,t8,t9);
	let o2 = new PieceOrientation(t3,t8,t4,t5);
	let o3 = new PieceOrientation(t3,t4,t7,t6);
	let o4 = new PieceOrientation(t3,t7,t2,t1);
	
	let p = new Piece(o1,o2,o3,o4);
	pieces.push(p);
}
function createRSPiece()
{
	let t1 = new Tile(-1,1); // susd
	let t2 = new Tile(-1,0); // sus1
	let t3 = new Tile(0,0);  // 0
	let t4 = new Tile(1,0);  // jos1
	let t5 = new Tile(1,-1);  // js
	let t6 = new Tile(-1,-1); // stangas
	let t7 = new Tile(0,-1); // stanga1
	let t8 = new Tile(0,1);  // dreapta1
	let t9 = new Tile(1,1);  // dj
	
	let o1 = new PieceOrientation(t3,t2,t7,t5);
	let o2 = new PieceOrientation(t3,t8,t2,t6);
	let o3 = new PieceOrientation(t3,t4,t8,t1);
	let o4 = new PieceOrientation(t3,t7,t4,t9);
	
	let p = new Piece(o1,o2,o3,o4);
	pieces.push(p);
}
function createSQPiece()
{
	let t1 = new Tile(-1,1); // susd
	let t2 = new Tile(-1,0); // sus1
	let t3 = new Tile(0,0);  // 0
	let t4 = new Tile(1,0);  // jos1
	let t5 = new Tile(1,-1);  // js
	let t6 = new Tile(-1,-1); // stangas
	let t7 = new Tile(0,-1); // stanga1
	let t8 = new Tile(0,1);  // dreapta1
	let t9 = new Tile(1,1);  // dj
	
	let o1 = new PieceOrientation(t3,t2,t8,t1);
	let o2 = new PieceOrientation(t3,t2,t8,t1);
	let o3 = new PieceOrientation(t3,t2,t8,t1);
	let o4 = new PieceOrientation(t3,t2,t8,t1);
	
	let p = new Piece(o1,o2,o3,o4);
	pieces.push(p);
}
function removeLine(line)
{
	for(let i = line; i > 0; i--)
		for(let j = 0; j < 10; j++)
			board[i][j] = board[i - 1][j];
	score++;
}

function checkLines()
{
	for(let i = 0; i < 20; i++)
	{
		let ok = true;
		for(let j = 0; j < 10; j++)
			if(board[i][j] != 2) ok = false;
		if(ok) removeLine(i);
	}
}

function tileDisplay(x,y,t)
{
	let tile = document.getElementById(String(x)+" "+ String(y));
	if(t == 0) tile.src = "images/empty.png";
	if(t == 1) tile.src = "images/piece.png";
	if(t == 2) tile.src = "images/solid.png";
}

function boardDisplay()
{
	for(let i = 0; i < 20; i++)
		for(let j = 0; j < 10; j++)
			tileDisplay(i,j,board[i][j]);
	document.getElementById("score").innerHTML = "Score: " + String(score);
}

function checkStop()
{
	for(let i = 0; i < 20; i++)
		for(let j = 0; j < 10; j++)
			if(board[i][j] == 1 && (i == 19 || board[i + 1][j] == 2)) return true;
	return false;
}

function stopPiece()
{
	currentPiece.onBoard(currentTile,2);
	boardDisplay();
	checkLines();
	spawnPiece();
}

function move()
{
	boardDisplay();
	
	if(checkStop()){
		stopPiece();
		return;
	}
	
	currentPiece.onBoard(currentTile, 0);
	currentTile.x++;
	currentPiece.onBoard(currentTile, 1);
	boardDisplay();
	setTimeout(move, timer);
}

function spawnPiece()
{
	if(board[0][4] == 2){
		game = false;
		return;
	}
	
	currentTile.x = -1;
	currentTile.y = 4;
	
	currentPiece = pieces[Math.floor(Math.random() * 7) + 1];
	
	currentPiece.onBoard(currentTile, 1);
	
	boardDisplay();
	setTimeout(move, timer);
}

window.onload = function()
{	
	for(let i = 0; i < 20; i++)
	{
		board.push([]);
		for(let j = 0; j < 10; j++)
		{
			board[i].push(0);
			let tile = document.createElement("img");
			tile.setAttribute("src", "images/empty.png");
			tile.setAttribute("class", "grid-item");
			tile.setAttribute("id", String(i)+" "+String(j));
			document.getElementById("board").appendChild(tile);
		}
	}
	createLinePiece();
	createLPiece();
	createRLPiece();
	createTPiece();
	createSPiece();
	createRSPiece();
	createSQPiece();
	
	spawnPiece();
}

function moveLeft()
{
	let ok = true;
	for(let i = 0; i < 20; i++)
		for(let j = 0; j < 10; j++)
			if(board[i][j] == 1 && (j == 0 || board[i][j - 1] == 2)) ok = false;

	if(!ok) return;
	
	currentPiece.onBoard(currentTile, 0);
	currentTile.y--;
	currentPiece.onBoard(currentTile, 1);
}

function moveRight()
{
	let ok = true;
	for(let i = 0; i < 20; i++)
		for(let j = 0; j < 10; j++)
			if(board[i][j] == 1 && (j == 9 || board[i][j + 1] == 2)) ok = false;
	if(!ok) return;

	currentPiece.onBoard(currentTile, 0);
	currentTile.y++;
	currentPiece.onBoard(currentTile, 1);
}

function moveDown()
{
	if(checkStop()){
		return;
	}
			
	currentPiece.onBoard(currentTile, 0);
	currentTile.x++;
	currentPiece.onBoard(currentTile, 1);
	boardDisplay();
}

function rotate(way)
{
	currentPiece.rotate(way);
	currentPiece.onBoard(currentTile,1);
}

document.addEventListener("keypress", function onEvent(event) {
	if(!game) return;
	if(event.key == "a") moveLeft();
	if(event.key == "d") moveRight();
	if(event.key == "s") moveDown();
	if(event.key == "n") rotate(-1);
	if(event.key == "m") rotate(1);
	boardDisplay();
});

function reload()
{
	location.reload();
}
