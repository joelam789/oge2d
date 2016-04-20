package oge2d.driver;

#if flash
typedef DisplayBuffer = oge2d.driver.lime.DisplayBufferStage3D;
#else
typedef DisplayBuffer = oge2d.driver.lime.DisplayBufferGL;
#end
