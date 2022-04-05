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
	for(let i = 1; i <= level; i++){
		let btn = document.getElementById(String(i));
		btn.style.backgroundColor = "lightgrey";
		btn.style.opacity = 1;
		btn.setAttribute("onclick", "clicked(id)");
	}
	document.getElementById("message").innerHTML = "";
}

function heartAppear()
{
	let h = document.getElementById("hearts");
	h.lastChild.style.opacity = 1;
}

function addHeart()
{
	hearts++;
	let h = document.createElement("img");
	h.setAttribute("src", "images/heart.png");
	h.style.opacity = 0;
	
	document.getElementById("hearts").appendChild(h);
	setTimeout(heartAppear,1);
}

function win()
{
	addHeart();
	level++;
	let btn = document.createElement("button");
	btn.setAttribute("id", String(level));
	btn.setAttribute("onclick", "clicked(id)");
	btn.style.opacity = 0;
	btn.innerHTML = String(level);
	
	document.getElementById("buttonList").appendChild(btn);
	
	game = true;
	
	setTimeout(buttonReset, 1);
	
	winButton = Math.floor(Math.random() * level) + 1;
	
	if(level % 10 == 0) document.getElementById("buttonList").appendChild(document.createElement("br"));
}

function heartRemove()
{
	let h = document.getElementById("hearts");
	h.removeChild(h.lastChild);
}

function lose(id)
{
	hearts--;
	b = document.getElementById(id);
	b.style.opacity = 0;
	b.onclick="";
	let h = document.getElementById("hearts");
	h.lastChild.style.opacity = 0;
	if(hearts == 0)
	{
		game = false;
		document.getElementById("message").innerHTML = "You lost.";
		document.getElementById(String(winButton)).style.backgroundColor = "green";
	}
	setTimeout(heartRemove,500);
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
	setTimeout(win,250);
	let h = document.createElement("img");
	h.setAttribute("src", "images/heart.png");
	setTimeout(addHeart,750);
	setTimeout(addHeart,1250);
	
}