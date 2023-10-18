import Fastify from "fastify";

import { projectDependencies } from "./config/projectDependencies";
import { apiRouter } from "./frameworks/web/routes";

const PORT = 3000;
const API_VERSION = "v1";

const fastify = Fastify({ logger: false });

const router = apiRouter(projectDependencies);

fastify.register(router, { prefix: `/api/${API_VERSION}` });

const start = async () => {
	try {
		await fastify.listen({ port: PORT });
	} catch (error) {
		fastify.log.error(error);
		process.exit(1);
	}
};

start();
