import { router as gameRouter } from "./gameRoutes";

import type { FastifyInstance, RouteShorthandOptions } from "fastify";
import type { ProjectDependencies } from "../../../interface/contracts/projectDependencies";

export const apiRouter = (dependencies: ProjectDependencies) => {
	return async function (
		fastify: FastifyInstance,
		options: RouteShorthandOptions
	) {
		fastify.register(gameRouter(dependencies), { prefix: "/games" });
	};
};
