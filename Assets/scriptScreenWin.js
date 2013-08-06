#pragma strict

private var levelController : scriptLevelController;

function Awake() {
	levelController = scriptUtils.LevelController();
}

function OnGUI() {
		
	GUI.Label(Rect(10, 10, 100, 20), "YOU WIN!!");
	GUI.Label(Rect(10, 30, 100, 20), "Score: " + levelController.currentLevelScore);
	
	if (levelController.HasNextLevel()) {
	
		if (GUI.Button(Rect(10, 60, 100, 50), "Next Level")) {
			levelController.LoadNextLevel();		
		}
		
	} else {
		GUI.Label(Rect(10, 60, 300, 50), "Congratulations!! You finished the game!!");		
	}
	
	if (GUI.Button(Rect(10, 130, 100, 50), "Main Menu")) {
		Application.LoadLevel("sceneScreenMainMenu");
	}
}