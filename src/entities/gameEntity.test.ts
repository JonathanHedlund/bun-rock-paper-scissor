import { beforeEach, describe, expect, test } from "bun:test";
import {
	GameStatus,
	Move,
	calculateWinner,
	canJoinGame,
	canMakeMove,
	determineGameStatus,
	isValidMove,
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
		test("Rock - Scissor, Rock wins", () => {
			game.players = [
				{ name: "player1", move: Move.ROCK },
				{ name: "player2", move: Move.SCISSOR },
			];
			const winner = calculateWinner(game.players);
			expect(winner).toBe(game.players[0]);
		});
		test("Paper - Scissor, Scissor wins", () => {
			game.players = [
				{ name: "player1", move: Move.PAPER },
				{ name: "player2", move: Move.SCISSOR },
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

	describe("canJoinGame", () => {
		const game: Game = {
			id: "123",
			status: GameStatus.PENDING_PLAYER,
			players: [],
		};

		beforeEach(() => {
			game.players = [{ name: "player1" }];
		});

		test("should be able to join game consisting of 1 player", () => {
			const playerName = "player2";
			expect(canJoinGame(game, playerName)).toBe(true);
		});
		test("should not be able to join game consisting of 2 players", () => {
			game.players.push({ name: "player2" });
			const playerName = "player3";
			expect(canJoinGame(game, playerName)).toBe(false);
		});
		test("should not be able to join a game if you are already in it", () => {
			const playerName = "player1";
			expect(canJoinGame(game, playerName)).toBe(false);
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

	describe("canMakeMove", () => {
		const game: Game = {
			id: "123",
			status: GameStatus.IN_PROGRESS,
			players: [],
		};

		beforeEach(() => {
			game.players = [{ name: "player1" }];
		});

		test("Should not be able to make move if only 1 player is in the game", () => {
			const playerName = "player1";
			expect(canMakeMove(game, playerName)).toBe(false);
		});
		test("Should not be able to make move if player is not in game", () => {
			game.players = [{ name: "player1" }, { name: "player2" }];
			const playerName = "player3";
			expect(canMakeMove(game, playerName)).toBe(false);
		});
		test("Should not be able to make move if player has already made a move", () => {
			game.players = [
				{ name: "player1", move: Move.ROCK },
				{ name: "player2" },
			];
			const playerName = "player1";
			expect(canMakeMove(game, playerName)).toBe(false);
		});
		test("Should be able to make move if player has not made a move", () => {
			game.players = [
				{ name: "player1", move: Move.ROCK },
				{ name: "player2" },
			];
			const playerName = "player2";
			expect(canMakeMove(game, playerName)).toBe(true);
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
			const move = Move.SCISSOR;
			expect(isValidMove(move)).toBe(true);
		});
		test("Should not allow player to play anything else", () => {
			const move = "invalid";
			expect(isValidMove(move)).toBe(false);
		});
	});
});
