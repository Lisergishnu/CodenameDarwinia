#pragma strict

var speed : float;
var zoomSpeed : float;
function Start () {
	
}

function Update () {
	var translationXZ = Input.GetAxis("Horizontal") * speed;
	var translationY = Input.GetAxis("Vertical") * speed;
	
	translationXZ *= Time.deltaTime;
	translationY *= Time.deltaTime;
	
	var dirXZ =  new Vector3(1,0,-1);
	dirXZ *= translationXZ;
	
	transform.Translate(dirXZ.x, translationY, dirXZ.z);
	
	var translationZoom = Input.GetAxis("Zoom") * zoomSpeed * Time.deltaTime;
	var oS = GetComponent.<Camera>().orthographicSize + translationZoom;
	GetComponent.<Camera>().orthographicSize += (oS > 1.75) ? 
												((oS < 40) ? translationZoom : 0) : 0;
}