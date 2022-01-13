var animationmax = 1; //nextmodeにうつるタイミング
var animationcnt=0; //アニメーションのカウンター 1でスタート -1処理前
var lastPerformance=performance.now(); //パフォーマンス
var t = 0; //開いてからの経過時間 ミリ秒
const INIT_TIME=performance.now();
const TITLE_TEXT=[["WHAT'S","YOUR", "FAVORITE?"]]
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
    for(var i = 0;i < 10;i++){
        let tempArg=Math.random()*Math.PI*2;
        balls[i]["size"]=Math.random()*50+20;
        balls[i]["velx"]=Math.sin(tempArg)*balls[i]["size"]/35;
        balls[i]["vely"]=Math.cos(tempArg)*balls[i]["size"]/35;
        balls[i]["posx"]=balls[i]["size"];
        balls[i]["posy"]=balls[i]["size"];
    }

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

        ctx2d.fillStyle="rgba(228,220,209,0.3)";
        ctx2d.fillRect(0,0,canvasWidth/2,canvasHeight);
        ctx2d.fillStyle="rgba(181,135,100,0.3)";
        ctx2d.fillRect(canvasWidth/2,0,canvasWidth/2,canvasHeight);

        /*for(let i = 0;i < balls.length;i++){
            balls[i].posx+=balls[i].velx;
            balls[i].posy+=balls[i].vely;
            if(balls[i].posx -balls[i].size< 0)balls[i].velx=Math.abs(balls[i].velx);
            if(balls[i].posx + balls[i].size>canvasWidth) balls[i].velx=-Math.abs(balls[i].velx);
            if(balls[i].posy -balls[i].size< 0)balls[i].vely=Math.abs(balls[i].vely);
            if(balls[i].posy + balls[i].size>canvasHeight) balls[i].vely=-Math.abs(balls[i].vely);
            ctx2d.fillStyle="rgba(50,30,0,0)";
            ctx2d.fillRect(balls[i].posx-balls[i].size/2,balls[i].posy-balls[i].size/2,balls[i].size,balls[i].size);
            ctx2d.beginPath();
            ctx2d.arc(balls[i].posx,balls[i].posy,balls[i].size,0,Math.PI*2);
            ctx2d.fill();
            for(var j = i+1;j<balls.length;j++){
                ctx2d.strokeStyle="rgba(200,200,200,1)";
                ctx2d.beginPath();
                ctx2d.lineTo(balls[i].posx,balls[i].posy)
                ctx2d.lineTo(balls[j].posx,balls[j].posy)
                ctx2d.stroke();    
            }
        }*/

        var FONT_SIZE=Math.min(document.getElementById("myCanvas").width/TITLE_MAX_LENGTH,document.getElementById("myCanvas").height/3.3);
        ctx2d.font=FONT_SIZE + "px "+ CUR_FONTNAME;
        ctx2d.textBaseline = "top";

        ctx2d.fillStyle="rgba(201,135,100,1)";
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
            ctx2d.fillText(drawTxt,titleTextPosLeft,(0.1+i)*FONT_SIZE);
        }
//Mouse Cursor
        prevMouseX=(2*prevMouseX+mouseX)/3;
        prevMouseY=(2*prevMouseY+mouseY)/3;
        /*
        ctx2d.fillStyle="rgba(0,0,0,"+(0.0+0.0* Math.sin(t*10))+")";
        ctx2d.beginPath();
        ctx2d.arc(mouseX,mouseY,30,0,Math.PI*2);
        ctx2d.fill();
        ctx2d.fillStyle="rgba(255,0,0,"+(0.4+0.3* Math.sin(t*10))+")";
        ctx2d.beginPath();
        ctx2d.arc(prevMouseX,prevMouseY,30,0,Math.PI*2);
        ctx2d.fill();*/

        fadein2d.fillStyle="rgba(0,0,0,"+ Math.max(0,1-t)+")";
        fadein2d.fillRect(0,0,canvasWidth,canvasHeight);
        if(t>1) document.getElementById("fadeinCanvas").style.zIndex=-1;

        requestAnimationFrame(tick);
    }
}