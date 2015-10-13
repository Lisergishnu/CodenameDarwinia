#pragma strict

var selected : boolean = false;
var width : float = 0.03;
var offShader : Shader;
var onShader : Shader;
function Start () {
	
}

function Update () {
	
}

function OnSelection() {
	Debug.Log("Unit found and selected");
	GetComponent.<Renderer>().material.shader = onShader;
	selected = true;
}

function OnUnselection() {
	Debug.Log("Unit deselected");
	GetComponent.<Renderer>().material.shader = offShader;
	selected = false;
}