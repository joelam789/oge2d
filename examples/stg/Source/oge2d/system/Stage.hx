package oge2d.system;

import oge2d.core.Sprite;
import oge2d.core.Scene;
import oge2d.core.Game;

import oge2d.driver.Mouse;

/**
 * ...
 * @author JoeLam
 */
class Stage implements Updater {
	
	public static function getSpritePos(sprite: Sprite): Dynamic {
		var stage = sprite.components["stage"];
		if (stage != null) return stage;
		var display = sprite.components["display"];
		if (display != null) return display;
		return null;
	}
	public static function setSpritePos(sprite: Sprite, x: Float, y: Float): Void {
		var display = sprite.components["stage"];
		if (display == null) display = sprite.components["display"];
		if (display != null) {
			display.posX = x;
			display.posY = y;
		}
	}
	public static function getStageViewX(scene: Scene): Float {
		var stage = scene.components["stage"];
		if (stage != null) return stage.viewX;
		return 0;
	}
	public static function getStageViewY(scene: Scene): Float {
		var stage = scene.components["stage"];
		if (stage != null) return stage.viewY;
		return 0;
	}
	public static function getMousePosX(scene: Scene): Float {
		var stage = scene.components["stage"];
		if (stage != null) return stage.viewX + Mouse.x;
		return Mouse.x;
	}
	public static function getMousePosY(scene: Scene): Float {
		var stage = scene.components["stage"];
		if (stage != null) return stage.viewY + Mouse.y;
		return Mouse.y;
	}
	public static function getViewBound(scene: Scene): Dynamic {
		var bound = {
			left: 0,
			top:  0,
			right: scene.game.width,
			bottom: scene.game.height
		};
		var stage = scene.components["stage"];
		if (stage != null) {
			bound.left += stage.viewX;
			bound.top += stage.viewY;
			bound.right += stage.viewX;
			bound.bottom += stage.viewY;
		}
		return bound;
	}
	public static function setViewPos(scene: Scene, posX: Float, posY: Float) {
		var stage = scene.components["stage"];
		if (stage == null) return;
		stage.viewX = posX;
		stage.viewY = posY;
	}
	public static function wait(scene: Scene, targetX: Float, targetY: Float, callback: Scene->Void) {
		var stage = scene.components["stage"];
		if (stage == null) return;
		stage.targetX = targetX;
		stage.targetY = targetY;
		stage.callback = callback;
	}
	public static function scroll(scene: Scene, speedX: Float, speedY: Float) {
		var stage = scene.components["stage"];
		if (stage == null) return;
		stage.speedX = speedX;
		stage.speedY = speedY;
	}
	public static function loop(scene: Scene, looping: Bool = true, 
								beginX: Float = 0, beginY: Float = 0, endX: Float = 0, endY: Float = 0) {
		var stage = scene.components["stage"];
		if (stage == null) return;
		stage.looping = looping;
		stage.beginX = beginX;
		stage.beginY = beginY;
		stage.endX = endX;
		stage.endY = endY;
	}
	public static function isLooping(scene: Scene): Bool {
		var stage = scene.components["stage"];
		return stage != null && stage.looping != null && stage.looping == true;
	}

	public function new() {
		// ...
	}
	
	public function batched(): Bool {
		return false;
	}
	
	public function bind(game:Game, scene:Scene):Void {
		if (scene == null) return;
		var stage = scene.components["stage"];
		if (stage == null) return;
		
		var tilemapName: String = stage.tilemap;
		if (tilemapName != null && tilemapName.length > 0) {
			var maxX:Float = 0;
			var maxY:Float = 0;
			Tilemap.loadTilemap(game, tilemapName);
			if (Tilemap.columnCount > 0 && Tilemap.tileWidth > 0) {
				maxX = Tilemap.columnCount * Tilemap.tileWidth - game.width;
			}
			if (Tilemap.rowCount > 0 && Tilemap.tileHeight > 0) {
				maxY = Tilemap.rowCount * Tilemap.tileHeight - game.height;
			}
			stage.maxX = maxX > 0 ? maxX : 0;
			stage.maxY = maxY > 0 ? maxY : 0;
			
		} else {
			var tiles: Array<Sprite> = new Array<Sprite>();
			var blockNames: Array<String> = cast stage.blocks;
			var offsetValues: Array<Float> = cast stage.offsets;
			var idx: Int = 0;
			var maxX:Float = 0;
			var maxY:Float = 0;
			for (blockName in blockNames) {
				var blockSprite = scene.sprites[blockName];
				var graph = blockSprite.components["graphic"];
				var display = blockSprite.components["display"];
				var offsetX = offsetValues[idx++] + graph.width - game.width;
				var offsetY = offsetValues[idx++] + graph.height - game.height;
				if (offsetX > maxX) maxX = offsetX;
				if (offsetY > maxY) maxY = offsetY;
				display.visible = true;
				display.anchorX = 0.0;
				display.anchorY = 0.0;
				display.posZ = -1;
				tiles.push(blockSprite);
			}
			stage.maxX = maxX > 0 ? maxX : 0;
			stage.maxY = maxY > 0 ? maxY : 0;
			stage.tiles = tiles;
		}
	}
	
	public function include(sprite:Sprite):Void {
		
	}
	public function exclude(sprite:Sprite):Void {
		
	}
	
	public function begin(scene:Scene):Void {
		if (scene.isPaused()) return;
		var stage = scene.components["stage"];
		if (stage == null) return;
		
		if (stage.callback != null) {
			if (stage.viewX == stage.targetX && stage.viewY == stage.targetY) {
				var callback: Scene-> Void = cast stage.callback;
				stage.callback = null;
				if (callback != null) {
					callback(scene);
					return;
				}
			}
		}
		
		if (stage.looping != null && stage.looping == true) {
			if (stage.viewX == stage.endX && stage.viewY == stage.endY) {
				stage.viewX = stage.beginX;
				stage.viewY = stage.beginY;
			}
		}
		
		stage.viewX += stage.speedX;
		stage.viewY += stage.speedY;
		if (stage.viewX < 0) stage.viewX = 0;
		if (stage.viewX > stage.maxX) stage.viewX = stage.maxX;
		if (stage.viewY < 0) stage.viewY = 0;
		if (stage.viewY > stage.maxY) stage.viewY = stage.maxY;
		
		var tilemapName: String = stage.tilemap;
		if (tilemapName == null || tilemapName.length <= 0) {
			var idx: Int = 0;
			var tiles: Array<Sprite> = cast stage.tiles;
			var offsets: Array<Float> = cast stage.offsets;
			for (tile in tiles) {
				var display = tile.components["display"];
				display.posX = 0 - stage.viewX + offsets[idx++];
				display.posY = 0 - stage.viewY + offsets[idx++];
			}
		}
	}
	
	public function update(sprite:Sprite):Void {
		if (sprite.scene.isPaused()) return;
		var stage = sprite.scene.components["stage"];
		if (stage == null) return;
		var location = sprite.components["stage"];
		if (location == null) return;
		var display = sprite.components["display"];
		if (display == null) return;
		display.posX = location.posX - stage.viewX;
		display.posY = location.posY - stage.viewY;
	}
	
	public function end(scene:Scene):Void {
		
	}
}
