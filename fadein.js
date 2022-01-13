var animationmax = 1; //nextmodeにうつるタイミング
var INIT_TIME_ORD=performance.now(); //パフォーマンス
var t = 0; //開いてからの経過時間 ミリ秒
var canvasWidth,canavasHeight;

window.addEventListener('load', init); //ロードイベント登録
window.addEventListener('DOMContentLoaded', function(){ ///キー入力イベント登録
});

function init() {
    //ローディング処理////////////////////////////////////////

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
        fadein2d.fillStyle="rgba(0,0,0,"+ Math.max(0,1-(t-0.5)/2)+")";
        fadein2d.fillRect(0,0,canvasWidth,canvasHeight);
        if(t>2) document.getElementById("fadeinCanvas").style.zIndex=-1;

        requestAnimationFrame(tick);
    }
}