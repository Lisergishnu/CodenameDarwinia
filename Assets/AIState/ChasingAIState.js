#pragma strict

public class ChasingAIState extends EnemyAIState {
	var currentEnemy : GameObject;
	var chasing : boolean = true;
	var minAttackDistance : float = 5;
	var maxUnitDistance : float = 10;
	var firing : boolean = false;
	
	function ChasingAIState(entity: GenericEnemy, enemy: GameObject) {
		super(entity);
		this.currentEnemy = enemy;
	}
	
	function OnStateEnter() {
		chasing = true;
		UpdatePath();
	}
	
	function Update() {
		if (TimerExpired(0.5f)) {
			UpdatePath();
		}
	}
	
	function UpdatePath() {
		if (chasing) {
			if (!firing && Vector3.Distance(this.entity.gameObject.transform.position, currentEnemy.transform.position)
				< minAttackDistance) {
					this.entity.Fire();
					firing = true;
			}
			if (Vector3.Distance(this.entity.gameObject.transform.position, entity.initialPosition)
				> maxUnitDistance) {
					Debug.Log("Lost target...");
					entity.ChangeState(MovingBackAIState(entity));
					return;
			}
			
			entity.MoveTo(currentEnemy.transform.position);
		}
	}
}