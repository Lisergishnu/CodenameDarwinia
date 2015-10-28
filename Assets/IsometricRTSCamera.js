#pragma strict

var speed : float;
var zoomSpeed : float;
private var mCamera: Camera;

function Start () {
	// Show starting area
	var sA : GameObject = GameObject.Find("Starting Area");
	mCamera = GetComponent.<Camera>();
	
}

function LookAt(worldPoint: Vector3) {
	
}

function RotateCameraClockwise() {
	transform.Rotate(-45,0,0);
	transform.Rotate(0,90,0);
	transform.Rotate(45,0,0);
}

function RotateCameraCounterClockwise() {
	transform.Rotate(-45,0,0);
	transform.Rotate(0,-90,0);
	transform.Rotate(45,0,0);
}

function Update () {

	if (Input.GetKeyUp(KeyCode.Q)) {
		RotateCameraCounterClockwise();
	} else if (Input.GetKeyUp(KeyCode.E)) {
		RotateCameraClockwise();
	}

	var translationXZ = Input.GetAxis("Horizontal") * speed;
	var translationY = Input.GetAxis("Vertical") * speed;
	
	translationXZ *= Time.deltaTime;
	translationY *= Time.deltaTime;
	
	var dirXZ : Vector3 =  transform.forward;
	dirXZ.Normalize();
	dirXZ *= translationXZ;
	
	transform.Translate(dirXZ.x, translationY, dirXZ.z);
	
	var translationZoom = Input.GetAxis("Zoom") * zoomSpeed * Time.deltaTime;
	var oS = mCamera.orthographicSize + translationZoom;
	mCamera.orthographicSize += (oS > 1.75) ? 
												((oS < 40) ? translationZoom : 0) : 0;
}