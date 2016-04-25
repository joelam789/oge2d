package oge2d.system;

import oge2d.core.Game;
import oge2d.core.Scene;
import oge2d.core.Sprite;

/**
 * ...
 * @author JoeLam
 */
class Collision implements Updater {
	
	public static function setEnabled(sprite: Sprite, value: Bool): Void {
		if (sprite == null) return;
		var setting = sprite.components["collision"];
		if (setting == null) return;
		setting.enabled = value;
	}

	public function new() {
		// ...
	}
	
	public function batched(): Bool {
		return true;
	}
	
	public function bind(game: Game, scene: Scene): Void {
		// ...
	}
	
	public function include(sprite: Sprite): Void {
		// ...
	}
	public function exclude(sprite: Sprite): Void {
		// ...
	}
	
	public function begin(scene: Scene): Void {
		// ...
	}
	
	public function update(sprite: Sprite): Void {
		// ...
	}
	
	public function end(scene: Scene): Void {
		if (scene.isPaused()) return;
		var sprs = scene.filter(function(spr) {
			var collidable: Bool = false;
			if (spr.enabled && spr.components["bound"] != null) {
				var setting = spr.components["collision"];
				collidable = setting != null && setting.enabled == true;
			}
			if (collidable) Display.getBound(spr); // refresh bound
			return collidable;
		});
		for (i in 0...sprs.length) {
			if (!sprs[i].enabled) continue;
			var boundA = sprs[i].components["bound"];
			for (j in i + 1...sprs.length) {
				if (!sprs[j].enabled) continue;
				var boundB = sprs[j].components["bound"];
				if (Display.isPointInsideBound(boundA, boundB.left, boundB.top)
					|| Display.isPointInsideBound(boundA, boundB.right, boundB.top)
					|| Display.isPointInsideBound(boundA, boundB.left, boundB.bottom)
					|| Display.isPointInsideBound(boundA, boundB.right, boundB.bottom)
					|| Display.isPointInsideBound(boundB, boundA.left, boundA.top)
					|| Display.isPointInsideBound(boundB, boundA.right, boundA.top)
					|| Display.isPointInsideBound(boundB, boundA.left, boundA.bottom)
					|| Display.isPointInsideBound(boundB, boundA.right, boundA.bottom)) {
					Event.addSpriteEvent(sprs[i], "onCollide", sprs[j]);
					Event.addSpriteEvent(sprs[j], "onCollide", sprs[i]);
				}
			}
		}
	}
}
