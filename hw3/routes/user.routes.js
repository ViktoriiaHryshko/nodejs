import { createValidator } from 'express-joi-validation';
const express = require('express');
const router = express.Router();

import { User as UserModel } from '../models/user.model';
import { UserService } from '../services/user.service';
import { paramsQuerySchema, searchQuerySchema } from '../configs/validators';

const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const validator = createValidator({});

const userService = new UserService(UserModel);

const notFoundError = res => res
    .status(StatusCodes.NOT_FOUND)
    .send({
        error: ReasonPhrases.NOT_FOUND
    });

router.get('/user/:id',  async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        return user ? res
            .status(StatusCodes.OK)
            .send(user) : notFoundError(res);
    } catch (error) {
        notFoundError(error);
    }
});

router.get('/users', validator.query(searchQuerySchema), async (req, res) => {
    try {
        const { count, rows } = await userService.getUsersByQuery(res.query);

        return count ? res
            .status(StatusCodes.OK)
            .send(rows) : notFoundError(res);
    } catch (error) {
        notFoundError(error);
    }
});

router.post('/user', async (req, res) => {
    try {
        await userService.createUser(req.body);
        return res
            .status(StatusCodes.OK)
            .send(ReasonPhrases.CREATED);
    } catch (error) {
        notFoundError(error);
    }
});

router.put('/user/:id', async (req, res) => {
    try {
        const user = await userService.updateUser(req.body, req.params.id);
        return !user[0] ? notFoundError(res) : res
            .status(StatusCodes.OK)
            .send(ReasonPhrases.OK);
    } catch (error) {
        notFoundError(error);
    }
});

router.delete('/user/:id', validator.params(paramsQuerySchema), async (req, res) => {
    try {
        const user = await userService.deleteUser(req.params.id);
        return !user[0] ? notFoundError(res) : res
            .status(StatusCodes.OK)
            .send(ReasonPhrases.OK);
    } catch (error) {
        notFoundError(error);
    }
});

router.get('/', (req, res) => res
    .status(StatusCodes.OK)
    .send('Homework 2')
);

export { router };
