#pragma strict

private var levelController : scriptLevelController;

function Awake() {
	levelController = scriptUtils.LevelController();
}

function OnGUI() {
	GUI.skin.label.alignment = TextAnchor.MiddleCenter;

	GUI.Label(Rect((Screen.width - 100) / 2, (Screen.height / 2) - 140, 100, 20), "YOU WIN!!");
	GUI.Label(Rect((Screen.width - 100) / 2, (Screen.height / 2) - 120, 100, 20), "Score: " + levelController.currentLevelScore);
	
	if (levelController.HasNextLevel()) {
	
		if (GUI.Button(Rect((Screen.width - 150) / 2, (Screen.height / 2) - 80, 150, 70), "Next Level")) {
			levelController.LoadNextLevel();		
		}
		
	} else {
		GUI.Label(Rect((Screen.width - 300) / 2, (Screen.height / 2) - 80, 300, 50), "Congratulations!! You finished the game!!");		
	}
	
	if (GUI.Button(Rect((Screen.width - 150) / 2, (Screen.height / 2) + 10, 150, 70), "Main Menu")) {
		Application.LoadLevel("sceneScreenMainMenu");
	}
}