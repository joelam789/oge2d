package oge2d.system;

import oge2d.core.Sprite;
import oge2d.core.Scene;
import oge2d.core.Game;

/**
 * ...
 * @author JoeLam
 */
class Timer implements Updater {

	public function new() {
		
	}
	
	public function batched(): Bool {
		return true;
	}
	
	public function bind(game:Game, scene:Scene):Void {
		
	}
	
	public function include(sprite:Sprite):Void {
		
	}
	
	public function exclude(sprite:Sprite):Void {
		
	}
	
	public function begin(scene:Scene):Void {
		
	}
	
	public function update(sprite:Sprite):Void {
		
	}
	
	public function end(scene:Scene):Void {
		if (scene.isPaused()) return;
		var timeupList: List<Dynamic> = new List<Dynamic>();
		for (timer in scene.timers) {
			if (scene.ticks - timer.start >= timer.time) timeupList.add(timer);
		}
		for (timer in timeupList) {
			scene.timers.remove(timer);
			if (timer.callback != null) timer.callback();
			else if (timer.sprite != null) timer.sprite.addEvent("onTimer");
		}
	}
	
}
