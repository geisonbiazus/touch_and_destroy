#pragma strict

var levelScenes 			: String[];
var levelNames 				: String[];
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

function OnGUI() {	
		
	CalculateDefaultValues();		

	var levelScene : String;
	var levelName : String;
		
	for (var i = CurrentPageFirstLevelIndex(); i <= CurrentPageLastLevelIndex(); i++) {
		levelScene = levelScenes[i];
		levelName = levelNames[i];
			
		if (GUI.Button(Rect(buttonX, buttonY, buttonSize, buttonSize), levelName)) {
			Application.LoadLevel(levelScene);
		}			
		
		CalculateNextButtonPosition();
	}
	
	var prevButtonX = (Screen.width / 2.0) - controlButtonWidth - 5;
	var prevButtonY = Screen.height - 60;
	var nextButtonX = (Screen.width / 2.0) + 5;
	var nextButtonY = Screen.height - 60;
	
	
	if (GUI.Button(Rect(prevButtonX, prevButtonY, controlButtonWidth, controlButtonHeight), "Previous")) {		
		if (currentPage > 1) {
			currentPage--;
		}
	}
	
	if (GUI.Button(Rect(nextButtonX, nextButtonY, controlButtonWidth, controlButtonHeight), "Next")) {		
		if (currentPage < numberOfPages) {
			currentPage++;
		}
	}
	
}

function CalculateDefaultValues() {	
	buttonXStartPosition = CalculateStartPosition(Screen.width, minButtonXStartPosition);
	buttonYStartPosition = CalculateStartPosition(Screen.height, minButtonYStartPosition);
	levelsPerRow = CalculateAmountOfButtons(Screen.width, minButtonXStartPosition);
	levelsPerCol = CalculateAmountOfButtons(Screen.height, minButtonYStartPosition);
	levelsPerPage = levelsPerRow * levelsPerCol;
	numberOfPages = Mathf.Ceil((levelScenes.Length + 0.0) / levelsPerPage);
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
	
	if (lastLevel > levelScenes.length) {
		lastLevel = levelScenes.length;
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

