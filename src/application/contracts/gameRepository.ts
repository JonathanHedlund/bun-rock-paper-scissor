import type { Game } from "../../entities/gameEntity";

export type GameRepository = {
	findAll: () => Game[];
	findById: (id: string) => Game | null;
	add: (game: Game) => void;
	updateById: (id: string, game: Game) => void;
	remove: (id: string) => void;
};

export default function gameRespository(repository: GameRepository) {
	const findAll = () => repository.findAll();
	const findById = (id: string) => repository.findById(id);
	const add = (game: Game) => repository.add(game);
	const updateById = (id: string, game: Game) =>
		repository.updateById(id, game);
	const remove = (id: string) => repository.remove(id);

	return {
		findAll,
		findById,
		add,
		updateById,
		remove,
	};
}
