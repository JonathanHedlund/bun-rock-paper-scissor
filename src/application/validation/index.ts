import { createGameBodySchema } from "./createGameValidation";
import {
	joinGameBodySchema,
	joinGameParamsSchema,
} from "./joinGameByIdValidation";
import {
	makeMoveBodySchema,
	makeMoveParamsSchema,
} from "./makeMoveInGameByIdValidation";
import { getGameParamsSchema } from "./getGameValidation";

export const validationSchemas = {
	createGameBodySchema,
	joinGameBodySchema,
	joinGameParamsSchema,
	makeMoveBodySchema,
	makeMoveParamsSchema,
	getGameParamsSchema,
};
