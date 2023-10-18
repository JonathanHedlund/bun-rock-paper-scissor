import { gameRepositoryMemory } from "./memoryGameRepository";

import type { DatabaseService } from "../../../application/contracts/databaseService";

export const databaseService: DatabaseService = {
	gameRepository: gameRepositoryMemory(),
};
