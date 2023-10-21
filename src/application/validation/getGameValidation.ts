import Joi from "joi";

export const getGameParamsSchema = Joi.object({
	id: Joi.string().required(),
	name: Joi.string().max(30).min(3).required(),
});
