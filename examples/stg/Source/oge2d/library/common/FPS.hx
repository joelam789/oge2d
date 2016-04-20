package oge2d.library.common;

import oge2d.core.Scene;
import oge2d.core.Sprite;

/**
 * ...
 * @author JoeLam
 */
class FPS {

	public function new() {
		
	}
	
	public function onSceneActive(sprite: Sprite) {
		var fps = sprite.get("fps");
		if (fps == null) return;
		fps.ticks = 0;
		fps.times = 0;
		fps.frames = 0;
	}
	
	public function onUpdate(sprite: Sprite) {
		var fps = sprite.get("fps");
		if (fps == null) return;
		fps.ticks += sprite.game.interval;
		fps.times += 1;
		if (fps.ticks >= 1000) {
			fps.frames = fps.times;
			fps.times = 0;
			fps.ticks = 0;
		}
		var text = sprite.get("text");
		if (text != null) {
			text.content = Std.string(fps.frames);
		}
	}
}
