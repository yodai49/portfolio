var animationmax = 1; //nextmodeにうつるタイミング
var animationcnt=0; //アニメーションのカウンター 1でスタート -1処理前
var lastPerformance=performance.now(); //パフォーマンス
var t = 0; //開いてからの経過時間 ミリ秒
const INIT_TIME=performance.now();
const TITLE_TEXT=[["HI.","THIS IS", "TORUTHI."]]
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

        ctx2d.fillStyle="rgba(59,63,60,0.2)";
        ctx2d.fillRect(0,0,canvasWidth/2,canvasHeight);
        ctx2d.fillStyle="rgba(139,88,31,0.2)";
        ctx2d.fillRect(canvasWidth/2,0,canvasWidth/2,canvasHeight);

        var FONT_SIZE=Math.min(document.getElementById("myCanvas").width/TITLE_MAX_LENGTH,document.getElementById("myCanvas").height/3.3);
        ctx2d.font=FONT_SIZE + "px "+ CUR_FONTNAME;
        ctx2d.textBaseline = "top";

        const TITLE_MSG_SEC=3;
        var showMsgNum=Math.floor(t/TITLE_MSG_SEC)%TITLE_TEXT.length;
        var titleTextPosLeft=50;
        
        for(var i = 0;i < 3;i++){
            var titleTempSum=0;
            if(i>=1) titleTempSum+=TITLE_TEXT[showMsgNum][0].length;
            if(i>=2) titleTempSum+=TITLE_TEXT[showMsgNum][1].length;
//            var drawTxt=TITLE_TEXT[showMsgNum][i].substr(0,Math.max(0,Math.floor(t*10)%(TITLE_MSG_SEC*10)-titleTempSum));
            var drawTxt=TITLE_TEXT[showMsgNum][i].substr(0,Math.max(0,Math.floor(t*10)-titleTempSum));
            inputChar=String.fromCharCode(65+Math.floor(Math.random()*25));
            if(0<Math.max(0,Math.floor(t*10)-titleTempSum) && Math.max(0,Math.floor(t*10)-titleTempSum)<TITLE_TEXT[showMsgNum][i].length) drawTxt+=inputChar;
//            ctx2d.fillText(drawTxt,titleTextPosLeft,(i+0.1)*Math.min(document.getElementById("myCanvas").height,600)/3.1);

            ctx2d.fillStyle="rgba(165,167,154,"+ Math.min(0.3)+")";//underline
            ctx2d.fillRect(titleTextPosLeft,(-0.2+i+1)*FONT_SIZE,ctx2d.measureText(drawTxt).width,30);

            ctx2d.fillStyle="rgba(201,135,100,1)"; //text
            ctx2d.fillStyle="rgba(217,162,35,1)"; //text
            ctx2d.fillText(drawTxt,titleTextPosLeft,(0.1+i)*FONT_SIZE);
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