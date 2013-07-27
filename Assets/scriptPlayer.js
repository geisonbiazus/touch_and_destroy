#pragma strict

// Player Script

// Inspector Variables
var tagName				: String	= "enemy";	// allow designer to setup a tag in the inspector
var rayDistance			: float 	= 0; 		// length of the ray for aur raycast
var score 				: int 		= 0; 		// score for our player
var gameTime			: float		= 20.0;		// the a mount of time the game will last
var loadWaitTime		: float		= 3.0; 		// amout of time before we loead the next scene
var numberOfPointsToWin	: int		= 20;		// number of points to win game

function Start() {
	InvokeRepeating("CountDown", 1.0, 1.0); // Repeat the countdown every second
}

function Update () {
	// use the mouse button to select on game ovjects on the scene		
	if (Input.GetMouseButtonDown(0)) {
		
		var hit : RaycastHit;
		var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition); // get mouse position
		// Casts a ray against all colliders in the scene
		if (Physics.Raycast(ray, hit, rayDistance)) {
			
			if (hit.transform.tag == tagName) {
				var enemyScript = hit.transform.GetComponent(scriptEnemy);
				enemyScript.Click();
				
				// if the object has been destroyed
				if (enemyScript.IsDestroyed()) {
					score += enemyScript.enemyPoint; // add points to  our overall score
					
					if (enemyScript.IsDestructive()) {
						ShakeScreen();
						
						if (score < 0) {
							score = 0;
						}
					}
				}
			} else {
				print("This is not an enemy");
			}
		}
	}
}

function CountDown() {
	// subtract from gametime and checks if the time goes to zero
	if (--gameTime == 0) { 
		CancelInvoke("CountDown"); // cancel the countdown
		
		if (score >= numberOfPointsToWin) {
			Application.LoadLevel("sceneScreenWin");
		} else {
			Application.LoadLevel("sceneScreenLose");
		}
	}	
}

function OnGUI() {
	
	GUI.Label(Rect(10, 10, 100, 20), "Score: " + score);
	GUI.Label(Rect(10, 25, 100, 35), "Time: " + gameTime);
}

function ShakeScreen() {
	Camera.main.animation.Play();
	yield WaitForSeconds(1);
	Camera.main.animation.Stop();
}