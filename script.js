import { Board } from "./Board.js";
import { MazeGenerator } from "./MazeGenerator.js";

// 5x5 board
// const recipe = [
// 	["w", "w", "w", "w", "w"],
// 	["w", "a", "o", "h", "w"],
// 	["w", "o", "h", "o", "w"],
// 	["w", "o", "o", "g", "w"],
// 	["w", "w", "w", "w", "w"],
// ];

// 10x10 board
// const recipe = [
// 	["w", "w", "w", "w", "w", "w", "w", "w", "w", "w"],
// 	["w", "a", "o", "o", "o", "o", "o", "o", "o", "w"],
// 	["w", "o", "w", "o", "o", "h", "o", "o", "o", "w"],
// 	["w", "o", "o", "o", "o", "o", "o", "o", "o", "w"],
// 	["w", "o", "o", "o", "o", "w", "o", "o", "o", "w"],
// 	["w", "o", "o", "h", "o", "w", "o", "w", "w", "w"],
// 	["w", "o", "o", "o", "o", "o", "o", "o", "g", "w"],
// 	["w", "o", "w", "o", "o", "o", "o", "w", "w", "w"],
// 	["w", "o", "w", "o", "o", "h", "o", "o", "o", "w"],
// 	["w", "w", "w", "w", "w", "w", "w", "w", "w", "w"],
// ];

const mazeGenerator = new MazeGenerator();
const gameTickrate = 50;

let interval = null;
let recipe = JSON.parse(localStorage.getItem("recipe")) || mazeGenerator.generateMaze();
const board = new Board(10, recipe);

const startGame = () => {
	const agent = board.getAgent();

	interval = setInterval(() => {
		const move = agent.makeMove(board, board.getAgentPosition());
		board.moveAgent(move);
		const won = board.checkIfWon();

		if (won) {
			clearInterval(interval);
			startGame();
		}
	}, gameTickrate);
};

// Setup buttons
document.getElementById("start-button").onclick = () => {
	!interval && startGame();
};
document.getElementById("reset-button").onclick = startGame;
document.getElementById("reset-table-button").onclick = () => {
	localStorage.removeItem("qTable");
	window.location.reload();
};
document.getElementById("stop-button").onclick = () => {
	clearInterval(interval);
	interval = null;
};
document.getElementById("generate-maze").onclick = () => {
	recipe = mazeGenerator.generateMaze();
	window.location.reload();
};
