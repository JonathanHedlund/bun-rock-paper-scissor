import { beforeEach, describe, expect, test } from "bun:test";
import {
	GameStatus,
	Move,
	calculateWinner,
	determineGameStatus,
	isValidMove,
	isGameFull,
	isPlayerInGame,
	hasAlreadyMadeMove,
} from "./gameEntity";

import type { Game } from "./gameEntity";

describe("Game", () => {
	describe("calculateWinner", () => {
		const game: Game = {
			id: "123",
			status: GameStatus.FINISHED,
			players: [],
		};
		beforeEach(() => {
			game.players = [];
		});
		test("Rock - Paper, Paper wins", () => {
			game.players = [
				{ name: "player1", move: Move.ROCK },
				{ name: "player2", move: Move.PAPER },
			];
			const winner = calculateWinner(game.players);
			expect(winner).toBe(game.players[1]);
		});
		test("Rock - Scissors, Rock wins", () => {
			game.players = [
				{ name: "player1", move: Move.ROCK },
				{ name: "player2", move: Move.SCISSORS },
			];
			const winner = calculateWinner(game.players);
			expect(winner).toBe(game.players[0]);
		});
		test("Paper - Scissors, Scissors wins", () => {
			game.players = [
				{ name: "player1", move: Move.PAPER },
				{ name: "player2", move: Move.SCISSORS },
			];
			const winner = calculateWinner(game.players);
			expect(winner).toBe(game.players[1]);
		});
		test("Rock - Rock, no winner", () => {
			game.players = [
				{ name: "player1", move: Move.ROCK },
				{ name: "player2", move: Move.ROCK },
			];
			const winner = calculateWinner(game.players);
			expect(winner).toBe(null);
		});
	});

	describe("isGameFull", () => {
		const game: Game = {
			id: "123",
			status: GameStatus.PENDING_PLAYER,
			players: [],
		};

		beforeEach(() => {
			game.players = [{ name: "player1" }];
		});

		test("should return false if there is only 1 player", () => {
			expect(isGameFull(game)).toBe(false);
		});
		test("should return true if there are 2 players", () => {
			game.players.push({ name: "player2" });
			expect(isGameFull(game)).toBe(true);
		});
	});

	describe("isPlayerInGame", () => {
		const game: Game = {
			id: "123",
			status: GameStatus.PENDING_PLAYER,
			players: [{ name: "player1" }],
		};

		test("should return true if player is in game", () => {
			const playerName = "player1";
			expect(isPlayerInGame(game, playerName)).toBe(true);
		});
		test("should return false if player is not in game", () => {
			const playerName = "player2";
			expect(isPlayerInGame(game, playerName)).toBe(false);
		});
	});

	describe("hasAlreadyMadeMove", () => {
		const game: Game = {
			id: "123",
			status: GameStatus.PENDING_PLAYER,
			players: [{ name: "player1" }],
		};

		test("should return false if player has not made a move", () => {
			const playerName = "player1";
			expect(hasAlreadyMadeMove(game, playerName)).toBe(false);
		});
		test("should return true if player has made a move", () => {
			game.players[0].move = Move.ROCK;
			const playerName = "player1";
			expect(hasAlreadyMadeMove(game, playerName)).toBe(true);
		});
	});

	describe("determineGameStatus", () => {
		test("Should return pending player if there is only 1 player", () => {
			const game: Game = {
				id: "123",
				status: GameStatus.PENDING_PLAYER,
				players: [{ name: "player1" }],
			};
			expect(determineGameStatus(game)).toBe(GameStatus.PENDING_PLAYER);
		});
		test("Should return in progress if there are 2 players but no moves", () => {
			const game: Game = {
				id: "123",
				status: GameStatus.PENDING_PLAYER,
				players: [{ name: "player1" }, { name: "player2" }],
			};
			expect(determineGameStatus(game)).toBe(GameStatus.IN_PROGRESS);
		});
		test("Should return in progress if there are 2 players and only 1 player has made their move", () => {
			const game: Game = {
				id: "123",
				status: GameStatus.IN_PROGRESS,
				players: [{ name: "player1", move: Move.ROCK }, { name: "player2" }],
			};
			expect(determineGameStatus(game)).toBe(GameStatus.IN_PROGRESS);
		});
		test("Should return finished if there are 2 players and both have made their move", () => {
			const game: Game = {
				id: "123",
				status: GameStatus.IN_PROGRESS,
				players: [
					{ name: "player1", move: Move.ROCK },
					{ name: "player2", move: Move.PAPER },
				],
			};
			expect(determineGameStatus(game)).toBe(GameStatus.FINISHED);
		});
	});

	describe("isValidMove", () => {
		test("Should allow player to play rock", () => {
			const move = Move.ROCK;
			expect(isValidMove(move)).toBe(true);
		});
		test("Should allow player to play paper", () => {
			const move = Move.PAPER;
			expect(isValidMove(move)).toBe(true);
		});
		test("Should allow player to play scissor", () => {
			const move = Move.SCISSORS;
			expect(isValidMove(move)).toBe(true);
		});
		test("Should not allow player to play anything else", () => {
			const move = "invalid";
			expect(isValidMove(move)).toBe(false);
		});
	});
});
