package oge2d.system;

import unifill.Unifill;

import oge2d.core.Sprite;
import oge2d.core.Scene;
import oge2d.core.Game;

import oge2d.driver.Asset;
import oge2d.driver.Renderer;

/**
 * ...
 * @author JoeLam
 */
class Text implements Updater {
	
	public static inline var DEFAULT_MAX_LENGTH = 16;
	
	public static function setText(sprite: Sprite, text: String): Void {
		var setting = sprite.components["text"];
		if (setting != null) {
			setting.content = text;
		}
	}

	public function new() {
		// ...
	}
	
	public function batched(): Bool {
		return false;
	}
	
	public function bind(game:Game, scene:Scene):Void {
	}
	
	public function include(sprite:Sprite):Void {
		var text = sprite.components["text"];
		if (text != null) {
			var fontName:String = text.font;
			if (fontName != null && text.charset == null) {
				text.charset = Asset.getJsonData(sprite.game.getJsonFilePath(fontName, "font"));
			}
			var maxLength: Int = text.maxLength == null ? DEFAULT_MAX_LENGTH : Std.int(text.maxLength);
			text.maxLength = maxLength;
			Display.setupDisplayBuffer(sprite, maxLength);
		} else {
			Display.setupDisplayBuffer(sprite);
		}
	}
	
	public function exclude(sprite:Sprite):Void {
		
	}
	
	public function begin(scene:Scene):Void {
		
	}
	
	public function update(sprite:Sprite):Void {
		
		var buffer = sprite.buffer;
		if (buffer == null) return;
		
		var text = sprite.components["text"];
		if (text == null) return;
		
		var content: String = text.content;
		if (content == null || content.length <= 0) return;
		
		var maxLength: Int = Std.int(text.maxLength);
		
		var charset = text.charset;
		if (charset == null) return;
		var chars = charset.chars;
		if (chars == null) return;
		
		var display = sprite.components["display"];
		if (display == null) return;
		
		//var updaterName: String = display.updater;
		//if (updaterName == null || updaterName != "text") return;
			
		// limit minimum z value
		var posZ:Float = display.posZ + 1000.0;
		if (posZ < 1.0) posZ = 1.0;
		
		// in OpenGL/WebGL, normally, "zNear" <= "zFar", and "zNear" is in front of "zFar".
		// but here we hope that bigger z is in front of smaller z, just like z-index in CSS.
		posZ = 1.0 / posZ;
		
		// get others ...
		
		var posX:Float = display.posX;
		var posY:Float = display.posY;
		var scaleX:Float = display.scaleX;
		var scaleY:Float = display.scaleY;
		var red:Float = display.red;
		var green:Float = display.green;
		var blue:Float = display.blue;
		var alpha:Float = display.alpha;
		
		var posX1:Float = posX;
		var posY1:Float = posY;
		var posX2:Float = posX;
		var posY2:Float = posY;
		
		var texWidth: Float = buffer.texture.width;
		var texHeight: Float = buffer.texture.height;
		
		var idx: Int = 0;
		var len: Int = Unifill.uLength(content);
		var offset: Float = 0;
		for (i in 0...maxLength) {
			
			var code = "32"; // let it be "space" by default
			if (i >= len) alpha = 0; // no need to display
			else code = Std.string(Unifill.uCharCodeAt(content, i));
			
			// get bitmap font settings of the char
			var setting = Reflect.field(chars, code);
			if (setting == null) setting = Reflect.field(chars, "63"); // let it be "?" ...
			var args: Array<Float> = cast setting;
			
			// 0     1     2         3           4           5           6 
			// x="0" y="0" width="5" height="32" xoffset="1" yoffset="5" xadvance="7" 
			
			posX1 = posX + offset + args[4] * scaleX;
			posY1 = posY + args[5] * scaleY;
			posX2 = posX1 + args[2] * scaleX;
			posY2 = posY1 + args[3] * scaleY;
			
			offset = posX1 + args[6] * scaleX - posX;
			
			// bottom-left
			Renderer.fillBuffer(buffer, idx++, posX1);
			Renderer.fillBuffer(buffer, idx++, posY2);
			Renderer.fillBuffer(buffer, idx++, posZ);
			Renderer.fillBuffer(buffer, idx++, args[0]/texWidth);
			Renderer.fillBuffer(buffer, idx++, (args[1]+args[3])/texHeight);
			Renderer.fillBuffer(buffer, idx++, red);
			Renderer.fillBuffer(buffer, idx++, green);
			Renderer.fillBuffer(buffer, idx++, blue);
			Renderer.fillBuffer(buffer, idx++, alpha);
			
			// top-left
			Renderer.fillBuffer(buffer, idx++, posX1);
			Renderer.fillBuffer(buffer, idx++, posY1);
			Renderer.fillBuffer(buffer, idx++, posZ);
			Renderer.fillBuffer(buffer, idx++, args[0]/texWidth); // u
			Renderer.fillBuffer(buffer, idx++, args[1]/texHeight); // v
			Renderer.fillBuffer(buffer, idx++, red);
			Renderer.fillBuffer(buffer, idx++, green);
			Renderer.fillBuffer(buffer, idx++, blue);
			Renderer.fillBuffer(buffer, idx++, alpha);
			
			// top-right
			Renderer.fillBuffer(buffer, idx++, posX2);
			Renderer.fillBuffer(buffer, idx++, posY1);
			Renderer.fillBuffer(buffer, idx++, posZ);
			Renderer.fillBuffer(buffer, idx++, (args[0]+args[2])/texWidth);
			Renderer.fillBuffer(buffer, idx++, args[1]/texHeight);
			Renderer.fillBuffer(buffer, idx++, red);
			Renderer.fillBuffer(buffer, idx++, green);
			Renderer.fillBuffer(buffer, idx++, blue);
			Renderer.fillBuffer(buffer, idx++, alpha);
			
			// bottom-right
			Renderer.fillBuffer(buffer, idx++, posX2);
			Renderer.fillBuffer(buffer, idx++, posY2);
			Renderer.fillBuffer(buffer, idx++, posZ);
			Renderer.fillBuffer(buffer, idx++, (args[0]+args[2])/texWidth);
			Renderer.fillBuffer(buffer, idx++, (args[1]+args[3])/texHeight);
			Renderer.fillBuffer(buffer, idx++, red);
			Renderer.fillBuffer(buffer, idx++, green);
			Renderer.fillBuffer(buffer, idx++, blue);
			Renderer.fillBuffer(buffer, idx++, alpha);
			
		}
		
		Renderer.draw(buffer);
	}
	
	public function end(scene:Scene):Void {
		
	}
	
}
