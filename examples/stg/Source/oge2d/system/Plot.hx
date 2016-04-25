package oge2d.system;

import oge2d.core.Game;
import oge2d.core.Scene;
import oge2d.core.Sprite;

import oge2d.library.common.Media;

/**
 * ...
 * @author JoeLam
 */
class Plot implements Updater {
	
	private var _plot: Sprite = null;
	
	public function wait(time: Int): Void {
		var plot: Sprite = _plot;
		if (plot == null) return;
		Timer.addTimer(plot.scene, time, function() {
			plot.script.resume("onPlot");
		});
		plot.script.suspend();
	}
	
	public function moveTo(sprite: Sprite, x: Float, y: Float, speed: Int): Void {
		var plot: Sprite = _plot;
		if (plot == null) return;
		Motion.moveTo(sprite, x, y, speed, function(_) {
			plot.script.resume("onPlot");
		});
		plot.script.suspend();
	}
	
	public function spriteFadeIn(sprite: Sprite, steps: Float): Void {
		var plot: Sprite = _plot;
		if (plot == null) return;
		Color.spriteFadeIn(sprite, Std.int(steps), function(_) {
			plot.script.resume("onPlot");
		});
		plot.script.suspend();
	}
	
	public function musicFadeOut(musicName: String, time: Float): Void {
		var plot: Sprite = _plot;
		if (plot == null) return;
		Media.musicFadeOut(plot.scene, musicName, time, function(_) {
			plot.script.resume("onPlot");
		});
		plot.script.suspend();
	}
	
	public function waitForViewPos(posX: Float, posY: Float): Void {
		var plot: Sprite = _plot;
		if (plot == null) return;
		Stage.wait(plot.scene, posX, posY, function(_) {
			plot.script.resume("onPlot");
		});
		plot.script.suspend();
	}
	
	public function enable(?sprite: Sprite): Void {
		Plot.setEnabled((sprite != null ? sprite : _plot), true);
	}
	public function disable(?sprite: Sprite): Void {
		Plot.setEnabled((sprite != null ? sprite : _plot), false);
	}
	public function nextScene(game: Game, sceneName: String, 
							fadeOutSteps: Int = 0, fadeInSteps: Int = 0): Void {
		Plot.callScene(game, sceneName, fadeOutSteps, fadeInSteps);
	}
	
	public static function setEnabled(sprite: Sprite, value: Bool): Void {
		if (sprite == null) return;
		var plot = sprite.components["plot"];
		if (plot == null) return;
		plot.enabled = value;
	}
	
	public static function callScene(game: Game, sceneName: String, 
									fadeOutSteps: Int = 0, fadeInSteps: Int = 0, 
									?callback: Scene->Void): Void {
		if (game.scene != null && fadeOutSteps > 0) {
			Color.fadeOut(game.scene, fadeOutSteps, function(_) {
				game.loadScene(sceneName, function(nextScene) {
					if (nextScene == null) return;
					if (game.scene == nextScene) return;
					game.setActiveScene(sceneName);
					if (fadeInSteps > 0) Color.fadeIn(nextScene, fadeInSteps, callback);
				});
			});
		} else {
			game.loadScene(sceneName, function(nextScene) {
				if (nextScene == null) return;
				if (game.scene == nextScene) return;
				game.setActiveScene(sceneName);
				if (fadeInSteps > 0) Color.fadeIn(nextScene, fadeInSteps, callback);
			});
		}
	}

	public function new() {
		
	}
	
	public function batched(): Bool {
		return false;
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
		if (sprite.scene.isPaused()) return;
		var plot = sprite.components["plot"];
		if (plot == null || plot.enabled == false) return;
		if (sprite.script.methods != null && sprite.script.methods.exists("onPlot")) {
			_plot = sprite;
			sprite.script.call("onPlot", [this]);
		}
	}
	
	public function end(scene:Scene):Void {
		
	}
	
}
