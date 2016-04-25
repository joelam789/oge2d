package example.stg.battle;

import oge2d.core.Scene;
import oge2d.core.Sprite;

import oge2d.driver.Mouse;
import oge2d.driver.Keyboard;

import oge2d.system.Text;
import oge2d.system.Pool;
import oge2d.system.Plot;
import oge2d.system.Timer;
import oge2d.system.Stage;
import oge2d.system.Color;
import oge2d.system.Motion;
import oge2d.system.Display;
import oge2d.system.Animation;

/**
 * ...
 * @author JoeLam
 */
class BattleScene {
	
	public static function sendEnemyBullet(scene: Scene, posX: Float, posY: Float, speed: Int) {
		var display = scene.spr("player1").get("display");
		var angle = Motion.getMotionAngle(posX, posY, display.posX, display.posY);
		var bullet = Pool.getFreeSprite("enemy-bullet");
		if (bullet != null) {
			bullet.enabled = true;
			Display.setPosition(bullet, posX + 4 * (angle > 270 ? 1 : -1), posY + 8);
			Motion.moveOutside(bullet, speed, angle, -8, -8, 640 + 8, 480 + 8, function(_) {
				bullet.enabled = false;
			});
		}
	}
	
	public static function sendBossBomb(scene: Scene, boss: Sprite, speed: Int) {
		if (!boss.enabled) return;
		var display = scene.spr("player1").get("display");
		var posX: Float = cast boss.get("display").posX;
		var posY: Float = cast boss.get("display").posY;
		var angle = Motion.getMotionAngle(posX, posY + 20, display.posX, display.posY);
		var bomb = Pool.getFreeSprite("bomb");
		if (bomb != null) {
			bomb.enabled = true;
			Display.setPosition(bomb, posX + 10 * (angle > 270 ? 1 : -1), posY + 20);
			Motion.moveOutside(bomb, speed, angle, -8, -8, 640 + 8, 480 + 8, function(_) {
				bomb.enabled = false;
			});
			Timer.addTimer(scene, 1000 + 1000 * (Std.int(Math.random() * 100) % 4), function() {
				Color.colorTo(bomb, [1, 1, 0.5, 0.5], 60, function(spr) {
					if (!spr.enabled) return;
					spr.enabled = false;
					sendBombBullet(scene, spr, 2);
				});
			});
		}
		Timer.addTimer(scene, 2000 + 1000 * (Std.int(Math.random() * 100) % 4), function() {
			sendBossBomb(scene, boss, speed);
		});
	}
	
	public static function sendBombBullet(scene: Scene, bomb: Sprite, speed: Int) {
		var display = bomb.get("display");
		var posX: Float = cast display.posX;
		var posY: Float = cast display.posY;
		for(i in 0...8) {
			var bullet = Pool.getFreeSprite("enemy-bullet");
			if (bullet != null) {
				bullet.enabled = true;
				Display.setPosition(bullet, posX, posY);
				var angle = 360 - 45 * i;
				Motion.moveOutside(bullet, speed, angle, -8, -8, 640 + 8, 480 + 8, function(spr) {
					spr.enabled = false;
				});
			} else break;
		}
	}
	
	public static function sendEnemyBullet4(scene: Scene, enemy: Sprite, speed: Int) {
		Timer.addTimer(scene, 2000, function() {
			if (!enemy.enabled) return;
			var display = enemy.get("stage");
			var posX: Float = cast display.posX;
			var posY: Float = cast display.posY;
			var direction: String = cast enemy.get("animation").action;
			for (i in 0...3) {
				Timer.addTimer(scene, 80 * (i + 1), function() {
					if (!enemy.enabled) return;
					var bullet = Pool.getFreeSprite("enemy-bullet2");
					if (bullet != null) {
						bullet.enabled = true;
						if (direction == "left") {
							Stage.setSpritePos(bullet, posX - 20, posY);
							Motion.moveTo(bullet, -20, posY, speed, function(spr) {
								spr.enabled = false;
							});
						} else if (direction == "right") {
							Stage.setSpritePos(bullet, posX + 20, posY);
							Motion.moveTo(bullet, 640+20, posY, speed, function(spr) {
								spr.enabled = false;
							});
						} else { // should be "down"
							Stage.setSpritePos(bullet, posX, posY + 20);
							Motion.moveTo(bullet, posX, Stage.getStageViewY(scene) + 480 + 240, speed, function(spr) {
								spr.enabled = false;
							});
						}
					}
				});
			}
			Timer.addTimer(scene, 2000, function() {
				sendEnemyBullet4(scene, enemy, speed);
			});
		});
	}
	
	public static function sendEnemyBullet5(scene: Scene, enemy: Sprite, speed: Int) {
		Timer.addTimer(scene, 1000, function() {
			if (!enemy.enabled) return;
			var display = enemy.get("display");
			var posX: Float = cast display.posX;
			var posY: Float = cast display.posY;
			for(i in 0...5) {
				var bullet = Pool.getFreeSprite("enemy-bullet");
				if (bullet != null) {
					bullet.enabled = true;
					Display.setPosition(bullet, posX, posY + 28);
					var angle = 360 - 30 * (i + 1);
					if (i == 0) angle = 360 - 45;
					else if (i == 1) angle = 360 - 65;
					else if (i == 3) angle = 360 - 115;
					else if (i == 4) angle = 360 - 135;
					Motion.moveOutside(bullet, speed, angle, -8, -8, 640 + 8, 480 + 8, function(spr) {
						spr.enabled = false;
					});
				} else break;
			}
			Timer.addTimer(scene, 1000, function() {
				sendEnemyBullet5(scene, enemy, speed);
			});
		});
	}
	
	public static function sendEnemy1(scene: Scene, posX: Float, posY: Float, speed: Int) {
		var pathData = scene.game.getJsonData("deepv", "path");
		if (pathData == null) return;
		var enemy = Pool.getFreeSprite("enemy1");
		if (enemy != null) {
			enemy.enabled = true;
			Animation.reset(enemy, "down");
			Animation.play(enemy, true);
			Motion.applyPath(enemy, posX, posY, speed, pathData.nodes, function(spr) {
				enemy.enabled = false;
			}, function(spr, index, nextx, nexty) {
				if (index == 1) {
					Animation.reset(spr, "up");
					Animation.play(spr, false);
				}
			});
			Timer.addTimer(scene, 500 + 500 * (Std.int(Math.random() * 100) % 4), function() {
				if (!enemy.enabled) return;
				var display = enemy.get("display");
				sendEnemyBullet(scene, display.posX, display.posY + 16, Std.int(Math.abs(speed) + 1));
			});
		}
	}
	
	public static function sendEnemy2(scene: Scene, posX: Float, posY: Float, speed: Int) {
		var pathData = scene.game.getJsonData("circle", "path");
		if (pathData == null) return;
		var enemy = Pool.getFreeSprite("enemy2");
		if (enemy != null) {
			enemy.enabled = true;
			Motion.applyPath(enemy, posX, posY, speed, pathData.nodes, function(spr) {
				enemy.enabled = false;
			}, function(spr, index, nextx, nexty) {
				var display = Display.getDisplay(spr);
				display.angle = Motion.getMotionAngle(display.posX, display.posY, nextx, nexty);
			});
		}
	}
	
	public static function tracePlayer(scene: Scene, enemy: Sprite, speed: Int) {
		var player = scene.spr("player1");
		var current = enemy.get("display");
		var target = player.get("display");
		var x1: Float = cast current.posX;
		var y1: Float = cast current.posY;
		var x2: Float = cast target.posX;
		var y2: Float = cast target.posY;
		current.angle = Motion.getMotionAngle(x1, y1, x2, y2);
		if (!player.enabled || Color.isTwinkling(player) 
			|| (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) <= 10000) {
			Motion.moveOutside(enemy, speed, current.angle, -32, -32, 640 + 32, 480 + 32, function(spr) {
				spr.enabled = false;
			});
		} else {
			Motion.moveTo(enemy, x2, y2, speed);
			Timer.addTimer(scene, 500, function() {
				if (!enemy.enabled) return;
				tracePlayer(scene, enemy, speed); // keep tracing ...
			});
		}
	}
	
	public static function sendEnemy3(scene: Scene, posX: Float, posY: Float, speed: Int) {
		var enemy = Pool.getFreeSprite("enemy3");
		if (enemy != null) {
			enemy.enabled = true;
			Display.setPosition(enemy, posX, posY);
			tracePlayer(scene, enemy, speed);
		}
	}
	
	public static function sendEnemy4(scene: Scene, posX: Float, posY: Float, direction: String) {
		var enemy = Pool.getFreeSprite("enemy4");
		if (enemy != null) {
			enemy.enabled = true;
			Animation.reset(enemy, direction);
			Stage.setSpritePos(enemy, Stage.getStageViewX(scene) + posX, Stage.getStageViewY(scene) + posY);
			Timer.addTimer(scene, 20000, function() {
				enemy.enabled = false; // take it back after 20 seconds
			});
			sendEnemyBullet4(scene, enemy, 4);
		}
	}
	
	public static function sendEnemy5(scene: Scene, posX: Float, posY: Float, speed: Int) {
		var pathData = scene.game.getJsonData("hill", "path");
		if (pathData == null) return;
		var enemy = Pool.getFreeSprite("enemy5");
		if (enemy != null) {
			enemy.enabled = true;
			Motion.applyPath(enemy, posX, posY, speed, pathData.nodes, function(self1) {
				if (!self1.enabled) return;
				Motion.applyPath(self1, posX, posY, 0 - speed, pathData.nodes, function(self2) {
					self2.enabled = false;
				});
			});
			sendEnemyBullet5(scene, enemy, 4);
		}
	}
	
	public static function sendEnemy6(scene: Scene) {
		var player = scene.spr("player1");
		var target = player.get("display");
		var posX: Float = cast target.posX;
		var posY: Float = cast target.posY;
		var targetX = posX + 32 - Math.round(Math.random() * 16) * (Math.random() > 0.5 ? 1 : -1);
		var enemy = Pool.getFreeSprite("enemy6");
		if (enemy != null) {
			enemy.enabled = true;
			Display.setPosition(enemy, targetX, -20);
			Motion.moveTo(enemy, targetX, 480 + 40, 2, function(spr) {
				spr.enabled = false;
			}, function(spr, index, total) {
				var motion = spr.get("motion");
				if (index % 64 == 0 && motion.speed < 32) {
					motion.speed = motion.speed * 2;
				}
			});
		}
	}
	
	public static function moveBoss(scene: Scene, boss: Sprite, speed: Int) {
		if (!boss.enabled) return;
		var pathData = scene.game.getJsonData("boss", "path");
		if (pathData == null) return;
		Motion.applyPath(boss, boss.get("display").posX, boss.get("display").posY, speed, pathData.nodes, function(spr) {
			moveBoss(scene, spr, 0 - speed);
		});
	}
	
	public static function sendBoss1(scene: Scene, posX: Float, posY: Float, speed: Int) {
		var enemy = Pool.getFreeSprite("boss");
		if (enemy != null) {
			enemy.enabled = true;
			Display.setPosition(enemy, posX, posY);
			if (posY < 0) {
				Motion.moveTo(enemy, posX, posY + 256, speed * 2, function(spr) {
					moveBoss(scene, spr, speed);
					if (spr.enabled) sendBossBomb(scene, spr, 1);
				});
            } else if (posX < 0) {
				Motion.moveTo(enemy, posX + 256, posY, speed * 2, function(spr) {
					moveBoss(scene, spr, speed);
					if (spr.enabled) sendBossBomb(scene, spr, 1);
				});
            } else if (posX > 0 && posY > 0) {
                Motion.moveTo(enemy, posX - 256, posY, speed * 2, function(spr) {
					moveBoss(scene, spr, speed);
					if (spr.enabled) sendBossBomb(scene, spr, 1);
				});
            } else {
				enemy.enabled = false;
			}
			
		}
	}

	public function new() {
		
	}
	
	public function onActive(scene: Scene) {
		scene.reset();
		Stage.loop(scene, false);
		Stage.setViewPos(scene, 0, 6688);
		Stage.scroll(scene, 0, -1);
		Plot.setEnabled(scene.spr("plot1"), true);
	}
	
	public function onInactive(scene: Scene) {
		scene.game.music("win").stop();
		scene.game.music("lose").stop();
		scene.game.music("boss").stop();
		scene.game.music("battle").stop();
	}
	
	
	
	public function onOpen(scene: Scene) {
		// ...
	}
	
	public function onKeyUp(scene: Scene, keyName: String) {
		
		if (keyName == "SPACE") {
			
			var profile = scene.get("player");
			if (profile != null) {
				var progress: Int = cast profile.progress;
				if (progress != 0) return;
			}
			
			if (scene.isPaused()) {
				var music = scene.game.music("battle");
				if (!music.isPaused()) music = scene.game.music("boss");
				scene.resume();
				music.resume();
				scene.spr("info1").disable();
			} else {
				var music = scene.game.music("battle");
				if (!music.isPlaying()) music = scene.game.music("boss");
				scene.pause();
				music.pause();
				scene.spr("info1").enable();
				Text.setText(scene.spr("info1"), "PAUSED");
				scene.game.sound("pause").play();
			}
		}
		
	}
	
	public function onUpdate(scene: Scene) {
		
		if (scene.isPaused()) return;
		var bombs: Float = 0;
		var controllable: Bool = false;
		var profile = scene.get("player");
		if (profile != null) {
			bombs = cast profile.bombs;
			controllable = cast profile.controllable;
			Text.setText(scene.spr("label1"), "x" + profile.lives);
			Text.setText(scene.spr("label2"), "x" + bombs);
			Text.setText(scene.spr("label3"), "Score: " + profile.score);
			scene.spr("bar1").get("display").width = 250 * profile.hp / 100;
		}
		
		var player = scene.spr("player1");
		if (player != null && player.enabled && controllable) {
			var speed = 4;
			var deltax = 0;
			var deltay = 0;
			if (Keyboard.isKeyDown("UP")) deltay -= speed;
			if (Keyboard.isKeyDown("DOWN")) deltay += speed;
			if (Keyboard.isKeyDown("LEFT")) deltax -= speed;
			if (Keyboard.isKeyDown("RIGHT")) deltax += speed;
			if (deltax != 0 || deltay != 0) {
				var bound = player.get("bound");
				if (bound.left + deltax > 0 && bound.right + deltax < scene.game.width
					&& bound.top + deltay > 0 && bound.bottom + deltay < scene.game.height - 25) {
					var display = player.get("display");
					Display.setPosition(player, display.posX + deltax, display.posY + deltay);
				}
			}
			if (Keyboard.isKeyDown("LEFT_CTRL")) {
				var interval = scene.ticks - Keyboard.getKeypressTime("LEFT_CTRL");
				if (interval >= 120) {
					var bullet = Pool.getFreeSprite("player-bullet");
					if (bullet != null) {
						var display = Display.getDisplay(player);
						Display.setPosition(bullet, display.posX, display.posY - 40);
						bullet.enabled = true;
						Motion.moveTo(bullet, display.posX, -40, 8, function(_) {
							bullet.enabled = false;
						});
						player.game.sound("shoot").play();
					}
					Keyboard.setKeypressTime("LEFT_CTRL", scene.ticks);
				}
			}
			if (Keyboard.isKeyDown("LEFT_SHIFT") && profile != null 
				&& bombs > 0 && Pool.getFreeCount("friend") >= 3) {
				profile.bombs = bombs - 1;
				var display = player.get("display");
				var posX: Float = display.posX - 80;
				var posY: Float = 640 + 48;
				for (i in 0...3) {
					var friend = Pool.getFreeSprite("friend");
					if (friend != null) {
						Display.setPosition(friend, posX, posY);
						friend.enabled = true;
						Motion.moveTo(friend, posX, display.posY - 48, 8, function(self1) {
							Timer.addTimer(scene, 8000, function() {
								Motion.moveTo(self1, self1.get("display").posX, -60, 8, function(self2) {
									self2.enabled = false;
								});
							});
						});
						posX += 80;
					} else break;
				}
			}
		}
		
	}
	
}
