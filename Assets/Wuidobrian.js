#pragma strict

@script RequireComponent(BasicPathfindingAI)

class Wuidobrian extends MonoBehaviour {
	var health : float = 100;
	var bullet : GameObject;
	
	var hasFired : boolean = false;
	var melee : boolean = false;
	
	var currentTarget : GameObject;
	var pF : BasicPathfindingAI;
	var firingCooldown : float = 1f;
	var firingRange : float = 10f;
	
	function Start() {
		pF = GetComponent.<BasicPathfindingAI>();
		if (melee)
			firingRange = 2f;
	}
	
	function OnBulletHit() {
		Debug.Log("Got Hit!!");
		health -= 5;
		if (health <= 0) {
			Destroy(this.gameObject,0.1f);
		}
	}
	
	function LockTarget(target: GameObject) {
		currentTarget = target;
	}
	
	function Fire(target: GameObject) {
		if (!hasFired) {
			if (!melee) {
				var b : GameObject = Instantiate(bullet,transform.position,Quaternion.identity);
				b.GetComponent.<BulletMover>().currentTarget = target;
			} else {
				target.SendMessage("OnBulletHit");
			}
			hasFired = true;
		}
	}
	
	function Update() {
	}
	
	function ClearOrders() {
		StopCoroutine("UpdatePathingToEnemy");
		StopCoroutine("UpdateFiringToEnemy");
		LockTarget(null);
	}
	
	function IssueMoveOrderTo(point: Vector3) {
		ClearOrders();
		pF.IssueMovementToMapPoint(point);
	}
	
	function IssueAttackOrderTo(enemy:GameObject) {
		ClearOrders();
		LockTarget(enemy);
		UpdatePathingToEnemy();
		UpdateFiringToEnemy();		
	}
	
	function UpdateFiringToEnemy() /* If any */ {
		while (currentTarget) {
			if (Vector3.Distance(this.transform.position, currentTarget.transform.position) < firingRange)
				Fire(currentTarget);
			yield WaitForSeconds(firingCooldown);
			hasFired = false;
		}
	}
	
	function UpdatePathingToEnemy() /* If any */ {
		while (currentTarget) {
			pF.IssueMovementToMapPoint(currentTarget.transform.position);
			yield WaitForSeconds(.5f);
		}
	}
	
}

