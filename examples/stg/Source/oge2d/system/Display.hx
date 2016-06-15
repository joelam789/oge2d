package oge2d.system;

import oge2d.core.Game;
import oge2d.core.Scene;
import oge2d.core.Sprite;

import oge2d.driver.Asset;
import oge2d.driver.Texture;
import oge2d.driver.Renderer;

/**
 * ...
 * @author JoeLam
 */
class Display implements Updater {
	
	public static function getBound(sprite: Sprite): Dynamic {
		if (sprite == null) return null;
		var size = sprite.components["size"];
		if (size == null) return null;
		var bound = sprite.components["bound"];
		if (bound == null) {
			var rect = {
				left: size.x,
				top: size.y,
				right: size.u,
				bottom: size.v
			};
			bound = rect;
			sprite.components.set("bound", bound);
		}
		var display = sprite.components["display"];
		if (display == null) return bound;
		else {
			var posX1 = display.posX - display.width * display.scaleX * display.anchorX;
			var posY1 = display.posY - display.height * display.scaleY * display.anchorY;
			
			bound.left = posX1 + (display.anchorX + size.x) * display.width * display.scaleX;
			bound.top = posY1 + (display.anchorY + size.y) * display.height * display.scaleY;
			bound.right = bound.left + size.u * display.width * display.scaleX;
			bound.bottom = bound.top + size.v * display.height * display.scaleY;
		}
		return bound; // just return a regular rect, do not support rotaion for now ...
	}
	
	public static function getScreenBound(scene: Scene): Dynamic {
		var bound = {
			left: 0,
			top:  0,
			right: scene.game.width,
			bottom: scene.game.height
		};
		return bound;
	}
	
	public static function isPointInsideBound(bound: Dynamic, pointX: Float, pointY: Float): Bool {
		if (bound == null) return false;
		return pointX >= bound.left && pointX < bound.right && pointY >= bound.top && pointY < bound.bottom;
	}
	
	public static function rotate(point: Array<Float>, center: Array<Float>, sinv: Float, cosv: Float) {
		// translate point back to origin:
		point[0] -= center[0];
		point[1] -= center[1];
		// rotate point
		var xnew: Float = point[0] * cosv + point[1] * sinv;
		var ynew: Float = -point[0] * sinv + point[1] * cosv;
		// translate point back:
		point[0] = xnew + center[0];
		point[1] = ynew + center[1];
	}
	
	public static function sortSpritesByPosition(scene: Scene) {
		if (scene == null) return;
		
		scene.sort(function(a, b) {
			if (!a.enabled || !b.enabled) return 0;
			var s1 = a.components["display"];
			if (s1 == null || s1.visible == false) return 0;
			var s2 = b.components["display"];
			if (s2 == null || s2.visible == false) return 0;
			if (s1.posZ > s2.posZ) return 1;
			else if (s1.posZ < s2.posZ) return -1;
			else {
				if (s1.posY > s2.posY) return 1;
				else if (s1.posY < s2.posY) return -1;
				else {
					if (s1.posX > s2.posX) return 1;
					else if (s1.posX < s2.posX) return -1;
				}
			}
			return 0;
		});
		
	}
	
	public static function getDisplay(sprite: Sprite): Dynamic {
		var display = sprite.components["display"];
		if (display != null) return display;
		return null;
	}
	
	public static function setPosition(sprite: Sprite, x: Float, y: Float): Void {
		var display = sprite.components["display"];
		if (display != null) {
			display.posX = x;
			display.posY = y;
		}
	}
	
	public static function setVisible(sprite: Sprite, visible: Bool): Void {
		var display = sprite.components["display"];
		if (display != null) display.visible = visible;
	}
	
	public static function isVisible(sprite: Sprite): Bool {
		var display = sprite.components["display"];
		return display != null ? display.visible == true : false;
	}
	
	public static function setupDisplayBuffer(sprite: Sprite, count: Int = 1) {
		var graph = sprite.components["graphic"];
		var display = sprite.components["display"];
		if (sprite.buffer == null) {
			if (graph != null) {
				var shared: Bool = true;
				if (graph.shared != null) shared = cast graph.shared;
				var imgName: String = cast graph.image;
				if (imgName != null && imgName.length > 0) {
					if (!shared && sprite.index > 0) {
						var pos = imgName.indexOf(".");
						if (pos < 0) imgName = imgName + "-" + sprite.index;
						else imgName = imgName.substring(0, pos) + "-" + sprite.index + "." + imgName.substr(pos + 1);
					}
					var tex: Texture = Asset.getTexture(sprite.game.getImageFilePath(imgName));
					if (tex == null) trace("Failed to load texture: " + imgName);
					else sprite.buffer = Renderer.createDisplayBuffer(tex, count);
				}
			}
		}
		if (graph != null && display != null) {
			display.width = graph.width;
			display.height = graph.height;
			display.offsetX = graph.offsetX;
			display.offsetY = graph.offsetY;
		}
	}
	
	public static function drawRect(w: Float, h: Float, x: Float, y: Float, z: Float = 0, 
									red: Float = 1.0, green: Float = 1.0, blue: Float = 1.0, alpha: Float = 1.0) {
		
		var buffer = Renderer.getSinglePixelBuffer();
		if (buffer == null) return;
		
		var posZ:Float = z + 1000.0;
		if (posZ < 1.0) posZ = 1.0;
		posZ = 1.0 + 1.0 / posZ;
		
		var posX1:Float = x;
		var posY1:Float = y;
		var posX2:Float = posX1 + w;
		var posY2:Float = posY1 + h;
		
		// bottom-left (0)
		Renderer.fillBuffer(buffer, 0, posX1);
		Renderer.fillBuffer(buffer, 1, posY2);
		Renderer.fillBuffer(buffer, 2, posZ);
		Renderer.fillBuffer(buffer, 3, 0);
		Renderer.fillBuffer(buffer, 4, 1);
		Renderer.fillBuffer(buffer, 5, red);
		Renderer.fillBuffer(buffer, 6, green);
		Renderer.fillBuffer(buffer, 7, blue);
		Renderer.fillBuffer(buffer, 8, alpha);
		
		// top-left (1)
		Renderer.fillBuffer(buffer, 9, posX1);
		Renderer.fillBuffer(buffer, 10, posY1);
		Renderer.fillBuffer(buffer, 11, posZ);
		Renderer.fillBuffer(buffer, 12, 0); // u
		Renderer.fillBuffer(buffer, 13, 0); // v
		Renderer.fillBuffer(buffer, 14, red);
		Renderer.fillBuffer(buffer, 15, green);
		Renderer.fillBuffer(buffer, 16, blue);
		Renderer.fillBuffer(buffer, 17, alpha);
		
		// top-right (2)
		Renderer.fillBuffer(buffer, 18, posX2);
		Renderer.fillBuffer(buffer, 19, posY1);
		Renderer.fillBuffer(buffer, 20, posZ);
		Renderer.fillBuffer(buffer, 21, 1);
		Renderer.fillBuffer(buffer, 22, 0);
		Renderer.fillBuffer(buffer, 23, red);
		Renderer.fillBuffer(buffer, 24, green);
		Renderer.fillBuffer(buffer, 25, blue);
		Renderer.fillBuffer(buffer, 26, alpha);
		
		// bottom-right (3)
		Renderer.fillBuffer(buffer, 27, posX2);
		Renderer.fillBuffer(buffer, 28, posY2);
		Renderer.fillBuffer(buffer, 29, posZ);
		Renderer.fillBuffer(buffer, 30, 1);
		Renderer.fillBuffer(buffer, 31, 1);
		Renderer.fillBuffer(buffer, 32, red);
		Renderer.fillBuffer(buffer, 33, green);
		Renderer.fillBuffer(buffer, 34, blue);
		Renderer.fillBuffer(buffer, 35, alpha);
		
		Renderer.draw(buffer);
		
	}

	public function new() {
		// ...
	}
	
	public function batched(): Bool {
		return false;
	}
	
	public function bind(game: Game, scene: Scene): Void {
		if (scene != null) {
			var sprs = scene.filter( function(spr) { return spr.enabled; } );
			for (spr in sprs) include(spr);
		}
	}
	
	public function include(sprite: Sprite): Void {
		
		var display = sprite.components["display"];
		if (display == null) return;
		
		var updaterName: String = display.updater;
		if (updaterName != null && updaterName.length > 0) {
			var updater = sprite.scene.game.systems[updaterName];
			if (updater != null) {
				updater.include(sprite);
				return;
			}
		}
		
		setupDisplayBuffer(sprite);
	}
	
	public function exclude(sprite: Sprite): Void {
		
	}
	
	public function begin(scene: Scene): Void {
		Renderer.clear();
		var display = scene.components["display"];
		if (display == null) return;
		Renderer.clearColor(display.red, display.green, display.blue, display.alpha);
	}
	
	public function update(sprite: Sprite): Void {
		
		var display = sprite.components["display"];
		if (display == null) return;
		
		if (display.visible == false) return;
		
		var updaterName: String = display.updater;
		if (updaterName != null) {
			var updater = sprite.scene.game.systems[updaterName];
			if (updater != null) {
				updater.update(sprite);
				return;
			}
		}
		
		var buffer = sprite.buffer;
		if (buffer == null) {
			Display.drawRect(display.width, display.height, 
							display.posX, display.posY, display.posZ, 
							display.red, display.green, display.blue, display.alpha);
			return;
		}
		
		var offsetX:Float = display.offsetX;
		var offsetY:Float = display.offsetY;
		var width:Float = display.width;
		var height:Float = display.height;
		var scaleX:Float = display.scaleX;
		var scaleY:Float = display.scaleY;
		var red:Float = display.red;
		var green:Float = display.green;
		var blue:Float = display.blue;
		var alpha:Float = display.alpha;
		
		var texWidth: Float = buffer.texture.width;
		var texHeight: Float = buffer.texture.height;
		
		var posX1:Float = display.posX - width * scaleX * display.anchorX;
		var posY1:Float = display.posY - height * scaleY * display.anchorY;
		var posX2:Float = posX1 + width * scaleX;
		var posY2:Float = posY1 + height * scaleY;
		
		var topleft: Array<Float> = [posX1, posY1];
		var topright: Array<Float> = [posX2, posY1];
		var bottomleft: Array<Float> = [posX1, posY2];
		var bottomright: Array<Float> = [posX2, posY2];
		
		if (display.angle != 0) {
			var angle = display.angle * Math.PI / 180;
			var sinv = Math.sin(angle);
			var cosv = Math.cos(angle);
			var center: Array<Float> = [display.posX, display.posY];
			Display.rotate(topleft, center, sinv, cosv);
			Display.rotate(topright, center, sinv, cosv);
			Display.rotate(bottomleft, center, sinv, cosv);
			Display.rotate(bottomright, center, sinv, cosv);
		}
		
		// should need to check whether it's off screen or not? but seems not easy if it's rotated...
		// so let's just skip this checking for now
		// ...
		
		// limit minimum z value
		var posZ:Float = display.posZ + 1000.0;
		if (posZ < 1.0) posZ = 1.0;
		
		// in OpenGL/WebGL, normally, "zNear" <= "zFar", and "zNear" is in front of "zFar".
		// but here we hope that big z is in front of small z, just like z-index in CSS.
		posZ = 1.0 + 1.0 / posZ;
		
		// start to set vertices ...
		
		//    (top-left) 1------2 (top-right)
		//               |     /|
		//               | t0 / |
		//               |   /  |
		//               |  /   |
		//               | / t1 |
		//               |/     |
		// (bottom-left) 0------3 (bottom-right)
		
		// bottom-left (0)
		Renderer.fillBuffer(buffer, 0, bottomleft[0]); // x
		Renderer.fillBuffer(buffer, 1, bottomleft[1]); // y
		Renderer.fillBuffer(buffer, 2, posZ); // z
		Renderer.fillBuffer(buffer, 3, offsetX/texWidth);  // u
		Renderer.fillBuffer(buffer, 4, (offsetY+height)/texHeight); // v
		Renderer.fillBuffer(buffer, 5, red);
		Renderer.fillBuffer(buffer, 6, green);
		Renderer.fillBuffer(buffer, 7, blue);
		Renderer.fillBuffer(buffer, 8, alpha);
		
		// top-left (1)
		Renderer.fillBuffer(buffer, 9, topleft[0]);
		Renderer.fillBuffer(buffer, 10, topleft[1]);
		Renderer.fillBuffer(buffer, 11, posZ);
		Renderer.fillBuffer(buffer, 12, offsetX/texWidth);
		Renderer.fillBuffer(buffer, 13, offsetY/texHeight);
		Renderer.fillBuffer(buffer, 14, red);
		Renderer.fillBuffer(buffer, 15, green);
		Renderer.fillBuffer(buffer, 16, blue);
		Renderer.fillBuffer(buffer, 17, alpha);
		
		// top-right (2)
		Renderer.fillBuffer(buffer, 18, topright[0]);
		Renderer.fillBuffer(buffer, 19, topright[1]);
		Renderer.fillBuffer(buffer, 20, posZ);
		Renderer.fillBuffer(buffer, 21, (offsetX+width)/texWidth);
		Renderer.fillBuffer(buffer, 22, offsetY/texHeight);
		Renderer.fillBuffer(buffer, 23, red);
		Renderer.fillBuffer(buffer, 24, green);
		Renderer.fillBuffer(buffer, 25, blue);
		Renderer.fillBuffer(buffer, 26, alpha);
		
		// bottom-right (3)
		Renderer.fillBuffer(buffer, 27, bottomright[0]);
		Renderer.fillBuffer(buffer, 28, bottomright[1]);
		Renderer.fillBuffer(buffer, 29, posZ);
		Renderer.fillBuffer(buffer, 30, (offsetX+width)/texWidth);
		Renderer.fillBuffer(buffer, 31, (offsetY+height)/texHeight);
		Renderer.fillBuffer(buffer, 32, red);
		Renderer.fillBuffer(buffer, 33, green);
		Renderer.fillBuffer(buffer, 34, blue);
		Renderer.fillBuffer(buffer, 35, alpha);
		
		Renderer.draw(buffer);
	}
	
	public function end(scene: Scene): Void {
		Renderer.update();
	}
	
}
