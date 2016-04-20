package oge2d.driver.lime;

import haxe.Json;
import haxe.ds.Vector;

import lime.ui.KeyCode;

/**
 * ...
 * @author JoeLam
 */
class Keyboard {
	
	static var _keyCount: Int = 0;
	static var _keyStates: Vector<Bool> = null;
	static var _keypressTicks: Vector<Int> = null;
	static var _keyCodeMap: Map<UInt, Int> = null;
	static var _keyNameMap: Map<String, Int> = null;
	static var _keyCodeName: Map<UInt, String> = null;
	static var _keyCodeAlias: Map<UInt, String> = null;
	
	static var _defaultConfig: Dynamic = Json.parse('
	{
		"keys":
		{
			"0x00": ["UNKNOWN"],
			"0x08": ["BACKSPACE"],
			"0x09": ["TAB"],
			"0x0D": ["RETURN", "ENTER"],
			"0x1B": ["ESCAPE"],
			"0x20": ["SPACE", " "],
			"0x21": ["EXCLAMATION", "!"],
			"0x22": ["QUOTE", "\\\""],
			"0x23": ["HASH", "#"],
			"0x24": ["DOLLAR", "$"],
			"0x25": ["PERCENT", "%"],
			"0x26": ["AMPERSAND", "&"],
			"0x27": ["SINGLE_QUOTE", "\'"],
			"0x28": ["LEFT_PARENTHESIS", "("],
			"0x29": ["RIGHT_PARENTHESIS", ")"],
			"0x2A": ["ASTERISK", "*"],
			"0x2B": ["PLUS", "+"],
			"0x2C": ["COMMA", ","],
			"0x2D": ["MINUS", "-"],
			"0x2E": ["PERIOD", "."],
			"0x2F": ["SLASH", "/"],
			"0x30": ["NUMBER_0", "0"],
			"0x31": ["NUMBER_1", "1"],
			"0x32": ["NUMBER_2", "2"],
			"0x33": ["NUMBER_3", "3"],
			"0x34": ["NUMBER_4", "4"],
			"0x35": ["NUMBER_5", "5"],
			"0x36": ["NUMBER_6", "6"],
			"0x37": ["NUMBER_7", "7"],
			"0x38": ["NUMBER_8", "8"],
			"0x39": ["NUMBER_9", "9"],
			"0x3A": ["COLON", ":"],
			"0x3B": ["SEMICOLON", ";"],
			"0x3C": ["LESS_THAN", "<"],
			"0x3D": ["EQUALS", "="],
			"0x3E": ["GREATER_THAN", ">"],
			"0x3F": ["QUESTION", "?"],
			"0x40": ["AT", "@"],
			"0x5B": ["LEFT_BRACKET", "["],
			"0x5C": ["BACKSLASH", "\\\\"],
			"0x5D": ["RIGHT_BRACKET", "]"],
			"0x5E": ["CARET", "^"],
			"0x5F": ["UNDERSCORE", "_"],
			"0x60": ["GRAVE", "`"],
			"0x61": ["A"],
			"0x62": ["B"],
			"0x63": ["C"],
			"0x64": ["D"],
			"0x65": ["E"],
			"0x66": ["F"],
			"0x67": ["G"],
			"0x68": ["H"],
			"0x69": ["I"],
			"0x6A": ["J"],
			"0x6B": ["K"],
			"0x6C": ["L"],
			"0x6D": ["M"],
			"0x6E": ["N"],
			"0x6F": ["O"],
			"0x70": ["P"],
			"0x71": ["Q"],
			"0x72": ["R"],
			"0x73": ["S"],
			"0x74": ["T"],
			"0x75": ["U"],
			"0x76": ["V"],
			"0x77": ["W"],
			"0x78": ["X"],
			"0x79": ["Y"],
			"0x7A": ["Z"],
			"0x7F": ["DELETE"],
			"0x40000039": ["CAPS_LOCK"],
			"0x4000003A": ["F1"],
			"0x4000003B": ["F2"],
			"0x4000003C": ["F3"],
			"0x4000003D": ["F4"],
			"0x4000003E": ["F5"],
			"0x4000003F": ["F6"],
			"0x40000040": ["F7"],
			"0x40000041": ["F8"],
			"0x40000042": ["F9"],
			"0x40000043": ["F10"],
			"0x40000044": ["F11"],
			"0x40000045": ["F12"],
			"0x40000046": ["PRINT_SCREEN"],
			"0x40000047": ["SCROLL_LOCK"],
			"0x40000048": ["PAUSE"],
			"0x40000049": ["INSERT"],
			"0x4000004A": ["HOME"],
			"0x4000004B": ["PAGE_UP"],
			"0x4000004D": ["END"],
			"0x4000004E": ["PAGE_DOWN"],
			"0x4000004F": ["RIGHT"],
			"0x40000050": ["LEFT"],
			"0x40000051": ["DOWN"],
			"0x40000052": ["UP"],
			"0x40000053": ["NUM_LOCK"],
			"0x40000054": ["NUMPAD_DIVIDE"],
			"0x40000055": ["NUMPAD_MULTIPLY"],
			"0x40000056": ["NUMPAD_MINUS"],
			"0x40000057": ["NUMPAD_PLUS"],
			"0x40000058": ["NUMPAD_ENTER"],
			"0x40000059": ["NUMPAD_1"],
			"0x4000005A": ["NUMPAD_2"],
			"0x4000005B": ["NUMPAD_3"],
			"0x4000005C": ["NUMPAD_4"],
			"0x4000005D": ["NUMPAD_5"],
			"0x4000005E": ["NUMPAD_6"],
			"0x4000005F": ["NUMPAD_7"],
			"0x40000060": ["NUMPAD_8"],
			"0x40000061": ["NUMPAD_9"],
			"0x40000062": ["NUMPAD_0"],
			"0x40000063": ["NUMPAD_PERIOD"],
			"0x40000065": ["APPLICATION"],
			"0x40000066": ["POWER"],
			"0x40000067": ["NUMPAD_EQUALS"],
			"0x40000068": ["F13"],
			"0x40000069": ["F14"],
			"0x4000006A": ["F15"],
			"0x4000006B": ["F16"],
			"0x4000006C": ["F17"],
			"0x4000006D": ["F18"],
			"0x4000006E": ["F19"],
			"0x4000006F": ["F20"],
			"0x40000070": ["F21"],
			"0x40000071": ["F22"],
			"0x40000072": ["F23"],
			"0x40000073": ["F24"],
			"0x40000074": ["EXECUTE"],
			"0x40000075": ["HELP"],
			"0x40000076": ["MENU"],
			"0x40000077": ["SELECT"],
			"0x40000078": ["STOP"],
			"0x40000079": ["AGAIN"],
			"0x4000007A": ["UNDO"],
			"0x4000007B": ["CUT"],
			"0x4000007C": ["COPY"],
			"0x4000007D": ["PASTE"],
			"0x4000007E": ["FIND"],
			"0x4000007F": ["MUTE"],
			"0x40000080": ["VOLUME_UP"],
			"0x40000081": ["VOLUME_DOWN"],
			"0x40000085": ["NUMPAD_COMMA"],
			"0x40000099": ["ALT_ERASE"],
			"0x4000009A": ["SYSTEM_REQUEST"],
			"0x4000009B": ["CANCEL"],
			"0x4000009C": ["CLEAR"],
			"0x4000009D": ["PRIOR"],
			"0x4000009E": ["RETURN2"],
			"0x4000009F": ["SEPARATOR"],
			"0x400000A0": ["OUT"],
			"0x400000A1": ["OPER"],
			"0x400000A2": ["CLEAR_AGAIN"],
			"0x400000A3": ["CRSEL"],
			"0x400000A4": ["EXSEL"],
			"0x400000B0": ["NUMPAD_00"],
			"0x400000B1": ["NUMPAD_000"],
			"0x400000B2": ["THOUSAND_SEPARATOR"],
			"0x400000B3": ["DECIMAL_SEPARATOR"],
			"0x400000B4": ["CURRENCY_UNIT"],
			"0x400000B5": ["CURRENCY_SUBUNIT"],
			"0x400000B6": ["NUMPAD_LEFT_PARENTHESIS"],
			"0x400000B7": ["NUMPAD_RIGHT_PARENTHESIS"],
			"0x400000B8": ["NUMPAD_LEFT_BRACE"],
			"0x400000B9": ["NUMPAD_RIGHT_BRACE"],
			"0x400000BA": ["NUMPAD_TAB"],
			"0x400000BB": ["NUMPAD_BACKSPACE"],
			"0x400000BC": ["NUMPAD_A"],
			"0x400000BD": ["NUMPAD_B"],
			"0x400000BE": ["NUMPAD_C"],
			"0x400000BF": ["NUMPAD_D"],
			"0x400000C0": ["NUMPAD_E"],
			"0x400000C1": ["NUMPAD_F"],
			"0x400000C2": ["NUMPAD_XOR"],
			"0x400000C3": ["NUMPAD_POWER"],
			"0x400000C4": ["NUMPAD_PERCENT"],
			"0x400000C5": ["NUMPAD_LESS_THAN"],
			"0x400000C6": ["NUMPAD_GREATER_THAN"],
			"0x400000C7": ["NUMPAD_AMPERSAND"],
			"0x400000C8": ["NUMPAD_DOUBLE_AMPERSAND"],
			"0x400000C9": ["NUMPAD_VERTICAL_BAR"],
			"0x400000CA": ["NUMPAD_DOUBLE_VERTICAL_BAR"],
			"0x400000CB": ["NUMPAD_COLON"],
			"0x400000CC": ["NUMPAD_HASH"],
			"0x400000CD": ["NUMPAD_SPACE"],
			"0x400000CE": ["NUMPAD_AT"],
			"0x400000CF": ["NUMPAD_EXCLAMATION"],
			"0x400000D0": ["NUMPAD_MEM_STORE"],
			"0x400000D1": ["NUMPAD_MEM_RECALL"],
			"0x400000D2": ["NUMPAD_MEM_CLEAR"],
			"0x400000D3": ["NUMPAD_MEM_ADD"],
			"0x400000D4": ["NUMPAD_MEM_SUBTRACT"],
			"0x400000D5": ["NUMPAD_MEM_MULTIPLY"],
			"0x400000D6": ["NUMPAD_MEM_DIVIDE"],
			"0x400000D7": ["NUMPAD_PLUS_MINUS"],
			"0x400000D8": ["NUMPAD_CLEAR"],
			"0x400000D9": ["NUMPAD_CLEAR_ENTRY"],
			"0x400000DA": ["NUMPAD_BINARY"],
			"0x400000DB": ["NUMPAD_OCTAL"],
			"0x400000DC": ["NUMPAD_DECIMAL"],
			"0x400000DD": ["NUMPAD_HEXADECIMAL"],
			"0x400000E0": ["LEFT_CTRL"],
			"0x400000E1": ["LEFT_SHIFT"],
			"0x400000E2": ["LEFT_ALT"],
			"0x400000E3": ["LEFT_META"],
			"0x400000E4": ["RIGHT_CTRL"],
			"0x400000E5": ["RIGHT_SHIFT"],
			"0x400000E6": ["RIGHT_ALT"],
			"0x400000E7": ["RIGHT_META"],
			"0x40000101": ["MODE"],
			"0x40000102": ["AUDIO_NEXT"],
			"0x40000103": ["AUDIO_PREVIOUS"],
			"0x40000104": ["AUDIO_STOP"],
			"0x40000105": ["AUDIO_PLAY"],
			"0x40000106": ["AUDIO_MUTE"],
			"0x40000107": ["MEDIA_SELECT"],
			"0x40000108": ["WWW"],
			"0x40000109": ["MAIL"],
			"0x4000010A": ["CALCULATOR"],
			"0x4000010B": ["COMPUTER"],
			"0x4000010C": ["APP_CONTROL_SEARCH"],
			"0x4000010D": ["APP_CONTROL_HOME"],
			"0x4000010E": ["APP_CONTROL_BACK"],
			"0x4000010F": ["APP_CONTROL_FORWARD"],
			"0x40000110": ["APP_CONTROL_STOP"],
			"0x40000111": ["APP_CONTROL_REFRESH"],
			"0x40000112": ["APP_CONTROL_BOOKMARKS"],
			"0x40000113": ["BRIGHTNESS_DOWN"],
			"0x40000114": ["BRIGHTNESS_UP"],
			"0x40000115": ["DISPLAY_SWITCH"],
			"0x40000116": ["BACKLIGHT_TOGGLE"],
			"0x40000117": ["BACKLIGHT_DOWN"],
			"0x40000118": ["BACKLIGHT_UP"],
			"0x40000119": ["EJECT"],
			"0x4000011A": ["SLEEP"]
		}
	}
	');

	public function new() {
		// ...
	}
	
	public static function isKeyDown(keyName: String): Bool {
		if (_keyStates == null) return false;
		var idx = _keyNameMap.get(keyName);
		if (idx == null) return false;
		return _keyStates[idx];
	}
	
	public static function setKeyState(keyCode: KeyCode, isDown: Bool) {
		if (_keyStates == null) return;
		var idx = _keyCodeMap.get(keyCode);
		if (idx != null) _keyStates[idx] = isDown;
	}
	
	public static function getKeypressTime(keyName: String): Int {
		if (_keypressTicks == null) return 0;
		var idx = _keyNameMap.get(keyName);
		if (idx == null) return 0;
		return _keypressTicks[idx];
	}
	
	public static function setKeypressTime(keyName: String, ticks: Int) {
		if (_keypressTicks == null) return;
		var idx = _keyNameMap.get(keyName);
		if (idx == null) return;
		_keypressTicks[idx] = ticks >= 0 ? ticks : 0;
	}
	
	public static function getKeyNames(keyCode: KeyCode): Array<String> {
		var keyNames: Array<String> = new Array<String>();
		var keyName: String = _keyCodeName.get(keyCode);
		var keyAlias: String = _keyCodeAlias.get(keyCode);
		if (keyName != null) keyNames.push(keyName);
		if (keyAlias != null) keyNames.push(keyAlias);
		return keyNames;
	}
	
	public static function reset() {
		if (_keyStates == null) return;
		for (i in 0..._keyStates.length) {
			_keyStates[i] = false;
			_keypressTicks[i] = 0;
		}
	}
	
	static function registerKey(keyCode: UInt, keyName: String, ?alias: String) {
		_keyCodeMap.set(keyCode, _keyCount);
		_keyNameMap.set(keyName, _keyCount);
		_keyCodeName.set(keyCode, keyName);
		if (alias != null) {
			_keyNameMap.set(alias, _keyCount);
			_keyCodeAlias.set(keyCode, alias);
		}
		_keyCount++;
	}
	
	public static function init(?config: Dynamic) {
		_keyCount = 0;
		_keyCodeMap = new Map<UInt, Int>();
		_keyNameMap = new Map<String, Int>();
		_keyCodeName = new Map<UInt, String>();
		_keyCodeAlias = new Map<UInt, String>();
		
		var keySetting:Dynamic = _defaultConfig.keys;
		if (config != null && Reflect.hasField(config, "keys")) {
			keySetting = config.keys;
		}
		
		var keyCodes = Reflect.fields(keySetting);
		for (keyCodeStr in keyCodes) {
			var keyNames: Array<String> = cast Reflect.field(keySetting, keyCodeStr);
			if (keyNames == null || keyNames.length <= 0) continue;
			var keyCode: UInt = cast Std.parseInt(keyCodeStr);
			if (keyNames.length == 1) registerKey(keyCode, keyNames[0]);
			else registerKey(keyCode, keyNames[0], keyNames[1]);
		}
		
		_keyStates = new Vector<Bool>(_keyCount);
		_keypressTicks = new Vector<Int>(_keyCount);
		reset();
	}
	
}
