function limitTextValue (id, min, max) {
	var value = document.getElementById(id).value;
	if (value > max){
		document.getElementById(id).value = max;
	}
	else if (value < min) {
		document.getElementById(id).value = min;
	}
}

function setRevT (wn,revT,sampleRate) {
	var h = new Array(wn.length);
	var h2;
	for (var i = 0; i < wn.length ; i ++){
		h2 = Math.sqrt(Math.exp(-(6 * Math.log(10) * i / sampleRate)/revT));
		h[i] = h2 * wn[i];
	}
	return h;
}

function setRevR (ir_func, revR_func){
	var total = 0;
	var max = 0;
 	for (var i = 0; i < ir_func.length ; i ++){
		total += Math.pow(ir_func[i], 2);
	}
	ir_func[0] = Math.sqrt(total * Math.pow(10, revR_func/10));
	for (var i = 0; i < ir_func.length ; i ++){
		if (max < Math.abs(ir_func[i])) {
			max = Math.abs(ir_func[i]);
		}
	}
	for (var i = 0; i < ir_func.length ; i ++){
		ir_func[i] = ir_func[i] / max;
	}
	return ir_func;
}

function buttonShow (idBtn) {
	document.getElementById(idBtn).classList.add("btnShow") ;
	document.getElementById(idBtn).classList.remove("btnHide") ;
}

function buttonHide(idBtn) {
	document.getElementById(idBtn).classList.remove("btnShow") ;
	document.getElementById(idBtn).classList.add("btnHide") ;
}

function buttonColB (idBtn) {
	document.getElementById(idBtn).classList.add("btnColB") ;
	document.getElementById(idBtn).classList.remove("btnColG") ;
}

function buttonColG (idBtn) {
	document.getElementById(idBtn).classList.remove("btnColB") ;
	document.getElementById(idBtn).classList.add("btnColG") ;
}

function initSoundWithBtnsOnOff (srcSound, idBtn1, idBtn2) {
	var sound1 = new Howl({
		src: [srcSound],
		onloaderror: function() {
			console.log("load error");
		},
		onend: function() {
			buttonHide(idBtn2);
			buttonShow(idBtn1);
		},
	});
	return sound1;
}

function trimAudioData () {
	dat = new Array(chartLength);
	var max = 0.0;
	var maxPosition = 0;
	for ( var i = 0; i < floatData[0].length; i ++ ){
		if (max < Math.abs(floatData[0][i])){
			max = Math.abs(floatData[0][i]);
			maxPosition = i;
		}
	}
	var startPosition = Math.max(0, maxPosition - sampleRate * 0.1);
	var sampleLength = 0;
	while (sampleLength < sampleRate * 2 ) {
		sampleLength += chartLength;
	}
	dat2 = new Array(sampleLength);
	if (floatData[0].length - startPosition < sampleLength){
		for ( var i = 0; i < floatData[0].length - startPosition; i ++ ){
			dat2[i] = floatData[0][startPosition + i];
		}
		for ( var i = floatData[0].length - startPosition; i < sampleLength; i ++ ){
			dat2[i] = 0.0;
		}
	}
	else {
		for ( var i = 0; i < sampleLength; i ++ ){
			dat2[i] = floatData[0][startPosition + i];
		}
	}
	for ( var i = 0; i < chartLength; i ++ ){
		max = 0.0;
		for ( var j = 0; j < sampleLength/chartLength; j ++ ){
			if (max < Math.abs(dat2[i * sampleLength/chartLength + j])){
				max = Math.abs(dat2[i * sampleLength/chartLength + j]);
				dat[i]={x:(sampleLength/sampleRate)*i/chartLength, y:dat2[i * sampleLength/chartLength + j]};
			}
		}
	}
}

function resampleDataForChart (dat_func, sampleRate_func, outputLength_func) {
	var output = new Array(outputLength_func);
	var block_size = Math.floor(dat_func.length / outputLength_func);
	var max;
	for (var i = 0; i < outputLength_func; i ++){
		max = 0;
		for (var j = 0; j < block_size; j ++){
			if (max < Math.abs(dat_func[i * block_size + j])){
				max = Math.abs(dat_func[i * block_size + j]);
				output[i] = {x: block_size * i / sampleRate_func, y:dat_func[i * block_size + j]};
			}
		}
	}
	return output;
}

function calRevT (ir, sampleRate) {
	var revCurve = new Array(ir.length);
	for (var i = 0; i < ir.length; i ++){
		revCurve[i] = 0.0;
	}
	for (var i = 0; i < ir.length; i ++){
		revCurve[0] += Math.pow(ir[i],2);
	}
	var base = revCurve[0];
	for (var i = 1; i < ir.length; i ++){
		revCurve[i] = revCurve[i-1] - Math.pow(ir[i-1],2);
	}
	for (var i = 0; i < ir.length; i ++){
		revCurve[i] = 10 * Math.log10(revCurve[i] / base);
	}
	var pos = 0;
	while (revCurve[pos] > -5 && pos < ir.length){
		pos += 1;
	}
	var s_pos = pos;
	while (revCurve[pos] > -25 && pos < ir.length){
		pos += 1;
	}
	var e_pos = pos;
	if (pos > ir.length - 1) {
		return -1.0;
	}
	else {
		var meanX = 0.0;
		var meanY = 0.0;
		var size = e_pos - s_pos;
		var dataX = new Array(size);
		var dataY = new Array(size);
		var sumX = 0.0;
		var sumY = 0.0;
		var sumXY = 0.0;
		for (var i = 0; i < size; i ++){
			meanX += i / sampleRate;
			meanY += revCurve[i + s_pos];
		}
		meanX = meanX / size;
		meanY = meanY / size;
		for (var i = 0; i < size; i ++){
			dataX[i] = Math.pow(i / sampleRate - meanX, 2);
			dataY[i] = Math.pow(revCurve[i + s_pos] - meanY, 2);
		}
		for (var i = 0; i < size; i ++){
			sumX += dataX[i];
			sumY += dataY[i];
		}
		for (var i = 0; i < size; i ++){
			sumXY += (i / sampleRate - meanX) * (revCurve[i + s_pos] - meanY);
		}
		var rt1 = -60 / (sumXY / (Math.sqrt(sumX) * Math.sqrt(sumY)) * (Math.sqrt(sumY) / Math.sqrt(sumX)));
		var rt2 = 3 * (e_pos - s_pos) / sampleRate;
		console.log(rt1,rt2);
		return rt1;
	}
}

function drawChart () {
	myLineChart = new Chart(ctx, {
		type: 'scatter',
		data: {
			datasets: [
				{
				label: '録音した波形',
				data: dat, borderWidth: 1, borderColor: 'red',fill: false, showLine: true, pointRadius: 0, cubicInterpolationMode: 'monotone'
				}]
		},
		options: {
			scales: {
				yAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: '音圧（±1が録音できる最大値）',
					},
					ticks: {
						min: -1,
						max: 1,
						stepSize: 0.2
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
						max: 2,
						stepSize: 0.2
					},
				}]
			},
		}
	});
}

function drawChart2 (ctx_func, label_func, time_max_fuc, dat_func) {
	var myLineChart = new Chart(ctx_func, {
		type: 'scatter',
		data: {
			datasets: [
				{
				label: label_func,
				data: dat_func, borderWidth: 1, borderColor: 'red',fill: false, showLine: true, pointRadius: 0, cubicInterpolationMode: 'monotone'
				}]
		},
		options: {
			scales: {
				yAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: '音圧（±1が録音できる最大値）',
					},
					ticks: {
						min: -1,
						max: 1,
						stepSize: 0.2
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
						max: time_max_fuc,
						stepSize: 0.5
					},
				}]
			},
		}
	});
}

function availableData( arr ){
	var b = false;
	for( var i = 0; i < arr.length && !b; i ++ ){
		b = ( arr[i] != 0 );
	}
	return b;
}
