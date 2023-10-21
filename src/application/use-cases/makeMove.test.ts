import { afterEach, describe, expect, test } from "bun:test";

import { memoryDatabaseService } from "../../frameworks/database/memory/memoryDatabaseService";

import { gameUseCases } from ".";

import { AppError } from "../../shared/appError";
import { HttpStatusCode } from "../../shared/httpStatusCode";

import type { JoinGameByIdDto } from "../dtos/joinGameByIdDto";
import type { MakeMoveInGameByIdDto } from "../dtos/makeMoveInGameByIdDto";

describe("makeMove", () => {
	const { joinGame, createGame, makeMove, getGameById } = gameUseCases;

	let { gameRepository } = memoryDatabaseService();

	afterEach(() => {
		gameRepository = memoryDatabaseService().gameRepository;
	});
	test("should throw error if game does not exist", () => {
		const input: MakeMoveInGameByIdDto = {
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

		const input1: MakeMoveInGameByIdDto = {
			id: game.id,
			name: "Ted",
			move: "rock",
		};
		joinGame(gameRepository, input1);

		const input2: MakeMoveInGameByIdDto = {
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
		const input: MakeMoveInGameByIdDto = {
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

		const JoinGameByIdDto: JoinGameByIdDto = {
			id: game.id,
			name: "Ted",
		};
		joinGame(gameRepository, JoinGameByIdDto);

		const MakeMoveInGameByIdDto: MakeMoveInGameByIdDto = {
			id: game.id,
			name: "John",
			move: "rock",
		};

		makeMove(gameRepository, MakeMoveInGameByIdDto);
		const updatedGame = getGameById(gameRepository, game.id);
		expect(updatedGame.players[0].move).toEqual("HIDDEN");
	});
	test("should not be able to make a move if you have already made a move", () => {
		const game = createGame(gameRepository, "Jonathan");

		const JoinGameByIdDto: JoinGameByIdDto = {
			id: game.id,
			name: "Ted",
		};
		joinGame(gameRepository, JoinGameByIdDto);

		const MakeMoveInGameByIdDto: MakeMoveInGameByIdDto = {
			id: game.id,
			name: "Jonathan",
			move: "rock",
		};
		makeMove(gameRepository, MakeMoveInGameByIdDto);

		expect(() => makeMove(gameRepository, MakeMoveInGameByIdDto)).toThrow(
			new AppError(HttpStatusCode.FORBIDDEN, "You have already made a move")
		);
	});
	test("should add the winner to the game if game is finished", () => {
		const game = createGame(gameRepository, "Jonathan");

		const JoinGameByIdDto: JoinGameByIdDto = {
			id: game.id,
			name: "Ted",
		};
		joinGame(gameRepository, JoinGameByIdDto);

		const MakeMoveInGameByIdDto1: MakeMoveInGameByIdDto = {
			id: game.id,
			name: "Jonathan",
			move: "rock",
		};
		const MakeMoveInGameByIdDto2: MakeMoveInGameByIdDto = {
			id: game.id,
			name: "Ted",
			move: "paper",
		};
		makeMove(gameRepository, MakeMoveInGameByIdDto1);
		makeMove(gameRepository, MakeMoveInGameByIdDto2);

		const updatedGame = getGameById(gameRepository, game.id);
		expect(updatedGame.winner).toEqual({ name: "Ted", move: "paper" });
	});
});
