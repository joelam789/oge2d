package oge2d.system;

import oge2d.core.Sprite;
import oge2d.core.Scene;
import oge2d.core.Game;

/**
 * ...
 * @author JoeLam
 */
class Animation implements Updater {
	
	public static function reset(sprite:Sprite, ?action: String):Void {
		var animation = sprite.components["animation"];
		if (animation != null) { // reset frame state
			if (action != null) animation.action = action;
			animation.current = 0;
			animation.ticks = -1;
			animation.callback = null;
		}
	}
	
	public static function play(sprite:Sprite, ?loop: Bool, ?callback: Sprite->Void):Void {
		var animation = sprite.components["animation"];
		if (animation != null) {
			if (loop != null) animation.looping = loop;
			animation.callback = callback;
			animation.playing = true;
		}
	}
	
	public static function stop(sprite:Sprite): Void {
		var animation = sprite.components["animation"];
		if (animation != null) animation.playing = false;
	}

	public function new() {
		// ...
	}
	
	public function batched(): Bool {
		return false;
	}
	
	public function bind(game:Game, scene:Scene):Void {
		if (scene != null) {
			var sprs = scene.filter( function(spr) { return spr.enabled; } );
			for (spr in sprs) include(spr);
		}
	}
	
	public function include(sprite:Sprite):Void {
		Animation.reset(sprite);
	}
	
	public function exclude(sprite:Sprite):Void {
		
	}
	
	public function begin(scene:Scene):Void {
		
	}
	
	public function update(sprite:Sprite):Void {
		if (sprite.scene.isPaused()) return;
		var animation = sprite.components["animation"];
		if (animation == null) return;
		if (animation.playing == false) return;
		if (animation.ticks >= 0 && animation.interval > animation.ticks + sprite.game.interval) {
			animation.ticks += sprite.game.interval;
			return;
		}
		var display = sprite.components["display"];
		if (display == null) return;
		var rects: Array<Int> = cast Reflect.field(animation.frames, animation.action);
		if (rects == null || rects.length < 4) return;
		var total = rects.length / 4;
		var next = animation.current + 1;
		var finished = false;
		if (next >= total) {
			finished = true;
			if (animation.looping) next = 0;
			else next = animation.current;
		}
		var idx = Std.int(4 * next);
		display.offsetX = rects[idx];
		display.offsetY = rects[idx + 1];
		display.width = rects[idx + 2];
		display.height = rects[idx + 3];
		
		animation.current = next;
		animation.ticks = 0;
		
		if (finished && animation.looping == false) {
			animation.playing = false;
			if (animation.callback != null) {
				var callback = animation.callback;
				animation.callback = null;
				callback(sprite);
			} else {
				Event.addSpriteEvent(sprite, "onAnimationDone");
			}
		}
	}
	
	public function end(scene:Scene):Void {
		
	}
}
