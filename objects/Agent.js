import { Object } from "./Object.js";

export class Agent extends Object {
	constructor(reward) {
		super(reward);
		this.type = "agent";
		this.spritePath = "assets/agent.png";
	}

	makeMove() {
		return this.makeRandomMove();
	}

	makeRandomMove() {
		const moves = ["up", "down", "left", "right"];
		const randomIndex = Math.floor(Math.random() * moves.length);
		return moves[randomIndex];
	}
}
