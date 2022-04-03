
function reload()
{
	location.reload();
}

var winButton = 0;
var level = 0;
var messages = ["Wow!", "Bravo!", "Congrats!", "You found it!", "You rock!"];

function buttonReset()
{
	for(let i = 1; i <= level; i++)
		document.getElementById(String(i)).style.backgroundColor = "lightgrey";
	document.getElementById("message").innerHTML = "";
}

function win()
{
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
	b = document.getElementById(id);
	b.style.backgroundColor = "red";
}

function clicked(id)
{
	if(parseInt(id) == winButton){
		document.getElementById(id).style.backgroundColor = "green";
		let m = Math.floor(Math.random() * messages.length);
		document.getElementById("message").innerHTML = messages[m];
		setTimeout(win, 1500);
	}
	else lose(id);
}

window.onload = function()
{
	win();
}

// Style Message
// Remove onclick after click and when game over.