#pragma strict

// Enemy Script

// Inspector Variables
var numberOfClicks 	: int 		= 2;	// number of clicks to destroy the object
var respawnWaitTime : float 	= 2.0;	// time to wait until the enemy respawn
var vanishWaitTime	: float		= 5.0;	// time that the object wait to vanish
var explosion 		: Transform;		// explosion game object
var enemyPoint 		: int 		= 1;	// points earned by destroying the enemy

// Private variables
private var storeClicks				= 0;
private var destroyed				= false;
private var shapeColor				= [Color.green, Color.blue, Color.yellow, Color.red, Color.gray];
private var destructiveShapeColor	= Color.black;

function Start() {
	storeClicks = numberOfClicks;
	Spawn();
}

function Update () {
	

	if (IsDestroyed()) {
		
		if (explosion) {
			Instantiate(explosion, transform.position, transform.rotation); // create explosion
			
			if (audio.clip) {
				audio.Play();
			}
		}					
		Respawn();		
	}
}

// Hide the game object for a set amount of time and then unhide
function Respawn() {
	CancelInvoke("Respawn");
	Vanish();
	destroyed = false;
	Invoke("Spawn", respawnWaitTime);
	// Old code left here just to remember how to use the WaitForSegonds function
	//yield WaitForSeconds(respawnWaitTime);
	//Spawn();
}

function Vanish() {
	renderer.enabled = false;
}

function Spawn() {
	numberOfClicks = storeClicks;	
	RamdomPosition();
	UpdateColor();
	renderer.enabled = true;
	Invoke("Respawn", vanishWaitTime);
}

// Color to change out the material of the game object
function UpdateColor() {
	if (numberOfClicks > 0) {
		if (IsDestructive()) {
			renderer.material.color = destructiveShapeColor;
		} else{
			renderer.material.color = shapeColor[numberOfClicks - 1];
		}
	}
}

function RamdomPosition() {

	// get the vertical orthografic camera size
	var verticalSize   = Camera.main.orthographicSize; 
	// calculate the horizontal camera size based on screen size in pixels
	var horizontalSize = verticalSize * Screen.width / Screen.height;
	
	// decrement sizes, so the game objects will not apear outside the camera view
	verticalSize--;
	horizontalSize--;
	
	// as the orthographic size returns the half of the real orhtografic size,
	// the position can be randomized using the obtained values
	var position = Vector3(Random.Range(-horizontalSize, horizontalSize), Random.Range(-verticalSize, verticalSize), 0); // new random position for the game object
	
	transform.position = position; // move the game object to the new location
}

function Click() {
	if (numberOfClicks > 0 && renderer.enabled) {	
		numberOfClicks--;	
		UpdateColor();
		
		if (numberOfClicks == 0) {		
			destroyed = true;
		}
	}
}

function IsDestroyed() {
	return destroyed;
}

function IsDestructive() {
	return enemyPoint < 0;
}