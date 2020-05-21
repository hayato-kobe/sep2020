buttonShow("music_anechoic");
buttonColB("music_anechoic");
buttonHide("music_anechoic_disabled");
buttonColG("music_anechoic_disabled");

document.getElementById("ref1_delay").value = "7";
document.getElementById("ref2_delay").value = "18";
document.getElementById("ref3_delay").value = "35";
document.getElementById("ref4_delay").value = "46";
document.getElementById("ref1_spl").value = "-6";
document.getElementById("ref2_spl").value = "-6";
document.getElementById("ref3_spl").value = "-9";
document.getElementById("ref4_spl").value = "-9";

var sound2 = new Howl({
		src: ["./sounds/music2_44k.wav"],
		onloaderror: function() {
			console.log("load error");
		},
  });

var audioCtx = Howler.ctx;
var conv_direct = audioCtx.createConvolver();
var conv_ref1 = audioCtx.createConvolver();
var conv_ref2 = audioCtx.createConvolver();
var conv_ref3 = audioCtx.createConvolver();
var conv_ref4 = audioCtx.createConvolver();
var conv_ref5 = audioCtx.createConvolver();
var conv_ref6 = audioCtx.createConvolver();
var conv_ref7 = audioCtx.createConvolver();
var conv_ref8 = audioCtx.createConvolver();
var delay_ref1 = audioCtx.createDelay();
var delay_ref2 = audioCtx.createDelay();
var delay_ref3 = audioCtx.createDelay();
var delay_ref4 = audioCtx.createDelay();
var delay_ref5 = audioCtx.createDelay();
var delay_ref6 = audioCtx.createDelay();
var delay_ref7 = audioCtx.createDelay();
var delay_ref8 = audioCtx.createDelay();
var gain_ref1 = audioCtx.createGain();
var gain_ref2 = audioCtx.createGain();
var gain_ref3 = audioCtx.createGain();
var gain_ref4 = audioCtx.createGain();
var gain_ref5 = audioCtx.createGain();
var gain_ref6 = audioCtx.createGain();
var gain_ref7 = audioCtx.createGain();
var gain_ref8 = audioCtx.createGain();

conv_direct.normalize = false;
conv_ref1.normalize = false;
conv_ref2.normalize = false;
conv_ref3.normalize = false;
conv_ref4.normalize = false;
conv_ref5.normalize = false;
conv_ref6.normalize = false;
conv_ref7.normalize = false;
conv_ref8.normalize = false;

// Howler.masterGain.disconnect();
// Howler.masterGain.connect(conv_direct).connect(audioCtx.destination);
// Howler.masterGain.connect(conv_ref1).connect(delay_ref1).connect(gain_ref1).connect(audioCtx.destination);
// Howler.masterGain.connect(conv_ref2).connect(delay_ref2).connect(gain_ref2).connect(audioCtx.destination);
// Howler.masterGain.connect(conv_ref3).connect(delay_ref3).connect(gain_ref3).connect(audioCtx.destination);
// Howler.masterGain.connect(conv_ref4).connect(delay_ref4).connect(gain_ref4).connect(audioCtx.destination);
// Howler.masterGain.connect(conv_ref5).connect(delay_ref5).connect(gain_ref5).connect(audioCtx.destination);
// Howler.masterGain.connect(conv_ref6).connect(delay_ref6).connect(gain_ref6).connect(audioCtx.destination);
// Howler.masterGain.connect(conv_ref7).connect(delay_ref7).connect(gain_ref7).connect(audioCtx.destination);
// Howler.masterGain.connect(conv_ref8).connect(delay_ref8).connect(gain_ref8).connect(audioCtx.destination);

gain_ref5.gain.value = 0;
gain_ref6.gain.value = 0;
gain_ref7.gain.value = 0;
gain_ref8.gain.value = 0;

delay_ref5.delayTime.value = 97/1000;
delay_ref6.delayTime.value = 101/1000;
delay_ref7.delayTime.value = 105/1000;
delay_ref8.delayTime.value = 111/1000;

loadAudioBufferFromFile(audioCtx, "./sounds/0L.wav").then((value) => {
  var HRIR1 = value.getChannelData(0);
  loadAudioBufferFromFile(audioCtx, "./sounds/0R.wav").then((value) => {
    var HRIR2 = value.getChannelData(0);
    var temp_buffer = audioCtx.createBuffer(2, HRIR1.length, audioCtx.sampleRate);
    temp_buffer.getChannelData(0).set(HRIR1);
    temp_buffer.getChannelData(1).set(HRIR2);
    conv_direct.buffer = temp_buffer;
    loadAudioBufferFromFile(audioCtx, "./sounds/30L.wav").then((value) => {
      var HRIR1 = value.getChannelData(0);
      loadAudioBufferFromFile(audioCtx, "./sounds/30R.wav").then((value) => {
        var HRIR2 = value.getChannelData(0);
        var temp_buffer = audioCtx.createBuffer(2, HRIR1.length, audioCtx.sampleRate);
        temp_buffer.getChannelData(0).set(HRIR1);
        temp_buffer.getChannelData(1).set(HRIR2);
        conv_ref1.buffer = temp_buffer;
        loadAudioBufferFromFile(audioCtx, "./sounds/330L.wav").then((value) => {
          var HRIR1 = value.getChannelData(0);
          loadAudioBufferFromFile(audioCtx, "./sounds/330R.wav").then((value) => {
            var HRIR2 = value.getChannelData(0);
            var temp_buffer = audioCtx.createBuffer(2, HRIR1.length, audioCtx.sampleRate);
            temp_buffer.getChannelData(0).set(HRIR1);
            temp_buffer.getChannelData(1).set(HRIR2);
            conv_ref2.buffer = temp_buffer;
            loadAudioBufferFromFile(audioCtx, "./sounds/60L.wav").then((value) => {
              var HRIR1 = value.getChannelData(0);
              loadAudioBufferFromFile(audioCtx, "./sounds/60R.wav").then((value) => {
                var HRIR2 = value.getChannelData(0);
                var temp_buffer = audioCtx.createBuffer(2, HRIR1.length, audioCtx.sampleRate);
                temp_buffer.getChannelData(0).set(HRIR1);
                temp_buffer.getChannelData(1).set(HRIR2);
                conv_ref3.buffer = temp_buffer;
                loadAudioBufferFromFile(audioCtx, "./sounds/300L.wav").then((value) => {
                  var HRIR1 = value.getChannelData(0);
                  loadAudioBufferFromFile(audioCtx, "./sounds/300R.wav").then((value) => {
                    var HRIR2 = value.getChannelData(0);
                    var temp_buffer = audioCtx.createBuffer(2, HRIR1.length, audioCtx.sampleRate);
                    temp_buffer.getChannelData(0).set(HRIR1);
                    temp_buffer.getChannelData(1).set(HRIR2);
                    conv_ref4.buffer = temp_buffer;
										loadAudioBufferFromFile(audioCtx, "./sounds/165L.wav").then((value) => {
		                  var HRIR1 = value.getChannelData(0);
		                  loadAudioBufferFromFile(audioCtx, "./sounds/165R.wav").then((value) => {
		                    var HRIR2 = value.getChannelData(0);
		                    var temp_buffer = audioCtx.createBuffer(2, HRIR1.length, audioCtx.sampleRate);
		                    temp_buffer.getChannelData(0).set(HRIR1);
		                    temp_buffer.getChannelData(1).set(HRIR2);
		                    conv_ref5.buffer = temp_buffer;
												loadAudioBufferFromFile(audioCtx, "./sounds/195L.wav").then((value) => {
				                  var HRIR1 = value.getChannelData(0);
				                  loadAudioBufferFromFile(audioCtx, "./sounds/195R.wav").then((value) => {
				                    var HRIR2 = value.getChannelData(0);
				                    var temp_buffer = audioCtx.createBuffer(2, HRIR1.length, audioCtx.sampleRate);
				                    temp_buffer.getChannelData(0).set(HRIR1);
				                    temp_buffer.getChannelData(1).set(HRIR2);
				                    conv_ref6.buffer = temp_buffer;
														loadAudioBufferFromFile(audioCtx, "./sounds/70_135L.wav").then((value) => {
						                  var HRIR1 = value.getChannelData(0);
						                  loadAudioBufferFromFile(audioCtx, "./sounds/70_135R.wav").then((value) => {
						                    var HRIR2 = value.getChannelData(0);
						                    var temp_buffer = audioCtx.createBuffer(2, HRIR1.length, audioCtx.sampleRate);
						                    temp_buffer.getChannelData(0).set(HRIR1);
						                    temp_buffer.getChannelData(1).set(HRIR2);
						                    conv_ref7.buffer = temp_buffer;
																loadAudioBufferFromFile(audioCtx, "./sounds/70_225L.wav").then((value) => {
								                  var HRIR1 = value.getChannelData(0);
								                  loadAudioBufferFromFile(audioCtx, "./sounds/70_225R.wav").then((value) => {
								                    var HRIR2 = value.getChannelData(0);
								                    var temp_buffer = audioCtx.createBuffer(2, HRIR1.length, audioCtx.sampleRate);
								                    temp_buffer.getChannelData(0).set(HRIR1);
								                    temp_buffer.getChannelData(1).set(HRIR2);
								                    conv_ref8.buffer = temp_buffer;
																	});
																});
															});
														});
													});
												});
											});
										});
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});

const btn2 = document.getElementById("music_anechoic");
btn2.addEventListener("click", ()=>{
  buttonHide("music_anechoic");
  buttonShow("music_anechoic_disabled");
  Howler.masterGain.disconnect();
  Howler.masterGain.connect(conv_direct).connect(audioCtx.destination);
	document.getElementById("arrangement").src = "./img/ASW_LEV_fig2.png";
  sound2.play();
  var play_count = 0;
  sound2.once("end", function (){
    Howler.masterGain.connect(conv_ref1).connect(delay_ref1).connect(gain_ref1).connect(audioCtx.destination);
    Howler.masterGain.connect(conv_ref2).connect(delay_ref2).connect(gain_ref2).connect(audioCtx.destination);
    Howler.masterGain.connect(conv_ref3).connect(delay_ref3).connect(gain_ref3).connect(audioCtx.destination);
    Howler.masterGain.connect(conv_ref4).connect(delay_ref4).connect(gain_ref4).connect(audioCtx.destination);
		Howler.masterGain.connect(conv_ref5).connect(delay_ref5).connect(gain_ref5).connect(audioCtx.destination);
		Howler.masterGain.connect(conv_ref6).connect(delay_ref6).connect(gain_ref6).connect(audioCtx.destination);
		Howler.masterGain.connect(conv_ref7).connect(delay_ref7).connect(gain_ref7).connect(audioCtx.destination);
		Howler.masterGain.connect(conv_ref8).connect(delay_ref8).connect(gain_ref8).connect(audioCtx.destination);
    sound2.play();
		document.getElementById("arrangement").src = "./img/ASW_LEV_fig.png"
  });
  sound2.on("end", function (){
    play_count += 1;
    if (play_count == 2){
      buttonShow("music_anechoic");
      buttonHide("music_anechoic_disabled");
    }
  });
});

const tbox1 = document.getElementById("ref1_delay");
delay_ref1.delayTime.value = tbox1.value / 1000;
tbox1.addEventListener('input', (event) => {
  if($.isNumeric(document.getElementById("ref1_delay").value)){
    limitTextValue("ref1_delay",0, 200);
    delay_ref1.delayTime.value = tbox1.value / 1000;
  }
});
const tbox2 = document.getElementById("ref1_spl");
gain_ref1.gain.value = Math.pow(10, tbox2.value / 20);
tbox2.addEventListener('input', (event) => {
  if($.isNumeric(document.getElementById("ref1_spl").value)){
    limitTextValue("ref1_spl",-99, 0);
    gain_ref1.gain.value = Math.pow(10, tbox2.value / 20);
  }
});
const tbox3 = document.getElementById("ref2_delay");
delay_ref2.delayTime.value = tbox3.value / 1000;
tbox3.addEventListener('input', (event) => {
  if($.isNumeric(document.getElementById("ref2_delay").value)){
    limitTextValue("ref2_delay",0, 200);
    delay_ref2.delayTime.value = tbox3.value / 1000;
  }
});
const tbox4 = document.getElementById("ref2_spl");
gain_ref2.gain.value = Math.pow(10, tbox4.value / 20);
tbox4.addEventListener('input', (event) => {
  if($.isNumeric(document.getElementById("ref2_spl").value)){
    limitTextValue("ref2_spl",-99, 0);
    gain_ref2.gain.value = Math.pow(10, tbox4.value / 20);
  }
});
const tbox5 = document.getElementById("ref3_delay");
delay_ref3.delayTime.value = tbox5.value / 1000;
tbox5.addEventListener('input', (event) => {
  if($.isNumeric(document.getElementById("ref3_delay").value)){
    limitTextValue("ref3_delay",0, 200);
    delay_ref3.delayTime.value = tbox5.value / 1000;
  }
});
const tbox6 = document.getElementById("ref3_spl");
gain_ref3.gain.value = Math.pow(10, tbox6.value / 20);
tbox6.addEventListener('input', (event) => {
  if($.isNumeric(document.getElementById("ref3_spl").value)){
    limitTextValue("ref3_spl",-99, 0);
    gain_ref3.gain.value = Math.pow(10, tbox6.value / 20);
  }
});
const tbox7 = document.getElementById("ref4_delay");
delay_ref4.delayTime.value = tbox7.value / 1000;
tbox7.addEventListener('input', (event) => {
  if($.isNumeric(document.getElementById("ref4_delay").value)){
    limitTextValue("ref4_delay",0, 200);
    delay_ref4.delayTime.value = tbox7.value / 1000;
  }
});
const tbox8 = document.getElementById("ref4_spl");
gain_ref4.gain.value = Math.pow(10, tbox8.value / 20);
tbox8.addEventListener('input', (event) => {
  if($.isNumeric(document.getElementById("ref4_spl").value)){
    limitTextValue("ref4_spl",-99, 0);
    gain_ref4.gain.value = Math.pow(10, tbox8.value / 20);
  }
});

const chkB = document.getElementById("on-off2");
chkB.addEventListener('change', (event) => {
	if(event.target.checked==false){
		gain_ref5.gain.value = 0;
		gain_ref6.gain.value = 0;
		gain_ref7.gain.value = 0;
		gain_ref8.gain.value = 0;
		}
	else {
		gain_ref5.gain.value = Math.pow(10,-10/20);
		gain_ref6.gain.value = Math.pow(10,-10/20);
		gain_ref7.gain.value = Math.pow(10,-10/20);
		gain_ref8.gain.value = Math.pow(10,-10/20);
		console.log(conv_ref5);
		console.log(gain_ref5);
		console.log(delay_ref5);
	}
});
