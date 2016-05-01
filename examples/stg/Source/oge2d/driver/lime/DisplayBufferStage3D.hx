package oge2d.driver.lime;

#if flash

import flash.Vector;

import flash.display3D.textures.Texture;
import flash.display3D.VertexBuffer3D;
import flash.display3D.IndexBuffer3D;


/**
 * ...
 * @author JoeLam
 */
class DisplayBufferStage3D {

	public var texture: TextureStage3D = null;

	public var vertices: Vector<Float> = null;
	public var indices: Vector<UInt> = null;

	public var vertexBuffer: VertexBuffer3D = null;
	public var indexBuffer: IndexBuffer3D = null;

	public var count: Int = 0;

	public var offset: Int = 0;

	public var data: Dynamic = null;

	public function new() { };

}

#else

typedef DisplayBufferStage3D = { }

#end
