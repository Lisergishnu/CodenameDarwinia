#pragma strict

var tileH : int;
var tileW : int;

var selectionBox : GameObject;
private var offscreenPos : Vector3 = Vector3(-100,-100,-100);

private var startingPoint;
private var startingScreenPoint : Vector3;
private var draggingBox : boolean = false;

function Start () {
	selectionBox = GameObject.Find("SelectionBox");
	selectionBox.transform.position = offscreenPos;
}

function screenToIsometric (sX: int, sY: int) {
	var isoX = sY / tileH + sX / (2*tileW);
  	var isoY = sY / tileH - sX / (2*tileW);

  	return [isoX, isoY];
}

function Update () {
	if (Input.GetButton("Click")) {
		if (!draggingBox) {
			draggingBox = true;
			startingPoint = screenToIsometric(Input.mousePosition.x, Input.mousePosition.y);
			startingScreenPoint = Input.mousePosition;
			selectionBox.transform.position = startingScreenPoint;			
		}
		var rt = selectionBox.transform as RectTransform;
		var sd = Input.mousePosition - startingScreenPoint;
		rt.sizeDelta = Vector2(sd.x,-sd.y);
	} else if (draggingBox) {
		draggingBox = false;
		var endPoint = screenToIsometric(Input.mousePosition.x, Input.mousePosition.y);
		selectionBox.transform.position = offscreenPos;
	}
}