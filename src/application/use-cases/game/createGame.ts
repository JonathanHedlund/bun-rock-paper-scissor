import { GameStatus } from "../../../entities/gameEntity";

import { AppError } from "../../../shared/appError";
import { HttpStatusCode } from "../../../shared/httpStatusCode";

import type { Game } from "../../../entities/gameEntity";
import type { GameRepository } from "../../contracts/gameRepository";

export const createGame = (gameRepository: GameRepository, name: string) => {
	if (name.length > 30) {
		throw new AppError(
			HttpStatusCode.BAD_REQUEST,
			"Name must be less than 30 characters"
		);
	}

	const game: Game = {
		id: crypto.randomUUID(),
		status: GameStatus.PENDING_PLAYER,
		players: [{ name }],
	};
	gameRepository.add(game);
	return game;
};
