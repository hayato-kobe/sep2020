buttonShow("speech_anechoic");
buttonColB("speech_anechoic");
buttonShow("music_anechoic");
buttonColB("music_anechoic");
buttonShow("recBtn");
buttonColB("recBtn");
buttonHide("speech_anechoic_disabled");
buttonColG("speech_anechoic_disabled");
buttonHide("music_anechoic_disabled");
buttonColG("music_anechoic_disabled");
buttonHide("stopBtn");
buttonColB("stopBtn");

var sound1 = initSoundWithBtnsOnOff ("./sounds/speech_44k.wav", "speech_anechoic", "speech_anechoic_disabled");
var sound2 = initSoundWithBtnsOnOff ("./sounds/music_44k.wav", "music_anechoic", "music_anechoic_disabled");

var audioCtx = Howler.ctx;
var conv = audioCtx.createConvolver();

const chkB = document.getElementById("on-off");
chkB.addEventListener('change', (event) => {
	if(event.target.checked==false || conv.buffer == null){
		Howler.masterGain.disconnect();
		Howler.masterGain.connect(audioCtx.destination);
		}
	else {
		Howler.masterGain.disconnect();
		Howler.masterGain.connect(conv).connect(audioCtx.destination);
	}
});

const btn1 = document.getElementById("speech_anechoic");
btn1.addEventListener("click", ()=>{
  buttonHide("speech_anechoic");
  buttonShow("speech_anechoic_disabled");
  sound1.play();
});

const btn2 = document.getElementById("music_anechoic");
  btn2.addEventListener("click", ()=>{
  buttonHide("music_anechoic");
  buttonShow("music_anechoic_disabled");
  sound2.play();
});

window.AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx2 = new AudioContext();
var processor = null;
var num = 0;
var duration = 0.0;
var length = 0;
var sampleRate = 0;
var floatData = null;
var source = null;
var input = null;
var chartLength = 4096;
var dat = null;
var dat2 = null;
var ctx = document.getElementById("myLineChart");
var myLineChart = null;
var audioBuffer = null;
var revT = -1.0;

function handleSuccess( stream ){
  //source = audioCtx2.createBufferSource();
  input = audioCtx2.createMediaStreamSource( stream );
  processor = audioCtx2.createScriptProcessor( 1024, 1, 1 );
  input.connect( processor );
  processor.onaudioprocess = function( e ){
    //. 音声データ
    var inputdata = e.inputBuffer.getChannelData(0);
    if( !num ){
      num = e.inputBuffer.numberOfChannels;
      floatData = new Array(num);
      for( var i = 0; i < num; i ++ ){
        floatData[i] = [];
      }
      sampleRate = e.inputBuffer.sampleRate;
    }
    var float32Array = e.inputBuffer.getChannelData( 0 );
    if( availableData( float32Array ) ){
      duration += e.inputBuffer.duration;
      length += e.inputBuffer.length;
      for( var i = 0; i < num ; i ++ ){
        float32Array = e.inputBuffer.getChannelData( i );
        Array.prototype.push.apply( floatData[i], float32Array );
      }
    }
  };
  processor.connect( audioCtx2.destination );
}

function startRec(){
  buttonHide("recBtn");
  buttonShow("stopBtn");
  navigator.mediaDevices.getUserMedia( { audio: true } ).then( handleSuccess );
}

function stopRec(){
  buttonShow("recBtn");
  buttonHide("stopBtn");

  if (processor){
    trimAudioData();
    drawChart();
    revT = calRevT(dat2, sampeRate);
    var str = "インパルス応答から算出した残響時間：" + Math.round(revT * 100) / 100 + "秒";
    document.getElementById("revT").innerText = str;

    processor.disconnect();
    processor.onaudioprocess = null;
    processor = null;
    audioBuffer = audioCtx2.createBuffer( 1, length, sampleRate );
    audioBuffer.getChannelData( 0 ).set( dat2 );

    conv.buffer = audioBuffer; //. convolverにインパルス応答をセット

    source = audioCtx2.createBufferSource();
    source.buffer = audioBuffer;
    source.loop = false;
    source.loopStart = 0;
    source.loopEnd = audioBuffer.duration;
    source.playbackRate.value = 1.0;
    source.connect( audioCtx2.destination );
    source.start( 0 );
    source.onended = function( event ){
      source.onended = null;
      document.onkeydown = null;
      num = 0;
      duration = 0.0;
      length = 0;
      source.stop( 0 );
    };
  }
}
