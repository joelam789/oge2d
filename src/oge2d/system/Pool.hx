package oge2d.system;

import oge2d.core.Sprite;
import oge2d.core.Scene;
import oge2d.core.Game;

/**
 * ...
 * @author JoeLam
 */
class Pool implements Updater {
	
	static var _pools: Map<String, List<Sprite>> = null;
	
	public static function getFreeSprite(poolName: String): Sprite {
		var pool: List<Sprite> = _pools.get(poolName);
		if (pool == null) return null;
		for (spr in pool) {
			if (spr.enabled == false) return spr;
		}
		return null;
	}
	
	public static function getFreeCount(poolName: String): Int {
		var pool: List<Sprite> = _pools.get(poolName);
		if (pool == null) return 0;
		var count = 0;
		for (spr in pool) {
			if (spr.enabled == false) count++;
		}
		return count;
	}
	
	public static function getPoolSize(poolName: String): Int {
		var pool: List<Sprite> = _pools.get(poolName);
		if (pool == null) return 0;
		return pool.length;
	}
	
	public static function getPoolName(sprite: Sprite): String {
		var poolName: String = null;
		var poolSetting = sprite.components.get("pool");
		if (poolSetting != null) poolName = cast poolSetting.name;
		return poolName == null ? "" : poolName;
	}

	public function new() {
		if (_pools == null) _pools = new Map<String, List<Sprite>>();
	}
	
	public function batched(): Bool {
		return true;
	}
	
	public function bind(game:Game, scene:Scene):Void {
		if (scene != null) {
			var sprs = scene.filter( function(spr) { return spr.components.exists("pool"); } );
			for (spr in sprs) {
				var poolSetting = spr.components.get("pool");
				var poolName: String = cast poolSetting.name;
				if (poolName == null || poolName.length <= 0) continue;
				if (spr.index < poolSetting.minIndex || spr.index > poolSetting.maxIndex) continue;
				var pool: List<Sprite> = _pools.get(poolName);
				if (pool == null) {
					pool = new List<Sprite>();
					_pools.set(poolName, pool);
				}
				if (pool != null) {
					spr.enabled = false;
					pool.add(spr);
				}
			}
		} else {
			var poolNames: List<String> = new List<String>();
			for (key in _pools.keys()) poolNames.add(key);
			for (poolName in poolNames) {
				_pools.get(poolName).clear();
				_pools.remove(poolName);
			}
			poolNames.clear();
		}
	}
	
	public function include(sprite:Sprite):Void {
		
	}
	
	public function exclude(sprite:Sprite):Void {
		
	}
	
	public function begin(scene:Scene):Void {
		
	}
	
	public function update(sprite:Sprite):Void {
		
	}
	
	public function end(scene:Scene):Void {
		
	}
	
}
