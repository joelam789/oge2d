package example.stg.battle;

import oge2d.core.Sprite;

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
