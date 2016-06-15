package oge2d.driver.lime;

import lime.math.Matrix4;

import lime.graphics.Image;
import lime.graphics.GLRenderContext;
import lime.graphics.opengl.GLBuffer;
import lime.graphics.opengl.GLProgram;
import lime.graphics.opengl.GLTexture;

import lime.utils.GLUtils;
import lime.utils.Int16Array;
import lime.utils.Float32Array;

/**
 * ...
 * @author JoeLam
 */
class RendererGL {
	
	static var _gl:GLRenderContext = null;
	static var _vertexBuffer:GLBuffer = null;
	static var _indexBuffer:GLBuffer = null;
	static var _program:GLProgram = null;
	static var _textureAttribute:Int;
	static var _vertexAttribute:Int;
	static var _colorAttribute:Int;
	static var _width:Int = 640;
	static var _height:Int = 480;
	static var _pixel: DisplayBufferGL = null;

	public static function init(width:Int, height:Int, ?ctx:GLRenderContext, ?callback:Int->Int->Void): Bool {
		
		if (ctx == null) return false;
		
		_gl = ctx;
		_width = width;
		_height = height;
		
		// create shader
		
		var vertexSource = "
			
			attribute vec3 aVertexPosition;
			attribute vec2 aTexCoord;
			attribute vec4 aColor;
			
			varying vec2 vTexCoord;
			varying vec4 vColor;
			
			uniform mat4 uMatrix;
			
			void main (void) {
				vColor = aColor;
				vTexCoord = aTexCoord;
				gl_Position = uMatrix * vec4(aVertexPosition, 1.0);
				
			}
			
		";
		
		var fragmentSource = 
			
			#if (!desktop || rpi)
			"precision mediump float;" +
			#end
			
			"
			varying vec2 vTexCoord;
			varying vec4 vColor;
			
			uniform sampler2D uImage0;
			
			void main (void) {
				
				gl_FragColor = texture2D(uImage0, vTexCoord) * vColor;
				
			}
			
		";
		
		_program = GLUtils.createProgram (vertexSource, fragmentSource);
		_gl.useProgram (_program);
		
		
		// create buffer
		
		_vertexBuffer = _gl.createBuffer ();
		_gl.bindBuffer (_gl.ARRAY_BUFFER, _vertexBuffer);
		
		_indexBuffer = _gl.createBuffer ();
		_gl.bindBuffer (_gl.ELEMENT_ARRAY_BUFFER, _indexBuffer);
		
		
		// init entries 
		
		var matrixUniform = _gl.getUniformLocation (_program, "uMatrix");
		
		//var matrix = Matrix4.createOrtho (0, _width, _height, 0, -1000, 1000);
		
		var near: Float = -1000;
		var far: Float = 1000;
		var matrix = new Matrix4 (new Float32Array ([
			2.0 / _width, 0, 0,  0,
			0,  -2.0 / _height, 0, 0,
			0,  0, 2.0 / (far - near), 0, 
			-1.0, 1.0, 0, 1.0
		]));
		
		
		_gl.uniformMatrix4fv (matrixUniform, false, matrix);
		
		_vertexAttribute = _gl.getAttribLocation (_program, "aVertexPosition");
		_gl.enableVertexAttribArray (_vertexAttribute);
		_gl.vertexAttribPointer (_vertexAttribute, 3, _gl.FLOAT, false, 9 * Float32Array.BYTES_PER_ELEMENT, 0);
		
		_textureAttribute = _gl.getAttribLocation (_program, "aTexCoord");
		_gl.enableVertexAttribArray(_textureAttribute);
		_gl.vertexAttribPointer (_textureAttribute, 2, _gl.FLOAT, false, 9 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
		
		_colorAttribute = _gl.getAttribLocation (_program, "aColor");
		_gl.enableVertexAttribArray(_colorAttribute);
		_gl.vertexAttribPointer (_colorAttribute, 4, _gl.FLOAT, false, 9 * Float32Array.BYTES_PER_ELEMENT, 5 * Float32Array.BYTES_PER_ELEMENT);
		
		var imageUniform = _gl.getUniformLocation (_program, "uImage0");
		_gl.uniform1i (imageUniform, 0);
		
		
		// init common settings
		
		_gl.enable(_gl.DEPTH_TEST);
		_gl.depthFunc(_gl.LEQUAL);
		
		_gl.blendFunc(_gl.SRC_ALPHA, _gl.ONE_MINUS_SRC_ALPHA);
		_gl.enable(_gl.BLEND);
		
		_gl.viewport (0, 0, _width, _height);
		
		// create temp display objects ...
		_pixel = createDisplayBuffer(createSimpleTexture(1, 1, 255, 255, 255, 255));
		
		if (callback != null) callback(_width, _height);
		
		return true;
		
	}
	
	public static function clear() {
		if (_gl == null) return;
		_gl.clear (_gl.COLOR_BUFFER_BIT | _gl.DEPTH_BUFFER_BIT);
	}
	
	public static function clearColor(red: Float, green: Float, blue: Float, alpha: Float) {
		if (_gl == null) return;
		_gl.clearColor (red, green, blue, alpha);
		
	}
	
	public static function draw(buffer: DisplayBufferGL) {
		if (_gl == null || buffer == null) return;
		if (buffer.texture == null || buffer.texture.data == null || buffer.vertices == null || buffer.count <= 0) return;
		_gl.bindTexture (_gl.TEXTURE_2D, buffer.texture.data);
		_gl.bufferData (_gl.ARRAY_BUFFER, buffer.vertices, _gl.STATIC_DRAW);
		_gl.bufferData (_gl.ELEMENT_ARRAY_BUFFER, buffer.indices, _gl.STATIC_DRAW);
		_gl.drawElements(_gl.TRIANGLES, buffer.indices.length, _gl.UNSIGNED_SHORT, 0);
	}
	
	public static function getSinglePixelBuffer(): DisplayBufferGL {
		return _pixel;
	}
	
	public static function createSimpleTexture(width: Int, height: Int, red: Int, green: Int, blue: Int, alpha: Int): TextureGL {	
		if (_gl == null) return null;
		var color: UInt = ((red & 0xff) << 24) | ((green & 0xff) << 16) | ((blue & 0xff) << 8) | (alpha & 0xff);
		var image: Image = new Image(null, 0, 0, width, height, color);
		#if js
		var src = image.src;
		if (src != null) { // need to re-draw it in js... (might be a bug of lime.graphics.Image?)
			var ctx = src.getContext("2d");
			ctx.fillStyle = "rgba(" + red + ", " + green + ", " + blue + ", " + (alpha / 255.0) + ")";
			ctx.fillRect(0, 0, width, height);
		}
		#end
		return createTexture(image);
	}
	
	public static function createTexture(image: Image): TextureGL {
		if (_gl == null || image == null) return null;
		var texture: GLTexture = _gl.createTexture ();
		_gl.bindTexture (_gl.TEXTURE_2D, texture);
		_gl.texParameteri (_gl.TEXTURE_2D, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE);
		_gl.texParameteri (_gl.TEXTURE_2D, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE);
		#if js
		_gl.texImage2D (_gl.TEXTURE_2D, 0, _gl.RGBA, _gl.RGBA, _gl.UNSIGNED_BYTE, image.src);
		#else
		_gl.texImage2D (_gl.TEXTURE_2D, 0, _gl.RGBA, image.buffer.width, image.buffer.height, 0, _gl.RGBA, _gl.UNSIGNED_BYTE, image.data);
		#end
		_gl.texParameteri (_gl.TEXTURE_2D, _gl.TEXTURE_MAG_FILTER, _gl.LINEAR);
		_gl.texParameteri (_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.LINEAR);
		var w = image.width;
		var h = image.height;
		image.src = null;
		image.data = null;
		image = null;
		return new TextureGL(texture, w, h);
	}
	
	public static function deleteTexture(texture: TextureGL) {
		if (_gl == null || texture == null || texture.data == null) return;
		_gl.deleteTexture(texture.data);
		texture.data = null;
	}
	
	public static function createDisplayBuffer(tex: TextureGL, size: Int = 1, ?info: Dynamic): DisplayBufferGL {
		if (tex == null || size <= 0) return null;
		var buffer: DisplayBufferGL = new DisplayBufferGL();
		buffer.texture = tex;
		buffer.vertices = new Float32Array(size * 4 * 9); // 4 points for a rect, every point contains x,y,z,u,v,r,g,b,a
		buffer.indices = new Int16Array(size * 6); // 3 points for a triangle, 2 triangles for a rect
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
		
		var last: Int = 0;
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
	
	public static function fillBuffer(buf: DisplayBufferGL, pos: Int, value: Float): Int {
		buf.vertices[pos] = value;
		return pos + 1;
	}
	
	public static function update() {
		// ...
	}	
}
