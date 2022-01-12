var animationmax = 1; //nextmodeにうつるタイミング
var animationcnt=0; //アニメーションのカウンター 1でスタート -1処理前
var lastPerformance=performance.now(); //パフォーマンス
var t = 0; //開いてからの経過時間 ミリ秒
const INIT_TIME=performance.now();
const TITLE_TEXT=[["WELCOME","TO", "MY PAGE"]]
const TITLE_MAX_LENGTH = 7;
const MONOS_FONTNAME="Red Hat Mono, monospace";
const SS_FONTNAME="Spartan, sans-serif";
var inputChar;

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

function init() {
    //ローディング処理////////////////////////////////////////

    //2Dの処理
    ctx2d=document.getElementById("myCanvas").getContext("2d");

    tick();

    function tick() {
        t=(performance.now()-INIT_TIME)/1000;//システム系の処理
        //リセット処理
        document.getElementById("myCanvas").width=document.getElementById("wrapper").scrollWidth;
        document.getElementById("myCanvas").height=document.getElementById("wrapper").scrollHeight;
        ctx2d.clearRect(0,0,ctx2d.width,ctx2d.height);

        var FONT_SIZE=Math.min(document.getElementById("myCanvas").width/TITLE_MAX_LENGTH,document.getElementById("myCanvas").height/3.3);
        ctx2d.font=FONT_SIZE + "px "+ SS_FONTNAME;
        ctx2d.textBaseline = "top";

        ctx2d.fillStyle="rgba(181,135,100,1)";
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
            ctx2d.fillText(drawTxt,titleTextPosLeft,(i+0.1)*document.getElementById("myCanvas").height/3.1);
        }

        requestAnimationFrame(tick);
    }
}