import type { GameRepository } from "../../../application/contracts/gameRepository";
import { Game, GameStatus } from "../../../entities/gameEntity";

const games: Game[] = [
	{
		id: "1",
		status: GameStatus.PENDING_PLAYER,
		players: [{ name: "player1" }],
	},
];

export function gameRepositoryMemory(): GameRepository {
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
