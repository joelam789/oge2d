
function onActive(scene) {
	scene.reset();
	scene.game.sys("plot").setEnabled(scene.spr("plot1"), true);
}

function onInactive(scene) {
	scene.game.music("menu").stop();
	scene.game.sys("color").stopTwinkling(scene.spr("item1"));
}

function onKeyUp(scene, key) {
	
	var game = scene.game;

	if (key == "SPACE") {
		var music = game.music("menu");
		if (scene.isPaused()) {
			scene.resume();
			music.resume();
			game.log("end of pause: " + game.ticks);
		} else {
			scene.pause();
			music.pause();
			game.log("start to pause: " + game.ticks);
		}
	}
	
	if (key == "ENTER") {
		
		var display = game.sys("display");
		if (!display.isVisible(scene.spr("cursor1"))) return;
		
		var color = game.sys("color");
		if (color.isTwinkling(scene.spr("item1"))) return;
		
		color.twinkle(scene.spr("item1"), 5, 200);
		
		game.sound("select").play();
		
		game.sys("plot").callScene(game, "battle", 100, 40);
	}
	
}

