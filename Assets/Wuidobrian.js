#pragma strict

class Wuidobrian extends MonoBehaviour {
	var health : float = 100;
	var bullet : GameObject;
	
	function OnBulletHit() {
		Debug.Log("Got Hit!!");
		health -= 5;
		if (health <= 0) {
			Destroy(this.gameObject,0.1f);
		}
	}
	
	function Fire(target: GameObject) {
		var b : GameObject = Instantiate(bullet,transform.position,Quaternion.identity);
		b.GetComponent.<BulletMover>().currentTarget = target;
	}
}

