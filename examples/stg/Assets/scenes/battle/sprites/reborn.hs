
function onPlot(sprite, plot) {
	
	var game = sprite.game;
	game.log("onPlot - by [" + sprite.scene.name + "]" + sprite.name);

	var scene = sprite.scene;
	var profile = scene.get("player");
	var player = scene.spr("player1");
	
	if (profile != null && player != null) {
		
		if (profile.lives <= 0) {
			profile.progress = -1;
			plot.enable(scene.spr("gameover"));
		} else {
			
			profile.lives = profile.lives - 1;
			profile.bombs = 2;
			profile.level = 1;
			profile.hp = 100;
			profile.controllable = false;
			
			player.enable();
			player.get("display").posX = 320;
			player.get("display").posY = 480 + 150;
			
			game.sys("color").flicker(player, 2, 20);
			
			plot.moveTo(player, 320, 350, 10);
			
			profile.controllable = true;
			
		}
	}
	
	plot.disable(sprite);

}
