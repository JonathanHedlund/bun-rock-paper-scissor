import Joi from "joi";

import {
	GameStatus,
	determineGameStatus,
	isPlayerInGame,
} from "../../entities/gameEntity";
import { AppError } from "../../shared/appError";
import { HttpStatusCode } from "../../shared/httpStatusCode";

import type { GameRepository } from "../contracts/gameRepository";

export type JoinGameInput = {
	id: string;
	name: string;
};

export const joinGameBodySchema = Joi.object({
	name: Joi.string().max(30).min(3).required(),
});

export const joinGameParamsSchema = Joi.object({
	id: Joi.string().required(),
});

export const joinGame = (
	gameRepository: GameRepository,
	input: JoinGameInput
) => {
	const game = gameRepository.findById(input.id);

	if (!game) {
		throw new AppError(HttpStatusCode.NOT_FOUND, "Game not found");
	}

	if (isPlayerInGame(game, input.name)) {
		throw new AppError(HttpStatusCode.FORBIDDEN, "You are already in the game");
	}

	if (game.status !== GameStatus.PENDING_PLAYER) {
		throw new AppError(HttpStatusCode.FORBIDDEN, "Unable to join game");
	}

	game.players.push({ name: input.name });

	const currentGameStatus = determineGameStatus(game);
	game.status = currentGameStatus;

	gameRepository.updateById(input.id, game);
};
