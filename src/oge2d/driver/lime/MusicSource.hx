package oge2d.driver.lime;

import haxe.io.Bytes;

#if html5
import js.Browser;
import js.html.AudioElement;
import js.html.SourceElement;
import js.html.audio.AudioBufferSourceNode;
import js.html.audio.AudioContext;
import js.html.audio.AudioBuffer;
import js.html.audio.GainNode;
#elseif flash
import flash.events.Event;
#if as3ogg
import stb.format.vorbis.flash.VorbisSound;
import stb.format.vorbis.flash.VorbisSoundChannel;
#else
import flash.media.Sound;
import flash.media.SoundChannel;
import flash.media.SoundTransform;
#end
#else
import lime.audio.AudioBuffer;
import lime.audio.AudioSource;
#end

/**
 * ...
 * @author JoeLam
 */
class MusicSource {
	
	public static inline var STATE_UNPLAYABLE =  0;
	public static inline var STATE_READY      =  1;
	public static inline var STATE_PLAYING    =  2;
	public static inline var STATE_PAUSED     =  3;
	public static inline var STATE_ENDED      =  4;
	
	public var state(default, null): Int = 0;
	public var volume(default, set): Float = 1;
	
	private var _times: Int = 1;
	
	#if html5
	private static var _audioContextClass: Dynamic = null;
	private var _context: AudioContext = null;
	private var _sound: AudioBuffer = null;
	private var _channel: AudioBufferSourceNode = null;
	private var _gain: GainNode = null;
	private var _startTime: Float = 0;
	private var _pauseTime: Float = 0;
	#elseif flash
	private var _sound: #if as3ogg VorbisSound #else Sound #end = null;
	private var _channel: #if as3ogg VorbisSoundChannel #else SoundChannel #end = null;
	private var _transform: SoundTransform = null;
	private var _position: Float = 0;
	#else
	private var _sound: AudioBuffer = null;
	private var _channel: AudioSource = null;
	#end
	
	
	public function isReady(): Bool {
		return state == STATE_READY;
	}
	
	public function isCompleted(): Bool {
		return state == STATE_ENDED;
	}
	
	public function isPlaying(): Bool {
		return state == STATE_PLAYING;
	}
	
	public function isPaused(): Bool {
		return state == STATE_PAUSED;
	}
	
	public function resume(): Void {
		if (state == STATE_PAUSED) play(_times);
	}
	
	public function vol(value: Float): Void {
		volume = value;
	}
	
	#if html5
	
	public function new() {
		_context = null;
		_sound = null;
		state = STATE_UNPLAYABLE;
		if (MusicSource._audioContextClass == null) {
			MusicSource._audioContextClass = Reflect.field(Browser.window, "AudioContext");
			if (MusicSource._audioContextClass == null) {
				MusicSource._audioContextClass = Reflect.field(Browser.window, "webkitAudioContext");
			}
		}
		if (MusicSource._audioContextClass == null) {
			trace("WebAudio not supported");
		}
	}
	
	function set_volume(value: Float): Float {
		var volumeValue: Float = value < 0 ? 0 : (value > 1 ? 1 : value);
		if (volume == volumeValue) return volumeValue;
		try {
			if (_gain != null) _gain.gain.value = volumeValue;
			volume = volumeValue;
		} catch(e:Dynamic) {
			trace("Failed to set volume: " + e);
		}
		return volume;
	}
	
	public function init(bytes: Bytes, ?callback: Void->Void) {
		try {
			if (MusicSource._audioContextClass != null)
				_context = cast Type.createInstance(MusicSource._audioContextClass, []);
		} catch(e:Dynamic) {
			_context = null;
			trace("Failed to create Web Audio Context: " + e);
		}
		if (_context == null) {
			if (callback != null) callback();
			return;
		}
		_context.decodeAudioData(bytes.getData(), function(buf) {
			_sound = buf;
			if (_sound != null && _sound.length > 0) state = STATE_READY;
			if (callback != null) callback();
		}, function() {
			trace("Failed to decode Web Audio Data");
			if (callback != null) callback();
		});
	}
	private function turnoff(): Void {
		if (_channel != null) {
			_channel.disconnect();
			_channel = null;
		}
		if (_gain != null) {
			_gain.disconnect();
			_gain = null;
		}
	}
	private function turnon(): Void {
		if (_context == null) return;
		if (_sound == null || _sound.length <= 0) return;
		turnoff();
		_channel = _context.createBufferSource();
		if (_channel == null) return;
		_channel.buffer = _sound;
		_channel.onended = function() {
			if (state == STATE_PLAYING) {
				if (_times >= 0) {
					if (_times > 0) _times--;
					if (_times == 0) {
						turnoff();
						state = STATE_ENDED;
					} else {
						_pauseTime = 0;
						_startTime = _context.currentTime;
						turnon();
					}
				} else {
					_pauseTime = 0;
					_startTime = _context.currentTime;
					turnon();
				}
			}
		};
		var self_ = this;
		if (untyped __js__("self_._context").createGain != null) _gain = _context.createGain();
		else _gain = untyped __js__("self_._context").createGainNode();
		if (_gain == null) return;
		_channel.connect(_gain);
		_gain.connect(_context.destination);
		_gain.gain.value = volume;
		if (_pauseTime > 0) {
			_startTime = _context.currentTime - _pauseTime;
			if (Reflect.field(_channel, "start") != null) _channel.start(0, _pauseTime);
			else untyped __js__("self_._channel").noteGrainOn(0, _pauseTime, _channel.buffer.duration);
		} else {
			_startTime = _context.currentTime;
			if (Reflect.field(_channel, "start") != null) _channel.start(0);
			else untyped __js__("self_._channel").noteGrainOn(0, 0, _channel.buffer.duration);
		}
	}
	public function play(?times: Int): Void {
		if (_context == null) return;
		if (_sound == null || _sound.length <= 0) return;
		if (state == STATE_UNPLAYABLE || state == STATE_PLAYING) return;
		else if (state == STATE_READY || state == STATE_PAUSED || state == STATE_ENDED) {
			if (times != null) _times = times <= 0 ? -1 : times;
			else if (state == STATE_READY) _times = -1; // always loop by default
			state = STATE_PLAYING;
			turnon();
		}
	}
	
	public function stop(): Void {
		if (state == STATE_UNPLAYABLE) return;
		if (_context == null || _channel == null) return;
		var self_ = this;
		if (Reflect.field(_channel, "stop") != null) _channel.stop(0);
		else if (Reflect.field(_channel, "noteOff") != null) {
			try { untyped __js__("self_._channel").noteOff(0); } catch(e:Dynamic) { }
		}
		turnoff();
		_pauseTime = 0;
		_startTime = 0;
		state = STATE_READY;
	}
	
	public function pause(): Void {
		if (state != STATE_PLAYING) return;
		if (_context == null || _channel == null) return;
		_pauseTime = _context.currentTime - _startTime;
		var self_ = this;
		if (Reflect.field(_channel, "stop") != null) _channel.stop(0);
		else if (Reflect.field(_channel, "noteOff") != null) {
			try { untyped __js__("self_._channel").noteOff(0); } catch(e:Dynamic) { }
		}
		turnoff();
		state = STATE_PAUSED;
	}
	
	public function reset(): Void {
		if (state == STATE_ENDED) {
			_pauseTime = 0;
			_startTime = 0;
			state = STATE_READY;
		} else stop();
	}
	
	public function dispose(): Void {
		stop();
		state = STATE_UNPLAYABLE;
		var self_ = this;
		if (_context != null) {
			try { untyped __js__("self_._context").close(); } catch(e:Dynamic) { }
		}
		if (_sound != null) _sound = null;
		if (_context != null) _context = null;
	}

	#elseif flash
	
	public function new() {
		_sound = null;
		state = STATE_UNPLAYABLE;
	}
	
	function set_volume(value: Float): Float {
		var volumeValue: Float = value < 0 ? 0 : (value > 1 ? 1 : value);
		if (volume == volumeValue) return volumeValue;
		try {
			if (_transform != null) {
				_transform.volume = volumeValue;
				if (_channel != null) _channel.soundTransform = _transform;
			}
			volume = volumeValue;
		} catch(e:Dynamic) {
			trace("Failed to set volume: " + e);
		}
		return volume;
	}
	
	public function init(bytes: Bytes, ?callback: Void->Void): Void {
		#if as3ogg
		_sound = new VorbisSound(bytes);
		#else
		_sound = new Sound();
		_transform = new SoundTransform(volume);
		// loadCompressedDataFromByteArray() will only dispatch the ID3 event and none of the others (complete, open, etc.)
		_sound.loadCompressedDataFromByteArray(bytes.getData(), bytes.length);
		#end
		if (_sound.length > 0) state = STATE_READY; else _sound = null;
		if (callback != null) callback();
	}
	
	private function onComplete(e: Event): Void {
		if (state == STATE_PLAYING) {
			if (_times >= 0) {
				if (_times > 0) _times--;
				if (_times == 0) {
					state = STATE_ENDED;
					if (_channel != null) {
						_channel.removeEventListener(Event.SOUND_COMPLETE, onComplete);
						_channel = null;
					}
				} else { // loop
					_position = 0;
					turnon();
				}
			} else { // always loop
				_position = 0;
				turnon();
			}
		}
	}
	private function turnon(): Void {
		if (_sound == null) return;
		if (_channel != null) _channel.removeEventListener(Event.SOUND_COMPLETE, onComplete);
		_channel = _sound.play(_position, 0, _transform);
		_channel.addEventListener(Event.SOUND_COMPLETE, onComplete);
	}
	public function play(?times: Int): Void {
		if (_sound == null) return;
		if (state == STATE_UNPLAYABLE || state == STATE_PLAYING) return;
		else if (state == STATE_READY || state == STATE_PAUSED || state == STATE_ENDED) {
			if (times != null) _times = times <= 0 ? -1 : times;
			else if (state == STATE_READY) _times = -1; // always loop by default
			state = STATE_PLAYING;
			turnon();
		}
	}
	
	public function stop(): Void {
		if (state == STATE_UNPLAYABLE) return;
		_times = 0;
		if (_channel != null) {
			_channel.removeEventListener(Event.SOUND_COMPLETE, onComplete);
			_channel.stop();
			_channel = null;
		}
		_position = 0;
		state = STATE_READY;
	}
	
	public function pause(): Void {
		if (state != STATE_PLAYING) return;
		if (_channel != null) {
			_channel.removeEventListener(Event.SOUND_COMPLETE, onComplete);
			_position = _channel.position;
			_channel.stop();
			_channel = null;
		}
		state = STATE_PAUSED;
	}
	
	public function reset(): Void {
		if (state == STATE_ENDED) state = STATE_READY;
		else stop();
	}
	
	public function dispose(): Void {
		stop();
		state = STATE_UNPLAYABLE;
		if (_sound != null) _sound = null;
		if (_channel != null) _channel = null;
	}
	
	#else
	
	public function new() {
		_sound = null;
		state = STATE_UNPLAYABLE;
	}
	
	function set_volume(value: Float): Float {
		var volumeValue: Float = value < 0 ? 0 : (value > 1 ? 1 : value);
		if (volume == volumeValue) return volumeValue;
		try {
			if (_channel != null) _channel.gain = volumeValue;
			volume = volumeValue;
		} catch(e:Dynamic) {
			trace("Failed to set volume: " + e);
		}
		return volume;
	}
	
	public function init(bytes: Bytes, ?callback: Void->Void): Void {
		_sound = AudioBuffer.fromBytes(bytes);
		if (_sound != null) {
			_channel = new AudioSource(_sound);
			if (_channel != null) {
				state = STATE_READY;
				_channel.gain = volume;
				_channel.onComplete.add(function() {
					if (state == STATE_PLAYING) {
						if (_times >= 0) {
							if (_times > 0) _times--;
							if (_times == 0) state = STATE_ENDED;
							else _channel.play();
						} else _channel.play(); // always loop
					}
				});
			}
		}
		if (callback != null) callback();
	}
	
	public function play(?times: Int): Void {
		if (_channel == null) return;
		if (state == STATE_UNPLAYABLE || state == STATE_PLAYING) return;
		else if (state == STATE_READY || state == STATE_PAUSED || state == STATE_ENDED) {
			if (times != null) _times = times <= 0 ? -1 : times;
			else if (state == STATE_READY) _times = -1; // always loop by default
			state = STATE_PLAYING;
			_channel.play();
		}
	}
	
	public function stop(): Void {
		if (_channel == null) return;
		if (state == STATE_UNPLAYABLE) return;
		_channel.stop();
		state = STATE_READY;
	}
	
	public function pause(): Void {
		if (_channel == null) return;
		if (state != STATE_PLAYING) return;
		_channel.pause();
		state = STATE_PAUSED;
	}
	
	public function reset(): Void {
		if (state == STATE_ENDED) state = STATE_READY;
		else stop();
	}
	
	public function dispose(): Void {
		stop();
		state = STATE_UNPLAYABLE;
		if (_sound != null) {
			_sound.dispose();
			_sound = null;
		}
		if (_channel != null) {
			_channel.dispose();
			_channel = null;
		}
	}
	
	#end
}
