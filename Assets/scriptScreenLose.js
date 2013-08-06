#pragma strict

private var levelController : scriptLevelController;

function Awake() {
	levelController = scriptUtils.LevelController();
}

function OnGUI() {

	GUI.Label(Rect(10, 10, 100, 20), "YOU LOSE!!");
	GUI.Label(Rect(10, 30, 100, 20), "Score: " + levelController.currentLevelScore);
	
	if (GUI.Button(Rect(10, 60, 100, 50), "Restart Level")) {
		Application.LoadLevel("sceneScreenLevelSelect");
		levelController.ReloadCurrentLevel();
	}
	
	if (GUI.Button(Rect(10, 130, 100, 50), "Main Menu")) {
		Application.LoadLevel("sceneScreenMainMenu");
	}
}