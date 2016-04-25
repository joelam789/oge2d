package oge2d.system;

import oge2d.core.Sprite;
import oge2d.core.Scene;
import oge2d.core.Game;

/**
 * ...
 * @author JoeLam
 */
class Motion implements Updater {
	
	public static function createMotionData() {
		var motion = {
			state: 0,
			style: 0,
			speed: 0,
			current: 0,
			segment: 0,
			middleX: 0,
			middleY: 0,
			targetX: 0,
			targetY: 0,
			dataX: [],
			dataY: [],
			onStep: null,
			onEnd: null
		};
		return motion;
	}
	
	public static function createPathData() {
		var motionPath = {
			state: 0,
			speed: 0,
			current: 0,
			offsetX: 0,
			offsetY: 0,
			listX: [],
			listY: [],
			nodes: []
		};
		return motionPath;
	}

	public static function moveTo(sprite: Sprite, x: Float, y: Float, speed: Int, ?dataX: Array<Float>, ?dataY: Array<Float>, 
									?onEnd: Sprite->Void, ?onStep: Sprite->Int->Int->Void) {
		var motion = sprite.components["motion"];
		if (motion == null) {
			motion = createMotionData();
			sprite.components.set("motion", motion);
		}
		motion.targetX = x;
		motion.targetY = y;
		motion.speed = speed;
		motion.state = 1;
		motion.onStep = onStep;
		motion.onEnd = onEnd;
		
		if (dataX != null) motion.dataX = dataX;
		if (dataY != null) motion.dataY = dataY;
		
		if (dataX != null) {
			motion.state = dataX.length > 0 ? 2 : 0;
			if (motion.state == 2) motion.current = 0;
		}
	}
	
	public static function moveToNode(sprite: Sprite, nodeIndex: Int, ?onEnd: Sprite->Void, ?onNode: Sprite->Int->Float->Float->Void) {
		var motionPath = sprite.components["path"];
		if (motionPath == null || motionPath.state <= 0 || nodeIndex * 2 >= motionPath.nodes.length) {
			if (motionPath != null) motionPath.state = 0;
			if (onEnd != null) onEnd(sprite);
			return;
		}
		var nodes: Array<Float> = cast motionPath.nodes;
		var listX: Array<Array<Float>> = cast motionPath.listX;
		var listY: Array<Array<Float>> = cast motionPath.listY;
		var targetX: Float = nodes[nodeIndex * 2] + motionPath.offsetX;
		var targetY: Float = nodes[nodeIndex * 2 + 1] + motionPath.offsetY;
		if (onNode != null) onNode(sprite, nodeIndex - 1, targetX, targetY);
		moveTo(sprite, targetX, targetY, motionPath.speed, listX[nodeIndex], listY[nodeIndex], function(spr) {
			moveToNode(spr, nodeIndex + 1, onEnd, onNode);
		});
	}
	
	public static function applyPath(sprite: Sprite, offsetX: Float, offsetY: Float, speed: Int, nodes: Array<Float>, 
									?onEnd: Sprite->Void, ?onNode: Sprite->Int->Float->Float->Void) {
		var motionPath = sprite.components["path"];
		if (motionPath == null) {
			motionPath = createPathData();
			sprite.components.set("path", motionPath);
		}
		motionPath.state = 0;
		motionPath.offsetX = offsetX;
		motionPath.offsetY = offsetY;
		
		if (nodes == null || nodes.length <= 1) return;
		
		var data: Array<Float> = nodes;
		if (speed < 0) {
			data = nodes.copy();
			var idx = 0;
			var len = nodes.length;
			while (idx < len) {
				data[idx] = nodes[len - idx - 2];
				data[idx + 1] = nodes[len - idx - 1];
				idx += 2;
			}
		}
		
		motionPath.nodes = data;
		motionPath.speed = speed > 0 ? speed : 0 - speed;
		
		var display = sprite.components["stage"];
		if (display == null) display = sprite.components["display"];
		if (display == null) return;
		
		display.posX = offsetX + data[0];
		display.posY = offsetY + data[1];
		
		if (data.length <= 2) {
			if (onEnd != null) onEnd(sprite);
			return;
		}
		
		var x1 = offsetX + data[0];
		var y1 = offsetY + data[1];
		var count: Int = Std.int(data.length / 2);
		var listX = new Array<Array<Float>>();
		var listY = new Array<Array<Float>>();
		listX.push([]); // first node should have no data
		listY.push([]); // first node should have no data
		for (i in 1...count) {
			var dataX = new Array<Float>();
			var dataY = new Array<Float>();
			generateBeeline(x1, y1, offsetX + data[i * 2], offsetY + data[i * 2 + 1], dataX, dataY);
			listX.push(dataX);
			listY.push(dataY);
			x1 = offsetX + data[i * 2];
			y1 = offsetY + data[i * 2 + 1];
		}
		
		motionPath.listX = listX;
		motionPath.listY = listY;
		
		motionPath.state = 1;
		moveToNode(sprite, 1, onEnd, onNode);
	}
	
	public static function getMotionAngle(currentX: Float, currentY: Float, targetX: Float, targetY: Float): Float {
		
		var dx = Math.abs(targetX - currentX);
		var dy = Math.abs(targetY - currentY);
		
		var angle:Float = dx == 0 ? 90 : Math.atan(dy / dx) * 180 / Math.PI;
		
		if (targetX <= currentX && targetY <= currentY) angle = 180 - angle;
		else if (targetX <= currentX && targetY >= currentY) angle = 180 + angle;
		else if (targetX >= currentX && targetY >= currentY) angle = 0 - angle;
		
		if (angle < 0) angle += 360;
		if (angle > 360) angle -= 360;
		
		return angle;
	}
	
	public static function moveOutside(sprite: Sprite, speed: Int, angle: Float, 
										left: Float, top: Float, right: Float, bottom: Float,
										?onEnd: Sprite->Void, ?onStep: Sprite->Int->Int->Void): Void {
		var display = sprite.components["stage"];
		if (display == null) display = sprite.components["display"];
		if (display == null) return;
		var posX: Float = cast display.posX;
		var posY: Float = cast display.posY;
		var targetX: Float = 0;
		var targetY: Float = 0;
		if ((angle >= 0 && angle <= 45) || (angle > 315 && angle <= 360)) {
			targetX = right;
			targetY = posY - Math.abs(targetX - posX) * Math.tan(angle * Math.PI / 180);
		} else if (angle > 45 && angle <= 135) {
			targetY = top;
			targetX = posX + Math.abs(posY - targetY) / Math.tan(angle * Math.PI / 180);
		} else if (angle > 135 && angle <= 225) {
			targetX = left;
			targetY = posY + Math.abs(targetX - posX) * Math.tan(angle * Math.PI / 180);
		} else if (angle > 225 && angle <= 315) {
			targetY = bottom;
			targetX = posX - Math.abs(posY - targetY) / Math.tan(angle * Math.PI / 180);
		}
		moveTo(sprite, targetX, targetY, speed, onEnd, onStep);
	}
	
	public static function generateBeeline(x1: Float, y1: Float, x2: Float, y2: Float,
											dataX: Array<Float>, dataY: Array<Float>) {

		var d, count, dinc1, dinc2, xinc1, xinc2, yinc1, yinc2;

		var x0 = Std.int(Math.max(Math.min(x1,x2), 0));
		var y0 = Std.int(Math.max(Math.min(y1,y2), 0));

		var deltax = Std.int(Math.abs(x2 - x1));
		var deltay = Std.int(Math.abs(y2 - y1));

		// Initialize all vars based on which is the independent variable
		if (deltax >= deltay) {
			// x is independent variable
			count = deltax + 1;
			d = (2 * deltay) - deltax;
			dinc1 = deltay * 2;
			dinc2 = (deltay - deltax) * 2;
			xinc1 = 1;
			xinc2 = 1;
			yinc1 = 0;
			yinc2 = 1;
		} else {
			// y is independent variable
			count = deltay + 1;
			d = (2 * deltax) - deltay;
			dinc1 = deltax * 2;
			dinc2 = (deltax - deltay) * 2;
			xinc1 = 0;
			xinc2 = 1;
			yinc1 = 1;
			yinc2 = 1;
		}

		// Make sure x and y move in the right directions
		if (x1 > x2) {
			xinc1 = 0 - xinc1;
			xinc2 = 0 - xinc2;
		}
		if (y1 > y2) {
			yinc1 = 0 - yinc1;
			yinc2 = 0 - yinc2;
		}

		// Start from the 2nd point
		var x = Std.int(x1) + (d < 0 ? xinc1 : xinc2);
		var y = Std.int(y1) + (d < 0 ? yinc1 : yinc2);
		
		d = d + (d < 0 ? dinc1 : dinc2);

		for (i in 2...count-1) {
			if (d < 0) {
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

		// add last point ...
		if (x1 != x2 || y1 != y2) {
			dataX.push(x2);
			dataY.push(y2);
		}
		
	}
	
	public function new() {
		// ...
	}
	
	public function batched(): Bool {
		return false;
	}
	
	public function bind(game:Game, scene:Scene):Void {
		
	}
	
	public function include(sprite:Sprite):Void {
		
	}
	
	public function exclude(sprite:Sprite):Void {
		
	}
	
	public function begin(scene:Scene):Void {
		
	}
	
	public function update(sprite:Sprite):Void {
		
		if (sprite.scene.isPaused()) return;
		
		var motion = sprite.components["motion"];
		if (motion == null) return;
		
		if (motion.state == 0) return;
		if (motion.state == 1 && motion.speed > 0) {
			
			var display = sprite.components["stage"];
			if (display == null) display = sprite.components["display"];
			if (display == null) return;
		
			if (motion.style == 0) {
				var posX = display.posX;
				var posY = display.posY;
				var dataX: Array<Float> = new Array<Float>();
				var dataY: Array<Float> = new Array<Float>();
				Motion.generateBeeline(posX, posY, motion.targetX, motion.targetY, dataX, dataY);
				motion.dataX = dataX;
				motion.dataY = dataY;
				
				if (dataX.length > 0) motion.state = 2;
				else motion.state = 0;
				
				if (motion.state == 2) motion.current = 0;
				
			} else {
				motion.state = 0; // ... 
			}
		}
		if (motion.state == 2 && motion.speed > 0) {
			
			var display = sprite.components["stage"];
			if (display == null) display = sprite.components["display"];
			if (display == null) return;
			
			var dataX: Array<Float> = cast motion.dataX;
			var dataY: Array<Float> = cast motion.dataY;
			
			var idx: Int = cast motion.current;
			
			if (idx < dataX.length) {
				display.posX = dataX[idx];
				display.posY = dataY[idx];
				if (motion.onStep != null) motion.onStep(sprite, idx, dataX.length);
				motion.current += motion.speed;
			} else {
				display.posX = dataX[dataX.length - 1];
				display.posY = dataY[dataY.length - 1];
				motion.state = 3;
			}
			
		}
		if (motion.state == 3) {
			
			motion.state = 0;
			
			var callback: Sprite-> Void = cast motion.onEnd;
			if (callback != null) callback(sprite);
			else Event.addSpriteEvent(sprite, "onMotionDone");
			
			if (motion.state == 0) motion.callback = null;
		}
		
	}
	
	public function end(scene:Scene):Void {
		
	}
}
