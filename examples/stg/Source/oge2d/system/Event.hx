package oge2d.system;

import oge2d.core.Game;
import oge2d.core.Scene;
import oge2d.core.Sprite;

import oge2d.driver.Mouse;

/**
 * @author JoeLam
 */
class Event implements Updater {
	
	public function new() {
		// ...
	}
	
	public function batched(): Bool {
		return false;
	}
	
	public function bind(game: Game, scene: Scene): Void {
		if (scene != null) {
			scene.events.clear();
			var sprs = scene.filter( function(spr) { return spr.enabled; } );
			for (spr in sprs) {
				include(spr);
				spr.script.call("onSceneActive");
			}
		} else {
			var sprs = game.scene.filter( function(spr) { return spr.enabled; } );
			for (spr in sprs) {
				spr.script.call("onSceneInactive");
				exclude(spr);
			}
			game.scene.events.clear();
		}
	}
	
	public function include(sprite: Sprite): Void {
		sprite.script.reset();
		sprite.script.basis.reset();
	}
	public function exclude(sprite: Sprite): Void {
		sprite.script.reset();
		sprite.script.basis.reset();
		sprite.events.clear();
	}
	
	public function begin(scene: Scene): Void {
		
		Display.sortSpritesByPosition(scene); // draw from back to front ...
		
		if (scene.isPaused()) {
			if (scene.script.isReady()) {
				for (event in scene.events) {
					if (event.param == null) scene.script.call(event.name);
					else scene.script.call(event.name, [event.param]);
				}
			}
			scene.events.clear();
			return;
		}
		
		var sprs = scene.filter( function(spr) { return spr.enabled && spr.script.isReady(); } );
		sprs.reverse(); // but check from front to back ...
		for (event in scene.events) {
			var eventName: String = event.name;
			var eventParam: Dynamic = event.param;
			var isMouseEvent: Bool = StringTools.startsWith(eventName, "onMouse");
			var isTouchEvent: Bool = !isMouseEvent && StringTools.startsWith(eventName, "onTouch");
			
			scene.dispatching = true;
			for (spr in sprs) {
				if (isMouseEvent || isTouchEvent) {
					if (!Display.isPointInsideBound(Display.getBound(spr), Mouse.x, Mouse.y)) continue;
				}
				if (eventParam == null) spr.script.call(eventName);
				else spr.script.call(eventName, [eventParam]);
				if (!scene.dispatching) break;
			}
			if (scene.dispatching && scene.script.isReady()) {
				if (eventParam == null) scene.script.call(eventName);
				else scene.script.call(eventName, [eventParam]);
			}
		}
		
		scene.events.clear();
		
	}
	
	public function update(sprite: Sprite): Void {
		if (sprite.scene.isPaused()) return;
		if (!sprite.script.isReady()) return;
		for (event in sprite.events) {
			if (event.param == null) sprite.script.call(event.name);
			else sprite.script.call(event.name, [event.param]);
		}
		sprite.events.clear();
		sprite.script.call("onUpdate");
	}
	
	public function end(scene: Scene): Void {
		if (scene.script.methods != null 
			&& scene.script.methods.exists("onUpdate")) scene.script.call("onUpdate");
	}
	
}
