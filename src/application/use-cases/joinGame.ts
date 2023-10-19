import { canJoinGame, determineGameStatus } from "../../entities/gameEntity";
import { AppError } from "../../shared/appError";
import { HttpStatusCode } from "../../shared/httpStatusCode";

import type { GameRepository } from "../contracts/gameRepository";

export type JoinGameInput = {
	id: string;
	name: string;
};

export const joinGame = (
	gameRepository: GameRepository,
	input: JoinGameInput
) => {
	if (!input.name) {
		throw new AppError(HttpStatusCode.BAD_REQUEST, "Name is required");
	}
	if (!input.id) {
		throw new AppError(HttpStatusCode.BAD_REQUEST, "Game id is required");
	}
	const game = gameRepository.findById(input.id);
	if (!game) {
		throw new AppError(HttpStatusCode.NOT_FOUND, "Game not found");
	}
	if (!canJoinGame(game, input.name)) {
		throw new AppError(HttpStatusCode.FORBIDDEN, "Unable to join game");
	}
	game.players.push({ name: input.name });

	const currentGameStatus = determineGameStatus(game);
	game.status = currentGameStatus;

	gameRepository.updateById(input.id, game);
};
