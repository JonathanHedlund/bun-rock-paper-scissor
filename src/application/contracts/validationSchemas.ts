import { createGameSchema } from "../use-cases/createGame";

import {
	joinGameBodySchema,
	joinGameParamsSchema,
} from "../use-cases/joinGame";
import {
	makeMoveBodySchema,
	makeMoveParamsSchema,
} from "../use-cases/makeMove";
import { getGameByIdParamsSchema } from "../use-cases/getGameById";

export const validationSchemas = {
	createGameSchema,
	joinGameBodySchema,
	joinGameParamsSchema,
	makeMoveBodySchema,
	makeMoveParamsSchema,
	getGameByIdParamsSchema,
};
