import {
	GameStatus,
	determineGameStatus,
	isPlayerInGame,
} from "../../entities/gameEntity";
import { AppError } from "../../shared/appError";
import { HttpStatusCode } from "../../shared/httpStatusCode";

import type { GameRepository } from "../contracts/gameRepository";
import type { JoinGameByIdDto } from "../dtos/joinGameByIdDto";

export const joinGame = (
	gameRepository: GameRepository,
	input: JoinGameByIdDto
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
