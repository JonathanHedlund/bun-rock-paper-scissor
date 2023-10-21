import { GameStatus } from "../../entities/gameEntity";

import { AppError } from "../../shared/appError";
import { HttpStatusCode } from "../../shared/httpStatusCode";
import { hideMoves } from "../utils/presentation";

import type { GameRepository } from "../contracts/gameRepository";

export const getGameById = (gameRepository: GameRepository, id: string) => {
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
