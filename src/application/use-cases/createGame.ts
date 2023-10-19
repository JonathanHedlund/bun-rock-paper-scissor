import Joi from "joi";

import { GameStatus } from "../../entities/gameEntity";

import type { Game } from "../../entities/gameEntity";
import type { GameRepository } from "../contracts/gameRepository";

export const createGameSchema = Joi.object({
	name: Joi.string().max(30).min(30).required(),
});

export const createGame = (gameRepository: GameRepository, name: string) => {
	createGameSchema.validate({ name });

	const game: Game = {
		id: crypto.randomUUID(),
		status: GameStatus.PENDING_PLAYER,
		players: [{ name }],
	};
	gameRepository.add(game);
	return game;
};
