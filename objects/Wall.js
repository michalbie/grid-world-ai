import { Object } from "./Object.js";

export class Wall extends Object {
	constructor(reward) {
		super(reward);
		this.type = "wall";
		this.spritePath = "assets/wall.png";
	}
}
