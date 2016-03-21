/*window.onload=function(){
   var bird={
   	x:140,
   	y:264,
   	w:40,
   	h:40
   }

   var guandao=[
    {
      top:{ x:300, y:0,w:80,h:300},
    bottom:{ x:300, y:420,w:80,h:330}
     },
    {
      top:{ x:510,y:0,w:80,h:300}, 
    bottom:{ x:510,y:420,w:80, h:300}
    }
   ]


  ctx=document.querySelector("#canvas").getContext("2d");
  var recvsrec =  function(rect0,rect1){
     if (rect0.x >= rect1.x && rect0.x >= rect1.x + rect1.w) {
       return false;
     } else if (rect0.x <= rect1.x && rect0.x + rect0.w <= rect1.x) {
       return false;
     } else if (rect0.y >= rect1.y && rect0.y >= rect1.y + rect1.h) {
       return false;
     } else if (rect0.y <= rect1.y && rect0.y + rect0.h <= rect1.y) {
       return false;
     }
     return true;
   };

 var draw=function(){
 	//画鸟
    bird.y+=2;
    ctx.fillStyle="red";
   	ctx.clearRect(0,0,320,568);
    ctx.fillRect(bird.x,bird.y,bird.w,bird.h);

    //画管道
  var a=1; 
  a+=0.05;
  bird.y+=a*a;
  ctx.beginPath();
  ctx.fillStyle="#af2";
  ctx.fillRect(bird.x,bird.y,bird.w,bird.h);
   var vs;
   for (var i = 0; i < guandao.length; i++) {
     var z=guandao[i];
     z.top.x-=3;
     z.bottom.x-=3;
     ctx.fillRect(z.top.x,z.top.y,z.top.w,z.top.h);
     ctx.fillRect(z.bottom.x,z.bottom.y,z.bottom.w,z.bottom.h);
     if(recvsrec(bird,z.top)||recvsrec(bird,z.bottom)){
      vs=true;
     }
     if(z.top.x<=-z.top.w){
      z.top.x=320;
      z.bottom.x=320;
      z.top.h=Math.random()*190+210;
      z.bottom.y=z.top.h+220;
      z.bottom.h=568-z.top.h-120;
     }
   };
   if(vs){
    return;
   }

    //边界判断
     if(bird.y>528){
   	     ctx.fillRect(140,528,bird.w,bird.h);
      }else if(bird.y<0){
      	  ctx.fillRect(bird.x,0,bird.w,bird.h);
      }
      else{
      	 window.requestAnimationFrame(draw);
      }

   }

   canvas.onclick=function(){
   	bird.y-=80;
    a=1;
   }
  requestAnimationFrame(draw);


  /*var move=function(){

  	ctx.fillRect(fix,fiy,20,100);
  }

}*/



window.onload=function(){
  "use strict";
  // var W  = document.documentElement.clientWidth,
  //     H = document.documentElement.clientHeight;
  var W =320,H = 568;
  // 检测矩形之间的碰撞
  var recvsrec =  function(rect0,rect1){
    if (rect0.x >= rect1.x && rect0.x >= rect1.x + rect1.w) {
      return false;
    } else if (rect0.x <= rect1.x && rect0.x + rect0.w <= rect1.x) {
      return false;
    } else if (rect0.y >= rect1.y && rect0.y >= rect1.y + rect1.h) {
      return false;
    } else if (rect0.y <= rect1.y && rect0.y + rect0.h <= rect1.y) {
      return false;
    }
    return true;
  };

  // 根据屏幕大小生成管道数据
  var generateTunel = (function(){
    var spec = 150, w = 50,
  len = Math.ceil( W/(spec+w) );
    return function(){
      var r =  [],tun,x,h;
      for ( var i = 0;  i < len;  i++){
  x = (W/2) + (spec+w)*i;
  h = Math.floor( Math.random()*50  + H*0.4 );
  tun = {
    top:{x:x,y:0,w:w,h:h},
    bottom:{x:x,y:h+200,w:w,h:H-200-h}
  };
  r.push(tun);
      }
      return r;
    };
  })();

  var
  ctx = canvas.getContext('2d'),
  //是否检测到碰撞
  vs = false,
  //管道间隙
  spec,
  //鸟
  bird = {x:100,y:310,w:30,h:30},
  //管道
  tunel = generateTunel();
  canvas.width = W;
  canvas.height = H;

  canvas.addEventListener('click',function(e){
    bird.y -= upspeed;
  },false);
  canvas.addEventListener('touchend',function(e){
    bird.y -= upspeed;
  },false);

  var dropspeed = 2;
  var movespeed = 3;
  var upspeed  = 40;
  imgs.onload=function(){
    ctx.drawImage(imgs,0,0);
  }
  imgsbird.onload=function(){
    ctx.drawImage(imgs,0,0);
  }
  var draw = function(){
    ctx.clearRect(0,0,W,H);
    bird.y += dropspeed;
    ctx.fillStyle="#fff";
    ctx.drawImage(imgsbird,bird.x,bird.y,bird.w,bird.h);
    
    tunel.forEach(function(d,i){
      d.top.x -= movespeed;  d.bottom.x -= movespeed;
      //柱子超出画布后 随机生成符合一定规则的柱子
      if( d.top.x < -d.top.w){
        d.top.x = d.bottom.x = W;
        d.top.h = Math.floor( Math.random()*50  + H*0.2 );
        // spec = Math.floor( Math.random()*20 + 100);
        spec = 200;
        d.bottom.y = d.top.h + spec;
        d.bottom.h = H - d.bottom.y;
      }

      // 只在鸟过柱子区域的时候才判断碰撞
      if(d.top.x < (bird.x+bird.w)  && d.top.x > (bird.x - d.top.w) ){
  if( recvsrec(bird,d.top) || recvsrec(bird,d.bottom) ){
    vs = true;
  }
      }
      ctx.fillRect(d.top.x,d.top.y,d.top.w,d.top.h);
      ctx.drawImage(imgs,d.top.x,d.top.y,d.top.w,d.top.h);
      ctx.fillRect(d.bottom.x,d.bottom.y,d.bottom.w,d.bottom.h);
      ctx.drawImage(imgs,d.bottom.x,d.bottom.y,d.bottom.w,d.bottom.h);
    });
    if( bird.y > H-bird.h || bird.y < 0 || vs ){

      end.style.display="block";
      return;
      
    }
     requestAnimationFrame(draw);
  };
  // 
   button.onclick=function(){
    requestAnimationFrame(draw);
    
     end.style.display="none"; 
     window.onload();
   }
  
};