var container = document.getElementById('container');
var box = document.getElementById('box');
var arr = box.getElementsByTagName('div');
var radius = calculateRadius(129, 20);
var audio = document.getElementById('audio');

//默认打开背景音乐是播放状态
audio.play();

//依次给每天div加背景图片，360/20=18度，在Y轴旋转一次增加18度，然后Z轴推出radius的距离即可。
for (var i = 0; i < arr.length; i++) {
	arr[i].style.background = 'url("./img/p' + (i + 1) + '.png") no-repeat';
	arr[i].style.WebkitTransform = "rotateY(" + 360 / arr.length * i + 'deg) translatez(' + radius + 'px)';
}

//计算半径，第一个参数是图片的宽，第二个是图片数量，PI是180度，-3去衔接的黑边。round是四舍五入
function calculateRadius(length, totalNum) {
	return Math.round(length / (2 * Math.tan(Math.PI / totalNum))) - 3;
}

//音乐的播放和暂停
$('#music').on('click', function(e) {
	if (audio.paused) {
		audio.play();
		$('#music').text('♫');
	} else {
		audio.pause();
		$('#music').text('♬');
	}
})


//处理手指拖动事件，并让整个box绕着Y轴也转动
var startX = 0,
	x = 0,
	endX = 0;
var flag = true;
$('#box').on('touchstart', function(event) {
	event.preventDefault();
	//手指碰屏幕自动旋转停止
	clearInterval(autoRoteId);
	var touch = event.targetTouches[0];
	// startX = touch.pageX - x;
	startX = touch.pageX;
})
$('#box').on('touchmove', function(event) {
	if (flag) {
		event.preventDefault();
		var touch = event.targetTouches[0];
		endX = touch.pageX;
		
		// x = endX - startX;
		x -= (endX - startX)/50 ;
		box.style.transform = 'rotateY(' + x + 'deg)';
	} else {
		return false;
	}

})

// 点击或者拖动松开的时候，继续自动旋转
$('#box').on('touchend', function(event) {
	boxAutoRotate();
});


window.addEventListener('deviceorientation', function(event) {
	//获得手机旋转的gamma，如果手机转则box也旋转，同时flag为false禁止手指拖动了
	//也就是手机Y轴转超过30度的时候，手碰它是没有用的。
	var gamma = event.gamma;
	if (Math.abs(gamma) > 30) {
		flag = false;
		var gammaY = x +gamma;
		box.style.transform = 'rotateY(' + gammaY + 'deg)';
	} else {
		flag = true;
	}

})

//自动旋转效果
var autoRoteId =0;
function  boxAutoRotate(){
	autoRoteId = setInterval(function(){
		x = x + 0.1;
		box.style.transform = 'rotateY(' + x + 'deg)';
	},20) 
}
//默认执行的
boxAutoRotate();