import { gameUseCases } from "../../application/use-cases";

import { AppError } from "../../shared/appError";
import { HttpStatusCode } from "../../shared/httpStatusCode";

import type { Request, Response, NextFunction } from "express";
import type { ProjectDependencies } from "../contracts/projectDependencies";
import type { JoinGameInput } from "../../application/use-cases/joinGame";
import type { MakeMoveInput } from "../../application/use-cases/makeMove";

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
		if (!req.body.name) {
			return next(new AppError(HttpStatusCode.BAD_REQUEST, "Name is required"));
		}
		if (!req.params.id) {
			return next(
				new AppError(HttpStatusCode.BAD_REQUEST, "Game id is required")
			);
		}
		try {
			const input: JoinGameInput = {
				id: req.params.id,
				name: req.body.name,
			};
			gameUseCases.joinGame(gameRepository, input);
			res.status(HttpStatusCode.NO_CONTENT).send();
		} catch (error) {
			return next(error);
		}
	};

	const makeMoveInGameById = (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		if (!req.body.name || !req.body.move) {
			return next(new AppError(HttpStatusCode.BAD_REQUEST, "Invalid input"));
		}
		if (!req.params.id) {
			return next(
				new AppError(HttpStatusCode.BAD_REQUEST, "Game id is required")
			);
		}
		try {
			const input: MakeMoveInput = {
				id: req.params.id,
				name: req.body.name,
				move: req.body.move,
			};
			gameUseCases.makeMove(gameRepository, input);
			res.status(HttpStatusCode.NO_CONTENT).send();
		} catch (error) {
			return next(error);
		}
	};

	const getGameById = (req: Request, res: Response, next: NextFunction) => {
		if (!req.params.id) {
			return next(
				new AppError(HttpStatusCode.BAD_REQUEST, "Game id is required")
			);
		}

		try {
			const game = gameUseCases.getGameById(gameRepository, req.params.id);
			res.status(HttpStatusCode.OK).json(game);
		} catch (error) {
			return next(error);
		}
	};

	return {
		getAllGames,
		createGame,
		joinGameById,
		makeMoveInGameById,
		getGameById,
	};
};
