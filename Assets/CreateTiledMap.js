#pragma strict

import AstarPath;

var width : int;
var height : int;
var seed : int;
var scale : float;
var heightOffset : float;
var mesh : Mesh;
var heightMultiplier : float;
var mapHeightData : float[];


function Start () {
	CreateTerrain();	
}

function Update () {

}
function CreateTerrain() {
	mesh = new Mesh();
	mesh.name = "Map Terrain";
	GetComponent.<MeshFilter>().mesh = mesh;

	var newVertices : Vector3[] = new Vector3[(width+1)*(height+1)];
	var newTriangles : int[] = new int[width * height * 6];
	var newUV : Vector2[] = new Vector2[newVertices.Length];
	mapHeightData = new float[(width+1)*(height+1)];
	
	Random.seed = seed;
	var k : int = 0;
	var ti : int = 0;
	var vi : int = 0;
	for (var j = 0; j <= height ; j++)
	{
		for (var i = 0; i <= width; i++)
		{
			var xCoord = seed + i * scale / parseFloat(width);
			var yCoord = seed + j * scale / parseFloat(height);
			var r = Mathf.PerlinNoise(xCoord, yCoord);
			mapHeightData[k] = r;
			
			if (r < heightOffset) {
				r = 0;
			}

			var position = new Vector3(i,r*heightMultiplier,j);
			newVertices[k] = position;
			newUV[k] = new Vector2(i,j);
			k++;
		}
	}
	mesh.vertices = newVertices;
	mesh.uv = newUV;
	
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
	mesh.RecalculateBounds();	
	
	GetComponent.<MeshCollider>().sharedMesh = mesh;
	AstarPath.active.Scan();
}
