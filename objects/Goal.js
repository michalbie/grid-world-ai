import { Object } from "./Object.js";

export class Goal extends Object {
	constructor(reward) {
		super(reward);
		this.type = "goal";
		this.spritePath = "assets/goal.png";
	}
}
