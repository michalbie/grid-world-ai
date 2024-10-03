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

const rewards = {
	goal: 5,
	hole: -10,
	wall: -1,
	empty: -0.1,
};

export class Board {
	constructor(dimensions, recipe) {
		this.dimensions = dimensions;
		this.recipe = recipe;
		this.agent = null;
		this.board = this.generateBoard(recipe);
		this.hasWon = false;
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
				return new Goal(rewards.goal);
			case 2:
				return new Hole(rewards.hole);
			case 3:
				return new Wall(rewards.wall);
			case 4:
				return new Empty(rewards.empty);
		}
	}

	getReward(position) {
		return this.board[position.y][position.x].getReward;
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
			this.board[agentPosition.y][agentPosition.x] = wasHole ? new Hole(rewards.hole) : new Empty(rewards.empty);
			this.board[nextPosition.y][nextPosition.x] = agent;
			this.drawBoard(this.board);

			if (next.type === "hole") {
				this.resetBoard();
			}
		}
	}

	resetBoard() {
		this.board = this.generateBoard(this.recipe);
		this.drawBoard(this.board);
	}

	checkIfWon() {
		const agentPosition = this.getAgentPosition();
		if (this.recipe[agentPosition.y][agentPosition.x] === "g") {
			this.resetBoard();
			return true;
		}
		return false;
	}

	moveAgent(move) {
		const agentPosition = this.getAgentPosition();
		let nextPosition = this.getNextPosition(agentPosition, move);
		if (this.isPositionValid(nextPosition)) {
			this.updateBoard(agentPosition, nextPosition);
		}
	}
}
