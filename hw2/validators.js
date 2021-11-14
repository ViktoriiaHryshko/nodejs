import * as Joi from 'joi';

export const bodyQuerySchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string()
        .regex(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)
        .required(),
    age: Joi.number()
        .integer()
        .min(4)
        .max(130)
        .required(),
    isDeleted: Joi.boolean()
});

export const paramsQuerySchema = Joi.object({
    id: Joi.string().required()
});

export const searchQuerySchema = Joi.object({
    query: Joi.string().required()
});
