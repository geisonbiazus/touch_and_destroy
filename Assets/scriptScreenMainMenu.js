#pragma strict

// var buttonSize : float = 50;

function OnGUI() {
	if (GUI.Button(Rect(10, 10, 90, 50), "Start Game")) {
		Application.LoadLevel("sceneLevel1");
	}
	
	if (GUI.Button(Rect(10, 70, 90, 50), "Exit Game")) {
		Application.Quit();
	}
}