import { afterEach, describe, expect, test } from "bun:test";

import { memoryDatabaseService } from "../../frameworks/database/memory/memoryDatabaseService";

import { gameUseCases } from ".";

import { AppError } from "../../shared/appError";
import { HttpStatusCode } from "../../shared/httpStatusCode";

import type { JoinGameInput } from "./joinGame";
import type { MakeMoveInput } from "./makeMove";

describe("makeMove", () => {
	const { joinGame, createGame, makeMove, getGameById } = gameUseCases;

	let { gameRepository } = memoryDatabaseService();

	afterEach(() => {
		gameRepository = memoryDatabaseService().gameRepository;
	});
	test("should throw error if game does not exist", () => {
		const input: MakeMoveInput = {
			id: "123",
			name: "Ted",
			move: "rock",
		};
		expect(() => makeMove(gameRepository, input)).toThrow(
			new AppError(HttpStatusCode.NOT_FOUND, "Game not found")
		);
	});
	test("should throw error if you are not in the game", () => {
		const game = createGame(gameRepository, "John");

		const input1: MakeMoveInput = {
			id: game.id,
			name: "Ted",
			move: "rock",
		};
		joinGame(gameRepository, input1);

		const input2: MakeMoveInput = {
			id: game.id,
			name: "Jonathan",
			move: "rock",
		};
		expect(() => makeMove(gameRepository, input2)).toThrow(
			new AppError(HttpStatusCode.FORBIDDEN, "You are not in the game")
		);
	});
	test("should throw error if there is no opponent", () => {
		const game = createGame(gameRepository, "Ted");
		const input: MakeMoveInput = {
			id: game.id,
			name: "Ted",
			move: "rock",
		};
		expect(() => makeMove(gameRepository, input)).toThrow(
			new AppError(HttpStatusCode.FORBIDDEN, "Waiting for opponent")
		);
	});
	test("should be able to make a move if you are in the game", () => {
		console.log("hej");
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
		const updatedGame = getGameById(gameRepository, game.id);
		expect(updatedGame.players[0].move).toEqual("HIDDEN");
	});
	test("should not be able to make a move if you have already made a move", () => {
		const game = createGame(gameRepository, "Jonathan");

		const joinGameInput: JoinGameInput = {
			id: game.id,
			name: "Ted",
		};
		joinGame(gameRepository, joinGameInput);

		const makeMoveInput: MakeMoveInput = {
			id: game.id,
			name: "Jonathan",
			move: "rock",
		};
		makeMove(gameRepository, makeMoveInput);

		expect(() => makeMove(gameRepository, makeMoveInput)).toThrow(
			new AppError(HttpStatusCode.FORBIDDEN, "You have already made a move")
		);
	});
	test("should add the winner to the game if game is finished", () => {
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

		const updatedGame = getGameById(gameRepository, game.id);
		expect(updatedGame.winner).toEqual({ name: "Ted", move: "paper" });
	});
});
