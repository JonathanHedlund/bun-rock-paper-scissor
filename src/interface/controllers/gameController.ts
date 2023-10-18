import { ProjectDependencies } from "../contracts/projectDependencies";

import { createGame } from "../../application/use-cases/game/createGame";

export const gameController = (dependencies: ProjectDependencies) => {
	const { gameRepository } = dependencies.databaseService;

	const getAllGames = async () => {
		const games = await gameRepository.findAll();
		return games;
	};

	const createGame = async (req: Request, res: Response, next) => {};

	return {
		getAllGames,
	};
};
