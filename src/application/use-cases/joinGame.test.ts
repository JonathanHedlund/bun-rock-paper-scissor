import { afterEach, describe, expect, test } from "bun:test";

import { memoryDatabaseService } from "../../frameworks/database/memory/memoryDatabaseService";
import { createGame } from "./createGame";

import { AppError } from "../../shared/appError";
import { HttpStatusCode } from "../../shared/httpStatusCode";
import { getGameById } from "./getGameById";
import { makeMove, type MakeMoveInput } from "./makeMove";
import { joinGame, type JoinGameInput } from "./joinGame";

describe("joinGame", () => {
	let { gameRepository } = memoryDatabaseService();

	afterEach(() => {
		gameRepository = memoryDatabaseService().gameRepository;
	});

	test("should throw error if game does not exist", () => {
		const input: JoinGameInput = {
			id: "123",
			name: "Ted",
		};
		expect(() => joinGame(gameRepository, input)).toThrow(
			new AppError(HttpStatusCode.NOT_FOUND, "Game not found")
		);
	});
	test("should throw error if you are already in the game", () => {
		const game = createGame(gameRepository, "Ted");
		const input: JoinGameInput = {
			id: game.id,
			name: "Ted",
		};
		expect(() => joinGame(gameRepository, input)).toThrow(
			new AppError(HttpStatusCode.FORBIDDEN, "Unable to join game")
		);
	});
	test("should not be able to join game if game is full", () => {
		const game = createGame(gameRepository, "Ted");
		const input1: JoinGameInput = {
			id: game.id,
			name: "John",
		};
		const input2: JoinGameInput = {
			id: game.id,
			name: "Jonathan",
		};
		joinGame(gameRepository, input1);
		expect(() => joinGame(gameRepository, input2)).toThrow(
			new AppError(HttpStatusCode.FORBIDDEN, "Unable to join game")
		);
	});
	test("should not be able to join if game is finished", () => {
		const game = createGame(gameRepository, "Ted");

		const input: JoinGameInput = {
			id: game.id,
			name: "Jonathan",
		};
		joinGame(gameRepository, input);
		const makeMoveInput1: MakeMoveInput = {
			id: game.id,
			name: "Ted",
			move: "rock",
		};
		const makeMoveInput2: MakeMoveInput = {
			id: game.id,
			name: "Jonathan",
			move: "paper",
		};
		makeMove(gameRepository, makeMoveInput1);
		makeMove(gameRepository, makeMoveInput2);

		expect(() => joinGame(gameRepository, input)).toThrow(
			new AppError(HttpStatusCode.FORBIDDEN, "Unable to join game")
		);
	});
	test("should be able to join if game is pending player", () => {
		const game = createGame(gameRepository, "Ted");
		const input: JoinGameInput = {
			id: game.id,
			name: "Jonathan",
		};
		joinGame(gameRepository, input);
		const updatedGame = getGameById(gameRepository, game.id);
		expect(updatedGame.players[1].name).toEqual("Jonathan");
	});
});
