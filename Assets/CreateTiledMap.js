#pragma strict

var grassTile : GameObject;
var dirtTile : GameObject;
var width : int;
var height : int;
var seed : int;
var xOffset : int;
var yOffset : int;
var zOffset : int;
var granularity : float;
var heightOffset : float;

function Start () {
	Random.seed = seed;
	for (var i = 0; i < width ; i++)
	{
		for (var j = 0; j < height; j++)
		{
			var r = Mathf.PerlinNoise(i*granularity,j*granularity);
			var position = Vector3(i*xOffset,r*yOffset,j*zOffset);
			if (r > heightOffset) 
			{
				Instantiate(dirtTile, position, Quaternion.identity);
			}	
			else 
			{
				Instantiate(grassTile, position, Quaternion.identity);
			}
		}
	}
}

function Update () {

}