import { gameController } from "../../../interface/controllers/gameController";

import type { FastifyInstance, RouteShorthandOptions } from "fastify";
import type { ProjectDependencies } from "../../../interface/contracts/projectDependencies";

export const router = (dependencies: ProjectDependencies) => {
	return async function (
		fastify: FastifyInstance,
		options: RouteShorthandOptions
	) {
		const controller = gameController(dependencies);
		fastify.get("/", controller.getAllGames);
	};
};
