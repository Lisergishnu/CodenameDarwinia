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
		Debug.Log(Vector3.Distance(entity.gameObject.transform.position, entity.initialPosition));
		if (Vector3.Distance(entity.gameObject.transform.position, entity.initialPosition) < 4.2) {
			Debug.Log("Returned home.");
			entity.ChangeState(IdleAIState(entity));
		}
	}
}