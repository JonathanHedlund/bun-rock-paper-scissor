import {
	GameStatus,
	Move,
	calculateWinner,
	determineGameStatus,
	hasAlreadyMadeMove,
	isPlayerInGame,
	isValidMove,
} from "../../entities/gameEntity";

import { AppError } from "../../shared/appError";
import { HttpStatusCode } from "../../shared/httpStatusCode";

import type { GameRepository } from "../contracts/gameRepository";
import type { MakeMoveInGameByIdDto } from "../dtos/makeMoveInGameByIdDto";

export const makeMove = (
	gameRepository: GameRepository,
	input: MakeMoveInGameByIdDto
) => {
	const game = gameRepository.findById(input.id);

	if (!game) {
		throw new AppError(HttpStatusCode.NOT_FOUND, "Game not found");
	}

	if (game.status === GameStatus.PENDING_PLAYER) {
		throw new AppError(HttpStatusCode.FORBIDDEN, "Waiting for opponent");
	}

	if (!isPlayerInGame(game, input.name)) {
		throw new AppError(HttpStatusCode.FORBIDDEN, "You are not in the game");
	}

	if (hasAlreadyMadeMove(game, input.name)) {
		throw new AppError(
			HttpStatusCode.FORBIDDEN,
			"You have already made a move"
		);
	}

	if (!isValidMove(input.move)) {
		throw new AppError(HttpStatusCode.BAD_REQUEST, "Invalid move");
	}

	game.players.forEach((player) => {
		if (player.name === input.name) {
			player.move = input.move as Move;
		}
	});

	const currentGameStatus = determineGameStatus(game);
	game.status = currentGameStatus;

	if (game.status === GameStatus.FINISHED) {
		const winner = calculateWinner(game.players);
		if (winner) {
			game.winner = winner;
		}
	}

	gameRepository.updateById(input.id, game);
};
