import { Agent } from "../objects/Agent.js";
import { Goal } from "../objects/Goal.js";
import { Hole } from "../objects/Hole.js";
import { Wall } from "../objects/Wall.js";
import { Empty } from "../objects/Empty.js";
import { rewards } from "../config.js";

export class ObjectFactory {
	static createObject(type, boardAgent) {
		switch (type) {
			case "a":
				if (boardAgent) {
					return boardAgent;
				}
				const agent = new Agent(0);
				return agent;
			case "g":
				return new Goal(rewards.goal);
			case "h":
				return new Hole(rewards.hole);
			case "w":
				return new Wall(rewards.wall);
			case "o":
				return new Empty(rewards.empty);
			default:
				throw new Error(`Unknown object type: ${type}`);
		}
	}
}
