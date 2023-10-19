import type { DatabaseService } from "../../../application/contracts/databaseService";
import { GameStatus, type Game } from "../../../entities/gameEntity";
import { memoryGameRepository } from "./memoryGameRepository";

export function memoryDatabaseService(): DatabaseService {
	const gameRepository = memoryGameRepository();

	const initDatabase = () => {
		seedDatabase();
	};

	const seedDatabase = () => {
		const game: Game = {
			id: "1",
			status: GameStatus.PENDING_PLAYER,
			players: [{ name: "Jonathan" }],
		};
		gameRepository.add(game);
	};

	return {
		gameRepository,
		initDatabase,
	};
}
