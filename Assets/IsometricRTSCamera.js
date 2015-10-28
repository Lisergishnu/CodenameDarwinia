#pragma strict

var speed : float;
var zoomSpeed : float;
var cameraDistance : int = 20;
private var mCamera: Camera;
private var lookingDir : Vector3;

function Start () {
	// Show starting area
	var sA : GameObject = GameObject.Find("Starting Area");
	mCamera = GetComponent.<Camera>();
	lookingDir = sA.transform.position;
	LookAt(lookingDir);
}

function LookAt(worldPoint: Vector3) {
	transform.position = worldPoint - transform.forward*cameraDistance;
}

function RotateCameraCounterClockwise() {
	transform.Rotate(-45,0,0);
	transform.Rotate(0,90,0);
	transform.Rotate(45,0,0);
}

function RotateCameraClockwise() {
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
	
	var dirN : Vector3 =  Vector3.ProjectOnPlane(transform.forward,Vector3.up);
	dirN.Normalize();
	dirN *= translationY;
	
	var dirE : Vector3 = Vector3.ProjectOnPlane(transform.right, Vector3.up);
	dirE.Normalize();
	dirE *= translationXZ;	
	
	var dirT = dirN + dirE;
	lookingDir += dirT;
	LookAt(lookingDir);
	
	var translationZoom = Input.GetAxis("Zoom") * zoomSpeed * Time.deltaTime;
	var oS = mCamera.orthographicSize + translationZoom;
	mCamera.orthographicSize += (oS > 1.75) ? 
												((oS < 40) ? translationZoom : 0) : 0;
}