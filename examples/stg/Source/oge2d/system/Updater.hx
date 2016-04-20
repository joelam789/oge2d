package oge2d.system;

import oge2d.core.Game;
import oge2d.core.Scene;
import oge2d.core.Sprite;

/**
 * @author JoeLam
 */
interface Updater {
	
	public function bind(game: Game, scene: Scene): Void;
	
	public function include(sprite: Sprite): Void;
	public function exclude(sprite: Sprite): Void;
	
	public function begin(scene: Scene): Void;
	public function update(sprite: Sprite): Void;
	public function end(scene: Scene): Void;
	
	public function batched(): Bool;
}
