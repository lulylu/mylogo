var canvasWidth=Math.min(600,$(window).width()-20);
var canvasHeight=canvasWidth;
var canvas=document.getElementById("canvas");
var context=canvas.getContext("2d");
var ismouseDown=false;
var lastloc={x:0,y:0}
canvas.width=canvasWidth;
canvas.height=canvasHeight;
$('#controller').css('width',canvasWidth+"px");
drawGrid();
$('#black_btn').click(function(){
   	  $('.color_btn').removeClass('color_btn_selected');
   	  $(this).addClass('color_btn_selected');
})
$('#red_btn').click(function(){
      $('.color_btn').removeClass('color_btn_selected');
   	  $(this).addClass('color_btn_selected');
})
$('#green_btn').click(function(){
   	  $('.color_btn').removeClass('color_btn_selected');
   	  $(this).addClass('color_btn_selected');
})
$('#clear_btn').click(function(){
	context.clearRect(0, 0,canvasWidth,canvasHeight);
	drawGrid();
})
function beginDraw(point){
	ismouseDown=true;
    lastloc=windowToCanvas(point.x,point.y);
}
function endDraw(){
	ismouseDown=false;
}
function moveDraw(point){
	if(ismouseDown){
        var curloc=windowToCanvas(point.x,point.y);
        context.beginPath();
        context.moveTo(lastloc.x,lastloc.y);
        context.lineTo(curloc.x, curloc.y);
        context.lineWidth=15;
         context.strokeStyle=$('.color_btn_selected').css('backgroundColor');
        context.lineCap="round";
		context.lineJoin="round";
        context.stroke();
        lastloc=curloc;
	}
}
canvas.addEventListener('touchstart',function(e){
	e.preventDefault();
	var touch=e.touches[0];
    beginDraw({x:touch.pageX,y:touch.pageY});
})
canvas.addEventListener('touchend',function(e){
	e.preventDefault();
	endDraw();
})
canvas.addEventListener('touchmove',function(e){
	e.preventDefault();
	var touch=e.touches[0];
    moveDraw({x:touch.pageX,y:touch.pageY});
})
canvas.addEventListener('touchstart',function(e){
	e.preventDefault();
	var touch=e.touches[0];
    beginDraw({x:touch.pageX,y:touch.pageY});
})
canvas.onmousedown=function(e){
	e.preventDefault();
    beginDraw({x:e.clientX,y:e.clientY});
}
canvas.onmouseup=function(e){
	e.preventDefault();
	endDraw();
}
canvas.onmouseout=function(e){
	e.preventDefault();
	endDraw();
}
canvas.onmousemove=function(e){
	e.preventDefault();
	moveDraw({x:e.clientX,y:e.clientY});
}
function drawGrid(){
	// 绘制边框
	context.strokeStyle='rgb(230,11,9)';
    context.beginPath();
    context.lineWidth=6;
    context.moveTo(3, 3);
    context.lineTo(canvasWidth-3, 3);
    context.lineTo(canvasWidth-3, canvasHeight-3);
    context.lineTo(3, canvasHeight-3);
    context.closePath();
    context.stroke();
    //绘制米字格
    context.lineWidth=2;
    drawDashedLine(context,0,0,canvasWidth,canvasHeight,15);
    drawDashedLine(context,canvasWidth,0,0,canvasHeight,15);
    drawDashedLine(context,canvasWidth/2,0,canvasWidth/2,canvasHeight,15);
    drawDashedLine(context,0,canvasHeight/2,canvasWidth,canvasHeight/2,15);
}
function windowToCanvas(x,y){
	var box=canvas.getBoundingClientRect();
    return {x:Math.round(x-box.left),y:Math.round(y-box.top)};
}
function drawDashedLine(context,x1,y1,x2,y2,dashLength){
	dashLength=dashLength===undefined?5:dashLength;
	var deltax=x2-x1;
	var deltay=y2-y1;
	var num=Math.floor(Math.sqrt(deltax*deltax+deltay*deltay)/dashLength);
	for(var i=0;i<num;i++){
		context[i%2===0?'moveTo':'lineTo'](x1+deltax/num*i,y1+deltay/num*i);
	}
	context.stroke();
}