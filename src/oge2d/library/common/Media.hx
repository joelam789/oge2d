package oge2d.library.common;

import oge2d.core.Game;
import oge2d.core.Scene;

import oge2d.system.Timer;

import oge2d.driver.MusicSource;
import oge2d.driver.SoundSource;

/**
 * ...
 * @author ...
 */
class Media {
	
	public static function turnDownMusic(scene: Scene, music: MusicSource, delta: Float, interval: Int, ?callback: Scene->Void) {
		if (music.volume <= 0) {
			music.stop();
			if (callback != null) callback(scene);
		} else {
			music.volume = music.volume - delta;
			Timer.addTimer(scene, interval, function() {
				turnDownMusic(scene, music, delta, interval, callback);
			});
		}
	}
	
	public static function musicFadeOut(scene: Scene, musicName: String, time: Float, ?updateInterval: Int, ?callback: Scene-> Void) {
		var music: MusicSource = scene.game.getMusic(musicName);
		var interval: Int = updateInterval == null ? 100 : updateInterval;
		var delta: Float = music != null && time != 0 ? music.volume / time * interval : 0;
		if (delta <= 0 || delta >= 1) {
			if (delta >= 1) music.stop();
			if (callback != null) callback(scene);
		} else {
			turnDownMusic(scene, music, delta, interval, callback);
		}
	}
	

	public function new() {
		
	}
	
}
