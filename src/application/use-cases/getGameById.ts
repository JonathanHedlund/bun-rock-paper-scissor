import { GameStatus } from "../../entities/gameEntity";
import { AppError } from "../../shared/appError";
import { HttpStatusCode } from "../../shared/httpStatusCode";

import type { GameRepository } from "../contracts/gameRepository";

export const getGameById = (gameRepository: GameRepository, id: string) => {
	const game = gameRepository.findById(id);
	if (!game) {
		throw new AppError(HttpStatusCode.NOT_FOUND, "Game not found");
	}
	if (game.status !== GameStatus.FINISHED) {
		game.players.map((player) => {
			if (player.move) {
				player.move = "HIDDEN";
			}
		});
	}
	return game;
};
