var sound1 = initSoundWithBtnsOnOff ("./sounds/speech_44k.wav", "speech_anechoic", "speech_anechoic_disabled");
var sound2 = initSoundWithBtnsOnOff ("./sounds/music_44k.wav", "music_anechoic", "music_anechoic_disabled");

var audioCtx = Howler.ctx;
var conv = audioCtx.createConvolver();
var gain = audioCtx.createGain();
Howler.masterGain.disconnect();
Howler.masterGain.connect(gain).connect(audioCtx.destination);
var input = null;
var processor = null;
var recorded_data = [];
var chart_data = [];
var revT = -1.0;
var irBuffer = null;
var chart_ctx = document.getElementById("myChart");
var chartLength = 4096;
var rec_cue = false;

const chkB = document.getElementById("on-off");
chkB.addEventListener('change', (event) => {
	if(event.target.checked==false || conv.buffer == null){
		Howler.masterGain.disconnect();
		Howler.masterGain.connect(gain).connect(audioCtx.destination);
		}
	else {
		Howler.masterGain.disconnect();
		Howler.masterGain.connect(conv).connect(gain).connect(audioCtx.destination);
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

const range1 = document.getElementById("masterVolume");
gain.gain.value = range1.value / 100;
range1.addEventListener('input', (event) => {
  gain.gain.value = range1.value / 100;
});

function handleSuccess( stream ){
  input = audioCtx.createMediaStreamSource( stream );
  processor = audioCtx.createScriptProcessor( 1024, 1, 1 );
  input.connect( processor );
  processor.onaudioprocess = function( e ){
		if (rec_cue == true){
			Array.prototype.push.apply( recorded_data, e.inputBuffer.getChannelData(0) );
		}
	};
	processor.connect(audioCtx.destination);
}

function startRec(){
  buttonHide("recBtn");
  buttonShow("stopBtn");
	recorded_data = [];
	rec_cue = true;
}

function stopRec(){
  buttonShow("recBtn");
  buttonHide("stopBtn");
	rec_cue = false;

  if (processor){
		recorded_data = trimAudioData2 (recorded_data, audioCtx.sampleRate, audioCtx.sampleRate * 2);
		irBuffer = audioCtx.createBuffer(1, recorded_data.length, audioCtx.sampleRate, );
		irBuffer.getChannelData( 0 ).set( recorded_data );
		conv.buffer = irBuffer;
		chart_data = resampleDataForChart (recorded_data, audioCtx.sampleRate, chartLength);
		drawChart2 (chart_ctx, "録音した波形", 2, chart_data);
		revT = calRevT(recorded_data, audioCtx.sampleRate);
		var str = "インパルス応答から算出した残響時間：" + Math.round(revT * 100) / 100 + "秒";
		document.getElementById("revT").innerText = str;
  }
}

//

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

navigator.mediaDevices.getUserMedia( { audio: true } ).then( handleSuccess );
