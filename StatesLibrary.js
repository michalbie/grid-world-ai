import { Game } from "./Game.js";

export class StatesLibrary {
	constructor(restoreFromMemento) {
		this.states = [];
		this.restoreFromMemento = restoreFromMemento;
		this.loadStatesFromLocalStorage();
		this.setupGui();
	}

	setupGui() {
		const container = document.getElementById("states-list");
		container.innerHTML = "";

		this.states.forEach((state, index) => {
			const template = document.getElementById("state-template");
			const clone = template.content.cloneNode(true);
			const stateElement = clone.querySelector(".state");
			stateElement.querySelector("p").innerHTML = `State ${index + 1}`;
			stateElement.querySelector(".load-state").onclick = () => {
				this.restoreFromMemento(this.getState(index));
			};
			stateElement.querySelector(".remove-state").onclick = () => {
				this.removeState(index);
			};

			container.appendChild(clone);
		});
	}

	loadStatesFromLocalStorage() {
		const states = JSON.parse(localStorage.getItem("savedGames"));

		if (states === null) {
			localStorage.setItem("savedGames", JSON.stringify(this.states));
			return;
		} else {
			this.states = states;
		}
	}

	addState(state) {
		this.states.push(state);
	}

	getState(index) {
		return this.states[index];
	}

	removeState(index) {
		this.states.splice(index, 1);
		localStorage.setItem("savedGames", JSON.stringify(this.states));
		this.setupGui();
	}
}
