import { moves } from "./objects/Agent.js";

export class QTable {
	constructor(a, y, e, boardSize) {
		this.learningRate = a;
		this.discountFactor = y;
		this.explorationRate = e;
		this.boardSize = boardSize;
		this.previousPosition = null;
		this.q = localStorage.getItem("qTable") ? JSON.parse(localStorage.getItem("qTable")) : this.initializeQTable();
		console.log(this.q);
	}

	initializeQTable() {
		const tab = [];
		for (let i = 0; i < this.boardSize; i++) {
			tab.push([]);
			for (let j = 0; j < this.boardSize; j++) {
				tab[i].push({
					up: 0.5,
					down: 0.5,
					left: 0.5,
					right: 0.5,
				});
			}
		}
		return tab;
	}

	updateQTable(q, action, reward, bestNextWeight) {
		q[action] += this.learningRate * (reward + bestNextWeight - q[action]);
		localStorage.setItem("qTable", JSON.stringify(this.q));
	}

	getBestAction(state) {
		const maxValue = Math.max(...Object.values(state));
		const bestActions = Object.entries(state).filter(([_, value]) => value === maxValue);
		return bestActions[Math.floor(Math.random() * bestActions.length)];
	}

	arePositionsEqual(a, b) {
		return a !== null && b !== null ? a.x === b.x && a.y === b.y : false;
	}

	shouldExplore() {
		return Math.random() <= this.explorationRate;
	}

	getRandomAction() {
		const randomIndex = Math.floor(Math.random() * moves.length);
		return moves[randomIndex];
	}

	chooseAction(board, agentPosition) {
		let currentAction = null;
		const currentState = this.q[agentPosition.y][agentPosition.x];
		let nextPosition = null;

		// do {
		// 	const rand = Math.random();

		// 	if (rand <= this.explorationRate) {
		// 		console.log("rand");
		// 		const randomIndex = Math.floor(Math.random() * moves.length);
		// 		currentAction = moves[randomIndex];
		// 	} else {
		// 		currentAction = this.getBestAction(currentState)[0];
		// 	}

		// 	nextPosition = board.getNextPosition(agentPosition, currentAction);
		// 	const nextState = this.q[nextPosition.y][nextPosition.x];
		// 	const [_, bestNextWeight] = this.getBestAction(nextState);

		// 	if (!this.arePositionsEqual(nextPosition, this.previousPosition)) {
		// 		this.updateQTable(currentState, currentAction, board.getReward(nextPosition), bestNextWeight);
		// 	}
		// } while (this.arePositionsEqual(nextPosition, this.previousPosition));

		// With move repetition allowed

		if (this.shouldExplore()) {
			currentAction = this.getRandomAction();
		} else {
			currentAction = this.getBestAction(currentState)[0];
		}

		nextPosition = board.getNextPosition(agentPosition, currentAction);
		const nextState = this.q[nextPosition.y][nextPosition.x];
		const [_, bestNextWeight] = this.getBestAction(nextState);

		this.updateQTable(currentState, currentAction, board.getReward(nextPosition), bestNextWeight);
		this.previousPosition = agentPosition;
		return currentAction;
	}
}
