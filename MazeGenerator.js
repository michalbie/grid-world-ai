export class MazeGenerator {
	constructor() {}

	generateMaze() {
		let holes = Math.random() * 10;
		let additionalWalls = Math.random() * 10;

		let recipe = [];
		for (let i = 0; i < 10; i++) {
			recipe.push([]);
			for (let j = 0; j < 10; j++) {
				if (i == 0 || i == 9 || j == 0 || j == 9) {
					recipe[i].push("w");
				} else {
					recipe[i].push("o");
				}
			}
		}

		// Generate holes (avoid border walls)
		for (let i = 0; i < holes; i++) {
			let x = Math.floor(Math.random() * 8) + 1;
			let y = Math.floor(Math.random() * 8) + 1;
			recipe[y][x] = "h";
		}

		// Generate additional walls (avoid border walls)
		for (let i = 0; i < additionalWalls; i++) {
			let x = Math.floor(Math.random() * 8) + 1;
			let y = Math.floor(Math.random() * 8) + 1;
			recipe[y][x] = "w";
		}

		// Generate agent
		let x = Math.floor(Math.random() * 8) + 1;
		let y = Math.floor(Math.random() * 8) + 1;
		recipe[y][x] = "a";

		// Generate goal
		x = Math.floor(Math.random() * 8) + 1;
		y = Math.floor(Math.random() * 8) + 1;
		recipe[y][x] = "g";

		localStorage.setItem("recipe", JSON.stringify(recipe));

		return recipe;
	}
}
