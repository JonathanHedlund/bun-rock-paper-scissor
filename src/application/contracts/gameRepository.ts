import type { Game } from "../../entities/gameEntity";

export type GameRepository = {
	findAll: () => Game[];
	findById: (id: string) => Game | null;
	add: (game: Game) => void;
	updateById: (id: string, game: Game) => void;
	remove: (id: string) => void;
};
