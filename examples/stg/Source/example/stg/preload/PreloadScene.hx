package example.stg.preload;

import oge2d.core.Scene;
import oge2d.core.Sprite;

import oge2d.system.Text;
import oge2d.system.Display;

/**
 * ...
 * @author JoeLam
 */
class PreloadScene {

	public function new() {
		
	}
	
	public function onActive(scene: Scene) {
		
		var packNames = ["assets1", "assets2"];
		scene.game.loadPacks(packNames, packNames.length, function(progress) {
			var percentage: Float = Math.round(progress * 10000.0) / 100.0;
			Text.setText(scene.spr("progress1"), "Loading packages ... " + percentage + "%");
			scene.spr("bar1").get("display").width = 400 * percentage / 100.0;
			scene.update([scene.systems["display"]]);
		},
		function() {
			trace("loaded all packages");
			var sceneNames = ["menu", "battle"];
			scene.game.loadScenes(sceneNames, sceneNames.length, function(progress) {
				var percentage = Math.round(progress * 10000.0) / 100.0;
				Text.setText(scene.spr("progress1"), "Loading scenes ... " + percentage + "%");
				scene.spr("bar1").get("display").width = 400 * percentage / 100.0;
				scene.update([scene.systems["display"]]);
			},
			function() {
				trace("loaded all scenes");
				scene.game.setActiveScene("menu");
			});
		});
	}
	
}
