package oge2d.driver;

#if flash
typedef Renderer = oge2d.driver.lime.RendererStage3D;
#else
typedef Renderer = oge2d.driver.lime.RendererGL;
#end
