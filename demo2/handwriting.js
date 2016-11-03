var canvasWidth=Math.min(600,$(window).width()-20);
var canvasHeight=canvasWidth;
var ismouseDown=false;
var lastloc={x:0,y:0};
var lastTimestamp=0;
var lastLineWidth= -1;
var canvas=document.getElementById("canvas");
var context=canvas.getContext("2d");

canvas.width=canvasWidth;
canvas.height=canvasHeight;
$("#controller").css("width",canvasWidth+"px");
drawGrid();
// console.log(color);
document.getElementById('clear_btn').onclick=function(){
	context.clearRect(0, 0, canvasWidth,canvasHeight);
	drawGrid();
}
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
function beginStroke(point){
	ismouseDown=true;
	lastloc=windowToCanvas(point.x,point.y);
	lastTimestamp=new Date().getTime();
}
function endStroke(){
	ismouseDown=false;
}
function moveStroke(point){
	if(ismouseDown){
		//写字
		var curloc=windowToCanvas(point.x,point.y);
		var curTimestamp=new Date().getTime();
		var s=calcDistance(curloc,lastloc);
		var t=curTimestamp-lastTimestamp;
		var lineWidth=calcLineWidth(t,s);
		var color=$('.color_btn_selected').css('backgroundColor');
		context.beginPath();
		context.moveTo(lastloc.x,lastloc.y);
		context.lineTo(curloc.x, curloc.y);
		context.strokeStyle=color;
		context.lineWidth=lineWidth;
		context.lineCap="round";
		context.lineJoin="round";
		context.stroke();
		lastloc=curloc;
		lastTimestamp=curTimestamp;
		lastLineWidth=lineWidth;
	}
}
canvas.onmousedown=function(e){
	e.preventDefault();
	beginStroke({x:e.clientX,y:e.clientY})
}
canvas.onmouseup=function(e){
	e.preventDefault();
	endStroke();
}
canvas.onmouseout=function(e){
	e.preventDefault();
	endStroke();
}
canvas.onmousemove=function(e){
	e.preventDefault();
	if(ismouseDown){
		moveStroke({x:e.clientX,y:e.clientY});
	}
}
canvas.addEventListener('touchstart', function(e){
	 e.preventDefault();
	 touch=e.touches[0];
	 beginStroke({x:touch.pageX,y:touch.pageY})
})
canvas.addEventListener('touchmove', function(e){
	 e.preventDefault();
     if(ismouseDown){
     	 touch=e.touches[0];
     	moveStroke({x:touch.pageX,y:touch.pageY})
     }
})
canvas.addEventListener('touchend', function(e){
	 e.preventDefault();
	 endStroke();
})
function calcDistance(loc1,loc2){
	return Math.sqrt((loc1.x-loc2.x)*(loc1.x-loc2.x)+(loc1.y-loc2.y)*(loc1.y-loc2.y));
}
var maxLineWidth=30;
var minLineWidth=1;
var maxSpeed=10;
var minSpeed=0.1;
function calcLineWidth(t,s){
	var v=s/t;
	var resultLineWidth;
	if(v<=minSpeed){
		resultLineWidth=maxLineWidth;
	}else{
		if(v>=maxSpeed){
		 resultLineWidth=minLineWidth;
		}else{
		  resultLineWidth=maxLineWidth-(v-minSpeed)/(maxSpeed-minSpeed)*(maxLineWidth-minLineWidth);
		}
	}
	if(lastLineWidth == -1){
		return resultLineWidth;
	}
	return lastLineWidth*2/3+resultLineWidth*1/3;
}
function windowToCanvas(x,y){
	var bbox=canvas.getBoundingClientRect();
	return {x:Math.round(x-bbox.left),y:Math.round(y-bbox.top)}
}
function drawGrid(){
	context.save();
	// 绘制边框
	context.strokeStyle='rgb(230,11,9)';
	context.beginPath();
	context.lineWidth=6;
	context.moveTo(3, 3);
	context.lineTo(canvasWidth-3, 3);
	context.lineTo(canvasWidth-3,canvasHeight-3);
	context.lineTo(3,canvasHeight-3);
	context.closePath();
	context.stroke();
	//绘制米字格
	context.beginPath();
    context.lineWidth=1;
    drawDashedLine(context,0,0,canvasWidth, canvasHeight,15);
	
    drawDashedLine(context,canvasWidth,0,0,canvasHeight,15);

    drawDashedLine(context,canvasWidth/2,0,canvasWidth/2,canvasHeight,15);
	
    drawDashedLine(context,0,canvasHeight/2,canvasWidth,canvasHeight/2,15);
	
	context.restore();
}
function drawDashedLine(context, x1, y1, x2,y2, dashLength) {  
   dashLength = dashLength === undefined ? 5 :dashLength;  
   var deltaX = x2 - x1;  
   var deltaY = y2 - y1;  
   var numDashes = Math.floor(Math.sqrt(deltaX * deltaX + deltaY *deltaY) / dashLength);  
   for (var i=0; i < numDashes;i++) {  
      context[ i % 2 === 0 ? 'moveTo' :'lineTo' ]  
         (x1 + (deltaX / numDashes) * i, y1 +(deltaY / numDashes) * i);  
   }  
   context.stroke();  
}


