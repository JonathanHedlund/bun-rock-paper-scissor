import type { Game } from "../../../entities/gameEntity";
import type { GameRepository } from "../../../application/contracts/gameRepository";

export function memoryGameRepository(): GameRepository {
	const games: Game[] = [];

	const findAll = () => {
		return games;
	};
	const findById = (id: string) => {
		const game = games.find((game) => game.id === id);
		return game || null;
	};
	const add = (game: Game) => {
		games.push(game);
	};
	const updateById = (id: string, game: Game) => {
		const index = games.findIndex((game) => game.id === id);
		games[index] = game;
	};
	const remove = (id: string) => {
		const index = games.findIndex((game) => game.id === id);
		games.splice(index, 1);
	};
	return {
		findAll,
		findById,
		add,
		updateById,
		remove,
	};
}
