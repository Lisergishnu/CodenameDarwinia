#pragma strict

var selected : boolean = false;
var width : float = 0.03;
var offMaterial : Material;
var onMaterial : Material;
var trajectory : GameObject;

function Start () {
	
}

function Update () {
	
}

function OnSelection() {
	GetComponent.<Renderer>().material = onMaterial;
	selected = true;
	if (trajectory) {
		trajectory.GetComponent.<Renderer>().enabled = true;
	}
}

function OnUnselection() {
	GetComponent.<Renderer>().material = offMaterial;
	selected = false;
	if (trajectory) {
		trajectory.GetComponent.<Renderer>().enabled = false;
	}
}