#pragma strict

var currentTarget : GameObject;
var initialPos : Vector3;
var speed : float = 1;
var t : float = 0;

function Start () {
	initialPos = transform.position;
}

function Update () {
	if (!currentTarget)
		Debug.LogError("Bullet instancied without target!!");
		
	t += Time.deltaTime*speed;
	if (t >= 1) {
		currentTarget.SendMessage("OnBulletHit");
		Destroy(this.gameObject,0.1f);
		return;
	} else {
		transform.position = Vector3.Lerp(initialPos, currentTarget.transform.position, t);
	}
}