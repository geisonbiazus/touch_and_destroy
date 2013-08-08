#pragma strict

// var buttonSize : float = 50;

function OnGUI() {

	var style : GUIStyle = new GUIStyle();
	
	GUI.skin.label.alignment = TextAnchor.MiddleCenter;
	GUI.skin.label.fontSize = 40;
	
	GUI.Label(Rect((Screen.width - 400) / 2, (Screen.height / 2) - 160, 400, 70), "Touch and Destroy" );
	
	GUI.skin.label.alignment = TextAnchor.MiddleLeft;
	GUI.skin.label.fontSize = 12;


	if (GUI.Button(Rect((Screen.width - 150) / 2, (Screen.height / 2) - 80, 150, 70), "Start Game")) {
		Application.LoadLevel("sceneScreenLevelSelect");
	}
	
	if (GUI.Button(Rect((Screen.width - 150) / 2, (Screen.height / 2) + 10, 150, 70), "Exit Game")) {
		Application.Quit();
	}
}