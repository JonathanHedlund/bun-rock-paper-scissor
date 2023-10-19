import { afterEach, describe, expect, test } from "bun:test";

import { memoryDatabaseService } from "../../frameworks/database/memory/memoryDatabaseService";

import { gameUseCases } from "./index";

import { AppError } from "../../shared/appError";
import { HttpStatusCode } from "../../shared/httpStatusCode";

import type { JoinGameInput } from "./joinGame";
import type { MakeMoveInput } from "./makeMove";

describe("getGameById", () => {
	const { createGame, getGameById, joinGame, makeMove } = gameUseCases;

	let { gameRepository } = memoryDatabaseService();

	afterEach(() => {
		gameRepository = memoryDatabaseService().gameRepository;
	});

	test("should return a game by id", () => {
		const game = createGame(gameRepository, "John");
		const foundGame = getGameById(gameRepository, game.id);
		expect(foundGame).toEqual(game);
	});

	test("should throw an error if game is not found", () => {
		expect(() => getGameById(gameRepository, "123")).toThrow(
			new AppError(HttpStatusCode.NOT_FOUND, "Game not found")
		);
	});

	test("should hide moves if game is not finished", () => {
		const game = createGame(gameRepository, "John");

		const joinGameInput: JoinGameInput = {
			id: game.id,
			name: "Ted",
		};
		joinGame(gameRepository, joinGameInput);

		const makeMoveInput: MakeMoveInput = {
			id: game.id,
			name: "John",
			move: "rock",
		};
		makeMove(gameRepository, makeMoveInput);

		const foundGame = getGameById(gameRepository, game.id);
		expect(foundGame.players[0].move).toEqual("HIDDEN");
	});

	test("should not hide moves if game is finished", () => {
		const game = createGame(gameRepository, "Jonathan");

		const joinGameInput: JoinGameInput = {
			id: game.id,
			name: "Ted",
		};
		joinGame(gameRepository, joinGameInput);

		const makeMoveInput1: MakeMoveInput = {
			id: game.id,
			name: "Jonathan",
			move: "rock",
		};
		const makeMoveInput2: MakeMoveInput = {
			id: game.id,
			name: "Ted",
			move: "paper",
		};
		makeMove(gameRepository, makeMoveInput1);
		makeMove(gameRepository, makeMoveInput2);

		const foundGame = getGameById(gameRepository, game.id);
		expect(foundGame.players).toEqual([
			{
				move: "rock",
				name: "Jonathan",
			},
			{
				move: "paper",
				name: "Ted",
			},
		]);
	});
});
