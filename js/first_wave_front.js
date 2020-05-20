buttonShow("speech_anechoic");
buttonColB("speech_anechoic");
buttonShow("music_anechoic");
buttonColB("music_anechoic");
buttonHide("speech_anechoic_disabled");
buttonColG("speech_anechoic_disabled");
buttonHide("music_anechoic_disabled");
buttonColG("music_anechoic_disabled");

document.getElementById("delay_time").value = "0";
document.getElementById("relative_level").value = "0";

var sound1 = initSoundWithBtnsOnOff ("./sounds/speech_44k.wav", "speech_anechoic", "speech_anechoic_disabled");
var sound2 = initSoundWithBtnsOnOff ("./sounds/music_44k.wav", "music_anechoic", "music_anechoic_disabled");

var audioCtx = Howler.ctx;
var delayR = audioCtx.createDelay();
var conv_L = audioCtx.createConvolver();
var conv_R = audioCtx.createConvolver();
conv_L.normalize = false;
conv_R.normalize = false;

var gain = audioCtx.createGain();
var gainL = audioCtx.createGain();
var gainR = audioCtx.createGain();
Howler.masterGain.disconnect();
Howler.masterGain.connect(conv_L).connect(gainL).connect(gain).connect(audioCtx.destination);
Howler.masterGain.connect(conv_R).connect(gainR).connect(delayR).connect(gain).connect(audioCtx.destination);

loadAudioBufferFromFile(audioCtx, "./sounds/315L.wav").then((value) => {
  var HRIR1 = value.getChannelData(0);
  loadAudioBufferFromFile(audioCtx, "./sounds/315R.wav").then((value) => {
    var HRIR2 = value.getChannelData(0);
    var temp_buffer = audioCtx.createBuffer(2, HRIR1.length, audioCtx.sampleRate);
    temp_buffer.getChannelData(0).set(HRIR1);
    temp_buffer.getChannelData(1).set(HRIR2);
    conv_L.buffer = temp_buffer;
  });
});

loadAudioBufferFromFile(audioCtx, "./sounds/45L.wav").then((value) => {
  var HRIR1 = value.getChannelData(0);
  loadAudioBufferFromFile(audioCtx, "./sounds/45R.wav").then((value) => {
    var HRIR2 = value.getChannelData(0);
    var temp_buffer = audioCtx.createBuffer(2, HRIR1.length, audioCtx.sampleRate);
    temp_buffer.getChannelData(0).set(HRIR1);
    temp_buffer.getChannelData(1).set(HRIR2);
    conv_R.buffer = temp_buffer;
  });
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

const tbox1 = document.getElementById("delay_time");
const range2 = document.getElementById("delay_time_range1");
const range3 = document.getElementById("delay_time_range2");
delayR.delayTime.value = tbox1.value / 1000;
tbox1.addEventListener('input', (event) => {
  if($.isNumeric(document.getElementById("delay_time").value)){
    limitTextValue("delay_time",0, 200);
    range2.value = tbox1.value - (Math.floor(tbox1.value) - 1);
    range3.value = Math.floor(tbox1.value) - 1;
    delayR.delayTime.value = tbox1.value / 1000;
  }
});
range2.addEventListener('input', (event) => {
  tbox1.value = range2.value / 1 + range3.value / 1;
  delayR.delayTime.value = tbox1.value / 1000;
});
range3.addEventListener('input', (event) => {
  tbox1.value = range2.value / 1 + range3.value / 1;
  delayR.delayTime.value = tbox1.value / 1000;
});

function setGainLR(value_func) {
  if (value_func > 0){
    gainL.gain.value = Math.pow(10, -1 * value_func / 20);
    gainR.gain.value = 1;
  }
  else {
    gainL.gain.value = 1;
    gainR.gain.value = Math.pow(10, value_func / 20);
  }
}

const tbox2 = document.getElementById("relative_level");
const range4 = document.getElementById("relative_level_range1");
setGainLR(tbox2.value);
tbox2.addEventListener('input', (event) => {
  if($.isNumeric(document.getElementById("relative_level").value)){
    limitTextValue("relative_level",-40, 40);
    range4.value = tbox2.value ;
    setGainLR(tbox2.value);
  }
});
range4.addEventListener('input', (event) => {
  tbox2.value = range4.value;
  setGainLR(tbox2.value);
});
