import { afterEach, describe, expect, test } from "bun:test";

import { GameStatus } from "../../entities/gameEntity";

import { gameUseCases } from ".";

import { memoryDatabaseService } from "../../frameworks/database/memory/memoryDatabaseService";

import type { Game } from "../../entities/gameEntity";

describe("getAllGames", () => {
	const { getAllGames } = gameUseCases;
	let { gameRepository } = memoryDatabaseService();

	afterEach(() => {
		gameRepository = memoryDatabaseService().gameRepository;
	});
	test("should return all games", () => {
		const game1: Game = {
			id: "1",
			status: GameStatus.PENDING_PLAYER,
			players: [{ name: "Jonathan" }],
		};
		const game2: Game = {
			id: "2",
			status: GameStatus.PENDING_PLAYER,
			players: [{ name: "Ted" }],
		};
		gameRepository.add(game1);
		gameRepository.add(game2);

		const games = getAllGames(gameRepository);
		expect(games).toEqual([game1, game2]);
	});
});
