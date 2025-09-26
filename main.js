const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const pi = 3.14159;

const GRID_SIZE = 20;

var view = {
	x: 0,
	y: 0,
	width: 1050,
	height: 850
};

var mouse = {
	x: 0,
	y: 0,
	clicked: false
}

var offsetX = 0;
var offsetY = 0;
var rectox = 0;
var rectoy = 0;

var cellList = [];

const extractDrawData = (cells) => {
	let output = [];
	for(let i = 0; i < cells.length; i++) {
		output.push(["fillRect", [view.x - cells[i].x, view.y - cells[i].y, cells[i].width, cells[i].height]]);
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

document.body.addEventListener("mousemove", (e) => {
	mouse.x = e.pageX;
	mouse.y = e.pageY;
	if(mouse.clicked) {
		view.x += e.movementX;
		view.y += e.movementY;
	}
});

document.body.addEventListener("keydown", (e) => {
	let exists = false;
	let newX = align((view.x - (mouse.x - offsetX)), GRID_SIZE, offsetX) + GRID_SIZE;
	let newY = align((view.y - (mouse.y - offsetY)), GRID_SIZE, offsetY) + GRID_SIZE;
	getCells((i) => {
		if(newX == i.x && newY == i.y) {
			exists = true;
		}
	});
	if(!exists) {
		cellList.push(new Cell(newX, newY, GRID_SIZE, GRID_SIZE));
	}
});

document.body.addEventListener("mousedown", () => {
	mouse.clicked = true;
});

document.body.addEventListener("mouseup", () => {
	mouse.clicked = false;
});
	
const mainRender = () => {
	clear();
	draw([
		["grid",[GRID_SIZE, GRID_SIZE, view.x % GRID_SIZE, view.y % GRID_SIZE]],
		...extractDrawData(cellList)
	]);
}

setInterval(mainRender, 1);
