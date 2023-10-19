import { afterEach, describe, expect, test } from "bun:test";

import { memoryDatabaseService } from "../../frameworks/database/memory/memoryDatabaseService";
import { createGame } from "./createGame";
import { GameStatus, type Game } from "../../entities/gameEntity";
import { AppError } from "../../shared/appError";
import { HttpStatusCode } from "../../shared/httpStatusCode";

describe("createGame using in memory database", () => {
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

	test("should throw an error if name is too long", () => {
		expect(() => createGame(gameRepository, "A".repeat(31))).toThrow(
			new AppError(
				HttpStatusCode.BAD_REQUEST,
				"Name must be less than 30 characters"
			)
		);
	});
});
