package oge2d.system;

import oge2d.core.Sprite;
import oge2d.core.Scene;
import oge2d.core.Game;
import oge2d.system.Tilemap.Tile;

import oge2d.driver.Asset;
import oge2d.driver.Texture;
import oge2d.driver.Renderer;
import oge2d.driver.DisplayBuffer;


typedef Tile = {
	var id: Int;
	var offsetX: Array<Int>;
	var offsetY: Array<Int>;
	var interval: Int;
}

typedef Cell = {
	var tilesets: Array<Int>;
	var tiles: Array<Int>;
	var value: Int;
}

class Tileset {
	public var name: String = "";
	public var tileWidth: Int = 0;
	public var tileHeight: Int = 0;
	public var imageWidth: Float = 0;
	public var imageHeight: Float = 0;
	public var tiles: Array<Tile> = new Array<Tile>();
	public var buffer: DisplayBuffer = null;
	public function new() { };
}

/**
 * ...
 * @author JoeLam
 */
class Tilemap implements Updater {
	
	static var _tilesets: Map<String, Tileset> = null;
	
	public static var tilesets: Array<Tileset> = new Array<Tileset>();
	
	public static var name: String = "";
	public static var tileWidth: Int = 0;
	public static var tileHeight: Int = 0;
	public static var columnCount: Int = 0;
	public static var rowCount: Int = 0;
	
	public static var cells: Array<Cell> = new Array<Cell>();
	
	
	public static function loadTileset(game: Game, tilesetName: String): Tileset {
		
		if (_tilesets.exists(tilesetName)) return _tilesets.get(tilesetName);
		
		var result: Tileset = null;
		
		var tilesetJson = Asset.getJsonData(game.getJsonFilePath(tilesetName, "tileset"));
		
		if (tilesetJson != null) {
			var tex: Texture = Asset.getTexture(game.getImageFilePath(tilesetJson.image));
			if (tex == null) trace("Failed to load texture: " + tilesetJson.image);
			else {
				result = new Tileset();
				result.buffer = Renderer.createDisplayBuffer(tex, 1);
				result.imageWidth = tex.width;
				result.imageHeight = tex.height;
				if (result.buffer == null) {
					trace("Failed to create display buffer for tileset: " + tilesetName);
					result = null;
				}
			}
		} else trace("Failed to load tileset: " + tilesetName);
		
		if (tilesetJson != null && result != null) {
			result.name = tilesetName;
			result.tileWidth = tilesetJson.tileWidth;
			result.tileHeight = tilesetJson.tileHeight;
			result.tiles = cast tilesetJson.tiles;
		}
		
		if (result != null) _tilesets.set(tilesetName, result);
		
		return result;
	}
	
	public static function loadTilemap(game: Game, tilemapName: String) {
		
		var tilemapJson = Asset.getJsonData(game.getJsonFilePath(tilemapName, "tilemap"));
		
		if (tilemapJson == null) {
			trace("Failed to load tilemap: " + tilemapName);
			return;
		}
		
		var tilesetList: Array<Tileset> = new Array<Tileset>();
		var tilesetNames: Array<String> = cast tilemapJson.tilesets;
		for (tilesetName in tilesetNames) {
			var tileset = loadTileset(game, tilesetName);
			if (tileset != null) tilesetList.push(tileset);
			else break;
		}
		if (tilesetList.length > 0 && tilesetList.length == tilemapJson.tilesets.length) {
			tilesets = tilesetList;
			name = tilemapName;
			tileWidth = tilemapJson.tileWidth;
			tileHeight = tilemapJson.tileHeight;
			columnCount = tilemapJson.columnCount;
			rowCount = tilemapJson.rowCount;
			cells = cast tilemapJson.cells;
		}
		
	}
	
	public static function drawCell(viewX: Int, viewY: Int, viewZ: Int, col: Int, row: Int) {
		
		var idx = row * columnCount + col;
		if (idx < 0 || idx >= cells.length) return;
		
		var cell = cells[idx];
		var layers = cell.tiles.length;
		
		var width:Float = tileWidth;
		var height:Float = tileHeight;
		
		var posX:Float = tileWidth * col - viewX;
		var posY:Float = tileHeight * row - viewY;
		
		// limit minimum z value
		var posZ:Float = viewZ + 1000.0;
		if (posZ < 1.0) posZ = 1.0;
		
		// in OpenGL/WebGL, normally, "zNear" <= "zFar", and "zNear" is in front of "zFar".
		// but here we hope that big z is in front of small z, just like z-index in CSS.
		posZ = 1.0 + 1.0 / posZ;

		for (i in 0...layers) {
			
			var tileset = tilesets[cell.tilesets[i]];
			var tile = tileset.tiles[cell.tiles[i]];
			
			var buffer = tileset.buffer;
			var texWidth: Float = tileset.imageWidth;
			var texHeight: Float = tileset.imageHeight;
			var offsetX:Float = tile.offsetX[0];
			var offsetY:Float = tile.offsetY[0];
			
			// bottom-left (0)
			Renderer.fillBuffer(buffer, 0, posX); // x
			Renderer.fillBuffer(buffer, 1, posY + height); // y
			Renderer.fillBuffer(buffer, 2, posZ); // z
			Renderer.fillBuffer(buffer, 3, offsetX/texWidth);  // u
			Renderer.fillBuffer(buffer, 4, (offsetY+height)/texHeight); // v
			Renderer.fillBuffer(buffer, 5, 1.0);
			Renderer.fillBuffer(buffer, 6, 1.0);
			Renderer.fillBuffer(buffer, 7, 1.0);
			Renderer.fillBuffer(buffer, 8, 1.0);
			
			// top-left (1)
			Renderer.fillBuffer(buffer, 9, posX);
			Renderer.fillBuffer(buffer, 10, posY);
			Renderer.fillBuffer(buffer, 11, posZ);
			Renderer.fillBuffer(buffer, 12, offsetX/texWidth);
			Renderer.fillBuffer(buffer, 13, offsetY/texHeight);
			Renderer.fillBuffer(buffer, 14, 1.0);
			Renderer.fillBuffer(buffer, 15, 1.0);
			Renderer.fillBuffer(buffer, 16, 1.0);
			Renderer.fillBuffer(buffer, 17, 1.0);
			
			// top-right (2)
			Renderer.fillBuffer(buffer, 18, posX + width);
			Renderer.fillBuffer(buffer, 19, posY);
			Renderer.fillBuffer(buffer, 20, posZ);
			Renderer.fillBuffer(buffer, 21, (offsetX+width)/texWidth);
			Renderer.fillBuffer(buffer, 22, offsetY/texHeight);
			Renderer.fillBuffer(buffer, 23, 1.0);
			Renderer.fillBuffer(buffer, 24, 1.0);
			Renderer.fillBuffer(buffer, 25, 1.0);
			Renderer.fillBuffer(buffer, 26, 1.0);
			
			// bottom-right (3)
			Renderer.fillBuffer(buffer, 27, posX + width);
			Renderer.fillBuffer(buffer, 28, posY + height);
			Renderer.fillBuffer(buffer, 29, posZ);
			Renderer.fillBuffer(buffer, 30, (offsetX+width)/texWidth);
			Renderer.fillBuffer(buffer, 31, (offsetY+height)/texHeight);
			Renderer.fillBuffer(buffer, 32, 1.0);
			Renderer.fillBuffer(buffer, 33, 1.0);
			Renderer.fillBuffer(buffer, 34, 1.0);
			Renderer.fillBuffer(buffer, 35, 1.0);
			
			Renderer.draw(buffer);
		}
	}
	
	public static function drawTilemap(scene: Scene, viewX: Int, viewY: Int, viewZ: Int) {
		var gapX: Int = viewX % tileWidth;
		var gapY: Int = viewY % tileHeight;
		var col: Int = Std.int((viewX - gapX) / tileWidth);
		var row: Int = Std.int((viewY - gapY) / tileHeight);
		var startX: Int = col * tileWidth;
		var startY: Int = row * tileHeight;
		var endX = viewX + scene.game.width;
		var endY = viewY + scene.game.height;
		
		while (startY < endY) {
			var currentX: Int = startX;
			var column = col;
			while (currentX < endX) {
				drawCell(viewX, viewY, viewZ, column, row);
				column++;
				currentX += tileWidth;
			}
			row++;
			startY += tileHeight;
		}
	}

	public function new() {
		if (_tilesets == null) _tilesets = new Map<String, Tileset>();
	}
	
	
	/* INTERFACE oge2d.system.Updater */
	
	public function bind(game:Game, scene:Scene):Void {
		
	}
	
	public function include(sprite:Sprite):Void {
		if (sprite != null && sprite.enabled) {
			var display = sprite.components["display"];
			display.visible = true;
			display.anchorX = 0.0;
			display.anchorY = 0.0;
		}
	}
	
	public function exclude(sprite:Sprite):Void {
		
	}
	
	public function begin(scene:Scene):Void {
		
	}
	
	public function update(sprite:Sprite):Void {
		
		var stage = sprite.scene.components["stage"];
		if (stage == null) return;
		
		var display = sprite.components["display"];
		if (display == null) return;
		
		if (sprite != null && sprite.enabled) {
			drawTilemap(sprite.scene, Std.int(stage.viewX), Std.int(stage.viewY), Std.int(display.posZ));
		}
		
	}
	
	public function end(scene:Scene):Void {
		
	}
	
	public function batched():Bool {
		return true;
	}
	
}
