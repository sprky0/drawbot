/**
 * @param HTMLCanvasContext context a canvas context to draw onto
 * @param string startColor a CSS color value to apply to the stroke
 * @param integer startX of the point
 * @param integer startY of the point
 */
function DrawBot(context, startColor, startX, startY) {

	var width = context.canvas.width;
	var height = context.canvas.height;

	var dead = false;

	var lastX = startX || width / 2;
	var lastY = startY || height / 2;

	var xBias = rand(-2,2);
	var yBias = rand(-2,2);

	function randHex(length) {
		length = length || 6;
		var str = "";
		var arr = "0123456789abcdef";
		while(str.length < length) {
			str += arr[Math.floor(Math.random() * arr.length)];
		}
		return "#" + str;
	}

	function rand(a, b){
		var min = Math.min(a,b);
		var max = Math.max(a,b);
		var top = max - min;
		return Math.random() * top + min;
	}

	function inBoundsX(x) {
		return x > width  ? width : x < 0 ? 0 : x;
	}

	function inBoundsY(y) {
		return y > height ? height : y < 0 ? 0 : y;
	}

	function isInBounds(x,y) {
		return !(x < 0 || y < 0 || x >= width || y >= width);
	}

	function kill() {
		dead = true;
		console.log("Done been killed");
	}

	function interval() {

		// don't draw if we done died my dude
		if (dead) {
			return false;
		}

		context.moveTo(lastX, lastY);
		context.beginPath();

		context.strokeStyle = startColor || randHex(6);

		for(var i = 0; i < config.perCycle; i++) {

			// force to stay in bounds, OR
			// var x = rand(inBoundsX(lastX - 2 + xBias), inBoundsX(lastX + 2 + xBias));
			// var y = rand(inBoundsY(lastY - 2 + yBias), inBoundsY(lastY + 2 + yBias));

			// die when going out of bounds
			var x = rand(lastX - 2 + xBias, lastX + 2 + xBias);
			var y = rand(lastY - 2 + yBias, lastY + 2 + yBias);

			// going off the grid means you die
			if (!isInBounds(x,y)) {
				context.stroke();
				context.closePath();
				kill();
				return;
			}

			context.lineTo(x, y);

			lastX = x;
			lastY = y;

			context.stroke();
		}
		context.closePath();
	}

	return {
		interval : interval,
		isDead : function() {
			console.log( dead );
			return dead;
		}
	};

}
