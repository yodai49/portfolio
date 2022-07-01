var animationmax = 1; //nextmodeにうつるタイミング
var animationcnt=0; //アニメーションのカウンター 1でスタート -1処理前
var lastPerformance=performance.now(); //パフォーマンス
var t = 0; //開いてからの経過時間 ミリ秒
var INIT_TIME;
const TITLE_TEXT="I'm here+to+innovate";
const TITLE_BRPOS=[9,11];
const DETAIL_TEXT="Hello, this page is a portfolio of toruthi. I am developer, composer, and typist.";
const TITLE_MAX_LENGTH = 7;
const MONOS_FONTNAME="Red Hat Mono, monospace";
const SS_FONTNAME="Spartan, sans-serif";
const CUR_FONTNAME="Poiret One, cursive";
var canvasWidth,canvasHeight;
var mouseX=0,mouseY=0,prevMouseX=0,prevMouseY=0;
var bars=[];
var nextPage="";
var nextPageLP=0;
var corCoef=1;
// ページの読み込みを待つ

document.getElementById("prev_buttons1").addEventListener('click',function(event){
    nextPage=event.target.title;
    localStorage.setItem("nextPage",nextPage);
    nextPageLP=performance.now();
    document.getElementById("fadeinCanvas2").style.zIndex=999;
    event.preventDefault()
})
document.getElementById("detail_exp").innerHTML=DETAIL_TEXT;
window.addEventListener('load', function(){ ///ロードイベント登録
    INIT_TIME=performance.now();
    init();
});

window.addEventListener("keypress",function(e){//キー入力
    if(e.keyCode==8){
        if(this.document.getElementById("greetingText").innerHTML.length > 18){
            this.document.getElementById("greetingText").innerHTML= this.document.getElementById("greetingText").innerHTML.substr(0, this.document.getElementById("greetingText").innerHTML.length-1);
        }
    } else if((" .,*".indexOf(e.key) != -1 || (e.keyCode>=65 && e.keyCode<= 90)||(e.keyCode>=97 && e.keyCode<= 122)) && this.document.getElementById("greetingText").clientWidth< this.document.getElementById("greetingBack").clientWidth){
        this.document.getElementById("greetingText").innerHTML+=e.key;
    }
})

window.addEventListener('mousemove', function (e) { //マウスが動いた時
    var rect = e.target.getBoundingClientRect();
	mouseX = e.clientX;
	mouseY = e.clientY;
}, false);
function generateBars(){
    bars.push({
        x:Math.random()*canvasWidth,
        y:Math.random()*canvasHeight,
        vx:(Math.random()-0.5)*6,
        vy:(Math.random()-0.5)*6,
        rt:(Math.random()-0.5)*1,
        vrt:(Math.random()-0.5)*0.1,
        size:(Math.random()*0.1+0.12)*canvasWidth,
        t:0,
        life:Math.random()*400+100});
}
function affectWindToBars(){
    for (i = 0;i<bars.length;i++){
        var scale=1/(Math.pow(bars[i].x-mouseX,2)+Math.pow(bars[i].y-mouseY,2)+1);
        bars[i].vx+=scale*(bars[i].x-mouseX)*(mouseX-prevMouseX);
        bars[i].vy+=scale*(bars[i].y-mouseY)*(mouseY-prevMouseY);
        bars[i].vx=Math.min(3,bars[i].vx);
        bars[i].vy=Math.min(3,bars[i].vy);
    }
}
function processCollisionOfBars(){
    for (i = 0;i < bars.length;i++){
        posx1=bars[i].x+bars[i].size/2*Math.cos(bars[i].rt);
        posx2=bars[i].x-bars[i].size/2*Math.cos(bars[i].rt);
        posy1=bars[i].y+bars[i].size/2*Math.sin(bars[i].rt);
        posy2=bars[i].y-bars[i].size/2*Math.sin(bars[i].rt);
        if(posx1<0 || posx2 < 0) bars[i].vx=Math.abs(bars[i].vx);
        if(posx1>canvasWidth || posx2 > canvasWidth) bars[i].vx=-Math.abs(bars[i].vx);
        if(posy1<0 || posy2 < 0) bars[i].vy=Math.abs(bars[i].vy);
        if(posy1>canvasWidth || posy2 > canvasHeight) bars[i].vy=-Math.abs(bars[i].vy);
    }
}
function moveBars(){
    for (i = 0;i < bars.length;i++){
        bars[i].t+=corCoef;
        bars[i].x+=bars[i].vx*corCoef;
        bars[i].y+=bars[i].vy*corCoef;
        bars[i].rt+=bars[i].vrt*corCoef;
        if(bars[i].t>=bars[i].life) bars.splice(i,1);
    }
}
function getTrans(t,life){
    return (Math.min(1,Math.min((t-30)/30,-(t-life)/30)))*0.5;
}
function drawBars(){
    ctx2d.lineWidth=1;
    for (i = 0;i < bars.length;i++){
        transOfBar=getTrans(bars[i].t,bars[i].life)
        ctx2d.strokeStyle="rgba(255,255,255," + transOfBar + ")";
        ctx2d.beginPath();
        ctx2d.moveTo(bars[i].x+bars[i].size/2*Math.cos(bars[i].rt),bars[i].y+bars[i].size/2*Math.sin(bars[i].rt));
        ctx2d.lineTo(bars[i].x-bars[i].size/2*Math.cos(bars[i].rt),bars[i].y-bars[i].size/2*Math.sin(bars[i].rt));
        ctx2d.stroke();
    }
}
function processBars(){
    affectWindToBars();
    processCollisionOfBars();
    moveBars();
    drawBars();
    if(bars.length<10) generateBars();
}
function init() {
    //ローディング処理////////////////////////////////////////
    canvasWidth=document.getElementById("myCanvas").width;
    canvasHeight=document.getElementById("myCanvas").height;

    //2Dの処理
    ctx2d=document.getElementById("myCanvas").getContext("2d");
    fadein2d=document.getElementById("fadeinCanvas").getContext("2d");
    fadein2d2=document.getElementById("fadeinCanvas2").getContext("2d");
    tick();

    function tick() {
        var inputChar;
        corCoef=(performance.now() -(t*1000+INIT_TIME))/30;
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
        fadein2d2.clearRect(0,0,fadein2d.width,fadein2d.height);
        
        processBars();

        if(nextPage!=""){ //遷移時
            let t2=performance.now()-nextPageLP;
            fadein2d2.fillStyle="rgba(0,0,0," +(t2/1000)+")";
            fadein2d2.fillRect(0,0,canvasWidth*(t2/2000),canvasHeight);
            if(t2 > 1000) {
                nextPage=localStorage.getItem("nextPage");
                nextPageLP=-1;
                if(nextPage != undefined) window.location.assign(localStorage.getItem("nextPage"));
            }
        }
        ctx2d.lineWidth=2;
        ctx2d.fillStyle="rgba(59,63,60,0.2)";
        ctx2d.fillRect(0,0,canvasWidth,canvasHeight);
        ctx2d.fillStyle="rgba(10,16,13,0.4)";
        var grad=ctx2d.createLinearGradient(0,0,canvasWidth*0.2,0);
        grad.addColorStop(0.0,"rgba(10,16,13,0.7)");
        grad.addColorStop(0.6,"rgba(10,16,13,0.4)");
        grad.addColorStop(1.0,"rgba(10,16,13,0.0)");
        ctx2d.fillStyle=grad;
        ctx2d.fillRect(0,0,canvasWidth*0.2,canvasHeight);

        var grad2=ctx2d.createLinearGradient(canvasWidth*0.8,0,canvasWidth,0);
        grad2.addColorStop(1.0,"rgba(10,16,13,0.7)");
        grad2.addColorStop(0.4,"rgba(10,16,13,0.4)");
        grad2.addColorStop(0.0,"rgba(10,16,13,0.0)");
        ctx2d.fillStyle=grad2;

        ctx2d.fillRect(canvasWidth*0.8,0,canvasWidth*0.2,canvasHeight);

        const TITLE_MSG_SEC=3;
        var showMsgNum=Math.floor(t/TITLE_MSG_SEC)%TITLE_TEXT.length;

        var drawTxt=TITLE_TEXT[0][2];

        var rectSize=Math.min(document.getElementById("myCanvas").width*0.7,document.getElementById("myCanvas").height-180);
        
        if(t<3){
            drawTxt=TITLE_TEXT.substr(0,Math.max(0,Math.floor(t*10)-0));
            drawTxt=drawTxt.replace("+","<br>").replace("+","<br>");
            document.getElementById("greetingText").innerHTML=drawTxt;    
        }

        //Mouse Cursor
        prevMouseX=(2*prevMouseX+mouseX)/3;
        prevMouseY=(2*prevMouseY+mouseY)/3;
        document.getElementById("typingCursor").style.opacity=Math.sin(t*10)*0.5+0.5;
        if(!(navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/i))){ //if agent is PC 
            ctx2d.strokeStyle="rgba(225,220,200,"+(0.4+0.3*Math.sin(t*10))+")";
            ctx2d.fillStyle="rgba(0,0,0,0.2)";
            ctx2d.beginPath();
            ctx2d.arc(prevMouseX,prevMouseY,30,0,Math.PI*2);
            ctx2d.stroke()
            ctx2d.fill();
        }
        if(t<1) this.document.getElementById("loading").style.opacity=1-t;
        fadein2d.fillStyle="rgba(0,0,0,"+ Math.max(0,1-t)+")";
        fadein2d.fillRect(0,0,canvasWidth,canvasHeight);
        if(t>1 && nextPage=="") document.getElementById("fadeinCanvas").style.zIndex=-1,document.getElementById("fadeinCanvas2").style.zIndex=-1,document.getElementById("loading").style.zIndex=-1;
        document.getElementById("dammy-fadein").style.display="none";

        if(nextPageLP!=-1)requestAnimationFrame(tick);
    }
}