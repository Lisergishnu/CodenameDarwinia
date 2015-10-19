#pragma strict

import BasicPathfindingAI;

public class GenericEnemy extends MonoBehaviour {

	var currentState : EnemyAIState;
	var initialPosition : Vector3;
	private var isReturningHome : boolean = false;
	private var pfai : BasicPathfindingAI;
	
	function Start () {
		pfai = GetComponent.<BasicPathfindingAI>();
		initialPosition = transform.position;
		ChangeState(IdleAIState(this));
	}
	
	function Update () {
		currentState.Update();
	}
	
	function Fire() {
		Debug.Log("Firing mah lazor");
	}
	
	function MoveTo(point: Vector3) {
		pfai.IssueMovementToMapPoint(point);
	}
	
	function ChangeState(newState : EnemyAIState) {
		if (currentState) {
			this.currentState.OnStateLeave();
		}
		currentState = newState;
		currentState.OnStateEnter();
	}

}