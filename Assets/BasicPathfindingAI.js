#pragma strict

var targetPosition : Vector3;
private var controller : CharacterController;
var path : Pathfinding.Path;
var speed : float;
var nextWaypointDistance : float = 3;
var seeker : Seeker;
var groundLayer : LayerMask;
var gravity : float = 9.8;

private var currentWaypoint : int;

function Start () {
	seeker = GetComponent.<Seeker>();
	controller = GetComponent.<CharacterController>();
}

function IssueMovementToMapPoint(p:Vector3) : boolean {
	p.y = 200;
	var hit : RaycastHit;
	if (Physics.Raycast(p, Vector3.down, hit, Mathf.Infinity, groundLayer)) {
		seeker.StartPath(transform.position, hit.point, OnPathComplete);
		return true;
	}
	return false;
}

function OnPathComplete(p:Pathfinding.Path) {
	 //Debug.Log ("Yay, we got a path back. Did it have an error? "+p.error);
        if (!p.error) {
            path = p;
            //Reset the waypoint counter
            currentWaypoint = 0;
        }
}

function Update () {
	var g : Vector3 = Vector3.zero;
	g.y -= gravity * Time.deltaTime;
	controller.Move(g);
	if (path == null) {
            //We have no path to move after yet
            return;
        }
        if (currentWaypoint >= path.vectorPath.Count) {
            //Debug.Log ("End Of Path Reached");
            return;
        }
        //Direction to the next waypoint
        var dir : Vector3 = (path.vectorPath[currentWaypoint]-transform.position).normalized;
        dir *= speed * Time.deltaTime;
        controller.SimpleMove (dir);
        //Check if we are close enough to the next waypoint
        //If we are, proceed to follow the next waypoint
        if (Vector3.Distance (transform.position,path.vectorPath[currentWaypoint]) < nextWaypointDistance) {
            currentWaypoint++;
            return;
        }   
}