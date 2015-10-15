#pragma strict

import BasicPathfindingAI;

public class GenericEnemy extends MonoBehaviour {

var awarenessRadius : float = 0.5;
var targetUnit : GameObject = null;

private var pfai : BasicPathfindingAI;

function Start () {
	pfai = GetComponent.<BasicPathfindingAI>();
	InvokeRepeating("UpdatePathing",0,5);
}

function OnEnemySpotted(enemy: GameObject) {
	targetUnit = enemy;
	
}

function Update () {
	if (targetUnit == null) {
	var pUs = GameObject.FindGameObjectsWithTag("PlayerUnit");
	for (var pU : GameObject in pUs) {
		if (Vector3.Distance(pU.transform.position, this.transform.position) < awarenessRadius) {
			Debug.Log("GenericEnemy: Enemy spotted!");
			OnEnemySpotted(pU);
			break;
			}
		}
	}
}

function UpdatePathing() {
	if (targetUnit) {
		pfai.IssueMovementToMapPoint(targetUnit.transform.position);
	}
}

}