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
#else
import flash.media.Sound;
#end
import flash.media.SoundChannel;
import flash.media.SoundTransform;
#else
import lime.audio.AudioBuffer;
import lime.audio.AudioSource;
#end

/**
 * ...
 * @author JoeLam
 */
class SoundSource {
	
	public static inline var STATE_UNPLAYABLE =  0;
	public static inline var STATE_READY      =  1;
	
	public var state(default, null): Int = 0;
	public var volume(default, set): Float = 1;
	
	#if html5
	private static var _audioContextClass: Dynamic = null;
	private var _context: AudioContext = null;
	private var _sound: AudioBuffer = null;
	private var _channels: List<AudioBufferSourceNode> = new List<AudioBufferSourceNode>();
	private var _gains: Map<AudioBufferSourceNode, GainNode> = new Map<AudioBufferSourceNode, GainNode>();
	#elseif flash
	private var _sound: #if as3ogg VorbisSound #else Sound #end = null;
	private var _channels: List<SoundChannel> = new List<SoundChannel>();
	private var _transform: SoundTransform = null;
	#else
	private var _sound: AudioBuffer = null;
	private var _channels: List<AudioSource> = new List<AudioSource>();
	private var _playings: List<AudioSource> = new List<AudioSource>();
	#end
	
	public function isReady(): Bool {
		return state == STATE_READY;
	}
	
	public function vol(value: Float): Void {
		volume = value;
	}
	
	#if html5
	
	public function new() {
		_context = null;
		_sound = null;
		state = STATE_UNPLAYABLE;
		if (SoundSource._audioContextClass == null) {
			SoundSource._audioContextClass = Reflect.field(Browser.window, "AudioContext");
			if (SoundSource._audioContextClass == null) {
				SoundSource._audioContextClass = Reflect.field(Browser.window, "webkitAudioContext");
			}
		}
		if (SoundSource._audioContextClass == null) {
			trace("WebAudio not supported");
		}
	}
	
	function set_volume(value: Float): Float {
		var volumeValue: Float = value < 0 ? 0 : (value > 1 ? 1 : value);
		if (volume == volumeValue) return volumeValue;
		try {
			for (key in _gains.keys()) _gains.get(key).gain.value = volumeValue;
			volume = volumeValue;
		} catch(e:Dynamic) {
			trace("Failed to set volume: " + e);
		}
		return volume;
	}
	
	public function init(bytes: Bytes, ?callback: Void->Void): Void {
		try {
			if (SoundSource._audioContextClass != null)
				_context = cast Type.createInstance(SoundSource._audioContextClass, []);
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
	
	private function turnoff(channel: AudioBufferSourceNode): Void {
		var gain: GainNode = null;
		if (channel != null) {
			gain = _gains.get(channel);
			channel.disconnect();
		}
		if (gain != null) gain.disconnect();
		if (channel != null) _gains.remove(channel);
	}
	private function turnon(): Void {
		if (_context == null) return;
		if (_sound == null || _sound.length <= 0) return;
		var channel = _context.createBufferSource();
		if (channel == null) return;
		channel.buffer = _sound;
		channel.onended = function() {
			turnoff(channel);
		};
		var self_ = this;
		var gain: GainNode = null;
		if (untyped __js__("self_._context").createGain != null) gain = _context.createGain();
		else gain = untyped __js__("self_._context").createGainNode();
		if (gain == null) return;
		channel.connect(gain);
		gain.connect(_context.destination);
		gain.gain.value = volume;
		_gains.set(channel, gain);
		if (Reflect.field(channel, "start") != null) channel.start(0);
		else untyped __js__("channel").noteGrainOn(0, 0, channel.buffer.duration);
	}
	
	public function play(): Void {
		if (_sound == null || state == STATE_UNPLAYABLE) return;
		turnon();
	}
	
	public function stop(): Void {
		if (_sound == null || state == STATE_UNPLAYABLE) return;
		var nodes: List<AudioBufferSourceNode> = new List<AudioBufferSourceNode>();
		for (key in _gains.keys()) nodes.add(key);
		while (nodes.length > 0) {
			var channel = nodes.pop();
			if (channel != null) {
				if (Reflect.field(channel, "stop") != null) channel.stop(0);
				else if (Reflect.field(channel, "noteOff") != null) {
					try { untyped __js__("channel").noteOff(0); } catch(e:Dynamic) { }
				}
				turnoff(channel);
			}
		}
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
		_channels.clear();
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
				for (channel in _channels) channel.soundTransform = _transform;
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
		if (e != null && e.target != null) {
			var channel: SoundChannel = cast e.target;
			channel.removeEventListener(Event.SOUND_COMPLETE, onComplete);
			_channels.remove(channel);
		}
	}
	private function turnon(): Void {
		if (_sound == null) return;
		var channel = _sound.play(0, 0, _transform);
		if (channel != null) {
			_channels.add( #if as3ogg channel.channel #else channel #end );
			channel.addEventListener(Event.SOUND_COMPLETE, onComplete);
		}
	}
	
	public function play(): Void {
		if (_sound == null || state == STATE_UNPLAYABLE) return;
		turnon();
	}
	public function stop(): Void {
		if (_sound == null || state == STATE_UNPLAYABLE) return;
		while (_channels.length > 0) {
			var channel = _channels.pop();
			if (channel != null) channel.stop();
		}
	}
	
	public function dispose(): Void {
		stop();
		state = STATE_UNPLAYABLE;
		if (_sound != null) _sound = null;
		_channels.clear();
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
			for (channel in _playings) channel.gain = volumeValue;
			volume = volumeValue;
		} catch(e:Dynamic) {
			trace("Failed to set volume: " + e);
		}
		return volume;
	}
	
	public function init(bytes: Bytes, ?callback: Void->Void): Void {
		_sound = AudioBuffer.fromBytes(bytes);
		if (_sound != null) state = STATE_READY;
		if (callback != null) callback();
	}
	
	public function play(): Void {
		if (_sound == null || state == STATE_UNPLAYABLE) return;
		var channel = null;
		if (_channels.length > 0) channel = _channels.pop();
		if (channel == null) {
			var newChannel = new AudioSource(_sound);
			if (newChannel != null) {
				newChannel.onComplete.add(function() {
					_playings.remove(newChannel);
					_channels.add(newChannel);
				});
			}
			if (newChannel != null) channel = newChannel;
		}
		if (channel != null) {
			_playings.add(channel);
			channel.gain = volume;
			channel.play();
		}
	}
	
	public function stop(): Void {
		if (_sound == null || state == STATE_UNPLAYABLE) return;
		for (channel in _playings) channel.stop();
		while (_playings.length > 0) {
			_channels.add(_playings.pop());
		}
	}
	
	public function dispose(): Void {
		stop();
		state = STATE_UNPLAYABLE;
		if (_sound != null) {
			_sound.dispose();
			_sound = null;
		}
		for (channel in _playings) channel.dispose();
		for (channel in _channels) channel.dispose();
		_playings.clear();
		_channels.clear();
	}
	
	#end
}
