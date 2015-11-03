#pragma strict

var friendlyColor : Color;
var enemyColor : Color;
var neutralColor : Color;

var unit : GameObject;
var target : Vector3;
var targetUnit : GameObject;

function LateUpdate () {
	var pos : Vector3;
	var lineRenderer  : LineRenderer = GetComponent.<LineRenderer>();
	var unit : GameObject = transform.parent.gameObject;
	var huid : Wuidobrian = unit.GetComponent.<Wuidobrian>();
	lineRenderer.SetPosition(0,unit.transform.position);
	switch (huid.currentState) {
		case WuidobrianState.Attacking:
			GetComponent.<Renderer>().material.color = enemyColor;
			lineRenderer.SetColors(enemyColor,enemyColor);
			if (huid.currentTarget)
				lineRenderer.SetPosition(1,huid.currentTarget.transform.position);
			break;
		case WuidobrianState.Moving:
			GetComponent.<Renderer>().material.color = friendlyColor;
			lineRenderer.SetColors(friendlyColor,friendlyColor);
			lineRenderer.SetPosition(1,huid.targetPosition);
			break;
	}
}