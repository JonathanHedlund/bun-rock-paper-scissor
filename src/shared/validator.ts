import Joi, { ValidationError } from "joi";

import { AppError } from "./appError";
import { HttpStatusCode } from "./httpStatusCode";

import type { IncomingHttpHeaders } from "http";
import type { NextFunction, Request, Response } from "express";

type SchemaInput = Joi.ObjectSchema | Joi.ObjectSchema[];

export const joinJoiSchemas = (
	schemas: Joi.ObjectSchema[]
): Joi.ObjectSchema => {
	let mergedSchema = Joi.object();
	schemas.forEach((schema) => {
		mergedSchema = mergedSchema.concat(schema);
	});
	return mergedSchema;
};

const validatorHelper = async (
	schema: SchemaInput,
	data: Partial<Request> | IncomingHttpHeaders,
	next: NextFunction
) => {
	const validationSchema =
		schema instanceof Array ? joinJoiSchemas(schema) : schema;
	try {
		await validationSchema.validateAsync(data);
		next();
	} catch (error) {
		if (error instanceof ValidationError) {
			return next(new AppError(HttpStatusCode.BAD_REQUEST, error.message));
		}
		return next(error);
	}
};

const headers = (headersSchema: SchemaInput) => {
	return (req: Request, _res: Response, next: NextFunction) => {
		validatorHelper(headersSchema, req.headers, next);
	};
};

const body = (bodySchema: SchemaInput) => {
	return (req: Request, _res: Response, next: NextFunction) => {
		validatorHelper(bodySchema, req.body, next);
	};
};

const params = (paramsSchema: SchemaInput) => {
	return (req: Request, _res: Response, next: NextFunction) => {
		validatorHelper(paramsSchema, req.params, next);
	};
};

const query = (querySchema: SchemaInput) => {
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
