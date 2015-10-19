#pragma strict

public class ChasingAIState extends EnemyAIState {
	var currentEnemy : GameObject;
	var chasing : boolean = true;
	var minAttackDistance : float = 5;
	var maxUnitDistance : float = 10;
	var firing : boolean = false;
	private var firingCD : int = 0;
	
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
		//hack
		if (firing) {
			// Each call is at 0.5 [s]... Firerate will be 2 [s] for AI
			if (firingCD == 4) {
				firingCD = 0;
				firing = false;
			} else 
				firingCD += 1;
		}
	
		if (chasing) {
			if (!firing && Vector3.Distance(this.entity.gameObject.transform.position, currentEnemy.transform.position)
				< minAttackDistance) {
					this.entity.Fire(currentEnemy);
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