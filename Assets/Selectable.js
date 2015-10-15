#pragma strict

var selected : boolean = false;
var width : float = 0.03;
var offMaterial : Material;
var onMaterial : Material;
function Start () {
	
}

function Update () {
	
}

function OnSelection() {
	Debug.Log("Unit found and selected");
	GetComponent.<Renderer>().material = onMaterial;
	selected = true;
}

function OnUnselection() {
	Debug.Log("Unit deselected");
	GetComponent.<Renderer>().material = offMaterial;
	selected = false;
}