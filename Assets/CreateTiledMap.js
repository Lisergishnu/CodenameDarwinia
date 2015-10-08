#pragma strict

var width : int;
var height : int;
var seed : int;
var granularity : float;
var heightOffset : float;
var mesh : Mesh;


function Start () {

	mesh = new Mesh();
	mesh.name = "Map Terrain";
	GetComponent.<MeshFilter>().mesh = mesh;

	var newVertices : Vector3[] = new Vector3[(width+1)*(height+1)];
	var newUV : Vector2[];
	var newTriangles : int[] = new int[width * height * 6];

	Random.seed = seed;
	var k : int = 0;
	var ti : int = 0;
	var vi : int = 0;
	for (var j = 0; j <= height ; j++)
	{
		for (var i = 0; i <= width; i++)
		{
			var r = Mathf.PerlinNoise(i*granularity,j*granularity);
			var position = new Vector3(i,r,j);
			newVertices[k] = position;
			k++;
		}
	}
	mesh.vertices = newVertices;
	
	for (j = 0; j < height ; j++)
	{
		for (i = 0; i < width; i++)
		{
			newTriangles[ti] = vi;
			newTriangles[ti + 3] = newTriangles[ti + 2] = vi + 1;
			newTriangles[ti + 4] = newTriangles[ti + 1] = vi + width + 1;
			newTriangles[ti + 5] = vi + width + 2;
			ti += 6;
			vi++;
		}
		vi++;
	}
	
	mesh.triangles = newTriangles;
	mesh.RecalculateNormals();

}

function Update () {

}