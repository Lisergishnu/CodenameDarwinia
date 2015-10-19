#pragma strict

import BasicPathfindingAI;

var bullet : GameObject;

public class GenericEnemy extends MonoBehaviour {

	var currentState : EnemyAIState;
	var initialPosition : Vector3;
	var health : int = 300;
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
	
	function Fire(target: GameObject) {
		var b : GameObject = Instantiate(bullet,transform.position,Quaternion.identity);
		b.GetComponent.<BulletMover>().currentTarget = target;
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

	function OnBulletHit() {
		health -= 5;
		if (health <= 0) {
			Destroy(this.gameObject, 0.1f);
		}
	}

}