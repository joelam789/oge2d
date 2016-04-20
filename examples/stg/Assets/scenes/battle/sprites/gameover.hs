
function onPlot(sprite, plot) {
	
	var game = sprite.game;
	var scene = game.scene;
	game.log("onPlot - by [" + sprite.scene.name + "]" + sprite.name);
	
	var profile = scene.get("player");
	if (profile.progress != 0) {
		if (game.music("battle").isPlaying()) plot.musicFadeOut("battle", 2000);
		else if(game.music("boss").isPlaying()) plot.musicFadeOut("boss", 2000);
	}
	if (profile.progress > 0) {
		game.music("win").play(1);
		scene.spr("info1").enable();
		game.sys("text").setText(scene.spr("info1"), "YOU WIN");
	} else if (profile.progress < 0) {
		game.music("lose").play(1);
		scene.spr("info1").enable();
		game.sys("text").setText(scene.spr("info1"), "YOU LOSE");
	}
	
	if (profile.progress != 0) {
		plot.wait(6000);
		plot.nextScene(game, "menu", 200, 60);
	}
	
	plot.disable(sprite);

}
