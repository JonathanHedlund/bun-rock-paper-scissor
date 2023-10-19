import Joi from "joi";
import {
	GameStatus,
	Move,
	calculateWinner,
	canMakeMove,
	determineGameStatus,
	isValidMove,
} from "../../entities/gameEntity";

import { AppError } from "../../shared/appError";
import { HttpStatusCode } from "../../shared/httpStatusCode";

import type { GameRepository } from "../contracts/gameRepository";

export const makeMoveSchema = Joi.object({
	id: Joi.string().required(),
	name: Joi.string().max(30).min(30).required(),
	move: Joi.string().required(),
});

export type MakeMoveInput = {
	id: string;
	name: string;
	move: string;
};

export const makeMove = (
	gameRepository: GameRepository,
	input: MakeMoveInput
) => {
	const game = gameRepository.findById(input.id);

	if (!game) {
		throw new AppError(HttpStatusCode.NOT_FOUND, "Game not found");
	}
	if (game.status === GameStatus.PENDING_PLAYER) {
		throw new AppError(HttpStatusCode.FORBIDDEN, "Waiting for opponent");
	}
	if (!canMakeMove(game, input.name)) {
		throw new AppError(HttpStatusCode.FORBIDDEN, "You cannot make a move");
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
