import { createGameSchema } from "../use-cases/createGame";
import { getGameByIdSchema } from "../use-cases/getGameById";
import { joinGameSchema } from "../use-cases/joinGame";
import { makeMoveSchema } from "../use-cases/makeMove";

export const validationSchemas = {
	createGameSchema,
	getGameByIdSchema,
	joinGameSchema,
	makeMoveSchema,
};
