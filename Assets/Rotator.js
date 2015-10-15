#pragma strict

var frequency : float = 1;

function Start () {

}

function Update () {
	transform.Rotate(0,2*Mathf.PI*this.frequency*Time.deltaTime,0);
}