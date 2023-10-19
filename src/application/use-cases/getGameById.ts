import { GameStatus } from "../../entities/gameEntity";
import { AppError } from "../../shared/appError";
import { HttpStatusCode } from "../../shared/httpStatusCode";

import type { GameRepository } from "../contracts/gameRepository";

export const getGameById = (gameRepository: GameRepository, id: string) => {
	const game = gameRepository.findById(id);
	if (!game) {
		throw new AppError(HttpStatusCode.NOT_FOUND, "Game not found");
	}

	const players = game.players.map((player) => {
		return {
			name: player.name,
			move: player.move,
		};
	});

	if (game.status !== GameStatus.FINISHED) {
		players.map((player) => {
			if (player.move) {
				player.move = "HIDDEN";
			}
		});
	}
	return {
		...game,
		players,
	};
};
