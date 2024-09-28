import { Object } from "./Object.js";

export class Hole extends Object {
	constructor(reward) {
		super(reward);
		this.type = "hole";
		this.spritePath = "assets/hole.png";
	}

	draw(x, y, mapSize) {
		var c = document.getElementById("game-canvas");
		var ctx = c.getContext("2d");
		var canvasWidth = c.width;
		const tileSize = canvasWidth / mapSize;

		ctx.fillStyle = "green";
		ctx.fillRect(tileSize * x, tileSize * y, tileSize, tileSize);

		ctx.fillStyle = "#000000";
		ctx.beginPath();
		ctx.arc(tileSize * x + tileSize / 2, tileSize * y + tileSize / 2, tileSize / 2 - 0.1 * tileSize, 0, 2 * Math.PI);
		ctx.fill();
	}
}
