import type { Game } from "../../entities/gameEntity";
import type { GameRepository } from "./gameRepository";

export type DatabaseService = {
	gameRepository: GameRepository;
	initDatabase: () => void;
};
