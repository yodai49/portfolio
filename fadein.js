var animationmax = 1; //nextmodeにうつるタイミング
var INIT_TIME_ORD=performance.now()*2; //パフォーマンス
var t = 0; //ロード完了後からの経過時間 ミリ秒　t2はロード完了前からの時間　t3はフェードインの管理用
var canvasWidth,canavasHeight;
var mouseX=0,mouseY=0,prevMouseX=0,prevMouseY=0;
var loadedFlg=0;

window.addEventListener('load',function(){ loadedFlg=1}); //ロードイベント登録
window.addEventListener('DOMContentLoaded', function(){
    document.getElementById("fadeinCanvas").style.zIndex=100;
});
window.addEventListener('DOMContentLoaded',init);
window.addEventListener('mousemove', function (e) { //マウスが動いた時
    var rect = e.target.getBoundingClientRect();
	mouseX = e.clientX;
	mouseY = e.clientY;

}, false);

function init() {
    //ローディング処理////////////////////////////////////////
    INIT_TIME_ORD=performance.now()
    //2Dの処理
    fadein2d=document.getElementById("fadeinCanvas").getContext("2d");
    tick();

    function tick() {
        t=(performance.now()-INIT_TIME_ORD)/1000;//システム系の処理
        //リセット処理
        document.getElementById("fadeinCanvas").width=document.getElementById("wrapper").scrollWidth;
        document.getElementById("fadeinCanvas").height=document.getElementById("wrapper").scrollHeight;
        canvasWidth=document.getElementById("fadeinCanvas").width;
        canvasHeight=document.getElementById("fadeinCanvas").height;
        fadein2d.clearRect(0,0,fadein2d.width,fadein2d.height);
        fadein2d.fillStyle="rgba(0,0,0,"+ Math.min(1,Math.max(0,1-(t-0.8)/2))+")";
        fadein2d.fillRect(0,0,canvasWidth,canvasHeight);

        let fadein_fontsize=18;
        fadein2d.font=fadein_fontsize+"mm "+"Poiret One, cursive";
        fadein2d.fillStyle="rgba(255,255,255,"+ Math.min(1,Math.max(0,1-(t-0.8)/1.5))+")";
        var drawTxtTemp="";
        if(window.location.href.substr(-10) == "about.html"){ 
            drawTxtTemp="ABOUT";
        }  else if(window.location.href.substr(-10) == "works.html"){ 
            drawTxtTemp="WORKS";
        } else if(window.location.href.substr(-10) == "songs.html"){
            drawTxtTemp="SONGS";
        }  else if(window.location.href.substr(-11) == "typing.html"){ 
            drawTxtTemp="TYPING";
        } 
        var drawTxt=drawTxtTemp.substr(0,Math.floor(t*10));
        inputChar=String.fromCharCode(65+Math.floor(Math.random()*25));
        if(0<Math.max(0,Math.floor(t*10)) && Math.max(0,Math.floor(t*10))<drawTxtTemp.length) drawTxt+=inputChar;
        fadein2d.fillText(drawTxt,(canvasWidth-fadein2d.measureText(drawTxtTemp).width)/2,canvasHeight/2);

        document.getElementById("dammy-fadein").style.display="none";
        if(t>2.8) document.getElementById("fadeinCanvas").style.zIndex=12;

        //Mouse Cursor
        prevMouseX=(2*prevMouseX+mouseX)/3;
        prevMouseY=(2*prevMouseY+mouseY)/3;

        fadein2d.lineWidth=1;
        if(!(navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/i))){ //if agent is PC 
            fadein2d.strokeStyle="rgba(32,32,32,"+(0.4+0.3*Math.sin(t*10))+")";
            fadein2d.fillStyle="rgba(0,0,0,0.2)";
            fadein2d.beginPath();
            fadein2d.arc(prevMouseX,prevMouseY,30,0,Math.PI*2);
            fadein2d.stroke()
            fadein2d.fill();
        }


        requestAnimationFrame(tick);
    }
}