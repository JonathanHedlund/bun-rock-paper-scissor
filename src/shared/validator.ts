import Joi, { ValidationError } from "joi";

import { AppError } from "./appError";
import { HttpStatusCode } from "./httpStatusCode";

import type { IncomingHttpHeaders } from "http";
import type { NextFunction, Request, Response } from "express";

const validatorHelper = async (
	schema: Joi.ObjectSchema,
	data: Partial<Request> | IncomingHttpHeaders,
	next: NextFunction
) => {
	try {
		await schema.validateAsync(data);
		next();
	} catch (error) {
		if (error instanceof ValidationError) {
			return next(new AppError(HttpStatusCode.BAD_REQUEST, error.message));
		}
		return next(error);
	}
};

const headers = (headersSchema: Joi.ObjectSchema) => {
	return (req: Request, _res: Response, next: NextFunction) => {
		validatorHelper(headersSchema, req.headers, next);
	};
};

const body = (bodySchema: Joi.ObjectSchema) => {
	return (req: Request, _res: Response, next: NextFunction) => {
		validatorHelper(bodySchema, req.body, next);
	};
};

const params = (paramsSchema: Joi.ObjectSchema) => {
	return (req: Request, _res: Response, next: NextFunction) => {
		validatorHelper(paramsSchema, req.params, next);
	};
};

const query = (querySchema: Joi.ObjectSchema) => {
	return (req: Request, _res: Response, next: NextFunction) => {
		validatorHelper(querySchema, req.query, next);
	};
};

export const validator = {
	headers,
	body,
	params,
	query,
};
