import { Board } from "./Board.js";
import { MazeGenerator } from "./MazeGenerator.js";
import { StatesLibrary } from "./StatesLibrary.js";
import { QTable } from "./QTable.js";

const gameTickrate = 20;

export class Game {
	constructor() {
		this.gameInterval = null;
		this.recipe = new MazeGenerator().generateMaze();
		this.board = new Board(10, this.recipe);
		this.mazeGenerator = new MazeGenerator();
		this.statesLibrary = new StatesLibrary(this.restoreFromMemento.bind(this));

		this.setupButtons();
	}

	getInterval() {
		return this.gameInterval;
	}

	clearGameInterval() {
		clearInterval(this.gameInterval);
		this.gameInterval = null;
	}

	startGame() {
		const agent = this.board.getAgent();
		if (this.gameInterval) {
			clearInterval(this.gameInterval);
		}

		this.gameInterval = setInterval(() => {
			const move = agent.makeMove(this.board, this.board.getAgentPosition());
			this.board.moveAgent(move);
			const won = this.board.checkIfWon();

			if (won) {
				clearInterval(this.gameInterval);
				this.startGame();
			}
		}, gameTickrate);
	}

	setupButtons() {
		document.getElementById("start-button").onclick = () => {
			!this.getInterval() && this.startGame();
		};

		document.getElementById("reset-button").onclick = () => this.startGame();

		document.getElementById("reset-table-button").onclick = () => {
			this.board.agent.qTable.resetQTable();
		};

		document.getElementById("stop-button").onclick = () => {
			this.clearGameInterval();
		};

		document.getElementById("generate-maze").onclick = () => {
			this.recipe = this.mazeGenerator.generateMaze();
			this.board.agent = null;
			this.board.recipe = this.recipe;
			this.board.resetBoard();
		};

		document.getElementById("save-state").onclick = () => {
			this.saveToMemento();
			this.statesLibrary.addState(JSON.stringify(this));
			this.statesLibrary.setupGui();
		};
	}

	// Save the Game state as a memento
	saveToMemento() {
		// Retrieve the existing mementos or initialize an empty array
		const savedGames = JSON.parse(localStorage.getItem("savedGames")) || [];

		// Serialize the current state of the Game object
		const snapshot = JSON.stringify(this);

		// Enforce a limit of 10 saved games
		if (savedGames.length >= 10) {
			savedGames.shift(); // Remove the oldest save
		}

		savedGames.push(snapshot);

		// Save updated mementos to localStorage
		localStorage.setItem("savedGames", JSON.stringify(savedGames));
		console.log("Game state saved to memento.");
	}

	restoreFromMemento(state) {
		const gameState = JSON.parse(state);

		// Reconstruct complex properties like board and mazeGenerator
		this.recipe = gameState.recipe;
		this.hasWon = gameState.hasWon;
		this.board = new Board(gameState.board.dimensions, gameState.recipe);
		this.board.resetBoard();
		this.board.agent.qTable = new QTable(
			gameState.board.agent.qTable.learningRate,
			gameState.board.agent.qTable.discountFactor,
			gameState.board.agent.qTable.explorationRate,
			gameState.board.dimensions
		);
		this.board.agent.qTable.q = gameState.board.agent.qTable.q;

		console.log("Game state restored from memento.");
		return gameState;
	}
}
