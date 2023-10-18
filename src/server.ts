import express from "express";

import { projectDependencies } from "./config/projectDependencies";
import { apiRouter } from "./frameworks/routes";

import type { Request, Response, NextFunction } from "express";
import { AppError } from "./shared/appError";
import { globalErrorHandler } from "./frameworks/error/globalErrorHandler";

const PORT = Bun.env.PORT || 3000;
const API_VERSION = Bun.env.API_VERSION || "v1";

const app = express();

app.use(express.json());

app.use(`/api/${API_VERSION}`, apiRouter(projectDependencies));

app.all("*", (req: Request, res: Response, next: NextFunction) => {
	next(new AppError(404, `Can't find ${req.originalUrl} on this server`));
});

app.use(globalErrorHandler);

const server = app.listen(PORT, () => {
	console.log(`⚡️ Listening on port ${PORT}...`);
});

process.on("unhandledRejection", (err: TypeError) => {
	console.log("UNHANDLED REJECTION! Shutting down...");
	console.log(err.name, err.message);
	server.close(() => {
		process.exit(1);
	});
});
