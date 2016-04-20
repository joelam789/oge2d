package oge2d.driver.lime;

import lime.app.Config;
import lime.app.Application;

import oge2d.core.Game;

/**
 * ...
 * @author JoeLam
 */
class App extends Application {

	private var _game: Game = null;
	
	private function setupGame(screenWidth: Int = 0, screenHeight: Int = 0) {
		if (_game == null) return;
		_game.init(screenWidth, screenHeight, function() {
			if (_game.state < 0) trace("Failed to initialize the game");
			else {
				#if debug
				trace("Initialized game with screen size: " 
						+ _game.width + "x" + _game.height + " (" + _game.getOS() + ")");
				#end
			}
		});
	}
	
	public function new(gameName: String = "game", assetPath: String = "assets") {
		super();
		_game = new Game(gameName, assetPath);
	}
	
	override function create(config:Config):Void {
		if (_game != null && _game.state >= 0) {
			#if debug trace("Apply game.width and game.height: " + _game.width + "x" + _game.height); #end
			if (Reflect.hasField (config, "windows")) {
				for (windowConfig in config.windows) {
					if (Reflect.hasField (windowConfig, "width"))
						windowConfig.width = _game.width;
					if (Reflect.hasField (windowConfig, "height"))
						windowConfig.height = _game.height;
					if (Reflect.hasField (windowConfig, "x"))
						windowConfig.x = cast (_game.width / 2);
					if (Reflect.hasField (windowConfig, "y"))
						windowConfig.y = cast (_game.height / 2);
					break;
				}
			}
		}
		super.create(config);
	}
	
	public override function onKeyDown(_, key, _):Void {
		Keyboard.setKeyState(key, true);
	}
	
	public override function onKeyUp(_, key, _):Void {
		Keyboard.setKeyState(key, false);
		if (_game != null && _game.scene != null) {
			var keyNames = Keyboard.getKeyNames(key);
			for (keyName in keyNames) _game.scene.addEvent("onKeyUp", keyName);
		}
	}
	
	public override function onMouseDown(_, x:Float, y:Float, button:Int):Void {
		Mouse.setButtonState(button, true, x, y);
	}
	
	public override function onMouseMove(_, x:Float, y:Float):Void {
		Mouse.setPosition(x, y);
	}
	
	public override function onMouseUp(_, x:Float, y:Float, button:Int):Void {
		Mouse.setButtonState(button, false, x, y);
		if (_game != null && _game.scene != null) _game.scene.addEvent("onMouseUp", button);
	}
	
	public override function onPreloadComplete():Void {
		switch (renderer.context) {
			case OPENGL (gl):
				Renderer.init(window.width, window.height, gl, setupGame);
			case FLASH (sprite):
				#if flash
				Renderer.init(window.width, window.height, sprite, setupGame);
				#end
			default:
				throw "Unsupported render context";
		}
	}
	
	public override function update(deltaTime:Int):Void {
		if (_game != null) _game.update(deltaTime);
	}
}
