import { createGame } from "./createGame";
import { getAllGames } from "./getAllGames";
import { getGameById } from "./getGameById";
import { joinGame } from "./joinGame";
import { makeMove } from "./makeMove";

export const gameUseCases = {
	createGame,
	getAllGames,
	getGameById,
	joinGame,
	makeMove,
};
