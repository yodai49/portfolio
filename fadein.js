var animationmax = 1; //nextmodeにうつるタイミング
var INIT_TIME_ORD=performance.now()*2; //パフォーマンス
var t = 0; //ロード完了後からの経過時間 ミリ秒　t2はロード完了前からの時間　t3はフェードインの管理用
var canvasWidth,canavasHeight;
var mouseX=0,mouseY=0,prevMouseX=0,prevMouseY=0;
var drawTxtTemp="";
var nextPage="";
var nextPageLP=0;
document.getElementById("prev_buttons1").addEventListener('click',function(event){
    nextPage=event.target.title;
    localStorage.setItem("nextPage",nextPage);
    nextPageLP=performance.now();
    document.getElementById("fadeinCanvas").style.zIndex=999;
    event.preventDefault()
})

window.addEventListener('DOMContentLoaded', function(){
    document.getElementById("fadeinCanvas").style.zIndex=100;
});
window.addEventListener('load',init);
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
    document.getElementById("dammy-fadein").style.display="none";
    tick();

    function tick() {
        t=(performance.now()-INIT_TIME_ORD)/1000;//システム系の処理
        //リセット処理
        document.getElementById("fadeinCanvas").width=document.getElementById("wrapper").scrollWidth;
        document.getElementById("fadeinCanvas").height=document.getElementById("wrapper").scrollHeight;
        canvasWidth=document.getElementById("fadeinCanvas").width;
        canvasHeight=document.getElementById("fadeinCanvas").height;
        fadein2d.clearRect(0,0,fadein2d.width,fadein2d.height);
        fadein2d.fillStyle="rgba(0,0,0,"+ Math.min(1,Math.max(0,1-(t-0.8)))+")";
        if(t >= 0.8){
            fadein2d.fillStyle="rgba(0,0,0,"+ Math.min(1,Math.max(0,1-(t-0.8)))/3+")";
            for(var i = 0;i < 10;i++){
                fadein2d.fillRect(canvasWidth*(i/20+1-Math.max(0,1-(t-0.8))),0,canvasWidth,canvasHeight);
            }
        } else{
            fadein2d.fillRect(0,0,canvasWidth,canvasHeight);
        }

        if(nextPage!=""){ //遷移時
            let t2=performance.now()-nextPageLP;
            fadein2d.fillStyle="rgba(0,0,0," +(t2/1000)+")";
            fadein2d.fillRect(0,0,canvasWidth*(t2/500),canvasHeight);
            if(t2 > 1000) {
                nextPage=localStorage.getItem("nextPage");
                nextPageLP=-1;
                if(nextPage != undefined) window.location.assign(localStorage.getItem("nextPage"));
            }
        }

        drawTxtTemp="";
        if(window.location.href.substr(-10) == "about.html"){ 
            drawTxtTemp="ABOUT";
        }  else if(window.location.href.substr(-10) == "works.html"){ 
            drawTxtTemp="WORK";
        } else if(window.location.href.substr(-10) == "piece.html"){
            drawTxtTemp="PIECE";
        }  else if(window.location.href.substr(-11) == "typing.html"){ 
            drawTxtTemp="TYPING";
        } 
        var drawTxt=drawTxtTemp.substr(0,Math.floor(t*12));
        document.getElementById("fadeinText").textContent=drawTxt;
        document.getElementById("fadeinText").style.color="rgba(255,255,255," + Math.max(Math.min(1,1-(t-0.4)/0.8)) +")";
        if(t>2.8 && nextPage=="") {
            document.getElementById("fadeinCanvas").style.zIndex=12;
            document.getElementById("fadeinText").style.zIndex=-1;
        }
        if(nextPage!=""){ //遷移時
            let t2=performance.now()-nextPageLP;
            if(t2 > 1000) location.href=nextPage;
        }
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