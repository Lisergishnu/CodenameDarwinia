#pragma strict

class Wuidobrian extends MonoBehaviour {
	var health : float = 100;
	
	function OnBulletHit() {
		Debug.Log("Got Hit!!");
		health -= 5;
	}
}

