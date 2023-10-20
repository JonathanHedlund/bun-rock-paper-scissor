import Joi from "joi";
import { GameStatus } from "../../entities/gameEntity";

import { AppError } from "../../shared/appError";
import { HttpStatusCode } from "../../shared/httpStatusCode";

import type { GameRepository } from "../contracts/gameRepository";
import { hideMoves } from "../utils/presentation";

export const getGameByIdParamsSchema = Joi.object({
	id: Joi.string().required(),
});

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
