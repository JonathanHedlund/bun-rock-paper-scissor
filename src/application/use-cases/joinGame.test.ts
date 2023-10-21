import { afterEach, describe, expect, test } from "bun:test";

import { memoryDatabaseService } from "../../frameworks/database/memory/memoryDatabaseService";

import { gameUseCases } from ".";

import { AppError } from "../../shared/appError";
import { HttpStatusCode } from "../../shared/httpStatusCode";

import type { JoinGameDto } from "../dtos/joinGameDto";
import type { MakeMoveDto } from "../dtos/makeMoveDto";

describe("joinGame", () => {
	const { joinGame, createGame, makeMove, getGameById } = gameUseCases;

	let { gameRepository } = memoryDatabaseService();

	afterEach(() => {
		gameRepository = memoryDatabaseService().gameRepository;
	});

	test("should throw error if game does not exist", () => {
		const input: JoinGameDto = {
			id: "123",
			name: "Ted",
		};
		expect(() => joinGame(gameRepository, input)).toThrow(
			new AppError(HttpStatusCode.NOT_FOUND, "Game not found")
		);
	});
	test("should throw error if you are already in the game", () => {
		const game = createGame(gameRepository, "Ted");
		const input: JoinGameDto = {
			id: game.id,
			name: "Ted",
		};
		expect(() => joinGame(gameRepository, input)).toThrow(
			new AppError(HttpStatusCode.FORBIDDEN, "You are already in the game")
		);
	});
	test("should not be able to join game if game is full", () => {
		const game = createGame(gameRepository, "Ted");
		const input1: JoinGameDto = {
			id: game.id,
			name: "John",
		};
		const input2: JoinGameDto = {
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

		const input1: JoinGameDto = {
			id: game.id,
			name: "Jonathan",
		};
		joinGame(gameRepository, input1);

		const MakeMoveDto1: MakeMoveDto = {
			id: game.id,
			name: "Ted",
			move: "rock",
		};
		const MakeMoveDto2: MakeMoveDto = {
			id: game.id,
			name: "Jonathan",
			move: "paper",
		};
		makeMove(gameRepository, MakeMoveDto1);
		makeMove(gameRepository, MakeMoveDto2);

		const input2: JoinGameDto = {
			id: game.id,
			name: "John",
		};

		expect(() => joinGame(gameRepository, input2)).toThrow(
			new AppError(HttpStatusCode.FORBIDDEN, "Unable to join game")
		);
	});
	test("should be able to join if game is pending player", () => {
		const game = createGame(gameRepository, "Ted");
		const input: JoinGameDto = {
			id: game.id,
			name: "Jonathan",
		};
		joinGame(gameRepository, input);
		const updatedGame = getGameById(gameRepository, game.id);
		expect(updatedGame.players[1].name).toEqual("Jonathan");
	});
});
