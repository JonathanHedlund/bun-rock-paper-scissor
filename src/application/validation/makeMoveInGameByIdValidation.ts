import Joi from "joi";

export const makeMoveBodySchema = Joi.object({
	name: Joi.string().max(30).min(3).required(),
	move: Joi.string().required(),
});

export const makeMoveParamsSchema = Joi.object({
	id: Joi.string().required(),
});
