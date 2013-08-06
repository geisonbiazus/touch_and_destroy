#pragma strict

// var buttonSize : float = 50;

function OnGUI() {
	if (GUI.Button(Rect((Screen.width - 150) / 2, (Screen.height / 2) - 80, 150, 70), "Start Game")) {
		Application.LoadLevel("sceneScreenLevelSelect");
	}
	
	if (GUI.Button(Rect((Screen.width - 150) / 2, (Screen.height / 2) + 10, 150, 70), "Exit Game")) {
		Application.Quit();
	}
}