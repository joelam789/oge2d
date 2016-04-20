package oge2d.system;

import oge2d.core.Sprite;
import oge2d.core.Scene;
import oge2d.core.Game;

/**
 * ...
 * @author JoeLam
 */
class Color implements Updater {
	
	public static function createColorData() {
		var color = {
			state: 0,
			steps: 0,
			times: 0,
			current: 0,
			startR: 0,
			startG: 0,
			startB: 0,
			startA: 0,
			deltaR: 0,
			deltaG: 0,
			deltaB: 0,
			deltaA: 0,
			callback: null
		};
		return color;
	}
	
	public static function colorTo(sprite: Sprite, changes: Array<Float>, steps: Int, ?callback: Sprite->Void) {
		
		if (steps <= 0 || changes == null || changes.length <= 0) return;
		
		var color = sprite.components["color"];
		if (color == null) {
			color = createColorData();
			sprite.components.set("color", color);
		}
		
		color.startA = changes.length >= 1 ? changes[0] : 1;
		color.startR = changes.length >= 2 ? changes[1] : 1;
		color.startG = changes.length >= 3 ? changes[2] : 1;
		color.startB = changes.length >= 4 ? changes[3] : 1;
		
		color.deltaA = changes.length >= 5 ? changes[4] : 0;
		color.deltaR = changes.length >= 6 ? changes[5] : 0;
		color.deltaG = changes.length >= 7 ? changes[6] : 0;
		color.deltaB = changes.length >= 8 ? changes[7] : 0;
		
		color.steps = steps;
		color.callback = callback;
		
		color.state = 1;
	}
	
	public static function spriteFadeIn(sprite: Sprite, steps: Int, ?callback: Sprite->Void) {
		colorTo(sprite, [0, 1, 1, 1, 1.0 / steps], steps, callback);
	}
	
	public static function spriteFadeOut(sprite: Sprite, steps: Int, ?callback: Sprite->Void) {
		colorTo(sprite, [1, 1, 1, 1, 0 - 1.0 / steps], steps, callback);
	}
	
	public static function twinkle(sprite: Sprite, interval: Int, times: Int = -1, gradual: Bool = false, ?callback: Sprite->Void) {
		if (times == 0) {
			if (callback != null) callback(sprite);
			return;
		}
		var color = sprite.components["color"];
		if (color == null) {
			color = createColorData();
			sprite.components.set("color", color);
		}
		color.times = times;
		color.gradual = gradual;
		colorTo(sprite, gradual ? [1, 1, 1, 1, 0 - 1.0 / interval] : [1], interval, function(spr1) {
			colorTo(spr1, gradual ? [0, 1, 1, 1, 1.0 / interval] : [0], interval, function(spr2) {
				var color2 = spr2.components["color"];
				if (color2.times != 0) {
					if (color2.times > 0) color2.times = color2.times - 1;
					twinkle(spr2, interval, color2.times, color2.gradual, callback);
				}
			});
		});
	}
	public static function isTwinkling(sprite: Sprite): Bool {
		var color = sprite.components["color"];
		if (color == null) return false;
		return color.times != 0;
	}
	public static function stopTwinkling(sprite: Sprite): Void {
		var color = sprite.components["color"];
		if (color == null) return;
		if (color.times != 0) {
			color.times = 0;
			color.steps = 0;
			color.state = 0;
		}
	}
	
	
	public static function fadeIn(scene: Scene, steps: Int, ?callback: Scene->Void) {
		
		if (steps <= 0) return;
		
		var color = scene.components["color"];
		if (color == null) {
			color = createColorData();
			scene.components.set("color", color);
		}
		
		color.startA = 1;
		color.startR = 0;
		color.startG = 0;
		color.startB = 0;
		
		color.deltaA = 0 - 1.0/steps;
		color.deltaR = 0;
		color.deltaG = 0;
		color.deltaB = 0;
		
		color.steps = steps;
		color.callback = callback;
		
		color.state = 1;
	}
	
	public static function fadeOut(scene: Scene, steps: Int, ?callback: Scene->Void) {
		
		if (steps <= 0) return;
		
		var color = scene.components["color"];
		if (color == null) {
			color = createColorData();
			scene.components.set("color", color);
		}
		
		color.startA = 0;
		color.startR = 0;
		color.startG = 0;
		color.startB = 0;
		
		color.deltaA = 1.0/steps;
		color.deltaR = 0;
		color.deltaG = 0;
		color.deltaB = 0;
		
		color.steps = steps;
		color.callback = callback;
		
		color.state = 1;
	}

	public function new() {
		// ...
	}
	
	public function batched(): Bool {
		return false;
	}
	
	public function bind(game:Game, scene:Scene):Void {
		if (scene == null) {
			// reset fade state when scene is closed
			var color = game.scene.components["color"];
			if (color != null) {
				color.state = 0;
				color.steps = 0;
				color.times = 0;
			}
		}
	}
	
	public function include(sprite:Sprite):Void {
		
	}
	
	public function exclude(sprite:Sprite):Void {
		
	}
	
	public function begin(scene:Scene):Void {
		
	}
	
	public function update(sprite:Sprite):Void {
		
		if (sprite.scene.isPaused()) return;
		
		var color = sprite.components["color"];
		if (color == null) return;
		
		if (color.state == 0) return;
		if (color.state == 1 && color.steps > 0) {
			
			var display = sprite.components["display"];
			if (display == null) return;
			
			color.state = 2;
			
			if (color.state == 2) color.current = 0;
		
		}
		if (color.state == 2 && color.steps > 0) {
			
			if (color.current < color.steps) {
			
				var display = sprite.components["display"];
				if (display == null) return;
				
				display.red = color.startR + color.deltaR * color.current;
				display.green = color.startG + color.deltaG * color.current;
				display.blue = color.startB + color.deltaB * color.current;
				display.alpha = color.startA + color.deltaA * color.current;
				
				color.current += 1;
				
			} else {
				
				var display = sprite.components["display"];
				if (display != null) {
					display.red = 1;
					display.green = 1;
					display.blue = 1;
					display.alpha = 1;
				}
				color.state = 3;
			}
			
		}
		if (color.state == 3) {
			
			color.state = 0;
			
			var callback: Sprite-> Void = cast color.callback;
			var needCallback: Bool = callback != null;
			if (needCallback) callback(sprite);
			else sprite.addEvent("onColorDone");
			
			if (color.state == 0) color.callback = null;
		}
	}
	
	public function end(scene: Scene):Void {
		
		var color = scene.components["color"];
		if (color == null) return;
		
		if (color.state == 0) return;
		if (color.state == 1 && color.steps > 0) {
			color.state = 2;
			if (color.state == 2) color.current = 0;
		}
		if (color.state == 2 && color.steps > 0) {
			
			if (color.current < color.steps) {
				
				var red = color.startR + color.deltaR * color.current;
				var green = color.startG + color.deltaG * color.current;
				var blue = color.startB + color.deltaB * color.current;
				var alpha = color.startA + color.deltaA * color.current;
				
				color.current += 1;
				
				Display.drawRect(scene.game.width, scene.game.height, 0, 0, 8000, red, green, blue, alpha);
				
			} else {
				color.state = 3;
			}
		}
		if (color.state == 3) {
			
			if (color.deltaA <= 0) { // if fade in ...
				
				color.state = 0;
				
				if (color.steps > 0) {
					color.steps = 0;
					scene.script.call("onOpen");
					var sprs = scene.filter( function(spr) { return spr.enabled; } );
					for (spr in sprs) spr.script.call("onSceneOpen");
				}
				
			} else { // if fade out ...
				
				if (color.steps > 0) {
					color.steps = 0;
					var sprs = scene.filter( function(spr) { return spr.enabled; } );
					for (spr in sprs) spr.script.call("onSceneClose");
					scene.script.call("onClose");
				}
				
				var red = color.startR + color.deltaR * color.current;
				var green = color.startG + color.deltaG * color.current;
				var blue = color.startB + color.deltaB * color.current;
				var alpha = color.startA + color.deltaA * color.current;
				
				Display.drawRect(scene.game.width, scene.game.height, 0, 0, 8000, red, green, blue, alpha);
				
			}
			
			var callback: Scene-> Void = cast color.callback;
			if (callback != null) {
				callback(scene);
				color.callback = null;
			}
		}
	}
}
