package oge2d.core;

import oge2d.driver.Asset;
import oge2d.driver.Mouse;
import oge2d.driver.Keyboard;
import oge2d.driver.Texture;
import oge2d.driver.MusicSource;
import oge2d.driver.SoundSource;

import oge2d.script.Script;
import oge2d.system.Updater;

/**
 * ...
 * @author JoeLam
 */
class Game {
	
	public var name(default, null): String = "";
	public var state(default, null): Int = -1;
	public var location(default, null): String = "";

	public var script(default, null): Script = null;
	public var scenes(default, null): Map<String, Scene> = null;
	public var systems(default, null): Map<String, Updater> = null;
	public var libraries(default, null): Map<String, Dynamic> = null;
	public var components(default, null): Map<String, Dynamic> = null;
	
	public var width(default, null): Int = 640;
	public var height(default, null): Int = 480;
	
	public var ticks(default, null): UInt = 0;
	public var interval(default, null): Int = 0;
	
	public var scene(default, set): Scene = null;
	
	public var loadings(default, default): List<Scene> = null;
	
	private function set_scene(value: Scene): Scene {
		if (this.scene != value && value != null) {
			if (this.scene != null) {
				// clear all, for example, remove sprites from updaters
				for (updater in this.scene.systems) updater.bind(this, null);
				this.scene.script.call("onInactive");
			}
			Mouse.reset();
			Keyboard.reset();
			Asset.stopAllMusics();
			Asset.stopAllSounds();
			this.scene = value;
			this.scene.resume();
			this.scene.ticks = 0;
			for (key in this.scene.data.keys()) this.scene.data[key].clear();
			if (this.scene != null) {
				this.scene.script.call("onActive");
				// reset all, for example, add enabled sprites to updaters
				for (updater in this.scene.systems) updater.bind(this, this.scene);
			}
		}
		return this.scene;
	}

	public function new(name: String, ?location: String) {
		this.name = name;
		this.state = -1;
		
		this.systems = new Map<String, Updater>();
		this.libraries = new Map<String, Dynamic>();
		this.components = new Map<String, Dynamic>();
		
		this.scenes = new Map<String, Scene>();
		this.script = new Script(this.libraries, this, false);
		
		this.loadings = new List<Scene>();
		
		if (location != null) this.location = location;
		while (this.location.length > 0 && StringTools.endsWith(this.location, "/"))
			this.location = this.location.substr(0, this.location.length - 1);
		
		Asset.init();
			
		try {
			var config = Asset.getJsonObject(getAppFilePath()); // try to load app info first...
			if (config != null) {
				this.width = config.screen.width;
				this.height = config.screen.height;
				this.script.format = config.script.format;
				this.state = 0;
			}
		} catch (e: Dynamic) {
			// ... 
		}
	}
	
	public function getAppFilePath(): String {
		return this.location + "/app.json";
	}
	public function getGameFilePath(isConfigFile: Bool = true): String {
		return this.location + "/games/" + this.name + (isConfigFile ? ".json" : ".hs");
	}
	public function getImageFilePath(imageName: String): String {
		return this.location + "/images/" + imageName + (imageName.indexOf(".") > 0 ? "" : ".png");
	}
	public function getMusicFilePath(musicName: String): String {
		if (musicName.indexOf(".") > 0) return this.location + "/musics/" + musicName;
		return this.location + "/musics/" + musicName + #if (flash && !as3ogg) ".mp3" #else ".ogg" #end;
	}
	public function getSoundFilePath(soundName: String): String {
		if (soundName.indexOf(".") > 0) return this.location + "/sounds/" + soundName;
		return this.location + "/sounds/" + soundName + #if (flash && !as3ogg) ".mp3" #else ".ogg" #end;
	}
	public function getJsonFilePath(jsonName: String, dataType: String = ""): String {
		if (dataType == null || dataType.length <= 0) return this.location + "/jsons/" + jsonName + ".json";
		return this.location + "/jsons/" + dataType + "/" + jsonName + ".json";
	}
	public function getSpriteFilePath(spriteName: String, isConfigFile: Bool = true): String {
		return this.location + "/sprites/" + spriteName + (isConfigFile ? ".json" : ".hs");
	}
	public function getSceneFilePath(sceneName: String, isConfigFile: Bool = true): String {
		return this.location + "/scenes/" + sceneName + "/" + sceneName + (isConfigFile ? ".json" : ".hs");
	}
	public function getSceneSpriteFilePath(sceneName: String, spriteName: String, isConfigFile: Bool = true): String {
		return this.location + "/scenes/" + sceneName + "/sprites/" + spriteName + (isConfigFile ? ".json" : ".hs");
	}
	public function isReadableScript(): Bool {
		return this.script.format != "bytecode";
	}
	
	public function init(?screenWidth: Int, ?screenHeight: Int, ?callback: Void->Void): Bool {
		
		if (this.state > 0) return this.state > 0;
		
		// get app config
		var appConfig = Asset.getJsonObject(getAppFilePath());
		
		// set screen size
		this.width = (screenWidth != null && screenWidth > 0) ? screenWidth 
						: (appConfig != null ? appConfig.screen.width : this.width);
		this.height = (screenHeight != null && screenHeight > 0) ? screenHeight 
						: (appConfig != null ? appConfig.screen.height : this.height);
		
		// set script format
		if (appConfig != null) this.script.format = appConfig.script.format;
		
		// load asset packs
		var packNames: Array<String> = null;
		if (appConfig != null) packNames = cast appConfig.packs;
		loadPacks(packNames, function() {
			Asset.loadJsonObject(getGameFilePath(), function(config) {
				if (config == null) {
					trace("Failed to load game config");
					if (callback != null) callback();
				} else {
					
					// init inputs ...
					Keyboard.init(appConfig);
					Mouse.init(this.width / 2, this.height / 2);
					
					// load normal components ...
					var fieldNames = Reflect.fields(config);
					for (fieldName in fieldNames) { // set components
						if (fieldName == "scenes") continue;    // skip "scenes"
						if (fieldName == "events") continue;    // skip "events"
						if (fieldName == "systems") continue;   // skip "systems"
						if (fieldName == "libraries") continue; // skip "libraries"
						if (fieldName == "preloads") continue;  // skip "preloads"
						this.components.set(fieldName, Reflect.field(config, fieldName));
					}
					
					// load systems ...
					var systemSettings = config.systems;
					if (systemSettings != null) {
						var systemNames = Reflect.fields(systemSettings);
						for (systemName in systemNames) {
							var systemClassName: String = Reflect.field(systemSettings, systemName);
							if (systemClassName != null) {
								var updater: Updater = cast Type.createInstance(Type.resolveClass(systemClassName), []);
								if (updater != null) this.systems.set(systemName, updater);
							}
						}
					}
					
					// load libraries ...
					var librarySettings = config.libraries;
					if (librarySettings != null) {
						var libraryNames = Reflect.fields(librarySettings);
						for (libraryName in libraryNames) {
							var libraryClassName: String = Reflect.field(librarySettings, libraryName);
							if (libraryClassName != null) {
								var obj = Type.createInstance(Type.resolveClass(libraryClassName), []);
								if (obj != null) this.libraries.set(libraryName, obj);
							}
						}
					}
					
					// load preloads ...
					var list = getPreloadList(config);
					Asset.loadFiles(list, function() {
						if (Reflect.hasField(config, "events")) {
							// load event script ...
							if (Script.getScriptMethods(config.events) != null) {
								var scriptFile = getGameFilePath(false);
								Asset.loadText(scriptFile, function(text) {
									Script.load(config.events, this.script, text, this.isReadableScript(),
												["Keyboard", "Mouse"],
												[ Keyboard,   Mouse ]);
									// load scenes finally ...
									preloadScenes(config, callback);
								});
							} else {
								Script.load(config.events, this.script, "", this.isReadableScript(),
											["Keyboard", "Mouse"],
											[ Keyboard,   Mouse ]);
								// load scenes finally ...
								preloadScenes(config, callback);
							}
						} else {
							// load scenes finally ...
							preloadScenes(config, callback);
						}
					});
				}
			});
		});
		
		return true;
	}
	
	private var _pendings: Array<Dynamic> = null; // to avoid "stack overflow"
	public function loadPacks(packNames: Array<String>, ?total: Int, ?onProgress: Float->Void, ?onComplete: Void->Void) {
		if (_pendings == null) _pendings = new Array<Dynamic>();
		var input = {
			packNames: packNames,
			originalCount: packNames.length,
			onProgress: onProgress,
			onComplete: onComplete
		};
		_pendings.push(input);
	}
	
	public function getPreloadList(config: Dynamic): Array<String> {
		var list: Array<String> = new Array<String>();
		var preloadSettings = config == null ? null : config.preloads;
		if (preloadSettings != null) {
			var resTypes = Reflect.fields(preloadSettings);
			for (resType in resTypes) {
				var preloadNames: Array<String> = cast Reflect.field(preloadSettings, resType);
				if (preloadNames == null || preloadNames.length <= 0) continue;
				if (resType == "jsons") {
					for (preloadName in preloadNames) {
						if (preloadName != null && preloadName.length > 0) {
							var nameParts = preloadName.split("|");
							if (nameParts.length == 1) list.push(getJsonFilePath(nameParts[0]));
							else list.push(getJsonFilePath(nameParts[1], nameParts[0]));
						}
					}
				} else if (resType == "images") {
					for (preloadName in preloadNames) {
						if (preloadName != null && preloadName.length > 0)
							list.push(getImageFilePath(preloadName));
					}
				} else if (resType == "musics") {
					for (preloadName in preloadNames) {
						if (preloadName != null && preloadName.length > 0)
							list.push(getMusicFilePath(preloadName));
					}
				} else if (resType == "sounds") {
					for (preloadName in preloadNames) {
						if (preloadName != null && preloadName.length > 0)
							list.push(getSoundFilePath(preloadName));
					}
				}
			}
		}
		return list;
	}
	
	public function preloadScenes(config: Dynamic, ?callback: Void->Void): Void {
		var sceneNames: Array<String> = cast config.scenes;
		var firstScene = sceneNames != null && sceneNames.length > 0 ? sceneNames[0] : null;
		loadScenes(sceneNames, function() {
			if (this.script.isReady()) this.script.call("onInit");
			if (firstScene != null && firstScene.length > 0) this.state = 1;
			else trace("Scene not found");
			if (callback != null) callback();
			// finally activate the first scene ...
			if (firstScene != null && firstScene.length > 0) this.setActiveScene(firstScene);
		});
	}
	public function loadScene(sceneName: String, callback: Scene->Void) {
		var matched = this.scenes.get(sceneName);
		if (matched != null) {
			callback(matched);
			return;
		}
		var configFile = getSceneFilePath(sceneName);
		Asset.loadJsonObject(configFile, function(sceneConfig) {
			if (sceneConfig != null) {
				var newScene: Scene = new Scene(this, sceneName);
				newScene.init(sceneConfig, function() {
					this.scenes.set(sceneName, newScene);
					callback(newScene);
				});
			} else {
				trace("Failed to load scene with config file: " + configFile);
				callback(null);
			}
		});
	}
	
	private var _loadings: Array<Dynamic> = null; // to avoid "stack overflow"
	public function loadScenes(sceneNames: Array<String>, ?total: Int, ?onProgress: Float->Void, ?onComplete: Void->Void) {
		if (_loadings == null) _loadings = new Array<Dynamic>();
		var input = {
			sceneNames: sceneNames,
			originalCount: sceneNames.length,
			onProgress: onProgress,
			onComplete: onComplete
		};
		_loadings.push(input);
	}
	
	private function processLoading() {
		
		var pending: Dynamic = null;
		if (_pendings != null) pending = _pendings.pop();
		if (pending != null) {
			
			var packNames: Array<String> = cast pending.packNames;
			var total: Int = cast pending.originalCount;
			var onProgress: Float->Void = cast pending.onProgress;
			var onComplete: Void->Void = cast pending.onComplete;
			
			if (packNames != null && packNames.length > 0) {
				var originalCount: Int = total > 0 ? total : packNames.length;
				if (originalCount == packNames.length) packNames.reverse(); // from tail to head...
				var packName = packNames.pop();
				if (packName != null && packName.length > 0) {
					var url = this.location + "/" + packName + (packName.indexOf(".") >= 0 ? "" : ".pack");
					Asset.loadBytes(url, function(bytes) {
						var onePackPercentage: Float = 1.0 / originalCount;
						var loadedPackCount = originalCount - (packNames.length + 1);
						if (bytes != null && bytes.length > 0) {
							Asset.loadPack(bytes, function(loadedItemCount, allItemCount) {
								if (onProgress != null) {
									var processed: Float = onePackPercentage * loadedItemCount / allItemCount;
									onProgress(onePackPercentage * loadedPackCount + processed);
								}
							}, function() {
								if (onProgress != null) onProgress(onePackPercentage * (loadedPackCount + 1));
								loadPacks(packNames, originalCount, onProgress, onComplete);
							});
						} else {
							if (onProgress != null) onProgress(onePackPercentage * (loadedPackCount + 1));
							loadPacks(packNames, originalCount, onProgress, onComplete);
						}
					});
				} else {
					if (onProgress != null) onProgress((1.0 / originalCount) * (originalCount - packNames.length));
					loadPacks(packNames, originalCount, onProgress, onComplete);
				}
			} else {
				_pendings = null;
				if (onComplete != null) onComplete();
			}
			
		}
		
		var input: Dynamic = null;
		if (_loadings != null) input = _loadings.pop();
		if (input != null) {
									
			var sceneNames: Array<String> = cast input.sceneNames;
			var total: Int = cast input.originalCount;
			var onProgress: Float->Void = cast input.onProgress;
			var onComplete: Void->Void = cast input.onComplete;

			if (sceneNames != null && sceneNames.length > 0) {
				var originalCount: Int = total > 0 ? total : sceneNames.length;
				if (originalCount == sceneNames.length) sceneNames.reverse(); // from tail to head...
				var loadedSceneCount: Int = originalCount - sceneNames.length;
				var sceneName = sceneNames.pop();
				if (sceneName != null && sceneName.length > 0) {
					var configFile = getSceneFilePath(sceneName);
					Asset.loadJsonObject(configFile, function(sceneConfig) {
						if (sceneConfig != null) {
							var newScene: Scene = new Scene(this, sceneName);
							newScene.init(sceneConfig, function(loadedItemCount, allItemCount) {
								if (onProgress != null) {
									var oneScenePercentage: Float = 1.0 / originalCount;
									var processed: Float = oneScenePercentage * loadedItemCount / allItemCount;
									onProgress(oneScenePercentage * loadedSceneCount + processed);
								}
							}, function() {
								scenes.set(sceneName, newScene);
								if (onProgress != null) onProgress((1.0 / originalCount) * (loadedSceneCount + 1));
								loadScenes(sceneNames, originalCount, onProgress, onComplete);
							});
						} else {
							trace("Failed to load scene with config file: " + configFile);
							if (onProgress != null) onProgress((1.0 / originalCount) * (loadedSceneCount + 1));
							loadScenes(sceneNames, originalCount, onProgress, onComplete);
						}
					});
				} else {
					if (onProgress != null) onProgress((1.0 / originalCount) * (loadedSceneCount + 1));
					loadScenes(sceneNames, originalCount, onProgress, onComplete);
				}
			} else {
				_loadings = null;
				if (onComplete != null) onComplete();
			}
		}
		
		if (loadings.length > 0) loadings.first().processLoading();
		#if cpp
		Asset.processPending();
		#end
	}
	
	public function removeScene(sceneName: String): Bool {
		var sce: Scene = this.scenes.get(sceneName);
		if (sce == null) return false;
		if (sce == this.scene) {
			trace("Cannot remove current scene");
			return false;
		}
		this.scenes.remove(sceneName);
		return true;
	}
	public function setActiveScene(sceneName: String): Scene {
		var sce: Scene = this.scenes.get(sceneName);
		if (sce == null) return null;
		else this.scene = sce;
		return this.scene;
	}
	public function getScene(sceneName: String): Scene {
		return scenes.get(sceneName);
	}
	public function sce(sceneName: String): Scene {
		return scenes.get(sceneName);
	}
	public function getSprite(spriteName: String): Sprite {
		return scene == null ? null : scene.getSprite(spriteName);
	}
	public function spr(spriteName: String): Sprite {
		return scene == null ? null : scene.getSprite(spriteName);
	}
	public function callScene(sceneName: String) {
		loadScene(sceneName, function(nextScene) {
			if (nextScene != null) setActiveScene(nextScene.name);
		});
	}
	
	public function get(compName: String): Dynamic {
		return components.get(compName);
	}
	public function set(compName: String, comp: Dynamic): Void {
		components.set(compName, comp);
	}
	public function getLibrary(libName: String): Dynamic {
		return library(libName);
	}
	public function library(libName: String): Dynamic {
		return libraries.get(libName);
	}
	public function getLibraryClass(libName: String): Dynamic {
		return lib(libName);
	}
	public function lib(libName: String): Dynamic {
		if (libName == "Math") return Math;
		else if (libName == "Date") return Date;
		else if (libName == "DateTools") return DateTools;
		else if (libName == "StringTools") return StringTools;
		return Type.getClass(libraries.get(libName));
	}
	public function getSystem(systemName: String): Dynamic {
		return system(systemName);
	}
	public function system(systemName: String): Dynamic {
		return systems.get(systemName);
	}
	public function getSystemClass(systemName: String): Dynamic {
		return sys(systemName);
	}
	public function sys(systemName: String): Dynamic {
		return Type.getClass(systems.get(systemName));
	}
	
	public function getJsonData(jsonName: String, dataType: String = ""): Dynamic {
		return Asset.getJsonData(getJsonFilePath(jsonName, dataType));
	}
	
	public function getTexture(texName: String): Texture {
		return Asset.getTexture(getImageFilePath(texName));
	}
	public function loadTexture(texName: String, ?callback: Texture-> Void) {
		Asset.loadTexture(getImageFilePath(texName), callback);
	}
	public function getMusic(musicName: String): MusicSource {
		return Asset.getMusic(getMusicFilePath(musicName));
	}
	public function music(musicName: String): MusicSource {
		return Asset.getMusic(getMusicFilePath(musicName));
	}
	public function loadMusic(musicName: String, ?callback: MusicSource-> Void) {
		Asset.loadMusic(getMusicFilePath(musicName), callback);
	}
	public function getSound(soundName: String): SoundSource {
		return Asset.getSound(getSoundFilePath(soundName));
	}
	public function sound(soundName: String): SoundSource {
		return Asset.getSound(getSoundFilePath(soundName));
	}
	public function loadSound(soundName: String, ?callback: SoundSource->Void) {
		Asset.loadSound(getSoundFilePath(soundName), callback);
	}
	public function stopAllMusics() {
		Asset.stopAllMusics();
	}
	public function stopAllSounds() {
		Asset.stopAllSounds();
	}
	public function removeTexture(texName: String) {
		Asset.removeTexture(getImageFilePath(texName));
	}
	public function removeMusic(musicName: String) {
		Asset.removeMusic(getMusicFilePath(musicName));
	}
	public function removeSound(soundName: String) {
		Asset.removeSound(getSoundFilePath(soundName));
	}
	
	public function call(libName:String, funcName:String, ?funcParams: Array<Dynamic>): Dynamic {
		var obj = this.libraries.get(libName);
		if (obj == null) return null;
		var method = Reflect.field(obj, funcName);
		if (method == null) return null;
		return Reflect.callMethod(obj, method, funcParams == null ? [] : funcParams);
	}
	public function log(content) {
		trace("[" + Date.now().toString().split(" ")[1] + "] " + content);
	}
	public function getOS(): String {
		#if ios
		return "ios";
		#elseif mac
		return "mac";
		#elseif linux
		return "linux";
		#elseif android
		return "android";
		#elseif html5
		return "html5";
		#elseif flash
		return "flash";
		#elseif (windows && mobile)
		return "windows-phone"; // i think this would not happen ...
		#elseif windows
		return "windows";
		#else
		return "unknown";
		#end
	}
	
	public function update(time: Int) {
		ticks += time;
		interval = time;
		if (state > 0) {
			if (scene != null) scene.update(time);
			if (script.methods != null 
				&& script.methods.exists("onUpdate")) script.call("onUpdate");
		}
		processLoading();
	}
}
