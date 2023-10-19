import express from "express";

import { projectDependencies } from "./config/projectDependencies";
import { apiRouter } from "./frameworks/routes";

import type { Request, Response, NextFunction } from "express";
import { AppError } from "./shared/appError";
import { globalErrorHandler } from "./config/globalErrorHandler";

const API_VERSION = Bun.env.API_VERSION || "v1";

const app = express();

app.use(express.json());

projectDependencies.databaseService.initDatabase();

app.use(`/api/${API_VERSION}`, apiRouter(projectDependencies));

app.all("*", (req: Request, res: Response, next: NextFunction) => {
	next(new AppError(404, `Can't find ${req.originalUrl} on this server`));
});

app.use(globalErrorHandler);

export { app };
