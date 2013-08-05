#pragma strict

private var score : int;

function Start() {
	score = scriptUtils.LevelController().currentLevelScore;
}

function OnGUI() {

	GUI.Label(Rect(10, 10, 100, 20), "YOU LOSE!!");
	GUI.Label(Rect(10, 30, 100, 20), "Score: " + score);
	
	if (GUI.Button(Rect(10, 60, 100, 50), "Restart Game")) {
		Application.LoadLevel("sceneScreenLevelSelect");
	}
	
	if (GUI.Button(Rect(10, 130, 100, 50), "Exit Game")) {
		Application.Quit();
	}
}