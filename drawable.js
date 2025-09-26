const PI = 3.14159;

class Drawables {
	static line(x1, y1, x2, y2) {
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
	}
	static grid(w, h, ox, oy) {
		for(let i = view.width; i > -w; i -= w) {
			for(let j = view.height; j > -h; j -= h) {
				Drawables.line((view.width - i) + ox, 0, (view.width - i) + ox, view.height);
				Drawables.line(0, (view.height - j) + oy, view.width, (view.height - j) + oy);
			}
		}
	}
	static fillRect(x, y, w, h) {
		ctx.fillRect(x, y, w, h);
	}
	static arc(x, y, r, deg1 = 0, deg2 = 360) {
		let rad1 = deg1 * PI / 180;
		let rad2 = deg2 * PI / 180;
		ctx.moveTo(x + r, y);
		ctx.arc(x, y, r, rad1, rad2, true);
	}
	
};
