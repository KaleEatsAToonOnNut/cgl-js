const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var view = {
	x: 0,
	y: 0,
	width: 840,
	height: 640
};

class Drawables {
	static line(x1, y1, x2, y2) {
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		console.log("a");
	}
	
};

const draw = (funcs) => {
	ctx.beginPath();
	for(let i in funcs) {
		Drawables[i[0]](...(i[1]));
	}
	ctx.stroke();
}

const mainRender = () => {
	draw([
		["line",[0, 0, 50, 50]]
	]);
}

mainRender();
