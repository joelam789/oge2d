package oge2d.driver.lime;

import lime.graphics.opengl.GLTexture;

/**
 * ...
 * @author JoeLam
 */
class TextureGL {

	public var data: GLTexture = null;

	public var width: Float = 0;
	public var height: Float = 0;

	public function new(tex: GLTexture, w: Float, h: Float) {
		this.data = tex;
		this.width = w;
		this.height = h;
	};
	
}
