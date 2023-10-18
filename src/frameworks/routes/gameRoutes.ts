import express from "express";

import { gameController } from "../../interface/controllers/gameController";

import type { ProjectDependencies } from "../../interface/contracts/projectDependencies";

export const router = (dependencies: ProjectDependencies) => {
	const router = express.Router();

	const controller = gameController(dependencies);

	router.route("/").get(controller.getAllGames).post(controller.createGame);

	return router;
};
