import express from "express";

import { router as gameRouter } from "./gameRoutes";

import type { ProjectDependencies } from "../../interface/contracts/projectDependencies";

export const apiRouter = (dependencies: ProjectDependencies) => {
	const router = express.Router();

	const gameRoutes = gameRouter(dependencies);

	router.use("/games", gameRoutes);

	return router;
};
