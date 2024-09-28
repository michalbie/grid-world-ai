import { Object } from "./Object.js";

export class Empty extends Object {
	constructor(reward) {
		super(reward);
		this.type = "empty";
	}

	draw(x, y, mapSize) {
		var c = document.getElementById("game-canvas");
		var ctx = c.getContext("2d");
		var canvasWidth = c.width;
		const tileSize = canvasWidth / mapSize;

		ctx.fillStyle = "green";
		ctx.fillRect(tileSize * x, tileSize * y, tileSize, tileSize);
		ctx.strokeStyle = "#000000";
		ctx.stroke();
	}
}
