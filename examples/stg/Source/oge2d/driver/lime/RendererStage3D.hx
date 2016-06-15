package oge2d.driver.lime;

import lime.graphics.Image;

#if flash

import flash.Lib;
import flash.Vector;
import flash.events.Event;

import flash.geom.Point;
import flash.geom.Matrix3D;
import flash.geom.Rectangle;

import flash.display.Loader;
import flash.display.Bitmap;
import flash.display.BitmapData;
import flash.display.Stage;
import flash.display.Stage3D;
import flash.display3D.Context3D;
import flash.display3D.Context3DBufferUsage;
import flash.display3D.Context3DCompareMode;
import flash.display3D.Context3DTextureFormat;
import flash.display3D.Context3DBlendFactor;
import flash.display3D.Context3DWrapMode;
import flash.display3D.Context3DTextureFilter;
import flash.display3D.Context3DMipFilter;
import flash.display3D.Context3DProfile;
import flash.display3D.Context3DRenderMode;
import flash.display3D.Context3DClearMask;
import flash.display3D.VertexBuffer3D;
import flash.display3D.IndexBuffer3D;
import flash.display3D.textures.Texture;

private class SimpleShader extends hxsl.Shader {

	static var SRC = {
		
        var input: {
            pos: Float3,
            uv: Float2,
			color: Float4
        };

        var tuv: Float2;
		var tcolor: Float4;

        function vertex (mproj: Matrix) {
            tuv = input.uv;
			tcolor = input.color;
            out = input.pos.xyzw * mproj;
        }

        function fragment (tex: Texture) {
            out = tex.get(tuv) * tcolor;
        }
    }
}

class RendererStage3D {
	
	static var _stage3d: Stage3D = null;
	static var _context3d: Context3D = null;
	static var _shader: SimpleShader = null;
	
	static var _width:Int = 640;
	static var _height:Int = 480;
	
	static var _pixel: DisplayBufferStage3D = null;

	public function new() {
		// ...
	}
	
	public static function init(width:Int, height:Int, ?ctx:Dynamic, ?callback:Int->Int->Void): Bool {
		
		if (Lib.current.stage.stage3Ds.length > 0) _stage3d = Lib.current.stage.stage3Ds[0];
		
		if (_stage3d == null) return false;
		
		_stage3d.addEventListener(Event.CONTEXT3D_CREATE, function(_) {
			
			// init here
			
			_width = Lib.current.stage.stageWidth;
			_height = Lib.current.stage.stageHeight;
			
			_context3d = _stage3d.context3D;
			_context3d.enableErrorChecking = true;
			
			_stage3d.x = 0; _stage3d.y = 0;
			_context3d.configureBackBuffer(_width, _height, 2, true);
			_context3d.setRenderToBackBuffer();
			_context3d.setScissorRectangle(new Rectangle(0, 0, _width, _height));

			_context3d.setDepthTest(true, Context3DCompareMode.LESS_EQUAL);
			_context3d.setBlendFactors(Context3DBlendFactor.SOURCE_ALPHA, Context3DBlendFactor.ONE_MINUS_SOURCE_ALPHA);
			
			var near: Float = -1000;
			var far: Float = 1000;
			var mproj: Matrix3D = new Matrix3D(Vector.ofArray([
				2.0 / _width, 0, 0,  0,
				0,  -2.0 / _height, 0, 0,
				0,  0, 2.0 / (far - near), 0, 
				-1.0, 1.0, 0, 1.0
			]));

			_shader = new SimpleShader();
			_shader.mproj = mproj;
			
			// create temp display objects ...
			_pixel = createDisplayBuffer(createSimpleTexture(1, 1, 255, 255, 255, 255));
			
			if (callback != null) callback(_width, _height);
		});
		
		_stage3d.requestContext3D(Std.string(Context3DRenderMode.AUTO),  Context3DProfile.BASELINE); // need higher profile?
		
		return true;
	}
	
	public static function clear() {
		if (_stage3d == null || _context3d == null) return;
		_context3d.clear(0, 0, 0, 1, 1, 0, Context3DClearMask.COLOR | Context3DClearMask.DEPTH); // clear
	}
	
	public static function clearColor(red: Float, green: Float, blue: Float, alpha: Float) {
		if (_context3d == null) return;
		_context3d.clear(red, green, blue, alpha);
	}
	
	public static function draw(buffer: DisplayBufferStage3D) {
		if (_context3d == null || buffer == null) return;
		if (buffer.texture == null || buffer.texture.data == null || buffer.vertices == null || buffer.count <= 0) return;
		
		buffer.vertexBuffer.uploadFromVector(buffer.vertices, 0, 4 * buffer.count);
		buffer.indexBuffer.uploadFromVector(buffer.indices, 0, 6 * buffer.count);
		
		_shader.tex = buffer.texture.data;
		
		_shader.rebuildVars();
		_shader.bind(_context3d, buffer.vertexBuffer);
		
		_context3d.drawTriangles(buffer.indexBuffer);
		
		_shader.unbind(_context3d);
	}
	
	public static function getSinglePixelBuffer(): DisplayBufferStage3D {
		return _pixel;
	}
	
	private static function getBestPowerOfTwo(length: Int): Int {
		if (length <= 1) return 1;
		var result: Int = 1;
		while (length > result) result *= 2;
		return result;
	}
	
	public static function createSimpleTexture(width: Int, height: Int, red: Int, green: Int, blue: Int, alpha: Int): TextureStage3D {	
		var bestWidth: Int = getBestPowerOfTwo(width);
		var bestHeight: Int = getBestPowerOfTwo(height);
		var texture: Texture = _context3d.createTexture(bestWidth, bestHeight, Context3DTextureFormat.BGRA, false);
		var color: UInt = ((alpha & 0xff) << 24) | ((red & 0xff) << 16) | ((green & 0xff) << 8) | (blue & 0xff);
		var bitmapData: BitmapData = new BitmapData(bestWidth, bestHeight, true, color);
		texture.uploadFromBitmapData(bitmapData);
		bitmapData.dispose();
		
		// this line needs "-swf-version 11.6" (or higher version) ...
		_context3d.setSamplerStateAt(0, Context3DWrapMode.CLAMP,  Context3DTextureFilter.LINEAR,  Context3DMipFilter.MIPNONE);
		
		return new TextureStage3D(texture, bestWidth, bestHeight);
	}
	
	private static function createTextureFromBitmap(bitmap: Bitmap): TextureStage3D {	
		var bestWidth: Int = getBestPowerOfTwo(Std.int(bitmap.width));
		var bestHeight: Int = getBestPowerOfTwo(Std.int(bitmap.height));
		var texture: Texture = _context3d.createTexture(bestWidth, bestHeight, Context3DTextureFormat.BGRA, false);
		if (bestWidth == Std.int(bitmap.width) && bestHeight == Std.int(bitmap.height)) texture.uploadFromBitmapData(bitmap.bitmapData);
		else {
			var bitmapData: BitmapData = new BitmapData(bestWidth, bestHeight, true, 0);
			bitmapData.copyPixels(bitmap.bitmapData, bitmap.bitmapData.rect, new Point(0, 0));
			texture.uploadFromBitmapData(bitmapData);
			bitmapData.dispose();
		}
		bitmap.bitmapData.dispose();
		
		// this line needs "-swf-version 11.6" (or higher version) ...
		_context3d.setSamplerStateAt(0, Context3DWrapMode.CLAMP,  Context3DTextureFilter.LINEAR,  Context3DMipFilter.MIPNONE);
		
		return new TextureStage3D(texture, bestWidth, bestHeight);
	}
	
	public static function loadTexture(url: String, bytes: haxe.io.Bytes, callback: TextureStage3D->Void): Void {
		if (_context3d == null || bytes == null) return null;
		var loader:Loader = new Loader();
		loader.contentLoaderInfo.addEventListener(Event.INIT, function(e:Event):Void {
			var bmpdata = new BitmapData(loader.contentLoaderInfo.width, loader.contentLoaderInfo.height, true, 0);
			bmpdata.draw(loader);
			callback(createTextureFromBitmap(new Bitmap(bmpdata)));
		});
		loader.loadBytes(bytes.getData());
	}
	
	public static function createTexture(image: Image): TextureStage3D {
		if (_context3d == null || image == null) return null;
		return createTextureFromBitmap(new Bitmap(image.src));
	}
	
	public static function deleteTexture(texture: TextureStage3D) {
		if (_context3d == null || texture == null || texture.data == null) return;
		texture.data.dispose();
		texture.data = null;
	}
	
	public static function createDisplayBuffer(tex: TextureStage3D, size: Int = 1, ?info: Dynamic): DisplayBufferStage3D {
		if (_context3d == null || tex == null || size <= 0) return null;
		var buffer: DisplayBufferStage3D = new DisplayBufferStage3D();
		buffer.texture = tex;
		// the last parameter of createVertexBuffer() needs at least Flash12/AIR4 
		buffer.vertexBuffer = _context3d.createVertexBuffer(size * 4, 9, Context3DBufferUsage.DYNAMIC_DRAW);
		buffer.indexBuffer = _context3d.createIndexBuffer(size * 6);
		buffer.vertices = new Vector<Float>(size * 4 * 9); // 4 points for a rect, every point contains x,y,z,u,v,r,g,b,a
		buffer.indices = new Vector<UInt>(size * 6); // 3 points for a triangle, 2 triangles for a rect
		buffer.count = size;
		buffer.data = info;
		
		// init ...
		
		//    (top-left) 1------2 (top-right)
		//               |     /|
		//               | t0 / |
		//               |   /  |
		//               |  /   |
		//               | / t1 |
		//               |/     |
		// (bottom-left) 0------3 (bottom-right)
		
		var last: UInt = 0;
		for (i in 0...size) {	
			buffer.indices[i * 6 + 0] = last + 0;
			buffer.indices[i * 6 + 1] = last + 1;
			buffer.indices[i * 6 + 2] = last + 2;
			buffer.indices[i * 6 + 3] = last + 0;
			buffer.indices[i * 6 + 4] = last + 2;
			buffer.indices[i * 6 + 5] = last + 3;
			last = last + 4;
		}
		return buffer;
	}
	
	public static function fillBuffer(buf: DisplayBufferStage3D, pos: Int, value: Float): Int {
		buf.vertices[pos] = value;
		return pos + 1;
	}
	
	public static function update() {
		if (_context3d == null) return;
		_context3d.present();
	}
	
}

#else

class RendererStage3D {
	public function new() {
		throw "Unsupported render context";
	}
	public static function init(width:Int, height:Int, ?ctx:Dynamic, ?callback:Int->Int->Void): Bool {
		throw "Unsupported render context";
	}
}

#end
