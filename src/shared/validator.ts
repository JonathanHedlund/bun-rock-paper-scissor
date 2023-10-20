import Joi, { ValidationError } from "joi";

import { AppError } from "./appError";
import { HttpStatusCode } from "./httpStatusCode";

import type { NextFunction, Request, Response } from "express";

export const validator = (schema: Joi.Schema) => {
	return async (req: Request, _res: Response, next: NextFunction) => {
		try {
			await schema.validateAsync(req.body);
			next();
		} catch (error) {
			if (error instanceof ValidationError) {
				return next(new AppError(HttpStatusCode.BAD_REQUEST, error.message));
			}
			return next(error);
		}
	};
};
