import Joi, { type ValidationError } from "joi";

import type { NextFunction, Request, Response } from "express";

import { AppError } from "./appError";
import { HttpStatusCode } from "./httpStatusCode";

export function validator(schema: Joi.Schema) {
	return async function (req: Request, _res: Response, next: NextFunction) {
		try {
			const validated = await schema.validateAsync(req.body);
			req.body = validated;
			next();
		} catch (error: ValidationError | any) {
			if (error.isJoi) {
				return next(
					new AppError(HttpStatusCode.UNPROCESSABLE_ENTITY, error.message)
				);
			}
			return next(error);
		}
	};
}
