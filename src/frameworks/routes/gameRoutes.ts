import express from "express";

import { gameController } from "../../interface/controllers/gameController";
import { validationSchemas } from "../../application/validation";

import { validator } from "../../shared/validator";

import type { ProjectDependencies } from "../../interface/contracts/projectDependencies";

export const router = (dependencies: ProjectDependencies) => {
	const router = express.Router();

	const controller = gameController(dependencies);

	router
		.route("/")
		.get(controller.getAllGames)
		.post(
			validator.body(validationSchemas.createGameBodySchema),
			controller.createGame
		);

	router
		.route("/:id/join")
		.put(
			validator.body(validationSchemas.joinGameBodySchema),
			validator.params(validationSchemas.joinGameParamsSchema),
			controller.joinGameById
		);

	router
		.route("/:id/move")
		.put(
			validator.body(validationSchemas.makeMoveBodySchema),
			validator.params(validationSchemas.makeMoveParamsSchema),
			controller.makeMoveInGameById
		);

	router
		.route("/:id")
		.get(
			validator.params(validationSchemas.getGameByIdParamsSchema),
			controller.getGameById
		);

	return router;
};
