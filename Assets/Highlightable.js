#pragma strict

var highlightColor : Color;
private var currentColor : Color;
private var rend : Renderer;
function Start () {
	rend = GetComponent.<Renderer>();
}

function OnMouseEnter() {
	currentColor = rend.material.color;
	rend.material.color = highlightColor;
} 

function OnMouseExit() {
	rend.material.color = currentColor;
}