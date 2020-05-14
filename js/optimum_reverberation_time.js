buttonShow("speech_anechoic");
buttonColB("speech_anechoic");
buttonShow("music_anechoic");
buttonColB("music_anechoic");
buttonHide("speech_anechoic_disabled");
buttonColG("speech_anechoic_disabled");
buttonHide("music_anechoic_disabled");
buttonColG("music_anechoic_disabled");

document.getElementById("revTime").value = "1.0";
document.getElementById("revRatio").value = "0.0";

var chart_ctx = document.getElementById("myChart");

var sound1 = initSoundWithBtnsOnOff ("./sounds/speech_44k.wav", "speech_anechoic", "speech_anechoic_disabled");
var sound2 = initSoundWithBtnsOnOff ("./sounds/music_44k.wav", "music_anechoic", "music_anechoic_disabled");

var audioCtx = Howler.ctx;
var conv = audioCtx.createConvolver();

var ir_org;
var ir;
var source_ir = audioCtx.createBufferSource();

var request = new XMLHttpRequest();
request.open('GET', "./sounds/wn_6s_44.wav", true);
request.responseType = 'arraybuffer';
request.send();
request.onload = function () {
  var res = request.response;
  audioCtx.decodeAudioData(res, function (buf) {
    source_ir.buffer = buf;
    ir_org = new Array(source_ir.buffer.length);
    for (var i = 0; i < source_ir.buffer.length; i ++){
      ir_org[i] = source_ir.buffer.getChannelData(0)[i];
    }
    ir = setRevT(ir_org, document.getElementById("revTime").value, audioCtx.sampleRate);
    ir = setRevR(ir, document.getElementById("revRatio").value);
    source_ir.buffer.getChannelData(0).set(ir);
    conv.buffer = source_ir.buffer;
    ir_for_chart = resampleDataForChart (ir, audioCtx.sampleRate, 4096)
    drawChart2 (chart_ctx, "インパルス応答", 6, ir_for_chart)
    console.log(ir_org[100]);
  });
}

const tbox1 = document.getElementById("revTime");
tbox1.addEventListener('input', (event) => {
  if($.isNumeric(document.getElementById("revTime").value)){
    limitTextValue("revTime",0.1, 6);
    var t = document.getElementById("revTime").value;
    var r = document.getElementById("revRatio").value;
    if (ir_org != null) {
      console.log(ir_org[100]);
      ir = setRevT(ir_org, t, audioCtx.sampleRate);
      ir = setRevR(ir, r);
      source_ir.buffer.getChannelData(0).set(ir);
      conv.buffer = source_ir.buffer;
      ir_for_chart = resampleDataForChart (ir, audioCtx.sampleRate, 4096)
      drawChart2 (chart_ctx, "インパルス応答", 6, ir_for_chart)
    }
  }
});

const tbox2 = document.getElementById("revRatio");
tbox2.addEventListener('input', (event) => {
  if($.isNumeric(document.getElementById("revRatio").value)){
    limitTextValue("revRatio",-30, 30)
    var t = document.getElementById("revTime").value;
    var r = document.getElementById("revRatio").value;
    if (ir_org != null) {
      console.log(ir_org[100]);
      ir = setRevT(ir_org, t, audioCtx.sampleRate);
      ir = setRevR(ir, r);
      source_ir.buffer.getChannelData(0).set(ir);
      conv.buffer = source_ir.buffer;
      ir_for_chart = resampleDataForChart (ir, audioCtx.sampleRate, 4096)
      drawChart2 (chart_ctx, "インパルス応答", 6, ir_for_chart)
    }
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
