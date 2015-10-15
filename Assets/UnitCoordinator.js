#pragma strict

import System.Collections.Generic;

var selectionBox : GameObject;
private var offscreenPos : Vector3 = Vector3(-100,-100,-100);

private var startingPoint : Vector2;
private var draggingBox : boolean = false;

private var selectedUnits : List.<GameObject> = new List.<GameObject>();
var groundLayer : LayerMask;

function Start () {
	selectionBox = GameObject.Find("SelectionBox");
	selectionBox.transform.position = offscreenPos;
	selectedUnits.Clear();
}

function ScreenToIsometric () {
	var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	var hit: RaycastHit;
	if (Physics.Raycast(ray, hit, Mathf.Infinity)) {
		return hit.point;
	}
	Debug.LogError("Didn't hit ground!");
  	return null;
}

function SelectUnitsUnderRect(rect:Rect) : boolean {
	var foundAnyone = false;	
	var ggUnits = GameObject.FindGameObjectsWithTag("PlayerUnit");
	for (var u : GameObject in ggUnits) {
		Debug.Log("Rect: "+rect+". Unit: "+ u.transform.position);
		if (rect.Contains(Camera.main.WorldToScreenPoint(u.transform.position))) {
			var n = u.GetComponent.<Selectable>();
			n.OnSelection();
			selectedUnits.Add(u);
			foundAnyone = true;
		}
	}
	return foundAnyone;
}

function ClearSelectedUnits() {
	for (var i in selectedUnits) {
		var n = i.GetComponent.<Selectable>();
		n.OnUnselection();
	}
	selectedUnits.Clear();
}

function Update () {
	if (Input.GetButton("Click")) {
		if (!draggingBox) {
			ClearSelectedUnits();
			draggingBox = true;
			startingPoint = Input.mousePosition;
			selectionBox.transform.position = startingPoint;			
		}
		var rt = selectionBox.transform as RectTransform;
		var sd = Input.mousePosition - startingPoint;
		rt.pivot = Vector2(
			(sd.x < 0) ? 1 : 0,
			(sd.y < 0) ? 1 : 0);
			
		rt.sizeDelta = Vector2(
			(sd.x < 0) ? -sd.x : sd.x,
			(sd.y < 0) ? -sd.y : sd.y);

	} else if (draggingBox) {
		draggingBox = false;
		var endPoint : Vector2 = Input.mousePosition;
		selectionBox.transform.position = offscreenPos;
		rt = selectionBox.transform as RectTransform;
		rt.sizeDelta = Vector2(0,0);
		
		//Calculate objects in area
		var testX = Mathf.Min(startingPoint.x, endPoint.x);
		var testY = Mathf.Min(startingPoint.y, endPoint.y);
		var testWidth = Mathf.Abs(startingPoint.x - endPoint.x);
		var testHeight = Mathf.Abs(startingPoint.y - endPoint.y);
		SelectUnitsUnderRect(Rect(testX,testY,testWidth,testHeight));
	}
	
	if (Input.GetButton("Right Click")) {
		for (var i in selectedUnits) {
			var n = i.GetComponent.<BasicPathfindingAI>();
			var mp : Vector3 = ScreenToIsometric();
			if (mp != null) {
				n.IssueMovementToMapPoint(mp);
			}
		}	
	}
}