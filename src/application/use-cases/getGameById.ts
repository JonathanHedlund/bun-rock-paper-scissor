import { AppError } from "../../shared/appError";
import { HttpStatusCode } from "../../shared/httpStatusCode";

import type { GameRepository } from "../contracts/gameRepository";

export const getGameById = async (
	gameRepository: GameRepository,
	id: string
) => {
	const game = gameRepository.findById(id);
	if (!game) {
		throw new AppError(HttpStatusCode.NOT_FOUND, "Game not found");
	}
	return game;
};
