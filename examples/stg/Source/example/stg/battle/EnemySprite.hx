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
class EnemySprite {

	public function new() {
		
	}
	
	public function onActive(sprite: Sprite) {
		var enemy = sprite.get("enemy");
		enemy.hp = enemy.maxhp;
	}
	
	public function onCollide(spriteA: Sprite, spriteB: Sprite) {
		if (!spriteA.enabled || !spriteB.enabled) return;
		
		var pool = spriteB.get("pool");
		var poolName: String = pool == null ? "" : cast pool.name;
		
		if (poolName.indexOf("boss") >= 0) return;
		if (poolName.indexOf("bomb") >= 0) return;
		if (poolName.indexOf("enemy") >= 0) return;
		if (poolName.indexOf("friend") >= 0) return;
		
		if (poolName.indexOf("bullet") >= 0) spriteB.enabled = false;
		
		var display = Display.getDisplay(spriteA);
		if (display.posY - display.height / 2 <= 0) return; // skip if not enter screen
		
		if (Color.isTwinkling(spriteB)) return;
		
		var enemy = spriteA.get("enemy");
		enemy.hp = enemy.hp - 10;
		
		if (enemy.hp > 0) {
			Color.colorTo(spriteA, [1, 1, 0.5, 0.5], 10);
			spriteA.game.sound("hit").play();
		} else {
			var player = spriteA.scene.get("player");
			player.score = player.score + enemy.value;
			spriteA.enabled = false;
			var boom = Pool.getFreeSprite(enemy.maxhp >= 500 ? "boss-boom" 
								: (enemy.maxhp >= 100 ? "big-boom" : "small-boom"));
			if (boom != null) {
				boom.enabled = true;
				var display = Display.getDisplay(spriteA);
				Display.setPosition(boom, display.posX, display.posY);
				Animation.reset(boom);
				Animation.play(boom, false, function(spr) {
					spr.enabled = false;
				});
				spriteA.game.sound(enemy.maxhp >= 100 ? "boom2" : "boom1").play();
				if (spriteA.get("pool").name == "bomb") {
					BattleScene.sendBombBullet(spriteA.scene, spriteA, 2);
				} else if (spriteA.get("pool").name == "boss") {
					if (Pool.getFreeCount("boss") >= 3) {
						player.progress = 1;
						Plot.setEnabled(spriteA.scene.spr("gameover"), true);
					}
				}
			}
		}
		
	}
	
}
