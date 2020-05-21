buttonShow("speech");
buttonColB("speech");
buttonShow("burst");
buttonColB("burst");
buttonHide("speech_disabled");
buttonColG("speech_disabled");
buttonHide("burst_disabled");
buttonColG("burst_disabled");

document.getElementById("delay_time").value = "1";
// document.getElementById("relative_level").value = "0";

var sound1 = initSoundWithBtnsOnOff ("./sounds/burst_44k.wav", "burst", "burst_disabled");
var sound2 = initSoundWithBtnsOnOff ("./sounds/speech_44k.wav", "speech", "speech_disabled");

var audioCtx = Howler.ctx;
var conv1 = audioCtx.createConvolver();
var conv2 = audioCtx.createConvolver();
var delay_ref = audioCtx.createDelay();
var gain = audioCtx.createGain();
var gain_dir = audioCtx.createGain();
var gain_ref = audioCtx.createGain();
conv1.normalize = false;
conv2.normalize = false;

loadAudioBufferFromFile(audioCtx, "./sounds/330L.wav").then((value) => {
  var HRIR1 = value.getChannelData(0);
  loadAudioBufferFromFile(audioCtx, "./sounds/330R.wav").then((value) => {
    var HRIR2 = value.getChannelData(0);
    var temp_buffer = audioCtx.createBuffer(2, HRIR1.length, audioCtx.sampleRate);
    temp_buffer.getChannelData(0).set(HRIR1);
    temp_buffer.getChannelData(1).set(HRIR2);
    conv1.buffer = temp_buffer;
    loadAudioBufferFromFile(audioCtx, "./sounds/30L.wav").then((value) => {
      var HRIR1 = value.getChannelData(0);
      loadAudioBufferFromFile(audioCtx, "./sounds/30R.wav").then((value) => {
        var HRIR2 = value.getChannelData(0);
        var temp_buffer = audioCtx.createBuffer(2, HRIR1.length, audioCtx.sampleRate);
        temp_buffer.getChannelData(0).set(HRIR1);
        temp_buffer.getChannelData(1).set(HRIR2);
        conv2.buffer = temp_buffer;
      });
    });
  });
});

const btn1 = document.getElementById("burst");
btn1.addEventListener("click", ()=>{
  buttonHide("burst");
  buttonShow("burst_disabled");
  Howler.masterGain.disconnect();
  Howler.masterGain.connect(conv1).connect(gain_dir).connect(gain).connect(audioCtx.destination);
  sound1.play();
  var play_count = 0;
  sound1.once("end", function (){
    Howler.masterGain.connect(conv2).connect(delay_ref).connect(gain_ref).connect(gain).connect(audioCtx.destination);
    sound1.play();
  });
  sound1.on("end", function (){
    play_count += 1;
    if (play_count == 2){
      buttonShow("burst");
      buttonHide("burst_disabled");
    }
  });
});

const btn2 = document.getElementById("speech");
  btn2.addEventListener("click", ()=>{
  buttonHide("speech");
  buttonShow("speech_disabled");
  Howler.masterGain.disconnect();
  Howler.masterGain.connect(conv1).connect(gain_dir).connect(gain).connect(audioCtx.destination);
  sound2.play();
  var play_count = 0;
  sound2.once("end", function (){
    Howler.masterGain.connect(conv2).connect(delay_ref).connect(gain_ref).connect(gain).connect(audioCtx.destination);
    sound2.play();
  });
  sound2.on("end", function (){
    play_count += 1;
    if (play_count == 2){
      buttonShow("speech");
      buttonHide("speech_disabled");
    }
  });
});

const range1 = document.getElementById("masterVolume");
gain.gain.value = range1.value / 100;
range1.addEventListener('input', (event) => {
  gain.gain.value = range1.value / 100;
});

const tbox1 = document.getElementById("delay_time");
const range2 = document.getElementById("delay_time_range");
delay_ref.delayTime.value = tbox1.value / 1000;
tbox1.addEventListener('input', (event) => {
  if($.isNumeric(document.getElementById("delay_time").value)){
    limitTextValue("delay_time",1, 200);
    range2.value = tbox1.value;
    delay_ref.delayTime.value = tbox1.value / 1000;
  }
});
range2.addEventListener('input', (event) => {
  tbox1.value = range2.value / 1;
  delay_ref.delayTime.value = tbox1.value / 1000;
});

// function setGainLR(value_func) {
//   if (value_func > 0){
//     gain_dir.gain.value = Math.pow(10, -1 * value_func / 20);
//     gain_ref.gain.value = 1;
//   }
//   else {
//     gain_dir.gain.value = 1;
//     gain_ref.gain.value = Math.pow(10, value_func / 20);
//   }
// }

// const tbox2 = document.getElementById("relative_level");
// const range4 = document.getElementById("relative_level_range1");
// setGainLR(tbox2.value);
// tbox2.addEventListener('input', (event) => {
//   if($.isNumeric(document.getElementById("relative_level").value)){
//     limitTextValue("relative_level",-40, 40);
//     range4.value = tbox2.value ;
//     setGainLR(tbox2.value);
//   }
// });
// range4.addEventListener('input', (event) => {
//   tbox2.value = range4.value;
//   setGainLR(tbox2.value);
// });
