#pragma strict

var buttonSize				: float 	= 120;
var buttonDistance 			: float 	= 20;
var minButtonXStartPosition : float		= 80;
var minButtonYStartPosition : float		= 80;

private var buttonXStartPosition	: float;
private var buttonYStartPosition	: float;
private var levelsPerRow			: int;
private var levelsPerCol			: int;
private var levelsPerPage			: int;
private var buttonX 				: float;
private var buttonY 				: float;
private var numberOfPages			: int;
private var currentPage				: int 	= 1;
private var controlButtonWidth		: float	= 80;
private var controlButtonHeight		: float	= 30;
private var levelController			: scriptLevelController;

function OnGUI() {		
	CalculateDefaultValues();
	
	if (GUI.Button(Rect((Screen.width - 90) / 2, 10, 90, 40), "Main Menu")) {
		Application.LoadLevel("sceneScreenMainMenu");
	}

	var levelScene 				: String;
	var levelName 				: String;
	var levelScore				: int;
	var levelCompleted			: String;
	
		
	for (var i = CurrentPageFirstLevelIndex(); i <= CurrentPageLastLevelIndex(); i++) {
		levelScene = levelController.levelScenes[i];
		levelName = levelController.levelNames[i];
		levelScore = PlayerPrefs.GetInt(levelScene + ":HighScore", 0);
		
		GUI.enabled = LevelEnabled(i);
					
		if (GUI.Button(Rect(buttonX, buttonY, buttonSize, buttonSize), levelName + "\nScore: " + levelScore)) {
			scriptUtils.LevelController().LoadLevel(levelScene);			
		}			
		
		CalculateNextButtonPosition();
	}
	
	var prevButtonX = (Screen.width / 2.0) - controlButtonWidth - 5;
	var prevButtonY = Screen.height - 60;
	var nextButtonX = (Screen.width / 2.0) + 5;
	var nextButtonY = Screen.height - 60;
	
	GUI.enabled = false;
	
	if (HasPreviousPage()) {
		GUI.enabled = true;
	}
	
	if (GUI.Button(Rect(prevButtonX, prevButtonY, controlButtonWidth, controlButtonHeight), "Previous")) {		
		currentPage--;		
	}
	
	GUI.enabled = false;
	
	if (HasNextPage()) {
		GUI.enabled = true;
	}
	
	if (GUI.Button(Rect(nextButtonX, nextButtonY, controlButtonWidth, controlButtonHeight), "Next")) {		
		currentPage++;		
	}
	
}

function CalculateDefaultValues() {	
	buttonXStartPosition = CalculateStartPosition(Screen.width, minButtonXStartPosition);
	buttonYStartPosition = CalculateStartPosition(Screen.height, minButtonYStartPosition);
	levelsPerRow = CalculateAmountOfButtons(Screen.width, minButtonXStartPosition);
	levelsPerCol = CalculateAmountOfButtons(Screen.height, minButtonYStartPosition);
	levelsPerPage = levelsPerRow * levelsPerCol;
	levelController = scriptUtils.LevelController();
	numberOfPages = Mathf.Ceil((levelController.levelScenes.Length + 0.0) / levelsPerPage);
	buttonX = buttonXStartPosition;
	buttonY = buttonYStartPosition;	
}

function CalculateStartPosition(size : float, minStartPosition : float) {	
	var remainingSize = WidthToCalculate(size, minStartPosition) % (buttonSize + buttonDistance);

	return (remainingSize / 2) + minStartPosition;
}

function CalculateAmountOfButtons(size : float, minStartPosition : float) {	
	return parseInt(WidthToCalculate(size, minStartPosition) / (buttonSize + buttonDistance));
}

function WidthToCalculate(size : float, minStartPosition : float) {
	return size + buttonDistance - (minStartPosition * 2);
}

function CurrentPageFirstLevelIndex() {
	return (currentPage - 1) * levelsPerPage;
}

function CurrentPageLastLevelIndex() {
	var lastLevel = currentPage * levelsPerPage;
	
	if (lastLevel > levelController.levelScenes.length) {
		lastLevel = levelController.levelScenes.length;
	}
	
	return lastLevel - 1;
}

function CalculateNextButtonPosition() {
	buttonX += buttonSize + buttonDistance;		
	
	if ((buttonX + buttonSize + minButtonXStartPosition) > Screen.width) {
		buttonX = buttonXStartPosition;
		buttonY += buttonSize + buttonDistance;
	}
}

function HasPreviousPage() {
	return currentPage > 1;
}

function HasNextPage() {
	return currentPage < numberOfPages;	
}

function LevelEnabled(index : int) {
	return index == 0 || LevelCompleted(levelController.levelScenes[index]) || LevelCompleted(levelController.levelScenes[index - 1]);
}

function LevelCompleted(levelScene) {
	return PlayerPrefs.GetString(levelScene + ":Completed", "") == "true";
}