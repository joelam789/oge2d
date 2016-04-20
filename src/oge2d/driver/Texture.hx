package oge2d.driver;

#if flash
typedef Texture = oge2d.driver.lime.TextureStage3D;
#else
typedef Texture = oge2d.driver.lime.TextureGL;
#end
