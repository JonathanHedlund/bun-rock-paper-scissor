import { afterEach, describe, expect, test } from "bun:test";

import { memoryDatabaseService } from "../../frameworks/database/memory/memoryDatabaseService";

import { gameUseCases } from ".";
import { GameStatus } from "../../entities/gameEntity";

import type { Game } from "../../entities/gameEntity";

describe("createGame using in memory database", () => {
	const { createGame } = gameUseCases;

	let { gameRepository } = memoryDatabaseService();

	afterEach(() => {
		gameRepository = memoryDatabaseService().gameRepository;
	});

	test("should create a game", () => {
		const game = createGame(gameRepository, "John");
		const expectedGame: Game = {
			id: game.id,
			status: GameStatus.PENDING_PLAYER,
			players: [{ name: "John" }],
		};
		expect(game).toEqual(expectedGame);
	});
});
