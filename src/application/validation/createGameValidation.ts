import Joi from "joi";

export const createGameBodySchema = Joi.object({
	name: Joi.string().max(30).min(3).required(),
});
