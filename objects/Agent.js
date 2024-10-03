import { Object } from "./Object.js";
import { QTable } from "../QTable.js";

export const moves = ["up", "down", "left", "right"];

export class Agent extends Object {
	constructor(reward) {
		super(reward);
		this.type = "agent";
		this.spritePath = "assets/agent.png";
		this.qTable = new QTable(0.1, 0.9, 0.1, 10);
	}

	makeMove(board, agentPosition) {
		return this.makeQTableMove(board, agentPosition);
	}

	makeRandomMove() {
		const randomIndex = Math.floor(Math.random() * moves.length);
		return moves[randomIndex];
	}

	makeQTableMove(board, agentPosition) {
		const action = this.qTable.chooseAction(board, agentPosition);
		return moves[moves.indexOf(action)];
	}
}
