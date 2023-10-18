import { memoryGameRepository } from "./memory/memoryGameRepository";

import type { DatabaseService } from "../../application/contracts/databaseService";

export const databaseService: DatabaseService = {
	gameRepository: memoryGameRepository,
};
