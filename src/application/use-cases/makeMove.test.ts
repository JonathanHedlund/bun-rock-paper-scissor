import { afterEach, describe, expect, test } from "bun:test";

import { memoryDatabaseService } from "../../frameworks/database/memory/memoryDatabaseService";

import { gameUseCases } from ".";

import { AppError } from "../../shared/appError";
import { HttpStatusCode } from "../../shared/httpStatusCode";

import type { JoinGameDto } from "../dtos/joinGameDto";
import type { MakeMoveDto } from "../dtos/makeMoveDto";

describe("makeMove", () => {
	const { joinGame, createGame, makeMove, getGameById } = gameUseCases;

	let { gameRepository } = memoryDatabaseService();

	afterEach(() => {
		gameRepository = memoryDatabaseService().gameRepository;
	});
	test("should throw error if game does not exist", () => {
		const input: MakeMoveDto = {
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

		const input1: MakeMoveDto = {
			id: game.id,
			name: "Ted",
			move: "rock",
		};
		joinGame(gameRepository, input1);

		const input2: MakeMoveDto = {
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
		const input: MakeMoveDto = {
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

		const JoinGameDto: JoinGameDto = {
			id: game.id,
			name: "Ted",
		};
		joinGame(gameRepository, JoinGameDto);

		const MakeMoveDto: MakeMoveDto = {
			id: game.id,
			name: "John",
			move: "rock",
		};

		makeMove(gameRepository, MakeMoveDto);
		const updatedGame = getGameById(gameRepository, game.id);
		expect(updatedGame.players[0].move).toEqual("HIDDEN");
	});
	test("should not be able to make a move if you have already made a move", () => {
		const game = createGame(gameRepository, "Jonathan");

		const JoinGameDto: JoinGameDto = {
			id: game.id,
			name: "Ted",
		};
		joinGame(gameRepository, JoinGameDto);

		const MakeMoveDto: MakeMoveDto = {
			id: game.id,
			name: "Jonathan",
			move: "rock",
		};
		makeMove(gameRepository, MakeMoveDto);

		expect(() => makeMove(gameRepository, MakeMoveDto)).toThrow(
			new AppError(HttpStatusCode.FORBIDDEN, "You have already made a move")
		);
	});
	test("should add the winner to the game if game is finished", () => {
		const game = createGame(gameRepository, "Jonathan");

		const JoinGameDto: JoinGameDto = {
			id: game.id,
			name: "Ted",
		};
		joinGame(gameRepository, JoinGameDto);

		const MakeMoveDto1: MakeMoveDto = {
			id: game.id,
			name: "Jonathan",
			move: "rock",
		};
		const MakeMoveDto2: MakeMoveDto = {
			id: game.id,
			name: "Ted",
			move: "paper",
		};
		makeMove(gameRepository, MakeMoveDto1);
		makeMove(gameRepository, MakeMoveDto2);

		const updatedGame = getGameById(gameRepository, game.id);
		expect(updatedGame.winner).toEqual({ name: "Ted", move: "paper" });
	});
});
