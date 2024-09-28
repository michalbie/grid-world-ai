import { Agent } from "./objects/Agent.js";
import { Empty } from "./objects/Empty.js";
import { Goal } from "./objects/Goal.js";
import { Hole } from "./objects/Hole.js";
import { Wall } from "./objects/Wall.js";

const objectsMapper = {
	a: 0,
	g: 1,
	h: 2,
	w: 3,
	o: 4,
};

export class Board {
	constructor(dimensions, recipe) {
		this.dimensions = dimensions;
		this.recipe = recipe;
		this.agent = null;
		this.board = this.generateBoard(recipe);
		this.drawBoard(this.board);
	}

	getAgent() {
		return this.agent;
	}

	generateBoard(recipe) {
		let board = [];
		for (let i = 0; i < this.dimensions; i++) {
			let row = [];
			for (let j = 0; j < this.dimensions; j++) {
				row.push(this.getObject(recipe[i][j]));
			}
			board.push(row);
		}
		return board;
	}

	drawBoard(board) {
		for (let i = 0; i < this.dimensions; i++) {
			for (let j = 0; j < this.dimensions; j++) {
				board[i][j].draw(j, i, this.recipe[0].length);
			}
		}
	}

	getObject(type) {
		type = objectsMapper[type];
		switch (type) {
			case 0:
				const agent = new Agent(0);
				this.agent = agent;
				return agent;
			case 1:
				return new Goal(5);
			case 2:
				return new Hole(-5);
			case 3:
				return new Wall(-1);
			case 4:
				return new Empty(0);
		}
	}

	getAgentPosition() {
		for (let i = 0; i < this.dimensions; i++) {
			for (let j = 0; j < this.dimensions; j++) {
				if (this.board[i][j].type === "agent") {
					return { x: j, y: i };
				}
			}
		}
	}

	getNextPosition(agentPosition, move) {
		let nextPosition = { x: agentPosition.x, y: agentPosition.y };
		switch (move) {
			case "up":
				nextPosition.y--;
				break;
			case "down":
				nextPosition.y++;
				break;
			case "left":
				nextPosition.x--;
				break;
			case "right":
				nextPosition.x++;
				break;
		}
		return nextPosition;
	}

	isPositionValid(position) {
		return position.x >= 0 && position.x < this.dimensions && position.y >= 0 && position.y < this.dimensions;
	}

	updateBoard(agentPosition, nextPosition) {
		const agent = this.board[agentPosition.y][agentPosition.x];
		const next = this.board[nextPosition.y][nextPosition.x];
		const wasHole = this.recipe[agentPosition.y][agentPosition.x] === "h";

		if (next.type !== "wall") {
			this.board[agentPosition.y][agentPosition.x] = wasHole ? new Hole(-5) : new Empty(0);
			this.board[nextPosition.y][nextPosition.x] = agent;
			this.drawBoard(this.board);
		}
	}

	moveAgent(move) {
		const agentPosition = this.getAgentPosition();
		let nextPosition = this.getNextPosition(agentPosition, move);
		if (this.isPositionValid(nextPosition)) {
			this.updateBoard(agentPosition, nextPosition);
		}
	}
}
