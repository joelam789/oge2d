package example.stg.battle;

import oge2d.core.Sprite;

import oge2d.system.Pool;
import oge2d.system.Plot;
import oge2d.system.Color;
import oge2d.system.Display;
import oge2d.system.Animation;

/**
 * ...
 * @author JoeLam
 */
class PlayerSprite {

	public function new() {
		
	}
	
	public function onSceneOpen(sprite: Sprite) {
		trace(sprite.name + " - onSceneOpen");
	}
	
	public function onCollide(spriteA: Sprite, spriteB: Sprite) {
		
		if (Color.isTwinkling(spriteA)) return; // in bulletproof state ...
		
		var pool = spriteB.get("pool");
		if (pool == null) return;
		
		var hitter: String = cast pool.name;
		
		if (hitter.indexOf("enemy") < 0 
			&& hitter.indexOf("boss") < 0
			&& hitter.indexOf("bomb") < 0) return;
		
		var scene = spriteA.scene;
		var player = scene.get("player");
		
		if (hitter.indexOf("bullet") >= 0) {
			spriteB.disable();
			player.hp = player.hp - 10;
		} else if (hitter.indexOf("boss") >= 0) {
			player.hp = 0; // stay safe, don't try this ...
		} else {
			player.hp = player.hp - 20;
		}
		
		if (player.hp > 0) {
			Color.colorTo(spriteA, [1, 1, 0.5, 0.5], 10);
		} else {
			spriteA.enabled = false;
			var boom = Pool.getFreeSprite("big-boom");
			if (boom != null) {
				boom.enabled = true;
				var display = Display.getDisplay(spriteA);
				Display.setPosition(boom, display.posX, display.posY);
				Animation.reset(boom);
				Animation.play(boom, false, function(spr) {
					spr.enabled = false;
					Plot.setEnabled(scene.spr("reborn"), true);
				});
				spriteA.game.sound("boom2").play();
			}
		}
	}
}
