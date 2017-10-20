/**
 * @param integer x
 * @param integer y
 */
function Explosion(context, x, y) {

	var maxBots = Math.floor( Math.random() * 200 + 50);
	var drawBots = [], _drawBots = [];

	for(var i = 0; i < maxBots; i++) {
		drawBots.push(
			new DrawBot(context, getHex(), x, y)
		);
	}

	function getHex(length) {
		length = length || 6;
		var str = "";
		var arr = "0123456789abcdef";
		while(str.length < length) {
			str += arr[Math.floor(Math.random() * arr.length)];
		}
		return "#" + str;
	}

	function interval() {

		_drawBots = [];

		console.log( drawBots.length );

		for(var i = 0; i < drawBots.length; i++) {
			drawBots[i].interval();
			if (!drawBots[i].isDead()) {
				_drawBots.push(drawBots[i]);
			}
		}

		drawBots = _drawBots;

	}

	function isDead() {
		return drawBots.length > 0;
	}

	return {
		interval : interval,
		isDead : isDead
	}

}
