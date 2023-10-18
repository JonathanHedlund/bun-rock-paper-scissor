import type { GameRepository } from "./gameRepository";

export type DatabaseService = {
	gameRepository: GameRepository;
};
