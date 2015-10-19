#pragma strict

public class MovingBackAIState extends EnemyAIState {
	
	function MovingBackAIState(entity: GenericEnemy) {
		super(entity);
	}
	
	function OnStateEnter() {
		entity.MoveTo(entity.initialPosition);
	}
	
	function Update() {
		if (TimerExpired(0.5f)) {
			CheckDistance();
		}
	}
	
	function CheckDistance() {
		//Hack
		var v1 : Vector3 = entity.gameObject.transform.position;
		v1.y = 0;
		var v2 : Vector3 = entity.initialPosition;
		v2.y = 0;
		//Debug.Log(Vector3.Distance(v1,v2));
		if (Vector3.Distance(v1,v2) < 3) {
			Debug.Log("Returned home.");
			entity.ChangeState(IdleAIState(entity));
		}
	}
}