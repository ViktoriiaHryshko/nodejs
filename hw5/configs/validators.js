import * as Joi from 'joi';

export const paramsQuerySchema = Joi.object({
    id: Joi.string().required()
});

export const searchQuerySchema = Joi.object({
    query: Joi.string().required()
});
