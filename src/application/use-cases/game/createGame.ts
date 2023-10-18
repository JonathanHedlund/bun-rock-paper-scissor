import { GameStatus, type Game } from "../../../entities/gameEntity";
import type { GameRepository } from "../../contracts/gameRepository";

export const createGame = (gameRepository: GameRepository, name: string) => {
	const execute = async () => {
		const game: Game = {
			id: crypto.randomUUID(),
			status: GameStatus.PENDING_PLAYER,
			players: [{ name }],
		};
		console.log(game);
		await gameRepository.add(game);
		return game;
	};

	return {
		execute,
	};
};
