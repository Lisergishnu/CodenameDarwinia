#pragma strict

function Objective(name:String, pos:Vector2) {
	this.name = name;
	var hit : RaycastHit;
	if (Physics.Raycast(Vector3(pos.x,100,pos.y),Vector3.down,hit))
	{
		this.transform.position = hit.point;
		this.transform.position.y += 1;
	} else {
	Debug.LogError("Couldn't position objective!");
	}	
}

function Start () {
	
}

function Update () {

}