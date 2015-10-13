#pragma strict

var selected : boolean = false;

function Start () {

}

function Update () {
	
}

function OnSelection() {
	Debug.Log("Unit found and selected");
	selected = true;
}

function OnUnselection() {
	Debug.Log("Unit deselected");
	selected = false;
}