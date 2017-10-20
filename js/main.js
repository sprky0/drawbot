var intervalCount = 0;

var config = {
	perCycle : 200,
	noticeRate : 100
};

var body = document.getElementsByTagName('body')[0];
// var canvas = document.getElementById('display');
var canvas = document.createElement('canvas');
canvas.id = 'display';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
body.appendChild(canvas);

var context = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;



var onStage = [], _onStage = [];

function interval() {

	_onStage = [];

	for(var i = 0; i < onStage.length; i++) {
		onStage[i].interval();
		console.log("DID INTERVAL");
		if (!onStage[i].isDead()) {
			_onStage.push(onStage[i]);
			console.log("LIVE SPLOSION");
		} else {
			console.log("DEAD SPLOSION");
		}
	}
	// onStage = _onStage;

	intervalCount = intervalCount % config.noticeRate;

	if (intervalCount == 0) {
		console.log("interval x " + config.noticeRate);
	}

	intervalCount++;

	requestAnimationFrame(interval);
}

document.addEventListener('click', function(eve) {
	// console.log(eve);
	onStage.push( new Explosion(context, eve.clientX, eve.clientY) );
});

// document.addEventListener('mousemove', function(eve) {
// 	console.log(eve);
// 	onStage.push( new Explosion(eve.clientX, eve.clientY) );
// });

requestAnimationFrame(interval);
