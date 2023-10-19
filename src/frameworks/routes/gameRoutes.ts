import express from "express";

import { gameController } from "../../interface/controllers/gameController";
import { validationSchemas } from "../../application/contracts/validationSchemas";

import { validator } from "../../shared/validator";

import type { ProjectDependencies } from "../../interface/contracts/projectDependencies";

export const router = (dependencies: ProjectDependencies) => {
	const router = express.Router();

	const controller = gameController(dependencies);

	router
		.route("/")
		.get(controller.getAllGames)
		.post(validator(validationSchemas.createGameSchema), controller.createGame);

	router
		.route("/:id/join")
		.put(validator(validationSchemas.joinGameSchema), controller.joinGameById);

	router
		.route("/:id/move")
		.put(
			validator(validationSchemas.makeMoveSchema),
			controller.makeMoveInGameById
		);

	router
		.route("/:id")
		.get(
			validator(validationSchemas.getGameByIdSchema),
			controller.getGameById
		);

	return router;
};
