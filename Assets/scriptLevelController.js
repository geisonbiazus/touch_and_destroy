#pragma strict

var levelScenes			: String[];
var levelNames 			: String[];
var currentLevelName	: String;
var currentLevelIndex	: int = 0;
var currentLevelScore	: int = 0;

function Awake() {
	DontDestroyOnLoad(this);	
}

function LoadLevel(levelName : String) {
	
	for (var i = 0; i < levelScenes.Length; i++) {
		if (levelScenes[i] == levelName) {
			currentLevelIndex = i;
			currentLevelName = levelName;
			break;
		}
	}
	
	Application.LoadLevel(currentLevelName);
}