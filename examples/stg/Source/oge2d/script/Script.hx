package oge2d.script;

/**
 * ...
 * @author JoeLam
 */
class Script {
	
	public static inline var STATE_UNRUNNABLE =  0;
	public static inline var STATE_READY      =  1;
	public static inline var STATE_SUSPENDED  =  2;
	public static inline var STATE_ACTIVATED  =  3;
	public static inline var STATE_RUNNING    =  4;
	public static inline var STATE_FAIL       =  5;
	public static inline var STATE_SUCCESS    =  6;
	
	private var _executor: BytecodeInterp = null;
	private var _contexts: Map<String, Dynamic> = null;
	private var _libs: Map<String, Dynamic> = null;
	
	private var _front: Script = null;
	
	private var _owner: Dynamic = null;
	private var _ready: Bool = false;
	
	public var basis(default, null): Script = null;
	public var format(default, default): String = "";
	public var methods(default, null): Map<String, String> = null;
	
	public static function getScriptMethods(config: Dynamic): Map<String, String> {
		if (config == null) return null;
		var result: Map<String, String> = null;
		var eventNames = Reflect.fields(config);
		for (eventName in eventNames) {
			var methodName: String = cast Reflect.field(config, eventName);
			if (methodName.indexOf(".") < 0) {
				if (result == null) result = new Map<String, String>();
				if (result != null) result.set(eventName, methodName);
			}
		}
		return result;
	}
	
	public static function getLibraryMethods(config: Dynamic): Map<String, String> {
		if (config == null) return null;
		var result: Map<String, String> = null;
		var eventNames: Array<String> = Reflect.fields(config);
		for (eventName in eventNames) {
			var methodName: String = cast Reflect.field(config, eventName);
			if (methodName.indexOf(".") > 0) {
				if (result == null) result = new Map<String, String>();
				if (result != null) result.set(eventName, methodName);
			}
		}
		return result;
	}
	
	public static function load(config: Dynamic, script: Script, content: String, readable: Bool,
								?varNames: Array<String>, ?varValues: Array<Dynamic>) {
		if (script == null) return;
		if (config != null) {
			var eventNames = Reflect.fields(config);
			if (script._front == null) {
				for (eventName in eventNames) script.addMethod(eventName, Reflect.field(config, eventName));
			} else {
				for (eventName in eventNames) {
					var methodName: String = cast Reflect.field(config, eventName);
					// base script accepts methods from script only
					if (methodName.indexOf(".") < 0) script.addMethod(eventName, methodName);
				}
			}
		}
		if (content != null && content.length > 0) {
			var loaded = readable ? script.loadSourceCode(content) : script.loadByteCode(content);
			if (loaded && varNames != null && varValues != null) script.setVariables(varNames, varValues);
		}
	}

	public function new(libMap: Map<String, Dynamic>, scriptOwner: Dynamic, 
						needFallback: Bool = false, frontScript: Script = null) {
		_libs = libMap;
		_owner = scriptOwner;
		_front = frontScript;
		this.basis = needFallback ? new Script(libMap, scriptOwner, false, this) : null;
	}
	
	public function isReady(): Bool {
		if (_ready || this.methods != null) return true;
		else if (this.basis != null) return this.basis.isReady();
		return false;
	}
	
	public function addMethod(eventName: String, methodName: String) {
		if (this.methods == null) this.methods = new Map<String, String>();
		if (this.methods != null) this.methods.set(eventName, methodName);
	}
	
	public function mergeMethods(methodMap: Map<String, String>) {
		if (methodMap == null) return;
		if (this.methods == null) this.methods = new Map<String, String>();
		if (this.methods != null) {
			for (eventName in methodMap.keys()) {
				if (!this.methods.exists(eventName)) this.methods.set(eventName, methodMap[eventName]);
			}
		}
	}
	
	public function loadSourceCode(code: String): Bool {
		if (_executor == null) _executor = new BytecodeInterp();
		if (_contexts == null) _contexts = new Map<String, Dynamic>();
		if (_executor.compile(code)) _ready = _executor.getState() == STATE_READY;
		return _ready;
	}
	
	public function loadByteCode(code: String): Bool {
		if (_executor == null) _executor = new BytecodeInterp();
		if (_contexts == null) _contexts = new Map<String, Dynamic>();
		if (_executor.load(code)) _ready = _executor.getState() == STATE_READY;
		return _ready;
	}
	
	public function setVariables(names: Array<String>, values: Array<Dynamic>): Bool {
		if (!_ready) return false;
		if (names == null || values == null) return false;
		if (names.length != values.length) return false;
		for (i in 0...names.length) _executor.vars.set(names[i], values[i]);
		return true;
	}
	
	public function setLineCallback(callback: Int->Void) {
		if (!_ready) return;
		_executor.onLine = callback;
	}
	
	public function call(eventName:String, ?eventParams: Array<Dynamic>) {
		
		var fn: String = null;
		if (this.methods != null) fn = this.methods.get(eventName);
		if (fn == null) {
			if (this.basis != null) this.basis.call(eventName, eventParams);
			return;
		} else {
			var pos = fn.indexOf(".");
			if (pos > 0) {
				var fname = fn.substr(pos + 1);
				if (fname != null && fname.length > 0) {
					var obj = _libs.get(fn.substring(0, pos));
					if (obj != null) {
						var methodParams: Array<Dynamic> = [_owner];
						if (eventParams != null && eventParams.length > 0) {
							for (eventParam in eventParams) methodParams.push(eventParam);
						}
						Reflect.callMethod(obj, Reflect.field(obj, fname), methodParams);
					}
				}
				return;
			}
		}
		
		if (!_ready) return;
		
		var currentState = _executor.getState();
		if (currentState < STATE_READY) return;
		if (currentState == STATE_RUNNING) return; // not allow to run script in script 
		
		var needToCall: Bool = false;
		
		var ctx = _contexts.get(fn);
		if (ctx != null) {
			if (ctx.state == STATE_SUSPENDED) return;
			if (ctx.state == STATE_ACTIVATED) {
				_executor.setContext(ctx);
				_executor.continues();
			} else needToCall = true;
		} else needToCall = true;
		
		if (needToCall) {
			var inputParams: Array<Dynamic> = [_owner];
			if (eventParams != null && eventParams.length > 0) {
				for (eventParam in eventParams) inputParams.push(eventParam);
			}
			_executor.reset(); // clear stack
			try {
				_executor.callFunc(fn, inputParams);
			} catch (err: Dynamic) {
				var errmsg = _owner == null ? "" : "Script error from "
					+ "[" + Type.getClassName(Type.getClass(_owner)) + "]" + Reflect.field(_owner, "name");
				if (errmsg.length <= 0) errmsg = fn + " - " + err;
				else errmsg = errmsg + "." + fn + " - " + err;
				throw errmsg;
			}
		}
		
		if (_executor.getState() == STATE_SUSPENDED) {
			_contexts.set(fn, _executor.getContext());
		} else if (ctx != null) {
			_contexts.remove(fn);
		}
	}
	
	public function suspend(?eventName:String) {
		if (eventName != null) {
			if (this.methods == null || this.methods.get(eventName) == null) {
				//if (this.basis != null) this.basis.suspend(eventName);
				return;
			}
		}
		if (_front != null) return; // not allow to suspend/resume in base script
		if (!_ready) return;
		_executor.suspend();
	}
	
	public function resume(eventName:String) {
		var fn: String = null;
		if (this.methods != null) fn = this.methods.get(eventName);
		if (fn == null) {
			//if (this.basis != null) this.basis.resume(eventName);
			return;
		}
		if (_front != null) return; // not allow to suspend/resume in base script
		if (!_ready) return;
		var ctx = _contexts.get(fn);
		if (ctx != null && ctx.state == STATE_SUSPENDED) {
			ctx.state = STATE_ACTIVATED;
		}
	}
	
	public function reset() {
		if (!_ready) return;
		_executor.reset();
		_contexts = new Map<String, Dynamic>(); // clear contexts
	}
}
