import { Game } from "../../entities/gameEntity";

export type GameRepository = {
	findAll: () => Promise<Game[]> | Game[];
	findById: (id: string) => Promise<Game | null> | Game | null;
	add: (game: Game) => Promise<void> | void;
	updateById: (id: string, game: Game) => Promise<void> | void;
	remove: (id: string) => Promise<void> | void;
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
