
function onPlot(sprite, plot) {
	
	var game = sprite.game;
	game.log("onPlot - by [" + sprite.scene.name + "]" + sprite.name);

	game.music("battle").vol(1);
	game.music("battle").play();
	
	var scene = game.scene;
	var battle = game.lib("BattleScene");
	
	plot.enable(game.spr("reborn"));
	
	plot.wait(3000);
	
	battle.sendEnemy1(scene, 300, 0, 4);
	plot.wait(300);
	battle.sendEnemy1(scene, 230, 0, 4);
	plot.wait(300);
	battle.sendEnemy1(scene, 160, 0, 4);
	
	plot.wait(2000);
	
	battle.sendEnemy1(scene, 120, 0, -4);
	plot.wait(300);
	battle.sendEnemy1(scene, 50, 0, -4);
	plot.wait(300);
	battle.sendEnemy1(scene, -20, 0, -4);
	
	plot.wait(2500);
	battle.resetBonus(scene);
	
	battle.sendEnemy2(scene, 0, -32, 4);
	plot.wait(300);
	battle.sendEnemy2(scene, 0, -32, 4);
	plot.wait(300);
	battle.sendEnemy2(scene, 0, -32, 4);
	plot.wait(300);
	battle.sendEnemy2(scene, 0, -32, 4);
	plot.wait(300);
	battle.sendEnemy2(scene, 0, -32, 4);
	
	plot.wait(3000);
	
	battle.sendEnemy3(scene, 600, -20, 2);
	plot.wait(300);
	battle.sendEnemy3(scene, 500, -20, 2);
	plot.wait(300);
	battle.sendEnemy3(scene, 400, -20, 2);
	plot.wait(300);
	battle.sendEnemy3(scene, 300, 500, 2);
	plot.wait(300);
	battle.sendEnemy3(scene, 200, 500, 2);
	plot.wait(300);
	battle.sendEnemy3(scene, 100, 500, 2);
	
	plot.wait(3000);
	
	battle.sendEnemy3(scene, 100, -20, 2);
	plot.wait(300);
	battle.sendEnemy3(scene, 200, -20, 2);
	plot.wait(300);
	battle.sendEnemy3(scene, 300, -20, 2);
	plot.wait(300);
	battle.sendEnemy3(scene, 400, 500, 2);
	plot.wait(300);
	battle.sendEnemy3(scene, 500, 500, 2);
	plot.wait(300);
	battle.sendEnemy3(scene, 600, 500, 2);
	
	plot.wait(3000);
	
	battle.sendEnemy2(scene, 0, 64, -4);
	plot.wait(300);
	battle.sendEnemy2(scene, 0, 64, -4);
	plot.wait(300);
	battle.sendEnemy2(scene, 0, 64, -4);
	plot.wait(300);
	battle.sendEnemy2(scene, 0, 64, -4);
	plot.wait(300);
	battle.sendEnemy2(scene, 0, 64, -4);
	
	plot.wait(2500);
	
	battle.sendEnemy1(scene, 120, 0, -4);
	plot.wait(300);
	battle.sendEnemy1(scene, 50, 0, -4);
	plot.wait(300);
	battle.sendEnemy1(scene, -20, 0, -4);
	
	plot.wait(2000);
	
	battle.sendEnemy1(scene, 300, 0, 4);
	plot.wait(300);
	battle.sendEnemy1(scene, 230, 0, 4);
	plot.wait(300);
	battle.sendEnemy1(scene, 160, 0, 4);
	
	plot.wait(2000);
	
	battle.sendEnemy4(scene, 200, -100, "right");
	battle.sendEnemy4(scene, 400, -200, "left");
	battle.sendEnemy4(scene, 200, -300, "right");
	battle.sendEnemy4(scene, 400, -400, "left");
	battle.sendEnemy4(scene, 100, -500, "down");
	battle.sendEnemy4(scene, 500, -500, "down");
	
	plot.wait(2000);
	
	battle.sendEnemy5(scene, 0, 0, 1);
	plot.wait(12000);
	battle.sendEnemy5(scene, 0, 0, -1);
	
	plot.wait(12000);
	
	battle.sendEnemy6(scene);
	plot.wait(2000);
	battle.sendEnemy6(scene);
	plot.wait(2000);
	battle.sendEnemy6(scene);
	plot.wait(2000);
	battle.sendEnemy6(scene);
	plot.wait(2000);
	battle.sendEnemy6(scene);
	plot.wait(2000);
	battle.sendEnemy6(scene);
	
	plot.wait(500);
	battle.resetBonus(scene);
	
	battle.sendEnemy2(scene, 0, 64, 4);
	plot.wait(300);
	battle.sendEnemy2(scene, 0, 64, 4);
	plot.wait(300);
	battle.sendEnemy2(scene, 0, 64, 4);
	plot.wait(300);
	battle.sendEnemy2(scene, 0, 64, 4);
	plot.wait(300);
	battle.sendEnemy2(scene, 0, 64, 4);
	
	plot.wait(500);
	
	battle.sendEnemy6(scene);
	plot.wait(2000);
	battle.sendEnemy6(scene);
	plot.wait(2000);
	battle.sendEnemy6(scene);
	plot.wait(2000);
	battle.sendEnemy6(scene);
	
	plot.wait(500);
	
	battle.sendEnemy2(scene, 0, -32, -4);
	plot.wait(300);
	battle.sendEnemy2(scene, 0, -32, -4);
	plot.wait(300);
	battle.sendEnemy2(scene, 0, -32, -4);
	plot.wait(300);
	battle.sendEnemy2(scene, 0, -32, -4);
	plot.wait(300);
	battle.sendEnemy2(scene, 0, -32, -4);
	
	plot.wait(500);
	
	battle.sendEnemy6(scene);
	plot.wait(2000);
	battle.sendEnemy6(scene);
	plot.wait(2000);
	battle.sendEnemy6(scene);
	plot.wait(2000);
	battle.sendEnemy6(scene);
	plot.wait(2000);
	battle.sendEnemy6(scene);
	
	plot.wait(2000);
	
	plot.musicFadeOut("battle", 2000);
	
	var expectedViewY = 1024 + 309;
	var currentViewY = game.sys("stage").getStageViewY(scene);
	while (currentViewY < expectedViewY) expectedViewY -= 32;
	
	plot.waitForViewPos(0, expectedViewY);
	
	game.sys("stage").loop(scene, true, 0, 5653, 0, expectedViewY);
	game.sys("stage").scroll(scene, 0, -4); // speed up
	
	game.music("boss").vol(1);
	game.music("boss").play();
	
	plot.wait(500);

	battle.sendBoss1(scene, 320, -128, 1);
	battle.sendBoss1(scene, -128, 192, 1);
	battle.sendBoss1(scene, 640+128, 192, 1);


	plot.disable(sprite);

}
