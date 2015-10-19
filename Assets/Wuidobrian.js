#pragma strict

class Wuidobrian extends MonoBehaviour {
	var health : float = 100;
	var bullet : GameObject;
	
	var hasFired : boolean = false;
	var firingCD : float = 0;
	
	var currentTarget : GameObject;
	
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
			var b : GameObject = Instantiate(bullet,transform.position,Quaternion.identity);
			b.GetComponent.<BulletMover>().currentTarget = target;
			hasFired = true;
		}
	}
	
	function Update() {
		if (hasFired) {
			firingCD += Time.deltaTime;
			if (firingCD >= 2.0f) {
				hasFired = false;
				firingCD = 0;
			}
		}
	}
	
}

