/**
 * Created by Administrator on 2016/8/9.
 */
window.onload=function(){
    //创建div对象的构造函数
    var parent=document.getElementById('bigDiv');
    function CreateDiv(id,top1,img,pinner){
        this.id=id;
        this.top1=top1;
        this.img1=img;
        this.pinner=pinner;
        var _this=this;
        this.obj=(function(){
            var obj=document.createElement('div');
            obj.id=_this.id;
            obj.style.left="5px";
            obj.style.position='absolute';
            obj.style.top=_this.top1+"px";
            obj.style.width="100px";
            obj.style.height="110px";
            obj.style.border="1px solid #06740A";
            parent.appendChild(obj);
            obj.onmouseover=function(){
                obj.style.background="lightgray";
                obj.style.border="1px solid #AFB6B9";
            }
            obj.onmouseout=function(){
                obj.style.background="none";
                obj.style.border="1px solid #06740A";
            }
            return obj;
        })()
        this.objimg=(function(){
            var objimg=document.createElement('img');
            objimg.style.width="100px";
            objimg.style.height='90px';
            objimg.src=_this.img1;
            _this.obj.appendChild(objimg);
            return objimg;
        })()
        this.objp=(function(){
            var objp=document.createElement('p');
            objp.innerHTML=_this.pinner;
            _this.obj.appendChild(objp);
            return objp;
        })()
    }
    //创建开始菜单
    var start=document.getElementById('start');
    var menu=document.getElementById('menu');
    var flag=0;
    start.onclick=function(){
        if(flag==0) {
            menu.style.display = "block";
            flag=1;
        }
        else{
            menu.style.display="none";
            flag=0;
        }
    }
    //右键事件
    var rightMenu=document.getElementById("rightMenu");
    var list=document.getElementsByTagName('li');
    for(var i=0;i<list.length;i++){
        var currentli=list[i];
        currentli.onclick=function(e){
            e=e||window.event;
            var currentView=e.target;
            if(currentView.innerHTML=="刷新"){
                location.reload();
            }
                e.stopPropagation();
                rightMenu.style.display = "none";

        }
    }
    document.oncontextmenu=function(e){
        e=e||window.event;
        e.preventDefault();
        rightMenu.style.display="block";
        rightMenu.style.top= e.clientY+"px";
        rightMenu.style.left= e.clientX+"px";
    }
    document.onclick=function(e){
        e=e||window.event;
        rightMenu.style.display="none";
    }
    //菜单的双击事件
    var drag=document.getElementById('drag');
    var flag=0;
    var button=document.getElementById('button1');
    function Shuangji(id,titles){
        this.id=document.getElementById(id);
        this.titles=titles;
        var _this=this;
        this.id.ondblclick=function(){
            drag.style.display="block";
            document.getElementById('drag-p').innerHTML=_this.titles;
        }
    }
    button.onclick=function(){
        drag.style.display="none";
    }
    drag.onmousedown=function(e){
        e=e||window.event;
        flag=1;
        this.lTop= e.clientY-this.offsetTop;
        this.lLeft= e.clientX-this.offsetLeft;
    }
    drag.onmousemove=function(e){
        if(flag==1){
            e=e||window.event;
            drag.style.top= e.clientY-drag.lTop+"px";
            drag.style.left= e.clientX-drag.lLeft+"px";
        }
    }
    drag.onmouseup=function(){
        flag=0;
    }
    var my1=new CreateDiv('myPc','15','Img/clone-trooper.png','我的电脑');
    var my2=new CreateDiv('myInternet','135','Img/death-sta.png','网络');
    var my3=new CreateDiv('myReserve','255','Img/darth-vader.png','网络')
    var myPc=new Shuangji('myPc','我的电脑');
    var myInternet=new Shuangji('myInternet','网络');
    var myReserve=new Shuangji('myReserve','回收站');
}

