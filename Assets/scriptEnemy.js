#pragma strict

// Enemy Script

// Inspector Variables
var shapeColor 		: Color[];			// color of the object
var numberOfClicks 	: int 		= 2;	// number of clicks to destroy the object
var respawnWaitTime : float 	= 2.0;	// time to wait until the enemy respawn
var explosion 		: Transform;		// explosion game object
var enemyPoint 		: int 		= 1;	// points earned by destroying the enemy

// Private variables
private var storeClicks : int = 0;

function Start() {
	storeClicks = numberOfClicks;
	RamdomPosition();
}

function Update () {
	
	if (numberOfClicks <= 0) {
		
		if (explosion) {
			Instantiate(explosion, transform.position, transform.rotation); // create explosion
			
			if (audio.clip) {
				audio.Play();
			}
		}
		
		RamdomPosition(); // move the object to a random position		
		numberOfClicks = storeClicks;;
	}
}

function RamdomPosition() {
	var position = Vector3(Random.Range(-6, 6), Random.Range(-4, 4), 0); // new random position for the game object
	RespawnWaitTime();
	transform.position = position; // move the game object to the new location
}

// Hide the game object for a set amount of time and then unhide
function RespawnWaitTime() {
	renderer.enabled = false;
	RandomColor();
	yield WaitForSeconds(respawnWaitTime);
	renderer.enabled = true;
}

// Color to change out the material of the game object
function RandomColor() {
	if (shapeColor.Length > 0) {
		var newColor = Random.Range(0, shapeColor.length);
		renderer.material.color = shapeColor[newColor];
	}
}