import { GameStatus } from "../../entities/gameEntity";

import { AppError } from "../../shared/appError";
import { HttpStatusCode } from "../../shared/httpStatusCode";

import type { GameRepository } from "../contracts/gameRepository";
import { hideMoves } from "../utils/presentation";

export const getGameById = (gameRepository: GameRepository, id: string) => {
	if (!id) {
		throw new AppError(HttpStatusCode.BAD_REQUEST, "Game id is required");
	}

	const game = gameRepository.findById(id);
	if (!game) {
		throw new AppError(HttpStatusCode.NOT_FOUND, "Game not found");
	}

	const players =
		game.status === GameStatus.FINISHED
			? game.players
			: hideMoves(game.players);

	return {
		...game,
		players,
	};
};
