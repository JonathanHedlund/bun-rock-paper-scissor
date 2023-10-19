import { gameUseCases } from "../../application/use-cases";

import { AppError } from "../../shared/appError";
import { HttpStatusCode } from "../../shared/httpStatusCode";

import type { Request, Response, NextFunction } from "express";
import type { ProjectDependencies } from "../contracts/projectDependencies";

export const gameController = (dependencies: ProjectDependencies) => {
	const { gameRepository } = dependencies.databaseService;

	const getAllGames = (req: Request, res: Response, next: NextFunction) => {
		const games = gameRepository.findAll();
		return res.status(HttpStatusCode.OK).json(games);
	};

	const createGame = (req: Request, res: Response, next: NextFunction) => {
		if (!req.body.name) {
			return next(new AppError(HttpStatusCode.BAD_REQUEST, "Name is required"));
		}
		try {
			const game = gameUseCases.createGame(gameRepository, req.body.name);
			res.status(HttpStatusCode.CREATED).json(game);
		} catch (error) {
			return next(error);
		}
	};

	const joinGameById = (req: Request, res: Response, next: NextFunction) => {
		return next(
			new AppError(HttpStatusCode.NOT_IMPLEMENTED, "Not implemented")
		);
	};

	const makeMoveInGameById = (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		return next(
			new AppError(HttpStatusCode.NOT_IMPLEMENTED, "Not implemented")
		);
	};

	const getGameById = (req: Request, res: Response, next: NextFunction) => {
		return next(
			new AppError(HttpStatusCode.NOT_IMPLEMENTED, "Not implemented")
		);
	};

	return {
		getAllGames,
		createGame,
		joinGameById,
		makeMoveInGameById,
		getGameById,
	};
};
