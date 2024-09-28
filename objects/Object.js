export class Object {
	constructor(reward) {
		this.type = "object";
		this.reward = reward;
		this.spritePath = "";
	}

	get getReward() {
		return this.reward;
	}

	get getSprite() {
		const img = document.createElement("img");
		img.src = this.spritePath;
		return img;
	}

	draw(x, y, mapSize) {
		const img = this.getSprite;
		var c = document.getElementById("game-canvas");
		var ctx = c.getContext("2d");
		var canvasWidth = c.width;
		const tileSize = canvasWidth / mapSize;

		ctx.fillStyle = "green";
		ctx.fillRect(tileSize * x, tileSize * y, tileSize, tileSize);

		img.onload = function () {
			ctx.drawImage(img, tileSize * x, tileSize * y, tileSize, tileSize);
		};
	}
}
