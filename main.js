const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const pi = 3.14159;

var view = {
	x: 0,
	y: 0,
	width: 840,
	height: 640
};

var offsetX = 0;
var offsetY = 0;
var rectox = 0;
var rectoy = 0;

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
		let rad1 = deg1 * pi / 180;
		let rad2 = deg2 * pi / 180;
		ctx.moveTo(x + r, y);
		ctx.arc(x, y, r, rad1, rad2, true);
	}
	
};

class Cell {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
};

var cellList = [];

const extractDrawData = (cells) => {
	let output = [];
	for(let i = 0; i < cells.length; i++) {
		output.push(["fillRect", [cells[i].x, cells[i].y, cells[i].width, cells[i].height]]);
	}
	return output;
}

const align = (toAlign, rounder, offset) => {
	return (Math.floor(toAlign / rounder) * rounder) + offset;
}

const clear = () => {
	ctx.clearRect(0, 0, view.width, view.height);
}

const draw = (funcs) => {
	ctx.beginPath();
	for(let i = 0; i < funcs.length; i++) {
		try {
			Drawables[funcs[i][0]](...(funcs[i][1]));
		} catch(e) {
			console.log("Error: called non-drawable function");
		}
	}
	ctx.stroke();
}

const getCells = (callback) => {
	for(let i = 0; i < cellList.length; i++) {
		callback(cellList[i]);
	}
}

document.body.addEventListener("click", (e) => {
	let exists = false;
	let newX = align(e.pageX - offsetX, 50, offsetX);
	let newY = align(e.pageY - offsetY, 50, offsetY);
	getCells((i) => {
		if(newX == i.x && newY == i.y) {
			exists = true;
		}
	});
	if(!exists) {
		cellList.push(new Cell(newX, newY, 50, 50));
	}
});

const mainRender = () => {
	offsetX = (offsetX + 1) % 50;
	offsetY = (offsetY + 1) % 50;
	getCells((i) => {
		i.x = (i.x + 1) % 850;
		i.y = (i.y + 1) % 650;
	});
	clear();
	draw([
		["grid",[50, 50, offsetX, offsetY]],
		...extractDrawData(cellList)
	]);
}

setInterval(mainRender, 33);
