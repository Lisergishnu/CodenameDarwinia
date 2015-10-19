#pragma strict

public class IdleAIState extends EnemyAIState {

	var enemyFound : boolean = false;
	var maxAwareness : float = 5;

	function IdleAIState(entity : GenericEnemy) {
		super(entity);
	}
	
	function ProximityCheck() {
		if (!enemyFound) {
			var enemies : GameObject[] = GameObject.FindGameObjectsWithTag("PlayerUnit");
			for (var e : GameObject in enemies) {
				if (Vector3.Distance(entity.gameObject.transform.position, e.transform.position) < maxAwareness) {
					entity.ChangeState(ChasingAIState(entity,e));
					enemyFound = true;
				}
			}
		}
	}
	
	function OnStateEnter() {
		enemyFound = false;
	}
	
	function Update() {
		if (TimerExpired(0.5f)) {
			ProximityCheck();
		}
	}
}

