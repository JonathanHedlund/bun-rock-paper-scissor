import { createGameBodySchema } from "./createGameValidation";
import { joinGameBodySchema, joinGameParamsSchema } from "./joinGameValidation";
import { makeMoveBodySchema, makeMoveParamsSchema } from "./makeMoveValidation";
import { getGameParamsSchema } from "./getGameValidation";

export const validationSchemas = {
	createGameBodySchema,
	joinGameBodySchema,
	joinGameParamsSchema,
	makeMoveBodySchema,
	makeMoveParamsSchema,
	getGameParamsSchema,
};
