package oge2d.core;

import oge2d.driver.Asset;
import oge2d.driver.Mouse;
import oge2d.driver.Keyboard;
import oge2d.driver.DisplayBuffer;

import oge2d.script.Script;

/**
 * ...
 * @author JoeLam
 */
class Sprite {

	public var name(default, null): String = "";
	public var scene(default, null): Scene = null;
	
	public var script(default, null): Script = null;
	public var events(default, null): List<Dynamic> = null;
	
	public var buffer(default, default): DisplayBuffer = null;
	
	public var index(default, null): Int = 0;
	
	public var enabled(default, set): Bool = false;
	public var game(default, null): Game;
	
	public var components(default, null): Map<String, Dynamic> = null;
	
	private var _template: String = "";
	
	function set_enabled(value: Bool): Bool {
		if (this.enabled != value) {
			this.enabled = value;
			if (this.scene == this.scene.game.scene) {
				if (this.enabled) for (updater in this.scene.systems) updater.include(this);
				else for (updater in this.scene.systems) updater.exclude(this);
			}
			if (this.script.isReady()) {
				if (this.scene == this.scene.game.scene) {
					if (this.enabled) this.script.call("onActive");
					else this.script.call("onInactive");
				} else {
					if (this.enabled) this.addEvent("onActive");
					else this.addEvent("onInactive");
				}
			}
		}
		return this.enabled;
	}

	public function new(scene: Scene, name: String) {
		this.name = name;
		this.scene = scene;
		this.game = scene.game;
		
		this.script = new Script(this.scene.game.libraries, this, true);
		this.events = new List<Dynamic>();
		
		this.components = new Map<String, Dynamic>();
	}
	
	public function get(compName: String): Dynamic {
		return components.get(compName);
	}
	public function set(compName: String, comp: Dynamic): Void {
		components.set(compName, comp);
	}
	public function getTemplateName(): String {
		return _template;
	}
	public function addEvent(eventName: String, ?eventParam: Dynamic) {
		this.events.add( { name: eventName, param: eventParam } );
	}
	public function enable() {
		enabled = true;
	}
	public function disable() {
		enabled = false;
	}
	
	private function loadEventScript(eventConfig: Dynamic, extraMethods: Map<String, String>, ?callback: Void->Void) {
		if (scene == null) {
			if (callback != null) callback();
			return;
		}
		if (Script.getScriptMethods(eventConfig) != null) {
			var scriptFilePath = game.getSceneSpriteFilePath(scene.name, name, false);
			Asset.loadText(scriptFilePath, function(scriptText) {
				Script.load(eventConfig, script, scriptText, game.isReadableScript(),
							["Game", "Scene", "Keyboard", "Mouse"],
							[game,    scene,   Keyboard,   Mouse]);
				if (extraMethods != null) script.mergeMethods(extraMethods);
				if (callback != null) callback();
			});
		} else {
			Script.load(eventConfig, script, "", game.isReadableScript(),
						["Game", "Scene", "Keyboard", "Mouse"],
						[game,    scene,   Keyboard,   Mouse]);
			if (extraMethods != null) script.mergeMethods(extraMethods);
			if (callback != null) callback();
		}
	}
	
	public function init(config: Dynamic, indexNumber: Int, ?callback: Void->Void) {

		var templateName: String = config.base.template;
		var configFile: String = "";
		
		this.index = indexNumber;
		this._template = templateName;
		
		if (templateName != null && templateName.length > 0) {
			configFile = scene.game.getSpriteFilePath(templateName);
			Asset.loadJsonObject(configFile, function(setting) {
				if (setting == null) {
					if (configFile == null || configFile.length <= 0) trace("Failed to load sprite with template");
					else trace("Failed to load sprite template with config file: " + configFile);
					if (callback != null) callback();
				} else {
					
					var currentFieldNames = Reflect.fields(config);
					var templateFieldNames = Reflect.fields(setting);
					
					// load components
					for (fieldName in templateFieldNames) { // set components from template
						if (fieldName == "base") continue; // skip "base"
						if (fieldName == "events") continue; // skip "events" here (will load them in next step)
						if (fieldName == "preloads") continue; // skip "preloads"
						if (currentFieldNames.indexOf(fieldName) >= 0) { // try to merge ...
							var oldBlock = Reflect.field(setting, fieldName);
							var newBlock = Reflect.field(config, fieldName);
							var blockFieldNames = Reflect.fields(newBlock);
							for (blockFieldName in blockFieldNames) {
								Reflect.setField(oldBlock, blockFieldName, Reflect.field(newBlock, blockFieldName));
							}
						}
						this.components.set(fieldName, Reflect.field(setting, fieldName));
					}
					for (fieldName in currentFieldNames) { // set new components that missing in template
						if (fieldName == "base") continue; // skip "base"
						if (fieldName == "events") continue; // skip "events"
						if (fieldName == "preloads") continue; // skip "preloads"
						if (templateFieldNames.indexOf(fieldName) < 0) {
							this.components.set(fieldName, Reflect.field(config, fieldName));
						}
					}
					
					// load preloads...
					var list = scene.game.getPreloadList(setting);
					var currentList = scene.game.getPreloadList(config);
					for (item in currentList) {
						if (list.indexOf(item) < 0) list.push(item);
					}
					Asset.loadFiles(list, function() {
						// load events ...
						var libraryMethods: Map<String, String> = null;
						if (templateFieldNames.indexOf("events") >= 0) {
							var baseEventConfig = Reflect.field(setting, "events");
							libraryMethods = Script.getLibraryMethods(baseEventConfig);
							if (Script.getScriptMethods(baseEventConfig) != null) {
								var scriptFile = scene.game.getSpriteFilePath(templateName, false);
								Asset.loadText(scriptFile, function(text) {
									Script.load(baseEventConfig, script.basis, text, scene.game.isReadableScript(),
											["Game",     "Scene",  "Keyboard", "Mouse"],
											[scene.game,  scene,    Keyboard,   Mouse]);
									if (currentFieldNames.indexOf("events") >= 0) {
										loadEventScript(Reflect.field(config, "events"), libraryMethods, callback);
									} else {
										script.mergeMethods(libraryMethods);
										if (callback != null) callback();
									}
								});
							} else {
								Script.load(baseEventConfig, script.basis, "", scene.game.isReadableScript(),
											["Game",     "Scene",  "Keyboard", "Mouse"],
											[scene.game,  scene,    Keyboard,   Mouse]);
								if (currentFieldNames.indexOf("events") >= 0) {
									loadEventScript(Reflect.field(config, "events"), libraryMethods, callback);
								} else {
									script.mergeMethods(libraryMethods);
									if (callback != null) callback();
								}
							}
							
						} else if (currentFieldNames.indexOf("events") >= 0) {
							loadEventScript(Reflect.field(config, "events"), libraryMethods, callback);
						} else {
							script.mergeMethods(libraryMethods);
							if (callback != null) callback();
						}
					});
				}
			});
		} else {
			if (callback != null) callback();
		}
	}
}
