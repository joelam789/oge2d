(function (console, $hx_exports, $global) { "use strict";
$hx_exports.lime = $hx_exports.lime || {};
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var ApplicationMain = function() { };
$hxClasses["ApplicationMain"] = ApplicationMain;
ApplicationMain.__name__ = ["ApplicationMain"];
ApplicationMain.create = function() {
	ApplicationMain.preloader = new lime_app_Preloader();
	ApplicationMain.app = new Main();
	ApplicationMain.app.setPreloader(ApplicationMain.preloader);
	ApplicationMain.app.create(ApplicationMain.config);
	ApplicationMain.preloader.onComplete.add(ApplicationMain.start);
	ApplicationMain.preloader.create(ApplicationMain.config);
	var urls = [];
	var types = [];
	urls.push("assets/app.json");
	types.push("TEXT");
	if(ApplicationMain.config.assetsPrefix != null) {
		var _g1 = 0;
		var _g = urls.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(types[i] != "FONT") urls[i] = ApplicationMain.config.assetsPrefix + urls[i];
		}
	}
	ApplicationMain.preloader.load(urls,types);
};
ApplicationMain.main = function() {
	ApplicationMain.config = { build : "151", company : "nobody", file : "ExampleStg", fps : 60, name : "Shooting Game", orientation : "", packageName : "ExampleStg", version : "1.0.0", windows : [{ antialiasing : 0, background : 16777215, borderless : false, depthBuffer : false, display : 0, fullscreen : false, hardware : true, height : 480, parameters : "{}", resizable : true, stencilBuffer : false, title : "Shooting Game", vsync : false, width : 640, x : null, y : null}]};
};
ApplicationMain.start = function() {
	var result = ApplicationMain.app.exec();
};
var DateTools = function() { };
$hxClasses["DateTools"] = DateTools;
DateTools.__name__ = ["DateTools"];
var lime_AssetLibrary = function() {
	this.onChange = new lime_app_Event_$Void_$Void();
};
$hxClasses["lime.AssetLibrary"] = lime_AssetLibrary;
lime_AssetLibrary.__name__ = ["lime","AssetLibrary"];
lime_AssetLibrary.prototype = {
	onChange: null
	,exists: function(id,type) {
		return false;
	}
	,getAudioBuffer: function(id) {
		return null;
	}
	,getBytes: function(id) {
		return null;
	}
	,getFont: function(id) {
		return null;
	}
	,getImage: function(id) {
		return null;
	}
	,getPath: function(id) {
		return null;
	}
	,getText: function(id) {
		var bytes = this.getBytes(id);
		if(bytes == null) return null; else return bytes.getString(0,bytes.length);
	}
	,isLocal: function(id,type) {
		return true;
	}
	,list: function(type) {
		return null;
	}
	,load: function() {
		var _g = this;
		return new lime_app_Future(function() {
			return _g;
		});
	}
	,loadAudioBuffer: function(id) {
		var _g = this;
		return new lime_app_Future(function() {
			return _g.getAudioBuffer(id);
		});
	}
	,loadBytes: function(id) {
		var _g = this;
		return new lime_app_Future(function() {
			return _g.getBytes(id);
		});
	}
	,loadFont: function(id) {
		var _g = this;
		return new lime_app_Future(function() {
			return _g.getFont(id);
		});
	}
	,loadImage: function(id) {
		var _g = this;
		return new lime_app_Future(function() {
			return _g.getImage(id);
		});
	}
	,loadText: function(id) {
		return this.loadBytes(id).then(function(bytes) {
			return new lime_app_Future(function() {
				if(bytes == null) return null; else return bytes.getString(0,bytes.length);
			});
		});
	}
	,unload: function() {
	}
	,__class__: lime_AssetLibrary
};
var DefaultAssetLibrary = function() {
	this.type = new haxe_ds_StringMap();
	this.path = new haxe_ds_StringMap();
	this.className = new haxe_ds_StringMap();
	lime_AssetLibrary.call(this);
	var id;
	id = "assets/app.json";
	this.path.set(id,id);
	this.type.set(id,"TEXT");
	var assetsPrefix = null;
	if(ApplicationMain.config != null && Object.prototype.hasOwnProperty.call(ApplicationMain.config,"assetsPrefix")) assetsPrefix = ApplicationMain.config.assetsPrefix;
	if(assetsPrefix != null) {
		var $it0 = this.path.keys();
		while( $it0.hasNext() ) {
			var k = $it0.next();
			var value = assetsPrefix + this.path.get(k);
			this.path.set(k,value);
		}
	}
};
$hxClasses["DefaultAssetLibrary"] = DefaultAssetLibrary;
DefaultAssetLibrary.__name__ = ["DefaultAssetLibrary"];
DefaultAssetLibrary.__super__ = lime_AssetLibrary;
DefaultAssetLibrary.prototype = $extend(lime_AssetLibrary.prototype,{
	className: null
	,path: null
	,type: null
	,lastModified: null
	,timer: null
	,exists: function(id,type) {
		var requestedType;
		if(type != null) requestedType = js_Boot.__cast(type , String); else requestedType = null;
		var assetType = this.type.get(id);
		if(assetType != null) {
			if(assetType == requestedType || (requestedType == "SOUND" || requestedType == "MUSIC") && (assetType == "MUSIC" || assetType == "SOUND")) return true;
			if(requestedType == "BINARY" || requestedType == null || assetType == "BINARY" && requestedType == "TEXT") return true;
		}
		return false;
	}
	,getAudioBuffer: function(id) {
		return null;
	}
	,getBytes: function(id) {
		var loader;
		var key = this.path.get(id);
		loader = lime_app_Preloader.loaders.get(key);
		if(loader == null) return null;
		var bytes = loader.bytes;
		if(bytes != null) return bytes; else return null;
	}
	,getFont: function(id) {
		return js_Boot.__cast(Type.createInstance(this.className.get(id),[]) , lime_text_Font);
	}
	,getImage: function(id) {
		return lime_graphics_Image.fromImageElement((function($this) {
			var $r;
			var key = $this.path.get(id);
			$r = lime_app_Preloader.images.get(key);
			return $r;
		}(this)));
	}
	,getPath: function(id) {
		return this.path.get(id);
	}
	,getText: function(id) {
		var loader;
		var key = this.path.get(id);
		loader = lime_app_Preloader.loaders.get(key);
		if(loader == null) return null;
		var bytes = loader.bytes;
		if(bytes != null) return bytes.getString(0,bytes.length); else return null;
	}
	,isLocal: function(id,type) {
		var requestedType;
		if(type != null) requestedType = js_Boot.__cast(type , String); else requestedType = null;
		return true;
	}
	,list: function(type) {
		var requestedType;
		if(type != null) requestedType = js_Boot.__cast(type , String); else requestedType = null;
		var items = [];
		var $it0 = this.type.keys();
		while( $it0.hasNext() ) {
			var id = $it0.next();
			if(requestedType == null || this.exists(id,type)) items.push(id);
		}
		return items;
	}
	,loadAudioBuffer: function(id) {
		var _g = this;
		var promise = new lime_app_Promise();
		promise.completeWith(new lime_app_Future(function() {
			return _g.getAudioBuffer(id);
		}));
		return promise.future;
	}
	,loadBytes: function(id) {
		var promise = new lime_app_Promise();
		if(this.path.exists(id)) {
			var request = new lime_net_HTTPRequest();
			promise.completeWith(request.load(this.path.get(id) + "?" + lime_Assets.cache.version));
		} else promise.complete(this.getBytes(id));
		return promise.future;
	}
	,loadImage: function(id) {
		var promise = new lime_app_Promise();
		if(this.path.exists(id)) {
			var image = new Image();
			image.onload = function(_) {
				promise.complete(lime_graphics_Image.fromImageElement(image));
			};
			image.onerror = $bind(promise,promise.error);
			image.src = this.path.get(id) + "?" + lime_Assets.cache.version;
		} else promise.complete(this.getImage(id));
		return promise.future;
	}
	,loadText: function(id) {
		var promise = new lime_app_Promise();
		if(this.path.exists(id)) {
			var request = new lime_net_HTTPRequest();
			var future = request.load(this.path.get(id) + "?" + lime_Assets.cache.version);
			future.onProgress(function(progress) {
				promise.progress(progress);
			});
			future.onError(function(msg) {
				promise.error(msg);
			});
			future.onComplete(function(bytes) {
				promise.complete(bytes.getString(0,bytes.length));
			});
		} else promise.complete(this.getText(id));
		return promise.future;
	}
	,__class__: DefaultAssetLibrary
});
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	r: null
	,match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,__class__: EReg
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d < 10?"0" + d:"" + d) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
};
HxOverrides.strDate = function(s) {
	var _g = s.length;
	switch(_g) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k1 = s.split("-");
		return new Date(k1[0],k1[1] - 1,k1[2],0,0,0);
	case 19:
		var k2 = s.split(" ");
		var y = k2[0].split("-");
		var t = k2[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw new js__$Boot_HaxeError("Invalid date format : " + s);
	}
};
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var IntIterator = function(min,max) {
	this.min = min;
	this.max = max;
};
$hxClasses["IntIterator"] = IntIterator;
IntIterator.__name__ = ["IntIterator"];
IntIterator.prototype = {
	min: null
	,max: null
	,hasNext: function() {
		return this.min < this.max;
	}
	,next: function() {
		return this.min++;
	}
	,__class__: IntIterator
};
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	h: null
	,q: null
	,length: null
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,first: function() {
		if(this.h == null) return null; else return this.h[0];
	}
	,pop: function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		if(this.h == null) this.q = null;
		this.length--;
		return x;
	}
	,clear: function() {
		this.h = null;
		this.q = null;
		this.length = 0;
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l[0] == v) {
				if(prev == null) this.h = l[1]; else prev[1] = l[1];
				if(this.q == l) this.q = prev;
				this.length--;
				return true;
			}
			prev = l;
			l = l[1];
		}
		return false;
	}
	,filter: function(f) {
		var l2 = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			if(f(v)) l2.add(v);
		}
		return l2;
	}
	,__class__: List
};
var lime_app_IModule = function() { };
$hxClasses["lime.app.IModule"] = lime_app_IModule;
lime_app_IModule.__name__ = ["lime","app","IModule"];
lime_app_IModule.prototype = {
	onGamepadAxisMove: null
	,onGamepadButtonDown: null
	,onGamepadButtonUp: null
	,onGamepadConnect: null
	,onGamepadDisconnect: null
	,onJoystickAxisMove: null
	,onJoystickButtonDown: null
	,onJoystickButtonUp: null
	,onJoystickConnect: null
	,onJoystickDisconnect: null
	,onJoystickHatMove: null
	,onJoystickTrackballMove: null
	,onKeyDown: null
	,onKeyUp: null
	,onModuleExit: null
	,onMouseDown: null
	,onMouseMove: null
	,onMouseMoveRelative: null
	,onMouseUp: null
	,onMouseWheel: null
	,onPreloadComplete: null
	,onPreloadProgress: null
	,onRenderContextLost: null
	,onRenderContextRestored: null
	,onTextEdit: null
	,onTextInput: null
	,onTouchEnd: null
	,onTouchMove: null
	,onTouchStart: null
	,onWindowActivate: null
	,onWindowClose: null
	,onWindowCreate: null
	,onWindowDeactivate: null
	,onWindowDropFile: null
	,onWindowEnter: null
	,onWindowFocusIn: null
	,onWindowFocusOut: null
	,onWindowFullscreen: null
	,onWindowLeave: null
	,onWindowMove: null
	,onWindowMinimize: null
	,onWindowResize: null
	,onWindowRestore: null
	,render: null
	,update: null
	,__class__: lime_app_IModule
};
var lime_app_Module = function() {
	this.onExit = new lime_app_Event_$Int_$Void();
};
$hxClasses["lime.app.Module"] = lime_app_Module;
lime_app_Module.__name__ = ["lime","app","Module"];
lime_app_Module.__interfaces__ = [lime_app_IModule];
lime_app_Module.prototype = {
	onExit: null
	,onGamepadAxisMove: function(gamepad,axis,value) {
	}
	,onGamepadButtonDown: function(gamepad,button) {
	}
	,onGamepadButtonUp: function(gamepad,button) {
	}
	,onGamepadConnect: function(gamepad) {
		haxe_Log.trace("onGamepadConnect (module)",{ fileName : "Module.hx", lineNumber : 64, className : "lime.app.Module", methodName : "onGamepadConnect"});
	}
	,onGamepadDisconnect: function(gamepad) {
	}
	,onJoystickAxisMove: function(joystick,axis,value) {
	}
	,onJoystickButtonDown: function(joystick,button) {
	}
	,onJoystickButtonUp: function(joystick,button) {
	}
	,onJoystickConnect: function(joystick) {
	}
	,onJoystickDisconnect: function(joystick) {
	}
	,onJoystickHatMove: function(joystick,hat,position) {
	}
	,onJoystickTrackballMove: function(joystick,trackball,value) {
	}
	,onKeyDown: function(window,keyCode,modifier) {
	}
	,onKeyUp: function(window,keyCode,modifier) {
	}
	,onModuleExit: function(code) {
	}
	,onMouseDown: function(window,x,y,button) {
	}
	,onMouseMove: function(window,x,y) {
	}
	,onMouseMoveRelative: function(window,x,y) {
	}
	,onMouseUp: function(window,x,y,button) {
	}
	,onMouseWheel: function(window,deltaX,deltaY) {
	}
	,onPreloadComplete: function() {
	}
	,onPreloadProgress: function(loaded,total) {
	}
	,onRenderContextLost: function(renderer) {
	}
	,onRenderContextRestored: function(renderer,context) {
	}
	,onTextEdit: function(window,text,start,length) {
	}
	,onTextInput: function(window,text) {
	}
	,onTouchEnd: function(touch) {
	}
	,onTouchMove: function(touch) {
	}
	,onTouchStart: function(touch) {
	}
	,onWindowActivate: function(window) {
	}
	,onWindowClose: function(window) {
	}
	,onWindowCreate: function(window) {
	}
	,onWindowDeactivate: function(window) {
	}
	,onWindowDropFile: function(window,file) {
	}
	,onWindowEnter: function(window) {
	}
	,onWindowFocusIn: function(window) {
	}
	,onWindowFocusOut: function(window) {
	}
	,onWindowFullscreen: function(window) {
	}
	,onWindowLeave: function(window) {
	}
	,onWindowMove: function(window,x,y) {
	}
	,onWindowMinimize: function(window) {
	}
	,onWindowResize: function(window,width,height) {
	}
	,onWindowRestore: function(window) {
	}
	,render: function(renderer) {
	}
	,update: function(deltaTime) {
	}
	,__class__: lime_app_Module
};
var lime_app_Application = function() {
	this.onUpdate = new lime_app_Event_$Int_$Void();
	lime_app_Module.call(this);
	if(lime_app_Application.current == null) lime_app_Application.current = this;
	this.modules = [];
	this.renderers = [];
	this.windows = [];
	this.windowByID = new haxe_ds_IntMap();
	this.backend = new lime__$backend_html5_HTML5Application(this);
	this.onExit.add($bind(this,this.onModuleExit));
	this.onUpdate.add($bind(this,this.update));
	lime_ui_Gamepad.onConnect.add($bind(this,this.__onGamepadConnect));
	lime_ui_Joystick.onConnect.add($bind(this,this.__onJoystickConnect));
	lime_ui_Touch.onStart.add($bind(this,this.onTouchStart));
	lime_ui_Touch.onMove.add($bind(this,this.onTouchMove));
	lime_ui_Touch.onEnd.add($bind(this,this.onTouchEnd));
};
$hxClasses["lime.app.Application"] = lime_app_Application;
lime_app_Application.__name__ = ["lime","app","Application"];
lime_app_Application.__super__ = lime_app_Module;
lime_app_Application.prototype = $extend(lime_app_Module.prototype,{
	config: null
	,modules: null
	,preloader: null
	,onUpdate: null
	,renderer: null
	,renderers: null
	,window: null
	,windows: null
	,backend: null
	,windowByID: null
	,addModule: function(module) {
		this.modules.push(module);
		if(this.windows.length > 0) {
			var _g = 0;
			var _g1 = this.windows;
			while(_g < _g1.length) {
				var $window = _g1[_g];
				++_g;
				module.onWindowCreate($window);
			}
			if(this.preloader == null || this.preloader.complete) module.onPreloadComplete();
		}
	}
	,addRenderer: function(renderer) {
		renderer.onRender.add((function(f,a1) {
			return function() {
				f(a1);
			};
		})($bind(this,this.render),renderer));
		renderer.onContextLost.add((function(f1,a11) {
			return function() {
				f1(a11);
			};
		})($bind(this,this.onRenderContextLost),renderer));
		renderer.onContextRestored.add((function(f2,a12) {
			return function(a2) {
				f2(a12,a2);
			};
		})($bind(this,this.onRenderContextRestored),renderer));
		this.renderers.push(renderer);
	}
	,create: function(config) {
		this.config = config;
		this.backend.create(config);
		if(config != null) {
			if(Object.prototype.hasOwnProperty.call(config,"fps")) this.backend.setFrameRate(config.fps);
			if(Object.prototype.hasOwnProperty.call(config,"windows")) {
				var _g = 0;
				var _g1 = config.windows;
				while(_g < _g1.length) {
					var windowConfig = _g1[_g];
					++_g;
					var $window = new lime_ui_Window(windowConfig);
					this.createWindow($window);
					break;
				}
			}
			if(this.preloader == null || this.preloader.complete) this.onPreloadComplete();
		}
	}
	,createWindow: function(window) {
		window.onActivate.add((function(f,a1) {
			return function() {
				f(a1);
			};
		})($bind(this,this.onWindowActivate),window));
		window.onClose.add((function(f1,a11) {
			return function() {
				f1(a11);
			};
		})($bind(this,this.onWindowClose),window));
		window.onCreate.add((function(f2,a12) {
			return function() {
				f2(a12);
			};
		})($bind(this,this.onWindowCreate),window));
		window.onDeactivate.add((function(f3,a13) {
			return function() {
				f3(a13);
			};
		})($bind(this,this.onWindowDeactivate),window));
		window.onDropFile.add((function(f4,a14) {
			return function(a2) {
				f4(a14,a2);
			};
		})($bind(this,this.onWindowDropFile),window));
		window.onEnter.add((function(f5,a15) {
			return function() {
				f5(a15);
			};
		})($bind(this,this.onWindowEnter),window));
		window.onFocusIn.add((function(f6,a16) {
			return function() {
				f6(a16);
			};
		})($bind(this,this.onWindowFocusIn),window));
		window.onFocusOut.add((function(f7,a17) {
			return function() {
				f7(a17);
			};
		})($bind(this,this.onWindowFocusOut),window));
		window.onFullscreen.add((function(f8,a18) {
			return function() {
				f8(a18);
			};
		})($bind(this,this.onWindowFullscreen),window));
		window.onKeyDown.add((function(f9,a19) {
			return function(a21,a3) {
				f9(a19,a21,a3);
			};
		})($bind(this,this.onKeyDown),window));
		window.onKeyUp.add((function(f10,a110) {
			return function(a22,a31) {
				f10(a110,a22,a31);
			};
		})($bind(this,this.onKeyUp),window));
		window.onLeave.add((function(f11,a111) {
			return function() {
				f11(a111);
			};
		})($bind(this,this.onWindowLeave),window));
		window.onMinimize.add((function(f12,a112) {
			return function() {
				f12(a112);
			};
		})($bind(this,this.onWindowMinimize),window));
		window.onMouseDown.add((function(f13,a113) {
			return function(x,y,a23) {
				f13(a113,x,y,a23);
			};
		})($bind(this,this.onMouseDown),window));
		window.onMouseMove.add((function(f14,a114) {
			return function(x1,y1) {
				f14(a114,x1,y1);
			};
		})($bind(this,this.onMouseMove),window));
		window.onMouseMoveRelative.add((function(f15,a115) {
			return function(x2,y2) {
				f15(a115,x2,y2);
			};
		})($bind(this,this.onMouseMoveRelative),window));
		window.onMouseUp.add((function(f16,a116) {
			return function(x3,y3,a24) {
				f16(a116,x3,y3,a24);
			};
		})($bind(this,this.onMouseUp),window));
		window.onMouseWheel.add((function(f17,a117) {
			return function(a25,a32) {
				f17(a117,a25,a32);
			};
		})($bind(this,this.onMouseWheel),window));
		window.onMove.add((function(f18,a118) {
			return function(x4,y4) {
				f18(a118,x4,y4);
			};
		})($bind(this,this.onWindowMove),window));
		window.onResize.add((function(f19,a119) {
			return function(a26,a33) {
				f19(a119,a26,a33);
			};
		})($bind(this,this.onWindowResize),window));
		window.onRestore.add((function(f20,a120) {
			return function() {
				f20(a120);
			};
		})($bind(this,this.onWindowRestore),window));
		window.onTextEdit.add((function(f21,a121) {
			return function(a27,a34,a4) {
				f21(a121,a27,a34,a4);
			};
		})($bind(this,this.onTextEdit),window));
		window.onTextInput.add((function(f22,a122) {
			return function(a28) {
				f22(a122,a28);
			};
		})($bind(this,this.onTextInput),window));
		if(window.renderer == null) {
			var renderer = new lime_graphics_Renderer(window);
			this.addRenderer(renderer);
		}
		window.create(this);
		this.windows.push(window);
		this.windowByID.h[window.id] = window;
		window.onCreate.dispatch();
	}
	,exec: function() {
		lime_app_Application.current = this;
		return this.backend.exec();
	}
	,onGamepadAxisMove: function(gamepad,axis,value) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onGamepadAxisMove(gamepad,axis,value);
		}
	}
	,onGamepadButtonDown: function(gamepad,button) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onGamepadButtonDown(gamepad,button);
		}
	}
	,onGamepadButtonUp: function(gamepad,button) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onGamepadButtonUp(gamepad,button);
		}
	}
	,onGamepadConnect: function(gamepad) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onGamepadConnect(gamepad);
		}
	}
	,onGamepadDisconnect: function(gamepad) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onGamepadDisconnect(gamepad);
		}
	}
	,onJoystickAxisMove: function(joystick,axis,value) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onJoystickAxisMove(joystick,axis,value);
		}
	}
	,onJoystickButtonDown: function(joystick,button) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onJoystickButtonDown(joystick,button);
		}
	}
	,onJoystickButtonUp: function(joystick,button) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onJoystickButtonUp(joystick,button);
		}
	}
	,onJoystickConnect: function(joystick) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onJoystickConnect(joystick);
		}
	}
	,onJoystickDisconnect: function(joystick) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onJoystickDisconnect(joystick);
		}
	}
	,onJoystickHatMove: function(joystick,hat,position) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onJoystickHatMove(joystick,hat,position);
		}
	}
	,onJoystickTrackballMove: function(joystick,trackball,value) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onJoystickTrackballMove(joystick,trackball,value);
		}
	}
	,onKeyDown: function(window,keyCode,modifier) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onKeyDown(window,keyCode,modifier);
		}
	}
	,onKeyUp: function(window,keyCode,modifier) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onKeyUp(window,keyCode,modifier);
		}
	}
	,onModuleExit: function(code) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onModuleExit(code);
		}
		this.backend.exit();
	}
	,onMouseDown: function(window,x,y,button) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onMouseDown(window,x,y,button);
		}
	}
	,onMouseMove: function(window,x,y) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onMouseMove(window,x,y);
		}
	}
	,onMouseMoveRelative: function(window,x,y) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onMouseMoveRelative(window,x,y);
		}
	}
	,onMouseUp: function(window,x,y,button) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onMouseUp(window,x,y,button);
		}
	}
	,onMouseWheel: function(window,deltaX,deltaY) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onMouseWheel(window,deltaX,deltaY);
		}
	}
	,onPreloadComplete: function() {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onPreloadComplete();
		}
	}
	,onPreloadProgress: function(loaded,total) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onPreloadProgress(loaded,total);
		}
	}
	,onRenderContextLost: function(renderer) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onRenderContextLost(renderer);
		}
	}
	,onRenderContextRestored: function(renderer,context) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onRenderContextRestored(renderer,context);
		}
	}
	,onTextEdit: function(window,text,start,length) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onTextEdit(window,text,start,length);
		}
	}
	,onTextInput: function(window,text) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onTextInput(window,text);
		}
	}
	,onTouchEnd: function(touch) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onTouchEnd(touch);
		}
	}
	,onTouchMove: function(touch) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onTouchMove(touch);
		}
	}
	,onTouchStart: function(touch) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onTouchStart(touch);
		}
	}
	,onWindowActivate: function(window) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowActivate(window);
		}
	}
	,onWindowClose: function(window) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowClose(window);
		}
		this.removeWindow(window);
	}
	,onWindowCreate: function(window) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowCreate(window);
		}
	}
	,onWindowDeactivate: function(window) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowDeactivate(window);
		}
	}
	,onWindowDropFile: function(window,file) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowDropFile(window,file);
		}
	}
	,onWindowEnter: function(window) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowEnter(window);
		}
	}
	,onWindowFocusIn: function(window) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowFocusIn(window);
		}
	}
	,onWindowFocusOut: function(window) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowFocusOut(window);
		}
	}
	,onWindowFullscreen: function(window) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowFullscreen(window);
		}
	}
	,onWindowLeave: function(window) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowLeave(window);
		}
	}
	,onWindowMinimize: function(window) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowMinimize(window);
		}
	}
	,onWindowMove: function(window,x,y) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowMove(window,x,y);
		}
	}
	,onWindowResize: function(window,width,height) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowResize(window,width,height);
		}
	}
	,onWindowRestore: function(window) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.onWindowRestore(window);
		}
	}
	,removeModule: function(module) {
		if(module != null) {
			module.onModuleExit(0);
			HxOverrides.remove(this.modules,module);
		}
	}
	,removeRenderer: function(renderer) {
		if(renderer != null && HxOverrides.indexOf(this.renderers,renderer,0) > -1) HxOverrides.remove(this.renderers,renderer);
	}
	,removeWindow: function(window) {
		if(window != null && this.windowByID.h.hasOwnProperty(window.id)) {
			HxOverrides.remove(this.windows,window);
			this.windowByID.remove(window.id);
			window.close();
			if(this.windows[0] == window) this.window = null;
		}
	}
	,render: function(renderer) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.render(renderer);
		}
	}
	,setPreloader: function(preloader) {
		if(this.preloader != null) {
			this.preloader.onProgress.remove($bind(this,this.onPreloadProgress));
			this.preloader.onComplete.remove($bind(this,this.onPreloadComplete));
		}
		this.preloader = preloader;
		if(preloader.complete) this.onPreloadComplete(); else {
			preloader.onProgress.add($bind(this,this.onPreloadProgress));
			preloader.onComplete.add($bind(this,this.onPreloadComplete));
		}
	}
	,update: function(deltaTime) {
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.update(deltaTime);
		}
	}
	,__onGamepadConnect: function(gamepad) {
		this.onGamepadConnect(gamepad);
		gamepad.onAxisMove.add((function(f,a1) {
			return function(a2,a3) {
				f(a1,a2,a3);
			};
		})($bind(this,this.onGamepadAxisMove),gamepad));
		gamepad.onButtonDown.add((function(f1,a11) {
			return function(a21) {
				f1(a11,a21);
			};
		})($bind(this,this.onGamepadButtonDown),gamepad));
		gamepad.onButtonUp.add((function(f2,a12) {
			return function(a22) {
				f2(a12,a22);
			};
		})($bind(this,this.onGamepadButtonUp),gamepad));
		gamepad.onDisconnect.add((function(f3,a13) {
			return function() {
				f3(a13);
			};
		})($bind(this,this.onGamepadDisconnect),gamepad));
	}
	,__onJoystickConnect: function(joystick) {
		this.onJoystickConnect(joystick);
		joystick.onAxisMove.add((function(f,a1) {
			return function(a2,a3) {
				f(a1,a2,a3);
			};
		})($bind(this,this.onJoystickAxisMove),joystick));
		joystick.onButtonDown.add((function(f1,a11) {
			return function(a21) {
				f1(a11,a21);
			};
		})($bind(this,this.onJoystickButtonDown),joystick));
		joystick.onButtonUp.add((function(f2,a12) {
			return function(a22) {
				f2(a12,a22);
			};
		})($bind(this,this.onJoystickButtonUp),joystick));
		joystick.onDisconnect.add((function(f3,a13) {
			return function() {
				f3(a13);
			};
		})($bind(this,this.onJoystickDisconnect),joystick));
		joystick.onHatMove.add((function(f4,a14) {
			return function(a23,a31) {
				f4(a14,a23,a31);
			};
		})($bind(this,this.onJoystickHatMove),joystick));
		joystick.onTrackballMove.add((function(f5,a15) {
			return function(a24,a32) {
				f5(a15,a24,a32);
			};
		})($bind(this,this.onJoystickTrackballMove),joystick));
	}
	,get_frameRate: function() {
		return this.backend.getFrameRate();
	}
	,set_frameRate: function(value) {
		return this.backend.setFrameRate(value);
	}
	,get_renderer: function() {
		return this.renderers[0];
	}
	,get_window: function() {
		return this.windows[0];
	}
	,__class__: lime_app_Application
});
var oge2d_driver_lime_App = function(gameName,assetPath) {
	if(assetPath == null) assetPath = "assets";
	if(gameName == null) gameName = "game";
	this._game = null;
	lime_app_Application.call(this);
	this._game = new oge2d_core_Game(gameName,assetPath);
};
$hxClasses["oge2d.driver.lime.App"] = oge2d_driver_lime_App;
oge2d_driver_lime_App.__name__ = ["oge2d","driver","lime","App"];
oge2d_driver_lime_App.__super__ = lime_app_Application;
oge2d_driver_lime_App.prototype = $extend(lime_app_Application.prototype,{
	_game: null
	,setupGame: function(screenWidth,screenHeight) {
		if(screenHeight == null) screenHeight = 0;
		if(screenWidth == null) screenWidth = 0;
		var _g = this;
		if(this._game == null) return;
		this._game.init(screenWidth,screenHeight,function() {
			if(_g._game.state < 0) haxe_Log.trace("Failed to initialize the game",{ fileName : "App.hx", lineNumber : 19, className : "oge2d.driver.lime.App", methodName : "setupGame"}); else haxe_Log.trace("Initialized game with screen size: " + _g._game.width + "x" + _g._game.height + " (" + _g._game.getOS() + ")",{ fileName : "App.hx", lineNumber : 22, className : "oge2d.driver.lime.App", methodName : "setupGame"});
		});
	}
	,create: function(config) {
		if(this._game != null && this._game.state >= 0) {
			haxe_Log.trace("Apply game.width and game.height: " + this._game.width + "x" + this._game.height,{ fileName : "App.hx", lineNumber : 36, className : "oge2d.driver.lime.App", methodName : "create"});
			if(Object.prototype.hasOwnProperty.call(config,"windows")) {
				var _g = 0;
				var _g1 = config.windows;
				while(_g < _g1.length) {
					var windowConfig = _g1[_g];
					++_g;
					if(Object.prototype.hasOwnProperty.call(windowConfig,"width")) windowConfig.width = this._game.width;
					if(Object.prototype.hasOwnProperty.call(windowConfig,"height")) windowConfig.height = this._game.height;
					if(Object.prototype.hasOwnProperty.call(windowConfig,"x")) windowConfig.x = this._game.width / 2;
					if(Object.prototype.hasOwnProperty.call(windowConfig,"y")) windowConfig.y = this._game.height / 2;
					break;
				}
			}
		}
		lime_app_Application.prototype.create.call(this,config);
	}
	,onKeyDown: function(_,key,_1) {
		oge2d_driver_lime_Keyboard.setKeyState(key,true);
	}
	,onKeyUp: function(_,key,_1) {
		oge2d_driver_lime_Keyboard.setKeyState(key,false);
		if(this._game != null && this._game.scene != null) {
			var eventSystem = this._game.sys("event");
			if(eventSystem != null) {
				var keyNames = oge2d_driver_lime_Keyboard.getKeyNames(key);
				var _g = 0;
				while(_g < keyNames.length) {
					var keyName = keyNames[_g];
					++_g;
					eventSystem.addSceneEvent(this._game.scene,"onKeyUp",keyName);
				}
			}
		}
	}
	,onMouseDown: function(_,x,y,button) {
		oge2d_driver_lime_Mouse.setButtonState(button,true,x,y);
	}
	,onMouseMove: function(_,x,y) {
		oge2d_driver_lime_Mouse.setPosition(x,y);
	}
	,onMouseUp: function(_,x,y,button) {
		oge2d_driver_lime_Mouse.setButtonState(button,false,x,y);
		if(this._game != null && this._game.scene != null) {
			var eventSystem = this._game.sys("event");
			if(eventSystem != null) eventSystem.addSceneEvent(this._game.scene,"onMouseUp",button);
		}
	}
	,onPreloadComplete: function() {
		{
			var _g = this.renderers[0].context;
			switch(_g[1]) {
			case 0:
				var gl = _g[2];
				oge2d_driver_lime_RendererGL.init(this.windows[0].__width,this.windows[0].__height,gl,$bind(this,this.setupGame));
				break;
			case 3:
				var sprite = _g[2];
				break;
			default:
				throw new js__$Boot_HaxeError("Unsupported render context");
			}
		}
	}
	,update: function(deltaTime) {
		if(this._game != null) this._game.update(deltaTime);
	}
	,__class__: oge2d_driver_lime_App
});
var Main = function() {
	oge2d_driver_lime_App.call(this,"stg","assets");
};
$hxClasses["Main"] = Main;
Main.__name__ = ["Main"];
Main.__super__ = oge2d_driver_lime_App;
Main.prototype = $extend(oge2d_driver_lime_App.prototype,{
	__class__: Main
});
Math.__name__ = ["Math"];
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
};
Reflect.deleteField = function(o,field) {
	if(!Object.prototype.hasOwnProperty.call(o,field)) return false;
	delete(o[field]);
	return true;
};
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = Array.prototype.slice.call(arguments);
		return f(a);
	};
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	b: null
	,add: function(x) {
		this.b += Std.string(x);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
};
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && HxOverrides.substr(s,slen - elen,elen) == end;
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
var ValueType = $hxClasses["ValueType"] = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null; else return js_Boot.getClass(o);
};
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
};
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw new js__$Boot_HaxeError("Too many arguments");
	}
	return null;
};
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
};
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw new js__$Boot_HaxeError("No such constructor " + constr);
	if(Reflect.isFunction(f)) {
		if(params == null) throw new js__$Boot_HaxeError("Constructor " + constr + " need parameters");
		return Reflect.callMethod(e,f,params);
	}
	if(params != null && params.length != 0) throw new js__$Boot_HaxeError("Constructor " + constr + " does not need parameters");
	return f;
};
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	HxOverrides.remove(a,"__class__");
	HxOverrides.remove(a,"__properties__");
	return a;
};
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
};
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = js_Boot.getClass(v);
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
Type.enumEq = function(a,b) {
	if(a == b) return true;
	try {
		if(a[0] != b[0]) return false;
		var _g1 = 2;
		var _g = a.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!Type.enumEq(a[i],b[i])) return false;
		}
		var e = a.__enum__;
		if(e != b.__enum__ || e == null) return false;
	} catch( e1 ) {
		if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
		return false;
	}
	return true;
};
var _$UInt_UInt_$Impl_$ = {};
$hxClasses["_UInt.UInt_Impl_"] = _$UInt_UInt_$Impl_$;
_$UInt_UInt_$Impl_$.__name__ = ["_UInt","UInt_Impl_"];
_$UInt_UInt_$Impl_$.gte = function(a,b) {
	var aNeg = a < 0;
	var bNeg = b < 0;
	if(aNeg != bNeg) return aNeg; else return a >= b;
};
_$UInt_UInt_$Impl_$.toFloat = function(this1) {
	var $int = this1;
	if($int < 0) return 4294967296.0 + $int; else return $int + 0.0;
};
var example_stg_battle_BattleScene = function() {
};
$hxClasses["example.stg.battle.BattleScene"] = example_stg_battle_BattleScene;
example_stg_battle_BattleScene.__name__ = ["example","stg","battle","BattleScene"];
example_stg_battle_BattleScene.sendEnemyBullet = function(scene,posX,posY,speed) {
	var display = scene.spr("player1").get("display");
	var angle = oge2d_system_Motion.getMotionAngle(posX,posY,display.posX,display.posY);
	var bullet = oge2d_system_Pool.getFreeSprite("enemy-bullet");
	if(bullet != null) {
		bullet.set_enabled(true);
		oge2d_system_Display.setPosition(bullet,posX + 4 * (angle > 270?1:-1),posY + 8);
		oge2d_system_Motion.moveOutside(bullet,speed,angle,-8,-8,648,488,function(_) {
			bullet.set_enabled(false);
		});
	}
};
example_stg_battle_BattleScene.sendBossBomb = function(scene,boss,speed) {
	if(!boss.enabled) return;
	var display = scene.spr("player1").get("display");
	var posX = boss.get("display").posX;
	var posY = boss.get("display").posY;
	var angle = oge2d_system_Motion.getMotionAngle(posX,posY + 20,display.posX,display.posY);
	var bomb = oge2d_system_Pool.getFreeSprite("bomb");
	if(bomb != null) {
		bomb.set_enabled(true);
		oge2d_system_Display.setPosition(bomb,posX + 10 * (angle > 270?1:-1),posY + 20);
		oge2d_system_Motion.moveOutside(bomb,speed,angle,-8,-8,648,488,function(_) {
			bomb.set_enabled(false);
		});
		oge2d_system_Timer.addTimer(scene,1000 + 1000 * (Std["int"](Math.random() * 100) % 4),null,function() {
			oge2d_system_Color.colorTo(bomb,[1,1,0.5,0.5],60,function(spr) {
				if(!spr.enabled) return;
				spr.set_enabled(false);
				example_stg_battle_BattleScene.sendBombBullet(scene,spr,2);
			});
		});
	}
	oge2d_system_Timer.addTimer(scene,2000 + 1000 * (Std["int"](Math.random() * 100) % 4),null,function() {
		example_stg_battle_BattleScene.sendBossBomb(scene,boss,speed);
	});
};
example_stg_battle_BattleScene.sendBombBullet = function(scene,bomb,speed) {
	var display = bomb.get("display");
	var posX = display.posX;
	var posY = display.posY;
	var _g = 0;
	while(_g < 8) {
		var i = _g++;
		var bullet = oge2d_system_Pool.getFreeSprite("enemy-bullet");
		if(bullet != null) {
			bullet.set_enabled(true);
			oge2d_system_Display.setPosition(bullet,posX,posY);
			var angle = 360 - 45 * i;
			oge2d_system_Motion.moveOutside(bullet,speed,angle,-8,-8,648,488,function(spr) {
				spr.set_enabled(false);
			});
		} else break;
	}
};
example_stg_battle_BattleScene.sendEnemyBullet4 = function(scene,enemy,speed) {
	oge2d_system_Timer.addTimer(scene,2000,null,function() {
		if(!enemy.enabled) return;
		var display = enemy.get("stage");
		var posX = display.posX;
		var posY = display.posY;
		var direction = enemy.get("animation").action;
		var _g = 0;
		while(_g < 3) {
			var i = _g++;
			oge2d_system_Timer.addTimer(scene,80 * (i + 1),null,function() {
				if(!enemy.enabled) return;
				var bullet = oge2d_system_Pool.getFreeSprite("enemy-bullet2");
				if(bullet != null) {
					bullet.set_enabled(true);
					if(direction == "left") {
						oge2d_system_Stage.setSpritePos(bullet,posX - 20,posY);
						oge2d_system_Motion.moveTo(bullet,-20,posY,speed,null,null,function(spr) {
							spr.set_enabled(false);
						});
					} else if(direction == "right") {
						oge2d_system_Stage.setSpritePos(bullet,posX + 20,posY);
						oge2d_system_Motion.moveTo(bullet,660,posY,speed,null,null,function(spr1) {
							spr1.set_enabled(false);
						});
					} else {
						oge2d_system_Stage.setSpritePos(bullet,posX,posY + 20);
						oge2d_system_Motion.moveTo(bullet,posX,oge2d_system_Stage.getStageViewY(scene) + 480 + 240,speed,null,null,function(spr2) {
							spr2.set_enabled(false);
						});
					}
				}
			});
		}
		oge2d_system_Timer.addTimer(scene,2000,null,function() {
			example_stg_battle_BattleScene.sendEnemyBullet4(scene,enemy,speed);
		});
	});
};
example_stg_battle_BattleScene.sendEnemyBullet5 = function(scene,enemy,speed) {
	oge2d_system_Timer.addTimer(scene,1000,null,function() {
		if(!enemy.enabled) return;
		var display = enemy.get("display");
		var posX = display.posX;
		var posY = display.posY;
		var _g = 0;
		while(_g < 5) {
			var i = _g++;
			var bullet = oge2d_system_Pool.getFreeSprite("enemy-bullet");
			if(bullet != null) {
				bullet.set_enabled(true);
				oge2d_system_Display.setPosition(bullet,posX,posY + 28);
				var angle = 360 - 30 * (i + 1);
				if(i == 0) angle = 315; else if(i == 1) angle = 295; else if(i == 3) angle = 245; else if(i == 4) angle = 225;
				oge2d_system_Motion.moveOutside(bullet,speed,angle,-8,-8,648,488,function(spr) {
					spr.set_enabled(false);
				});
			} else break;
		}
		oge2d_system_Timer.addTimer(scene,1000,null,function() {
			example_stg_battle_BattleScene.sendEnemyBullet5(scene,enemy,speed);
		});
	});
};
example_stg_battle_BattleScene.sendEnemy1 = function(scene,posX,posY,speed) {
	var pathData = scene.game.getJsonData("deepv","path");
	if(pathData == null) return;
	var enemy = oge2d_system_Pool.getFreeSprite("enemy1");
	if(enemy != null) {
		enemy.set_enabled(true);
		oge2d_system_Animation.reset(enemy,"down");
		oge2d_system_Animation.play(enemy,true);
		oge2d_system_Motion.applyPath(enemy,posX,posY,speed,pathData.nodes,function(spr) {
			enemy.set_enabled(false);
		},function(spr1,index,nextx,nexty) {
			if(index == 1) {
				oge2d_system_Animation.reset(spr1,"up");
				oge2d_system_Animation.play(spr1,false);
			}
		});
		oge2d_system_Timer.addTimer(scene,500 + 500 * (Std["int"](Math.random() * 100) % 4),null,function() {
			if(!enemy.enabled) return;
			var display = enemy.get("display");
			example_stg_battle_BattleScene.sendEnemyBullet(scene,display.posX,display.posY + 16,Std["int"](Math.abs(speed) + 1));
		});
	}
};
example_stg_battle_BattleScene.sendEnemy2 = function(scene,posX,posY,speed) {
	var pathData = scene.game.getJsonData("circle","path");
	if(pathData == null) return;
	var enemy = oge2d_system_Pool.getFreeSprite("enemy2");
	if(enemy != null) {
		enemy.set_enabled(true);
		oge2d_system_Motion.applyPath(enemy,posX,posY,speed,pathData.nodes,function(spr) {
			enemy.set_enabled(false);
		},function(spr1,index,nextx,nexty) {
			var display = oge2d_system_Display.getDisplay(spr1);
			display.angle = oge2d_system_Motion.getMotionAngle(display.posX,display.posY,nextx,nexty);
		});
	}
};
example_stg_battle_BattleScene.tracePlayer = function(scene,enemy,speed) {
	var player = scene.spr("player1");
	var current = enemy.get("display");
	var target = player.get("display");
	var x1 = current.posX;
	var y1 = current.posY;
	var x2 = target.posX;
	var y2 = target.posY;
	current.angle = oge2d_system_Motion.getMotionAngle(x1,y1,x2,y2);
	if(!player.enabled || oge2d_system_Color.isTwinkling(player) || (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) <= 10000) oge2d_system_Motion.moveOutside(enemy,speed,current.angle,-32,-32,672,512,function(spr) {
		spr.set_enabled(false);
	}); else {
		oge2d_system_Motion.moveTo(enemy,x2,y2,speed);
		oge2d_system_Timer.addTimer(scene,500,null,function() {
			if(!enemy.enabled) return;
			example_stg_battle_BattleScene.tracePlayer(scene,enemy,speed);
		});
	}
};
example_stg_battle_BattleScene.sendEnemy3 = function(scene,posX,posY,speed) {
	var enemy = oge2d_system_Pool.getFreeSprite("enemy3");
	if(enemy != null) {
		enemy.set_enabled(true);
		oge2d_system_Display.setPosition(enemy,posX,posY);
		example_stg_battle_BattleScene.tracePlayer(scene,enemy,speed);
	}
};
example_stg_battle_BattleScene.sendEnemy4 = function(scene,posX,posY,direction) {
	var enemy = oge2d_system_Pool.getFreeSprite("enemy4");
	if(enemy != null) {
		enemy.set_enabled(true);
		oge2d_system_Animation.reset(enemy,direction);
		oge2d_system_Stage.setSpritePos(enemy,oge2d_system_Stage.getStageViewX(scene) + posX,oge2d_system_Stage.getStageViewY(scene) + posY);
		oge2d_system_Timer.addTimer(scene,20000,null,function() {
			enemy.set_enabled(false);
		});
		example_stg_battle_BattleScene.sendEnemyBullet4(scene,enemy,4);
	}
};
example_stg_battle_BattleScene.sendEnemy5 = function(scene,posX,posY,speed) {
	var pathData = scene.game.getJsonData("hill","path");
	if(pathData == null) return;
	var enemy = oge2d_system_Pool.getFreeSprite("enemy5");
	if(enemy != null) {
		enemy.set_enabled(true);
		oge2d_system_Motion.applyPath(enemy,posX,posY,speed,pathData.nodes,function(self1) {
			if(!self1.enabled) return;
			oge2d_system_Motion.applyPath(self1,posX,posY,0 - speed,pathData.nodes,function(self2) {
				self2.set_enabled(false);
			});
		});
		example_stg_battle_BattleScene.sendEnemyBullet5(scene,enemy,4);
	}
};
example_stg_battle_BattleScene.sendEnemy6 = function(scene) {
	var player = scene.spr("player1");
	var target = player.get("display");
	var posX = target.posX;
	var posY = target.posY;
	var targetX;
	targetX = posX + 32 - Math.round(Math.random() * 16) * (Math.random() > 0.5?1:-1);
	var enemy = oge2d_system_Pool.getFreeSprite("enemy6");
	if(enemy != null) {
		enemy.set_enabled(true);
		oge2d_system_Display.setPosition(enemy,targetX,-20);
		oge2d_system_Motion.moveTo(enemy,targetX,520,2,null,null,function(spr) {
			spr.set_enabled(false);
		},function(spr1,index,total) {
			var motion = spr1.get("motion");
			if(index % 64 == 0 && motion.speed < 32) motion.speed = motion.speed * 2;
		});
	}
};
example_stg_battle_BattleScene.sendMedal = function(scene,posX,posY) {
	var medal = oge2d_system_Pool.getFreeSprite("medal");
	if(medal != null) {
		example_stg_battle_BattleScene.resetBonus(scene);
		medal.set_enabled(true);
		oge2d_system_Display.setPosition(medal,posX,posY);
		oge2d_system_Motion.moveTo(medal,posX,520,1,null,null,function(spr) {
			spr.set_enabled(false);
		});
	}
};
example_stg_battle_BattleScene.resetBonus = function(scene) {
	var profile = scene.get("player");
	if(profile != null) profile.sp = 0;
};
example_stg_battle_BattleScene.moveBoss = function(scene,boss,speed) {
	if(!boss.enabled) return;
	var pathData = scene.game.getJsonData("boss","path");
	if(pathData == null) return;
	oge2d_system_Motion.applyPath(boss,boss.get("display").posX,boss.get("display").posY,speed,pathData.nodes,function(spr) {
		example_stg_battle_BattleScene.moveBoss(scene,spr,0 - speed);
	});
};
example_stg_battle_BattleScene.sendBoss1 = function(scene,posX,posY,speed) {
	var enemy = oge2d_system_Pool.getFreeSprite("boss");
	if(enemy != null) {
		enemy.set_enabled(true);
		oge2d_system_Display.setPosition(enemy,posX,posY);
		if(posY < 0) oge2d_system_Motion.moveTo(enemy,posX,posY + 256,speed * 2,null,null,function(spr) {
			example_stg_battle_BattleScene.moveBoss(scene,spr,speed);
			if(spr.enabled) example_stg_battle_BattleScene.sendBossBomb(scene,spr,1);
		}); else if(posX < 0) oge2d_system_Motion.moveTo(enemy,posX + 256,posY,speed * 2,null,null,function(spr1) {
			example_stg_battle_BattleScene.moveBoss(scene,spr1,speed);
			if(spr1.enabled) example_stg_battle_BattleScene.sendBossBomb(scene,spr1,1);
		}); else if(posX > 0 && posY > 0) oge2d_system_Motion.moveTo(enemy,posX - 256,posY,speed * 2,null,null,function(spr2) {
			example_stg_battle_BattleScene.moveBoss(scene,spr2,speed);
			if(spr2.enabled) example_stg_battle_BattleScene.sendBossBomb(scene,spr2,1);
		}); else enemy.set_enabled(false);
	}
};
example_stg_battle_BattleScene.prototype = {
	onActive: function(scene) {
		scene.reset();
		oge2d_system_Stage.loop(scene,false);
		oge2d_system_Stage.setViewPos(scene,0,6688);
		oge2d_system_Stage.scroll(scene,0,-1);
		oge2d_system_Plot.setEnabled(scene.spr("plot1"),true);
	}
	,onInactive: function(scene) {
		scene.game.music("win").stop();
		scene.game.music("lose").stop();
		scene.game.music("boss").stop();
		scene.game.music("battle").stop();
	}
	,onOpen: function(scene) {
	}
	,onKeyUp: function(scene,keyName) {
		if(keyName == "SPACE") {
			var profile = scene.get("player");
			if(profile != null) {
				var progress = profile.progress;
				if(progress != 0) return;
			}
			if(scene.isPaused()) {
				var music = scene.game.music("battle");
				if(!music.isPaused()) music = scene.game.music("boss");
				scene.resume();
				music.resume();
				scene.spr("info1").disable();
			} else {
				var music1 = scene.game.music("battle");
				if(!music1.isPlaying()) music1 = scene.game.music("boss");
				scene.pause();
				music1.pause();
				scene.spr("info1").enable();
				oge2d_system_Text.setText(scene.spr("info1"),"PAUSED");
				scene.game.sound("pause").play();
			}
		}
	}
	,onUpdate: function(scene) {
		if(scene.isPaused()) return;
		var bombs = 0;
		var controllable = false;
		var profile = scene.get("player");
		if(profile != null) {
			bombs = profile.bombs;
			controllable = profile.controllable;
			oge2d_system_Text.setText(scene.spr("label1"),"x" + profile.lives);
			oge2d_system_Text.setText(scene.spr("label2"),"x" + bombs);
			oge2d_system_Text.setText(scene.spr("label3"),"Score: " + profile.score);
			scene.spr("bar1").get("display").width = 250 * profile.hp / 100;
		}
		var player = scene.spr("player1");
		if(player != null && player.enabled && controllable) {
			var speed = 4;
			var deltax = 0;
			var deltay = 0;
			if(oge2d_driver_lime_Keyboard.isKeyDown("UP")) deltay -= speed;
			if(oge2d_driver_lime_Keyboard.isKeyDown("DOWN")) deltay += speed;
			if(oge2d_driver_lime_Keyboard.isKeyDown("LEFT")) deltax -= speed;
			if(oge2d_driver_lime_Keyboard.isKeyDown("RIGHT")) deltax += speed;
			if(deltax != 0 || deltay != 0) {
				var bound = player.get("bound");
				if(bound.left + deltax > 0 && bound.right + deltax < scene.game.width && bound.top + deltay > 0 && bound.bottom + deltay < scene.game.height - 25) {
					var display = player.get("display");
					oge2d_system_Display.setPosition(player,display.posX + deltax,display.posY + deltay);
				}
			}
			if(oge2d_driver_lime_Keyboard.isKeyDown("LEFT_CTRL")) {
				var interval;
				var b = oge2d_driver_lime_Keyboard.getKeypressTime("LEFT_CTRL");
				interval = scene.ticks - b;
				if(_$UInt_UInt_$Impl_$.gte(interval,120)) {
					var bullet = oge2d_system_Pool.getFreeSprite("player-bullet");
					if(bullet != null) {
						var display1 = oge2d_system_Display.getDisplay(player);
						oge2d_system_Display.setPosition(bullet,display1.posX,display1.posY - 40);
						bullet.set_enabled(true);
						oge2d_system_Motion.moveTo(bullet,display1.posX,-40,8,null,null,function(spr) {
							spr.set_enabled(false);
						});
						if(profile.level > 1) {
							var leftside = oge2d_system_Pool.getFreeSprite("player-bullet2");
							if(leftside != null) {
								oge2d_system_Display.setPosition(leftside,display1.posX - 40,display1.posY - 40);
								leftside.set_enabled(true);
								oge2d_system_Motion.moveOutside(leftside,8,135,-8,-8,648,488,function(spr1) {
									spr1.set_enabled(false);
								});
							}
							var rightside = oge2d_system_Pool.getFreeSprite("player-bullet3");
							if(rightside != null) {
								oge2d_system_Display.setPosition(rightside,display1.posX + 40,display1.posY - 40);
								rightside.set_enabled(true);
								oge2d_system_Motion.moveOutside(rightside,8,45,-8,-8,648,488,function(spr2) {
									spr2.set_enabled(false);
								});
							}
						}
						player.game.sound("shoot").play();
					}
					oge2d_driver_lime_Keyboard.setKeypressTime("LEFT_CTRL",scene.ticks);
				}
			}
			if(oge2d_driver_lime_Keyboard.isKeyDown("LEFT_SHIFT") && profile != null && bombs > 0 && oge2d_system_Pool.getFreeCount("friend") >= 3) {
				profile.bombs = bombs - 1;
				var display2 = player.get("display");
				var posX = display2.posX - 80;
				var posY = 688;
				var _g = 0;
				while(_g < 3) {
					var i = _g++;
					var friend = oge2d_system_Pool.getFreeSprite("friend");
					if(friend != null) {
						oge2d_system_Display.setPosition(friend,posX,posY);
						friend.set_enabled(true);
						oge2d_system_Motion.moveTo(friend,posX,display2.posY - 48,8,null,null,function(self1) {
							oge2d_system_Timer.addTimer(scene,8000,null,function() {
								oge2d_system_Motion.moveTo(self1,self1.get("display").posX,-60,8,null,null,function(self2) {
									self2.set_enabled(false);
								});
							});
						});
						posX += 80;
					} else break;
				}
			}
		}
	}
	,__class__: example_stg_battle_BattleScene
};
var example_stg_battle_EnemySprite = function() {
};
$hxClasses["example.stg.battle.EnemySprite"] = example_stg_battle_EnemySprite;
example_stg_battle_EnemySprite.__name__ = ["example","stg","battle","EnemySprite"];
example_stg_battle_EnemySprite.prototype = {
	onActive: function(sprite) {
		var enemy = sprite.get("enemy");
		enemy.hp = enemy.maxhp;
	}
	,onCollide: function(spriteA,spriteB) {
		if(!spriteA.enabled || !spriteB.enabled) return;
		var pool = spriteB.get("pool");
		var poolName;
		if(pool == null) poolName = ""; else poolName = pool.name;
		if(poolName.indexOf("boss") >= 0) return;
		if(poolName.indexOf("bomb") >= 0) return;
		if(poolName.indexOf("enemy") >= 0) return;
		if(poolName.indexOf("medal") >= 0) return;
		if(poolName.indexOf("friend") >= 0) return;
		if(poolName.indexOf("bullet") >= 0) spriteB.set_enabled(false);
		var display = oge2d_system_Display.getDisplay(spriteA);
		if(display.posY - display.height / 2 <= 0 || display.posX + display.width / 4 <= 0) return;
		if(oge2d_system_Color.isTwinkling(spriteB)) return;
		var enemy = spriteA.get("enemy");
		enemy.hp = enemy.hp - 10;
		if(enemy.hp > 0) {
			oge2d_system_Color.colorTo(spriteA,[1,1,0.5,0.5],10);
			spriteA.game.sound("hit").play();
		} else {
			var player = spriteA.scene.get("player");
			player.score = player.score + enemy.value;
			player.sp = player.sp + enemy.bonus;
			spriteA.set_enabled(false);
			var boom = oge2d_system_Pool.getFreeSprite(enemy.maxhp >= 500?"boss-boom":enemy.maxhp >= 100?"big-boom":"small-boom");
			if(boom != null) {
				boom.set_enabled(true);
				var display1 = oge2d_system_Display.getDisplay(spriteA);
				oge2d_system_Display.setPosition(boom,display1.posX,display1.posY);
				oge2d_system_Animation.reset(boom);
				oge2d_system_Animation.play(boom,false,function(spr) {
					spr.set_enabled(false);
					if(player.sp >= 10) example_stg_battle_BattleScene.sendMedal(spr.scene,display1.posX,display1.posY);
				});
				spriteA.game.sound(enemy.maxhp >= 100?"boom2":"boom1").play();
				if(spriteA.get("pool").name == "bomb") example_stg_battle_BattleScene.sendBombBullet(spriteA.scene,spriteA,2); else if(spriteA.get("pool").name == "boss") {
					if(oge2d_system_Pool.getFreeCount("boss") >= 3) {
						player.progress = 1;
						oge2d_system_Plot.setEnabled(spriteA.scene.spr("gameover"),true);
					}
				}
			}
		}
	}
	,__class__: example_stg_battle_EnemySprite
};
var example_stg_battle_FriendSprite = function() {
};
$hxClasses["example.stg.battle.FriendSprite"] = example_stg_battle_FriendSprite;
example_stg_battle_FriendSprite.__name__ = ["example","stg","battle","FriendSprite"];
example_stg_battle_FriendSprite.prototype = {
	onCollide: function(spriteA,spriteB) {
		var pool = spriteB.get("pool");
		var poolName;
		if(pool == null) poolName = ""; else poolName = pool.name;
		if(poolName.indexOf("enemy") >= 0 && poolName.indexOf("bullet") >= 0) spriteB.set_enabled(false);
	}
	,__class__: example_stg_battle_FriendSprite
};
var example_stg_battle_PlayerSprite = function() {
};
$hxClasses["example.stg.battle.PlayerSprite"] = example_stg_battle_PlayerSprite;
example_stg_battle_PlayerSprite.__name__ = ["example","stg","battle","PlayerSprite"];
example_stg_battle_PlayerSprite.prototype = {
	onSceneOpen: function(sprite) {
		haxe_Log.trace(sprite.name + " - onSceneOpen",{ fileName : "PlayerSprite.hx", lineNumber : 22, className : "example.stg.battle.PlayerSprite", methodName : "onSceneOpen"});
	}
	,onCollide: function(spriteA,spriteB) {
		var pool = spriteB.get("pool");
		if(pool == null) return;
		var hitter = pool.name;
		var scene = spriteA.scene;
		var player = scene.get("player");
		if(hitter.indexOf("medal") >= 0) {
			spriteB.disable();
			player.level = player.level + 1;
			if(player.level > 2) player.score += 5000;
			spriteA.game.sound("levelup").play();
			return;
		}
		if(hitter.indexOf("enemy") < 0 && hitter.indexOf("boss") < 0 && hitter.indexOf("bomb") < 0) return;
		if(oge2d_system_Color.isTwinkling(spriteA)) return;
		if(hitter.indexOf("bullet") >= 0) {
			spriteB.disable();
			player.hp = player.hp - 10;
		} else if(hitter.indexOf("boss") >= 0) player.hp = 0; else player.hp = player.hp - 20;
		if(player.hp > 0) oge2d_system_Color.colorTo(spriteA,[1,1,0.5,0.5],10); else {
			spriteA.set_enabled(false);
			var boom = oge2d_system_Pool.getFreeSprite("big-boom");
			if(boom != null) {
				boom.set_enabled(true);
				var display = oge2d_system_Display.getDisplay(spriteA);
				oge2d_system_Display.setPosition(boom,display.posX,display.posY);
				oge2d_system_Animation.reset(boom);
				oge2d_system_Animation.play(boom,false,function(spr) {
					spr.set_enabled(false);
					oge2d_system_Plot.setEnabled(scene.spr("reborn"),true);
				});
				spriteA.game.sound("boom2").play();
			}
		}
	}
	,__class__: example_stg_battle_PlayerSprite
};
var example_stg_preload_PreloadScene = function() {
};
$hxClasses["example.stg.preload.PreloadScene"] = example_stg_preload_PreloadScene;
example_stg_preload_PreloadScene.__name__ = ["example","stg","preload","PreloadScene"];
example_stg_preload_PreloadScene.prototype = {
	onActive: function(scene) {
		var packNames = ["assets1","assets2"];
		scene.game.loadPacks(packNames,packNames.length,function(progress) {
			var percentage = Math.round(progress * 10000.0) / 100.0;
			oge2d_system_Text.setText(scene.spr("progress1"),"Loading packages ... " + percentage + "%");
			scene.spr("bar1").get("display").width = 400 * percentage / 100.0;
			scene.update(null,[scene.systems.get("display")]);
		},function() {
			haxe_Log.trace("loaded all packages",{ fileName : "PreloadScene.hx", lineNumber : 29, className : "example.stg.preload.PreloadScene", methodName : "onActive"});
			var sceneNames = ["menu","battle"];
			scene.game.loadScenes(sceneNames,sceneNames.length,function(progress1) {
				var percentage1 = Math.round(progress1 * 10000.0) / 100.0;
				oge2d_system_Text.setText(scene.spr("progress1"),"Loading scenes ... " + percentage1 + "%");
				scene.spr("bar1").get("display").width = 400 * percentage1 / 100.0;
				scene.update(null,[scene.systems.get("display")]);
			},function() {
				haxe_Log.trace("loaded all scenes",{ fileName : "PreloadScene.hx", lineNumber : 38, className : "example.stg.preload.PreloadScene", methodName : "onActive"});
				scene.game.setActiveScene("menu");
			});
		});
	}
	,__class__: example_stg_preload_PreloadScene
};
var format_png_Color = $hxClasses["format.png.Color"] = { __ename__ : ["format","png","Color"], __constructs__ : ["ColGrey","ColTrue","ColIndexed"] };
format_png_Color.ColGrey = function(alpha) { var $x = ["ColGrey",0,alpha]; $x.__enum__ = format_png_Color; $x.toString = $estr; return $x; };
format_png_Color.ColTrue = function(alpha) { var $x = ["ColTrue",1,alpha]; $x.__enum__ = format_png_Color; $x.toString = $estr; return $x; };
format_png_Color.ColIndexed = ["ColIndexed",2];
format_png_Color.ColIndexed.toString = $estr;
format_png_Color.ColIndexed.__enum__ = format_png_Color;
var format_png_Chunk = $hxClasses["format.png.Chunk"] = { __ename__ : ["format","png","Chunk"], __constructs__ : ["CEnd","CHeader","CData","CPalette","CUnknown"] };
format_png_Chunk.CEnd = ["CEnd",0];
format_png_Chunk.CEnd.toString = $estr;
format_png_Chunk.CEnd.__enum__ = format_png_Chunk;
format_png_Chunk.CHeader = function(h) { var $x = ["CHeader",1,h]; $x.__enum__ = format_png_Chunk; $x.toString = $estr; return $x; };
format_png_Chunk.CData = function(b) { var $x = ["CData",2,b]; $x.__enum__ = format_png_Chunk; $x.toString = $estr; return $x; };
format_png_Chunk.CPalette = function(b) { var $x = ["CPalette",3,b]; $x.__enum__ = format_png_Chunk; $x.toString = $estr; return $x; };
format_png_Chunk.CUnknown = function(id,data) { var $x = ["CUnknown",4,id,data]; $x.__enum__ = format_png_Chunk; $x.toString = $estr; return $x; };
var format_png_Reader = function(i) {
	this.i = i;
	i.set_bigEndian(true);
	this.checkCRC = true;
};
$hxClasses["format.png.Reader"] = format_png_Reader;
format_png_Reader.__name__ = ["format","png","Reader"];
format_png_Reader.prototype = {
	i: null
	,checkCRC: null
	,read: function() {
		var _g = 0;
		var _g1 = [137,80,78,71,13,10,26,10];
		while(_g < _g1.length) {
			var b = _g1[_g];
			++_g;
			if(this.i.readByte() != b) throw new js__$Boot_HaxeError("Invalid header");
		}
		var l = new List();
		while(true) {
			var c = this.readChunk();
			l.add(c);
			if(c == format_png_Chunk.CEnd) break;
		}
		return l;
	}
	,readHeader: function(i) {
		i.set_bigEndian(true);
		var width = i.readInt32();
		var height = i.readInt32();
		var colbits = i.readByte();
		var color = i.readByte();
		var color1;
		switch(color) {
		case 0:
			color1 = format_png_Color.ColGrey(false);
			break;
		case 2:
			color1 = format_png_Color.ColTrue(false);
			break;
		case 3:
			color1 = format_png_Color.ColIndexed;
			break;
		case 4:
			color1 = format_png_Color.ColGrey(true);
			break;
		case 6:
			color1 = format_png_Color.ColTrue(true);
			break;
		default:
			throw new js__$Boot_HaxeError("Unknown color model " + color + ":" + colbits);
		}
		var compress = i.readByte();
		var filter = i.readByte();
		if(compress != 0 || filter != 0) throw new js__$Boot_HaxeError("Invalid header");
		var interlace = i.readByte();
		if(interlace != 0 && interlace != 1) throw new js__$Boot_HaxeError("Invalid header");
		return { width : width, height : height, colbits : colbits, color : color1, interlaced : interlace == 1};
	}
	,readChunk: function() {
		var dataLen = this.i.readInt32();
		var id = this.i.readString(4);
		var data = this.i.read(dataLen);
		var crc = this.i.readInt32();
		if(this.checkCRC) {
			var c = new haxe_crypto_Crc32();
			var _g = 0;
			while(_g < 4) {
				var i = _g++;
				c["byte"](HxOverrides.cca(id,i));
			}
			c.update(data,0,data.length);
			if(c.get() != crc) throw new js__$Boot_HaxeError("CRC check failure");
		}
		switch(id) {
		case "IEND":
			return format_png_Chunk.CEnd;
		case "IHDR":
			return format_png_Chunk.CHeader(this.readHeader(new haxe_io_BytesInput(data)));
		case "IDAT":
			return format_png_Chunk.CData(data);
		case "PLTE":
			return format_png_Chunk.CPalette(data);
		default:
			return format_png_Chunk.CUnknown(id,data);
		}
	}
	,__class__: format_png_Reader
};
var format_png_Tools = function() { };
$hxClasses["format.png.Tools"] = format_png_Tools;
format_png_Tools.__name__ = ["format","png","Tools"];
format_png_Tools.getHeader = function(d) {
	var _g_head = d.h;
	var _g_val = null;
	while(_g_head != null) {
		var c;
		c = (function($this) {
			var $r;
			_g_val = _g_head[0];
			_g_head = _g_head[1];
			$r = _g_val;
			return $r;
		}(this));
		switch(c[1]) {
		case 1:
			var h = c[2];
			return h;
		default:
		}
	}
	throw new js__$Boot_HaxeError("Header not found");
};
format_png_Tools.getPalette = function(d) {
	var _g_head = d.h;
	var _g_val = null;
	while(_g_head != null) {
		var c;
		c = (function($this) {
			var $r;
			_g_val = _g_head[0];
			_g_head = _g_head[1];
			$r = _g_val;
			return $r;
		}(this));
		switch(c[1]) {
		case 3:
			var b = c[2];
			return b;
		default:
		}
	}
	return null;
};
format_png_Tools.filter = function(data,x,y,stride,prev,p,numChannels) {
	if(numChannels == null) numChannels = 4;
	var b;
	if(y == 0) b = 0; else b = data.b[p - stride];
	var c;
	if(x == 0 || y == 0) c = 0; else c = data.b[p - stride - numChannels];
	var k = prev + b - c;
	var pa = k - prev;
	if(pa < 0) pa = -pa;
	var pb = k - b;
	if(pb < 0) pb = -pb;
	var pc = k - c;
	if(pc < 0) pc = -pc;
	if(pa <= pb && pa <= pc) return prev; else if(pb <= pc) return b; else return c;
};
format_png_Tools.reverseBytes = function(b) {
	var p = 0;
	var _g1 = 0;
	var _g = b.length >> 2;
	while(_g1 < _g) {
		var i = _g1++;
		var b1 = b.b[p];
		var g = b.b[p + 1];
		var r = b.b[p + 2];
		var a = b.b[p + 3];
		var p1 = p++;
		b.b[p1] = a & 255;
		var p2 = p++;
		b.b[p2] = r & 255;
		var p3 = p++;
		b.b[p3] = g & 255;
		var p4 = p++;
		b.b[p4] = b1 & 255;
	}
};
format_png_Tools.extractGrey = function(d) {
	var h = format_png_Tools.getHeader(d);
	var grey = haxe_io_Bytes.alloc(h.width * h.height);
	var data = null;
	var fullData = null;
	var _g_head = d.h;
	var _g_val = null;
	while(_g_head != null) {
		var c;
		c = (function($this) {
			var $r;
			_g_val = _g_head[0];
			_g_head = _g_head[1];
			$r = _g_val;
			return $r;
		}(this));
		switch(c[1]) {
		case 2:
			var b = c[2];
			if(fullData != null) fullData.add(b); else if(data == null) data = b; else {
				fullData = new haxe_io_BytesBuffer();
				fullData.add(data);
				fullData.add(b);
				data = null;
			}
			break;
		default:
		}
	}
	if(fullData != null) data = fullData.getBytes();
	if(data == null) throw new js__$Boot_HaxeError("Data not found");
	data = format_tools_Inflate.run(data);
	var r = 0;
	var w = 0;
	{
		var _g = h.color;
		switch(_g[1]) {
		case 0:
			var alpha = _g[2];
			if(h.colbits != 8) throw new js__$Boot_HaxeError("Unsupported color mode");
			var width = h.width;
			var stride;
			stride = (alpha?2:1) * width + 1;
			if(data.length < h.height * stride) throw new js__$Boot_HaxeError("Not enough data");
			var rinc;
			if(alpha) rinc = 2; else rinc = 1;
			var _g2 = 0;
			var _g1 = h.height;
			while(_g2 < _g1) {
				var y = _g2++;
				var f = data.get(r++);
				switch(f) {
				case 0:
					var _g3 = 0;
					while(_g3 < width) {
						var x = _g3++;
						var v = data.b[r];
						r += rinc;
						grey.set(w++,v);
					}
					break;
				case 1:
					var cv = 0;
					var _g31 = 0;
					while(_g31 < width) {
						var x1 = _g31++;
						cv += data.b[r];
						r += rinc;
						grey.set(w++,cv);
					}
					break;
				case 2:
					var stride1;
					if(y == 0) stride1 = 0; else stride1 = width;
					var _g32 = 0;
					while(_g32 < width) {
						var x2 = _g32++;
						var v1 = data.b[r] + grey.b[w - stride1];
						r += rinc;
						grey.set(w++,v1);
					}
					break;
				case 3:
					var cv1 = 0;
					var stride2;
					if(y == 0) stride2 = 0; else stride2 = width;
					var _g33 = 0;
					while(_g33 < width) {
						var x3 = _g33++;
						cv1 = data.b[r] + (cv1 + grey.b[w - stride2] >> 1) & 255;
						r += rinc;
						grey.set(w++,cv1);
					}
					break;
				case 4:
					var stride3 = width;
					var cv2 = 0;
					var _g34 = 0;
					while(_g34 < width) {
						var x4 = _g34++;
						cv2 = format_png_Tools.filter(grey,x4,y,stride3,cv2,w,1) + data.b[r] & 255;
						r += rinc;
						grey.set(w++,cv2);
					}
					break;
				default:
					throw new js__$Boot_HaxeError("Invalid filter " + f);
				}
			}
			break;
		default:
			throw new js__$Boot_HaxeError("Unsupported color mode");
		}
	}
	return grey;
};
format_png_Tools.extract32 = function(d,bytes,flipY) {
	var h = format_png_Tools.getHeader(d);
	var bgra;
	if(bytes == null) bgra = haxe_io_Bytes.alloc(h.width * h.height * 4); else bgra = bytes;
	var data = null;
	var fullData = null;
	var _g_head = d.h;
	var _g_val = null;
	while(_g_head != null) {
		var c;
		c = (function($this) {
			var $r;
			_g_val = _g_head[0];
			_g_head = _g_head[1];
			$r = _g_val;
			return $r;
		}(this));
		switch(c[1]) {
		case 2:
			var b = c[2];
			if(fullData != null) fullData.add(b); else if(data == null) data = b; else {
				fullData = new haxe_io_BytesBuffer();
				fullData.add(data);
				fullData.add(b);
				data = null;
			}
			break;
		default:
		}
	}
	if(fullData != null) data = fullData.getBytes();
	if(data == null) throw new js__$Boot_HaxeError("Data not found");
	data = format_tools_Inflate.run(data);
	var r = 0;
	var w = 0;
	var lineDelta = 0;
	if(flipY) {
		lineDelta = -h.width * 8;
		w = (h.height - 1) * (h.width * 4);
	}
	var flipY1;
	if(flipY) flipY1 = -1; else flipY1 = 1;
	{
		var _g = h.color;
		switch(_g[1]) {
		case 2:
			var pal = format_png_Tools.getPalette(d);
			if(pal == null) throw new js__$Boot_HaxeError("PNG Palette is missing");
			var alpha = null;
			var _g1_head = d.h;
			var _g1_val = null;
			try {
				while(_g1_head != null) {
					var t;
					t = (function($this) {
						var $r;
						_g1_val = _g1_head[0];
						_g1_head = _g1_head[1];
						$r = _g1_val;
						return $r;
					}(this));
					switch(t[1]) {
					case 4:
						switch(t[2]) {
						case "tRNS":
							var data1 = t[3];
							alpha = data1;
							throw "__break__";
							break;
						default:
						}
						break;
					default:
					}
				}
			} catch( e ) { if( e != "__break__" ) throw e; }
			if(alpha != null && alpha.length < 1 << h.colbits) {
				var alpha2 = haxe_io_Bytes.alloc(1 << h.colbits);
				alpha2.blit(0,alpha,0,alpha.length);
				alpha2.fill(alpha.length,alpha2.length - alpha.length,255);
				alpha = alpha2;
			}
			var width = h.width;
			var stride = Math.ceil(width * h.colbits / 8) + 1;
			if(data.length < h.height * stride) throw new js__$Boot_HaxeError("Not enough data");
			var rline = h.width * h.colbits >> 3;
			var _g2 = 0;
			var _g1 = h.height;
			while(_g2 < _g1) {
				var y = _g2++;
				var f = data.get(r++);
				if(f == 0) {
					r += rline;
					continue;
				}
				switch(f) {
				case 1:
					var c1 = 0;
					var _g3 = 0;
					while(_g3 < width) {
						var x = _g3++;
						var v = data.b[r];
						c1 += v;
						data.set(r++,c1 & 255);
					}
					break;
				case 2:
					var stride1;
					if(y == 0) stride1 = 0; else stride1 = rline + 1;
					var _g31 = 0;
					while(_g31 < width) {
						var x1 = _g31++;
						var v1 = data.b[r];
						data.b[r] = v1 + data.b[r - stride1] & 255;
						r++;
					}
					break;
				case 3:
					var c2 = 0;
					var stride2;
					if(y == 0) stride2 = 0; else stride2 = rline + 1;
					var _g32 = 0;
					while(_g32 < width) {
						var x2 = _g32++;
						var v2 = data.b[r];
						c2 = v2 + (c2 + data.b[r - stride2] >> 1) & 255;
						data.set(r++,c2);
					}
					break;
				case 4:
					var stride3 = rline + 1;
					var c3 = 0;
					var _g33 = 0;
					while(_g33 < width) {
						var x3 = _g33++;
						var v3 = data.b[r];
						c3 = format_png_Tools.filter(data,x3,y,stride3,c3,r,1) + v3 & 255;
						data.set(r++,c3);
					}
					break;
				default:
					throw new js__$Boot_HaxeError("Invalid filter " + f);
				}
			}
			var r1 = 0;
			if(h.colbits == 8) {
				var _g21 = 0;
				var _g11 = h.height;
				while(_g21 < _g11) {
					var y1 = _g21++;
					r1++;
					var _g4 = 0;
					var _g34 = h.width;
					while(_g4 < _g34) {
						var x4 = _g4++;
						var c4 = data.get(r1++);
						bgra.set(w++,pal.b[c4 * 3 + 2]);
						bgra.set(w++,pal.b[c4 * 3 + 1]);
						bgra.set(w++,pal.b[c4 * 3]);
						bgra.set(w++,alpha != null?alpha.b[c4]:255);
					}
					w += lineDelta;
				}
			} else if(h.colbits < 8) {
				var req = h.colbits;
				var mask = (1 << req) - 1;
				var _g22 = 0;
				var _g12 = h.height;
				while(_g22 < _g12) {
					var y2 = _g22++;
					r1++;
					var bits = 0;
					var nbits = 0;
					var v4;
					var _g41 = 0;
					var _g35 = h.width;
					while(_g41 < _g35) {
						var x5 = _g41++;
						if(nbits < req) {
							bits = bits << 8 | data.get(r1++);
							nbits += 8;
						}
						var c5 = bits >>> nbits - req & mask;
						nbits -= req;
						bgra.set(w++,pal.b[c5 * 3 + 2]);
						bgra.set(w++,pal.b[c5 * 3 + 1]);
						bgra.set(w++,pal.b[c5 * 3]);
						bgra.set(w++,alpha != null?alpha.b[c5]:255);
					}
					w += lineDelta;
				}
			} else throw new js__$Boot_HaxeError(h.colbits + " indexed bits per pixel not supported");
			break;
		case 0:
			var alpha1 = _g[2];
			if(h.colbits != 8) throw new js__$Boot_HaxeError("Unsupported color mode");
			var width1 = h.width;
			var stride4;
			stride4 = (alpha1?2:1) * width1 + 1;
			if(data.length < h.height * stride4) throw new js__$Boot_HaxeError("Not enough data");
			var _g23 = 0;
			var _g13 = h.height;
			while(_g23 < _g13) {
				var y3 = _g23++;
				var f1 = data.get(r++);
				switch(f1) {
				case 0:
					if(alpha1) {
						var _g36 = 0;
						while(_g36 < width1) {
							var x6 = _g36++;
							var v5 = data.get(r++);
							bgra.set(w++,v5);
							bgra.set(w++,v5);
							bgra.set(w++,v5);
							bgra.set(w++,data.get(r++));
						}
					} else {
						var _g37 = 0;
						while(_g37 < width1) {
							var x7 = _g37++;
							var v6 = data.get(r++);
							bgra.set(w++,v6);
							bgra.set(w++,v6);
							bgra.set(w++,v6);
							bgra.set(w++,255);
						}
					}
					break;
				case 1:
					var cv = 0;
					var ca = 0;
					if(alpha1) {
						var _g38 = 0;
						while(_g38 < width1) {
							var x8 = _g38++;
							cv += data.get(r++);
							bgra.set(w++,cv);
							bgra.set(w++,cv);
							bgra.set(w++,cv);
							ca += data.get(r++);
							bgra.set(w++,ca);
						}
					} else {
						var _g39 = 0;
						while(_g39 < width1) {
							var x9 = _g39++;
							cv += data.get(r++);
							bgra.set(w++,cv);
							bgra.set(w++,cv);
							bgra.set(w++,cv);
							bgra.set(w++,255);
						}
					}
					break;
				case 2:
					var stride5;
					if(y3 == 0) stride5 = 0; else stride5 = width1 * 4 * flipY1;
					if(alpha1) {
						var _g310 = 0;
						while(_g310 < width1) {
							var x10 = _g310++;
							var v7 = data.get(r++) + bgra.b[w - stride5];
							bgra.set(w++,v7);
							bgra.set(w++,v7);
							bgra.set(w++,v7);
							bgra.set(w++,data.get(r++) + bgra.b[w - stride5]);
						}
					} else {
						var _g311 = 0;
						while(_g311 < width1) {
							var x11 = _g311++;
							var v8 = data.get(r++) + bgra.b[w - stride5];
							bgra.set(w++,v8);
							bgra.set(w++,v8);
							bgra.set(w++,v8);
							bgra.set(w++,255);
						}
					}
					break;
				case 3:
					var cv1 = 0;
					var ca1 = 0;
					var stride6;
					if(y3 == 0) stride6 = 0; else stride6 = width1 * 4 * flipY1;
					if(alpha1) {
						var _g312 = 0;
						while(_g312 < width1) {
							var x12 = _g312++;
							cv1 = data.get(r++) + (cv1 + bgra.b[w - stride6] >> 1) & 255;
							bgra.set(w++,cv1);
							bgra.set(w++,cv1);
							bgra.set(w++,cv1);
							ca1 = data.get(r++) + (ca1 + bgra.b[w - stride6] >> 1) & 255;
							bgra.set(w++,ca1);
						}
					} else {
						var _g313 = 0;
						while(_g313 < width1) {
							var x13 = _g313++;
							cv1 = data.get(r++) + (cv1 + bgra.b[w - stride6] >> 1) & 255;
							bgra.set(w++,cv1);
							bgra.set(w++,cv1);
							bgra.set(w++,cv1);
							bgra.set(w++,255);
						}
					}
					break;
				case 4:
					var stride7 = width1 * 4 * flipY1;
					var cv2 = 0;
					var ca2 = 0;
					if(alpha1) {
						var _g314 = 0;
						while(_g314 < width1) {
							var x14 = _g314++;
							cv2 = format_png_Tools.filter(bgra,x14,y3,stride7,cv2,w,null) + data.get(r++) & 255;
							bgra.set(w++,cv2);
							bgra.set(w++,cv2);
							bgra.set(w++,cv2);
							ca2 = format_png_Tools.filter(bgra,x14,y3,stride7,ca2,w,null) + data.get(r++) & 255;
							bgra.set(w++,ca2);
						}
					} else {
						var _g315 = 0;
						while(_g315 < width1) {
							var x15 = _g315++;
							cv2 = format_png_Tools.filter(bgra,x15,y3,stride7,cv2,w,null) + data.get(r++) & 255;
							bgra.set(w++,cv2);
							bgra.set(w++,cv2);
							bgra.set(w++,cv2);
							bgra.set(w++,255);
						}
					}
					break;
				default:
					throw new js__$Boot_HaxeError("Invalid filter " + f1);
				}
				w += lineDelta;
			}
			break;
		case 1:
			var alpha3 = _g[2];
			if(h.colbits != 8) throw new js__$Boot_HaxeError("Unsupported color mode");
			var width2 = h.width;
			var stride8;
			stride8 = (alpha3?4:3) * width2 + 1;
			if(data.length < h.height * stride8) throw new js__$Boot_HaxeError("Not enough data");
			var _g24 = 0;
			var _g14 = h.height;
			while(_g24 < _g14) {
				var y4 = _g24++;
				var f2 = data.get(r++);
				switch(f2) {
				case 0:
					if(alpha3) {
						var _g316 = 0;
						while(_g316 < width2) {
							var x16 = _g316++;
							bgra.set(w++,data.b[r + 2]);
							bgra.set(w++,data.b[r + 1]);
							bgra.set(w++,data.b[r]);
							bgra.set(w++,data.b[r + 3]);
							r += 4;
						}
					} else {
						var _g317 = 0;
						while(_g317 < width2) {
							var x17 = _g317++;
							bgra.set(w++,data.b[r + 2]);
							bgra.set(w++,data.b[r + 1]);
							bgra.set(w++,data.b[r]);
							bgra.set(w++,255);
							r += 3;
						}
					}
					break;
				case 1:
					var cr = 0;
					var cg = 0;
					var cb = 0;
					var ca3 = 0;
					if(alpha3) {
						var _g318 = 0;
						while(_g318 < width2) {
							var x18 = _g318++;
							cb += data.b[r + 2];
							bgra.set(w++,cb);
							cg += data.b[r + 1];
							bgra.set(w++,cg);
							cr += data.b[r];
							bgra.set(w++,cr);
							ca3 += data.b[r + 3];
							bgra.set(w++,ca3);
							r += 4;
						}
					} else {
						var _g319 = 0;
						while(_g319 < width2) {
							var x19 = _g319++;
							cb += data.b[r + 2];
							bgra.set(w++,cb);
							cg += data.b[r + 1];
							bgra.set(w++,cg);
							cr += data.b[r];
							bgra.set(w++,cr);
							bgra.set(w++,255);
							r += 3;
						}
					}
					break;
				case 2:
					var stride9;
					if(y4 == 0) stride9 = 0; else stride9 = width2 * 4 * flipY1;
					if(alpha3) {
						var _g320 = 0;
						while(_g320 < width2) {
							var x20 = _g320++;
							bgra.b[w] = data.b[r + 2] + bgra.b[w - stride9] & 255;
							w++;
							bgra.b[w] = data.b[r + 1] + bgra.b[w - stride9] & 255;
							w++;
							bgra.b[w] = data.b[r] + bgra.b[w - stride9] & 255;
							w++;
							bgra.b[w] = data.b[r + 3] + bgra.b[w - stride9] & 255;
							w++;
							r += 4;
						}
					} else {
						var _g321 = 0;
						while(_g321 < width2) {
							var x21 = _g321++;
							bgra.b[w] = data.b[r + 2] + bgra.b[w - stride9] & 255;
							w++;
							bgra.b[w] = data.b[r + 1] + bgra.b[w - stride9] & 255;
							w++;
							bgra.b[w] = data.b[r] + bgra.b[w - stride9] & 255;
							w++;
							bgra.set(w++,255);
							r += 3;
						}
					}
					break;
				case 3:
					var cr1 = 0;
					var cg1 = 0;
					var cb1 = 0;
					var ca4 = 0;
					var stride10;
					if(y4 == 0) stride10 = 0; else stride10 = width2 * 4 * flipY1;
					if(alpha3) {
						var _g322 = 0;
						while(_g322 < width2) {
							var x22 = _g322++;
							cb1 = data.b[r + 2] + (cb1 + bgra.b[w - stride10] >> 1) & 255;
							bgra.set(w++,cb1);
							cg1 = data.b[r + 1] + (cg1 + bgra.b[w - stride10] >> 1) & 255;
							bgra.set(w++,cg1);
							cr1 = data.b[r] + (cr1 + bgra.b[w - stride10] >> 1) & 255;
							bgra.set(w++,cr1);
							ca4 = data.b[r + 3] + (ca4 + bgra.b[w - stride10] >> 1) & 255;
							bgra.set(w++,ca4);
							r += 4;
						}
					} else {
						var _g323 = 0;
						while(_g323 < width2) {
							var x23 = _g323++;
							cb1 = data.b[r + 2] + (cb1 + bgra.b[w - stride10] >> 1) & 255;
							bgra.set(w++,cb1);
							cg1 = data.b[r + 1] + (cg1 + bgra.b[w - stride10] >> 1) & 255;
							bgra.set(w++,cg1);
							cr1 = data.b[r] + (cr1 + bgra.b[w - stride10] >> 1) & 255;
							bgra.set(w++,cr1);
							bgra.set(w++,255);
							r += 3;
						}
					}
					break;
				case 4:
					var stride11 = width2 * 4 * flipY1;
					var cr2 = 0;
					var cg2 = 0;
					var cb2 = 0;
					var ca5 = 0;
					if(alpha3) {
						var _g324 = 0;
						while(_g324 < width2) {
							var x24 = _g324++;
							cb2 = format_png_Tools.filter(bgra,x24,y4,stride11,cb2,w,null) + data.b[r + 2] & 255;
							bgra.set(w++,cb2);
							cg2 = format_png_Tools.filter(bgra,x24,y4,stride11,cg2,w,null) + data.b[r + 1] & 255;
							bgra.set(w++,cg2);
							cr2 = format_png_Tools.filter(bgra,x24,y4,stride11,cr2,w,null) + data.b[r] & 255;
							bgra.set(w++,cr2);
							ca5 = format_png_Tools.filter(bgra,x24,y4,stride11,ca5,w,null) + data.b[r + 3] & 255;
							bgra.set(w++,ca5);
							r += 4;
						}
					} else {
						var _g325 = 0;
						while(_g325 < width2) {
							var x25 = _g325++;
							cb2 = format_png_Tools.filter(bgra,x25,y4,stride11,cb2,w,null) + data.b[r + 2] & 255;
							bgra.set(w++,cb2);
							cg2 = format_png_Tools.filter(bgra,x25,y4,stride11,cg2,w,null) + data.b[r + 1] & 255;
							bgra.set(w++,cg2);
							cr2 = format_png_Tools.filter(bgra,x25,y4,stride11,cr2,w,null) + data.b[r] & 255;
							bgra.set(w++,cr2);
							bgra.set(w++,255);
							r += 3;
						}
					}
					break;
				default:
					throw new js__$Boot_HaxeError("Invalid filter " + f2);
				}
				w += lineDelta;
			}
			break;
		}
	}
	return bgra;
};
format_png_Tools.buildGrey = function(width,height,data) {
	var rgb = haxe_io_Bytes.alloc(width * height + height);
	var w = 0;
	var r = 0;
	var _g = 0;
	while(_g < height) {
		var y = _g++;
		rgb.set(w++,0);
		var _g1 = 0;
		while(_g1 < width) {
			var x = _g1++;
			rgb.set(w++,data.get(r++));
		}
	}
	var l = new List();
	l.add(format_png_Chunk.CHeader({ width : width, height : height, colbits : 8, color : format_png_Color.ColGrey(false), interlaced : false}));
	l.add(format_png_Chunk.CData(format_tools_Deflate.run(rgb)));
	l.add(format_png_Chunk.CEnd);
	return l;
};
format_png_Tools.buildRGB = function(width,height,data) {
	var rgb = haxe_io_Bytes.alloc(width * height * 3 + height);
	var w = 0;
	var r = 0;
	var _g = 0;
	while(_g < height) {
		var y = _g++;
		rgb.set(w++,0);
		var _g1 = 0;
		while(_g1 < width) {
			var x = _g1++;
			rgb.set(w++,data.b[r + 2]);
			rgb.set(w++,data.b[r + 1]);
			rgb.set(w++,data.b[r]);
			r += 3;
		}
	}
	var l = new List();
	l.add(format_png_Chunk.CHeader({ width : width, height : height, colbits : 8, color : format_png_Color.ColTrue(false), interlaced : false}));
	l.add(format_png_Chunk.CData(format_tools_Deflate.run(rgb)));
	l.add(format_png_Chunk.CEnd);
	return l;
};
format_png_Tools.build32ARGB = function(width,height,data) {
	var rgba = haxe_io_Bytes.alloc(width * height * 4 + height);
	var w = 0;
	var r = 0;
	var _g = 0;
	while(_g < height) {
		var y = _g++;
		rgba.set(w++,0);
		var _g1 = 0;
		while(_g1 < width) {
			var x = _g1++;
			rgba.set(w++,data.b[r + 1]);
			rgba.set(w++,data.b[r + 2]);
			rgba.set(w++,data.b[r + 3]);
			rgba.set(w++,data.b[r]);
			r += 4;
		}
	}
	var l = new List();
	l.add(format_png_Chunk.CHeader({ width : width, height : height, colbits : 8, color : format_png_Color.ColTrue(true), interlaced : false}));
	l.add(format_png_Chunk.CData(format_tools_Deflate.run(rgba)));
	l.add(format_png_Chunk.CEnd);
	return l;
};
format_png_Tools.build32BGRA = function(width,height,data) {
	var rgba = haxe_io_Bytes.alloc(width * height * 4 + height);
	var w = 0;
	var r = 0;
	var _g = 0;
	while(_g < height) {
		var y = _g++;
		rgba.set(w++,0);
		var _g1 = 0;
		while(_g1 < width) {
			var x = _g1++;
			rgba.set(w++,data.b[r + 2]);
			rgba.set(w++,data.b[r + 1]);
			rgba.set(w++,data.b[r]);
			rgba.set(w++,data.b[r + 3]);
			r += 4;
		}
	}
	var l = new List();
	l.add(format_png_Chunk.CHeader({ width : width, height : height, colbits : 8, color : format_png_Color.ColTrue(true), interlaced : false}));
	l.add(format_png_Chunk.CData(format_tools_Deflate.run(rgba)));
	l.add(format_png_Chunk.CEnd);
	return l;
};
var format_png_Writer = function(o) {
	this.o = o;
	o.set_bigEndian(true);
};
$hxClasses["format.png.Writer"] = format_png_Writer;
format_png_Writer.__name__ = ["format","png","Writer"];
format_png_Writer.prototype = {
	o: null
	,write: function(png) {
		var _g = 0;
		var _g1 = [137,80,78,71,13,10,26,10];
		while(_g < _g1.length) {
			var b = _g1[_g];
			++_g;
			this.o.writeByte(b);
		}
		var _g_head = png.h;
		var _g_val = null;
		while(_g_head != null) {
			var c;
			c = (function($this) {
				var $r;
				_g_val = _g_head[0];
				_g_head = _g_head[1];
				$r = _g_val;
				return $r;
			}(this));
			switch(c[1]) {
			case 1:
				var h = c[2];
				var b1 = new haxe_io_BytesOutput();
				b1.set_bigEndian(true);
				b1.writeInt32(h.width);
				b1.writeInt32(h.height);
				b1.writeByte(h.colbits);
				b1.writeByte((function($this) {
					var $r;
					var _g2 = h.color;
					$r = (function($this) {
						var $r;
						switch(_g2[1]) {
						case 0:
							$r = (function($this) {
								var $r;
								var alpha = _g2[2];
								$r = alpha?4:0;
								return $r;
							}($this));
							break;
						case 1:
							$r = (function($this) {
								var $r;
								var alpha1 = _g2[2];
								$r = alpha1?6:2;
								return $r;
							}($this));
							break;
						case 2:
							$r = 3;
							break;
						}
						return $r;
					}($this));
					return $r;
				}(this)));
				b1.writeByte(0);
				b1.writeByte(0);
				b1.writeByte(h.interlaced?1:0);
				this.writeChunk("IHDR",b1.getBytes());
				break;
			case 0:
				this.writeChunk("IEND",haxe_io_Bytes.alloc(0));
				break;
			case 2:
				var d = c[2];
				this.writeChunk("IDAT",d);
				break;
			case 3:
				var b2 = c[2];
				this.writeChunk("PLTE",b2);
				break;
			case 4:
				var data = c[3];
				var id = c[2];
				this.writeChunk(id,data);
				break;
			}
		}
	}
	,writeChunk: function(id,data) {
		this.o.writeInt32(data.length);
		this.o.writeString(id);
		this.o.write(data);
		var crc = new haxe_crypto_Crc32();
		var _g = 0;
		while(_g < 4) {
			var i = _g++;
			crc["byte"](HxOverrides.cca(id,i));
		}
		crc.update(data,0,data.length);
		this.o.writeInt32(crc.get());
	}
	,__class__: format_png_Writer
};
var format_tools_Adler32 = function() {
	this.a1 = 1;
	this.a2 = 0;
};
$hxClasses["format.tools.Adler32"] = format_tools_Adler32;
format_tools_Adler32.__name__ = ["format","tools","Adler32"];
format_tools_Adler32.read = function(i) {
	var a = new format_tools_Adler32();
	var a2a = i.readByte();
	var a2b = i.readByte();
	var a1a = i.readByte();
	var a1b = i.readByte();
	a.a1 = a1a << 8 | a1b;
	a.a2 = a2a << 8 | a2b;
	return a;
};
format_tools_Adler32.prototype = {
	a1: null
	,a2: null
	,update: function(b,pos,len) {
		var a1 = this.a1;
		var a2 = this.a2;
		var _g1 = pos;
		var _g = pos + len;
		while(_g1 < _g) {
			var p = _g1++;
			var c = b.b[p];
			a1 = (a1 + c) % 65521;
			a2 = (a2 + a1) % 65521;
		}
		this.a1 = a1;
		this.a2 = a2;
	}
	,equals: function(a) {
		return a.a1 == this.a1 && a.a2 == this.a2;
	}
	,__class__: format_tools_Adler32
};
var format_tools_Deflate = function() { };
$hxClasses["format.tools.Deflate"] = format_tools_Deflate;
format_tools_Deflate.__name__ = ["format","tools","Deflate"];
format_tools_Deflate.run = function(b) {
	throw new js__$Boot_HaxeError("Deflate is not supported on this platform");
	return null;
};
var format_tools_Huffman = $hxClasses["format.tools.Huffman"] = { __ename__ : ["format","tools","Huffman"], __constructs__ : ["Found","NeedBit","NeedBits"] };
format_tools_Huffman.Found = function(i) { var $x = ["Found",0,i]; $x.__enum__ = format_tools_Huffman; $x.toString = $estr; return $x; };
format_tools_Huffman.NeedBit = function(left,right) { var $x = ["NeedBit",1,left,right]; $x.__enum__ = format_tools_Huffman; $x.toString = $estr; return $x; };
format_tools_Huffman.NeedBits = function(n,table) { var $x = ["NeedBits",2,n,table]; $x.__enum__ = format_tools_Huffman; $x.toString = $estr; return $x; };
var format_tools_HuffTools = function() {
};
$hxClasses["format.tools.HuffTools"] = format_tools_HuffTools;
format_tools_HuffTools.__name__ = ["format","tools","HuffTools"];
format_tools_HuffTools.prototype = {
	treeDepth: function(t) {
		switch(t[1]) {
		case 0:
			return 0;
		case 2:
			throw new js__$Boot_HaxeError("assert");
			break;
		case 1:
			var b = t[3];
			var a = t[2];
			var da = this.treeDepth(a);
			var db = this.treeDepth(b);
			return 1 + (da < db?da:db);
		}
	}
	,treeCompress: function(t) {
		var d = this.treeDepth(t);
		if(d == 0) return t;
		if(d == 1) switch(t[1]) {
		case 1:
			var b = t[3];
			var a = t[2];
			return format_tools_Huffman.NeedBit(this.treeCompress(a),this.treeCompress(b));
		default:
			throw new js__$Boot_HaxeError("assert");
		}
		var size = 1 << d;
		var table = [];
		var _g = 0;
		while(_g < size) {
			var i = _g++;
			table.push(format_tools_Huffman.Found(-1));
		}
		this.treeWalk(table,0,0,d,t);
		return format_tools_Huffman.NeedBits(d,table);
	}
	,treeWalk: function(table,p,cd,d,t) {
		switch(t[1]) {
		case 1:
			var b = t[3];
			var a = t[2];
			if(d > 0) {
				this.treeWalk(table,p,cd + 1,d - 1,a);
				this.treeWalk(table,p | 1 << cd,cd + 1,d - 1,b);
			} else table[p] = this.treeCompress(t);
			break;
		default:
			table[p] = this.treeCompress(t);
		}
	}
	,treeMake: function(bits,maxbits,v,len) {
		if(len > maxbits) throw new js__$Boot_HaxeError("Invalid huffman");
		var idx = v << 5 | len;
		if(bits.h.hasOwnProperty(idx)) return format_tools_Huffman.Found(bits.h[idx]);
		v <<= 1;
		len += 1;
		return format_tools_Huffman.NeedBit(this.treeMake(bits,maxbits,v,len),this.treeMake(bits,maxbits,v | 1,len));
	}
	,make: function(lengths,pos,nlengths,maxbits) {
		var counts = [];
		var tmp = [];
		if(maxbits > 32) throw new js__$Boot_HaxeError("Invalid huffman");
		var _g = 0;
		while(_g < maxbits) {
			var i = _g++;
			counts.push(0);
			tmp.push(0);
		}
		var _g1 = 0;
		while(_g1 < nlengths) {
			var i1 = _g1++;
			var p = lengths[i1 + pos];
			if(p >= maxbits) throw new js__$Boot_HaxeError("Invalid huffman");
			counts[p]++;
		}
		var code = 0;
		var _g11 = 1;
		var _g2 = maxbits - 1;
		while(_g11 < _g2) {
			var i2 = _g11++;
			code = code + counts[i2] << 1;
			tmp[i2] = code;
		}
		var bits = new haxe_ds_IntMap();
		var _g3 = 0;
		while(_g3 < nlengths) {
			var i3 = _g3++;
			var l = lengths[i3 + pos];
			if(l != 0) {
				var n = tmp[l - 1];
				tmp[l - 1] = n + 1;
				bits.h[n << 5 | l] = i3;
			}
		}
		return this.treeCompress(format_tools_Huffman.NeedBit(this.treeMake(bits,maxbits,0,1),this.treeMake(bits,maxbits,1,1)));
	}
	,__class__: format_tools_HuffTools
};
var format_tools_Inflate = function() { };
$hxClasses["format.tools.Inflate"] = format_tools_Inflate;
format_tools_Inflate.__name__ = ["format","tools","Inflate"];
format_tools_Inflate.run = function(bytes) {
	return format_tools_InflateImpl.run(new haxe_io_BytesInput(bytes));
};
var format_tools__$InflateImpl_Window = function(hasCrc) {
	this.buffer = haxe_io_Bytes.alloc(65536);
	this.pos = 0;
	if(hasCrc) this.crc = new format_tools_Adler32();
};
$hxClasses["format.tools._InflateImpl.Window"] = format_tools__$InflateImpl_Window;
format_tools__$InflateImpl_Window.__name__ = ["format","tools","_InflateImpl","Window"];
format_tools__$InflateImpl_Window.prototype = {
	buffer: null
	,pos: null
	,crc: null
	,slide: function() {
		if(this.crc != null) this.crc.update(this.buffer,0,32768);
		var b = haxe_io_Bytes.alloc(65536);
		this.pos -= 32768;
		b.blit(0,this.buffer,32768,this.pos);
		this.buffer = b;
	}
	,addBytes: function(b,p,len) {
		if(this.pos + len > 65536) this.slide();
		this.buffer.blit(this.pos,b,p,len);
		this.pos += len;
	}
	,addByte: function(c) {
		if(this.pos == 65536) this.slide();
		this.buffer.b[this.pos] = c & 255;
		this.pos++;
	}
	,getLastChar: function() {
		return this.buffer.b[this.pos - 1];
	}
	,available: function() {
		return this.pos;
	}
	,checksum: function() {
		if(this.crc != null) this.crc.update(this.buffer,0,this.pos);
		return this.crc;
	}
	,__class__: format_tools__$InflateImpl_Window
};
var format_tools__$InflateImpl_State = $hxClasses["format.tools._InflateImpl.State"] = { __ename__ : ["format","tools","_InflateImpl","State"], __constructs__ : ["Head","Block","CData","Flat","Crc","Dist","DistOne","Done"] };
format_tools__$InflateImpl_State.Head = ["Head",0];
format_tools__$InflateImpl_State.Head.toString = $estr;
format_tools__$InflateImpl_State.Head.__enum__ = format_tools__$InflateImpl_State;
format_tools__$InflateImpl_State.Block = ["Block",1];
format_tools__$InflateImpl_State.Block.toString = $estr;
format_tools__$InflateImpl_State.Block.__enum__ = format_tools__$InflateImpl_State;
format_tools__$InflateImpl_State.CData = ["CData",2];
format_tools__$InflateImpl_State.CData.toString = $estr;
format_tools__$InflateImpl_State.CData.__enum__ = format_tools__$InflateImpl_State;
format_tools__$InflateImpl_State.Flat = ["Flat",3];
format_tools__$InflateImpl_State.Flat.toString = $estr;
format_tools__$InflateImpl_State.Flat.__enum__ = format_tools__$InflateImpl_State;
format_tools__$InflateImpl_State.Crc = ["Crc",4];
format_tools__$InflateImpl_State.Crc.toString = $estr;
format_tools__$InflateImpl_State.Crc.__enum__ = format_tools__$InflateImpl_State;
format_tools__$InflateImpl_State.Dist = ["Dist",5];
format_tools__$InflateImpl_State.Dist.toString = $estr;
format_tools__$InflateImpl_State.Dist.__enum__ = format_tools__$InflateImpl_State;
format_tools__$InflateImpl_State.DistOne = ["DistOne",6];
format_tools__$InflateImpl_State.DistOne.toString = $estr;
format_tools__$InflateImpl_State.DistOne.__enum__ = format_tools__$InflateImpl_State;
format_tools__$InflateImpl_State.Done = ["Done",7];
format_tools__$InflateImpl_State.Done.toString = $estr;
format_tools__$InflateImpl_State.Done.__enum__ = format_tools__$InflateImpl_State;
var format_tools_InflateImpl = function(i,header,crc) {
	if(crc == null) crc = true;
	if(header == null) header = true;
	this["final"] = false;
	this.htools = new format_tools_HuffTools();
	this.huffman = this.buildFixedHuffman();
	this.huffdist = null;
	this.len = 0;
	this.dist = 0;
	if(header) this.state = format_tools__$InflateImpl_State.Head; else this.state = format_tools__$InflateImpl_State.Block;
	this.input = i;
	this.bits = 0;
	this.nbits = 0;
	this.needed = 0;
	this.output = null;
	this.outpos = 0;
	this.lengths = [];
	var _g = 0;
	while(_g < 19) {
		var i1 = _g++;
		this.lengths.push(-1);
	}
	this.window = new format_tools__$InflateImpl_Window(crc);
};
$hxClasses["format.tools.InflateImpl"] = format_tools_InflateImpl;
format_tools_InflateImpl.__name__ = ["format","tools","InflateImpl"];
format_tools_InflateImpl.run = function(i,bufsize) {
	if(bufsize == null) bufsize = 65536;
	var buf = haxe_io_Bytes.alloc(bufsize);
	var output = new haxe_io_BytesBuffer();
	var inflate = new format_tools_InflateImpl(i);
	while(true) {
		var len = inflate.readBytes(buf,0,bufsize);
		output.addBytes(buf,0,len);
		if(len < bufsize) break;
	}
	return output.getBytes();
};
format_tools_InflateImpl.prototype = {
	nbits: null
	,bits: null
	,state: null
	,'final': null
	,huffman: null
	,huffdist: null
	,htools: null
	,len: null
	,dist: null
	,needed: null
	,output: null
	,outpos: null
	,input: null
	,lengths: null
	,window: null
	,buildFixedHuffman: function() {
		if(format_tools_InflateImpl.FIXED_HUFFMAN != null) return format_tools_InflateImpl.FIXED_HUFFMAN;
		var a = [];
		var _g = 0;
		while(_g < 288) {
			var n = _g++;
			a.push(n <= 143?8:n <= 255?9:n <= 279?7:8);
		}
		format_tools_InflateImpl.FIXED_HUFFMAN = this.htools.make(a,0,288,10);
		return format_tools_InflateImpl.FIXED_HUFFMAN;
	}
	,readBytes: function(b,pos,len) {
		this.needed = len;
		this.outpos = pos;
		this.output = b;
		if(len > 0) while(this.inflateLoop()) {
		}
		return len - this.needed;
	}
	,getBits: function(n) {
		while(this.nbits < n) {
			this.bits |= this.input.readByte() << this.nbits;
			this.nbits += 8;
		}
		var b = this.bits & (1 << n) - 1;
		this.nbits -= n;
		this.bits >>= n;
		return b;
	}
	,getBit: function() {
		if(this.nbits == 0) {
			this.nbits = 8;
			this.bits = this.input.readByte();
		}
		var b = (this.bits & 1) == 1;
		this.nbits--;
		this.bits >>= 1;
		return b;
	}
	,getRevBits: function(n) {
		if(n == 0) return 0; else if(this.getBit()) return 1 << n - 1 | this.getRevBits(n - 1); else return this.getRevBits(n - 1);
	}
	,resetBits: function() {
		this.bits = 0;
		this.nbits = 0;
	}
	,addBytes: function(b,p,len) {
		this.window.addBytes(b,p,len);
		this.output.blit(this.outpos,b,p,len);
		this.needed -= len;
		this.outpos += len;
	}
	,addByte: function(b) {
		this.window.addByte(b);
		this.output.b[this.outpos] = b & 255;
		this.needed--;
		this.outpos++;
	}
	,addDistOne: function(n) {
		var c = this.window.getLastChar();
		var _g = 0;
		while(_g < n) {
			var i = _g++;
			this.addByte(c);
		}
	}
	,addDist: function(d,len) {
		this.addBytes(this.window.buffer,this.window.pos - d,len);
	}
	,applyHuffman: function(h) {
		switch(h[1]) {
		case 0:
			var n = h[2];
			return n;
		case 1:
			var b = h[3];
			var a = h[2];
			return this.applyHuffman(this.getBit()?b:a);
		case 2:
			var tbl = h[3];
			var n1 = h[2];
			return this.applyHuffman(tbl[this.getBits(n1)]);
		}
	}
	,inflateLengths: function(a,max) {
		var i = 0;
		var prev = 0;
		while(i < max) {
			var n = this.applyHuffman(this.huffman);
			switch(n) {
			case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:case 8:case 9:case 10:case 11:case 12:case 13:case 14:case 15:
				prev = n;
				a[i] = n;
				i++;
				break;
			case 16:
				var end = i + 3 + this.getBits(2);
				if(end > max) throw new js__$Boot_HaxeError("Invalid data");
				while(i < end) {
					a[i] = prev;
					i++;
				}
				break;
			case 17:
				i += 3 + this.getBits(3);
				if(i > max) throw new js__$Boot_HaxeError("Invalid data");
				break;
			case 18:
				i += 11 + this.getBits(7);
				if(i > max) throw new js__$Boot_HaxeError("Invalid data");
				break;
			default:
				throw new js__$Boot_HaxeError("Invalid data");
			}
		}
	}
	,inflateLoop: function() {
		var _g = this.state;
		switch(_g[1]) {
		case 0:
			var cmf = this.input.readByte();
			var cm = cmf & 15;
			var cinfo = cmf >> 4;
			if(cm != 8) throw new js__$Boot_HaxeError("Invalid data");
			var flg = this.input.readByte();
			var fdict = (flg & 32) != 0;
			if(((cmf << 8) + flg) % 31 != 0) throw new js__$Boot_HaxeError("Invalid data");
			if(fdict) throw new js__$Boot_HaxeError("Unsupported dictionary");
			this.state = format_tools__$InflateImpl_State.Block;
			return true;
		case 4:
			var calc = this.window.checksum();
			if(calc == null) {
				this.state = format_tools__$InflateImpl_State.Done;
				return true;
			}
			var crc = format_tools_Adler32.read(this.input);
			if(!calc.equals(crc)) throw new js__$Boot_HaxeError("Invalid CRC");
			this.state = format_tools__$InflateImpl_State.Done;
			return true;
		case 7:
			return false;
		case 1:
			this["final"] = this.getBit();
			var _g1 = this.getBits(2);
			switch(_g1) {
			case 0:
				this.len = this.input.readUInt16();
				var nlen = this.input.readUInt16();
				if(nlen != 65535 - this.len) throw new js__$Boot_HaxeError("Invalid data");
				this.state = format_tools__$InflateImpl_State.Flat;
				var r = this.inflateLoop();
				this.resetBits();
				return r;
			case 1:
				this.huffman = this.buildFixedHuffman();
				this.huffdist = null;
				this.state = format_tools__$InflateImpl_State.CData;
				return true;
			case 2:
				var hlit = this.getBits(5) + 257;
				var hdist = this.getBits(5) + 1;
				var hclen = this.getBits(4) + 4;
				var _g2 = 0;
				while(_g2 < hclen) {
					var i = _g2++;
					this.lengths[format_tools_InflateImpl.CODE_LENGTHS_POS[i]] = this.getBits(3);
				}
				var _g21 = hclen;
				while(_g21 < 19) {
					var i1 = _g21++;
					this.lengths[format_tools_InflateImpl.CODE_LENGTHS_POS[i1]] = 0;
				}
				this.huffman = this.htools.make(this.lengths,0,19,8);
				var lengths = [];
				var _g3 = 0;
				var _g22 = hlit + hdist;
				while(_g3 < _g22) {
					var i2 = _g3++;
					lengths.push(0);
				}
				this.inflateLengths(lengths,hlit + hdist);
				this.huffdist = this.htools.make(lengths,hlit,hdist,16);
				this.huffman = this.htools.make(lengths,0,hlit,16);
				this.state = format_tools__$InflateImpl_State.CData;
				return true;
			default:
				throw new js__$Boot_HaxeError("Invalid data");
			}
			break;
		case 3:
			var rlen;
			if(this.len < this.needed) rlen = this.len; else rlen = this.needed;
			var bytes = this.input.read(rlen);
			this.len -= rlen;
			this.addBytes(bytes,0,rlen);
			if(this.len == 0) if(this["final"]) this.state = format_tools__$InflateImpl_State.Crc; else this.state = format_tools__$InflateImpl_State.Block;
			return this.needed > 0;
		case 6:
			var rlen1;
			if(this.len < this.needed) rlen1 = this.len; else rlen1 = this.needed;
			this.addDistOne(rlen1);
			this.len -= rlen1;
			if(this.len == 0) this.state = format_tools__$InflateImpl_State.CData;
			return this.needed > 0;
		case 5:
			while(this.len > 0 && this.needed > 0) {
				var rdist;
				if(this.len < this.dist) rdist = this.len; else rdist = this.dist;
				var rlen2;
				if(this.needed < rdist) rlen2 = this.needed; else rlen2 = rdist;
				this.addDist(this.dist,rlen2);
				this.len -= rlen2;
			}
			if(this.len == 0) this.state = format_tools__$InflateImpl_State.CData;
			return this.needed > 0;
		case 2:
			var n = this.applyHuffman(this.huffman);
			if(n < 256) {
				this.addByte(n);
				return this.needed > 0;
			} else if(n == 256) {
				if(this["final"]) this.state = format_tools__$InflateImpl_State.Crc; else this.state = format_tools__$InflateImpl_State.Block;
				return true;
			} else {
				n -= 257;
				var extra_bits = format_tools_InflateImpl.LEN_EXTRA_BITS_TBL[n];
				if(extra_bits == -1) throw new js__$Boot_HaxeError("Invalid data");
				this.len = format_tools_InflateImpl.LEN_BASE_VAL_TBL[n] + this.getBits(extra_bits);
				var dist_code;
				if(this.huffdist == null) dist_code = this.getRevBits(5); else dist_code = this.applyHuffman(this.huffdist);
				extra_bits = format_tools_InflateImpl.DIST_EXTRA_BITS_TBL[dist_code];
				if(extra_bits == -1) throw new js__$Boot_HaxeError("Invalid data");
				this.dist = format_tools_InflateImpl.DIST_BASE_VAL_TBL[dist_code] + this.getBits(extra_bits);
				if(this.dist > this.window.available()) throw new js__$Boot_HaxeError("Invalid data");
				if(this.dist == 1) this.state = format_tools__$InflateImpl_State.DistOne; else this.state = format_tools__$InflateImpl_State.Dist;
				return true;
			}
			break;
		}
	}
	,__class__: format_tools_InflateImpl
};
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = ["haxe","IMap"];
haxe_IMap.prototype = {
	set: null
	,__class__: haxe_IMap
};
var haxe__$Int64__$_$_$Int64 = function(high,low) {
	this.high = high;
	this.low = low;
};
$hxClasses["haxe._Int64.___Int64"] = haxe__$Int64__$_$_$Int64;
haxe__$Int64__$_$_$Int64.__name__ = ["haxe","_Int64","___Int64"];
haxe__$Int64__$_$_$Int64.prototype = {
	high: null
	,low: null
	,__class__: haxe__$Int64__$_$_$Int64
};
var haxe_Log = function() { };
$hxClasses["haxe.Log"] = haxe_Log;
haxe_Log.__name__ = ["haxe","Log"];
haxe_Log.trace = function(v,infos) {
	js_Boot.__trace(v,infos);
};
var haxe_Serializer = function() {
	this.buf = new StringBuf();
	this.cache = [];
	this.useCache = haxe_Serializer.USE_CACHE;
	this.useEnumIndex = haxe_Serializer.USE_ENUM_INDEX;
	this.shash = new haxe_ds_StringMap();
	this.scount = 0;
};
$hxClasses["haxe.Serializer"] = haxe_Serializer;
haxe_Serializer.__name__ = ["haxe","Serializer"];
haxe_Serializer.prototype = {
	buf: null
	,cache: null
	,shash: null
	,scount: null
	,useCache: null
	,useEnumIndex: null
	,toString: function() {
		return this.buf.b;
	}
	,serializeString: function(s) {
		var x = this.shash.get(s);
		if(x != null) {
			this.buf.b += "R";
			if(x == null) this.buf.b += "null"; else this.buf.b += "" + x;
			return;
		}
		this.shash.set(s,this.scount++);
		this.buf.b += "y";
		s = encodeURIComponent(s);
		if(s.length == null) this.buf.b += "null"; else this.buf.b += "" + s.length;
		this.buf.b += ":";
		if(s == null) this.buf.b += "null"; else this.buf.b += "" + s;
	}
	,serializeRef: function(v) {
		var vt = typeof(v);
		var _g1 = 0;
		var _g = this.cache.length;
		while(_g1 < _g) {
			var i = _g1++;
			var ci = this.cache[i];
			if(typeof(ci) == vt && ci == v) {
				this.buf.b += "r";
				if(i == null) this.buf.b += "null"; else this.buf.b += "" + i;
				return true;
			}
		}
		this.cache.push(v);
		return false;
	}
	,serializeFields: function(v) {
		var _g = 0;
		var _g1 = Reflect.fields(v);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			this.serializeString(f);
			this.serialize(Reflect.field(v,f));
		}
		this.buf.b += "g";
	}
	,serialize: function(v) {
		{
			var _g = Type["typeof"](v);
			switch(_g[1]) {
			case 0:
				this.buf.b += "n";
				break;
			case 1:
				var v1 = v;
				if(v1 == 0) {
					this.buf.b += "z";
					return;
				}
				this.buf.b += "i";
				if(v1 == null) this.buf.b += "null"; else this.buf.b += "" + v1;
				break;
			case 2:
				var v2 = v;
				if(isNaN(v2)) this.buf.b += "k"; else if(!isFinite(v2)) if(v2 < 0) this.buf.b += "m"; else this.buf.b += "p"; else {
					this.buf.b += "d";
					if(v2 == null) this.buf.b += "null"; else this.buf.b += "" + v2;
				}
				break;
			case 3:
				if(v) this.buf.b += "t"; else this.buf.b += "f";
				break;
			case 6:
				var c = _g[2];
				if(c == String) {
					this.serializeString(v);
					return;
				}
				if(this.useCache && this.serializeRef(v)) return;
				switch(c) {
				case Array:
					var ucount = 0;
					this.buf.b += "a";
					var l = v.length;
					var _g1 = 0;
					while(_g1 < l) {
						var i = _g1++;
						if(v[i] == null) ucount++; else {
							if(ucount > 0) {
								if(ucount == 1) this.buf.b += "n"; else {
									this.buf.b += "u";
									if(ucount == null) this.buf.b += "null"; else this.buf.b += "" + ucount;
								}
								ucount = 0;
							}
							this.serialize(v[i]);
						}
					}
					if(ucount > 0) {
						if(ucount == 1) this.buf.b += "n"; else {
							this.buf.b += "u";
							if(ucount == null) this.buf.b += "null"; else this.buf.b += "" + ucount;
						}
					}
					this.buf.b += "h";
					break;
				case List:
					this.buf.b += "l";
					var v3 = v;
					var _g1_head = v3.h;
					var _g1_val = null;
					while(_g1_head != null) {
						var i1;
						_g1_val = _g1_head[0];
						_g1_head = _g1_head[1];
						i1 = _g1_val;
						this.serialize(i1);
					}
					this.buf.b += "h";
					break;
				case Date:
					var d = v;
					this.buf.b += "v";
					this.buf.add(d.getTime());
					break;
				case haxe_ds_StringMap:
					this.buf.b += "b";
					var v4 = v;
					var $it0 = v4.keys();
					while( $it0.hasNext() ) {
						var k = $it0.next();
						this.serializeString(k);
						this.serialize(__map_reserved[k] != null?v4.getReserved(k):v4.h[k]);
					}
					this.buf.b += "h";
					break;
				case haxe_ds_IntMap:
					this.buf.b += "q";
					var v5 = v;
					var $it1 = v5.keys();
					while( $it1.hasNext() ) {
						var k1 = $it1.next();
						this.buf.b += ":";
						if(k1 == null) this.buf.b += "null"; else this.buf.b += "" + k1;
						this.serialize(v5.h[k1]);
					}
					this.buf.b += "h";
					break;
				case haxe_ds_ObjectMap:
					this.buf.b += "M";
					var v6 = v;
					var $it2 = v6.keys();
					while( $it2.hasNext() ) {
						var k2 = $it2.next();
						var id = Reflect.field(k2,"__id__");
						Reflect.deleteField(k2,"__id__");
						this.serialize(k2);
						k2.__id__ = id;
						this.serialize(v6.h[k2.__id__]);
					}
					this.buf.b += "h";
					break;
				case haxe_io_Bytes:
					var v7 = v;
					var i2 = 0;
					var max = v7.length - 2;
					var charsBuf = new StringBuf();
					var b64 = haxe_Serializer.BASE64;
					while(i2 < max) {
						var b1 = v7.get(i2++);
						var b2 = v7.get(i2++);
						var b3 = v7.get(i2++);
						charsBuf.add(b64.charAt(b1 >> 2));
						charsBuf.add(b64.charAt((b1 << 4 | b2 >> 4) & 63));
						charsBuf.add(b64.charAt((b2 << 2 | b3 >> 6) & 63));
						charsBuf.add(b64.charAt(b3 & 63));
					}
					if(i2 == max) {
						var b11 = v7.get(i2++);
						var b21 = v7.get(i2++);
						charsBuf.add(b64.charAt(b11 >> 2));
						charsBuf.add(b64.charAt((b11 << 4 | b21 >> 4) & 63));
						charsBuf.add(b64.charAt(b21 << 2 & 63));
					} else if(i2 == max + 1) {
						var b12 = v7.get(i2++);
						charsBuf.add(b64.charAt(b12 >> 2));
						charsBuf.add(b64.charAt(b12 << 4 & 63));
					}
					var chars = charsBuf.b;
					this.buf.b += "s";
					if(chars.length == null) this.buf.b += "null"; else this.buf.b += "" + chars.length;
					this.buf.b += ":";
					if(chars == null) this.buf.b += "null"; else this.buf.b += "" + chars;
					break;
				default:
					if(this.useCache) this.cache.pop();
					if(v.hxSerialize != null) {
						this.buf.b += "C";
						this.serializeString(Type.getClassName(c));
						if(this.useCache) this.cache.push(v);
						v.hxSerialize(this);
						this.buf.b += "g";
					} else {
						this.buf.b += "c";
						this.serializeString(Type.getClassName(c));
						if(this.useCache) this.cache.push(v);
						this.serializeFields(v);
					}
				}
				break;
			case 4:
				if(js_Boot.__instanceof(v,Class)) {
					var className = Type.getClassName(v);
					this.buf.b += "A";
					this.serializeString(className);
				} else if(js_Boot.__instanceof(v,Enum)) {
					this.buf.b += "B";
					this.serializeString(Type.getEnumName(v));
				} else {
					if(this.useCache && this.serializeRef(v)) return;
					this.buf.b += "o";
					this.serializeFields(v);
				}
				break;
			case 7:
				var e = _g[2];
				if(this.useCache) {
					if(this.serializeRef(v)) return;
					this.cache.pop();
				}
				if(this.useEnumIndex) this.buf.b += "j"; else this.buf.b += "w";
				this.serializeString(Type.getEnumName(e));
				if(this.useEnumIndex) {
					this.buf.b += ":";
					this.buf.b += Std.string(v[1]);
				} else this.serializeString(v[0]);
				this.buf.b += ":";
				var l1 = v.length;
				this.buf.b += Std.string(l1 - 2);
				var _g11 = 2;
				while(_g11 < l1) {
					var i3 = _g11++;
					this.serialize(v[i3]);
				}
				if(this.useCache) this.cache.push(v);
				break;
			case 5:
				throw new js__$Boot_HaxeError("Cannot serialize function");
				break;
			default:
				throw new js__$Boot_HaxeError("Cannot serialize " + Std.string(v));
			}
		}
	}
	,__class__: haxe_Serializer
};
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe_Timer;
haxe_Timer.__name__ = ["haxe","Timer"];
haxe_Timer.delay = function(f,time_ms) {
	var t = new haxe_Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe_Timer.measure = function(f,pos) {
	var t0 = haxe_Timer.stamp();
	var r = f();
	haxe_Log.trace(haxe_Timer.stamp() - t0 + "s",pos);
	return r;
};
haxe_Timer.stamp = function() {
	return new Date().getTime() / 1000;
};
haxe_Timer.prototype = {
	id: null
	,stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe_Timer
};
var haxe_Unserializer = function(buf) {
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = [];
	this.cache = [];
	var r = haxe_Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe_Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
};
$hxClasses["haxe.Unserializer"] = haxe_Unserializer;
haxe_Unserializer.__name__ = ["haxe","Unserializer"];
haxe_Unserializer.initCodes = function() {
	var codes = [];
	var _g1 = 0;
	var _g = haxe_Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe_Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
};
haxe_Unserializer.prototype = {
	buf: null
	,pos: null
	,length: null
	,cache: null
	,scache: null
	,resolver: null
	,setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_1) {
			return null;
		}}; else this.resolver = r;
	}
	,get: function(p) {
		return this.buf.charCodeAt(p);
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) break;
			if(c == 45) {
				if(this.pos != fpos) break;
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) break;
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) k *= -1;
		return k;
	}
	,readFloat: function() {
		var p1 = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
		}
		return Std.parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw new js__$Boot_HaxeError("Invalid object");
			if(this.buf.charCodeAt(this.pos) == 103) break;
			var k = this.unserialize();
			if(!(typeof(k) == "string")) throw new js__$Boot_HaxeError("Invalid object key");
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.get(this.pos++) != 58) throw new js__$Boot_HaxeError("Invalid enum format");
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = [];
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserialize: function() {
		var _g = this.get(this.pos++);
		switch(_g) {
		case 110:
			return null;
		case 116:
			return true;
		case 102:
			return false;
		case 122:
			return 0;
		case 105:
			return this.readDigits();
		case 100:
			return this.readFloat();
		case 121:
			var len = this.readDigits();
			if(this.get(this.pos++) != 58 || this.length - this.pos < len) throw new js__$Boot_HaxeError("Invalid string length");
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = decodeURIComponent(s.split("+").join(" "));
			this.scache.push(s);
			return s;
		case 107:
			return NaN;
		case 109:
			return -Infinity;
		case 112:
			return Infinity;
		case 97:
			var buf = this.buf;
			var a = [];
			this.cache.push(a);
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c == 104) {
					this.pos++;
					break;
				}
				if(c == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else a.push(this.unserialize());
			}
			return a;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 114:
			var n1 = this.readDigits();
			if(n1 < 0 || n1 >= this.cache.length) throw new js__$Boot_HaxeError("Invalid reference");
			return this.cache[n1];
		case 82:
			var n2 = this.readDigits();
			if(n2 < 0 || n2 >= this.scache.length) throw new js__$Boot_HaxeError("Invalid string reference");
			return this.scache[n2];
		case 120:
			throw new js__$Boot_HaxeError(this.unserialize());
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw new js__$Boot_HaxeError("Class not found " + name);
			var o1 = Type.createEmptyInstance(cl);
			this.cache.push(o1);
			this.unserializeObject(o1);
			return o1;
		case 119:
			var name1 = this.unserialize();
			var edecl = this.resolver.resolveEnum(name1);
			if(edecl == null) throw new js__$Boot_HaxeError("Enum not found " + name1);
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name2 = this.unserialize();
			var edecl1 = this.resolver.resolveEnum(name2);
			if(edecl1 == null) throw new js__$Boot_HaxeError("Enum not found " + name2);
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl1)[index];
			if(tag == null) throw new js__$Boot_HaxeError("Unknown enum index " + name2 + "@" + index);
			var e1 = this.unserializeEnum(edecl1,tag);
			this.cache.push(e1);
			return e1;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf1 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new haxe_ds_StringMap();
			this.cache.push(h);
			var buf2 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s1 = this.unserialize();
				h.set(s1,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
			var h1 = new haxe_ds_IntMap();
			this.cache.push(h1);
			var buf3 = this.buf;
			var c1 = this.get(this.pos++);
			while(c1 == 58) {
				var i = this.readDigits();
				h1.set(i,this.unserialize());
				c1 = this.get(this.pos++);
			}
			if(c1 != 104) throw new js__$Boot_HaxeError("Invalid IntMap format");
			return h1;
		case 77:
			var h2 = new haxe_ds_ObjectMap();
			this.cache.push(h2);
			var buf4 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s2 = this.unserialize();
				h2.set(s2,this.unserialize());
			}
			this.pos++;
			return h2;
		case 118:
			var d;
			if(this.buf.charCodeAt(this.pos) >= 48 && this.buf.charCodeAt(this.pos) <= 57 && this.buf.charCodeAt(this.pos + 1) >= 48 && this.buf.charCodeAt(this.pos + 1) <= 57 && this.buf.charCodeAt(this.pos + 2) >= 48 && this.buf.charCodeAt(this.pos + 2) <= 57 && this.buf.charCodeAt(this.pos + 3) >= 48 && this.buf.charCodeAt(this.pos + 3) <= 57 && this.buf.charCodeAt(this.pos + 4) == 45) {
				var s3 = HxOverrides.substr(this.buf,this.pos,19);
				d = HxOverrides.strDate(s3);
				this.pos += 19;
			} else {
				var t = this.readFloat();
				var d1 = new Date();
				d1.setTime(t);
				d = d1;
			}
			this.cache.push(d);
			return d;
		case 115:
			var len1 = this.readDigits();
			var buf5 = this.buf;
			if(this.get(this.pos++) != 58 || this.length - this.pos < len1) throw new js__$Boot_HaxeError("Invalid bytes length");
			var codes = haxe_Unserializer.CODES;
			if(codes == null) {
				codes = haxe_Unserializer.initCodes();
				haxe_Unserializer.CODES = codes;
			}
			var i1 = this.pos;
			var rest = len1 & 3;
			var size;
			size = (len1 >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i1 + (len1 - rest);
			var bytes = haxe_io_Bytes.alloc(size);
			var bpos = 0;
			while(i1 < max) {
				var c11 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c2 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c11 << 2 | c2 >> 4);
				var c3 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c2 << 4 | c3 >> 2);
				var c4 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c3 << 6 | c4);
			}
			if(rest >= 2) {
				var c12 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c21 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c12 << 2 | c21 >> 4);
				if(rest == 3) {
					var c31 = codes[StringTools.fastCodeAt(buf5,i1++)];
					bytes.set(bpos++,c21 << 4 | c31 >> 2);
				}
			}
			this.pos += len1;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name3 = this.unserialize();
			var cl1 = this.resolver.resolveClass(name3);
			if(cl1 == null) throw new js__$Boot_HaxeError("Class not found " + name3);
			var o2 = Type.createEmptyInstance(cl1);
			this.cache.push(o2);
			o2.hxUnserialize(this);
			if(this.get(this.pos++) != 103) throw new js__$Boot_HaxeError("Invalid custom data");
			return o2;
		case 65:
			var name4 = this.unserialize();
			var cl2 = this.resolver.resolveClass(name4);
			if(cl2 == null) throw new js__$Boot_HaxeError("Class not found " + name4);
			return cl2;
		case 66:
			var name5 = this.unserialize();
			var e2 = this.resolver.resolveEnum(name5);
			if(e2 == null) throw new js__$Boot_HaxeError("Enum not found " + name5);
			return e2;
		default:
		}
		this.pos--;
		throw new js__$Boot_HaxeError("Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos);
	}
	,__class__: haxe_Unserializer
};
var haxe_crypto_Adler32 = function() {
	this.a1 = 1;
	this.a2 = 0;
};
$hxClasses["haxe.crypto.Adler32"] = haxe_crypto_Adler32;
haxe_crypto_Adler32.__name__ = ["haxe","crypto","Adler32"];
haxe_crypto_Adler32.read = function(i) {
	var a = new haxe_crypto_Adler32();
	var a2a = i.readByte();
	var a2b = i.readByte();
	var a1a = i.readByte();
	var a1b = i.readByte();
	a.a1 = a1a << 8 | a1b;
	a.a2 = a2a << 8 | a2b;
	return a;
};
haxe_crypto_Adler32.prototype = {
	a1: null
	,a2: null
	,update: function(b,pos,len) {
		var a1 = this.a1;
		var a2 = this.a2;
		var _g1 = pos;
		var _g = pos + len;
		while(_g1 < _g) {
			var p = _g1++;
			var c = b.b[p];
			a1 = (a1 + c) % 65521;
			a2 = (a2 + a1) % 65521;
		}
		this.a1 = a1;
		this.a2 = a2;
	}
	,equals: function(a) {
		return a.a1 == this.a1 && a.a2 == this.a2;
	}
	,__class__: haxe_crypto_Adler32
};
var haxe_crypto_BaseCode = function(base) {
	var len = base.length;
	var nbits = 1;
	while(len > 1 << nbits) nbits++;
	if(nbits > 8 || len != 1 << nbits) throw new js__$Boot_HaxeError("BaseCode : base length must be a power of two.");
	this.base = base;
	this.nbits = nbits;
};
$hxClasses["haxe.crypto.BaseCode"] = haxe_crypto_BaseCode;
haxe_crypto_BaseCode.__name__ = ["haxe","crypto","BaseCode"];
haxe_crypto_BaseCode.prototype = {
	base: null
	,nbits: null
	,encodeBytes: function(b) {
		var nbits = this.nbits;
		var base = this.base;
		var size = b.length * 8 / nbits | 0;
		var out = haxe_io_Bytes.alloc(size + (b.length * 8 % nbits == 0?0:1));
		var buf = 0;
		var curbits = 0;
		var mask = (1 << nbits) - 1;
		var pin = 0;
		var pout = 0;
		while(pout < size) {
			while(curbits < nbits) {
				curbits += 8;
				buf <<= 8;
				buf |= b.get(pin++);
			}
			curbits -= nbits;
			out.set(pout++,base.b[buf >> curbits & mask]);
		}
		if(curbits > 0) out.set(pout++,base.b[buf << nbits - curbits & mask]);
		return out;
	}
	,__class__: haxe_crypto_BaseCode
};
var haxe_crypto_Crc32 = function() {
	this.crc = -1;
};
$hxClasses["haxe.crypto.Crc32"] = haxe_crypto_Crc32;
haxe_crypto_Crc32.__name__ = ["haxe","crypto","Crc32"];
haxe_crypto_Crc32.prototype = {
	crc: null
	,'byte': function(b) {
		var tmp = (this.crc ^ b) & 255;
		var _g = 0;
		while(_g < 8) {
			var j = _g++;
			if((tmp & 1) == 1) tmp = tmp >>> 1 ^ -306674912; else tmp >>>= 1;
		}
		this.crc = this.crc >>> 8 ^ tmp;
	}
	,update: function(b,pos,len) {
		var b1 = b.b.bufferValue;
		var _g1 = pos;
		var _g = pos + len;
		while(_g1 < _g) {
			var i = _g1++;
			var tmp = (this.crc ^ b1.bytes[i]) & 255;
			var _g2 = 0;
			while(_g2 < 8) {
				var j = _g2++;
				if((tmp & 1) == 1) tmp = tmp >>> 1 ^ -306674912; else tmp >>>= 1;
			}
			this.crc = this.crc >>> 8 ^ tmp;
		}
	}
	,get: function() {
		return this.crc ^ -1;
	}
	,__class__: haxe_crypto_Crc32
};
var haxe_ds_IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe_ds_IntMap;
haxe_ds_IntMap.__name__ = ["haxe","ds","IntMap"];
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	h: null
	,set: function(key,value) {
		this.h[key] = value;
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe_ds_IntMap
};
var haxe_ds_ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe_ds_ObjectMap;
haxe_ds_ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	h: null
	,set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe_ds_ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) return false;
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds__$StringMap_StringMapIterator = function(map,keys) {
	this.map = map;
	this.keys = keys;
	this.index = 0;
	this.count = keys.length;
};
$hxClasses["haxe.ds._StringMap.StringMapIterator"] = haxe_ds__$StringMap_StringMapIterator;
haxe_ds__$StringMap_StringMapIterator.__name__ = ["haxe","ds","_StringMap","StringMapIterator"];
haxe_ds__$StringMap_StringMapIterator.prototype = {
	map: null
	,keys: null
	,index: null
	,count: null
	,hasNext: function() {
		return this.index < this.count;
	}
	,next: function() {
		return this.map.get(this.keys[this.index++]);
	}
	,__class__: haxe_ds__$StringMap_StringMapIterator
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = ["haxe","ds","StringMap"];
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	h: null
	,rh: null
	,set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		if(__map_reserved[key] != null) {
			key = "$" + key;
			if(this.rh == null || !this.rh.hasOwnProperty(key)) return false;
			delete(this.rh[key]);
			return true;
		} else {
			if(!this.h.hasOwnProperty(key)) return false;
			delete(this.h[key]);
			return true;
		}
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,iterator: function() {
		return new haxe_ds__$StringMap_StringMapIterator(this,this.arrayKeys());
	}
	,__class__: haxe_ds_StringMap
};
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
$hxClasses["haxe.io.Bytes"] = haxe_io_Bytes;
haxe_io_Bytes.__name__ = ["haxe","io","Bytes"];
haxe_io_Bytes.alloc = function(length) {
	return new haxe_io_Bytes(new ArrayBuffer(length));
};
haxe_io_Bytes.ofString = function(s) {
	var a = [];
	var i = 0;
	while(i < s.length) {
		var c = StringTools.fastCodeAt(s,i++);
		if(55296 <= c && c <= 56319) c = c - 55232 << 10 | StringTools.fastCodeAt(s,i++) & 1023;
		if(c <= 127) a.push(c); else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe_io_Bytes(new Uint8Array(a).buffer);
};
haxe_io_Bytes.ofData = function(b) {
	var hb = b.hxBytes;
	if(hb != null) return hb;
	return new haxe_io_Bytes(b);
};
haxe_io_Bytes.prototype = {
	length: null
	,b: null
	,data: null
	,get: function(pos) {
		return this.b[pos];
	}
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,blit: function(pos,src,srcpos,len) {
		if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		if(srcpos == 0 && len == src.length) this.b.set(src.b,pos); else this.b.set(src.b.subarray(srcpos,srcpos + len),pos);
	}
	,fill: function(pos,len,value) {
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			this.set(pos++,value);
		}
	}
	,setUInt16: function(pos,v) {
		if(this.data == null) this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		this.data.setUint16(pos,v,true);
	}
	,setInt32: function(pos,v) {
		if(this.data == null) this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		this.data.setInt32(pos,v,true);
	}
	,getString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) break;
				s += fcc(c);
			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c21 = b[i++];
				var c3 = b[i++];
				var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
				s += fcc((u >> 10) + 55232);
				s += fcc(u & 1023 | 56320);
			}
		}
		return s;
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
	,__class__: haxe_io_Bytes
};
var haxe_io_BytesBuffer = function() {
	this.b = [];
};
$hxClasses["haxe.io.BytesBuffer"] = haxe_io_BytesBuffer;
haxe_io_BytesBuffer.__name__ = ["haxe","io","BytesBuffer"];
haxe_io_BytesBuffer.prototype = {
	b: null
	,add: function(src) {
		var b1 = this.b;
		var b2 = src.b;
		var _g1 = 0;
		var _g = src.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.b.push(b2[i]);
		}
	}
	,addBytes: function(src,pos,len) {
		if(pos < 0 || len < 0 || pos + len > src.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		var b1 = this.b;
		var b2 = src.b;
		var _g1 = pos;
		var _g = pos + len;
		while(_g1 < _g) {
			var i = _g1++;
			this.b.push(b2[i]);
		}
	}
	,getBytes: function() {
		var bytes = new haxe_io_Bytes(new Uint8Array(this.b).buffer);
		this.b = null;
		return bytes;
	}
	,__class__: haxe_io_BytesBuffer
};
var haxe_io_Input = function() { };
$hxClasses["haxe.io.Input"] = haxe_io_Input;
haxe_io_Input.__name__ = ["haxe","io","Input"];
haxe_io_Input.prototype = {
	bigEndian: null
	,readByte: function() {
		throw new js__$Boot_HaxeError("Not implemented");
	}
	,readBytes: function(s,pos,len) {
		var k = len;
		var b = s.b;
		if(pos < 0 || len < 0 || pos + len > s.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		while(k > 0) {
			b[pos] = this.readByte();
			pos++;
			k--;
		}
		return len;
	}
	,set_bigEndian: function(b) {
		this.bigEndian = b;
		return b;
	}
	,readFullBytes: function(s,pos,len) {
		while(len > 0) {
			var k = this.readBytes(s,pos,len);
			pos += k;
			len -= k;
		}
	}
	,read: function(nbytes) {
		var s = haxe_io_Bytes.alloc(nbytes);
		var p = 0;
		while(nbytes > 0) {
			var k = this.readBytes(s,p,nbytes);
			if(k == 0) throw new js__$Boot_HaxeError(haxe_io_Error.Blocked);
			p += k;
			nbytes -= k;
		}
		return s;
	}
	,readInt16: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var n;
		if(this.bigEndian) n = ch2 | ch1 << 8; else n = ch1 | ch2 << 8;
		if((n & 32768) != 0) return n - 65536;
		return n;
	}
	,readUInt16: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		if(this.bigEndian) return ch2 | ch1 << 8; else return ch1 | ch2 << 8;
	}
	,readInt32: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var ch3 = this.readByte();
		var ch4 = this.readByte();
		if(this.bigEndian) return ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24; else return ch1 | ch2 << 8 | ch3 << 16 | ch4 << 24;
	}
	,readString: function(len) {
		var b = haxe_io_Bytes.alloc(len);
		this.readFullBytes(b,0,len);
		return b.toString();
	}
	,__class__: haxe_io_Input
};
var haxe_io_BytesInput = function(b,pos,len) {
	if(pos == null) pos = 0;
	if(len == null) len = b.length - pos;
	if(pos < 0 || len < 0 || pos + len > b.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
	this.b = b.b;
	this.pos = pos;
	this.len = len;
	this.totlen = len;
};
$hxClasses["haxe.io.BytesInput"] = haxe_io_BytesInput;
haxe_io_BytesInput.__name__ = ["haxe","io","BytesInput"];
haxe_io_BytesInput.__super__ = haxe_io_Input;
haxe_io_BytesInput.prototype = $extend(haxe_io_Input.prototype,{
	b: null
	,pos: null
	,len: null
	,totlen: null
	,readByte: function() {
		if(this.len == 0) throw new js__$Boot_HaxeError(new haxe_io_Eof());
		this.len--;
		return this.b[this.pos++];
	}
	,readBytes: function(buf,pos,len) {
		if(pos < 0 || len < 0 || pos + len > buf.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		if(this.len == 0 && len > 0) throw new js__$Boot_HaxeError(new haxe_io_Eof());
		if(this.len < len) len = this.len;
		var b1 = this.b;
		var b2 = buf.b;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			b2[pos + i] = b1[this.pos + i];
		}
		this.pos += len;
		this.len -= len;
		return len;
	}
	,__class__: haxe_io_BytesInput
});
var haxe_io_Output = function() { };
$hxClasses["haxe.io.Output"] = haxe_io_Output;
haxe_io_Output.__name__ = ["haxe","io","Output"];
haxe_io_Output.prototype = {
	bigEndian: null
	,writeByte: function(c) {
		throw new js__$Boot_HaxeError("Not implemented");
	}
	,writeBytes: function(s,pos,len) {
		var k = len;
		var b = s.b.bufferValue;
		if(pos < 0 || len < 0 || pos + len > s.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		while(k > 0) {
			this.writeByte(b[pos]);
			pos++;
			k--;
		}
		return len;
	}
	,set_bigEndian: function(b) {
		this.bigEndian = b;
		return b;
	}
	,write: function(s) {
		var l = s.length;
		var p = 0;
		while(l > 0) {
			var k = this.writeBytes(s,p,l);
			if(k == 0) throw new js__$Boot_HaxeError(haxe_io_Error.Blocked);
			p += k;
			l -= k;
		}
	}
	,writeFullBytes: function(s,pos,len) {
		while(len > 0) {
			var k = this.writeBytes(s,pos,len);
			pos += k;
			len -= k;
		}
	}
	,writeInt32: function(x) {
		if(this.bigEndian) {
			this.writeByte(x >>> 24);
			this.writeByte(x >> 16 & 255);
			this.writeByte(x >> 8 & 255);
			this.writeByte(x & 255);
		} else {
			this.writeByte(x & 255);
			this.writeByte(x >> 8 & 255);
			this.writeByte(x >> 16 & 255);
			this.writeByte(x >>> 24);
		}
	}
	,writeString: function(s) {
		var b = haxe_io_Bytes.ofString(s);
		this.writeFullBytes(b,0,b.length);
	}
	,__class__: haxe_io_Output
};
var haxe_io_BytesOutput = function() {
	this.b = new haxe_io_BytesBuffer();
};
$hxClasses["haxe.io.BytesOutput"] = haxe_io_BytesOutput;
haxe_io_BytesOutput.__name__ = ["haxe","io","BytesOutput"];
haxe_io_BytesOutput.__super__ = haxe_io_Output;
haxe_io_BytesOutput.prototype = $extend(haxe_io_Output.prototype,{
	b: null
	,writeByte: function(c) {
		this.b.b.push(c);
	}
	,writeBytes: function(buf,pos,len) {
		this.b.addBytes(buf,pos,len);
		return len;
	}
	,getBytes: function() {
		return this.b.getBytes();
	}
	,__class__: haxe_io_BytesOutput
});
var haxe_io_Eof = function() {
};
$hxClasses["haxe.io.Eof"] = haxe_io_Eof;
haxe_io_Eof.__name__ = ["haxe","io","Eof"];
haxe_io_Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe_io_Eof
};
var haxe_io_Error = $hxClasses["haxe.io.Error"] = { __ename__ : ["haxe","io","Error"], __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe_io_Error.Blocked = ["Blocked",0];
haxe_io_Error.Blocked.toString = $estr;
haxe_io_Error.Blocked.__enum__ = haxe_io_Error;
haxe_io_Error.Overflow = ["Overflow",1];
haxe_io_Error.Overflow.toString = $estr;
haxe_io_Error.Overflow.__enum__ = haxe_io_Error;
haxe_io_Error.OutsideBounds = ["OutsideBounds",2];
haxe_io_Error.OutsideBounds.toString = $estr;
haxe_io_Error.OutsideBounds.__enum__ = haxe_io_Error;
haxe_io_Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe_io_Error; $x.toString = $estr; return $x; };
var haxe_io_FPHelper = function() { };
$hxClasses["haxe.io.FPHelper"] = haxe_io_FPHelper;
haxe_io_FPHelper.__name__ = ["haxe","io","FPHelper"];
haxe_io_FPHelper.i32ToFloat = function(i) {
	var sign = 1 - (i >>> 31 << 1);
	var exp = i >>> 23 & 255;
	var sig = i & 8388607;
	if(sig == 0 && exp == 0) return 0.0;
	return sign * (1 + Math.pow(2,-23) * sig) * Math.pow(2,exp - 127);
};
haxe_io_FPHelper.floatToI32 = function(f) {
	if(f == 0) return 0;
	var af;
	if(f < 0) af = -f; else af = f;
	var exp = Math.floor(Math.log(af) / 0.6931471805599453);
	if(exp < -127) exp = -127; else if(exp > 128) exp = 128;
	var sig = Math.round((af / Math.pow(2,exp) - 1) * 8388608) & 8388607;
	return (f < 0?-2147483648:0) | exp + 127 << 23 | sig;
};
haxe_io_FPHelper.i64ToDouble = function(low,high) {
	var sign = 1 - (high >>> 31 << 1);
	var exp = (high >> 20 & 2047) - 1023;
	var sig = (high & 1048575) * 4294967296. + (low >>> 31) * 2147483648. + (low & 2147483647);
	if(sig == 0 && exp == -1023) return 0.0;
	return sign * (1.0 + Math.pow(2,-52) * sig) * Math.pow(2,exp);
};
haxe_io_FPHelper.doubleToI64 = function(v) {
	var i64 = haxe_io_FPHelper.i64tmp;
	if(v == 0) {
		i64.low = 0;
		i64.high = 0;
	} else {
		var av;
		if(v < 0) av = -v; else av = v;
		var exp = Math.floor(Math.log(av) / 0.6931471805599453);
		var sig;
		var v1 = (av / Math.pow(2,exp) - 1) * 4503599627370496.;
		sig = Math.round(v1);
		var sig_l = sig | 0;
		var sig_h = sig / 4294967296.0 | 0;
		i64.low = sig_l;
		i64.high = (v < 0?-2147483648:0) | exp + 1023 << 20 | sig_h;
	}
	return i64;
};
var haxe_io_StringInput = function(s) {
	haxe_io_BytesInput.call(this,haxe_io_Bytes.ofString(s));
};
$hxClasses["haxe.io.StringInput"] = haxe_io_StringInput;
haxe_io_StringInput.__name__ = ["haxe","io","StringInput"];
haxe_io_StringInput.__super__ = haxe_io_BytesInput;
haxe_io_StringInput.prototype = $extend(haxe_io_BytesInput.prototype,{
	__class__: haxe_io_StringInput
});
var haxe_zip_ExtraField = $hxClasses["haxe.zip.ExtraField"] = { __ename__ : ["haxe","zip","ExtraField"], __constructs__ : ["FUnknown","FInfoZipUnicodePath","FUtf8"] };
haxe_zip_ExtraField.FUnknown = function(tag,bytes) { var $x = ["FUnknown",0,tag,bytes]; $x.__enum__ = haxe_zip_ExtraField; $x.toString = $estr; return $x; };
haxe_zip_ExtraField.FInfoZipUnicodePath = function(name,crc) { var $x = ["FInfoZipUnicodePath",1,name,crc]; $x.__enum__ = haxe_zip_ExtraField; $x.toString = $estr; return $x; };
haxe_zip_ExtraField.FUtf8 = ["FUtf8",2];
haxe_zip_ExtraField.FUtf8.toString = $estr;
haxe_zip_ExtraField.FUtf8.__enum__ = haxe_zip_ExtraField;
var haxe_zip_Huffman = $hxClasses["haxe.zip.Huffman"] = { __ename__ : ["haxe","zip","Huffman"], __constructs__ : ["Found","NeedBit","NeedBits"] };
haxe_zip_Huffman.Found = function(i) { var $x = ["Found",0,i]; $x.__enum__ = haxe_zip_Huffman; $x.toString = $estr; return $x; };
haxe_zip_Huffman.NeedBit = function(left,right) { var $x = ["NeedBit",1,left,right]; $x.__enum__ = haxe_zip_Huffman; $x.toString = $estr; return $x; };
haxe_zip_Huffman.NeedBits = function(n,table) { var $x = ["NeedBits",2,n,table]; $x.__enum__ = haxe_zip_Huffman; $x.toString = $estr; return $x; };
var haxe_zip_HuffTools = function() {
};
$hxClasses["haxe.zip.HuffTools"] = haxe_zip_HuffTools;
haxe_zip_HuffTools.__name__ = ["haxe","zip","HuffTools"];
haxe_zip_HuffTools.prototype = {
	treeDepth: function(t) {
		switch(t[1]) {
		case 0:
			return 0;
		case 2:
			throw new js__$Boot_HaxeError("assert");
			break;
		case 1:
			var b = t[3];
			var a = t[2];
			var da = this.treeDepth(a);
			var db = this.treeDepth(b);
			return 1 + (da < db?da:db);
		}
	}
	,treeCompress: function(t) {
		var d = this.treeDepth(t);
		if(d == 0) return t;
		if(d == 1) switch(t[1]) {
		case 1:
			var b = t[3];
			var a = t[2];
			return haxe_zip_Huffman.NeedBit(this.treeCompress(a),this.treeCompress(b));
		default:
			throw new js__$Boot_HaxeError("assert");
		}
		var size = 1 << d;
		var table = [];
		var _g = 0;
		while(_g < size) {
			var i = _g++;
			table.push(haxe_zip_Huffman.Found(-1));
		}
		this.treeWalk(table,0,0,d,t);
		return haxe_zip_Huffman.NeedBits(d,table);
	}
	,treeWalk: function(table,p,cd,d,t) {
		switch(t[1]) {
		case 1:
			var b = t[3];
			var a = t[2];
			if(d > 0) {
				this.treeWalk(table,p,cd + 1,d - 1,a);
				this.treeWalk(table,p | 1 << cd,cd + 1,d - 1,b);
			} else table[p] = this.treeCompress(t);
			break;
		default:
			table[p] = this.treeCompress(t);
		}
	}
	,treeMake: function(bits,maxbits,v,len) {
		if(len > maxbits) throw new js__$Boot_HaxeError("Invalid huffman");
		var idx = v << 5 | len;
		if(bits.h.hasOwnProperty(idx)) return haxe_zip_Huffman.Found(bits.h[idx]);
		v <<= 1;
		len += 1;
		return haxe_zip_Huffman.NeedBit(this.treeMake(bits,maxbits,v,len),this.treeMake(bits,maxbits,v | 1,len));
	}
	,make: function(lengths,pos,nlengths,maxbits) {
		var counts = [];
		var tmp = [];
		if(maxbits > 32) throw new js__$Boot_HaxeError("Invalid huffman");
		var _g = 0;
		while(_g < maxbits) {
			var i = _g++;
			counts.push(0);
			tmp.push(0);
		}
		var _g1 = 0;
		while(_g1 < nlengths) {
			var i1 = _g1++;
			var p = lengths[i1 + pos];
			if(p >= maxbits) throw new js__$Boot_HaxeError("Invalid huffman");
			counts[p]++;
		}
		var code = 0;
		var _g11 = 1;
		var _g2 = maxbits - 1;
		while(_g11 < _g2) {
			var i2 = _g11++;
			code = code + counts[i2] << 1;
			tmp[i2] = code;
		}
		var bits = new haxe_ds_IntMap();
		var _g3 = 0;
		while(_g3 < nlengths) {
			var i3 = _g3++;
			var l = lengths[i3 + pos];
			if(l != 0) {
				var n = tmp[l - 1];
				tmp[l - 1] = n + 1;
				bits.h[n << 5 | l] = i3;
			}
		}
		return this.treeCompress(haxe_zip_Huffman.NeedBit(this.treeMake(bits,maxbits,0,1),this.treeMake(bits,maxbits,1,1)));
	}
	,__class__: haxe_zip_HuffTools
};
var haxe_zip__$InflateImpl_Window = function(hasCrc) {
	this.buffer = haxe_io_Bytes.alloc(65536);
	this.pos = 0;
	if(hasCrc) this.crc = new haxe_crypto_Adler32();
};
$hxClasses["haxe.zip._InflateImpl.Window"] = haxe_zip__$InflateImpl_Window;
haxe_zip__$InflateImpl_Window.__name__ = ["haxe","zip","_InflateImpl","Window"];
haxe_zip__$InflateImpl_Window.prototype = {
	buffer: null
	,pos: null
	,crc: null
	,slide: function() {
		if(this.crc != null) this.crc.update(this.buffer,0,32768);
		var b = haxe_io_Bytes.alloc(65536);
		this.pos -= 32768;
		b.blit(0,this.buffer,32768,this.pos);
		this.buffer = b;
	}
	,addBytes: function(b,p,len) {
		if(this.pos + len > 65536) this.slide();
		this.buffer.blit(this.pos,b,p,len);
		this.pos += len;
	}
	,addByte: function(c) {
		if(this.pos == 65536) this.slide();
		this.buffer.b[this.pos] = c & 255;
		this.pos++;
	}
	,getLastChar: function() {
		return this.buffer.b[this.pos - 1];
	}
	,available: function() {
		return this.pos;
	}
	,checksum: function() {
		if(this.crc != null) this.crc.update(this.buffer,0,this.pos);
		return this.crc;
	}
	,__class__: haxe_zip__$InflateImpl_Window
};
var haxe_zip__$InflateImpl_State = $hxClasses["haxe.zip._InflateImpl.State"] = { __ename__ : ["haxe","zip","_InflateImpl","State"], __constructs__ : ["Head","Block","CData","Flat","Crc","Dist","DistOne","Done"] };
haxe_zip__$InflateImpl_State.Head = ["Head",0];
haxe_zip__$InflateImpl_State.Head.toString = $estr;
haxe_zip__$InflateImpl_State.Head.__enum__ = haxe_zip__$InflateImpl_State;
haxe_zip__$InflateImpl_State.Block = ["Block",1];
haxe_zip__$InflateImpl_State.Block.toString = $estr;
haxe_zip__$InflateImpl_State.Block.__enum__ = haxe_zip__$InflateImpl_State;
haxe_zip__$InflateImpl_State.CData = ["CData",2];
haxe_zip__$InflateImpl_State.CData.toString = $estr;
haxe_zip__$InflateImpl_State.CData.__enum__ = haxe_zip__$InflateImpl_State;
haxe_zip__$InflateImpl_State.Flat = ["Flat",3];
haxe_zip__$InflateImpl_State.Flat.toString = $estr;
haxe_zip__$InflateImpl_State.Flat.__enum__ = haxe_zip__$InflateImpl_State;
haxe_zip__$InflateImpl_State.Crc = ["Crc",4];
haxe_zip__$InflateImpl_State.Crc.toString = $estr;
haxe_zip__$InflateImpl_State.Crc.__enum__ = haxe_zip__$InflateImpl_State;
haxe_zip__$InflateImpl_State.Dist = ["Dist",5];
haxe_zip__$InflateImpl_State.Dist.toString = $estr;
haxe_zip__$InflateImpl_State.Dist.__enum__ = haxe_zip__$InflateImpl_State;
haxe_zip__$InflateImpl_State.DistOne = ["DistOne",6];
haxe_zip__$InflateImpl_State.DistOne.toString = $estr;
haxe_zip__$InflateImpl_State.DistOne.__enum__ = haxe_zip__$InflateImpl_State;
haxe_zip__$InflateImpl_State.Done = ["Done",7];
haxe_zip__$InflateImpl_State.Done.toString = $estr;
haxe_zip__$InflateImpl_State.Done.__enum__ = haxe_zip__$InflateImpl_State;
var haxe_zip_InflateImpl = function(i,header,crc) {
	if(crc == null) crc = true;
	if(header == null) header = true;
	this["final"] = false;
	this.htools = new haxe_zip_HuffTools();
	this.huffman = this.buildFixedHuffman();
	this.huffdist = null;
	this.len = 0;
	this.dist = 0;
	if(header) this.state = haxe_zip__$InflateImpl_State.Head; else this.state = haxe_zip__$InflateImpl_State.Block;
	this.input = i;
	this.bits = 0;
	this.nbits = 0;
	this.needed = 0;
	this.output = null;
	this.outpos = 0;
	this.lengths = [];
	var _g = 0;
	while(_g < 19) {
		var i1 = _g++;
		this.lengths.push(-1);
	}
	this.window = new haxe_zip__$InflateImpl_Window(crc);
};
$hxClasses["haxe.zip.InflateImpl"] = haxe_zip_InflateImpl;
haxe_zip_InflateImpl.__name__ = ["haxe","zip","InflateImpl"];
haxe_zip_InflateImpl.prototype = {
	nbits: null
	,bits: null
	,state: null
	,'final': null
	,huffman: null
	,huffdist: null
	,htools: null
	,len: null
	,dist: null
	,needed: null
	,output: null
	,outpos: null
	,input: null
	,lengths: null
	,window: null
	,buildFixedHuffman: function() {
		if(haxe_zip_InflateImpl.FIXED_HUFFMAN != null) return haxe_zip_InflateImpl.FIXED_HUFFMAN;
		var a = [];
		var _g = 0;
		while(_g < 288) {
			var n = _g++;
			a.push(n <= 143?8:n <= 255?9:n <= 279?7:8);
		}
		haxe_zip_InflateImpl.FIXED_HUFFMAN = this.htools.make(a,0,288,10);
		return haxe_zip_InflateImpl.FIXED_HUFFMAN;
	}
	,readBytes: function(b,pos,len) {
		this.needed = len;
		this.outpos = pos;
		this.output = b;
		if(len > 0) while(this.inflateLoop()) {
		}
		return len - this.needed;
	}
	,getBits: function(n) {
		while(this.nbits < n) {
			this.bits |= this.input.readByte() << this.nbits;
			this.nbits += 8;
		}
		var b = this.bits & (1 << n) - 1;
		this.nbits -= n;
		this.bits >>= n;
		return b;
	}
	,getBit: function() {
		if(this.nbits == 0) {
			this.nbits = 8;
			this.bits = this.input.readByte();
		}
		var b = (this.bits & 1) == 1;
		this.nbits--;
		this.bits >>= 1;
		return b;
	}
	,getRevBits: function(n) {
		if(n == 0) return 0; else if(this.getBit()) return 1 << n - 1 | this.getRevBits(n - 1); else return this.getRevBits(n - 1);
	}
	,resetBits: function() {
		this.bits = 0;
		this.nbits = 0;
	}
	,addBytes: function(b,p,len) {
		this.window.addBytes(b,p,len);
		this.output.blit(this.outpos,b,p,len);
		this.needed -= len;
		this.outpos += len;
	}
	,addByte: function(b) {
		this.window.addByte(b);
		this.output.b[this.outpos] = b & 255;
		this.needed--;
		this.outpos++;
	}
	,addDistOne: function(n) {
		var c = this.window.getLastChar();
		var _g = 0;
		while(_g < n) {
			var i = _g++;
			this.addByte(c);
		}
	}
	,addDist: function(d,len) {
		this.addBytes(this.window.buffer,this.window.pos - d,len);
	}
	,applyHuffman: function(h) {
		switch(h[1]) {
		case 0:
			var n = h[2];
			return n;
		case 1:
			var b = h[3];
			var a = h[2];
			return this.applyHuffman(this.getBit()?b:a);
		case 2:
			var tbl = h[3];
			var n1 = h[2];
			return this.applyHuffman(tbl[this.getBits(n1)]);
		}
	}
	,inflateLengths: function(a,max) {
		var i = 0;
		var prev = 0;
		while(i < max) {
			var n = this.applyHuffman(this.huffman);
			switch(n) {
			case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:case 8:case 9:case 10:case 11:case 12:case 13:case 14:case 15:
				prev = n;
				a[i] = n;
				i++;
				break;
			case 16:
				var end = i + 3 + this.getBits(2);
				if(end > max) throw new js__$Boot_HaxeError("Invalid data");
				while(i < end) {
					a[i] = prev;
					i++;
				}
				break;
			case 17:
				i += 3 + this.getBits(3);
				if(i > max) throw new js__$Boot_HaxeError("Invalid data");
				break;
			case 18:
				i += 11 + this.getBits(7);
				if(i > max) throw new js__$Boot_HaxeError("Invalid data");
				break;
			default:
				throw new js__$Boot_HaxeError("Invalid data");
			}
		}
	}
	,inflateLoop: function() {
		var _g = this.state;
		switch(_g[1]) {
		case 0:
			var cmf = this.input.readByte();
			var cm = cmf & 15;
			var cinfo = cmf >> 4;
			if(cm != 8) throw new js__$Boot_HaxeError("Invalid data");
			var flg = this.input.readByte();
			var fdict = (flg & 32) != 0;
			if(((cmf << 8) + flg) % 31 != 0) throw new js__$Boot_HaxeError("Invalid data");
			if(fdict) throw new js__$Boot_HaxeError("Unsupported dictionary");
			this.state = haxe_zip__$InflateImpl_State.Block;
			return true;
		case 4:
			var calc = this.window.checksum();
			if(calc == null) {
				this.state = haxe_zip__$InflateImpl_State.Done;
				return true;
			}
			var crc = haxe_crypto_Adler32.read(this.input);
			if(!calc.equals(crc)) throw new js__$Boot_HaxeError("Invalid CRC");
			this.state = haxe_zip__$InflateImpl_State.Done;
			return true;
		case 7:
			return false;
		case 1:
			this["final"] = this.getBit();
			var _g1 = this.getBits(2);
			switch(_g1) {
			case 0:
				this.len = this.input.readUInt16();
				var nlen = this.input.readUInt16();
				if(nlen != 65535 - this.len) throw new js__$Boot_HaxeError("Invalid data");
				this.state = haxe_zip__$InflateImpl_State.Flat;
				var r = this.inflateLoop();
				this.resetBits();
				return r;
			case 1:
				this.huffman = this.buildFixedHuffman();
				this.huffdist = null;
				this.state = haxe_zip__$InflateImpl_State.CData;
				return true;
			case 2:
				var hlit = this.getBits(5) + 257;
				var hdist = this.getBits(5) + 1;
				var hclen = this.getBits(4) + 4;
				var _g2 = 0;
				while(_g2 < hclen) {
					var i = _g2++;
					this.lengths[haxe_zip_InflateImpl.CODE_LENGTHS_POS[i]] = this.getBits(3);
				}
				var _g21 = hclen;
				while(_g21 < 19) {
					var i1 = _g21++;
					this.lengths[haxe_zip_InflateImpl.CODE_LENGTHS_POS[i1]] = 0;
				}
				this.huffman = this.htools.make(this.lengths,0,19,8);
				var lengths = [];
				var _g3 = 0;
				var _g22 = hlit + hdist;
				while(_g3 < _g22) {
					var i2 = _g3++;
					lengths.push(0);
				}
				this.inflateLengths(lengths,hlit + hdist);
				this.huffdist = this.htools.make(lengths,hlit,hdist,16);
				this.huffman = this.htools.make(lengths,0,hlit,16);
				this.state = haxe_zip__$InflateImpl_State.CData;
				return true;
			default:
				throw new js__$Boot_HaxeError("Invalid data");
			}
			break;
		case 3:
			var rlen;
			if(this.len < this.needed) rlen = this.len; else rlen = this.needed;
			var bytes = this.input.read(rlen);
			this.len -= rlen;
			this.addBytes(bytes,0,rlen);
			if(this.len == 0) if(this["final"]) this.state = haxe_zip__$InflateImpl_State.Crc; else this.state = haxe_zip__$InflateImpl_State.Block;
			return this.needed > 0;
		case 6:
			var rlen1;
			if(this.len < this.needed) rlen1 = this.len; else rlen1 = this.needed;
			this.addDistOne(rlen1);
			this.len -= rlen1;
			if(this.len == 0) this.state = haxe_zip__$InflateImpl_State.CData;
			return this.needed > 0;
		case 5:
			while(this.len > 0 && this.needed > 0) {
				var rdist;
				if(this.len < this.dist) rdist = this.len; else rdist = this.dist;
				var rlen2;
				if(this.needed < rdist) rlen2 = this.needed; else rlen2 = rdist;
				this.addDist(this.dist,rlen2);
				this.len -= rlen2;
			}
			if(this.len == 0) this.state = haxe_zip__$InflateImpl_State.CData;
			return this.needed > 0;
		case 2:
			var n = this.applyHuffman(this.huffman);
			if(n < 256) {
				this.addByte(n);
				return this.needed > 0;
			} else if(n == 256) {
				if(this["final"]) this.state = haxe_zip__$InflateImpl_State.Crc; else this.state = haxe_zip__$InflateImpl_State.Block;
				return true;
			} else {
				n -= 257;
				var extra_bits = haxe_zip_InflateImpl.LEN_EXTRA_BITS_TBL[n];
				if(extra_bits == -1) throw new js__$Boot_HaxeError("Invalid data");
				this.len = haxe_zip_InflateImpl.LEN_BASE_VAL_TBL[n] + this.getBits(extra_bits);
				var dist_code;
				if(this.huffdist == null) dist_code = this.getRevBits(5); else dist_code = this.applyHuffman(this.huffdist);
				extra_bits = haxe_zip_InflateImpl.DIST_EXTRA_BITS_TBL[dist_code];
				if(extra_bits == -1) throw new js__$Boot_HaxeError("Invalid data");
				this.dist = haxe_zip_InflateImpl.DIST_BASE_VAL_TBL[dist_code] + this.getBits(extra_bits);
				if(this.dist > this.window.available()) throw new js__$Boot_HaxeError("Invalid data");
				if(this.dist == 1) this.state = haxe_zip__$InflateImpl_State.DistOne; else this.state = haxe_zip__$InflateImpl_State.Dist;
				return true;
			}
			break;
		}
	}
	,__class__: haxe_zip_InflateImpl
};
var haxe_zip_Reader = function(i) {
	this.i = i;
};
$hxClasses["haxe.zip.Reader"] = haxe_zip_Reader;
haxe_zip_Reader.__name__ = ["haxe","zip","Reader"];
haxe_zip_Reader.readZip = function(i) {
	var r = new haxe_zip_Reader(i);
	return r.read();
};
haxe_zip_Reader.prototype = {
	i: null
	,readZipDate: function() {
		var t = this.i.readUInt16();
		var hour = t >> 11 & 31;
		var min = t >> 5 & 63;
		var sec = t & 31;
		var d = this.i.readUInt16();
		var year = d >> 9;
		var month = d >> 5 & 15;
		var day = d & 31;
		return new Date(year + 1980,month - 1,day,hour,min,sec << 1);
	}
	,readExtraFields: function(length) {
		var fields = new List();
		while(length > 0) {
			if(length < 4) throw new js__$Boot_HaxeError("Invalid extra fields data");
			var tag = this.i.readUInt16();
			var len = this.i.readUInt16();
			if(length < len) throw new js__$Boot_HaxeError("Invalid extra fields data");
			switch(tag) {
			case 28789:
				var version = this.i.readByte();
				if(version != 1) {
					var data = new haxe_io_BytesBuffer();
					data.b.push(version);
					data.add(this.i.read(len - 1));
					fields.add(haxe_zip_ExtraField.FUnknown(tag,data.getBytes()));
				} else {
					var crc = this.i.readInt32();
					var name = this.i.read(len - 5).toString();
					fields.add(haxe_zip_ExtraField.FInfoZipUnicodePath(name,crc));
				}
				break;
			default:
				fields.add(haxe_zip_ExtraField.FUnknown(tag,this.i.read(len)));
			}
			length -= 4 + len;
		}
		return fields;
	}
	,readEntryHeader: function() {
		var i = this.i;
		var h = i.readInt32();
		if(h == 33639248 || h == 101010256) return null;
		if(h != 67324752) throw new js__$Boot_HaxeError("Invalid Zip Data");
		var version = i.readUInt16();
		var flags = i.readUInt16();
		var utf8 = (flags & 2048) != 0;
		if((flags & 63473) != 0) throw new js__$Boot_HaxeError("Unsupported flags " + flags);
		var compression = i.readUInt16();
		var compressed = compression != 0;
		if(compressed && compression != 8) throw new js__$Boot_HaxeError("Unsupported compression " + compression);
		var mtime = this.readZipDate();
		var crc32 = i.readInt32();
		var csize = i.readInt32();
		var usize = i.readInt32();
		var fnamelen = i.readInt16();
		var elen = i.readInt16();
		var fname = i.readString(fnamelen);
		var fields = this.readExtraFields(elen);
		if(utf8) fields.push(haxe_zip_ExtraField.FUtf8);
		var data = null;
		if((flags & 8) != 0) crc32 = null;
		return { fileName : fname, fileSize : usize, fileTime : mtime, compressed : compressed, dataSize : csize, data : data, crc32 : crc32, extraFields : fields};
	}
	,read: function() {
		var l = new List();
		var buf = null;
		var tmp = null;
		while(true) {
			var e = this.readEntryHeader();
			if(e == null) break;
			if(e.crc32 == null) {
				if(e.compressed) {
					var bufSize = 65536;
					if(tmp == null) tmp = haxe_io_Bytes.alloc(bufSize);
					var out = new haxe_io_BytesBuffer();
					var z = new haxe_zip_InflateImpl(this.i,false,false);
					while(true) {
						var n = z.readBytes(tmp,0,bufSize);
						out.addBytes(tmp,0,n);
						if(n < bufSize) break;
					}
					e.data = out.getBytes();
				} else e.data = this.i.read(e.dataSize);
				e.crc32 = this.i.readInt32();
				if(e.crc32 == 134695760) e.crc32 = this.i.readInt32();
				e.dataSize = this.i.readInt32();
				e.fileSize = this.i.readInt32();
				e.dataSize = e.fileSize;
				e.compressed = false;
			} else e.data = this.i.read(e.dataSize);
			l.add(e);
		}
		return l;
	}
	,__class__: haxe_zip_Reader
};
var hscript_Const = $hxClasses["hscript.Const"] = { __ename__ : ["hscript","Const"], __constructs__ : ["CInt","CFloat","CString"] };
hscript_Const.CInt = function(v) { var $x = ["CInt",0,v]; $x.__enum__ = hscript_Const; $x.toString = $estr; return $x; };
hscript_Const.CFloat = function(f) { var $x = ["CFloat",1,f]; $x.__enum__ = hscript_Const; $x.toString = $estr; return $x; };
hscript_Const.CString = function(s) { var $x = ["CString",2,s]; $x.__enum__ = hscript_Const; $x.toString = $estr; return $x; };
var hscript_ExprDef = $hxClasses["hscript.ExprDef"] = { __ename__ : ["hscript","ExprDef"], __constructs__ : ["EConst","EIdent","EVar","EParent","EBlock","EField","EBinop","EUnop","ECall","EIf","EWhile","EFor","EBreak","EContinue","EFunction","EReturn","EArray","EArrayDecl","ENew","EThrow","ETry","EObject","ETernary","ESwitch"] };
hscript_ExprDef.EConst = function(c) { var $x = ["EConst",0,c]; $x.__enum__ = hscript_ExprDef; $x.toString = $estr; return $x; };
hscript_ExprDef.EIdent = function(v) { var $x = ["EIdent",1,v]; $x.__enum__ = hscript_ExprDef; $x.toString = $estr; return $x; };
hscript_ExprDef.EVar = function(n,t,e) { var $x = ["EVar",2,n,t,e]; $x.__enum__ = hscript_ExprDef; $x.toString = $estr; return $x; };
hscript_ExprDef.EParent = function(e) { var $x = ["EParent",3,e]; $x.__enum__ = hscript_ExprDef; $x.toString = $estr; return $x; };
hscript_ExprDef.EBlock = function(e) { var $x = ["EBlock",4,e]; $x.__enum__ = hscript_ExprDef; $x.toString = $estr; return $x; };
hscript_ExprDef.EField = function(e,f) { var $x = ["EField",5,e,f]; $x.__enum__ = hscript_ExprDef; $x.toString = $estr; return $x; };
hscript_ExprDef.EBinop = function(op,e1,e2) { var $x = ["EBinop",6,op,e1,e2]; $x.__enum__ = hscript_ExprDef; $x.toString = $estr; return $x; };
hscript_ExprDef.EUnop = function(op,prefix,e) { var $x = ["EUnop",7,op,prefix,e]; $x.__enum__ = hscript_ExprDef; $x.toString = $estr; return $x; };
hscript_ExprDef.ECall = function(e,params) { var $x = ["ECall",8,e,params]; $x.__enum__ = hscript_ExprDef; $x.toString = $estr; return $x; };
hscript_ExprDef.EIf = function(cond,e1,e2) { var $x = ["EIf",9,cond,e1,e2]; $x.__enum__ = hscript_ExprDef; $x.toString = $estr; return $x; };
hscript_ExprDef.EWhile = function(cond,e) { var $x = ["EWhile",10,cond,e]; $x.__enum__ = hscript_ExprDef; $x.toString = $estr; return $x; };
hscript_ExprDef.EFor = function(v,it,e) { var $x = ["EFor",11,v,it,e]; $x.__enum__ = hscript_ExprDef; $x.toString = $estr; return $x; };
hscript_ExprDef.EBreak = ["EBreak",12];
hscript_ExprDef.EBreak.toString = $estr;
hscript_ExprDef.EBreak.__enum__ = hscript_ExprDef;
hscript_ExprDef.EContinue = ["EContinue",13];
hscript_ExprDef.EContinue.toString = $estr;
hscript_ExprDef.EContinue.__enum__ = hscript_ExprDef;
hscript_ExprDef.EFunction = function(args,e,name,ret) { var $x = ["EFunction",14,args,e,name,ret]; $x.__enum__ = hscript_ExprDef; $x.toString = $estr; return $x; };
hscript_ExprDef.EReturn = function(e) { var $x = ["EReturn",15,e]; $x.__enum__ = hscript_ExprDef; $x.toString = $estr; return $x; };
hscript_ExprDef.EArray = function(e,index) { var $x = ["EArray",16,e,index]; $x.__enum__ = hscript_ExprDef; $x.toString = $estr; return $x; };
hscript_ExprDef.EArrayDecl = function(e) { var $x = ["EArrayDecl",17,e]; $x.__enum__ = hscript_ExprDef; $x.toString = $estr; return $x; };
hscript_ExprDef.ENew = function(cl,params) { var $x = ["ENew",18,cl,params]; $x.__enum__ = hscript_ExprDef; $x.toString = $estr; return $x; };
hscript_ExprDef.EThrow = function(e) { var $x = ["EThrow",19,e]; $x.__enum__ = hscript_ExprDef; $x.toString = $estr; return $x; };
hscript_ExprDef.ETry = function(e,v,t,ecatch) { var $x = ["ETry",20,e,v,t,ecatch]; $x.__enum__ = hscript_ExprDef; $x.toString = $estr; return $x; };
hscript_ExprDef.EObject = function(fl) { var $x = ["EObject",21,fl]; $x.__enum__ = hscript_ExprDef; $x.toString = $estr; return $x; };
hscript_ExprDef.ETernary = function(cond,e1,e2) { var $x = ["ETernary",22,cond,e1,e2]; $x.__enum__ = hscript_ExprDef; $x.toString = $estr; return $x; };
hscript_ExprDef.ESwitch = function(e,cases,defaultExpr) { var $x = ["ESwitch",23,e,cases,defaultExpr]; $x.__enum__ = hscript_ExprDef; $x.toString = $estr; return $x; };
var hscript_CType = $hxClasses["hscript.CType"] = { __ename__ : ["hscript","CType"], __constructs__ : ["CTPath","CTFun","CTAnon","CTParent"] };
hscript_CType.CTPath = function(path,params) { var $x = ["CTPath",0,path,params]; $x.__enum__ = hscript_CType; $x.toString = $estr; return $x; };
hscript_CType.CTFun = function(args,ret) { var $x = ["CTFun",1,args,ret]; $x.__enum__ = hscript_CType; $x.toString = $estr; return $x; };
hscript_CType.CTAnon = function(fields) { var $x = ["CTAnon",2,fields]; $x.__enum__ = hscript_CType; $x.toString = $estr; return $x; };
hscript_CType.CTParent = function(t) { var $x = ["CTParent",3,t]; $x.__enum__ = hscript_CType; $x.toString = $estr; return $x; };
var hscript_Error = function(e,pmin,pmax) {
	this.e = e;
	this.pmin = pmin;
	this.pmax = pmax;
};
$hxClasses["hscript.Error"] = hscript_Error;
hscript_Error.__name__ = ["hscript","Error"];
hscript_Error.prototype = {
	e: null
	,pmin: null
	,pmax: null
	,__class__: hscript_Error
};
var hscript_ErrorDef = $hxClasses["hscript.ErrorDef"] = { __ename__ : ["hscript","ErrorDef"], __constructs__ : ["EInvalidChar","EUnexpected","EUnterminatedString","EUnterminatedComment","EUnknownVariable","EInvalidIterator","EInvalidOp","EInvalidAccess"] };
hscript_ErrorDef.EInvalidChar = function(c) { var $x = ["EInvalidChar",0,c]; $x.__enum__ = hscript_ErrorDef; $x.toString = $estr; return $x; };
hscript_ErrorDef.EUnexpected = function(s) { var $x = ["EUnexpected",1,s]; $x.__enum__ = hscript_ErrorDef; $x.toString = $estr; return $x; };
hscript_ErrorDef.EUnterminatedString = ["EUnterminatedString",2];
hscript_ErrorDef.EUnterminatedString.toString = $estr;
hscript_ErrorDef.EUnterminatedString.__enum__ = hscript_ErrorDef;
hscript_ErrorDef.EUnterminatedComment = ["EUnterminatedComment",3];
hscript_ErrorDef.EUnterminatedComment.toString = $estr;
hscript_ErrorDef.EUnterminatedComment.__enum__ = hscript_ErrorDef;
hscript_ErrorDef.EUnknownVariable = function(v) { var $x = ["EUnknownVariable",4,v]; $x.__enum__ = hscript_ErrorDef; $x.toString = $estr; return $x; };
hscript_ErrorDef.EInvalidIterator = function(v) { var $x = ["EInvalidIterator",5,v]; $x.__enum__ = hscript_ErrorDef; $x.toString = $estr; return $x; };
hscript_ErrorDef.EInvalidOp = function(op) { var $x = ["EInvalidOp",6,op]; $x.__enum__ = hscript_ErrorDef; $x.toString = $estr; return $x; };
hscript_ErrorDef.EInvalidAccess = function(f) { var $x = ["EInvalidAccess",7,f]; $x.__enum__ = hscript_ErrorDef; $x.toString = $estr; return $x; };
var hscript_Token = $hxClasses["hscript.Token"] = { __ename__ : ["hscript","Token"], __constructs__ : ["TEof","TConst","TId","TOp","TPOpen","TPClose","TBrOpen","TBrClose","TDot","TComma","TSemicolon","TBkOpen","TBkClose","TQuestion","TDoubleDot"] };
hscript_Token.TEof = ["TEof",0];
hscript_Token.TEof.toString = $estr;
hscript_Token.TEof.__enum__ = hscript_Token;
hscript_Token.TConst = function(c) { var $x = ["TConst",1,c]; $x.__enum__ = hscript_Token; $x.toString = $estr; return $x; };
hscript_Token.TId = function(s) { var $x = ["TId",2,s]; $x.__enum__ = hscript_Token; $x.toString = $estr; return $x; };
hscript_Token.TOp = function(s) { var $x = ["TOp",3,s]; $x.__enum__ = hscript_Token; $x.toString = $estr; return $x; };
hscript_Token.TPOpen = ["TPOpen",4];
hscript_Token.TPOpen.toString = $estr;
hscript_Token.TPOpen.__enum__ = hscript_Token;
hscript_Token.TPClose = ["TPClose",5];
hscript_Token.TPClose.toString = $estr;
hscript_Token.TPClose.__enum__ = hscript_Token;
hscript_Token.TBrOpen = ["TBrOpen",6];
hscript_Token.TBrOpen.toString = $estr;
hscript_Token.TBrOpen.__enum__ = hscript_Token;
hscript_Token.TBrClose = ["TBrClose",7];
hscript_Token.TBrClose.toString = $estr;
hscript_Token.TBrClose.__enum__ = hscript_Token;
hscript_Token.TDot = ["TDot",8];
hscript_Token.TDot.toString = $estr;
hscript_Token.TDot.__enum__ = hscript_Token;
hscript_Token.TComma = ["TComma",9];
hscript_Token.TComma.toString = $estr;
hscript_Token.TComma.__enum__ = hscript_Token;
hscript_Token.TSemicolon = ["TSemicolon",10];
hscript_Token.TSemicolon.toString = $estr;
hscript_Token.TSemicolon.__enum__ = hscript_Token;
hscript_Token.TBkOpen = ["TBkOpen",11];
hscript_Token.TBkOpen.toString = $estr;
hscript_Token.TBkOpen.__enum__ = hscript_Token;
hscript_Token.TBkClose = ["TBkClose",12];
hscript_Token.TBkClose.toString = $estr;
hscript_Token.TBkClose.__enum__ = hscript_Token;
hscript_Token.TQuestion = ["TQuestion",13];
hscript_Token.TQuestion.toString = $estr;
hscript_Token.TQuestion.__enum__ = hscript_Token;
hscript_Token.TDoubleDot = ["TDoubleDot",14];
hscript_Token.TDoubleDot.toString = $estr;
hscript_Token.TDoubleDot.__enum__ = hscript_Token;
var hscript_Parser = function() {
	this.uid = 0;
	this.line = 1;
	this.opChars = "+*/-=!><&|^%~";
	this.identChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";
	var priorities = [["%"],["*","/"],["+","-"],["<<",">>",">>>"],["|","&","^"],["==","!=",">","<",">=","<="],["..."],["&&"],["||"],["=","+=","-=","*=","/=","%=","<<=",">>=",">>>=","|=","&=","^="]];
	this.opPriority = new haxe_ds_StringMap();
	this.opRightAssoc = new haxe_ds_StringMap();
	this.unops = new haxe_ds_StringMap();
	var _g1 = 0;
	var _g = priorities.length;
	while(_g1 < _g) {
		var i = _g1++;
		var _g2 = 0;
		var _g3 = priorities[i];
		while(_g2 < _g3.length) {
			var x = _g3[_g2];
			++_g2;
			this.opPriority.set(x,i);
			if(i == 9) this.opRightAssoc.set(x,true);
		}
	}
	var _g4 = 0;
	var _g11 = ["!","++","--","-","~"];
	while(_g4 < _g11.length) {
		var x1 = _g11[_g4];
		++_g4;
		this.unops.set(x1,x1 == "++" || x1 == "--");
	}
};
$hxClasses["hscript.Parser"] = hscript_Parser;
hscript_Parser.__name__ = ["hscript","Parser"];
hscript_Parser.prototype = {
	line: null
	,opChars: null
	,identChars: null
	,opPriority: null
	,opRightAssoc: null
	,unops: null
	,allowJSON: null
	,allowTypes: null
	,input: null
	,'char': null
	,ops: null
	,idents: null
	,uid: null
	,readPos: null
	,tokenMin: null
	,tokenMax: null
	,oldTokenMin: null
	,oldTokenMax: null
	,tokens: null
	,error: function(err,pmin,pmax) {
		throw new js__$Boot_HaxeError(new hscript_Error(err,pmin,pmax));
	}
	,invalidChar: function(c) {
		this.error(hscript_ErrorDef.EInvalidChar(c),this.readPos,this.readPos);
	}
	,parseString: function(s) {
		this.line = 1;
		this.uid = 0;
		return this.parse(new haxe_io_StringInput(s));
	}
	,parse: function(s) {
		this.readPos = 0;
		this.tokenMin = this.oldTokenMin = 0;
		this.tokenMax = this.oldTokenMax = 0;
		this.tokens = new List();
		this["char"] = -1;
		this.input = s;
		this.ops = [];
		this.idents = [];
		var _g1 = 0;
		var _g = this.opChars.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.ops[HxOverrides.cca(this.opChars,i)] = true;
		}
		var _g11 = 0;
		var _g2 = this.identChars.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			this.idents[HxOverrides.cca(this.identChars,i1)] = true;
		}
		var a = [];
		while(true) {
			var tk = this.token();
			if(tk == hscript_Token.TEof) break;
			this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
			this.tokenMin = this.oldTokenMin;
			this.tokenMax = this.oldTokenMax;
			a.push(this.parseFullExpr());
		}
		if(a.length == 1) return a[0]; else return this.mk(hscript_ExprDef.EBlock(a),0,null);
	}
	,unexpected: function(tk) {
		this.error(hscript_ErrorDef.EUnexpected(this.tokenString(tk)),this.tokenMin,this.tokenMax);
		return null;
	}
	,push: function(tk) {
		this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
		this.tokenMin = this.oldTokenMin;
		this.tokenMax = this.oldTokenMax;
	}
	,ensure: function(tk) {
		var t = this.token();
		if(t != tk) this.unexpected(t);
	}
	,expr: function(e) {
		return e.e;
	}
	,pmin: function(e) {
		return e.pmin;
	}
	,pmax: function(e) {
		return e.pmax;
	}
	,mk: function(e,pmin,pmax) {
		if(pmin == null) pmin = this.tokenMin;
		if(pmax == null) pmax = this.tokenMax;
		return { e : e, pmin : pmin, pmax : pmax};
	}
	,isBlock: function(e) {
		{
			var _g = e.e;
			switch(_g[1]) {
			case 4:case 21:case 23:
				return true;
			case 14:
				var e1 = _g[3];
				return this.isBlock(e1);
			case 2:
				var e2 = _g[4];
				return e2 != null && this.isBlock(e2);
			case 9:
				var e21 = _g[4];
				var e11 = _g[3];
				if(e21 != null) return this.isBlock(e21); else return this.isBlock(e11);
				break;
			case 6:
				var e3 = _g[4];
				return this.isBlock(e3);
			case 7:
				var e4 = _g[4];
				var prefix = _g[3];
				return !prefix && this.isBlock(e4);
			case 10:
				var e5 = _g[3];
				return this.isBlock(e5);
			case 11:
				var e6 = _g[4];
				return this.isBlock(e6);
			case 15:
				var e7 = _g[2];
				return e7 != null && this.isBlock(e7);
			case 20:
				var e8 = _g[5];
				return this.isBlock(e8);
			default:
				return false;
			}
		}
	}
	,parseFullExpr: function() {
		var e = this.parseExpr();
		var tk = this.token();
		if(tk != hscript_Token.TSemicolon && tk != hscript_Token.TEof) {
			if(this.isBlock(e)) {
				this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
				this.tokenMin = this.oldTokenMin;
				this.tokenMax = this.oldTokenMax;
			} else this.unexpected(tk);
		}
		return e;
	}
	,parseObject: function(p1) {
		var fl = [];
		try {
			while(true) {
				var tk = this.token();
				var id = null;
				switch(tk[1]) {
				case 2:
					var i = tk[2];
					id = i;
					break;
				case 1:
					var c = tk[2];
					if(!this.allowJSON) this.unexpected(tk);
					switch(c[1]) {
					case 2:
						var s = c[2];
						id = s;
						break;
					default:
						this.unexpected(tk);
					}
					break;
				case 7:
					throw "__break__";
					break;
				default:
					this.unexpected(tk);
				}
				this.ensure(hscript_Token.TDoubleDot);
				fl.push({ name : id, e : this.parseExpr()});
				tk = this.token();
				switch(tk[1]) {
				case 7:
					throw "__break__";
					break;
				case 9:
					break;
				default:
					this.unexpected(tk);
				}
			}
		} catch( e ) { if( e != "__break__" ) throw e; }
		return this.parseExprNext(this.mk(hscript_ExprDef.EObject(fl),p1,null));
	}
	,parseExpr: function() {
		var tk = this.token();
		var p1 = this.tokenMin;
		switch(tk[1]) {
		case 2:
			var id = tk[2];
			var e = this.parseStructure(id);
			if(e == null) e = this.mk(hscript_ExprDef.EIdent(id),null,null);
			return this.parseExprNext(e);
		case 1:
			var c = tk[2];
			return this.parseExprNext(this.mk(hscript_ExprDef.EConst(c),null,null));
		case 4:
			var e1 = this.parseExpr();
			this.ensure(hscript_Token.TPClose);
			return this.parseExprNext(this.mk(hscript_ExprDef.EParent(e1),p1,this.tokenMax));
		case 6:
			tk = this.token();
			switch(tk[1]) {
			case 7:
				return this.parseExprNext(this.mk(hscript_ExprDef.EObject([]),p1,null));
			case 2:
				var tk2 = this.token();
				this.tokens.push({ t : tk2, min : this.tokenMin, max : this.tokenMax});
				this.tokenMin = this.oldTokenMin;
				this.tokenMax = this.oldTokenMax;
				this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
				this.tokenMin = this.oldTokenMin;
				this.tokenMax = this.oldTokenMax;
				switch(tk2[1]) {
				case 14:
					return this.parseExprNext(this.parseObject(p1));
				default:
				}
				break;
			case 1:
				var c1 = tk[2];
				if(this.allowJSON) switch(c1[1]) {
				case 2:
					var tk21 = this.token();
					this.tokens.push({ t : tk21, min : this.tokenMin, max : this.tokenMax});
					this.tokenMin = this.oldTokenMin;
					this.tokenMax = this.oldTokenMax;
					this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
					this.tokenMin = this.oldTokenMin;
					this.tokenMax = this.oldTokenMax;
					switch(tk21[1]) {
					case 14:
						return this.parseExprNext(this.parseObject(p1));
					default:
					}
					break;
				default:
					this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
					this.tokenMin = this.oldTokenMin;
					this.tokenMax = this.oldTokenMax;
				} else {
					this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
					this.tokenMin = this.oldTokenMin;
					this.tokenMax = this.oldTokenMax;
				}
				break;
			default:
				this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
				this.tokenMin = this.oldTokenMin;
				this.tokenMax = this.oldTokenMax;
			}
			var a = [];
			while(true) {
				a.push(this.parseFullExpr());
				tk = this.token();
				if(tk == hscript_Token.TBrClose) break;
				this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
				this.tokenMin = this.oldTokenMin;
				this.tokenMax = this.oldTokenMax;
			}
			return this.mk(hscript_ExprDef.EBlock(a),p1,null);
		case 3:
			var op = tk[2];
			if(this.unops.exists(op)) return this.makeUnop(op,this.parseExpr());
			return this.unexpected(tk);
		case 11:
			var a1 = [];
			tk = this.token();
			while(tk != hscript_Token.TBkClose) {
				this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
				this.tokenMin = this.oldTokenMin;
				this.tokenMax = this.oldTokenMax;
				a1.push(this.parseExpr());
				tk = this.token();
				if(tk == hscript_Token.TComma) tk = this.token();
			}
			if(a1.length == 1) {
				var _g = a1[0].e;
				switch(_g[1]) {
				case 11:case 10:
					var tmp = "__a_" + this.uid++;
					var e2 = this.mk(hscript_ExprDef.EBlock([this.mk(hscript_ExprDef.EVar(tmp,null,this.mk(hscript_ExprDef.EArrayDecl([]),p1,null)),p1,null),this.mapCompr(tmp,a1[0]),this.mk(hscript_ExprDef.EIdent(tmp),p1,null)]),p1,null);
					return this.parseExprNext(e2);
				default:
				}
			}
			return this.parseExprNext(this.mk(hscript_ExprDef.EArrayDecl(a1),p1,null));
		default:
			return this.unexpected(tk);
		}
	}
	,mapCompr: function(tmp,e) {
		var edef;
		{
			var _g = e.e;
			switch(_g[1]) {
			case 11:
				var e2 = _g[4];
				var it = _g[3];
				var v = _g[2];
				edef = hscript_ExprDef.EFor(v,it,this.mapCompr(tmp,e2));
				break;
			case 10:
				var e21 = _g[3];
				var cond = _g[2];
				edef = hscript_ExprDef.EWhile(cond,this.mapCompr(tmp,e21));
				break;
			case 9:
				var e22 = _g[4];
				var e1 = _g[3];
				var cond1 = _g[2];
				if(e22 == null) edef = hscript_ExprDef.EIf(cond1,this.mapCompr(tmp,e1),null); else edef = hscript_ExprDef.ECall(this.mk(hscript_ExprDef.EField(this.mk(hscript_ExprDef.EIdent(tmp),e.pmin,e.pmax),"push"),e.pmin,e.pmax),[e]);
				break;
			case 4:
				switch(_g[2].length) {
				case 1:
					var e3 = _g[2][0];
					edef = hscript_ExprDef.EBlock([this.mapCompr(tmp,e3)]);
					break;
				default:
					edef = hscript_ExprDef.ECall(this.mk(hscript_ExprDef.EField(this.mk(hscript_ExprDef.EIdent(tmp),e.pmin,e.pmax),"push"),e.pmin,e.pmax),[e]);
				}
				break;
			case 3:
				var e23 = _g[2];
				edef = hscript_ExprDef.EParent(this.mapCompr(tmp,e23));
				break;
			default:
				edef = hscript_ExprDef.ECall(this.mk(hscript_ExprDef.EField(this.mk(hscript_ExprDef.EIdent(tmp),e.pmin,e.pmax),"push"),e.pmin,e.pmax),[e]);
			}
		}
		return this.mk(edef,e.pmin,e.pmax);
	}
	,makeUnop: function(op,e) {
		{
			var _g = e.e;
			switch(_g[1]) {
			case 6:
				var e2 = _g[4];
				var e1 = _g[3];
				var bop = _g[2];
				return this.mk(hscript_ExprDef.EBinop(bop,this.makeUnop(op,e1),e2),e1.pmin,e2.pmax);
			case 22:
				var e3 = _g[4];
				var e21 = _g[3];
				var e11 = _g[2];
				return this.mk(hscript_ExprDef.ETernary(this.makeUnop(op,e11),e21,e3),e11.pmin,e3.pmax);
			default:
				return this.mk(hscript_ExprDef.EUnop(op,true,e),e.pmin,e.pmax);
			}
		}
	}
	,makeBinop: function(op,e1,e) {
		{
			var _g = e.e;
			switch(_g[1]) {
			case 6:
				var e3 = _g[4];
				var e2 = _g[3];
				var op2 = _g[2];
				if(this.opPriority.get(op) <= this.opPriority.get(op2) && !this.opRightAssoc.exists(op)) return this.mk(hscript_ExprDef.EBinop(op2,this.makeBinop(op,e1,e2),e3),e1.pmin,e3.pmax); else return this.mk(hscript_ExprDef.EBinop(op,e1,e),e1.pmin,e.pmax);
				break;
			case 22:
				var e4 = _g[4];
				var e31 = _g[3];
				var e21 = _g[2];
				if(this.opRightAssoc.exists(op)) return this.mk(hscript_ExprDef.EBinop(op,e1,e),e1.pmin,e.pmax); else return this.mk(hscript_ExprDef.ETernary(this.makeBinop(op,e1,e21),e31,e4),e1.pmin,e.pmax);
				break;
			default:
				return this.mk(hscript_ExprDef.EBinop(op,e1,e),e1.pmin,e.pmax);
			}
		}
	}
	,parseStructure: function(id) {
		var p1 = this.tokenMin;
		switch(id) {
		case "if":
			this.ensure(hscript_Token.TPOpen);
			var cond = this.parseExpr();
			this.ensure(hscript_Token.TPClose);
			var e1 = this.parseExpr();
			var e2 = null;
			var semic = false;
			var tk = this.token();
			if(tk == hscript_Token.TSemicolon) {
				semic = true;
				tk = this.token();
			}
			if(Type.enumEq(tk,hscript_Token.TId("else"))) e2 = this.parseExpr(); else {
				this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
				this.tokenMin = this.oldTokenMin;
				this.tokenMax = this.oldTokenMax;
				if(semic) {
					this.tokens.push({ t : hscript_Token.TSemicolon, min : this.tokenMin, max : this.tokenMax});
					this.tokenMin = this.oldTokenMin;
					this.tokenMax = this.oldTokenMax;
				}
			}
			return this.mk(hscript_ExprDef.EIf(cond,e1,e2),p1,e2 == null?this.tokenMax:e2.pmax);
		case "var":
			var tk1 = this.token();
			var ident = null;
			switch(tk1[1]) {
			case 2:
				var id1 = tk1[2];
				ident = id1;
				break;
			default:
				this.unexpected(tk1);
			}
			tk1 = this.token();
			var t = null;
			if(tk1 == hscript_Token.TDoubleDot && this.allowTypes) {
				t = this.parseType();
				tk1 = this.token();
			}
			var e = null;
			if(Type.enumEq(tk1,hscript_Token.TOp("="))) e = this.parseExpr(); else {
				this.tokens.push({ t : tk1, min : this.tokenMin, max : this.tokenMax});
				this.tokenMin = this.oldTokenMin;
				this.tokenMax = this.oldTokenMax;
			}
			return this.mk(hscript_ExprDef.EVar(ident,t,e),p1,e == null?this.tokenMax:e.pmax);
		case "while":
			var econd = this.parseExpr();
			var e3 = this.parseExpr();
			return this.mk(hscript_ExprDef.EWhile(econd,e3),p1,e3.pmax);
		case "for":
			this.ensure(hscript_Token.TPOpen);
			var tk2 = this.token();
			var vname = null;
			switch(tk2[1]) {
			case 2:
				var id2 = tk2[2];
				vname = id2;
				break;
			default:
				this.unexpected(tk2);
			}
			tk2 = this.token();
			if(!Type.enumEq(tk2,hscript_Token.TId("in"))) this.unexpected(tk2);
			var eiter = this.parseExpr();
			this.ensure(hscript_Token.TPClose);
			var e4 = this.parseExpr();
			return this.mk(hscript_ExprDef.EFor(vname,eiter,e4),p1,e4.pmax);
		case "break":
			return this.mk(hscript_ExprDef.EBreak,null,null);
		case "continue":
			return this.mk(hscript_ExprDef.EContinue,null,null);
		case "else":
			return this.unexpected(hscript_Token.TId(id));
		case "function":
			var tk3 = this.token();
			var name = null;
			switch(tk3[1]) {
			case 2:
				var id3 = tk3[2];
				name = id3;
				break;
			default:
				this.tokens.push({ t : tk3, min : this.tokenMin, max : this.tokenMax});
				this.tokenMin = this.oldTokenMin;
				this.tokenMax = this.oldTokenMax;
			}
			this.ensure(hscript_Token.TPOpen);
			var args = [];
			tk3 = this.token();
			if(tk3 != hscript_Token.TPClose) {
				var done = false;
				while(!done) {
					var name1 = null;
					var opt = false;
					switch(tk3[1]) {
					case 13:
						opt = true;
						tk3 = this.token();
						break;
					default:
					}
					switch(tk3[1]) {
					case 2:
						var id4 = tk3[2];
						name1 = id4;
						break;
					default:
						this.unexpected(tk3);
					}
					tk3 = this.token();
					var arg = { name : name1};
					args.push(arg);
					if(opt) arg.opt = true;
					if(tk3 == hscript_Token.TDoubleDot && this.allowTypes) {
						arg.t = this.parseType();
						tk3 = this.token();
					}
					switch(tk3[1]) {
					case 9:
						tk3 = this.token();
						break;
					case 5:
						done = true;
						break;
					default:
						this.unexpected(tk3);
					}
				}
			}
			var ret = null;
			if(this.allowTypes) {
				tk3 = this.token();
				if(tk3 != hscript_Token.TDoubleDot) {
					this.tokens.push({ t : tk3, min : this.tokenMin, max : this.tokenMax});
					this.tokenMin = this.oldTokenMin;
					this.tokenMax = this.oldTokenMax;
				} else ret = this.parseType();
			}
			var body = this.parseExpr();
			return this.mk(hscript_ExprDef.EFunction(args,body,name,ret),p1,body.pmax);
		case "return":
			var tk4 = this.token();
			this.tokens.push({ t : tk4, min : this.tokenMin, max : this.tokenMax});
			this.tokenMin = this.oldTokenMin;
			this.tokenMax = this.oldTokenMax;
			var e5;
			if(tk4 == hscript_Token.TSemicolon) e5 = null; else e5 = this.parseExpr();
			return this.mk(hscript_ExprDef.EReturn(e5),p1,e5 == null?this.tokenMax:e5.pmax);
		case "new":
			var a = [];
			var tk5 = this.token();
			switch(tk5[1]) {
			case 2:
				var id5 = tk5[2];
				a.push(id5);
				break;
			default:
				this.unexpected(tk5);
			}
			var next = true;
			while(next) {
				tk5 = this.token();
				switch(tk5[1]) {
				case 8:
					tk5 = this.token();
					switch(tk5[1]) {
					case 2:
						var id6 = tk5[2];
						a.push(id6);
						break;
					default:
						this.unexpected(tk5);
					}
					break;
				case 4:
					next = false;
					break;
				default:
					this.unexpected(tk5);
				}
			}
			var args1 = this.parseExprList(hscript_Token.TPClose);
			return this.mk(hscript_ExprDef.ENew(a.join("."),args1),p1,null);
		case "throw":
			var e6 = this.parseExpr();
			return this.mk(hscript_ExprDef.EThrow(e6),p1,e6.pmax);
		case "try":
			var e7 = this.parseExpr();
			var tk6 = this.token();
			if(!Type.enumEq(tk6,hscript_Token.TId("catch"))) this.unexpected(tk6);
			this.ensure(hscript_Token.TPOpen);
			tk6 = this.token();
			var vname1;
			switch(tk6[1]) {
			case 2:
				var id7 = tk6[2];
				vname1 = id7;
				break;
			default:
				vname1 = this.unexpected(tk6);
			}
			this.ensure(hscript_Token.TDoubleDot);
			var t1 = null;
			if(this.allowTypes) t1 = this.parseType(); else {
				tk6 = this.token();
				if(!Type.enumEq(tk6,hscript_Token.TId("Dynamic"))) this.unexpected(tk6);
			}
			this.ensure(hscript_Token.TPClose);
			var ec = this.parseExpr();
			return this.mk(hscript_ExprDef.ETry(e7,vname1,t1,ec),p1,ec.pmax);
		case "switch":
			var e8 = this.parseExpr();
			var def = null;
			var cases = [];
			this.ensure(hscript_Token.TBrOpen);
			try {
				while(true) {
					var tk7 = this.token();
					switch(tk7[1]) {
					case 2:
						switch(tk7[2]) {
						case "case":
							var c = { values : [], expr : null};
							cases.push(c);
							try {
								while(true) {
									var e9 = this.parseExpr();
									c.values.push(e9);
									tk7 = this.token();
									switch(tk7[1]) {
									case 9:
										break;
									case 14:
										throw "__break__";
										break;
									default:
										this.unexpected(tk7);
									}
								}
							} catch( e ) { if( e != "__break__" ) throw e; }
							var exprs = [];
							try {
								while(true) {
									tk7 = this.token();
									this.tokens.push({ t : tk7, min : this.tokenMin, max : this.tokenMax});
									this.tokenMin = this.oldTokenMin;
									this.tokenMax = this.oldTokenMax;
									switch(tk7[1]) {
									case 2:
										switch(tk7[2]) {
										case "case":case "default":
											throw "__break__";
											break;
										default:
											exprs.push(this.parseFullExpr());
										}
										break;
									case 7:
										throw "__break__";
										break;
									default:
										exprs.push(this.parseFullExpr());
									}
								}
							} catch( e ) { if( e != "__break__" ) throw e; }
							if(exprs.length == 1) c.expr = exprs[0]; else if(exprs.length == 0) c.expr = this.mk(hscript_ExprDef.EBlock([]),this.tokenMin,this.tokenMin); else c.expr = this.mk(hscript_ExprDef.EBlock(exprs),exprs[0].pmin,exprs[exprs.length - 1].pmax);
							break;
						case "default":
							if(def != null) this.unexpected(tk7);
							this.ensure(hscript_Token.TDoubleDot);
							var exprs1 = [];
							try {
								while(true) {
									tk7 = this.token();
									this.tokens.push({ t : tk7, min : this.tokenMin, max : this.tokenMax});
									this.tokenMin = this.oldTokenMin;
									this.tokenMax = this.oldTokenMax;
									switch(tk7[1]) {
									case 2:
										switch(tk7[2]) {
										case "case":case "default":
											throw "__break__";
											break;
										default:
											exprs1.push(this.parseFullExpr());
										}
										break;
									case 7:
										throw "__break__";
										break;
									default:
										exprs1.push(this.parseFullExpr());
									}
								}
							} catch( e ) { if( e != "__break__" ) throw e; }
							if(exprs1.length == 1) def = exprs1[0]; else if(exprs1.length == 0) def = this.mk(hscript_ExprDef.EBlock([]),this.tokenMin,this.tokenMin); else def = this.mk(hscript_ExprDef.EBlock(exprs1),exprs1[0].pmin,exprs1[exprs1.length - 1].pmax);
							break;
						default:
							this.unexpected(tk7);
						}
						break;
					case 7:
						throw "__break__";
						break;
					default:
						this.unexpected(tk7);
					}
				}
			} catch( e ) { if( e != "__break__" ) throw e; }
			return this.mk(hscript_ExprDef.ESwitch(e8,cases,def),p1,this.tokenMax);
		default:
			return null;
		}
	}
	,parseExprNext: function(e1) {
		var tk = this.token();
		switch(tk[1]) {
		case 3:
			var op = tk[2];
			if(this.unops.get(op)) {
				if(this.isBlock(e1) || (function($this) {
					var $r;
					var _g = e1.e;
					$r = (function($this) {
						var $r;
						switch(_g[1]) {
						case 3:
							$r = true;
							break;
						default:
							$r = false;
						}
						return $r;
					}($this));
					return $r;
				}(this))) {
					this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
					this.tokenMin = this.oldTokenMin;
					this.tokenMax = this.oldTokenMax;
					return e1;
				}
				return this.parseExprNext(this.mk(hscript_ExprDef.EUnop(op,false,e1),e1.pmin,null));
			}
			return this.makeBinop(op,e1,this.parseExpr());
		case 8:
			tk = this.token();
			var field = null;
			switch(tk[1]) {
			case 2:
				var id = tk[2];
				field = id;
				break;
			default:
				this.unexpected(tk);
			}
			return this.parseExprNext(this.mk(hscript_ExprDef.EField(e1,field),e1.pmin,null));
		case 4:
			return this.parseExprNext(this.mk(hscript_ExprDef.ECall(e1,this.parseExprList(hscript_Token.TPClose)),e1.pmin,null));
		case 11:
			var e2 = this.parseExpr();
			this.ensure(hscript_Token.TBkClose);
			return this.parseExprNext(this.mk(hscript_ExprDef.EArray(e1,e2),e1.pmin,null));
		case 13:
			var e21 = this.parseExpr();
			this.ensure(hscript_Token.TDoubleDot);
			var e3 = this.parseExpr();
			return this.mk(hscript_ExprDef.ETernary(e1,e21,e3),e1.pmin,e3.pmax);
		default:
			this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
			this.tokenMin = this.oldTokenMin;
			this.tokenMax = this.oldTokenMax;
			return e1;
		}
	}
	,parseType: function() {
		var t = this.token();
		switch(t[1]) {
		case 2:
			var v = t[2];
			var path = [v];
			while(true) {
				t = this.token();
				if(t != hscript_Token.TDot) break;
				t = this.token();
				switch(t[1]) {
				case 2:
					var v1 = t[2];
					path.push(v1);
					break;
				default:
					this.unexpected(t);
				}
			}
			var params = null;
			switch(t[1]) {
			case 3:
				var op = t[2];
				if(op == "<") {
					params = [];
					try {
						while(true) {
							params.push(this.parseType());
							t = this.token();
							switch(t[1]) {
							case 9:
								continue;
								break;
							case 3:
								var op1 = t[2];
								if(op1 == ">") throw "__break__";
								if(HxOverrides.cca(op1,0) == 62) {
									this.tokens.add({ t : hscript_Token.TOp(HxOverrides.substr(op1,1,null)), min : this.tokenMax - op1.length - 1, max : this.tokenMax});
									throw "__break__";
								}
								break;
							default:
							}
							this.unexpected(t);
						}
					} catch( e ) { if( e != "__break__" ) throw e; }
				} else {
					this.tokens.push({ t : t, min : this.tokenMin, max : this.tokenMax});
					this.tokenMin = this.oldTokenMin;
					this.tokenMax = this.oldTokenMax;
				}
				break;
			default:
				this.tokens.push({ t : t, min : this.tokenMin, max : this.tokenMax});
				this.tokenMin = this.oldTokenMin;
				this.tokenMax = this.oldTokenMax;
			}
			return this.parseTypeNext(hscript_CType.CTPath(path,params));
		case 4:
			var t1 = this.parseType();
			this.ensure(hscript_Token.TPClose);
			return this.parseTypeNext(hscript_CType.CTParent(t1));
		case 6:
			var fields = [];
			try {
				while(true) {
					t = this.token();
					switch(t[1]) {
					case 7:
						throw "__break__";
						break;
					case 2:
						var name = t[2];
						this.ensure(hscript_Token.TDoubleDot);
						fields.push({ name : name, t : this.parseType()});
						t = this.token();
						switch(t[1]) {
						case 9:
							break;
						case 7:
							throw "__break__";
							break;
						default:
							this.unexpected(t);
						}
						break;
					default:
						this.unexpected(t);
					}
				}
			} catch( e ) { if( e != "__break__" ) throw e; }
			return this.parseTypeNext(hscript_CType.CTAnon(fields));
		default:
			return this.unexpected(t);
		}
	}
	,parseTypeNext: function(t) {
		var tk = this.token();
		switch(tk[1]) {
		case 3:
			var op = tk[2];
			if(op != "->") {
				this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
				this.tokenMin = this.oldTokenMin;
				this.tokenMax = this.oldTokenMax;
				return t;
			}
			break;
		default:
			this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
			this.tokenMin = this.oldTokenMin;
			this.tokenMax = this.oldTokenMax;
			return t;
		}
		var t2 = this.parseType();
		switch(t2[1]) {
		case 1:
			var args = t2[2];
			args.unshift(t);
			return t2;
		default:
			return hscript_CType.CTFun([t],t2);
		}
	}
	,parseExprList: function(etk) {
		var args = [];
		var tk = this.token();
		if(tk == etk) return args;
		this.tokens.push({ t : tk, min : this.tokenMin, max : this.tokenMax});
		this.tokenMin = this.oldTokenMin;
		this.tokenMax = this.oldTokenMax;
		try {
			while(true) {
				args.push(this.parseExpr());
				tk = this.token();
				switch(tk[1]) {
				case 9:
					break;
				default:
					if(tk == etk) throw "__break__";
					this.unexpected(tk);
				}
			}
		} catch( e ) { if( e != "__break__" ) throw e; }
		return args;
	}
	,incPos: function() {
		this.readPos++;
	}
	,readChar: function() {
		this.readPos++;
		try {
			return this.input.readByte();
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return 0;
		}
	}
	,readString: function(until) {
		var c = 0;
		var b = new haxe_io_BytesOutput();
		var esc = false;
		var old = this.line;
		var s = this.input;
		var p1 = this.readPos - 1;
		while(true) {
			try {
				this.readPos++;
				c = s.readByte();
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				this.line = old;
				throw new js__$Boot_HaxeError(new hscript_Error(hscript_ErrorDef.EUnterminatedString,p1,p1));
			}
			if(esc) {
				esc = false;
				switch(c) {
				case 110:
					b.writeByte(10);
					break;
				case 114:
					b.writeByte(13);
					break;
				case 116:
					b.writeByte(9);
					break;
				case 39:case 34:case 92:
					b.writeByte(c);
					break;
				case 47:
					if(this.allowJSON) b.writeByte(c); else this.invalidChar(c);
					break;
				case 117:
					if(!this.allowJSON) this.invalidChar(c);
					var code = null;
					try {
						this.readPos++;
						this.readPos++;
						this.readPos++;
						this.readPos++;
						code = s.readString(4);
					} catch( e1 ) {
						if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
						this.line = old;
						throw new js__$Boot_HaxeError(new hscript_Error(hscript_ErrorDef.EUnterminatedString,p1,p1));
					}
					var k = 0;
					var _g = 0;
					while(_g < 4) {
						var i = _g++;
						k <<= 4;
						var $char = HxOverrides.cca(code,i);
						if($char != null) switch($char) {
						case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
							k += $char - 48;
							break;
						case 65:case 66:case 67:case 68:case 69:case 70:
							k += $char - 55;
							break;
						case 97:case 98:case 99:case 100:case 101:case 102:
							k += $char - 87;
							break;
						default:
							this.invalidChar($char);
						} else this.invalidChar($char);
					}
					if(k <= 127) b.writeByte(k); else if(k <= 2047) {
						b.writeByte(192 | k >> 6);
						b.writeByte(128 | k & 63);
					} else {
						b.writeByte(224 | k >> 12);
						b.writeByte(128 | k >> 6 & 63);
						b.writeByte(128 | k & 63);
					}
					break;
				default:
					this.invalidChar(c);
				}
			} else if(c == 92) esc = true; else if(c == until) break; else {
				if(c == 10) this.line++;
				b.writeByte(c);
			}
		}
		return b.getBytes().toString();
	}
	,token: function() {
		var t = this.tokens.pop();
		if(t != null) {
			this.tokenMin = t.min;
			this.tokenMax = t.max;
			return t.t;
		}
		this.oldTokenMin = this.tokenMin;
		this.oldTokenMax = this.tokenMax;
		if(this["char"] < 0) this.tokenMin = this.readPos; else this.tokenMin = this.readPos - 1;
		var t1 = this._token();
		if(this["char"] < 0) this.tokenMax = this.readPos - 1; else this.tokenMax = this.readPos - 2;
		return t1;
	}
	,_token: function() {
		var $char;
		if(this["char"] < 0) $char = this.readChar(); else {
			$char = this["char"];
			this["char"] = -1;
		}
		while(true) {
			switch($char) {
			case 0:
				return hscript_Token.TEof;
			case 32:case 9:case 13:
				this.tokenMin++;
				break;
			case 10:
				this.line++;
				this.tokenMin++;
				break;
			case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
				var n = ($char - 48) * 1.0;
				var exp = 0.;
				while(true) {
					$char = this.readChar();
					exp *= 10;
					switch($char) {
					case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
						n = n * 10 + ($char - 48);
						break;
					case 46:
						if(exp > 0) {
							if(exp == 10 && this.readChar() == 46) {
								this.push(hscript_Token.TOp("..."));
								var i = n | 0;
								return hscript_Token.TConst(i == n?hscript_Const.CInt(i):hscript_Const.CFloat(n));
							}
							this.invalidChar($char);
						}
						exp = 1.;
						break;
					case 120:
						if(n > 0 || exp > 0) this.invalidChar($char);
						var n1 = 0;
						while(true) {
							$char = this.readChar();
							switch($char) {
							case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
								n1 = (n1 << 4) + $char - 48;
								break;
							case 65:case 66:case 67:case 68:case 69:case 70:
								n1 = (n1 << 4) + ($char - 55);
								break;
							case 97:case 98:case 99:case 100:case 101:case 102:
								n1 = (n1 << 4) + ($char - 87);
								break;
							default:
								this["char"] = $char;
								return hscript_Token.TConst(hscript_Const.CInt(n1));
							}
						}
						break;
					default:
						this["char"] = $char;
						var i1 = n | 0;
						return hscript_Token.TConst(exp > 0?hscript_Const.CFloat(n * 10 / exp):i1 == n?hscript_Const.CInt(i1):hscript_Const.CFloat(n));
					}
				}
				break;
			case 59:
				return hscript_Token.TSemicolon;
			case 40:
				return hscript_Token.TPOpen;
			case 41:
				return hscript_Token.TPClose;
			case 44:
				return hscript_Token.TComma;
			case 46:
				$char = this.readChar();
				switch($char) {
				case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
					var n2 = $char - 48;
					var exp1 = 1;
					while(true) {
						$char = this.readChar();
						exp1 *= 10;
						switch($char) {
						case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
							n2 = n2 * 10 + ($char - 48);
							break;
						default:
							this["char"] = $char;
							return hscript_Token.TConst(hscript_Const.CFloat(n2 / exp1));
						}
					}
					break;
				case 46:
					$char = this.readChar();
					if($char != 46) this.invalidChar($char);
					return hscript_Token.TOp("...");
				default:
					this["char"] = $char;
					return hscript_Token.TDot;
				}
				break;
			case 123:
				return hscript_Token.TBrOpen;
			case 125:
				return hscript_Token.TBrClose;
			case 91:
				return hscript_Token.TBkOpen;
			case 93:
				return hscript_Token.TBkClose;
			case 39:
				return hscript_Token.TConst(hscript_Const.CString(this.readString(39)));
			case 34:
				return hscript_Token.TConst(hscript_Const.CString(this.readString(34)));
			case 63:
				return hscript_Token.TQuestion;
			case 58:
				return hscript_Token.TDoubleDot;
			case 61:
				$char = this.readChar();
				if($char == 61) return hscript_Token.TOp("==");
				this["char"] = $char;
				return hscript_Token.TOp("=");
			default:
				if(this.ops[$char]) {
					var op = String.fromCharCode($char);
					var prev = -1;
					while(true) {
						$char = this.readChar();
						if(!this.ops[$char] || prev == 61) {
							if(HxOverrides.cca(op,0) == 47) return this.tokenComment(op,$char);
							this["char"] = $char;
							return hscript_Token.TOp(op);
						}
						prev = $char;
						op += String.fromCharCode($char);
					}
				}
				if(this.idents[$char]) {
					var id = String.fromCharCode($char);
					while(true) {
						$char = this.readChar();
						if(!this.idents[$char]) {
							this["char"] = $char;
							return hscript_Token.TId(id);
						}
						id += String.fromCharCode($char);
					}
				}
				this.invalidChar($char);
			}
			$char = this.readChar();
		}
		return null;
	}
	,tokenComment: function(op,$char) {
		var c = HxOverrides.cca(op,1);
		var s = this.input;
		if(c == 47) {
			try {
				while($char != 13 && $char != 10) {
					this.readPos++;
					$char = s.readByte();
				}
				this["char"] = $char;
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
			}
			return this.token();
		}
		if(c == 42) {
			var old = this.line;
			if(op == "/**/") {
				this["char"] = $char;
				return this.token();
			}
			try {
				while(true) {
					while($char != 42) {
						if($char == 10) this.line++;
						this.readPos++;
						$char = s.readByte();
					}
					this.readPos++;
					$char = s.readByte();
					if($char == 47) break;
				}
			} catch( e1 ) {
				if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
				this.line = old;
				throw new js__$Boot_HaxeError(new hscript_Error(hscript_ErrorDef.EUnterminatedComment,this.tokenMin,this.tokenMin));
			}
			return this.token();
		}
		this["char"] = $char;
		return hscript_Token.TOp(op);
	}
	,constString: function(c) {
		switch(c[1]) {
		case 0:
			var v = c[2];
			if(v == null) return "null"; else return "" + v;
			break;
		case 1:
			var f = c[2];
			if(f == null) return "null"; else return "" + f;
			break;
		case 2:
			var s = c[2];
			return s;
		}
	}
	,tokenString: function(t) {
		switch(t[1]) {
		case 0:
			return "<eof>";
		case 1:
			var c = t[2];
			return this.constString(c);
		case 2:
			var s = t[2];
			return s;
		case 3:
			var s1 = t[2];
			return s1;
		case 4:
			return "(";
		case 5:
			return ")";
		case 6:
			return "{";
		case 7:
			return "}";
		case 8:
			return ".";
		case 9:
			return ",";
		case 10:
			return ";";
		case 11:
			return "[";
		case 12:
			return "]";
		case 13:
			return "?";
		case 14:
			return ":";
		}
	}
	,__class__: hscript_Parser
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
$hxClasses["js._Boot.HaxeError"] = js__$Boot_HaxeError;
js__$Boot_HaxeError.__name__ = ["js","_Boot","HaxeError"];
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	val: null
	,__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = ["js","Boot"];
js_Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js_Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js_Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js_Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js_Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var js_Browser = function() { };
$hxClasses["js.Browser"] = js_Browser;
js_Browser.__name__ = ["js","Browser"];
js_Browser.alert = function(v) {
	window.alert(js_Boot.__string_rec(v,""));
};
var js_html__$CanvasElement_CanvasUtil = function() { };
$hxClasses["js.html._CanvasElement.CanvasUtil"] = js_html__$CanvasElement_CanvasUtil;
js_html__$CanvasElement_CanvasUtil.__name__ = ["js","html","_CanvasElement","CanvasUtil"];
js_html__$CanvasElement_CanvasUtil.getContextWebGL = function(canvas,attribs) {
	var _g = 0;
	var _g1 = ["webgl","experimental-webgl"];
	while(_g < _g1.length) {
		var name = _g1[_g];
		++_g;
		var ctx = canvas.getContext(name,attribs);
		if(ctx != null) return ctx;
	}
	return null;
};
var js_html_compat_ArrayBuffer = function(a) {
	if((a instanceof Array) && a.__enum__ == null) {
		this.a = a;
		this.byteLength = a.length;
	} else {
		var len = a;
		this.a = [];
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			this.a[i] = 0;
		}
		this.byteLength = len;
	}
};
$hxClasses["js.html.compat.ArrayBuffer"] = js_html_compat_ArrayBuffer;
js_html_compat_ArrayBuffer.__name__ = ["js","html","compat","ArrayBuffer"];
js_html_compat_ArrayBuffer.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null?null:end - begin);
	var result = new ArrayBuffer(u.byteLength);
	var resultArray = new Uint8Array(result);
	resultArray.set(u);
	return result;
};
js_html_compat_ArrayBuffer.prototype = {
	byteLength: null
	,a: null
	,slice: function(begin,end) {
		return new js_html_compat_ArrayBuffer(this.a.slice(begin,end));
	}
	,__class__: js_html_compat_ArrayBuffer
};
var js_html_compat_DataView = function(buffer,byteOffset,byteLength) {
	this.buf = buffer;
	if(byteOffset == null) this.offset = 0; else this.offset = byteOffset;
	if(byteLength == null) this.length = buffer.byteLength - this.offset; else this.length = byteLength;
	if(this.offset < 0 || this.length < 0 || this.offset + this.length > buffer.byteLength) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
};
$hxClasses["js.html.compat.DataView"] = js_html_compat_DataView;
js_html_compat_DataView.__name__ = ["js","html","compat","DataView"];
js_html_compat_DataView.prototype = {
	buf: null
	,offset: null
	,length: null
	,getInt8: function(byteOffset) {
		var v = this.buf.a[this.offset + byteOffset];
		if(v >= 128) return v - 256; else return v;
	}
	,getUint8: function(byteOffset) {
		return this.buf.a[this.offset + byteOffset];
	}
	,getInt16: function(byteOffset,littleEndian) {
		var v = this.getUint16(byteOffset,littleEndian);
		if(v >= 32768) return v - 65536; else return v;
	}
	,getUint16: function(byteOffset,littleEndian) {
		if(littleEndian) return this.buf.a[this.offset + byteOffset] | this.buf.a[this.offset + byteOffset + 1] << 8; else return this.buf.a[this.offset + byteOffset] << 8 | this.buf.a[this.offset + byteOffset + 1];
	}
	,getInt32: function(byteOffset,littleEndian) {
		var p = this.offset + byteOffset;
		var a = this.buf.a[p++];
		var b = this.buf.a[p++];
		var c = this.buf.a[p++];
		var d = this.buf.a[p++];
		if(littleEndian) return a | b << 8 | c << 16 | d << 24; else return d | c << 8 | b << 16 | a << 24;
	}
	,getUint32: function(byteOffset,littleEndian) {
		var v = this.getInt32(byteOffset,littleEndian);
		if(v < 0) return v + 4294967296.; else return v;
	}
	,getFloat32: function(byteOffset,littleEndian) {
		return haxe_io_FPHelper.i32ToFloat(this.getInt32(byteOffset,littleEndian));
	}
	,getFloat64: function(byteOffset,littleEndian) {
		var a = this.getInt32(byteOffset,littleEndian);
		var b = this.getInt32(byteOffset + 4,littleEndian);
		return haxe_io_FPHelper.i64ToDouble(littleEndian?a:b,littleEndian?b:a);
	}
	,setInt8: function(byteOffset,value) {
		if(value < 0) this.buf.a[byteOffset + this.offset] = value + 128 & 255; else this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setUint8: function(byteOffset,value) {
		this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setInt16: function(byteOffset,value,littleEndian) {
		this.setUint16(byteOffset,value < 0?value + 65536:value,littleEndian);
	}
	,setUint16: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
		} else {
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p] = value & 255;
		}
	}
	,setInt32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,value,littleEndian);
	}
	,setUint32: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p++] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >>> 24;
		} else {
			this.buf.a[p++] = value >>> 24;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value & 255;
		}
	}
	,setFloat32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,haxe_io_FPHelper.floatToI32(value),littleEndian);
	}
	,setFloat64: function(byteOffset,value,littleEndian) {
		var i64 = haxe_io_FPHelper.doubleToI64(value);
		if(littleEndian) {
			this.setUint32(byteOffset,i64.low);
			this.setUint32(byteOffset,i64.high);
		} else {
			this.setUint32(byteOffset,i64.high);
			this.setUint32(byteOffset,i64.low);
		}
	}
	,__class__: js_html_compat_DataView
};
var js_html_compat_Uint8Array = function() { };
$hxClasses["js.html.compat.Uint8Array"] = js_html_compat_Uint8Array;
js_html_compat_Uint8Array.__name__ = ["js","html","compat","Uint8Array"];
js_html_compat_Uint8Array._new = function(arg1,offset,length) {
	var arr;
	if(typeof(arg1) == "number") {
		arr = [];
		var _g = 0;
		while(_g < arg1) {
			var i = _g++;
			arr[i] = 0;
		}
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else if(js_Boot.__instanceof(arg1,js_html_compat_ArrayBuffer)) {
		var buffer = arg1;
		if(offset == null) offset = 0;
		if(length == null) length = buffer.byteLength - offset;
		if(offset == 0) arr = buffer.a; else arr = buffer.a.slice(offset,offset + length);
		arr.byteLength = arr.length;
		arr.byteOffset = offset;
		arr.buffer = buffer;
	} else if((arg1 instanceof Array) && arg1.__enum__ == null) {
		arr = arg1.slice();
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else throw new js__$Boot_HaxeError("TODO " + Std.string(arg1));
	arr.subarray = js_html_compat_Uint8Array._subarray;
	arr.set = js_html_compat_Uint8Array._set;
	return arr;
};
js_html_compat_Uint8Array._set = function(arg,offset) {
	var t = this;
	if(js_Boot.__instanceof(arg.buffer,js_html_compat_ArrayBuffer)) {
		var a = arg;
		if(arg.byteLength + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g1 = 0;
		var _g = arg.byteLength;
		while(_g1 < _g) {
			var i = _g1++;
			t[i + offset] = a[i];
		}
	} else if((arg instanceof Array) && arg.__enum__ == null) {
		var a1 = arg;
		if(a1.length + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g11 = 0;
		var _g2 = a1.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			t[i1 + offset] = a1[i1];
		}
	} else throw new js__$Boot_HaxeError("TODO");
};
js_html_compat_Uint8Array._subarray = function(start,end) {
	var t = this;
	var a = js_html_compat_Uint8Array._new(t.slice(start,end));
	a.byteOffset = start;
	return a;
};
var lime_AssetCache = function() {
	this.enabled = true;
	this.audio = new haxe_ds_StringMap();
	this.font = new haxe_ds_StringMap();
	this.image = new haxe_ds_StringMap();
	this.version = Std["int"](Math.random() * 1000000);
};
$hxClasses["lime.AssetCache"] = lime_AssetCache;
lime_AssetCache.__name__ = ["lime","AssetCache"];
lime_AssetCache.prototype = {
	audio: null
	,enabled: null
	,image: null
	,font: null
	,version: null
	,clear: function(prefix) {
		if(prefix == null) {
			this.audio = new haxe_ds_StringMap();
			this.font = new haxe_ds_StringMap();
			this.image = new haxe_ds_StringMap();
		} else {
			var keys = this.audio.keys();
			while( keys.hasNext() ) {
				var key = keys.next();
				if(StringTools.startsWith(key,prefix)) this.audio.remove(key);
			}
			var keys1 = this.font.keys();
			while( keys1.hasNext() ) {
				var key1 = keys1.next();
				if(StringTools.startsWith(key1,prefix)) this.font.remove(key1);
			}
			var keys2 = this.image.keys();
			while( keys2.hasNext() ) {
				var key2 = keys2.next();
				if(StringTools.startsWith(key2,prefix)) this.image.remove(key2);
			}
		}
	}
	,__class__: lime_AssetCache
};
var lime_app_Event_$Void_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
$hxClasses["lime.app.Event_Void_Void"] = lime_app_Event_$Void_$Void;
lime_app_Event_$Void_$Void.__name__ = ["lime","app","Event_Void_Void"];
lime_app_Event_$Void_$Void.prototype = {
	canceled: null
	,__repeat: null
	,__priorities: null
	,add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,cancel: function() {
		this.canceled = true;
	}
	,has: function(listener) {
		var _g = 0;
		var _g1 = this.__listeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			if(Reflect.compareMethods(l,listener)) return true;
		}
		return false;
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,__listeners: null
	,dispatch: function() {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i]();
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$Void_$Void
};
var lime_Assets = function() { };
$hxClasses["lime.Assets"] = lime_Assets;
lime_Assets.__name__ = ["lime","Assets"];
lime_Assets.exists = function(id,type) {
	lime_Assets.initialize();
	if(type == null) type = "BINARY";
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime_Assets.getLibrary(libraryName);
	if(library != null) return library.exists(symbolName,type);
	return false;
};
lime_Assets.getAudioBuffer = function(id,useCache) {
	if(useCache == null) useCache = true;
	lime_Assets.initialize();
	if(useCache && lime_Assets.cache.enabled && lime_Assets.cache.audio.exists(id)) {
		var audio = lime_Assets.cache.audio.get(id);
		if(lime_Assets.isValidAudio(audio)) return audio;
	}
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime_Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"SOUND")) {
			if(library.isLocal(symbolName,"SOUND")) {
				var audio1 = library.getAudioBuffer(symbolName);
				if(useCache && lime_Assets.cache.enabled) lime_Assets.cache.audio.set(id,audio1);
				return audio1;
			} else haxe_Log.trace("[Assets] Audio asset \"" + id + "\" exists, but only asynchronously",{ fileName : "Assets.hx", lineNumber : 122, className : "lime.Assets", methodName : "getAudioBuffer"});
		} else haxe_Log.trace("[Assets] There is no audio asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 128, className : "lime.Assets", methodName : "getAudioBuffer"});
	} else haxe_Log.trace("[Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 134, className : "lime.Assets", methodName : "getAudioBuffer"});
	return null;
};
lime_Assets.getBytes = function(id) {
	lime_Assets.initialize();
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime_Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"BINARY")) {
			if(library.isLocal(symbolName,"BINARY")) return library.getBytes(symbolName); else haxe_Log.trace("[Assets] String or Bytes asset \"" + id + "\" exists, but only asynchronously",{ fileName : "Assets.hx", lineNumber : 171, className : "lime.Assets", methodName : "getBytes"});
		} else haxe_Log.trace("[Assets] There is no String or Bytes asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 177, className : "lime.Assets", methodName : "getBytes"});
	} else haxe_Log.trace("[Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 183, className : "lime.Assets", methodName : "getBytes"});
	return null;
};
lime_Assets.getFont = function(id,useCache) {
	if(useCache == null) useCache = true;
	lime_Assets.initialize();
	if(useCache && lime_Assets.cache.enabled && lime_Assets.cache.font.exists(id)) return lime_Assets.cache.font.get(id);
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime_Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"FONT")) {
			if(library.isLocal(symbolName,"FONT")) {
				var font = library.getFont(symbolName);
				if(useCache && lime_Assets.cache.enabled) lime_Assets.cache.font.set(id,font);
				return font;
			} else haxe_Log.trace("[Assets] Font asset \"" + id + "\" exists, but only asynchronously",{ fileName : "Assets.hx", lineNumber : 234, className : "lime.Assets", methodName : "getFont"});
		} else haxe_Log.trace("[Assets] There is no Font asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 240, className : "lime.Assets", methodName : "getFont"});
	} else haxe_Log.trace("[Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 246, className : "lime.Assets", methodName : "getFont"});
	return null;
};
lime_Assets.getImage = function(id,useCache) {
	if(useCache == null) useCache = true;
	lime_Assets.initialize();
	if(useCache && lime_Assets.cache.enabled && lime_Assets.cache.image.exists(id)) {
		var image = lime_Assets.cache.image.get(id);
		if(lime_Assets.isValidImage(image)) return image;
	}
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime_Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"IMAGE")) {
			if(library.isLocal(symbolName,"IMAGE")) {
				var image1 = library.getImage(symbolName);
				if(useCache && lime_Assets.cache.enabled) lime_Assets.cache.image.set(id,image1);
				return image1;
			} else haxe_Log.trace("[Assets] Image asset \"" + id + "\" exists, but only asynchronously",{ fileName : "Assets.hx", lineNumber : 304, className : "lime.Assets", methodName : "getImage"});
		} else haxe_Log.trace("[Assets] There is no Image asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 310, className : "lime.Assets", methodName : "getImage"});
	} else haxe_Log.trace("[Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 316, className : "lime.Assets", methodName : "getImage"});
	return null;
};
lime_Assets.getLibrary = function(name) {
	if(name == null || name == "") name = "default";
	return lime_Assets.libraries.get(name);
};
lime_Assets.getPath = function(id) {
	lime_Assets.initialize();
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime_Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,null)) return library.getPath(symbolName); else haxe_Log.trace("[Assets] There is no asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 364, className : "lime.Assets", methodName : "getPath"});
	} else haxe_Log.trace("[Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 370, className : "lime.Assets", methodName : "getPath"});
	return null;
};
lime_Assets.getText = function(id) {
	lime_Assets.initialize();
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime_Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"TEXT")) {
			if(library.isLocal(symbolName,"TEXT")) return library.getText(symbolName); else haxe_Log.trace("[Assets] String asset \"" + id + "\" exists, but only asynchronously",{ fileName : "Assets.hx", lineNumber : 407, className : "lime.Assets", methodName : "getText"});
		} else haxe_Log.trace("[Assets] There is no String asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 413, className : "lime.Assets", methodName : "getText"});
	} else haxe_Log.trace("[Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 419, className : "lime.Assets", methodName : "getText"});
	return null;
};
lime_Assets.initialize = function() {
	if(!lime_Assets.initialized) {
		lime_Assets.registerLibrary("default",new DefaultAssetLibrary());
		lime_Assets.initialized = true;
	}
};
lime_Assets.isLocal = function(id,type,useCache) {
	if(useCache == null) useCache = true;
	lime_Assets.initialize();
	if(useCache && lime_Assets.cache.enabled) {
		if(type == "IMAGE" || type == null) {
			if(lime_Assets.cache.image.exists(id)) return true;
		}
		if(type == "FONT" || type == null) {
			if(lime_Assets.cache.font.exists(id)) return true;
		}
		if(type == "SOUND" || type == "MUSIC" || type == null) {
			if(lime_Assets.cache.audio.exists(id)) return true;
		}
	}
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime_Assets.getLibrary(libraryName);
	if(library != null) return library.isLocal(symbolName,type);
	return false;
};
lime_Assets.isValidAudio = function(buffer) {
	return buffer != null;
};
lime_Assets.isValidImage = function(buffer) {
	return true;
};
lime_Assets.list = function(type) {
	lime_Assets.initialize();
	var items = [];
	var $it0 = lime_Assets.libraries.iterator();
	while( $it0.hasNext() ) {
		var library = $it0.next();
		var libraryItems = library.list(type);
		if(libraryItems != null) items = items.concat(libraryItems);
	}
	return items;
};
lime_Assets.loadAudioBuffer = function(id,useCache) {
	if(useCache == null) useCache = true;
	lime_Assets.initialize();
	var promise = new lime_app_Promise();
	if(useCache && lime_Assets.cache.enabled && lime_Assets.cache.audio.exists(id)) {
		var audio = lime_Assets.cache.audio.get(id);
		if(lime_Assets.isValidAudio(audio)) {
			promise.complete(audio);
			return promise.future;
		}
	}
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime_Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"SOUND")) {
			var future = library.loadAudioBuffer(symbolName);
			if(useCache && lime_Assets.cache.enabled) future.onComplete(function(audio1) {
				lime_Assets.cache.audio.set(id,audio1);
			});
			promise.completeWith(future);
		} else promise.error("[Assets] There is no audio asset with an ID of \"" + id + "\"");
	} else promise.error("[Assets] There is no asset library named \"" + libraryName + "\"");
	return promise.future;
};
lime_Assets.loadBytes = function(id) {
	lime_Assets.initialize();
	var promise = new lime_app_Promise();
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime_Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"BINARY")) promise.completeWith(library.loadBytes(symbolName)); else promise.error("[Assets] There is no String or Bytes asset with an ID of \"" + id + "\"");
	} else promise.error("[Assets] There is no asset library named \"" + libraryName + "\"");
	return promise.future;
};
lime_Assets.loadFont = function(id) {
	lime_Assets.initialize();
	var promise = new lime_app_Promise();
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime_Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"FONT")) promise.completeWith(library.loadFont(symbolName)); else promise.error("[Assets] There is no Font asset with an ID of \"" + id + "\"");
	} else promise.error("[Assets] There is no asset library named \"" + libraryName + "\"");
	return promise.future;
};
lime_Assets.loadImage = function(id,useCache) {
	if(useCache == null) useCache = true;
	lime_Assets.initialize();
	var promise = new lime_app_Promise();
	if(useCache && lime_Assets.cache.enabled && lime_Assets.cache.image.exists(id)) {
		var image = lime_Assets.cache.image.get(id);
		if(lime_Assets.isValidImage(image)) {
			promise.complete(image);
			return promise.future;
		}
	}
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime_Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"IMAGE")) {
			var future = library.loadImage(symbolName);
			if(useCache && lime_Assets.cache.enabled) future.onComplete(function(image1) {
				lime_Assets.cache.image.set(id,image1);
			});
			promise.completeWith(future);
		} else promise.error("[Assets] There is no Image asset with an ID of \"" + id + "\"");
	} else promise.error("[Assets] There is no asset library named \"" + libraryName + "\"");
	return promise.future;
};
lime_Assets.loadLibrary = function(name) {
	lime_Assets.initialize();
	var promise = new lime_app_Promise();
	var data = lime_Assets.getText("libraries/" + name + ".json");
	if(data != null && data != "") {
		var info = JSON.parse(data);
		var library = Type.createInstance(Type.resolveClass(info.type),info.args);
		lime_Assets.libraries.set(name,library);
		library.onChange.add(($_=lime_Assets.onChange,$bind($_,$_.dispatch)));
		promise.completeWith(library.load());
	} else promise.error("[Assets] There is no asset library named \"" + name + "\"");
	return promise.future;
};
lime_Assets.loadText = function(id) {
	lime_Assets.initialize();
	var promise = new lime_app_Promise();
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime_Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"TEXT")) promise.completeWith(library.loadText(symbolName)); else promise.error("[Assets] There is no String asset with an ID of \"" + id + "\"");
	} else promise.error("[Assets] There is no asset library named \"" + libraryName + "\"");
	return promise.future;
};
lime_Assets.registerLibrary = function(name,library) {
	if(lime_Assets.libraries.exists(name)) {
		if(lime_Assets.libraries.get(name) == library) return; else lime_Assets.unloadLibrary(name);
	}
	if(library != null) library.onChange.add(lime_Assets.library_onChange);
	lime_Assets.libraries.set(name,library);
};
lime_Assets.unloadLibrary = function(name) {
	lime_Assets.initialize();
	var library = lime_Assets.libraries.get(name);
	if(library != null) {
		lime_Assets.cache.clear(name + ":");
		library.onChange.remove(lime_Assets.library_onChange);
		library.unload();
	}
	lime_Assets.libraries.remove(name);
};
lime_Assets.library_onChange = function() {
	lime_Assets.cache.clear();
	lime_Assets.onChange.dispatch();
};
var lime__$backend_html5_HTML5Application = function(parent) {
	this.gameDeviceCache = new haxe_ds_IntMap();
	this.parent = parent;
	this.currentUpdate = 0;
	this.lastUpdate = 0;
	this.nextUpdate = 0;
	this.framePeriod = -1;
	lime_audio_AudioManager.init();
};
$hxClasses["lime._backend.html5.HTML5Application"] = lime__$backend_html5_HTML5Application;
lime__$backend_html5_HTML5Application.__name__ = ["lime","_backend","html5","HTML5Application"];
lime__$backend_html5_HTML5Application.prototype = {
	gameDeviceCache: null
	,currentUpdate: null
	,deltaTime: null
	,framePeriod: null
	,lastUpdate: null
	,nextUpdate: null
	,parent: null
	,convertKeyCode: function(keyCode) {
		if(keyCode >= 65 && keyCode <= 90) return keyCode + 32;
		switch(keyCode) {
		case 16:
			return 1073742049;
		case 17:
			return 1073742048;
		case 18:
			return 1073742050;
		case 20:
			return 1073741881;
		case 144:
			return 1073741907;
		case 37:
			return 1073741904;
		case 38:
			return 1073741906;
		case 39:
			return 1073741903;
		case 40:
			return 1073741905;
		case 45:
			return 1073741897;
		case 46:
			return 127;
		case 36:
			return 1073741898;
		case 35:
			return 1073741901;
		case 33:
			return 1073741899;
		case 34:
			return 1073741902;
		case 112:
			return 1073741882;
		case 113:
			return 1073741883;
		case 114:
			return 1073741884;
		case 115:
			return 1073741885;
		case 116:
			return 1073741886;
		case 117:
			return 1073741887;
		case 118:
			return 1073741888;
		case 119:
			return 1073741889;
		case 120:
			return 1073741890;
		case 121:
			return 1073741891;
		case 122:
			return 1073741892;
		case 123:
			return 1073741893;
		case 124:
			return 1073741928;
		case 125:
			return 1073741929;
		case 126:
			return 1073741930;
		case 186:
			return 59;
		case 187:
			return 61;
		case 188:
			return 44;
		case 189:
			return 45;
		case 190:
			return 46;
		case 191:
			return 47;
		case 192:
			return 96;
		case 219:
			return 91;
		case 220:
			return 92;
		case 221:
			return 93;
		case 222:
			return 39;
		}
		return keyCode;
	}
	,create: function(config) {
	}
	,exec: function() {
		window.addEventListener("keydown",$bind(this,this.handleKeyEvent),false);
		window.addEventListener("keyup",$bind(this,this.handleKeyEvent),false);
		window.addEventListener("focus",$bind(this,this.handleWindowEvent),false);
		window.addEventListener("blur",$bind(this,this.handleWindowEvent),false);
		window.addEventListener("resize",$bind(this,this.handleWindowEvent),false);
		window.addEventListener("beforeunload",$bind(this,this.handleWindowEvent),false);
		
			if (!CanvasRenderingContext2D.prototype.isPointInStroke) {
				CanvasRenderingContext2D.prototype.isPointInStroke = function (path, x, y) {
					return false;
				};
			}
			
			var lastTime = 0;
			var vendors = ['ms', 'moz', 'webkit', 'o'];
			for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
				window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
				window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
			}
			
			if (!window.requestAnimationFrame)
				window.requestAnimationFrame = function(callback, element) {
					var currTime = new Date().getTime();
					var timeToCall = Math.max(0, 16 - (currTime - lastTime));
					var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
					  timeToCall);
					lastTime = currTime + timeToCall;
					return id;
				};
			
			if (!window.cancelAnimationFrame)
				window.cancelAnimationFrame = function(id) {
					clearTimeout(id);
				};
			
			window.requestAnimFrame = window.requestAnimationFrame;
		;
		this.lastUpdate = new Date().getTime();
		this.handleApplicationEvent();
		return 0;
	}
	,exit: function() {
	}
	,getFrameRate: function() {
		if(this.framePeriod < 0) return 60; else if(this.framePeriod == 1000) return 0; else return 1000 / this.framePeriod;
	}
	,handleApplicationEvent: function(__) {
		this.updateGameDevices();
		this.currentUpdate = new Date().getTime();
		if(this.currentUpdate >= this.nextUpdate) {
			this.deltaTime = this.currentUpdate - this.lastUpdate;
			this.parent.onUpdate.dispatch(this.deltaTime | 0);
			if(this.parent.renderers[0] != null) {
				this.parent.renderers[0].onRender.dispatch();
				this.parent.renderers[0].flip();
			}
			if(this.framePeriod < 0) {
				this.nextUpdate = this.currentUpdate;
				this.nextUpdate = this.currentUpdate;
			} else this.nextUpdate = this.currentUpdate + this.framePeriod;
			this.lastUpdate = this.currentUpdate;
		}
		window.requestAnimationFrame($bind(this,this.handleApplicationEvent));
	}
	,handleKeyEvent: function(event) {
		if(this.parent.windows[0] != null) {
			var keyCode = this.convertKeyCode(event.keyCode != null?event.keyCode:event.which);
			var modifier;
			modifier = (event.shiftKey?3:0) | (event.ctrlKey?192:0) | (event.altKey?768:0) | (event.metaKey?3072:0);
			if(event.type == "keydown") {
				this.parent.windows[0].onKeyDown.dispatch(keyCode,modifier);
				if(this.parent.windows[0].onKeyDown.canceled) event.preventDefault();
			} else {
				this.parent.windows[0].onKeyUp.dispatch(keyCode,modifier);
				if(this.parent.windows[0].onKeyUp.canceled) event.preventDefault();
			}
		}
	}
	,handleWindowEvent: function(event) {
		if(this.parent.windows[0] != null) {
			var _g = event.type;
			switch(_g) {
			case "focus":
				this.parent.windows[0].onFocusIn.dispatch();
				this.parent.windows[0].onActivate.dispatch();
				break;
			case "blur":
				this.parent.windows[0].onFocusOut.dispatch();
				this.parent.windows[0].onDeactivate.dispatch();
				break;
			case "resize":
				var cacheWidth = this.parent.windows[0].__width;
				var cacheHeight = this.parent.windows[0].__height;
				this.parent.windows[0].backend.handleResize();
				if(this.parent.windows[0].__width != cacheWidth || this.parent.windows[0].__height != cacheHeight) this.parent.windows[0].onResize.dispatch(this.parent.windows[0].__width,this.parent.windows[0].__height);
				break;
			case "beforeunload":
				this.parent.windows[0].onClose.dispatch();
				break;
			}
		}
	}
	,setFrameRate: function(value) {
		if(value >= 60) this.framePeriod = -1; else if(value > 0) this.framePeriod = 1000 / value; else this.framePeriod = 1000;
		return value;
	}
	,updateGameDevices: function() {
		var devices = lime_ui_Joystick.__getDeviceData();
		if(devices == null) return;
		var id;
		var gamepad;
		var joystick;
		var data;
		var cache;
		var _g1 = 0;
		var _g = devices.length;
		while(_g1 < _g) {
			var i = _g1++;
			id = i;
			data = devices[id];
			if(data == null) continue;
			if(!this.gameDeviceCache.h.hasOwnProperty(id)) {
				cache = new lime__$backend_html5_GameDeviceData();
				cache.id = id;
				cache.connected = data.connected;
				var _g3 = 0;
				var _g2 = data.buttons.length;
				while(_g3 < _g2) {
					var i1 = _g3++;
					cache.buttons.push(data.buttons[i1].value);
				}
				var _g31 = 0;
				var _g21 = data.axes.length;
				while(_g31 < _g21) {
					var i2 = _g31++;
					cache.axes.push(data.axes[i2]);
				}
				if(data.mapping == "standard") cache.isGamepad = true;
				this.gameDeviceCache.h[id] = cache;
				if(data.connected) {
					lime_ui_Joystick.__connect(id);
					if(cache.isGamepad) lime_ui_Gamepad.__connect(id);
				}
			}
			cache = this.gameDeviceCache.h[id];
			joystick = lime_ui_Joystick.devices.h[id];
			gamepad = lime_ui_Gamepad.devices.h[id];
			if(data.connected) {
				var button;
				var value;
				var _g32 = 0;
				var _g22 = data.buttons.length;
				while(_g32 < _g22) {
					var i3 = _g32++;
					value = data.buttons[i3].value;
					if(value != cache.buttons[i3]) {
						if(i3 == 6) {
							joystick.onAxisMove.dispatch(data.axes.length,value);
							if(gamepad != null) gamepad.onAxisMove.dispatch(4,value);
						} else if(i3 == 7) {
							joystick.onAxisMove.dispatch(data.axes.length + 1,value);
							if(gamepad != null) gamepad.onAxisMove.dispatch(5,value);
						} else {
							if(value > 0) joystick.onButtonDown.dispatch(i3); else joystick.onButtonUp.dispatch(i3);
							if(gamepad != null) {
								switch(i3) {
								case 0:
									button = 0;
									break;
								case 1:
									button = 1;
									break;
								case 2:
									button = 2;
									break;
								case 3:
									button = 3;
									break;
								case 4:
									button = 9;
									break;
								case 5:
									button = 10;
									break;
								case 8:
									button = 4;
									break;
								case 9:
									button = 6;
									break;
								case 10:
									button = 7;
									break;
								case 11:
									button = 8;
									break;
								case 12:
									button = 11;
									break;
								case 13:
									button = 12;
									break;
								case 14:
									button = 13;
									break;
								case 15:
									button = 14;
									break;
								case 16:
									button = 5;
									break;
								default:
									continue;
								}
								if(value > 0) gamepad.onButtonDown.dispatch(button); else gamepad.onButtonUp.dispatch(button);
							}
						}
						cache.buttons[i3] = value;
					}
				}
				var _g33 = 0;
				var _g23 = data.axes.length;
				while(_g33 < _g23) {
					var i4 = _g33++;
					if(data.axes[i4] != cache.axes[i4]) {
						joystick.onAxisMove.dispatch(i4,data.axes[i4]);
						if(gamepad != null) gamepad.onAxisMove.dispatch(i4,data.axes[i4]);
						cache.axes[i4] = data.axes[i4];
					}
				}
			} else if(cache.connected) {
				cache.connected = false;
				lime_ui_Joystick.__disconnect(id);
				lime_ui_Gamepad.__disconnect(id);
			}
		}
	}
	,__class__: lime__$backend_html5_HTML5Application
};
var lime__$backend_html5_GameDeviceData = function() {
	this.connected = true;
	this.buttons = [];
	this.axes = [];
};
$hxClasses["lime._backend.html5.GameDeviceData"] = lime__$backend_html5_GameDeviceData;
lime__$backend_html5_GameDeviceData.__name__ = ["lime","_backend","html5","GameDeviceData"];
lime__$backend_html5_GameDeviceData.prototype = {
	connected: null
	,id: null
	,isGamepad: null
	,buttons: null
	,axes: null
	,__class__: lime__$backend_html5_GameDeviceData
};
var lime__$backend_html5_HTML5Mouse = function() { };
$hxClasses["lime._backend.html5.HTML5Mouse"] = lime__$backend_html5_HTML5Mouse;
lime__$backend_html5_HTML5Mouse.__name__ = ["lime","_backend","html5","HTML5Mouse"];
lime__$backend_html5_HTML5Mouse.hide = function() {
	if(!lime__$backend_html5_HTML5Mouse.__hidden) {
		lime__$backend_html5_HTML5Mouse.__hidden = true;
		var _g = 0;
		var _g1 = lime_app_Application.current.windows;
		while(_g < _g1.length) {
			var $window = _g1[_g];
			++_g;
			$window.backend.element.style.cursor = "none";
		}
	}
};
lime__$backend_html5_HTML5Mouse.show = function() {
	if(lime__$backend_html5_HTML5Mouse.__hidden) {
		lime__$backend_html5_HTML5Mouse.__hidden = false;
		var cacheValue = lime__$backend_html5_HTML5Mouse.__cursor;
		lime__$backend_html5_HTML5Mouse.__cursor = null;
		lime__$backend_html5_HTML5Mouse.set_cursor(cacheValue);
	}
};
lime__$backend_html5_HTML5Mouse.warp = function(x,y,window) {
};
lime__$backend_html5_HTML5Mouse.get_cursor = function() {
	if(lime__$backend_html5_HTML5Mouse.__cursor == null) return lime_ui_MouseCursor.DEFAULT;
	return lime__$backend_html5_HTML5Mouse.__cursor;
};
lime__$backend_html5_HTML5Mouse.set_cursor = function(value) {
	if(lime__$backend_html5_HTML5Mouse.__cursor != value) {
		if(!lime__$backend_html5_HTML5Mouse.__hidden) {
			var _g = 0;
			var _g1 = lime_app_Application.current.windows;
			while(_g < _g1.length) {
				var $window = _g1[_g];
				++_g;
				switch(value[1]) {
				case 0:
					$window.backend.element.style.cursor = "default";
					break;
				case 1:
					$window.backend.element.style.cursor = "crosshair";
					break;
				case 3:
					$window.backend.element.style.cursor = "move";
					break;
				case 4:
					$window.backend.element.style.cursor = "pointer";
					break;
				case 5:
					$window.backend.element.style.cursor = "nesw-resize";
					break;
				case 6:
					$window.backend.element.style.cursor = "ns-resize";
					break;
				case 7:
					$window.backend.element.style.cursor = "nwse-resize";
					break;
				case 8:
					$window.backend.element.style.cursor = "ew-resize";
					break;
				case 9:
					$window.backend.element.style.cursor = "text";
					break;
				case 10:
					$window.backend.element.style.cursor = "wait";
					break;
				case 11:
					$window.backend.element.style.cursor = "wait";
					break;
				default:
					$window.backend.element.style.cursor = "auto";
				}
			}
		}
		lime__$backend_html5_HTML5Mouse.__cursor = value;
	}
	return lime__$backend_html5_HTML5Mouse.__cursor;
};
lime__$backend_html5_HTML5Mouse.get_lock = function() {
	return false;
};
lime__$backend_html5_HTML5Mouse.set_lock = function(value) {
	return value;
};
var lime__$backend_html5_HTML5Renderer = function(parent) {
	this.parent = parent;
};
$hxClasses["lime._backend.html5.HTML5Renderer"] = lime__$backend_html5_HTML5Renderer;
lime__$backend_html5_HTML5Renderer.__name__ = ["lime","_backend","html5","HTML5Renderer"];
lime__$backend_html5_HTML5Renderer.prototype = {
	parent: null
	,create: function() {
		this.createContext();
		{
			var _g = this.parent.context;
			switch(_g[1]) {
			case 0:
				this.parent.window.backend.canvas.addEventListener("webglcontextlost",$bind(this,this.handleEvent),false);
				this.parent.window.backend.canvas.addEventListener("webglcontextrestored",$bind(this,this.handleEvent),false);
				break;
			default:
			}
		}
	}
	,createContext: function() {
		if(this.parent.window.backend.div != null) {
			this.parent.context = lime_graphics_RenderContext.DOM(this.parent.window.backend.div);
			this.parent.type = lime_graphics_RendererType.DOM;
		} else if(this.parent.window.backend.canvas != null) {
			var webgl = null;
			var options = { alpha : false, antialias : Object.prototype.hasOwnProperty.call(this.parent.window.config,"antialiasing")?this.parent.window.config.antialiasing > 0:false, depth : Object.prototype.hasOwnProperty.call(this.parent.window.config,"depthBuffer")?this.parent.window.config.depthBuffer:true, premultipliedAlpha : false, stencil : Object.prototype.hasOwnProperty.call(this.parent.window.config,"stencilBuffer")?this.parent.window.config.stencilBuffer:false, preserveDrawingBuffer : false};
			webgl = js_html__$CanvasElement_CanvasUtil.getContextWebGL(this.parent.window.backend.canvas,options);
			if(webgl == null) {
				this.parent.context = lime_graphics_RenderContext.CANVAS(this.parent.window.backend.canvas.getContext("2d"));
				this.parent.type = lime_graphics_RendererType.CANVAS;
			} else {
				webgl = WebGLDebugUtils.makeDebugContext(webgl);
				lime_graphics_opengl_GL.context = webgl;
				this.parent.context = lime_graphics_RenderContext.OPENGL(lime_graphics_opengl_GL.context);
				this.parent.type = lime_graphics_RendererType.OPENGL;
			}
		}
	}
	,flip: function() {
	}
	,handleEvent: function(event) {
		var _g = event.type;
		switch(_g) {
		case "webglcontextlost":
			event.preventDefault();
			this.parent.context = null;
			this.parent.onContextLost.dispatch();
			break;
		case "webglcontextrestored":
			this.createContext();
			this.parent.onContextRestored.dispatch(this.parent.context);
			break;
		default:
		}
	}
	,readPixels: function(rect) {
		if(this.parent.window.backend.canvas != null) {
			if(rect == null) rect = new lime_math_Rectangle(0,0,this.parent.window.backend.canvas.width,this.parent.window.backend.canvas.height); else rect.__contract(0,0,this.parent.window.backend.canvas.width,this.parent.window.backend.canvas.height);
			if(rect.width > 0 && rect.height > 0) {
				var canvas = window.document.createElement("canvas");
				canvas.width = rect.width | 0;
				canvas.height = rect.height | 0;
				var context = canvas.getContext("2d");
				context.drawImage(this.parent.window.backend.canvas,-rect.x,-rect.y);
				return lime_graphics_Image.fromCanvas(canvas);
			}
		}
		return null;
	}
	,render: function() {
	}
	,__class__: lime__$backend_html5_HTML5Renderer
};
var lime__$backend_html5_HTML5Window = function(parent) {
	this.unusedTouchesPool = new List();
	this.currentTouches = new haxe_ds_IntMap();
	this.parent = parent;
	if(parent.config != null && Object.prototype.hasOwnProperty.call(parent.config,"element")) this.element = parent.config.element;
};
$hxClasses["lime._backend.html5.HTML5Window"] = lime__$backend_html5_HTML5Window;
lime__$backend_html5_HTML5Window.__name__ = ["lime","_backend","html5","HTML5Window"];
lime__$backend_html5_HTML5Window.prototype = {
	canvas: null
	,div: null
	,element: null
	,currentTouches: null
	,enableTextEvents: null
	,parent: null
	,primaryTouch: null
	,setHeight: null
	,setWidth: null
	,unusedTouchesPool: null
	,alert: function(message,title) {
		if(message != null) js_Browser.alert(message);
	}
	,close: function() {
		this.parent.application.removeWindow(this.parent);
	}
	,create: function(application) {
		this.setWidth = this.parent.__width;
		this.setHeight = this.parent.__height;
		this.parent.id = lime__$backend_html5_HTML5Window.windowID++;
		if(js_Boot.__instanceof(this.element,HTMLCanvasElement)) this.canvas = this.element; else this.canvas = window.document.createElement("canvas");
		if(this.canvas != null) {
			var style = this.canvas.style;
			style.setProperty("-webkit-transform","translateZ(0)",null);
			style.setProperty("transform","translateZ(0)",null);
		} else if(this.div != null) {
			var style1 = this.div.style;
			style1.setProperty("-webkit-transform","translate3D(0,0,0)",null);
			style1.setProperty("transform","translate3D(0,0,0)",null);
			style1.position = "relative";
			style1.overflow = "hidden";
			style1.setProperty("-webkit-user-select","none",null);
			style1.setProperty("-moz-user-select","none",null);
			style1.setProperty("-ms-user-select","none",null);
			style1.setProperty("-o-user-select","none",null);
		}
		if(this.parent.__width == 0 && this.parent.__height == 0) {
			if(this.element != null) {
				this.parent.set_width(this.element.clientWidth);
				this.parent.set_height(this.element.clientHeight);
			} else {
				this.parent.set_width(window.innerWidth);
				this.parent.set_height(window.innerHeight);
			}
			this.parent.set_fullscreen(true);
		}
		if(this.canvas != null) {
			this.canvas.width = this.parent.__width;
			this.canvas.height = this.parent.__height;
		} else {
			this.div.style.width = this.parent.__width + "px";
			this.div.style.height = this.parent.__height + "px";
		}
		this.handleResize();
		if(this.element != null) {
			if(this.canvas != null) {
				if(this.element != this.canvas) this.element.appendChild(this.canvas);
			} else this.element.appendChild(this.div);
			var events = ["mousedown","mouseenter","mouseleave","mousemove","mouseup","wheel"];
			var _g = 0;
			while(_g < events.length) {
				var event = events[_g];
				++_g;
				this.element.addEventListener(event,$bind(this,this.handleMouseEvent),true);
			}
			window.document.addEventListener("dragstart",function(e) {
				if(e.target.nodeName.toLowerCase() == "img") {
					e.preventDefault();
					return false;
				}
				return true;
			},false);
			this.element.addEventListener("touchstart",$bind(this,this.handleTouchEvent),true);
			this.element.addEventListener("touchmove",$bind(this,this.handleTouchEvent),true);
			this.element.addEventListener("touchend",$bind(this,this.handleTouchEvent),true);
			this.element.addEventListener("gamepadconnected",$bind(this,this.handleGamepadEvent),true);
			this.element.addEventListener("gamepaddisconnected",$bind(this,this.handleGamepadEvent),true);
		}
	}
	,focus: function() {
	}
	,getDisplay: function() {
		return lime_system_System.getDisplay(0);
	}
	,getEnableTextEvents: function() {
		return this.enableTextEvents;
	}
	,handleFocusEvent: function(event) {
		if(this.enableTextEvents) haxe_Timer.delay(function() {
			lime__$backend_html5_HTML5Window.textInput.focus();
		},20);
	}
	,handleGamepadEvent: function(event) {
		var _g = event.type;
		switch(_g) {
		case "gamepadconnected":
			lime_ui_Joystick.__connect(event.gamepad.index);
			if(event.gamepad.mapping == "standard") lime_ui_Gamepad.__connect(event.gamepad.index);
			break;
		case "gamepaddisconnected":
			lime_ui_Joystick.__disconnect(event.gamepad.index);
			lime_ui_Gamepad.__disconnect(event.gamepad.index);
			break;
		default:
		}
	}
	,handleInputEvent: function(event) {
		if(lime__$backend_html5_HTML5Window.textInput.value != "") {
			this.parent.onTextInput.dispatch(lime__$backend_html5_HTML5Window.textInput.value);
			lime__$backend_html5_HTML5Window.textInput.value = "";
		}
	}
	,handleMouseEvent: function(event) {
		var x = 0.0;
		var y = 0.0;
		if(event.type != "wheel") {
			if(this.element != null) {
				if(this.canvas != null) {
					var rect = this.canvas.getBoundingClientRect();
					x = (event.clientX - rect.left) * (this.parent.__width / rect.width);
					y = (event.clientY - rect.top) * (this.parent.__height / rect.height);
				} else if(this.div != null) {
					var rect1 = this.div.getBoundingClientRect();
					x = event.clientX - rect1.left;
					y = event.clientY - rect1.top;
				} else {
					var rect2 = this.element.getBoundingClientRect();
					x = (event.clientX - rect2.left) * (this.parent.__width / rect2.width);
					y = (event.clientY - rect2.top) * (this.parent.__height / rect2.height);
				}
			} else {
				x = event.clientX;
				y = event.clientY;
			}
			var _g = event.type;
			switch(_g) {
			case "mousedown":
				this.parent.onMouseDown.dispatch(x,y,event.button);
				break;
			case "mouseenter":
				this.parent.onEnter.dispatch();
				break;
			case "mouseleave":
				this.parent.onLeave.dispatch();
				break;
			case "mouseup":
				this.parent.onMouseUp.dispatch(x,y,event.button);
				break;
			case "mousemove":
				this.parent.onMouseMove.dispatch(x,y);
				break;
			default:
			}
		} else this.parent.onMouseWheel.dispatch(event.deltaX,-event.deltaY);
	}
	,handleResize: function() {
		var stretch = this.parent.__fullscreen || this.setWidth == 0 && this.setHeight == 0;
		if(this.element != null && (this.div == null || this.div != null && stretch)) {
			if(stretch) {
				if(this.parent.__width != this.element.clientWidth || this.parent.__height != this.element.clientHeight) {
					this.parent.set_width(this.element.clientWidth);
					this.parent.set_height(this.element.clientHeight);
					if(this.canvas != null) {
						if(this.element != this.canvas) {
							this.canvas.width = this.element.clientWidth;
							this.canvas.height = this.element.clientHeight;
						}
					} else {
						this.div.style.width = this.element.clientWidth + "px";
						this.div.style.height = this.element.clientHeight + "px";
					}
				}
			} else {
				var scaleX = this.element.clientWidth / this.setWidth;
				var scaleY = this.element.clientHeight / this.setHeight;
				var currentRatio = scaleX / scaleY;
				var targetRatio = Math.min(scaleX,scaleY);
				if(this.canvas != null) {
					if(this.element != this.canvas) {
						this.canvas.style.width = this.setWidth * targetRatio + "px";
						this.canvas.style.height = this.setHeight * targetRatio + "px";
						this.canvas.style.marginLeft = (this.element.clientWidth - this.setWidth * targetRatio) / 2 + "px";
						this.canvas.style.marginTop = (this.element.clientHeight - this.setHeight * targetRatio) / 2 + "px";
					}
				} else {
					this.div.style.width = this.setWidth * targetRatio + "px";
					this.div.style.height = this.setHeight * targetRatio + "px";
					this.div.style.marginLeft = (this.element.clientWidth - this.setWidth * targetRatio) / 2 + "px";
					this.div.style.marginTop = (this.element.clientHeight - this.setHeight * targetRatio) / 2 + "px";
				}
			}
		}
	}
	,handleTouchEvent: function(event) {
		event.preventDefault();
		var rect = null;
		if(this.element != null) {
			if(this.canvas != null) rect = this.canvas.getBoundingClientRect(); else if(this.div != null) rect = this.div.getBoundingClientRect(); else rect = this.element.getBoundingClientRect();
		}
		var windowWidth = this.setWidth;
		var windowHeight = this.setHeight;
		if(windowWidth == 0 || windowHeight == 0) {
			if(rect != null) {
				windowWidth = rect.width;
				windowHeight = rect.height;
			} else {
				windowWidth = 1;
				windowHeight = 1;
			}
		}
		var _g = 0;
		var _g1 = event.changedTouches;
		while(_g < _g1.length) {
			var data = _g1[_g];
			++_g;
			var x = 0.0;
			var y = 0.0;
			if(rect != null) {
				x = (data.clientX - rect.left) * (windowWidth / rect.width);
				y = (data.clientY - rect.top) * (windowHeight / rect.height);
			} else {
				x = data.clientX;
				y = data.clientY;
			}
			var _g2 = event.type;
			switch(_g2) {
			case "touchstart":
				var touch = this.unusedTouchesPool.pop();
				if(touch == null) touch = new lime_ui_Touch(x / windowWidth,y / windowHeight,data.identifier,0,0,data.force,this.parent.id); else {
					touch.x = x / windowWidth;
					touch.y = y / windowHeight;
					touch.id = data.identifier;
					touch.dx = 0;
					touch.dy = 0;
					touch.pressure = data.force;
					touch.device = this.parent.id;
				}
				this.currentTouches.h[data.identifier] = touch;
				lime_ui_Touch.onStart.dispatch(touch);
				if(this.primaryTouch == null) this.primaryTouch = touch;
				if(touch == this.primaryTouch) this.parent.onMouseDown.dispatch(x,y,0);
				break;
			case "touchend":
				var touch1 = this.currentTouches.h[data.identifier];
				if(touch1 != null) {
					var cacheX = touch1.x;
					var cacheY = touch1.y;
					touch1.x = x / windowWidth;
					touch1.y = y / windowHeight;
					touch1.dx = touch1.x - cacheX;
					touch1.dy = touch1.y - cacheY;
					touch1.pressure = data.force;
					lime_ui_Touch.onEnd.dispatch(touch1);
					this.currentTouches.remove(data.identifier);
					this.unusedTouchesPool.add(touch1);
					if(touch1 == this.primaryTouch) {
						this.parent.onMouseUp.dispatch(x,y,0);
						this.primaryTouch = null;
					}
				}
				break;
			case "touchmove":
				var touch2 = this.currentTouches.h[data.identifier];
				if(touch2 != null) {
					var cacheX1 = touch2.x;
					var cacheY1 = touch2.y;
					touch2.x = x / windowWidth;
					touch2.y = y / windowHeight;
					touch2.dx = touch2.x - cacheX1;
					touch2.dy = touch2.y - cacheY1;
					touch2.pressure = data.force;
					lime_ui_Touch.onMove.dispatch(touch2);
					if(touch2 == this.primaryTouch) this.parent.onMouseMove.dispatch(x,y);
				}
				break;
			default:
			}
		}
	}
	,move: function(x,y) {
	}
	,resize: function(width,height) {
	}
	,setBorderless: function(value) {
		return value;
	}
	,setEnableTextEvents: function(value) {
		if(value) {
			if(lime__$backend_html5_HTML5Window.textInput == null) {
				lime__$backend_html5_HTML5Window.textInput = window.document.createElement("input");
				lime__$backend_html5_HTML5Window.textInput.type = "text";
				lime__$backend_html5_HTML5Window.textInput.style.position = "absolute";
				lime__$backend_html5_HTML5Window.textInput.style.opacity = "0";
				lime__$backend_html5_HTML5Window.textInput.style.color = "transparent";
				lime__$backend_html5_HTML5Window.textInput.value = "";
				lime__$backend_html5_HTML5Window.textInput.autocapitalize = "off";
				lime__$backend_html5_HTML5Window.textInput.autocorrect = "off";
				lime__$backend_html5_HTML5Window.textInput.autocomplete = "off";
				lime__$backend_html5_HTML5Window.textInput.style.left = "0px";
				lime__$backend_html5_HTML5Window.textInput.style.top = "50%";
				if(new EReg("(iPad|iPhone|iPod).*OS 8_","gi").match(window.navigator.userAgent)) {
					lime__$backend_html5_HTML5Window.textInput.style.fontSize = "0px";
					lime__$backend_html5_HTML5Window.textInput.style.width = "0px";
					lime__$backend_html5_HTML5Window.textInput.style.height = "0px";
				} else {
					lime__$backend_html5_HTML5Window.textInput.style.width = "1px";
					lime__$backend_html5_HTML5Window.textInput.style.height = "1px";
				}
				lime__$backend_html5_HTML5Window.textInput.style.pointerEvents = "none";
				lime__$backend_html5_HTML5Window.textInput.style.zIndex = "-10000000";
				window.document.body.appendChild(lime__$backend_html5_HTML5Window.textInput);
			}
			if(!this.enableTextEvents) {
				lime__$backend_html5_HTML5Window.textInput.addEventListener("input",$bind(this,this.handleInputEvent),true);
				lime__$backend_html5_HTML5Window.textInput.addEventListener("blur",$bind(this,this.handleFocusEvent),true);
			}
			lime__$backend_html5_HTML5Window.textInput.focus();
		} else if(lime__$backend_html5_HTML5Window.textInput != null) {
			lime__$backend_html5_HTML5Window.textInput.removeEventListener("input",$bind(this,this.handleInputEvent),true);
			lime__$backend_html5_HTML5Window.textInput.removeEventListener("blur",$bind(this,this.handleFocusEvent),true);
			lime__$backend_html5_HTML5Window.textInput.blur();
		}
		return this.enableTextEvents = value;
	}
	,setFullscreen: function(value) {
		return false;
	}
	,setIcon: function(image) {
	}
	,setMaximized: function(value) {
		return false;
	}
	,setMinimized: function(value) {
		return false;
	}
	,setResizable: function(value) {
		return value;
	}
	,setTitle: function(value) {
		return value;
	}
	,__class__: lime__$backend_html5_HTML5Window
};
var lime_app_Event = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
$hxClasses["lime.app.Event"] = lime_app_Event;
lime_app_Event.__name__ = ["lime","app","Event"];
lime_app_Event.prototype = {
	canceled: null
	,__listeners: null
	,__repeat: null
	,__priorities: null
	,add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,cancel: function() {
		this.canceled = true;
	}
	,dispatch: null
	,has: function(listener) {
		var _g = 0;
		var _g1 = this.__listeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			if(Reflect.compareMethods(l,listener)) return true;
		}
		return false;
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,__class__: lime_app_Event
};
var lime_app_Event_$Dynamic_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
$hxClasses["lime.app.Event_Dynamic_Void"] = lime_app_Event_$Dynamic_$Void;
lime_app_Event_$Dynamic_$Void.__name__ = ["lime","app","Event_Dynamic_Void"];
lime_app_Event_$Dynamic_$Void.prototype = {
	canceled: null
	,__repeat: null
	,__priorities: null
	,add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,cancel: function() {
		this.canceled = true;
	}
	,has: function(listener) {
		var _g = 0;
		var _g1 = this.__listeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			if(Reflect.compareMethods(l,listener)) return true;
		}
		return false;
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,__listeners: null
	,dispatch: function(a) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$Dynamic_$Void
};
var lime_app_Event_$Float_$Float_$Int_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
$hxClasses["lime.app.Event_Float_Float_Int_Void"] = lime_app_Event_$Float_$Float_$Int_$Void;
lime_app_Event_$Float_$Float_$Int_$Void.__name__ = ["lime","app","Event_Float_Float_Int_Void"];
lime_app_Event_$Float_$Float_$Int_$Void.prototype = {
	canceled: null
	,__repeat: null
	,__priorities: null
	,add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,cancel: function() {
		this.canceled = true;
	}
	,has: function(listener) {
		var _g = 0;
		var _g1 = this.__listeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			if(Reflect.compareMethods(l,listener)) return true;
		}
		return false;
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,__listeners: null
	,dispatch: function(a,a1,a2) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a,a1,a2);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$Float_$Float_$Int_$Void
};
var lime_app_Event_$Float_$Float_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
$hxClasses["lime.app.Event_Float_Float_Void"] = lime_app_Event_$Float_$Float_$Void;
lime_app_Event_$Float_$Float_$Void.__name__ = ["lime","app","Event_Float_Float_Void"];
lime_app_Event_$Float_$Float_$Void.prototype = {
	canceled: null
	,__repeat: null
	,__priorities: null
	,add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,cancel: function() {
		this.canceled = true;
	}
	,has: function(listener) {
		var _g = 0;
		var _g1 = this.__listeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			if(Reflect.compareMethods(l,listener)) return true;
		}
		return false;
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,__listeners: null
	,dispatch: function(a,a1) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a,a1);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$Float_$Float_$Void
};
var lime_app_Event_$Int_$Float_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
$hxClasses["lime.app.Event_Int_Float_Void"] = lime_app_Event_$Int_$Float_$Void;
lime_app_Event_$Int_$Float_$Void.__name__ = ["lime","app","Event_Int_Float_Void"];
lime_app_Event_$Int_$Float_$Void.prototype = {
	canceled: null
	,__repeat: null
	,__priorities: null
	,add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,cancel: function() {
		this.canceled = true;
	}
	,has: function(listener) {
		var _g = 0;
		var _g1 = this.__listeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			if(Reflect.compareMethods(l,listener)) return true;
		}
		return false;
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,__listeners: null
	,dispatch: function(a,a1) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a,a1);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$Int_$Float_$Void
};
var lime_app_Event_$Int_$Int_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
$hxClasses["lime.app.Event_Int_Int_Void"] = lime_app_Event_$Int_$Int_$Void;
lime_app_Event_$Int_$Int_$Void.__name__ = ["lime","app","Event_Int_Int_Void"];
lime_app_Event_$Int_$Int_$Void.prototype = {
	canceled: null
	,__repeat: null
	,__priorities: null
	,add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,cancel: function() {
		this.canceled = true;
	}
	,has: function(listener) {
		var _g = 0;
		var _g1 = this.__listeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			if(Reflect.compareMethods(l,listener)) return true;
		}
		return false;
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,__listeners: null
	,dispatch: function(a,a1) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a,a1);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$Int_$Int_$Void
};
var lime_app_Event_$Int_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
$hxClasses["lime.app.Event_Int_Void"] = lime_app_Event_$Int_$Void;
lime_app_Event_$Int_$Void.__name__ = ["lime","app","Event_Int_Void"];
lime_app_Event_$Int_$Void.prototype = {
	canceled: null
	,__repeat: null
	,__priorities: null
	,add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,cancel: function() {
		this.canceled = true;
	}
	,has: function(listener) {
		var _g = 0;
		var _g1 = this.__listeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			if(Reflect.compareMethods(l,listener)) return true;
		}
		return false;
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,__listeners: null
	,dispatch: function(a) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$Int_$Void
};
var lime_app_Event_$Int_$lime_$ui_$JoystickHatPosition_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
$hxClasses["lime.app.Event_Int_lime_ui_JoystickHatPosition_Void"] = lime_app_Event_$Int_$lime_$ui_$JoystickHatPosition_$Void;
lime_app_Event_$Int_$lime_$ui_$JoystickHatPosition_$Void.__name__ = ["lime","app","Event_Int_lime_ui_JoystickHatPosition_Void"];
lime_app_Event_$Int_$lime_$ui_$JoystickHatPosition_$Void.prototype = {
	canceled: null
	,__repeat: null
	,__priorities: null
	,add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,cancel: function() {
		this.canceled = true;
	}
	,has: function(listener) {
		var _g = 0;
		var _g1 = this.__listeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			if(Reflect.compareMethods(l,listener)) return true;
		}
		return false;
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,__listeners: null
	,dispatch: function(a,a1) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a,a1);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$Int_$lime_$ui_$JoystickHatPosition_$Void
};
var lime_app_Event_$String_$Int_$Int_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
$hxClasses["lime.app.Event_String_Int_Int_Void"] = lime_app_Event_$String_$Int_$Int_$Void;
lime_app_Event_$String_$Int_$Int_$Void.__name__ = ["lime","app","Event_String_Int_Int_Void"];
lime_app_Event_$String_$Int_$Int_$Void.prototype = {
	canceled: null
	,__repeat: null
	,__priorities: null
	,add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,cancel: function() {
		this.canceled = true;
	}
	,has: function(listener) {
		var _g = 0;
		var _g1 = this.__listeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			if(Reflect.compareMethods(l,listener)) return true;
		}
		return false;
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,__listeners: null
	,dispatch: function(a,a1,a2) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a,a1,a2);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$String_$Int_$Int_$Void
};
var lime_app_Event_$String_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
$hxClasses["lime.app.Event_String_Void"] = lime_app_Event_$String_$Void;
lime_app_Event_$String_$Void.__name__ = ["lime","app","Event_String_Void"];
lime_app_Event_$String_$Void.prototype = {
	canceled: null
	,__repeat: null
	,__priorities: null
	,add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,cancel: function() {
		this.canceled = true;
	}
	,has: function(listener) {
		var _g = 0;
		var _g1 = this.__listeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			if(Reflect.compareMethods(l,listener)) return true;
		}
		return false;
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,__listeners: null
	,dispatch: function(a) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$String_$Void
};
var lime_app_Event_$lime_$graphics_$RenderContext_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
$hxClasses["lime.app.Event_lime_graphics_RenderContext_Void"] = lime_app_Event_$lime_$graphics_$RenderContext_$Void;
lime_app_Event_$lime_$graphics_$RenderContext_$Void.__name__ = ["lime","app","Event_lime_graphics_RenderContext_Void"];
lime_app_Event_$lime_$graphics_$RenderContext_$Void.prototype = {
	canceled: null
	,__repeat: null
	,__priorities: null
	,add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,cancel: function() {
		this.canceled = true;
	}
	,has: function(listener) {
		var _g = 0;
		var _g1 = this.__listeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			if(Reflect.compareMethods(l,listener)) return true;
		}
		return false;
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,__listeners: null
	,dispatch: function(a) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$lime_$graphics_$RenderContext_$Void
};
var lime_app_Event_$lime_$ui_$GamepadAxis_$Float_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
$hxClasses["lime.app.Event_lime_ui_GamepadAxis_Float_Void"] = lime_app_Event_$lime_$ui_$GamepadAxis_$Float_$Void;
lime_app_Event_$lime_$ui_$GamepadAxis_$Float_$Void.__name__ = ["lime","app","Event_lime_ui_GamepadAxis_Float_Void"];
lime_app_Event_$lime_$ui_$GamepadAxis_$Float_$Void.prototype = {
	canceled: null
	,__repeat: null
	,__priorities: null
	,add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,cancel: function() {
		this.canceled = true;
	}
	,has: function(listener) {
		var _g = 0;
		var _g1 = this.__listeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			if(Reflect.compareMethods(l,listener)) return true;
		}
		return false;
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,__listeners: null
	,dispatch: function(a,a1) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a,a1);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$lime_$ui_$GamepadAxis_$Float_$Void
};
var lime_app_Event_$lime_$ui_$GamepadButton_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
$hxClasses["lime.app.Event_lime_ui_GamepadButton_Void"] = lime_app_Event_$lime_$ui_$GamepadButton_$Void;
lime_app_Event_$lime_$ui_$GamepadButton_$Void.__name__ = ["lime","app","Event_lime_ui_GamepadButton_Void"];
lime_app_Event_$lime_$ui_$GamepadButton_$Void.prototype = {
	canceled: null
	,__repeat: null
	,__priorities: null
	,add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,cancel: function() {
		this.canceled = true;
	}
	,has: function(listener) {
		var _g = 0;
		var _g1 = this.__listeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			if(Reflect.compareMethods(l,listener)) return true;
		}
		return false;
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,__listeners: null
	,dispatch: function(a) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$lime_$ui_$GamepadButton_$Void
};
var lime_app_Event_$lime_$ui_$Gamepad_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
$hxClasses["lime.app.Event_lime_ui_Gamepad_Void"] = lime_app_Event_$lime_$ui_$Gamepad_$Void;
lime_app_Event_$lime_$ui_$Gamepad_$Void.__name__ = ["lime","app","Event_lime_ui_Gamepad_Void"];
lime_app_Event_$lime_$ui_$Gamepad_$Void.prototype = {
	canceled: null
	,__repeat: null
	,__priorities: null
	,add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,cancel: function() {
		this.canceled = true;
	}
	,has: function(listener) {
		var _g = 0;
		var _g1 = this.__listeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			if(Reflect.compareMethods(l,listener)) return true;
		}
		return false;
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,__listeners: null
	,dispatch: function(a) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$lime_$ui_$Gamepad_$Void
};
var lime_app_Event_$lime_$ui_$Joystick_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
$hxClasses["lime.app.Event_lime_ui_Joystick_Void"] = lime_app_Event_$lime_$ui_$Joystick_$Void;
lime_app_Event_$lime_$ui_$Joystick_$Void.__name__ = ["lime","app","Event_lime_ui_Joystick_Void"];
lime_app_Event_$lime_$ui_$Joystick_$Void.prototype = {
	canceled: null
	,__repeat: null
	,__priorities: null
	,add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,cancel: function() {
		this.canceled = true;
	}
	,has: function(listener) {
		var _g = 0;
		var _g1 = this.__listeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			if(Reflect.compareMethods(l,listener)) return true;
		}
		return false;
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,__listeners: null
	,dispatch: function(a) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$lime_$ui_$Joystick_$Void
};
var lime_app_Event_$lime_$ui_$KeyCode_$lime_$ui_$KeyModifier_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
$hxClasses["lime.app.Event_lime_ui_KeyCode_lime_ui_KeyModifier_Void"] = lime_app_Event_$lime_$ui_$KeyCode_$lime_$ui_$KeyModifier_$Void;
lime_app_Event_$lime_$ui_$KeyCode_$lime_$ui_$KeyModifier_$Void.__name__ = ["lime","app","Event_lime_ui_KeyCode_lime_ui_KeyModifier_Void"];
lime_app_Event_$lime_$ui_$KeyCode_$lime_$ui_$KeyModifier_$Void.prototype = {
	canceled: null
	,__repeat: null
	,__priorities: null
	,add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,cancel: function() {
		this.canceled = true;
	}
	,has: function(listener) {
		var _g = 0;
		var _g1 = this.__listeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			if(Reflect.compareMethods(l,listener)) return true;
		}
		return false;
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,__listeners: null
	,dispatch: function(a,a1) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a,a1);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$lime_$ui_$KeyCode_$lime_$ui_$KeyModifier_$Void
};
var lime_app_Event_$lime_$ui_$Touch_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
$hxClasses["lime.app.Event_lime_ui_Touch_Void"] = lime_app_Event_$lime_$ui_$Touch_$Void;
lime_app_Event_$lime_$ui_$Touch_$Void.__name__ = ["lime","app","Event_lime_ui_Touch_Void"];
lime_app_Event_$lime_$ui_$Touch_$Void.prototype = {
	canceled: null
	,__repeat: null
	,__priorities: null
	,add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,cancel: function() {
		this.canceled = true;
	}
	,has: function(listener) {
		var _g = 0;
		var _g1 = this.__listeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			if(Reflect.compareMethods(l,listener)) return true;
		}
		return false;
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,__listeners: null
	,dispatch: function(a) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$lime_$ui_$Touch_$Void
};
var lime_app_Future = function(work) {
	if(work != null) {
		if(lime_app_Future.__threadPool == null) {
			lime_app_Future.__threadPool = new lime_system_ThreadPool();
			lime_app_Future.__threadPool.doWork.add(lime_app_Future.threadPool_doWork);
			lime_app_Future.__threadPool.onComplete.add(lime_app_Future.threadPool_onComplete);
			lime_app_Future.__threadPool.onError.add(lime_app_Future.threadPool_onError);
		}
		var promise = new lime_app_Promise();
		promise.future = this;
		lime_app_Future.__threadPool.queue({ promise : promise, work : work});
	}
};
$hxClasses["lime.app.Future"] = lime_app_Future;
lime_app_Future.__name__ = ["lime","app","Future"];
lime_app_Future.threadPool_doWork = function(state) {
	try {
		var result = state.work();
		lime_app_Future.__threadPool.sendComplete({ promise : state.promise, result : result});
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		lime_app_Future.__threadPool.sendError({ promise : state.promise, error : e});
	}
};
lime_app_Future.threadPool_onComplete = function(state) {
	state.promise.complete(state.result);
};
lime_app_Future.threadPool_onError = function(state) {
	state.promise.error(state.error);
};
lime_app_Future.prototype = {
	isCompleted: null
	,value: null
	,__completed: null
	,__completeListeners: null
	,__errored: null
	,__errorListeners: null
	,__errorMessage: null
	,__progressListeners: null
	,onComplete: function(listener) {
		if(listener != null) {
			if(this.__completed) listener(this.value); else if(!this.__errored) {
				if(this.__completeListeners == null) this.__completeListeners = [];
				this.__completeListeners.push(listener);
			}
		}
		return this;
	}
	,onError: function(listener) {
		if(listener != null) {
			if(this.__errored) listener(this.__errorMessage); else if(!this.__completed) {
				if(this.__errorListeners == null) this.__errorListeners = [];
				this.__errorListeners.push(listener);
			}
		}
		return this;
	}
	,onProgress: function(listener) {
		if(listener != null) {
			if(this.__progressListeners == null) this.__progressListeners = [];
			this.__progressListeners.push(listener);
		}
		return this;
	}
	,then: function(next) {
		if(this.__completed) return next(this.value); else if(this.__errored) {
			var future = new lime_app_Future();
			future.onError(this.__errorMessage);
			return future;
		} else {
			var promise = new lime_app_Promise();
			this.onError($bind(promise,promise.error));
			this.onProgress($bind(promise,promise.progress));
			this.onComplete(function(val) {
				var future1 = next(val);
				future1.onError($bind(promise,promise.error));
				future1.onComplete($bind(promise,promise.complete));
			});
			return promise.future;
		}
	}
	,get_isCompleted: function() {
		return this.__completed || this.__errored;
	}
	,__class__: lime_app_Future
};
var lime_app_Preloader = function() {
	this.total = 0;
	this.loaded = 0;
	this.onProgress = new lime_app_Event_$Int_$Int_$Void();
	this.onComplete = new lime_app_Event_$Void_$Void();
	this.onProgress.add($bind(this,this.update));
};
$hxClasses["lime.app.Preloader"] = lime_app_Preloader;
lime_app_Preloader.__name__ = ["lime","app","Preloader"];
lime_app_Preloader.prototype = {
	complete: null
	,onComplete: null
	,onProgress: null
	,loaded: null
	,total: null
	,create: function(config) {
	}
	,load: function(urls,types) {
		var url = null;
		var cacheVersion = lime_Assets.cache.version;
		var _g1 = 0;
		var _g = urls.length;
		while(_g1 < _g) {
			var i = _g1++;
			url = urls[i];
			var _g2 = types[i];
			switch(_g2) {
			case "IMAGE":
				if(!lime_app_Preloader.images.exists(url)) {
					var image = new Image();
					lime_app_Preloader.images.set(url,image);
					image.onload = $bind(this,this.image_onLoad);
					image.src = url + "?" + cacheVersion;
					this.total++;
				}
				break;
			case "BINARY":
				if(!lime_app_Preloader.loaders.exists(url)) {
					var loader = new lime_net_HTTPRequest();
					lime_app_Preloader.loaders.set(url,loader);
					this.total++;
				}
				break;
			case "TEXT":
				if(!lime_app_Preloader.loaders.exists(url)) {
					var loader1 = new lime_net_HTTPRequest();
					lime_app_Preloader.loaders.set(url,loader1);
					this.total++;
				}
				break;
			case "FONT":
				this.total++;
				this.loadFont(url);
				break;
			default:
			}
		}
		var $it0 = lime_app_Preloader.loaders.keys();
		while( $it0.hasNext() ) {
			var url1 = $it0.next();
			var loader2 = lime_app_Preloader.loaders.get(url1);
			var future = loader2.load(url1 + "?" + cacheVersion);
			future.onComplete($bind(this,this.loader_onComplete));
		}
		if(this.total == 0) this.start();
	}
	,loadFont: function(font) {
		var _g = this;
		if(window.document.fonts && ($_=window.document.fonts,$bind($_,$_.load))) window.document.fonts.load("1em '" + font + "'").then(function(_) {
			_g.loaded++;
			_g.onProgress.dispatch(_g.loaded,_g.total);
			if(_g.loaded == _g.total) _g.start();
		}); else {
			var node = window.document.createElement("span");
			node.innerHTML = "giItT1WQy@!-/#";
			var style = node.style;
			style.position = "absolute";
			style.left = "-10000px";
			style.top = "-10000px";
			style.fontSize = "300px";
			style.fontFamily = "sans-serif";
			style.fontVariant = "normal";
			style.fontStyle = "normal";
			style.fontWeight = "normal";
			style.letterSpacing = "0";
			window.document.body.appendChild(node);
			var width = node.offsetWidth;
			style.fontFamily = "'" + font + "', sans-serif";
			var interval = null;
			var found = false;
			var checkFont = function() {
				if(node.offsetWidth != width) {
					if(!found) {
						found = true;
						return false;
					}
					_g.loaded++;
					if(interval != null) window.clearInterval(interval);
					node.parentNode.removeChild(node);
					node = null;
					_g.onProgress.dispatch(_g.loaded,_g.total);
					if(_g.loaded == _g.total) _g.start();
					return true;
				}
				return false;
			};
			if(!checkFont()) interval = window.setInterval(checkFont,50);
		}
	}
	,start: function() {
		this.complete = true;
		this.onComplete.dispatch();
	}
	,update: function(loaded,total) {
	}
	,image_onLoad: function(_) {
		this.loaded++;
		this.onProgress.dispatch(this.loaded,this.total);
		if(this.loaded == this.total) this.start();
	}
	,loader_onComplete: function(_) {
		this.loaded++;
		this.onProgress.dispatch(this.loaded,this.total);
		if(this.loaded == this.total) this.start();
	}
	,__class__: lime_app_Preloader
};
var lime_app_Promise = function() {
	this.future = new lime_app_Future();
};
$hxClasses["lime.app.Promise"] = lime_app_Promise;
lime_app_Promise.__name__ = ["lime","app","Promise"];
lime_app_Promise.prototype = {
	future: null
	,isCompleted: null
	,complete: function(data) {
		if(!this.future.__errored) {
			this.future.__completed = true;
			this.future.value = data;
			if(this.future.__completeListeners != null) {
				var _g = 0;
				var _g1 = this.future.__completeListeners;
				while(_g < _g1.length) {
					var listener = _g1[_g];
					++_g;
					listener(data);
				}
				this.future.__completeListeners = null;
			}
		}
		return this;
	}
	,completeWith: function(future) {
		future.onComplete($bind(this,this.complete));
		future.onError($bind(this,this.error));
		future.onProgress($bind(this,this.progress));
		return this;
	}
	,error: function(msg) {
		if(!this.future.__completed) {
			this.future.__errored = true;
			this.future.__errorMessage = msg;
			if(this.future.__errorListeners != null) {
				var _g = 0;
				var _g1 = this.future.__errorListeners;
				while(_g < _g1.length) {
					var listener = _g1[_g];
					++_g;
					listener(msg);
				}
				this.future.__errorListeners = null;
			}
		}
		return this;
	}
	,progress: function(progress) {
		if(!this.future.__errored && !this.future.__completed) {
			if(this.future.__progressListeners != null) {
				var _g = 0;
				var _g1 = this.future.__progressListeners;
				while(_g < _g1.length) {
					var listener = _g1[_g];
					++_g;
					listener(progress);
				}
			}
		}
		return this;
	}
	,get_isCompleted: function() {
		return this.future.get_isCompleted();
	}
	,__class__: lime_app_Promise
};
var lime_audio_ALAudioContext = function() {
	this.EXPONENT_DISTANCE_CLAMPED = 53254;
	this.EXPONENT_DISTANCE = 53253;
	this.LINEAR_DISTANCE_CLAMPED = 53252;
	this.LINEAR_DISTANCE = 53251;
	this.INVERSE_DISTANCE_CLAMPED = 53250;
	this.INVERSE_DISTANCE = 53249;
	this.DISTANCE_MODEL = 53248;
	this.DOPPLER_VELOCITY = 49153;
	this.SPEED_OF_SOUND = 49155;
	this.DOPPLER_FACTOR = 49152;
	this.EXTENSIONS = 45060;
	this.RENDERER = 45059;
	this.VERSION = 45058;
	this.VENDOR = 45057;
	this.OUT_OF_MEMORY = 40965;
	this.INVALID_OPERATION = 40964;
	this.INVALID_VALUE = 40963;
	this.INVALID_ENUM = 40962;
	this.INVALID_NAME = 40961;
	this.NO_ERROR = 0;
	this.SIZE = 8196;
	this.CHANNELS = 8195;
	this.BITS = 8194;
	this.FREQUENCY = 8193;
	this.FORMAT_STEREO16 = 4355;
	this.FORMAT_STEREO8 = 4354;
	this.FORMAT_MONO16 = 4353;
	this.FORMAT_MONO8 = 4352;
	this.UNDETERMINED = 4144;
	this.STREAMING = 4137;
	this.STATIC = 4136;
	this.SOURCE_TYPE = 4135;
	this.BYTE_OFFSET = 4134;
	this.SAMPLE_OFFSET = 4133;
	this.SEC_OFFSET = 4132;
	this.MAX_DISTANCE = 4131;
	this.CONE_OUTER_GAIN = 4130;
	this.ROLLOFF_FACTOR = 4129;
	this.REFERENCE_DISTANCE = 4128;
	this.BUFFERS_PROCESSED = 4118;
	this.BUFFERS_QUEUED = 4117;
	this.STOPPED = 4116;
	this.PAUSED = 4115;
	this.PLAYING = 4114;
	this.INITIAL = 4113;
	this.SOURCE_STATE = 4112;
	this.ORIENTATION = 4111;
	this.MAX_GAIN = 4110;
	this.MIN_GAIN = 4109;
	this.GAIN = 4106;
	this.BUFFER = 4105;
	this.LOOPING = 4103;
	this.VELOCITY = 4102;
	this.DIRECTION = 4101;
	this.POSITION = 4100;
	this.PITCH = 4099;
	this.CONE_OUTER_ANGLE = 4098;
	this.CONE_INNER_ANGLE = 4097;
	this.SOURCE_RELATIVE = 514;
	this.TRUE = 1;
	this.FALSE = 0;
	this.NONE = 0;
};
$hxClasses["lime.audio.ALAudioContext"] = lime_audio_ALAudioContext;
lime_audio_ALAudioContext.__name__ = ["lime","audio","ALAudioContext"];
lime_audio_ALAudioContext.prototype = {
	NONE: null
	,FALSE: null
	,TRUE: null
	,SOURCE_RELATIVE: null
	,CONE_INNER_ANGLE: null
	,CONE_OUTER_ANGLE: null
	,PITCH: null
	,POSITION: null
	,DIRECTION: null
	,VELOCITY: null
	,LOOPING: null
	,BUFFER: null
	,GAIN: null
	,MIN_GAIN: null
	,MAX_GAIN: null
	,ORIENTATION: null
	,SOURCE_STATE: null
	,INITIAL: null
	,PLAYING: null
	,PAUSED: null
	,STOPPED: null
	,BUFFERS_QUEUED: null
	,BUFFERS_PROCESSED: null
	,REFERENCE_DISTANCE: null
	,ROLLOFF_FACTOR: null
	,CONE_OUTER_GAIN: null
	,MAX_DISTANCE: null
	,SEC_OFFSET: null
	,SAMPLE_OFFSET: null
	,BYTE_OFFSET: null
	,SOURCE_TYPE: null
	,STATIC: null
	,STREAMING: null
	,UNDETERMINED: null
	,FORMAT_MONO8: null
	,FORMAT_MONO16: null
	,FORMAT_STEREO8: null
	,FORMAT_STEREO16: null
	,FREQUENCY: null
	,BITS: null
	,CHANNELS: null
	,SIZE: null
	,NO_ERROR: null
	,INVALID_NAME: null
	,INVALID_ENUM: null
	,INVALID_VALUE: null
	,INVALID_OPERATION: null
	,OUT_OF_MEMORY: null
	,VENDOR: null
	,VERSION: null
	,RENDERER: null
	,EXTENSIONS: null
	,DOPPLER_FACTOR: null
	,SPEED_OF_SOUND: null
	,DOPPLER_VELOCITY: null
	,DISTANCE_MODEL: null
	,INVERSE_DISTANCE: null
	,INVERSE_DISTANCE_CLAMPED: null
	,LINEAR_DISTANCE: null
	,LINEAR_DISTANCE_CLAMPED: null
	,EXPONENT_DISTANCE: null
	,EXPONENT_DISTANCE_CLAMPED: null
	,bufferData: function(buffer,format,data,size,freq) {
		lime_audio_openal_AL.bufferData(buffer,format,data,size,freq);
	}
	,buffer3f: function(buffer,param,value1,value2,value3) {
		lime_audio_openal_AL.buffer3f(buffer,param,value1,value2,value3);
	}
	,buffer3i: function(buffer,param,value1,value2,value3) {
		lime_audio_openal_AL.buffer3i(buffer,param,value1,value2,value3);
	}
	,bufferf: function(buffer,param,value) {
		lime_audio_openal_AL.bufferf(buffer,param,value);
	}
	,bufferfv: function(buffer,param,values) {
		lime_audio_openal_AL.bufferfv(buffer,param,values);
	}
	,bufferi: function(buffer,param,value) {
		lime_audio_openal_AL.bufferi(buffer,param,value);
	}
	,bufferiv: function(buffer,param,values) {
		lime_audio_openal_AL.bufferiv(buffer,param,values);
	}
	,deleteBuffer: function(buffer) {
		lime_audio_openal_AL.deleteBuffer(buffer);
	}
	,deleteBuffers: function(buffers) {
		lime_audio_openal_AL.deleteBuffers(buffers);
	}
	,deleteSource: function(source) {
		lime_audio_openal_AL.deleteSource(source);
	}
	,deleteSources: function(sources) {
		lime_audio_openal_AL.deleteSources(sources);
	}
	,disable: function(capability) {
		lime_audio_openal_AL.disable(capability);
	}
	,distanceModel: function(distanceModel) {
		lime_audio_openal_AL.distanceModel(distanceModel);
	}
	,dopplerFactor: function(value) {
		lime_audio_openal_AL.dopplerFactor(value);
	}
	,dopplerVelocity: function(value) {
		lime_audio_openal_AL.dopplerVelocity(value);
	}
	,enable: function(capability) {
		lime_audio_openal_AL.enable(capability);
	}
	,genSource: function() {
		return lime_audio_openal_AL.genSource();
	}
	,genSources: function(n) {
		return lime_audio_openal_AL.genSources(n);
	}
	,genBuffer: function() {
		return lime_audio_openal_AL.genBuffer();
	}
	,genBuffers: function(n) {
		return lime_audio_openal_AL.genBuffers(n);
	}
	,getBoolean: function(param) {
		return lime_audio_openal_AL.getBoolean(param);
	}
	,getBooleanv: function(param,count) {
		if(count == null) count = 1;
		return lime_audio_openal_AL.getBooleanv(param,count);
	}
	,getBuffer3f: function(buffer,param) {
		return lime_audio_openal_AL.getBuffer3f(buffer,param);
	}
	,getBuffer3i: function(buffer,param) {
		return lime_audio_openal_AL.getBuffer3i(buffer,param);
	}
	,getBufferf: function(buffer,param) {
		return lime_audio_openal_AL.getBufferf(buffer,param);
	}
	,getBufferfv: function(buffer,param,count) {
		if(count == null) count = 1;
		return lime_audio_openal_AL.getBufferfv(buffer,param,count);
	}
	,getBufferi: function(buffer,param) {
		return lime_audio_openal_AL.getBufferi(buffer,param);
	}
	,getBufferiv: function(buffer,param,count) {
		if(count == null) count = 1;
		return lime_audio_openal_AL.getBufferiv(buffer,param,count);
	}
	,getDouble: function(param) {
		return lime_audio_openal_AL.getDouble(param);
	}
	,getDoublev: function(param,count) {
		if(count == null) count = 1;
		return lime_audio_openal_AL.getDoublev(param,count);
	}
	,getEnumValue: function(ename) {
		return lime_audio_openal_AL.getEnumValue(ename);
	}
	,getError: function() {
		return lime_audio_openal_AL.getError();
	}
	,getErrorString: function() {
		return lime_audio_openal_AL.getErrorString();
	}
	,getFloat: function(param) {
		return lime_audio_openal_AL.getFloat(param);
	}
	,getFloatv: function(param,count) {
		if(count == null) count = 1;
		return lime_audio_openal_AL.getFloatv(param,count);
	}
	,getInteger: function(param) {
		return lime_audio_openal_AL.getInteger(param);
	}
	,getIntegerv: function(param,count) {
		if(count == null) count = 1;
		return lime_audio_openal_AL.getIntegerv(param,count);
	}
	,getListener3f: function(param) {
		return lime_audio_openal_AL.getListener3f(param);
	}
	,getListener3i: function(param) {
		return lime_audio_openal_AL.getListener3i(param);
	}
	,getListenerf: function(param) {
		return lime_audio_openal_AL.getListenerf(param);
	}
	,getListenerfv: function(param,count) {
		if(count == null) count = 1;
		return lime_audio_openal_AL.getListenerfv(param,count);
	}
	,getListeneri: function(param) {
		return lime_audio_openal_AL.getListeneri(param);
	}
	,getListeneriv: function(param,count) {
		if(count == null) count = 1;
		return lime_audio_openal_AL.getListeneriv(param,count);
	}
	,getProcAddress: function(fname) {
		return lime_audio_openal_AL.getProcAddress(fname);
	}
	,getSource3f: function(source,param) {
		return lime_audio_openal_AL.getSource3f(source,param);
	}
	,getSourcef: function(source,param) {
		return lime_audio_openal_AL.getSourcef(source,param);
	}
	,getSource3i: function(source,param) {
		return lime_audio_openal_AL.getSource3i(source,param);
	}
	,getSourcefv: function(source,param,count) {
		if(count == null) count = 1;
		return lime_audio_openal_AL.getSourcefv(source,param);
	}
	,getSourcei: function(source,param) {
		return lime_audio_openal_AL.getSourcei(source,param);
	}
	,getSourceiv: function(source,param,count) {
		if(count == null) count = 1;
		return lime_audio_openal_AL.getSourceiv(source,param,count);
	}
	,getString: function(param) {
		return lime_audio_openal_AL.getString(param);
	}
	,isBuffer: function(buffer) {
		return lime_audio_openal_AL.isBuffer(buffer);
	}
	,isEnabled: function(capability) {
		return lime_audio_openal_AL.isEnabled(capability);
	}
	,isExtensionPresent: function(extname) {
		return lime_audio_openal_AL.isExtensionPresent(extname);
	}
	,isSource: function(source) {
		return lime_audio_openal_AL.isSource(source);
	}
	,listener3f: function(param,value1,value2,value3) {
		lime_audio_openal_AL.listener3f(param,value1,value2,value3);
	}
	,listener3i: function(param,value1,value2,value3) {
		lime_audio_openal_AL.listener3i(param,value1,value2,value3);
	}
	,listenerf: function(param,value) {
		lime_audio_openal_AL.listenerf(param,value);
	}
	,listenerfv: function(param,values) {
		lime_audio_openal_AL.listenerfv(param,values);
	}
	,listeneri: function(param,value) {
		lime_audio_openal_AL.listeneri(param,value);
	}
	,listeneriv: function(param,values) {
		lime_audio_openal_AL.listeneriv(param,values);
	}
	,source3f: function(source,param,value1,value2,value3) {
		lime_audio_openal_AL.source3f(source,param,value1,value2,value3);
	}
	,source3i: function(source,param,value1,value2,value3) {
		lime_audio_openal_AL.source3i(source,param,value1,value2,value3);
	}
	,sourcef: function(source,param,value) {
		lime_audio_openal_AL.sourcef(source,param,value);
	}
	,sourcefv: function(source,param,values) {
		lime_audio_openal_AL.sourcefv(source,param,values);
	}
	,sourcei: function(source,param,value) {
		lime_audio_openal_AL.sourcei(source,param,value);
	}
	,sourceiv: function(source,param,values) {
		lime_audio_openal_AL.sourceiv(source,param,values);
	}
	,sourcePlay: function(source) {
		lime_audio_openal_AL.sourcePlay(source);
	}
	,sourcePlayv: function(sources) {
		lime_audio_openal_AL.sourcePlayv(sources);
	}
	,sourceStop: function(source) {
		lime_audio_openal_AL.sourceStop(source);
	}
	,sourceStopv: function(sources) {
		lime_audio_openal_AL.sourceStopv(sources);
	}
	,sourceRewind: function(source) {
		lime_audio_openal_AL.sourceRewind(source);
	}
	,sourceRewindv: function(sources) {
		lime_audio_openal_AL.sourceRewindv(sources);
	}
	,sourcePause: function(source) {
		lime_audio_openal_AL.sourcePause(source);
	}
	,sourcePausev: function(sources) {
		lime_audio_openal_AL.sourcePausev(sources);
	}
	,sourceQueueBuffer: function(source,buffer) {
		lime_audio_openal_AL.sourceQueueBuffer(source,buffer);
	}
	,sourceQueueBuffers: function(source,nb,buffers) {
		lime_audio_openal_AL.sourceQueueBuffers(source,nb,buffers);
	}
	,sourceUnqueueBuffer: function(source) {
		return lime_audio_openal_AL.sourceUnqueueBuffer(source);
	}
	,sourceUnqueueBuffers: function(source,nb) {
		return lime_audio_openal_AL.sourceUnqueueBuffers(source,nb);
	}
	,speedOfSound: function(value) {
		lime_audio_openal_AL.speedOfSound(value);
	}
	,__class__: lime_audio_ALAudioContext
};
var lime_audio_ALCAudioContext = function() {
	this.ALL_DEVICES_SPECIFIER = 4115;
	this.DEFAULT_ALL_DEVICES_SPECIFIER = 4114;
	this.ENUMERATE_ALL_EXT = 1;
	this.EXTENSIONS = 4102;
	this.DEVICE_SPECIFIER = 4101;
	this.DEFAULT_DEVICE_SPECIFIER = 4100;
	this.ALL_ATTRIBUTES = 4099;
	this.ATTRIBUTES_SIZE = 4098;
	this.OUT_OF_MEMORY = 40965;
	this.INVALID_VALUE = 40964;
	this.INVALID_ENUM = 40963;
	this.INVALID_CONTEXT = 40962;
	this.INVALID_DEVICE = 40961;
	this.NO_ERROR = 0;
	this.STEREO_SOURCES = 4113;
	this.MONO_SOURCES = 4112;
	this.SYNC = 4105;
	this.REFRESH = 4104;
	this.FREQUENCY = 4103;
	this.TRUE = 1;
	this.FALSE = 0;
};
$hxClasses["lime.audio.ALCAudioContext"] = lime_audio_ALCAudioContext;
lime_audio_ALCAudioContext.__name__ = ["lime","audio","ALCAudioContext"];
lime_audio_ALCAudioContext.prototype = {
	FALSE: null
	,TRUE: null
	,FREQUENCY: null
	,REFRESH: null
	,SYNC: null
	,MONO_SOURCES: null
	,STEREO_SOURCES: null
	,NO_ERROR: null
	,INVALID_DEVICE: null
	,INVALID_CONTEXT: null
	,INVALID_ENUM: null
	,INVALID_VALUE: null
	,OUT_OF_MEMORY: null
	,ATTRIBUTES_SIZE: null
	,ALL_ATTRIBUTES: null
	,DEFAULT_DEVICE_SPECIFIER: null
	,DEVICE_SPECIFIER: null
	,EXTENSIONS: null
	,ENUMERATE_ALL_EXT: null
	,DEFAULT_ALL_DEVICES_SPECIFIER: null
	,ALL_DEVICES_SPECIFIER: null
	,closeDevice: function(device) {
		return lime_audio_openal_ALC.closeDevice(device);
	}
	,createContext: function(device,attrlist) {
		return lime_audio_openal_ALC.createContext(device,attrlist);
	}
	,destroyContext: function(context) {
		lime_audio_openal_ALC.destroyContext(context);
	}
	,getContextsDevice: function(context) {
		return lime_audio_openal_ALC.getContextsDevice(context);
	}
	,getCurrentContext: function() {
		return lime_audio_openal_ALC.getCurrentContext();
	}
	,getError: function(device) {
		return lime_audio_openal_ALC.getError(device);
	}
	,getErrorString: function(device) {
		return lime_audio_openal_ALC.getErrorString(device);
	}
	,getIntegerv: function(device,param,count) {
		if(count == null) count = 1;
		return lime_audio_openal_ALC.getIntegerv(device,param,count);
	}
	,getString: function(device,param) {
		return lime_audio_openal_ALC.getString(device,param);
	}
	,makeContextCurrent: function(context) {
		return lime_audio_openal_ALC.makeContextCurrent(context);
	}
	,openDevice: function(deviceName) {
		return lime_audio_openal_ALC.openDevice(deviceName);
	}
	,processContext: function(context) {
		lime_audio_openal_ALC.processContext(context);
	}
	,suspendContext: function(context) {
		lime_audio_openal_ALC.suspendContext(context);
	}
	,__class__: lime_audio_ALCAudioContext
};
var lime_audio_AudioBuffer = function() {
	this.id = 0;
};
$hxClasses["lime.audio.AudioBuffer"] = lime_audio_AudioBuffer;
lime_audio_AudioBuffer.__name__ = ["lime","audio","AudioBuffer"];
lime_audio_AudioBuffer.fromBytes = function(bytes) {
	return null;
};
lime_audio_AudioBuffer.fromFile = function(path) {
	return null;
};
lime_audio_AudioBuffer.fromURL = function(url,handler) {
	if(url != null && url.indexOf("http://") == -1 && url.indexOf("https://") == -1) handler(lime_audio_AudioBuffer.fromFile(url)); else {
	}
};
lime_audio_AudioBuffer.prototype = {
	bitsPerSample: null
	,channels: null
	,data: null
	,id: null
	,sampleRate: null
	,src: null
	,dispose: function() {
	}
	,__class__: lime_audio_AudioBuffer
};
var lime_audio_AudioContext = $hxClasses["lime.audio.AudioContext"] = { __ename__ : ["lime","audio","AudioContext"], __constructs__ : ["OPENAL","HTML5","WEB","FLASH","CUSTOM"] };
lime_audio_AudioContext.OPENAL = function(alc,al) { var $x = ["OPENAL",0,alc,al]; $x.__enum__ = lime_audio_AudioContext; $x.toString = $estr; return $x; };
lime_audio_AudioContext.HTML5 = function(context) { var $x = ["HTML5",1,context]; $x.__enum__ = lime_audio_AudioContext; $x.toString = $estr; return $x; };
lime_audio_AudioContext.WEB = function(context) { var $x = ["WEB",2,context]; $x.__enum__ = lime_audio_AudioContext; $x.toString = $estr; return $x; };
lime_audio_AudioContext.FLASH = function(context) { var $x = ["FLASH",3,context]; $x.__enum__ = lime_audio_AudioContext; $x.toString = $estr; return $x; };
lime_audio_AudioContext.CUSTOM = function(data) { var $x = ["CUSTOM",4,data]; $x.__enum__ = lime_audio_AudioContext; $x.toString = $estr; return $x; };
var lime_audio_AudioManager = function() { };
$hxClasses["lime.audio.AudioManager"] = lime_audio_AudioManager;
lime_audio_AudioManager.__name__ = ["lime","audio","AudioManager"];
lime_audio_AudioManager.init = function(context) {
	if(lime_audio_AudioManager.context == null) {
		if(context == null) try {
			window.AudioContext = window.AudioContext || window.webkitAudioContext;;
			lime_audio_AudioManager.context = lime_audio_AudioContext.WEB(new AudioContext ());
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			lime_audio_AudioManager.context = lime_audio_AudioContext.HTML5(new lime_audio_HTML5AudioContext());
		} else lime_audio_AudioManager.context = context;
	}
};
lime_audio_AudioManager.resume = function() {
	if(lime_audio_AudioManager.context != null) {
		var _g = lime_audio_AudioManager.context;
		switch(_g[1]) {
		case 0:
			var al = _g[3];
			var alc = _g[2];
			alc.processContext(alc.getCurrentContext());
			break;
		default:
		}
	}
};
lime_audio_AudioManager.shutdown = function() {
	if(lime_audio_AudioManager.context != null) {
		var _g = lime_audio_AudioManager.context;
		switch(_g[1]) {
		case 0:
			var al = _g[3];
			var alc = _g[2];
			var currentContext = alc.getCurrentContext();
			if(currentContext != null) {
				var device = alc.getContextsDevice(currentContext);
				alc.makeContextCurrent(null);
				alc.destroyContext(currentContext);
				alc.closeDevice(device);
			}
			break;
		default:
		}
	}
};
lime_audio_AudioManager.suspend = function() {
	if(lime_audio_AudioManager.context != null) {
		var _g = lime_audio_AudioManager.context;
		switch(_g[1]) {
		case 0:
			var al = _g[3];
			var alc = _g[2];
			alc.suspendContext(alc.getCurrentContext());
			break;
		default:
		}
	}
};
var lime_audio_AudioSource = function(buffer,offset,length,loops) {
	if(loops == null) loops = 0;
	if(offset == null) offset = 0;
	this.onComplete = new lime_app_Event_$Void_$Void();
	this.buffer = buffer;
	this.offset = offset;
	if(length != null && length != 0) this.set_length(length);
	this.set_loops(loops);
	this.id = 0;
	if(buffer != null) this.init();
};
$hxClasses["lime.audio.AudioSource"] = lime_audio_AudioSource;
lime_audio_AudioSource.__name__ = ["lime","audio","AudioSource"];
lime_audio_AudioSource.prototype = {
	onComplete: null
	,buffer: null
	,offset: null
	,id: null
	,playing: null
	,pauseTime: null
	,__length: null
	,__loops: null
	,dispose: function() {
		{
			var _g = lime_audio_AudioManager.context;
			switch(_g[1]) {
			case 0:
				var al = _g[3];
				var alc = _g[2];
				if(this.id != 0) al.deleteSource(this.id);
				break;
			default:
			}
		}
	}
	,init: function() {
		{
			var _g = lime_audio_AudioManager.context;
			switch(_g[1]) {
			case 0:
				var al = _g[3];
				var alc = _g[2];
				if(this.buffer.id == 0) {
					this.buffer.id = al.genBuffer();
					var format = 0;
					if(this.buffer.channels == 1) {
						if(this.buffer.bitsPerSample == 8) format = al.FORMAT_MONO8; else if(this.buffer.bitsPerSample == 16) format = al.FORMAT_MONO16;
					} else if(this.buffer.channels == 2) {
						if(this.buffer.bitsPerSample == 8) format = al.FORMAT_STEREO8; else if(this.buffer.bitsPerSample == 16) format = al.FORMAT_STEREO16;
					}
					al.bufferData(this.buffer.id,format,this.buffer.data,this.buffer.data.length,this.buffer.sampleRate);
				}
				this.id = al.genSource();
				al.sourcei(this.id,al.BUFFER,this.buffer.id);
				break;
			default:
			}
		}
	}
	,play: function() {
	}
	,pause: function() {
	}
	,stop: function() {
	}
	,timer_onRun: function() {
	}
	,get_currentTime: function() {
		return 0;
	}
	,set_currentTime: function(value) {
		return this.pauseTime = value;
	}
	,get_gain: function() {
		return 1;
	}
	,set_gain: function(value) {
		return 1;
	}
	,get_length: function() {
		if(this.__length != null) return this.__length;
		return 0;
	}
	,set_length: function(value) {
		return this.__length = value;
	}
	,get_loops: function() {
		return this.__loops;
	}
	,set_loops: function(loops) {
		return this.__loops = loops;
	}
	,__class__: lime_audio_AudioSource
};
var lime_audio_FlashAudioContext = function() {
};
$hxClasses["lime.audio.FlashAudioContext"] = lime_audio_FlashAudioContext;
lime_audio_FlashAudioContext.__name__ = ["lime","audio","FlashAudioContext"];
lime_audio_FlashAudioContext.prototype = {
	createBuffer: function(stream,context) {
		return null;
	}
	,getBytesLoaded: function(buffer) {
		return 0;
	}
	,getBytesTotal: function(buffer) {
		return 0;
	}
	,getID3: function(buffer) {
		return null;
	}
	,getIsBuffering: function(buffer) {
		return false;
	}
	,getIsURLInaccessible: function(buffer) {
		return false;
	}
	,getLength: function(buffer) {
		return 0;
	}
	,getURL: function(buffer) {
		return null;
	}
	,close: function(buffer) {
	}
	,extract: function(buffer,target,length,startPosition) {
		if(startPosition == null) startPosition = -1;
		return 0;
	}
	,load: function(buffer,stream,context) {
	}
	,loadCompressedDataFromByteArray: function(buffer,bytes,bytesLength) {
	}
	,loadPCMFromByteArray: function(buffer,bytes,samples,format,stereo,sampleRate) {
		if(sampleRate == null) sampleRate = 44100;
		if(stereo == null) stereo = true;
	}
	,play: function(buffer,startTime,loops,sndTransform) {
		if(loops == null) loops = 0;
		if(startTime == null) startTime = 0;
		return null;
	}
	,__class__: lime_audio_FlashAudioContext
};
var lime_audio_HTML5AudioContext = function() {
	this.NETWORK_NO_SOURCE = 3;
	this.NETWORK_LOADING = 2;
	this.NETWORK_IDLE = 1;
	this.NETWORK_EMPTY = 0;
	this.HAVE_NOTHING = 0;
	this.HAVE_METADATA = 1;
	this.HAVE_FUTURE_DATA = 3;
	this.HAVE_ENOUGH_DATA = 4;
	this.HAVE_CURRENT_DATA = 2;
};
$hxClasses["lime.audio.HTML5AudioContext"] = lime_audio_HTML5AudioContext;
lime_audio_HTML5AudioContext.__name__ = ["lime","audio","HTML5AudioContext"];
lime_audio_HTML5AudioContext.prototype = {
	HAVE_CURRENT_DATA: null
	,HAVE_ENOUGH_DATA: null
	,HAVE_FUTURE_DATA: null
	,HAVE_METADATA: null
	,HAVE_NOTHING: null
	,NETWORK_EMPTY: null
	,NETWORK_IDLE: null
	,NETWORK_LOADING: null
	,NETWORK_NO_SOURCE: null
	,canPlayType: function(buffer,type) {
		if(buffer.src != null) return buffer.src.canPlayType(type);
		return null;
	}
	,createBuffer: function(urlString) {
		var buffer = new lime_audio_AudioBuffer();
		buffer.src = new Audio();
		buffer.src.src = urlString;
		return buffer;
	}
	,getAutoplay: function(buffer) {
		if(buffer.src != null) return buffer.src.autoplay;
		return false;
	}
	,getBuffered: function(buffer) {
		if(buffer.src != null) return buffer.src.buffered;
		return null;
	}
	,getCurrentSrc: function(buffer) {
		if(buffer.src != null) return buffer.src.currentSrc;
		return null;
	}
	,getCurrentTime: function(buffer) {
		if(buffer.src != null) return buffer.src.currentTime;
		return 0;
	}
	,getDefaultPlaybackRate: function(buffer) {
		if(buffer.src != null) return buffer.src.defaultPlaybackRate;
		return 1;
	}
	,getDuration: function(buffer) {
		if(buffer.src != null) return buffer.src.duration;
		return 0;
	}
	,getEnded: function(buffer) {
		if(buffer.src != null) return buffer.src.ended;
		return false;
	}
	,getError: function(buffer) {
		if(buffer.src != null) return buffer.src.error;
		return null;
	}
	,getLoop: function(buffer) {
		if(buffer.src != null) return buffer.src.loop;
		return false;
	}
	,getMuted: function(buffer) {
		if(buffer.src != null) return buffer.src.muted;
		return false;
	}
	,getNetworkState: function(buffer) {
		if(buffer.src != null) return buffer.src.networkState;
		return 0;
	}
	,getPaused: function(buffer) {
		if(buffer.src != null) return buffer.src.paused;
		return false;
	}
	,getPlaybackRate: function(buffer) {
		if(buffer.src != null) return buffer.src.playbackRate;
		return 1;
	}
	,getPlayed: function(buffer) {
		if(buffer.src != null) return buffer.src.played;
		return null;
	}
	,getPreload: function(buffer) {
		if(buffer.src != null) return buffer.src.preload;
		return null;
	}
	,getReadyState: function(buffer) {
		if(buffer.src != null) return buffer.src.readyState;
		return 0;
	}
	,getSeekable: function(buffer) {
		if(buffer.src != null) return buffer.src.seekable;
		return null;
	}
	,getSeeking: function(buffer) {
		if(buffer.src != null) return buffer.src.seeking;
		return false;
	}
	,getSrc: function(buffer) {
		if(buffer.src != null) return buffer.src.src;
		return null;
	}
	,getStartTime: function(buffer) {
		if(buffer.src != null) return buffer.src.playbackRate;
		return 0;
	}
	,getVolume: function(buffer) {
		if(buffer.src != null) return buffer.src.volume;
		return 1;
	}
	,load: function(buffer) {
		if(buffer.src != null) return buffer.src.load();
	}
	,pause: function(buffer) {
		if(buffer.src != null) return buffer.src.pause();
	}
	,play: function(buffer) {
		if(buffer.src != null) return buffer.src.play();
	}
	,setAutoplay: function(buffer,value) {
		if(buffer.src != null) buffer.src.autoplay = value;
	}
	,setCurrentTime: function(buffer,value) {
		if(buffer.src != null) buffer.src.currentTime = value;
	}
	,setDefaultPlaybackRate: function(buffer,value) {
		if(buffer.src != null) buffer.src.defaultPlaybackRate = value;
	}
	,setLoop: function(buffer,value) {
		if(buffer.src != null) buffer.src.loop = value;
	}
	,setMuted: function(buffer,value) {
		if(buffer.src != null) buffer.src.muted = value;
	}
	,setPlaybackRate: function(buffer,value) {
		if(buffer.src != null) buffer.src.playbackRate = value;
	}
	,setPreload: function(buffer,value) {
		if(buffer.src != null) buffer.src.preload = value;
	}
	,setSrc: function(buffer,value) {
		if(buffer.src != null) buffer.src.src = value;
	}
	,setVolume: function(buffer,value) {
		if(buffer.src != null) buffer.src.volume = value;
	}
	,__class__: lime_audio_HTML5AudioContext
};
var lime_audio_openal_AL = function() { };
$hxClasses["lime.audio.openal.AL"] = lime_audio_openal_AL;
lime_audio_openal_AL.__name__ = ["lime","audio","openal","AL"];
lime_audio_openal_AL.bufferData = function(buffer,format,data,size,freq) {
};
lime_audio_openal_AL.buffer3f = function(buffer,param,value1,value2,value3) {
};
lime_audio_openal_AL.buffer3i = function(buffer,param,value1,value2,value3) {
};
lime_audio_openal_AL.bufferf = function(buffer,param,value) {
};
lime_audio_openal_AL.bufferfv = function(buffer,param,values) {
};
lime_audio_openal_AL.bufferi = function(buffer,param,value) {
};
lime_audio_openal_AL.bufferiv = function(buffer,param,values) {
};
lime_audio_openal_AL.deleteBuffer = function(buffer) {
};
lime_audio_openal_AL.deleteBuffers = function(buffers) {
};
lime_audio_openal_AL.deleteSource = function(source) {
};
lime_audio_openal_AL.deleteSources = function(sources) {
};
lime_audio_openal_AL.disable = function(capability) {
};
lime_audio_openal_AL.distanceModel = function(distanceModel) {
};
lime_audio_openal_AL.dopplerFactor = function(value) {
};
lime_audio_openal_AL.dopplerVelocity = function(value) {
};
lime_audio_openal_AL.enable = function(capability) {
};
lime_audio_openal_AL.genSource = function() {
	return 0;
};
lime_audio_openal_AL.genSources = function(n) {
	return null;
};
lime_audio_openal_AL.genBuffer = function() {
	return 0;
};
lime_audio_openal_AL.genBuffers = function(n) {
	return null;
};
lime_audio_openal_AL.getBoolean = function(param) {
	return false;
};
lime_audio_openal_AL.getBooleanv = function(param,count) {
	if(count == null) count = 1;
	return null;
};
lime_audio_openal_AL.getBuffer3f = function(buffer,param) {
	return null;
};
lime_audio_openal_AL.getBuffer3i = function(buffer,param) {
	return null;
};
lime_audio_openal_AL.getBufferf = function(buffer,param) {
	return 0;
};
lime_audio_openal_AL.getBufferfv = function(buffer,param,count) {
	if(count == null) count = 1;
	return null;
};
lime_audio_openal_AL.getBufferi = function(buffer,param) {
	return 0;
};
lime_audio_openal_AL.getBufferiv = function(buffer,param,count) {
	if(count == null) count = 1;
	return null;
};
lime_audio_openal_AL.getDouble = function(param) {
	return 0;
};
lime_audio_openal_AL.getDoublev = function(param,count) {
	if(count == null) count = 1;
	return null;
};
lime_audio_openal_AL.getEnumValue = function(ename) {
	return 0;
};
lime_audio_openal_AL.getError = function() {
	return 0;
};
lime_audio_openal_AL.getErrorString = function() {
	var _g = lime_audio_openal_AL.getError();
	switch(_g) {
	case 40961:
		return "INVALID_NAME: Invalid parameter name";
	case 40962:
		return "INVALID_ENUM: Invalid enum value";
	case 40963:
		return "INVALID_VALUE: Invalid parameter value";
	case 40964:
		return "INVALID_OPERATION: Illegal operation or call";
	case 40965:
		return "OUT_OF_MEMORY: OpenAL has run out of memory";
	default:
		return "";
	}
};
lime_audio_openal_AL.getFloat = function(param) {
	return 0;
};
lime_audio_openal_AL.getFloatv = function(param,count) {
	if(count == null) count = 1;
	return null;
};
lime_audio_openal_AL.getInteger = function(param) {
	return 0;
};
lime_audio_openal_AL.getIntegerv = function(param,count) {
	if(count == null) count = 1;
	return null;
};
lime_audio_openal_AL.getListener3f = function(param) {
	return null;
};
lime_audio_openal_AL.getListener3i = function(param) {
	return null;
};
lime_audio_openal_AL.getListenerf = function(param) {
	return 0;
};
lime_audio_openal_AL.getListenerfv = function(param,count) {
	if(count == null) count = 1;
	return null;
};
lime_audio_openal_AL.getListeneri = function(param) {
	return 0;
};
lime_audio_openal_AL.getListeneriv = function(param,count) {
	if(count == null) count = 1;
	return null;
};
lime_audio_openal_AL.getProcAddress = function(fname) {
	return null;
};
lime_audio_openal_AL.getSource3f = function(source,param) {
	return null;
};
lime_audio_openal_AL.getSourcef = function(source,param) {
	return 0;
};
lime_audio_openal_AL.getSource3i = function(source,param) {
	return null;
};
lime_audio_openal_AL.getSourcefv = function(source,param,count) {
	if(count == null) count = 1;
	return null;
};
lime_audio_openal_AL.getSourcei = function(source,param) {
	return 0;
};
lime_audio_openal_AL.getSourceiv = function(source,param,count) {
	if(count == null) count = 1;
	return null;
};
lime_audio_openal_AL.getString = function(param) {
	return null;
};
lime_audio_openal_AL.isBuffer = function(buffer) {
	return false;
};
lime_audio_openal_AL.isEnabled = function(capability) {
	return false;
};
lime_audio_openal_AL.isExtensionPresent = function(extname) {
	return false;
};
lime_audio_openal_AL.isSource = function(source) {
	return false;
};
lime_audio_openal_AL.listener3f = function(param,value1,value2,value3) {
};
lime_audio_openal_AL.listener3i = function(param,value1,value2,value3) {
};
lime_audio_openal_AL.listenerf = function(param,value) {
};
lime_audio_openal_AL.listenerfv = function(param,values) {
};
lime_audio_openal_AL.listeneri = function(param,value) {
};
lime_audio_openal_AL.listeneriv = function(param,values) {
};
lime_audio_openal_AL.source3f = function(source,param,value1,value2,value3) {
};
lime_audio_openal_AL.source3i = function(source,param,value1,value2,value3) {
};
lime_audio_openal_AL.sourcef = function(source,param,value) {
};
lime_audio_openal_AL.sourcefv = function(source,param,values) {
};
lime_audio_openal_AL.sourcei = function(source,param,value) {
};
lime_audio_openal_AL.sourceiv = function(source,param,values) {
};
lime_audio_openal_AL.sourcePlay = function(source) {
};
lime_audio_openal_AL.sourcePlayv = function(sources) {
};
lime_audio_openal_AL.sourceStop = function(source) {
};
lime_audio_openal_AL.sourceStopv = function(sources) {
};
lime_audio_openal_AL.sourceRewind = function(source) {
};
lime_audio_openal_AL.sourceRewindv = function(sources) {
};
lime_audio_openal_AL.sourcePause = function(source) {
};
lime_audio_openal_AL.sourcePausev = function(sources) {
};
lime_audio_openal_AL.sourceQueueBuffer = function(source,buffer) {
};
lime_audio_openal_AL.sourceQueueBuffers = function(source,nb,buffers) {
};
lime_audio_openal_AL.sourceUnqueueBuffer = function(source) {
	return 0;
};
lime_audio_openal_AL.sourceUnqueueBuffers = function(source,nb) {
	return null;
};
lime_audio_openal_AL.speedOfSound = function(value) {
};
var lime_audio_openal_ALC = function() { };
$hxClasses["lime.audio.openal.ALC"] = lime_audio_openal_ALC;
lime_audio_openal_ALC.__name__ = ["lime","audio","openal","ALC"];
lime_audio_openal_ALC.closeDevice = function(device) {
	return false;
};
lime_audio_openal_ALC.createContext = function(device,attrlist) {
	return null;
};
lime_audio_openal_ALC.destroyContext = function(context) {
};
lime_audio_openal_ALC.getContextsDevice = function(context) {
	return null;
};
lime_audio_openal_ALC.getCurrentContext = function() {
	return null;
};
lime_audio_openal_ALC.getError = function(device) {
	return 0;
};
lime_audio_openal_ALC.getErrorString = function(device) {
	var _g = lime_audio_openal_ALC.getError(device);
	switch(_g) {
	case 40961:
		return "INVALID_DEVICE: Invalid device (or no device?)";
	case 40962:
		return "INVALID_CONTEXT: Invalid context (or no context?)";
	case 40963:
		return "INVALID_ENUM: Invalid enum value";
	case 40964:
		return "INVALID_VALUE: Invalid param value";
	case 40965:
		return "OUT_OF_MEMORY: OpenAL has run out of memory";
	default:
		return "";
	}
};
lime_audio_openal_ALC.getIntegerv = function(device,param,size) {
	return null;
};
lime_audio_openal_ALC.getString = function(device,param) {
	return null;
};
lime_audio_openal_ALC.makeContextCurrent = function(context) {
	return false;
};
lime_audio_openal_ALC.openDevice = function(deviceName) {
	return null;
};
lime_audio_openal_ALC.processContext = function(context) {
};
lime_audio_openal_ALC.suspendContext = function(context) {
};
var lime_audio_openal__$ALContext_ALContext_$Impl_$ = {};
$hxClasses["lime.audio.openal._ALContext.ALContext_Impl_"] = lime_audio_openal__$ALContext_ALContext_$Impl_$;
lime_audio_openal__$ALContext_ALContext_$Impl_$.__name__ = ["lime","audio","openal","_ALContext","ALContext_Impl_"];
lime_audio_openal__$ALContext_ALContext_$Impl_$._new = function(handle) {
	return handle;
};
var lime_audio_openal__$ALDevice_ALDevice_$Impl_$ = {};
$hxClasses["lime.audio.openal._ALDevice.ALDevice_Impl_"] = lime_audio_openal__$ALDevice_ALDevice_$Impl_$;
lime_audio_openal__$ALDevice_ALDevice_$Impl_$.__name__ = ["lime","audio","openal","_ALDevice","ALDevice_Impl_"];
lime_audio_openal__$ALDevice_ALDevice_$Impl_$._new = function(handle) {
	return handle;
};
var lime_graphics_ConsoleRenderContext = function() {
};
$hxClasses["lime.graphics.ConsoleRenderContext"] = lime_graphics_ConsoleRenderContext;
lime_graphics_ConsoleRenderContext.__name__ = ["lime","graphics","ConsoleRenderContext"];
lime_graphics_ConsoleRenderContext.prototype = {
	createIndexBuffer: function(indices,count) {
		return new lime_graphics_console_IndexBuffer();
	}
	,createVertexBuffer: function(decl,count) {
		return new lime_graphics_console_VertexBuffer();
	}
	,lookupShader: function(name) {
		return new lime_graphics_console_Shader();
	}
	,clear: function(r,g,b,a,depth,stencil) {
		if(stencil == null) stencil = 0;
		if(depth == null) depth = 1.0;
	}
	,bindShader: function(shader) {
	}
	,setViewport: function(x,y,width,height,nearPlane,farPlane) {
		if(farPlane == null) farPlane = 1.0;
		if(nearPlane == null) nearPlane = 0.0;
	}
	,setVertexShaderConstantF: function(startRegister,vec4,vec4count) {
	}
	,setVertexSource: function(vb) {
	}
	,setIndexSource: function(ib) {
	}
	,draw: function(primitive,startVertex,primitiveCount) {
	}
	,drawIndexed: function(primitive,vertexCount,startIndex,primitiveCount) {
	}
	,get_width: function() {
		return 0;
	}
	,get_height: function() {
		return 0;
	}
	,__class__: lime_graphics_ConsoleRenderContext
};
var lime_graphics_FlashRenderContext = function() {
};
$hxClasses["lime.graphics.FlashRenderContext"] = lime_graphics_FlashRenderContext;
lime_graphics_FlashRenderContext.__name__ = ["lime","graphics","FlashRenderContext"];
lime_graphics_FlashRenderContext.prototype = {
	accessibilityImplementation: null
	,accessibilityProperties: null
	,alpha: null
	,blendMode: null
	,blendShader: null
	,buttonMode: null
	,cacheAsBitmap: null
	,contextMenu: null
	,doubleClickEnabled: null
	,dropTarget: null
	,filters: null
	,focusRect: null
	,graphics: null
	,height: null
	,hitArea: null
	,loaderInfo: null
	,mask: null
	,mouseChildren: null
	,mouseEnabled: null
	,mouseX: null
	,mouseY: null
	,name: null
	,needsSoftKeyboard: null
	,numChildren: null
	,opaqueBackground: null
	,parent: null
	,root: null
	,rotation: null
	,rotationX: null
	,rotationY: null
	,rotationZ: null
	,scale9Grid: null
	,scaleX: null
	,scaleY: null
	,scaleZ: null
	,scrollRect: null
	,softKeyboardInputAreaOfInterest: null
	,soundTransform: null
	,stage: null
	,tabChildren: null
	,tabEnabled: null
	,tabIndex: null
	,textSnapshot: null
	,transform: null
	,useHandCursor: null
	,visible: null
	,width: null
	,x: null
	,y: null
	,z: null
	,addChild: function(child) {
		return null;
	}
	,addChildAt: function(child,index) {
		return null;
	}
	,addEventListener: function(type,listener,useCapture,priority,useWeakReference) {
		if(useWeakReference == null) useWeakReference = false;
		if(priority == null) priority = 0;
		if(useCapture == null) useCapture = false;
	}
	,areInaccessibleObjectsUnderPoint: function(point) {
		return false;
	}
	,contains: function(child) {
		return false;
	}
	,dispatchEvent: function(event) {
		return false;
	}
	,getBounds: function(targetCoordinateSpace) {
		return null;
	}
	,getChildAt: function(index) {
		return null;
	}
	,getChildByName: function(name) {
		return null;
	}
	,getChildIndex: function(child) {
		return 0;
	}
	,getObjectsUnderPoint: function(point) {
		return null;
	}
	,getRect: function(targetCoordinateSpace) {
		return null;
	}
	,globalToLocal: function(point) {
		return null;
	}
	,globalToLocal3D: function(point) {
		return null;
	}
	,hasEventListener: function(type) {
		return false;
	}
	,hitTestObject: function(obj) {
		return false;
	}
	,hitTestPoint: function(x,y,shapeFlag) {
		if(shapeFlag == null) shapeFlag = false;
		return false;
	}
	,local3DToGlobal: function(point3d) {
		return null;
	}
	,localToGlobal: function(point) {
		return null;
	}
	,removeChild: function(child) {
		return null;
	}
	,removeChildAt: function(index) {
		return null;
	}
	,removeChildren: function(beginIndex,endIndex) {
		if(endIndex == null) endIndex = 2147483647;
		if(beginIndex == null) beginIndex = 0;
	}
	,removeEventListener: function(type,listener,useCapture) {
		if(useCapture == null) useCapture = false;
	}
	,requestSoftKeyboard: function() {
		return false;
	}
	,setChildIndex: function(child,index) {
	}
	,startDrag: function(lockCenter,bounds) {
		if(lockCenter == null) lockCenter = false;
	}
	,startTouchDrag: function(touchPointID,lockCenter,bounds) {
		if(lockCenter == null) lockCenter = false;
	}
	,stopAllMovieClips: function() {
	}
	,stopDrag: function() {
	}
	,stopTouchDrag: function(touchPointID) {
	}
	,swapChildren: function(child1,child2) {
	}
	,swapChildrenAt: function(index1,index2) {
	}
	,toString: function() {
		return null;
	}
	,willTrigger: function(type) {
		return false;
	}
	,__class__: lime_graphics_FlashRenderContext
};
var lime_graphics_Image = function(buffer,offsetX,offsetY,width,height,color,type) {
	if(height == null) height = -1;
	if(width == null) width = -1;
	if(offsetY == null) offsetY = 0;
	if(offsetX == null) offsetX = 0;
	this.offsetX = offsetX;
	this.offsetY = offsetY;
	this.width = width;
	this.height = height;
	if(type == null) {
		if(lime_app_Application.current != null && lime_app_Application.current.renderers[0] != null) {
			var _g = lime_app_Application.current.renderers[0].context;
			switch(_g[1]) {
			case 2:case 1:
				this.type = lime_graphics_ImageType.CANVAS;
				break;
			case 3:
				this.type = lime_graphics_ImageType.FLASH;
				break;
			default:
				this.type = lime_graphics_ImageType.DATA;
			}
		} else this.type = lime_graphics_ImageType.DATA;
	} else this.type = type;
	if(buffer == null) {
		if(width > 0 && height > 0) {
			var _g1 = this.type;
			switch(_g1[1]) {
			case 0:
				this.buffer = new lime_graphics_ImageBuffer(null,width,height);
				lime_graphics_utils_ImageCanvasUtil.createCanvas(this,width,height);
				if(color != null) this.fillRect(new lime_math_Rectangle(0,0,width,height),color);
				break;
			case 1:
				this.buffer = new lime_graphics_ImageBuffer((function($this) {
					var $r;
					var elements = width * height * 4;
					var this1;
					if(elements != null) this1 = new Uint8Array(elements); else this1 = null;
					$r = this1;
					return $r;
				}(this)),width,height);
				if(color != null) this.fillRect(new lime_math_Rectangle(0,0,width,height),color);
				break;
			case 2:
				break;
			default:
			}
		}
	} else this.__fromImageBuffer(buffer);
};
$hxClasses["lime.graphics.Image"] = lime_graphics_Image;
lime_graphics_Image.__name__ = ["lime","graphics","Image"];
lime_graphics_Image.fromBase64 = function(base64,type,onload) {
	if(base64 == null) return null;
	var image = new lime_graphics_Image();
	image.__fromBase64(base64,type,onload);
	return image;
};
lime_graphics_Image.fromBitmapData = function(bitmapData) {
	if(bitmapData == null) return null;
	return bitmapData.image;
};
lime_graphics_Image.fromBytes = function(bytes,onload) {
	if(bytes == null) return null;
	var image = new lime_graphics_Image();
	image.__fromBytes(bytes,onload);
	return image;
};
lime_graphics_Image.fromCanvas = function(canvas) {
	if(canvas == null) return null;
	var buffer = new lime_graphics_ImageBuffer(null,canvas.width,canvas.height);
	buffer.set_src(canvas);
	return new lime_graphics_Image(buffer);
};
lime_graphics_Image.fromFile = function(path,onload,onerror) {
	var image = new lime_graphics_Image();
	image.__fromFile(path,onload,onerror);
	return image;
};
lime_graphics_Image.fromImageElement = function(image) {
	if(image == null) return null;
	var buffer = new lime_graphics_ImageBuffer(null,image.width,image.height);
	buffer.set_src(image);
	return new lime_graphics_Image(buffer);
};
lime_graphics_Image.__base64Encode = function(bytes) {
	var extension;
	var _g = bytes.length % 3;
	switch(_g) {
	case 1:
		extension = "==";
		break;
	case 2:
		extension = "=";
		break;
	default:
		extension = "";
	}
	if(lime_graphics_Image.__base64Encoder == null) lime_graphics_Image.__base64Encoder = new haxe_crypto_BaseCode(haxe_io_Bytes.ofString(lime_graphics_Image.__base64Chars));
	return lime_graphics_Image.__base64Encoder.encodeBytes(bytes).toString() + extension;
};
lime_graphics_Image.__isJPG = function(bytes) {
	return bytes.b[0] == 255 && bytes.b[1] == 216;
};
lime_graphics_Image.__isPNG = function(bytes) {
	return bytes.b[0] == 137 && bytes.b[1] == 80 && bytes.b[2] == 78 && bytes.b[3] == 71 && bytes.b[4] == 13 && bytes.b[5] == 10 && bytes.b[6] == 26 && bytes.b[7] == 10;
};
lime_graphics_Image.__isGIF = function(bytes) {
	if(bytes.b[0] == 71 && bytes.b[1] == 73 && bytes.b[2] == 70 && bytes.b[3] == 56) {
		var b = bytes.b[4];
		return (b == 55 || b == 57) && bytes.b[5] == 97;
	}
	return false;
};
lime_graphics_Image.prototype = {
	buffer: null
	,dirty: null
	,height: null
	,offsetX: null
	,offsetY: null
	,rect: null
	,type: null
	,width: null
	,x: null
	,y: null
	,clone: function() {
		if(this.buffer != null) {
			if(this.type == lime_graphics_ImageType.CANVAS && this.buffer.__srcImage == null) {
				lime_graphics_utils_ImageCanvasUtil.convertToCanvas(this);
				lime_graphics_utils_ImageCanvasUtil.sync(this,true);
			}
			var image = new lime_graphics_Image(this.buffer.clone(),this.offsetX,this.offsetY,this.width,this.height,null,this.type);
			image.dirty = this.dirty;
			return image;
		} else return new lime_graphics_Image(null,this.offsetX,this.offsetY,this.width,this.height,null,this.type);
	}
	,colorTransform: function(rect,colorMatrix) {
		rect = this.__clipRect(rect);
		if(this.buffer == null || rect == null) return;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime_graphics_utils_ImageCanvasUtil.colorTransform(this,rect,colorMatrix);
			break;
		case 1:
			lime_graphics_utils_ImageCanvasUtil.convertToData(this);
			lime_graphics_utils_ImageDataUtil.colorTransform(this,rect,colorMatrix);
			break;
		case 2:
			rect.offset(this.offsetX,this.offsetY);
			this.buffer.__srcBitmapData.colorTransform(rect.__toFlashRectangle(),lime_math__$ColorMatrix_ColorMatrix_$Impl_$.__toFlashColorTransform(colorMatrix));
			break;
		default:
		}
	}
	,copyChannel: function(sourceImage,sourceRect,destPoint,sourceChannel,destChannel) {
		sourceRect = this.__clipRect(sourceRect);
		if(this.buffer == null || sourceRect == null) return;
		if(destChannel == lime_graphics_ImageChannel.ALPHA && !this.get_transparent()) return;
		if(sourceRect.width <= 0 || sourceRect.height <= 0) return;
		if(sourceRect.x + sourceRect.width > sourceImage.width) sourceRect.width = sourceImage.width - sourceRect.x;
		if(sourceRect.y + sourceRect.height > sourceImage.height) sourceRect.height = sourceImage.height - sourceRect.y;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime_graphics_utils_ImageCanvasUtil.copyChannel(this,sourceImage,sourceRect,destPoint,sourceChannel,destChannel);
			break;
		case 1:
			lime_graphics_utils_ImageCanvasUtil.convertToData(this);
			lime_graphics_utils_ImageDataUtil.copyChannel(this,sourceImage,sourceRect,destPoint,sourceChannel,destChannel);
			break;
		case 2:
			var srcChannel;
			switch(sourceChannel[1]) {
			case 0:
				srcChannel = 1;
				break;
			case 1:
				srcChannel = 2;
				break;
			case 2:
				srcChannel = 4;
				break;
			case 3:
				srcChannel = 8;
				break;
			}
			var dstChannel;
			switch(destChannel[1]) {
			case 0:
				dstChannel = 1;
				break;
			case 1:
				dstChannel = 2;
				break;
			case 2:
				dstChannel = 4;
				break;
			case 3:
				dstChannel = 8;
				break;
			}
			sourceRect.offset(sourceImage.offsetX,sourceImage.offsetY);
			destPoint.offset(this.offsetX,this.offsetY);
			this.buffer.__srcBitmapData.copyChannel(sourceImage.buffer.get_src(),sourceRect.__toFlashRectangle(),destPoint.__toFlashPoint(),srcChannel,dstChannel);
			break;
		default:
		}
	}
	,copyPixels: function(sourceImage,sourceRect,destPoint,alphaImage,alphaPoint,mergeAlpha) {
		if(mergeAlpha == null) mergeAlpha = false;
		if(this.buffer == null || sourceImage == null) return;
		if(sourceRect.width <= 0 || sourceRect.height <= 0) return;
		if(this.width <= 0 || this.height <= 0) return;
		if(sourceRect.x + sourceRect.width > sourceImage.width) sourceRect.width = sourceImage.width - sourceRect.x;
		if(sourceRect.y + sourceRect.height > sourceImage.height) sourceRect.height = sourceImage.height - sourceRect.y;
		if(sourceRect.x < 0) {
			sourceRect.width += sourceRect.x;
			sourceRect.x = 0;
		}
		if(sourceRect.y < 0) {
			sourceRect.height += sourceRect.y;
			sourceRect.y = 0;
		}
		if(destPoint.x + sourceRect.width > this.width) sourceRect.width = this.width - destPoint.x;
		if(destPoint.y + sourceRect.height > this.height) sourceRect.height = this.height - destPoint.y;
		if(destPoint.x < 0) {
			sourceRect.width += destPoint.x;
			sourceRect.x = -destPoint.x;
			destPoint.x = 0;
		}
		if(destPoint.y < 0) {
			sourceRect.height += destPoint.y;
			sourceRect.y = -destPoint.y;
			destPoint.y = 0;
		}
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime_graphics_utils_ImageCanvasUtil.convertToCanvas(this);
			lime_graphics_utils_ImageCanvasUtil.copyPixels(this,sourceImage,sourceRect,destPoint,alphaImage,alphaPoint,mergeAlpha);
			break;
		case 1:
			lime_graphics_utils_ImageCanvasUtil.convertToData(this);
			lime_graphics_utils_ImageCanvasUtil.convertToData(sourceImage);
			lime_graphics_utils_ImageDataUtil.copyPixels(this,sourceImage,sourceRect,destPoint,alphaImage,alphaPoint,mergeAlpha);
			break;
		case 2:
			sourceRect.offset(sourceImage.offsetX,sourceImage.offsetY);
			destPoint.offset(this.offsetX,this.offsetY);
			if(alphaImage != null && alphaPoint != null) alphaPoint.offset(alphaImage.offsetX,alphaImage.offsetY);
			this.buffer.__srcBitmapData.copyPixels(sourceImage.buffer.__srcBitmapData,sourceRect.__toFlashRectangle(),destPoint.__toFlashPoint(),alphaImage != null?alphaImage.buffer.get_src():null,alphaPoint != null?alphaPoint.__toFlashPoint():null,mergeAlpha);
			break;
		default:
		}
	}
	,encode: function(format,quality) {
		if(quality == null) quality = 90;
		if(format == null) format = "png";
		switch(format) {
		case "png":
			return lime_graphics_format_PNG.encode(this);
		case "jpg":case "jpeg":
			return lime_graphics_format_JPEG.encode(this,quality);
		case "bmp":
			return lime_graphics_format_BMP.encode(this);
		default:
		}
		return null;
	}
	,fillRect: function(rect,color,format) {
		rect = this.__clipRect(rect);
		if(this.buffer == null || rect == null) return;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime_graphics_utils_ImageCanvasUtil.fillRect(this,rect,color,format);
			break;
		case 1:
			lime_graphics_utils_ImageCanvasUtil.convertToData(this);
			if(this.buffer.data.length == 0) return;
			lime_graphics_utils_ImageDataUtil.fillRect(this,rect,color,format);
			break;
		case 2:
			rect.offset(this.offsetX,this.offsetY);
			var argb;
			if(format != null) switch(format) {
			case 1:
				argb = color;
				break;
			case 2:
				{
					var bgra = color;
					var argb1 = 0;
					argb1 = (bgra & 255 & 255) << 24 | (bgra >> 8 & 255 & 255) << 16 | (bgra >> 16 & 255 & 255) << 8 | bgra >> 24 & 255 & 255;
					argb = argb1;
				}
				break;
			default:
				{
					var rgba = color;
					var argb2 = 0;
					argb2 = (rgba & 255 & 255) << 24 | (rgba >> 24 & 255 & 255) << 16 | (rgba >> 16 & 255 & 255) << 8 | rgba >> 8 & 255 & 255;
					argb = argb2;
				}
			} else {
				var rgba1 = color;
				var argb3 = 0;
				argb3 = (rgba1 & 255 & 255) << 24 | (rgba1 >> 24 & 255 & 255) << 16 | (rgba1 >> 16 & 255 & 255) << 8 | rgba1 >> 8 & 255 & 255;
				argb = argb3;
			}
			this.buffer.__srcBitmapData.fillRect(rect.__toFlashRectangle(),argb);
			break;
		default:
		}
	}
	,floodFill: function(x,y,color,format) {
		if(this.buffer == null) return;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime_graphics_utils_ImageCanvasUtil.floodFill(this,x,y,color,format);
			break;
		case 1:
			lime_graphics_utils_ImageCanvasUtil.convertToData(this);
			lime_graphics_utils_ImageDataUtil.floodFill(this,x,y,color,format);
			break;
		case 2:
			var argb;
			if(format != null) switch(format) {
			case 1:
				argb = color;
				break;
			case 2:
				{
					var bgra = color;
					var argb1 = 0;
					argb1 = (bgra & 255 & 255) << 24 | (bgra >> 8 & 255 & 255) << 16 | (bgra >> 16 & 255 & 255) << 8 | bgra >> 24 & 255 & 255;
					argb = argb1;
				}
				break;
			default:
				{
					var rgba = color;
					var argb2 = 0;
					argb2 = (rgba & 255 & 255) << 24 | (rgba >> 24 & 255 & 255) << 16 | (rgba >> 16 & 255 & 255) << 8 | rgba >> 8 & 255 & 255;
					argb = argb2;
				}
			} else {
				var rgba1 = color;
				var argb3 = 0;
				argb3 = (rgba1 & 255 & 255) << 24 | (rgba1 >> 24 & 255 & 255) << 16 | (rgba1 >> 16 & 255 & 255) << 8 | rgba1 >> 8 & 255 & 255;
				argb = argb3;
			}
			this.buffer.__srcBitmapData.floodFill(x + this.offsetX,y + this.offsetY,argb);
			break;
		default:
		}
	}
	,getColorBoundsRect: function(mask,color,findColor,format) {
		if(findColor == null) findColor = true;
		if(this.buffer == null) return null;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime_graphics_utils_ImageCanvasUtil.convertToData(this);
			return lime_graphics_utils_ImageDataUtil.getColorBoundsRect(this,mask,color,findColor,format);
		case 1:
			return lime_graphics_utils_ImageDataUtil.getColorBoundsRect(this,mask,color,findColor,format);
		case 2:
			var rect = this.buffer.__srcBitmapData.getColorBoundsRect(mask,color,findColor);
			return new lime_math_Rectangle(rect.x,rect.y,rect.width,rect.height);
		default:
			return null;
		}
	}
	,getPixel: function(x,y,format) {
		if(this.buffer == null || x < 0 || y < 0 || x >= this.width || y >= this.height) return 0;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			return lime_graphics_utils_ImageCanvasUtil.getPixel(this,x,y,format);
		case 1:
			lime_graphics_utils_ImageCanvasUtil.convertToData(this);
			return lime_graphics_utils_ImageDataUtil.getPixel(this,x,y,format);
		case 2:
			var color = this.buffer.__srcBitmapData.getPixel(x + this.offsetX,y + this.offsetY);
			if(format != null) switch(format) {
			case 1:
				return color;
			case 2:
				var bgra;
				{
					var bgra1 = 0;
					bgra1 = (color & 255 & 255) << 24 | (color >> 8 & 255 & 255) << 16 | (color >> 16 & 255 & 255) << 8 | color >> 24 & 255 & 255;
					bgra = bgra1;
				}
				return bgra;
			default:
				var rgba;
				{
					var rgba1 = 0;
					rgba1 = (color >> 16 & 255 & 255) << 24 | (color >> 8 & 255 & 255) << 16 | (color & 255 & 255) << 8 | color >> 24 & 255 & 255;
					rgba = rgba1;
				}
				return rgba;
			} else {
				var rgba2;
				{
					var rgba3 = 0;
					rgba3 = (color >> 16 & 255 & 255) << 24 | (color >> 8 & 255 & 255) << 16 | (color & 255 & 255) << 8 | color >> 24 & 255 & 255;
					rgba2 = rgba3;
				}
				return rgba2;
			}
			break;
		default:
			return 0;
		}
	}
	,getPixel32: function(x,y,format) {
		if(this.buffer == null || x < 0 || y < 0 || x >= this.width || y >= this.height) return 0;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			return lime_graphics_utils_ImageCanvasUtil.getPixel32(this,x,y,format);
		case 1:
			lime_graphics_utils_ImageCanvasUtil.convertToData(this);
			return lime_graphics_utils_ImageDataUtil.getPixel32(this,x,y,format);
		case 2:
			var color = this.buffer.__srcBitmapData.getPixel32(x + this.offsetX,y + this.offsetY);
			if(format != null) switch(format) {
			case 1:
				return color;
			case 2:
				var bgra;
				{
					var bgra1 = 0;
					bgra1 = (color & 255 & 255) << 24 | (color >> 8 & 255 & 255) << 16 | (color >> 16 & 255 & 255) << 8 | color >> 24 & 255 & 255;
					bgra = bgra1;
				}
				return bgra;
			default:
				var rgba;
				{
					var rgba1 = 0;
					rgba1 = (color >> 16 & 255 & 255) << 24 | (color >> 8 & 255 & 255) << 16 | (color & 255 & 255) << 8 | color >> 24 & 255 & 255;
					rgba = rgba1;
				}
				return rgba;
			} else {
				var rgba2;
				{
					var rgba3 = 0;
					rgba3 = (color >> 16 & 255 & 255) << 24 | (color >> 8 & 255 & 255) << 16 | (color & 255 & 255) << 8 | color >> 24 & 255 & 255;
					rgba2 = rgba3;
				}
				return rgba2;
			}
			break;
		default:
			return 0;
		}
	}
	,getPixels: function(rect,format) {
		if(this.buffer == null) return null;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			return lime_graphics_utils_ImageCanvasUtil.getPixels(this,rect,format);
		case 1:
			lime_graphics_utils_ImageCanvasUtil.convertToData(this);
			return lime_graphics_utils_ImageDataUtil.getPixels(this,rect,format);
		case 2:
			return null;
		default:
			return null;
		}
	}
	,merge: function(sourceImage,sourceRect,destPoint,redMultiplier,greenMultiplier,blueMultiplier,alphaMultiplier) {
		if(this.buffer == null || sourceImage == null) return;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime_graphics_utils_ImageCanvasUtil.convertToCanvas(this);
			lime_graphics_utils_ImageCanvasUtil.merge(this,sourceImage,sourceRect,destPoint,redMultiplier,greenMultiplier,blueMultiplier,alphaMultiplier);
			break;
		case 1:
			lime_graphics_utils_ImageCanvasUtil.convertToData(this);
			lime_graphics_utils_ImageCanvasUtil.convertToData(sourceImage);
			lime_graphics_utils_ImageDataUtil.merge(this,sourceImage,sourceRect,destPoint,redMultiplier,greenMultiplier,blueMultiplier,alphaMultiplier);
			break;
		case 2:
			sourceRect.offset(this.offsetX,this.offsetY);
			this.buffer.__srcBitmapData.merge(sourceImage.buffer.__srcBitmapData,sourceRect.__toFlashRectangle(),destPoint.__toFlashPoint(),redMultiplier,greenMultiplier,blueMultiplier,alphaMultiplier);
			break;
		default:
			return null;
		}
	}
	,resize: function(newWidth,newHeight) {
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime_graphics_utils_ImageCanvasUtil.resize(this,newWidth,newHeight);
			break;
		case 1:
			lime_graphics_utils_ImageDataUtil.resize(this,newWidth,newHeight);
			break;
		case 2:
			break;
		default:
		}
		this.buffer.width = newWidth;
		this.buffer.height = newHeight;
		this.offsetX = 0;
		this.offsetY = 0;
		this.width = newWidth;
		this.height = newHeight;
	}
	,scroll: function(x,y) {
		if(this.buffer == null) return;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime_graphics_utils_ImageCanvasUtil.scroll(this,x,y);
			break;
		case 1:
			this.copyPixels(this,this.get_rect(),new lime_math_Vector2(x,y));
			break;
		case 2:
			this.buffer.__srcBitmapData.scroll(x + this.offsetX,y + this.offsetX);
			break;
		default:
		}
	}
	,setPixel: function(x,y,color,format) {
		if(this.buffer == null || x < 0 || y < 0 || x >= this.width || y >= this.height) return;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime_graphics_utils_ImageCanvasUtil.setPixel(this,x,y,color,format);
			break;
		case 1:
			lime_graphics_utils_ImageCanvasUtil.convertToData(this);
			lime_graphics_utils_ImageDataUtil.setPixel(this,x,y,color,format);
			break;
		case 2:
			var argb;
			if(format != null) switch(format) {
			case 1:
				argb = color;
				break;
			case 2:
				{
					var bgra = color;
					var argb1 = 0;
					argb1 = (bgra & 255 & 255) << 24 | (bgra >> 8 & 255 & 255) << 16 | (bgra >> 16 & 255 & 255) << 8 | bgra >> 24 & 255 & 255;
					argb = argb1;
				}
				break;
			default:
				{
					var rgba = color;
					var argb2 = 0;
					argb2 = (rgba & 255 & 255) << 24 | (rgba >> 24 & 255 & 255) << 16 | (rgba >> 16 & 255 & 255) << 8 | rgba >> 8 & 255 & 255;
					argb = argb2;
				}
			} else {
				var rgba1 = color;
				var argb3 = 0;
				argb3 = (rgba1 & 255 & 255) << 24 | (rgba1 >> 24 & 255 & 255) << 16 | (rgba1 >> 16 & 255 & 255) << 8 | rgba1 >> 8 & 255 & 255;
				argb = argb3;
			}
			this.buffer.__srcBitmapData.setPixel(x + this.offsetX,y + this.offsetX,argb);
			break;
		default:
		}
	}
	,setPixel32: function(x,y,color,format) {
		if(this.buffer == null || x < 0 || y < 0 || x >= this.width || y >= this.height) return;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime_graphics_utils_ImageCanvasUtil.setPixel32(this,x,y,color,format);
			break;
		case 1:
			lime_graphics_utils_ImageCanvasUtil.convertToData(this);
			lime_graphics_utils_ImageDataUtil.setPixel32(this,x,y,color,format);
			break;
		case 2:
			var argb;
			if(format != null) switch(format) {
			case 1:
				argb = color;
				break;
			case 2:
				{
					var bgra = color;
					var argb1 = 0;
					argb1 = (bgra & 255 & 255) << 24 | (bgra >> 8 & 255 & 255) << 16 | (bgra >> 16 & 255 & 255) << 8 | bgra >> 24 & 255 & 255;
					argb = argb1;
				}
				break;
			default:
				{
					var rgba = color;
					var argb2 = 0;
					argb2 = (rgba & 255 & 255) << 24 | (rgba >> 24 & 255 & 255) << 16 | (rgba >> 16 & 255 & 255) << 8 | rgba >> 8 & 255 & 255;
					argb = argb2;
				}
			} else {
				var rgba1 = color;
				var argb3 = 0;
				argb3 = (rgba1 & 255 & 255) << 24 | (rgba1 >> 24 & 255 & 255) << 16 | (rgba1 >> 16 & 255 & 255) << 8 | rgba1 >> 8 & 255 & 255;
				argb = argb3;
			}
			this.buffer.__srcBitmapData.setPixel32(x + this.offsetX,y + this.offsetY,argb);
			break;
		default:
		}
	}
	,setPixels: function(rect,bytes,format) {
		rect = this.__clipRect(rect);
		if(this.buffer == null || rect == null) return;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime_graphics_utils_ImageCanvasUtil.setPixels(this,rect,bytes,format);
			break;
		case 1:
			lime_graphics_utils_ImageCanvasUtil.convertToData(this);
			lime_graphics_utils_ImageDataUtil.setPixels(this,rect,bytes,format);
			break;
		case 2:
			break;
		default:
		}
	}
	,threshold: function(sourceImage,sourceRect,destPoint,operation,threshold,color,mask,copySource,format) {
		if(copySource == null) copySource = false;
		if(mask == null) mask = -1;
		if(color == null) color = 0;
		if(this.buffer == null || sourceImage == null || sourceRect == null) return 0;
		var _g = this.type;
		switch(_g[1]) {
		case 0:case 1:
			lime_graphics_utils_ImageCanvasUtil.convertToData(this);
			return lime_graphics_utils_ImageDataUtil.threshold(this,sourceImage,sourceRect,destPoint,operation,threshold,color,mask,copySource,format);
		case 2:
			var _color;
			if(format != null) switch(format) {
			case 1:
				_color = color;
				break;
			case 2:
				{
					var bgra = color;
					var argb = 0;
					argb = (bgra & 255 & 255) << 24 | (bgra >> 8 & 255 & 255) << 16 | (bgra >> 16 & 255 & 255) << 8 | bgra >> 24 & 255 & 255;
					_color = argb;
				}
				break;
			default:
				{
					var rgba = color;
					var argb1 = 0;
					argb1 = (rgba & 255 & 255) << 24 | (rgba >> 24 & 255 & 255) << 16 | (rgba >> 16 & 255 & 255) << 8 | rgba >> 8 & 255 & 255;
					_color = argb1;
				}
			} else {
				var rgba1 = color;
				var argb2 = 0;
				argb2 = (rgba1 & 255 & 255) << 24 | (rgba1 >> 24 & 255 & 255) << 16 | (rgba1 >> 16 & 255 & 255) << 8 | rgba1 >> 8 & 255 & 255;
				_color = argb2;
			}
			var _mask;
			if(format != null) switch(format) {
			case 1:
				_mask = mask;
				break;
			case 2:
				{
					var bgra1 = mask;
					var argb3 = 0;
					argb3 = (bgra1 & 255 & 255) << 24 | (bgra1 >> 8 & 255 & 255) << 16 | (bgra1 >> 16 & 255 & 255) << 8 | bgra1 >> 24 & 255 & 255;
					_mask = argb3;
				}
				break;
			default:
				{
					var rgba2 = mask;
					var argb4 = 0;
					argb4 = (rgba2 & 255 & 255) << 24 | (rgba2 >> 24 & 255 & 255) << 16 | (rgba2 >> 16 & 255 & 255) << 8 | rgba2 >> 8 & 255 & 255;
					_mask = argb4;
				}
			} else {
				var rgba3 = mask;
				var argb5 = 0;
				argb5 = (rgba3 & 255 & 255) << 24 | (rgba3 >> 24 & 255 & 255) << 16 | (rgba3 >> 16 & 255 & 255) << 8 | rgba3 >> 8 & 255 & 255;
				_mask = argb5;
			}
			sourceRect.offset(sourceImage.offsetX,sourceImage.offsetY);
			destPoint.offset(this.offsetX,this.offsetY);
			return this.buffer.__srcBitmapData.threshold(sourceImage.buffer.get_src(),sourceRect.__toFlashRectangle(),destPoint.__toFlashPoint(),operation,threshold,_color,_mask,copySource);
		default:
		}
		return 0;
	}
	,__clipRect: function(r) {
		if(r == null) return null;
		if(r.x < 0) {
			r.width -= -r.x;
			r.x = 0;
			if(r.x + r.width <= 0) return null;
		}
		if(r.y < 0) {
			r.height -= -r.y;
			r.y = 0;
			if(r.y + r.height <= 0) return null;
		}
		if(r.x + r.width >= this.width) {
			r.width -= r.x + r.width - this.width;
			if(r.width <= 0) return null;
		}
		if(r.y + r.height >= this.height) {
			r.height -= r.y + r.height - this.height;
			if(r.height <= 0) return null;
		}
		return r;
	}
	,__fromBase64: function(base64,type,onload) {
		var _g = this;
		var image = new Image();
		image.crossOrigin = "Anonymous";
		var image_onLoaded = function(event) {
			_g.buffer = new lime_graphics_ImageBuffer(null,image.width,image.height);
			_g.buffer.__srcImage = image;
			_g.offsetX = 0;
			_g.offsetY = 0;
			_g.width = _g.buffer.width;
			_g.height = _g.buffer.height;
			if(onload != null) onload(_g);
		};
		image.addEventListener("load",image_onLoaded,false);
		image.src = "data:" + type + ";base64," + base64;
	}
	,__fromBytes: function(bytes,onload) {
		var type = "";
		if(lime_graphics_Image.__isPNG(bytes)) type = "image/png"; else if(lime_graphics_Image.__isJPG(bytes)) type = "image/jpeg"; else if(lime_graphics_Image.__isGIF(bytes)) type = "image/gif"; else throw new js__$Boot_HaxeError("Image tried to read PNG/JPG Bytes, but found an invalid header.");
		this.__fromBase64(lime_graphics_Image.__base64Encode(bytes),type,onload);
	}
	,__fromFile: function(path,onload,onerror) {
		var _g = this;
		var image = new Image();
		image.crossOrigin = "Anonymous";
		image.onload = function(_) {
			_g.buffer = new lime_graphics_ImageBuffer(null,image.width,image.height);
			_g.buffer.__srcImage = image;
			_g.width = image.width;
			_g.height = image.height;
			if(onload != null) onload(_g);
		};
		image.onerror = function(_1) {
			if(onerror != null) onerror();
		};
		image.src = path;
		if(image.complete) {
		}
	}
	,__fromImageBuffer: function(buffer) {
		this.buffer = buffer;
		if(buffer != null) {
			if(this.width == -1) this.width = buffer.width;
			if(this.height == -1) this.height = buffer.height;
		}
	}
	,get_data: function() {
		if(this.buffer.data == null && this.buffer.width > 0 && this.buffer.height > 0) {
			lime_graphics_utils_ImageCanvasUtil.convertToCanvas(this);
			lime_graphics_utils_ImageCanvasUtil.sync(this,false);
			lime_graphics_utils_ImageCanvasUtil.createImageData(this);
		}
		return this.buffer.data;
	}
	,set_data: function(value) {
		return this.buffer.data = value;
	}
	,get_format: function() {
		return this.buffer.format;
	}
	,set_format: function(value) {
		if(this.buffer.format != value) {
			var _g = this.type;
			switch(_g[1]) {
			case 1:
				lime_graphics_utils_ImageDataUtil.setFormat(this,value);
				break;
			default:
			}
		}
		return this.buffer.format = value;
	}
	,get_powerOfTwo: function() {
		return this.buffer.width != 0 && (this.buffer.width & ~this.buffer.width + 1) == this.buffer.width && (this.buffer.height != 0 && (this.buffer.height & ~this.buffer.height + 1) == this.buffer.height);
	}
	,set_powerOfTwo: function(value) {
		if(value != this.get_powerOfTwo()) {
			var newWidth = 1;
			var newHeight = 1;
			while(newWidth < this.buffer.width) newWidth <<= 1;
			while(newHeight < this.buffer.height) newHeight <<= 1;
			var _g = this.type;
			switch(_g[1]) {
			case 0:
				break;
			case 1:
				lime_graphics_utils_ImageDataUtil.resizeBuffer(this,newWidth,newHeight);
				break;
			case 2:
				break;
			default:
			}
		}
		return value;
	}
	,get_premultiplied: function() {
		return this.buffer.premultiplied;
	}
	,set_premultiplied: function(value) {
		if(value && !this.buffer.premultiplied) {
			var _g = this.type;
			switch(_g[1]) {
			case 1:
				lime_graphics_utils_ImageCanvasUtil.convertToData(this);
				lime_graphics_utils_ImageDataUtil.multiplyAlpha(this);
				break;
			default:
			}
		} else if(!value && this.buffer.premultiplied) {
			var _g1 = this.type;
			switch(_g1[1]) {
			case 1:
				lime_graphics_utils_ImageCanvasUtil.convertToData(this);
				lime_graphics_utils_ImageDataUtil.unmultiplyAlpha(this);
				break;
			default:
			}
		}
		return value;
	}
	,get_rect: function() {
		return new lime_math_Rectangle(0,0,this.width,this.height);
	}
	,get_src: function() {
		if(this.buffer.__srcCanvas == null) lime_graphics_utils_ImageCanvasUtil.convertToCanvas(this);
		return this.buffer.get_src();
	}
	,set_src: function(value) {
		return this.buffer.set_src(value);
	}
	,get_transparent: function() {
		if(this.buffer == null) return false;
		return this.buffer.transparent;
	}
	,set_transparent: function(value) {
		if(this.buffer == null) return false;
		return this.buffer.transparent = value;
	}
	,__class__: lime_graphics_Image
};
var lime_graphics_ImageBuffer = function(data,width,height,bitsPerPixel,format) {
	if(bitsPerPixel == null) bitsPerPixel = 32;
	if(height == null) height = 0;
	if(width == null) width = 0;
	this.data = data;
	this.width = width;
	this.height = height;
	this.bitsPerPixel = bitsPerPixel;
	if(format == null) this.format = 0; else this.format = format;
	this.transparent = true;
};
$hxClasses["lime.graphics.ImageBuffer"] = lime_graphics_ImageBuffer;
lime_graphics_ImageBuffer.__name__ = ["lime","graphics","ImageBuffer"];
lime_graphics_ImageBuffer.prototype = {
	bitsPerPixel: null
	,data: null
	,format: null
	,height: null
	,premultiplied: null
	,transparent: null
	,width: null
	,__srcBitmapData: null
	,__srcCanvas: null
	,__srcContext: null
	,__srcCustom: null
	,__srcImage: null
	,__srcImageData: null
	,clone: function() {
		var buffer = new lime_graphics_ImageBuffer(this.data,this.width,this.height,this.bitsPerPixel);
		if(this.data != null) {
			var elements = this.data.byteLength;
			var this1;
			if(elements != null) this1 = new Uint8Array(elements); else this1 = null;
			buffer.data = this1;
			var copy;
			var view = this.data;
			var this2;
			if(view != null) this2 = new Uint8Array(view); else this2 = null;
			copy = this2;
			buffer.data.set(copy);
		} else if(this.__srcImageData != null) {
			buffer.__srcCanvas = window.document.createElement("canvas");
			buffer.__srcContext = buffer.__srcCanvas.getContext("2d");
			buffer.__srcCanvas.width = this.__srcImageData.width;
			buffer.__srcCanvas.height = this.__srcImageData.height;
			buffer.__srcImageData = buffer.__srcContext.createImageData(this.__srcImageData.width,this.__srcImageData.height);
			var copy1 = new Uint8ClampedArray(this.__srcImageData.data);
			buffer.__srcImageData.data.set(copy1);
		} else if(this.__srcCanvas != null) {
			buffer.__srcCanvas = window.document.createElement("canvas");
			buffer.__srcContext = buffer.__srcCanvas.getContext("2d");
			buffer.__srcCanvas.width = this.__srcCanvas.width;
			buffer.__srcCanvas.height = this.__srcCanvas.height;
			buffer.__srcContext.drawImage(this.__srcCanvas,0,0);
		} else buffer.__srcImage = this.__srcImage;
		buffer.bitsPerPixel = this.bitsPerPixel;
		buffer.format = this.format;
		buffer.premultiplied = this.premultiplied;
		buffer.transparent = this.transparent;
		return buffer;
	}
	,get_src: function() {
		if(this.__srcImage != null) return this.__srcImage;
		return this.__srcCanvas;
	}
	,set_src: function(value) {
		if(js_Boot.__instanceof(value,Image)) this.__srcImage = value; else if(js_Boot.__instanceof(value,HTMLCanvasElement)) {
			this.__srcCanvas = value;
			this.__srcContext = this.__srcCanvas.getContext("2d");
		}
		return value;
	}
	,get_stride: function() {
		return this.width * 4;
	}
	,__class__: lime_graphics_ImageBuffer
};
var lime_graphics_ImageChannel = $hxClasses["lime.graphics.ImageChannel"] = { __ename__ : ["lime","graphics","ImageChannel"], __constructs__ : ["RED","GREEN","BLUE","ALPHA"] };
lime_graphics_ImageChannel.RED = ["RED",0];
lime_graphics_ImageChannel.RED.toString = $estr;
lime_graphics_ImageChannel.RED.__enum__ = lime_graphics_ImageChannel;
lime_graphics_ImageChannel.GREEN = ["GREEN",1];
lime_graphics_ImageChannel.GREEN.toString = $estr;
lime_graphics_ImageChannel.GREEN.__enum__ = lime_graphics_ImageChannel;
lime_graphics_ImageChannel.BLUE = ["BLUE",2];
lime_graphics_ImageChannel.BLUE.toString = $estr;
lime_graphics_ImageChannel.BLUE.__enum__ = lime_graphics_ImageChannel;
lime_graphics_ImageChannel.ALPHA = ["ALPHA",3];
lime_graphics_ImageChannel.ALPHA.toString = $estr;
lime_graphics_ImageChannel.ALPHA.__enum__ = lime_graphics_ImageChannel;
var lime_graphics_ImageType = $hxClasses["lime.graphics.ImageType"] = { __ename__ : ["lime","graphics","ImageType"], __constructs__ : ["CANVAS","DATA","FLASH","CUSTOM"] };
lime_graphics_ImageType.CANVAS = ["CANVAS",0];
lime_graphics_ImageType.CANVAS.toString = $estr;
lime_graphics_ImageType.CANVAS.__enum__ = lime_graphics_ImageType;
lime_graphics_ImageType.DATA = ["DATA",1];
lime_graphics_ImageType.DATA.toString = $estr;
lime_graphics_ImageType.DATA.__enum__ = lime_graphics_ImageType;
lime_graphics_ImageType.FLASH = ["FLASH",2];
lime_graphics_ImageType.FLASH.toString = $estr;
lime_graphics_ImageType.FLASH.__enum__ = lime_graphics_ImageType;
lime_graphics_ImageType.CUSTOM = ["CUSTOM",3];
lime_graphics_ImageType.CUSTOM.toString = $estr;
lime_graphics_ImageType.CUSTOM.__enum__ = lime_graphics_ImageType;
var lime_graphics_RenderContext = $hxClasses["lime.graphics.RenderContext"] = { __ename__ : ["lime","graphics","RenderContext"], __constructs__ : ["OPENGL","CANVAS","DOM","FLASH","CAIRO","CONSOLE","CUSTOM","NONE"] };
lime_graphics_RenderContext.OPENGL = function(gl) { var $x = ["OPENGL",0,gl]; $x.__enum__ = lime_graphics_RenderContext; $x.toString = $estr; return $x; };
lime_graphics_RenderContext.CANVAS = function(context) { var $x = ["CANVAS",1,context]; $x.__enum__ = lime_graphics_RenderContext; $x.toString = $estr; return $x; };
lime_graphics_RenderContext.DOM = function(element) { var $x = ["DOM",2,element]; $x.__enum__ = lime_graphics_RenderContext; $x.toString = $estr; return $x; };
lime_graphics_RenderContext.FLASH = function(stage) { var $x = ["FLASH",3,stage]; $x.__enum__ = lime_graphics_RenderContext; $x.toString = $estr; return $x; };
lime_graphics_RenderContext.CAIRO = function(cairo) { var $x = ["CAIRO",4,cairo]; $x.__enum__ = lime_graphics_RenderContext; $x.toString = $estr; return $x; };
lime_graphics_RenderContext.CONSOLE = function(context) { var $x = ["CONSOLE",5,context]; $x.__enum__ = lime_graphics_RenderContext; $x.toString = $estr; return $x; };
lime_graphics_RenderContext.CUSTOM = function(data) { var $x = ["CUSTOM",6,data]; $x.__enum__ = lime_graphics_RenderContext; $x.toString = $estr; return $x; };
lime_graphics_RenderContext.NONE = ["NONE",7];
lime_graphics_RenderContext.NONE.toString = $estr;
lime_graphics_RenderContext.NONE.__enum__ = lime_graphics_RenderContext;
var lime_graphics_Renderer = function(window) {
	this.onRender = new lime_app_Event_$Void_$Void();
	this.onContextRestored = new lime_app_Event_$lime_$graphics_$RenderContext_$Void();
	this.onContextLost = new lime_app_Event_$Void_$Void();
	this.window = window;
	this.backend = new lime__$backend_html5_HTML5Renderer(this);
	this.window.renderer = this;
};
$hxClasses["lime.graphics.Renderer"] = lime_graphics_Renderer;
lime_graphics_Renderer.__name__ = ["lime","graphics","Renderer"];
lime_graphics_Renderer.prototype = {
	context: null
	,onContextLost: null
	,onContextRestored: null
	,onRender: null
	,type: null
	,window: null
	,backend: null
	,create: function() {
		this.backend.create();
	}
	,flip: function() {
		this.backend.flip();
	}
	,readPixels: function(rect) {
		return this.backend.readPixels(rect);
	}
	,render: function() {
		this.backend.render();
	}
	,__class__: lime_graphics_Renderer
};
var lime_graphics_RendererType = $hxClasses["lime.graphics.RendererType"] = { __ename__ : ["lime","graphics","RendererType"], __constructs__ : ["OPENGL","CANVAS","DOM","FLASH","CAIRO","CONSOLE","CUSTOM"] };
lime_graphics_RendererType.OPENGL = ["OPENGL",0];
lime_graphics_RendererType.OPENGL.toString = $estr;
lime_graphics_RendererType.OPENGL.__enum__ = lime_graphics_RendererType;
lime_graphics_RendererType.CANVAS = ["CANVAS",1];
lime_graphics_RendererType.CANVAS.toString = $estr;
lime_graphics_RendererType.CANVAS.__enum__ = lime_graphics_RendererType;
lime_graphics_RendererType.DOM = ["DOM",2];
lime_graphics_RendererType.DOM.toString = $estr;
lime_graphics_RendererType.DOM.__enum__ = lime_graphics_RendererType;
lime_graphics_RendererType.FLASH = ["FLASH",3];
lime_graphics_RendererType.FLASH.toString = $estr;
lime_graphics_RendererType.FLASH.__enum__ = lime_graphics_RendererType;
lime_graphics_RendererType.CAIRO = ["CAIRO",4];
lime_graphics_RendererType.CAIRO.toString = $estr;
lime_graphics_RendererType.CAIRO.__enum__ = lime_graphics_RendererType;
lime_graphics_RendererType.CONSOLE = ["CONSOLE",5];
lime_graphics_RendererType.CONSOLE.toString = $estr;
lime_graphics_RendererType.CONSOLE.__enum__ = lime_graphics_RendererType;
lime_graphics_RendererType.CUSTOM = ["CUSTOM",6];
lime_graphics_RendererType.CUSTOM.toString = $estr;
lime_graphics_RendererType.CUSTOM.__enum__ = lime_graphics_RendererType;
var lime_graphics_cairo_Cairo = function(surface) {
	if(surface != null) {
	}
};
$hxClasses["lime.graphics.cairo.Cairo"] = lime_graphics_cairo_Cairo;
lime_graphics_cairo_Cairo.__name__ = ["lime","graphics","cairo","Cairo"];
lime_graphics_cairo_Cairo.get_version = function() {
	return 0;
};
lime_graphics_cairo_Cairo.get_versionString = function() {
	return "";
};
lime_graphics_cairo_Cairo.prototype = {
	target: null
	,userData: null
	,handle: null
	,arc: function(xc,yc,radius,angle1,angle2) {
	}
	,arcNegative: function(xc,yc,radius,angle1,angle2) {
	}
	,clip: function() {
	}
	,clipExtents: function(x1,y1,x2,y2) {
	}
	,clipPreserve: function() {
	}
	,closePath: function() {
	}
	,copyPage: function() {
	}
	,curveTo: function(x1,y1,x2,y2,x3,y3) {
	}
	,fill: function() {
	}
	,fillExtents: function(x1,y1,x2,y2) {
	}
	,fillPreserve: function() {
	}
	,identityMatrix: function() {
	}
	,inClip: function(x,y) {
		return false;
	}
	,inFill: function(x,y) {
		return false;
	}
	,inStroke: function(x,y) {
		return false;
	}
	,lineTo: function(x,y) {
	}
	,moveTo: function(x,y) {
	}
	,mask: function(pattern) {
	}
	,maskSurface: function(surface,x,y) {
	}
	,newPath: function() {
	}
	,paint: function() {
	}
	,paintWithAlpha: function(alpha) {
	}
	,popGroup: function() {
		return null;
	}
	,popGroupToSource: function() {
	}
	,pushGroup: function() {
	}
	,pushGroupWithContent: function(content) {
	}
	,recreate: function(surface) {
	}
	,rectangle: function(x,y,width,height) {
	}
	,relCurveTo: function(dx1,dy1,dx2,dy2,dx3,dy3) {
	}
	,relLineTo: function(dx,dy) {
	}
	,relMoveTo: function(dx,dy) {
	}
	,resetClip: function() {
	}
	,restore: function() {
	}
	,save: function() {
	}
	,setFontSize: function(size) {
	}
	,setSourceRGB: function(r,g,b) {
	}
	,setSourceRGBA: function(r,g,b,a) {
	}
	,setSourceSurface: function(surface,x,y) {
	}
	,showPage: function() {
	}
	,showText: function(utf8) {
	}
	,status: function() {
		return 0;
	}
	,stroke: function() {
	}
	,strokeExtents: function(x1,y1,x2,y2) {
	}
	,strokePreserve: function() {
	}
	,transform: function(matrix) {
	}
	,rotate: function(amount) {
	}
	,scale: function(x,y) {
	}
	,translate: function(x,y) {
	}
	,get_antialias: function() {
		return 0;
	}
	,set_antialias: function(value) {
		return value;
	}
	,get_currentPoint: function() {
		return null;
	}
	,get_dash: function() {
		return [];
	}
	,set_dash: function(value) {
		return value;
	}
	,get_dashCount: function() {
		return 0;
	}
	,get_fillRule: function() {
		return 0;
	}
	,set_fillRule: function(value) {
		return value;
	}
	,get_fontFace: function() {
		return 0;
	}
	,set_fontFace: function(value) {
		return value;
	}
	,get_fontOptions: function() {
		return null;
	}
	,set_fontOptions: function(value) {
		return value;
	}
	,get_groupTarget: function() {
		return 0;
	}
	,get_hasCurrentPoint: function() {
		return false;
	}
	,get_lineCap: function() {
		return 0;
	}
	,set_lineCap: function(value) {
		return value;
	}
	,get_lineJoin: function() {
		return 0;
	}
	,set_lineJoin: function(value) {
		return value;
	}
	,get_lineWidth: function() {
		return 0;
	}
	,set_lineWidth: function(value) {
		return value;
	}
	,get_matrix: function() {
		return null;
	}
	,set_matrix: function(value) {
		return value;
	}
	,get_miterLimit: function() {
		return 0;
	}
	,set_miterLimit: function(value) {
		return value;
	}
	,get_operator: function() {
		return 0;
	}
	,set_operator: function(value) {
		return value;
	}
	,get_source: function() {
		return 0;
	}
	,set_source: function(value) {
		return value;
	}
	,get_target: function() {
		return 0;
	}
	,get_tolerance: function() {
		return 0;
	}
	,set_tolerance: function(value) {
		return value;
	}
	,__class__: lime_graphics_cairo_Cairo
};
var lime_graphics_cairo__$CairoFontFace_CairoFontFace_$Impl_$ = {};
$hxClasses["lime.graphics.cairo._CairoFontFace.CairoFontFace_Impl_"] = lime_graphics_cairo__$CairoFontFace_CairoFontFace_$Impl_$;
lime_graphics_cairo__$CairoFontFace_CairoFontFace_$Impl_$.__name__ = ["lime","graphics","cairo","_CairoFontFace","CairoFontFace_Impl_"];
lime_graphics_cairo__$CairoFontFace_CairoFontFace_$Impl_$._new = function() {
	return null;
};
lime_graphics_cairo__$CairoFontFace_CairoFontFace_$Impl_$.status = function(this1) {
	return 0;
};
var lime_graphics_cairo__$CairoFontOptions_CairoFontOptions_$Impl_$ = {};
$hxClasses["lime.graphics.cairo._CairoFontOptions.CairoFontOptions_Impl_"] = lime_graphics_cairo__$CairoFontOptions_CairoFontOptions_$Impl_$;
lime_graphics_cairo__$CairoFontOptions_CairoFontOptions_$Impl_$.__name__ = ["lime","graphics","cairo","_CairoFontOptions","CairoFontOptions_Impl_"];
lime_graphics_cairo__$CairoFontOptions_CairoFontOptions_$Impl_$._new = function() {
	return null;
};
lime_graphics_cairo__$CairoFontOptions_CairoFontOptions_$Impl_$.get_antialias = function(this1) {
	return 0;
};
lime_graphics_cairo__$CairoFontOptions_CairoFontOptions_$Impl_$.set_antialias = function(this1,value) {
	return value;
};
lime_graphics_cairo__$CairoFontOptions_CairoFontOptions_$Impl_$.get_hintMetrics = function(this1) {
	return 0;
};
lime_graphics_cairo__$CairoFontOptions_CairoFontOptions_$Impl_$.set_hintMetrics = function(this1,value) {
	return value;
};
lime_graphics_cairo__$CairoFontOptions_CairoFontOptions_$Impl_$.get_hintStyle = function(this1) {
	return 0;
};
lime_graphics_cairo__$CairoFontOptions_CairoFontOptions_$Impl_$.set_hintStyle = function(this1,value) {
	return value;
};
lime_graphics_cairo__$CairoFontOptions_CairoFontOptions_$Impl_$.get_subpixelOrder = function(this1) {
	return 0;
};
lime_graphics_cairo__$CairoFontOptions_CairoFontOptions_$Impl_$.set_subpixelOrder = function(this1,value) {
	return value;
};
var lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$ = {};
$hxClasses["lime.graphics.cairo._CairoPattern.CairoPattern_Impl_"] = lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$;
lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.__name__ = ["lime","graphics","cairo","_CairoPattern","CairoPattern_Impl_"];
lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$._new = function(handle) {
	return handle;
};
lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.addColorStopRGB = function(this1,offset,r,g,b) {
};
lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.addColorStopRGBA = function(this1,offset,r,g,b,a) {
};
lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.createForSurface = function(surface) {
	return 0;
};
lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.createLinear = function(x0,y0,x1,y1) {
	return 0;
};
lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.createRadial = function(cx0,cy0,radius0,cx1,cy1,radius1) {
	return 0;
};
lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.createRGB = function(r,g,b) {
	return 0;
};
lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.createRGBA = function(r,g,b,a) {
	return 0;
};
lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.get_colorStopCount = function(this1) {
	return 0;
};
lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.get_extend = function(this1) {
	return 0;
};
lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.set_extend = function(this1,value) {
	return value;
};
lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.get_filter = function(this1) {
	return 0;
};
lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.set_filter = function(this1,value) {
	return value;
};
lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.get_matrix = function(this1) {
	return null;
};
lime_graphics_cairo__$CairoPattern_CairoPattern_$Impl_$.set_matrix = function(this1,value) {
	return value;
};
var lime_graphics_cairo__$CairoSurface_CairoSurface_$Impl_$ = {};
$hxClasses["lime.graphics.cairo._CairoSurface.CairoSurface_Impl_"] = lime_graphics_cairo__$CairoSurface_CairoSurface_$Impl_$;
lime_graphics_cairo__$CairoSurface_CairoSurface_$Impl_$.__name__ = ["lime","graphics","cairo","_CairoSurface","CairoSurface_Impl_"];
lime_graphics_cairo__$CairoSurface_CairoSurface_$Impl_$.flush = function(this1) {
};
var lime_graphics_console_IndexBuffer = function() {
};
$hxClasses["lime.graphics.console.IndexBuffer"] = lime_graphics_console_IndexBuffer;
lime_graphics_console_IndexBuffer.__name__ = ["lime","graphics","console","IndexBuffer"];
lime_graphics_console_IndexBuffer.prototype = {
	__class__: lime_graphics_console_IndexBuffer
};
var lime_graphics_console_Primitive = $hxClasses["lime.graphics.console.Primitive"] = { __ename__ : ["lime","graphics","console","Primitive"], __constructs__ : ["Point","Line","LineStrip","Triangle","TriangleStrip"] };
lime_graphics_console_Primitive.Point = ["Point",0];
lime_graphics_console_Primitive.Point.toString = $estr;
lime_graphics_console_Primitive.Point.__enum__ = lime_graphics_console_Primitive;
lime_graphics_console_Primitive.Line = ["Line",1];
lime_graphics_console_Primitive.Line.toString = $estr;
lime_graphics_console_Primitive.Line.__enum__ = lime_graphics_console_Primitive;
lime_graphics_console_Primitive.LineStrip = ["LineStrip",2];
lime_graphics_console_Primitive.LineStrip.toString = $estr;
lime_graphics_console_Primitive.LineStrip.__enum__ = lime_graphics_console_Primitive;
lime_graphics_console_Primitive.Triangle = ["Triangle",3];
lime_graphics_console_Primitive.Triangle.toString = $estr;
lime_graphics_console_Primitive.Triangle.__enum__ = lime_graphics_console_Primitive;
lime_graphics_console_Primitive.TriangleStrip = ["TriangleStrip",4];
lime_graphics_console_Primitive.TriangleStrip.toString = $estr;
lime_graphics_console_Primitive.TriangleStrip.__enum__ = lime_graphics_console_Primitive;
var lime_graphics_console_Shader = function() {
};
$hxClasses["lime.graphics.console.Shader"] = lime_graphics_console_Shader;
lime_graphics_console_Shader.__name__ = ["lime","graphics","console","Shader"];
lime_graphics_console_Shader.prototype = {
	__class__: lime_graphics_console_Shader
};
var lime_graphics_console_VertexBuffer = function() {
};
$hxClasses["lime.graphics.console.VertexBuffer"] = lime_graphics_console_VertexBuffer;
lime_graphics_console_VertexBuffer.__name__ = ["lime","graphics","console","VertexBuffer"];
lime_graphics_console_VertexBuffer.prototype = {
	lock: function() {
		return new lime_graphics_console_VertexOutput();
	}
	,unlock: function() {
	}
	,__class__: lime_graphics_console_VertexBuffer
};
var lime_graphics_console_VertexOutput = function() {
};
$hxClasses["lime.graphics.console.VertexOutput"] = lime_graphics_console_VertexOutput;
lime_graphics_console_VertexOutput.__name__ = ["lime","graphics","console","VertexOutput"];
lime_graphics_console_VertexOutput.prototype = {
	vec2: function(x,y) {
	}
	,vec3: function(x,y,z) {
	}
	,color: function(r,g,b,a) {
	}
	,__class__: lime_graphics_console_VertexOutput
};
var lime_graphics_format_BMP = function() { };
$hxClasses["lime.graphics.format.BMP"] = lime_graphics_format_BMP;
lime_graphics_format_BMP.__name__ = ["lime","graphics","format","BMP"];
lime_graphics_format_BMP.encode = function(image,type) {
	if(image.get_premultiplied() || image.get_format() != 0) {
		image = image.clone();
		image.set_premultiplied(false);
		image.set_format(0);
	}
	if(type == null) type = lime_graphics_format_BMPType.RGB;
	var fileHeaderLength = 14;
	var infoHeaderLength = 40;
	var pixelValuesLength = image.width * image.height * 4;
	if(type != null) switch(type[1]) {
	case 1:
		infoHeaderLength = 108;
		break;
	case 2:
		fileHeaderLength = 0;
		pixelValuesLength += image.width * image.height;
		break;
	case 0:
		pixelValuesLength = image.width * 3 + image.width * 3 % 4 + image.height * 3 + image.height * 3;
		break;
	default:
	} else {
	}
	var data = haxe_io_Bytes.alloc(fileHeaderLength + infoHeaderLength + pixelValuesLength);
	var position = 0;
	if(fileHeaderLength > 0) {
		data.set(position++,66);
		data.set(position++,77);
		data.setInt32(position,data.length);
		position += 4;
		data.setUInt16(position,0);
		position += 2;
		data.setUInt16(position,0);
		position += 2;
		data.setInt32(position,fileHeaderLength + infoHeaderLength);
		position += 4;
	}
	data.setInt32(position,infoHeaderLength);
	position += 4;
	data.setInt32(position,image.width);
	position += 4;
	data.setInt32(position,type == lime_graphics_format_BMPType.ICO?image.height * 2:image.height);
	position += 4;
	data.setUInt16(position,1);
	position += 2;
	data.setUInt16(position,type == lime_graphics_format_BMPType.RGB?24:32);
	position += 2;
	data.setInt32(position,type == lime_graphics_format_BMPType.BITFIELD?3:0);
	position += 4;
	data.setInt32(position,pixelValuesLength);
	position += 4;
	data.setInt32(position,11824);
	position += 4;
	data.setInt32(position,11824);
	position += 4;
	data.setInt32(position,0);
	position += 4;
	data.setInt32(position,0);
	position += 4;
	if(type == lime_graphics_format_BMPType.BITFIELD) {
		data.setInt32(position,16711680);
		position += 4;
		data.setInt32(position,65280);
		position += 4;
		data.setInt32(position,255);
		position += 4;
		data.setInt32(position,-16777216);
		position += 4;
		data.set(position++,32);
		data.set(position++,110);
		data.set(position++,105);
		data.set(position++,87);
		var _g = 0;
		while(_g < 48) {
			var i = _g++;
			data.set(position++,0);
		}
	}
	var pixels = image.getPixels(new lime_math_Rectangle(0,0,image.width,image.height),1);
	var readPosition = 0;
	var a;
	var r;
	var g;
	var b;
	if(type != null) switch(type[1]) {
	case 1:
		var _g1 = 0;
		var _g2 = image.height;
		while(_g1 < _g2) {
			var y = _g1++;
			readPosition = (image.height - 1 - y) * 4 * image.width;
			var _g3 = 0;
			var _g21 = image.width;
			while(_g3 < _g21) {
				var x = _g3++;
				a = pixels.get(readPosition++);
				r = pixels.get(readPosition++);
				g = pixels.get(readPosition++);
				b = pixels.get(readPosition++);
				data.set(position++,b);
				data.set(position++,g);
				data.set(position++,r);
				data.set(position++,a);
			}
		}
		break;
	case 2:
		var andMask = haxe_io_Bytes.alloc(image.width * image.height);
		var maskPosition = 0;
		var _g11 = 0;
		var _g4 = image.height;
		while(_g11 < _g4) {
			var y1 = _g11++;
			readPosition = (image.height - 1 - y1) * 4 * image.width;
			var _g31 = 0;
			var _g22 = image.width;
			while(_g31 < _g22) {
				var x1 = _g31++;
				a = pixels.get(readPosition++);
				r = pixels.get(readPosition++);
				g = pixels.get(readPosition++);
				b = pixels.get(readPosition++);
				data.set(position++,b);
				data.set(position++,g);
				data.set(position++,r);
				data.set(position++,a);
				andMask.set(maskPosition++,0);
			}
		}
		data.blit(position,andMask,0,image.width * image.height);
		break;
	case 0:
		var _g12 = 0;
		var _g5 = image.height;
		while(_g12 < _g5) {
			var y2 = _g12++;
			readPosition = (image.height - 1 - y2) * 4 * image.width;
			var _g32 = 0;
			var _g23 = image.width;
			while(_g32 < _g23) {
				var x2 = _g32++;
				a = pixels.get(readPosition++);
				r = pixels.get(readPosition++);
				g = pixels.get(readPosition++);
				b = pixels.get(readPosition++);
				data.set(position++,b);
				data.set(position++,g);
				data.set(position++,r);
			}
			var _g33 = 0;
			var _g24 = image.width * 3 % 4;
			while(_g33 < _g24) {
				var i1 = _g33++;
				data.set(position++,0);
			}
		}
		break;
	default:
	} else {
	}
	return data;
};
var lime_graphics_format_BMPType = $hxClasses["lime.graphics.format.BMPType"] = { __ename__ : ["lime","graphics","format","BMPType"], __constructs__ : ["RGB","BITFIELD","ICO"] };
lime_graphics_format_BMPType.RGB = ["RGB",0];
lime_graphics_format_BMPType.RGB.toString = $estr;
lime_graphics_format_BMPType.RGB.__enum__ = lime_graphics_format_BMPType;
lime_graphics_format_BMPType.BITFIELD = ["BITFIELD",1];
lime_graphics_format_BMPType.BITFIELD.toString = $estr;
lime_graphics_format_BMPType.BITFIELD.__enum__ = lime_graphics_format_BMPType;
lime_graphics_format_BMPType.ICO = ["ICO",2];
lime_graphics_format_BMPType.ICO.toString = $estr;
lime_graphics_format_BMPType.ICO.__enum__ = lime_graphics_format_BMPType;
var lime_graphics_format_JPEG = function() { };
$hxClasses["lime.graphics.format.JPEG"] = lime_graphics_format_JPEG;
lime_graphics_format_JPEG.__name__ = ["lime","graphics","format","JPEG"];
lime_graphics_format_JPEG.decodeBytes = function(bytes,decodeData) {
	if(decodeData == null) decodeData = true;
	return null;
};
lime_graphics_format_JPEG.decodeFile = function(path,decodeData) {
	if(decodeData == null) decodeData = true;
	return null;
};
lime_graphics_format_JPEG.encode = function(image,quality) {
	if(image.get_premultiplied() || image.get_format() != 0) {
		image = image.clone();
		image.set_premultiplied(false);
		image.set_format(0);
	}
	lime_graphics_utils_ImageCanvasUtil.sync(image,false);
	if(image.buffer.__srcCanvas != null) {
		var data = image.buffer.__srcCanvas.toDataURL("image/jpeg",quality / 100);
		var buffer = window.atob(data.split(";base64,")[1]);
		var bytes = haxe_io_Bytes.alloc(buffer.length);
		var _g1 = 0;
		var _g = buffer.length;
		while(_g1 < _g) {
			var i = _g1++;
			bytes.set(i,HxOverrides.cca(buffer,i));
		}
		return bytes;
	}
	return null;
};
var lime_graphics_format_PNG = function() { };
$hxClasses["lime.graphics.format.PNG"] = lime_graphics_format_PNG;
lime_graphics_format_PNG.__name__ = ["lime","graphics","format","PNG"];
lime_graphics_format_PNG.decodeBytes = function(bytes,decodeData) {
	if(decodeData == null) decodeData = true;
	return null;
};
lime_graphics_format_PNG.decodeFile = function(path,decodeData) {
	if(decodeData == null) decodeData = true;
	return null;
};
lime_graphics_format_PNG.encode = function(image) {
	if(image.get_premultiplied() || image.get_format() != 0) {
		image = image.clone();
		image.set_premultiplied(false);
		image.set_format(0);
	}
	return null;
};
var lime_graphics_opengl_GL = function() { };
$hxClasses["lime.graphics.opengl.GL"] = lime_graphics_opengl_GL;
lime_graphics_opengl_GL.__name__ = ["lime","graphics","opengl","GL"];
lime_graphics_opengl_GL.activeTexture = function(texture) {
	lime_graphics_opengl_GL.context.activeTexture(texture);
};
lime_graphics_opengl_GL.attachShader = function(program,shader) {
	lime_graphics_opengl_GL.context.attachShader(program,shader);
};
lime_graphics_opengl_GL.bindAttribLocation = function(program,index,name) {
	lime_graphics_opengl_GL.context.bindAttribLocation(program,index,name);
};
lime_graphics_opengl_GL.bindBuffer = function(target,buffer) {
	lime_graphics_opengl_GL.context.bindBuffer(target,buffer);
};
lime_graphics_opengl_GL.bindFramebuffer = function(target,framebuffer) {
	lime_graphics_opengl_GL.context.bindFramebuffer(target,framebuffer);
};
lime_graphics_opengl_GL.bindRenderbuffer = function(target,renderbuffer) {
	lime_graphics_opengl_GL.context.bindRenderbuffer(target,renderbuffer);
};
lime_graphics_opengl_GL.bindTexture = function(target,texture) {
	lime_graphics_opengl_GL.context.bindTexture(target,texture);
};
lime_graphics_opengl_GL.blendColor = function(red,green,blue,alpha) {
	lime_graphics_opengl_GL.context.blendColor(red,green,blue,alpha);
};
lime_graphics_opengl_GL.blendEquation = function(mode) {
	lime_graphics_opengl_GL.context.blendEquation(mode);
};
lime_graphics_opengl_GL.blendEquationSeparate = function(modeRGB,modeAlpha) {
	lime_graphics_opengl_GL.context.blendEquationSeparate(modeRGB,modeAlpha);
};
lime_graphics_opengl_GL.blendFunc = function(sfactor,dfactor) {
	lime_graphics_opengl_GL.context.blendFunc(sfactor,dfactor);
};
lime_graphics_opengl_GL.blendFuncSeparate = function(srcRGB,dstRGB,srcAlpha,dstAlpha) {
	lime_graphics_opengl_GL.context.blendFuncSeparate(srcRGB,dstRGB,srcAlpha,dstAlpha);
};
lime_graphics_opengl_GL.bufferData = function(target,data,usage) {
	lime_graphics_opengl_GL.context.bufferData(target,data,usage);
};
lime_graphics_opengl_GL.bufferSubData = function(target,offset,data) {
	lime_graphics_opengl_GL.context.bufferSubData(target,offset,data);
};
lime_graphics_opengl_GL.checkFramebufferStatus = function(target) {
	return lime_graphics_opengl_GL.context.checkFramebufferStatus(target);
};
lime_graphics_opengl_GL.clear = function(mask) {
	lime_graphics_opengl_GL.context.clear(mask);
};
lime_graphics_opengl_GL.clearColor = function(red,green,blue,alpha) {
	lime_graphics_opengl_GL.context.clearColor(red,green,blue,alpha);
};
lime_graphics_opengl_GL.clearDepth = function(depth) {
	lime_graphics_opengl_GL.context.clearDepth(depth);
};
lime_graphics_opengl_GL.clearStencil = function(s) {
	lime_graphics_opengl_GL.context.clearStencil(s);
};
lime_graphics_opengl_GL.colorMask = function(red,green,blue,alpha) {
	lime_graphics_opengl_GL.context.colorMask(red,green,blue,alpha);
};
lime_graphics_opengl_GL.compileShader = function(shader) {
	lime_graphics_opengl_GL.context.compileShader(shader);
};
lime_graphics_opengl_GL.compressedTexImage2D = function(target,level,internalformat,width,height,border,data) {
	lime_graphics_opengl_GL.context.compressedTexImage2D(target,level,internalformat,width,height,border,data);
};
lime_graphics_opengl_GL.compressedTexSubImage2D = function(target,level,xoffset,yoffset,width,height,format,data) {
	lime_graphics_opengl_GL.context.compressedTexSubImage2D(target,level,xoffset,yoffset,width,height,format,data);
};
lime_graphics_opengl_GL.copyTexImage2D = function(target,level,internalformat,x,y,width,height,border) {
	lime_graphics_opengl_GL.context.copyTexImage2D(target,level,internalformat,x,y,width,height,border);
};
lime_graphics_opengl_GL.copyTexSubImage2D = function(target,level,xoffset,yoffset,x,y,width,height) {
	lime_graphics_opengl_GL.context.copyTexSubImage2D(target,level,xoffset,yoffset,x,y,width,height);
};
lime_graphics_opengl_GL.createBuffer = function() {
	return lime_graphics_opengl_GL.context.createBuffer();
};
lime_graphics_opengl_GL.createFramebuffer = function() {
	return lime_graphics_opengl_GL.context.createFramebuffer();
};
lime_graphics_opengl_GL.createProgram = function() {
	return lime_graphics_opengl_GL.context.createProgram();
};
lime_graphics_opengl_GL.createRenderbuffer = function() {
	return lime_graphics_opengl_GL.context.createRenderbuffer();
};
lime_graphics_opengl_GL.createShader = function(type) {
	return lime_graphics_opengl_GL.context.createShader(type);
};
lime_graphics_opengl_GL.createTexture = function() {
	return lime_graphics_opengl_GL.context.createTexture();
};
lime_graphics_opengl_GL.cullFace = function(mode) {
	lime_graphics_opengl_GL.context.cullFace(mode);
};
lime_graphics_opengl_GL.deleteBuffer = function(buffer) {
	lime_graphics_opengl_GL.context.deleteBuffer(buffer);
};
lime_graphics_opengl_GL.deleteFramebuffer = function(framebuffer) {
	lime_graphics_opengl_GL.context.deleteFramebuffer(framebuffer);
};
lime_graphics_opengl_GL.deleteProgram = function(program) {
	lime_graphics_opengl_GL.context.deleteProgram(program);
};
lime_graphics_opengl_GL.deleteRenderbuffer = function(renderbuffer) {
	lime_graphics_opengl_GL.context.deleteRenderbuffer(renderbuffer);
};
lime_graphics_opengl_GL.deleteShader = function(shader) {
	lime_graphics_opengl_GL.context.deleteShader(shader);
};
lime_graphics_opengl_GL.deleteTexture = function(texture) {
	lime_graphics_opengl_GL.context.deleteTexture(texture);
};
lime_graphics_opengl_GL.depthFunc = function(func) {
	lime_graphics_opengl_GL.context.depthFunc(func);
};
lime_graphics_opengl_GL.depthMask = function(flag) {
	lime_graphics_opengl_GL.context.depthMask(flag);
};
lime_graphics_opengl_GL.depthRange = function(zNear,zFar) {
	lime_graphics_opengl_GL.context.depthRange(zNear,zFar);
};
lime_graphics_opengl_GL.detachShader = function(program,shader) {
	lime_graphics_opengl_GL.context.detachShader(program,shader);
};
lime_graphics_opengl_GL.disable = function(cap) {
	lime_graphics_opengl_GL.context.disable(cap);
};
lime_graphics_opengl_GL.disableVertexAttribArray = function(index) {
	lime_graphics_opengl_GL.context.disableVertexAttribArray(index);
};
lime_graphics_opengl_GL.drawArrays = function(mode,first,count) {
	lime_graphics_opengl_GL.context.drawArrays(mode,first,count);
};
lime_graphics_opengl_GL.drawElements = function(mode,count,type,offset) {
	lime_graphics_opengl_GL.context.drawElements(mode,count,type,offset);
};
lime_graphics_opengl_GL.enable = function(cap) {
	lime_graphics_opengl_GL.context.enable(cap);
};
lime_graphics_opengl_GL.enableVertexAttribArray = function(index) {
	lime_graphics_opengl_GL.context.enableVertexAttribArray(index);
};
lime_graphics_opengl_GL.finish = function() {
	lime_graphics_opengl_GL.context.finish();
};
lime_graphics_opengl_GL.flush = function() {
	lime_graphics_opengl_GL.context.flush();
};
lime_graphics_opengl_GL.framebufferRenderbuffer = function(target,attachment,renderbuffertarget,renderbuffer) {
	lime_graphics_opengl_GL.context.framebufferRenderbuffer(target,attachment,renderbuffertarget,renderbuffer);
};
lime_graphics_opengl_GL.framebufferTexture2D = function(target,attachment,textarget,texture,level) {
	lime_graphics_opengl_GL.context.framebufferTexture2D(target,attachment,textarget,texture,level);
};
lime_graphics_opengl_GL.frontFace = function(mode) {
	lime_graphics_opengl_GL.context.frontFace(mode);
};
lime_graphics_opengl_GL.generateMipmap = function(target) {
	lime_graphics_opengl_GL.context.generateMipmap(target);
};
lime_graphics_opengl_GL.getActiveAttrib = function(program,index) {
	return lime_graphics_opengl_GL.context.getActiveAttrib(program,index);
};
lime_graphics_opengl_GL.getActiveUniform = function(program,index) {
	return lime_graphics_opengl_GL.context.getActiveUniform(program,index);
};
lime_graphics_opengl_GL.getAttachedShaders = function(program) {
	return lime_graphics_opengl_GL.context.getAttachedShaders(program);
};
lime_graphics_opengl_GL.getAttribLocation = function(program,name) {
	return lime_graphics_opengl_GL.context.getAttribLocation(program,name);
};
lime_graphics_opengl_GL.getBufferParameter = function(target,pname) {
	return lime_graphics_opengl_GL.context.getBufferParameter(target,pname);
};
lime_graphics_opengl_GL.getContextAttributes = function() {
	return lime_graphics_opengl_GL.context.getContextAttributes();
};
lime_graphics_opengl_GL.getError = function() {
	return lime_graphics_opengl_GL.context.getError();
};
lime_graphics_opengl_GL.getExtension = function(name) {
	return lime_graphics_opengl_GL.context.getExtension(name);
};
lime_graphics_opengl_GL.getFramebufferAttachmentParameter = function(target,attachment,pname) {
	return lime_graphics_opengl_GL.context.getFramebufferAttachmentParameter(target,attachment,pname);
};
lime_graphics_opengl_GL.getParameter = function(pname) {
	return lime_graphics_opengl_GL.context.getParameter(pname);
};
lime_graphics_opengl_GL.getProgramInfoLog = function(program) {
	return lime_graphics_opengl_GL.context.getProgramInfoLog(program);
};
lime_graphics_opengl_GL.getProgramParameter = function(program,pname) {
	return lime_graphics_opengl_GL.context.getProgramParameter(program,pname);
};
lime_graphics_opengl_GL.getRenderbufferParameter = function(target,pname) {
	return lime_graphics_opengl_GL.context.getRenderbufferParameter(target,pname);
};
lime_graphics_opengl_GL.getShaderInfoLog = function(shader) {
	return lime_graphics_opengl_GL.context.getShaderInfoLog(shader);
};
lime_graphics_opengl_GL.getShaderParameter = function(shader,pname) {
	return lime_graphics_opengl_GL.context.getShaderParameter(shader,pname);
};
lime_graphics_opengl_GL.getShaderPrecisionFormat = function(shadertype,precisiontype) {
	return lime_graphics_opengl_GL.context.getShaderPrecisionFormat(shadertype,precisiontype);
};
lime_graphics_opengl_GL.getShaderSource = function(shader) {
	return lime_graphics_opengl_GL.context.getShaderSource(shader);
};
lime_graphics_opengl_GL.getSupportedExtensions = function() {
	return lime_graphics_opengl_GL.context.getSupportedExtensions();
};
lime_graphics_opengl_GL.getTexParameter = function(target,pname) {
	return lime_graphics_opengl_GL.context.getTexParameter(target,pname);
};
lime_graphics_opengl_GL.getUniform = function(program,location) {
	return lime_graphics_opengl_GL.context.getUniform(program,location);
};
lime_graphics_opengl_GL.getUniformLocation = function(program,name) {
	return lime_graphics_opengl_GL.context.getUniformLocation(program,name);
};
lime_graphics_opengl_GL.getVertexAttrib = function(index,pname) {
	return lime_graphics_opengl_GL.context.getVertexAttrib(index,pname);
};
lime_graphics_opengl_GL.getVertexAttribOffset = function(index,pname) {
	return lime_graphics_opengl_GL.context.getVertexAttribOffset(index,pname);
};
lime_graphics_opengl_GL.hint = function(target,mode) {
	lime_graphics_opengl_GL.context.hint(target,mode);
};
lime_graphics_opengl_GL.isBuffer = function(buffer) {
	return lime_graphics_opengl_GL.context.isBuffer(buffer);
};
lime_graphics_opengl_GL.isContextLost = function() {
	return lime_graphics_opengl_GL.context.isContextLost();
};
lime_graphics_opengl_GL.isEnabled = function(cap) {
	return lime_graphics_opengl_GL.context.isEnabled(cap);
};
lime_graphics_opengl_GL.isFramebuffer = function(framebuffer) {
	return lime_graphics_opengl_GL.context.isFramebuffer(framebuffer);
};
lime_graphics_opengl_GL.isProgram = function(program) {
	return lime_graphics_opengl_GL.context.isProgram(program);
};
lime_graphics_opengl_GL.isRenderbuffer = function(renderbuffer) {
	return lime_graphics_opengl_GL.context.isRenderbuffer(renderbuffer);
};
lime_graphics_opengl_GL.isShader = function(shader) {
	return lime_graphics_opengl_GL.context.isShader(shader);
};
lime_graphics_opengl_GL.isTexture = function(texture) {
	return lime_graphics_opengl_GL.context.isTexture(texture);
};
lime_graphics_opengl_GL.lineWidth = function(width) {
	lime_graphics_opengl_GL.context.lineWidth(width);
};
lime_graphics_opengl_GL.linkProgram = function(program) {
	lime_graphics_opengl_GL.context.linkProgram(program);
};
lime_graphics_opengl_GL.pixelStorei = function(pname,param) {
	lime_graphics_opengl_GL.context.pixelStorei(pname,param);
};
lime_graphics_opengl_GL.polygonOffset = function(factor,units) {
	lime_graphics_opengl_GL.context.polygonOffset(factor,units);
};
lime_graphics_opengl_GL.readPixels = function(x,y,width,height,format,type,pixels) {
	lime_graphics_opengl_GL.context.readPixels(x,y,width,height,format,type,pixels);
};
lime_graphics_opengl_GL.renderbufferStorage = function(target,internalformat,width,height) {
	lime_graphics_opengl_GL.context.renderbufferStorage(target,internalformat,width,height);
};
lime_graphics_opengl_GL.sampleCoverage = function(value,invert) {
	lime_graphics_opengl_GL.context.sampleCoverage(value,invert);
};
lime_graphics_opengl_GL.scissor = function(x,y,width,height) {
	lime_graphics_opengl_GL.context.scissor(x,y,width,height);
};
lime_graphics_opengl_GL.shaderSource = function(shader,source) {
	lime_graphics_opengl_GL.context.shaderSource(shader,source);
};
lime_graphics_opengl_GL.stencilFunc = function(func,ref,mask) {
	lime_graphics_opengl_GL.context.stencilFunc(func,ref,mask);
};
lime_graphics_opengl_GL.stencilFuncSeparate = function(face,func,ref,mask) {
	lime_graphics_opengl_GL.context.stencilFuncSeparate(face,func,ref,mask);
};
lime_graphics_opengl_GL.stencilMask = function(mask) {
	lime_graphics_opengl_GL.context.stencilMask(mask);
};
lime_graphics_opengl_GL.stencilMaskSeparate = function(face,mask) {
	lime_graphics_opengl_GL.context.stencilMaskSeparate(face,mask);
};
lime_graphics_opengl_GL.stencilOp = function(fail,zfail,zpass) {
	lime_graphics_opengl_GL.context.stencilOp(fail,zfail,zpass);
};
lime_graphics_opengl_GL.stencilOpSeparate = function(face,fail,zfail,zpass) {
	lime_graphics_opengl_GL.context.stencilOpSeparate(face,fail,zfail,zpass);
};
lime_graphics_opengl_GL.texImage2D = function(target,level,internalformat,width,height,border,format,type,pixels) {
	lime_graphics_opengl_GL.context.texImage2D(target,level,internalformat,width,height,border,format,type,pixels);
};
lime_graphics_opengl_GL.texParameterf = function(target,pname,param) {
	lime_graphics_opengl_GL.context.texParameterf(target,pname,param);
};
lime_graphics_opengl_GL.texParameteri = function(target,pname,param) {
	lime_graphics_opengl_GL.context.texParameteri(target,pname,param);
};
lime_graphics_opengl_GL.texSubImage2D = function(target,level,xoffset,yoffset,width,height,format,type,pixels) {
	lime_graphics_opengl_GL.context.texSubImage2D(target,level,xoffset,yoffset,width,height,format,type,pixels);
};
lime_graphics_opengl_GL.uniform1f = function(location,x) {
	lime_graphics_opengl_GL.context.uniform1f(location,x);
};
lime_graphics_opengl_GL.uniform1fv = function(location,x) {
	lime_graphics_opengl_GL.context.uniform1fv(location,x);
};
lime_graphics_opengl_GL.uniform1i = function(location,x) {
	lime_graphics_opengl_GL.context.uniform1i(location,x);
};
lime_graphics_opengl_GL.uniform1iv = function(location,v) {
	lime_graphics_opengl_GL.context.uniform1iv(location,v);
};
lime_graphics_opengl_GL.uniform2f = function(location,x,y) {
	lime_graphics_opengl_GL.context.uniform2f(location,x,y);
};
lime_graphics_opengl_GL.uniform2fv = function(location,v) {
	lime_graphics_opengl_GL.context.uniform2fv(location,v);
};
lime_graphics_opengl_GL.uniform2i = function(location,x,y) {
	lime_graphics_opengl_GL.context.uniform2i(location,x,y);
};
lime_graphics_opengl_GL.uniform2iv = function(location,v) {
	lime_graphics_opengl_GL.context.uniform2iv(location,v);
};
lime_graphics_opengl_GL.uniform3f = function(location,x,y,z) {
	lime_graphics_opengl_GL.context.uniform3f(location,x,y,z);
};
lime_graphics_opengl_GL.uniform3fv = function(location,v) {
	lime_graphics_opengl_GL.context.uniform3fv(location,v);
};
lime_graphics_opengl_GL.uniform3i = function(location,x,y,z) {
	lime_graphics_opengl_GL.context.uniform3i(location,x,y,z);
};
lime_graphics_opengl_GL.uniform3iv = function(location,v) {
	lime_graphics_opengl_GL.context.uniform3iv(location,v);
};
lime_graphics_opengl_GL.uniform4f = function(location,x,y,z,w) {
	lime_graphics_opengl_GL.context.uniform4f(location,x,y,z,w);
};
lime_graphics_opengl_GL.uniform4fv = function(location,v) {
	lime_graphics_opengl_GL.context.uniform4fv(location,v);
};
lime_graphics_opengl_GL.uniform4i = function(location,x,y,z,w) {
	lime_graphics_opengl_GL.context.uniform4i(location,x,y,z,w);
};
lime_graphics_opengl_GL.uniform4iv = function(location,v) {
	lime_graphics_opengl_GL.context.uniform4iv(location,v);
};
lime_graphics_opengl_GL.uniformMatrix2fv = function(location,transpose,v) {
	lime_graphics_opengl_GL.context.uniformMatrix2fv(location,transpose,v);
};
lime_graphics_opengl_GL.uniformMatrix3fv = function(location,transpose,v) {
	lime_graphics_opengl_GL.context.uniformMatrix3fv(location,transpose,v);
};
lime_graphics_opengl_GL.uniformMatrix4fv = function(location,transpose,v) {
	lime_graphics_opengl_GL.context.uniformMatrix4fv(location,transpose,v);
};
lime_graphics_opengl_GL.useProgram = function(program) {
	lime_graphics_opengl_GL.context.useProgram(program);
};
lime_graphics_opengl_GL.validateProgram = function(program) {
	lime_graphics_opengl_GL.context.validateProgram(program);
};
lime_graphics_opengl_GL.vertexAttrib1f = function(indx,x) {
	lime_graphics_opengl_GL.context.vertexAttrib1f(indx,x);
};
lime_graphics_opengl_GL.vertexAttrib1fv = function(indx,values) {
	lime_graphics_opengl_GL.context.vertexAttrib1fv(indx,values);
};
lime_graphics_opengl_GL.vertexAttrib2f = function(indx,x,y) {
	lime_graphics_opengl_GL.context.vertexAttrib2f(indx,x,y);
};
lime_graphics_opengl_GL.vertexAttrib2fv = function(indx,values) {
	lime_graphics_opengl_GL.context.vertexAttrib2fv(indx,values);
};
lime_graphics_opengl_GL.vertexAttrib3f = function(indx,x,y,z) {
	lime_graphics_opengl_GL.context.vertexAttrib3f(indx,x,y,z);
};
lime_graphics_opengl_GL.vertexAttrib3fv = function(indx,values) {
	lime_graphics_opengl_GL.context.vertexAttrib3fv(indx,values);
};
lime_graphics_opengl_GL.vertexAttrib4f = function(indx,x,y,z,w) {
	lime_graphics_opengl_GL.context.vertexAttrib4f(indx,x,y,z,w);
};
lime_graphics_opengl_GL.vertexAttrib4fv = function(indx,values) {
	lime_graphics_opengl_GL.context.vertexAttrib4fv(indx,values);
};
lime_graphics_opengl_GL.vertexAttribPointer = function(indx,size,type,normalized,stride,offset) {
	lime_graphics_opengl_GL.context.vertexAttribPointer(indx,size,type,normalized,stride,offset);
};
lime_graphics_opengl_GL.viewport = function(x,y,width,height) {
	lime_graphics_opengl_GL.context.viewport(x,y,width,height);
};
lime_graphics_opengl_GL.get_version = function() {
	return 2;
};
var lime_graphics_utils_ImageCanvasUtil = function() { };
$hxClasses["lime.graphics.utils.ImageCanvasUtil"] = lime_graphics_utils_ImageCanvasUtil;
lime_graphics_utils_ImageCanvasUtil.__name__ = ["lime","graphics","utils","ImageCanvasUtil"];
lime_graphics_utils_ImageCanvasUtil.colorTransform = function(image,rect,colorMatrix) {
	lime_graphics_utils_ImageCanvasUtil.convertToCanvas(image);
	lime_graphics_utils_ImageCanvasUtil.createImageData(image);
	lime_graphics_utils_ImageDataUtil.colorTransform(image,rect,colorMatrix);
};
lime_graphics_utils_ImageCanvasUtil.convertToCanvas = function(image) {
	var buffer = image.buffer;
	if(buffer.__srcImage != null) {
		if(buffer.__srcCanvas == null) {
			lime_graphics_utils_ImageCanvasUtil.createCanvas(image,buffer.__srcImage.width,buffer.__srcImage.height);
			buffer.__srcContext.drawImage(buffer.__srcImage,0,0);
		}
		buffer.__srcImage = null;
	} else if(buffer.data != null && buffer.__srcCanvas == null) {
		lime_graphics_utils_ImageCanvasUtil.createCanvas(image,buffer.width,buffer.height);
		lime_graphics_utils_ImageCanvasUtil.createImageData(image);
	} else if(buffer.data == null && buffer.__srcImageData != null) buffer.data = buffer.__srcImageData.data;
};
lime_graphics_utils_ImageCanvasUtil.convertToData = function(image) {
	if(image.buffer.data == null) {
		lime_graphics_utils_ImageCanvasUtil.convertToCanvas(image);
		lime_graphics_utils_ImageCanvasUtil.sync(image,false);
		lime_graphics_utils_ImageCanvasUtil.createImageData(image);
		image.buffer.__srcCanvas = null;
		image.buffer.__srcContext = null;
	}
};
lime_graphics_utils_ImageCanvasUtil.copyChannel = function(image,sourceImage,sourceRect,destPoint,sourceChannel,destChannel) {
	lime_graphics_utils_ImageCanvasUtil.convertToCanvas(sourceImage);
	lime_graphics_utils_ImageCanvasUtil.createImageData(sourceImage);
	lime_graphics_utils_ImageCanvasUtil.convertToCanvas(image);
	lime_graphics_utils_ImageCanvasUtil.createImageData(image);
	lime_graphics_utils_ImageDataUtil.copyChannel(image,sourceImage,sourceRect,destPoint,sourceChannel,destChannel);
};
lime_graphics_utils_ImageCanvasUtil.copyPixels = function(image,sourceImage,sourceRect,destPoint,alphaImage,alphaPoint,mergeAlpha) {
	if(mergeAlpha == null) mergeAlpha = false;
	if(destPoint == null || destPoint.x >= image.width || destPoint.y >= image.height || sourceRect == null || sourceRect.width < 1 || sourceRect.height < 1) return;
	if(alphaImage != null && alphaImage.get_transparent()) {
		if(alphaPoint == null) alphaPoint = new lime_math_Vector2();
		var tempData = image.clone();
		tempData.copyChannel(alphaImage,new lime_math_Rectangle(alphaPoint.x,alphaPoint.y,sourceRect.width,sourceRect.height),new lime_math_Vector2(sourceRect.x,sourceRect.y),lime_graphics_ImageChannel.ALPHA,lime_graphics_ImageChannel.ALPHA);
		sourceImage = tempData;
	}
	lime_graphics_utils_ImageCanvasUtil.sync(image,true);
	if(!mergeAlpha) {
		if(image.get_transparent() && sourceImage.get_transparent()) image.buffer.__srcContext.clearRect(destPoint.x + image.offsetX,destPoint.y + image.offsetY,sourceRect.width + image.offsetX,sourceRect.height + image.offsetY);
	}
	lime_graphics_utils_ImageCanvasUtil.sync(sourceImage,false);
	if(sourceImage.buffer.get_src() != null) image.buffer.__srcContext.drawImage(sourceImage.buffer.get_src(),sourceRect.x + sourceImage.offsetX | 0,sourceRect.y + sourceImage.offsetY | 0,sourceRect.width | 0,sourceRect.height | 0,destPoint.x + image.offsetX | 0,destPoint.y + image.offsetY | 0,sourceRect.width | 0,sourceRect.height | 0);
};
lime_graphics_utils_ImageCanvasUtil.createCanvas = function(image,width,height) {
	var buffer = image.buffer;
	if(buffer.__srcCanvas == null) {
		buffer.__srcCanvas = window.document.createElement("canvas");
		buffer.__srcCanvas.width = width;
		buffer.__srcCanvas.height = height;
		if(!image.get_transparent()) {
			if(!image.get_transparent()) buffer.__srcCanvas.setAttribute("moz-opaque","true");
			buffer.__srcContext = buffer.__srcCanvas.getContext ("2d", { alpha: false });
		} else buffer.__srcContext = buffer.__srcCanvas.getContext("2d");
		buffer.__srcContext.mozImageSmoothingEnabled = false;
		buffer.__srcContext.msImageSmoothingEnabled = false;
		buffer.__srcContext.imageSmoothingEnabled = false;
	}
};
lime_graphics_utils_ImageCanvasUtil.createImageData = function(image) {
	var buffer = image.buffer;
	if(buffer.__srcImageData == null) {
		if(buffer.data == null) buffer.__srcImageData = buffer.__srcContext.getImageData(0,0,buffer.width,buffer.height); else {
			buffer.__srcImageData = buffer.__srcContext.createImageData(buffer.width,buffer.height);
			buffer.__srcImageData.data.set(buffer.data);
		}
		var elements = buffer.__srcImageData.data.buffer;
		var this1;
		if(elements != null) this1 = new Uint8Array(elements); else this1 = null;
		buffer.data = this1;
	}
};
lime_graphics_utils_ImageCanvasUtil.fillRect = function(image,rect,color,format) {
	lime_graphics_utils_ImageCanvasUtil.convertToCanvas(image);
	lime_graphics_utils_ImageCanvasUtil.sync(image,true);
	if(rect.x == 0 && rect.y == 0 && rect.width == image.width && rect.height == image.height) {
		if(image.get_transparent() && (color & 255) == 0) {
			image.buffer.__srcCanvas.width = image.buffer.width;
			return;
		}
	}
	var r;
	var g;
	var b;
	var a;
	if(format == 1) {
		r = color >> 16 & 255;
		g = color >> 8 & 255;
		b = color & 255;
		if(image.get_transparent()) a = color >> 24 & 255; else a = 255;
	} else {
		r = color >> 24 & 255;
		g = color >> 16 & 255;
		b = color >> 8 & 255;
		if(image.get_transparent()) a = color & 255; else a = 255;
	}
	image.buffer.__srcContext.fillStyle = "rgba(" + r + ", " + g + ", " + b + ", " + a / 255 + ")";
	image.buffer.__srcContext.fillRect(rect.x + image.offsetX,rect.y + image.offsetY,rect.width + image.offsetX,rect.height + image.offsetY);
};
lime_graphics_utils_ImageCanvasUtil.floodFill = function(image,x,y,color,format) {
	lime_graphics_utils_ImageCanvasUtil.convertToCanvas(image);
	lime_graphics_utils_ImageCanvasUtil.createImageData(image);
	lime_graphics_utils_ImageDataUtil.floodFill(image,x,y,color,format);
};
lime_graphics_utils_ImageCanvasUtil.getPixel = function(image,x,y,format) {
	lime_graphics_utils_ImageCanvasUtil.convertToCanvas(image);
	lime_graphics_utils_ImageCanvasUtil.createImageData(image);
	return lime_graphics_utils_ImageDataUtil.getPixel(image,x,y,format);
};
lime_graphics_utils_ImageCanvasUtil.getPixel32 = function(image,x,y,format) {
	lime_graphics_utils_ImageCanvasUtil.convertToCanvas(image);
	lime_graphics_utils_ImageCanvasUtil.createImageData(image);
	return lime_graphics_utils_ImageDataUtil.getPixel32(image,x,y,format);
};
lime_graphics_utils_ImageCanvasUtil.getPixels = function(image,rect,format) {
	lime_graphics_utils_ImageCanvasUtil.convertToCanvas(image);
	lime_graphics_utils_ImageCanvasUtil.createImageData(image);
	return lime_graphics_utils_ImageDataUtil.getPixels(image,rect,format);
};
lime_graphics_utils_ImageCanvasUtil.merge = function(image,sourceImage,sourceRect,destPoint,redMultiplier,greenMultiplier,blueMultiplier,alphaMultiplier) {
	lime_graphics_utils_ImageCanvasUtil.convertToCanvas(sourceImage);
	lime_graphics_utils_ImageCanvasUtil.createImageData(sourceImage);
	lime_graphics_utils_ImageCanvasUtil.convertToCanvas(image);
	lime_graphics_utils_ImageCanvasUtil.createImageData(image);
	lime_graphics_utils_ImageDataUtil.merge(image,sourceImage,sourceRect,destPoint,redMultiplier,greenMultiplier,blueMultiplier,alphaMultiplier);
};
lime_graphics_utils_ImageCanvasUtil.resize = function(image,newWidth,newHeight) {
	var buffer = image.buffer;
	if(buffer.__srcCanvas == null) {
		lime_graphics_utils_ImageCanvasUtil.createCanvas(image,newWidth,newHeight);
		buffer.__srcContext.drawImage(buffer.get_src(),0,0,newWidth,newHeight);
	} else {
		lime_graphics_utils_ImageCanvasUtil.sync(image,true);
		var sourceCanvas = buffer.__srcCanvas;
		buffer.__srcCanvas = null;
		lime_graphics_utils_ImageCanvasUtil.createCanvas(image,newWidth,newHeight);
		buffer.__srcContext.drawImage(sourceCanvas,0,0,newWidth,newHeight);
	}
};
lime_graphics_utils_ImageCanvasUtil.scroll = function(image,x,y) {
	if(x % image.width == 0 && y % image.height == 0) return;
	lime_graphics_utils_ImageCanvasUtil.convertToCanvas(image);
	lime_graphics_utils_ImageCanvasUtil.sync(image,true);
	image.buffer.__srcContext.clearRect(x,y,image.width,image.height);
	image.buffer.__srcContext.drawImage(image.buffer.__srcCanvas,x,y);
};
lime_graphics_utils_ImageCanvasUtil.setPixel = function(image,x,y,color,format) {
	lime_graphics_utils_ImageCanvasUtil.convertToCanvas(image);
	lime_graphics_utils_ImageCanvasUtil.createImageData(image);
	lime_graphics_utils_ImageDataUtil.setPixel(image,x,y,color,format);
};
lime_graphics_utils_ImageCanvasUtil.setPixel32 = function(image,x,y,color,format) {
	lime_graphics_utils_ImageCanvasUtil.convertToCanvas(image);
	lime_graphics_utils_ImageCanvasUtil.createImageData(image);
	lime_graphics_utils_ImageDataUtil.setPixel32(image,x,y,color,format);
};
lime_graphics_utils_ImageCanvasUtil.setPixels = function(image,rect,bytes,format) {
	lime_graphics_utils_ImageCanvasUtil.convertToCanvas(image);
	lime_graphics_utils_ImageCanvasUtil.createImageData(image);
	lime_graphics_utils_ImageDataUtil.setPixels(image,rect,bytes,format);
};
lime_graphics_utils_ImageCanvasUtil.sync = function(image,clear) {
	if(image.dirty && image.buffer.__srcImageData != null && image.type != lime_graphics_ImageType.DATA) {
		image.buffer.__srcContext.putImageData(image.buffer.__srcImageData,0,0);
		image.buffer.data = null;
		image.dirty = false;
	}
	if(clear) {
		image.buffer.__srcImageData = null;
		image.buffer.data = null;
	}
};
var lime_graphics_utils_ImageDataUtil = function() { };
$hxClasses["lime.graphics.utils.ImageDataUtil"] = lime_graphics_utils_ImageDataUtil;
lime_graphics_utils_ImageDataUtil.__name__ = ["lime","graphics","utils","ImageDataUtil"];
lime_graphics_utils_ImageDataUtil.colorTransform = function(image,rect,colorMatrix) {
	var data = image.buffer.data;
	if(data == null) return;
	var format = image.buffer.format;
	var premultiplied = image.buffer.premultiplied;
	var dataView = new lime_graphics_utils__$ImageDataUtil_ImageDataView(image,rect);
	var alphaTable = lime_math__$ColorMatrix_ColorMatrix_$Impl_$.getAlphaTable(colorMatrix);
	var redTable = lime_math__$ColorMatrix_ColorMatrix_$Impl_$.getRedTable(colorMatrix);
	var greenTable = lime_math__$ColorMatrix_ColorMatrix_$Impl_$.getGreenTable(colorMatrix);
	var blueTable = lime_math__$ColorMatrix_ColorMatrix_$Impl_$.getBlueTable(colorMatrix);
	var row;
	var offset;
	var pixel;
	var _g1 = 0;
	var _g = dataView.height;
	while(_g1 < _g) {
		var y = _g1++;
		row = dataView.offset + dataView.stride * y;
		var _g3 = 0;
		var _g2 = dataView.width;
		while(_g3 < _g2) {
			var x = _g3++;
			offset = row + x * 4;
			switch(format) {
			case 2:
				pixel = (data[offset + 2] & 255) << 24 | (data[offset + 1] & 255) << 16 | (data[offset] & 255) << 8 | data[offset + 3] & 255;
				break;
			case 0:
				pixel = (data[offset] & 255) << 24 | (data[offset + 1] & 255) << 16 | (data[offset + 2] & 255) << 8 | data[offset + 3] & 255;
				break;
			case 1:
				pixel = (data[offset + 1] & 255) << 24 | (data[offset + 2] & 255) << 16 | (data[offset + 3] & 255) << 8 | data[offset] & 255;
				break;
			}
			if(premultiplied) {
				if((pixel & 255) != 0 && (pixel & 255) != 255) {
					lime_math_color__$RGBA_RGBA_$Impl_$.unmult = 255.0 / (pixel & 255);
					var r;
					var idx = Math.round((pixel >> 24 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
					r = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx];
					var g;
					var idx1 = Math.round((pixel >> 16 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
					g = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx1];
					var b;
					var idx2 = Math.round((pixel >> 8 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
					b = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx2];
					pixel = (r & 255) << 24 | (g & 255) << 16 | (b & 255) << 8 | pixel & 255 & 255;
				}
			}
			pixel = (redTable[pixel >> 24 & 255] & 255) << 24 | (greenTable[pixel >> 16 & 255] & 255) << 16 | (blueTable[pixel >> 8 & 255] & 255) << 8 | alphaTable[pixel & 255] & 255;
			if(premultiplied) {
				if((pixel & 255) == 0) {
					if(pixel != 0) pixel = 0;
				} else if((pixel & 255) != 255) {
					lime_math_color__$RGBA_RGBA_$Impl_$.a16 = lime_math_color__$RGBA_RGBA_$Impl_$.__alpha16[pixel & 255];
					pixel = ((pixel >> 24 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 24 | ((pixel >> 16 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 16 | ((pixel >> 8 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 8 | pixel & 255 & 255;
				}
			}
			switch(format) {
			case 2:
				data[offset] = pixel >> 8 & 255;
				data[offset + 1] = pixel >> 16 & 255;
				data[offset + 2] = pixel >> 24 & 255;
				data[offset + 3] = pixel & 255;
				break;
			case 0:
				data[offset] = pixel >> 24 & 255;
				data[offset + 1] = pixel >> 16 & 255;
				data[offset + 2] = pixel >> 8 & 255;
				data[offset + 3] = pixel & 255;
				break;
			case 1:
				data[offset] = pixel & 255;
				data[offset + 1] = pixel >> 24 & 255;
				data[offset + 2] = pixel >> 16 & 255;
				data[offset + 3] = pixel >> 8 & 255;
				break;
			}
		}
	}
	image.dirty = true;
};
lime_graphics_utils_ImageDataUtil.copyChannel = function(image,sourceImage,sourceRect,destPoint,sourceChannel,destChannel) {
	var destIdx;
	switch(destChannel[1]) {
	case 0:
		destIdx = 0;
		break;
	case 1:
		destIdx = 1;
		break;
	case 2:
		destIdx = 2;
		break;
	case 3:
		destIdx = 3;
		break;
	}
	var srcIdx;
	switch(sourceChannel[1]) {
	case 0:
		srcIdx = 0;
		break;
	case 1:
		srcIdx = 1;
		break;
	case 2:
		srcIdx = 2;
		break;
	case 3:
		srcIdx = 3;
		break;
	}
	var srcData = sourceImage.buffer.data;
	var destData = image.buffer.data;
	if(srcData == null || destData == null) return;
	var srcView = new lime_graphics_utils__$ImageDataUtil_ImageDataView(sourceImage,sourceRect);
	var destView = new lime_graphics_utils__$ImageDataUtil_ImageDataView(image,new lime_math_Rectangle(destPoint.x,destPoint.y,srcView.width,srcView.height));
	var srcFormat = sourceImage.buffer.format;
	var destFormat = image.buffer.format;
	var srcPremultiplied = sourceImage.buffer.premultiplied;
	var destPremultiplied = image.buffer.premultiplied;
	var srcPosition;
	var destPosition;
	var srcPixel;
	var destPixel;
	var value = 0;
	var _g1 = 0;
	var _g = destView.height;
	while(_g1 < _g) {
		var y = _g1++;
		srcPosition = srcView.offset + srcView.stride * y;
		destPosition = destView.offset + destView.stride * y;
		var _g3 = 0;
		var _g2 = destView.width;
		while(_g3 < _g2) {
			var x = _g3++;
			switch(srcFormat) {
			case 2:
				srcPixel = (srcData[srcPosition + 2] & 255) << 24 | (srcData[srcPosition + 1] & 255) << 16 | (srcData[srcPosition] & 255) << 8 | srcData[srcPosition + 3] & 255;
				break;
			case 0:
				srcPixel = (srcData[srcPosition] & 255) << 24 | (srcData[srcPosition + 1] & 255) << 16 | (srcData[srcPosition + 2] & 255) << 8 | srcData[srcPosition + 3] & 255;
				break;
			case 1:
				srcPixel = (srcData[srcPosition + 1] & 255) << 24 | (srcData[srcPosition + 2] & 255) << 16 | (srcData[srcPosition + 3] & 255) << 8 | srcData[srcPosition] & 255;
				break;
			}
			if(srcPremultiplied) {
				if((srcPixel & 255) != 0 && (srcPixel & 255) != 255) {
					lime_math_color__$RGBA_RGBA_$Impl_$.unmult = 255.0 / (srcPixel & 255);
					var r;
					var idx = Math.round((srcPixel >> 24 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
					r = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx];
					var g;
					var idx1 = Math.round((srcPixel >> 16 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
					g = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx1];
					var b;
					var idx2 = Math.round((srcPixel >> 8 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
					b = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx2];
					srcPixel = (r & 255) << 24 | (g & 255) << 16 | (b & 255) << 8 | srcPixel & 255 & 255;
				}
			}
			switch(destFormat) {
			case 2:
				destPixel = (destData[destPosition + 2] & 255) << 24 | (destData[destPosition + 1] & 255) << 16 | (destData[destPosition] & 255) << 8 | destData[destPosition + 3] & 255;
				break;
			case 0:
				destPixel = (destData[destPosition] & 255) << 24 | (destData[destPosition + 1] & 255) << 16 | (destData[destPosition + 2] & 255) << 8 | destData[destPosition + 3] & 255;
				break;
			case 1:
				destPixel = (destData[destPosition + 1] & 255) << 24 | (destData[destPosition + 2] & 255) << 16 | (destData[destPosition + 3] & 255) << 8 | destData[destPosition] & 255;
				break;
			}
			if(destPremultiplied) {
				if((destPixel & 255) != 0 && (destPixel & 255) != 255) {
					lime_math_color__$RGBA_RGBA_$Impl_$.unmult = 255.0 / (destPixel & 255);
					var r1;
					var idx3 = Math.round((destPixel >> 24 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
					r1 = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx3];
					var g1;
					var idx4 = Math.round((destPixel >> 16 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
					g1 = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx4];
					var b1;
					var idx5 = Math.round((destPixel >> 8 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
					b1 = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx5];
					destPixel = (r1 & 255) << 24 | (g1 & 255) << 16 | (b1 & 255) << 8 | destPixel & 255 & 255;
				}
			}
			switch(srcIdx) {
			case 0:
				value = srcPixel >> 24 & 255;
				break;
			case 1:
				value = srcPixel >> 16 & 255;
				break;
			case 2:
				value = srcPixel >> 8 & 255;
				break;
			case 3:
				value = srcPixel & 255;
				break;
			}
			switch(destIdx) {
			case 0:
				destPixel = (value & 255) << 24 | (destPixel >> 16 & 255 & 255) << 16 | (destPixel >> 8 & 255 & 255) << 8 | destPixel & 255 & 255;
				value;
				break;
			case 1:
				destPixel = (destPixel >> 24 & 255 & 255) << 24 | (value & 255) << 16 | (destPixel >> 8 & 255 & 255) << 8 | destPixel & 255 & 255;
				value;
				break;
			case 2:
				destPixel = (destPixel >> 24 & 255 & 255) << 24 | (destPixel >> 16 & 255 & 255) << 16 | (value & 255) << 8 | destPixel & 255 & 255;
				value;
				break;
			case 3:
				destPixel = (destPixel >> 24 & 255 & 255) << 24 | (destPixel >> 16 & 255 & 255) << 16 | (destPixel >> 8 & 255 & 255) << 8 | value & 255;
				value;
				break;
			}
			if(destPremultiplied) {
				if((destPixel & 255) == 0) {
					if(destPixel != 0) destPixel = 0;
				} else if((destPixel & 255) != 255) {
					lime_math_color__$RGBA_RGBA_$Impl_$.a16 = lime_math_color__$RGBA_RGBA_$Impl_$.__alpha16[destPixel & 255];
					destPixel = ((destPixel >> 24 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 24 | ((destPixel >> 16 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 16 | ((destPixel >> 8 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 8 | destPixel & 255 & 255;
				}
			}
			switch(destFormat) {
			case 2:
				destData[destPosition] = destPixel >> 8 & 255;
				destData[destPosition + 1] = destPixel >> 16 & 255;
				destData[destPosition + 2] = destPixel >> 24 & 255;
				destData[destPosition + 3] = destPixel & 255;
				break;
			case 0:
				destData[destPosition] = destPixel >> 24 & 255;
				destData[destPosition + 1] = destPixel >> 16 & 255;
				destData[destPosition + 2] = destPixel >> 8 & 255;
				destData[destPosition + 3] = destPixel & 255;
				break;
			case 1:
				destData[destPosition] = destPixel & 255;
				destData[destPosition + 1] = destPixel >> 24 & 255;
				destData[destPosition + 2] = destPixel >> 16 & 255;
				destData[destPosition + 3] = destPixel >> 8 & 255;
				break;
			}
			srcPosition += 4;
			destPosition += 4;
		}
	}
	image.dirty = true;
};
lime_graphics_utils_ImageDataUtil.copyPixels = function(image,sourceImage,sourceRect,destPoint,alphaImage,alphaPoint,mergeAlpha) {
	if(mergeAlpha == null) mergeAlpha = false;
	var sourceData = sourceImage.buffer.data;
	var destData = image.buffer.data;
	if(sourceData == null || destData == null) return;
	var sourceView = new lime_graphics_utils__$ImageDataUtil_ImageDataView(sourceImage,sourceRect);
	var destView = new lime_graphics_utils__$ImageDataUtil_ImageDataView(image,new lime_math_Rectangle(destPoint.x,destPoint.y,sourceView.width,sourceView.height));
	var sourceFormat = sourceImage.buffer.format;
	var destFormat = image.buffer.format;
	var sourcePremultiplied = sourceImage.buffer.premultiplied;
	var destPremultiplied = image.buffer.premultiplied;
	var sourcePosition;
	var destPosition;
	var sourcePixel;
	if(!mergeAlpha || !sourceImage.get_transparent()) {
		var _g1 = 0;
		var _g = destView.height;
		while(_g1 < _g) {
			var y = _g1++;
			sourcePosition = sourceView.offset + sourceView.stride * y;
			destPosition = destView.offset + destView.stride * y;
			var _g3 = 0;
			var _g2 = destView.width;
			while(_g3 < _g2) {
				var x = _g3++;
				switch(sourceFormat) {
				case 2:
					sourcePixel = (sourceData[sourcePosition + 2] & 255) << 24 | (sourceData[sourcePosition + 1] & 255) << 16 | (sourceData[sourcePosition] & 255) << 8 | sourceData[sourcePosition + 3] & 255;
					break;
				case 0:
					sourcePixel = (sourceData[sourcePosition] & 255) << 24 | (sourceData[sourcePosition + 1] & 255) << 16 | (sourceData[sourcePosition + 2] & 255) << 8 | sourceData[sourcePosition + 3] & 255;
					break;
				case 1:
					sourcePixel = (sourceData[sourcePosition + 1] & 255) << 24 | (sourceData[sourcePosition + 2] & 255) << 16 | (sourceData[sourcePosition + 3] & 255) << 8 | sourceData[sourcePosition] & 255;
					break;
				}
				if(sourcePremultiplied) {
					if((sourcePixel & 255) != 0 && (sourcePixel & 255) != 255) {
						lime_math_color__$RGBA_RGBA_$Impl_$.unmult = 255.0 / (sourcePixel & 255);
						var r;
						var idx = Math.round((sourcePixel >> 24 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
						r = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx];
						var g;
						var idx1 = Math.round((sourcePixel >> 16 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
						g = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx1];
						var b;
						var idx2 = Math.round((sourcePixel >> 8 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
						b = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx2];
						sourcePixel = (r & 255) << 24 | (g & 255) << 16 | (b & 255) << 8 | sourcePixel & 255 & 255;
					}
				}
				if(destPremultiplied) {
					if((sourcePixel & 255) == 0) {
						if(sourcePixel != 0) sourcePixel = 0;
					} else if((sourcePixel & 255) != 255) {
						lime_math_color__$RGBA_RGBA_$Impl_$.a16 = lime_math_color__$RGBA_RGBA_$Impl_$.__alpha16[sourcePixel & 255];
						sourcePixel = ((sourcePixel >> 24 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 24 | ((sourcePixel >> 16 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 16 | ((sourcePixel >> 8 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 8 | sourcePixel & 255 & 255;
					}
				}
				switch(destFormat) {
				case 2:
					destData[destPosition] = sourcePixel >> 8 & 255;
					destData[destPosition + 1] = sourcePixel >> 16 & 255;
					destData[destPosition + 2] = sourcePixel >> 24 & 255;
					destData[destPosition + 3] = sourcePixel & 255;
					break;
				case 0:
					destData[destPosition] = sourcePixel >> 24 & 255;
					destData[destPosition + 1] = sourcePixel >> 16 & 255;
					destData[destPosition + 2] = sourcePixel >> 8 & 255;
					destData[destPosition + 3] = sourcePixel & 255;
					break;
				case 1:
					destData[destPosition] = sourcePixel & 255;
					destData[destPosition + 1] = sourcePixel >> 24 & 255;
					destData[destPosition + 2] = sourcePixel >> 16 & 255;
					destData[destPosition + 3] = sourcePixel >> 8 & 255;
					break;
				}
				sourcePosition += 4;
				destPosition += 4;
			}
		}
	} else {
		var sourceAlpha;
		var destAlpha;
		var oneMinusSourceAlpha;
		var blendAlpha;
		var destPixel;
		if(alphaImage == null) {
			var _g11 = 0;
			var _g4 = destView.height;
			while(_g11 < _g4) {
				var y1 = _g11++;
				sourcePosition = sourceView.offset + sourceView.stride * y1;
				destPosition = destView.offset + destView.stride * y1;
				var _g31 = 0;
				var _g21 = destView.width;
				while(_g31 < _g21) {
					var x1 = _g31++;
					switch(sourceFormat) {
					case 2:
						sourcePixel = (sourceData[sourcePosition + 2] & 255) << 24 | (sourceData[sourcePosition + 1] & 255) << 16 | (sourceData[sourcePosition] & 255) << 8 | sourceData[sourcePosition + 3] & 255;
						break;
					case 0:
						sourcePixel = (sourceData[sourcePosition] & 255) << 24 | (sourceData[sourcePosition + 1] & 255) << 16 | (sourceData[sourcePosition + 2] & 255) << 8 | sourceData[sourcePosition + 3] & 255;
						break;
					case 1:
						sourcePixel = (sourceData[sourcePosition + 1] & 255) << 24 | (sourceData[sourcePosition + 2] & 255) << 16 | (sourceData[sourcePosition + 3] & 255) << 8 | sourceData[sourcePosition] & 255;
						break;
					}
					if(sourcePremultiplied) {
						if((sourcePixel & 255) != 0 && (sourcePixel & 255) != 255) {
							lime_math_color__$RGBA_RGBA_$Impl_$.unmult = 255.0 / (sourcePixel & 255);
							var r1;
							var idx3 = Math.round((sourcePixel >> 24 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
							r1 = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx3];
							var g1;
							var idx4 = Math.round((sourcePixel >> 16 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
							g1 = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx4];
							var b1;
							var idx5 = Math.round((sourcePixel >> 8 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
							b1 = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx5];
							sourcePixel = (r1 & 255) << 24 | (g1 & 255) << 16 | (b1 & 255) << 8 | sourcePixel & 255 & 255;
						}
					}
					switch(destFormat) {
					case 2:
						destPixel = (destData[destPosition + 2] & 255) << 24 | (destData[destPosition + 1] & 255) << 16 | (destData[destPosition] & 255) << 8 | destData[destPosition + 3] & 255;
						break;
					case 0:
						destPixel = (destData[destPosition] & 255) << 24 | (destData[destPosition + 1] & 255) << 16 | (destData[destPosition + 2] & 255) << 8 | destData[destPosition + 3] & 255;
						break;
					case 1:
						destPixel = (destData[destPosition + 1] & 255) << 24 | (destData[destPosition + 2] & 255) << 16 | (destData[destPosition + 3] & 255) << 8 | destData[destPosition] & 255;
						break;
					}
					if(destPremultiplied) {
						if((destPixel & 255) != 0 && (destPixel & 255) != 255) {
							lime_math_color__$RGBA_RGBA_$Impl_$.unmult = 255.0 / (destPixel & 255);
							var r2;
							var idx6 = Math.round((destPixel >> 24 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
							r2 = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx6];
							var g2;
							var idx7 = Math.round((destPixel >> 16 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
							g2 = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx7];
							var b2;
							var idx8 = Math.round((destPixel >> 8 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
							b2 = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx8];
							destPixel = (r2 & 255) << 24 | (g2 & 255) << 16 | (b2 & 255) << 8 | destPixel & 255 & 255;
						}
					}
					sourceAlpha = (sourcePixel & 255) / 255.0;
					destAlpha = (destPixel & 255) / 255.0;
					oneMinusSourceAlpha = 1 - sourceAlpha;
					blendAlpha = sourceAlpha + destAlpha * oneMinusSourceAlpha;
					if(blendAlpha == 0) destPixel = 0; else {
						var value;
						var idx9 = Math.round(((sourcePixel >> 24 & 255) * sourceAlpha + (destPixel >> 24 & 255) * destAlpha * oneMinusSourceAlpha) / blendAlpha);
						value = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx9];
						destPixel = (value & 255) << 24 | (destPixel >> 16 & 255 & 255) << 16 | (destPixel >> 8 & 255 & 255) << 8 | destPixel & 255 & 255;
						value;
						var value1;
						var idx10 = Math.round(((sourcePixel >> 16 & 255) * sourceAlpha + (destPixel >> 16 & 255) * destAlpha * oneMinusSourceAlpha) / blendAlpha);
						value1 = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx10];
						destPixel = (destPixel >> 24 & 255 & 255) << 24 | (value1 & 255) << 16 | (destPixel >> 8 & 255 & 255) << 8 | destPixel & 255 & 255;
						value1;
						var value2;
						var idx11 = Math.round(((sourcePixel >> 8 & 255) * sourceAlpha + (destPixel >> 8 & 255) * destAlpha * oneMinusSourceAlpha) / blendAlpha);
						value2 = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx11];
						destPixel = (destPixel >> 24 & 255 & 255) << 24 | (destPixel >> 16 & 255 & 255) << 16 | (value2 & 255) << 8 | destPixel & 255 & 255;
						value2;
						var value3;
						var idx12 = Math.round(blendAlpha * 255.0);
						value3 = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx12];
						destPixel = (destPixel >> 24 & 255 & 255) << 24 | (destPixel >> 16 & 255 & 255) << 16 | (destPixel >> 8 & 255 & 255) << 8 | value3 & 255;
						value3;
					}
					if(destPremultiplied) {
						if((destPixel & 255) == 0) {
							if(destPixel != 0) destPixel = 0;
						} else if((destPixel & 255) != 255) {
							lime_math_color__$RGBA_RGBA_$Impl_$.a16 = lime_math_color__$RGBA_RGBA_$Impl_$.__alpha16[destPixel & 255];
							destPixel = ((destPixel >> 24 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 24 | ((destPixel >> 16 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 16 | ((destPixel >> 8 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 8 | destPixel & 255 & 255;
						}
					}
					switch(destFormat) {
					case 2:
						destData[destPosition] = destPixel >> 8 & 255;
						destData[destPosition + 1] = destPixel >> 16 & 255;
						destData[destPosition + 2] = destPixel >> 24 & 255;
						destData[destPosition + 3] = destPixel & 255;
						break;
					case 0:
						destData[destPosition] = destPixel >> 24 & 255;
						destData[destPosition + 1] = destPixel >> 16 & 255;
						destData[destPosition + 2] = destPixel >> 8 & 255;
						destData[destPosition + 3] = destPixel & 255;
						break;
					case 1:
						destData[destPosition] = destPixel & 255;
						destData[destPosition + 1] = destPixel >> 24 & 255;
						destData[destPosition + 2] = destPixel >> 16 & 255;
						destData[destPosition + 3] = destPixel >> 8 & 255;
						break;
					}
					sourcePosition += 4;
					destPosition += 4;
				}
			}
		} else {
			if(alphaPoint == null) alphaPoint = new lime_math_Vector2();
			var alphaData = alphaImage.buffer.data;
			var alphaFormat = alphaImage.buffer.format;
			var alphaPremultiplied = alphaImage.buffer.premultiplied;
			var alphaView = new lime_graphics_utils__$ImageDataUtil_ImageDataView(alphaImage,new lime_math_Rectangle(alphaPoint.x,alphaPoint.y,destView.width,destView.height));
			var alphaPosition;
			var alphaPixel;
			var _g12 = 0;
			var _g5 = alphaView.height;
			while(_g12 < _g5) {
				var y2 = _g12++;
				sourcePosition = sourceView.offset + sourceView.stride * y2;
				destPosition = destView.offset + destView.stride * y2;
				alphaPosition = alphaView.offset + alphaView.stride * y2;
				var _g32 = 0;
				var _g22 = alphaView.width;
				while(_g32 < _g22) {
					var x2 = _g32++;
					switch(sourceFormat) {
					case 2:
						sourcePixel = (sourceData[sourcePosition + 2] & 255) << 24 | (sourceData[sourcePosition + 1] & 255) << 16 | (sourceData[sourcePosition] & 255) << 8 | sourceData[sourcePosition + 3] & 255;
						break;
					case 0:
						sourcePixel = (sourceData[sourcePosition] & 255) << 24 | (sourceData[sourcePosition + 1] & 255) << 16 | (sourceData[sourcePosition + 2] & 255) << 8 | sourceData[sourcePosition + 3] & 255;
						break;
					case 1:
						sourcePixel = (sourceData[sourcePosition + 1] & 255) << 24 | (sourceData[sourcePosition + 2] & 255) << 16 | (sourceData[sourcePosition + 3] & 255) << 8 | sourceData[sourcePosition] & 255;
						break;
					}
					if(sourcePremultiplied) {
						if((sourcePixel & 255) != 0 && (sourcePixel & 255) != 255) {
							lime_math_color__$RGBA_RGBA_$Impl_$.unmult = 255.0 / (sourcePixel & 255);
							var r3;
							var idx13 = Math.round((sourcePixel >> 24 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
							r3 = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx13];
							var g3;
							var idx14 = Math.round((sourcePixel >> 16 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
							g3 = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx14];
							var b3;
							var idx15 = Math.round((sourcePixel >> 8 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
							b3 = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx15];
							sourcePixel = (r3 & 255) << 24 | (g3 & 255) << 16 | (b3 & 255) << 8 | sourcePixel & 255 & 255;
						}
					}
					switch(destFormat) {
					case 2:
						destPixel = (destData[destPosition + 2] & 255) << 24 | (destData[destPosition + 1] & 255) << 16 | (destData[destPosition] & 255) << 8 | destData[destPosition + 3] & 255;
						break;
					case 0:
						destPixel = (destData[destPosition] & 255) << 24 | (destData[destPosition + 1] & 255) << 16 | (destData[destPosition + 2] & 255) << 8 | destData[destPosition + 3] & 255;
						break;
					case 1:
						destPixel = (destData[destPosition + 1] & 255) << 24 | (destData[destPosition + 2] & 255) << 16 | (destData[destPosition + 3] & 255) << 8 | destData[destPosition] & 255;
						break;
					}
					if(destPremultiplied) {
						if((destPixel & 255) != 0 && (destPixel & 255) != 255) {
							lime_math_color__$RGBA_RGBA_$Impl_$.unmult = 255.0 / (destPixel & 255);
							var r4;
							var idx16 = Math.round((destPixel >> 24 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
							r4 = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx16];
							var g4;
							var idx17 = Math.round((destPixel >> 16 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
							g4 = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx17];
							var b4;
							var idx18 = Math.round((destPixel >> 8 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
							b4 = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx18];
							destPixel = (r4 & 255) << 24 | (g4 & 255) << 16 | (b4 & 255) << 8 | destPixel & 255 & 255;
						}
					}
					switch(alphaFormat) {
					case 2:
						alphaPixel = (alphaData[alphaPosition + 2] & 255) << 24 | (alphaData[alphaPosition + 1] & 255) << 16 | (alphaData[alphaPosition] & 255) << 8 | alphaData[alphaPosition + 3] & 255;
						break;
					case 0:
						alphaPixel = (alphaData[alphaPosition] & 255) << 24 | (alphaData[alphaPosition + 1] & 255) << 16 | (alphaData[alphaPosition + 2] & 255) << 8 | alphaData[alphaPosition + 3] & 255;
						break;
					case 1:
						alphaPixel = (alphaData[alphaPosition + 1] & 255) << 24 | (alphaData[alphaPosition + 2] & 255) << 16 | (alphaData[alphaPosition + 3] & 255) << 8 | alphaData[alphaPosition] & 255;
						break;
					}
					if(alphaPremultiplied) {
						if((alphaPixel & 255) != 0 && (alphaPixel & 255) != 255) {
							lime_math_color__$RGBA_RGBA_$Impl_$.unmult = 255.0 / (alphaPixel & 255);
							var r5;
							var idx19 = Math.round((alphaPixel >> 24 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
							r5 = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx19];
							var g5;
							var idx20 = Math.round((alphaPixel >> 16 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
							g5 = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx20];
							var b5;
							var idx21 = Math.round((alphaPixel >> 8 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
							b5 = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx21];
							alphaPixel = (r5 & 255) << 24 | (g5 & 255) << 16 | (b5 & 255) << 8 | alphaPixel & 255 & 255;
						}
					}
					sourceAlpha = (alphaPixel & 255) / 255;
					destAlpha = (destPixel & 255) / 255;
					oneMinusSourceAlpha = 1 - sourceAlpha;
					blendAlpha = sourceAlpha + destAlpha * oneMinusSourceAlpha;
					if(blendAlpha == 0) destPixel = 0; else {
						var value4;
						var idx22 = Math.round(((sourcePixel >> 24 & 255) * sourceAlpha + (destPixel >> 24 & 255) * destAlpha * oneMinusSourceAlpha) / blendAlpha);
						value4 = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx22];
						destPixel = (value4 & 255) << 24 | (destPixel >> 16 & 255 & 255) << 16 | (destPixel >> 8 & 255 & 255) << 8 | destPixel & 255 & 255;
						value4;
						var value5;
						var idx23 = Math.round(((sourcePixel >> 16 & 255) * sourceAlpha + (destPixel >> 16 & 255) * destAlpha * oneMinusSourceAlpha) / blendAlpha);
						value5 = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx23];
						destPixel = (destPixel >> 24 & 255 & 255) << 24 | (value5 & 255) << 16 | (destPixel >> 8 & 255 & 255) << 8 | destPixel & 255 & 255;
						value5;
						var value6;
						var idx24 = Math.round(((sourcePixel >> 8 & 255) * sourceAlpha + (destPixel >> 8 & 255) * destAlpha * oneMinusSourceAlpha) / blendAlpha);
						value6 = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx24];
						destPixel = (destPixel >> 24 & 255 & 255) << 24 | (destPixel >> 16 & 255 & 255) << 16 | (value6 & 255) << 8 | destPixel & 255 & 255;
						value6;
						var value7;
						var idx25 = Math.round(blendAlpha * 255.0);
						value7 = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx25];
						destPixel = (destPixel >> 24 & 255 & 255) << 24 | (destPixel >> 16 & 255 & 255) << 16 | (destPixel >> 8 & 255 & 255) << 8 | value7 & 255;
						value7;
					}
					if(destPremultiplied) {
						if((destPixel & 255) == 0) {
							if(destPixel != 0) destPixel = 0;
						} else if((destPixel & 255) != 255) {
							lime_math_color__$RGBA_RGBA_$Impl_$.a16 = lime_math_color__$RGBA_RGBA_$Impl_$.__alpha16[destPixel & 255];
							destPixel = ((destPixel >> 24 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 24 | ((destPixel >> 16 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 16 | ((destPixel >> 8 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 8 | destPixel & 255 & 255;
						}
					}
					switch(destFormat) {
					case 2:
						destData[destPosition] = destPixel >> 8 & 255;
						destData[destPosition + 1] = destPixel >> 16 & 255;
						destData[destPosition + 2] = destPixel >> 24 & 255;
						destData[destPosition + 3] = destPixel & 255;
						break;
					case 0:
						destData[destPosition] = destPixel >> 24 & 255;
						destData[destPosition + 1] = destPixel >> 16 & 255;
						destData[destPosition + 2] = destPixel >> 8 & 255;
						destData[destPosition + 3] = destPixel & 255;
						break;
					case 1:
						destData[destPosition] = destPixel & 255;
						destData[destPosition + 1] = destPixel >> 24 & 255;
						destData[destPosition + 2] = destPixel >> 16 & 255;
						destData[destPosition + 3] = destPixel >> 8 & 255;
						break;
					}
					sourcePosition += 4;
					destPosition += 4;
				}
			}
		}
	}
	image.dirty = true;
};
lime_graphics_utils_ImageDataUtil.fillRect = function(image,rect,color,format) {
	var fillColor;
	switch(format) {
	case 1:
		{
			var argb = color;
			var rgba = 0;
			rgba = (argb >> 16 & 255 & 255) << 24 | (argb >> 8 & 255 & 255) << 16 | (argb & 255 & 255) << 8 | argb >> 24 & 255 & 255;
			fillColor = rgba;
		}
		break;
	case 2:
		{
			var bgra = color;
			var rgba1 = 0;
			rgba1 = (bgra >> 8 & 255 & 255) << 24 | (bgra >> 16 & 255 & 255) << 16 | (bgra >> 24 & 255 & 255) << 8 | bgra & 255 & 255;
			fillColor = rgba1;
		}
		break;
	default:
		fillColor = color;
	}
	if(!image.get_transparent()) {
		fillColor = (fillColor >> 24 & 255 & 255) << 24 | (fillColor >> 16 & 255 & 255) << 16 | (fillColor >> 8 & 255 & 255) << 8 | 255;
		255;
	}
	var data = image.buffer.data;
	if(data == null) return;
	var format1 = image.buffer.format;
	var premultiplied = image.buffer.premultiplied;
	var dataView = new lime_graphics_utils__$ImageDataUtil_ImageDataView(image,rect);
	var row;
	var _g1 = 0;
	var _g = dataView.height;
	while(_g1 < _g) {
		var y = _g1++;
		row = dataView.offset + dataView.stride * y;
		var _g3 = 0;
		var _g2 = dataView.width;
		while(_g3 < _g2) {
			var x = _g3++;
			var offset = row + x * 4;
			if(premultiplied) {
				if((fillColor & 255) == 0) {
					if(fillColor != 0) fillColor = 0;
				} else if((fillColor & 255) != 255) {
					lime_math_color__$RGBA_RGBA_$Impl_$.a16 = lime_math_color__$RGBA_RGBA_$Impl_$.__alpha16[fillColor & 255];
					fillColor = ((fillColor >> 24 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 24 | ((fillColor >> 16 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 16 | ((fillColor >> 8 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 8 | fillColor & 255 & 255;
				}
			}
			switch(format1) {
			case 2:
				data[offset] = fillColor >> 8 & 255;
				data[offset + 1] = fillColor >> 16 & 255;
				data[offset + 2] = fillColor >> 24 & 255;
				data[offset + 3] = fillColor & 255;
				break;
			case 0:
				data[offset] = fillColor >> 24 & 255;
				data[offset + 1] = fillColor >> 16 & 255;
				data[offset + 2] = fillColor >> 8 & 255;
				data[offset + 3] = fillColor & 255;
				break;
			case 1:
				data[offset] = fillColor & 255;
				data[offset + 1] = fillColor >> 24 & 255;
				data[offset + 2] = fillColor >> 16 & 255;
				data[offset + 3] = fillColor >> 8 & 255;
				break;
			}
		}
	}
	image.dirty = true;
};
lime_graphics_utils_ImageDataUtil.floodFill = function(image,x,y,color,format) {
	var data = image.buffer.data;
	if(data == null) return;
	if(format == 1) color = (color & 16777215) << 8 | color >> 24 & 255;
	var format1 = image.buffer.format;
	var premultiplied = image.buffer.premultiplied;
	var fillColor = color;
	var hitColor;
	var offset = (y + image.offsetY) * (image.buffer.width * 4) + (x + image.offsetX) * 4;
	switch(format1) {
	case 2:
		hitColor = (data[offset + 2] & 255) << 24 | (data[offset + 1] & 255) << 16 | (data[offset] & 255) << 8 | data[offset + 3] & 255;
		break;
	case 0:
		hitColor = (data[offset] & 255) << 24 | (data[offset + 1] & 255) << 16 | (data[offset + 2] & 255) << 8 | data[offset + 3] & 255;
		break;
	case 1:
		hitColor = (data[offset + 1] & 255) << 24 | (data[offset + 2] & 255) << 16 | (data[offset + 3] & 255) << 8 | data[offset] & 255;
		break;
	}
	if(premultiplied) {
		if((hitColor & 255) != 0 && (hitColor & 255) != 255) {
			lime_math_color__$RGBA_RGBA_$Impl_$.unmult = 255.0 / (hitColor & 255);
			var r;
			var idx = Math.round((hitColor >> 24 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
			r = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx];
			var g;
			var idx1 = Math.round((hitColor >> 16 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
			g = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx1];
			var b;
			var idx2 = Math.round((hitColor >> 8 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
			b = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx2];
			hitColor = (r & 255) << 24 | (g & 255) << 16 | (b & 255) << 8 | hitColor & 255 & 255;
		}
	}
	if(!image.get_transparent()) {
		fillColor = (fillColor >> 24 & 255 & 255) << 24 | (fillColor >> 16 & 255 & 255) << 16 | (fillColor >> 8 & 255 & 255) << 8 | 255;
		255;
		hitColor = (hitColor >> 24 & 255 & 255) << 24 | (hitColor >> 16 & 255 & 255) << 16 | (hitColor >> 8 & 255 & 255) << 8 | 255;
		255;
	}
	if(fillColor == hitColor) return;
	var dx = [0,-1,1,0];
	var dy = [-1,0,0,1];
	var minX = -image.offsetX;
	var minY = -image.offsetY;
	var maxX = minX + image.width;
	var maxY = minY + image.height;
	var queue = [];
	queue.push(x);
	queue.push(y);
	var curPointX;
	var curPointY;
	var nextPointX;
	var nextPointY;
	var nextPointOffset;
	var readColor;
	while(queue.length > 0) {
		curPointY = queue.pop();
		curPointX = queue.pop();
		var _g = 0;
		while(_g < 4) {
			var i = _g++;
			nextPointX = curPointX + dx[i];
			nextPointY = curPointY + dy[i];
			if(nextPointX < minX || nextPointY < minY || nextPointX >= maxX || nextPointY >= maxY) continue;
			nextPointOffset = (nextPointY * image.width + nextPointX) * 4;
			switch(format1) {
			case 2:
				readColor = (data[nextPointOffset + 2] & 255) << 24 | (data[nextPointOffset + 1] & 255) << 16 | (data[nextPointOffset] & 255) << 8 | data[nextPointOffset + 3] & 255;
				break;
			case 0:
				readColor = (data[nextPointOffset] & 255) << 24 | (data[nextPointOffset + 1] & 255) << 16 | (data[nextPointOffset + 2] & 255) << 8 | data[nextPointOffset + 3] & 255;
				break;
			case 1:
				readColor = (data[nextPointOffset + 1] & 255) << 24 | (data[nextPointOffset + 2] & 255) << 16 | (data[nextPointOffset + 3] & 255) << 8 | data[nextPointOffset] & 255;
				break;
			}
			if(premultiplied) {
				if((readColor & 255) != 0 && (readColor & 255) != 255) {
					lime_math_color__$RGBA_RGBA_$Impl_$.unmult = 255.0 / (readColor & 255);
					var r1;
					var idx3 = Math.round((readColor >> 24 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
					r1 = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx3];
					var g1;
					var idx4 = Math.round((readColor >> 16 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
					g1 = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx4];
					var b1;
					var idx5 = Math.round((readColor >> 8 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
					b1 = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx5];
					readColor = (r1 & 255) << 24 | (g1 & 255) << 16 | (b1 & 255) << 8 | readColor & 255 & 255;
				}
			}
			if(readColor == hitColor) {
				if(premultiplied) {
					if((fillColor & 255) == 0) {
						if(fillColor != 0) fillColor = 0;
					} else if((fillColor & 255) != 255) {
						lime_math_color__$RGBA_RGBA_$Impl_$.a16 = lime_math_color__$RGBA_RGBA_$Impl_$.__alpha16[fillColor & 255];
						fillColor = ((fillColor >> 24 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 24 | ((fillColor >> 16 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 16 | ((fillColor >> 8 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 8 | fillColor & 255 & 255;
					}
				}
				switch(format1) {
				case 2:
					data[nextPointOffset] = fillColor >> 8 & 255;
					data[nextPointOffset + 1] = fillColor >> 16 & 255;
					data[nextPointOffset + 2] = fillColor >> 24 & 255;
					data[nextPointOffset + 3] = fillColor & 255;
					break;
				case 0:
					data[nextPointOffset] = fillColor >> 24 & 255;
					data[nextPointOffset + 1] = fillColor >> 16 & 255;
					data[nextPointOffset + 2] = fillColor >> 8 & 255;
					data[nextPointOffset + 3] = fillColor & 255;
					break;
				case 1:
					data[nextPointOffset] = fillColor & 255;
					data[nextPointOffset + 1] = fillColor >> 24 & 255;
					data[nextPointOffset + 2] = fillColor >> 16 & 255;
					data[nextPointOffset + 3] = fillColor >> 8 & 255;
					break;
				}
				queue.push(nextPointX);
				queue.push(nextPointY);
			}
		}
	}
	image.dirty = true;
};
lime_graphics_utils_ImageDataUtil.getColorBoundsRect = function(image,mask,color,findColor,format) {
	if(findColor == null) findColor = true;
	var left = image.width + 1;
	var right = 0;
	var top = image.height + 1;
	var bottom = 0;
	var _color;
	var _mask;
	switch(format) {
	case 1:
		{
			var argb = color;
			var rgba = 0;
			rgba = (argb >> 16 & 255 & 255) << 24 | (argb >> 8 & 255 & 255) << 16 | (argb & 255 & 255) << 8 | argb >> 24 & 255 & 255;
			_color = rgba;
		}
		{
			var argb1 = mask;
			var rgba1 = 0;
			rgba1 = (argb1 >> 16 & 255 & 255) << 24 | (argb1 >> 8 & 255 & 255) << 16 | (argb1 & 255 & 255) << 8 | argb1 >> 24 & 255 & 255;
			_mask = rgba1;
		}
		break;
	case 2:
		{
			var bgra = color;
			var rgba2 = 0;
			rgba2 = (bgra >> 8 & 255 & 255) << 24 | (bgra >> 16 & 255 & 255) << 16 | (bgra >> 24 & 255 & 255) << 8 | bgra & 255 & 255;
			_color = rgba2;
		}
		{
			var bgra1 = mask;
			var rgba3 = 0;
			rgba3 = (bgra1 >> 8 & 255 & 255) << 24 | (bgra1 >> 16 & 255 & 255) << 16 | (bgra1 >> 24 & 255 & 255) << 8 | bgra1 & 255 & 255;
			_mask = rgba3;
		}
		break;
	default:
		_color = color;
		_mask = mask;
	}
	if(!image.get_transparent()) {
		_color = (_color >> 24 & 255 & 255) << 24 | (_color >> 16 & 255 & 255) << 16 | (_color >> 8 & 255 & 255) << 8 | 255;
		255;
		_mask = (_mask >> 24 & 255 & 255) << 24 | (_mask >> 16 & 255 & 255) << 16 | (_mask >> 8 & 255 & 255) << 8 | 255;
		255;
	}
	var pixel;
	var hit;
	var _g1 = 0;
	var _g = image.width;
	while(_g1 < _g) {
		var x = _g1++;
		hit = false;
		var _g3 = 0;
		var _g2 = image.height;
		while(_g3 < _g2) {
			var y = _g3++;
			pixel = image.getPixel32(x,y,0);
			if(findColor) hit = (pixel & _mask) == _color; else hit = (pixel & _mask) != _color;
			if(hit) {
				if(x < left) left = x;
				break;
			}
		}
		if(hit) break;
	}
	var ix;
	var _g11 = 0;
	var _g4 = image.width;
	while(_g11 < _g4) {
		var x1 = _g11++;
		ix = image.width - 1 - x1;
		hit = false;
		var _g31 = 0;
		var _g21 = image.height;
		while(_g31 < _g21) {
			var y1 = _g31++;
			pixel = image.getPixel32(ix,y1,0);
			if(findColor) hit = (pixel & _mask) == _color; else hit = (pixel & _mask) != _color;
			if(hit) {
				if(ix > right) right = ix;
				break;
			}
		}
		if(hit) break;
	}
	var _g12 = 0;
	var _g5 = image.height;
	while(_g12 < _g5) {
		var y2 = _g12++;
		hit = false;
		var _g32 = 0;
		var _g22 = image.width;
		while(_g32 < _g22) {
			var x2 = _g32++;
			pixel = image.getPixel32(x2,y2,0);
			if(findColor) hit = (pixel & _mask) == _color; else hit = (pixel & _mask) != _color;
			if(hit) {
				if(y2 < top) top = y2;
				break;
			}
		}
		if(hit) break;
	}
	var iy;
	var _g13 = 0;
	var _g6 = image.height;
	while(_g13 < _g6) {
		var y3 = _g13++;
		iy = image.height - 1 - y3;
		hit = false;
		var _g33 = 0;
		var _g23 = image.width;
		while(_g33 < _g23) {
			var x3 = _g33++;
			pixel = image.getPixel32(x3,iy,0);
			if(findColor) hit = (pixel & _mask) == _color; else hit = (pixel & _mask) != _color;
			if(hit) {
				if(iy > bottom) bottom = iy;
				break;
			}
		}
		if(hit) break;
	}
	var w = right - left;
	var h = bottom - top;
	if(w > 0) w++;
	if(h > 0) h++;
	if(w < 0) w = 0;
	if(h < 0) h = 0;
	if(left == right) w = 1;
	if(top == bottom) h = 1;
	if(left > image.width) left = 0;
	if(top > image.height) top = 0;
	return new lime_math_Rectangle(left,top,w,h);
};
lime_graphics_utils_ImageDataUtil.getPixel = function(image,x,y,format) {
	var pixel;
	var data = image.buffer.data;
	var offset = 4 * (y + image.offsetY) * image.buffer.width + (x + image.offsetX) * 4;
	switch(image.buffer.format) {
	case 2:
		pixel = (data[offset + 2] & 255) << 24 | (data[offset + 1] & 255) << 16 | (data[offset] & 255) << 8 | data[offset + 3] & 255;
		break;
	case 0:
		pixel = (data[offset] & 255) << 24 | (data[offset + 1] & 255) << 16 | (data[offset + 2] & 255) << 8 | data[offset + 3] & 255;
		break;
	case 1:
		pixel = (data[offset + 1] & 255) << 24 | (data[offset + 2] & 255) << 16 | (data[offset + 3] & 255) << 8 | data[offset] & 255;
		break;
	}
	if(image.buffer.premultiplied) {
		if((pixel & 255) != 0 && (pixel & 255) != 255) {
			lime_math_color__$RGBA_RGBA_$Impl_$.unmult = 255.0 / (pixel & 255);
			var r;
			var idx = Math.round((pixel >> 24 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
			r = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx];
			var g;
			var idx1 = Math.round((pixel >> 16 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
			g = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx1];
			var b;
			var idx2 = Math.round((pixel >> 8 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
			b = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx2];
			pixel = (r & 255) << 24 | (g & 255) << 16 | (b & 255) << 8 | pixel & 255 & 255;
		}
	}
	pixel = (pixel >> 24 & 255 & 255) << 24 | (pixel >> 16 & 255 & 255) << 16 | (pixel >> 8 & 255 & 255) << 8 | 0;
	0;
	switch(format) {
	case 1:
		return (function($this) {
			var $r;
			var argb = 0;
			argb = (pixel & 255 & 255) << 24 | (pixel >> 24 & 255 & 255) << 16 | (pixel >> 16 & 255 & 255) << 8 | pixel >> 8 & 255 & 255;
			$r = argb;
			return $r;
		}(this));
	case 2:
		return (function($this) {
			var $r;
			var bgra = 0;
			bgra = (pixel >> 8 & 255 & 255) << 24 | (pixel >> 16 & 255 & 255) << 16 | (pixel >> 24 & 255 & 255) << 8 | pixel & 255 & 255;
			$r = bgra;
			return $r;
		}(this));
	default:
		return pixel;
	}
};
lime_graphics_utils_ImageDataUtil.getPixel32 = function(image,x,y,format) {
	var pixel;
	var data = image.buffer.data;
	var offset = 4 * (y + image.offsetY) * image.buffer.width + (x + image.offsetX) * 4;
	switch(image.buffer.format) {
	case 2:
		pixel = (data[offset + 2] & 255) << 24 | (data[offset + 1] & 255) << 16 | (data[offset] & 255) << 8 | data[offset + 3] & 255;
		break;
	case 0:
		pixel = (data[offset] & 255) << 24 | (data[offset + 1] & 255) << 16 | (data[offset + 2] & 255) << 8 | data[offset + 3] & 255;
		break;
	case 1:
		pixel = (data[offset + 1] & 255) << 24 | (data[offset + 2] & 255) << 16 | (data[offset + 3] & 255) << 8 | data[offset] & 255;
		break;
	}
	if(image.buffer.premultiplied) {
		if((pixel & 255) != 0 && (pixel & 255) != 255) {
			lime_math_color__$RGBA_RGBA_$Impl_$.unmult = 255.0 / (pixel & 255);
			var r;
			var idx = Math.round((pixel >> 24 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
			r = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx];
			var g;
			var idx1 = Math.round((pixel >> 16 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
			g = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx1];
			var b;
			var idx2 = Math.round((pixel >> 8 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
			b = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx2];
			pixel = (r & 255) << 24 | (g & 255) << 16 | (b & 255) << 8 | pixel & 255 & 255;
		}
	}
	switch(format) {
	case 1:
		return (function($this) {
			var $r;
			var argb = 0;
			argb = (pixel & 255 & 255) << 24 | (pixel >> 24 & 255 & 255) << 16 | (pixel >> 16 & 255 & 255) << 8 | pixel >> 8 & 255 & 255;
			$r = argb;
			return $r;
		}(this));
	case 2:
		return (function($this) {
			var $r;
			var bgra = 0;
			bgra = (pixel >> 8 & 255 & 255) << 24 | (pixel >> 16 & 255 & 255) << 16 | (pixel >> 24 & 255 & 255) << 8 | pixel & 255 & 255;
			$r = bgra;
			return $r;
		}(this));
	default:
		return pixel;
	}
};
lime_graphics_utils_ImageDataUtil.getPixels = function(image,rect,format) {
	if(image.buffer.data == null) return null;
	var length = rect.width * rect.height | 0;
	var bytes = haxe_io_Bytes.alloc(length * 4);
	var data = image.buffer.data;
	var sourceFormat = image.buffer.format;
	var premultiplied = image.buffer.premultiplied;
	var dataView = new lime_graphics_utils__$ImageDataUtil_ImageDataView(image,rect);
	var position;
	var argb;
	var bgra;
	var pixel;
	var destPosition = 0;
	var _g1 = 0;
	var _g = dataView.height;
	while(_g1 < _g) {
		var y = _g1++;
		position = dataView.offset + dataView.stride * y;
		var _g3 = 0;
		var _g2 = dataView.width;
		while(_g3 < _g2) {
			var x = _g3++;
			switch(sourceFormat) {
			case 2:
				pixel = (data[position + 2] & 255) << 24 | (data[position + 1] & 255) << 16 | (data[position] & 255) << 8 | data[position + 3] & 255;
				break;
			case 0:
				pixel = (data[position] & 255) << 24 | (data[position + 1] & 255) << 16 | (data[position + 2] & 255) << 8 | data[position + 3] & 255;
				break;
			case 1:
				pixel = (data[position + 1] & 255) << 24 | (data[position + 2] & 255) << 16 | (data[position + 3] & 255) << 8 | data[position] & 255;
				break;
			}
			if(premultiplied) {
				if((pixel & 255) != 0 && (pixel & 255) != 255) {
					lime_math_color__$RGBA_RGBA_$Impl_$.unmult = 255.0 / (pixel & 255);
					var r;
					var idx = Math.round((pixel >> 24 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
					r = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx];
					var g;
					var idx1 = Math.round((pixel >> 16 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
					g = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx1];
					var b;
					var idx2 = Math.round((pixel >> 8 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
					b = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx2];
					pixel = (r & 255) << 24 | (g & 255) << 16 | (b & 255) << 8 | pixel & 255 & 255;
				}
			}
			switch(format) {
			case 1:
				{
					var argb1 = 0;
					argb1 = (pixel & 255 & 255) << 24 | (pixel >> 24 & 255 & 255) << 16 | (pixel >> 16 & 255 & 255) << 8 | pixel >> 8 & 255 & 255;
					argb = argb1;
				}
				pixel = argb;
				break;
			case 2:
				{
					var bgra1 = 0;
					bgra1 = (pixel >> 8 & 255 & 255) << 24 | (pixel >> 16 & 255 & 255) << 16 | (pixel >> 24 & 255 & 255) << 8 | pixel & 255 & 255;
					bgra = bgra1;
				}
				pixel = bgra;
				break;
			default:
			}
			bytes.set(destPosition++,pixel >> 24 & 255);
			bytes.set(destPosition++,pixel >> 16 & 255);
			bytes.set(destPosition++,pixel >> 8 & 255);
			bytes.set(destPosition++,pixel & 255);
			position += 4;
		}
	}
	return bytes;
};
lime_graphics_utils_ImageDataUtil.merge = function(image,sourceImage,sourceRect,destPoint,redMultiplier,greenMultiplier,blueMultiplier,alphaMultiplier) {
	if(image.buffer.data == null || sourceImage.buffer.data == null) return;
	var sourceView = new lime_graphics_utils__$ImageDataUtil_ImageDataView(sourceImage,sourceRect);
	var destView = new lime_graphics_utils__$ImageDataUtil_ImageDataView(image,new lime_math_Rectangle(destPoint.x,destPoint.y,sourceView.width,sourceView.height));
	var sourceData = sourceImage.buffer.data;
	var destData = image.buffer.data;
	var sourceFormat = sourceImage.buffer.format;
	var destFormat = image.buffer.format;
	var sourcePremultiplied = sourceImage.buffer.premultiplied;
	var destPremultiplied = image.buffer.premultiplied;
	var sourcePosition;
	var destPosition;
	var sourcePixel;
	var destPixel;
	var _g1 = 0;
	var _g = destView.height;
	while(_g1 < _g) {
		var y = _g1++;
		sourcePosition = sourceView.offset + sourceView.stride * y;
		destPosition = destView.offset + destView.stride * y;
		var _g3 = 0;
		var _g2 = destView.width;
		while(_g3 < _g2) {
			var x = _g3++;
			switch(sourceFormat) {
			case 2:
				sourcePixel = (sourceData[sourcePosition + 2] & 255) << 24 | (sourceData[sourcePosition + 1] & 255) << 16 | (sourceData[sourcePosition] & 255) << 8 | sourceData[sourcePosition + 3] & 255;
				break;
			case 0:
				sourcePixel = (sourceData[sourcePosition] & 255) << 24 | (sourceData[sourcePosition + 1] & 255) << 16 | (sourceData[sourcePosition + 2] & 255) << 8 | sourceData[sourcePosition + 3] & 255;
				break;
			case 1:
				sourcePixel = (sourceData[sourcePosition + 1] & 255) << 24 | (sourceData[sourcePosition + 2] & 255) << 16 | (sourceData[sourcePosition + 3] & 255) << 8 | sourceData[sourcePosition] & 255;
				break;
			}
			if(sourcePremultiplied) {
				if((sourcePixel & 255) != 0 && (sourcePixel & 255) != 255) {
					lime_math_color__$RGBA_RGBA_$Impl_$.unmult = 255.0 / (sourcePixel & 255);
					var r;
					var idx = Math.round((sourcePixel >> 24 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
					r = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx];
					var g;
					var idx1 = Math.round((sourcePixel >> 16 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
					g = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx1];
					var b;
					var idx2 = Math.round((sourcePixel >> 8 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
					b = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx2];
					sourcePixel = (r & 255) << 24 | (g & 255) << 16 | (b & 255) << 8 | sourcePixel & 255 & 255;
				}
			}
			switch(destFormat) {
			case 2:
				destPixel = (destData[destPosition + 2] & 255) << 24 | (destData[destPosition + 1] & 255) << 16 | (destData[destPosition] & 255) << 8 | destData[destPosition + 3] & 255;
				break;
			case 0:
				destPixel = (destData[destPosition] & 255) << 24 | (destData[destPosition + 1] & 255) << 16 | (destData[destPosition + 2] & 255) << 8 | destData[destPosition + 3] & 255;
				break;
			case 1:
				destPixel = (destData[destPosition + 1] & 255) << 24 | (destData[destPosition + 2] & 255) << 16 | (destData[destPosition + 3] & 255) << 8 | destData[destPosition] & 255;
				break;
			}
			if(destPremultiplied) {
				if((destPixel & 255) != 0 && (destPixel & 255) != 255) {
					lime_math_color__$RGBA_RGBA_$Impl_$.unmult = 255.0 / (destPixel & 255);
					var r1;
					var idx3 = Math.round((destPixel >> 24 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
					r1 = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx3];
					var g1;
					var idx4 = Math.round((destPixel >> 16 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
					g1 = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx4];
					var b1;
					var idx5 = Math.round((destPixel >> 8 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
					b1 = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx5];
					destPixel = (r1 & 255) << 24 | (g1 & 255) << 16 | (b1 & 255) << 8 | destPixel & 255 & 255;
				}
			}
			var value = ((sourcePixel >> 24 & 255) * redMultiplier + (destPixel >> 24 & 255) * (256 - redMultiplier)) / 256 | 0;
			destPixel = (value & 255) << 24 | (destPixel >> 16 & 255 & 255) << 16 | (destPixel >> 8 & 255 & 255) << 8 | destPixel & 255 & 255;
			value;
			var value1 = ((sourcePixel >> 16 & 255) * greenMultiplier + (destPixel >> 16 & 255) * (256 - greenMultiplier)) / 256 | 0;
			destPixel = (destPixel >> 24 & 255 & 255) << 24 | (value1 & 255) << 16 | (destPixel >> 8 & 255 & 255) << 8 | destPixel & 255 & 255;
			value1;
			var value2 = ((sourcePixel >> 8 & 255) * blueMultiplier + (destPixel >> 8 & 255) * (256 - blueMultiplier)) / 256 | 0;
			destPixel = (destPixel >> 24 & 255 & 255) << 24 | (destPixel >> 16 & 255 & 255) << 16 | (value2 & 255) << 8 | destPixel & 255 & 255;
			value2;
			var value3 = ((sourcePixel & 255) * alphaMultiplier + (destPixel & 255) * (256 - alphaMultiplier)) / 256 | 0;
			destPixel = (destPixel >> 24 & 255 & 255) << 24 | (destPixel >> 16 & 255 & 255) << 16 | (destPixel >> 8 & 255 & 255) << 8 | value3 & 255;
			value3;
			if(destPremultiplied) {
				if((destPixel & 255) == 0) {
					if(destPixel != 0) destPixel = 0;
				} else if((destPixel & 255) != 255) {
					lime_math_color__$RGBA_RGBA_$Impl_$.a16 = lime_math_color__$RGBA_RGBA_$Impl_$.__alpha16[destPixel & 255];
					destPixel = ((destPixel >> 24 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 24 | ((destPixel >> 16 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 16 | ((destPixel >> 8 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 8 | destPixel & 255 & 255;
				}
			}
			switch(destFormat) {
			case 2:
				destData[destPosition] = destPixel >> 8 & 255;
				destData[destPosition + 1] = destPixel >> 16 & 255;
				destData[destPosition + 2] = destPixel >> 24 & 255;
				destData[destPosition + 3] = destPixel & 255;
				break;
			case 0:
				destData[destPosition] = destPixel >> 24 & 255;
				destData[destPosition + 1] = destPixel >> 16 & 255;
				destData[destPosition + 2] = destPixel >> 8 & 255;
				destData[destPosition + 3] = destPixel & 255;
				break;
			case 1:
				destData[destPosition] = destPixel & 255;
				destData[destPosition + 1] = destPixel >> 24 & 255;
				destData[destPosition + 2] = destPixel >> 16 & 255;
				destData[destPosition + 3] = destPixel >> 8 & 255;
				break;
			}
			sourcePosition += 4;
			destPosition += 4;
		}
	}
	image.dirty = true;
};
lime_graphics_utils_ImageDataUtil.multiplyAlpha = function(image) {
	var data = image.buffer.data;
	if(data == null || !image.buffer.transparent) return;
	var format = image.buffer.format;
	var length = data.length / 4 | 0;
	var pixel;
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		var offset = i * 4;
		switch(format) {
		case 2:
			pixel = (data[offset + 2] & 255) << 24 | (data[offset + 1] & 255) << 16 | (data[offset] & 255) << 8 | data[offset + 3] & 255;
			break;
		case 0:
			pixel = (data[offset] & 255) << 24 | (data[offset + 1] & 255) << 16 | (data[offset + 2] & 255) << 8 | data[offset + 3] & 255;
			break;
		case 1:
			pixel = (data[offset + 1] & 255) << 24 | (data[offset + 2] & 255) << 16 | (data[offset + 3] & 255) << 8 | data[offset] & 255;
			break;
		}
		var offset1 = i * 4;
		if((pixel & 255) == 0) {
			if(pixel != 0) pixel = 0;
		} else if((pixel & 255) != 255) {
			lime_math_color__$RGBA_RGBA_$Impl_$.a16 = lime_math_color__$RGBA_RGBA_$Impl_$.__alpha16[pixel & 255];
			pixel = ((pixel >> 24 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 24 | ((pixel >> 16 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 16 | ((pixel >> 8 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 8 | pixel & 255 & 255;
		}
		switch(format) {
		case 2:
			data[offset1] = pixel >> 8 & 255;
			data[offset1 + 1] = pixel >> 16 & 255;
			data[offset1 + 2] = pixel >> 24 & 255;
			data[offset1 + 3] = pixel & 255;
			break;
		case 0:
			data[offset1] = pixel >> 24 & 255;
			data[offset1 + 1] = pixel >> 16 & 255;
			data[offset1 + 2] = pixel >> 8 & 255;
			data[offset1 + 3] = pixel & 255;
			break;
		case 1:
			data[offset1] = pixel & 255;
			data[offset1 + 1] = pixel >> 24 & 255;
			data[offset1 + 2] = pixel >> 16 & 255;
			data[offset1 + 3] = pixel >> 8 & 255;
			break;
		}
	}
	image.buffer.premultiplied = true;
	image.dirty = true;
};
lime_graphics_utils_ImageDataUtil.resize = function(image,newWidth,newHeight) {
	var buffer = image.buffer;
	if(buffer.width == newWidth && buffer.height == newHeight) return;
	var newBuffer = new lime_graphics_ImageBuffer((function($this) {
		var $r;
		var elements = newWidth * newHeight * 4;
		var this1;
		if(elements != null) this1 = new Uint8Array(elements); else this1 = null;
		$r = this1;
		return $r;
	}(this)),newWidth,newHeight);
	var imageWidth = image.width;
	var imageHeight = image.height;
	var data = image.get_data();
	var newData = newBuffer.data;
	var sourceIndex;
	var sourceIndexX;
	var sourceIndexY;
	var sourceIndexXY;
	var index;
	var sourceX;
	var sourceY;
	var u;
	var v;
	var uRatio;
	var vRatio;
	var uOpposite;
	var vOpposite;
	var _g = 0;
	while(_g < newHeight) {
		var y = _g++;
		var _g1 = 0;
		while(_g1 < newWidth) {
			var x = _g1++;
			u = (x + 0.5) / newWidth * imageWidth - 0.5;
			v = (y + 0.5) / newHeight * imageHeight - 0.5;
			sourceX = u | 0;
			sourceY = v | 0;
			sourceIndex = (sourceY * imageWidth + sourceX) * 4;
			if(sourceX < imageWidth - 1) sourceIndexX = sourceIndex + 4; else sourceIndexX = sourceIndex;
			if(sourceY < imageHeight - 1) sourceIndexY = sourceIndex + imageWidth * 4; else sourceIndexY = sourceIndex;
			if(sourceIndexX != sourceIndex) sourceIndexXY = sourceIndexY + 4; else sourceIndexXY = sourceIndexY;
			index = (y * newWidth + x) * 4;
			uRatio = u - sourceX;
			vRatio = v - sourceY;
			uOpposite = 1 - uRatio;
			vOpposite = 1 - vRatio;
			var val = Std["int"]((_$UInt_UInt_$Impl_$.toFloat(data[sourceIndex]) * uOpposite + _$UInt_UInt_$Impl_$.toFloat(data[sourceIndexX]) * uRatio) * vOpposite + (_$UInt_UInt_$Impl_$.toFloat(data[sourceIndexY]) * uOpposite + _$UInt_UInt_$Impl_$.toFloat(data[sourceIndexXY]) * uRatio) * vRatio);
			newData[index] = val;
			var val1 = Std["int"]((_$UInt_UInt_$Impl_$.toFloat(data[sourceIndex + 1]) * uOpposite + _$UInt_UInt_$Impl_$.toFloat(data[sourceIndexX + 1]) * uRatio) * vOpposite + (_$UInt_UInt_$Impl_$.toFloat(data[sourceIndexY + 1]) * uOpposite + _$UInt_UInt_$Impl_$.toFloat(data[sourceIndexXY + 1]) * uRatio) * vRatio);
			newData[index + 1] = val1;
			var val2 = Std["int"]((_$UInt_UInt_$Impl_$.toFloat(data[sourceIndex + 2]) * uOpposite + _$UInt_UInt_$Impl_$.toFloat(data[sourceIndexX + 2]) * uRatio) * vOpposite + (_$UInt_UInt_$Impl_$.toFloat(data[sourceIndexY + 2]) * uOpposite + _$UInt_UInt_$Impl_$.toFloat(data[sourceIndexXY + 2]) * uRatio) * vRatio);
			newData[index + 2] = val2;
			if(data[sourceIndexX + 3] == 0 || data[sourceIndexY + 3] == 0 || data[sourceIndexXY + 3] == 0) newData[index + 3] = 0; else newData[index + 3] = data[sourceIndex + 3];
		}
	}
	buffer.data = newBuffer.data;
	buffer.width = newWidth;
	buffer.height = newHeight;
};
lime_graphics_utils_ImageDataUtil.resizeBuffer = function(image,newWidth,newHeight) {
	var buffer = image.buffer;
	var data = image.get_data();
	var newData;
	var elements = newWidth * newHeight * 4;
	var this1;
	if(elements != null) this1 = new Uint8Array(elements); else this1 = null;
	newData = this1;
	var sourceIndex;
	var index;
	var _g1 = 0;
	var _g = buffer.height;
	while(_g1 < _g) {
		var y = _g1++;
		var _g3 = 0;
		var _g2 = buffer.width;
		while(_g3 < _g2) {
			var x = _g3++;
			sourceIndex = (y * buffer.width + x) * 4;
			index = (y * newWidth + x) * 4;
			newData[index] = data[sourceIndex];
			newData[index + 1] = data[sourceIndex + 1];
			newData[index + 2] = data[sourceIndex + 2];
			newData[index + 3] = data[sourceIndex + 3];
		}
	}
	buffer.data = newData;
	buffer.width = newWidth;
	buffer.height = newHeight;
};
lime_graphics_utils_ImageDataUtil.setFormat = function(image,format) {
	var data = image.buffer.data;
	if(data == null) return;
	var index;
	var a16;
	var length = data.length / 4 | 0;
	var r1;
	var g1;
	var b1;
	var a1;
	var r2;
	var g2;
	var b2;
	var a2;
	var r;
	var g;
	var b;
	var a;
	var _g = image.get_format();
	switch(_g) {
	case 0:
		r1 = 0;
		g1 = 1;
		b1 = 2;
		a1 = 3;
		break;
	case 1:
		r1 = 1;
		g1 = 2;
		b1 = 3;
		a1 = 0;
		break;
	case 2:
		r1 = 2;
		g1 = 1;
		b1 = 0;
		a1 = 3;
		break;
	}
	switch(format) {
	case 0:
		r2 = 0;
		g2 = 1;
		b2 = 2;
		a2 = 3;
		break;
	case 1:
		r2 = 1;
		g2 = 2;
		b2 = 3;
		a2 = 0;
		break;
	case 2:
		r2 = 2;
		g2 = 1;
		b2 = 0;
		a2 = 3;
		break;
	}
	var _g1 = 0;
	while(_g1 < length) {
		var i = _g1++;
		index = i * 4;
		r = data[index + r1];
		g = data[index + g1];
		b = data[index + b1];
		a = data[index + a1];
		data[index + r2] = r;
		data[index + g2] = g;
		data[index + b2] = b;
		data[index + a2] = a;
	}
	image.buffer.format = format;
	image.dirty = true;
};
lime_graphics_utils_ImageDataUtil.setPixel = function(image,x,y,color,format) {
	var pixel;
	switch(format) {
	case 1:
		{
			var argb = color;
			var rgba = 0;
			rgba = (argb >> 16 & 255 & 255) << 24 | (argb >> 8 & 255 & 255) << 16 | (argb & 255 & 255) << 8 | argb >> 24 & 255 & 255;
			pixel = rgba;
		}
		break;
	case 2:
		{
			var bgra = color;
			var rgba1 = 0;
			rgba1 = (bgra >> 8 & 255 & 255) << 24 | (bgra >> 16 & 255 & 255) << 16 | (bgra >> 24 & 255 & 255) << 8 | bgra & 255 & 255;
			pixel = rgba1;
		}
		break;
	default:
		pixel = color;
	}
	var source = 0;
	var data = image.buffer.data;
	var offset = 4 * (y + image.offsetY) * image.buffer.width + (x + image.offsetX) * 4;
	switch(image.buffer.format) {
	case 2:
		source = (data[offset + 2] & 255) << 24 | (data[offset + 1] & 255) << 16 | (data[offset] & 255) << 8 | data[offset + 3] & 255;
		break;
	case 0:
		source = (data[offset] & 255) << 24 | (data[offset + 1] & 255) << 16 | (data[offset + 2] & 255) << 8 | data[offset + 3] & 255;
		break;
	case 1:
		source = (data[offset + 1] & 255) << 24 | (data[offset + 2] & 255) << 16 | (data[offset + 3] & 255) << 8 | data[offset] & 255;
		break;
	}
	if(image.buffer.premultiplied) {
		if((source & 255) != 0 && (source & 255) != 255) {
			lime_math_color__$RGBA_RGBA_$Impl_$.unmult = 255.0 / (source & 255);
			var r;
			var idx = Math.round((source >> 24 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
			r = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx];
			var g;
			var idx1 = Math.round((source >> 16 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
			g = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx1];
			var b;
			var idx2 = Math.round((source >> 8 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
			b = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx2];
			source = (r & 255) << 24 | (g & 255) << 16 | (b & 255) << 8 | source & 255 & 255;
		}
	}
	var value = source & 255;
	pixel = (pixel >> 24 & 255 & 255) << 24 | (pixel >> 16 & 255 & 255) << 16 | (pixel >> 8 & 255 & 255) << 8 | value & 255;
	value;
	var data1 = image.buffer.data;
	var offset1 = 4 * (y + image.offsetY) * image.buffer.width + (x + image.offsetX) * 4;
	if(image.buffer.premultiplied) {
		if((pixel & 255) == 0) {
			if(pixel != 0) pixel = 0;
		} else if((pixel & 255) != 255) {
			lime_math_color__$RGBA_RGBA_$Impl_$.a16 = lime_math_color__$RGBA_RGBA_$Impl_$.__alpha16[pixel & 255];
			pixel = ((pixel >> 24 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 24 | ((pixel >> 16 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 16 | ((pixel >> 8 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 8 | pixel & 255 & 255;
		}
	}
	switch(image.buffer.format) {
	case 2:
		data1[offset1] = pixel >> 8 & 255;
		data1[offset1 + 1] = pixel >> 16 & 255;
		data1[offset1 + 2] = pixel >> 24 & 255;
		data1[offset1 + 3] = pixel & 255;
		break;
	case 0:
		data1[offset1] = pixel >> 24 & 255;
		data1[offset1 + 1] = pixel >> 16 & 255;
		data1[offset1 + 2] = pixel >> 8 & 255;
		data1[offset1 + 3] = pixel & 255;
		break;
	case 1:
		data1[offset1] = pixel & 255;
		data1[offset1 + 1] = pixel >> 24 & 255;
		data1[offset1 + 2] = pixel >> 16 & 255;
		data1[offset1 + 3] = pixel >> 8 & 255;
		break;
	}
	image.dirty = true;
};
lime_graphics_utils_ImageDataUtil.setPixel32 = function(image,x,y,color,format) {
	var pixel;
	switch(format) {
	case 1:
		{
			var argb = color;
			var rgba = 0;
			rgba = (argb >> 16 & 255 & 255) << 24 | (argb >> 8 & 255 & 255) << 16 | (argb & 255 & 255) << 8 | argb >> 24 & 255 & 255;
			pixel = rgba;
		}
		break;
	case 2:
		{
			var bgra = color;
			var rgba1 = 0;
			rgba1 = (bgra >> 8 & 255 & 255) << 24 | (bgra >> 16 & 255 & 255) << 16 | (bgra >> 24 & 255 & 255) << 8 | bgra & 255 & 255;
			pixel = rgba1;
		}
		break;
	default:
		pixel = color;
	}
	if(!image.get_transparent()) {
		pixel = (pixel >> 24 & 255 & 255) << 24 | (pixel >> 16 & 255 & 255) << 16 | (pixel >> 8 & 255 & 255) << 8 | 255;
		255;
	}
	var data = image.buffer.data;
	var offset = 4 * (y + image.offsetY) * image.buffer.width + (x + image.offsetX) * 4;
	if(image.buffer.premultiplied) {
		if((pixel & 255) == 0) {
			if(pixel != 0) pixel = 0;
		} else if((pixel & 255) != 255) {
			lime_math_color__$RGBA_RGBA_$Impl_$.a16 = lime_math_color__$RGBA_RGBA_$Impl_$.__alpha16[pixel & 255];
			pixel = ((pixel >> 24 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 24 | ((pixel >> 16 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 16 | ((pixel >> 8 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 8 | pixel & 255 & 255;
		}
	}
	switch(image.buffer.format) {
	case 2:
		data[offset] = pixel >> 8 & 255;
		data[offset + 1] = pixel >> 16 & 255;
		data[offset + 2] = pixel >> 24 & 255;
		data[offset + 3] = pixel & 255;
		break;
	case 0:
		data[offset] = pixel >> 24 & 255;
		data[offset + 1] = pixel >> 16 & 255;
		data[offset + 2] = pixel >> 8 & 255;
		data[offset + 3] = pixel & 255;
		break;
	case 1:
		data[offset] = pixel & 255;
		data[offset + 1] = pixel >> 24 & 255;
		data[offset + 2] = pixel >> 16 & 255;
		data[offset + 3] = pixel >> 8 & 255;
		break;
	}
	image.dirty = true;
};
lime_graphics_utils_ImageDataUtil.setPixels = function(image,rect,bytes,format) {
	if(image.buffer.data == null) return;
	var data = image.buffer.data;
	var sourceFormat = image.buffer.format;
	var premultiplied = image.buffer.premultiplied;
	var dataView = new lime_graphics_utils__$ImageDataUtil_ImageDataView(image,rect);
	var row;
	var color;
	var pixel;
	var transparent = image.get_transparent();
	var dataPosition = 0;
	var _g1 = 0;
	var _g = dataView.height;
	while(_g1 < _g) {
		var y = _g1++;
		row = dataView.offset + dataView.stride * y;
		var _g3 = 0;
		var _g2 = dataView.width;
		while(_g3 < _g2) {
			var x = _g3++;
			color = bytes.b[dataPosition + 3] | bytes.b[dataPosition + 2] << 8 | bytes.b[dataPosition + 1] << 16 | bytes.b[dataPosition] << 24;
			dataPosition += 4;
			switch(format) {
			case 1:
				{
					var argb = color;
					var rgba = 0;
					rgba = (argb >> 16 & 255 & 255) << 24 | (argb >> 8 & 255 & 255) << 16 | (argb & 255 & 255) << 8 | argb >> 24 & 255 & 255;
					pixel = rgba;
				}
				break;
			case 2:
				{
					var bgra = color;
					var rgba1 = 0;
					rgba1 = (bgra >> 8 & 255 & 255) << 24 | (bgra >> 16 & 255 & 255) << 16 | (bgra >> 24 & 255 & 255) << 8 | bgra & 255 & 255;
					pixel = rgba1;
				}
				break;
			default:
				pixel = color;
			}
			if(!transparent) {
				pixel = (pixel >> 24 & 255 & 255) << 24 | (pixel >> 16 & 255 & 255) << 16 | (pixel >> 8 & 255 & 255) << 8 | 255;
				255;
			}
			var offset = row + x * 4;
			if(premultiplied) {
				if((pixel & 255) == 0) {
					if(pixel != 0) pixel = 0;
				} else if((pixel & 255) != 255) {
					lime_math_color__$RGBA_RGBA_$Impl_$.a16 = lime_math_color__$RGBA_RGBA_$Impl_$.__alpha16[pixel & 255];
					pixel = ((pixel >> 24 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 24 | ((pixel >> 16 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 16 | ((pixel >> 8 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 8 | pixel & 255 & 255;
				}
			}
			switch(sourceFormat) {
			case 2:
				data[offset] = pixel >> 8 & 255;
				data[offset + 1] = pixel >> 16 & 255;
				data[offset + 2] = pixel >> 24 & 255;
				data[offset + 3] = pixel & 255;
				break;
			case 0:
				data[offset] = pixel >> 24 & 255;
				data[offset + 1] = pixel >> 16 & 255;
				data[offset + 2] = pixel >> 8 & 255;
				data[offset + 3] = pixel & 255;
				break;
			case 1:
				data[offset] = pixel & 255;
				data[offset + 1] = pixel >> 24 & 255;
				data[offset + 2] = pixel >> 16 & 255;
				data[offset + 3] = pixel >> 8 & 255;
				break;
			}
		}
	}
	image.dirty = true;
};
lime_graphics_utils_ImageDataUtil.threshold = function(image,sourceImage,sourceRect,destPoint,operation,threshold,color,mask,copySource,format) {
	var _color;
	var _mask;
	var _threshold;
	switch(format) {
	case 1:
		{
			var argb = color;
			var rgba = 0;
			rgba = (argb >> 16 & 255 & 255) << 24 | (argb >> 8 & 255 & 255) << 16 | (argb & 255 & 255) << 8 | argb >> 24 & 255 & 255;
			_color = rgba;
		}
		{
			var argb1 = mask;
			var rgba1 = 0;
			rgba1 = (argb1 >> 16 & 255 & 255) << 24 | (argb1 >> 8 & 255 & 255) << 16 | (argb1 & 255 & 255) << 8 | argb1 >> 24 & 255 & 255;
			_mask = rgba1;
		}
		{
			var argb2 = threshold;
			var rgba2 = 0;
			rgba2 = (argb2 >> 16 & 255 & 255) << 24 | (argb2 >> 8 & 255 & 255) << 16 | (argb2 & 255 & 255) << 8 | argb2 >> 24 & 255 & 255;
			_threshold = rgba2;
		}
		break;
	case 2:
		{
			var bgra = color;
			var rgba3 = 0;
			rgba3 = (bgra >> 8 & 255 & 255) << 24 | (bgra >> 16 & 255 & 255) << 16 | (bgra >> 24 & 255 & 255) << 8 | bgra & 255 & 255;
			_color = rgba3;
		}
		{
			var bgra1 = mask;
			var rgba4 = 0;
			rgba4 = (bgra1 >> 8 & 255 & 255) << 24 | (bgra1 >> 16 & 255 & 255) << 16 | (bgra1 >> 24 & 255 & 255) << 8 | bgra1 & 255 & 255;
			_mask = rgba4;
		}
		{
			var bgra2 = threshold;
			var rgba5 = 0;
			rgba5 = (bgra2 >> 8 & 255 & 255) << 24 | (bgra2 >> 16 & 255 & 255) << 16 | (bgra2 >> 24 & 255 & 255) << 8 | bgra2 & 255 & 255;
			_threshold = rgba5;
		}
		break;
	default:
		_color = color;
		_mask = mask;
		_threshold = threshold;
	}
	var _operation;
	switch(operation) {
	case "!=":
		_operation = 0;
		break;
	case "==":
		_operation = 1;
		break;
	case "<":
		_operation = 2;
		break;
	case "<=":
		_operation = 3;
		break;
	case ">":
		_operation = 4;
		break;
	case ">=":
		_operation = 5;
		break;
	default:
		_operation = -1;
	}
	if(_operation == -1) return 0;
	var srcData = sourceImage.buffer.data;
	var destData = image.buffer.data;
	if(srcData == null || destData == null) return 0;
	var hits = 0;
	var srcView = new lime_graphics_utils__$ImageDataUtil_ImageDataView(sourceImage,sourceRect);
	var destView = new lime_graphics_utils__$ImageDataUtil_ImageDataView(image,new lime_math_Rectangle(destPoint.x,destPoint.y,srcView.width,srcView.height));
	var srcFormat = sourceImage.buffer.format;
	var destFormat = image.buffer.format;
	var srcPremultiplied = sourceImage.buffer.premultiplied;
	var destPremultiplied = image.buffer.premultiplied;
	var srcPosition;
	var destPosition;
	var srcPixel;
	var destPixel;
	var pixelMask;
	var test;
	var value;
	var _g1 = 0;
	var _g = destView.height;
	while(_g1 < _g) {
		var y = _g1++;
		srcPosition = srcView.offset + srcView.stride * y;
		destPosition = destView.offset + destView.stride * y;
		var _g3 = 0;
		var _g2 = destView.width;
		while(_g3 < _g2) {
			var x = _g3++;
			switch(srcFormat) {
			case 2:
				srcPixel = (srcData[srcPosition + 2] & 255) << 24 | (srcData[srcPosition + 1] & 255) << 16 | (srcData[srcPosition] & 255) << 8 | srcData[srcPosition + 3] & 255;
				break;
			case 0:
				srcPixel = (srcData[srcPosition] & 255) << 24 | (srcData[srcPosition + 1] & 255) << 16 | (srcData[srcPosition + 2] & 255) << 8 | srcData[srcPosition + 3] & 255;
				break;
			case 1:
				srcPixel = (srcData[srcPosition + 1] & 255) << 24 | (srcData[srcPosition + 2] & 255) << 16 | (srcData[srcPosition + 3] & 255) << 8 | srcData[srcPosition] & 255;
				break;
			}
			if(srcPremultiplied) {
				if((srcPixel & 255) != 0 && (srcPixel & 255) != 255) {
					lime_math_color__$RGBA_RGBA_$Impl_$.unmult = 255.0 / (srcPixel & 255);
					var r;
					var idx = Math.round((srcPixel >> 24 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
					r = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx];
					var g;
					var idx1 = Math.round((srcPixel >> 16 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
					g = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx1];
					var b;
					var idx2 = Math.round((srcPixel >> 8 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
					b = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx2];
					srcPixel = (r & 255) << 24 | (g & 255) << 16 | (b & 255) << 8 | srcPixel & 255 & 255;
				}
			}
			pixelMask = srcPixel & _mask;
			value = lime_graphics_utils_ImageDataUtil.__pixelCompare(pixelMask,_threshold);
			switch(_operation) {
			case 0:
				test = value != 0;
				break;
			case 1:
				test = value == 0;
				break;
			case 2:
				test = value == -1;
				break;
			case 3:
				test = value == 0 || value == -1;
				break;
			case 4:
				test = value == 1;
				break;
			case 5:
				test = value == 0 || value == 1;
				break;
			default:
				test = false;
			}
			if(test) {
				if(destPremultiplied) {
					if((_color & 255) == 0) {
						if(_color != 0) _color = 0;
					} else if((_color & 255) != 255) {
						lime_math_color__$RGBA_RGBA_$Impl_$.a16 = lime_math_color__$RGBA_RGBA_$Impl_$.__alpha16[_color & 255];
						_color = ((_color >> 24 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 24 | ((_color >> 16 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 16 | ((_color >> 8 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 8 | _color & 255 & 255;
					}
				}
				switch(destFormat) {
				case 2:
					destData[destPosition] = _color >> 8 & 255;
					destData[destPosition + 1] = _color >> 16 & 255;
					destData[destPosition + 2] = _color >> 24 & 255;
					destData[destPosition + 3] = _color & 255;
					break;
				case 0:
					destData[destPosition] = _color >> 24 & 255;
					destData[destPosition + 1] = _color >> 16 & 255;
					destData[destPosition + 2] = _color >> 8 & 255;
					destData[destPosition + 3] = _color & 255;
					break;
				case 1:
					destData[destPosition] = _color & 255;
					destData[destPosition + 1] = _color >> 24 & 255;
					destData[destPosition + 2] = _color >> 16 & 255;
					destData[destPosition + 3] = _color >> 8 & 255;
					break;
				}
				hits++;
			} else if(copySource) {
				if(destPremultiplied) {
					if((srcPixel & 255) == 0) {
						if(srcPixel != 0) srcPixel = 0;
					} else if((srcPixel & 255) != 255) {
						lime_math_color__$RGBA_RGBA_$Impl_$.a16 = lime_math_color__$RGBA_RGBA_$Impl_$.__alpha16[srcPixel & 255];
						srcPixel = ((srcPixel >> 24 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 24 | ((srcPixel >> 16 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 16 | ((srcPixel >> 8 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 8 | srcPixel & 255 & 255;
					}
				}
				switch(destFormat) {
				case 2:
					destData[destPosition] = srcPixel >> 8 & 255;
					destData[destPosition + 1] = srcPixel >> 16 & 255;
					destData[destPosition + 2] = srcPixel >> 24 & 255;
					destData[destPosition + 3] = srcPixel & 255;
					break;
				case 0:
					destData[destPosition] = srcPixel >> 24 & 255;
					destData[destPosition + 1] = srcPixel >> 16 & 255;
					destData[destPosition + 2] = srcPixel >> 8 & 255;
					destData[destPosition + 3] = srcPixel & 255;
					break;
				case 1:
					destData[destPosition] = srcPixel & 255;
					destData[destPosition + 1] = srcPixel >> 24 & 255;
					destData[destPosition + 2] = srcPixel >> 16 & 255;
					destData[destPosition + 3] = srcPixel >> 8 & 255;
					break;
				}
			}
			srcPosition += 4;
			destPosition += 4;
		}
	}
	if(hits > 0) image.dirty = true;
	return hits;
};
lime_graphics_utils_ImageDataUtil.unmultiplyAlpha = function(image) {
	var data = image.buffer.data;
	if(data == null) return;
	var format = image.buffer.format;
	var length = data.length / 4 | 0;
	var pixel;
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		var offset = i * 4;
		switch(format) {
		case 2:
			pixel = (data[offset + 2] & 255) << 24 | (data[offset + 1] & 255) << 16 | (data[offset] & 255) << 8 | data[offset + 3] & 255;
			break;
		case 0:
			pixel = (data[offset] & 255) << 24 | (data[offset + 1] & 255) << 16 | (data[offset + 2] & 255) << 8 | data[offset + 3] & 255;
			break;
		case 1:
			pixel = (data[offset + 1] & 255) << 24 | (data[offset + 2] & 255) << 16 | (data[offset + 3] & 255) << 8 | data[offset] & 255;
			break;
		}
		if((pixel & 255) != 0 && (pixel & 255) != 255) {
			lime_math_color__$RGBA_RGBA_$Impl_$.unmult = 255.0 / (pixel & 255);
			var r;
			var idx = Math.round((pixel >> 24 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
			r = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx];
			var g;
			var idx1 = Math.round((pixel >> 16 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
			g = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx1];
			var b;
			var idx2 = Math.round((pixel >> 8 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
			b = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx2];
			pixel = (r & 255) << 24 | (g & 255) << 16 | (b & 255) << 8 | pixel & 255 & 255;
		}
		var offset1 = i * 4;
		switch(format) {
		case 2:
			data[offset1] = pixel >> 8 & 255;
			data[offset1 + 1] = pixel >> 16 & 255;
			data[offset1 + 2] = pixel >> 24 & 255;
			data[offset1 + 3] = pixel & 255;
			break;
		case 0:
			data[offset1] = pixel >> 24 & 255;
			data[offset1 + 1] = pixel >> 16 & 255;
			data[offset1 + 2] = pixel >> 8 & 255;
			data[offset1 + 3] = pixel & 255;
			break;
		case 1:
			data[offset1] = pixel & 255;
			data[offset1 + 1] = pixel >> 24 & 255;
			data[offset1 + 2] = pixel >> 16 & 255;
			data[offset1 + 3] = pixel >> 8 & 255;
			break;
		}
	}
	image.buffer.premultiplied = false;
	image.dirty = true;
};
lime_graphics_utils_ImageDataUtil.__pixelCompare = function(n1,n2) {
	var tmp1;
	var tmp2;
	tmp1 = n1 >> 24 & 255;
	tmp2 = n2 >> 24 & 255;
	if(tmp1 != tmp2) if(tmp1 > tmp2) return 1; else return -1; else {
		tmp1 = n1 >> 16 & 255;
		tmp2 = n2 >> 16 & 255;
		if(tmp1 != tmp2) if(tmp1 > tmp2) return 1; else return -1; else {
			tmp1 = n1 >> 8 & 255;
			tmp2 = n2 >> 8 & 255;
			if(tmp1 != tmp2) if(tmp1 > tmp2) return 1; else return -1; else {
				tmp1 = n1 & 255;
				tmp2 = n2 & 255;
				if(tmp1 != tmp2) if(tmp1 > tmp2) return 1; else return -1; else return 0;
			}
		}
	}
};
var lime_graphics_utils__$ImageDataUtil_ImageDataView = function(image,rect) {
	this.image = image;
	if(rect == null) this.rect = image.get_rect(); else {
		if(rect.x < 0) rect.x = 0;
		if(rect.y < 0) rect.y = 0;
		if(rect.x + rect.width > image.width) rect.width = image.width - rect.x;
		if(rect.y + rect.height > image.height) rect.height = image.height - rect.y;
		if(rect.width < 0) rect.width = 0;
		if(rect.height < 0) rect.height = 0;
		this.rect = rect;
	}
	this.stride = image.buffer.get_stride();
	this.x = Math.ceil(this.rect.x);
	this.y = Math.ceil(this.rect.y);
	this.width = Math.floor(this.rect.width);
	this.height = Math.floor(this.rect.height);
	this.offset = this.stride * (this.y + image.offsetY) + (this.x + image.offsetX) * 4;
};
$hxClasses["lime.graphics.utils._ImageDataUtil.ImageDataView"] = lime_graphics_utils__$ImageDataUtil_ImageDataView;
lime_graphics_utils__$ImageDataUtil_ImageDataView.__name__ = ["lime","graphics","utils","_ImageDataUtil","ImageDataView"];
lime_graphics_utils__$ImageDataUtil_ImageDataView.prototype = {
	x: null
	,y: null
	,height: null
	,width: null
	,image: null
	,offset: null
	,rect: null
	,stride: null
	,clip: function(x,y,width,height) {
		this.rect.__contract(x,y,width,height);
		this.x = Math.ceil(this.rect.x);
		this.y = Math.ceil(this.rect.y);
		this.width = Math.floor(this.rect.width);
		this.height = Math.floor(this.rect.height);
		this.offset = this.stride * (this.y + this.image.offsetY) + (this.x + this.image.offsetX) * 4;
	}
	,row: function(y) {
		return this.offset + this.stride * y;
	}
	,__class__: lime_graphics_utils__$ImageDataUtil_ImageDataView
};
var lime_math__$ColorMatrix_ColorMatrix_$Impl_$ = {};
$hxClasses["lime.math._ColorMatrix.ColorMatrix_Impl_"] = lime_math__$ColorMatrix_ColorMatrix_$Impl_$;
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.__name__ = ["lime","math","_ColorMatrix","ColorMatrix_Impl_"];
lime_math__$ColorMatrix_ColorMatrix_$Impl_$._new = function(data) {
	var this1;
	if(data != null && data.length == 20) this1 = data; else {
		var array = lime_math__$ColorMatrix_ColorMatrix_$Impl_$.__identity;
		var this2;
		if(array != null) this2 = new Float32Array(array); else this2 = null;
		this1 = this2;
	}
	return this1;
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.clone = function(this1) {
	return lime_math__$ColorMatrix_ColorMatrix_$Impl_$._new((function($this) {
		var $r;
		var this2;
		if(this1 != null) this2 = new Float32Array(this1); else this2 = null;
		$r = this2;
		return $r;
	}(this)));
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.concat = function(this1,second) {
	var _g = this1;
	_g[0] = _g[0] + second[0];
	var _g1 = this1;
	_g1[6] = _g1[6] + second[6];
	var _g2 = this1;
	_g2[12] = _g2[12] + second[12];
	var _g3 = this1;
	_g3[18] = _g3[18] + second[18];
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.copyFrom = function(this1,other) {
	this1.set(other);
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.identity = function(this1) {
	this1[0] = 1;
	this1[1] = 0;
	this1[2] = 0;
	this1[3] = 0;
	this1[4] = 0;
	this1[5] = 0;
	this1[6] = 1;
	this1[7] = 0;
	this1[8] = 0;
	this1[9] = 0;
	this1[10] = 0;
	this1[11] = 0;
	this1[12] = 1;
	this1[13] = 0;
	this1[14] = 0;
	this1[15] = 0;
	this1[16] = 0;
	this1[17] = 0;
	this1[18] = 1;
	this1[19] = 0;
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.getAlphaTable = function(this1) {
	var table;
	var this2;
	this2 = new Uint8Array(256);
	table = this2;
	var multiplier = this1[18];
	var offset = this1[19] * 255;
	var value;
	var _g = 0;
	while(_g < 256) {
		var i = _g++;
		value = Math.floor(i * multiplier + offset);
		if(value > 255) value = 255;
		if(value < 0) value = 0;
		table[i] = value;
	}
	return table;
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.getBlueTable = function(this1) {
	var table;
	var this2;
	this2 = new Uint8Array(256);
	table = this2;
	var multiplier = this1[12];
	var offset = this1[14] * 255;
	var value;
	var _g = 0;
	while(_g < 256) {
		var i = _g++;
		value = Math.floor(i * multiplier + offset);
		if(value > 255) value = 255;
		if(value < 0) value = 0;
		table[i] = value;
	}
	return table;
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.getGreenTable = function(this1) {
	var table;
	var this2;
	this2 = new Uint8Array(256);
	table = this2;
	var multiplier = this1[6];
	var offset = this1[9] * 255;
	var value;
	var _g = 0;
	while(_g < 256) {
		var i = _g++;
		value = Math.floor(i * multiplier + offset);
		if(value > 255) value = 255;
		if(value < 0) value = 0;
		table[i] = value;
	}
	return table;
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.getRedTable = function(this1) {
	var table;
	var this2;
	this2 = new Uint8Array(256);
	table = this2;
	var multiplier = this1[0];
	var offset = this1[4] * 255;
	var value;
	var _g = 0;
	while(_g < 256) {
		var i = _g++;
		value = Math.floor(i * multiplier + offset);
		if(value > 255) value = 255;
		if(value < 0) value = 0;
		table[i] = value;
	}
	return table;
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.__toFlashColorTransform = function(this1) {
	return null;
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.get_alphaMultiplier = function(this1) {
	return this1[18];
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.set_alphaMultiplier = function(this1,value) {
	return this1[18] = value;
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.get_alphaOffset = function(this1) {
	return this1[19] * 255;
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.set_alphaOffset = function(this1,value) {
	return this1[19] = value / 255;
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.get_blueMultiplier = function(this1) {
	return this1[12];
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.set_blueMultiplier = function(this1,value) {
	return this1[12] = value;
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.get_blueOffset = function(this1) {
	return this1[14] * 255;
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.set_blueOffset = function(this1,value) {
	return this1[14] = value / 255;
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.get_color = function(this1) {
	return (this1[4] * 255 | 0) << 16 | (this1[9] * 255 | 0) << 8 | (this1[14] * 255 | 0);
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.set_color = function(this1,value) {
	this1[4] = (value >> 16 & 255) / 255;
	this1[9] = (value >> 8 & 255) / 255;
	this1[14] = (value & 255) / 255;
	this1[0] = 0;
	this1[6] = 0;
	this1[12] = 0;
	return lime_math__$ColorMatrix_ColorMatrix_$Impl_$.get_color(this1);
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.get_greenMultiplier = function(this1) {
	return this1[6];
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.set_greenMultiplier = function(this1,value) {
	return this1[6] = value;
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.get_greenOffset = function(this1) {
	return this1[9] * 255;
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.set_greenOffset = function(this1,value) {
	return this1[9] = value / 255;
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.get_redMultiplier = function(this1) {
	return this1[0];
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.set_redMultiplier = function(this1,value) {
	return this1[0] = value;
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.get_redOffset = function(this1) {
	return this1[4] * 255;
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.set_redOffset = function(this1,value) {
	return this1[4] = value / 255;
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.get = function(this1,index) {
	return this1[index];
};
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.set = function(this1,index,value) {
	return this1[index] = value;
};
var lime_math_Matrix3 = function(a,b,c,d,tx,ty) {
	if(ty == null) ty = 0;
	if(tx == null) tx = 0;
	if(d == null) d = 1;
	if(c == null) c = 0;
	if(b == null) b = 0;
	if(a == null) a = 1;
	this.a = a;
	this.b = b;
	this.c = c;
	this.d = d;
	this.tx = tx;
	this.ty = ty;
};
$hxClasses["lime.math.Matrix3"] = lime_math_Matrix3;
lime_math_Matrix3.__name__ = ["lime","math","Matrix3"];
lime_math_Matrix3.prototype = {
	a: null
	,b: null
	,c: null
	,d: null
	,tx: null
	,ty: null
	,clone: function() {
		return new lime_math_Matrix3(this.a,this.b,this.c,this.d,this.tx,this.ty);
	}
	,concat: function(m) {
		var a1 = this.a * m.a + this.b * m.c;
		this.b = this.a * m.b + this.b * m.d;
		this.a = a1;
		var c1 = this.c * m.a + this.d * m.c;
		this.d = this.c * m.b + this.d * m.d;
		this.c = c1;
		var tx1 = this.tx * m.a + this.ty * m.c + m.tx;
		this.ty = this.tx * m.b + this.ty * m.d + m.ty;
		this.tx = tx1;
	}
	,copyColumnFrom: function(column,vector4) {
		if(column > 2) throw new js__$Boot_HaxeError("Column " + column + " out of bounds (2)"); else if(column == 0) {
			this.a = vector4.x;
			this.c = vector4.y;
		} else if(column == 1) {
			this.b = vector4.x;
			this.d = vector4.y;
		} else {
			this.tx = vector4.x;
			this.ty = vector4.y;
		}
	}
	,copyColumnTo: function(column,vector4) {
		if(column > 2) throw new js__$Boot_HaxeError("Column " + column + " out of bounds (2)"); else if(column == 0) {
			vector4.x = this.a;
			vector4.y = this.c;
			vector4.z = 0;
		} else if(column == 1) {
			vector4.x = this.b;
			vector4.y = this.d;
			vector4.z = 0;
		} else {
			vector4.x = this.tx;
			vector4.y = this.ty;
			vector4.z = 1;
		}
	}
	,copyFrom: function(sourceMatrix3) {
		this.a = sourceMatrix3.a;
		this.b = sourceMatrix3.b;
		this.c = sourceMatrix3.c;
		this.d = sourceMatrix3.d;
		this.tx = sourceMatrix3.tx;
		this.ty = sourceMatrix3.ty;
	}
	,copyRowFrom: function(row,vector4) {
		if(row > 2) throw new js__$Boot_HaxeError("Row " + row + " out of bounds (2)"); else if(row == 0) {
			this.a = vector4.x;
			this.c = vector4.y;
		} else if(row == 1) {
			this.b = vector4.x;
			this.d = vector4.y;
		} else {
			this.tx = vector4.x;
			this.ty = vector4.y;
		}
	}
	,copyRowTo: function(row,vector4) {
		if(row > 2) throw new js__$Boot_HaxeError("Row " + row + " out of bounds (2)"); else if(row == 0) {
			vector4.x = this.a;
			vector4.y = this.b;
			vector4.z = this.tx;
		} else if(row == 1) {
			vector4.x = this.c;
			vector4.y = this.d;
			vector4.z = this.ty;
		} else {
			vector4.x = 0;
			vector4.y = 0;
			vector4.z = 1;
		}
	}
	,createBox: function(scaleX,scaleY,rotation,tx,ty) {
		if(ty == null) ty = 0;
		if(tx == null) tx = 0;
		if(rotation == null) rotation = 0;
		this.a = scaleX;
		this.d = scaleY;
		this.b = rotation;
		this.tx = tx;
		this.ty = ty;
	}
	,createGradientBox: function(width,height,rotation,tx,ty) {
		if(ty == null) ty = 0;
		if(tx == null) tx = 0;
		if(rotation == null) rotation = 0;
		this.a = width / 1638.4;
		this.d = height / 1638.4;
		if(rotation != 0) {
			var cos = Math.cos(rotation);
			var sin = Math.sin(rotation);
			this.b = sin * this.d;
			this.c = -sin * this.a;
			this.a *= cos;
			this.d *= cos;
		} else {
			this.b = 0;
			this.c = 0;
		}
		this.tx = tx + width / 2;
		this.ty = ty + height / 2;
	}
	,equals: function(Matrix3) {
		return Matrix3 != null && this.tx == Matrix3.tx && this.ty == Matrix3.ty && this.a == Matrix3.a && this.b == Matrix3.b && this.c == Matrix3.c && this.d == Matrix3.d;
	}
	,deltaTransformVector2: function(Vector2) {
		return new lime_math_Vector2(Vector2.x * this.a + Vector2.y * this.c,Vector2.x * this.b + Vector2.y * this.d);
	}
	,identity: function() {
		this.a = 1;
		this.b = 0;
		this.c = 0;
		this.d = 1;
		this.tx = 0;
		this.ty = 0;
	}
	,invert: function() {
		var norm = this.a * this.d - this.b * this.c;
		if(norm == 0) {
			this.a = this.b = this.c = this.d = 0;
			this.tx = -this.tx;
			this.ty = -this.ty;
		} else {
			norm = 1.0 / norm;
			var a1 = this.d * norm;
			this.d = this.a * norm;
			this.a = a1;
			this.b *= -norm;
			this.c *= -norm;
			var tx1 = -this.a * this.tx - this.c * this.ty;
			this.ty = -this.b * this.tx - this.d * this.ty;
			this.tx = tx1;
		}
		return this;
	}
	,mult: function(m) {
		var result = new lime_math_Matrix3(this.a,this.b,this.c,this.d,this.tx,this.ty);
		result.concat(m);
		return result;
	}
	,rotate: function(theta) {
		var cos = Math.cos(theta);
		var sin = Math.sin(theta);
		var a1 = this.a * cos - this.b * sin;
		this.b = this.a * sin + this.b * cos;
		this.a = a1;
		var c1 = this.c * cos - this.d * sin;
		this.d = this.c * sin + this.d * cos;
		this.c = c1;
		var tx1 = this.tx * cos - this.ty * sin;
		this.ty = this.tx * sin + this.ty * cos;
		this.tx = tx1;
	}
	,scale: function(sx,sy) {
		this.a *= sx;
		this.b *= sy;
		this.c *= sx;
		this.d *= sy;
		this.tx *= sx;
		this.ty *= sy;
	}
	,setRotation: function(theta,scale) {
		if(scale == null) scale = 1;
		this.a = Math.cos(theta) * scale;
		this.c = Math.sin(theta) * scale;
		this.b = -this.c;
		this.d = this.a;
	}
	,setTo: function(a,b,c,d,tx,ty) {
		this.a = a;
		this.b = b;
		this.c = c;
		this.d = d;
		this.tx = tx;
		this.ty = ty;
	}
	,to3DString: function(roundPixels) {
		if(roundPixels == null) roundPixels = false;
		if(roundPixels) return "Matrix33d(" + this.a + ", " + this.b + ", " + "0, 0, " + this.c + ", " + this.d + ", " + "0, 0, 0, 0, 1, 0, " + (this.tx | 0) + ", " + (this.ty | 0) + ", 0, 1)"; else return "Matrix33d(" + this.a + ", " + this.b + ", " + "0, 0, " + this.c + ", " + this.d + ", " + "0, 0, 0, 0, 1, 0, " + this.tx + ", " + this.ty + ", 0, 1)";
	}
	,toMozString: function() {
		return "Matrix3(" + this.a + ", " + this.b + ", " + this.c + ", " + this.d + ", " + this.tx + "px, " + this.ty + "px)";
	}
	,toString: function() {
		return "Matrix3(" + this.a + ", " + this.b + ", " + this.c + ", " + this.d + ", " + this.tx + ", " + this.ty + ")";
	}
	,transformVector2: function(pos) {
		return new lime_math_Vector2(pos.x * this.a + pos.y * this.c + this.tx,pos.x * this.b + pos.y * this.d + this.ty);
	}
	,translate: function(dx,dy) {
		this.tx += dx;
		this.ty += dy;
	}
	,__cleanValues: function() {
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.tx = Math.round(this.tx * 10) / 10;
		this.ty = Math.round(this.ty * 10) / 10;
	}
	,__transformX: function(pos) {
		return pos.x * this.a + pos.y * this.c + this.tx;
	}
	,__transformY: function(pos) {
		return pos.x * this.b + pos.y * this.d + this.ty;
	}
	,__translateTransformed: function(pos) {
		this.tx = pos.x * this.a + pos.y * this.c + this.tx;
		this.ty = pos.x * this.b + pos.y * this.d + this.ty;
	}
	,__class__: lime_math_Matrix3
};
var lime_math__$Matrix4_Matrix4_$Impl_$ = {};
$hxClasses["lime.math._Matrix4.Matrix4_Impl_"] = lime_math__$Matrix4_Matrix4_$Impl_$;
lime_math__$Matrix4_Matrix4_$Impl_$.__name__ = ["lime","math","_Matrix4","Matrix4_Impl_"];
lime_math__$Matrix4_Matrix4_$Impl_$._new = function(data) {
	var this1;
	if(data != null && data.length == 16) this1 = data; else {
		var array = lime_math__$Matrix4_Matrix4_$Impl_$.__identity;
		var this2;
		if(array != null) this2 = new Float32Array(array); else this2 = null;
		this1 = this2;
	}
	return this1;
};
lime_math__$Matrix4_Matrix4_$Impl_$.append = function(this1,lhs) {
	var m111 = this1[0];
	var m121 = this1[4];
	var m131 = this1[8];
	var m141 = this1[12];
	var m112 = this1[1];
	var m122 = this1[5];
	var m132 = this1[9];
	var m142 = this1[13];
	var m113 = this1[2];
	var m123 = this1[6];
	var m133 = this1[10];
	var m143 = this1[14];
	var m114 = this1[3];
	var m124 = this1[7];
	var m134 = this1[11];
	var m144 = this1[15];
	var m211 = lime_math__$Matrix4_Matrix4_$Impl_$.get(lhs,0);
	var m221 = lime_math__$Matrix4_Matrix4_$Impl_$.get(lhs,4);
	var m231 = lime_math__$Matrix4_Matrix4_$Impl_$.get(lhs,8);
	var m241 = lime_math__$Matrix4_Matrix4_$Impl_$.get(lhs,12);
	var m212 = lime_math__$Matrix4_Matrix4_$Impl_$.get(lhs,1);
	var m222 = lime_math__$Matrix4_Matrix4_$Impl_$.get(lhs,5);
	var m232 = lime_math__$Matrix4_Matrix4_$Impl_$.get(lhs,9);
	var m242 = lime_math__$Matrix4_Matrix4_$Impl_$.get(lhs,13);
	var m213 = lime_math__$Matrix4_Matrix4_$Impl_$.get(lhs,2);
	var m223 = lime_math__$Matrix4_Matrix4_$Impl_$.get(lhs,6);
	var m233 = lime_math__$Matrix4_Matrix4_$Impl_$.get(lhs,10);
	var m243 = lime_math__$Matrix4_Matrix4_$Impl_$.get(lhs,14);
	var m214 = lime_math__$Matrix4_Matrix4_$Impl_$.get(lhs,3);
	var m224 = lime_math__$Matrix4_Matrix4_$Impl_$.get(lhs,7);
	var m234 = lime_math__$Matrix4_Matrix4_$Impl_$.get(lhs,11);
	var m244 = lime_math__$Matrix4_Matrix4_$Impl_$.get(lhs,15);
	this1[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
	this1[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
	this1[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
	this1[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;
	this1[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
	this1[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
	this1[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
	this1[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;
	this1[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
	this1[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
	this1[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
	this1[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;
	this1[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
	this1[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
	this1[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
	this1[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
};
lime_math__$Matrix4_Matrix4_$Impl_$.appendRotation = function(this1,degrees,axis,pivotPoint) {
	var m = lime_math__$Matrix4_Matrix4_$Impl_$.getAxisRotation(axis.x,axis.y,axis.z,degrees);
	if(pivotPoint != null) {
		var p = pivotPoint;
		lime_math__$Matrix4_Matrix4_$Impl_$.appendTranslation(m,p.x,p.y,p.z);
	}
	lime_math__$Matrix4_Matrix4_$Impl_$.append(this1,m);
};
lime_math__$Matrix4_Matrix4_$Impl_$.appendScale = function(this1,xScale,yScale,zScale) {
	lime_math__$Matrix4_Matrix4_$Impl_$.append(this1,lime_math__$Matrix4_Matrix4_$Impl_$._new((function($this) {
		var $r;
		var array = [xScale,0.0,0.0,0.0,0.0,yScale,0.0,0.0,0.0,0.0,zScale,0.0,0.0,0.0,0.0,1.0];
		var this2;
		if(array != null) this2 = new Float32Array(array); else this2 = null;
		$r = this2;
		return $r;
	}(this))));
};
lime_math__$Matrix4_Matrix4_$Impl_$.appendTranslation = function(this1,x,y,z) {
	this1[12] = this1[12] + x;
	this1[13] = this1[13] + y;
	this1[14] = this1[14] + z;
};
lime_math__$Matrix4_Matrix4_$Impl_$.clone = function(this1) {
	return lime_math__$Matrix4_Matrix4_$Impl_$._new((function($this) {
		var $r;
		var this2;
		if(this1 != null) this2 = new Float32Array(this1); else this2 = null;
		$r = this2;
		return $r;
	}(this)));
};
lime_math__$Matrix4_Matrix4_$Impl_$.copyColumnFrom = function(this1,column,vector) {
	switch(column) {
	case 0:
		this1[0] = vector.x;
		this1[1] = vector.y;
		this1[2] = vector.z;
		this1[3] = vector.w;
		break;
	case 1:
		this1[4] = vector.x;
		this1[5] = vector.y;
		this1[6] = vector.z;
		this1[7] = vector.w;
		break;
	case 2:
		this1[8] = vector.x;
		this1[9] = vector.y;
		this1[10] = vector.z;
		this1[11] = vector.w;
		break;
	case 3:
		this1[12] = vector.x;
		this1[13] = vector.y;
		this1[14] = vector.z;
		this1[15] = vector.w;
		break;
	default:
		throw new js__$Boot_HaxeError("Error, Column " + column + " out of bounds [0, ..., 3]");
	}
};
lime_math__$Matrix4_Matrix4_$Impl_$.copyColumnTo = function(this1,column,vector) {
	switch(column) {
	case 0:
		vector.x = this1[0];
		vector.y = this1[1];
		vector.z = this1[2];
		vector.w = this1[3];
		break;
	case 1:
		vector.x = this1[4];
		vector.y = this1[5];
		vector.z = this1[6];
		vector.w = this1[7];
		break;
	case 2:
		vector.x = this1[8];
		vector.y = this1[9];
		vector.z = this1[10];
		vector.w = this1[11];
		break;
	case 3:
		vector.x = this1[12];
		vector.y = this1[13];
		vector.z = this1[14];
		vector.w = this1[15];
		break;
	default:
		throw new js__$Boot_HaxeError("Error, Column " + column + " out of bounds [0, ..., 3]");
	}
};
lime_math__$Matrix4_Matrix4_$Impl_$.copyFrom = function(this1,other) {
	this1.set(other);
};
lime_math__$Matrix4_Matrix4_$Impl_$.copythisFrom = function(this1,array,index,transposeValues) {
	if(transposeValues == null) transposeValues = false;
	if(index == null) index = 0;
	if(transposeValues) lime_math__$Matrix4_Matrix4_$Impl_$.transpose(this1);
	var l = array.length - index;
	var _g = 0;
	while(_g < l) {
		var c = _g++;
		this1[c] = array[c + index];
	}
	if(transposeValues) lime_math__$Matrix4_Matrix4_$Impl_$.transpose(this1);
};
lime_math__$Matrix4_Matrix4_$Impl_$.copythisTo = function(this1,array,index,transposeValues) {
	if(transposeValues == null) transposeValues = false;
	if(index == null) index = 0;
	if(transposeValues) lime_math__$Matrix4_Matrix4_$Impl_$.transpose(this1);
	var l = this1.length;
	var _g = 0;
	while(_g < l) {
		var c = _g++;
		array[c + index] = this1[c];
	}
	if(transposeValues) lime_math__$Matrix4_Matrix4_$Impl_$.transpose(this1);
};
lime_math__$Matrix4_Matrix4_$Impl_$.copyRowFrom = function(this1,row,vector) {
	switch(row) {
	case 0:
		this1[0] = vector.x;
		this1[4] = vector.y;
		this1[8] = vector.z;
		this1[12] = vector.w;
		break;
	case 1:
		this1[1] = vector.x;
		this1[5] = vector.y;
		this1[9] = vector.z;
		this1[13] = vector.w;
		break;
	case 2:
		this1[2] = vector.x;
		this1[6] = vector.y;
		this1[10] = vector.z;
		this1[14] = vector.w;
		break;
	case 3:
		this1[3] = vector.x;
		this1[7] = vector.y;
		this1[11] = vector.z;
		this1[15] = vector.w;
		break;
	default:
		throw new js__$Boot_HaxeError("Error, Row " + Std.string(_$UInt_UInt_$Impl_$.toFloat(row)) + " out of bounds [0, ..., 3]");
	}
};
lime_math__$Matrix4_Matrix4_$Impl_$.create2D = function(x,y,scale,rotation) {
	if(rotation == null) rotation = 0;
	if(scale == null) scale = 1;
	var theta = rotation * Math.PI / 180.0;
	var c = Math.cos(theta);
	var s = Math.sin(theta);
	return lime_math__$Matrix4_Matrix4_$Impl_$._new((function($this) {
		var $r;
		var array = [c * scale,-s * scale,0,0,s * scale,c * scale,0,0,0,0,1,0,x,y,0,1];
		var this1;
		if(array != null) this1 = new Float32Array(array); else this1 = null;
		$r = this1;
		return $r;
	}(this)));
};
lime_math__$Matrix4_Matrix4_$Impl_$.createABCD = function(a,b,c,d,tx,ty) {
	return lime_math__$Matrix4_Matrix4_$Impl_$._new((function($this) {
		var $r;
		var array = [a,b,0,0,c,d,0,0,0,0,1,0,tx,ty,0,1];
		var this1;
		if(array != null) this1 = new Float32Array(array); else this1 = null;
		$r = this1;
		return $r;
	}(this)));
};
lime_math__$Matrix4_Matrix4_$Impl_$.createOrtho = function(x0,x1,y0,y1,zNear,zFar) {
	var sx = 1.0 / (x1 - x0);
	var sy = 1.0 / (y1 - y0);
	var sz = 1.0 / (zFar - zNear);
	return lime_math__$Matrix4_Matrix4_$Impl_$._new((function($this) {
		var $r;
		var array = [2.0 * sx,0,0,0,0,2.0 * sy,0,0,0,0,-2. * sz,0,-(x0 + x1) * sx,-(y0 + y1) * sy,-(zNear + zFar) * sz,1];
		var this1;
		if(array != null) this1 = new Float32Array(array); else this1 = null;
		$r = this1;
		return $r;
	}(this)));
};
lime_math__$Matrix4_Matrix4_$Impl_$.copyRowTo = function(this1,row,vector) {
	switch(row) {
	case 0:
		vector.x = this1[0];
		vector.y = this1[4];
		vector.z = this1[8];
		vector.w = this1[12];
		break;
	case 1:
		vector.x = this1[1];
		vector.y = this1[5];
		vector.z = this1[9];
		vector.w = this1[13];
		break;
	case 2:
		vector.x = this1[2];
		vector.y = this1[6];
		vector.z = this1[10];
		vector.w = this1[14];
		break;
	case 3:
		vector.x = this1[3];
		vector.y = this1[7];
		vector.z = this1[11];
		vector.w = this1[15];
		break;
	default:
		throw new js__$Boot_HaxeError("Error, Row " + row + " out of bounds [0, ..., 3]");
	}
};
lime_math__$Matrix4_Matrix4_$Impl_$.copyToMatrix4 = function(this1,other) {
	(js_Boot.__cast(other , Float32Array)).set(this1);
};
lime_math__$Matrix4_Matrix4_$Impl_$.deltaTransformVector = function(this1,v) {
	var x = v.x;
	var y = v.y;
	var z = v.z;
	return new lime_math_Vector4(x * this1[0] + y * this1[4] + z * this1[8] + this1[3],x * this1[1] + y * this1[5] + z * this1[9] + this1[7],x * this1[2] + y * this1[6] + z * this1[10] + this1[11],0);
};
lime_math__$Matrix4_Matrix4_$Impl_$.identity = function(this1) {
	this1[0] = 1;
	this1[1] = 0;
	this1[2] = 0;
	this1[3] = 0;
	this1[4] = 0;
	this1[5] = 1;
	this1[6] = 0;
	this1[7] = 0;
	this1[8] = 0;
	this1[9] = 0;
	this1[10] = 1;
	this1[11] = 0;
	this1[12] = 0;
	this1[13] = 0;
	this1[14] = 0;
	this1[15] = 1;
};
lime_math__$Matrix4_Matrix4_$Impl_$.interpolate = function(thisMat,toMat,percent) {
	var m = lime_math__$Matrix4_Matrix4_$Impl_$._new();
	var _g = 0;
	while(_g < 16) {
		var i = _g++;
		lime_math__$Matrix4_Matrix4_$Impl_$.set(m,i,lime_math__$Matrix4_Matrix4_$Impl_$.get(thisMat,i) + (lime_math__$Matrix4_Matrix4_$Impl_$.get(toMat,i) - lime_math__$Matrix4_Matrix4_$Impl_$.get(thisMat,i)) * percent);
	}
	return m;
};
lime_math__$Matrix4_Matrix4_$Impl_$.interpolateTo = function(this1,toMat,percent) {
	var _g = 0;
	while(_g < 16) {
		var i = _g++;
		var val = this1[i] + (lime_math__$Matrix4_Matrix4_$Impl_$.get(toMat,i) - this1[i]) * percent;
		this1[i] = val;
	}
};
lime_math__$Matrix4_Matrix4_$Impl_$.invert = function(this1) {
	var d = lime_math__$Matrix4_Matrix4_$Impl_$.get_determinant(this1);
	var invertable = Math.abs(d) > 0.00000000001;
	if(invertable) {
		d = 1 / d;
		var m11 = this1[0];
		var m21 = this1[4];
		var m31 = this1[8];
		var m41 = this1[12];
		var m12 = this1[1];
		var m22 = this1[5];
		var m32 = this1[9];
		var m42 = this1[13];
		var m13 = this1[2];
		var m23 = this1[6];
		var m33 = this1[10];
		var m43 = this1[14];
		var m14 = this1[3];
		var m24 = this1[7];
		var m34 = this1[11];
		var m44 = this1[15];
		this1[0] = d * (m22 * (m33 * m44 - m43 * m34) - m32 * (m23 * m44 - m43 * m24) + m42 * (m23 * m34 - m33 * m24));
		this1[1] = -d * (m12 * (m33 * m44 - m43 * m34) - m32 * (m13 * m44 - m43 * m14) + m42 * (m13 * m34 - m33 * m14));
		this1[2] = d * (m12 * (m23 * m44 - m43 * m24) - m22 * (m13 * m44 - m43 * m14) + m42 * (m13 * m24 - m23 * m14));
		this1[3] = -d * (m12 * (m23 * m34 - m33 * m24) - m22 * (m13 * m34 - m33 * m14) + m32 * (m13 * m24 - m23 * m14));
		this1[4] = -d * (m21 * (m33 * m44 - m43 * m34) - m31 * (m23 * m44 - m43 * m24) + m41 * (m23 * m34 - m33 * m24));
		this1[5] = d * (m11 * (m33 * m44 - m43 * m34) - m31 * (m13 * m44 - m43 * m14) + m41 * (m13 * m34 - m33 * m14));
		this1[6] = -d * (m11 * (m23 * m44 - m43 * m24) - m21 * (m13 * m44 - m43 * m14) + m41 * (m13 * m24 - m23 * m14));
		this1[7] = d * (m11 * (m23 * m34 - m33 * m24) - m21 * (m13 * m34 - m33 * m14) + m31 * (m13 * m24 - m23 * m14));
		this1[8] = d * (m21 * (m32 * m44 - m42 * m34) - m31 * (m22 * m44 - m42 * m24) + m41 * (m22 * m34 - m32 * m24));
		this1[9] = -d * (m11 * (m32 * m44 - m42 * m34) - m31 * (m12 * m44 - m42 * m14) + m41 * (m12 * m34 - m32 * m14));
		this1[10] = d * (m11 * (m22 * m44 - m42 * m24) - m21 * (m12 * m44 - m42 * m14) + m41 * (m12 * m24 - m22 * m14));
		this1[11] = -d * (m11 * (m22 * m34 - m32 * m24) - m21 * (m12 * m34 - m32 * m14) + m31 * (m12 * m24 - m22 * m14));
		this1[12] = -d * (m21 * (m32 * m43 - m42 * m33) - m31 * (m22 * m43 - m42 * m23) + m41 * (m22 * m33 - m32 * m23));
		this1[13] = d * (m11 * (m32 * m43 - m42 * m33) - m31 * (m12 * m43 - m42 * m13) + m41 * (m12 * m33 - m32 * m13));
		this1[14] = -d * (m11 * (m22 * m43 - m42 * m23) - m21 * (m12 * m43 - m42 * m13) + m41 * (m12 * m23 - m22 * m13));
		this1[15] = d * (m11 * (m22 * m33 - m32 * m23) - m21 * (m12 * m33 - m32 * m13) + m31 * (m12 * m23 - m22 * m13));
	}
	return invertable;
};
lime_math__$Matrix4_Matrix4_$Impl_$.pointAt = function(this1,pos,at,up) {
	if(at == null) at = new lime_math_Vector4(0,0,-1);
	if(up == null) up = new lime_math_Vector4(0,-1,0);
	var dir = new lime_math_Vector4(at.x - pos.x,at.y - pos.y,at.z - pos.z);
	var vup = new lime_math_Vector4(up.x,up.y,up.z,up.w);
	var right;
	dir.normalize();
	vup.normalize();
	var dir2 = new lime_math_Vector4(dir.x,dir.y,dir.z,dir.w);
	dir2.scaleBy(vup.x * dir.x + vup.y * dir.y + vup.z * dir.z);
	vup = new lime_math_Vector4(vup.x - dir2.x,vup.y - dir2.y,vup.z - dir2.z);
	if(Math.sqrt(vup.x * vup.x + vup.y * vup.y + vup.z * vup.z) > 0) vup.normalize(); else if(dir.x != 0) vup = new lime_math_Vector4(-dir.y,dir.x,0); else vup = new lime_math_Vector4(1,0,0);
	right = new lime_math_Vector4(vup.y * dir.z - vup.z * dir.y,vup.z * dir.x - vup.x * dir.z,vup.x * dir.y - vup.y * dir.x,1);
	right.normalize();
	this1[0] = right.x;
	this1[4] = right.y;
	this1[8] = right.z;
	this1[12] = 0.0;
	this1[1] = vup.x;
	this1[5] = vup.y;
	this1[9] = vup.z;
	this1[13] = 0.0;
	this1[2] = dir.x;
	this1[6] = dir.y;
	this1[10] = dir.z;
	this1[14] = 0.0;
	this1[3] = pos.x;
	this1[7] = pos.y;
	this1[11] = pos.z;
	this1[15] = 1.0;
};
lime_math__$Matrix4_Matrix4_$Impl_$.prepend = function(this1,rhs) {
	var m111 = lime_math__$Matrix4_Matrix4_$Impl_$.get(rhs,0);
	var m121 = lime_math__$Matrix4_Matrix4_$Impl_$.get(rhs,4);
	var m131 = lime_math__$Matrix4_Matrix4_$Impl_$.get(rhs,8);
	var m141 = lime_math__$Matrix4_Matrix4_$Impl_$.get(rhs,12);
	var m112 = lime_math__$Matrix4_Matrix4_$Impl_$.get(rhs,1);
	var m122 = lime_math__$Matrix4_Matrix4_$Impl_$.get(rhs,5);
	var m132 = lime_math__$Matrix4_Matrix4_$Impl_$.get(rhs,9);
	var m142 = lime_math__$Matrix4_Matrix4_$Impl_$.get(rhs,13);
	var m113 = lime_math__$Matrix4_Matrix4_$Impl_$.get(rhs,2);
	var m123 = lime_math__$Matrix4_Matrix4_$Impl_$.get(rhs,6);
	var m133 = lime_math__$Matrix4_Matrix4_$Impl_$.get(rhs,10);
	var m143 = lime_math__$Matrix4_Matrix4_$Impl_$.get(rhs,14);
	var m114 = lime_math__$Matrix4_Matrix4_$Impl_$.get(rhs,3);
	var m124 = lime_math__$Matrix4_Matrix4_$Impl_$.get(rhs,7);
	var m134 = lime_math__$Matrix4_Matrix4_$Impl_$.get(rhs,11);
	var m144 = lime_math__$Matrix4_Matrix4_$Impl_$.get(rhs,15);
	var m211 = this1[0];
	var m221 = this1[4];
	var m231 = this1[8];
	var m241 = this1[12];
	var m212 = this1[1];
	var m222 = this1[5];
	var m232 = this1[9];
	var m242 = this1[13];
	var m213 = this1[2];
	var m223 = this1[6];
	var m233 = this1[10];
	var m243 = this1[14];
	var m214 = this1[3];
	var m224 = this1[7];
	var m234 = this1[11];
	var m244 = this1[15];
	this1[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
	this1[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
	this1[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
	this1[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;
	this1[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
	this1[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
	this1[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
	this1[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;
	this1[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
	this1[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
	this1[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
	this1[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;
	this1[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
	this1[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
	this1[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
	this1[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
};
lime_math__$Matrix4_Matrix4_$Impl_$.prependRotation = function(this1,degrees,axis,pivotPoint) {
	var m = lime_math__$Matrix4_Matrix4_$Impl_$.getAxisRotation(axis.x,axis.y,axis.z,degrees);
	if(pivotPoint != null) {
		var p = pivotPoint;
		lime_math__$Matrix4_Matrix4_$Impl_$.appendTranslation(m,p.x,p.y,p.z);
	}
	lime_math__$Matrix4_Matrix4_$Impl_$.prepend(this1,m);
};
lime_math__$Matrix4_Matrix4_$Impl_$.prependScale = function(this1,xScale,yScale,zScale) {
	lime_math__$Matrix4_Matrix4_$Impl_$.prepend(this1,lime_math__$Matrix4_Matrix4_$Impl_$._new((function($this) {
		var $r;
		var array = [xScale,0.0,0.0,0.0,0.0,yScale,0.0,0.0,0.0,0.0,zScale,0.0,0.0,0.0,0.0,1.0];
		var this2;
		if(array != null) this2 = new Float32Array(array); else this2 = null;
		$r = this2;
		return $r;
	}(this))));
};
lime_math__$Matrix4_Matrix4_$Impl_$.prependTranslation = function(this1,x,y,z) {
	var m = lime_math__$Matrix4_Matrix4_$Impl_$._new();
	lime_math__$Matrix4_Matrix4_$Impl_$.set_position(m,new lime_math_Vector4(x,y,z));
	lime_math__$Matrix4_Matrix4_$Impl_$.prepend(this1,m);
};
lime_math__$Matrix4_Matrix4_$Impl_$.transformVector = function(this1,v) {
	var x = v.x;
	var y = v.y;
	var z = v.z;
	return new lime_math_Vector4(x * this1[0] + y * this1[4] + z * this1[8] + this1[12],x * this1[1] + y * this1[5] + z * this1[9] + this1[13],x * this1[2] + y * this1[6] + z * this1[10] + this1[14],x * this1[3] + y * this1[7] + z * this1[11] + this1[15]);
};
lime_math__$Matrix4_Matrix4_$Impl_$.transformVectors = function(this1,ain,aout) {
	var i = 0;
	while(i + 3 <= ain.length) {
		var x = ain[i];
		var y = ain[i + 1];
		var z = ain[i + 2];
		aout[i] = x * this1[0] + y * this1[4] + z * this1[8] + this1[12];
		aout[i + 1] = x * this1[1] + y * this1[5] + z * this1[9] + this1[13];
		aout[i + 2] = x * this1[2] + y * this1[6] + z * this1[10] + this1[14];
		i += 3;
	}
};
lime_math__$Matrix4_Matrix4_$Impl_$.transpose = function(this1) {
	var othis;
	var this2;
	if(this1 != null) this2 = new Float32Array(this1); else this2 = null;
	othis = this2;
	this1[1] = othis[4];
	this1[2] = othis[8];
	this1[3] = othis[12];
	this1[4] = othis[1];
	this1[6] = othis[9];
	this1[7] = othis[13];
	this1[8] = othis[2];
	this1[9] = othis[6];
	this1[11] = othis[14];
	this1[12] = othis[3];
	this1[13] = othis[7];
	this1[14] = othis[11];
};
lime_math__$Matrix4_Matrix4_$Impl_$.getAxisRotation = function(x,y,z,degrees) {
	var m = lime_math__$Matrix4_Matrix4_$Impl_$._new();
	var a1 = new lime_math_Vector4(x,y,z);
	var rad = -degrees * (Math.PI / 180);
	var c = Math.cos(rad);
	var s = Math.sin(rad);
	var t = 1.0 - c;
	lime_math__$Matrix4_Matrix4_$Impl_$.set(m,0,c + a1.x * a1.x * t);
	lime_math__$Matrix4_Matrix4_$Impl_$.set(m,5,c + a1.y * a1.y * t);
	lime_math__$Matrix4_Matrix4_$Impl_$.set(m,10,c + a1.z * a1.z * t);
	var tmp1 = a1.x * a1.y * t;
	var tmp2 = a1.z * s;
	lime_math__$Matrix4_Matrix4_$Impl_$.set(m,4,tmp1 + tmp2);
	lime_math__$Matrix4_Matrix4_$Impl_$.set(m,1,tmp1 - tmp2);
	tmp1 = a1.x * a1.z * t;
	tmp2 = a1.y * s;
	lime_math__$Matrix4_Matrix4_$Impl_$.set(m,8,tmp1 - tmp2);
	lime_math__$Matrix4_Matrix4_$Impl_$.set(m,2,tmp1 + tmp2);
	tmp1 = a1.y * a1.z * t;
	tmp2 = a1.x * s;
	lime_math__$Matrix4_Matrix4_$Impl_$.set(m,9,tmp1 + tmp2);
	lime_math__$Matrix4_Matrix4_$Impl_$.set(m,6,tmp1 - tmp2);
	return m;
};
lime_math__$Matrix4_Matrix4_$Impl_$.get_determinant = function(this1) {
	return (this1[0] * this1[5] - this1[4] * this1[1]) * (this1[10] * this1[15] - this1[14] * this1[11]) - (this1[0] * this1[9] - this1[8] * this1[1]) * (this1[6] * this1[15] - this1[14] * this1[7]) + (this1[0] * this1[13] - this1[12] * this1[1]) * (this1[6] * this1[11] - this1[10] * this1[7]) + (this1[4] * this1[9] - this1[8] * this1[5]) * (this1[2] * this1[15] - this1[14] * this1[3]) - (this1[4] * this1[13] - this1[12] * this1[5]) * (this1[2] * this1[11] - this1[10] * this1[3]) + (this1[8] * this1[13] - this1[12] * this1[9]) * (this1[2] * this1[7] - this1[6] * this1[3]);
};
lime_math__$Matrix4_Matrix4_$Impl_$.get_position = function(this1) {
	return new lime_math_Vector4(this1[12],this1[13],this1[14]);
};
lime_math__$Matrix4_Matrix4_$Impl_$.set_position = function(this1,val) {
	this1[12] = val.x;
	this1[13] = val.y;
	this1[14] = val.z;
	return val;
};
lime_math__$Matrix4_Matrix4_$Impl_$.get = function(this1,index) {
	return this1[index];
};
lime_math__$Matrix4_Matrix4_$Impl_$.set = function(this1,index,value) {
	this1[index] = value;
	return value;
};
var lime_math_Rectangle = function(x,y,width,height) {
	if(height == null) height = 0;
	if(width == null) width = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};
$hxClasses["lime.math.Rectangle"] = lime_math_Rectangle;
lime_math_Rectangle.__name__ = ["lime","math","Rectangle"];
lime_math_Rectangle.prototype = {
	height: null
	,width: null
	,x: null
	,y: null
	,clone: function() {
		return new lime_math_Rectangle(this.x,this.y,this.width,this.height);
	}
	,contains: function(x,y) {
		return x >= this.x && y >= this.y && x < this.get_right() && y < this.get_bottom();
	}
	,containsPoint: function(point) {
		return this.contains(point.x,point.y);
	}
	,containsRect: function(rect) {
		if(rect.width <= 0 || rect.height <= 0) return rect.x > this.x && rect.y > this.y && rect.get_right() < this.get_right() && rect.get_bottom() < this.get_bottom(); else return rect.x >= this.x && rect.y >= this.y && rect.get_right() <= this.get_right() && rect.get_bottom() <= this.get_bottom();
	}
	,copyFrom: function(sourceRect) {
		this.x = sourceRect.x;
		this.y = sourceRect.y;
		this.width = sourceRect.width;
		this.height = sourceRect.height;
	}
	,equals: function(toCompare) {
		return toCompare != null && this.x == toCompare.x && this.y == toCompare.y && this.width == toCompare.width && this.height == toCompare.height;
	}
	,inflate: function(dx,dy) {
		this.x -= dx;
		this.width += dx * 2;
		this.y -= dy;
		this.height += dy * 2;
	}
	,inflatePoint: function(point) {
		this.inflate(point.x,point.y);
	}
	,intersection: function(toIntersect) {
		var x0;
		if(this.x < toIntersect.x) x0 = toIntersect.x; else x0 = this.x;
		var x1;
		if(this.get_right() > toIntersect.get_right()) x1 = toIntersect.get_right(); else x1 = this.get_right();
		if(x1 <= x0) return new lime_math_Rectangle();
		var y0;
		if(this.y < toIntersect.y) y0 = toIntersect.y; else y0 = this.y;
		var y1;
		if(this.get_bottom() > toIntersect.get_bottom()) y1 = toIntersect.get_bottom(); else y1 = this.get_bottom();
		if(y1 <= y0) return new lime_math_Rectangle();
		return new lime_math_Rectangle(x0,y0,x1 - x0,y1 - y0);
	}
	,intersects: function(toIntersect) {
		var x0;
		if(this.x < toIntersect.x) x0 = toIntersect.x; else x0 = this.x;
		var x1;
		if(this.get_right() > toIntersect.get_right()) x1 = toIntersect.get_right(); else x1 = this.get_right();
		if(x1 <= x0) return false;
		var y0;
		if(this.y < toIntersect.y) y0 = toIntersect.y; else y0 = this.y;
		var y1;
		if(this.get_bottom() > toIntersect.get_bottom()) y1 = toIntersect.get_bottom(); else y1 = this.get_bottom();
		return y1 > y0;
	}
	,isEmpty: function() {
		return this.width <= 0 || this.height <= 0;
	}
	,offset: function(dx,dy) {
		this.x += dx;
		this.y += dy;
	}
	,offsetPoint: function(point) {
		this.x += point.x;
		this.y += point.y;
	}
	,setEmpty: function() {
		this.x = this.y = this.width = this.height = 0;
	}
	,setTo: function(xa,ya,widtha,heighta) {
		this.x = xa;
		this.y = ya;
		this.width = widtha;
		this.height = heighta;
	}
	,transform: function(m) {
		var tx0 = m.a * this.x + m.c * this.y;
		var tx1 = tx0;
		var ty0 = m.b * this.x + m.d * this.y;
		var ty1 = ty0;
		var tx = m.a * (this.x + this.width) + m.c * this.y;
		var ty = m.b * (this.x + this.width) + m.d * this.y;
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		tx = m.a * (this.x + this.width) + m.c * (this.y + this.height);
		ty = m.b * (this.x + this.width) + m.d * (this.y + this.height);
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		tx = m.a * this.x + m.c * (this.y + this.height);
		ty = m.b * this.x + m.d * (this.y + this.height);
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		return new lime_math_Rectangle(tx0 + m.tx,ty0 + m.ty,tx1 - tx0,ty1 - ty0);
	}
	,union: function(toUnion) {
		if(this.width == 0 || this.height == 0) return toUnion.clone(); else if(toUnion.width == 0 || toUnion.height == 0) return this.clone();
		var x0;
		if(this.x > toUnion.x) x0 = toUnion.x; else x0 = this.x;
		var x1;
		if(this.get_right() < toUnion.get_right()) x1 = toUnion.get_right(); else x1 = this.get_right();
		var y0;
		if(this.y > toUnion.y) y0 = toUnion.y; else y0 = this.y;
		var y1;
		if(this.get_bottom() < toUnion.get_bottom()) y1 = toUnion.get_bottom(); else y1 = this.get_bottom();
		return new lime_math_Rectangle(x0,y0,x1 - x0,y1 - y0);
	}
	,__contract: function(x,y,width,height) {
		if(this.width == 0 && this.height == 0) return;
		if(this.x < x) this.x = x;
		if(this.y < y) this.y = y;
		if(this.get_right() > x + width) this.width = x + width - this.x;
		if(this.get_bottom() > y + height) this.height = y + height - this.y;
	}
	,__expand: function(x,y,width,height) {
		if(this.width == 0 && this.height == 0) {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			return;
		}
		var cacheRight = this.get_right();
		var cacheBottom = this.get_bottom();
		if(this.x > x) this.x = x;
		if(this.y > y) this.y = y;
		if(cacheRight < x + width) this.width = x + width - this.x;
		if(cacheBottom < y + height) this.height = y + height - this.y;
	}
	,__toFlashRectangle: function() {
		return null;
	}
	,get_bottom: function() {
		return this.y + this.height;
	}
	,set_bottom: function(b) {
		this.height = b - this.y;
		return b;
	}
	,get_bottomRight: function() {
		return new lime_math_Vector2(this.x + this.width,this.y + this.height);
	}
	,set_bottomRight: function(p) {
		this.width = p.x - this.x;
		this.height = p.y - this.y;
		return p.clone();
	}
	,get_left: function() {
		return this.x;
	}
	,set_left: function(l) {
		this.width -= l - this.x;
		this.x = l;
		return l;
	}
	,get_right: function() {
		return this.x + this.width;
	}
	,set_right: function(r) {
		this.width = r - this.x;
		return r;
	}
	,get_size: function() {
		return new lime_math_Vector2(this.width,this.height);
	}
	,set_size: function(p) {
		this.width = p.x;
		this.height = p.y;
		return p.clone();
	}
	,get_top: function() {
		return this.y;
	}
	,set_top: function(t) {
		this.height -= t - this.y;
		this.y = t;
		return t;
	}
	,get_topLeft: function() {
		return new lime_math_Vector2(this.x,this.y);
	}
	,set_topLeft: function(p) {
		this.x = p.x;
		this.y = p.y;
		return p.clone();
	}
	,__class__: lime_math_Rectangle
};
var lime_math_Vector2 = function(x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
};
$hxClasses["lime.math.Vector2"] = lime_math_Vector2;
lime_math_Vector2.__name__ = ["lime","math","Vector2"];
lime_math_Vector2.distance = function(pt1,pt2) {
	var dx = pt1.x - pt2.x;
	var dy = pt1.y - pt2.y;
	return Math.sqrt(dx * dx + dy * dy);
};
lime_math_Vector2.interpolate = function(pt1,pt2,f) {
	return new lime_math_Vector2(pt2.x + f * (pt1.x - pt2.x),pt2.y + f * (pt1.y - pt2.y));
};
lime_math_Vector2.polar = function(len,angle) {
	return new lime_math_Vector2(len * Math.cos(angle),len * Math.sin(angle));
};
lime_math_Vector2.prototype = {
	length: null
	,x: null
	,y: null
	,add: function(v) {
		return new lime_math_Vector2(v.x + this.x,v.y + this.y);
	}
	,clone: function() {
		return new lime_math_Vector2(this.x,this.y);
	}
	,equals: function(toCompare) {
		return toCompare != null && toCompare.x == this.x && toCompare.y == this.y;
	}
	,normalize: function(thickness) {
		if(this.x == 0 && this.y == 0) return; else {
			var norm = thickness / Math.sqrt(this.x * this.x + this.y * this.y);
			this.x *= norm;
			this.y *= norm;
		}
	}
	,offset: function(dx,dy) {
		this.x += dx;
		this.y += dy;
	}
	,setTo: function(xa,ya) {
		this.x = xa;
		this.y = ya;
	}
	,subtract: function(v) {
		return new lime_math_Vector2(this.x - v.x,this.y - v.y);
	}
	,__toFlashPoint: function() {
		return null;
	}
	,get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	,__class__: lime_math_Vector2
};
var lime_math_Vector4 = function(x,y,z,w) {
	if(w == null) w = 0.;
	if(z == null) z = 0.;
	if(y == null) y = 0.;
	if(x == null) x = 0.;
	this.w = w;
	this.x = x;
	this.y = y;
	this.z = z;
};
$hxClasses["lime.math.Vector4"] = lime_math_Vector4;
lime_math_Vector4.__name__ = ["lime","math","Vector4"];
lime_math_Vector4.angleBetween = function(a,b) {
	var a0 = new lime_math_Vector4(a.x,a.y,a.z,a.w);
	a0.normalize();
	var b0 = new lime_math_Vector4(b.x,b.y,b.z,b.w);
	b0.normalize();
	return Math.acos(a0.x * b0.x + a0.y * b0.y + a0.z * b0.z);
};
lime_math_Vector4.distance = function(pt1,pt2) {
	var x = pt2.x - pt1.x;
	var y = pt2.y - pt1.y;
	var z = pt2.z - pt1.z;
	return Math.sqrt(x * x + y * y + z * z);
};
lime_math_Vector4.get_X_AXIS = function() {
	return new lime_math_Vector4(1,0,0);
};
lime_math_Vector4.get_Y_AXIS = function() {
	return new lime_math_Vector4(0,1,0);
};
lime_math_Vector4.get_Z_AXIS = function() {
	return new lime_math_Vector4(0,0,1);
};
lime_math_Vector4.prototype = {
	length: null
	,lengthSquared: null
	,w: null
	,x: null
	,y: null
	,z: null
	,add: function(a) {
		return new lime_math_Vector4(this.x + a.x,this.y + a.y,this.z + a.z);
	}
	,clone: function() {
		return new lime_math_Vector4(this.x,this.y,this.z,this.w);
	}
	,copyFrom: function(sourceVector4) {
		this.x = sourceVector4.x;
		this.y = sourceVector4.y;
		this.z = sourceVector4.z;
	}
	,crossProduct: function(a) {
		return new lime_math_Vector4(this.y * a.z - this.z * a.y,this.z * a.x - this.x * a.z,this.x * a.y - this.y * a.x,1);
	}
	,decrementBy: function(a) {
		this.x -= a.x;
		this.y -= a.y;
		this.z -= a.z;
	}
	,dotProduct: function(a) {
		return this.x * a.x + this.y * a.y + this.z * a.z;
	}
	,equals: function(toCompare,allFour) {
		if(allFour == null) allFour = false;
		return this.x == toCompare.x && this.y == toCompare.y && this.z == toCompare.z && (!allFour || this.w == toCompare.w);
	}
	,incrementBy: function(a) {
		this.x += a.x;
		this.y += a.y;
		this.z += a.z;
	}
	,nearEquals: function(toCompare,tolerance,allFour) {
		if(allFour == null) allFour = false;
		return Math.abs(this.x - toCompare.x) < tolerance && Math.abs(this.y - toCompare.y) < tolerance && Math.abs(this.z - toCompare.z) < tolerance && (!allFour || Math.abs(this.w - toCompare.w) < tolerance);
	}
	,negate: function() {
		this.x *= -1;
		this.y *= -1;
		this.z *= -1;
	}
	,normalize: function() {
		var l = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		if(l != 0) {
			this.x /= l;
			this.y /= l;
			this.z /= l;
		}
		return l;
	}
	,project: function() {
		this.x /= this.w;
		this.y /= this.w;
		this.z /= this.w;
	}
	,scaleBy: function(s) {
		this.x *= s;
		this.y *= s;
		this.z *= s;
	}
	,setTo: function(xa,ya,za) {
		this.x = xa;
		this.y = ya;
		this.z = za;
	}
	,subtract: function(a) {
		return new lime_math_Vector4(this.x - a.x,this.y - a.y,this.z - a.z);
	}
	,toString: function() {
		return "Vector4(" + this.x + ", " + this.y + ", " + this.z + ")";
	}
	,get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
	,get_lengthSquared: function() {
		return this.x * this.x + this.y * this.y + this.z * this.z;
	}
	,__class__: lime_math_Vector4
};
var lime_math_color__$ARGB_ARGB_$Impl_$ = {};
$hxClasses["lime.math.color._ARGB.ARGB_Impl_"] = lime_math_color__$ARGB_ARGB_$Impl_$;
lime_math_color__$ARGB_ARGB_$Impl_$.__name__ = ["lime","math","color","_ARGB","ARGB_Impl_"];
lime_math_color__$ARGB_ARGB_$Impl_$._new = function(argb) {
	if(argb == null) argb = 0;
	return argb;
};
lime_math_color__$ARGB_ARGB_$Impl_$.create = function(a,r,g,b) {
	var argb = 0;
	argb = (a & 255) << 24 | (r & 255) << 16 | (g & 255) << 8 | b & 255;
	return argb;
};
lime_math_color__$ARGB_ARGB_$Impl_$.multiplyAlpha = function(this1) {
	if((this1 >> 24 & 255) == 0) this1 = 0; else if((this1 >> 24 & 255) != 255) {
		lime_math_color__$ARGB_ARGB_$Impl_$.a16 = lime_math_color__$RGBA_RGBA_$Impl_$.__alpha16[this1 >> 24 & 255];
		this1 = (this1 >> 24 & 255 & 255) << 24 | ((this1 >> 16 & 255) * lime_math_color__$ARGB_ARGB_$Impl_$.a16 >> 16 & 255) << 16 | ((this1 >> 8 & 255) * lime_math_color__$ARGB_ARGB_$Impl_$.a16 >> 16 & 255) << 8 | (this1 & 255) * lime_math_color__$ARGB_ARGB_$Impl_$.a16 >> 16 & 255;
	}
};
lime_math_color__$ARGB_ARGB_$Impl_$.readUInt8 = function(this1,data,offset,format,premultiplied) {
	if(premultiplied == null) premultiplied = false;
	if(format == null) format = 0;
	switch(format) {
	case 2:
		this1 = (data[offset + 1] & 255) << 24 | (data[offset] & 255) << 16 | (data[offset + 3] & 255) << 8 | data[offset + 2] & 255;
		break;
	case 0:
		this1 = (data[offset + 1] & 255) << 24 | (data[offset + 2] & 255) << 16 | (data[offset + 3] & 255) << 8 | data[offset] & 255;
		break;
	case 1:
		this1 = (data[offset + 2] & 255) << 24 | (data[offset + 3] & 255) << 16 | (data[offset] & 255) << 8 | data[offset + 1] & 255;
		break;
	}
	if(premultiplied) {
		if((this1 >> 24 & 255) != 0 && (this1 >> 24 & 255) != 255) {
			lime_math_color__$ARGB_ARGB_$Impl_$.unmult = 255.0 / (this1 >> 24 & 255);
			var r;
			var idx = Math.floor((this1 >> 16 & 255) * lime_math_color__$ARGB_ARGB_$Impl_$.unmult);
			r = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx];
			var g;
			var idx1 = Math.floor((this1 >> 8 & 255) * lime_math_color__$ARGB_ARGB_$Impl_$.unmult);
			g = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx1];
			var b;
			var idx2 = Math.floor((this1 & 255) * lime_math_color__$ARGB_ARGB_$Impl_$.unmult);
			b = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx2];
			this1 = (this1 >> 24 & 255 & 255) << 24 | (r & 255) << 16 | (g & 255) << 8 | b & 255;
		}
	}
};
lime_math_color__$ARGB_ARGB_$Impl_$.set = function(this1,a,r,g,b) {
	this1 = (a & 255) << 24 | (r & 255) << 16 | (g & 255) << 8 | b & 255;
};
lime_math_color__$ARGB_ARGB_$Impl_$.unmultiplyAlpha = function(this1) {
	if((this1 >> 24 & 255) != 0 && (this1 >> 24 & 255) != 255) {
		lime_math_color__$ARGB_ARGB_$Impl_$.unmult = 255.0 / (this1 >> 24 & 255);
		var r;
		var idx = Math.floor((this1 >> 16 & 255) * lime_math_color__$ARGB_ARGB_$Impl_$.unmult);
		r = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx];
		var g;
		var idx1 = Math.floor((this1 >> 8 & 255) * lime_math_color__$ARGB_ARGB_$Impl_$.unmult);
		g = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx1];
		var b;
		var idx2 = Math.floor((this1 & 255) * lime_math_color__$ARGB_ARGB_$Impl_$.unmult);
		b = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx2];
		this1 = (this1 >> 24 & 255 & 255) << 24 | (r & 255) << 16 | (g & 255) << 8 | b & 255;
	}
};
lime_math_color__$ARGB_ARGB_$Impl_$.writeUInt8 = function(this1,data,offset,format,premultiplied) {
	if(premultiplied == null) premultiplied = false;
	if(format == null) format = 0;
	if(premultiplied) {
		if((this1 >> 24 & 255) == 0) this1 = 0; else if((this1 >> 24 & 255) != 255) {
			lime_math_color__$ARGB_ARGB_$Impl_$.a16 = lime_math_color__$RGBA_RGBA_$Impl_$.__alpha16[this1 >> 24 & 255];
			this1 = (this1 >> 24 & 255 & 255) << 24 | ((this1 >> 16 & 255) * lime_math_color__$ARGB_ARGB_$Impl_$.a16 >> 16 & 255) << 16 | ((this1 >> 8 & 255) * lime_math_color__$ARGB_ARGB_$Impl_$.a16 >> 16 & 255) << 8 | (this1 & 255) * lime_math_color__$ARGB_ARGB_$Impl_$.a16 >> 16 & 255;
		}
	}
	switch(format) {
	case 2:
		data[offset] = this1 & 255;
		data[offset + 1] = this1 >> 8 & 255;
		data[offset + 2] = this1 >> 16 & 255;
		data[offset + 3] = this1 >> 24 & 255;
		break;
	case 0:
		data[offset] = this1 >> 16 & 255;
		data[offset + 1] = this1 >> 8 & 255;
		data[offset + 2] = this1 & 255;
		data[offset + 3] = this1 >> 24 & 255;
		break;
	case 1:
		data[offset] = this1 >> 24 & 255;
		data[offset + 1] = this1 >> 16 & 255;
		data[offset + 2] = this1 >> 8 & 255;
		data[offset + 3] = this1 & 255;
		break;
	}
};
lime_math_color__$ARGB_ARGB_$Impl_$.__fromBGRA = function(bgra) {
	var argb = 0;
	argb = (bgra & 255 & 255) << 24 | (bgra >> 8 & 255 & 255) << 16 | (bgra >> 16 & 255 & 255) << 8 | bgra >> 24 & 255 & 255;
	return argb;
};
lime_math_color__$ARGB_ARGB_$Impl_$.__fromRGBA = function(rgba) {
	var argb = 0;
	argb = (rgba & 255 & 255) << 24 | (rgba >> 24 & 255 & 255) << 16 | (rgba >> 16 & 255 & 255) << 8 | rgba >> 8 & 255 & 255;
	return argb;
};
lime_math_color__$ARGB_ARGB_$Impl_$.get_a = function(this1) {
	return this1 >> 24 & 255;
};
lime_math_color__$ARGB_ARGB_$Impl_$.set_a = function(this1,value) {
	this1 = (value & 255) << 24 | (this1 >> 16 & 255 & 255) << 16 | (this1 >> 8 & 255 & 255) << 8 | this1 & 255 & 255;
	return value;
};
lime_math_color__$ARGB_ARGB_$Impl_$.get_b = function(this1) {
	return this1 & 255;
};
lime_math_color__$ARGB_ARGB_$Impl_$.set_b = function(this1,value) {
	this1 = (this1 >> 24 & 255 & 255) << 24 | (this1 >> 16 & 255 & 255) << 16 | (this1 >> 8 & 255 & 255) << 8 | value & 255;
	return value;
};
lime_math_color__$ARGB_ARGB_$Impl_$.get_g = function(this1) {
	return this1 >> 8 & 255;
};
lime_math_color__$ARGB_ARGB_$Impl_$.set_g = function(this1,value) {
	this1 = (this1 >> 24 & 255 & 255) << 24 | (this1 >> 16 & 255 & 255) << 16 | (value & 255) << 8 | this1 & 255 & 255;
	return value;
};
lime_math_color__$ARGB_ARGB_$Impl_$.get_r = function(this1) {
	return this1 >> 16 & 255;
};
lime_math_color__$ARGB_ARGB_$Impl_$.set_r = function(this1,value) {
	this1 = (this1 >> 24 & 255 & 255) << 24 | (value & 255) << 16 | (this1 >> 8 & 255 & 255) << 8 | this1 & 255 & 255;
	return value;
};
var lime_math_color__$BGRA_BGRA_$Impl_$ = {};
$hxClasses["lime.math.color._BGRA.BGRA_Impl_"] = lime_math_color__$BGRA_BGRA_$Impl_$;
lime_math_color__$BGRA_BGRA_$Impl_$.__name__ = ["lime","math","color","_BGRA","BGRA_Impl_"];
lime_math_color__$BGRA_BGRA_$Impl_$._new = function(bgra) {
	if(bgra == null) bgra = 0;
	return bgra;
};
lime_math_color__$BGRA_BGRA_$Impl_$.create = function(b,g,r,a) {
	var bgra = 0;
	bgra = (b & 255) << 24 | (g & 255) << 16 | (r & 255) << 8 | a & 255;
	return bgra;
};
lime_math_color__$BGRA_BGRA_$Impl_$.multiplyAlpha = function(this1) {
	if((this1 & 255) == 0) this1 = 0; else if((this1 & 255) != 255) {
		lime_math_color__$BGRA_BGRA_$Impl_$.a16 = lime_math_color__$RGBA_RGBA_$Impl_$.__alpha16[this1 & 255];
		this1 = ((this1 >> 24 & 255) * lime_math_color__$BGRA_BGRA_$Impl_$.a16 >> 16 & 255) << 24 | ((this1 >> 16 & 255) * lime_math_color__$BGRA_BGRA_$Impl_$.a16 >> 16 & 255) << 16 | ((this1 >> 8 & 255) * lime_math_color__$BGRA_BGRA_$Impl_$.a16 >> 16 & 255) << 8 | this1 & 255 & 255;
	}
};
lime_math_color__$BGRA_BGRA_$Impl_$.readUInt8 = function(this1,data,offset,format,premultiplied) {
	if(premultiplied == null) premultiplied = false;
	if(format == null) format = 0;
	switch(format) {
	case 2:
		this1 = (data[offset] & 255) << 24 | (data[offset + 1] & 255) << 16 | (data[offset + 2] & 255) << 8 | data[offset + 3] & 255;
		break;
	case 0:
		this1 = (data[offset + 2] & 255) << 24 | (data[offset + 1] & 255) << 16 | (data[offset] & 255) << 8 | data[offset + 3] & 255;
		break;
	case 1:
		this1 = (data[offset + 3] & 255) << 24 | (data[offset + 2] & 255) << 16 | (data[offset + 1] & 255) << 8 | data[offset] & 255;
		break;
	}
	if(premultiplied) {
		if((this1 & 255) != 0 && (this1 & 255) != 255) {
			lime_math_color__$BGRA_BGRA_$Impl_$.unmult = 255.0 / (this1 & 255);
			var b;
			var idx = Math.floor((this1 >> 24 & 255) * lime_math_color__$BGRA_BGRA_$Impl_$.unmult);
			b = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx];
			var g;
			var idx1 = Math.floor((this1 >> 16 & 255) * lime_math_color__$BGRA_BGRA_$Impl_$.unmult);
			g = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx1];
			var r;
			var idx2 = Math.floor((this1 >> 8 & 255) * lime_math_color__$BGRA_BGRA_$Impl_$.unmult);
			r = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx2];
			this1 = (b & 255) << 24 | (g & 255) << 16 | (r & 255) << 8 | this1 & 255 & 255;
		}
	}
};
lime_math_color__$BGRA_BGRA_$Impl_$.set = function(this1,b,g,r,a) {
	this1 = (b & 255) << 24 | (g & 255) << 16 | (r & 255) << 8 | a & 255;
};
lime_math_color__$BGRA_BGRA_$Impl_$.unmultiplyAlpha = function(this1) {
	if((this1 & 255) != 0 && (this1 & 255) != 255) {
		lime_math_color__$BGRA_BGRA_$Impl_$.unmult = 255.0 / (this1 & 255);
		var b;
		var idx = Math.floor((this1 >> 24 & 255) * lime_math_color__$BGRA_BGRA_$Impl_$.unmult);
		b = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx];
		var g;
		var idx1 = Math.floor((this1 >> 16 & 255) * lime_math_color__$BGRA_BGRA_$Impl_$.unmult);
		g = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx1];
		var r;
		var idx2 = Math.floor((this1 >> 8 & 255) * lime_math_color__$BGRA_BGRA_$Impl_$.unmult);
		r = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx2];
		this1 = (b & 255) << 24 | (g & 255) << 16 | (r & 255) << 8 | this1 & 255 & 255;
	}
};
lime_math_color__$BGRA_BGRA_$Impl_$.writeUInt8 = function(this1,data,offset,format,premultiplied) {
	if(premultiplied == null) premultiplied = false;
	if(format == null) format = 0;
	if(premultiplied) {
		if((this1 & 255) == 0) this1 = 0; else if((this1 & 255) != 255) {
			lime_math_color__$BGRA_BGRA_$Impl_$.a16 = lime_math_color__$RGBA_RGBA_$Impl_$.__alpha16[this1 & 255];
			this1 = ((this1 >> 24 & 255) * lime_math_color__$BGRA_BGRA_$Impl_$.a16 >> 16 & 255) << 24 | ((this1 >> 16 & 255) * lime_math_color__$BGRA_BGRA_$Impl_$.a16 >> 16 & 255) << 16 | ((this1 >> 8 & 255) * lime_math_color__$BGRA_BGRA_$Impl_$.a16 >> 16 & 255) << 8 | this1 & 255 & 255;
		}
	}
	switch(format) {
	case 2:
		data[offset] = this1 >> 24 & 255;
		data[offset + 1] = this1 >> 16 & 255;
		data[offset + 2] = this1 >> 8 & 255;
		data[offset + 3] = this1 & 255;
		break;
	case 0:
		data[offset] = this1 >> 8 & 255;
		data[offset + 1] = this1 >> 16 & 255;
		data[offset + 2] = this1 >> 24 & 255;
		data[offset + 3] = this1 & 255;
		break;
	case 1:
		data[offset] = this1 & 255;
		data[offset + 1] = this1 >> 8 & 255;
		data[offset + 2] = this1 >> 16 & 255;
		data[offset + 3] = this1 >> 24 & 255;
		break;
	}
};
lime_math_color__$BGRA_BGRA_$Impl_$.__fromARGB = function(argb) {
	var bgra = 0;
	bgra = (argb & 255 & 255) << 24 | (argb >> 8 & 255 & 255) << 16 | (argb >> 16 & 255 & 255) << 8 | argb >> 24 & 255 & 255;
	return bgra;
};
lime_math_color__$BGRA_BGRA_$Impl_$.__fromRGBA = function(rgba) {
	var bgra = 0;
	bgra = (rgba >> 8 & 255 & 255) << 24 | (rgba >> 16 & 255 & 255) << 16 | (rgba >> 24 & 255 & 255) << 8 | rgba & 255 & 255;
	return bgra;
};
lime_math_color__$BGRA_BGRA_$Impl_$.get_a = function(this1) {
	return this1 & 255;
};
lime_math_color__$BGRA_BGRA_$Impl_$.set_a = function(this1,value) {
	this1 = (this1 >> 24 & 255 & 255) << 24 | (this1 >> 16 & 255 & 255) << 16 | (this1 >> 8 & 255 & 255) << 8 | value & 255;
	return value;
};
lime_math_color__$BGRA_BGRA_$Impl_$.get_b = function(this1) {
	return this1 >> 24 & 255;
};
lime_math_color__$BGRA_BGRA_$Impl_$.set_b = function(this1,value) {
	this1 = (value & 255) << 24 | (this1 >> 16 & 255 & 255) << 16 | (this1 >> 8 & 255 & 255) << 8 | this1 & 255 & 255;
	return value;
};
lime_math_color__$BGRA_BGRA_$Impl_$.get_g = function(this1) {
	return this1 >> 16 & 255;
};
lime_math_color__$BGRA_BGRA_$Impl_$.set_g = function(this1,value) {
	this1 = (this1 >> 24 & 255 & 255) << 24 | (value & 255) << 16 | (this1 >> 8 & 255 & 255) << 8 | this1 & 255 & 255;
	return value;
};
lime_math_color__$BGRA_BGRA_$Impl_$.get_r = function(this1) {
	return this1 >> 8 & 255;
};
lime_math_color__$BGRA_BGRA_$Impl_$.set_r = function(this1,value) {
	this1 = (this1 >> 24 & 255 & 255) << 24 | (this1 >> 16 & 255 & 255) << 16 | (value & 255) << 8 | this1 & 255 & 255;
	return value;
};
var lime_math_color__$RGBA_RGBA_$Impl_$ = {};
$hxClasses["lime.math.color._RGBA.RGBA_Impl_"] = lime_math_color__$RGBA_RGBA_$Impl_$;
lime_math_color__$RGBA_RGBA_$Impl_$.__name__ = ["lime","math","color","_RGBA","RGBA_Impl_"];
lime_math_color__$RGBA_RGBA_$Impl_$._new = function(rgba) {
	if(rgba == null) rgba = 0;
	return rgba;
};
lime_math_color__$RGBA_RGBA_$Impl_$.create = function(r,g,b,a) {
	var rgba = 0;
	rgba = (r & 255) << 24 | (g & 255) << 16 | (b & 255) << 8 | a & 255;
	return rgba;
};
lime_math_color__$RGBA_RGBA_$Impl_$.multiplyAlpha = function(this1) {
	if((this1 & 255) == 0) {
		if(this1 != 0) this1 = 0;
	} else if((this1 & 255) != 255) {
		lime_math_color__$RGBA_RGBA_$Impl_$.a16 = lime_math_color__$RGBA_RGBA_$Impl_$.__alpha16[this1 & 255];
		this1 = ((this1 >> 24 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 24 | ((this1 >> 16 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 16 | ((this1 >> 8 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 8 | this1 & 255 & 255;
	}
};
lime_math_color__$RGBA_RGBA_$Impl_$.readUInt8 = function(this1,data,offset,format,premultiplied) {
	if(premultiplied == null) premultiplied = false;
	if(format == null) format = 0;
	switch(format) {
	case 2:
		this1 = (data[offset + 2] & 255) << 24 | (data[offset + 1] & 255) << 16 | (data[offset] & 255) << 8 | data[offset + 3] & 255;
		break;
	case 0:
		this1 = (data[offset] & 255) << 24 | (data[offset + 1] & 255) << 16 | (data[offset + 2] & 255) << 8 | data[offset + 3] & 255;
		break;
	case 1:
		this1 = (data[offset + 1] & 255) << 24 | (data[offset + 2] & 255) << 16 | (data[offset + 3] & 255) << 8 | data[offset] & 255;
		break;
	}
	if(premultiplied) {
		if((this1 & 255) != 0 && (this1 & 255) != 255) {
			lime_math_color__$RGBA_RGBA_$Impl_$.unmult = 255.0 / (this1 & 255);
			var r;
			var idx = Math.round((this1 >> 24 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
			r = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx];
			var g;
			var idx1 = Math.round((this1 >> 16 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
			g = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx1];
			var b;
			var idx2 = Math.round((this1 >> 8 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
			b = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx2];
			this1 = (r & 255) << 24 | (g & 255) << 16 | (b & 255) << 8 | this1 & 255 & 255;
		}
	}
};
lime_math_color__$RGBA_RGBA_$Impl_$.set = function(this1,r,g,b,a) {
	this1 = (r & 255) << 24 | (g & 255) << 16 | (b & 255) << 8 | a & 255;
};
lime_math_color__$RGBA_RGBA_$Impl_$.unmultiplyAlpha = function(this1) {
	if((this1 & 255) != 0 && (this1 & 255) != 255) {
		lime_math_color__$RGBA_RGBA_$Impl_$.unmult = 255.0 / (this1 & 255);
		var r;
		var idx = Math.round((this1 >> 24 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
		r = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx];
		var g;
		var idx1 = Math.round((this1 >> 16 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
		g = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx1];
		var b;
		var idx2 = Math.round((this1 >> 8 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.unmult);
		b = lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[idx2];
		this1 = (r & 255) << 24 | (g & 255) << 16 | (b & 255) << 8 | this1 & 255 & 255;
	}
};
lime_math_color__$RGBA_RGBA_$Impl_$.writeUInt8 = function(this1,data,offset,format,premultiplied) {
	if(premultiplied == null) premultiplied = false;
	if(format == null) format = 0;
	if(premultiplied) {
		if((this1 & 255) == 0) {
			if(this1 != 0) this1 = 0;
		} else if((this1 & 255) != 255) {
			lime_math_color__$RGBA_RGBA_$Impl_$.a16 = lime_math_color__$RGBA_RGBA_$Impl_$.__alpha16[this1 & 255];
			this1 = ((this1 >> 24 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 24 | ((this1 >> 16 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 16 | ((this1 >> 8 & 255) * lime_math_color__$RGBA_RGBA_$Impl_$.a16 >> 16 & 255) << 8 | this1 & 255 & 255;
		}
	}
	switch(format) {
	case 2:
		data[offset] = this1 >> 8 & 255;
		data[offset + 1] = this1 >> 16 & 255;
		data[offset + 2] = this1 >> 24 & 255;
		data[offset + 3] = this1 & 255;
		break;
	case 0:
		data[offset] = this1 >> 24 & 255;
		data[offset + 1] = this1 >> 16 & 255;
		data[offset + 2] = this1 >> 8 & 255;
		data[offset + 3] = this1 & 255;
		break;
	case 1:
		data[offset] = this1 & 255;
		data[offset + 1] = this1 >> 24 & 255;
		data[offset + 2] = this1 >> 16 & 255;
		data[offset + 3] = this1 >> 8 & 255;
		break;
	}
};
lime_math_color__$RGBA_RGBA_$Impl_$.__fromARGB = function(argb) {
	var rgba = 0;
	rgba = (argb >> 16 & 255 & 255) << 24 | (argb >> 8 & 255 & 255) << 16 | (argb & 255 & 255) << 8 | argb >> 24 & 255 & 255;
	return rgba;
};
lime_math_color__$RGBA_RGBA_$Impl_$.__fromBGRA = function(bgra) {
	var rgba = 0;
	rgba = (bgra >> 8 & 255 & 255) << 24 | (bgra >> 16 & 255 & 255) << 16 | (bgra >> 24 & 255 & 255) << 8 | bgra & 255 & 255;
	return rgba;
};
lime_math_color__$RGBA_RGBA_$Impl_$.get_a = function(this1) {
	return this1 & 255;
};
lime_math_color__$RGBA_RGBA_$Impl_$.set_a = function(this1,value) {
	this1 = (this1 >> 24 & 255 & 255) << 24 | (this1 >> 16 & 255 & 255) << 16 | (this1 >> 8 & 255 & 255) << 8 | value & 255;
	return value;
};
lime_math_color__$RGBA_RGBA_$Impl_$.get_b = function(this1) {
	return this1 >> 8 & 255;
};
lime_math_color__$RGBA_RGBA_$Impl_$.set_b = function(this1,value) {
	this1 = (this1 >> 24 & 255 & 255) << 24 | (this1 >> 16 & 255 & 255) << 16 | (value & 255) << 8 | this1 & 255 & 255;
	return value;
};
lime_math_color__$RGBA_RGBA_$Impl_$.get_g = function(this1) {
	return this1 >> 16 & 255;
};
lime_math_color__$RGBA_RGBA_$Impl_$.set_g = function(this1,value) {
	this1 = (this1 >> 24 & 255 & 255) << 24 | (value & 255) << 16 | (this1 >> 8 & 255 & 255) << 8 | this1 & 255 & 255;
	return value;
};
lime_math_color__$RGBA_RGBA_$Impl_$.get_r = function(this1) {
	return this1 >> 24 & 255;
};
lime_math_color__$RGBA_RGBA_$Impl_$.set_r = function(this1,value) {
	this1 = (value & 255) << 24 | (this1 >> 16 & 255 & 255) << 16 | (this1 >> 8 & 255 & 255) << 8 | this1 & 255 & 255;
	return value;
};
var lime_net_HTTPRequest = function() {
	this.promise = new lime_app_Promise();
};
$hxClasses["lime.net.HTTPRequest"] = lime_net_HTTPRequest;
lime_net_HTTPRequest.__name__ = ["lime","net","HTTPRequest"];
lime_net_HTTPRequest.prototype = {
	bytes: null
	,bytesLoaded: null
	,bytesTotal: null
	,promise: null
	,load: function(url) {
		var _g = this;
		this.bytesLoaded = 0;
		this.bytesTotal = 0;
		var request = new XMLHttpRequest();
		request.addEventListener("progress",$bind(this,this.request_onProgress),false);
		request.onreadystatechange = function() {
			if(request.readyState != 4) return;
			if(request.status != null && request.status >= 200 && request.status <= 400) {
				_g.bytes = lime_utils_Bytes.ofData(request.response);
				_g.promise.complete(_g.bytes);
			} else _g.promise.error(request.status);
		};
		request.open("GET",url,true);
		request.responseType = "arraybuffer";
		request.send("");
		return this.promise.future;
	}
	,curl_onProgress: function(dltotal,dlnow,uptotal,upnow) {
		if(upnow > this.bytesLoaded || dlnow > this.bytesLoaded || uptotal > this.bytesTotal || dltotal > this.bytesTotal) {
			if(upnow > this.bytesLoaded) this.bytesLoaded = upnow | 0;
			if(dlnow > this.bytesLoaded) this.bytesLoaded = dlnow | 0;
			if(uptotal > this.bytesTotal) this.bytesTotal = uptotal | 0;
			if(dltotal > this.bytesTotal) this.bytesTotal = dltotal | 0;
			this.promise.progress(this.bytesLoaded / this.bytesTotal);
		}
		return 0;
	}
	,curl_onWrite: function(output,size,nmemb) {
		var cacheBytes = this.bytes;
		this.bytes = lime_utils_Bytes.alloc(this.bytes.length + output.length);
		this.bytes.blit(0,cacheBytes,0,cacheBytes.length);
		this.bytes.blit(cacheBytes.length,output,0,output.length);
		return size * nmemb;
	}
	,request_onProgress: function(event) {
		this.promise.progress(event.loaded / event.total);
	}
	,__class__: lime_net_HTTPRequest
};
var lime_net_curl__$CURL_CURL_$Impl_$ = {};
$hxClasses["lime.net.curl._CURL.CURL_Impl_"] = lime_net_curl__$CURL_CURL_$Impl_$;
lime_net_curl__$CURL_CURL_$Impl_$.__name__ = ["lime","net","curl","_CURL","CURL_Impl_"];
lime_net_curl__$CURL_CURL_$Impl_$.getDate = function(date,now) {
	return 0;
};
lime_net_curl__$CURL_CURL_$Impl_$.globalCleanup = function() {
};
lime_net_curl__$CURL_CURL_$Impl_$.globalInit = function(flags) {
	return 0;
};
lime_net_curl__$CURL_CURL_$Impl_$.version = function() {
	return null;
};
lime_net_curl__$CURL_CURL_$Impl_$.versionInfo = function(type) {
	return null;
};
lime_net_curl__$CURL_CURL_$Impl_$.intGt = function(a,b) {
	return a > b;
};
var lime_net_curl_CURLEasy = function() { };
$hxClasses["lime.net.curl.CURLEasy"] = lime_net_curl_CURLEasy;
lime_net_curl_CURLEasy.__name__ = ["lime","net","curl","CURLEasy"];
lime_net_curl_CURLEasy.cleanup = function(handle) {
};
lime_net_curl_CURLEasy.duphandle = function(handle) {
	return 0;
};
lime_net_curl_CURLEasy.escape = function(handle,url,length) {
	return null;
};
lime_net_curl_CURLEasy.getinfo = function(handle,info) {
	return null;
};
lime_net_curl_CURLEasy.init = function() {
	return 0;
};
lime_net_curl_CURLEasy.pause = function(handle,bitMask) {
	return 0;
};
lime_net_curl_CURLEasy.perform = function(handle) {
	return 0;
};
lime_net_curl_CURLEasy.reset = function(handle) {
};
lime_net_curl_CURLEasy.setopt = function(handle,option,parameter) {
	return 0;
};
lime_net_curl_CURLEasy.strerror = function(code) {
	return null;
};
lime_net_curl_CURLEasy.unescape = function(handle,url,inLength,outLength) {
	return null;
};
lime_net_curl_CURLEasy.__writeCallback = function(callback,output,size,nmemb) {
	return 0;
};
var lime_system_BackgroundWorker = function() {
	this.onProgress = new lime_app_Event_$Dynamic_$Void();
	this.onError = new lime_app_Event_$Dynamic_$Void();
	this.onComplete = new lime_app_Event_$Dynamic_$Void();
	this.doWork = new lime_app_Event_$Dynamic_$Void();
};
$hxClasses["lime.system.BackgroundWorker"] = lime_system_BackgroundWorker;
lime_system_BackgroundWorker.__name__ = ["lime","system","BackgroundWorker"];
lime_system_BackgroundWorker.prototype = {
	canceled: null
	,doWork: null
	,onComplete: null
	,onError: null
	,onProgress: null
	,__runMessage: null
	,cancel: function() {
		this.canceled = true;
	}
	,run: function(message) {
		this.canceled = false;
		this.__runMessage = message;
		this.__doWork();
	}
	,sendComplete: function(message) {
		if(!this.canceled) {
			this.canceled = true;
			this.onComplete.dispatch(message);
		}
	}
	,sendError: function(message) {
		if(!this.canceled) {
			this.canceled = true;
			this.onError.dispatch(message);
		}
	}
	,sendProgress: function(message) {
		if(!this.canceled) this.onProgress.dispatch(message);
	}
	,__doWork: function() {
		this.doWork.dispatch(this.__runMessage);
	}
	,__update: function(deltaTime) {
	}
	,__class__: lime_system_BackgroundWorker
};
var lime_system_CFFI = function() { };
$hxClasses["lime.system.CFFI"] = lime_system_CFFI;
lime_system_CFFI.__name__ = ["lime","system","CFFI"];
lime_system_CFFI.load = function(library,method,args,lazy) {
	if(lazy == null) lazy = false;
	if(args == null) args = 0;
	if(!lime_system_CFFI.enabled) return Reflect.makeVarArgs(function(__) {
		return { };
	});
	var result = null;
	return result;
};
lime_system_CFFI.__findHaxelib = function(library) {
	return "";
};
lime_system_CFFI.__loaderTrace = function(message) {
};
lime_system_CFFI.__sysName = function() {
	return null;
};
lime_system_CFFI.__tryLoad = function(name,library,func,args) {
	return null;
};
var lime_system__$CFFIPointer_CFFIPointer_$Impl_$ = {};
$hxClasses["lime.system._CFFIPointer.CFFIPointer_Impl_"] = lime_system__$CFFIPointer_CFFIPointer_$Impl_$;
lime_system__$CFFIPointer_CFFIPointer_$Impl_$.__name__ = ["lime","system","_CFFIPointer","CFFIPointer_Impl_"];
lime_system__$CFFIPointer_CFFIPointer_$Impl_$._new = function(handle) {
	return handle;
};
lime_system__$CFFIPointer_CFFIPointer_$Impl_$.get = function(this1) {
	if(this1 != null) {
	}
	return 0;
};
lime_system__$CFFIPointer_CFFIPointer_$Impl_$.equals = function(a,b) {
	return lime_system__$CFFIPointer_CFFIPointer_$Impl_$.get(a) == b;
};
lime_system__$CFFIPointer_CFFIPointer_$Impl_$.equalsPointer = function(a,b) {
	return lime_system__$CFFIPointer_CFFIPointer_$Impl_$.get(a) == lime_system__$CFFIPointer_CFFIPointer_$Impl_$.get(b);
};
lime_system__$CFFIPointer_CFFIPointer_$Impl_$.greaterThan = function(a,b) {
	return lime_system__$CFFIPointer_CFFIPointer_$Impl_$.get(a) > b;
};
lime_system__$CFFIPointer_CFFIPointer_$Impl_$.greaterThanPointer = function(a,b) {
	return lime_system__$CFFIPointer_CFFIPointer_$Impl_$.get(a) > lime_system__$CFFIPointer_CFFIPointer_$Impl_$.get(b);
};
lime_system__$CFFIPointer_CFFIPointer_$Impl_$.greaterThanOrEqual = function(a,b) {
	return lime_system__$CFFIPointer_CFFIPointer_$Impl_$.get(a) >= b;
};
lime_system__$CFFIPointer_CFFIPointer_$Impl_$.greaterThanOrEqualPointer = function(a,b) {
	return lime_system__$CFFIPointer_CFFIPointer_$Impl_$.get(a) >= lime_system__$CFFIPointer_CFFIPointer_$Impl_$.get(b);
};
lime_system__$CFFIPointer_CFFIPointer_$Impl_$.lessThan = function(a,b) {
	return lime_system__$CFFIPointer_CFFIPointer_$Impl_$.get(a) < b;
};
lime_system__$CFFIPointer_CFFIPointer_$Impl_$.lessThanPointer = function(a,b) {
	return lime_system__$CFFIPointer_CFFIPointer_$Impl_$.get(a) < lime_system__$CFFIPointer_CFFIPointer_$Impl_$.get(b);
};
lime_system__$CFFIPointer_CFFIPointer_$Impl_$.lessThanOrEqual = function(a,b) {
	return lime_system__$CFFIPointer_CFFIPointer_$Impl_$.get(a) <= b;
};
lime_system__$CFFIPointer_CFFIPointer_$Impl_$.lessThanOrEqualPointer = function(a,b) {
	return lime_system__$CFFIPointer_CFFIPointer_$Impl_$.get(a) <= lime_system__$CFFIPointer_CFFIPointer_$Impl_$.get(b);
};
lime_system__$CFFIPointer_CFFIPointer_$Impl_$.notEquals = function(a,b) {
	return lime_system__$CFFIPointer_CFFIPointer_$Impl_$.get(a) != b;
};
lime_system__$CFFIPointer_CFFIPointer_$Impl_$.notEqualsPointer = function(a,b) {
	return lime_system__$CFFIPointer_CFFIPointer_$Impl_$.get(a) != lime_system__$CFFIPointer_CFFIPointer_$Impl_$.get(b);
};
var lime_system_Display = function() {
};
$hxClasses["lime.system.Display"] = lime_system_Display;
lime_system_Display.__name__ = ["lime","system","Display"];
lime_system_Display.prototype = {
	bounds: null
	,currentMode: null
	,id: null
	,dpi: null
	,name: null
	,supportedModes: null
	,__class__: lime_system_Display
};
var lime_system_DisplayMode = function(width,height,refreshRate,pixelFormat) {
	this.width = width;
	this.height = height;
	this.refreshRate = refreshRate;
	this.pixelFormat = pixelFormat;
};
$hxClasses["lime.system.DisplayMode"] = lime_system_DisplayMode;
lime_system_DisplayMode.__name__ = ["lime","system","DisplayMode"];
lime_system_DisplayMode.prototype = {
	height: null
	,pixelFormat: null
	,refreshRate: null
	,width: null
	,__class__: lime_system_DisplayMode
};
var lime_system_Endian = $hxClasses["lime.system.Endian"] = { __ename__ : ["lime","system","Endian"], __constructs__ : ["LITTLE_ENDIAN","BIG_ENDIAN"] };
lime_system_Endian.LITTLE_ENDIAN = ["LITTLE_ENDIAN",0];
lime_system_Endian.LITTLE_ENDIAN.toString = $estr;
lime_system_Endian.LITTLE_ENDIAN.__enum__ = lime_system_Endian;
lime_system_Endian.BIG_ENDIAN = ["BIG_ENDIAN",1];
lime_system_Endian.BIG_ENDIAN.toString = $estr;
lime_system_Endian.BIG_ENDIAN.__enum__ = lime_system_Endian;
var lime_system_System = function() { };
$hxClasses["lime.system.System"] = lime_system_System;
lime_system_System.__name__ = ["lime","system","System"];
lime_system_System.embed = $hx_exports.lime.embed = function(element,width,height,background,assetsPrefix) {
	var htmlElement = null;
	if(typeof(element) == "string") htmlElement = window.document.getElementById(js_Boot.__cast(element , String)); else if(element == null) htmlElement = window.document.createElement("div"); else htmlElement = element;
	var color = null;
	if(background != null) {
		background = StringTools.replace(background,"#","");
		if(background.indexOf("0x") > -1) color = Std.parseInt(background); else color = Std.parseInt("0x" + background);
	}
	if(width == null) width = 0;
	if(height == null) height = 0;
	ApplicationMain.config.windows[0].background = color;
	ApplicationMain.config.windows[0].element = htmlElement;
	ApplicationMain.config.windows[0].width = width;
	ApplicationMain.config.windows[0].height = height;
	ApplicationMain.config.assetsPrefix = assetsPrefix;
	ApplicationMain.create();
};
lime_system_System.exit = function(code) {
};
lime_system_System.getDisplay = function(id) {
	if(id == 0) {
		var display = new lime_system_Display();
		display.id = 0;
		display.name = "Generic Display";
		display.dpi = 96;
		display.currentMode = new lime_system_DisplayMode(window.screen.width,window.screen.height,60,1);
		display.supportedModes = [display.currentMode];
		display.bounds = new lime_math_Rectangle(0,0,display.currentMode.width,display.currentMode.height);
		return display;
	}
	return null;
};
lime_system_System.getTimer = function() {
	return new Date().getTime();
};
lime_system_System.load = function(library,method,args,lazy) {
	if(lazy == null) lazy = false;
	if(args == null) args = 0;
	return lime_system_CFFI.load(library,method,args,lazy);
};
lime_system_System.get_allowScreenTimeout = function() {
	return true;
};
lime_system_System.set_allowScreenTimeout = function(value) {
	return true;
};
lime_system_System.get_applicationDirectory = function() {
	return null;
};
lime_system_System.get_applicationStorageDirectory = function() {
	var company = "MyCompany";
	var file = "MyApplication";
	if(lime_app_Application.current != null && lime_app_Application.current.config != null) {
		if(lime_app_Application.current.config.company != null) company = lime_app_Application.current.config.company;
		if(lime_app_Application.current.config.file != null) file = lime_app_Application.current.config.file;
	}
	return null;
};
lime_system_System.get_desktopDirectory = function() {
	return null;
};
lime_system_System.get_documentsDirectory = function() {
	return null;
};
lime_system_System.get_fontsDirectory = function() {
	return null;
};
lime_system_System.get_numDisplays = function() {
	return 1;
};
lime_system_System.get_userDirectory = function() {
	return null;
};
lime_system_System.get_endianness = function() {
	return lime_system_Endian.LITTLE_ENDIAN;
};
var lime_system_ThreadPool = function(minThreads,maxThreads) {
	if(maxThreads == null) maxThreads = 1;
	if(minThreads == null) minThreads = 0;
	this.onProgress = new lime_app_Event_$Dynamic_$Void();
	this.onError = new lime_app_Event_$Dynamic_$Void();
	this.onComplete = new lime_app_Event_$Dynamic_$Void();
	this.doWork = new lime_app_Event_$Dynamic_$Void();
	this.minThreads = minThreads;
	this.maxThreads = maxThreads;
	this.currentThreads = 0;
};
$hxClasses["lime.system.ThreadPool"] = lime_system_ThreadPool;
lime_system_ThreadPool.__name__ = ["lime","system","ThreadPool"];
lime_system_ThreadPool.prototype = {
	currentThreads: null
	,doWork: null
	,maxThreads: null
	,minThreads: null
	,onComplete: null
	,onError: null
	,onProgress: null
	,queue: function(state) {
		this.doWork.dispatch(state);
	}
	,sendComplete: function(state) {
		this.onComplete.dispatch(state);
	}
	,sendError: function(state) {
		this.onError.dispatch(state);
	}
	,sendProgress: function(state) {
		this.onProgress.dispatch(state);
	}
	,__class__: lime_system_ThreadPool
};
var lime_system__$ThreadPool_ThreadPoolMessageType = $hxClasses["lime.system._ThreadPool.ThreadPoolMessageType"] = { __ename__ : ["lime","system","_ThreadPool","ThreadPoolMessageType"], __constructs__ : ["COMPLETE","ERROR","EXIT","PROGRESS","WORK"] };
lime_system__$ThreadPool_ThreadPoolMessageType.COMPLETE = ["COMPLETE",0];
lime_system__$ThreadPool_ThreadPoolMessageType.COMPLETE.toString = $estr;
lime_system__$ThreadPool_ThreadPoolMessageType.COMPLETE.__enum__ = lime_system__$ThreadPool_ThreadPoolMessageType;
lime_system__$ThreadPool_ThreadPoolMessageType.ERROR = ["ERROR",1];
lime_system__$ThreadPool_ThreadPoolMessageType.ERROR.toString = $estr;
lime_system__$ThreadPool_ThreadPoolMessageType.ERROR.__enum__ = lime_system__$ThreadPool_ThreadPoolMessageType;
lime_system__$ThreadPool_ThreadPoolMessageType.EXIT = ["EXIT",2];
lime_system__$ThreadPool_ThreadPoolMessageType.EXIT.toString = $estr;
lime_system__$ThreadPool_ThreadPoolMessageType.EXIT.__enum__ = lime_system__$ThreadPool_ThreadPoolMessageType;
lime_system__$ThreadPool_ThreadPoolMessageType.PROGRESS = ["PROGRESS",3];
lime_system__$ThreadPool_ThreadPoolMessageType.PROGRESS.toString = $estr;
lime_system__$ThreadPool_ThreadPoolMessageType.PROGRESS.__enum__ = lime_system__$ThreadPool_ThreadPoolMessageType;
lime_system__$ThreadPool_ThreadPoolMessageType.WORK = ["WORK",4];
lime_system__$ThreadPool_ThreadPoolMessageType.WORK.toString = $estr;
lime_system__$ThreadPool_ThreadPoolMessageType.WORK.__enum__ = lime_system__$ThreadPool_ThreadPoolMessageType;
var lime_system__$ThreadPool_ThreadPoolMessage = function(type,state) {
	this.type = type;
	this.state = state;
};
$hxClasses["lime.system._ThreadPool.ThreadPoolMessage"] = lime_system__$ThreadPool_ThreadPoolMessage;
lime_system__$ThreadPool_ThreadPoolMessage.__name__ = ["lime","system","_ThreadPool","ThreadPoolMessage"];
lime_system__$ThreadPool_ThreadPoolMessage.prototype = {
	state: null
	,type: null
	,__class__: lime_system__$ThreadPool_ThreadPoolMessage
};
var lime_text_Font = function(name) {
	if(name != null) this.name = name;
	if(this.__fontPath != null) this.__fromFile(this.__fontPath);
};
$hxClasses["lime.text.Font"] = lime_text_Font;
lime_text_Font.__name__ = ["lime","text","Font"];
lime_text_Font.fromBytes = function(bytes) {
	var font = new lime_text_Font();
	font.__fromBytes(bytes);
	return font;
};
lime_text_Font.fromFile = function(path) {
	var font = new lime_text_Font();
	font.__fromFile(path);
	return font;
};
lime_text_Font.prototype = {
	ascender: null
	,descender: null
	,height: null
	,name: null
	,numGlyphs: null
	,src: null
	,underlinePosition: null
	,underlineThickness: null
	,unitsPerEM: null
	,__fontPath: null
	,decompose: function() {
		return null;
	}
	,getGlyph: function(character) {
		return -1;
	}
	,getGlyphs: function(characters) {
		if(characters == null) characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^`'\"/\\&*()[]{}<>|:;_-+=?,. ";
		return null;
	}
	,getGlyphMetrics: function(glyph) {
		return null;
	}
	,renderGlyph: function(glyph,fontSize) {
		return null;
	}
	,renderGlyphs: function(glyphs,fontSize) {
		return null;
	}
	,__fromBytes: function(bytes) {
		this.__fontPath = null;
	}
	,__fromFile: function(path) {
		this.__fontPath = path;
	}
	,__setSize: function(size) {
	}
	,get_ascender: function() {
		return 0;
	}
	,get_descender: function() {
		return 0;
	}
	,get_height: function() {
		return 0;
	}
	,get_numGlyphs: function() {
		return 0;
	}
	,get_underlinePosition: function() {
		return 0;
	}
	,get_underlineThickness: function() {
		return 0;
	}
	,get_unitsPerEM: function() {
		return 0;
	}
	,__class__: lime_text_Font
};
var lime_text__$Glyph_Glyph_$Impl_$ = {};
$hxClasses["lime.text._Glyph.Glyph_Impl_"] = lime_text__$Glyph_Glyph_$Impl_$;
lime_text__$Glyph_Glyph_$Impl_$.__name__ = ["lime","text","_Glyph","Glyph_Impl_"];
lime_text__$Glyph_Glyph_$Impl_$._new = function(i) {
	return i;
};
var lime_text_GlyphMetrics = function() {
};
$hxClasses["lime.text.GlyphMetrics"] = lime_text_GlyphMetrics;
lime_text_GlyphMetrics.__name__ = ["lime","text","GlyphMetrics"];
lime_text_GlyphMetrics.prototype = {
	advance: null
	,height: null
	,horizontalBearing: null
	,verticalBearing: null
	,__class__: lime_text_GlyphMetrics
};
var lime_ui_Gamepad = function(id) {
	this.onDisconnect = new lime_app_Event_$Void_$Void();
	this.onButtonUp = new lime_app_Event_$lime_$ui_$GamepadButton_$Void();
	this.onButtonDown = new lime_app_Event_$lime_$ui_$GamepadButton_$Void();
	this.onAxisMove = new lime_app_Event_$lime_$ui_$GamepadAxis_$Float_$Void();
	this.id = id;
	this.connected = true;
};
$hxClasses["lime.ui.Gamepad"] = lime_ui_Gamepad;
lime_ui_Gamepad.__name__ = ["lime","ui","Gamepad"];
lime_ui_Gamepad.addMappings = function(mappings) {
};
lime_ui_Gamepad.__connect = function(id) {
	if(!lime_ui_Gamepad.devices.h.hasOwnProperty(id)) {
		var gamepad = new lime_ui_Gamepad(id);
		lime_ui_Gamepad.devices.h[id] = gamepad;
		lime_ui_Gamepad.onConnect.dispatch(gamepad);
	}
};
lime_ui_Gamepad.__disconnect = function(id) {
	var gamepad = lime_ui_Gamepad.devices.h[id];
	if(gamepad != null) gamepad.connected = false;
	lime_ui_Gamepad.devices.remove(id);
	if(gamepad != null) gamepad.onDisconnect.dispatch();
};
lime_ui_Gamepad.prototype = {
	connected: null
	,id: null
	,onAxisMove: null
	,onButtonDown: null
	,onButtonUp: null
	,onDisconnect: null
	,get_guid: function() {
		var devices = lime_ui_Joystick.__getDeviceData();
		return devices[this.id].id;
	}
	,get_name: function() {
		var devices = lime_ui_Joystick.__getDeviceData();
		return devices[this.id].id;
	}
	,__class__: lime_ui_Gamepad
};
var lime_ui__$GamepadAxis_GamepadAxis_$Impl_$ = {};
$hxClasses["lime.ui._GamepadAxis.GamepadAxis_Impl_"] = lime_ui__$GamepadAxis_GamepadAxis_$Impl_$;
lime_ui__$GamepadAxis_GamepadAxis_$Impl_$.__name__ = ["lime","ui","_GamepadAxis","GamepadAxis_Impl_"];
lime_ui__$GamepadAxis_GamepadAxis_$Impl_$.toString = function(this1) {
	switch(this1) {
	case 0:
		return "LEFT_X";
	case 1:
		return "LEFT_Y";
	case 2:
		return "RIGHT_X";
	case 3:
		return "RIGHT_Y";
	case 4:
		return "TRIGGER_LEFT";
	case 5:
		return "TRIGGER_RIGHT";
	default:
		return "UNKNOWN (" + this1 + ")";
	}
};
var lime_ui__$GamepadButton_GamepadButton_$Impl_$ = {};
$hxClasses["lime.ui._GamepadButton.GamepadButton_Impl_"] = lime_ui__$GamepadButton_GamepadButton_$Impl_$;
lime_ui__$GamepadButton_GamepadButton_$Impl_$.__name__ = ["lime","ui","_GamepadButton","GamepadButton_Impl_"];
lime_ui__$GamepadButton_GamepadButton_$Impl_$.toString = function(this1) {
	switch(this1) {
	case 0:
		return "A";
	case 1:
		return "B";
	case 2:
		return "X";
	case 3:
		return "Y";
	case 4:
		return "BACK";
	case 5:
		return "GUIDE";
	case 6:
		return "START";
	case 7:
		return "LEFT_STICK";
	case 8:
		return "RIGHT_STICK";
	case 9:
		return "LEFT_SHOULDER";
	case 10:
		return "RIGHT_SHOULDER";
	case 11:
		return "DPAD_UP";
	case 12:
		return "DPAD_DOWN";
	case 13:
		return "DPAD_LEFT";
	case 14:
		return "DPAD_RIGHT";
	default:
		return "UNKNOWN (" + this1 + ")";
	}
};
var lime_ui_Joystick = function(id) {
	this.onTrackballMove = new lime_app_Event_$Int_$Float_$Void();
	this.onHatMove = new lime_app_Event_$Int_$lime_$ui_$JoystickHatPosition_$Void();
	this.onDisconnect = new lime_app_Event_$Void_$Void();
	this.onButtonUp = new lime_app_Event_$Int_$Void();
	this.onButtonDown = new lime_app_Event_$Int_$Void();
	this.onAxisMove = new lime_app_Event_$Int_$Float_$Void();
	this.id = id;
	this.connected = true;
};
$hxClasses["lime.ui.Joystick"] = lime_ui_Joystick;
lime_ui_Joystick.__name__ = ["lime","ui","Joystick"];
lime_ui_Joystick.__connect = function(id) {
	if(!lime_ui_Joystick.devices.h.hasOwnProperty(id)) {
		var joystick = new lime_ui_Joystick(id);
		lime_ui_Joystick.devices.h[id] = joystick;
		lime_ui_Joystick.onConnect.dispatch(joystick);
	}
};
lime_ui_Joystick.__disconnect = function(id) {
	var joystick = lime_ui_Joystick.devices.h[id];
	if(joystick != null) joystick.connected = false;
	lime_ui_Joystick.devices.remove(id);
	if(joystick != null) joystick.onDisconnect.dispatch();
};
lime_ui_Joystick.__getDeviceData = function() {
	if(navigator.getGamepads) return navigator.getGamepads(); else if(navigator.webkitGetGamepads) return navigator.webkitGetGamepads(); else return null;
};
lime_ui_Joystick.prototype = {
	connected: null
	,id: null
	,onAxisMove: null
	,onButtonDown: null
	,onButtonUp: null
	,onDisconnect: null
	,onHatMove: null
	,onTrackballMove: null
	,get_guid: function() {
		var devices = lime_ui_Joystick.__getDeviceData();
		return devices[this.id].id;
	}
	,get_name: function() {
		var devices = lime_ui_Joystick.__getDeviceData();
		return devices[this.id].id;
	}
	,get_numAxes: function() {
		var devices = lime_ui_Joystick.__getDeviceData();
		return devices[this.id].axes.length;
	}
	,get_numButtons: function() {
		var devices = lime_ui_Joystick.__getDeviceData();
		return devices[this.id].buttons.length;
	}
	,get_numHats: function() {
		return 0;
	}
	,get_numTrackballs: function() {
		return 0;
	}
	,__class__: lime_ui_Joystick
};
var lime_ui__$JoystickHatPosition_JoystickHatPosition_$Impl_$ = {};
$hxClasses["lime.ui._JoystickHatPosition.JoystickHatPosition_Impl_"] = lime_ui__$JoystickHatPosition_JoystickHatPosition_$Impl_$;
lime_ui__$JoystickHatPosition_JoystickHatPosition_$Impl_$.__name__ = ["lime","ui","_JoystickHatPosition","JoystickHatPosition_Impl_"];
lime_ui__$JoystickHatPosition_JoystickHatPosition_$Impl_$._new = function(value) {
	return value;
};
lime_ui__$JoystickHatPosition_JoystickHatPosition_$Impl_$.get_center = function(this1) {
	return this1 == 0;
};
lime_ui__$JoystickHatPosition_JoystickHatPosition_$Impl_$.set_center = function(this1,value) {
	if(value) this1 = 0;
	return value;
};
lime_ui__$JoystickHatPosition_JoystickHatPosition_$Impl_$.get_down = function(this1) {
	return (this1 & 4) > 0;
};
lime_ui__$JoystickHatPosition_JoystickHatPosition_$Impl_$.set_down = function(this1,value) {
	if(value) this1 |= 4; else this1 &= 268435455 - 4;
	return value;
};
lime_ui__$JoystickHatPosition_JoystickHatPosition_$Impl_$.get_left = function(this1) {
	return (this1 & 8) > 0;
};
lime_ui__$JoystickHatPosition_JoystickHatPosition_$Impl_$.set_left = function(this1,value) {
	if(value) this1 |= 8; else this1 &= 268435455 - 8;
	return value;
};
lime_ui__$JoystickHatPosition_JoystickHatPosition_$Impl_$.get_right = function(this1) {
	return (this1 & 2) > 0;
};
lime_ui__$JoystickHatPosition_JoystickHatPosition_$Impl_$.set_right = function(this1,value) {
	if(value) this1 |= 2; else this1 &= 268435455 - 2;
	return value;
};
lime_ui__$JoystickHatPosition_JoystickHatPosition_$Impl_$.get_up = function(this1) {
	return (this1 & 1) > 0;
};
lime_ui__$JoystickHatPosition_JoystickHatPosition_$Impl_$.set_up = function(this1,value) {
	if(value) this1 |= 1; else this1 &= 268435455 - 1;
	return value;
};
var lime_ui__$KeyCode_KeyCode_$Impl_$ = {};
$hxClasses["lime.ui._KeyCode.KeyCode_Impl_"] = lime_ui__$KeyCode_KeyCode_$Impl_$;
lime_ui__$KeyCode_KeyCode_$Impl_$.__name__ = ["lime","ui","_KeyCode","KeyCode_Impl_"];
lime_ui__$KeyCode_KeyCode_$Impl_$.gt = function(a,b) {
	return a > b;
};
lime_ui__$KeyCode_KeyCode_$Impl_$.gte = function(a,b) {
	return a >= b;
};
lime_ui__$KeyCode_KeyCode_$Impl_$.lt = function(a,b) {
	return a < b;
};
lime_ui__$KeyCode_KeyCode_$Impl_$.lte = function(a,b) {
	return a <= b;
};
lime_ui__$KeyCode_KeyCode_$Impl_$.plus = function(a,b) {
	return a + b;
};
var lime_ui__$KeyModifier_KeyModifier_$Impl_$ = {};
$hxClasses["lime.ui._KeyModifier.KeyModifier_Impl_"] = lime_ui__$KeyModifier_KeyModifier_$Impl_$;
lime_ui__$KeyModifier_KeyModifier_$Impl_$.__name__ = ["lime","ui","_KeyModifier","KeyModifier_Impl_"];
lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_altKey = function(this1) {
	return (this1 & 256) > 0 || (this1 & 512) > 0;
};
lime_ui__$KeyModifier_KeyModifier_$Impl_$.set_altKey = function(this1,value) {
	if(value) this1 |= 768; else this1 &= 268435455 - 768;
	return value;
};
lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_capsLock = function(this1) {
	return (this1 & 8192) > 0 || (this1 & 8192) > 0;
};
lime_ui__$KeyModifier_KeyModifier_$Impl_$.set_capsLock = function(this1,value) {
	if(value) this1 |= 8192; else this1 &= 268435455 - 8192;
	return value;
};
lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_ctrlKey = function(this1) {
	return (this1 & 64) > 0 || (this1 & 128) > 0;
};
lime_ui__$KeyModifier_KeyModifier_$Impl_$.set_ctrlKey = function(this1,value) {
	if(value) this1 |= 192; else this1 &= 268435455 - 192;
	return value;
};
lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_metaKey = function(this1) {
	return (this1 & 1024) > 0 || (this1 & 2048) > 0;
};
lime_ui__$KeyModifier_KeyModifier_$Impl_$.set_metaKey = function(this1,value) {
	if(value) this1 |= 3072; else this1 &= 268435455 - 3072;
	return value;
};
lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_numLock = function(this1) {
	return (this1 & 4096) > 0 || (this1 & 4096) > 0;
};
lime_ui__$KeyModifier_KeyModifier_$Impl_$.set_numLock = function(this1,value) {
	if(value) this1 |= 4096; else this1 &= 268435455 - 4096;
	return value;
};
lime_ui__$KeyModifier_KeyModifier_$Impl_$.get_shiftKey = function(this1) {
	return (this1 & 1) > 0 || (this1 & 2) > 0;
};
lime_ui__$KeyModifier_KeyModifier_$Impl_$.set_shiftKey = function(this1,value) {
	if(value) this1 |= 3; else this1 &= 268435455 - 3;
	return value;
};
var lime_ui_Mouse = function() { };
$hxClasses["lime.ui.Mouse"] = lime_ui_Mouse;
lime_ui_Mouse.__name__ = ["lime","ui","Mouse"];
lime_ui_Mouse.hide = function() {
	lime__$backend_html5_HTML5Mouse.hide();
};
lime_ui_Mouse.show = function() {
	lime__$backend_html5_HTML5Mouse.show();
};
lime_ui_Mouse.warp = function(x,y,window) {
	lime__$backend_html5_HTML5Mouse.warp(x,y,window);
};
lime_ui_Mouse.get_cursor = function() {
	return lime__$backend_html5_HTML5Mouse.get_cursor();
};
lime_ui_Mouse.set_cursor = function(value) {
	return lime__$backend_html5_HTML5Mouse.set_cursor(value);
};
lime_ui_Mouse.get_lock = function() {
	return lime__$backend_html5_HTML5Mouse.get_lock();
};
lime_ui_Mouse.set_lock = function(value) {
	return lime__$backend_html5_HTML5Mouse.set_lock(value);
};
var lime_ui_MouseCursor = $hxClasses["lime.ui.MouseCursor"] = { __ename__ : ["lime","ui","MouseCursor"], __constructs__ : ["ARROW","CROSSHAIR","DEFAULT","MOVE","POINTER","RESIZE_NESW","RESIZE_NS","RESIZE_NWSE","RESIZE_WE","TEXT","WAIT","WAIT_ARROW","CUSTOM"] };
lime_ui_MouseCursor.ARROW = ["ARROW",0];
lime_ui_MouseCursor.ARROW.toString = $estr;
lime_ui_MouseCursor.ARROW.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.CROSSHAIR = ["CROSSHAIR",1];
lime_ui_MouseCursor.CROSSHAIR.toString = $estr;
lime_ui_MouseCursor.CROSSHAIR.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.DEFAULT = ["DEFAULT",2];
lime_ui_MouseCursor.DEFAULT.toString = $estr;
lime_ui_MouseCursor.DEFAULT.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.MOVE = ["MOVE",3];
lime_ui_MouseCursor.MOVE.toString = $estr;
lime_ui_MouseCursor.MOVE.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.POINTER = ["POINTER",4];
lime_ui_MouseCursor.POINTER.toString = $estr;
lime_ui_MouseCursor.POINTER.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.RESIZE_NESW = ["RESIZE_NESW",5];
lime_ui_MouseCursor.RESIZE_NESW.toString = $estr;
lime_ui_MouseCursor.RESIZE_NESW.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.RESIZE_NS = ["RESIZE_NS",6];
lime_ui_MouseCursor.RESIZE_NS.toString = $estr;
lime_ui_MouseCursor.RESIZE_NS.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.RESIZE_NWSE = ["RESIZE_NWSE",7];
lime_ui_MouseCursor.RESIZE_NWSE.toString = $estr;
lime_ui_MouseCursor.RESIZE_NWSE.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.RESIZE_WE = ["RESIZE_WE",8];
lime_ui_MouseCursor.RESIZE_WE.toString = $estr;
lime_ui_MouseCursor.RESIZE_WE.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.TEXT = ["TEXT",9];
lime_ui_MouseCursor.TEXT.toString = $estr;
lime_ui_MouseCursor.TEXT.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.WAIT = ["WAIT",10];
lime_ui_MouseCursor.WAIT.toString = $estr;
lime_ui_MouseCursor.WAIT.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.WAIT_ARROW = ["WAIT_ARROW",11];
lime_ui_MouseCursor.WAIT_ARROW.toString = $estr;
lime_ui_MouseCursor.WAIT_ARROW.__enum__ = lime_ui_MouseCursor;
lime_ui_MouseCursor.CUSTOM = ["CUSTOM",12];
lime_ui_MouseCursor.CUSTOM.toString = $estr;
lime_ui_MouseCursor.CUSTOM.__enum__ = lime_ui_MouseCursor;
var lime_ui_Touch = function(x,y,id,dx,dy,pressure,device) {
	this.x = x;
	this.y = y;
	this.id = id;
	this.dx = dx;
	this.dy = dy;
	this.pressure = pressure;
	this.device = device;
};
$hxClasses["lime.ui.Touch"] = lime_ui_Touch;
lime_ui_Touch.__name__ = ["lime","ui","Touch"];
lime_ui_Touch.prototype = {
	device: null
	,dx: null
	,dy: null
	,id: null
	,pressure: null
	,x: null
	,y: null
	,__class__: lime_ui_Touch
};
var lime_ui_Window = function(config) {
	this.onTextInput = new lime_app_Event_$String_$Void();
	this.onTextEdit = new lime_app_Event_$String_$Int_$Int_$Void();
	this.onRestore = new lime_app_Event_$Void_$Void();
	this.onResize = new lime_app_Event_$Int_$Int_$Void();
	this.onMove = new lime_app_Event_$Float_$Float_$Void();
	this.onMouseWheel = new lime_app_Event_$Float_$Float_$Void();
	this.onMouseUp = new lime_app_Event_$Float_$Float_$Int_$Void();
	this.onMouseMoveRelative = new lime_app_Event_$Float_$Float_$Void();
	this.onMouseMove = new lime_app_Event_$Float_$Float_$Void();
	this.onMouseDown = new lime_app_Event_$Float_$Float_$Int_$Void();
	this.onMinimize = new lime_app_Event_$Void_$Void();
	this.onLeave = new lime_app_Event_$Void_$Void();
	this.onKeyUp = new lime_app_Event_$lime_$ui_$KeyCode_$lime_$ui_$KeyModifier_$Void();
	this.onKeyDown = new lime_app_Event_$lime_$ui_$KeyCode_$lime_$ui_$KeyModifier_$Void();
	this.onFullscreen = new lime_app_Event_$Void_$Void();
	this.onFocusOut = new lime_app_Event_$Void_$Void();
	this.onFocusIn = new lime_app_Event_$Void_$Void();
	this.onEnter = new lime_app_Event_$Void_$Void();
	this.onDropFile = new lime_app_Event_$String_$Void();
	this.onDeactivate = new lime_app_Event_$Void_$Void();
	this.onCreate = new lime_app_Event_$Void_$Void();
	this.onClose = new lime_app_Event_$Void_$Void();
	this.onActivate = new lime_app_Event_$Void_$Void();
	this.config = config;
	this.__width = 0;
	this.__height = 0;
	this.__fullscreen = false;
	this.__scale = 1;
	this.__x = 0;
	this.__y = 0;
	this.__title = "";
	this.id = -1;
	if(config != null) {
		if(Object.prototype.hasOwnProperty.call(config,"width")) this.__width = config.width;
		if(Object.prototype.hasOwnProperty.call(config,"height")) this.__height = config.height;
		if(Object.prototype.hasOwnProperty.call(config,"x")) this.__x = config.x;
		if(Object.prototype.hasOwnProperty.call(config,"y")) this.__y = config.y;
		if(Object.prototype.hasOwnProperty.call(config,"fullscreen")) this.__fullscreen = config.fullscreen;
		if(Object.prototype.hasOwnProperty.call(config,"borderless")) this.__borderless = config.borderless;
		if(Object.prototype.hasOwnProperty.call(config,"resizable")) this.__resizable = config.resizable;
		if(Object.prototype.hasOwnProperty.call(config,"title")) this.__title = config.title;
	}
	this.backend = new lime__$backend_html5_HTML5Window(this);
};
$hxClasses["lime.ui.Window"] = lime_ui_Window;
lime_ui_Window.__name__ = ["lime","ui","Window"];
lime_ui_Window.prototype = {
	application: null
	,config: null
	,display: null
	,id: null
	,onActivate: null
	,onClose: null
	,onCreate: null
	,onDeactivate: null
	,onDropFile: null
	,onEnter: null
	,onFocusIn: null
	,onFocusOut: null
	,onFullscreen: null
	,onKeyDown: null
	,onKeyUp: null
	,onLeave: null
	,onMinimize: null
	,onMouseDown: null
	,onMouseMove: null
	,onMouseMoveRelative: null
	,onMouseUp: null
	,onMouseWheel: null
	,onMove: null
	,onResize: null
	,onRestore: null
	,onTextEdit: null
	,onTextInput: null
	,renderer: null
	,scale: null
	,stage: null
	,backend: null
	,__borderless: null
	,__fullscreen: null
	,__height: null
	,__maximized: null
	,__minimized: null
	,__resizable: null
	,__scale: null
	,__title: null
	,__width: null
	,__x: null
	,__y: null
	,alert: function(message,title) {
		this.backend.alert(message,title);
	}
	,close: function() {
		this.backend.close();
	}
	,create: function(application) {
		this.application = application;
		this.backend.create(application);
		if(this.renderer != null) this.renderer.create();
	}
	,focus: function() {
		this.backend.focus();
	}
	,move: function(x,y) {
		this.backend.move(x,y);
		this.__x = x;
		this.__y = y;
	}
	,resize: function(width,height) {
		this.backend.resize(width,height);
		this.__width = width;
		this.__height = height;
	}
	,setIcon: function(image) {
		if(image == null) return;
		this.backend.setIcon(image);
	}
	,toString: function() {
		return "[object Window]";
	}
	,get_display: function() {
		return this.backend.getDisplay();
	}
	,get_borderless: function() {
		return this.__borderless;
	}
	,set_borderless: function(value) {
		return this.__borderless = this.backend.setBorderless(value);
	}
	,get_enableTextEvents: function() {
		return this.backend.getEnableTextEvents();
	}
	,set_enableTextEvents: function(value) {
		return this.backend.setEnableTextEvents(value);
	}
	,get_fullscreen: function() {
		return this.__fullscreen;
	}
	,set_fullscreen: function(value) {
		return this.__fullscreen = this.backend.setFullscreen(value);
	}
	,get_height: function() {
		return this.__height;
	}
	,set_height: function(value) {
		this.resize(this.__width,value);
		return this.__height;
	}
	,get_maximized: function() {
		return this.__maximized;
	}
	,set_maximized: function(value) {
		this.__minimized = false;
		return this.__maximized = this.backend.setMaximized(value);
	}
	,get_minimized: function() {
		return this.__minimized;
	}
	,set_minimized: function(value) {
		this.__maximized = false;
		return this.__minimized = this.backend.setMinimized(value);
	}
	,get_resizable: function() {
		return this.__resizable;
	}
	,set_resizable: function(value) {
		this.__resizable = this.backend.setResizable(value);
		return this.__resizable;
	}
	,get_scale: function() {
		return this.__scale;
	}
	,get_title: function() {
		return this.__title;
	}
	,set_title: function(value) {
		return this.__title = this.backend.setTitle(this.__title);
	}
	,get_width: function() {
		return this.__width;
	}
	,set_width: function(value) {
		this.resize(value,this.__height);
		return this.__width;
	}
	,get_x: function() {
		return this.__x;
	}
	,set_x: function(value) {
		this.move(value,this.__y);
		return this.__x;
	}
	,get_y: function() {
		return this.__y;
	}
	,set_y: function(value) {
		this.move(this.__x,value);
		return this.__y;
	}
	,__class__: lime_ui_Window
};
var lime_utils_TAError = $hxClasses["lime.utils.TAError"] = { __ename__ : ["lime","utils","TAError"], __constructs__ : ["RangeError"] };
lime_utils_TAError.RangeError = ["RangeError",0];
lime_utils_TAError.RangeError.toString = $estr;
lime_utils_TAError.RangeError.__enum__ = lime_utils_TAError;
var lime_utils_Bytes = function(length,bytesData) {
	haxe_io_Bytes.call(this,bytesData);
};
$hxClasses["lime.utils.Bytes"] = lime_utils_Bytes;
lime_utils_Bytes.__name__ = ["lime","utils","Bytes"];
lime_utils_Bytes.alloc = function(length) {
	var bytes = haxe_io_Bytes.alloc(length);
	return new lime_utils_Bytes(bytes.length,bytes.b.bufferValue);
};
lime_utils_Bytes.fastGet = function(b,pos) {
	return b.bytes[pos];
};
lime_utils_Bytes.ofData = function(b) {
	var bytes = haxe_io_Bytes.ofData(b);
	return new lime_utils_Bytes(bytes.length,bytes.b.bufferValue);
};
lime_utils_Bytes.ofString = function(s) {
	var bytes = haxe_io_Bytes.ofString(s);
	return new lime_utils_Bytes(bytes.length,bytes.b.bufferValue);
};
lime_utils_Bytes.readFile = function(path) {
	return null;
};
lime_utils_Bytes.lime_bytes_from_data_pointer = function(data,length) {
	return lime_utils_Bytes.cffi_lime_bytes_from_data_pointer(data,length);
};
lime_utils_Bytes.lime_bytes_get_data_pointer = function(data) {
	return lime_utils_Bytes.cffi_lime_bytes_get_data_pointer(data);
};
lime_utils_Bytes.lime_bytes_read_file = function(path) {
	return lime_utils_Bytes.cffi_lime_bytes_read_file(path);
};
lime_utils_Bytes.__super__ = haxe_io_Bytes;
lime_utils_Bytes.prototype = $extend(haxe_io_Bytes.prototype,{
	__class__: lime_utils_Bytes
});
var lime_utils__$Float32Array_Float32Array_$Impl_$ = {};
$hxClasses["lime.utils._Float32Array.Float32Array_Impl_"] = lime_utils__$Float32Array_Float32Array_$Impl_$;
lime_utils__$Float32Array_Float32Array_$Impl_$.__name__ = ["lime","utils","_Float32Array","Float32Array_Impl_"];
lime_utils__$Float32Array_Float32Array_$Impl_$.__set = function(this1,idx,val) {
	return this1[idx] = val;
};
lime_utils__$Float32Array_Float32Array_$Impl_$.__get = function(this1,idx) {
	return this1[idx];
};
lime_utils__$Float32Array_Float32Array_$Impl_$.fromBytes = function(bytes,byteOffset,len) {
	if(byteOffset == null) byteOffset = 0;
	if(byteOffset == null) return new Float32Array(bytes.b.bufferValue);
	if(len == null) return new Float32Array(bytes.b.bufferValue,byteOffset);
	return new Float32Array(bytes.b.bufferValue,byteOffset,len);
};
lime_utils__$Float32Array_Float32Array_$Impl_$.toBytes = function(this1) {
	return new haxe_io_Bytes(new Uint8Array(this1.buffer));
};
lime_utils__$Float32Array_Float32Array_$Impl_$.toString = function(this1) {
	if(this1 != null) return "Float32Array [byteLength:" + this1.byteLength + ", length:" + this1.length + "]"; else return null;
};
var lime_utils_GLUtils = function() { };
$hxClasses["lime.utils.GLUtils"] = lime_utils_GLUtils;
lime_utils_GLUtils.__name__ = ["lime","utils","GLUtils"];
lime_utils_GLUtils.compileShader = function(source,type) {
	var shader = lime_graphics_opengl_GL.context.createShader(type);
	lime_graphics_opengl_GL.context.shaderSource(shader,source);
	lime_graphics_opengl_GL.context.compileShader(shader);
	if(lime_graphics_opengl_GL.context.getShaderParameter(shader,35713) == 0) switch(type) {
	case 35633:
		throw new js__$Boot_HaxeError("Error compiling vertex shader");
		break;
	case 35632:
		throw new js__$Boot_HaxeError("Error compiling fragment shader");
		break;
	default:
		throw new js__$Boot_HaxeError("Error compiling unknown shader type");
	}
	return shader;
};
lime_utils_GLUtils.createProgram = function(vertexSource,fragmentSource) {
	var vertexShader = lime_utils_GLUtils.compileShader(vertexSource,35633);
	var fragmentShader = lime_utils_GLUtils.compileShader(fragmentSource,35632);
	var program = lime_graphics_opengl_GL.context.createProgram();
	lime_graphics_opengl_GL.context.attachShader(program,vertexShader);
	lime_graphics_opengl_GL.context.attachShader(program,fragmentShader);
	lime_graphics_opengl_GL.context.linkProgram(program);
	if(lime_graphics_opengl_GL.context.getProgramParameter(program,35714) == 0) throw new js__$Boot_HaxeError("Unable to initialize the shader program.");
	return program;
};
var lime_utils__$Int16Array_Int16Array_$Impl_$ = {};
$hxClasses["lime.utils._Int16Array.Int16Array_Impl_"] = lime_utils__$Int16Array_Int16Array_$Impl_$;
lime_utils__$Int16Array_Int16Array_$Impl_$.__name__ = ["lime","utils","_Int16Array","Int16Array_Impl_"];
lime_utils__$Int16Array_Int16Array_$Impl_$.__set = function(this1,idx,val) {
	return this1[idx] = val;
};
lime_utils__$Int16Array_Int16Array_$Impl_$.__get = function(this1,idx) {
	return this1[idx];
};
lime_utils__$Int16Array_Int16Array_$Impl_$.fromBytes = function(bytes,byteOffset,len) {
	if(byteOffset == null) byteOffset = 0;
	if(byteOffset == null) return new Int16Array(bytes.b.bufferValue);
	if(len == null) return new Int16Array(bytes.b.bufferValue,byteOffset);
	return new Int16Array(bytes.b.bufferValue,byteOffset,len);
};
lime_utils__$Int16Array_Int16Array_$Impl_$.toBytes = function(this1) {
	return new haxe_io_Bytes(new Uint8Array(this1.buffer));
};
lime_utils__$Int16Array_Int16Array_$Impl_$.toString = function(this1) {
	if(this1 != null) return "Int16Array [byteLength:" + this1.byteLength + ", length:" + this1.length + "]"; else return null;
};
var lime_utils__$Int32Array_Int32Array_$Impl_$ = {};
$hxClasses["lime.utils._Int32Array.Int32Array_Impl_"] = lime_utils__$Int32Array_Int32Array_$Impl_$;
lime_utils__$Int32Array_Int32Array_$Impl_$.__name__ = ["lime","utils","_Int32Array","Int32Array_Impl_"];
lime_utils__$Int32Array_Int32Array_$Impl_$.__set = function(this1,idx,val) {
	return this1[idx] = val;
};
lime_utils__$Int32Array_Int32Array_$Impl_$.__get = function(this1,idx) {
	return this1[idx];
};
lime_utils__$Int32Array_Int32Array_$Impl_$.fromBytes = function(bytes,byteOffset,len) {
	if(byteOffset == null) byteOffset = 0;
	if(byteOffset == null) return new Int32Array(bytes.b.bufferValue);
	if(len == null) return new Int32Array(bytes.b.bufferValue,byteOffset);
	return new Int32Array(bytes.b.bufferValue,byteOffset,len);
};
lime_utils__$Int32Array_Int32Array_$Impl_$.toBytes = function(this1) {
	return new haxe_io_Bytes(new Uint8Array(this1.buffer));
};
lime_utils__$Int32Array_Int32Array_$Impl_$.toString = function(this1) {
	if(this1 != null) return "Int32Array [byteLength:" + this1.byteLength + ", length:" + this1.length + "]"; else return null;
};
var lime_utils__$UInt32Array_UInt32Array_$Impl_$ = {};
$hxClasses["lime.utils._UInt32Array.UInt32Array_Impl_"] = lime_utils__$UInt32Array_UInt32Array_$Impl_$;
lime_utils__$UInt32Array_UInt32Array_$Impl_$.__name__ = ["lime","utils","_UInt32Array","UInt32Array_Impl_"];
lime_utils__$UInt32Array_UInt32Array_$Impl_$.__set = function(this1,idx,val) {
	return this1[idx] = val;
};
lime_utils__$UInt32Array_UInt32Array_$Impl_$.__get = function(this1,idx) {
	return this1[idx];
};
lime_utils__$UInt32Array_UInt32Array_$Impl_$.fromBytes = function(bytes,byteOffset,len) {
	if(byteOffset == null) byteOffset = 0;
	if(byteOffset == null) return new Uint32Array(bytes.b.bufferValue);
	if(len == null) return new Uint32Array(bytes.b.bufferValue,byteOffset);
	return new Uint32Array(bytes.b.bufferValue,byteOffset,len);
};
lime_utils__$UInt32Array_UInt32Array_$Impl_$.toBytes = function(this1) {
	return new haxe_io_Bytes(new Uint8Array(this1.buffer));
};
lime_utils__$UInt32Array_UInt32Array_$Impl_$.toString = function(this1) {
	if(this1 != null) return "UInt32Array [byteLength:" + this1.byteLength + ", length:" + this1.length + "]"; else return null;
};
var lime_utils__$UInt8Array_UInt8Array_$Impl_$ = {};
$hxClasses["lime.utils._UInt8Array.UInt8Array_Impl_"] = lime_utils__$UInt8Array_UInt8Array_$Impl_$;
lime_utils__$UInt8Array_UInt8Array_$Impl_$.__name__ = ["lime","utils","_UInt8Array","UInt8Array_Impl_"];
lime_utils__$UInt8Array_UInt8Array_$Impl_$.__set = function(this1,idx,val) {
	return this1[idx] = val;
};
lime_utils__$UInt8Array_UInt8Array_$Impl_$.__get = function(this1,idx) {
	return this1[idx];
};
lime_utils__$UInt8Array_UInt8Array_$Impl_$.fromBytes = function(bytes,byteOffset,len) {
	if(byteOffset == null) return new Uint8Array(bytes.b.bufferValue);
	if(len == null) return new Uint8Array(bytes.b.bufferValue,byteOffset);
	return new Uint8Array(bytes.b.bufferValue,byteOffset,len);
};
lime_utils__$UInt8Array_UInt8Array_$Impl_$.toBytes = function(this1) {
	return new haxe_io_Bytes(new Uint8Array(this1.buffer));
};
lime_utils__$UInt8Array_UInt8Array_$Impl_$.toString = function(this1) {
	if(this1 != null) return "UInt8Array [byteLength:" + this1.byteLength + ", length:" + this1.length + "]"; else return null;
};
var oge2d_build_Macro = function() {
};
$hxClasses["oge2d.build.Macro"] = oge2d_build_Macro;
oge2d_build_Macro.__name__ = ["oge2d","build","Macro"];
oge2d_build_Macro.encrypt = function(bytes,key) {
	if(key != null && key.length > 0 && bytes != null) {
		var _g1 = 0;
		var _g = bytes.length;
		while(_g1 < _g) {
			var i = _g1++;
			bytes.set(i,bytes.b[i] ^ HxOverrides.cca(key,i % key.length));
		}
	}
};
oge2d_build_Macro.decrypt = function(bytes,key) {
	oge2d_build_Macro.encrypt(bytes,key);
};
oge2d_build_Macro.prototype = {
	__class__: oge2d_build_Macro
};
var oge2d_core_Game = function(name,location) {
	this.loadings = null;
	this.scene = null;
	this.interval = 0;
	this.ticks = 0;
	this.height = 480;
	this.width = 640;
	this.components = null;
	this.libraries = null;
	this.systems = null;
	this.scenes = null;
	this.script = null;
	this.location = "";
	this.state = -1;
	this.name = "";
	this.name = name;
	this.state = -1;
	this.systems = new haxe_ds_StringMap();
	this.libraries = new haxe_ds_StringMap();
	this.components = new haxe_ds_StringMap();
	this.scenes = new haxe_ds_StringMap();
	this.script = new oge2d_script_Script(this.libraries,this,false);
	this.loadings = new List();
	if(location != null) this.location = location;
	while(this.location.length > 0 && StringTools.endsWith(this.location,"/")) this.location = HxOverrides.substr(this.location,0,this.location.length - 1);
	oge2d_driver_lime_Asset.init();
	try {
		var config = oge2d_driver_lime_Asset.getJsonObject(this.getAppFilePath());
		if(config != null) {
			this.width = config.screen.width;
			this.height = config.screen.height;
			this.script.format = config.script.format;
			this.state = 0;
		}
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
	}
};
$hxClasses["oge2d.core.Game"] = oge2d_core_Game;
oge2d_core_Game.__name__ = ["oge2d","core","Game"];
oge2d_core_Game.prototype = {
	name: null
	,state: null
	,location: null
	,script: null
	,scenes: null
	,systems: null
	,libraries: null
	,components: null
	,width: null
	,height: null
	,ticks: null
	,interval: null
	,scene: null
	,loadings: null
	,set_scene: function(value) {
		if(this.scene != value && value != null) {
			if(this.scene != null) {
				var $it0 = this.scene.systems.iterator();
				while( $it0.hasNext() ) {
					var updater = $it0.next();
					updater.bind(this,null);
				}
				this.scene.script.call("onInactive");
			}
			oge2d_driver_lime_Mouse.reset();
			oge2d_driver_lime_Keyboard.reset();
			oge2d_driver_lime_Asset.stopAllMusics();
			oge2d_driver_lime_Asset.stopAllSounds();
			this.scene = value;
			this.scene.resume();
			this.scene.ticks = 0;
			var $it1 = this.scene.data.keys();
			while( $it1.hasNext() ) {
				var key = $it1.next();
				this.scene.data.get(key).clear();
			}
			if(this.scene != null) {
				this.scene.script.call("onActive");
				var $it2 = this.scene.systems.iterator();
				while( $it2.hasNext() ) {
					var updater1 = $it2.next();
					updater1.bind(this,this.scene);
				}
			}
		}
		return this.scene;
	}
	,getAppFilePath: function() {
		return this.location + "/app.json";
	}
	,getGameFilePath: function(isConfigFile) {
		if(isConfigFile == null) isConfigFile = true;
		return this.location + "/games/" + this.name + (isConfigFile?".json":".hs");
	}
	,getImageFilePath: function(imageName) {
		return this.location + "/images/" + imageName + (imageName.indexOf(".") > 0?"":".png");
	}
	,getMusicFilePath: function(musicName) {
		if(musicName.indexOf(".") > 0) return this.location + "/musics/" + musicName;
		return this.location + "/musics/" + musicName + ".ogg";
	}
	,getSoundFilePath: function(soundName) {
		if(soundName.indexOf(".") > 0) return this.location + "/sounds/" + soundName;
		return this.location + "/sounds/" + soundName + ".ogg";
	}
	,getJsonFilePath: function(jsonName,dataType) {
		if(dataType == null) dataType = "";
		if(dataType == null || dataType.length <= 0) return this.location + "/jsons/" + jsonName + ".json";
		return this.location + "/jsons/" + dataType + "/" + jsonName + ".json";
	}
	,getSpriteFilePath: function(spriteName,isConfigFile) {
		if(isConfigFile == null) isConfigFile = true;
		return this.location + "/sprites/" + spriteName + (isConfigFile?".json":".hs");
	}
	,getSceneFilePath: function(sceneName,isConfigFile) {
		if(isConfigFile == null) isConfigFile = true;
		return this.location + "/scenes/" + sceneName + "/" + sceneName + (isConfigFile?".json":".hs");
	}
	,getSceneSpriteFilePath: function(sceneName,spriteName,isConfigFile) {
		if(isConfigFile == null) isConfigFile = true;
		return this.location + "/scenes/" + sceneName + "/sprites/" + spriteName + (isConfigFile?".json":".hs");
	}
	,isReadableScript: function() {
		return this.script.format != "bytecode";
	}
	,init: function(screenWidth,screenHeight,callback) {
		var _g = this;
		if(this.state > 0) return this.state > 0;
		var appConfig = oge2d_driver_lime_Asset.getJsonObject(this.getAppFilePath());
		if(screenWidth != null && screenWidth > 0) this.width = screenWidth; else if(appConfig != null) this.width = appConfig.screen.width; else this.width = this.width;
		if(screenHeight != null && screenHeight > 0) this.height = screenHeight; else if(appConfig != null) this.height = appConfig.screen.height; else this.height = this.height;
		if(appConfig != null) this.script.format = appConfig.script.format;
		var packNames = null;
		if(appConfig != null) packNames = appConfig.packs;
		this.loadPacks(packNames,null,null,function() {
			oge2d_driver_lime_Asset.loadJsonObject(_g.getGameFilePath(),function(config) {
				if(config == null) {
					haxe_Log.trace("Failed to load game config",{ fileName : "Game.hx", lineNumber : 151, className : "oge2d.core.Game", methodName : "init"});
					if(callback != null) callback();
				} else {
					oge2d_driver_lime_Keyboard.init(appConfig);
					oge2d_driver_lime_Mouse.init(_g.width / 2,_g.height / 2);
					var fieldNames = Reflect.fields(config);
					var _g1 = 0;
					while(_g1 < fieldNames.length) {
						var fieldName = fieldNames[_g1];
						++_g1;
						if(fieldName == "scenes") continue;
						if(fieldName == "events") continue;
						if(fieldName == "systems") continue;
						if(fieldName == "libraries") continue;
						if(fieldName == "preloads") continue;
						var value = Reflect.field(config,fieldName);
						_g.components.set(fieldName,value);
					}
					var systemSettings = config.systems;
					if(systemSettings != null) {
						var systemNames = Reflect.fields(systemSettings);
						var _g11 = 0;
						while(_g11 < systemNames.length) {
							var systemName = systemNames[_g11];
							++_g11;
							var systemClassName = Reflect.field(systemSettings,systemName);
							if(systemClassName != null) {
								var updater = Type.createInstance(Type.resolveClass(systemClassName),[]);
								if(updater != null) _g.systems.set(systemName,updater);
							}
						}
					}
					var librarySettings = config.libraries;
					if(librarySettings != null) {
						var libraryNames = Reflect.fields(librarySettings);
						var _g12 = 0;
						while(_g12 < libraryNames.length) {
							var libraryName = libraryNames[_g12];
							++_g12;
							var libraryClassName = Reflect.field(librarySettings,libraryName);
							if(libraryClassName != null) {
								var obj = Type.createInstance(Type.resolveClass(libraryClassName),[]);
								if(obj != null) _g.libraries.set(libraryName,obj);
							}
						}
					}
					var list = _g.getPreloadList(config);
					oge2d_driver_lime_Asset.loadFiles(list,null,function() {
						if(Object.prototype.hasOwnProperty.call(config,"events")) {
							if(oge2d_script_Script.getScriptMethods(config.events) != null) {
								var scriptFile = _g.getGameFilePath(false);
								oge2d_driver_lime_Asset.loadText(scriptFile,function(text) {
									oge2d_script_Script.load(config.events,_g.script,text,_g.isReadableScript(),["Keyboard","Mouse"],[oge2d_driver_lime_Keyboard,oge2d_driver_lime_Mouse]);
									_g.preloadScenes(config,callback);
								});
							} else {
								oge2d_script_Script.load(config.events,_g.script,"",_g.isReadableScript(),["Keyboard","Mouse"],[oge2d_driver_lime_Keyboard,oge2d_driver_lime_Mouse]);
								_g.preloadScenes(config,callback);
							}
						} else _g.preloadScenes(config,callback);
					});
				}
			});
		});
		return true;
	}
	,loadPacks: function(packNames,total,onProgress,onComplete) {
		var _g = this;
		if(packNames != null && packNames.length > 0) {
			var originalCount;
			if(total != null && total > 0) originalCount = total; else originalCount = packNames.length;
			if(originalCount == packNames.length) packNames.reverse();
			var packName = packNames.pop();
			if(packName != null && packName.length > 0) {
				var url;
				url = this.location + "/" + packName + (packName.indexOf(".") >= 0?"":".pack");
				oge2d_driver_lime_Asset.loadBytes(url,function(bytes) {
					var onePackPercentage = 1.0 / originalCount;
					var loadedPackCount = originalCount - (packNames.length + 1);
					if(bytes != null && bytes.length > 0) oge2d_driver_lime_Asset.loadPack(bytes,function(loadedItemCount,allItemCount) {
						if(onProgress != null) {
							var processed = onePackPercentage * loadedItemCount / allItemCount;
							onProgress(onePackPercentage * loadedPackCount + processed);
						}
					},function() {
						if(onProgress != null) onProgress(onePackPercentage * (loadedPackCount + 1));
						_g.loadPacks(packNames,originalCount,onProgress,onComplete);
					}); else {
						if(onProgress != null) onProgress(onePackPercentage * (loadedPackCount + 1));
						_g.loadPacks(packNames,originalCount,onProgress,onComplete);
					}
				});
			} else {
				if(onProgress != null) onProgress(1.0 / originalCount * (originalCount - packNames.length));
				this.loadPacks(packNames,originalCount,onProgress,onComplete);
			}
		} else if(onComplete != null) onComplete();
	}
	,getPreloadList: function(config) {
		var list = [];
		var preloadSettings;
		if(config == null) preloadSettings = null; else preloadSettings = config.preloads;
		if(preloadSettings != null) {
			var resTypes = Reflect.fields(preloadSettings);
			var _g = 0;
			while(_g < resTypes.length) {
				var resType = resTypes[_g];
				++_g;
				var preloadNames = Reflect.field(preloadSettings,resType);
				if(preloadNames == null || preloadNames.length <= 0) continue;
				if(resType == "jsons") {
					var _g1 = 0;
					while(_g1 < preloadNames.length) {
						var preloadName = preloadNames[_g1];
						++_g1;
						if(preloadName != null && preloadName.length > 0) {
							var nameParts = preloadName.split("|");
							if(nameParts.length == 1) list.push(this.getJsonFilePath(nameParts[0])); else list.push(this.getJsonFilePath(nameParts[1],nameParts[0]));
						}
					}
				} else if(resType == "images") {
					var _g11 = 0;
					while(_g11 < preloadNames.length) {
						var preloadName1 = preloadNames[_g11];
						++_g11;
						if(preloadName1 != null && preloadName1.length > 0) list.push(this.getImageFilePath(preloadName1));
					}
				} else if(resType == "musics") {
					var _g12 = 0;
					while(_g12 < preloadNames.length) {
						var preloadName2 = preloadNames[_g12];
						++_g12;
						if(preloadName2 != null && preloadName2.length > 0) list.push(this.getMusicFilePath(preloadName2));
					}
				} else if(resType == "sounds") {
					var _g13 = 0;
					while(_g13 < preloadNames.length) {
						var preloadName3 = preloadNames[_g13];
						++_g13;
						if(preloadName3 != null && preloadName3.length > 0) list.push(this.getSoundFilePath(preloadName3));
					}
				}
			}
		}
		return list;
	}
	,preloadScenes: function(config,callback) {
		var _g = this;
		var sceneNames = config.scenes;
		var firstScene;
		if(sceneNames != null && sceneNames.length > 0) firstScene = sceneNames[0]; else firstScene = null;
		this.loadScenes(sceneNames,null,null,function() {
			if(_g.script.isReady()) _g.script.call("onInit");
			if(firstScene != null && firstScene.length > 0) _g.state = 1; else haxe_Log.trace("Scene not found",{ fileName : "Game.hx", lineNumber : 304, className : "oge2d.core.Game", methodName : "preloadScenes"});
			if(callback != null) callback();
			if(firstScene != null && firstScene.length > 0) _g.setActiveScene(firstScene);
		});
	}
	,loadScene: function(sceneName,callback) {
		var _g = this;
		var matched = this.scenes.get(sceneName);
		if(matched != null) {
			callback(matched);
			return;
		}
		var configFile = this.getSceneFilePath(sceneName);
		oge2d_driver_lime_Asset.loadJsonObject(configFile,function(sceneConfig) {
			if(sceneConfig != null) {
				var newScene = new oge2d_core_Scene(_g,sceneName);
				newScene.init(sceneConfig,null,function() {
					_g.scenes.set(sceneName,newScene);
					callback(newScene);
				});
			} else {
				haxe_Log.trace("Failed to load scene with config file: " + configFile,{ fileName : "Game.hx", lineNumber : 325, className : "oge2d.core.Game", methodName : "loadScene"});
				callback(null);
			}
		});
	}
	,loadScenes: function(sceneNames,total,onProgress,onComplete) {
		var _g = this;
		if(sceneNames != null && sceneNames.length > 0) {
			var originalCount;
			if(total != null && total > 0) originalCount = total; else originalCount = sceneNames.length;
			if(originalCount == sceneNames.length) sceneNames.reverse();
			var loadedSceneCount = originalCount - sceneNames.length;
			var sceneName = sceneNames.pop();
			if(sceneName != null && sceneName.length > 0) {
				var configFile = this.getSceneFilePath(sceneName);
				oge2d_driver_lime_Asset.loadJsonObject(configFile,function(sceneConfig) {
					if(sceneConfig != null) {
						var newScene = new oge2d_core_Scene(_g,sceneName);
						newScene.init(sceneConfig,function(loadedItemCount,allItemCount) {
							if(onProgress != null) {
								var oneScenePercentage = 1.0 / originalCount;
								var processed = oneScenePercentage * loadedItemCount / allItemCount;
								onProgress(oneScenePercentage * loadedSceneCount + processed);
							}
						},function() {
							_g.scenes.set(sceneName,newScene);
							if(onProgress != null) onProgress(1.0 / originalCount * (loadedSceneCount + 1));
							_g.loadScenes(sceneNames,originalCount,onProgress,onComplete);
						});
					} else {
						haxe_Log.trace("Failed to load scene with config file: " + configFile,{ fileName : "Game.hx", lineNumber : 353, className : "oge2d.core.Game", methodName : "loadScenes"});
						if(onProgress != null) onProgress(1.0 / originalCount * (loadedSceneCount + 1));
						_g.loadScenes(sceneNames,originalCount,onProgress,onComplete);
					}
				});
			} else {
				if(onProgress != null) onProgress(1.0 / originalCount * (loadedSceneCount + 1));
				this.loadScenes(sceneNames,originalCount,onProgress,onComplete);
			}
		} else if(onComplete != null) onComplete();
	}
	,removeScene: function(sceneName) {
		var sce = this.scenes.get(sceneName);
		if(sce == null) return false;
		if(sce == this.scene) {
			haxe_Log.trace("Cannot remove current scene",{ fileName : "Game.hx", lineNumber : 369, className : "oge2d.core.Game", methodName : "removeScene"});
			return false;
		}
		this.scenes.remove(sceneName);
		return true;
	}
	,setActiveScene: function(sceneName) {
		var sce = this.scenes.get(sceneName);
		if(sce == null) return null; else this.set_scene(sce);
		return this.scene;
	}
	,getScene: function(sceneName) {
		return this.scenes.get(sceneName);
	}
	,sce: function(sceneName) {
		return this.scenes.get(sceneName);
	}
	,getSprite: function(spriteName) {
		if(this.scene == null) return null; else return this.scene.getSprite(spriteName);
	}
	,spr: function(spriteName) {
		if(this.scene == null) return null; else return this.scene.getSprite(spriteName);
	}
	,callScene: function(sceneName) {
		var _g = this;
		this.loadScene(sceneName,function(nextScene) {
			if(nextScene != null) _g.setActiveScene(nextScene.name);
		});
	}
	,get: function(compName) {
		return this.components.get(compName);
	}
	,set: function(compName,comp) {
		var value = comp;
		this.components.set(compName,value);
	}
	,getLibrary: function(libName) {
		return this.library(libName);
	}
	,library: function(libName) {
		return this.libraries.get(libName);
	}
	,getLibraryClass: function(libName) {
		return this.lib(libName);
	}
	,lib: function(libName) {
		if(libName == "Math") return Math; else if(libName == "Date") return Date; else if(libName == "DateTools") return DateTools; else if(libName == "StringTools") return StringTools;
		return Type.getClass(this.libraries.get(libName));
	}
	,getSystem: function(systemName) {
		return this.system(systemName);
	}
	,system: function(systemName) {
		return this.systems.get(systemName);
	}
	,getSystemClass: function(systemName) {
		return this.sys(systemName);
	}
	,sys: function(systemName) {
		return Type.getClass(this.systems.get(systemName));
	}
	,getJsonData: function(jsonName,dataType) {
		if(dataType == null) dataType = "";
		return oge2d_driver_lime_Asset.getJsonData(this.getJsonFilePath(jsonName,dataType));
	}
	,getTexture: function(texName) {
		return oge2d_driver_lime_Asset.getTexture(this.getImageFilePath(texName));
	}
	,loadTexture: function(texName,callback) {
		oge2d_driver_lime_Asset.loadTexture(this.getImageFilePath(texName),callback);
	}
	,getMusic: function(musicName) {
		return oge2d_driver_lime_Asset.getMusic(this.getMusicFilePath(musicName));
	}
	,music: function(musicName) {
		return oge2d_driver_lime_Asset.getMusic(this.getMusicFilePath(musicName));
	}
	,loadMusic: function(musicName,callback) {
		oge2d_driver_lime_Asset.loadMusic(this.getMusicFilePath(musicName),callback);
	}
	,getSound: function(soundName) {
		return oge2d_driver_lime_Asset.getSound(this.getSoundFilePath(soundName));
	}
	,sound: function(soundName) {
		return oge2d_driver_lime_Asset.getSound(this.getSoundFilePath(soundName));
	}
	,loadSound: function(soundName,callback) {
		oge2d_driver_lime_Asset.loadSound(this.getSoundFilePath(soundName),callback);
	}
	,stopAllMusics: function() {
		oge2d_driver_lime_Asset.stopAllMusics();
	}
	,stopAllSounds: function() {
		oge2d_driver_lime_Asset.stopAllSounds();
	}
	,removeTexture: function(texName) {
		oge2d_driver_lime_Asset.removeTexture(this.getImageFilePath(texName));
	}
	,removeMusic: function(musicName) {
		oge2d_driver_lime_Asset.removeMusic(this.getMusicFilePath(musicName));
	}
	,removeSound: function(soundName) {
		oge2d_driver_lime_Asset.removeSound(this.getSoundFilePath(soundName));
	}
	,call: function(libName,funcName,funcParams) {
		var obj = this.libraries.get(libName);
		if(obj == null) return null;
		var method = Reflect.field(obj,funcName);
		if(method == null) return null;
		return method.apply(obj,funcParams == null?[]:funcParams);
	}
	,log: function(content) {
		haxe_Log.trace("[" + ((function($this) {
			var $r;
			var _this = new Date();
			$r = HxOverrides.dateStr(_this);
			return $r;
		}(this))).split(" ")[1] + "] " + content,{ fileName : "Game.hx", lineNumber : 486, className : "oge2d.core.Game", methodName : "log"});
	}
	,getOS: function() {
		return "html5";
	}
	,update: function(time) {
		this.ticks = this.ticks + time;
		this.interval = time;
		if(this.state > 0) {
			if(this.scene != null) this.scene.update(time);
			if(this.script.methods != null && this.script.methods.exists("onUpdate")) this.script.call("onUpdate");
		}
		if(this.loadings.length > 0) this.loadings.first().processLoading();
	}
	,__class__: oge2d_core_Game
};
var oge2d_core_Scene = function(game,name) {
	this._loadings = null;
	this.ticks = 0;
	this._paused = false;
	this.data = null;
	this._sprites = null;
	this.sprites = null;
	this._systems = null;
	this.systems = null;
	this.components = null;
	this.script = null;
	this.game = null;
	this.name = "";
	this.name = name;
	this.game = game;
	this.script = new oge2d_script_Script(this.game.libraries,this,false);
	this.components = new haxe_ds_StringMap();
	this.systems = new haxe_ds_StringMap();
	this._systems = [];
	this.sprites = new haxe_ds_StringMap();
	this._sprites = [];
	this.data = new haxe_ds_StringMap();
};
$hxClasses["oge2d.core.Scene"] = oge2d_core_Scene;
oge2d_core_Scene.__name__ = ["oge2d","core","Scene"];
oge2d_core_Scene.prototype = {
	name: null
	,game: null
	,script: null
	,components: null
	,systems: null
	,_systems: null
	,sprites: null
	,_sprites: null
	,data: null
	,_paused: null
	,ticks: null
	,init: function(config,onProgress,onComplete) {
		var _g = this;
		if(this.game == null || config == null) {
			if(onComplete != null) onComplete();
			return;
		}
		var systemNames = config.systems;
		var _g1 = 0;
		while(_g1 < systemNames.length) {
			var systemName = systemNames[_g1];
			++_g1;
			var updater = this.game.systems.get(systemName);
			if(updater != null) {
				this._systems.push(updater);
				this.systems.set(systemName,updater);
			}
		}
		var fieldNames = Reflect.fields(config);
		var eventConfig = null;
		var _g2 = 0;
		while(_g2 < fieldNames.length) {
			var fieldName = fieldNames[_g2];
			++_g2;
			if(fieldName == "systems") continue;
			if(fieldName == "sprites") continue;
			if(fieldName == "preloads") continue;
			if(fieldName == "events") {
				eventConfig = Reflect.field(config,fieldName);
				continue;
			}
			var value = Reflect.field(config,fieldName);
			this.components.set(fieldName,value);
		}
		var resList = this.game.getPreloadList(config);
		var resItemCount = resList.length;
		var spriteNames = config.sprites;
		var total = resItemCount + spriteNames.length;
		oge2d_driver_lime_Asset.loadFiles(resList,function(loadedItemCount,allItemCount) {
			if(onProgress != null) onProgress(loadedItemCount,total);
		},function() {
			if(eventConfig != null) {
				if(oge2d_script_Script.getScriptMethods(eventConfig) != null) {
					var scriptFile = _g.game.getSceneFilePath(_g.name,false);
					oge2d_driver_lime_Asset.loadText(scriptFile,function(text) {
						oge2d_script_Script.load(eventConfig,_g.script,text,_g.game.isReadableScript(),["Game","Keyboard","Mouse"],[_g.game,oge2d_driver_lime_Keyboard,oge2d_driver_lime_Mouse]);
						_g.preloadSprites(config,function(loadedSprCount,allSprCount) {
							if(onProgress != null) onProgress(loadedSprCount + resItemCount,total);
						},onComplete);
					});
				} else {
					oge2d_script_Script.load(eventConfig,_g.script,"",_g.game.isReadableScript(),["Game","Keyboard","Mouse"],[_g.game,oge2d_driver_lime_Keyboard,oge2d_driver_lime_Mouse]);
					_g.preloadSprites(config,function(loadedSprCount1,allSprCount1) {
						if(onProgress != null) onProgress(loadedSprCount1 + resItemCount,total);
					},onComplete);
				}
			} else _g.preloadSprites(config,function(loadedSprCount2,allSprCount2) {
				if(onProgress != null) onProgress(loadedSprCount2 + resItemCount,total);
			},onComplete);
		});
	}
	,reset: function() {
		var sceneConfig = oge2d_driver_lime_Asset.getJsonObject(this.game.getSceneFilePath(this.name));
		if(sceneConfig != null) {
			var fieldNames = Reflect.fields(sceneConfig);
			var _g = 0;
			while(_g < fieldNames.length) {
				var fieldName = fieldNames[_g];
				++_g;
				if(fieldName == "systems") continue;
				if(fieldName == "sprites") continue;
				if(fieldName == "preloads") continue;
				if(fieldName == "events") continue;
				var value = Reflect.field(sceneConfig,fieldName);
				this.components.set(fieldName,value);
			}
		}
		var _g1 = 0;
		var _g11 = this._sprites;
		while(_g1 < _g11.length) {
			var spr = _g11[_g1];
			++_g1;
			if(spr.index != 0) continue;
			var config = oge2d_driver_lime_Asset.getJsonObject(this.game.getSceneSpriteFilePath(this.name,spr.name));
			if(config == null) continue;
			var templateName = config.base.template;
			if(templateName == null || templateName.length <= 0) continue;
			var setting = oge2d_driver_lime_Asset.getJsonObject(this.game.getSpriteFilePath(templateName));
			if(setting == null) continue;
			var currentFieldNames = Reflect.fields(config);
			var templateFieldNames = Reflect.fields(setting);
			var _g2 = 0;
			while(_g2 < templateFieldNames.length) {
				var fieldName1 = templateFieldNames[_g2];
				++_g2;
				if(fieldName1 == "base") continue;
				if(fieldName1 == "events") continue;
				if(fieldName1 == "preloads") continue;
				if(HxOverrides.indexOf(currentFieldNames,fieldName1,0) >= 0) {
					var oldBlock = Reflect.field(setting,fieldName1);
					var newBlock = Reflect.field(config,fieldName1);
					var blockFieldNames = Reflect.fields(newBlock);
					var _g3 = 0;
					while(_g3 < blockFieldNames.length) {
						var blockFieldName = blockFieldNames[_g3];
						++_g3;
						Reflect.setField(oldBlock,blockFieldName,Reflect.field(newBlock,blockFieldName));
					}
				}
				var value1 = Reflect.field(setting,fieldName1);
				spr.components.set(fieldName1,value1);
			}
			var _g21 = 0;
			while(_g21 < currentFieldNames.length) {
				var fieldName2 = currentFieldNames[_g21];
				++_g21;
				if(fieldName2 == "base") continue;
				if(fieldName2 == "events") continue;
				if(fieldName2 == "preloads") continue;
				if(HxOverrides.indexOf(templateFieldNames,fieldName2,0) < 0) {
					var value2 = Reflect.field(config,fieldName2);
					spr.components.set(fieldName2,value2);
				}
			}
			spr.set_enabled(config.base.enabled);
		}
	}
	,_loadings: null
	,preloadSprites: function(config,onProgress,onComplete) {
		var spriteNames = config.sprites;
		spriteNames.reverse();
		var configNames = new haxe_ds_StringMap();
		var spriteIndexes = new haxe_ds_StringMap();
		var _g = 0;
		while(_g < spriteNames.length) {
			var spriteName = spriteNames[_g];
			++_g;
			if(__map_reserved[spriteName] != null) configNames.setReserved(spriteName,spriteName); else configNames.h[spriteName] = spriteName;
			if(__map_reserved[spriteName] != null) spriteIndexes.setReserved(spriteName,0); else spriteIndexes.h[spriteName] = 0;
		}
		this._loadings = [];
		var input = { spriteNames : spriteNames, configNames : configNames, spriteIndexes : spriteIndexes, originalCount : spriteNames.length, onProgress : onProgress, onComplete : onComplete};
		this._loadings.push(input);
		this.game.loadings.add(this);
	}
	,loadSprite: function(spriteName,callback) {
		var _g = this;
		var matched = this.sprites.get(spriteName);
		if(matched != null) {
			callback(matched);
			return;
		}
		var configFile = this.game.getSceneSpriteFilePath(this.name,spriteName);
		oge2d_driver_lime_Asset.loadJsonObject(configFile,function(spriteConfig) {
			if(spriteConfig != null) {
				var newSprite = new oge2d_core_Sprite(_g,spriteName);
				newSprite.init(spriteConfig,0,function() {
					_g.sprites.set(spriteName,newSprite);
					_g._sprites.push(newSprite);
					newSprite.set_enabled(spriteConfig.base.enabled);
					callback(newSprite);
				});
			} else {
				haxe_Log.trace("Failed to load sprite with config file: " + configFile,{ fileName : "Scene.hx", lineNumber : 226, className : "oge2d.core.Scene", methodName : "loadSprite"});
				callback(null);
			}
		});
	}
	,processLoading: function() {
		var _g = this;
		var input = null;
		if(this._loadings != null) input = this._loadings.pop();
		if(input == null) return;
		var spriteNames = input.spriteNames;
		var configNames = input.configNames;
		var spriteIndexes = input.spriteIndexes;
		var total = input.originalCount;
		var onProgress = input.onProgress;
		var onComplete = input.onComplete;
		if(spriteNames != null && spriteNames.length > 0) {
			var originalCount;
			if(total > 0) originalCount = total; else originalCount = spriteNames.length;
			var spriteName = spriteNames.pop();
			if(spriteName != null && spriteName.length > 0) {
				var configFile = this.game.getSceneSpriteFilePath(this.name,__map_reserved[spriteName] != null?configNames.getReserved(spriteName):configNames.h[spriteName]);
				oge2d_driver_lime_Asset.loadJsonObject(configFile,function(spriteConfig) {
					if(spriteConfig != null) {
						var newSprite = new oge2d_core_Sprite(_g,spriteName);
						var sprIndex;
						sprIndex = __map_reserved[spriteName] != null?spriteIndexes.getReserved(spriteName):spriteIndexes.h[spriteName];
						var sprCount;
						if(spriteConfig.base.count != null) sprCount = spriteConfig.base.count; else sprCount = 1;
						if(sprIndex > 0) sprCount = 0;
						newSprite.init(spriteConfig,sprIndex,function() {
							_g.sprites.set(spriteName,newSprite);
							_g._sprites.push(newSprite);
							newSprite.set_enabled(spriteConfig.base.enabled);
							configNames.remove(spriteName);
							spriteIndexes.remove(spriteName);
							if(sprCount > 1) {
								var _g1 = 1;
								while(_g1 < sprCount) {
									var idx = _g1++;
									var copyName = spriteName + "-" + idx;
									if(__map_reserved[copyName] != null) configNames.setReserved(copyName,spriteName); else configNames.h[copyName] = spriteName;
									if(__map_reserved[copyName] != null) spriteIndexes.setReserved(copyName,idx); else spriteIndexes.h[copyName] = idx;
									spriteNames.push(copyName);
								}
							}
							if(sprIndex == 0 && sprCount == 1 || sprIndex == 1) {
								if(onProgress != null) onProgress(originalCount - spriteNames.length,originalCount);
							}
							var next = { spriteNames : spriteNames, configNames : configNames, spriteIndexes : spriteIndexes, originalCount : originalCount, onProgress : onProgress, onComplete : onComplete};
							_g._loadings.push(next);
						});
					} else {
						haxe_Log.trace("Failed to load sprite with config file: " + configFile,{ fileName : "Scene.hx", lineNumber : 286, className : "oge2d.core.Scene", methodName : "processLoading"});
						configNames.remove(spriteName);
						spriteIndexes.remove(spriteName);
						if(onProgress != null) onProgress(originalCount - spriteNames.length,originalCount);
						var next1 = { spriteNames : spriteNames, configNames : configNames, spriteIndexes : spriteIndexes, originalCount : originalCount, onProgress : onProgress, onComplete : onComplete};
						_g._loadings.push(next1);
					}
				});
			} else {
				if(onProgress != null) onProgress(originalCount - spriteNames.length,originalCount);
				var next2 = { spriteNames : spriteNames, configNames : configNames, spriteIndexes : spriteIndexes, originalCount : originalCount, onProgress : onProgress, onComplete : onComplete};
				this._loadings.push(next2);
			}
		} else {
			this._loadings = null;
			this.game.loadings.remove(this);
			if(onComplete != null) onComplete();
		}
	}
	,getSprite: function(spriteName) {
		return this.sprites.get(spriteName);
	}
	,spr: function(spriteName) {
		return this.sprites.get(spriteName);
	}
	,getSprites: function() {
		return this._sprites.slice();
	}
	,filter: function(fn) {
		return this._sprites.filter(fn);
	}
	,sort: function(fn) {
		this._sprites.sort(fn);
	}
	,isPaused: function() {
		return this._paused;
	}
	,pause: function() {
		this._paused = true;
	}
	,resume: function() {
		this._paused = false;
	}
	,get: function(compName) {
		return this.components.get(compName);
	}
	,set: function(compName,comp) {
		var value = comp;
		this.components.set(compName,value);
	}
	,update: function(time,updaters) {
		var allSystems;
		if(updaters == null) allSystems = this._systems; else allSystems = updaters;
		if(allSystems != null) {
			if(time != null && this._paused == false) this.ticks = this.ticks + time;
			var _g = 0;
			while(_g < allSystems.length) {
				var updater = allSystems[_g];
				++_g;
				updater.begin(this);
			}
			var _g1 = 0;
			while(_g1 < allSystems.length) {
				var updater1 = allSystems[_g1];
				++_g1;
				if(updater1.batched()) continue;
				var _g11 = 0;
				var _g2 = this._sprites;
				while(_g11 < _g2.length) {
					var spr = _g2[_g11];
					++_g11;
					if(spr.enabled) updater1.update(spr);
				}
			}
			var _g3 = 0;
			while(_g3 < allSystems.length) {
				var updater2 = allSystems[_g3];
				++_g3;
				updater2.end(this);
			}
		}
	}
	,__class__: oge2d_core_Scene
};
var oge2d_core_Sprite = function(scene,name) {
	this._template = "";
	this.index = 0;
	this.data = null;
	this.components = null;
	this.enabled = false;
	this.buffer = null;
	this.script = null;
	this.scene = null;
	this.name = "";
	this.name = name;
	this.scene = scene;
	this.game = scene.game;
	this.script = new oge2d_script_Script(this.scene.game.libraries,this,true);
	this.components = new haxe_ds_StringMap();
	this.data = new haxe_ds_StringMap();
};
$hxClasses["oge2d.core.Sprite"] = oge2d_core_Sprite;
oge2d_core_Sprite.__name__ = ["oge2d","core","Sprite"];
oge2d_core_Sprite.prototype = {
	name: null
	,scene: null
	,script: null
	,buffer: null
	,enabled: null
	,game: null
	,components: null
	,data: null
	,index: null
	,_template: null
	,set_enabled: function(value) {
		if(this.enabled != value) {
			this.enabled = value;
			if(this.scene == this.scene.game.scene) {
				if(this.enabled) {
					var $it0 = this.scene.systems.iterator();
					while( $it0.hasNext() ) {
						var updater = $it0.next();
						updater.include(this);
					}
				} else {
					var $it1 = this.scene.systems.iterator();
					while( $it1.hasNext() ) {
						var updater1 = $it1.next();
						updater1.exclude(this);
					}
				}
			}
			if(this.script.isReady()) {
				if(this.scene == this.scene.game.scene) {
					if(this.enabled) this.script.call("onActive"); else this.script.call("onInactive");
				} else {
					var eventSystem = this.game.sys("event");
					if(eventSystem != null) {
						if(this.enabled) eventSystem.addSpriteEvent(this,"onActive"); else eventSystem.addSpriteEvent(this,"onInactive");
					}
				}
			}
		}
		return this.enabled;
	}
	,get: function(compName) {
		return this.components.get(compName);
	}
	,set: function(compName,comp) {
		var value = comp;
		this.components.set(compName,value);
	}
	,getTemplateName: function() {
		return this._template;
	}
	,enable: function() {
		this.set_enabled(true);
	}
	,disable: function() {
		this.set_enabled(false);
	}
	,loadEventScript: function(eventConfig,extraMethods,callback) {
		var _g = this;
		if(this.scene == null) {
			if(callback != null) callback();
			return;
		}
		if(oge2d_script_Script.getScriptMethods(eventConfig) != null) {
			var scriptFilePath = this.game.getSceneSpriteFilePath(this.scene.name,this.name,false);
			oge2d_driver_lime_Asset.loadText(scriptFilePath,function(scriptText) {
				oge2d_script_Script.load(eventConfig,_g.script,scriptText,_g.game.isReadableScript(),["Game","Scene","Keyboard","Mouse"],[_g.game,_g.scene,oge2d_driver_lime_Keyboard,oge2d_driver_lime_Mouse]);
				if(extraMethods != null) _g.script.mergeMethods(extraMethods);
				if(callback != null) callback();
			});
		} else {
			oge2d_script_Script.load(eventConfig,this.script,"",this.game.isReadableScript(),["Game","Scene","Keyboard","Mouse"],[this.game,this.scene,oge2d_driver_lime_Keyboard,oge2d_driver_lime_Mouse]);
			if(extraMethods != null) this.script.mergeMethods(extraMethods);
			if(callback != null) callback();
		}
	}
	,init: function(config,indexNumber,callback) {
		var _g1 = this;
		var templateName = config.base.template;
		var configFile = "";
		this.index = indexNumber;
		this._template = templateName;
		if(templateName != null && templateName.length > 0) {
			configFile = this.scene.game.getSpriteFilePath(templateName);
			oge2d_driver_lime_Asset.loadJsonObject(configFile,function(setting) {
				if(setting == null) {
					if(configFile == null || configFile.length <= 0) haxe_Log.trace("Failed to load sprite with template",{ fileName : "Sprite.hx", lineNumber : 120, className : "oge2d.core.Sprite", methodName : "init"}); else haxe_Log.trace("Failed to load sprite template with config file: " + configFile,{ fileName : "Sprite.hx", lineNumber : 121, className : "oge2d.core.Sprite", methodName : "init"});
					if(callback != null) callback();
				} else {
					var currentFieldNames = Reflect.fields(config);
					var templateFieldNames = Reflect.fields(setting);
					var _g = 0;
					while(_g < templateFieldNames.length) {
						var fieldName = templateFieldNames[_g];
						++_g;
						if(fieldName == "base") continue;
						if(fieldName == "events") continue;
						if(fieldName == "preloads") continue;
						if(HxOverrides.indexOf(currentFieldNames,fieldName,0) >= 0) {
							var oldBlock = Reflect.field(setting,fieldName);
							var newBlock = Reflect.field(config,fieldName);
							var blockFieldNames = Reflect.fields(newBlock);
							var _g11 = 0;
							while(_g11 < blockFieldNames.length) {
								var blockFieldName = blockFieldNames[_g11];
								++_g11;
								Reflect.setField(oldBlock,blockFieldName,Reflect.field(newBlock,blockFieldName));
							}
						}
						var value = Reflect.field(setting,fieldName);
						_g1.components.set(fieldName,value);
					}
					var _g2 = 0;
					while(_g2 < currentFieldNames.length) {
						var fieldName1 = currentFieldNames[_g2];
						++_g2;
						if(fieldName1 == "base") continue;
						if(fieldName1 == "events") continue;
						if(fieldName1 == "preloads") continue;
						if(HxOverrides.indexOf(templateFieldNames,fieldName1,0) < 0) {
							var value1 = Reflect.field(config,fieldName1);
							_g1.components.set(fieldName1,value1);
						}
					}
					var list = _g1.scene.game.getPreloadList(setting);
					var currentList = _g1.scene.game.getPreloadList(config);
					var _g3 = 0;
					while(_g3 < currentList.length) {
						var item = currentList[_g3];
						++_g3;
						if(HxOverrides.indexOf(list,item,0) < 0) list.push(item);
					}
					oge2d_driver_lime_Asset.loadFiles(list,null,function() {
						var libraryMethods = null;
						if(HxOverrides.indexOf(templateFieldNames,"events",0) >= 0) {
							var baseEventConfig = Reflect.field(setting,"events");
							libraryMethods = oge2d_script_Script.getLibraryMethods(baseEventConfig);
							if(oge2d_script_Script.getScriptMethods(baseEventConfig) != null) {
								var scriptFile = _g1.scene.game.getSpriteFilePath(templateName,false);
								oge2d_driver_lime_Asset.loadText(scriptFile,function(text) {
									oge2d_script_Script.load(baseEventConfig,_g1.script.basis,text,_g1.scene.game.isReadableScript(),["Game","Scene","Keyboard","Mouse"],[_g1.scene.game,_g1.scene,oge2d_driver_lime_Keyboard,oge2d_driver_lime_Mouse]);
									if(HxOverrides.indexOf(currentFieldNames,"events",0) >= 0) _g1.loadEventScript(Reflect.field(config,"events"),libraryMethods,callback); else {
										_g1.script.mergeMethods(libraryMethods);
										if(callback != null) callback();
									}
								});
							} else {
								oge2d_script_Script.load(baseEventConfig,_g1.script.basis,"",_g1.scene.game.isReadableScript(),["Game","Scene","Keyboard","Mouse"],[_g1.scene.game,_g1.scene,oge2d_driver_lime_Keyboard,oge2d_driver_lime_Mouse]);
								if(HxOverrides.indexOf(currentFieldNames,"events",0) >= 0) _g1.loadEventScript(Reflect.field(config,"events"),libraryMethods,callback); else {
									_g1.script.mergeMethods(libraryMethods);
									if(callback != null) callback();
								}
							}
						} else if(HxOverrides.indexOf(currentFieldNames,"events",0) >= 0) _g1.loadEventScript(Reflect.field(config,"events"),libraryMethods,callback); else {
							_g1.script.mergeMethods(libraryMethods);
							if(callback != null) callback();
						}
					});
				}
			});
		} else if(callback != null) callback();
	}
	,__class__: oge2d_core_Sprite
};
var oge2d_driver_lime_Asset = function() {
};
$hxClasses["oge2d.driver.lime.Asset"] = oge2d_driver_lime_Asset;
oge2d_driver_lime_Asset.__name__ = ["oge2d","driver","lime","Asset"];
oge2d_driver_lime_Asset.init = function() {
	if(oge2d_driver_lime_Asset._buf != null) return;
	oge2d_driver_lime_MusicSource.init();
	oge2d_driver_lime_SoundSource.init();
	oge2d_driver_lime_Asset._buf = haxe_io_Bytes.alloc(65536);
};
oge2d_driver_lime_Asset.setKey = function(key) {
	oge2d_driver_lime_Asset._key = key;
};
oge2d_driver_lime_Asset.encrypt = function(bytes) {
	oge2d_build_Macro.encrypt(bytes,oge2d_driver_lime_Asset._key);
};
oge2d_driver_lime_Asset.decrypt = function(bytes) {
	oge2d_build_Macro.decrypt(bytes,oge2d_driver_lime_Asset._key);
};
oge2d_driver_lime_Asset.loadBytes = function(url,callback) {
	if(oge2d_driver_lime_Asset._onweb) {
		var req = new lime_net_HTTPRequest();
		req.load(url).onComplete(function(data) {
			callback(data);
		}).onError(function(err) {
			haxe_Log.trace("Failed to load data from url: " + url,{ fileName : "Asset.hx", lineNumber : 132, className : "oge2d.driver.lime.Asset", methodName : "loadBytes"});
			haxe_Log.trace(err,{ fileName : "Asset.hx", lineNumber : 132, className : "oge2d.driver.lime.Asset", methodName : "loadBytes"});
			callback(null);
		});
	} else callback(null);
};
oge2d_driver_lime_Asset.loadText = function(url,callback) {
	var text = oge2d_driver_lime_Asset._texts.get(url);
	if(text != null) {
		if(callback != null) callback(text);
		return;
	}
	oge2d_driver_lime_Asset.loadBytes(url,function(bytes) {
		if(bytes == null) {
			if(callback != null) callback(null);
		} else {
			var result = bytes.toString();
			if(result != null && result.length > 0) oge2d_driver_lime_Asset._texts.set(url,result);
			if(callback != null) callback(result);
		}
	});
};
oge2d_driver_lime_Asset.loadJsonObject = function(url,callback) {
	oge2d_driver_lime_Asset.loadText(url,function(text) {
		if(text == null || text.length <= 0) {
			if(callback != null) callback(null);
		} else {
			var result = null;
			try {
				result = JSON.parse(text);
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				haxe_Log.trace("Failed to parse json: " + url + ", error: " + Std.string(e),{ fileName : "Asset.hx", lineNumber : 217, className : "oge2d.driver.lime.Asset", methodName : "loadJsonObject"});
			}
			if(callback != null) callback(result);
		}
	});
};
oge2d_driver_lime_Asset.loadJsonData = function(url,callback) {
	var json = oge2d_driver_lime_Asset._jsons.get(url);
	if(json != null) {
		if(callback != null) callback(json);
		return;
	}
	oge2d_driver_lime_Asset.loadBytes(url,function(bytes) {
		if(bytes == null) {
			if(callback != null) callback(null);
		} else {
			var result = null;
			try {
				result = JSON.parse(bytes.toString());
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				haxe_Log.trace("Failed to parse json: " + url + ", error: " + Std.string(e),{ fileName : "Asset.hx", lineNumber : 237, className : "oge2d.driver.lime.Asset", methodName : "loadJsonData"});
			}
			if(result != null) oge2d_driver_lime_Asset._jsons.set(url,result);
			if(callback != null) callback(result);
		}
	});
};
oge2d_driver_lime_Asset.loadMusic = function(url,callback) {
	var music = oge2d_driver_lime_Asset._musics.get(url);
	if(music != null) {
		if(callback != null) callback(music);
		return;
	}
	oge2d_driver_lime_Asset.loadBytes(url,function(bytes) {
		if(bytes == null) {
			if(callback != null) callback(null);
		} else {
			var result = new oge2d_driver_lime_MusicSource();
			result.load(bytes,function() {
				if(result.state <= 0) {
					if(callback != null) callback(null);
				} else {
					oge2d_driver_lime_Asset._musics.set(url,result);
					if(callback != null) callback(result);
				}
			});
		}
	});
};
oge2d_driver_lime_Asset.loadSound = function(url,callback) {
	var sound = oge2d_driver_lime_Asset._sounds.get(url);
	if(sound != null) {
		if(callback != null) callback(sound);
		return;
	}
	oge2d_driver_lime_Asset.loadBytes(url,function(bytes) {
		if(bytes == null) {
			if(callback != null) callback(null);
		} else {
			var result = new oge2d_driver_lime_SoundSource();
			result.load(bytes,function() {
				if(result.state <= 0) {
					if(callback != null) callback(null);
				} else {
					oge2d_driver_lime_Asset._sounds.set(url,result);
					if(callback != null) callback(result);
				}
			});
		}
	});
};
oge2d_driver_lime_Asset.loadTexture = function(url,callback) {
	var tex = oge2d_driver_lime_Asset._textures.get(url);
	if(tex != null) {
		if(callback != null) callback(tex);
		return;
	}
	oge2d_driver_lime_Asset.loadBytes(url,function(bytes) {
		if(bytes == null) {
			if(callback != null) callback(null);
		} else lime_graphics_Image.fromBytes(bytes,function(img) {
			var texture = null;
			if(img != null) {
				texture = oge2d_driver_lime_RendererGL.createTexture(img);
				if(texture != null) oge2d_driver_lime_Asset._textures.set(url,texture);
			}
			if(callback != null) callback(texture);
		});
	});
};
oge2d_driver_lime_Asset.getText = function(url) {
	var text = oge2d_driver_lime_Asset._texts.get(url);
	if(text != null) return text;
	text = lime_Assets.getText(url);
	if(text != null && text.length > 0) oge2d_driver_lime_Asset._texts.set(url,text);
	return text;
};
oge2d_driver_lime_Asset.getJsonObject = function(url) {
	var text = oge2d_driver_lime_Asset.getText(url);
	if(text == null || text.length <= 0) return null;
	return JSON.parse(text);
};
oge2d_driver_lime_Asset.getJsonData = function(url) {
	var json = oge2d_driver_lime_Asset._jsons.get(url);
	if(json != null) return json;
	var text = lime_Assets.getText(url);
	if(text == null || text.length <= 0) return null; else json = JSON.parse(text);
	if(json != null) {
		var value = json;
		oge2d_driver_lime_Asset._jsons.set(url,value);
	}
	return json;
};
oge2d_driver_lime_Asset.getMusic = function(url) {
	var music = oge2d_driver_lime_Asset._musics.get(url);
	if(music != null) return music;
	var bytes = lime_Assets.getBytes(url);
	if(bytes == null) return null;
	music = new oge2d_driver_lime_MusicSource();
	music.load(bytes);
	if(music.state <= 0) return null;
	oge2d_driver_lime_Asset._musics.set(url,music);
	return music;
};
oge2d_driver_lime_Asset.getSound = function(url) {
	var sound = oge2d_driver_lime_Asset._sounds.get(url);
	if(sound != null) return sound;
	var bytes = lime_Assets.getBytes(url);
	if(bytes == null) return null;
	sound = new oge2d_driver_lime_SoundSource();
	sound.load(bytes);
	if(sound.state <= 0) return null;
	oge2d_driver_lime_Asset._sounds.set(url,sound);
	return sound;
};
oge2d_driver_lime_Asset.getTexture = function(url) {
	var tex = oge2d_driver_lime_Asset._textures.get(url);
	if(tex != null) return tex;
	var image = lime_Assets.getImage(url);
	if(image == null) return null;
	tex = oge2d_driver_lime_RendererGL.createTexture(image);
	if(tex != null) oge2d_driver_lime_Asset._textures.set(url,tex);
	return tex;
};
oge2d_driver_lime_Asset.removeTexture = function(url) {
	var tex = oge2d_driver_lime_Asset._textures.get(url);
	if(tex != null) {
		oge2d_driver_lime_RendererGL.deleteTexture(tex);
		oge2d_driver_lime_Asset._textures.remove(url);
	}
};
oge2d_driver_lime_Asset.removeMusic = function(url) {
	var music = oge2d_driver_lime_Asset._musics.get(url);
	if(music != null) {
		music.dispose();
		oge2d_driver_lime_Asset._musics.remove(url);
	}
};
oge2d_driver_lime_Asset.removeSound = function(url) {
	var sound = oge2d_driver_lime_Asset._sounds.get(url);
	if(sound != null) {
		sound.dispose();
		oge2d_driver_lime_Asset._sounds.remove(url);
	}
};
oge2d_driver_lime_Asset.stopAllMusics = function() {
	var $it0 = oge2d_driver_lime_Asset._musics.keys();
	while( $it0.hasNext() ) {
		var url = $it0.next();
		oge2d_driver_lime_Asset._musics.get(url).stop();
	}
};
oge2d_driver_lime_Asset.stopAllSounds = function() {
	var $it0 = oge2d_driver_lime_Asset._sounds.keys();
	while( $it0.hasNext() ) {
		var url = $it0.next();
		oge2d_driver_lime_Asset._sounds.get(url).stop();
	}
};
oge2d_driver_lime_Asset.getBytes = function(url) {
	return lime_Assets.getBytes(url);
};
oge2d_driver_lime_Asset.unzip = function(entry) {
	var output = new haxe_io_BytesBuffer();
	var inflate = new haxe_zip_InflateImpl(new haxe_io_BytesInput(entry.data),false,false);
	while(true) {
		var len = inflate.readBytes(oge2d_driver_lime_Asset._buf,0,oge2d_driver_lime_Asset._buf.length);
		output.addBytes(oge2d_driver_lime_Asset._buf,0,len);
		if(len < oge2d_driver_lime_Asset._buf.length) break;
	}
	return output.getBytes();
};
oge2d_driver_lime_Asset.loadPack = function(bytes,onProgress,onComplete) {
	if(bytes == null || bytes.length <= 0) return;
	oge2d_driver_lime_Asset.decrypt(bytes);
	oge2d_driver_lime_Asset._queue.clear();
	var entries = haxe_zip_Reader.readZip(new haxe_io_BytesInput(bytes));
	var pending = new haxe_ds_StringMap();
	var processed = 0;
	var _g_head = entries.h;
	var _g_val = null;
	while(_g_head != null) {
		var entry;
		entry = (function($this) {
			var $r;
			_g_val = _g_head[0];
			_g_head = _g_head[1];
			$r = _g_val;
			return $r;
		}(this));
		processed++;
		if(!entry.compressed || entry.dataSize <= 0) {
			if(onProgress != null) onProgress(processed,entries.length);
			continue;
		}
		var fileName = entry.fileName;
		if(fileName.indexOf("games/") >= 0 || fileName.indexOf("scenes/") >= 0 || fileName.indexOf("sprites/") >= 0) {
			var text = oge2d_driver_lime_Asset._texts.get(fileName);
			if(text == null) {
				text = oge2d_driver_lime_Asset.unzip(entry).toString();
				if(text != null && text.length > 0) oge2d_driver_lime_Asset._texts.set(fileName,text);
			}
			if(onProgress != null) onProgress(processed,entries.length);
		} else if(fileName.indexOf("jsons/") >= 0) {
			var json = oge2d_driver_lime_Asset._jsons.get(fileName);
			if(json == null) {
				json = JSON.parse(oge2d_driver_lime_Asset.unzip(entry).toString());
				if(json != null) {
					var value = json;
					oge2d_driver_lime_Asset._jsons.set(fileName,value);
				}
			}
			if(onProgress != null) onProgress(processed,entries.length);
		} else if(fileName.indexOf("images/") >= 0) {
			var tex = oge2d_driver_lime_Asset._textures.get(fileName);
			var progress = processed;
			if(tex == null) {
				if((__map_reserved[fileName] != null?pending.getReserved(fileName):pending.h[fileName]) == null) {
					oge2d_driver_lime_Asset._queue.add(fileName);
					if(__map_reserved[fileName] != null) pending.setReserved(fileName,entry); else pending.h[fileName] = entry;
					processed--;
				}
				if(tex != null) oge2d_driver_lime_Asset._textures.set(fileName,tex);
			}
			if(progress == processed && onProgress != null) onProgress(processed,entries.length);
		} else if(fileName.indexOf("musics/") >= 0) {
			var progress1 = processed;
			var music = oge2d_driver_lime_Asset._musics.get(fileName);
			if(music == null) {
				if((__map_reserved[fileName] != null?pending.getReserved(fileName):pending.h[fileName]) == null) {
					oge2d_driver_lime_Asset._queue.add(fileName);
					if(__map_reserved[fileName] != null) pending.setReserved(fileName,entry); else pending.h[fileName] = entry;
					processed--;
				}
				if(music != null) oge2d_driver_lime_Asset._musics.set(fileName,music);
			}
			if(progress1 == processed && onProgress != null) onProgress(processed,entries.length);
		} else if(fileName.indexOf("sounds/") >= 0) {
			var progress2 = processed;
			var sound = oge2d_driver_lime_Asset._sounds.get(fileName);
			if(sound == null) {
				if((__map_reserved[fileName] != null?pending.getReserved(fileName):pending.h[fileName]) == null) {
					oge2d_driver_lime_Asset._queue.add(fileName);
					if(__map_reserved[fileName] != null) pending.setReserved(fileName,entry); else pending.h[fileName] = entry;
					processed--;
				}
				if(sound != null) oge2d_driver_lime_Asset._sounds.set(fileName,sound);
			}
			if(progress2 == processed && onProgress != null) onProgress(processed,entries.length);
		}
	}
	if(oge2d_driver_lime_Asset._queue.length <= 0) {
		if(onComplete != null) onComplete();
		return;
	}
	var pendingFiles = pending.keys();
	while( pendingFiles.hasNext() ) {
		var fileName1 = pendingFiles.next();
		var fileName2 = [fileName1];
		if(fileName2[0].indexOf("images/") >= 0) lime_graphics_Image.fromBytes(oge2d_driver_lime_Asset.unzip(__map_reserved[fileName2[0]] != null?pending.getReserved(fileName2[0]):pending.h[fileName2[0]]),(function(fileName2) {
			return function(img) {
				if(img != null) {
					var tex1 = oge2d_driver_lime_RendererGL.createTexture(img);
					if(tex1 != null) oge2d_driver_lime_Asset._textures.set(fileName2[0],tex1);
				}
				oge2d_driver_lime_Asset._queue.remove(fileName2[0]);
				if(onProgress != null) onProgress(entries.length - oge2d_driver_lime_Asset._queue.length,entries.length);
				if(oge2d_driver_lime_Asset._queue.length <= 0 && onComplete != null) onComplete();
			};
		})(fileName2)); else if(fileName2[0].indexOf("musics/") >= 0) {
			var music1 = [new oge2d_driver_lime_MusicSource()];
			music1[0].load(oge2d_driver_lime_Asset.unzip(__map_reserved[fileName2[0]] != null?pending.getReserved(fileName2[0]):pending.h[fileName2[0]]),(function(music1,fileName2) {
				return function() {
					if(music1[0].state <= 0) music1[0] = null; else oge2d_driver_lime_Asset._musics.set(fileName2[0],music1[0]);
					oge2d_driver_lime_Asset._queue.remove(fileName2[0]);
					if(onProgress != null) onProgress(entries.length - oge2d_driver_lime_Asset._queue.length,entries.length);
					if(oge2d_driver_lime_Asset._queue.length <= 0 && onComplete != null) onComplete();
				};
			})(music1,fileName2));
		} else if(fileName2[0].indexOf("sounds/") >= 0) {
			var sound1 = [new oge2d_driver_lime_SoundSource()];
			sound1[0].load(oge2d_driver_lime_Asset.unzip(__map_reserved[fileName2[0]] != null?pending.getReserved(fileName2[0]):pending.h[fileName2[0]]),(function(sound1,fileName2) {
				return function() {
					if(sound1[0].state <= 0) sound1[0] = null; else oge2d_driver_lime_Asset._sounds.set(fileName2[0],sound1[0]);
					oge2d_driver_lime_Asset._queue.remove(fileName2[0]);
					if(onProgress != null) onProgress(entries.length - oge2d_driver_lime_Asset._queue.length,entries.length);
					if(oge2d_driver_lime_Asset._queue.length <= 0 && onComplete != null) onComplete();
				};
			})(sound1,fileName2));
		}
	}
};
oge2d_driver_lime_Asset.loadFiles = function(files,onProgress,onComplete) {
	oge2d_driver_lime_Asset._queue.clear();
	if(files != null && files.length > 0) {
		var _g = 0;
		while(_g < files.length) {
			var fileName = files[_g];
			++_g;
			oge2d_driver_lime_Asset._queue.add(fileName);
		}
		var _g1 = 0;
		while(_g1 < files.length) {
			var fileName1 = [files[_g1]];
			++_g1;
			if(fileName1[0].indexOf("jsons/") >= 0) oge2d_driver_lime_Asset.loadJsonData(fileName1[0],(function(fileName1) {
				return function(_) {
					oge2d_driver_lime_Asset._queue.remove(fileName1[0]);
					if(onProgress != null) onProgress(files.length - oge2d_driver_lime_Asset._queue.length,files.length);
					if(oge2d_driver_lime_Asset._queue.length <= 0 && onComplete != null) onComplete();
				};
			})(fileName1)); else if(fileName1[0].indexOf("images/") >= 0) oge2d_driver_lime_Asset.loadTexture(fileName1[0],(function(fileName1) {
				return function(_1) {
					oge2d_driver_lime_Asset._queue.remove(fileName1[0]);
					if(onProgress != null) onProgress(files.length - oge2d_driver_lime_Asset._queue.length,files.length);
					if(oge2d_driver_lime_Asset._queue.length <= 0 && onComplete != null) onComplete();
				};
			})(fileName1)); else if(fileName1[0].indexOf("musics/") >= 0) oge2d_driver_lime_Asset.loadMusic(fileName1[0],(function(fileName1) {
				return function(_2) {
					oge2d_driver_lime_Asset._queue.remove(fileName1[0]);
					if(onProgress != null) onProgress(files.length - oge2d_driver_lime_Asset._queue.length,files.length);
					if(oge2d_driver_lime_Asset._queue.length <= 0 && onComplete != null) onComplete();
				};
			})(fileName1)); else if(fileName1[0].indexOf("sounds/") >= 0) oge2d_driver_lime_Asset.loadSound(fileName1[0],(function(fileName1) {
				return function(_3) {
					oge2d_driver_lime_Asset._queue.remove(fileName1[0]);
					if(onProgress != null) onProgress(files.length - oge2d_driver_lime_Asset._queue.length,files.length);
					if(oge2d_driver_lime_Asset._queue.length <= 0 && onComplete != null) onComplete();
				};
			})(fileName1)); else {
				haxe_Log.trace("Unsupported file to preload: " + fileName1[0],{ fileName : "Asset.hx", lineNumber : 816, className : "oge2d.driver.lime.Asset", methodName : "loadFiles"});
				oge2d_driver_lime_Asset._queue.remove(fileName1[0]);
				if(onProgress != null) onProgress(files.length - oge2d_driver_lime_Asset._queue.length,files.length);
				if(oge2d_driver_lime_Asset._queue.length <= 0 && onComplete != null) onComplete();
			}
		}
	} else if(onComplete != null) onComplete();
};
oge2d_driver_lime_Asset.prototype = {
	__class__: oge2d_driver_lime_Asset
};
var oge2d_driver_lime_DisplayBufferGL = function() {
	this.data = null;
	this.offset = 0;
	this.count = 0;
	this.indices = null;
	this.vertices = null;
	this.texture = null;
};
$hxClasses["oge2d.driver.lime.DisplayBufferGL"] = oge2d_driver_lime_DisplayBufferGL;
oge2d_driver_lime_DisplayBufferGL.__name__ = ["oge2d","driver","lime","DisplayBufferGL"];
oge2d_driver_lime_DisplayBufferGL.prototype = {
	texture: null
	,vertices: null
	,indices: null
	,count: null
	,offset: null
	,data: null
	,__class__: oge2d_driver_lime_DisplayBufferGL
};
var oge2d_driver_lime_Keyboard = function() {
};
$hxClasses["oge2d.driver.lime.Keyboard"] = oge2d_driver_lime_Keyboard;
oge2d_driver_lime_Keyboard.__name__ = ["oge2d","driver","lime","Keyboard"];
oge2d_driver_lime_Keyboard.isKeyDown = function(keyName) {
	if(oge2d_driver_lime_Keyboard._keyStates == null) return false;
	var idx = oge2d_driver_lime_Keyboard._keyNameMap.get(keyName);
	if(idx == null) return false;
	return oge2d_driver_lime_Keyboard._keyStates[idx];
};
oge2d_driver_lime_Keyboard.setKeyState = function(keyCode,isDown) {
	if(oge2d_driver_lime_Keyboard._keyStates == null) return;
	var idx = oge2d_driver_lime_Keyboard._keyCodeMap.h[keyCode];
	if(idx != null) oge2d_driver_lime_Keyboard._keyStates[idx] = isDown;
};
oge2d_driver_lime_Keyboard.getKeypressTime = function(keyName) {
	if(oge2d_driver_lime_Keyboard._keypressTicks == null) return 0;
	var idx = oge2d_driver_lime_Keyboard._keyNameMap.get(keyName);
	if(idx == null) return 0;
	return oge2d_driver_lime_Keyboard._keypressTicks[idx];
};
oge2d_driver_lime_Keyboard.setKeypressTime = function(keyName,ticks) {
	if(oge2d_driver_lime_Keyboard._keypressTicks == null) return;
	var idx = oge2d_driver_lime_Keyboard._keyNameMap.get(keyName);
	if(idx == null) return;
	if(ticks >= 0) oge2d_driver_lime_Keyboard._keypressTicks[idx] = ticks; else oge2d_driver_lime_Keyboard._keypressTicks[idx] = 0;
};
oge2d_driver_lime_Keyboard.getKeyNames = function(keyCode) {
	var keyNames = [];
	var keyName = oge2d_driver_lime_Keyboard._keyCodeName.h[keyCode];
	var keyAlias = oge2d_driver_lime_Keyboard._keyCodeAlias.h[keyCode];
	if(keyName != null) keyNames.push(keyName);
	if(keyAlias != null) keyNames.push(keyAlias);
	return keyNames;
};
oge2d_driver_lime_Keyboard.reset = function() {
	if(oge2d_driver_lime_Keyboard._keyStates == null) return;
	var _g1 = 0;
	var _g = oge2d_driver_lime_Keyboard._keyStates.length;
	while(_g1 < _g) {
		var i = _g1++;
		oge2d_driver_lime_Keyboard._keyStates[i] = false;
		oge2d_driver_lime_Keyboard._keypressTicks[i] = 0;
	}
};
oge2d_driver_lime_Keyboard.registerKey = function(keyCode,keyName,alias) {
	oge2d_driver_lime_Keyboard._keyCodeMap.h[keyCode] = oge2d_driver_lime_Keyboard._keyCount;
	oge2d_driver_lime_Keyboard._keyNameMap.set(keyName,oge2d_driver_lime_Keyboard._keyCount);
	oge2d_driver_lime_Keyboard._keyCodeName.h[keyCode] = keyName;
	if(alias != null) {
		oge2d_driver_lime_Keyboard._keyNameMap.set(alias,oge2d_driver_lime_Keyboard._keyCount);
		oge2d_driver_lime_Keyboard._keyCodeAlias.h[keyCode] = alias;
	}
	oge2d_driver_lime_Keyboard._keyCount++;
};
oge2d_driver_lime_Keyboard.init = function(config) {
	oge2d_driver_lime_Keyboard._keyCount = 0;
	oge2d_driver_lime_Keyboard._keyCodeMap = new haxe_ds_IntMap();
	oge2d_driver_lime_Keyboard._keyNameMap = new haxe_ds_StringMap();
	oge2d_driver_lime_Keyboard._keyCodeName = new haxe_ds_IntMap();
	oge2d_driver_lime_Keyboard._keyCodeAlias = new haxe_ds_IntMap();
	var keySetting = oge2d_driver_lime_Keyboard._defaultConfig.keys;
	if(config != null && Object.prototype.hasOwnProperty.call(config,"keys")) keySetting = config.keys;
	var keyCodes = Reflect.fields(keySetting);
	var _g = 0;
	while(_g < keyCodes.length) {
		var keyCodeStr = keyCodes[_g];
		++_g;
		var keyNames = Reflect.field(keySetting,keyCodeStr);
		if(keyNames == null || keyNames.length <= 0) continue;
		var keyCode = Std.parseInt(keyCodeStr);
		if(keyNames.length == 1) oge2d_driver_lime_Keyboard.registerKey(keyCode,keyNames[0]); else oge2d_driver_lime_Keyboard.registerKey(keyCode,keyNames[0],keyNames[1]);
	}
	var this1;
	this1 = new Array(oge2d_driver_lime_Keyboard._keyCount);
	oge2d_driver_lime_Keyboard._keyStates = this1;
	var this2;
	this2 = new Array(oge2d_driver_lime_Keyboard._keyCount);
	oge2d_driver_lime_Keyboard._keypressTicks = this2;
	oge2d_driver_lime_Keyboard.reset();
};
oge2d_driver_lime_Keyboard.prototype = {
	__class__: oge2d_driver_lime_Keyboard
};
var oge2d_driver_lime_Mouse = function() {
};
$hxClasses["oge2d.driver.lime.Mouse"] = oge2d_driver_lime_Mouse;
oge2d_driver_lime_Mouse.__name__ = ["oge2d","driver","lime","Mouse"];
oge2d_driver_lime_Mouse.isButtonDown = function(button) {
	if(oge2d_driver_lime_Mouse._buttonStates == null) return false;
	if(button < 0 || button >= oge2d_driver_lime_Mouse._buttonStates.length) return false;
	return oge2d_driver_lime_Mouse._buttonStates[button];
};
oge2d_driver_lime_Mouse.setButtonState = function(button,isDown,x,y) {
	if(oge2d_driver_lime_Mouse._buttonStates == null) return;
	if(button < 0 || button >= oge2d_driver_lime_Mouse._buttonStates.length) return;
	if(x != null) oge2d_driver_lime_Mouse.x = x;
	if(y != null) oge2d_driver_lime_Mouse.y = y;
	oge2d_driver_lime_Mouse._buttonStates[button] = isDown;
};
oge2d_driver_lime_Mouse.setPosition = function(x,y) {
	oge2d_driver_lime_Mouse.x = x;
	oge2d_driver_lime_Mouse.y = y;
};
oge2d_driver_lime_Mouse.hide = function() {
	lime_ui_Mouse.hide();
};
oge2d_driver_lime_Mouse.show = function() {
	lime_ui_Mouse.show();
};
oge2d_driver_lime_Mouse.reset = function(x,y) {
	if(oge2d_driver_lime_Mouse._buttonStates == null) return;
	if(x != null) oge2d_driver_lime_Mouse.x = x;
	if(y != null) oge2d_driver_lime_Mouse.y = y;
	var _g1 = 0;
	var _g = oge2d_driver_lime_Mouse._buttonStates.length;
	while(_g1 < _g) {
		var i = _g1++;
		oge2d_driver_lime_Mouse._buttonStates[i] = false;
	}
};
oge2d_driver_lime_Mouse.init = function(x,y) {
	var this1;
	this1 = new Array(32);
	oge2d_driver_lime_Mouse._buttonStates = this1;
	oge2d_driver_lime_Mouse.reset(x,y);
};
oge2d_driver_lime_Mouse.prototype = {
	__class__: oge2d_driver_lime_Mouse
};
var oge2d_driver_lime_MusicSource = function() {
	this._pauseTime = 0;
	this._startTime = 0;
	this._gain = null;
	this._channel = null;
	this._sound = null;
	this._times = 1;
	this.volume = 1;
	this.state = 0;
	this._sound = null;
	this.state = 0;
};
$hxClasses["oge2d.driver.lime.MusicSource"] = oge2d_driver_lime_MusicSource;
oge2d_driver_lime_MusicSource.__name__ = ["oge2d","driver","lime","MusicSource"];
oge2d_driver_lime_MusicSource.init = function() {
	if(oge2d_driver_lime_MusicSource._audioContextClass == null) {
		oge2d_driver_lime_MusicSource._audioContextClass = Reflect.field(window,"AudioContext");
		if(oge2d_driver_lime_MusicSource._audioContextClass == null) oge2d_driver_lime_MusicSource._audioContextClass = Reflect.field(window,"webkitAudioContext");
	}
	if(oge2d_driver_lime_MusicSource._audioContextClass == null) haxe_Log.trace("WebAudio not supported",{ fileName : "MusicSource.hx", lineNumber : 98, className : "oge2d.driver.lime.MusicSource", methodName : "init"}); else if(oge2d_driver_lime_MusicSource._context == null) oge2d_driver_lime_MusicSource._context = Type.createInstance(oge2d_driver_lime_MusicSource._audioContextClass,[]);
};
oge2d_driver_lime_MusicSource.prototype = {
	state: null
	,volume: null
	,_times: null
	,_sound: null
	,_channel: null
	,_gain: null
	,_startTime: null
	,_pauseTime: null
	,isReady: function() {
		return this.state == 1;
	}
	,isCompleted: function() {
		return this.state == 4;
	}
	,isPlaying: function() {
		return this.state == 2;
	}
	,isPaused: function() {
		return this.state == 3;
	}
	,resume: function() {
		if(this.state == 3) this.play(this._times);
	}
	,vol: function(value) {
		this.set_volume(value);
	}
	,set_volume: function(value) {
		var volumeValue;
		if(value < 0) volumeValue = 0; else if(value > 1) volumeValue = 1; else volumeValue = value;
		if(this.volume == volumeValue) return volumeValue;
		try {
			if(this._gain != null) this._gain.gain.value = volumeValue;
			this.volume = volumeValue;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			haxe_Log.trace("Failed to set volume: " + Std.string(e),{ fileName : "MusicSource.hx", lineNumber : 116, className : "oge2d.driver.lime.MusicSource", methodName : "set_volume"});
		}
		return this.volume;
	}
	,load: function(bytes,callback) {
		var _g = this;
		if(oge2d_driver_lime_MusicSource._context == null) {
			if(callback != null) callback();
			return;
		}
		oge2d_driver_lime_MusicSource._context.decodeAudioData(bytes.b.bufferValue,function(buf) {
			_g._sound = buf;
			if(_g._sound != null && _g._sound.length > 0) _g.state = 1;
			if(callback != null) callback();
		},function() {
			haxe_Log.trace("Failed to decode Web Audio Data",{ fileName : "MusicSource.hx", lineNumber : 131, className : "oge2d.driver.lime.MusicSource", methodName : "load"});
			if(callback != null) callback();
		});
	}
	,turnoff: function() {
		if(this._channel != null) {
			this._channel.disconnect();
			this._channel = null;
		}
		if(this._gain != null) {
			this._gain.disconnect();
			this._gain = null;
		}
	}
	,turnon: function() {
		var _g = this;
		if(oge2d_driver_lime_MusicSource._context == null) return;
		if(this._sound == null || this._sound.length <= 0) return;
		this.turnoff();
		this._channel = oge2d_driver_lime_MusicSource._context.createBufferSource();
		if(this._channel == null) return;
		this._channel.buffer = this._sound;
		this._channel.onended = function() {
			if(_g.state == 2) {
				if(_g._times >= 0) {
					if(_g._times > 0) _g._times--;
					if(_g._times == 0) {
						_g.turnoff();
						_g.state = 4;
					} else {
						_g._pauseTime = 0;
						_g._startTime = oge2d_driver_lime_MusicSource._context.currentTime;
						_g.turnon();
					}
				} else {
					_g._pauseTime = 0;
					_g._startTime = oge2d_driver_lime_MusicSource._context.currentTime;
					_g.turnon();
				}
			}
		};
		var self_ = this;
		var clazz_ = oge2d_driver_lime_MusicSource;
		if(clazz_._context.createGain != null) this._gain = oge2d_driver_lime_MusicSource._context.createGain(); else this._gain = clazz_._context.createGainNode();
		if(this._gain == null) return;
		this._channel.connect(this._gain);
		this._gain.connect(oge2d_driver_lime_MusicSource._context.destination);
		this._gain.gain.value = this.volume;
		if(this._pauseTime > 0) {
			this._startTime = oge2d_driver_lime_MusicSource._context.currentTime - this._pauseTime;
			if(Reflect.field(this._channel,"start") != null) this._channel.start(0,this._pauseTime); else self_._channel.noteGrainOn(0,this._pauseTime,this._channel.buffer.duration);
		} else {
			this._startTime = oge2d_driver_lime_MusicSource._context.currentTime;
			if(Reflect.field(this._channel,"start") != null) this._channel.start(0); else self_._channel.noteGrainOn(0,0,this._channel.buffer.duration);
		}
	}
	,play: function(times) {
		if(oge2d_driver_lime_MusicSource._context == null) return;
		if(this._sound == null || this._sound.length <= 0) return;
		if(this.state == 0 || this.state == 2) return; else if(this.state == 1 || this.state == 3 || this.state == 4) {
			if(times != null) if(times <= 0) this._times = -1; else this._times = times; else if(this.state == 1) this._times = -1;
			this.state = 2;
			this.turnon();
		}
	}
	,stop: function() {
		if(this.state == 0) return;
		if(oge2d_driver_lime_MusicSource._context == null || this._channel == null) return;
		var self_ = this;
		if(Reflect.field(this._channel,"stop") != null) this._channel.stop(0); else if(Reflect.field(this._channel,"noteOff") != null) try {
			self_._channel.noteOff(0);
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
		}
		this.turnoff();
		this._pauseTime = 0;
		this._startTime = 0;
		this.state = 1;
	}
	,pause: function() {
		if(this.state != 2) return;
		if(oge2d_driver_lime_MusicSource._context == null || this._channel == null) return;
		this._pauseTime = oge2d_driver_lime_MusicSource._context.currentTime - this._startTime;
		var self_ = this;
		if(Reflect.field(this._channel,"stop") != null) this._channel.stop(0); else if(Reflect.field(this._channel,"noteOff") != null) try {
			self_._channel.noteOff(0);
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
		}
		this.turnoff();
		this.state = 3;
	}
	,reset: function() {
		if(this.state == 4) {
			this._pauseTime = 0;
			this._startTime = 0;
			this.state = 1;
		} else this.stop();
	}
	,dispose: function() {
		this.stop();
		this.state = 0;
		if(this._sound != null) this._sound = null;
	}
	,__class__: oge2d_driver_lime_MusicSource
};
var oge2d_driver_lime_RendererGL = function() { };
$hxClasses["oge2d.driver.lime.RendererGL"] = oge2d_driver_lime_RendererGL;
oge2d_driver_lime_RendererGL.__name__ = ["oge2d","driver","lime","RendererGL"];
oge2d_driver_lime_RendererGL.init = function(width,height,ctx,callback) {
	if(ctx == null) return false;
	oge2d_driver_lime_RendererGL._gl = ctx;
	oge2d_driver_lime_RendererGL._width = width;
	oge2d_driver_lime_RendererGL._height = height;
	var vertexSource = "\r\n\t\t\t\r\n\t\t\tattribute vec3 aVertexPosition;\r\n\t\t\tattribute vec2 aTexCoord;\r\n\t\t\tattribute vec4 aColor;\r\n\t\t\t\r\n\t\t\tvarying vec2 vTexCoord;\r\n\t\t\tvarying vec4 vColor;\r\n\t\t\t\r\n\t\t\tuniform mat4 uMatrix;\r\n\t\t\t\r\n\t\t\tvoid main (void) {\r\n\t\t\t\tvColor = aColor;\r\n\t\t\t\tvTexCoord = aTexCoord;\r\n\t\t\t\tgl_Position = uMatrix * vec4(aVertexPosition, 1.0);\r\n\t\t\t\t\r\n\t\t\t}\r\n\t\t\t\r\n\t\t";
	var fragmentSource = "precision mediump float;" + "\r\n\t\t\tvarying vec2 vTexCoord;\r\n\t\t\tvarying vec4 vColor;\r\n\t\t\t\r\n\t\t\tuniform sampler2D uImage0;\r\n\t\t\t\r\n\t\t\tvoid main (void) {\r\n\t\t\t\t\r\n\t\t\t\tgl_FragColor = texture2D(uImage0, vTexCoord) * vColor;\r\n\t\t\t\t\r\n\t\t\t}\r\n\t\t\t\r\n\t\t";
	oge2d_driver_lime_RendererGL._program = lime_utils_GLUtils.createProgram(vertexSource,fragmentSource);
	oge2d_driver_lime_RendererGL._gl.useProgram(oge2d_driver_lime_RendererGL._program);
	oge2d_driver_lime_RendererGL._vertexBuffer = oge2d_driver_lime_RendererGL._gl.createBuffer();
	oge2d_driver_lime_RendererGL._gl.bindBuffer(oge2d_driver_lime_RendererGL._gl.ARRAY_BUFFER,oge2d_driver_lime_RendererGL._vertexBuffer);
	oge2d_driver_lime_RendererGL._indexBuffer = oge2d_driver_lime_RendererGL._gl.createBuffer();
	oge2d_driver_lime_RendererGL._gl.bindBuffer(oge2d_driver_lime_RendererGL._gl.ELEMENT_ARRAY_BUFFER,oge2d_driver_lime_RendererGL._indexBuffer);
	var matrixUniform = oge2d_driver_lime_RendererGL._gl.getUniformLocation(oge2d_driver_lime_RendererGL._program,"uMatrix");
	var near = -1000;
	var far = 1000;
	var matrix = lime_math__$Matrix4_Matrix4_$Impl_$._new((function($this) {
		var $r;
		var array = [2.0 / oge2d_driver_lime_RendererGL._width,0,0,0,0,-2. / oge2d_driver_lime_RendererGL._height,0,0,0,0,2.0 / (far - near),0,-1.0,1.0,0,1.0];
		var this1;
		if(array != null) this1 = new Float32Array(array); else this1 = null;
		$r = this1;
		return $r;
	}(this)));
	oge2d_driver_lime_RendererGL._gl.uniformMatrix4fv(matrixUniform,false,matrix);
	oge2d_driver_lime_RendererGL._vertexAttribute = oge2d_driver_lime_RendererGL._gl.getAttribLocation(oge2d_driver_lime_RendererGL._program,"aVertexPosition");
	oge2d_driver_lime_RendererGL._gl.enableVertexAttribArray(oge2d_driver_lime_RendererGL._vertexAttribute);
	oge2d_driver_lime_RendererGL._gl.vertexAttribPointer(oge2d_driver_lime_RendererGL._vertexAttribute,3,oge2d_driver_lime_RendererGL._gl.FLOAT,false,36,0);
	oge2d_driver_lime_RendererGL._textureAttribute = oge2d_driver_lime_RendererGL._gl.getAttribLocation(oge2d_driver_lime_RendererGL._program,"aTexCoord");
	oge2d_driver_lime_RendererGL._gl.enableVertexAttribArray(oge2d_driver_lime_RendererGL._textureAttribute);
	oge2d_driver_lime_RendererGL._gl.vertexAttribPointer(oge2d_driver_lime_RendererGL._textureAttribute,2,oge2d_driver_lime_RendererGL._gl.FLOAT,false,36,12);
	oge2d_driver_lime_RendererGL._colorAttribute = oge2d_driver_lime_RendererGL._gl.getAttribLocation(oge2d_driver_lime_RendererGL._program,"aColor");
	oge2d_driver_lime_RendererGL._gl.enableVertexAttribArray(oge2d_driver_lime_RendererGL._colorAttribute);
	oge2d_driver_lime_RendererGL._gl.vertexAttribPointer(oge2d_driver_lime_RendererGL._colorAttribute,4,oge2d_driver_lime_RendererGL._gl.FLOAT,false,36,20);
	var imageUniform = oge2d_driver_lime_RendererGL._gl.getUniformLocation(oge2d_driver_lime_RendererGL._program,"uImage0");
	oge2d_driver_lime_RendererGL._gl.uniform1i(imageUniform,0);
	oge2d_driver_lime_RendererGL._gl.enable(oge2d_driver_lime_RendererGL._gl.DEPTH_TEST);
	oge2d_driver_lime_RendererGL._gl.depthFunc(oge2d_driver_lime_RendererGL._gl.LEQUAL);
	oge2d_driver_lime_RendererGL._gl.blendFunc(oge2d_driver_lime_RendererGL._gl.SRC_ALPHA,oge2d_driver_lime_RendererGL._gl.ONE_MINUS_SRC_ALPHA);
	oge2d_driver_lime_RendererGL._gl.enable(oge2d_driver_lime_RendererGL._gl.BLEND);
	oge2d_driver_lime_RendererGL._pixel = oge2d_driver_lime_RendererGL.createDisplayBuffer(oge2d_driver_lime_RendererGL.createSimpleTexture(1,1,255,255,255,255));
	if(callback != null) callback(oge2d_driver_lime_RendererGL._width,oge2d_driver_lime_RendererGL._height);
	return true;
};
oge2d_driver_lime_RendererGL.clear = function() {
	if(oge2d_driver_lime_RendererGL._gl == null) return;
	oge2d_driver_lime_RendererGL._gl.viewport(0,0,oge2d_driver_lime_RendererGL._width,oge2d_driver_lime_RendererGL._height);
	oge2d_driver_lime_RendererGL._gl.clear(oge2d_driver_lime_RendererGL._gl.COLOR_BUFFER_BIT | oge2d_driver_lime_RendererGL._gl.DEPTH_BUFFER_BIT);
};
oge2d_driver_lime_RendererGL.clearColor = function(red,green,blue,alpha) {
	if(oge2d_driver_lime_RendererGL._gl == null) return;
	oge2d_driver_lime_RendererGL._gl.clearColor(red,green,blue,alpha);
};
oge2d_driver_lime_RendererGL.draw = function(buffer) {
	if(oge2d_driver_lime_RendererGL._gl == null || buffer == null) return;
	if(buffer.texture == null || buffer.texture.data == null || buffer.vertices == null || buffer.count <= 0) return;
	oge2d_driver_lime_RendererGL._gl.bindTexture(oge2d_driver_lime_RendererGL._gl.TEXTURE_2D,buffer.texture.data);
	oge2d_driver_lime_RendererGL._gl.bufferData(oge2d_driver_lime_RendererGL._gl.ARRAY_BUFFER,buffer.vertices,oge2d_driver_lime_RendererGL._gl.STATIC_DRAW);
	oge2d_driver_lime_RendererGL._gl.bufferData(oge2d_driver_lime_RendererGL._gl.ELEMENT_ARRAY_BUFFER,buffer.indices,oge2d_driver_lime_RendererGL._gl.STATIC_DRAW);
	oge2d_driver_lime_RendererGL._gl.drawElements(oge2d_driver_lime_RendererGL._gl.TRIANGLES,buffer.indices.length,oge2d_driver_lime_RendererGL._gl.UNSIGNED_SHORT,0);
};
oge2d_driver_lime_RendererGL.getSinglePixelBuffer = function() {
	return oge2d_driver_lime_RendererGL._pixel;
};
oge2d_driver_lime_RendererGL.createSimpleTexture = function(width,height,red,green,blue,alpha) {
	if(oge2d_driver_lime_RendererGL._gl == null) return null;
	var color = (red & 255) << 24 | (green & 255) << 16 | (blue & 255) << 8 | alpha & 255;
	var image = new lime_graphics_Image(null,0,0,width,height,color);
	var src = image.get_src();
	if(src != null) {
		var ctx = src.getContext("2d");
		ctx.fillStyle = "rgba(" + red + ", " + green + ", " + blue + ", " + alpha / 255.0 + ")";
		ctx.fillRect(0,0,width,height);
	}
	return oge2d_driver_lime_RendererGL.createTexture(image);
};
oge2d_driver_lime_RendererGL.createTexture = function(image) {
	if(oge2d_driver_lime_RendererGL._gl == null || image == null) return null;
	var texture = oge2d_driver_lime_RendererGL._gl.createTexture();
	oge2d_driver_lime_RendererGL._gl.bindTexture(oge2d_driver_lime_RendererGL._gl.TEXTURE_2D,texture);
	oge2d_driver_lime_RendererGL._gl.texParameteri(oge2d_driver_lime_RendererGL._gl.TEXTURE_2D,oge2d_driver_lime_RendererGL._gl.TEXTURE_WRAP_S,oge2d_driver_lime_RendererGL._gl.CLAMP_TO_EDGE);
	oge2d_driver_lime_RendererGL._gl.texParameteri(oge2d_driver_lime_RendererGL._gl.TEXTURE_2D,oge2d_driver_lime_RendererGL._gl.TEXTURE_WRAP_T,oge2d_driver_lime_RendererGL._gl.CLAMP_TO_EDGE);
	oge2d_driver_lime_RendererGL._gl.texImage2D(oge2d_driver_lime_RendererGL._gl.TEXTURE_2D,0,oge2d_driver_lime_RendererGL._gl.RGBA,oge2d_driver_lime_RendererGL._gl.RGBA,oge2d_driver_lime_RendererGL._gl.UNSIGNED_BYTE,image.get_src());
	oge2d_driver_lime_RendererGL._gl.texParameteri(oge2d_driver_lime_RendererGL._gl.TEXTURE_2D,oge2d_driver_lime_RendererGL._gl.TEXTURE_MAG_FILTER,oge2d_driver_lime_RendererGL._gl.LINEAR);
	oge2d_driver_lime_RendererGL._gl.texParameteri(oge2d_driver_lime_RendererGL._gl.TEXTURE_2D,oge2d_driver_lime_RendererGL._gl.TEXTURE_MIN_FILTER,oge2d_driver_lime_RendererGL._gl.LINEAR);
	var w = image.width;
	var h = image.height;
	image.set_src(null);
	image.set_data(null);
	image = null;
	return new oge2d_driver_lime_TextureGL(texture,w,h);
};
oge2d_driver_lime_RendererGL.deleteTexture = function(texture) {
	if(oge2d_driver_lime_RendererGL._gl == null || texture == null || texture.data == null) return;
	oge2d_driver_lime_RendererGL._gl.deleteTexture(texture.data);
	texture.data = null;
};
oge2d_driver_lime_RendererGL.createDisplayBuffer = function(tex,size,info) {
	if(size == null) size = 1;
	if(tex == null || size <= 0) return null;
	var buffer = new oge2d_driver_lime_DisplayBufferGL();
	buffer.texture = tex;
	var elements = size * 4 * 9;
	var this1;
	if(elements != null) this1 = new Float32Array(elements); else this1 = null;
	buffer.vertices = this1;
	var elements1 = size * 6;
	var this2;
	if(elements1 != null) this2 = new Int16Array(elements1); else this2 = null;
	buffer.indices = this2;
	buffer.count = size;
	buffer.data = info;
	var last = 0;
	var _g = 0;
	while(_g < size) {
		var i = _g++;
		buffer.indices[i * 6] = last;
		buffer.indices[i * 6 + 1] = last + 1;
		buffer.indices[i * 6 + 2] = last + 2;
		buffer.indices[i * 6 + 3] = last;
		buffer.indices[i * 6 + 4] = last + 2;
		buffer.indices[i * 6 + 5] = last + 3;
		last = last + 4;
	}
	return buffer;
};
oge2d_driver_lime_RendererGL.fillBuffer = function(buf,pos,value) {
	buf.vertices[pos] = value;
	return pos + 1;
};
oge2d_driver_lime_RendererGL.update = function() {
};
var oge2d_driver_lime_SoundSource = function() {
	this._gains = new haxe_ds_ObjectMap();
	this._channels = new List();
	this._sound = null;
	this.volume = 1;
	this.state = 0;
	this._sound = null;
	this.state = 0;
};
$hxClasses["oge2d.driver.lime.SoundSource"] = oge2d_driver_lime_SoundSource;
oge2d_driver_lime_SoundSource.__name__ = ["oge2d","driver","lime","SoundSource"];
oge2d_driver_lime_SoundSource.init = function() {
	if(oge2d_driver_lime_SoundSource._audioContextClass == null) {
		oge2d_driver_lime_SoundSource._audioContextClass = Reflect.field(window,"AudioContext");
		if(oge2d_driver_lime_SoundSource._audioContextClass == null) oge2d_driver_lime_SoundSource._audioContextClass = Reflect.field(window,"webkitAudioContext");
	}
	if(oge2d_driver_lime_SoundSource._audioContextClass == null) haxe_Log.trace("WebAudio not supported",{ fileName : "SoundSource.hx", lineNumber : 73, className : "oge2d.driver.lime.SoundSource", methodName : "init"}); else if(oge2d_driver_lime_SoundSource._context == null) oge2d_driver_lime_SoundSource._context = Type.createInstance(oge2d_driver_lime_SoundSource._audioContextClass,[]);
};
oge2d_driver_lime_SoundSource.prototype = {
	state: null
	,volume: null
	,_sound: null
	,_channels: null
	,_gains: null
	,isReady: function() {
		return this.state == 1;
	}
	,vol: function(value) {
		this.set_volume(value);
	}
	,set_volume: function(value) {
		var volumeValue;
		if(value < 0) volumeValue = 0; else if(value > 1) volumeValue = 1; else volumeValue = value;
		if(this.volume == volumeValue) return volumeValue;
		try {
			var $it0 = this._gains.keys();
			while( $it0.hasNext() ) {
				var key = $it0.next();
				this._gains.h[key.__id__].gain.value = volumeValue;
			}
			this.volume = volumeValue;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			haxe_Log.trace("Failed to set volume: " + Std.string(e),{ fileName : "SoundSource.hx", lineNumber : 91, className : "oge2d.driver.lime.SoundSource", methodName : "set_volume"});
		}
		return this.volume;
	}
	,load: function(bytes,callback) {
		var _g = this;
		if(oge2d_driver_lime_SoundSource._context == null) {
			if(callback != null) callback();
			return;
		}
		oge2d_driver_lime_SoundSource._context.decodeAudioData(bytes.b.bufferValue,function(buf) {
			_g._sound = buf;
			if(_g._sound != null && _g._sound.length > 0) _g.state = 1;
			if(callback != null) callback();
		},function() {
			haxe_Log.trace("Failed to decode Web Audio Data",{ fileName : "SoundSource.hx", lineNumber : 106, className : "oge2d.driver.lime.SoundSource", methodName : "load"});
			if(callback != null) callback();
		});
	}
	,turnoff: function(channel) {
		var gain = null;
		if(channel != null) {
			gain = this._gains.h[channel.__id__];
			channel.disconnect();
		}
		if(gain != null) gain.disconnect();
		if(channel != null) this._gains.remove(channel);
	}
	,turnon: function() {
		var _g = this;
		if(oge2d_driver_lime_SoundSource._context == null) return;
		if(this._sound == null || this._sound.length <= 0) return;
		var channel = oge2d_driver_lime_SoundSource._context.createBufferSource();
		if(channel == null) return;
		channel.buffer = this._sound;
		channel.onended = function() {
			_g.turnoff(channel);
		};
		var self_ = this;
		var clazz_ = oge2d_driver_lime_SoundSource;
		var gain = null;
		if(clazz_._context.createGain != null) gain = oge2d_driver_lime_SoundSource._context.createGain(); else gain = clazz_._context.createGainNode();
		if(gain == null) return;
		channel.connect(gain);
		gain.connect(oge2d_driver_lime_SoundSource._context.destination);
		gain.gain.value = this.volume;
		this._gains.set(channel,gain);
		if(Reflect.field(channel,"start") != null) channel.start(0); else channel.noteGrainOn(0,0,channel.buffer.duration);
	}
	,play: function() {
		if(this._sound == null || this.state == 0) return;
		this.turnon();
	}
	,stop: function() {
		if(this._sound == null || this.state == 0) return;
		var nodes = new List();
		var $it0 = this._gains.keys();
		while( $it0.hasNext() ) {
			var key = $it0.next();
			nodes.add(key);
		}
		while(nodes.length > 0) {
			var channel = nodes.pop();
			if(channel != null) {
				if(Reflect.field(channel,"stop") != null) channel.stop(0); else if(Reflect.field(channel,"noteOff") != null) try {
					channel.noteOff(0);
				} catch( e ) {
					if (e instanceof js__$Boot_HaxeError) e = e.val;
				}
				this.turnoff(channel);
			}
		}
	}
	,dispose: function() {
		this.stop();
		this.state = 0;
		if(this._sound != null) this._sound = null;
		this._channels.clear();
	}
	,__class__: oge2d_driver_lime_SoundSource
};
var oge2d_driver_lime_TextureGL = function(tex,w,h) {
	this.height = 0;
	this.width = 0;
	this.data = null;
	this.data = tex;
	this.width = w;
	this.height = h;
};
$hxClasses["oge2d.driver.lime.TextureGL"] = oge2d_driver_lime_TextureGL;
oge2d_driver_lime_TextureGL.__name__ = ["oge2d","driver","lime","TextureGL"];
oge2d_driver_lime_TextureGL.prototype = {
	data: null
	,width: null
	,height: null
	,__class__: oge2d_driver_lime_TextureGL
};
var oge2d_library_common_FPS = function() {
};
$hxClasses["oge2d.library.common.FPS"] = oge2d_library_common_FPS;
oge2d_library_common_FPS.__name__ = ["oge2d","library","common","FPS"];
oge2d_library_common_FPS.prototype = {
	onSceneActive: function(sprite) {
		var fps = sprite.get("fps");
		if(fps == null) return;
		fps.ticks = 0;
		fps.times = 0;
		fps.frames = 0;
	}
	,onUpdate: function(sprite) {
		var fps = sprite.get("fps");
		if(fps == null) return;
		fps.ticks += sprite.game.interval;
		fps.times += 1;
		if(fps.ticks >= 1000) {
			fps.frames = fps.times;
			fps.times = 0;
			fps.ticks = 0;
		}
		var text = sprite.get("text");
		if(text != null) if(fps.frames == null) text.content = "null"; else text.content = "" + fps.frames;
	}
	,__class__: oge2d_library_common_FPS
};
var oge2d_library_common_Media = function() {
};
$hxClasses["oge2d.library.common.Media"] = oge2d_library_common_Media;
oge2d_library_common_Media.__name__ = ["oge2d","library","common","Media"];
oge2d_library_common_Media.turnDownMusic = function(scene,music,delta,interval,callback) {
	if(music.volume <= 0) {
		music.stop();
		if(callback != null) callback(scene);
	} else {
		music.set_volume(music.volume - delta);
		oge2d_system_Timer.addTimer(scene,interval,null,function() {
			oge2d_library_common_Media.turnDownMusic(scene,music,delta,interval,callback);
		});
	}
};
oge2d_library_common_Media.musicFadeOut = function(scene,musicName,time,updateInterval,callback) {
	var music = scene.game.getMusic(musicName);
	var interval;
	if(updateInterval == null) interval = 100; else interval = updateInterval;
	var delta;
	if(music != null && time != 0) delta = music.volume / time * interval; else delta = 0;
	if(delta <= 0 || delta >= 1) {
		if(delta >= 1) music.stop();
		if(callback != null) callback(scene);
	} else oge2d_library_common_Media.turnDownMusic(scene,music,delta,interval,callback);
};
oge2d_library_common_Media.prototype = {
	__class__: oge2d_library_common_Media
};
var oge2d_script_AstExpr = function() {
	this.arrval = [];
	this.tmpval = "";
	this.strval = "";
	this.floatval = 0;
	this.intval = 0;
	this.boolval = false;
	this.subtype = 0;
	this.maintype = 0;
};
$hxClasses["oge2d.script.AstExpr"] = oge2d_script_AstExpr;
oge2d_script_AstExpr.__name__ = ["oge2d","script","AstExpr"];
oge2d_script_AstExpr.prototype = {
	maintype: null
	,subtype: null
	,boolval: null
	,intval: null
	,floatval: null
	,strval: null
	,tmpval: null
	,arrval: null
	,__class__: oge2d_script_AstExpr
};
var oge2d_script_AstNode = function(astExpr,lineNumber) {
	this.line = 0;
	this.expr = null;
	this.expr = astExpr;
	this.line = lineNumber;
};
$hxClasses["oge2d.script.AstNode"] = oge2d_script_AstNode;
oge2d_script_AstNode.__name__ = ["oge2d","script","AstNode"];
oge2d_script_AstNode.prototype = {
	expr: null
	,line: null
	,__class__: oge2d_script_AstNode
};
var oge2d_script_Instr = function() {
	this.target = -1;
	this.pcount = 0;
	this.related = -1;
	this.node = null;
	this.index = 0;
	this.opcode = 0;
};
$hxClasses["oge2d.script.Instr"] = oge2d_script_Instr;
oge2d_script_Instr.__name__ = ["oge2d","script","Instr"];
oge2d_script_Instr.prototype = {
	opcode: null
	,index: null
	,node: null
	,related: null
	,pcount: null
	,target: null
	,__class__: oge2d_script_Instr
};
var oge2d_script_Block = function() {
	this.next = 0;
	this.end = 0;
	this.begin = 0;
	this.type = 0;
};
$hxClasses["oge2d.script.Block"] = oge2d_script_Block;
oge2d_script_Block.__name__ = ["oge2d","script","Block"];
oge2d_script_Block.prototype = {
	type: null
	,begin: null
	,end: null
	,next: null
	,__class__: oge2d_script_Block
};
var oge2d_script_Call = function() {
	this.end = 0;
	this.entry = 0;
	this.from = 0;
};
$hxClasses["oge2d.script.Call"] = oge2d_script_Call;
oge2d_script_Call.__name__ = ["oge2d","script","Call"];
oge2d_script_Call.prototype = {
	from: null
	,entry: null
	,end: null
	,__class__: oge2d_script_Call
};
var oge2d_script_Func = function() {
	this.args = [];
	this.end = 0;
	this.begin = 0;
	this.name = "";
};
$hxClasses["oge2d.script.Func"] = oge2d_script_Func;
oge2d_script_Func.__name__ = ["oge2d","script","Func"];
oge2d_script_Func.prototype = {
	name: null
	,begin: null
	,end: null
	,args: null
	,__class__: oge2d_script_Func
};
var oge2d_script_IntRange = function(v1,v2) {
	this.begin = v1;
	this.end = v2;
};
$hxClasses["oge2d.script.IntRange"] = oge2d_script_IntRange;
oge2d_script_IntRange.__name__ = ["oge2d","script","IntRange"];
oge2d_script_IntRange.prototype = {
	begin: null
	,end: null
	,__class__: oge2d_script_IntRange
};
var oge2d_script_BytecodeInterp = function(scriptParser) {
	this.onLine = null;
	this.cursor = 0;
	this.state = 0;
	this.newlinepos = new List();
	this.varmap = new haxe_ds_StringMap();
	this.localmaps = new List();
	this.endmap = new haxe_ds_IntMap();
	this.blocks = new List();
	this.funcs = new haxe_ds_StringMap();
	this.calls = new List();
	this.arrays = new List();
	this.containers = new List();
	this.looptimes = new haxe_ds_IntMap();
	this.sizes = new List();
	this.stack = new List();
	this.code = [];
	this.parser = null;
	if(scriptParser != null) this.parser = scriptParser; else this.parser = new hscript_Parser();
	this.varmap.set("null",null);
	this.varmap.set("true",true);
	this.varmap.set("false",false);
};
$hxClasses["oge2d.script.BytecodeInterp"] = oge2d_script_BytecodeInterp;
oge2d_script_BytecodeInterp.__name__ = ["oge2d","script","BytecodeInterp"];
oge2d_script_BytecodeInterp.prototype = {
	parser: null
	,code: null
	,stack: null
	,sizes: null
	,looptimes: null
	,containers: null
	,arrays: null
	,calls: null
	,funcs: null
	,blocks: null
	,endmap: null
	,localmaps: null
	,varmap: null
	,newlinepos: null
	,state: null
	,cursor: null
	,vars: null
	,onLine: null
	,get_vars: function() {
		return this.varmap;
	}
	,getState: function() {
		return this.state;
	}
	,getResult: function() {
		if(this.stack.length > 0) return this.stack.first(); else return null;
	}
	,getLocalVars: function() {
		var result = new List();
		var _g_head = this.localmaps.h;
		var _g_val = null;
		while(_g_head != null) {
			var localmap;
			localmap = (function($this) {
				var $r;
				_g_val = _g_head[0];
				_g_head = _g_head[1];
				$r = _g_val;
				return $r;
			}(this));
			var localvars = new haxe_ds_StringMap();
			var $it0 = localmap.keys();
			while( $it0.hasNext() ) {
				var name = $it0.next();
				var value;
				value = __map_reserved[name] != null?localmap.getReserved(name):localmap.h[name];
				localvars.set(name,value);
			}
			result.add(localvars);
		}
		return result;
	}
	,clear: function() {
		var intKeys = new List();
		var strKeys = new List();
		this.code.splice(0,this.code.length);
		this.stack.clear();
		this.sizes.clear();
		intKeys.clear();
		var $it0 = this.looptimes.keys();
		while( $it0.hasNext() ) {
			var k = $it0.next();
			intKeys.add(k);
		}
		var _g_head = intKeys.h;
		var _g_val = null;
		while(_g_head != null) {
			var k1;
			k1 = (function($this) {
				var $r;
				_g_val = _g_head[0];
				_g_head = _g_head[1];
				$r = _g_val;
				return $r;
			}(this));
			this.looptimes.remove(k1);
		}
		this.containers.clear();
		this.arrays.clear();
		this.calls.clear();
		strKeys.clear();
		var $it1 = this.funcs.keys();
		while( $it1.hasNext() ) {
			var k2 = $it1.next();
			strKeys.add(k2);
		}
		var _g_head1 = strKeys.h;
		var _g_val1 = null;
		while(_g_head1 != null) {
			var k3;
			k3 = (function($this) {
				var $r;
				_g_val1 = _g_head1[0];
				_g_head1 = _g_head1[1];
				$r = _g_val1;
				return $r;
			}(this));
			this.funcs.remove(k3);
		}
		this.blocks.clear();
		intKeys.clear();
		var $it2 = this.endmap.keys();
		while( $it2.hasNext() ) {
			var k4 = $it2.next();
			intKeys.add(k4);
		}
		var _g_head2 = intKeys.h;
		var _g_val2 = null;
		while(_g_head2 != null) {
			var k5;
			k5 = (function($this) {
				var $r;
				_g_val2 = _g_head2[0];
				_g_head2 = _g_head2[1];
				$r = _g_val2;
				return $r;
			}(this));
			this.endmap.remove(k5);
		}
		this.localmaps.clear();
		this.newlinepos.clear();
		this.state = 0;
		this.cursor = 0;
	}
	,edef: function(e) {
		return e.e;
	}
	,markNewLinePos: function(src) {
		this.newlinepos.clear();
		var pos = src.indexOf("\n");
		while(pos >= 0) {
			this.newlinepos.add(pos);
			pos = src.indexOf("\n",pos + 1);
		}
	}
	,getLineNumber: function(e) {
		var line = 0;
		var idx = 0;
		var _g_head = this.newlinepos.h;
		var _g_val = null;
		while(_g_head != null) {
			var pos;
			pos = (function($this) {
				var $r;
				_g_val = _g_head[0];
				_g_head = _g_head[1];
				$r = _g_val;
				return $r;
			}(this));
			idx++;
			if(e.pmin < pos) {
				line = idx;
				break;
			}
		}
		return line;
	}
	,newAstExpr: function(mainType) {
		var astExpr = new oge2d_script_AstExpr();
		if(mainType == null) astExpr.maintype = 0; else astExpr.maintype = mainType;
		return astExpr;
	}
	,newInstr: function(astNode,op) {
		var instr = new oge2d_script_Instr();
		instr.opcode = op;
		instr.node = astNode;
		return instr;
	}
	,newBlock: function(op) {
		var block = new oge2d_script_Block();
		if(op == 13) block.type = 1; else if(op == 15) block.type = 2;
		block.begin = this.cursor;
		if(this.endmap.h.hasOwnProperty(block.begin)) block.end = this.endmap.h[block.begin]; else block.end = this.code.length + 1;
		return block;
	}
	,newFunc: function(fn) {
		var func = new oge2d_script_Func();
		func.name = fn;
		return func;
	}
	,newCall: function(fn) {
		var call = new oge2d_script_Call();
		call.from = this.cursor;
		call.entry = fn.begin + 1;
		call.end = fn.end;
		return call;
	}
	,genCodeError: function(errMsg,lineNumber) {
		var codeError = { msg : errMsg, line : lineNumber};
		var result = JSON.stringify(codeError);
		haxe_Log.trace(result,{ fileName : "BytecodeInterp.hx", lineNumber : 351, className : "oge2d.script.BytecodeInterp", methodName : "genCodeError"});
		return result;
	}
	,addInstr: function(instr) {
		this.code.push(instr);
		instr.index = this.code.length;
		return instr;
	}
	,genCode: function(e) {
		if(e == null) return;
		var nodeExpr = e.e;
		var node = new oge2d_script_AstNode(this.newAstExpr(),this.getLineNumber(e));
		switch(nodeExpr[1]) {
		case 0:
			var c = nodeExpr[2];
			node.expr.maintype = 4;
			switch(c[1]) {
			case 0:
				var v = c[2];
				node.expr.subtype = 1;
				node.expr.intval = v;
				break;
			case 1:
				var f = c[2];
				node.expr.subtype = 2;
				node.expr.floatval = f;
				break;
			case 2:
				var s = c[2];
				node.expr.subtype = 3;
				node.expr.strval = s;
				break;
			}
			this.addInstr(this.newInstr(node,1));
			break;
		case 1:
			var id = nodeExpr[2];
			node.expr.maintype = 5;
			node.expr.strval = id;
			this.addInstr(this.newInstr(node,2));
			break;
		case 2:
			var e1 = nodeExpr[4];
			var n = nodeExpr[2];
			node.expr.maintype = 6;
			node.expr.strval = n;
			this.addInstr(this.newInstr(node,3));
			if(e1 != null) {
				this.genCode(e1);
				this.addInstr(this.newInstr(node,4));
			}
			break;
		case 3:
			var e2 = nodeExpr[2];
			this.genCode(e2);
			break;
		case 4:
			var exprs = nodeExpr[2];
			var last = null;
			if(this.code.length > 0) last = this.code[this.code.length - 1];
			var instr = this.addInstr(this.newInstr(node,5));
			if(last != null) {
				if(last.opcode == 23 || last.opcode == 28 || last.opcode == 30) instr.related = last.index;
			}
			var bidx = instr.index;
			var _g = 0;
			while(_g < exprs.length) {
				var e3 = exprs[_g];
				++_g;
				this.genCode(e3);
			}
			var eidx = this.addInstr(this.newInstr(node,6)).index;
			{
				this.endmap.h[bidx] = eidx;
				eidx;
			}
			break;
		case 5:
			var f1 = nodeExpr[3];
			var e4 = nodeExpr[2];
			this.genCode(e4);
			node.expr.maintype = 9;
			node.expr.strval = f1;
			this.addInstr(this.newInstr(node,7));
			break;
		case 6:
			var e21 = nodeExpr[4];
			var e11 = nodeExpr[3];
			var op = nodeExpr[2];
			switch(op) {
			case "=":case "+=":case "-=":case "*=":case "/=":case "%=":case "&=":case "|=":case "^=":case "<<=":case ">>=":case ">>>=":
				this.genCode(e21);
				this.genCode(e11);
				node.expr.maintype = 10;
				node.expr.tmpval = op;
				{
					var _g1 = e11.e;
					switch(_g1[1]) {
					case 1:
						var id1 = _g1[2];
						node.expr.subtype = 5;
						node.expr.strval = id1;
						break;
					case 5:
						var f2 = _g1[3];
						var e5 = _g1[2];
						node.expr.subtype = 9;
						node.expr.strval = f2;
						break;
					case 16:
						var index = _g1[3];
						var e6 = _g1[2];
						node.expr.subtype = 20;
						break;
					default:
						node.expr.subtype = 0;
					}
				}
				this.addInstr(this.newInstr(node,4));
				break;
			default:
				this.genCode(e21);
				this.genCode(e11);
				node.expr.maintype = 10;
				node.expr.strval = op;
				this.addInstr(this.newInstr(node,8));
			}
			break;
		case 7:
			var e12 = nodeExpr[4];
			var prefix = nodeExpr[3];
			var op1 = nodeExpr[2];
			this.genCode(e12);
			node.expr.maintype = 11;
			node.expr.boolval = prefix;
			node.expr.tmpval = op1;
			{
				var _g2 = e12.e;
				switch(_g2[1]) {
				case 1:
					var id2 = _g2[2];
					node.expr.subtype = 5;
					node.expr.strval = id2;
					break;
				case 5:
					var f3 = _g2[3];
					var e7 = _g2[2];
					node.expr.subtype = 9;
					node.expr.strval = f3;
					break;
				case 16:
					var index1 = _g2[3];
					var e8 = _g2[2];
					node.expr.subtype = 20;
					break;
				default:
					node.expr.subtype = 0;
				}
			}
			this.addInstr(this.newInstr(node,4));
			break;
		case 8:
			var params = nodeExpr[3];
			var e9 = nodeExpr[2];
			var _g3 = 0;
			while(_g3 < params.length) {
				var p = params[_g3];
				++_g3;
				this.genCode(p);
			}
			this.genCode(e9);
			node.expr.maintype = 12;
			node.expr.intval = params.length;
			{
				var _g4 = e9.e;
				switch(_g4[1]) {
				case 1:
					var id3 = _g4[2];
					node.expr.subtype = 5;
					node.expr.strval = id3;
					break;
				case 5:
					var f4 = _g4[3];
					var e10 = _g4[2];
					node.expr.subtype = 9;
					node.expr.strval = f4;
					break;
				default:
					node.expr.subtype = 0;
				}
			}
			this.addInstr(this.newInstr(node,25));
			break;
		case 9:
			var e22 = nodeExpr[4];
			var e13 = nodeExpr[3];
			var econd = nodeExpr[2];
			this.genCode(econd);
			node.expr.maintype = 13;
			var instr1 = this.addInstr(this.newInstr(node,11));
			this.genCode(e13);
			instr1.target = this.code.length + 1;
			if(e22 != null) {
				var instr2 = this.addInstr(this.newInstr(node,12));
				instr1.target = this.code.length + 1;
				this.genCode(e22);
				instr2.target = this.code.length + 1;
			}
			break;
		case 10:
			var e14 = nodeExpr[3];
			var econd1 = nodeExpr[2];
			node.expr.maintype = 14;
			var bidx1 = this.addInstr(this.newInstr(node,13)).index;
			this.genCode(econd1);
			var instr11 = this.addInstr(this.newInstr(node,11));
			this.genCode(e14);
			var instr21 = this.addInstr(this.newInstr(node,14));
			var eidx1 = instr21.index;
			{
				this.endmap.h[bidx1] = eidx1;
				eidx1;
			}
			instr11.target = eidx1 + 1;
			instr21.target = bidx1 + 1;
			break;
		case 11:
			var e15 = nodeExpr[4];
			var it = nodeExpr[3];
			var v1 = nodeExpr[2];
			node.expr.maintype = 15;
			node.expr.strval = v1;
			var instr3 = this.addInstr(this.newInstr(node,15));
			var bidx2 = instr3.index;
			this.looptimes.h[bidx2] = 0;
			this.addInstr(this.newInstr(node,2));
			this.genCode(it);
			var instr12 = this.addInstr(this.newInstr(node,11));
			instr12.related = instr3.index;
			this.genCode(e15);
			var instr22 = this.addInstr(this.newInstr(node,16));
			var eidx2 = instr22.index;
			{
				this.endmap.h[bidx2] = eidx2;
				eidx2;
			}
			instr12.target = eidx2 + 1;
			instr22.target = bidx2 + 1;
			break;
		case 12:
			this.addInstr(this.newInstr(node,17));
			break;
		case 13:
			this.addInstr(this.newInstr(node,18));
			break;
		case 15:
			var e16 = nodeExpr[2];
			this.genCode(e16);
			node.expr.maintype = 19;
			this.addInstr(this.newInstr(node,10));
			break;
		case 14:
			var name = nodeExpr[4];
			var fexpr = nodeExpr[3];
			var params1 = nodeExpr[2];
			node.expr.maintype = 18;
			var jumper = this.addInstr(this.newInstr(node,12));
			var bidx3 = this.addInstr(this.newInstr(node,23)).index;
			this.genCode(fexpr);
			var ending = this.addInstr(this.newInstr(node,24));
			var eidx3 = ending.index;
			{
				this.endmap.h[bidx3] = eidx3;
				eidx3;
			}
			jumper.target = eidx3 + 1;
			var func = this.newFunc(name);
			func.begin = bidx3;
			func.end = eidx3;
			var _g5 = 0;
			while(_g5 < params1.length) {
				var p1 = params1[_g5];
				++_g5;
				func.args.push(p1.name);
			}
			{
				this.funcs.set(name,func);
				func;
			}
			break;
		case 17:
			var arr = nodeExpr[2];
			node.expr.maintype = 21;
			this.addInstr(this.newInstr(node,19));
			var _g6 = 0;
			while(_g6 < arr.length) {
				var e17 = arr[_g6];
				++_g6;
				this.genCode(e17);
				this.addInstr(this.newInstr(node,20));
			}
			this.addInstr(this.newInstr(node,21));
			break;
		case 16:
			var index2 = nodeExpr[3];
			var e18 = nodeExpr[2];
			this.genCode(index2);
			this.genCode(e18);
			node.expr.maintype = 20;
			this.addInstr(this.newInstr(node,22));
			break;
		case 18:
			var params2 = nodeExpr[3];
			var cl = nodeExpr[2];
			var _g7 = 0;
			while(_g7 < params2.length) {
				var p2 = params2[_g7];
				++_g7;
				this.genCode(p2);
			}
			node.expr.maintype = 22;
			node.expr.strval = cl;
			node.expr.intval = params2.length;
			this.addInstr(this.newInstr(node,26));
			break;
		case 19:
			var e19 = nodeExpr[2];
			this.genCode(e19);
			node.expr.maintype = 23;
			this.addInstr(this.newInstr(node,27));
			break;
		case 20:
			var ecatch = nodeExpr[5];
			var n1 = nodeExpr[3];
			var e20 = nodeExpr[2];
			{
				var _g8 = e20.e;
				switch(_g8[1]) {
				case 4:
					var exprs1 = _g8[2];
					break;
				default:
					throw new js__$Boot_HaxeError(this.genCodeError("[try/catch] should be followed by a block",node.line));
				}
			}
			{
				var _g9 = ecatch.e;
				switch(_g9[1]) {
				case 4:
					var exprs2 = _g9[2];
					break;
				default:
					throw new js__$Boot_HaxeError(this.genCodeError("[try/catch] should be followed by a block",node.line));
				}
			}
			node.expr.maintype = 24;
			node.expr.strval = n1;
			var instr13 = this.addInstr(this.newInstr(node,28));
			this.genCode(e20);
			var instr23 = this.addInstr(this.newInstr(node,29));
			var instr31 = this.addInstr(this.newInstr(node,30));
			this.genCode(ecatch);
			var instr4 = this.addInstr(this.newInstr(node,31));
			instr13.target = instr31.index;
			instr23.target = instr4.index + 1;
			break;
		case 21:
			var fl = nodeExpr[2];
			var _g10 = 0;
			while(_g10 < fl.length) {
				var f5 = fl[_g10];
				++_g10;
				this.genCode(f5.e);
			}
			node.expr.maintype = 25;
			node.expr.arrval.splice(0,node.expr.arrval.length);
			var _g11 = 0;
			while(_g11 < fl.length) {
				var f6 = fl[_g11];
				++_g11;
				node.expr.arrval.push(f6.name);
			}
			this.addInstr(this.newInstr(node,32));
			break;
		case 22:
			var e23 = nodeExpr[4];
			var e110 = nodeExpr[3];
			var econd2 = nodeExpr[2];
			this.genCode(econd2);
			node.expr.maintype = 26;
			var instr14 = this.addInstr(this.newInstr(node,11));
			this.genCode(e110);
			instr14.target = this.code.length + 1;
			var instr24 = this.addInstr(this.newInstr(node,12));
			instr14.target = this.code.length + 1;
			this.genCode(e23);
			instr24.target = this.code.length + 1;
			break;
		case 23:
			var def = nodeExpr[4];
			var cases = nodeExpr[3];
			var e24 = nodeExpr[2];
			this.genCode(e24);
			var last1 = null;
			var list = [];
			node.expr.maintype = 27;
			var _g12 = 0;
			while(_g12 < cases.length) {
				var c1 = cases[_g12];
				++_g12;
				if(last1 != null) last1.target = this.code.length + 1;
				var _g13 = 0;
				var _g21 = c1.values;
				while(_g13 < _g21.length) {
					var v2 = _g21[_g13];
					++_g13;
					this.genCode(v2);
				}
				last1 = this.addInstr(this.newInstr(node,11));
				last1.pcount = c1.values.length;
				this.genCode(c1.expr);
				list.push(this.addInstr(this.newInstr(node,12)));
			}
			if(last1 != null) last1.target = this.code.length + 1;
			this.genCode(def);
			var _g14 = 0;
			while(_g14 < list.length) {
				var instr5 = list[_g14];
				++_g14;
				instr5.target = this.code.length + 1;
			}
			break;
		}
	}
	,loadIdent: function(id) {
		var matchedMap = null;
		var _g_head = this.localmaps.h;
		var _g_val = null;
		while(_g_head != null) {
			var localmap;
			localmap = (function($this) {
				var $r;
				_g_val = _g_head[0];
				_g_head = _g_head[1];
				$r = _g_val;
				return $r;
			}(this));
			if(__map_reserved[id] != null?localmap.existsReserved(id):localmap.h.hasOwnProperty(id)) {
				matchedMap = localmap;
				break;
			}
		}
		if(matchedMap == null) {
			if(this.varmap.exists(id)) matchedMap = this.varmap;
		}
		return matchedMap;
	}
	,evalBinop: function(op,v1,v2) {
		var ret = null;
		switch(op) {
		case "+":
			ret = v1 + v2;
			break;
		case "-":
			ret = v1 - v2;
			break;
		case "*":
			ret = v1 * v2;
			break;
		case "/":
			ret = v1 / v2;
			break;
		case "%":
			ret = v1 % v2;
			break;
		case "&":
			ret = v1 & v2;
			break;
		case "|":
			ret = v1 | v2;
			break;
		case "^":
			ret = v1 ^ v2;
			break;
		case "<<":
			ret = v1 << v2;
			break;
		case ">>":
			ret = v1 >> v2;
			break;
		case ">>>":
			ret = v1 >>> v2;
			break;
		case "==":
			ret = v1 == v2;
			break;
		case "!=":
			ret = v1 != v2;
			break;
		case ">=":
			ret = v1 >= v2;
			break;
		case "<=":
			ret = v1 <= v2;
			break;
		case ">":
			ret = v1 > v2;
			break;
		case "<":
			ret = v1 < v2;
			break;
		case "||":
			ret = v1 || v2;
			break;
		case "&&":
			ret = v1 && v2;
			break;
		case "=":
			ret = v2;
			break;
		case "...":
			ret = new oge2d_script_IntRange(v1,v2);
			break;
		case "+=":
			ret = v1 + v2;
			break;
		case "-=":
			ret = v1 - v2;
			break;
		case "*=":
			ret = v1 * v2;
			break;
		case "/=":
			ret = v1 / v2;
			break;
		case "%=":
			ret = v1 % v2;
			break;
		case "&=":
			ret = v1 & v2;
			break;
		case "|=":
			ret = v1 | v2;
			break;
		case "^=":
			ret = v1 ^ v2;
			break;
		case "<<=":
			ret = v1 << v2;
			break;
		case ">>=":
			ret = v1 >> v2;
			break;
		case ">>>=":
			ret = v1 >>> v2;
			break;
		}
		return ret;
	}
	,evalUnop: function(op,v) {
		var ret = null;
		switch(op) {
		case "!":
			ret = v != true;
			break;
		case "-":
			ret = -v;
			break;
		case "++":
			ret = v + 1;
			break;
		case "--":
			ret = v - 1;
			break;
		case "~":
			ret = ~v;
			break;
		}
		return ret;
	}
	,execInstr: function(instr) {
		var _g = instr.opcode;
		switch(_g) {
		case 1:
			var val = null;
			var _g1 = instr.node.expr.maintype;
			switch(_g1) {
			case 4:
				var _g2 = instr.node.expr.subtype;
				switch(_g2) {
				case 1:
					val = instr.node.expr.intval;
					break;
				case 2:
					val = instr.node.expr.floatval;
					break;
				case 3:
					val = instr.node.expr.strval;
					break;
				default:
					throw new js__$Boot_HaxeError(this.genCodeError("Invalid const",instr.node.line));
				}
				break;
			default:
				throw new js__$Boot_HaxeError(this.genCodeError("Invalid token",instr.node.line));
			}
			this.stack.push(val);
			this.cursor++;
			break;
		case 5:
			var localmap = null;
			var block = this.newBlock(instr.opcode);
			var relatedInstr = null;
			if(instr.related > 0) relatedInstr = this.code[instr.related - 1];
			if(relatedInstr != null) {
				var relatedOp = relatedInstr.opcode;
				if(relatedOp == 23) {
					localmap = this.stack.pop();
					block.type = 3;
				} else if(relatedOp == 28) {
					block.type = 4;
					block.next = relatedInstr.target;
				} else if(relatedOp == 30) {
					localmap = this.stack.pop();
					block.type = 5;
				}
			}
			if(localmap == null) localmap = new haxe_ds_StringMap();
			this.localmaps.push(localmap);
			this.sizes.push(this.stack.length);
			this.blocks.push(block);
			this.cursor++;
			break;
		case 6:
			var ret = null;
			var oldsize = this.sizes.pop();
			if(this.stack.length > oldsize) ret = this.stack.pop();
			while(this.stack.length > oldsize) this.stack.pop();
			if(ret != null) this.stack.push(ret);
			this.containers.clear();
			this.arrays.clear();
			this.localmaps.pop();
			this.blocks.pop();
			this.cursor++;
			break;
		case 7:
			var _g11 = instr.node.expr.maintype;
			switch(_g11) {
			case 9:
				var f = instr.node.expr.strval;
				var obj = this.stack.pop();
				var val1 = null;
				var fieldok = obj != null;
				if(fieldok) val1 = Reflect.field(obj,f);
				if(val1 == null && fieldok) fieldok = Object.prototype.hasOwnProperty.call(obj,f) || (function($this) {
					var $r;
					var _this = Type.getInstanceFields(Type.getClass(obj));
					$r = HxOverrides.indexOf(_this,f,0);
					return $r;
				}(this)) >= 0;
				if(fieldok) {
					this.containers.push(obj);
					this.stack.push(val1);
				} else throw new js__$Boot_HaxeError(this.genCodeError("Invalid access field: " + f,instr.node.line));
				break;
			default:
				throw new js__$Boot_HaxeError(this.genCodeError("Invalid token",instr.node.line));
			}
			this.cursor++;
			break;
		case 2:
			var _g12 = instr.node.expr.maintype;
			switch(_g12) {
			case 5:
				var id = instr.node.expr.strval;
				var matchedMap = this.loadIdent(id);
				if(matchedMap == null) {
					matchedMap = this.localmaps.first();
					if(matchedMap == null) throw new js__$Boot_HaxeError(this.genCodeError("No local var map found",instr.node.line));
					var v = { };
					matchedMap.set(id,v);
					v;
				}
				if(matchedMap != null) {
					this.containers.push(matchedMap);
					this.stack.push(__map_reserved[id] != null?matchedMap.getReserved(id):matchedMap.h[id]);
				}
				break;
			case 15:
				var id1 = instr.node.expr.strval;
				var matchedMap1 = this.loadIdent(id1);
				if(matchedMap1 == null) {
					matchedMap1 = this.localmaps.first();
					if(matchedMap1 == null) throw new js__$Boot_HaxeError(this.genCodeError("No local var map found",instr.node.line));
					var v1 = { };
					matchedMap1.set(id1,v1);
					v1;
				}
				if(matchedMap1 != null) this.stack.push(__map_reserved[id1] != null?matchedMap1.getReserved(id1):matchedMap1.h[id1]);
				break;
			default:
				throw new js__$Boot_HaxeError(this.genCodeError("Invalid token",instr.node.line));
			}
			this.cursor++;
			break;
		case 3:
			var _g13 = instr.node.expr.maintype;
			switch(_g13) {
			case 6:
				var n = instr.node.expr.strval;
				var localmap1 = this.localmaps.first();
				if(localmap1 == null) throw new js__$Boot_HaxeError(this.genCodeError("No local var map found",instr.node.line)); else if(__map_reserved[n] != null?localmap1.existsReserved(n):localmap1.h.hasOwnProperty(n)) throw new js__$Boot_HaxeError(this.genCodeError("Duplicate variable: " + n,instr.node.line)); else {
					var v2 = { };
					localmap1.set(n,v2);
					v2;
				}
				break;
			default:
				throw new js__$Boot_HaxeError(this.genCodeError("Invalid token",instr.node.line));
			}
			this.cursor++;
			break;
		case 4:
			var _g14 = instr.node.expr.maintype;
			switch(_g14) {
			case 6:
				var n1 = instr.node.expr.strval;
				var localmap2 = this.localmaps.first();
				if(localmap2 == null) throw new js__$Boot_HaxeError(this.genCodeError("No local var map found",instr.node.line)); else if(!(__map_reserved[n1] != null?localmap2.existsReserved(n1):localmap2.h.hasOwnProperty(n1))) throw new js__$Boot_HaxeError(this.genCodeError("Invalid variable: " + n1,instr.node.line)); else {
					var v3 = this.stack.first();
					localmap2.set(n1,v3);
					v3;
				}
				break;
			case 10:
				var op = instr.node.expr.tmpval;
				var v11 = this.stack.pop();
				var v21 = this.stack.pop();
				v11 = this.evalBinop(op,v11,v21);
				this.stack.push(v11);
				var _g21 = instr.node.expr.subtype;
				switch(_g21) {
				case 5:
					var id2 = instr.node.expr.strval;
					var matchedMap2 = this.containers.pop();
					if(matchedMap2 == null) throw new js__$Boot_HaxeError(this.genCodeError("No matched identifier map found",instr.node.line));
					var v4 = v11;
					matchedMap2.set(id2,v4);
					v4;
					break;
				case 9:
					var f1 = instr.node.expr.strval;
					var obj1 = this.containers.pop();
					if(obj1 == null) throw new js__$Boot_HaxeError(this.genCodeError("No matched object found",instr.node.line));
					obj1[f1] = v11;
					break;
				case 20:
					var arr = this.containers.pop();
					var idx = this.containers.pop();
					arr[idx] = v11;
					break;
				default:
				}
				break;
			case 11:
				var op1 = instr.node.expr.tmpval;
				var prefix = instr.node.expr.boolval;
				var v12 = this.stack.pop();
				var old = v12;
				v12 = this.evalUnop(op1,v12);
				if(!prefix && (op1 == "++" || op1 == "--")) this.stack.push(old); else this.stack.push(v12);
				var _g22 = instr.node.expr.subtype;
				switch(_g22) {
				case 5:
					var id3 = instr.node.expr.strval;
					var matchedMap3 = this.containers.pop();
					if(matchedMap3 == null) throw new js__$Boot_HaxeError(this.genCodeError("No matched identifier map found",instr.node.line));
					var v5 = v12;
					matchedMap3.set(id3,v5);
					v5;
					break;
				case 9:
					var f2 = instr.node.expr.strval;
					var obj2 = this.containers.pop();
					if(obj2 == null) throw new js__$Boot_HaxeError(this.genCodeError("No matched object found",instr.node.line));
					obj2[f2] = v12;
					break;
				case 20:
					var arr1 = this.containers.pop();
					var idx1 = this.containers.pop();
					arr1[idx1] = v12;
					break;
				default:
				}
				break;
			default:
				throw new js__$Boot_HaxeError(this.genCodeError("Invalid token",instr.node.line));
			}
			this.cursor++;
			break;
		case 8:
			var _g15 = instr.node.expr.maintype;
			switch(_g15) {
			case 10:
				var op2 = instr.node.expr.strval;
				var v13 = this.stack.pop();
				var v22 = this.stack.pop();
				v13 = this.evalBinop(op2,v13,v22);
				this.stack.push(v13);
				break;
			default:
				throw new js__$Boot_HaxeError(this.genCodeError("Invalid token",instr.node.line));
			}
			this.cursor++;
			break;
		case 9:
			var _g16 = instr.node.expr.maintype;
			switch(_g16) {
			case 11:
				break;
			default:
				throw new js__$Boot_HaxeError(this.genCodeError("Invalid token",instr.node.line));
			}
			this.cursor++;
			break;
		case 10:
			var nextPos = 0;
			if(this.calls.length > 0) {
				nextPos = this.calls.first().end;
				while(this.blocks.length > 0) {
					var block1 = this.blocks.first();
					if(block1.type == 1) {
						this.blocks.pop();
						continue;
					} else if(block1.type == 2) {
						this.localmaps.pop();
						this.blocks.pop();
						continue;
					} else if(block1.type == 3) {
						nextPos = block1.end;
						break;
					} else {
						var ret1 = null;
						var oldsize1 = this.sizes.pop();
						if(this.stack.length > oldsize1) ret1 = this.stack.pop();
						while(this.stack.length > oldsize1) this.stack.pop();
						if(ret1 != null) this.stack.push(ret1);
						this.containers.clear();
						this.arrays.clear();
						this.localmaps.pop();
						this.blocks.pop();
						continue;
					}
				}
			}
			if(nextPos <= 0) {
				if(this.blocks.length == 1) nextPos = this.blocks.first().end;
			}
			if(nextPos > 0) this.cursor = nextPos; else throw new js__$Boot_HaxeError(this.genCodeError("Invalid token [return]",instr.node.line));
			break;
		case 11:
			var _g17 = instr.node.expr.maintype;
			switch(_g17) {
			case 13:case 26:
				if(this.stack.pop() == true) this.cursor++; else this.cursor = instr.target;
				break;
			case 14:
				if(this.stack.pop() == true) this.cursor++; else {
					this.blocks.pop();
					this.cursor = instr.target;
				}
				break;
			case 15:
				var id4 = instr.node.expr.strval;
				var relatedInstr1 = null;
				if(instr.related > 0) relatedInstr1 = this.code[instr.related - 1];
				if(relatedInstr1 == null) throw new js__$Boot_HaxeError(this.genCodeError("Invalid loop",instr.node.line));
				var _g23 = relatedInstr1.index;
				var v6 = this.looptimes.h[_g23] + 1;
				this.looptimes.h[_g23] = v6;
				v6;
				var matchedMap4 = this.loadIdent(id4);
				if(matchedMap4 == null) throw new js__$Boot_HaxeError(this.genCodeError("Loop variable needs to be initialized",instr.node.line)); else {
					var stay = true;
					var itValue = this.stack.pop();
					var currentValue = this.stack.pop();
					if(js_Boot.__instanceof(itValue,oge2d_script_IntRange)) {
						var range = itValue;
						var current = range.begin;
						if(((currentValue | 0) === currentValue)) {
							current = currentValue;
							current++;
						}
						stay = current < range.end;
						{
							if(__map_reserved[id4] != null) matchedMap4.setReserved(id4,current); else matchedMap4.h[id4] = current;
							current;
						}
					} else {
						try {
							itValue = $iterator(itValue)();
						} catch( ex ) {
							if (ex instanceof js__$Boot_HaxeError) ex = ex.val;
						}
						if(itValue.hasNext == null || itValue.next == null) throw new js__$Boot_HaxeError(this.genCodeError("Invalid iterator",instr.node.line));
						var current1 = 1;
						while(itValue.hasNext() && current1 < this.looptimes.h[relatedInstr1.index]) {
							itValue.next();
							current1++;
						}
						stay = itValue.hasNext();
						if(stay) {
							var v7 = itValue.next();
							matchedMap4.set(id4,v7);
							v7;
						}
					}
					if(stay) this.cursor++; else {
						this.localmaps.pop();
						this.blocks.pop();
						this.cursor = instr.target;
					}
				}
				break;
			case 27:
				var values = [];
				var _g3 = 0;
				var _g24 = instr.pcount;
				while(_g3 < _g24) {
					var pidx = _g3++;
					values.push(this.stack.pop());
				}
				var matched = false;
				var obj3 = this.stack.first();
				var _g25 = 0;
				while(_g25 < values.length) {
					var val2 = values[_g25];
					++_g25;
					if(obj3 == val2) {
						matched = true;
						break;
					}
				}
				if(matched) this.cursor++; else this.cursor = instr.target;
				break;
			default:
				throw new js__$Boot_HaxeError(this.genCodeError("Invalid token",instr.node.line));
			}
			break;
		case 12:
			this.cursor = instr.target;
			break;
		case 13:
			this.blocks.push(this.newBlock(instr.opcode));
			this.cursor++;
			break;
		case 14:
			this.cursor = instr.target;
			break;
		case 15:
			{
				this.looptimes.h[instr.index] = 0;
				0;
			}
			this.localmaps.push(new haxe_ds_StringMap());
			this.blocks.push(this.newBlock(instr.opcode));
			this.cursor++;
			break;
		case 16:
			this.cursor = instr.target;
			break;
		case 17:
			var hasLoop = false;
			var _g1_head = this.blocks.h;
			var _g1_val = null;
			while(_g1_head != null) {
				var b;
				b = (function($this) {
					var $r;
					_g1_val = _g1_head[0];
					_g1_head = _g1_head[1];
					$r = _g1_val;
					return $r;
				}(this));
				if(b.type == 2 || b.type == 1) {
					hasLoop = true;
					break;
				} else if(b.type == 3) {
					hasLoop = false;
					break;
				}
			}
			if(hasLoop) while(this.blocks.length > 0) {
				var block2 = this.blocks.first();
				if(block2.type == 1) {
					this.blocks.pop();
					this.cursor = block2.end + 1;
					break;
				} else if(block2.type == 2) {
					this.localmaps.pop();
					this.blocks.pop();
					this.cursor = block2.end + 1;
					break;
				} else if(block2.type == 3) throw new js__$Boot_HaxeError(this.genCodeError("[break] should be put in loop",instr.node.line)); else {
					var ret2 = null;
					var oldsize2 = this.sizes.pop();
					if(this.stack.length > oldsize2) ret2 = this.stack.pop();
					while(this.stack.length > oldsize2) this.stack.pop();
					if(ret2 != null) this.stack.push(ret2);
					this.containers.clear();
					this.arrays.clear();
					this.localmaps.pop();
					this.blocks.pop();
					continue;
				}
			} else throw new js__$Boot_HaxeError(this.genCodeError("[break] should be put in loop",instr.node.line));
			break;
		case 18:
			var hasLoop1 = false;
			var _g1_head1 = this.blocks.h;
			var _g1_val1 = null;
			while(_g1_head1 != null) {
				var b1;
				b1 = (function($this) {
					var $r;
					_g1_val1 = _g1_head1[0];
					_g1_head1 = _g1_head1[1];
					$r = _g1_val1;
					return $r;
				}(this));
				if(b1.type == 2 || b1.type == 1) {
					hasLoop1 = true;
					break;
				} else if(b1.type == 3) {
					hasLoop1 = false;
					break;
				}
			}
			if(hasLoop1) while(this.blocks.length > 0) {
				var block3 = this.blocks.first();
				if(block3.type == 1) {
					this.cursor = block3.begin + 1;
					break;
				} else if(block3.type == 2) {
					this.cursor = block3.begin + 1;
					break;
				} else if(block3.type == 3) throw new js__$Boot_HaxeError(this.genCodeError("[continue] should be put in loop",instr.node.line)); else {
					var ret3 = null;
					var oldsize3 = this.sizes.pop();
					if(this.stack.length > oldsize3) ret3 = this.stack.pop();
					while(this.stack.length > oldsize3) this.stack.pop();
					if(ret3 != null) this.stack.push(ret3);
					this.containers.clear();
					this.arrays.clear();
					this.localmaps.pop();
					this.blocks.pop();
					continue;
				}
			} else throw new js__$Boot_HaxeError(this.genCodeError("[continue] should be put in loop",instr.node.line));
			break;
		case 19:
			this.arrays.push([]);
			this.cursor++;
			break;
		case 20:
			this.arrays.first().push(this.stack.pop());
			this.cursor++;
			break;
		case 21:
			this.stack.push(this.arrays.pop());
			this.cursor++;
			break;
		case 22:
			var arr2 = this.stack.pop();
			var idx2 = this.stack.pop();
			this.containers.push(idx2);
			this.containers.push(arr2);
			this.stack.push(arr2[idx2]);
			this.cursor++;
			break;
		case 23:
			this.cursor++;
			break;
		case 24:
			if(this.calls.length > 0) {
				var call = this.calls.pop();
				this.cursor = call.from + 1;
			} else throw new js__$Boot_HaxeError(this.genCodeError("Invalid function ending",instr.node.line));
			break;
		case 25:
			var _g18 = instr.node.expr.maintype;
			switch(_g18) {
			case 12:
				var obj4 = this.stack.pop();
				var args = [];
				var _g31 = 0;
				var _g26 = instr.node.expr.intval;
				while(_g31 < _g26) {
					var p = _g31++;
					args.push(this.stack.pop());
				}
				args.reverse();
				var func = null;
				var call1 = null;
				var _g27 = instr.node.expr.subtype;
				switch(_g27) {
				case 5:
					var id5 = instr.node.expr.strval;
					if(this.funcs.exists(id5)) func = this.funcs.get(id5);
					if(func != null) call1 = this.newCall(func); else throw new js__$Boot_HaxeError(this.genCodeError("Invalid function call: " + id5,instr.node.line));
					break;
				case 9:
					var f3 = instr.node.expr.strval;
					obj4 = this.containers.pop();
					var ret4 = Reflect.callMethod(obj4,Reflect.field(obj4,f3),args);
					this.stack.push(ret4);
					break;
				default:
					throw new js__$Boot_HaxeError(this.genCodeError("Invalid function call",instr.node.line));
				}
				if(func == null || call1 == null) this.cursor++; else {
					var localmap3 = new haxe_ds_StringMap();
					var _g32 = 0;
					var _g28 = instr.node.expr.intval;
					while(_g32 < _g28) {
						var pidx1 = _g32++;
						var value = args[pidx1];
						localmap3.set(func.args[pidx1],value);
					}
					this.stack.push(localmap3);
					this.calls.push(call1);
					this.cursor = call1.entry;
				}
				break;
			default:
				throw new js__$Boot_HaxeError(this.genCodeError("Invalid token",instr.node.line));
			}
			break;
		case 26:
			var _g19 = instr.node.expr.maintype;
			switch(_g19) {
			case 22:
				var cl = instr.node.expr.strval;
				var args1 = [];
				var _g33 = 0;
				var _g29 = instr.node.expr.intval;
				while(_g33 < _g29) {
					var p1 = _g33++;
					args1.push(this.stack.pop());
				}
				args1.reverse();
				var c = Type.resolveClass(cl);
				if(c == null) {
					var matchedMap5 = this.loadIdent(cl);
					if(matchedMap5 != null) c = __map_reserved[cl] != null?matchedMap5.getReserved(cl):matchedMap5.h[cl];
				}
				if(c == null) throw new js__$Boot_HaxeError(this.genCodeError("Unknown type: " + cl,instr.node.line)); else this.stack.push(Type.createInstance(c,args1));
				break;
			default:
				throw new js__$Boot_HaxeError(this.genCodeError("Invalid token",instr.node.line));
			}
			this.cursor++;
			break;
		case 27:
			throw new js__$Boot_HaxeError(this.stack.pop());
			break;
		case 28:
			this.cursor++;
			break;
		case 29:
			this.cursor = instr.target;
			break;
		case 30:
			var _g110 = instr.node.expr.maintype;
			switch(_g110) {
			case 24:
				var n2 = instr.node.expr.strval;
				var localmap4 = new haxe_ds_StringMap();
				var value1 = this.stack.pop();
				localmap4.set(n2,value1);
				this.stack.push(localmap4);
				break;
			default:
				throw new js__$Boot_HaxeError(this.genCodeError("Invalid token",instr.node.line));
			}
			this.cursor++;
			break;
		case 31:
			this.cursor++;
			break;
		case 32:
			var _g111 = instr.node.expr.maintype;
			switch(_g111) {
			case 25:
				var names = instr.node.expr.arrval;
				var values1 = [];
				var _g210 = 0;
				while(_g210 < names.length) {
					var n3 = names[_g210];
					++_g210;
					values1.push(this.stack.pop());
				}
				values1.reverse();
				var obj5 = { };
				var _g34 = 0;
				var _g211 = names.length;
				while(_g34 < _g211) {
					var idx3 = _g34++;
					obj5[names[idx3]] = values1[idx3];
				}
				this.stack.push(obj5);
				break;
			default:
				throw new js__$Boot_HaxeError(this.genCodeError("Invalid token",instr.node.line));
			}
			this.cursor++;
			break;
		default:
			haxe_Log.trace("Unhandled: " + instr.opcode,{ fileName : "BytecodeInterp.hx", lineNumber : 1288, className : "oge2d.script.BytecodeInterp", methodName : "execInstr"});
		}
	}
	,tryToExec: function(justOneInstr) {
		if(justOneInstr == null) justOneInstr = false;
		if(this.state == 1 || this.state == 3) this.state = 4;
		if(this.state != 4) return;
		try {
			var lastLine = 0;
			var currentLine = 0;
			if(this.cursor <= this.code.length) lastLine = this.code[this.cursor - 1].node.line;
			if(justOneInstr) {
				if(this.cursor <= this.code.length) {
					this.execInstr(this.code[this.cursor - 1]);
					if(this.cursor <= this.code.length) {
						currentLine = this.code[this.cursor - 1].node.line;
						if(this.onLine != null && currentLine != lastLine) this.onLine(currentLine);
					}
					lastLine = currentLine;
				}
			} else while(this.cursor <= this.code.length) {
				this.execInstr(this.code[this.cursor - 1]);
				if(this.cursor <= this.code.length) {
					currentLine = this.code[this.cursor - 1].node.line;
					if(this.onLine != null && currentLine != lastLine) this.onLine(currentLine);
				}
				lastLine = currentLine;
				if(this.state != 4) break;
			}
		} catch( err ) {
			if (err instanceof js__$Boot_HaxeError) err = err.val;
			haxe_Log.trace("Exception found: " + Std.string(err) + " (line: " + this.code[this.cursor - 1].node.line + ")",{ fileName : "BytecodeInterp.hx", lineNumber : 1343, className : "oge2d.script.BytecodeInterp", methodName : "tryToExec"});
			var block = null;
			var _g_head = this.blocks.h;
			var _g_val = null;
			while(_g_head != null) {
				var b;
				b = (function($this) {
					var $r;
					_g_val = _g_head[0];
					_g_head = _g_head[1];
					$r = _g_val;
					return $r;
				}(this));
				if(b.type == 4) {
					block = b;
					break;
				}
			}
			if(block != null && block.next > 0) {
				while(this.blocks.length > 0) {
					var block1 = this.blocks.first();
					if(block1.type == 1) {
						this.blocks.pop();
						continue;
					} else if(block1.type == 2) {
						this.localmaps.pop();
						this.blocks.pop();
						continue;
					} else if(block1.type == 3) {
						this.localmaps.pop();
						this.blocks.pop();
						this.calls.pop();
						continue;
					} else {
						var ret = null;
						var oldsize = this.sizes.pop();
						if(this.stack.length > oldsize) ret = this.stack.pop();
						while(this.stack.length > oldsize) this.stack.pop();
						if(ret != null) this.stack.push(ret);
						this.containers.clear();
						this.arrays.clear();
						this.localmaps.pop();
						this.blocks.pop();
						if(block1.type == 4) break; else continue;
					}
				}
				this.stack.push(err);
				this.cursor = block.next;
				this.tryToExec(justOneInstr);
			} else {
				this.state = 5;
				throw new js__$Boot_HaxeError(err);
			}
		}
	}
	,hasFunc: function(fn) {
		return this.funcs.exists(fn);
	}
	,getContext: function() {
		var ctx = { stack : this.stack.filter(function(x) {
			return true;
		}), sizes : this.sizes.filter(function(x1) {
			return true;
		}), containers : this.containers.filter(function(x2) {
			return true;
		}), arrays : this.arrays.filter(function(x3) {
			return true;
		}), calls : this.calls.filter(function(x4) {
			return true;
		}), blocks : this.blocks.filter(function(x5) {
			return true;
		}), localmaps : this.localmaps.filter(function(x6) {
			return true;
		}), cursor : this.cursor, state : this.state};
		return ctx;
	}
	,setContext: function(ctx) {
		if(this.state < 1) return false;
		this.stack = ctx.stack;
		this.sizes = ctx.sizes;
		this.containers = ctx.containers;
		this.arrays = ctx.arrays;
		this.calls = ctx.calls;
		this.blocks = ctx.blocks;
		this.localmaps = ctx.localmaps;
		this.cursor = ctx.cursor;
		this.state = ctx.state;
		return true;
	}
	,prepareFunc: function(fn,args) {
		if(this.state < 1 || this.state > 4) return this.state;
		if(this.code.length <= 0) return 0;
		if(!this.funcs.exists(fn)) return 0;
		var func = this.funcs.get(fn);
		if(func != null) {
			var call = this.newCall(func);
			var localmap = new haxe_ds_StringMap();
			if(args != null && args.length > 0) {
				var _g1 = 0;
				var _g = args.length;
				while(_g1 < _g) {
					var pidx = _g1++;
					var value = args[pidx];
					localmap.set(func.args[pidx],value);
				}
			}
			this.stack.push(localmap);
			this.calls.push(call);
			this.cursor = call.entry;
			call.from = this.code.length + 1;
			return this.state;
		}
		return 0;
	}
	,getExecState: function() {
		if(this.state == 4 && this.cursor > this.code.length && this.calls.length <= 0) this.state = 6;
		return this.state;
	}
	,callFunc: function(fn,args,stepByStep) {
		if(stepByStep == null) stepByStep = false;
		var currentState = this.prepareFunc(fn,args);
		if(currentState < 1 || currentState > 4) return currentState;
		this.tryToExec(stepByStep);
		return this.getExecState();
	}
	,compile: function(sourceCode) {
		var ok = false;
		var ast = this.parser.parseString(sourceCode);
		if(ast != null) {
			this.clear();
			this.markNewLinePos(sourceCode);
			this.genCode(ast);
			this.state = 1;
			ok = true;
		}
		return ok;
	}
	,reset: function() {
		if(this.state >= 1) {
			this.stack.clear();
			this.sizes.clear();
			this.containers.clear();
			this.arrays.clear();
			this.calls.clear();
			this.blocks.clear();
			this.localmaps.clear();
			this.cursor = 0;
			this.state = 1;
		}
		return this.state;
	}
	,suspend: function() {
		if(this.state == 4 || this.state == 3) this.state = 2;
		return this.state;
	}
	,resume: function(rightNow) {
		if(rightNow == null) rightNow = false;
		if(this.state == 2) if(rightNow) this.state = 4; else this.state = 3; else if(this.state == 3 && rightNow) this.state = 4;
		if(this.state == 4 && rightNow) {
			this.tryToExec();
			return this.getExecState();
		}
		return this.state;
	}
	,prepare: function() {
		if(this.state < 1 || this.state > 4) return this.state;
		if(this.code.length <= 0) return 0;
		if(this.cursor <= 0) this.cursor = 1;
		return this.state;
	}
	,run: function() {
		var currentState = this.prepare();
		if(currentState < 1 || currentState > 4) return currentState;
		this.tryToExec();
		return this.getExecState();
	}
	,proceed: function() {
		if(this.state == 1 || this.state == 3 || this.getExecState() == 4) {
			if(this.cursor <= 0) this.prepare();
			this.tryToExec(true);
			return this.getExecState();
		}
		return this.state;
	}
	,continues: function() {
		if(this.state == 1 || this.state == 3 || this.getExecState() == 4) {
			this.tryToExec();
			return this.getExecState();
		}
		return this.state;
	}
	,save: function() {
		var output = new haxe_ds_StringMap();
		if(output != null) {
			var serializer = new haxe_Serializer();
			serializer.serialize(this.code);
			var value = serializer.toString();
			if(__map_reserved.code != null) output.setReserved("code",value); else output.h["code"] = value;
		}
		if(output != null) {
			var serializer1 = new haxe_Serializer();
			serializer1.serialize(this.funcs);
			var value1 = serializer1.toString();
			if(__map_reserved["function"] != null) output.setReserved("function",value1); else output.h["function"] = value1;
		}
		if(output != null) {
			var serializer2 = new haxe_Serializer();
			serializer2.serialize(this.endmap);
			var value2 = serializer2.toString();
			if(__map_reserved.block != null) output.setReserved("block",value2); else output.h["block"] = value2;
		}
		if(output != null) {
			var serializer3 = new haxe_Serializer();
			serializer3.serialize(this.looptimes);
			var value3 = serializer3.toString();
			if(__map_reserved.loop != null) output.setReserved("loop",value3); else output.h["loop"] = value3;
		}
		if(output != null) {
			var serializer4 = new haxe_Serializer();
			serializer4.serialize(this.newlinepos);
			var value4 = serializer4.toString();
			if(__map_reserved.line != null) output.setReserved("line",value4); else output.h["line"] = value4;
		}
		if(output != null) {
			var serializer5 = new haxe_Serializer();
			serializer5.serialize(output);
			return serializer5.toString();
		}
		return "";
	}
	,load: function(src) {
		var ok = false;
		var input = new haxe_ds_StringMap();
		if(src != null && src.length > 0) {
			this.clear();
			if(src.length > 0) {
				var unserializer = new haxe_Unserializer(src);
				input = unserializer.unserialize();
				ok = true;
			}
			ok = ok && (__map_reserved.code != null?input.existsReserved("code"):input.h.hasOwnProperty("code"));
			if(ok) {
				var unserializer1 = new haxe_Unserializer(__map_reserved.code != null?input.getReserved("code"):input.h["code"]);
				this.code = unserializer1.unserialize();
			}
			ok = ok && (__map_reserved["function"] != null?input.existsReserved("function"):input.h.hasOwnProperty("function"));
			if(ok) {
				var unserializer2 = new haxe_Unserializer(__map_reserved["function"] != null?input.getReserved("function"):input.h["function"]);
				this.funcs = unserializer2.unserialize();
			}
			ok = ok && (__map_reserved.block != null?input.existsReserved("block"):input.h.hasOwnProperty("block"));
			if(ok) {
				var unserializer3 = new haxe_Unserializer(__map_reserved.block != null?input.getReserved("block"):input.h["block"]);
				this.endmap = unserializer3.unserialize();
			}
			ok = ok && (__map_reserved.loop != null?input.existsReserved("loop"):input.h.hasOwnProperty("loop"));
			if(ok) {
				var unserializer4 = new haxe_Unserializer(__map_reserved.loop != null?input.getReserved("loop"):input.h["loop"]);
				this.looptimes = unserializer4.unserialize();
			}
			ok = ok && (__map_reserved.line != null?input.existsReserved("line"):input.h.hasOwnProperty("line"));
			if(ok) {
				var unserializer5 = new haxe_Unserializer(__map_reserved.line != null?input.getReserved("line"):input.h["line"]);
				this.newlinepos = unserializer5.unserialize();
			}
			if(ok) this.state = 1;
		}
		return ok;
	}
	,__class__: oge2d_script_BytecodeInterp
};
var oge2d_script_Script = function(libMap,scriptOwner,needFallback,frontScript) {
	if(needFallback == null) needFallback = false;
	this.methods = null;
	this.format = "";
	this.basis = null;
	this._ready = false;
	this._owner = null;
	this._front = null;
	this._libs = null;
	this._contexts = null;
	this._executor = null;
	this._libs = libMap;
	this._owner = scriptOwner;
	this._front = frontScript;
	if(needFallback) this.basis = new oge2d_script_Script(libMap,scriptOwner,false,this); else this.basis = null;
};
$hxClasses["oge2d.script.Script"] = oge2d_script_Script;
oge2d_script_Script.__name__ = ["oge2d","script","Script"];
oge2d_script_Script.getScriptMethods = function(config) {
	if(config == null) return null;
	var result = null;
	var eventNames = Reflect.fields(config);
	var _g = 0;
	while(_g < eventNames.length) {
		var eventName = eventNames[_g];
		++_g;
		var methodName = Reflect.field(config,eventName);
		if(methodName.indexOf(".") < 0) {
			if(result == null) result = new haxe_ds_StringMap();
			if(result != null) {
				if(__map_reserved[eventName] != null) result.setReserved(eventName,methodName); else result.h[eventName] = methodName;
			}
		}
	}
	return result;
};
oge2d_script_Script.getLibraryMethods = function(config) {
	if(config == null) return null;
	var result = null;
	var eventNames = Reflect.fields(config);
	var _g = 0;
	while(_g < eventNames.length) {
		var eventName = eventNames[_g];
		++_g;
		var methodName = Reflect.field(config,eventName);
		if(methodName.indexOf(".") > 0) {
			if(result == null) result = new haxe_ds_StringMap();
			if(result != null) {
				if(__map_reserved[eventName] != null) result.setReserved(eventName,methodName); else result.h[eventName] = methodName;
			}
		}
	}
	return result;
};
oge2d_script_Script.load = function(config,script,content,readable,varNames,varValues) {
	if(script == null) return;
	if(config != null) {
		var eventNames = Reflect.fields(config);
		if(script._front == null) {
			var _g = 0;
			while(_g < eventNames.length) {
				var eventName = eventNames[_g];
				++_g;
				script.addMethod(eventName,Reflect.field(config,eventName));
			}
		} else {
			var _g1 = 0;
			while(_g1 < eventNames.length) {
				var eventName1 = eventNames[_g1];
				++_g1;
				var methodName = Reflect.field(config,eventName1);
				if(methodName.indexOf(".") < 0) script.addMethod(eventName1,methodName);
			}
		}
	}
	if(content != null && content.length > 0) {
		var loaded;
		if(readable) loaded = script.loadSourceCode(content); else loaded = script.loadByteCode(content);
		if(loaded && varNames != null && varValues != null) script.setVariables(varNames,varValues);
	}
};
oge2d_script_Script.prototype = {
	_executor: null
	,_contexts: null
	,_libs: null
	,_front: null
	,_owner: null
	,_ready: null
	,basis: null
	,format: null
	,methods: null
	,isReady: function() {
		if(this._ready || this.methods != null) return true; else if(this.basis != null) return this.basis.isReady();
		return false;
	}
	,addMethod: function(eventName,methodName) {
		if(this.methods == null) this.methods = new haxe_ds_StringMap();
		if(this.methods != null) this.methods.set(eventName,methodName);
	}
	,mergeMethods: function(methodMap) {
		if(methodMap == null) return;
		if(this.methods == null) this.methods = new haxe_ds_StringMap();
		if(this.methods != null) {
			var $it0 = methodMap.keys();
			while( $it0.hasNext() ) {
				var eventName = $it0.next();
				if(!this.methods.exists(eventName)) {
					var value;
					value = __map_reserved[eventName] != null?methodMap.getReserved(eventName):methodMap.h[eventName];
					this.methods.set(eventName,value);
				}
			}
		}
	}
	,loadSourceCode: function(code) {
		if(this._executor == null) this._executor = new oge2d_script_BytecodeInterp();
		if(this._contexts == null) this._contexts = new haxe_ds_StringMap();
		if(this._executor.compile(code)) this._ready = this._executor.getState() == 1;
		return this._ready;
	}
	,loadByteCode: function(code) {
		if(this._executor == null) this._executor = new oge2d_script_BytecodeInterp();
		if(this._contexts == null) this._contexts = new haxe_ds_StringMap();
		if(this._executor.load(code)) this._ready = this._executor.getState() == 1;
		return this._ready;
	}
	,setVariables: function(names,values) {
		if(!this._ready) return false;
		if(names == null || values == null) return false;
		if(names.length != values.length) return false;
		var _g1 = 0;
		var _g = names.length;
		while(_g1 < _g) {
			var i = _g1++;
			var this1 = this._executor.get_vars();
			var value = values[i];
			this1.set(names[i],value);
		}
		return true;
	}
	,setLineCallback: function(callback) {
		if(!this._ready) return;
		this._executor.onLine = callback;
	}
	,call: function(eventName,eventParams) {
		var fn = null;
		if(this.methods != null) fn = this.methods.get(eventName);
		if(fn == null) {
			if(this.basis != null) this.basis.call(eventName,eventParams);
			return;
		} else {
			var pos = fn.indexOf(".");
			if(pos > 0) {
				var fname = HxOverrides.substr(fn,pos + 1,null);
				if(fname != null && fname.length > 0) {
					var obj;
					var key = fn.substring(0,pos);
					obj = this._libs.get(key);
					if(obj != null) {
						var methodParams = [this._owner];
						if(eventParams != null && eventParams.length > 0) {
							var _g = 0;
							while(_g < eventParams.length) {
								var eventParam = eventParams[_g];
								++_g;
								methodParams.push(eventParam);
							}
						}
						Reflect.callMethod(obj,Reflect.field(obj,fname),methodParams);
					}
				}
				return;
			}
		}
		if(!this._ready) return;
		var currentState = this._executor.getState();
		if(currentState < 1) return;
		if(currentState == 4) return;
		var needToCall = false;
		var ctx = this._contexts.get(fn);
		if(ctx != null) {
			if(ctx.state == 2) return;
			if(ctx.state == 3) {
				this._executor.setContext(ctx);
				this._executor.continues();
			} else needToCall = true;
		} else needToCall = true;
		if(needToCall) {
			var inputParams = [this._owner];
			if(eventParams != null && eventParams.length > 0) {
				var _g1 = 0;
				while(_g1 < eventParams.length) {
					var eventParam1 = eventParams[_g1];
					++_g1;
					inputParams.push(eventParam1);
				}
			}
			this._executor.reset();
			try {
				this._executor.callFunc(fn,inputParams);
			} catch( err ) {
				if (err instanceof js__$Boot_HaxeError) err = err.val;
				var errmsg;
				if(this._owner == null) errmsg = ""; else errmsg = "Script error from " + "[" + Type.getClassName(Type.getClass(this._owner)) + "]" + Std.string(Reflect.field(this._owner,"name"));
				if(errmsg.length <= 0) errmsg = fn + " - " + Std.string(err); else errmsg = errmsg + "." + fn + " - " + Std.string(err);
				throw new js__$Boot_HaxeError(errmsg);
			}
		}
		if(this._executor.getState() == 2) {
			var value = this._executor.getContext();
			this._contexts.set(fn,value);
		} else if(ctx != null) this._contexts.remove(fn);
	}
	,suspend: function(eventName) {
		if(eventName != null) {
			if(this.methods == null || this.methods.get(eventName) == null) return;
		}
		if(this._front != null) return;
		if(!this._ready) return;
		this._executor.suspend();
	}
	,resume: function(eventName) {
		var fn = null;
		if(this.methods != null) fn = this.methods.get(eventName);
		if(fn == null) return;
		if(this._front != null) return;
		if(!this._ready) return;
		var ctx = this._contexts.get(fn);
		if(ctx != null && ctx.state == 2) ctx.state = 3;
	}
	,reset: function() {
		if(!this._ready) return;
		this._executor.reset();
		this._contexts = new haxe_ds_StringMap();
	}
	,__class__: oge2d_script_Script
};
var oge2d_system_Updater = function() { };
$hxClasses["oge2d.system.Updater"] = oge2d_system_Updater;
oge2d_system_Updater.__name__ = ["oge2d","system","Updater"];
oge2d_system_Updater.prototype = {
	bind: null
	,include: null
	,exclude: null
	,begin: null
	,update: null
	,end: null
	,batched: null
	,__class__: oge2d_system_Updater
};
var oge2d_system_Animation = function() {
};
$hxClasses["oge2d.system.Animation"] = oge2d_system_Animation;
oge2d_system_Animation.__name__ = ["oge2d","system","Animation"];
oge2d_system_Animation.__interfaces__ = [oge2d_system_Updater];
oge2d_system_Animation.reset = function(sprite,action) {
	var animation = sprite.components.get("animation");
	if(animation != null) {
		if(action != null) animation.action = action;
		animation.current = 0;
		animation.ticks = -1;
		animation.callback = null;
	}
};
oge2d_system_Animation.play = function(sprite,loop,callback) {
	var animation = sprite.components.get("animation");
	if(animation != null) {
		if(loop != null) animation.looping = loop;
		animation.callback = callback;
		animation.playing = true;
	}
};
oge2d_system_Animation.stop = function(sprite) {
	var animation = sprite.components.get("animation");
	if(animation != null) animation.playing = false;
};
oge2d_system_Animation.prototype = {
	batched: function() {
		return false;
	}
	,bind: function(game,scene) {
		if(scene != null) {
			var sprs = scene.filter(function(spr) {
				return spr.enabled;
			});
			var _g = 0;
			while(_g < sprs.length) {
				var spr1 = sprs[_g];
				++_g;
				this.include(spr1);
			}
		}
	}
	,include: function(sprite) {
		oge2d_system_Animation.reset(sprite);
	}
	,exclude: function(sprite) {
	}
	,begin: function(scene) {
	}
	,update: function(sprite) {
		if(sprite.scene.isPaused()) return;
		var animation = sprite.components.get("animation");
		if(animation == null) return;
		if(animation.playing == false) return;
		if(animation.ticks >= 0 && animation.interval > animation.ticks + sprite.game.interval) {
			animation.ticks += sprite.game.interval;
			return;
		}
		var display = sprite.components.get("display");
		if(display == null) return;
		var rects = Reflect.field(animation.frames,animation.action);
		if(rects == null || rects.length < 4) return;
		var total = rects.length / 4;
		var next = animation.current + 1;
		var finished = false;
		if(next >= total) {
			finished = true;
			if(animation.looping) next = 0; else next = animation.current;
		}
		var idx = 4 * next | 0;
		display.offsetX = rects[idx];
		display.offsetY = rects[idx + 1];
		display.width = rects[idx + 2];
		display.height = rects[idx + 3];
		animation.current = next;
		animation.ticks = 0;
		if(finished && animation.looping == false) {
			animation.playing = false;
			if(animation.callback != null) {
				var callback = animation.callback;
				animation.callback = null;
				callback(sprite);
			} else oge2d_system_Event.addSpriteEvent(sprite,"onAnimationDone");
		}
	}
	,end: function(scene) {
	}
	,__class__: oge2d_system_Animation
};
var oge2d_system_Collision = function() {
};
$hxClasses["oge2d.system.Collision"] = oge2d_system_Collision;
oge2d_system_Collision.__name__ = ["oge2d","system","Collision"];
oge2d_system_Collision.__interfaces__ = [oge2d_system_Updater];
oge2d_system_Collision.setEnabled = function(sprite,value) {
	if(sprite == null) return;
	var setting = sprite.components.get("collision");
	if(setting == null) return;
	setting.enabled = value;
};
oge2d_system_Collision.prototype = {
	batched: function() {
		return true;
	}
	,bind: function(game,scene) {
	}
	,include: function(sprite) {
	}
	,exclude: function(sprite) {
	}
	,begin: function(scene) {
	}
	,update: function(sprite) {
	}
	,end: function(scene) {
		if(scene.isPaused()) return;
		var sprs = scene.filter(function(spr) {
			var collidable = false;
			if(spr.enabled && spr.components.get("bound") != null) {
				var setting = spr.components.get("collision");
				collidable = setting != null && setting.enabled == true;
			}
			if(collidable) oge2d_system_Display.getBound(spr);
			return collidable;
		});
		var _g1 = 0;
		var _g = sprs.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!sprs[i].enabled) continue;
			var boundA = sprs[i].components.get("bound");
			var _g3 = i + 1;
			var _g2 = sprs.length;
			while(_g3 < _g2) {
				var j = _g3++;
				if(!sprs[j].enabled) continue;
				var boundB = sprs[j].components.get("bound");
				if(oge2d_system_Display.isPointInsideBound(boundA,boundB.left,boundB.top) || oge2d_system_Display.isPointInsideBound(boundA,boundB.right,boundB.top) || oge2d_system_Display.isPointInsideBound(boundA,boundB.left,boundB.bottom) || oge2d_system_Display.isPointInsideBound(boundA,boundB.right,boundB.bottom) || oge2d_system_Display.isPointInsideBound(boundB,boundA.left,boundA.top) || oge2d_system_Display.isPointInsideBound(boundB,boundA.right,boundA.top) || oge2d_system_Display.isPointInsideBound(boundB,boundA.left,boundA.bottom) || oge2d_system_Display.isPointInsideBound(boundB,boundA.right,boundA.bottom)) {
					oge2d_system_Event.addSpriteEvent(sprs[i],"onCollide",sprs[j]);
					oge2d_system_Event.addSpriteEvent(sprs[j],"onCollide",sprs[i]);
				}
			}
		}
	}
	,__class__: oge2d_system_Collision
};
var oge2d_system_Color = function() {
};
$hxClasses["oge2d.system.Color"] = oge2d_system_Color;
oge2d_system_Color.__name__ = ["oge2d","system","Color"];
oge2d_system_Color.__interfaces__ = [oge2d_system_Updater];
oge2d_system_Color.createColorData = function() {
	var color = { state : 0, steps : 0, times : 0, current : 0, startR : 0, startG : 0, startB : 0, startA : 0, deltaR : 0, deltaG : 0, deltaB : 0, deltaA : 0, callback : null};
	return color;
};
oge2d_system_Color.colorTo = function(sprite,changes,steps,callback) {
	if(steps <= 0 || changes == null || changes.length <= 0) return;
	var color = sprite.components.get("color");
	if(color == null) {
		color = oge2d_system_Color.createColorData();
		var value = color;
		sprite.components.set("color",value);
	}
	if(changes.length >= 1) color.startA = changes[0]; else color.startA = 1;
	if(changes.length >= 2) color.startR = changes[1]; else color.startR = 1;
	if(changes.length >= 3) color.startG = changes[2]; else color.startG = 1;
	if(changes.length >= 4) color.startB = changes[3]; else color.startB = 1;
	if(changes.length >= 5) color.deltaA = changes[4]; else color.deltaA = 0;
	if(changes.length >= 6) color.deltaR = changes[5]; else color.deltaR = 0;
	if(changes.length >= 7) color.deltaG = changes[6]; else color.deltaG = 0;
	if(changes.length >= 8) color.deltaB = changes[7]; else color.deltaB = 0;
	color.steps = steps;
	color.callback = callback;
	color.state = 1;
};
oge2d_system_Color.spriteFadeIn = function(sprite,steps,callback) {
	oge2d_system_Color.colorTo(sprite,[0,1,1,1,1.0 / steps],steps,callback);
};
oge2d_system_Color.spriteFadeOut = function(sprite,steps,callback) {
	oge2d_system_Color.colorTo(sprite,[1,1,1,1,0 - 1.0 / steps],steps,callback);
};
oge2d_system_Color.twinkle = function(sprite,interval,times,gradual,callback) {
	if(gradual == null) gradual = false;
	if(times == null) times = -1;
	if(times == 0) {
		if(callback != null) callback(sprite);
		return;
	}
	var color = sprite.components.get("color");
	if(color == null) {
		color = oge2d_system_Color.createColorData();
		var value = color;
		sprite.components.set("color",value);
	}
	color.times = times;
	color.gradual = gradual;
	oge2d_system_Color.colorTo(sprite,gradual?[1,1,1,1,0 - 1.0 / interval]:[1],interval,function(spr1) {
		oge2d_system_Color.colorTo(spr1,gradual?[0,1,1,1,1.0 / interval]:[0],interval,function(spr2) {
			var color2 = spr2.components.get("color");
			if(color2.times != 0) {
				if(color2.times > 0) color2.times = color2.times - 1;
				oge2d_system_Color.twinkle(spr2,interval,color2.times,color2.gradual,callback);
			}
		});
	});
};
oge2d_system_Color.isTwinkling = function(sprite) {
	var color = sprite.components.get("color");
	if(color == null) return false;
	return color.times != 0;
};
oge2d_system_Color.stopTwinkling = function(sprite) {
	var color = sprite.components.get("color");
	if(color == null) return;
	if(color.times != 0) {
		color.times = 0;
		color.steps = 0;
		color.state = 0;
	}
};
oge2d_system_Color.fadeIn = function(scene,steps,callback) {
	if(steps <= 0) return;
	var color = scene.components.get("color");
	if(color == null) {
		color = oge2d_system_Color.createColorData();
		var value = color;
		scene.components.set("color",value);
	}
	color.startA = 1;
	color.startR = 0;
	color.startG = 0;
	color.startB = 0;
	color.deltaA = 0 - 1.0 / steps;
	color.deltaR = 0;
	color.deltaG = 0;
	color.deltaB = 0;
	color.steps = steps;
	color.callback = callback;
	color.state = 1;
};
oge2d_system_Color.fadeOut = function(scene,steps,callback) {
	if(steps <= 0) return;
	var color = scene.components.get("color");
	if(color == null) {
		color = oge2d_system_Color.createColorData();
		var value = color;
		scene.components.set("color",value);
	}
	color.startA = 0;
	color.startR = 0;
	color.startG = 0;
	color.startB = 0;
	color.deltaA = 1.0 / steps;
	color.deltaR = 0;
	color.deltaG = 0;
	color.deltaB = 0;
	color.steps = steps;
	color.callback = callback;
	color.state = 1;
};
oge2d_system_Color.prototype = {
	batched: function() {
		return false;
	}
	,bind: function(game,scene) {
		if(scene == null) {
			var color = game.scene.components.get("color");
			if(color != null) {
				color.state = 0;
				color.steps = 0;
				color.times = 0;
			}
		}
	}
	,include: function(sprite) {
	}
	,exclude: function(sprite) {
	}
	,begin: function(scene) {
	}
	,update: function(sprite) {
		if(sprite.scene.isPaused()) return;
		var color = sprite.components.get("color");
		if(color == null) return;
		if(color.state == 0) return;
		if(color.state == 1 && color.steps > 0) {
			var display = sprite.components.get("display");
			if(display == null) return;
			color.state = 2;
			if(color.state == 2) color.current = 0;
		}
		if(color.state == 2 && color.steps > 0) {
			if(color.current < color.steps) {
				var display1 = sprite.components.get("display");
				if(display1 == null) return;
				display1.red = color.startR + color.deltaR * color.current;
				display1.green = color.startG + color.deltaG * color.current;
				display1.blue = color.startB + color.deltaB * color.current;
				display1.alpha = color.startA + color.deltaA * color.current;
				color.current += 1;
			} else {
				var display2 = sprite.components.get("display");
				if(display2 != null) {
					display2.red = 1;
					display2.green = 1;
					display2.blue = 1;
					display2.alpha = 1;
				}
				color.state = 3;
			}
		}
		if(color.state == 3) {
			color.state = 0;
			var callback = color.callback;
			var needCallback = callback != null;
			if(needCallback) callback(sprite); else oge2d_system_Event.addSpriteEvent(sprite,"onColorDone");
			if(color.state == 0) color.callback = null;
		}
	}
	,end: function(scene) {
		var color = scene.components.get("color");
		if(color == null) return;
		if(color.state == 0) return;
		if(color.state == 1 && color.steps > 0) {
			color.state = 2;
			if(color.state == 2) color.current = 0;
		}
		if(color.state == 2 && color.steps > 0) {
			if(color.current < color.steps) {
				var red = color.startR + color.deltaR * color.current;
				var green = color.startG + color.deltaG * color.current;
				var blue = color.startB + color.deltaB * color.current;
				var alpha = color.startA + color.deltaA * color.current;
				color.current += 1;
				oge2d_system_Display.drawRect(scene.game.width,scene.game.height,0,0,8000,red,green,blue,alpha);
			} else color.state = 3;
		}
		if(color.state == 3) {
			if(color.deltaA <= 0) {
				color.state = 0;
				if(color.steps > 0) {
					color.steps = 0;
					scene.script.call("onOpen");
					var sprs = scene.filter(function(spr) {
						return spr.enabled;
					});
					var _g = 0;
					while(_g < sprs.length) {
						var spr1 = sprs[_g];
						++_g;
						spr1.script.call("onSceneOpen");
					}
				}
			} else {
				if(color.steps > 0) {
					color.steps = 0;
					var sprs1 = scene.filter(function(spr2) {
						return spr2.enabled;
					});
					var _g1 = 0;
					while(_g1 < sprs1.length) {
						var spr3 = sprs1[_g1];
						++_g1;
						spr3.script.call("onSceneClose");
					}
					scene.script.call("onClose");
				}
				var red1 = color.startR + color.deltaR * color.current;
				var green1 = color.startG + color.deltaG * color.current;
				var blue1 = color.startB + color.deltaB * color.current;
				var alpha1 = color.startA + color.deltaA * color.current;
				oge2d_system_Display.drawRect(scene.game.width,scene.game.height,0,0,8000,red1,green1,blue1,alpha1);
			}
			var callback = color.callback;
			if(callback != null) {
				callback(scene);
				color.callback = null;
			}
		}
	}
	,__class__: oge2d_system_Color
};
var oge2d_system_Display = function() {
};
$hxClasses["oge2d.system.Display"] = oge2d_system_Display;
oge2d_system_Display.__name__ = ["oge2d","system","Display"];
oge2d_system_Display.__interfaces__ = [oge2d_system_Updater];
oge2d_system_Display.getBound = function(sprite) {
	if(sprite == null) return null;
	var size = sprite.components.get("size");
	if(size == null) return null;
	var bound = sprite.components.get("bound");
	if(bound == null) {
		var rect = { left : size.x, top : size.y, right : size.u, bottom : size.v};
		bound = rect;
		var value = bound;
		sprite.components.set("bound",value);
	}
	var display = sprite.components.get("display");
	if(display == null) return bound; else {
		var posX1 = display.posX - display.width * display.scaleX * display.anchorX;
		var posY1 = display.posY - display.height * display.scaleY * display.anchorY;
		bound.left = posX1 + (display.anchorX + size.x) * display.width * display.scaleX;
		bound.top = posY1 + (display.anchorY + size.y) * display.height * display.scaleY;
		bound.right = bound.left + size.u * display.width * display.scaleX;
		bound.bottom = bound.top + size.v * display.height * display.scaleY;
	}
	return bound;
};
oge2d_system_Display.getScreenBound = function(scene) {
	var bound = { left : 0, top : 0, right : scene.game.width, bottom : scene.game.height};
	return bound;
};
oge2d_system_Display.isPointInsideBound = function(bound,pointX,pointY) {
	if(bound == null) return false;
	return pointX >= bound.left && pointX < bound.right && pointY >= bound.top && pointY < bound.bottom;
};
oge2d_system_Display.rotate = function(point,center,sinv,cosv) {
	point[0] -= center[0];
	point[1] -= center[1];
	var xnew = point[0] * cosv + point[1] * sinv;
	var ynew = -point[0] * sinv + point[1] * cosv;
	point[0] = xnew + center[0];
	point[1] = ynew + center[1];
};
oge2d_system_Display.sortSpritesByPosition = function(scene) {
	if(scene == null) return;
	scene.sort(function(a,b) {
		var s1 = a.components.get("display");
		if(s1 == null) return 0;
		var s2 = b.components.get("display");
		if(s2 == null) return 0;
		if(s1.posZ > s2.posZ) return 1; else if(s1.posZ < s2.posZ) return -1; else if(s1.posY > s2.posY) return 1; else if(s1.posY < s2.posY) return -1; else if(s1.posX > s2.posX) return 1; else if(s1.posX < s2.posX) return -1;
		return 0;
	});
};
oge2d_system_Display.getDisplay = function(sprite) {
	var display = sprite.components.get("display");
	if(display != null) return display;
	return null;
};
oge2d_system_Display.setPosition = function(sprite,x,y) {
	var display = sprite.components.get("display");
	if(display != null) {
		display.posX = x;
		display.posY = y;
	}
};
oge2d_system_Display.setVisible = function(sprite,visible) {
	var display = sprite.components.get("display");
	if(display != null) display.visible = visible;
};
oge2d_system_Display.isVisible = function(sprite) {
	var display = sprite.components.get("display");
	if(display != null) return display.visible == true; else return false;
};
oge2d_system_Display.setupDisplayBuffer = function(sprite,count) {
	if(count == null) count = 1;
	var graph = sprite.components.get("graphic");
	var display = sprite.components.get("display");
	if(sprite.buffer == null) {
		if(graph != null) {
			var shared = true;
			if(graph.shared != null) shared = graph.shared;
			var imgName = graph.image;
			if(imgName != null && imgName.length > 0) {
				if(!shared && sprite.index > 0) {
					var pos = imgName.indexOf(".");
					if(pos < 0) imgName = imgName + "-" + sprite.index; else imgName = imgName.substring(0,pos) + "-" + sprite.index + "." + HxOverrides.substr(imgName,pos + 1,null);
				}
				var tex = oge2d_driver_lime_Asset.getTexture(sprite.game.getImageFilePath(imgName));
				if(tex == null) haxe_Log.trace("Failed to load texture: " + imgName,{ fileName : "Display.hx", lineNumber : 133, className : "oge2d.system.Display", methodName : "setupDisplayBuffer"}); else sprite.buffer = oge2d_driver_lime_RendererGL.createDisplayBuffer(tex,count);
			}
		}
	}
	if(graph != null && display != null) {
		display.width = graph.width;
		display.height = graph.height;
		display.offsetX = graph.offsetX;
		display.offsetY = graph.offsetY;
	}
};
oge2d_system_Display.drawRect = function(w,h,x,y,z,red,green,blue,alpha) {
	if(alpha == null) alpha = 1.0;
	if(blue == null) blue = 1.0;
	if(green == null) green = 1.0;
	if(red == null) red = 1.0;
	if(z == null) z = 0;
	var buffer = oge2d_driver_lime_RendererGL.getSinglePixelBuffer();
	if(buffer == null) return;
	var posZ = z + 1000.0;
	if(posZ < 1.0) posZ = 1.0;
	posZ = 1.0 / posZ;
	var posX1 = x;
	var posY1 = y;
	var posX2 = posX1 + w;
	var posY2 = posY1 + h;
	oge2d_driver_lime_RendererGL.fillBuffer(buffer,0,posX1);
	oge2d_driver_lime_RendererGL.fillBuffer(buffer,1,posY2);
	oge2d_driver_lime_RendererGL.fillBuffer(buffer,2,posZ);
	oge2d_driver_lime_RendererGL.fillBuffer(buffer,3,0);
	oge2d_driver_lime_RendererGL.fillBuffer(buffer,4,1);
	oge2d_driver_lime_RendererGL.fillBuffer(buffer,5,red);
	oge2d_driver_lime_RendererGL.fillBuffer(buffer,6,green);
	oge2d_driver_lime_RendererGL.fillBuffer(buffer,7,blue);
	oge2d_driver_lime_RendererGL.fillBuffer(buffer,8,alpha);
	oge2d_driver_lime_RendererGL.fillBuffer(buffer,9,posX1);
	oge2d_driver_lime_RendererGL.fillBuffer(buffer,10,posY1);
	oge2d_driver_lime_RendererGL.fillBuffer(buffer,11,posZ);
	oge2d_driver_lime_RendererGL.fillBuffer(buffer,12,0);
	oge2d_driver_lime_RendererGL.fillBuffer(buffer,13,0);
	oge2d_driver_lime_RendererGL.fillBuffer(buffer,14,red);
	oge2d_driver_lime_RendererGL.fillBuffer(buffer,15,green);
	oge2d_driver_lime_RendererGL.fillBuffer(buffer,16,blue);
	oge2d_driver_lime_RendererGL.fillBuffer(buffer,17,alpha);
	oge2d_driver_lime_RendererGL.fillBuffer(buffer,18,posX2);
	oge2d_driver_lime_RendererGL.fillBuffer(buffer,19,posY1);
	oge2d_driver_lime_RendererGL.fillBuffer(buffer,20,posZ);
	oge2d_driver_lime_RendererGL.fillBuffer(buffer,21,1);
	oge2d_driver_lime_RendererGL.fillBuffer(buffer,22,0);
	oge2d_driver_lime_RendererGL.fillBuffer(buffer,23,red);
	oge2d_driver_lime_RendererGL.fillBuffer(buffer,24,green);
	oge2d_driver_lime_RendererGL.fillBuffer(buffer,25,blue);
	oge2d_driver_lime_RendererGL.fillBuffer(buffer,26,alpha);
	oge2d_driver_lime_RendererGL.fillBuffer(buffer,27,posX2);
	oge2d_driver_lime_RendererGL.fillBuffer(buffer,28,posY2);
	oge2d_driver_lime_RendererGL.fillBuffer(buffer,29,posZ);
	oge2d_driver_lime_RendererGL.fillBuffer(buffer,30,1);
	oge2d_driver_lime_RendererGL.fillBuffer(buffer,31,1);
	oge2d_driver_lime_RendererGL.fillBuffer(buffer,32,red);
	oge2d_driver_lime_RendererGL.fillBuffer(buffer,33,green);
	oge2d_driver_lime_RendererGL.fillBuffer(buffer,34,blue);
	oge2d_driver_lime_RendererGL.fillBuffer(buffer,35,alpha);
	oge2d_driver_lime_RendererGL.draw(buffer);
};
oge2d_system_Display.prototype = {
	batched: function() {
		return false;
	}
	,bind: function(game,scene) {
		if(scene != null) {
			var sprs = scene.filter(function(spr) {
				return spr.enabled;
			});
			var _g = 0;
			while(_g < sprs.length) {
				var spr1 = sprs[_g];
				++_g;
				this.include(spr1);
			}
		}
	}
	,include: function(sprite) {
		var display = sprite.components.get("display");
		if(display == null) return;
		var updaterName = display.updater;
		if(updaterName != null && updaterName.length > 0) {
			var updater = sprite.scene.game.systems.get(updaterName);
			if(updater != null) {
				updater.include(sprite);
				return;
			}
		}
		oge2d_system_Display.setupDisplayBuffer(sprite);
	}
	,exclude: function(sprite) {
	}
	,begin: function(scene) {
		oge2d_driver_lime_RendererGL.clear();
		var display = scene.components.get("display");
		if(display == null) return;
		oge2d_driver_lime_RendererGL.clearColor(display.red,display.green,display.blue,display.alpha);
	}
	,update: function(sprite) {
		var display = sprite.components.get("display");
		if(display == null) return;
		if(display.visible == false) return;
		var updaterName = display.updater;
		if(updaterName != null) {
			var updater = sprite.scene.game.systems.get(updaterName);
			if(updater != null) {
				updater.update(sprite);
				return;
			}
		}
		var buffer = sprite.buffer;
		if(buffer == null) {
			oge2d_system_Display.drawRect(display.width,display.height,display.posX,display.posY,display.posZ,display.red,display.green,display.blue,display.alpha);
			return;
		}
		var offsetX = display.offsetX;
		var offsetY = display.offsetY;
		var width = display.width;
		var height = display.height;
		var scaleX = display.scaleX;
		var scaleY = display.scaleY;
		var red = display.red;
		var green = display.green;
		var blue = display.blue;
		var alpha = display.alpha;
		var texWidth = buffer.texture.width;
		var texHeight = buffer.texture.height;
		var posX1 = display.posX - width * scaleX * display.anchorX;
		var posY1 = display.posY - height * scaleY * display.anchorY;
		var posX2 = posX1 + width * scaleX;
		var posY2 = posY1 + height * scaleY;
		var topleft = [posX1,posY1];
		var topright = [posX2,posY1];
		var bottomleft = [posX1,posY2];
		var bottomright = [posX2,posY2];
		if(display.angle != 0) {
			var angle = display.angle * Math.PI / 180;
			var sinv = Math.sin(angle);
			var cosv = Math.cos(angle);
			var center = [display.posX,display.posY];
			oge2d_system_Display.rotate(topleft,center,sinv,cosv);
			oge2d_system_Display.rotate(topright,center,sinv,cosv);
			oge2d_system_Display.rotate(bottomleft,center,sinv,cosv);
			oge2d_system_Display.rotate(bottomright,center,sinv,cosv);
		}
		var posZ = display.posZ + 1000.0;
		if(posZ < 1.0) posZ = 1.0;
		posZ = 1.0 / posZ;
		oge2d_driver_lime_RendererGL.fillBuffer(buffer,0,bottomleft[0]);
		oge2d_driver_lime_RendererGL.fillBuffer(buffer,1,bottomleft[1]);
		oge2d_driver_lime_RendererGL.fillBuffer(buffer,2,posZ);
		oge2d_driver_lime_RendererGL.fillBuffer(buffer,3,offsetX / texWidth);
		oge2d_driver_lime_RendererGL.fillBuffer(buffer,4,(offsetY + height) / texHeight);
		oge2d_driver_lime_RendererGL.fillBuffer(buffer,5,red);
		oge2d_driver_lime_RendererGL.fillBuffer(buffer,6,green);
		oge2d_driver_lime_RendererGL.fillBuffer(buffer,7,blue);
		oge2d_driver_lime_RendererGL.fillBuffer(buffer,8,alpha);
		oge2d_driver_lime_RendererGL.fillBuffer(buffer,9,topleft[0]);
		oge2d_driver_lime_RendererGL.fillBuffer(buffer,10,topleft[1]);
		oge2d_driver_lime_RendererGL.fillBuffer(buffer,11,posZ);
		oge2d_driver_lime_RendererGL.fillBuffer(buffer,12,offsetX / texWidth);
		oge2d_driver_lime_RendererGL.fillBuffer(buffer,13,offsetY / texHeight);
		oge2d_driver_lime_RendererGL.fillBuffer(buffer,14,red);
		oge2d_driver_lime_RendererGL.fillBuffer(buffer,15,green);
		oge2d_driver_lime_RendererGL.fillBuffer(buffer,16,blue);
		oge2d_driver_lime_RendererGL.fillBuffer(buffer,17,alpha);
		oge2d_driver_lime_RendererGL.fillBuffer(buffer,18,topright[0]);
		oge2d_driver_lime_RendererGL.fillBuffer(buffer,19,topright[1]);
		oge2d_driver_lime_RendererGL.fillBuffer(buffer,20,posZ);
		oge2d_driver_lime_RendererGL.fillBuffer(buffer,21,(offsetX + width) / texWidth);
		oge2d_driver_lime_RendererGL.fillBuffer(buffer,22,offsetY / texHeight);
		oge2d_driver_lime_RendererGL.fillBuffer(buffer,23,red);
		oge2d_driver_lime_RendererGL.fillBuffer(buffer,24,green);
		oge2d_driver_lime_RendererGL.fillBuffer(buffer,25,blue);
		oge2d_driver_lime_RendererGL.fillBuffer(buffer,26,alpha);
		oge2d_driver_lime_RendererGL.fillBuffer(buffer,27,bottomright[0]);
		oge2d_driver_lime_RendererGL.fillBuffer(buffer,28,bottomright[1]);
		oge2d_driver_lime_RendererGL.fillBuffer(buffer,29,posZ);
		oge2d_driver_lime_RendererGL.fillBuffer(buffer,30,(offsetX + width) / texWidth);
		oge2d_driver_lime_RendererGL.fillBuffer(buffer,31,(offsetY + height) / texHeight);
		oge2d_driver_lime_RendererGL.fillBuffer(buffer,32,red);
		oge2d_driver_lime_RendererGL.fillBuffer(buffer,33,green);
		oge2d_driver_lime_RendererGL.fillBuffer(buffer,34,blue);
		oge2d_driver_lime_RendererGL.fillBuffer(buffer,35,alpha);
		oge2d_driver_lime_RendererGL.draw(buffer);
	}
	,end: function(scene) {
		oge2d_driver_lime_RendererGL.update();
	}
	,__class__: oge2d_system_Display
};
var oge2d_system_Event = function() {
};
$hxClasses["oge2d.system.Event"] = oge2d_system_Event;
oge2d_system_Event.__name__ = ["oge2d","system","Event"];
oge2d_system_Event.__interfaces__ = [oge2d_system_Updater];
oge2d_system_Event.stopDispatching = function() {
	oge2d_system_Event._dispatching = false;
};
oge2d_system_Event.addSceneEvent = function(scene,eventName,eventParam) {
	var events = scene.data.get("events");
	if(events == null) {
		events = new List();
		scene.data.set("events",events);
	}
	events.add({ name : eventName, param : eventParam});
};
oge2d_system_Event.addSpriteEvent = function(sprite,eventName,eventParam) {
	var events = sprite.data.get("events");
	if(events == null) {
		events = new List();
		sprite.data.set("events",events);
	}
	events.add({ name : eventName, param : eventParam});
};
oge2d_system_Event.prototype = {
	batched: function() {
		return false;
	}
	,bind: function(game,scene) {
		if(scene != null) {
			var events = scene.data.get("events");
			if(events == null) {
				events = new List();
				scene.data.set("events",events);
			} else events.clear();
			var sprs = scene.filter(function(spr) {
				return spr.enabled;
			});
			var _g = 0;
			while(_g < sprs.length) {
				var spr1 = sprs[_g];
				++_g;
				this.include(spr1);
				spr1.script.call("onSceneActive");
			}
		} else {
			var sprs1 = game.scene.filter(function(spr2) {
				return spr2.enabled;
			});
			var _g1 = 0;
			while(_g1 < sprs1.length) {
				var spr3 = sprs1[_g1];
				++_g1;
				spr3.script.call("onSceneInactive");
				this.exclude(spr3);
			}
			var events1 = game.scene.data.get("events");
			if(events1 != null) events1.clear();
		}
	}
	,include: function(sprite) {
		sprite.script.reset();
		sprite.script.basis.reset();
	}
	,exclude: function(sprite) {
		sprite.script.reset();
		sprite.script.basis.reset();
		var events = sprite.data.get("events");
		if(events != null) events.clear();
	}
	,begin: function(scene) {
		oge2d_system_Display.sortSpritesByPosition(scene);
		var events = scene.data.get("events");
		if(events == null) {
			events = new List();
			scene.data.set("events",events);
		}
		if(scene.isPaused()) {
			if(scene.script.isReady()) {
				var _g_head = events.h;
				var _g_val = null;
				while(_g_head != null) {
					var event;
					event = (function($this) {
						var $r;
						_g_val = _g_head[0];
						_g_head = _g_head[1];
						$r = _g_val;
						return $r;
					}(this));
					if(event.param == null) scene.script.call(event.name); else scene.script.call(event.name,[event.param]);
				}
			}
			events.clear();
			return;
		}
		var sprs = scene.filter(function(spr) {
			return spr.enabled && spr.script.isReady();
		});
		sprs.reverse();
		var _g_head1 = events.h;
		var _g_val1 = null;
		while(_g_head1 != null) {
			var event1;
			event1 = (function($this) {
				var $r;
				_g_val1 = _g_head1[0];
				_g_head1 = _g_head1[1];
				$r = _g_val1;
				return $r;
			}(this));
			var eventName = event1.name;
			var eventParam = event1.param;
			var isMouseEvent = StringTools.startsWith(eventName,"onMouse");
			var isTouchEvent = !isMouseEvent && StringTools.startsWith(eventName,"onTouch");
			oge2d_system_Event._dispatching = true;
			var _g = 0;
			while(_g < sprs.length) {
				var spr1 = sprs[_g];
				++_g;
				if(isMouseEvent || isTouchEvent) {
					if(!oge2d_system_Display.isPointInsideBound(oge2d_system_Display.getBound(spr1),oge2d_driver_lime_Mouse.x,oge2d_driver_lime_Mouse.y)) continue;
				}
				if(eventParam == null) spr1.script.call(eventName); else spr1.script.call(eventName,[eventParam]);
				if(!oge2d_system_Event._dispatching) break;
			}
			if(oge2d_system_Event._dispatching && scene.script.isReady()) {
				if(eventParam == null) scene.script.call(eventName); else scene.script.call(eventName,[eventParam]);
			}
		}
		events.clear();
	}
	,update: function(sprite) {
		if(sprite.scene.isPaused()) return;
		if(!sprite.script.isReady()) return;
		var events = sprite.data.get("events");
		if(events != null) {
			var _g_head = events.h;
			var _g_val = null;
			while(_g_head != null) {
				var event;
				event = (function($this) {
					var $r;
					_g_val = _g_head[0];
					_g_head = _g_head[1];
					$r = _g_val;
					return $r;
				}(this));
				if(event.param == null) sprite.script.call(event.name); else sprite.script.call(event.name,[event.param]);
			}
			events.clear();
		}
		sprite.script.call("onUpdate");
	}
	,end: function(scene) {
		if(scene.script.methods != null && scene.script.methods.exists("onUpdate")) scene.script.call("onUpdate");
	}
	,__class__: oge2d_system_Event
};
var oge2d_system_Motion = function() {
};
$hxClasses["oge2d.system.Motion"] = oge2d_system_Motion;
oge2d_system_Motion.__name__ = ["oge2d","system","Motion"];
oge2d_system_Motion.__interfaces__ = [oge2d_system_Updater];
oge2d_system_Motion.createMotionData = function() {
	var motion = { state : 0, style : 0, speed : 0, current : 0, segment : 0, middleX : 0, middleY : 0, targetX : 0, targetY : 0, dataX : [], dataY : [], onStep : null, onEnd : null};
	return motion;
};
oge2d_system_Motion.createPathData = function() {
	var motionPath = { state : 0, speed : 0, current : 0, offsetX : 0, offsetY : 0, listX : [], listY : [], nodes : []};
	return motionPath;
};
oge2d_system_Motion.moveTo = function(sprite,x,y,speed,dataX,dataY,onEnd,onStep) {
	var motion = sprite.components.get("motion");
	if(motion == null) {
		motion = oge2d_system_Motion.createMotionData();
		var value = motion;
		sprite.components.set("motion",value);
	}
	motion.targetX = x;
	motion.targetY = y;
	motion.speed = speed;
	motion.state = 1;
	motion.onStep = onStep;
	motion.onEnd = onEnd;
	if(dataX != null) motion.dataX = dataX;
	if(dataY != null) motion.dataY = dataY;
	if(dataX != null) {
		if(dataX.length > 0) motion.state = 2; else motion.state = 0;
		if(motion.state == 2) motion.current = 0;
	}
};
oge2d_system_Motion.moveToNode = function(sprite,nodeIndex,onEnd,onNode) {
	var motionPath = sprite.components.get("path");
	if(motionPath == null || motionPath.state <= 0 || nodeIndex * 2 >= motionPath.nodes.length) {
		if(motionPath != null) motionPath.state = 0;
		if(onEnd != null) onEnd(sprite);
		return;
	}
	var nodes = motionPath.nodes;
	var listX = motionPath.listX;
	var listY = motionPath.listY;
	var targetX = nodes[nodeIndex * 2] + motionPath.offsetX;
	var targetY = nodes[nodeIndex * 2 + 1] + motionPath.offsetY;
	if(onNode != null) onNode(sprite,nodeIndex - 1,targetX,targetY);
	oge2d_system_Motion.moveTo(sprite,targetX,targetY,motionPath.speed,listX[nodeIndex],listY[nodeIndex],function(spr) {
		oge2d_system_Motion.moveToNode(spr,nodeIndex + 1,onEnd,onNode);
	});
};
oge2d_system_Motion.applyPath = function(sprite,offsetX,offsetY,speed,nodes,onEnd,onNode) {
	var motionPath = sprite.components.get("path");
	if(motionPath == null) {
		motionPath = oge2d_system_Motion.createPathData();
		var value = motionPath;
		sprite.components.set("path",value);
	}
	motionPath.state = 0;
	motionPath.offsetX = offsetX;
	motionPath.offsetY = offsetY;
	if(nodes == null || nodes.length <= 1) return;
	var data = nodes;
	if(speed < 0) {
		data = nodes.slice();
		var idx = 0;
		var len = nodes.length;
		while(idx < len) {
			data[idx] = nodes[len - idx - 2];
			data[idx + 1] = nodes[len - idx - 1];
			idx += 2;
		}
	}
	motionPath.nodes = data;
	if(speed > 0) motionPath.speed = speed; else motionPath.speed = 0 - speed;
	var display = sprite.components.get("stage");
	if(display == null) display = sprite.components.get("display");
	if(display == null) return;
	display.posX = offsetX + data[0];
	display.posY = offsetY + data[1];
	if(data.length <= 2) {
		if(onEnd != null) onEnd(sprite);
		return;
	}
	var x1 = offsetX + data[0];
	var y1 = offsetY + data[1];
	var count = data.length / 2 | 0;
	var listX = [];
	var listY = [];
	listX.push([]);
	listY.push([]);
	var _g = 1;
	while(_g < count) {
		var i = _g++;
		var dataX = [];
		var dataY = [];
		oge2d_system_Motion.generateBeeline(x1,y1,offsetX + data[i * 2],offsetY + data[i * 2 + 1],dataX,dataY);
		listX.push(dataX);
		listY.push(dataY);
		x1 = offsetX + data[i * 2];
		y1 = offsetY + data[i * 2 + 1];
	}
	motionPath.listX = listX;
	motionPath.listY = listY;
	motionPath.state = 1;
	oge2d_system_Motion.moveToNode(sprite,1,onEnd,onNode);
};
oge2d_system_Motion.getMotionAngle = function(currentX,currentY,targetX,targetY) {
	var dx = Math.abs(targetX - currentX);
	var dy = Math.abs(targetY - currentY);
	var angle;
	if(dx == 0) angle = 90; else angle = Math.atan(dy / dx) * 180 / Math.PI;
	if(targetX <= currentX && targetY <= currentY) angle = 180 - angle; else if(targetX <= currentX && targetY >= currentY) angle = 180 + angle; else if(targetX >= currentX && targetY >= currentY) angle = 0 - angle;
	if(angle < 0) angle += 360;
	if(angle > 360) angle -= 360;
	return angle;
};
oge2d_system_Motion.moveOutside = function(sprite,speed,angle,left,top,right,bottom,onEnd,onStep) {
	var display = sprite.components.get("stage");
	if(display == null) display = sprite.components.get("display");
	if(display == null) return;
	var posX = display.posX;
	var posY = display.posY;
	var targetX = 0;
	var targetY = 0;
	if(angle >= 0 && angle <= 45 || angle > 315 && angle <= 360) {
		targetX = right;
		targetY = posY - Math.abs(targetX - posX) * Math.tan(angle * Math.PI / 180);
	} else if(angle > 45 && angle <= 135) {
		targetY = top;
		targetX = posX + Math.abs(posY - targetY) / Math.tan(angle * Math.PI / 180);
	} else if(angle > 135 && angle <= 225) {
		targetX = left;
		targetY = posY + Math.abs(targetX - posX) * Math.tan(angle * Math.PI / 180);
	} else if(angle > 225 && angle <= 315) {
		targetY = bottom;
		targetX = posX - Math.abs(posY - targetY) / Math.tan(angle * Math.PI / 180);
	}
	oge2d_system_Motion.moveTo(sprite,targetX,targetY,speed,null,null,onEnd,onStep);
};
oge2d_system_Motion.generateBeeline = function(x1,y1,x2,y2,dataX,dataY) {
	var d;
	var count;
	var dinc1;
	var dinc2;
	var xinc1;
	var xinc2;
	var yinc1;
	var yinc2;
	var x0 = Std["int"](Math.max(Math.min(x1,x2),0));
	var y0 = Std["int"](Math.max(Math.min(y1,y2),0));
	var deltax = Std["int"](Math.abs(x2 - x1));
	var deltay = Std["int"](Math.abs(y2 - y1));
	if(deltax >= deltay) {
		count = deltax + 1;
		d = 2 * deltay - deltax;
		dinc1 = deltay * 2;
		dinc2 = (deltay - deltax) * 2;
		xinc1 = 1;
		xinc2 = 1;
		yinc1 = 0;
		yinc2 = 1;
	} else {
		count = deltay + 1;
		d = 2 * deltax - deltay;
		dinc1 = deltax * 2;
		dinc2 = (deltax - deltay) * 2;
		xinc1 = 0;
		xinc2 = 1;
		yinc1 = 1;
		yinc2 = 1;
	}
	if(x1 > x2) {
		xinc1 = 0 - xinc1;
		xinc2 = 0 - xinc2;
	}
	if(y1 > y2) {
		yinc1 = 0 - yinc1;
		yinc2 = 0 - yinc2;
	}
	var x;
	x = (x1 | 0) + (d < 0?xinc1:xinc2);
	var y;
	y = (y1 | 0) + (d < 0?yinc1:yinc2);
	d = d + (d < 0?dinc1:dinc2);
	var _g1 = 2;
	var _g = count - 1;
	while(_g1 < _g) {
		var i = _g1++;
		if(d < 0) {
			d += dinc1;
			x += xinc1;
			y += yinc1;
		} else {
			d += dinc2;
			x += xinc2;
			y += yinc2;
		}
		dataX.push(x);
		dataY.push(y);
	}
	if(x1 != x2 || y1 != y2) {
		dataX.push(x2);
		dataY.push(y2);
	}
};
oge2d_system_Motion.prototype = {
	batched: function() {
		return false;
	}
	,bind: function(game,scene) {
	}
	,include: function(sprite) {
	}
	,exclude: function(sprite) {
	}
	,begin: function(scene) {
	}
	,update: function(sprite) {
		if(sprite.scene.isPaused()) return;
		var motion = sprite.components.get("motion");
		if(motion == null) return;
		if(motion.state == 0) return;
		if(motion.state == 1 && motion.speed > 0) {
			var display = sprite.components.get("stage");
			if(display == null) display = sprite.components.get("display");
			if(display == null) return;
			if(motion.style == 0) {
				var posX = display.posX;
				var posY = display.posY;
				var dataX = [];
				var dataY = [];
				oge2d_system_Motion.generateBeeline(posX,posY,motion.targetX,motion.targetY,dataX,dataY);
				motion.dataX = dataX;
				motion.dataY = dataY;
				if(dataX.length > 0) motion.state = 2; else motion.state = 0;
				if(motion.state == 2) motion.current = 0;
			} else motion.state = 0;
		}
		if(motion.state == 2 && motion.speed > 0) {
			var display1 = sprite.components.get("stage");
			if(display1 == null) display1 = sprite.components.get("display");
			if(display1 == null) return;
			var dataX1 = motion.dataX;
			var dataY1 = motion.dataY;
			var idx = motion.current;
			if(idx < dataX1.length) {
				display1.posX = dataX1[idx];
				display1.posY = dataY1[idx];
				if(motion.onStep != null) motion.onStep(sprite,idx,dataX1.length);
				motion.current += motion.speed;
			} else {
				display1.posX = dataX1[dataX1.length - 1];
				display1.posY = dataY1[dataY1.length - 1];
				motion.state = 3;
			}
		}
		if(motion.state == 3) {
			motion.state = 0;
			var callback = motion.onEnd;
			if(callback != null) callback(sprite); else oge2d_system_Event.addSpriteEvent(sprite,"onMotionDone");
			if(motion.state == 0) motion.callback = null;
		}
	}
	,end: function(scene) {
	}
	,__class__: oge2d_system_Motion
};
var oge2d_system_Plot = function() {
	this._plot = null;
};
$hxClasses["oge2d.system.Plot"] = oge2d_system_Plot;
oge2d_system_Plot.__name__ = ["oge2d","system","Plot"];
oge2d_system_Plot.__interfaces__ = [oge2d_system_Updater];
oge2d_system_Plot.setEnabled = function(sprite,value) {
	if(sprite == null) return;
	var plot = sprite.components.get("plot");
	if(plot == null) return;
	plot.enabled = value;
};
oge2d_system_Plot.callScene = function(game,sceneName,fadeOutSteps,fadeInSteps,callback) {
	if(fadeInSteps == null) fadeInSteps = 0;
	if(fadeOutSteps == null) fadeOutSteps = 0;
	if(game.scene != null && fadeOutSteps > 0) oge2d_system_Color.fadeOut(game.scene,fadeOutSteps,function(_) {
		game.loadScene(sceneName,function(nextScene) {
			if(nextScene == null) return;
			if(game.scene == nextScene) return;
			game.setActiveScene(sceneName);
			if(fadeInSteps > 0) oge2d_system_Color.fadeIn(nextScene,fadeInSteps,callback);
		});
	}); else game.loadScene(sceneName,function(nextScene1) {
		if(nextScene1 == null) return;
		if(game.scene == nextScene1) return;
		game.setActiveScene(sceneName);
		if(fadeInSteps > 0) oge2d_system_Color.fadeIn(nextScene1,fadeInSteps,callback);
	});
};
oge2d_system_Plot.prototype = {
	_plot: null
	,wait: function(time) {
		var plot = this._plot;
		if(plot == null) return;
		oge2d_system_Timer.addTimer(plot.scene,time,null,function() {
			plot.script.resume("onPlot");
		});
		plot.script.suspend();
	}
	,moveTo: function(sprite,x,y,speed) {
		var plot = this._plot;
		if(plot == null) return;
		oge2d_system_Motion.moveTo(sprite,x,y,speed,null,null,function(_) {
			plot.script.resume("onPlot");
		});
		plot.script.suspend();
	}
	,spriteFadeIn: function(sprite,steps) {
		var plot = this._plot;
		if(plot == null) return;
		oge2d_system_Color.spriteFadeIn(sprite,steps | 0,function(_) {
			plot.script.resume("onPlot");
		});
		plot.script.suspend();
	}
	,musicFadeOut: function(musicName,time) {
		var plot = this._plot;
		if(plot == null) return;
		oge2d_library_common_Media.musicFadeOut(plot.scene,musicName,time,null,function(_) {
			plot.script.resume("onPlot");
		});
		plot.script.suspend();
	}
	,waitForViewPos: function(posX,posY) {
		var plot = this._plot;
		if(plot == null) return;
		oge2d_system_Stage.wait(plot.scene,posX,posY,function(_) {
			plot.script.resume("onPlot");
		});
		plot.script.suspend();
	}
	,enable: function(sprite) {
		oge2d_system_Plot.setEnabled(sprite != null?sprite:this._plot,true);
	}
	,disable: function(sprite) {
		oge2d_system_Plot.setEnabled(sprite != null?sprite:this._plot,false);
	}
	,nextScene: function(game,sceneName,fadeOutSteps,fadeInSteps) {
		if(fadeInSteps == null) fadeInSteps = 0;
		if(fadeOutSteps == null) fadeOutSteps = 0;
		oge2d_system_Plot.callScene(game,sceneName,fadeOutSteps,fadeInSteps);
	}
	,batched: function() {
		return false;
	}
	,bind: function(game,scene) {
	}
	,include: function(sprite) {
	}
	,exclude: function(sprite) {
	}
	,begin: function(scene) {
	}
	,update: function(sprite) {
		if(sprite.scene.isPaused()) return;
		var plot = sprite.components.get("plot");
		if(plot == null || plot.enabled == false) return;
		if(sprite.script.methods != null && sprite.script.methods.exists("onPlot")) {
			this._plot = sprite;
			sprite.script.call("onPlot",[this]);
		}
	}
	,end: function(scene) {
	}
	,__class__: oge2d_system_Plot
};
var oge2d_system_Pool = function() {
	if(oge2d_system_Pool._pools == null) oge2d_system_Pool._pools = new haxe_ds_StringMap();
};
$hxClasses["oge2d.system.Pool"] = oge2d_system_Pool;
oge2d_system_Pool.__name__ = ["oge2d","system","Pool"];
oge2d_system_Pool.__interfaces__ = [oge2d_system_Updater];
oge2d_system_Pool.getFreeSprite = function(poolName) {
	var pool = oge2d_system_Pool._pools.get(poolName);
	if(pool == null) return null;
	var _g_head = pool.h;
	var _g_val = null;
	while(_g_head != null) {
		var spr;
		spr = (function($this) {
			var $r;
			_g_val = _g_head[0];
			_g_head = _g_head[1];
			$r = _g_val;
			return $r;
		}(this));
		if(spr.enabled == false) return spr;
	}
	return null;
};
oge2d_system_Pool.getFreeCount = function(poolName) {
	var pool = oge2d_system_Pool._pools.get(poolName);
	if(pool == null) return 0;
	var count = 0;
	var _g_head = pool.h;
	var _g_val = null;
	while(_g_head != null) {
		var spr;
		spr = (function($this) {
			var $r;
			_g_val = _g_head[0];
			_g_head = _g_head[1];
			$r = _g_val;
			return $r;
		}(this));
		if(spr.enabled == false) count++;
	}
	return count;
};
oge2d_system_Pool.getPoolSize = function(poolName) {
	var pool = oge2d_system_Pool._pools.get(poolName);
	if(pool == null) return 0;
	return pool.length;
};
oge2d_system_Pool.getPoolName = function(sprite) {
	var poolName = null;
	var poolSetting = sprite.components.get("pool");
	if(poolSetting != null) poolName = poolSetting.name;
	if(poolName == null) return ""; else return poolName;
};
oge2d_system_Pool.prototype = {
	batched: function() {
		return true;
	}
	,bind: function(game,scene) {
		if(scene != null) {
			var sprs = scene.filter(function(spr) {
				return spr.components.exists("pool");
			});
			var _g = 0;
			while(_g < sprs.length) {
				var spr1 = sprs[_g];
				++_g;
				var poolSetting = spr1.components.get("pool");
				var poolName = poolSetting.name;
				if(poolName == null || poolName.length <= 0) continue;
				if(spr1.index < poolSetting.minIndex || spr1.index > poolSetting.maxIndex) continue;
				var pool = oge2d_system_Pool._pools.get(poolName);
				if(pool == null) {
					pool = new List();
					oge2d_system_Pool._pools.set(poolName,pool);
				}
				if(pool != null) {
					spr1.set_enabled(false);
					pool.add(spr1);
				}
			}
		} else {
			var poolNames = new List();
			var $it0 = oge2d_system_Pool._pools.keys();
			while( $it0.hasNext() ) {
				var key = $it0.next();
				poolNames.add(key);
			}
			var _g_head = poolNames.h;
			var _g_val = null;
			while(_g_head != null) {
				var poolName1;
				poolName1 = (function($this) {
					var $r;
					_g_val = _g_head[0];
					_g_head = _g_head[1];
					$r = _g_val;
					return $r;
				}(this));
				oge2d_system_Pool._pools.get(poolName1).clear();
				oge2d_system_Pool._pools.remove(poolName1);
			}
			poolNames.clear();
		}
	}
	,include: function(sprite) {
	}
	,exclude: function(sprite) {
	}
	,begin: function(scene) {
	}
	,update: function(sprite) {
	}
	,end: function(scene) {
	}
	,__class__: oge2d_system_Pool
};
var oge2d_system_Stage = function() {
};
$hxClasses["oge2d.system.Stage"] = oge2d_system_Stage;
oge2d_system_Stage.__name__ = ["oge2d","system","Stage"];
oge2d_system_Stage.__interfaces__ = [oge2d_system_Updater];
oge2d_system_Stage.getSpritePos = function(sprite) {
	var stage = sprite.components.get("stage");
	if(stage != null) return stage;
	var display = sprite.components.get("display");
	if(display != null) return display;
	return null;
};
oge2d_system_Stage.setSpritePos = function(sprite,x,y) {
	var display = sprite.components.get("stage");
	if(display == null) display = sprite.components.get("display");
	if(display != null) {
		display.posX = x;
		display.posY = y;
	}
};
oge2d_system_Stage.getStageViewX = function(scene) {
	var stage = scene.components.get("stage");
	if(stage != null) return stage.viewX;
	return 0;
};
oge2d_system_Stage.getStageViewY = function(scene) {
	var stage = scene.components.get("stage");
	if(stage != null) return stage.viewY;
	return 0;
};
oge2d_system_Stage.getMousePosX = function(scene) {
	var stage = scene.components.get("stage");
	if(stage != null) return stage.viewX + oge2d_driver_lime_Mouse.x;
	return oge2d_driver_lime_Mouse.x;
};
oge2d_system_Stage.getMousePosY = function(scene) {
	var stage = scene.components.get("stage");
	if(stage != null) return stage.viewY + oge2d_driver_lime_Mouse.y;
	return oge2d_driver_lime_Mouse.y;
};
oge2d_system_Stage.getViewBound = function(scene) {
	var bound = { left : 0, top : 0, right : scene.game.width, bottom : scene.game.height};
	var stage = scene.components.get("stage");
	if(stage != null) {
		bound.left += stage.viewX;
		bound.top += stage.viewY;
		bound.right += stage.viewX;
		bound.bottom += stage.viewY;
	}
	return bound;
};
oge2d_system_Stage.setViewPos = function(scene,posX,posY) {
	var stage = scene.components.get("stage");
	if(stage == null) return;
	stage.viewX = posX;
	stage.viewY = posY;
};
oge2d_system_Stage.wait = function(scene,targetX,targetY,callback) {
	var stage = scene.components.get("stage");
	if(stage == null) return;
	stage.targetX = targetX;
	stage.targetY = targetY;
	stage.callback = callback;
};
oge2d_system_Stage.scroll = function(scene,speedX,speedY) {
	var stage = scene.components.get("stage");
	if(stage == null) return;
	stage.speedX = speedX;
	stage.speedY = speedY;
};
oge2d_system_Stage.loop = function(scene,looping,beginX,beginY,endX,endY) {
	if(endY == null) endY = 0;
	if(endX == null) endX = 0;
	if(beginY == null) beginY = 0;
	if(beginX == null) beginX = 0;
	if(looping == null) looping = true;
	var stage = scene.components.get("stage");
	if(stage == null) return;
	stage.looping = looping;
	stage.beginX = beginX;
	stage.beginY = beginY;
	stage.endX = endX;
	stage.endY = endY;
};
oge2d_system_Stage.isLooping = function(scene) {
	var stage = scene.components.get("stage");
	return stage != null && stage.looping != null && stage.looping == true;
};
oge2d_system_Stage.prototype = {
	batched: function() {
		return false;
	}
	,bind: function(game,scene) {
		if(scene == null) return;
		var stage = scene.components.get("stage");
		if(stage == null) return;
		var tiles = [];
		var blockNames = stage.blocks;
		var offsetValues = stage.offsets;
		var idx = 0;
		var maxX = 0;
		var maxY = 0;
		var _g = 0;
		while(_g < blockNames.length) {
			var blockName = blockNames[_g];
			++_g;
			var blockSprite = scene.sprites.get(blockName);
			var graph = blockSprite.components.get("graphic");
			var display = blockSprite.components.get("display");
			var offsetX = offsetValues[idx++] + graph.width - scene.game.width;
			var offsetY = offsetValues[idx++] + graph.height - scene.game.height;
			if(offsetX > maxX) maxX = offsetX;
			if(offsetY > maxY) maxY = offsetY;
			display.visible = true;
			display.anchorX = 0.0;
			display.anchorY = 0.0;
			display.posZ = -1;
			tiles.push(blockSprite);
		}
		if(maxX > 0) stage.maxX = maxX; else stage.maxX = 0;
		if(maxY > 0) stage.maxY = maxY; else stage.maxY = 0;
		stage.tiles = tiles;
	}
	,include: function(sprite) {
	}
	,exclude: function(sprite) {
	}
	,begin: function(scene) {
		if(scene.isPaused()) return;
		var stage = scene.components.get("stage");
		if(stage == null) return;
		if(stage.callback != null) {
			if(stage.viewX == stage.targetX && stage.viewY == stage.targetY) {
				var callback = stage.callback;
				stage.callback = null;
				if(callback != null) {
					callback(scene);
					return;
				}
			}
		}
		if(stage.looping != null && stage.looping == true) {
			if(stage.viewX == stage.endX && stage.viewY == stage.endY) {
				stage.viewX = stage.beginX;
				stage.viewY = stage.beginY;
			}
		}
		stage.viewX += stage.speedX;
		stage.viewY += stage.speedY;
		if(stage.viewX < 0) stage.viewX = 0;
		if(stage.viewX > stage.maxX) stage.viewX = stage.maxX;
		if(stage.viewY < 0) stage.viewY = 0;
		if(stage.viewY > stage.maxY) stage.viewY = stage.maxY;
		var idx = 0;
		var tiles = stage.tiles;
		var offsets = stage.offsets;
		var _g = 0;
		while(_g < tiles.length) {
			var tile = tiles[_g];
			++_g;
			var display = tile.components.get("display");
			display.posX = 0 - stage.viewX + offsets[idx++];
			display.posY = 0 - stage.viewY + offsets[idx++];
		}
	}
	,update: function(sprite) {
		if(sprite.scene.isPaused()) return;
		var stage = sprite.scene.components.get("stage");
		if(stage == null) return;
		var location = sprite.components.get("stage");
		if(location == null) return;
		var display = sprite.components.get("display");
		if(display == null) return;
		display.posX = location.posX - stage.viewX;
		display.posY = location.posY - stage.viewY;
	}
	,end: function(scene) {
	}
	,__class__: oge2d_system_Stage
};
var oge2d_system_Text = function() {
};
$hxClasses["oge2d.system.Text"] = oge2d_system_Text;
oge2d_system_Text.__name__ = ["oge2d","system","Text"];
oge2d_system_Text.__interfaces__ = [oge2d_system_Updater];
oge2d_system_Text.setText = function(sprite,text) {
	var setting = sprite.components.get("text");
	if(setting != null) setting.content = text;
};
oge2d_system_Text.prototype = {
	batched: function() {
		return false;
	}
	,bind: function(game,scene) {
	}
	,include: function(sprite) {
		var text = sprite.components.get("text");
		if(text != null) {
			var fontName = text.font;
			if(fontName != null && text.charset == null) text.charset = oge2d_driver_lime_Asset.getJsonData(sprite.game.getJsonFilePath(fontName,"font"));
			var maxLength;
			if(text.maxLength == null) maxLength = 16; else maxLength = Std["int"](text.maxLength);
			text.maxLength = maxLength;
			oge2d_system_Display.setupDisplayBuffer(sprite,maxLength);
		} else oge2d_system_Display.setupDisplayBuffer(sprite);
	}
	,exclude: function(sprite) {
	}
	,begin: function(scene) {
	}
	,update: function(sprite) {
		var buffer = sprite.buffer;
		if(buffer == null) return;
		var text = sprite.components.get("text");
		if(text == null) return;
		var content = text.content;
		if(content == null || content.length <= 0) return;
		var maxLength = Std["int"](text.maxLength);
		var charset = text.charset;
		if(charset == null) return;
		var chars = charset.chars;
		if(chars == null) return;
		var display = sprite.components.get("display");
		if(display == null) return;
		var posZ = display.posZ + 1000.0;
		if(posZ < 1.0) posZ = 1.0;
		posZ = 1.0 / posZ;
		var posX = display.posX;
		var posY = display.posY;
		var scaleX = display.scaleX;
		var scaleY = display.scaleY;
		var red = display.red;
		var green = display.green;
		var blue = display.blue;
		var alpha = display.alpha;
		var posX1 = posX;
		var posY1 = posY;
		var posX2 = posX;
		var posY2 = posY;
		var texWidth = buffer.texture.width;
		var texHeight = buffer.texture.height;
		var idx = 0;
		var len = unifill__$Utf16_Utf16_$Impl_$.codePointCount(content,0,content.length);
		var offset = 0;
		var _g = 0;
		while(_g < maxLength) {
			var i = _g++;
			var code = "32";
			if(i >= len) alpha = 0; else code = Std.string(unifill_Unifill.uCharCodeAt(content,i));
			var setting = Reflect.field(chars,code);
			if(setting == null) setting = Reflect.field(chars,"63");
			var args = setting;
			posX1 = posX + offset + args[4] * scaleX;
			posY1 = posY + args[5] * scaleY;
			posX2 = posX1 + args[2] * scaleX;
			posY2 = posY1 + args[3] * scaleY;
			offset = posX1 + args[6] * scaleX - posX;
			oge2d_driver_lime_RendererGL.fillBuffer(buffer,idx++,posX1);
			oge2d_driver_lime_RendererGL.fillBuffer(buffer,idx++,posY2);
			oge2d_driver_lime_RendererGL.fillBuffer(buffer,idx++,posZ);
			oge2d_driver_lime_RendererGL.fillBuffer(buffer,idx++,args[0] / texWidth);
			oge2d_driver_lime_RendererGL.fillBuffer(buffer,idx++,(args[1] + args[3]) / texHeight);
			oge2d_driver_lime_RendererGL.fillBuffer(buffer,idx++,red);
			oge2d_driver_lime_RendererGL.fillBuffer(buffer,idx++,green);
			oge2d_driver_lime_RendererGL.fillBuffer(buffer,idx++,blue);
			oge2d_driver_lime_RendererGL.fillBuffer(buffer,idx++,alpha);
			oge2d_driver_lime_RendererGL.fillBuffer(buffer,idx++,posX1);
			oge2d_driver_lime_RendererGL.fillBuffer(buffer,idx++,posY1);
			oge2d_driver_lime_RendererGL.fillBuffer(buffer,idx++,posZ);
			oge2d_driver_lime_RendererGL.fillBuffer(buffer,idx++,args[0] / texWidth);
			oge2d_driver_lime_RendererGL.fillBuffer(buffer,idx++,args[1] / texHeight);
			oge2d_driver_lime_RendererGL.fillBuffer(buffer,idx++,red);
			oge2d_driver_lime_RendererGL.fillBuffer(buffer,idx++,green);
			oge2d_driver_lime_RendererGL.fillBuffer(buffer,idx++,blue);
			oge2d_driver_lime_RendererGL.fillBuffer(buffer,idx++,alpha);
			oge2d_driver_lime_RendererGL.fillBuffer(buffer,idx++,posX2);
			oge2d_driver_lime_RendererGL.fillBuffer(buffer,idx++,posY1);
			oge2d_driver_lime_RendererGL.fillBuffer(buffer,idx++,posZ);
			oge2d_driver_lime_RendererGL.fillBuffer(buffer,idx++,(args[0] + args[2]) / texWidth);
			oge2d_driver_lime_RendererGL.fillBuffer(buffer,idx++,args[1] / texHeight);
			oge2d_driver_lime_RendererGL.fillBuffer(buffer,idx++,red);
			oge2d_driver_lime_RendererGL.fillBuffer(buffer,idx++,green);
			oge2d_driver_lime_RendererGL.fillBuffer(buffer,idx++,blue);
			oge2d_driver_lime_RendererGL.fillBuffer(buffer,idx++,alpha);
			oge2d_driver_lime_RendererGL.fillBuffer(buffer,idx++,posX2);
			oge2d_driver_lime_RendererGL.fillBuffer(buffer,idx++,posY2);
			oge2d_driver_lime_RendererGL.fillBuffer(buffer,idx++,posZ);
			oge2d_driver_lime_RendererGL.fillBuffer(buffer,idx++,(args[0] + args[2]) / texWidth);
			oge2d_driver_lime_RendererGL.fillBuffer(buffer,idx++,(args[1] + args[3]) / texHeight);
			oge2d_driver_lime_RendererGL.fillBuffer(buffer,idx++,red);
			oge2d_driver_lime_RendererGL.fillBuffer(buffer,idx++,green);
			oge2d_driver_lime_RendererGL.fillBuffer(buffer,idx++,blue);
			oge2d_driver_lime_RendererGL.fillBuffer(buffer,idx++,alpha);
		}
		oge2d_driver_lime_RendererGL.draw(buffer);
	}
	,end: function(scene) {
	}
	,__class__: oge2d_system_Text
};
var oge2d_system_Timer = function() {
};
$hxClasses["oge2d.system.Timer"] = oge2d_system_Timer;
oge2d_system_Timer.__name__ = ["oge2d","system","Timer"];
oge2d_system_Timer.__interfaces__ = [oge2d_system_Updater];
oge2d_system_Timer.addTimer = function(scene,time,sprite,callback) {
	if(time <= 0 || sprite == null && callback == null) return;
	var timers = scene.data.get("timers");
	if(timers == null) {
		timers = new List();
		scene.data.set("timers",timers);
	}
	timers.add({ start : scene.ticks, time : time, sprite : sprite, callback : callback});
};
oge2d_system_Timer.prototype = {
	batched: function() {
		return true;
	}
	,bind: function(game,scene) {
	}
	,include: function(sprite) {
	}
	,exclude: function(sprite) {
	}
	,begin: function(scene) {
	}
	,update: function(sprite) {
	}
	,end: function(scene) {
		if(scene.isPaused()) return;
		var timers = scene.data.get("timers");
		if(timers == null) {
			timers = new List();
			scene.data.set("timers",timers);
		}
		var timeupList = new List();
		var _g_head = timers.h;
		var _g_val = null;
		while(_g_head != null) {
			var timer;
			timer = (function($this) {
				var $r;
				_g_val = _g_head[0];
				_g_head = _g_head[1];
				$r = _g_val;
				return $r;
			}(this));
			if(_$UInt_UInt_$Impl_$.gte(scene.ticks - timer.start,timer.time)) timeupList.add(timer);
		}
		var _g_head1 = timeupList.h;
		var _g_val1 = null;
		while(_g_head1 != null) {
			var timer1;
			timer1 = (function($this) {
				var $r;
				_g_val1 = _g_head1[0];
				_g_head1 = _g_head1[1];
				$r = _g_val1;
				return $r;
			}(this));
			timers.remove(timer1);
			if(timer1.callback != null) timer1.callback(); else if(timer1.sprite != null) oge2d_system_Event.addSpriteEvent(timer1.sprite,"onTimer");
		}
	}
	,__class__: oge2d_system_Timer
};
var unifill__$CodePoint_CodePoint_$Impl_$ = {};
$hxClasses["unifill._CodePoint.CodePoint_Impl_"] = unifill__$CodePoint_CodePoint_$Impl_$;
unifill__$CodePoint_CodePoint_$Impl_$.__name__ = ["unifill","_CodePoint","CodePoint_Impl_"];
unifill__$CodePoint_CodePoint_$Impl_$.fromInt = function(code) {
	if(!(0 <= code && code <= 1114111 && !(55296 <= code && code <= 56319) && !(56320 <= code && code <= 57343))) throw new js__$Boot_HaxeError(new unifill_InvalidCodePoint(code));
	return code;
};
unifill__$CodePoint_CodePoint_$Impl_$.cons = function(a,b) {
	return unifill_InternalEncoding.fromCodePoint(a) + b;
};
unifill__$CodePoint_CodePoint_$Impl_$.snoc = function(a,b) {
	return a + unifill_InternalEncoding.fromCodePoint(b);
};
unifill__$CodePoint_CodePoint_$Impl_$.addInt = function(a,b) {
	var code = a + b;
	if(!(0 <= code && code <= 1114111 && !(55296 <= code && code <= 56319) && !(56320 <= code && code <= 57343))) throw new js__$Boot_HaxeError(new unifill_InvalidCodePoint(code));
	return code;
};
unifill__$CodePoint_CodePoint_$Impl_$.sub = function(a,b) {
	return a - b;
};
unifill__$CodePoint_CodePoint_$Impl_$.subInt = function(a,b) {
	var code = a - b;
	if(!(0 <= code && code <= 1114111 && !(55296 <= code && code <= 56319) && !(56320 <= code && code <= 57343))) throw new js__$Boot_HaxeError(new unifill_InvalidCodePoint(code));
	return code;
};
unifill__$CodePoint_CodePoint_$Impl_$._new = function(code) {
	return code;
};
unifill__$CodePoint_CodePoint_$Impl_$.toString = function(this1) {
	return unifill_InternalEncoding.fromCodePoint(this1);
};
unifill__$CodePoint_CodePoint_$Impl_$.toInt = function(this1) {
	return this1;
};
var unifill_CodePointIter = function(s) {
	this.i = 0;
	this.string = s;
	this.index = 0;
	this.endIndex = s.length;
};
$hxClasses["unifill.CodePointIter"] = unifill_CodePointIter;
unifill_CodePointIter.__name__ = ["unifill","CodePointIter"];
unifill_CodePointIter.prototype = {
	string: null
	,index: null
	,endIndex: null
	,hasNext: function() {
		return this.index < this.endIndex;
	}
	,i: null
	,next: function() {
		this.i = this.index;
		this.index += unifill_InternalEncoding.codePointWidthAt(this.string,this.index);
		return unifill__$Utf16_Utf16_$Impl_$.codePointAt(this.string,this.i);
	}
	,__class__: unifill_CodePointIter
};
var unifill_Exception = function() {
};
$hxClasses["unifill.Exception"] = unifill_Exception;
unifill_Exception.__name__ = ["unifill","Exception"];
unifill_Exception.prototype = {
	toString: function() {
		throw new js__$Boot_HaxeError(null);
	}
	,__class__: unifill_Exception
};
var unifill_InvalidCodePoint = function(code) {
	unifill_Exception.call(this);
	this.code = code;
};
$hxClasses["unifill.InvalidCodePoint"] = unifill_InvalidCodePoint;
unifill_InvalidCodePoint.__name__ = ["unifill","InvalidCodePoint"];
unifill_InvalidCodePoint.__super__ = unifill_Exception;
unifill_InvalidCodePoint.prototype = $extend(unifill_Exception.prototype,{
	code: null
	,toString: function() {
		return "InvalidCodePoint(code: " + this.code + ")";
	}
	,__class__: unifill_InvalidCodePoint
});
var unifill_InvalidCodeUnitSequence = function(index) {
	unifill_Exception.call(this);
	this.index = index;
};
$hxClasses["unifill.InvalidCodeUnitSequence"] = unifill_InvalidCodeUnitSequence;
unifill_InvalidCodeUnitSequence.__name__ = ["unifill","InvalidCodeUnitSequence"];
unifill_InvalidCodeUnitSequence.__super__ = unifill_Exception;
unifill_InvalidCodeUnitSequence.prototype = $extend(unifill_Exception.prototype,{
	index: null
	,toString: function() {
		return "InvalidCodeUnitSequence(index: " + this.index + ")";
	}
	,__class__: unifill_InvalidCodeUnitSequence
});
var unifill_InternalEncoding = function() { };
$hxClasses["unifill.InternalEncoding"] = unifill_InternalEncoding;
unifill_InternalEncoding.__name__ = ["unifill","InternalEncoding"];
unifill_InternalEncoding.get_internalEncoding = function() {
	return "UTF-16";
};
unifill_InternalEncoding.codeUnitAt = function(s,index) {
	return s.charCodeAt(index);
};
unifill_InternalEncoding.codePointAt = function(s,index) {
	return unifill__$Utf16_Utf16_$Impl_$.codePointAt(s,index);
};
unifill_InternalEncoding.charAt = function(s,index) {
	var this1;
	var this2 = s;
	var s1;
	var len;
	var c = this2.charCodeAt(index);
	if(!(55296 <= c && c <= 56319)) len = 1; else len = 2;
	var s2 = HxOverrides.substr(this2,index,len);
	s1 = s2;
	this1 = s1;
	return this1;
};
unifill_InternalEncoding.codePointCount = function(s,beginIndex,endIndex) {
	return unifill__$Utf16_Utf16_$Impl_$.codePointCount(s,beginIndex,endIndex);
};
unifill_InternalEncoding.codePointWidthAt = function(s,index) {
	var c = s.charCodeAt(index);
	if(!(55296 <= c && c <= 56319)) return 1; else return 2;
};
unifill_InternalEncoding.codePointWidthBefore = function(s,index) {
	var this1 = s;
	return unifill__$Utf16_Utf16Impl.find_prev_code_point(function(i) {
		return this1.charCodeAt(i);
	},index);
};
unifill_InternalEncoding.offsetByCodePoints = function(s,index,codePointOffset) {
	var this1 = s;
	if(codePointOffset >= 0) {
		var index1 = index;
		var len = this1.length;
		var i = 0;
		while(i < codePointOffset && index1 < len) {
			var c = this1.charCodeAt(index1);
			if(!(55296 <= c && c <= 56319)) index1 += 1; else index1 += 2;
			++i;
		}
		return index1;
	} else {
		var index2 = index;
		var count = 0;
		while(count < -codePointOffset && 0 < index2) {
			var this2 = [this1];
			index2 -= unifill__$Utf16_Utf16Impl.find_prev_code_point((function(this2) {
				return function(i1) {
					return this2[0].charCodeAt(i1);
				};
			})(this2),index2);
			++count;
		}
		return index2;
	}
};
unifill_InternalEncoding.backwardOffsetByCodePoints = function(s,index,codePointOffset) {
	var this1 = s;
	var codePointOffset1 = -codePointOffset;
	if(codePointOffset1 >= 0) {
		var index1 = index;
		var len = this1.length;
		var i = 0;
		while(i < codePointOffset1 && index1 < len) {
			var c = this1.charCodeAt(index1);
			if(!(55296 <= c && c <= 56319)) index1 += 1; else index1 += 2;
			++i;
		}
		return index1;
	} else {
		var index2 = index;
		var count = 0;
		while(count < -codePointOffset1 && 0 < index2) {
			var this2 = [this1];
			index2 -= unifill__$Utf16_Utf16Impl.find_prev_code_point((function(this2) {
				return function(i1) {
					return this2[0].charCodeAt(i1);
				};
			})(this2),index2);
			++count;
		}
		return index2;
	}
};
unifill_InternalEncoding.fromCodePoint = function(codePoint) {
	var this1;
	if(codePoint <= 65535) {
		var s;
		var s1 = String.fromCharCode(codePoint);
		s = s1;
		this1 = s;
	} else {
		var s2;
		var s3 = String.fromCharCode((codePoint >> 10) + 55232) + String.fromCharCode(codePoint & 1023 | 56320);
		s2 = s3;
		this1 = s2;
	}
	return this1;
};
unifill_InternalEncoding.fromCodePoints = function(codePoints) {
	var this1;
	var buf = new StringBuf();
	var $it0 = $iterator(codePoints)();
	while( $it0.hasNext() ) {
		var c = $it0.next();
		if(c <= 65535) buf.b += String.fromCharCode(c); else {
			buf.b += String.fromCharCode((c >> 10) + 55232);
			buf.b += String.fromCharCode(c & 1023 | 56320);
		}
	}
	this1 = buf.b;
	return this1;
};
unifill_InternalEncoding.validate = function(s) {
	unifill__$Utf16_Utf16_$Impl_$.validate(s);
};
unifill_InternalEncoding.isValidString = function(s) {
	try {
		unifill__$Utf16_Utf16_$Impl_$.validate(s);
		return true;
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		if( js_Boot.__instanceof(e,unifill_InvalidCodeUnitSequence) ) {
			return false;
		} else throw(e);
	}
};
unifill_InternalEncoding.encodeWith = function(f,c) {
	if(c <= 65535) f(c); else {
		f((c >> 10) + 55232);
		f(c & 1023 | 56320);
	}
};
var unifill_InternalEncodingIter = function(s,beginIndex,endIndex) {
	this.i = 0;
	this.string = s;
	this.index = beginIndex;
	this.endIndex = endIndex;
};
$hxClasses["unifill.InternalEncodingIter"] = unifill_InternalEncodingIter;
unifill_InternalEncodingIter.__name__ = ["unifill","InternalEncodingIter"];
unifill_InternalEncodingIter.prototype = {
	string: null
	,index: null
	,endIndex: null
	,hasNext: function() {
		return this.index < this.endIndex;
	}
	,i: null
	,next: function() {
		this.i = this.index;
		this.index += unifill_InternalEncoding.codePointWidthAt(this.string,this.index);
		return this.i;
	}
	,__class__: unifill_InternalEncodingIter
};
var unifill_Unicode = function() { };
$hxClasses["unifill.Unicode"] = unifill_Unicode;
unifill_Unicode.__name__ = ["unifill","Unicode"];
unifill_Unicode.decodeSurrogate = function(hi,lo) {
	return hi - 55232 << 10 | lo & 1023;
};
unifill_Unicode.encodeHighSurrogate = function(c) {
	return (c >> 10) + 55232;
};
unifill_Unicode.encodeLowSurrogate = function(c) {
	return c & 1023 | 56320;
};
unifill_Unicode.isScalar = function(code) {
	return 0 <= code && code <= 1114111 && !(55296 <= code && code <= 56319) && !(56320 <= code && code <= 57343);
};
unifill_Unicode.isHighSurrogate = function(code) {
	return 55296 <= code && code <= 56319;
};
unifill_Unicode.isLowSurrogate = function(code) {
	return 56320 <= code && code <= 57343;
};
var unifill_Unifill = function() { };
$hxClasses["unifill.Unifill"] = unifill_Unifill;
unifill_Unifill.__name__ = ["unifill","Unifill"];
unifill_Unifill.uLength = function(s) {
	return unifill__$Utf16_Utf16_$Impl_$.codePointCount(s,0,s.length);
};
unifill_Unifill.uCharAt = function(s,index) {
	var i = unifill_InternalEncoding.offsetByCodePoints(s,0,index);
	return unifill_InternalEncoding.charAt(s,i);
};
unifill_Unifill.uCharCodeAt = function(s,index) {
	var i = unifill_InternalEncoding.offsetByCodePoints(s,0,index);
	return unifill__$Utf16_Utf16_$Impl_$.codePointAt(s,i);
};
unifill_Unifill.uCodePointAt = function(s,index) {
	return unifill_Unifill.uCharCodeAt(s,index);
};
unifill_Unifill.uIndexOf = function(s,value,startIndex) {
	if(startIndex == null) startIndex = 0;
	var index = s.indexOf(value,unifill_InternalEncoding.offsetByCodePoints(s,0,startIndex));
	if(index >= 0) return unifill__$Utf16_Utf16_$Impl_$.codePointCount(s,0,index); else return -1;
};
unifill_Unifill.uLastIndexOf = function(s,value,startIndex) {
	if(startIndex == null) startIndex = s.length - 1;
	var index = s.lastIndexOf(value,unifill_InternalEncoding.offsetByCodePoints(s,0,startIndex));
	if(index >= 0) return unifill__$Utf16_Utf16_$Impl_$.codePointCount(s,0,index); else return -1;
};
unifill_Unifill.uSplit = function(s,delimiter) {
	if(delimiter.length == 0) {
		var _g = [];
		var _g1_i = 0;
		var _g1_string = s;
		var _g1_index = 0;
		var _g1_endIndex = s.length;
		while(_g1_index < _g1_endIndex) {
			var i;
			_g1_i = _g1_index;
			_g1_index += unifill_InternalEncoding.codePointWidthAt(_g1_string,_g1_index);
			i = _g1_i;
			_g.push(unifill_InternalEncoding.charAt(s,i));
		}
		return _g;
	} else return s.split(delimiter);
};
unifill_Unifill.uSubstr = function(s,startIndex,length) {
	var si = unifill_InternalEncoding.offsetByCodePoints(s,startIndex >= 0?0:s.length,startIndex);
	var ei;
	if(length == null) ei = s.length; else if(length < 0) ei = si; else ei = unifill_InternalEncoding.offsetByCodePoints(s,si,length);
	return s.substring(si,ei);
};
unifill_Unifill.uSubstring = function(s,startIndex,endIndex) {
	var si;
	if(startIndex < 0) si = 0; else si = unifill_InternalEncoding.offsetByCodePoints(s,0,startIndex);
	var ei;
	if(endIndex == null) ei = s.length; else if(endIndex < 0) ei = 0; else ei = unifill_InternalEncoding.offsetByCodePoints(s,0,endIndex);
	return s.substring(si,ei);
};
unifill_Unifill.uIterator = function(s) {
	return new unifill_CodePointIter(s);
};
unifill_Unifill.uCompare = function(a,b) {
	var aiter_i = 0;
	var aiter_string = a;
	var aiter_index = 0;
	var aiter_endIndex = a.length;
	var biter_i = 0;
	var biter_string = b;
	var biter_index = 0;
	var biter_endIndex = b.length;
	while(aiter_index < aiter_endIndex && biter_index < biter_endIndex) {
		var acode = unifill_InternalEncoding.codePointAt(a,(function($this) {
			var $r;
			aiter_i = aiter_index;
			aiter_index += unifill_InternalEncoding.codePointWidthAt(aiter_string,aiter_index);
			$r = aiter_i;
			return $r;
		}(this)));
		var bcode = unifill_InternalEncoding.codePointAt(b,(function($this) {
			var $r;
			biter_i = biter_index;
			biter_index += unifill_InternalEncoding.codePointWidthAt(biter_string,biter_index);
			$r = biter_i;
			return $r;
		}(this)));
		if(acode < bcode) return -1;
		if(acode > bcode) return 1;
	}
	if(biter_index < biter_endIndex) return -1;
	if(aiter_index < aiter_endIndex) return 1;
	return 0;
};
unifill_Unifill.uToString = function(codePoints) {
	return unifill_InternalEncoding.fromCodePoints(codePoints);
};
unifill_Unifill.uAddChar = function(sb,c) {
	var c1 = c;
	if(c1 <= 65535) sb.b += String.fromCharCode(c1); else {
		sb.b += String.fromCharCode((c1 >> 10) + 55232);
		sb.b += String.fromCharCode(c1 & 1023 | 56320);
	}
};
var unifill__$Utf16_Utf16_$Impl_$ = {};
$hxClasses["unifill._Utf16.Utf16_Impl_"] = unifill__$Utf16_Utf16_$Impl_$;
unifill__$Utf16_Utf16_$Impl_$.__name__ = ["unifill","_Utf16","Utf16_Impl_"];
unifill__$Utf16_Utf16_$Impl_$.fromCodePoint = function(codePoint) {
	if(codePoint <= 65535) {
		var s;
		var s1 = String.fromCharCode(codePoint);
		s = s1;
		return s;
	} else {
		var s2;
		var s3 = String.fromCharCode((codePoint >> 10) + 55232) + String.fromCharCode(codePoint & 1023 | 56320);
		s2 = s3;
		return s2;
	}
};
unifill__$Utf16_Utf16_$Impl_$.fromCodePoints = function(codePoints) {
	var buf = new StringBuf();
	var $it0 = $iterator(codePoints)();
	while( $it0.hasNext() ) {
		var c = $it0.next();
		if(c <= 65535) buf.b += String.fromCharCode(c); else {
			buf.b += String.fromCharCode((c >> 10) + 55232);
			buf.b += String.fromCharCode(c & 1023 | 56320);
		}
	}
	return buf.b;
};
unifill__$Utf16_Utf16_$Impl_$.fromString = function(s) {
	return s;
};
unifill__$Utf16_Utf16_$Impl_$.fromArray = function(a) {
	var s;
	var buf_b = "";
	var _g = 0;
	while(_g < a.length) {
		var x = a[_g];
		++_g;
		buf_b += String.fromCharCode(x);
	}
	s = buf_b;
	return s;
};
unifill__$Utf16_Utf16_$Impl_$.encodeWith = function(f,c) {
	if(c <= 65535) f(c); else {
		f((c >> 10) + 55232);
		f(c & 1023 | 56320);
	}
};
unifill__$Utf16_Utf16_$Impl_$.codeUnitAt = function(this1,index) {
	return this1.charCodeAt(index);
};
unifill__$Utf16_Utf16_$Impl_$.codePointAt = function(this1,index) {
	return unifill__$Utf16_Utf16Impl.decode_code_point(this1.length,function(i) {
		return this1.charCodeAt(i);
	},index);
};
unifill__$Utf16_Utf16_$Impl_$.charAt = function(this1,index) {
	var s;
	var len;
	var c = this1.charCodeAt(index);
	if(!(55296 <= c && c <= 56319)) len = 1; else len = 2;
	var s1 = HxOverrides.substr(this1,index,len);
	s = s1;
	return s;
};
unifill__$Utf16_Utf16_$Impl_$.codePointCount = function(this1,beginIndex,endIndex) {
	var index = beginIndex;
	var i = 0;
	while(index < endIndex) {
		var c = this1.charCodeAt(index);
		if(!(55296 <= c && c <= 56319)) index += 1; else index += 2;
		++i;
	}
	return i;
};
unifill__$Utf16_Utf16_$Impl_$.codePointWidthAt = function(this1,index) {
	var c = this1.charCodeAt(index);
	if(!(55296 <= c && c <= 56319)) return 1; else return 2;
};
unifill__$Utf16_Utf16_$Impl_$.codePointWidthBefore = function(this1,index) {
	return unifill__$Utf16_Utf16Impl.find_prev_code_point(function(i) {
		return this1.charCodeAt(i);
	},index);
};
unifill__$Utf16_Utf16_$Impl_$.offsetByCodePoints = function(this1,index,codePointOffset) {
	if(codePointOffset >= 0) {
		var index1 = index;
		var len = this1.length;
		var i = 0;
		while(i < codePointOffset && index1 < len) {
			var c = this1.charCodeAt(index1);
			if(!(55296 <= c && c <= 56319)) index1 += 1; else index1 += 2;
			++i;
		}
		return index1;
	} else {
		var index2 = index;
		var count = 0;
		while(count < -codePointOffset && 0 < index2) {
			var this2 = [this1];
			index2 -= unifill__$Utf16_Utf16Impl.find_prev_code_point((function(this2) {
				return function(i1) {
					return this2[0].charCodeAt(i1);
				};
			})(this2),index2);
			++count;
		}
		return index2;
	}
};
unifill__$Utf16_Utf16_$Impl_$.substr = function(this1,index,len) {
	var s;
	var s1 = HxOverrides.substr(this1,index,len);
	s = s1;
	return s;
};
unifill__$Utf16_Utf16_$Impl_$.validate = function(this1) {
	var len = this1.length;
	var accessor = function(i) {
		return this1.charCodeAt(i);
	};
	var i1 = 0;
	while(i1 < len) {
		unifill__$Utf16_Utf16Impl.decode_code_point(len,accessor,i1);
		var c = this1.charCodeAt(i1);
		if(!(55296 <= c && c <= 56319)) i1 += 1; else i1 += 2;
	}
};
unifill__$Utf16_Utf16_$Impl_$.toString = function(this1) {
	return this1;
};
unifill__$Utf16_Utf16_$Impl_$.toArray = function(this1) {
	var i = 0;
	var len = this1.length;
	var _g = [];
	while(i < len) _g.push(StringTools.fastCodeAt(this1,i++));
	return _g;
};
unifill__$Utf16_Utf16_$Impl_$._new = function(s) {
	return s;
};
unifill__$Utf16_Utf16_$Impl_$.get_length = function(this1) {
	return this1.length;
};
unifill__$Utf16_Utf16_$Impl_$.forward_offset_by_code_points = function(this1,index,codePointOffset) {
	var len = this1.length;
	var i = 0;
	while(i < codePointOffset && index < len) {
		var c = this1.charCodeAt(index);
		if(!(55296 <= c && c <= 56319)) index += 1; else index += 2;
		++i;
	}
	return index;
};
unifill__$Utf16_Utf16_$Impl_$.backward_offset_by_code_points = function(this1,index,codePointOffset) {
	var count = 0;
	while(count < codePointOffset && 0 < index) {
		var this2 = [this1];
		index -= unifill__$Utf16_Utf16Impl.find_prev_code_point((function(this2) {
			return function(i) {
				return this2[0].charCodeAt(i);
			};
		})(this2),index);
		++count;
	}
	return index;
};
var unifill__$Utf16_Utf16Impl = function() { };
$hxClasses["unifill._Utf16.Utf16Impl"] = unifill__$Utf16_Utf16Impl;
unifill__$Utf16_Utf16Impl.__name__ = ["unifill","_Utf16","Utf16Impl"];
unifill__$Utf16_Utf16Impl.code_point_width = function(c) {
	if(!(55296 <= c && c <= 56319)) return 1; else return 2;
};
unifill__$Utf16_Utf16Impl.find_prev_code_point = function(accessor,index) {
	var c = accessor(index - 1);
	if(!(56320 <= c && c <= 57343)) return 1; else return 2;
};
unifill__$Utf16_Utf16Impl.encode_code_point = function(addUnit,codePoint) {
	if(codePoint <= 65535) addUnit(codePoint); else {
		addUnit((codePoint >> 10) + 55232);
		addUnit(codePoint & 1023 | 56320);
	}
};
unifill__$Utf16_Utf16Impl.decode_code_point = function(len,accessor,index) {
	if(index < 0 || len <= index) throw new js__$Boot_HaxeError(new unifill_InvalidCodeUnitSequence(index));
	var hi = accessor(index);
	if(55296 <= hi && hi <= 56319) {
		if(index + 1 < 0 || len <= index + 1) throw new js__$Boot_HaxeError(new unifill_InvalidCodeUnitSequence(index));
		var lo = accessor(index + 1);
		if(56320 <= lo && lo <= 57343) return hi - 55232 << 10 | lo & 1023; else throw new js__$Boot_HaxeError(new unifill_InvalidCodeUnitSequence(index));
	} else if(56320 <= hi && hi <= 57343) throw new js__$Boot_HaxeError(new unifill_InvalidCodeUnitSequence(index)); else return hi;
};
var unifill__$Utf16_StringU16Buffer_$Impl_$ = {};
$hxClasses["unifill._Utf16.StringU16Buffer_Impl_"] = unifill__$Utf16_StringU16Buffer_$Impl_$;
unifill__$Utf16_StringU16Buffer_$Impl_$.__name__ = ["unifill","_Utf16","StringU16Buffer_Impl_"];
unifill__$Utf16_StringU16Buffer_$Impl_$._new = function() {
	return new StringBuf();
};
unifill__$Utf16_StringU16Buffer_$Impl_$.addUnit = function(this1,unit) {
	this1.b += String.fromCharCode(unit);
};
unifill__$Utf16_StringU16Buffer_$Impl_$.getStringU16 = function(this1) {
	return this1.b;
};
var unifill__$Utf16_StringU16_$Impl_$ = {};
$hxClasses["unifill._Utf16.StringU16_Impl_"] = unifill__$Utf16_StringU16_$Impl_$;
unifill__$Utf16_StringU16_$Impl_$.__name__ = ["unifill","_Utf16","StringU16_Impl_"];
unifill__$Utf16_StringU16_$Impl_$.fromString = function(s) {
	return s;
};
unifill__$Utf16_StringU16_$Impl_$.fromCodeUnit = function(u) {
	var s = String.fromCharCode(u);
	return s;
};
unifill__$Utf16_StringU16_$Impl_$.fromTwoCodeUnits = function(u0,u1) {
	var s = String.fromCharCode(u0) + String.fromCharCode(u1);
	return s;
};
unifill__$Utf16_StringU16_$Impl_$.ofArray = function(a) {
	var buf_b = "";
	var _g = 0;
	while(_g < a.length) {
		var x = a[_g];
		++_g;
		buf_b += String.fromCharCode(x);
	}
	return buf_b;
};
unifill__$Utf16_StringU16_$Impl_$.fromArray = function(a) {
	var buf_b = "";
	var _g = 0;
	while(_g < a.length) {
		var x = a[_g];
		++_g;
		buf_b += String.fromCharCode(x);
	}
	return buf_b;
};
unifill__$Utf16_StringU16_$Impl_$.codeUnitAt = function(this1,index) {
	return this1.charCodeAt(index);
};
unifill__$Utf16_StringU16_$Impl_$.substr = function(this1,index,len) {
	var s = HxOverrides.substr(this1,index,len);
	return s;
};
unifill__$Utf16_StringU16_$Impl_$.toString = function(this1) {
	return this1;
};
unifill__$Utf16_StringU16_$Impl_$.toArray = function(this1) {
	var i = 0;
	var len = this1.length;
	var _g = [];
	while(i < len) _g.push(StringTools.fastCodeAt(this1,i++));
	return _g;
};
unifill__$Utf16_StringU16_$Impl_$._new = function(s) {
	return s;
};
unifill__$Utf16_StringU16_$Impl_$.get_length = function(this1) {
	return this1.length;
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
$hxClasses.Math = Math;
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
$hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
if(Array.prototype.filter == null) Array.prototype.filter = function(f1) {
	var a1 = [];
	var _g11 = 0;
	var _g2 = this.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		var e = this[i1];
		if(f1(e)) a1.push(e);
	}
	return a1;
};
var __map_reserved = {}
var ArrayBuffer = $global.ArrayBuffer || js_html_compat_ArrayBuffer;
if(ArrayBuffer.prototype.slice == null) ArrayBuffer.prototype.slice = js_html_compat_ArrayBuffer.sliceImpl;
var DataView = $global.DataView || js_html_compat_DataView;
var Uint8Array = $global.Uint8Array || js_html_compat_Uint8Array._new;
var this1;
this1 = new Uint32Array(256);
lime_math_color__$RGBA_RGBA_$Impl_$.__alpha16 = this1;
var _g = 0;
while(_g < 256) {
	var i = _g++;
	var val = Math.ceil(i * 257.00392156862745);
	lime_math_color__$RGBA_RGBA_$Impl_$.__alpha16[i] = val;
}
var this2;
this2 = new Uint8Array(510);
lime_math_color__$RGBA_RGBA_$Impl_$.__clamp = this2;
var _g1 = 0;
while(_g1 < 255) {
	var i1 = _g1++;
	lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[i1] = i1;
}
var _g11 = 255;
var _g2 = 511;
while(_g11 < _g2) {
	var i2 = _g11++;
	lime_math_color__$RGBA_RGBA_$Impl_$.__clamp[i2] = 255;
}
lime_system_CFFI.available = false;
lime_system_CFFI.enabled = false;
format_tools__$InflateImpl_Window.SIZE = 32768;
format_tools__$InflateImpl_Window.BUFSIZE = 65536;
format_tools_InflateImpl.LEN_EXTRA_BITS_TBL = [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,-1,-1];
format_tools_InflateImpl.LEN_BASE_VAL_TBL = [3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258];
format_tools_InflateImpl.DIST_EXTRA_BITS_TBL = [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,-1,-1];
format_tools_InflateImpl.DIST_BASE_VAL_TBL = [1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577];
format_tools_InflateImpl.CODE_LENGTHS_POS = [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];
haxe_Serializer.USE_CACHE = false;
haxe_Serializer.USE_ENUM_INDEX = false;
haxe_Serializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe_Unserializer.DEFAULT_RESOLVER = Type;
haxe_Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe_ds_ObjectMap.count = 0;
haxe_io_FPHelper.i64tmp = (function($this) {
	var $r;
	var x = new haxe__$Int64__$_$_$Int64(0,0);
	$r = x;
	return $r;
}(this));
haxe_zip_InflateImpl.LEN_EXTRA_BITS_TBL = [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,-1,-1];
haxe_zip_InflateImpl.LEN_BASE_VAL_TBL = [3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258];
haxe_zip_InflateImpl.DIST_EXTRA_BITS_TBL = [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,-1,-1];
haxe_zip_InflateImpl.DIST_BASE_VAL_TBL = [1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577];
haxe_zip_InflateImpl.CODE_LENGTHS_POS = [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];
js_Boot.__toStr = {}.toString;
js_html_compat_Uint8Array.BYTES_PER_ELEMENT = 1;
lime_Assets.cache = new lime_AssetCache();
lime_Assets.libraries = new haxe_ds_StringMap();
lime_Assets.onChange = new lime_app_Event_$Void_$Void();
lime_Assets.initialized = false;
lime__$backend_html5_HTML5Window.windowID = 0;
lime_app_Preloader.images = new haxe_ds_StringMap();
lime_app_Preloader.loaders = new haxe_ds_StringMap();
lime_audio_openal_AL.NONE = 0;
lime_audio_openal_AL.FALSE = 0;
lime_audio_openal_AL.TRUE = 1;
lime_audio_openal_AL.SOURCE_RELATIVE = 514;
lime_audio_openal_AL.CONE_INNER_ANGLE = 4097;
lime_audio_openal_AL.CONE_OUTER_ANGLE = 4098;
lime_audio_openal_AL.PITCH = 4099;
lime_audio_openal_AL.POSITION = 4100;
lime_audio_openal_AL.DIRECTION = 4101;
lime_audio_openal_AL.VELOCITY = 4102;
lime_audio_openal_AL.LOOPING = 4103;
lime_audio_openal_AL.BUFFER = 4105;
lime_audio_openal_AL.GAIN = 4106;
lime_audio_openal_AL.MIN_GAIN = 4109;
lime_audio_openal_AL.MAX_GAIN = 4110;
lime_audio_openal_AL.ORIENTATION = 4111;
lime_audio_openal_AL.SOURCE_STATE = 4112;
lime_audio_openal_AL.INITIAL = 4113;
lime_audio_openal_AL.PLAYING = 4114;
lime_audio_openal_AL.PAUSED = 4115;
lime_audio_openal_AL.STOPPED = 4116;
lime_audio_openal_AL.BUFFERS_QUEUED = 4117;
lime_audio_openal_AL.BUFFERS_PROCESSED = 4118;
lime_audio_openal_AL.REFERENCE_DISTANCE = 4128;
lime_audio_openal_AL.ROLLOFF_FACTOR = 4129;
lime_audio_openal_AL.CONE_OUTER_GAIN = 4130;
lime_audio_openal_AL.MAX_DISTANCE = 4131;
lime_audio_openal_AL.SEC_OFFSET = 4132;
lime_audio_openal_AL.SAMPLE_OFFSET = 4133;
lime_audio_openal_AL.BYTE_OFFSET = 4134;
lime_audio_openal_AL.SOURCE_TYPE = 4135;
lime_audio_openal_AL.STATIC = 4136;
lime_audio_openal_AL.STREAMING = 4137;
lime_audio_openal_AL.UNDETERMINED = 4144;
lime_audio_openal_AL.FORMAT_MONO8 = 4352;
lime_audio_openal_AL.FORMAT_MONO16 = 4353;
lime_audio_openal_AL.FORMAT_STEREO8 = 4354;
lime_audio_openal_AL.FORMAT_STEREO16 = 4355;
lime_audio_openal_AL.FREQUENCY = 8193;
lime_audio_openal_AL.BITS = 8194;
lime_audio_openal_AL.CHANNELS = 8195;
lime_audio_openal_AL.SIZE = 8196;
lime_audio_openal_AL.NO_ERROR = 0;
lime_audio_openal_AL.INVALID_NAME = 40961;
lime_audio_openal_AL.INVALID_ENUM = 40962;
lime_audio_openal_AL.INVALID_VALUE = 40963;
lime_audio_openal_AL.INVALID_OPERATION = 40964;
lime_audio_openal_AL.OUT_OF_MEMORY = 40965;
lime_audio_openal_AL.VENDOR = 45057;
lime_audio_openal_AL.VERSION = 45058;
lime_audio_openal_AL.RENDERER = 45059;
lime_audio_openal_AL.EXTENSIONS = 45060;
lime_audio_openal_AL.DOPPLER_FACTOR = 49152;
lime_audio_openal_AL.SPEED_OF_SOUND = 49155;
lime_audio_openal_AL.DOPPLER_VELOCITY = 49153;
lime_audio_openal_AL.DISTANCE_MODEL = 53248;
lime_audio_openal_AL.INVERSE_DISTANCE = 53249;
lime_audio_openal_AL.INVERSE_DISTANCE_CLAMPED = 53250;
lime_audio_openal_AL.LINEAR_DISTANCE = 53251;
lime_audio_openal_AL.LINEAR_DISTANCE_CLAMPED = 53252;
lime_audio_openal_AL.EXPONENT_DISTANCE = 53253;
lime_audio_openal_AL.EXPONENT_DISTANCE_CLAMPED = 53254;
lime_audio_openal_ALC.FALSE = 0;
lime_audio_openal_ALC.TRUE = 1;
lime_audio_openal_ALC.FREQUENCY = 4103;
lime_audio_openal_ALC.REFRESH = 4104;
lime_audio_openal_ALC.SYNC = 4105;
lime_audio_openal_ALC.MONO_SOURCES = 4112;
lime_audio_openal_ALC.STEREO_SOURCES = 4113;
lime_audio_openal_ALC.NO_ERROR = 0;
lime_audio_openal_ALC.INVALID_DEVICE = 40961;
lime_audio_openal_ALC.INVALID_CONTEXT = 40962;
lime_audio_openal_ALC.INVALID_ENUM = 40963;
lime_audio_openal_ALC.INVALID_VALUE = 40964;
lime_audio_openal_ALC.OUT_OF_MEMORY = 40965;
lime_audio_openal_ALC.ATTRIBUTES_SIZE = 4098;
lime_audio_openal_ALC.ALL_ATTRIBUTES = 4099;
lime_audio_openal_ALC.DEFAULT_DEVICE_SPECIFIER = 4100;
lime_audio_openal_ALC.DEVICE_SPECIFIER = 4101;
lime_audio_openal_ALC.EXTENSIONS = 4102;
lime_audio_openal_ALC.ENUMERATE_ALL_EXT = 1;
lime_audio_openal_ALC.DEFAULT_ALL_DEVICES_SPECIFIER = 4114;
lime_audio_openal_ALC.ALL_DEVICES_SPECIFIER = 4115;
lime_graphics_Image.__base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
lime_graphics_opengl_GL.DEPTH_BUFFER_BIT = 256;
lime_graphics_opengl_GL.STENCIL_BUFFER_BIT = 1024;
lime_graphics_opengl_GL.COLOR_BUFFER_BIT = 16384;
lime_graphics_opengl_GL.POINTS = 0;
lime_graphics_opengl_GL.LINES = 1;
lime_graphics_opengl_GL.LINE_LOOP = 2;
lime_graphics_opengl_GL.LINE_STRIP = 3;
lime_graphics_opengl_GL.TRIANGLES = 4;
lime_graphics_opengl_GL.TRIANGLE_STRIP = 5;
lime_graphics_opengl_GL.TRIANGLE_FAN = 6;
lime_graphics_opengl_GL.ZERO = 0;
lime_graphics_opengl_GL.ONE = 1;
lime_graphics_opengl_GL.SRC_COLOR = 768;
lime_graphics_opengl_GL.ONE_MINUS_SRC_COLOR = 769;
lime_graphics_opengl_GL.SRC_ALPHA = 770;
lime_graphics_opengl_GL.ONE_MINUS_SRC_ALPHA = 771;
lime_graphics_opengl_GL.DST_ALPHA = 772;
lime_graphics_opengl_GL.ONE_MINUS_DST_ALPHA = 773;
lime_graphics_opengl_GL.DST_COLOR = 774;
lime_graphics_opengl_GL.ONE_MINUS_DST_COLOR = 775;
lime_graphics_opengl_GL.SRC_ALPHA_SATURATE = 776;
lime_graphics_opengl_GL.FUNC_ADD = 32774;
lime_graphics_opengl_GL.BLEND_EQUATION = 32777;
lime_graphics_opengl_GL.BLEND_EQUATION_RGB = 32777;
lime_graphics_opengl_GL.BLEND_EQUATION_ALPHA = 34877;
lime_graphics_opengl_GL.FUNC_SUBTRACT = 32778;
lime_graphics_opengl_GL.FUNC_REVERSE_SUBTRACT = 32779;
lime_graphics_opengl_GL.BLEND_DST_RGB = 32968;
lime_graphics_opengl_GL.BLEND_SRC_RGB = 32969;
lime_graphics_opengl_GL.BLEND_DST_ALPHA = 32970;
lime_graphics_opengl_GL.BLEND_SRC_ALPHA = 32971;
lime_graphics_opengl_GL.CONSTANT_COLOR = 32769;
lime_graphics_opengl_GL.ONE_MINUS_CONSTANT_COLOR = 32770;
lime_graphics_opengl_GL.CONSTANT_ALPHA = 32771;
lime_graphics_opengl_GL.ONE_MINUS_CONSTANT_ALPHA = 32772;
lime_graphics_opengl_GL.BLEND_COLOR = 32773;
lime_graphics_opengl_GL.ARRAY_BUFFER = 34962;
lime_graphics_opengl_GL.ELEMENT_ARRAY_BUFFER = 34963;
lime_graphics_opengl_GL.ARRAY_BUFFER_BINDING = 34964;
lime_graphics_opengl_GL.ELEMENT_ARRAY_BUFFER_BINDING = 34965;
lime_graphics_opengl_GL.STREAM_DRAW = 35040;
lime_graphics_opengl_GL.STATIC_DRAW = 35044;
lime_graphics_opengl_GL.DYNAMIC_DRAW = 35048;
lime_graphics_opengl_GL.BUFFER_SIZE = 34660;
lime_graphics_opengl_GL.BUFFER_USAGE = 34661;
lime_graphics_opengl_GL.CURRENT_VERTEX_ATTRIB = 34342;
lime_graphics_opengl_GL.FRONT = 1028;
lime_graphics_opengl_GL.BACK = 1029;
lime_graphics_opengl_GL.FRONT_AND_BACK = 1032;
lime_graphics_opengl_GL.CULL_FACE = 2884;
lime_graphics_opengl_GL.BLEND = 3042;
lime_graphics_opengl_GL.DITHER = 3024;
lime_graphics_opengl_GL.STENCIL_TEST = 2960;
lime_graphics_opengl_GL.DEPTH_TEST = 2929;
lime_graphics_opengl_GL.SCISSOR_TEST = 3089;
lime_graphics_opengl_GL.POLYGON_OFFSET_FILL = 32823;
lime_graphics_opengl_GL.SAMPLE_ALPHA_TO_COVERAGE = 32926;
lime_graphics_opengl_GL.SAMPLE_COVERAGE = 32928;
lime_graphics_opengl_GL.NO_ERROR = 0;
lime_graphics_opengl_GL.INVALID_ENUM = 1280;
lime_graphics_opengl_GL.INVALID_VALUE = 1281;
lime_graphics_opengl_GL.INVALID_OPERATION = 1282;
lime_graphics_opengl_GL.OUT_OF_MEMORY = 1285;
lime_graphics_opengl_GL.CW = 2304;
lime_graphics_opengl_GL.CCW = 2305;
lime_graphics_opengl_GL.LINE_WIDTH = 2849;
lime_graphics_opengl_GL.ALIASED_POINT_SIZE_RANGE = 33901;
lime_graphics_opengl_GL.ALIASED_LINE_WIDTH_RANGE = 33902;
lime_graphics_opengl_GL.CULL_FACE_MODE = 2885;
lime_graphics_opengl_GL.FRONT_FACE = 2886;
lime_graphics_opengl_GL.DEPTH_RANGE = 2928;
lime_graphics_opengl_GL.DEPTH_WRITEMASK = 2930;
lime_graphics_opengl_GL.DEPTH_CLEAR_VALUE = 2931;
lime_graphics_opengl_GL.DEPTH_FUNC = 2932;
lime_graphics_opengl_GL.STENCIL_CLEAR_VALUE = 2961;
lime_graphics_opengl_GL.STENCIL_FUNC = 2962;
lime_graphics_opengl_GL.STENCIL_FAIL = 2964;
lime_graphics_opengl_GL.STENCIL_PASS_DEPTH_FAIL = 2965;
lime_graphics_opengl_GL.STENCIL_PASS_DEPTH_PASS = 2966;
lime_graphics_opengl_GL.STENCIL_REF = 2967;
lime_graphics_opengl_GL.STENCIL_VALUE_MASK = 2963;
lime_graphics_opengl_GL.STENCIL_WRITEMASK = 2968;
lime_graphics_opengl_GL.STENCIL_BACK_FUNC = 34816;
lime_graphics_opengl_GL.STENCIL_BACK_FAIL = 34817;
lime_graphics_opengl_GL.STENCIL_BACK_PASS_DEPTH_FAIL = 34818;
lime_graphics_opengl_GL.STENCIL_BACK_PASS_DEPTH_PASS = 34819;
lime_graphics_opengl_GL.STENCIL_BACK_REF = 36003;
lime_graphics_opengl_GL.STENCIL_BACK_VALUE_MASK = 36004;
lime_graphics_opengl_GL.STENCIL_BACK_WRITEMASK = 36005;
lime_graphics_opengl_GL.VIEWPORT = 2978;
lime_graphics_opengl_GL.SCISSOR_BOX = 3088;
lime_graphics_opengl_GL.COLOR_CLEAR_VALUE = 3106;
lime_graphics_opengl_GL.COLOR_WRITEMASK = 3107;
lime_graphics_opengl_GL.UNPACK_ALIGNMENT = 3317;
lime_graphics_opengl_GL.PACK_ALIGNMENT = 3333;
lime_graphics_opengl_GL.MAX_TEXTURE_SIZE = 3379;
lime_graphics_opengl_GL.MAX_VIEWPORT_DIMS = 3386;
lime_graphics_opengl_GL.SUBPIXEL_BITS = 3408;
lime_graphics_opengl_GL.RED_BITS = 3410;
lime_graphics_opengl_GL.GREEN_BITS = 3411;
lime_graphics_opengl_GL.BLUE_BITS = 3412;
lime_graphics_opengl_GL.ALPHA_BITS = 3413;
lime_graphics_opengl_GL.DEPTH_BITS = 3414;
lime_graphics_opengl_GL.STENCIL_BITS = 3415;
lime_graphics_opengl_GL.POLYGON_OFFSET_UNITS = 10752;
lime_graphics_opengl_GL.POLYGON_OFFSET_FACTOR = 32824;
lime_graphics_opengl_GL.TEXTURE_BINDING_2D = 32873;
lime_graphics_opengl_GL.SAMPLE_BUFFERS = 32936;
lime_graphics_opengl_GL.SAMPLES = 32937;
lime_graphics_opengl_GL.SAMPLE_COVERAGE_VALUE = 32938;
lime_graphics_opengl_GL.SAMPLE_COVERAGE_INVERT = 32939;
lime_graphics_opengl_GL.COMPRESSED_TEXTURE_FORMATS = 34467;
lime_graphics_opengl_GL.DONT_CARE = 4352;
lime_graphics_opengl_GL.FASTEST = 4353;
lime_graphics_opengl_GL.NICEST = 4354;
lime_graphics_opengl_GL.GENERATE_MIPMAP_HINT = 33170;
lime_graphics_opengl_GL.BYTE = 5120;
lime_graphics_opengl_GL.UNSIGNED_BYTE = 5121;
lime_graphics_opengl_GL.SHORT = 5122;
lime_graphics_opengl_GL.UNSIGNED_SHORT = 5123;
lime_graphics_opengl_GL.INT = 5124;
lime_graphics_opengl_GL.UNSIGNED_INT = 5125;
lime_graphics_opengl_GL.FLOAT = 5126;
lime_graphics_opengl_GL.DEPTH_COMPONENT = 6402;
lime_graphics_opengl_GL.ALPHA = 6406;
lime_graphics_opengl_GL.RGB = 6407;
lime_graphics_opengl_GL.RGBA = 6408;
lime_graphics_opengl_GL.BGR_EXT = 32992;
lime_graphics_opengl_GL.BGRA_EXT = 32993;
lime_graphics_opengl_GL.LUMINANCE = 6409;
lime_graphics_opengl_GL.LUMINANCE_ALPHA = 6410;
lime_graphics_opengl_GL.UNSIGNED_SHORT_4_4_4_4 = 32819;
lime_graphics_opengl_GL.UNSIGNED_SHORT_5_5_5_1 = 32820;
lime_graphics_opengl_GL.UNSIGNED_SHORT_5_6_5 = 33635;
lime_graphics_opengl_GL.FRAGMENT_SHADER = 35632;
lime_graphics_opengl_GL.VERTEX_SHADER = 35633;
lime_graphics_opengl_GL.MAX_VERTEX_ATTRIBS = 34921;
lime_graphics_opengl_GL.MAX_VERTEX_UNIFORM_VECTORS = 36347;
lime_graphics_opengl_GL.MAX_VARYING_VECTORS = 36348;
lime_graphics_opengl_GL.MAX_COMBINED_TEXTURE_IMAGE_UNITS = 35661;
lime_graphics_opengl_GL.MAX_VERTEX_TEXTURE_IMAGE_UNITS = 35660;
lime_graphics_opengl_GL.MAX_TEXTURE_IMAGE_UNITS = 34930;
lime_graphics_opengl_GL.MAX_FRAGMENT_UNIFORM_VECTORS = 36349;
lime_graphics_opengl_GL.SHADER_TYPE = 35663;
lime_graphics_opengl_GL.DELETE_STATUS = 35712;
lime_graphics_opengl_GL.LINK_STATUS = 35714;
lime_graphics_opengl_GL.VALIDATE_STATUS = 35715;
lime_graphics_opengl_GL.ATTACHED_SHADERS = 35717;
lime_graphics_opengl_GL.ACTIVE_UNIFORMS = 35718;
lime_graphics_opengl_GL.ACTIVE_ATTRIBUTES = 35721;
lime_graphics_opengl_GL.SHADING_LANGUAGE_VERSION = 35724;
lime_graphics_opengl_GL.CURRENT_PROGRAM = 35725;
lime_graphics_opengl_GL.NEVER = 512;
lime_graphics_opengl_GL.LESS = 513;
lime_graphics_opengl_GL.EQUAL = 514;
lime_graphics_opengl_GL.LEQUAL = 515;
lime_graphics_opengl_GL.GREATER = 516;
lime_graphics_opengl_GL.NOTEQUAL = 517;
lime_graphics_opengl_GL.GEQUAL = 518;
lime_graphics_opengl_GL.ALWAYS = 519;
lime_graphics_opengl_GL.KEEP = 7680;
lime_graphics_opengl_GL.REPLACE = 7681;
lime_graphics_opengl_GL.INCR = 7682;
lime_graphics_opengl_GL.DECR = 7683;
lime_graphics_opengl_GL.INVERT = 5386;
lime_graphics_opengl_GL.INCR_WRAP = 34055;
lime_graphics_opengl_GL.DECR_WRAP = 34056;
lime_graphics_opengl_GL.VENDOR = 7936;
lime_graphics_opengl_GL.RENDERER = 7937;
lime_graphics_opengl_GL.VERSION = 7938;
lime_graphics_opengl_GL.NEAREST = 9728;
lime_graphics_opengl_GL.LINEAR = 9729;
lime_graphics_opengl_GL.NEAREST_MIPMAP_NEAREST = 9984;
lime_graphics_opengl_GL.LINEAR_MIPMAP_NEAREST = 9985;
lime_graphics_opengl_GL.NEAREST_MIPMAP_LINEAR = 9986;
lime_graphics_opengl_GL.LINEAR_MIPMAP_LINEAR = 9987;
lime_graphics_opengl_GL.TEXTURE_MAG_FILTER = 10240;
lime_graphics_opengl_GL.TEXTURE_MIN_FILTER = 10241;
lime_graphics_opengl_GL.TEXTURE_WRAP_S = 10242;
lime_graphics_opengl_GL.TEXTURE_WRAP_T = 10243;
lime_graphics_opengl_GL.TEXTURE_2D = 3553;
lime_graphics_opengl_GL.TEXTURE = 5890;
lime_graphics_opengl_GL.TEXTURE_CUBE_MAP = 34067;
lime_graphics_opengl_GL.TEXTURE_BINDING_CUBE_MAP = 34068;
lime_graphics_opengl_GL.TEXTURE_CUBE_MAP_POSITIVE_X = 34069;
lime_graphics_opengl_GL.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070;
lime_graphics_opengl_GL.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071;
lime_graphics_opengl_GL.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072;
lime_graphics_opengl_GL.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073;
lime_graphics_opengl_GL.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074;
lime_graphics_opengl_GL.MAX_CUBE_MAP_TEXTURE_SIZE = 34076;
lime_graphics_opengl_GL.TEXTURE0 = 33984;
lime_graphics_opengl_GL.TEXTURE1 = 33985;
lime_graphics_opengl_GL.TEXTURE2 = 33986;
lime_graphics_opengl_GL.TEXTURE3 = 33987;
lime_graphics_opengl_GL.TEXTURE4 = 33988;
lime_graphics_opengl_GL.TEXTURE5 = 33989;
lime_graphics_opengl_GL.TEXTURE6 = 33990;
lime_graphics_opengl_GL.TEXTURE7 = 33991;
lime_graphics_opengl_GL.TEXTURE8 = 33992;
lime_graphics_opengl_GL.TEXTURE9 = 33993;
lime_graphics_opengl_GL.TEXTURE10 = 33994;
lime_graphics_opengl_GL.TEXTURE11 = 33995;
lime_graphics_opengl_GL.TEXTURE12 = 33996;
lime_graphics_opengl_GL.TEXTURE13 = 33997;
lime_graphics_opengl_GL.TEXTURE14 = 33998;
lime_graphics_opengl_GL.TEXTURE15 = 33999;
lime_graphics_opengl_GL.TEXTURE16 = 34000;
lime_graphics_opengl_GL.TEXTURE17 = 34001;
lime_graphics_opengl_GL.TEXTURE18 = 34002;
lime_graphics_opengl_GL.TEXTURE19 = 34003;
lime_graphics_opengl_GL.TEXTURE20 = 34004;
lime_graphics_opengl_GL.TEXTURE21 = 34005;
lime_graphics_opengl_GL.TEXTURE22 = 34006;
lime_graphics_opengl_GL.TEXTURE23 = 34007;
lime_graphics_opengl_GL.TEXTURE24 = 34008;
lime_graphics_opengl_GL.TEXTURE25 = 34009;
lime_graphics_opengl_GL.TEXTURE26 = 34010;
lime_graphics_opengl_GL.TEXTURE27 = 34011;
lime_graphics_opengl_GL.TEXTURE28 = 34012;
lime_graphics_opengl_GL.TEXTURE29 = 34013;
lime_graphics_opengl_GL.TEXTURE30 = 34014;
lime_graphics_opengl_GL.TEXTURE31 = 34015;
lime_graphics_opengl_GL.ACTIVE_TEXTURE = 34016;
lime_graphics_opengl_GL.REPEAT = 10497;
lime_graphics_opengl_GL.CLAMP_TO_EDGE = 33071;
lime_graphics_opengl_GL.MIRRORED_REPEAT = 33648;
lime_graphics_opengl_GL.FLOAT_VEC2 = 35664;
lime_graphics_opengl_GL.FLOAT_VEC3 = 35665;
lime_graphics_opengl_GL.FLOAT_VEC4 = 35666;
lime_graphics_opengl_GL.INT_VEC2 = 35667;
lime_graphics_opengl_GL.INT_VEC3 = 35668;
lime_graphics_opengl_GL.INT_VEC4 = 35669;
lime_graphics_opengl_GL.BOOL = 35670;
lime_graphics_opengl_GL.BOOL_VEC2 = 35671;
lime_graphics_opengl_GL.BOOL_VEC3 = 35672;
lime_graphics_opengl_GL.BOOL_VEC4 = 35673;
lime_graphics_opengl_GL.FLOAT_MAT2 = 35674;
lime_graphics_opengl_GL.FLOAT_MAT3 = 35675;
lime_graphics_opengl_GL.FLOAT_MAT4 = 35676;
lime_graphics_opengl_GL.SAMPLER_2D = 35678;
lime_graphics_opengl_GL.SAMPLER_CUBE = 35680;
lime_graphics_opengl_GL.VERTEX_ATTRIB_ARRAY_ENABLED = 34338;
lime_graphics_opengl_GL.VERTEX_ATTRIB_ARRAY_SIZE = 34339;
lime_graphics_opengl_GL.VERTEX_ATTRIB_ARRAY_STRIDE = 34340;
lime_graphics_opengl_GL.VERTEX_ATTRIB_ARRAY_TYPE = 34341;
lime_graphics_opengl_GL.VERTEX_ATTRIB_ARRAY_NORMALIZED = 34922;
lime_graphics_opengl_GL.VERTEX_ATTRIB_ARRAY_POINTER = 34373;
lime_graphics_opengl_GL.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING = 34975;
lime_graphics_opengl_GL.VERTEX_PROGRAM_POINT_SIZE = 34370;
lime_graphics_opengl_GL.POINT_SPRITE = 34913;
lime_graphics_opengl_GL.COMPILE_STATUS = 35713;
lime_graphics_opengl_GL.LOW_FLOAT = 36336;
lime_graphics_opengl_GL.MEDIUM_FLOAT = 36337;
lime_graphics_opengl_GL.HIGH_FLOAT = 36338;
lime_graphics_opengl_GL.LOW_INT = 36339;
lime_graphics_opengl_GL.MEDIUM_INT = 36340;
lime_graphics_opengl_GL.HIGH_INT = 36341;
lime_graphics_opengl_GL.FRAMEBUFFER = 36160;
lime_graphics_opengl_GL.RENDERBUFFER = 36161;
lime_graphics_opengl_GL.RGBA4 = 32854;
lime_graphics_opengl_GL.RGB5_A1 = 32855;
lime_graphics_opengl_GL.RGB565 = 36194;
lime_graphics_opengl_GL.DEPTH_COMPONENT16 = 33189;
lime_graphics_opengl_GL.STENCIL_INDEX = 6401;
lime_graphics_opengl_GL.STENCIL_INDEX8 = 36168;
lime_graphics_opengl_GL.DEPTH_STENCIL = 34041;
lime_graphics_opengl_GL.RENDERBUFFER_WIDTH = 36162;
lime_graphics_opengl_GL.RENDERBUFFER_HEIGHT = 36163;
lime_graphics_opengl_GL.RENDERBUFFER_INTERNAL_FORMAT = 36164;
lime_graphics_opengl_GL.RENDERBUFFER_RED_SIZE = 36176;
lime_graphics_opengl_GL.RENDERBUFFER_GREEN_SIZE = 36177;
lime_graphics_opengl_GL.RENDERBUFFER_BLUE_SIZE = 36178;
lime_graphics_opengl_GL.RENDERBUFFER_ALPHA_SIZE = 36179;
lime_graphics_opengl_GL.RENDERBUFFER_DEPTH_SIZE = 36180;
lime_graphics_opengl_GL.RENDERBUFFER_STENCIL_SIZE = 36181;
lime_graphics_opengl_GL.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE = 36048;
lime_graphics_opengl_GL.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME = 36049;
lime_graphics_opengl_GL.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL = 36050;
lime_graphics_opengl_GL.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = 36051;
lime_graphics_opengl_GL.COLOR_ATTACHMENT0 = 36064;
lime_graphics_opengl_GL.DEPTH_ATTACHMENT = 36096;
lime_graphics_opengl_GL.STENCIL_ATTACHMENT = 36128;
lime_graphics_opengl_GL.DEPTH_STENCIL_ATTACHMENT = 33306;
lime_graphics_opengl_GL.NONE = 0;
lime_graphics_opengl_GL.FRAMEBUFFER_COMPLETE = 36053;
lime_graphics_opengl_GL.FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 36054;
lime_graphics_opengl_GL.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 36055;
lime_graphics_opengl_GL.FRAMEBUFFER_INCOMPLETE_DIMENSIONS = 36057;
lime_graphics_opengl_GL.FRAMEBUFFER_UNSUPPORTED = 36061;
lime_graphics_opengl_GL.FRAMEBUFFER_BINDING = 36006;
lime_graphics_opengl_GL.RENDERBUFFER_BINDING = 36007;
lime_graphics_opengl_GL.MAX_RENDERBUFFER_SIZE = 34024;
lime_graphics_opengl_GL.INVALID_FRAMEBUFFER_OPERATION = 1286;
lime_graphics_opengl_GL.UNPACK_FLIP_Y_WEBGL = 37440;
lime_graphics_opengl_GL.UNPACK_PREMULTIPLY_ALPHA_WEBGL = 37441;
lime_graphics_opengl_GL.CONTEXT_LOST_WEBGL = 37442;
lime_graphics_opengl_GL.UNPACK_COLORSPACE_CONVERSION_WEBGL = 37443;
lime_graphics_opengl_GL.BROWSER_DEFAULT_WEBGL = 37444;
lime_math__$ColorMatrix_ColorMatrix_$Impl_$.__identity = [1.0,0.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,0.0,1.0,0.0];
lime_math_Matrix3.__identity = new lime_math_Matrix3();
lime_math__$Matrix4_Matrix4_$Impl_$.__identity = [1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0];
lime_net_curl__$CURL_CURL_$Impl_$.GLOBAL_SSL = 1;
lime_net_curl__$CURL_CURL_$Impl_$.GLOBAL_WIN32 = 2;
lime_net_curl__$CURL_CURL_$Impl_$.GLOBAL_ALL = 3;
lime_net_curl__$CURL_CURL_$Impl_$.GLOBAL_NOTHING = 0;
lime_net_curl__$CURL_CURL_$Impl_$.GLOBAL_DEFAULT = 3;
lime_net_curl__$CURL_CURL_$Impl_$.GLOBAL_ACK_EINTR = 4;
lime_system_BackgroundWorker.MESSAGE_COMPLETE = "__COMPLETE__";
lime_system_BackgroundWorker.MESSAGE_ERROR = "__ERROR__";
lime_ui_Gamepad.devices = new haxe_ds_IntMap();
lime_ui_Gamepad.onConnect = new lime_app_Event_$lime_$ui_$Gamepad_$Void();
lime_ui__$GamepadAxis_GamepadAxis_$Impl_$.LEFT_X = 0;
lime_ui__$GamepadAxis_GamepadAxis_$Impl_$.LEFT_Y = 1;
lime_ui__$GamepadAxis_GamepadAxis_$Impl_$.RIGHT_X = 2;
lime_ui__$GamepadAxis_GamepadAxis_$Impl_$.RIGHT_Y = 3;
lime_ui__$GamepadAxis_GamepadAxis_$Impl_$.TRIGGER_LEFT = 4;
lime_ui__$GamepadAxis_GamepadAxis_$Impl_$.TRIGGER_RIGHT = 5;
lime_ui__$GamepadButton_GamepadButton_$Impl_$.A = 0;
lime_ui__$GamepadButton_GamepadButton_$Impl_$.B = 1;
lime_ui__$GamepadButton_GamepadButton_$Impl_$.X = 2;
lime_ui__$GamepadButton_GamepadButton_$Impl_$.Y = 3;
lime_ui__$GamepadButton_GamepadButton_$Impl_$.BACK = 4;
lime_ui__$GamepadButton_GamepadButton_$Impl_$.GUIDE = 5;
lime_ui__$GamepadButton_GamepadButton_$Impl_$.START = 6;
lime_ui__$GamepadButton_GamepadButton_$Impl_$.LEFT_STICK = 7;
lime_ui__$GamepadButton_GamepadButton_$Impl_$.RIGHT_STICK = 8;
lime_ui__$GamepadButton_GamepadButton_$Impl_$.LEFT_SHOULDER = 9;
lime_ui__$GamepadButton_GamepadButton_$Impl_$.RIGHT_SHOULDER = 10;
lime_ui__$GamepadButton_GamepadButton_$Impl_$.DPAD_UP = 11;
lime_ui__$GamepadButton_GamepadButton_$Impl_$.DPAD_DOWN = 12;
lime_ui__$GamepadButton_GamepadButton_$Impl_$.DPAD_LEFT = 13;
lime_ui__$GamepadButton_GamepadButton_$Impl_$.DPAD_RIGHT = 14;
lime_ui_Joystick.devices = new haxe_ds_IntMap();
lime_ui_Joystick.onConnect = new lime_app_Event_$lime_$ui_$Joystick_$Void();
lime_ui__$JoystickHatPosition_JoystickHatPosition_$Impl_$.CENTER = 0;
lime_ui__$JoystickHatPosition_JoystickHatPosition_$Impl_$.DOWN = 4;
lime_ui__$JoystickHatPosition_JoystickHatPosition_$Impl_$.LEFT = 8;
lime_ui__$JoystickHatPosition_JoystickHatPosition_$Impl_$.RIGHT = 2;
lime_ui__$JoystickHatPosition_JoystickHatPosition_$Impl_$.UP = 1;
lime_ui__$JoystickHatPosition_JoystickHatPosition_$Impl_$.DOWN_LEFT = 12;
lime_ui__$JoystickHatPosition_JoystickHatPosition_$Impl_$.DOWN_RIGHT = 6;
lime_ui__$JoystickHatPosition_JoystickHatPosition_$Impl_$.UP_LEFT = 9;
lime_ui__$JoystickHatPosition_JoystickHatPosition_$Impl_$.UP_RIGHT = 3;
lime_ui__$KeyCode_KeyCode_$Impl_$.UNKNOWN = 0;
lime_ui__$KeyCode_KeyCode_$Impl_$.BACKSPACE = 8;
lime_ui__$KeyCode_KeyCode_$Impl_$.TAB = 9;
lime_ui__$KeyCode_KeyCode_$Impl_$.RETURN = 13;
lime_ui__$KeyCode_KeyCode_$Impl_$.ESCAPE = 27;
lime_ui__$KeyCode_KeyCode_$Impl_$.SPACE = 32;
lime_ui__$KeyCode_KeyCode_$Impl_$.EXCLAMATION = 33;
lime_ui__$KeyCode_KeyCode_$Impl_$.QUOTE = 34;
lime_ui__$KeyCode_KeyCode_$Impl_$.HASH = 35;
lime_ui__$KeyCode_KeyCode_$Impl_$.DOLLAR = 36;
lime_ui__$KeyCode_KeyCode_$Impl_$.PERCENT = 37;
lime_ui__$KeyCode_KeyCode_$Impl_$.AMPERSAND = 38;
lime_ui__$KeyCode_KeyCode_$Impl_$.SINGLE_QUOTE = 39;
lime_ui__$KeyCode_KeyCode_$Impl_$.LEFT_PARENTHESIS = 40;
lime_ui__$KeyCode_KeyCode_$Impl_$.RIGHT_PARENTHESIS = 41;
lime_ui__$KeyCode_KeyCode_$Impl_$.ASTERISK = 42;
lime_ui__$KeyCode_KeyCode_$Impl_$.PLUS = 43;
lime_ui__$KeyCode_KeyCode_$Impl_$.COMMA = 44;
lime_ui__$KeyCode_KeyCode_$Impl_$.MINUS = 45;
lime_ui__$KeyCode_KeyCode_$Impl_$.PERIOD = 46;
lime_ui__$KeyCode_KeyCode_$Impl_$.SLASH = 47;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMBER_0 = 48;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMBER_1 = 49;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMBER_2 = 50;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMBER_3 = 51;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMBER_4 = 52;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMBER_5 = 53;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMBER_6 = 54;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMBER_7 = 55;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMBER_8 = 56;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMBER_9 = 57;
lime_ui__$KeyCode_KeyCode_$Impl_$.COLON = 58;
lime_ui__$KeyCode_KeyCode_$Impl_$.SEMICOLON = 59;
lime_ui__$KeyCode_KeyCode_$Impl_$.LESS_THAN = 60;
lime_ui__$KeyCode_KeyCode_$Impl_$.EQUALS = 61;
lime_ui__$KeyCode_KeyCode_$Impl_$.GREATER_THAN = 62;
lime_ui__$KeyCode_KeyCode_$Impl_$.QUESTION = 63;
lime_ui__$KeyCode_KeyCode_$Impl_$.AT = 64;
lime_ui__$KeyCode_KeyCode_$Impl_$.LEFT_BRACKET = 91;
lime_ui__$KeyCode_KeyCode_$Impl_$.BACKSLASH = 92;
lime_ui__$KeyCode_KeyCode_$Impl_$.RIGHT_BRACKET = 93;
lime_ui__$KeyCode_KeyCode_$Impl_$.CARET = 94;
lime_ui__$KeyCode_KeyCode_$Impl_$.UNDERSCORE = 95;
lime_ui__$KeyCode_KeyCode_$Impl_$.GRAVE = 96;
lime_ui__$KeyCode_KeyCode_$Impl_$.A = 97;
lime_ui__$KeyCode_KeyCode_$Impl_$.B = 98;
lime_ui__$KeyCode_KeyCode_$Impl_$.C = 99;
lime_ui__$KeyCode_KeyCode_$Impl_$.D = 100;
lime_ui__$KeyCode_KeyCode_$Impl_$.E = 101;
lime_ui__$KeyCode_KeyCode_$Impl_$.F = 102;
lime_ui__$KeyCode_KeyCode_$Impl_$.G = 103;
lime_ui__$KeyCode_KeyCode_$Impl_$.H = 104;
lime_ui__$KeyCode_KeyCode_$Impl_$.I = 105;
lime_ui__$KeyCode_KeyCode_$Impl_$.J = 106;
lime_ui__$KeyCode_KeyCode_$Impl_$.K = 107;
lime_ui__$KeyCode_KeyCode_$Impl_$.L = 108;
lime_ui__$KeyCode_KeyCode_$Impl_$.M = 109;
lime_ui__$KeyCode_KeyCode_$Impl_$.N = 110;
lime_ui__$KeyCode_KeyCode_$Impl_$.O = 111;
lime_ui__$KeyCode_KeyCode_$Impl_$.P = 112;
lime_ui__$KeyCode_KeyCode_$Impl_$.Q = 113;
lime_ui__$KeyCode_KeyCode_$Impl_$.R = 114;
lime_ui__$KeyCode_KeyCode_$Impl_$.S = 115;
lime_ui__$KeyCode_KeyCode_$Impl_$.T = 116;
lime_ui__$KeyCode_KeyCode_$Impl_$.U = 117;
lime_ui__$KeyCode_KeyCode_$Impl_$.V = 118;
lime_ui__$KeyCode_KeyCode_$Impl_$.W = 119;
lime_ui__$KeyCode_KeyCode_$Impl_$.X = 120;
lime_ui__$KeyCode_KeyCode_$Impl_$.Y = 121;
lime_ui__$KeyCode_KeyCode_$Impl_$.Z = 122;
lime_ui__$KeyCode_KeyCode_$Impl_$.DELETE = 127;
lime_ui__$KeyCode_KeyCode_$Impl_$.CAPS_LOCK = 1073741881;
lime_ui__$KeyCode_KeyCode_$Impl_$.F1 = 1073741882;
lime_ui__$KeyCode_KeyCode_$Impl_$.F2 = 1073741883;
lime_ui__$KeyCode_KeyCode_$Impl_$.F3 = 1073741884;
lime_ui__$KeyCode_KeyCode_$Impl_$.F4 = 1073741885;
lime_ui__$KeyCode_KeyCode_$Impl_$.F5 = 1073741886;
lime_ui__$KeyCode_KeyCode_$Impl_$.F6 = 1073741887;
lime_ui__$KeyCode_KeyCode_$Impl_$.F7 = 1073741888;
lime_ui__$KeyCode_KeyCode_$Impl_$.F8 = 1073741889;
lime_ui__$KeyCode_KeyCode_$Impl_$.F9 = 1073741890;
lime_ui__$KeyCode_KeyCode_$Impl_$.F10 = 1073741891;
lime_ui__$KeyCode_KeyCode_$Impl_$.F11 = 1073741892;
lime_ui__$KeyCode_KeyCode_$Impl_$.F12 = 1073741893;
lime_ui__$KeyCode_KeyCode_$Impl_$.PRINT_SCREEN = 1073741894;
lime_ui__$KeyCode_KeyCode_$Impl_$.SCROLL_LOCK = 1073741895;
lime_ui__$KeyCode_KeyCode_$Impl_$.PAUSE = 1073741896;
lime_ui__$KeyCode_KeyCode_$Impl_$.INSERT = 1073741897;
lime_ui__$KeyCode_KeyCode_$Impl_$.HOME = 1073741898;
lime_ui__$KeyCode_KeyCode_$Impl_$.PAGE_UP = 1073741899;
lime_ui__$KeyCode_KeyCode_$Impl_$.END = 1073741901;
lime_ui__$KeyCode_KeyCode_$Impl_$.PAGE_DOWN = 1073741902;
lime_ui__$KeyCode_KeyCode_$Impl_$.RIGHT = 1073741903;
lime_ui__$KeyCode_KeyCode_$Impl_$.LEFT = 1073741904;
lime_ui__$KeyCode_KeyCode_$Impl_$.DOWN = 1073741905;
lime_ui__$KeyCode_KeyCode_$Impl_$.UP = 1073741906;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUM_LOCK = 1073741907;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_DIVIDE = 1073741908;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_MULTIPLY = 1073741909;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_MINUS = 1073741910;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_PLUS = 1073741911;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_ENTER = 1073741912;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_1 = 1073741913;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_2 = 1073741914;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_3 = 1073741915;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_4 = 1073741916;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_5 = 1073741917;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_6 = 1073741918;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_7 = 1073741919;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_8 = 1073741920;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_9 = 1073741921;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_0 = 1073741922;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_PERIOD = 1073741923;
lime_ui__$KeyCode_KeyCode_$Impl_$.APPLICATION = 1073741925;
lime_ui__$KeyCode_KeyCode_$Impl_$.POWER = 1073741926;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_EQUALS = 1073741927;
lime_ui__$KeyCode_KeyCode_$Impl_$.F13 = 1073741928;
lime_ui__$KeyCode_KeyCode_$Impl_$.F14 = 1073741929;
lime_ui__$KeyCode_KeyCode_$Impl_$.F15 = 1073741930;
lime_ui__$KeyCode_KeyCode_$Impl_$.F16 = 1073741931;
lime_ui__$KeyCode_KeyCode_$Impl_$.F17 = 1073741932;
lime_ui__$KeyCode_KeyCode_$Impl_$.F18 = 1073741933;
lime_ui__$KeyCode_KeyCode_$Impl_$.F19 = 1073741934;
lime_ui__$KeyCode_KeyCode_$Impl_$.F20 = 1073741935;
lime_ui__$KeyCode_KeyCode_$Impl_$.F21 = 1073741936;
lime_ui__$KeyCode_KeyCode_$Impl_$.F22 = 1073741937;
lime_ui__$KeyCode_KeyCode_$Impl_$.F23 = 1073741938;
lime_ui__$KeyCode_KeyCode_$Impl_$.F24 = 1073741939;
lime_ui__$KeyCode_KeyCode_$Impl_$.EXECUTE = 1073741940;
lime_ui__$KeyCode_KeyCode_$Impl_$.HELP = 1073741941;
lime_ui__$KeyCode_KeyCode_$Impl_$.MENU = 1073741942;
lime_ui__$KeyCode_KeyCode_$Impl_$.SELECT = 1073741943;
lime_ui__$KeyCode_KeyCode_$Impl_$.STOP = 1073741944;
lime_ui__$KeyCode_KeyCode_$Impl_$.AGAIN = 1073741945;
lime_ui__$KeyCode_KeyCode_$Impl_$.UNDO = 1073741946;
lime_ui__$KeyCode_KeyCode_$Impl_$.CUT = 1073741947;
lime_ui__$KeyCode_KeyCode_$Impl_$.COPY = 1073741948;
lime_ui__$KeyCode_KeyCode_$Impl_$.PASTE = 1073741949;
lime_ui__$KeyCode_KeyCode_$Impl_$.FIND = 1073741950;
lime_ui__$KeyCode_KeyCode_$Impl_$.MUTE = 1073741951;
lime_ui__$KeyCode_KeyCode_$Impl_$.VOLUME_UP = 1073741952;
lime_ui__$KeyCode_KeyCode_$Impl_$.VOLUME_DOWN = 1073741953;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_COMMA = 1073741957;
lime_ui__$KeyCode_KeyCode_$Impl_$.ALT_ERASE = 1073741977;
lime_ui__$KeyCode_KeyCode_$Impl_$.SYSTEM_REQUEST = 1073741978;
lime_ui__$KeyCode_KeyCode_$Impl_$.CANCEL = 1073741979;
lime_ui__$KeyCode_KeyCode_$Impl_$.CLEAR = 1073741980;
lime_ui__$KeyCode_KeyCode_$Impl_$.PRIOR = 1073741981;
lime_ui__$KeyCode_KeyCode_$Impl_$.RETURN2 = 1073741982;
lime_ui__$KeyCode_KeyCode_$Impl_$.SEPARATOR = 1073741983;
lime_ui__$KeyCode_KeyCode_$Impl_$.OUT = 1073741984;
lime_ui__$KeyCode_KeyCode_$Impl_$.OPER = 1073741985;
lime_ui__$KeyCode_KeyCode_$Impl_$.CLEAR_AGAIN = 1073741986;
lime_ui__$KeyCode_KeyCode_$Impl_$.CRSEL = 1073741987;
lime_ui__$KeyCode_KeyCode_$Impl_$.EXSEL = 1073741988;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_00 = 1073742000;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_000 = 1073742001;
lime_ui__$KeyCode_KeyCode_$Impl_$.THOUSAND_SEPARATOR = 1073742002;
lime_ui__$KeyCode_KeyCode_$Impl_$.DECIMAL_SEPARATOR = 1073742003;
lime_ui__$KeyCode_KeyCode_$Impl_$.CURRENCY_UNIT = 1073742004;
lime_ui__$KeyCode_KeyCode_$Impl_$.CURRENCY_SUBUNIT = 1073742005;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_LEFT_PARENTHESIS = 1073742006;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_RIGHT_PARENTHESIS = 1073742007;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_LEFT_BRACE = 1073742008;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_RIGHT_BRACE = 1073742009;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_TAB = 1073742010;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_BACKSPACE = 1073742011;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_A = 1073742012;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_B = 1073742013;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_C = 1073742014;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_D = 1073742015;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_E = 1073742016;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_F = 1073742017;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_XOR = 1073742018;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_POWER = 1073742019;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_PERCENT = 1073742020;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_LESS_THAN = 1073742021;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_GREATER_THAN = 1073742022;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_AMPERSAND = 1073742023;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_DOUBLE_AMPERSAND = 1073742024;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_VERTICAL_BAR = 1073742025;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_DOUBLE_VERTICAL_BAR = 1073742026;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_COLON = 1073742027;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_HASH = 1073742028;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_SPACE = 1073742029;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_AT = 1073742030;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_EXCLAMATION = 1073742031;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_MEM_STORE = 1073742032;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_MEM_RECALL = 1073742033;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_MEM_CLEAR = 1073742034;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_MEM_ADD = 1073742035;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_MEM_SUBTRACT = 1073742036;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_MEM_MULTIPLY = 1073742037;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_MEM_DIVIDE = 1073742038;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_PLUS_MINUS = 1073742039;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_CLEAR = 1073742040;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_CLEAR_ENTRY = 1073742041;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_BINARY = 1073742042;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_OCTAL = 1073742043;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_DECIMAL = 1073742044;
lime_ui__$KeyCode_KeyCode_$Impl_$.NUMPAD_HEXADECIMAL = 1073742045;
lime_ui__$KeyCode_KeyCode_$Impl_$.LEFT_CTRL = 1073742048;
lime_ui__$KeyCode_KeyCode_$Impl_$.LEFT_SHIFT = 1073742049;
lime_ui__$KeyCode_KeyCode_$Impl_$.LEFT_ALT = 1073742050;
lime_ui__$KeyCode_KeyCode_$Impl_$.LEFT_META = 1073742051;
lime_ui__$KeyCode_KeyCode_$Impl_$.RIGHT_CTRL = 1073742052;
lime_ui__$KeyCode_KeyCode_$Impl_$.RIGHT_SHIFT = 1073742053;
lime_ui__$KeyCode_KeyCode_$Impl_$.RIGHT_ALT = 1073742054;
lime_ui__$KeyCode_KeyCode_$Impl_$.RIGHT_META = 1073742055;
lime_ui__$KeyCode_KeyCode_$Impl_$.MODE = 1073742081;
lime_ui__$KeyCode_KeyCode_$Impl_$.AUDIO_NEXT = 1073742082;
lime_ui__$KeyCode_KeyCode_$Impl_$.AUDIO_PREVIOUS = 1073742083;
lime_ui__$KeyCode_KeyCode_$Impl_$.AUDIO_STOP = 1073742084;
lime_ui__$KeyCode_KeyCode_$Impl_$.AUDIO_PLAY = 1073742085;
lime_ui__$KeyCode_KeyCode_$Impl_$.AUDIO_MUTE = 1073742086;
lime_ui__$KeyCode_KeyCode_$Impl_$.MEDIA_SELECT = 1073742087;
lime_ui__$KeyCode_KeyCode_$Impl_$.WWW = 1073742088;
lime_ui__$KeyCode_KeyCode_$Impl_$.MAIL = 1073742089;
lime_ui__$KeyCode_KeyCode_$Impl_$.CALCULATOR = 1073742090;
lime_ui__$KeyCode_KeyCode_$Impl_$.COMPUTER = 1073742091;
lime_ui__$KeyCode_KeyCode_$Impl_$.APP_CONTROL_SEARCH = 1073742092;
lime_ui__$KeyCode_KeyCode_$Impl_$.APP_CONTROL_HOME = 1073742093;
lime_ui__$KeyCode_KeyCode_$Impl_$.APP_CONTROL_BACK = 1073742094;
lime_ui__$KeyCode_KeyCode_$Impl_$.APP_CONTROL_FORWARD = 1073742095;
lime_ui__$KeyCode_KeyCode_$Impl_$.APP_CONTROL_STOP = 1073742096;
lime_ui__$KeyCode_KeyCode_$Impl_$.APP_CONTROL_REFRESH = 1073742097;
lime_ui__$KeyCode_KeyCode_$Impl_$.APP_CONTROL_BOOKMARKS = 1073742098;
lime_ui__$KeyCode_KeyCode_$Impl_$.BRIGHTNESS_DOWN = 1073742099;
lime_ui__$KeyCode_KeyCode_$Impl_$.BRIGHTNESS_UP = 1073742100;
lime_ui__$KeyCode_KeyCode_$Impl_$.DISPLAY_SWITCH = 1073742101;
lime_ui__$KeyCode_KeyCode_$Impl_$.BACKLIGHT_TOGGLE = 1073742102;
lime_ui__$KeyCode_KeyCode_$Impl_$.BACKLIGHT_DOWN = 1073742103;
lime_ui__$KeyCode_KeyCode_$Impl_$.BACKLIGHT_UP = 1073742104;
lime_ui__$KeyCode_KeyCode_$Impl_$.EJECT = 1073742105;
lime_ui__$KeyCode_KeyCode_$Impl_$.SLEEP = 1073742106;
lime_ui__$KeyModifier_KeyModifier_$Impl_$.NONE = 0;
lime_ui__$KeyModifier_KeyModifier_$Impl_$.LEFT_SHIFT = 1;
lime_ui__$KeyModifier_KeyModifier_$Impl_$.RIGHT_SHIFT = 2;
lime_ui__$KeyModifier_KeyModifier_$Impl_$.LEFT_CTRL = 64;
lime_ui__$KeyModifier_KeyModifier_$Impl_$.RIGHT_CTRL = 128;
lime_ui__$KeyModifier_KeyModifier_$Impl_$.LEFT_ALT = 256;
lime_ui__$KeyModifier_KeyModifier_$Impl_$.RIGHT_ALT = 512;
lime_ui__$KeyModifier_KeyModifier_$Impl_$.LEFT_META = 1024;
lime_ui__$KeyModifier_KeyModifier_$Impl_$.RIGHT_META = 2048;
lime_ui__$KeyModifier_KeyModifier_$Impl_$.NUM_LOCK = 4096;
lime_ui__$KeyModifier_KeyModifier_$Impl_$.CAPS_LOCK = 8192;
lime_ui__$KeyModifier_KeyModifier_$Impl_$.MODE = 16384;
lime_ui__$KeyModifier_KeyModifier_$Impl_$.CTRL = 192;
lime_ui__$KeyModifier_KeyModifier_$Impl_$.SHIFT = 3;
lime_ui__$KeyModifier_KeyModifier_$Impl_$.ALT = 768;
lime_ui__$KeyModifier_KeyModifier_$Impl_$.META = 3072;
lime_ui_Touch.onEnd = new lime_app_Event_$lime_$ui_$Touch_$Void();
lime_ui_Touch.onMove = new lime_app_Event_$lime_$ui_$Touch_$Void();
lime_ui_Touch.onStart = new lime_app_Event_$lime_$ui_$Touch_$Void();
lime_utils_Bytes.cffi_lime_bytes_from_data_pointer = (function($this) {
	var $r;
	var inValue = lime_system_CFFI.load("lime","lime_bytes_from_data_pointer",2,false);
	$r = inValue;
	return $r;
}(this));
lime_utils_Bytes.cffi_lime_bytes_get_data_pointer = (function($this) {
	var $r;
	var inValue = lime_system_CFFI.load("lime","lime_bytes_get_data_pointer",1,false);
	$r = inValue;
	return $r;
}(this));
lime_utils_Bytes.cffi_lime_bytes_read_file = (function($this) {
	var $r;
	var inValue = lime_system_CFFI.load("lime","lime_bytes_read_file",1,false);
	$r = inValue;
	return $r;
}(this));
lime_utils__$Float32Array_Float32Array_$Impl_$.BYTES_PER_ELEMENT = 4;
lime_utils__$Int16Array_Int16Array_$Impl_$.BYTES_PER_ELEMENT = 2;
lime_utils__$Int32Array_Int32Array_$Impl_$.BYTES_PER_ELEMENT = 4;
lime_utils__$UInt32Array_UInt32Array_$Impl_$.BYTES_PER_ELEMENT = 4;
lime_utils__$UInt8Array_UInt8Array_$Impl_$.BYTES_PER_ELEMENT = 1;
oge2d_driver_lime_Asset._key = "";
oge2d_driver_lime_Asset._onweb = true;
oge2d_driver_lime_Asset._textures = new haxe_ds_StringMap();
oge2d_driver_lime_Asset._texts = new haxe_ds_StringMap();
oge2d_driver_lime_Asset._jsons = new haxe_ds_StringMap();
oge2d_driver_lime_Asset._musics = new haxe_ds_StringMap();
oge2d_driver_lime_Asset._sounds = new haxe_ds_StringMap();
oge2d_driver_lime_Asset._queue = new List();
oge2d_driver_lime_Keyboard._keyCount = 0;
oge2d_driver_lime_Keyboard._defaultConfig = JSON.parse("\r\n\t{\r\n\t\t\"keys\":\r\n\t\t{\r\n\t\t\t\"0x00\": [\"UNKNOWN\"],\r\n\t\t\t\"0x08\": [\"BACKSPACE\"],\r\n\t\t\t\"0x09\": [\"TAB\"],\r\n\t\t\t\"0x0D\": [\"RETURN\", \"ENTER\"],\r\n\t\t\t\"0x1B\": [\"ESCAPE\"],\r\n\t\t\t\"0x20\": [\"SPACE\", \" \"],\r\n\t\t\t\"0x21\": [\"EXCLAMATION\", \"!\"],\r\n\t\t\t\"0x22\": [\"QUOTE\", \"\\\"\"],\r\n\t\t\t\"0x23\": [\"HASH\", \"#\"],\r\n\t\t\t\"0x24\": [\"DOLLAR\", \"$\"],\r\n\t\t\t\"0x25\": [\"PERCENT\", \"%\"],\r\n\t\t\t\"0x26\": [\"AMPERSAND\", \"&\"],\r\n\t\t\t\"0x27\": [\"SINGLE_QUOTE\", \"'\"],\r\n\t\t\t\"0x28\": [\"LEFT_PARENTHESIS\", \"(\"],\r\n\t\t\t\"0x29\": [\"RIGHT_PARENTHESIS\", \")\"],\r\n\t\t\t\"0x2A\": [\"ASTERISK\", \"*\"],\r\n\t\t\t\"0x2B\": [\"PLUS\", \"+\"],\r\n\t\t\t\"0x2C\": [\"COMMA\", \",\"],\r\n\t\t\t\"0x2D\": [\"MINUS\", \"-\"],\r\n\t\t\t\"0x2E\": [\"PERIOD\", \".\"],\r\n\t\t\t\"0x2F\": [\"SLASH\", \"/\"],\r\n\t\t\t\"0x30\": [\"NUMBER_0\", \"0\"],\r\n\t\t\t\"0x31\": [\"NUMBER_1\", \"1\"],\r\n\t\t\t\"0x32\": [\"NUMBER_2\", \"2\"],\r\n\t\t\t\"0x33\": [\"NUMBER_3\", \"3\"],\r\n\t\t\t\"0x34\": [\"NUMBER_4\", \"4\"],\r\n\t\t\t\"0x35\": [\"NUMBER_5\", \"5\"],\r\n\t\t\t\"0x36\": [\"NUMBER_6\", \"6\"],\r\n\t\t\t\"0x37\": [\"NUMBER_7\", \"7\"],\r\n\t\t\t\"0x38\": [\"NUMBER_8\", \"8\"],\r\n\t\t\t\"0x39\": [\"NUMBER_9\", \"9\"],\r\n\t\t\t\"0x3A\": [\"COLON\", \":\"],\r\n\t\t\t\"0x3B\": [\"SEMICOLON\", \";\"],\r\n\t\t\t\"0x3C\": [\"LESS_THAN\", \"<\"],\r\n\t\t\t\"0x3D\": [\"EQUALS\", \"=\"],\r\n\t\t\t\"0x3E\": [\"GREATER_THAN\", \">\"],\r\n\t\t\t\"0x3F\": [\"QUESTION\", \"?\"],\r\n\t\t\t\"0x40\": [\"AT\", \"@\"],\r\n\t\t\t\"0x5B\": [\"LEFT_BRACKET\", \"[\"],\r\n\t\t\t\"0x5C\": [\"BACKSLASH\", \"\\\\\"],\r\n\t\t\t\"0x5D\": [\"RIGHT_BRACKET\", \"]\"],\r\n\t\t\t\"0x5E\": [\"CARET\", \"^\"],\r\n\t\t\t\"0x5F\": [\"UNDERSCORE\", \"_\"],\r\n\t\t\t\"0x60\": [\"GRAVE\", \"`\"],\r\n\t\t\t\"0x61\": [\"A\"],\r\n\t\t\t\"0x62\": [\"B\"],\r\n\t\t\t\"0x63\": [\"C\"],\r\n\t\t\t\"0x64\": [\"D\"],\r\n\t\t\t\"0x65\": [\"E\"],\r\n\t\t\t\"0x66\": [\"F\"],\r\n\t\t\t\"0x67\": [\"G\"],\r\n\t\t\t\"0x68\": [\"H\"],\r\n\t\t\t\"0x69\": [\"I\"],\r\n\t\t\t\"0x6A\": [\"J\"],\r\n\t\t\t\"0x6B\": [\"K\"],\r\n\t\t\t\"0x6C\": [\"L\"],\r\n\t\t\t\"0x6D\": [\"M\"],\r\n\t\t\t\"0x6E\": [\"N\"],\r\n\t\t\t\"0x6F\": [\"O\"],\r\n\t\t\t\"0x70\": [\"P\"],\r\n\t\t\t\"0x71\": [\"Q\"],\r\n\t\t\t\"0x72\": [\"R\"],\r\n\t\t\t\"0x73\": [\"S\"],\r\n\t\t\t\"0x74\": [\"T\"],\r\n\t\t\t\"0x75\": [\"U\"],\r\n\t\t\t\"0x76\": [\"V\"],\r\n\t\t\t\"0x77\": [\"W\"],\r\n\t\t\t\"0x78\": [\"X\"],\r\n\t\t\t\"0x79\": [\"Y\"],\r\n\t\t\t\"0x7A\": [\"Z\"],\r\n\t\t\t\"0x7F\": [\"DELETE\"],\r\n\t\t\t\"0x40000039\": [\"CAPS_LOCK\"],\r\n\t\t\t\"0x4000003A\": [\"F1\"],\r\n\t\t\t\"0x4000003B\": [\"F2\"],\r\n\t\t\t\"0x4000003C\": [\"F3\"],\r\n\t\t\t\"0x4000003D\": [\"F4\"],\r\n\t\t\t\"0x4000003E\": [\"F5\"],\r\n\t\t\t\"0x4000003F\": [\"F6\"],\r\n\t\t\t\"0x40000040\": [\"F7\"],\r\n\t\t\t\"0x40000041\": [\"F8\"],\r\n\t\t\t\"0x40000042\": [\"F9\"],\r\n\t\t\t\"0x40000043\": [\"F10\"],\r\n\t\t\t\"0x40000044\": [\"F11\"],\r\n\t\t\t\"0x40000045\": [\"F12\"],\r\n\t\t\t\"0x40000046\": [\"PRINT_SCREEN\"],\r\n\t\t\t\"0x40000047\": [\"SCROLL_LOCK\"],\r\n\t\t\t\"0x40000048\": [\"PAUSE\"],\r\n\t\t\t\"0x40000049\": [\"INSERT\"],\r\n\t\t\t\"0x4000004A\": [\"HOME\"],\r\n\t\t\t\"0x4000004B\": [\"PAGE_UP\"],\r\n\t\t\t\"0x4000004D\": [\"END\"],\r\n\t\t\t\"0x4000004E\": [\"PAGE_DOWN\"],\r\n\t\t\t\"0x4000004F\": [\"RIGHT\"],\r\n\t\t\t\"0x40000050\": [\"LEFT\"],\r\n\t\t\t\"0x40000051\": [\"DOWN\"],\r\n\t\t\t\"0x40000052\": [\"UP\"],\r\n\t\t\t\"0x40000053\": [\"NUM_LOCK\"],\r\n\t\t\t\"0x40000054\": [\"NUMPAD_DIVIDE\"],\r\n\t\t\t\"0x40000055\": [\"NUMPAD_MULTIPLY\"],\r\n\t\t\t\"0x40000056\": [\"NUMPAD_MINUS\"],\r\n\t\t\t\"0x40000057\": [\"NUMPAD_PLUS\"],\r\n\t\t\t\"0x40000058\": [\"NUMPAD_ENTER\"],\r\n\t\t\t\"0x40000059\": [\"NUMPAD_1\"],\r\n\t\t\t\"0x4000005A\": [\"NUMPAD_2\"],\r\n\t\t\t\"0x4000005B\": [\"NUMPAD_3\"],\r\n\t\t\t\"0x4000005C\": [\"NUMPAD_4\"],\r\n\t\t\t\"0x4000005D\": [\"NUMPAD_5\"],\r\n\t\t\t\"0x4000005E\": [\"NUMPAD_6\"],\r\n\t\t\t\"0x4000005F\": [\"NUMPAD_7\"],\r\n\t\t\t\"0x40000060\": [\"NUMPAD_8\"],\r\n\t\t\t\"0x40000061\": [\"NUMPAD_9\"],\r\n\t\t\t\"0x40000062\": [\"NUMPAD_0\"],\r\n\t\t\t\"0x40000063\": [\"NUMPAD_PERIOD\"],\r\n\t\t\t\"0x40000065\": [\"APPLICATION\"],\r\n\t\t\t\"0x40000066\": [\"POWER\"],\r\n\t\t\t\"0x40000067\": [\"NUMPAD_EQUALS\"],\r\n\t\t\t\"0x40000068\": [\"F13\"],\r\n\t\t\t\"0x40000069\": [\"F14\"],\r\n\t\t\t\"0x4000006A\": [\"F15\"],\r\n\t\t\t\"0x4000006B\": [\"F16\"],\r\n\t\t\t\"0x4000006C\": [\"F17\"],\r\n\t\t\t\"0x4000006D\": [\"F18\"],\r\n\t\t\t\"0x4000006E\": [\"F19\"],\r\n\t\t\t\"0x4000006F\": [\"F20\"],\r\n\t\t\t\"0x40000070\": [\"F21\"],\r\n\t\t\t\"0x40000071\": [\"F22\"],\r\n\t\t\t\"0x40000072\": [\"F23\"],\r\n\t\t\t\"0x40000073\": [\"F24\"],\r\n\t\t\t\"0x40000074\": [\"EXECUTE\"],\r\n\t\t\t\"0x40000075\": [\"HELP\"],\r\n\t\t\t\"0x40000076\": [\"MENU\"],\r\n\t\t\t\"0x40000077\": [\"SELECT\"],\r\n\t\t\t\"0x40000078\": [\"STOP\"],\r\n\t\t\t\"0x40000079\": [\"AGAIN\"],\r\n\t\t\t\"0x4000007A\": [\"UNDO\"],\r\n\t\t\t\"0x4000007B\": [\"CUT\"],\r\n\t\t\t\"0x4000007C\": [\"COPY\"],\r\n\t\t\t\"0x4000007D\": [\"PASTE\"],\r\n\t\t\t\"0x4000007E\": [\"FIND\"],\r\n\t\t\t\"0x4000007F\": [\"MUTE\"],\r\n\t\t\t\"0x40000080\": [\"VOLUME_UP\"],\r\n\t\t\t\"0x40000081\": [\"VOLUME_DOWN\"],\r\n\t\t\t\"0x40000085\": [\"NUMPAD_COMMA\"],\r\n\t\t\t\"0x40000099\": [\"ALT_ERASE\"],\r\n\t\t\t\"0x4000009A\": [\"SYSTEM_REQUEST\"],\r\n\t\t\t\"0x4000009B\": [\"CANCEL\"],\r\n\t\t\t\"0x4000009C\": [\"CLEAR\"],\r\n\t\t\t\"0x4000009D\": [\"PRIOR\"],\r\n\t\t\t\"0x4000009E\": [\"RETURN2\"],\r\n\t\t\t\"0x4000009F\": [\"SEPARATOR\"],\r\n\t\t\t\"0x400000A0\": [\"OUT\"],\r\n\t\t\t\"0x400000A1\": [\"OPER\"],\r\n\t\t\t\"0x400000A2\": [\"CLEAR_AGAIN\"],\r\n\t\t\t\"0x400000A3\": [\"CRSEL\"],\r\n\t\t\t\"0x400000A4\": [\"EXSEL\"],\r\n\t\t\t\"0x400000B0\": [\"NUMPAD_00\"],\r\n\t\t\t\"0x400000B1\": [\"NUMPAD_000\"],\r\n\t\t\t\"0x400000B2\": [\"THOUSAND_SEPARATOR\"],\r\n\t\t\t\"0x400000B3\": [\"DECIMAL_SEPARATOR\"],\r\n\t\t\t\"0x400000B4\": [\"CURRENCY_UNIT\"],\r\n\t\t\t\"0x400000B5\": [\"CURRENCY_SUBUNIT\"],\r\n\t\t\t\"0x400000B6\": [\"NUMPAD_LEFT_PARENTHESIS\"],\r\n\t\t\t\"0x400000B7\": [\"NUMPAD_RIGHT_PARENTHESIS\"],\r\n\t\t\t\"0x400000B8\": [\"NUMPAD_LEFT_BRACE\"],\r\n\t\t\t\"0x400000B9\": [\"NUMPAD_RIGHT_BRACE\"],\r\n\t\t\t\"0x400000BA\": [\"NUMPAD_TAB\"],\r\n\t\t\t\"0x400000BB\": [\"NUMPAD_BACKSPACE\"],\r\n\t\t\t\"0x400000BC\": [\"NUMPAD_A\"],\r\n\t\t\t\"0x400000BD\": [\"NUMPAD_B\"],\r\n\t\t\t\"0x400000BE\": [\"NUMPAD_C\"],\r\n\t\t\t\"0x400000BF\": [\"NUMPAD_D\"],\r\n\t\t\t\"0x400000C0\": [\"NUMPAD_E\"],\r\n\t\t\t\"0x400000C1\": [\"NUMPAD_F\"],\r\n\t\t\t\"0x400000C2\": [\"NUMPAD_XOR\"],\r\n\t\t\t\"0x400000C3\": [\"NUMPAD_POWER\"],\r\n\t\t\t\"0x400000C4\": [\"NUMPAD_PERCENT\"],\r\n\t\t\t\"0x400000C5\": [\"NUMPAD_LESS_THAN\"],\r\n\t\t\t\"0x400000C6\": [\"NUMPAD_GREATER_THAN\"],\r\n\t\t\t\"0x400000C7\": [\"NUMPAD_AMPERSAND\"],\r\n\t\t\t\"0x400000C8\": [\"NUMPAD_DOUBLE_AMPERSAND\"],\r\n\t\t\t\"0x400000C9\": [\"NUMPAD_VERTICAL_BAR\"],\r\n\t\t\t\"0x400000CA\": [\"NUMPAD_DOUBLE_VERTICAL_BAR\"],\r\n\t\t\t\"0x400000CB\": [\"NUMPAD_COLON\"],\r\n\t\t\t\"0x400000CC\": [\"NUMPAD_HASH\"],\r\n\t\t\t\"0x400000CD\": [\"NUMPAD_SPACE\"],\r\n\t\t\t\"0x400000CE\": [\"NUMPAD_AT\"],\r\n\t\t\t\"0x400000CF\": [\"NUMPAD_EXCLAMATION\"],\r\n\t\t\t\"0x400000D0\": [\"NUMPAD_MEM_STORE\"],\r\n\t\t\t\"0x400000D1\": [\"NUMPAD_MEM_RECALL\"],\r\n\t\t\t\"0x400000D2\": [\"NUMPAD_MEM_CLEAR\"],\r\n\t\t\t\"0x400000D3\": [\"NUMPAD_MEM_ADD\"],\r\n\t\t\t\"0x400000D4\": [\"NUMPAD_MEM_SUBTRACT\"],\r\n\t\t\t\"0x400000D5\": [\"NUMPAD_MEM_MULTIPLY\"],\r\n\t\t\t\"0x400000D6\": [\"NUMPAD_MEM_DIVIDE\"],\r\n\t\t\t\"0x400000D7\": [\"NUMPAD_PLUS_MINUS\"],\r\n\t\t\t\"0x400000D8\": [\"NUMPAD_CLEAR\"],\r\n\t\t\t\"0x400000D9\": [\"NUMPAD_CLEAR_ENTRY\"],\r\n\t\t\t\"0x400000DA\": [\"NUMPAD_BINARY\"],\r\n\t\t\t\"0x400000DB\": [\"NUMPAD_OCTAL\"],\r\n\t\t\t\"0x400000DC\": [\"NUMPAD_DECIMAL\"],\r\n\t\t\t\"0x400000DD\": [\"NUMPAD_HEXADECIMAL\"],\r\n\t\t\t\"0x400000E0\": [\"LEFT_CTRL\"],\r\n\t\t\t\"0x400000E1\": [\"LEFT_SHIFT\"],\r\n\t\t\t\"0x400000E2\": [\"LEFT_ALT\"],\r\n\t\t\t\"0x400000E3\": [\"LEFT_META\"],\r\n\t\t\t\"0x400000E4\": [\"RIGHT_CTRL\"],\r\n\t\t\t\"0x400000E5\": [\"RIGHT_SHIFT\"],\r\n\t\t\t\"0x400000E6\": [\"RIGHT_ALT\"],\r\n\t\t\t\"0x400000E7\": [\"RIGHT_META\"],\r\n\t\t\t\"0x40000101\": [\"MODE\"],\r\n\t\t\t\"0x40000102\": [\"AUDIO_NEXT\"],\r\n\t\t\t\"0x40000103\": [\"AUDIO_PREVIOUS\"],\r\n\t\t\t\"0x40000104\": [\"AUDIO_STOP\"],\r\n\t\t\t\"0x40000105\": [\"AUDIO_PLAY\"],\r\n\t\t\t\"0x40000106\": [\"AUDIO_MUTE\"],\r\n\t\t\t\"0x40000107\": [\"MEDIA_SELECT\"],\r\n\t\t\t\"0x40000108\": [\"WWW\"],\r\n\t\t\t\"0x40000109\": [\"MAIL\"],\r\n\t\t\t\"0x4000010A\": [\"CALCULATOR\"],\r\n\t\t\t\"0x4000010B\": [\"COMPUTER\"],\r\n\t\t\t\"0x4000010C\": [\"APP_CONTROL_SEARCH\"],\r\n\t\t\t\"0x4000010D\": [\"APP_CONTROL_HOME\"],\r\n\t\t\t\"0x4000010E\": [\"APP_CONTROL_BACK\"],\r\n\t\t\t\"0x4000010F\": [\"APP_CONTROL_FORWARD\"],\r\n\t\t\t\"0x40000110\": [\"APP_CONTROL_STOP\"],\r\n\t\t\t\"0x40000111\": [\"APP_CONTROL_REFRESH\"],\r\n\t\t\t\"0x40000112\": [\"APP_CONTROL_BOOKMARKS\"],\r\n\t\t\t\"0x40000113\": [\"BRIGHTNESS_DOWN\"],\r\n\t\t\t\"0x40000114\": [\"BRIGHTNESS_UP\"],\r\n\t\t\t\"0x40000115\": [\"DISPLAY_SWITCH\"],\r\n\t\t\t\"0x40000116\": [\"BACKLIGHT_TOGGLE\"],\r\n\t\t\t\"0x40000117\": [\"BACKLIGHT_DOWN\"],\r\n\t\t\t\"0x40000118\": [\"BACKLIGHT_UP\"],\r\n\t\t\t\"0x40000119\": [\"EJECT\"],\r\n\t\t\t\"0x4000011A\": [\"SLEEP\"]\r\n\t\t}\r\n\t}\r\n\t");
oge2d_driver_lime_Mouse.x = 0;
oge2d_driver_lime_Mouse.y = 0;
oge2d_driver_lime_MusicSource.STATE_UNPLAYABLE = 0;
oge2d_driver_lime_MusicSource.STATE_READY = 1;
oge2d_driver_lime_MusicSource.STATE_PLAYING = 2;
oge2d_driver_lime_MusicSource.STATE_PAUSED = 3;
oge2d_driver_lime_MusicSource.STATE_ENDED = 4;
oge2d_driver_lime_RendererGL._width = 640;
oge2d_driver_lime_RendererGL._height = 480;
oge2d_driver_lime_SoundSource.STATE_UNPLAYABLE = 0;
oge2d_driver_lime_SoundSource.STATE_READY = 1;
oge2d_script_BytecodeInterp.STATE_UNRUNNABLE = 0;
oge2d_script_BytecodeInterp.STATE_READY = 1;
oge2d_script_BytecodeInterp.STATE_SUSPENDED = 2;
oge2d_script_BytecodeInterp.STATE_ACTIVATED = 3;
oge2d_script_BytecodeInterp.STATE_RUNNING = 4;
oge2d_script_BytecodeInterp.STATE_FAIL = 5;
oge2d_script_BytecodeInterp.STATE_SUCCESS = 6;
oge2d_script_Script.STATE_UNRUNNABLE = 0;
oge2d_script_Script.STATE_READY = 1;
oge2d_script_Script.STATE_SUSPENDED = 2;
oge2d_script_Script.STATE_ACTIVATED = 3;
oge2d_script_Script.STATE_RUNNING = 4;
oge2d_script_Script.STATE_FAIL = 5;
oge2d_script_Script.STATE_SUCCESS = 6;
oge2d_system_Event._dispatching = false;
oge2d_system_Text.DEFAULT_MAX_LENGTH = 16;
unifill_Unicode.minCodePoint = 0;
unifill_Unicode.maxCodePoint = 1114111;
unifill_Unicode.minHighSurrogate = 55296;
unifill_Unicode.maxHighSurrogate = 56319;
unifill_Unicode.minLowSurrogate = 56320;
unifill_Unicode.maxLowSurrogate = 57343;
ApplicationMain.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);

//# sourceMappingURL=ExampleStg.js.map