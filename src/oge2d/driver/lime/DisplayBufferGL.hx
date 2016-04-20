package oge2d.driver.lime;

import lime.utils.Int16Array;
import lime.utils.Float32Array;

/**
 * ...
 * @author JoeLam
 */
class DisplayBufferGL {

    public var texture: TextureGL = null;
	
	public var vertices: Float32Array = null;
	
	public var indices: Int16Array = null;
	
	public var count: Int = 0;
	
	public var offset: Int = 0;
	
	public var data: Dynamic = null;
	
	public function new() { };

}
