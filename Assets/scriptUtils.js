#pragma strict

// get the vertical orthografic camera size
static function ScreenVerticalSize() {
	return Camera.main.orthographicSize;
}

// calculate the horizontal camera size based on screen size in pixels
static function ScreenHorizontalSize() {
	return ScreenVerticalSize() * Screen.width / Screen.height;
}