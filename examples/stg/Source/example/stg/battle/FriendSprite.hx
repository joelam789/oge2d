package example.stg.battle;

import oge2d.core.Scene;
import oge2d.core.Sprite;

import oge2d.driver.Mouse;
import oge2d.driver.Keyboard;

import oge2d.system.Pool;
import oge2d.system.Plot;
import oge2d.system.Stage;
import oge2d.system.Color;
import oge2d.system.Motion;
import oge2d.system.Display;
import oge2d.system.Animation;

/**
 * ...
 * @author JoeLam
 */
class FriendSprite {

	public function new() {
		
	}
	
	public function onCollide(spriteA: Sprite, spriteB: Sprite) {
		var pool = spriteB.get("pool");
		var poolName: String = pool == null ? "" : cast pool.name;
		
		if (poolName.indexOf("enemy") >= 0 && poolName.indexOf("bullet") >= 0) {
			spriteB.enabled = false;
		}
	}
	
}
