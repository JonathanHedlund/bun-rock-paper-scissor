import express from "express";

import { gameController } from "../../interface/controllers/gameController";

import type { ProjectDependencies } from "../../interface/contracts/projectDependencies";

export const router = (dependencies: ProjectDependencies) => {
	const router = express.Router();

	const controller = gameController(dependencies);

	router.route("/").get(controller.getAllGames).post(controller.createGame);
	router.route("/:id/join").put(controller.joinGameById);
	router.route("/:id/move").put(controller.makeMoveInGameById);
	router.route("/:id").get(controller.getGameById);

	return router;
};
