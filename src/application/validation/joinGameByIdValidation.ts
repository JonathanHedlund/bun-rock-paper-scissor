import Joi from "joi";

export const joinGameBodySchema = Joi.object({
	name: Joi.string().max(30).min(3).required(),
});

export const joinGameParamsSchema = Joi.object({
	id: Joi.string().required(),
});
