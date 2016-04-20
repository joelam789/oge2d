package oge2d.core;

import oge2d.driver.Asset;
import oge2d.driver.Mouse;
import oge2d.driver.Keyboard;

import oge2d.script.Script;
import oge2d.system.Updater;

/**
 * ...
 * @author JoeLam
 */
class Scene {
	
	public var name(default, null): String = "";
	public var game(default, null): Game = null;
	
	public var script(default, null): Script = null;
	public var events(default, null): List<Dynamic> = null;
	
	public var components(default, null): Map<String, Dynamic> = null;
	
	public var systems(default, null): Map<String, Updater> = null;
	public var _systems: Array<Updater> = null;
	
	public var sprites(default, null): Map<String, Sprite> = null;
	private var _sprites: Array<Sprite> = null;
	
	private var _paused: Bool = false;
	public var timers(default, null): List<Dynamic> = null;
	
	public var ticks(default, default): UInt = 0;
	public var dispatching(default, default): Bool = false;

	public function new(game: Game, name: String) {
		this.name = name;
		this.game = game;
		
		this.script = new Script(this.game.libraries, this, false);
		this.events = new List<Dynamic>();
		
		this.components = new Map<String, Dynamic>();
		
		this.systems = new Map<String, Updater>();
		this._systems = new Array<Updater>();
		
		this.sprites = new Map<String, Sprite>();
		this._sprites = new Array<Sprite>();
		
		this.timers = new List<Dynamic>();
	}
	
	public function init(config: Dynamic, ?onProgress: Int->Int->Void, ?onComplete: Void->Void) {
		
		if (this.game == null || config == null) {
			if (onComplete != null) onComplete();
			return;
		}
		
		// set systems
		var systemNames: Array<String> = cast config.systems;
		for (systemName in systemNames) {
			var updater: Updater = this.game.systems.get(systemName);
			if (updater != null) {
				this._systems.push(updater);
				this.systems.set(systemName, updater);
			}
		}
		
		// load components
		var fieldNames = Reflect.fields(config);
		var eventConfig: Dynamic = null;
		for (fieldName in fieldNames) { // set components
			if (fieldName == "systems") continue; // skip "systems"
			if (fieldName == "sprites") continue; // skip "sprites"
			if (fieldName == "preloads") continue;// skip "preloads"
			if (fieldName == "events") {
				eventConfig = Reflect.field(config, fieldName);
				continue;
			}
			// load normal components
			this.components.set(fieldName, Reflect.field(config, fieldName));
		}
		
		// load preloads ...
		var resList: Array<String> = game.getPreloadList(config);
		var resItemCount: Int = resList.length;
		var spriteNames: Array<String> = cast config.sprites;
		var total = resItemCount + spriteNames.length;
		Asset.loadFiles(resList, function(loadedItemCount, allItemCount) {
			if (onProgress != null) onProgress(loadedItemCount, total);
		}, function() {
			if (eventConfig != null) {
				if (Script.getScriptMethods(eventConfig) != null) {
					// load event script ...
					var scriptFile = game.getSceneFilePath(name, false);
					Asset.loadText(scriptFile, function(text) {
						Script.load(eventConfig, script, text, game.isReadableScript(),
									["Game", "Keyboard", "Mouse"],
									[game,    Keyboard,   Mouse]);
						// load sprites finally
						preloadSprites(config, function(loadedSprCount, allSprCount) {
							if (onProgress != null) onProgress(loadedSprCount + resItemCount, total);
						}, onComplete);
					});
				} else {
					Script.load(eventConfig, script, "", game.isReadableScript(),
								["Game", "Keyboard", "Mouse"],
								[game,    Keyboard,   Mouse]);
					// load sprites finally
					preloadSprites(config, function(loadedSprCount, allSprCount) {
						if (onProgress != null) onProgress(loadedSprCount + resItemCount, total);
					}, onComplete);
				}
			} else {
				// load sprites finally
				preloadSprites(config, function(loadedSprCount, allSprCount) {
					if (onProgress != null) onProgress(loadedSprCount + resItemCount, total);
				}, onComplete);
			}
		});
	}
	
	public function reset() {
		
		// reload scene's components
		var sceneConfig = Asset.getJsonObject(game.getSceneFilePath(name));
		if (sceneConfig != null) {
			
			var fieldNames = Reflect.fields(sceneConfig);
			for (fieldName in fieldNames) { // set components
				if (fieldName == "systems") continue; // skip "systems"
				if (fieldName == "sprites") continue; // skip "sprites"
				if (fieldName == "preloads") continue;// skip "preloads"
				if (fieldName == "events") continue;  // skip "events"
				// load normal components
				components.set(fieldName, Reflect.field(sceneConfig, fieldName));
			}
		}
		
		// reload sprites' components
		for (spr in _sprites) {
			
			if (spr.index != 0) continue;
			
			var config = Asset.getJsonObject(game.getSceneSpriteFilePath(name, spr.name));
			if (config == null) continue;
			
			var templateName: String = config.base.template;
			if (templateName == null || templateName.length <= 0) continue;
			
			var setting = Asset.getJsonObject(game.getSpriteFilePath(templateName));
			if (setting == null) continue;
			
			var currentFieldNames = Reflect.fields(config);
			var templateFieldNames = Reflect.fields(setting);
			// load components
			for (fieldName in templateFieldNames) { // set components from template
				if (fieldName == "base") continue; // skip "base"
				if (fieldName == "events") continue; // skip "events"
				if (fieldName == "preloads") continue; // skip "preloads"
				if (currentFieldNames.indexOf(fieldName) >= 0) { // try to merge ...
					var oldBlock = Reflect.field(setting, fieldName);
					var newBlock = Reflect.field(config, fieldName);
					var blockFieldNames = Reflect.fields(newBlock);
					for (blockFieldName in blockFieldNames) {
						Reflect.setField(oldBlock, blockFieldName, Reflect.field(newBlock, blockFieldName));
					}
				}
				spr.components.set(fieldName, Reflect.field(setting, fieldName));
			}
			for (fieldName in currentFieldNames) { // set new components that missing in template
				if (fieldName == "base") continue; // skip "base"
				if (fieldName == "events") continue; // skip "events"
				if (fieldName == "preloads") continue; // skip "preloads"
				if (templateFieldNames.indexOf(fieldName) < 0) {
					spr.components.set(fieldName, Reflect.field(config, fieldName));
				}
			}
			
			spr.enabled = config.base.enabled;
		}
	}
	
	public function preloadSprites(config: Dynamic, ?onProgress: Int->Int->Void, ?onComplete: Void->Void): Void {
		var spriteNames: Array<String> = cast config.sprites;
		spriteNames.reverse(); // from tail to head ...
		var configNames: Map<String, String> = new Map<String, String>();
		var spriteIndexes: Map<String, Int> = new Map<String, Int>();
		for (spriteName in spriteNames) {
			configNames.set(spriteName, spriteName);
			spriteIndexes.set(spriteName, 0);
		}
		loadSprites(spriteNames, configNames, spriteIndexes, spriteNames.length, onProgress, onComplete);
	}
	
	public function loadSprite(spriteName: String, callback: Sprite->Void) {
		var matched = sprites.get(spriteName);
		if (matched != null) {
			callback(matched);
			return;
		}
		var configFile = game.getSceneSpriteFilePath(this.name, spriteName);
		Asset.loadJsonObject(configFile, function(spriteConfig) {
			if (spriteConfig != null) {
				var newSprite = new Sprite(this, spriteName);
				newSprite.init(spriteConfig, 0, function() {
					sprites.set(spriteName, newSprite);
					_sprites.push(newSprite);
					newSprite.enabled = spriteConfig.base.enabled;
					callback(newSprite);
				});
			} else {
				trace("Failed to load sprite with config file: " + configFile);
				callback(null);
			}
		});
	}
	
	public function loadSprites(spriteNames: Array<String>, configNames: Map<String, String>, 
								spriteIndexes: Map<String, Int>, ?total: Int, 
								?onProgress: Int->Int->Void, ?onComplete: Void->Void) {
		if (spriteNames != null && spriteNames.length > 0) {
			var originalCount: Int = total != null && total > 0 ? total : spriteNames.length;
			var spriteName = spriteNames.pop();
			if (spriteName != null && spriteName.length > 0) {
				var configFile = game.getSceneSpriteFilePath(name, configNames.get(spriteName));
				Asset.loadJsonObject(configFile, function(spriteConfig) {
					if (spriteConfig != null) {
						var newSprite = new Sprite(this, spriteName);
						var sprIndex = spriteIndexes.get(spriteName);
						var sprCount: Int = spriteConfig.base.count != null ? cast spriteConfig.base.count : 1;
						if (sprIndex > 0) sprCount = 0; // not available for the copies
						newSprite.init(spriteConfig, sprIndex, function() {
							sprites.set(spriteName, newSprite);
							_sprites.push(newSprite);
							newSprite.enabled = spriteConfig.base.enabled;
							configNames.remove(spriteName);
							spriteIndexes.remove(spriteName);
							if (sprCount > 1) {
								for (idx in 1...sprCount) {
									var copyName: String = spriteName + "-" + idx;
									configNames.set(copyName, spriteName);
									spriteIndexes.set(copyName, idx);
									spriteNames.push(copyName);
								}
							}
							if ((sprIndex == 0 && sprCount == 1) || sprIndex == 1) {
								if (onProgress != null) onProgress(originalCount - spriteNames.length, originalCount);
							}
							loadSprites(spriteNames, configNames, spriteIndexes, originalCount, onProgress, onComplete);
						});
					} else {
						trace("Failed to load sprite with config file: " + configFile);
						configNames.remove(spriteName);
						spriteIndexes.remove(spriteName);
						if (onProgress != null) onProgress(originalCount - spriteNames.length, originalCount);
						loadSprites(spriteNames, configNames, spriteIndexes, originalCount, onProgress, onComplete);
					}
				});
			} else {
				if (onProgress != null) onProgress(originalCount - spriteNames.length, originalCount);
				loadSprites(spriteNames, configNames, spriteIndexes, originalCount, onProgress, onComplete);
			}
		} else if (onComplete != null) onComplete();
	}
	public function getSprite(spriteName: String): Sprite {
		return sprites.get(spriteName);
	}
	public function spr(spriteName: String): Sprite {
		return sprites.get(spriteName);
	}
	public function getSprites(): Array<Sprite> {
		return _sprites.copy();
	}
	public function filter(fn: Sprite-> Bool): Array<Sprite> {
		return _sprites.filter(fn);
	}
	public function sort(fn: Sprite->Sprite->Int): Void {
		_sprites.sort(fn);
	}
	
	public function addEvent(eventName: String, ?eventParam: Dynamic) {
		this.events.add( { name: eventName, param: eventParam } );
	}
	public function addTimer(time: Int, ?sprite: Sprite, ?callback: Void->Void) {
		if (time <= 0 || (sprite == null && callback == null)) return;
		this.timers.add( { start: this.ticks, time: time, sprite: sprite, callback: callback } );
	}
	public function stopEventDispatching() {
		dispatching = false;
	}
	
	public function isPaused(): Bool {
		return _paused;
	}
	public function pause(): Void {
		_paused = true;
	}
	public function resume(): Void {
		_paused = false;
	}
	
	public function get(compName: String): Dynamic {
		return components.get(compName);
	}
	public function set(compName: String, comp: Dynamic): Void {
		components.set(compName, comp);
	}
	
	public function update(?time: Int, ?updaters: Array<Updater>) {
		var allSystems: Array<Updater> = updaters == null ? _systems : updaters;
		if (allSystems != null) {
			if (time != null && _paused == false) this.ticks += time;
			for (updater in allSystems) updater.begin(this);
			for (updater in allSystems) {
				if (updater.batched()) continue;
				for (spr in _sprites) if (spr.enabled) updater.update(spr);
			}
			for (updater in allSystems) updater.end(this);
		}
	}
}
