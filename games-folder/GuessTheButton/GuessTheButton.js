function reload()
{
	location.reload();
}

var winButton = 0;
var level = 0;
var messages = ["Wow!", "Bravo!", "Congrats!", "You found it!", "You rock!"];
var game = true;
var hearts = 0;

function buttonReset()
{
	for(let i = 1; i <= level; i++)
		document.getElementById(String(i)).style.backgroundColor = "lightgrey";
	document.getElementById("message").innerHTML = "";
}

function addHeart()
{
	hearts++;
	let h = document.createElement("img");
	h.setAttribute("src", "images/heart.png");
	document.getElementById("hearts").appendChild(h);
}

function win()
{
	addHeart();
	
	game = true;
	buttonReset();
	level++;
	winButton = Math.floor(Math.random() * level) + 1;
	let btn = document.createElement("button");
	btn.setAttribute("id", String(level));
	btn.setAttribute("onclick", "clicked(id)");
	btn.innerHTML = String(level);
	document.getElementById("buttonList").appendChild(btn);
	if(level % 10 == 0) document.getElementById("buttonList").appendChild(document.createElement("br"));
}

function lose(id)
{
	hearts--;
	b = document.getElementById(id);
	b.style.backgroundColor = "red";
	let h = document.getElementById("hearts");
	h.removeChild(h.firstChild);
	if(hearts == 0)
	{
		game = false;
		document.getElementById("message").innerHTML = "You lost.";
		document.getElementById(String(winButton)).style.backgroundColor = "green";
	}
}

function clicked(id)
{
	if(!game)return;
	if(parseInt(id) == winButton){
		document.getElementById(id).style.backgroundColor = "green";
		let m = Math.floor(Math.random() * messages.length);
		document.getElementById("message").innerHTML = messages[m];
		game = false;
		setTimeout(win, 1500);
	}
	else lose(id);
}

window.onload = function()
{
	win();
	let h = document.createElement("img");
	h.setAttribute("src", "images/heart.png");
	addHeart();
	addHeart();
	
}