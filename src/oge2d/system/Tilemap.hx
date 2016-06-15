package oge2d.system;

import oge2d.core.Sprite;
import oge2d.core.Scene;
import oge2d.core.Game;

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
	public var tiles: Array<Tile> = null;
	public var buffer: DisplayBuffer = null;
	public function new() { };
}

class TilemapData {
	
	public var name: String = "";
	
	public var tilesets: Array<Tileset> = null;
	public var indices: Array<Int> = null;
	
	public var tileWidth: Int = 0;
	public var tileHeight: Int = 0;
	public var columnCount: Int = 0;
	public var rowCount: Int = 0;
	
	public var cells: Array<Cell> = null;
	
	public function new() { };
}

/**
 * ...
 * @author JoeLam
 */
class Tilemap implements Updater {
	
	static var _tilesets: Map<String, Tileset> = null;
	static var _tilemaps: Map<String, TilemapData> = null;
	
	public static function loadTileset(game: Game, tilesetName: String): Tileset {
		
		if (_tilesets.exists(tilesetName)) return _tilesets.get(tilesetName);
		
		var tilesetJson = Asset.getJsonData(game.getJsonFilePath(tilesetName, "tileset"));
		
		if (tilesetJson == null) {
			trace("Failed to load tileset: " + tilesetName);
			return null;
		}
		
		var result: Tileset = null;
		
		var cellWidth: Int = tilesetJson.tileWidth;
		var cellHeight: Int = tilesetJson.tileHeight;
		
		var col: Int = game.width % cellWidth;
		if (col == 0) col = Std.int(game.width / cellWidth) + 1;
		else col = Std.int((game.width - col) / cellWidth) + 2;
		
		var row: Int = game.height % cellHeight;
		if (row == 0) row = Std.int(game.height / cellHeight) + 1;
		else row = Std.int((game.height - row) / cellHeight) + 2;
		
		var tex: Texture = Asset.getTexture(game.getImageFilePath(tilesetJson.image));
		if (tex == null) trace("Failed to load texture: " + tilesetJson.image);
		else {
			result = new Tileset();
			result.buffer = Renderer.createDisplayBuffer(tex, col * row);
			result.imageWidth = tex.width;
			result.imageHeight = tex.height;
			if (result.buffer == null) {
				trace("Failed to create display buffer for tileset: " + tilesetName);
				result = null;
			}
		}
		
		if (tilesetJson != null && result != null) {
			result.name = tilesetName;
			result.tileWidth = tilesetJson.tileWidth;
			result.tileHeight = tilesetJson.tileHeight;
			result.tiles = cast tilesetJson.tiles;
		}
		
		if (result != null) _tilesets.set(tilesetName, result);
		
		return result;
	}
	
	public static function loadTilemap(game: Game, tilemapName: String): TilemapData {
		
		if (_tilemaps.exists(tilemapName)) return _tilemaps.get(tilemapName);
		
		var tilemapJson = Asset.getJsonData(game.getJsonFilePath(tilemapName, "tilemap"));
		
		if (tilemapJson == null) {
			trace("Failed to load tilemap: " + tilemapName);
			return null;
		}
		
		var result: TilemapData = null;
		
		var tilesetList: Array<Tileset> = new Array<Tileset>();
		var indexList: Array<Int> = new Array<Int>();
		var tilesetNames: Array<String> = cast tilemapJson.tilesets;
		for (tilesetName in tilesetNames) {
			var tileset = loadTileset(game, tilesetName);
			if (tileset != null) {
				tilesetList.push(tileset);
				indexList.push(0);
			}
			else break;
		}
		if (tilesetList.length > 0 && tilesetList.length == tilemapJson.tilesets.length) {
			result = new TilemapData();
			result.tilesets = tilesetList;
			result.indices = indexList;
			result.name = tilemapName;
			result.tileWidth = tilemapJson.tileWidth;
			result.tileHeight = tilemapJson.tileHeight;
			result.columnCount = tilemapJson.columnCount;
			result.rowCount = tilemapJson.rowCount;
			result.cells = cast tilemapJson.cells;
		}
		
		if (result != null) _tilemaps.set(tilemapName, result);
		
		return result;
	}
	
	public static function drawCell(tilemap: TilemapData, viewX: Int, viewY: Int, viewZ: Int, col: Int, row: Int) {
		
		var idx = row * tilemap.columnCount + col;
		if (idx < 0 || idx >= tilemap.cells.length) return;
		
		var cell = tilemap.cells[idx];
		var layers = cell.tiles.length;
		
		var width:Float = tilemap.tileWidth;
		var height:Float = tilemap.tileHeight;
		
		var posX:Float = tilemap.tileWidth * col - viewX;
		var posY:Float = tilemap.tileHeight * row - viewY;
		
		// limit minimum z value
		var posZ:Float = viewZ + 1000.0;
		if (posZ < 1.0) posZ = 1.0;
		
		// in OpenGL/WebGL, normally, "zNear" <= "zFar", and "zNear" is in front of "zFar".
		// but here we hope that big z is in front of small z, just like z-index in CSS.
		posZ = 1.0 + 1.0 / posZ;

		for (i in 0...layers) {
			
			var tileset = tilemap.tilesets[cell.tilesets[i]];
			var tile = tileset.tiles[cell.tiles[i]];
			
			var idx: Int = tilemap.indices[cell.tilesets[i]];
			
			var buffer = tileset.buffer;
			var texWidth: Float = tileset.imageWidth;
			var texHeight: Float = tileset.imageHeight;
			var offsetX:Float = tile.offsetX[0];
			var offsetY:Float = tile.offsetY[0];
			
			// bottom-left (0)
			Renderer.fillBuffer(buffer, idx++, posX); // x
			Renderer.fillBuffer(buffer, idx++, posY + height); // y
			Renderer.fillBuffer(buffer, idx++, posZ); // z
			Renderer.fillBuffer(buffer, idx++, offsetX/texWidth);  // u
			Renderer.fillBuffer(buffer, idx++, (offsetY+height)/texHeight); // v
			Renderer.fillBuffer(buffer, idx++, 1.0);
			Renderer.fillBuffer(buffer, idx++, 1.0);
			Renderer.fillBuffer(buffer, idx++, 1.0);
			Renderer.fillBuffer(buffer, idx++, 1.0);
			
			// top-left (1)
			Renderer.fillBuffer(buffer, idx++, posX);
			Renderer.fillBuffer(buffer, idx++, posY);
			Renderer.fillBuffer(buffer, idx++, posZ);
			Renderer.fillBuffer(buffer, idx++, offsetX/texWidth);
			Renderer.fillBuffer(buffer, idx++, offsetY/texHeight);
			Renderer.fillBuffer(buffer, idx++, 1.0);
			Renderer.fillBuffer(buffer, idx++, 1.0);
			Renderer.fillBuffer(buffer, idx++, 1.0);
			Renderer.fillBuffer(buffer, idx++, 1.0);
			
			// top-right (2)
			Renderer.fillBuffer(buffer, idx++, posX + width);
			Renderer.fillBuffer(buffer, idx++, posY);
			Renderer.fillBuffer(buffer, idx++, posZ);
			Renderer.fillBuffer(buffer, idx++, (offsetX+width)/texWidth);
			Renderer.fillBuffer(buffer, idx++, offsetY/texHeight);
			Renderer.fillBuffer(buffer, idx++, 1.0);
			Renderer.fillBuffer(buffer, idx++, 1.0);
			Renderer.fillBuffer(buffer, idx++, 1.0);
			Renderer.fillBuffer(buffer, idx++, 1.0);
			
			// bottom-right (3)
			Renderer.fillBuffer(buffer, idx++, posX + width);
			Renderer.fillBuffer(buffer, idx++, posY + height);
			Renderer.fillBuffer(buffer, idx++, posZ);
			Renderer.fillBuffer(buffer, idx++, (offsetX+width)/texWidth);
			Renderer.fillBuffer(buffer, idx++, (offsetY+height)/texHeight);
			Renderer.fillBuffer(buffer, idx++, 1.0);
			Renderer.fillBuffer(buffer, idx++, 1.0);
			Renderer.fillBuffer(buffer, idx++, 1.0);
			Renderer.fillBuffer(buffer, idx++, 1.0);
			
			//Renderer.draw(buffer);
			tilemap.indices[cell.tilesets[i]] = idx;
		}
	}
	
	public static function drawTilemap(tilemapName: String, scene: Scene, viewX: Int, viewY: Int, viewZ: Int) {
		
		var tilemap: TilemapData = _tilemaps.get(tilemapName);
		if (tilemap == null) return;
		
		var gapX: Int = viewX % tilemap.tileWidth;
		var gapY: Int = viewY % tilemap.tileHeight;
		var col: Int = Std.int((viewX - gapX) / tilemap.tileWidth);
		var row: Int = Std.int((viewY - gapY) / tilemap.tileHeight);
		var startX: Int = col * tilemap.tileWidth;
		var startY: Int = row * tilemap.tileHeight;
		var endX = viewX + scene.game.width;
		var endY = viewY + scene.game.height;
		
		for (i in 0...tilemap.indices.length) tilemap.indices[i] = 0;
		
		while (startY < endY) {
			var currentX: Int = startX;
			var column = col;
			while (currentX < endX) {
				drawCell(tilemap, viewX, viewY, viewZ, column, row);
				column++;
				currentX += tilemap.tileWidth;
			}
			row++;
			startY += tilemap.tileHeight;
		}
		
		for (i in 0...tilemap.indices.length) {
			var idx = tilemap.indices[i];
			if (idx > 0) {
				var buffer = tilemap.tilesets[i].buffer;
				var lastIdx = buffer.count * 36;
				while (idx + 9 <= lastIdx) {
					Renderer.fillBuffer(buffer, idx + 9 - 1, 0.0);
					idx += 9;
				}
				Renderer.draw(buffer);
			}
		}
	}

	public function new() {
		if (_tilesets == null) _tilesets = new Map<String, Tileset>();
		if (_tilemaps == null) _tilemaps = new Map<String, TilemapData>();
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
		
		var tilemapName: String = stage.tilemap;
		if (tilemapName == null || tilemapName.length <= 0) return;
		
		if (sprite != null && sprite.enabled) {
			drawTilemap(tilemapName, sprite.scene, Std.int(stage.viewX), Std.int(stage.viewY), Std.int(display.posZ));
		}
		
	}
	
	public function end(scene:Scene):Void {
		
	}
	
	public function batched():Bool {
		return true;
	}
	
}
