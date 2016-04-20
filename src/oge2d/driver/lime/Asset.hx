package oge2d.driver.lime;

import haxe.Json;
import haxe.io.Bytes;
import haxe.io.BytesInput;
import haxe.io.BytesOutput;
import haxe.zip.Entry;
import haxe.zip.Reader;

#if cpp
import sys.io.File;
import cpp.vm.Thread;
import cpp.vm.Mutex;
#end

import lime.Assets;
import lime.graphics.Image;
import lime.net.HTTPRequest;

/**
 * ...
 * @author JoeLam
 */
class Asset {
	
	static var _key: String = "";
	
	static var _buf: Bytes = null;
	
	static var _onweb: Bool = #if (html5 || (flash && !debug)) true; #else false; #end
	
	#if flash
	static var _textures: Map<String, TextureStage3D> = new Map<String, TextureStage3D>();
	#else
	static var _textures: Map<String, TextureGL> = new Map<String, TextureGL>();
	#end
	
	#if cpp
	static var _mutex: Mutex = null;
	static var _thread: Thread = null;
	static var _processing: Bool = false;
	static var _results: List<Dynamic> = new List<Dynamic>();
	#end
	
	static var _texts: Map<String, String> = new Map<String, String>();
	
	static var _jsons: Map<String, Dynamic> = new Map<String, Dynamic>();
	
	static var _musics: Map<String, MusicSource> = new Map<String, MusicSource>();
	
	static var _sounds: Map<String, SoundSource> = new Map<String, SoundSource>();
	
	static var _queue: List<String> = new List<String>();

	public function new() {
		
	}
	
	#if cpp
	public static function processPending() {
		if (_processing || _results.length <= 0) return; // no need to lock...
		var msg: Dynamic = null;
		_mutex.acquire();
		msg = _results.pop();
		_mutex.release();
		if (msg != null && msg.callback != null) msg.callback(msg.result);
	}
	#end
	
	public static function init(): Void {
		
		if (_buf != null) return; // should have initialized already
		
		MusicSource.init();
		SoundSource.init();
		
		#if flash
		try {
			var objectID: String = flash.external.ExternalInterface.objectID;
			_onweb = objectID != null && objectID.length > 0;
		} catch (e: Dynamic) {
			_onweb = false;
			#if debug trace("Flash is running locally"); #end
		}
		#end
		
		#if cpp
		_mutex = new Mutex();
		_thread = Thread.create(function() {
			var msg = Thread.readMessage(true);
			while (msg != null && msg.process != null) {
				_processing = true;
				var pending = {
					result: null,
					callback: null
				};
				try {
					pending.result = msg.process(msg.param);
					pending.callback = msg.callback;
				} catch (e: Dynamic) {
					trace("Failed to process pending assets in thread: " + e);
				}
				_mutex.acquire();
				_results.add(pending);
				_mutex.release();
				_processing = false;
				msg = Thread.readMessage(true);
			}
		});
		#end
		
		_buf = Bytes.alloc(65536); // 64k global buffer
	}
	public static function setKey(key: String) {
		_key = key;
	}
	public static function encrypt(bytes: Bytes) {
		oge2d.build.Macro.encrypt(bytes, _key);
	}
	public static function decrypt(bytes: Bytes) {
		oge2d.build.Macro.decrypt(bytes, _key);
	}
	
	public static function loadBytes(url: String, callback: Bytes->Void) {
		if (_onweb) {
			var req: HTTPRequest = new HTTPRequest();
			req.load(url)
			.onComplete(function(data) {
				callback(data);
			})
			.onError(function(err) {
				#if debug trace("Failed to load data from url: " + url); trace(err); #end
				callback(null);
			});
		} else {
			#if flash
			var request: flash.net.URLRequest = new flash.net.URLRequest(url);
			var urlLoader: flash.net.URLLoader = new flash.net.URLLoader(request);
			urlLoader.dataFormat = flash.net.URLLoaderDataFormat.BINARY;
			urlLoader.addEventListener(flash.events.Event.COMPLETE, function(event) {
				callback(Bytes.ofData(urlLoader.data));
			});
			urlLoader.addEventListener(flash.events.SecurityErrorEvent.SECURITY_ERROR, function(event) {
				#if debug trace("Failed to load data via URLLoader: " + event); #end
				callback(null);
			});
			urlLoader.addEventListener(flash.events.IOErrorEvent.IO_ERROR, function(event) {
				#if debug trace("Failed to load data via URLLoader: " + event); #end
				callback(null);
			});
			try {
                urlLoader.load(request);
            } catch (e: Dynamic) {
                #if debug trace("Failed to load data via URLLoader: " + e); #end
				callback(null);
            }
			#elseif cpp
			
			/*
			var bytes: Bytes = null;
			try {
				bytes = File.getBytes(url);
			} catch (e: Dynamic) {
				#if debug trace("Failed to load data via FileSystem: " + e); #end
				bytes = null;
			}
			callback(bytes);
			*/
			
			var msg = {
				param: url,
				process: function(src): Bytes {
					var bytes: Bytes = null;
					try {
						bytes = File.getBytes(url);
					} catch (e: Dynamic) {
						#if debug trace("Failed to load data via FileSystem: " + e); #end
					}
					return bytes;
				},
				callback: callback
				
			}
			_thread.sendMessage(msg);
			
			#else
			callback(null); // not support
			#end
		}
	}
	
	public static function loadText(url: String, ?callback: String->Void) {
		var text = _texts.get(url);
		if (text != null) {
			if (callback != null) callback(text);
			return;
		}
		loadBytes(url, function(bytes) {
			if (bytes == null) {
				if (callback != null) callback(null);
			} else {
				var result = bytes.toString();
				if (result != null && result.length > 0) _texts.set(url, result); // just cache non-empty string
				if (callback != null) callback(result);
			}
		});
	}
	public static function loadJsonObject(url: String, ?callback: Dynamic->Void) {
		loadText(url, function(text) {
			if (text == null || text.length <= 0) {
				if (callback != null) callback(null);
			} else {
				var result = null;
				try {
					result = Json.parse(text);
				} catch (e: Dynamic) {
					#if debug trace("Failed to parse json: " + url + ", error: " + e); #end
				}
				if (callback != null) callback(result);
			}
		});
	}
	public static function loadJsonData(url: String, ?callback: Dynamic->Void) {
		var json = _jsons.get(url);
		if (json != null) {
			if (callback != null) callback(json);
			return;
		}
		loadBytes(url, function(bytes) {
			if (bytes == null) {
				if (callback != null) callback(null);
			} else {
				var result = null;
				try {
					result = Json.parse(bytes.toString());
				} catch (e: Dynamic) {
					#if debug trace("Failed to parse json: " + url + ", error: " + e); #end
				}
				if (result != null) _jsons.set(url, result);
				if (callback != null) callback(result);
			}
		});
	}
	public static function loadMusic(url: String, ?callback: MusicSource->Void) {
		var music = _musics.get(url);
		if (music != null) {
			if (callback != null) callback(music);
			return;
		}
		loadBytes(url, function(bytes) {
			if (bytes == null) {
				if (callback != null) callback(null);
			} else {
				
				#if cpp
				
				var msg = {
					param: { url: url, data: bytes },
					process: function(src): Dynamic {
						var result = {
							url: src.url,
							music: new MusicSource(),
							callback: callback
						};
						result.music.load(src.data);
						return result;
					},
					callback: function(rsl) {
						var musicUrl: String = cast rsl.url;
						var musicObj: MusicSource = cast rsl.music;
						if (musicObj.state <= 0) {
							if (rsl.callback != null) rsl.callback(null);
						} else {
							_musics.set(musicUrl, musicObj);
							if (rsl.callback != null) rsl.callback(rsl.music);
						}
					}
				}
				_thread.sendMessage(msg);
				
				#else
				
				var result = new MusicSource();
				result.load(bytes, function() {
					if (result.state <= 0) {
						if (callback != null) callback(null);
					} else {
						_musics.set(url, result);
						if (callback != null) callback(result);
					}
				});
				
				#end
			}
		});
	}
	
	public static function loadSound(url: String, ?callback: SoundSource->Void) {
		var sound = _sounds.get(url);
		if (sound != null) {
			if (callback != null) callback(sound);
			return;
		}
		loadBytes(url, function(bytes) {
			if (bytes == null) {
				if (callback != null) callback(null);
			} else {
				
				#if cpp
				
				var msg = {
					param: { url: url, data: bytes },
					process: function(src): Dynamic {
						var result = {
							url: src.url,
							sound: new SoundSource(),
							callback: callback
						};
						result.sound.load(src.data);
						return result;
					},
					callback: function(rsl) {
						var soundUrl: String = cast rsl.url;
						var soundObj: SoundSource = cast rsl.sound;
						if (soundObj.state <= 0) {
							if (rsl.callback != null) rsl.callback(null);
						} else {
							_sounds.set(soundUrl, soundObj);
							if (rsl.callback != null) rsl.callback(rsl.sound);
						}
					}
				}
				_thread.sendMessage(msg);
				
				#else
				
				var result = new SoundSource();
				result.load(bytes, function() {
					if (result.state <= 0) {
						if (callback != null) callback(null);
					} else {
						_sounds.set(url, result);
						if (callback != null) callback(result);
					}
				});
				
				#end
			}
		});
	}
	
	public static function loadTexture(url: String, 
							?callback: #if flash TextureStage3D->Void #else TextureGL->Void #end) {
		var tex = _textures.get(url);
		if (tex != null) {
			if (callback != null) callback(tex);
			return;
		}
		loadBytes(url, function(bytes) {
			if (bytes == null) {
				if (callback != null) callback(null);
			} else {
				#if flash
				// would use Loader.loadBytes(), so need to make the call async...
				RendererStage3D.loadTexture(url, bytes, function(texture) {
					if (texture != null) _textures.set(url, texture);
					if (callback != null) callback(texture);
				});
				#elseif html5
				// also need to make the call async...
				Image.fromBytes(bytes, function(img) {
					var texture: TextureGL = null;
					if (img != null) {
						texture = RendererGL.createTexture(img);
						if (texture != null) _textures.set(url, texture);
					}
					if (callback != null) callback(texture);
				});
				#else
				
				/*
				var texture: TextureGL = null;
				var image: Image = Image.fromBytes(bytes);
				if (image != null) texture = RendererGL.createTexture(image);
				if (texture != null) _textures.set(url, texture);
				if (callback != null) callback(texture);
				*/
				
				var msg = {
					param: { url: url, data: bytes },
					process: function(src): Dynamic {
						var result = {
							url: src.url,
							image: Image.fromBytes(src.data),
							callback: callback
						};
						return result;
					},
					callback: function(rsl) {
						var imageUrl: String = cast rsl.url;
						var imageObj: Image = cast rsl.image;
						if (imageObj == null) {
							if (rsl.callback != null) rsl.callback(null);
						} else {
							var texture: TextureGL = RendererGL.createTexture(imageObj);
							if (texture != null) _textures.set(imageUrl, texture);
							if (rsl.callback != null) rsl.callback(texture);
						}
					}
				}
				_thread.sendMessage(msg);
				
				#end
			}
		});
	}
	
	public static function getText(url: String): String {
		var text = _texts.get(url);
		if (text != null) return text;
		text = Assets.getText(url);
		if (text != null && text.length > 0) _texts.set(url, text); // just cache non-empty string
		return text;
	}
	public static function getJsonObject(url: String): Dynamic {
		var text = getText(url);
		if (text == null || text.length <= 0) return null;
		return Json.parse(text);
	}
	public static function getJsonData(url: String): Dynamic {
		var json = _jsons.get(url);
		if (json != null) return json;
		var text = Assets.getText(url);
		if (text == null || text.length <= 0) return null;
		else json = Json.parse(text);
		if (json != null) _jsons.set(url, json);
		return json;
	}
	
	public static function getMusic(url: String): MusicSource {
		var music = _musics.get(url);
		if (music != null) return music;
		var bytes = Assets.getBytes(url);
		if (bytes == null) return null;
		music = new MusicSource();
		music.load(bytes);
		if (music.state <= 0) return null;
		_musics.set(url, music);
		return music;
	}
	
	public static function getSound(url: String): SoundSource {
		var sound = _sounds.get(url);
		if (sound != null) return sound;
		var bytes = Assets.getBytes(url);
		if (bytes == null) return null;
		sound = new SoundSource();
		sound.load(bytes);
		if (sound.state <= 0) return null;
		_sounds.set(url, sound);
		return sound;
	}
	
	public static function getTexture(url: String): #if flash TextureStage3D #else TextureGL #end {
		var tex = _textures.get(url);
		if (tex != null) return tex;
		var image: Image = Assets.getImage(url);
		if (image == null) return null;
		tex = #if flash RendererStage3D.createTexture(image); #else RendererGL.createTexture(image); #end
		if (tex != null) _textures.set(url, tex);
		return tex;
	}
	
	public static function removeTexture(url: String) {
		var tex = _textures.get(url);
		if (tex != null) {
			#if flash RendererStage3D.deleteTexture(tex); #else RendererGL.deleteTexture(tex); #end
			_textures.remove(url);
		}
	}
	
	public static function removeMusic(url: String) {
		var music = _musics.get(url);
		if (music != null) {
			music.dispose();
			_musics.remove(url);
		}
	}
	
	public static function removeSound(url: String) {
		var sound = _sounds.get(url);
		if (sound != null) {
			sound.dispose();
			_sounds.remove(url);
		}
	}
	
	public static function stopAllMusics() {
		for (url in _musics.keys()) {
			_musics.get(url).stop();
		}
	}
	
	public static function stopAllSounds() {
		for (url in _sounds.keys()) {
			_sounds.get(url).stop();
		}
	}
	
	public static function getBytes(url: String): Bytes {
		return Assets.getBytes(url);
	}
	
	private static function unzip(entry: Entry): Bytes {
		//return Uncompress.run(entry.data);
		#if flash
		// the input buffer is for unzip only, so just use it directly, no need to copy another one
		var data = entry.data.getData();
		data.uncompress(flash.utils.CompressionAlgorithm.DEFLATE);
		return Bytes.ofData(data);
		#elseif html5
        var output = new haxe.io.BytesBuffer();
        var inflate = new haxe.zip.InflateImpl(new BytesInput(entry.data), false, false);
		while( true ) {
			var len = inflate.readBytes(_buf, 0, _buf.length);
			output.addBytes(_buf, 0, len);
			if (len < _buf.length) break;
		}
		return output.getBytes();
		#else
		return Reader.unzip(entry);
		#end
	}
	public static function loadPack(bytes: Bytes, ?onProgress: Int->Int->Void, ?onComplete: Void->Void) {
		
		if (bytes == null || bytes.length <= 0) return;
		
		decrypt(bytes);
		
		_queue.clear();
		
		var entries: List<Entry> = Reader.readZip(new BytesInput(bytes));
		var pending: Map<String, Entry> = new Map<String, Entry>();
		
		var processed: Int = 0;
		
		for (entry in entries) {
			processed++;
			if (!entry.compressed || entry.dataSize <= 0) {
				if (onProgress != null) onProgress(processed, entries.length);
				continue;
			}
			var fileName: String = entry.fileName;
			if (fileName.indexOf("games/") >= 0 
				|| fileName.indexOf("scenes/") >= 0
				|| fileName.indexOf("sprites/") >= 0) {
				var text = _texts.get(fileName);
				if (text == null) {
					text = Asset.unzip(entry).toString();
					if (text != null && text.length > 0) _texts.set(fileName, text); // just cache non-empty string
				}
				if (onProgress != null) onProgress(processed, entries.length);
			} else if (fileName.indexOf("jsons/") >= 0) {
				var json = _jsons.get(fileName);
				if (json == null) {
					json = Json.parse(Asset.unzip(entry).toString());
					if (json != null) _jsons.set(fileName, json);
				}
				if (onProgress != null) onProgress(processed, entries.length);
			} else if (fileName.indexOf("images/") >= 0) {
				var tex = _textures.get(fileName);
				var progress: Int = processed;
				if (tex == null) {
					if (pending.get(fileName) == null) {
						_queue.add(fileName); // need to make the call async...
						pending.set(fileName, entry);
						processed--; // it's pending, so it's not processed
					}
					if (tex != null) _textures.set(fileName, tex);
				}
				if (progress == processed && onProgress != null) onProgress(processed, entries.length);
			} else if (fileName.indexOf("musics/") >= 0) {
				#if flash
				if (fileName.indexOf( #if as3ogg ".ogg" #else ".mp3" #end ) < 0) {
					if (onProgress != null) onProgress(processed, entries.length);
					continue;
				}
				#end
				var progress: Int = processed;
				var music = _musics.get(fileName);
				if (music == null) {
					#if (html5 || cpp)
					if (pending.get(fileName) == null) {
						_queue.add(fileName); // need to make the call async...
						pending.set(fileName, entry);
						processed--; // it's pending, so it's not processed
					}
					#else
					music = new MusicSource();
					music.load(Asset.unzip(entry));
					if (music.state <= 0) music = null;
					#end
					if (music != null) _musics.set(fileName, music);
				}
				if (progress == processed && onProgress != null) onProgress(processed, entries.length);
			} else if (fileName.indexOf("sounds/") >= 0) {
				#if flash
				if (fileName.indexOf( #if as3ogg ".ogg" #else ".mp3" #end ) < 0) {
					if (onProgress != null) onProgress(processed, entries.length);
					continue;
				}
				#end
				var progress: Int = processed;
				var sound = _sounds.get(fileName);
				if (sound == null) {
					#if (html5 || cpp)
					if (pending.get(fileName) == null) {
						_queue.add(fileName); // need to make the call async...
						pending.set(fileName, entry);
						processed--; // it's pending, so it's not processed
					}
					#else
					sound = new SoundSource();
					sound.load(Asset.unzip(entry));
					if (sound.state <= 0) sound = null;
					#end
					if (sound != null) _sounds.set(fileName, sound);
				}
				if (progress == processed && onProgress != null) onProgress(processed, entries.length);
			}
		}
		
		if (_queue.length <= 0) {
			if (onComplete != null) onComplete();
			return;
		}
		
		var pendingFiles = pending.keys();
		for (fileName in pendingFiles) {
			if (fileName.indexOf("images/") >= 0) {
				#if flash
				RendererStage3D.loadTexture(fileName, Asset.unzip(pending[fileName]), function(tex) {
					if (tex != null) _textures.set(fileName, tex);
					_queue.remove(fileName);
					if (onProgress != null) onProgress(entries.length - _queue.length, entries.length);
					if (_queue.length <= 0 && onComplete != null) onComplete();
				});
				#elseif html5
				Image.fromBytes(Asset.unzip(pending[fileName]), function(img) {
					if (img != null) {
						var tex = RendererGL.createTexture(img);
						if (tex != null) _textures.set(fileName, tex);
					}
					_queue.remove(fileName);
					if (onProgress != null) onProgress(entries.length - _queue.length, entries.length);
					if (_queue.length <= 0 && onComplete != null) onComplete();
				});
				
				#else
				
				var msg = {
					param: { url: fileName, data: pending[fileName] },
					process: function(src): Dynamic {
						var result = {
							url: src.url,
							image: Image.fromBytes(Asset.unzip(src.data)),
							callback: function(srcurl) {
								_queue.remove(srcurl);
								if (onProgress != null) onProgress(entries.length - _queue.length, entries.length);
								if (_queue.length <= 0 && onComplete != null) onComplete();
							}
						};
						return result;
					},
					callback: function(rsl) {
						var imageUrl: String = cast rsl.url;
						var imageObj: Image = cast rsl.image;
						if (imageObj == null) {
							if (rsl.callback != null) rsl.callback(imageUrl);
						} else {
							var texture: TextureGL = RendererGL.createTexture(imageObj);
							if (texture != null) _textures.set(imageUrl, texture);
							if (rsl.callback != null) rsl.callback(imageUrl);
						}
					}
				}
				_thread.sendMessage(msg);
				
				#end
				
			} else if (fileName.indexOf("musics/") >= 0) {
				#if html5
				var music = new MusicSource();
				music.load(Asset.unzip(pending[fileName]), function() {
					if (music.state <= 0) music = null;
					else _musics.set(fileName, music);
					_queue.remove(fileName);
					if (onProgress != null) onProgress(entries.length - _queue.length, entries.length);
					if (_queue.length <= 0 && onComplete != null) onComplete();
				});
				#elseif cpp
				
				var msg = {
					param: { url: fileName, data: pending[fileName] },
					process: function(src): Dynamic {
						var result = {
							url: src.url,
							music: new MusicSource(),
							callback: function(srcurl) {
								_queue.remove(srcurl);
								if (onProgress != null) onProgress(entries.length - _queue.length, entries.length);
								if (_queue.length <= 0 && onComplete != null) onComplete();
							}
						};
						result.music.load(Asset.unzip(src.data));
						return result;
					},
					callback: function(rsl) {
						var musicUrl: String = cast rsl.url;
						var musicObj: MusicSource = cast rsl.music;
						if (musicObj.state <= 0) {
							if (rsl.callback != null) rsl.callback(musicUrl);
						} else {
							_musics.set(musicUrl, musicObj);
							if (rsl.callback != null) rsl.callback(musicUrl);
						}
					}
				}
				_thread.sendMessage(msg);
				
				#else
				_queue.remove(fileName);
				if (onProgress != null) onProgress(entries.length - _queue.length, entries.length);
				if (_queue.length <= 0 && onComplete != null) onComplete();
				#end
				
			} else if (fileName.indexOf("sounds/") >= 0) {
				#if html5
				var sound = new SoundSource();
				sound.load(Asset.unzip(pending[fileName]), function() {
					if (sound.state <= 0) sound = null;
					else _sounds.set(fileName, sound);
					_queue.remove(fileName);
					if (onProgress != null) onProgress(entries.length - _queue.length, entries.length);
					if (_queue.length <= 0 && onComplete != null) onComplete();
				});
				#elseif cpp
				
				var msg = {
					param: { url: fileName, data: pending[fileName] },
					process: function(src): Dynamic {
						var result = {
							url: src.url,
							sound: new SoundSource(),
							callback: function(srcurl) {
								_queue.remove(srcurl);
								if (onProgress != null) onProgress(entries.length - _queue.length, entries.length);
								if (_queue.length <= 0 && onComplete != null) onComplete();
							}
						};
						result.sound.load(Asset.unzip(src.data));
						return result;
					},
					callback: function(rsl) {
						var soundUrl: String = cast rsl.url;
						var soundObj: SoundSource = cast rsl.sound;
						if (soundObj.state <= 0) {
							if (rsl.callback != null) rsl.callback(soundUrl);
						} else {
							_sounds.set(soundUrl, soundObj);
							if (rsl.callback != null) rsl.callback(soundUrl);
						}
					}
				}
				_thread.sendMessage(msg);
				
				#else
				_queue.remove(fileName);
				if (onProgress != null) onProgress(entries.length - _queue.length, entries.length);
				if (_queue.length <= 0 && onComplete != null) onComplete();
				#end
			}
		}
	}
	
	public static function loadFiles(files: Array<String>, ?onProgress: Int->Int->Void, ?onComplete: Void->Void) {
		_queue.clear();
		if (files != null && files.length > 0) {
			for (fileName in files) _queue.add(fileName);
			for (fileName in files) {
				if (fileName.indexOf("jsons/") >= 0) {
					loadJsonData(fileName, function(_) {
						_queue.remove(fileName);
						if (onProgress != null) onProgress(files.length - _queue.length, files.length);
						if (_queue.length <= 0 && onComplete != null) onComplete();
					});
				} else if (fileName.indexOf("images/") >= 0) {
					loadTexture(fileName, function(_) {
						_queue.remove(fileName);
						if (onProgress != null) onProgress(files.length - _queue.length, files.length);
						if (_queue.length <= 0 && onComplete != null) onComplete();
					});
				} else if (fileName.indexOf("musics/") >= 0) {
					loadMusic(fileName, function(_) {
						_queue.remove(fileName);
						if (onProgress != null) onProgress(files.length - _queue.length, files.length);
						if (_queue.length <= 0 && onComplete != null) onComplete();
					});
				} else if (fileName.indexOf("sounds/") >= 0) {
					loadSound(fileName, function(_) {
						_queue.remove(fileName);
						if (onProgress != null) onProgress(files.length - _queue.length, files.length);
						if (_queue.length <= 0 && onComplete != null) onComplete();
					});
				} else {
					trace("Unsupported file to preload: " + fileName);
					_queue.remove(fileName);
					if (onProgress != null) onProgress(files.length - _queue.length, files.length);
					if (_queue.length <= 0 && onComplete != null) onComplete();
				}
			}
		} else if (onComplete != null) onComplete();
	}
	
}
