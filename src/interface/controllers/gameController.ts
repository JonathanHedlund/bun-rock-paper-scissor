import { gameUseCases } from "../../application/use-cases";

import { HttpStatusCode } from "../../shared/httpStatusCode";

import type { Request, Response, NextFunction } from "express";
import type { ProjectDependencies } from "../contracts/projectDependencies";
import type { JoinGameDto } from "../../application/dtos/joinGameDto";
import type { MakeMoveDto } from "../../application/dtos/makeMoveDto";

export const gameController = (dependencies: ProjectDependencies) => {
	const { gameRepository } = dependencies.databaseService;

	const getAllGames = (_req: Request, res: Response, _next: NextFunction) => {
		const games = gameRepository.findAll();
		return res.status(HttpStatusCode.OK).json(games);
	};

	const createGame = (req: Request, res: Response, next: NextFunction) => {
		try {
			const game = gameUseCases.createGame(gameRepository, req.body.name);
			res.status(HttpStatusCode.CREATED).json(game);
		} catch (error) {
			return next(error);
		}
	};

	const joinGame = (req: Request, res: Response, next: NextFunction) => {
		try {
			const input: JoinGameDto = {
				id: req.params.id,
				name: req.body.name,
			};
			gameUseCases.joinGame(gameRepository, input);
			res.status(HttpStatusCode.NO_CONTENT).send();
		} catch (error) {
			return next(error);
		}
	};

	const makeMove = (req: Request, res: Response, next: NextFunction) => {
		try {
			const input: MakeMoveDto = {
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
		joinGame,
		makeMove,
		getGameById,
	};
};
