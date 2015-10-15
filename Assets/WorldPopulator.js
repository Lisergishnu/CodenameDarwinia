#pragma strict

var numberOfUnits : int;
var numberOfEnemies : int;
var numberOfObjectives : int;
var objectiveBaseRadius : float;

function Start () {
	// Place player units near starting area
	var initialArea : GameObject = GameObject.Find("Starting Area");
	var initialPos : Vector3 = initialArea.transform.position;
		
	
	// For every objective we place a number of enemies around it
	var i : int = 0;
	while (i < numberOfObjectives) {
		
		i++;
	}
}

function Update () {

}