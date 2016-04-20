
function onMouseUp(sprite, button) {
	
	var game = sprite.game;
	game.log(sprite.name + " - onMouseUp: " + button + ", " + Mouse.x + ", " + Mouse.y);
	
	var display = game.sys("display");
	if (!display.isVisible(game.spr("cursor1"))) return;
	
	var color = game.sys("color");
	if (color.isTwinkling(sprite)) return;
	
	color.twinkle(sprite, 5, 200);
	
	game.sound("select").play();
	
	game.sys("plot").callScene(game, "battle", 100, 40);
	
}
