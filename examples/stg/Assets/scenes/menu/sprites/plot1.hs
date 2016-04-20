
function onPlot(sprite, plot) {
	
	var game = sprite.game;
	game.log("onPlot - by [" + sprite.scene.name + "]" + sprite.name);

	game.music("menu").play(1);
	
	var display = game.sys("display");
	
	var menuItem = game.spr("item1");
	display.setVisible(menuItem, false);
	
	var menuCursor = game.spr("cursor1");
	display.setVisible(menuCursor, false);
	
	var title = game.spr("title1");
	plot.spriteFadeIn(title, 30);
	
	display.setVisible(menuItem, true);
	display.setPosition(menuItem, 270, 600);
	
	plot.moveTo(menuItem, 270, 220, 5);
	
	plot.wait(500);
	
	display.setVisible(menuCursor, true);
	
	plot.disable(sprite);

}
