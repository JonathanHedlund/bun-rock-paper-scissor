import type { GameRepository } from "../contracts/gameRepository";

export const getAllGames = (gameRespository: GameRepository) => {
	const games = gameRespository.findAll();
	return games;
};
