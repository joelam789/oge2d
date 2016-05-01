package oge2d.driver.lime;

#if flash

import flash.display3D.textures.Texture;

/**
 * ...
 * @author JoeLam
 */
class TextureStage3D {

	public var data: Texture = null;

	public var width: Float = 0;
	public var height: Float = 0;

	public function new(tex: Texture, w: Float, h: Float) {
		this.data = tex;
		this.width = w;
		this.height = h;
	};

}

#else

typedef TextureStage3D = { }

#end
