var animationmax = 1; //nextmodeにうつるタイミング
var animationcnt=0; //アニメーションのカウンター 1でスタート -1処理前
var lastPerformance=performance.now(); //パフォーマンス
var t = 0; //開いてからの経過時間 ミリ秒
const INIT_TIME=performance.now();
const TITLE_TEXT=[["Welcome to","toruthi's", "portfolio."]]
const TITLE_MAX_LENGTH = 7;
const MONOS_FONTNAME="Red Hat Mono, monospace";
const SS_FONTNAME="Spartan, sans-serif";
const CUR_FONTNAME="Poiret One, cursive";
var canvasWidth,canavasHeight;
var mouseX=0,mouseY=0,prevMouseX=0,prevMouseY=0;
var balls=[{posx:0,posy:0,size:15,velx:0,vely:0},{posx:0,posy:0,size:15,velx:0,vely:0},
    {posx:0,posy:0,size:15,velx:0,vely:0},{posx:0,posy:0,size:15,velx:0,vely:0},
    {posx:0,posy:0,size:15,velx:0,vely:0},{posx:0,posy:0,size:15,velx:0,vely:0},
    {posx:0,posy:0,size:15,velx:0,vely:0},{posx:0,posy:0,size:15,velx:0,vely:0},
    {posx:0,posy:0,size:15,velx:0,vely:0},{posx:0,posy:0,size:15,velx:0,vely:0}];

// ページの読み込みを待つ

function keypress(mykey,mykeycode){ //キー入力イベント..
    if(mykey=="z"){
        window.alert("z");
    }
}

window.addEventListener('load', init); //ロードイベント登録
window.addEventListener('DOMContentLoaded', function(){ ///キー入力イベント登録
    window.addEventListener("keydown", function(e){
      keypress(e.key,e.keyCode);
    });
});
window.addEventListener('mousemove', function (e) { //マウスが動いた時
    var rect = e.target.getBoundingClientRect();
	mouseX = e.clientX;
	mouseY = e.clientY;

}, false);

function init() {
    //ローディング処理////////////////////////////////////////

    //2Dの処理
    ctx2d=document.getElementById("myCanvas").getContext("2d");
    fadein2d=document.getElementById("fadeinCanvas").getContext("2d");

    tick();

    function tick() {
        var inputChar;
        t=(performance.now()-INIT_TIME)/1000;//システム系の処理
        //リセット処理
        document.getElementById("myCanvas").width=document.getElementById("wrapper").scrollWidth;
        document.getElementById("myCanvas").height=document.getElementById("wrapper").scrollHeight;
        document.getElementById("fadeinCanvas").width=document.getElementById("wrapper").scrollWidth;
        document.getElementById("fadeinCanvas").height=document.getElementById("wrapper").scrollHeight;
        canvasWidth=document.getElementById("myCanvas").width;
        canvasHeight=document.getElementById("myCanvas").height;
        ctx2d.clearRect(0,0,ctx2d.width,ctx2d.height);
        fadein2d.clearRect(0,0,fadein2d.width,fadein2d.height);
/*
        if(document.getElementById("fadeinCanvas").width < 1020){
            ctx2d.fillStyle="rgba(139,88,31,0.2)";
            ctx2d.fillRect(0,0,canvasWidth,canvasHeight);
        } else{
            ctx2d.fillStyle="rgba(59,63,60,0.2)";
            ctx2d.fillRect(0,0,canvasWidth/2,canvasHeight);
            ctx2d.fillStyle="rgba(139,88,31,0.2)";
            ctx2d.fillRect(canvasWidth/2,0,canvasWidth/2,canvasHeight);
        }
*/
        ctx2d.fillStyle="rgba(59,63,60,0.2)";
        ctx2d.fillRect(0,0,canvasWidth,canvasHeight);
        ctx2d.fillStyle="rgba(10,16,13,0.4)";
        var grad=ctx2d.createLinearGradient(0,0,canvasWidth*0.2,0);
        grad.addColorStop(0.0,"rgba(10,16,13,0.6)");
        grad.addColorStop(1.0,"rgba(10,16,13,0.0)");
        ctx2d.fillStyle=grad;
        ctx2d.fillRect(0,0,canvasWidth*0.2,canvasHeight);

        var grad2=ctx2d.createLinearGradient(canvasWidth*0.8,0,canvasWidth,0);
        grad2.addColorStop(1.0,"rgba(10,16,13,0.6)");
        grad2.addColorStop(0.0,"rgba(10,16,13,0.0)");
        ctx2d.fillStyle=grad2;

        ctx2d.fillRect(canvasWidth*0.8,0,canvasWidth*0.2,canvasHeight);

        const TITLE_MSG_SEC=3;
        var showMsgNum=Math.floor(t/TITLE_MSG_SEC)%TITLE_TEXT.length;
        var titleTextPosLeft=50;
        var titleTextPosTop= 50;

        var drawTxt=TITLE_TEXT[0][2];

        var rectSize=Math.min(document.getElementById("myCanvas").width*0.8,document.getElementById("myCanvas").height-180);
        if(document.getElementById("myCanvas").width<1020) rectSize=Math.min(document.getElementById("myCanvas").width*0.8,document.getElementById("myCanvas").height*0.6);
        var rectLeft=(document.getElementById("myCanvas").width-rectSize)/2;
        var rectTop=(document.getElementById("myCanvas").height-rectSize)/2;

        var FONT_SIZE=rectSize/7;
        ctx2d.font=FONT_SIZE + "px "+ CUR_FONTNAME;
        ctx2d.textBaseline = "top";

        ctx2d.fillStyle="rgba(0,0,0,0.5)";
        ctx2d.fillRect(rectLeft,rectTop,rectSize,rectSize);
        ctx2d.strokeStyle="rgba(255,255,255,1)";
        ctx2d.strokeRect(rectLeft,rectTop,rectSize,rectSize);

        for(var i = 0;i < 3;i++){
            var titleTempSum=0;
            if(i>=1) titleTempSum+=TITLE_TEXT[showMsgNum][0].length;
            if(i>=2) titleTempSum+=TITLE_TEXT[showMsgNum][1].length;
            drawTxt=TITLE_TEXT[showMsgNum][i].substr(0,Math.max(0,Math.floor(t*20)-titleTempSum));
            inputChar=String.fromCharCode(65+Math.floor(Math.random()*25));

            ctx2d.fillStyle="rgba(9,13,10,0.8)";//underline
            titleTextPosLeft=(document.getElementById("myCanvas").width-ctx2d.measureText(drawTxt).width)/2;
            titleTextPosTop=FONT_SIZE*1.2*(i-1)+(document.getElementById("myCanvas").height-FONT_SIZE)/2;
            if(0<Math.max(0,Math.floor(t*20)-titleTempSum) && Math.max(0,Math.floor(t*20)-titleTempSum)<TITLE_TEXT[showMsgNum][i].length) drawTxt+=inputChar;

            ctx2d.fillStyle="rgba(217,162,35,1)"; //text
            ctx2d.fillText(drawTxt,titleTextPosLeft,titleTextPosTop);
        }

//Mouse Cursor
        prevMouseX=(2*prevMouseX+mouseX)/3;
        prevMouseY=(2*prevMouseY+mouseY)/3;
        
        if(!(navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/i))){ //if agent is PC 
            ctx2d.strokeStyle="rgba(225,220,200,"+(0.4+0.3*Math.sin(t*10))+")";
            ctx2d.fillStyle="rgba(0,0,0,0.2)";
            ctx2d.beginPath();
            ctx2d.arc(prevMouseX,prevMouseY,30,0,Math.PI*2);
            ctx2d.stroke()
            ctx2d.fill();
        }

        fadein2d.fillStyle="rgba(0,0,0,"+ Math.max(0,1-t)+")";
        fadein2d.fillRect(0,0,canvasWidth,canvasHeight);
        if(t>1) document.getElementById("fadeinCanvas").style.zIndex=-1;
        document.getElementById("dammy-fadein").style.display="none";

        requestAnimationFrame(tick);
    }
}