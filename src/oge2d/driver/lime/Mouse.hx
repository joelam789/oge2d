package oge2d.driver.lime;

import haxe.ds.Vector;

/**
 * ...
 * @author JoeLam
 */
class Mouse {
	
	static var _buttonStates: Vector<Bool> = null;
	
	public static var x(default, null): Float = 0;
	public static var y(default, null): Float = 0;

	public function new() {
		// ...
	}
	
	public static function isButtonDown(button: Int): Bool {
		if (_buttonStates == null) return false;
		if (button < 0 || button >= _buttonStates.length) return false;
		return _buttonStates[button];
	}
	
	public static function setButtonState(button: Int, isDown: Bool, ?x: Float, ?y: Float) {
		if (_buttonStates == null) return;
		if (button < 0 || button >= _buttonStates.length) return;
		if (x != null) Mouse.x = x;
		if (y != null) Mouse.y = y;
		_buttonStates[button] = isDown;
	}
	
	public static function setPosition(x: Float, y: Float) {
		Mouse.x = x;
		Mouse.y = y;
	}
	
	public static function hide() {
		lime.ui.Mouse.hide();
	}
	
	public static function show() {
		lime.ui.Mouse.show();
	}
	
	public static function reset(?x: Float, ?y: Float) {
		if (_buttonStates == null) return;
		if (x != null) Mouse.x = x;
		if (y != null) Mouse.y = y;
		for (i in 0..._buttonStates.length) _buttonStates[i] = false;
	}
	
	public static function init(?x: Float, ?y: Float) {
		_buttonStates = new Vector<Bool>(32);
		reset(x, y);
	}
	
}

