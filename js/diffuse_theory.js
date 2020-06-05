document.getElementById("width").value = "5.0";
document.getElementById("depth").value = "5.0";
document.getElementById("height").value = "5.0";

var width = document.getElementById("width").value;
var depth = document.getElementById("width").value;
var height = document.getElementById("height").value;

function calcArea (width_func, depth_func, height_func) {
  return ( width_func * depth_func + depth_func * height_func + width_func * height_func ) * 2;
}

function calcVolume (width_func, depth_func, height_func) {
  return width_func * depth_func * height_func;
}

var area = calcArea(width, depth, height);
var volume = calcVolume(width, depth, height);
document.getElementById("area").innerText = area;
document.getElementById("volume").innerText = volume;

var absb = 0.2;
var pow = 1.0;
document.getElementById("absb").value = absb;
document.getElementById("pow").value = pow;

var sound_speed = 343.55;

function calcE0 (pow_func, sound_speed_func, area_func, absb_func) {
  return 4 * pow_func / ( sound_speed_func * area_func * absb_func);
}

function calcDamp (sound_speed_func, area_func, volume_func, absb_func) {
  return -sound_speed_func * area_func * absb_func / ( 4 * volume_func );
}

var e0 = calcE0 (pow, sound_speed, area, absb);
var damp = calcDamp (sound_speed, area, volume, absb);
document.getElementById("e0").innerText = e0;
document.getElementById("damp").innerText = damp;

function getYmax (value_func) {
  var s = "" + value_func;
  var temp = -1;
  for (var i = 0; i < s.length; i ++){
    if ((s.substring(i,i+1) != "0" & s.substring(i,i+1) != ".") & temp == -1) {
      temp = i;
    }
  }
  if (temp > 1) {
    temp = temp - 1;
  }
  return Math.ceil( value_func * Math.pow(10, temp) ) / Math.pow(10, temp);
}

var ymax = getYmax(e0);
console.log(ymax)

var t = 0.0;

var chart_resolution = 4096;
var maxTime = 1;
var growdata = new Array(chart_resolution);
var dampdata = new Array(chart_resolution);

function makeGrowDampData () {
  for (var i = 0; i < chart_resolution; i ++){
    t = i * maxTime / chart_resolution;
    growdata[i] = {x:t, y:e0 * (1 - Math.exp(damp * t))};
    dampdata[i] = {x:t, y:e0 * Math.exp(damp * t)};
  }
}

makeGrowDampData();

var chart_ctx1 = document.getElementById("Chart1");
var chart_ctx2 = document.getElementById("Chart2");
var chart1 = new Chart(chart_ctx1, {
  type: 'scatter',
  data: {
    datasets: [
      {
      label: "音の成長",
      data: growdata, borderWidth: 1, borderColor: 'red',fill: false, showLine: true, pointRadius: 0, cubicInterpolationMode: 'monotone'
      }]
  },
  options: {
    scales: {
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: '音のエネルギー密度 [J/m3]',
        },
        ticks: {
          precision: 3,
          min: 0,
          max: ymax,
          stepSize: ymax / 10,
        },
      }],
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: '時間（秒）',
        },
        ticks: {
          min: 0,
          max: maxTime,
          stepSize: 0.5
        },
      }]
    },
  }
});

var chart2 = new Chart(chart_ctx2, {
  type: 'scatter',
  data: {
    datasets: [
      {
      label: "音の減衰",
      data: dampdata, borderWidth: 1, borderColor: 'red',fill: false, showLine: true, pointRadius: 0, cubicInterpolationMode: 'monotone'
      }]
  },
  options: {
    scales: {
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: '音のエネルギー密度 [J/m3]',
        },
        ticks: {
          precision: 3,
          min: 0,
          max: ymax,
          stepSize: ymax / 10,
        },
      }],
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: '時間（秒）',
        },
        ticks: {
          min: 0,
          max: maxTime,
          stepSize: 0.5
        },
      }]
    },
  }
});

const tbox1 = document.getElementById("width");
tbox1.addEventListener('input', (event) => {
  if($.isNumeric(document.getElementById("width").value)){
    limitTextValue("width",0.1, 10);
    width = document.getElementById("width").value;
    area = calcArea(width, depth, height);
    volume = calcVolume(width, depth, height);
    document.getElementById("area").innerText = area;
    document.getElementById("volume").innerText = volume;
    e0 = calcE0 (pow, sound_speed, area, absb);
    damp = calcDamp (sound_speed, area, volume, absb);
    ymax = getYmax(e0);
    document.getElementById("e0").innerText = e0;
    document.getElementById("damp").innerText = damp;
    makeGrowDampData();
    chartUpdate ();
  }
});

const tbox2 = document.getElementById("depth");
tbox2.addEventListener('input', (event) => {
  if($.isNumeric(document.getElementById("depth").value)){
    limitTextValue("depth",0.1, 10);
    depth = document.getElementById("depth").value;
    area = calcArea(width, depth, height);
    volume = calcVolume(width, depth, height);
    document.getElementById("area").innerText = area;
    document.getElementById("volume").innerText = volume;
    e0 = calcE0 (pow, sound_speed, area, absb);
    damp = calcDamp (sound_speed, area, volume, absb);
    ymax = getYmax(e0);
    document.getElementById("e0").innerText = e0;
    document.getElementById("damp").innerText = damp;
    makeGrowDampData();
    chartUpdate ();
  }
});

const tbox3 = document.getElementById("height");
tbox3.addEventListener('input', (event) => {
  if($.isNumeric(document.getElementById("height").value)){
    limitTextValue("height",0.1, 10);
    height = document.getElementById("height").value;
    area = calcArea(width, depth, height);
    volume = calcVolume(width, depth, height);
    document.getElementById("area").innerText = area;
    document.getElementById("volume").innerText = volume;
    e0 = calcE0 (pow, sound_speed, area, absb);
    damp = calcDamp (sound_speed, area, volume, absb);
    ymax = getYmax(e0);
    document.getElementById("e0").innerText = e0;
    document.getElementById("damp").innerText = damp;
    makeGrowDampData();
    chartUpdate ();
  }
});

const tbox4 = document.getElementById("absb");
tbox4.addEventListener('input', (event) => {
  if($.isNumeric(document.getElementById("absb").value)){
    limitTextValue("absb",0.1, 1);
    absb = document.getElementById("absb").value;
    e0 = calcE0 (pow, sound_speed, area, absb);
    damp = calcDamp (sound_speed, area, volume, absb);
    ymax = getYmax(e0);
    document.getElementById("e0").innerText = e0;
    document.getElementById("damp").innerText = damp;
    makeGrowDampData();
    chartUpdate ();
  }
});

function chartUpdate () {
  chart1.data.datasets = [{
    label: "音の成長",
    data: growdata, borderWidth: 1, borderColor: 'red',fill: false, showLine: true, pointRadius: 0, cubicInterpolationMode: 'monotone'
  }];
  chart1.options.scales.yAxes = [{ticks: {max: ymax, stepSize: ymax / 10,},}];
  chart1.update();
  chart2.data.datasets = [{
    label: "音の減衰",
    data: dampdata, borderWidth: 1, borderColor: 'red',fill: false, showLine: true, pointRadius: 0, cubicInterpolationMode: 'monotone'
  }];
  chart2.options.scales.yAxes = [{ticks: {max: ymax, stepSize: ymax / 10,},}];
  chart2.update();
}
