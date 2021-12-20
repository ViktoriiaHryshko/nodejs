import { createValidator } from 'express-joi-validation';
const express = require('express');
const userRouter = express.Router({
    mergeParams: true
});

import { UserModel } from '../models/user.model';
import { UserService } from '../services/user.service';
import { paramsQuerySchema, searchQuerySchema } from '../configs/validators';
import { commonError, notFoundError } from './error.handling';

const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const validator = createValidator({});

const userService = new UserService(UserModel);

userRouter.get('/:id',  async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        return user ? res
            .status(StatusCodes.OK)
            .send(user) : notFoundError(res);
    } catch (error) {
        return commonError(res, error);
    }
});

userRouter.get('/', validator.query(searchQuerySchema), async (req, res) => {
    try {
        const { count, rows } = await userService.getUsersByQuery(req.query);

        return count ? res
            .status(StatusCodes.OK)
            .send(rows) : notFoundError(res);
    } catch (error) {
        return commonError(res, error);
    }
});

userRouter.post('/', async (req, res) => {
    try {
        await userService.createUser(req.body);
        return res
            .status(StatusCodes.OK)
            .send(ReasonPhrases.CREATED);
    } catch (error) {
        return commonError(res, error);
    }
});

userRouter.put('/:id', async (req, res) => {
    try {
        const user = await userService.updateUser(req.body, req.params.id);
        return !user[0] ? notFoundError(res) : res
            .status(StatusCodes.OK)
            .send(ReasonPhrases.OK);
    } catch (error) {
        return commonError(res, error);
    }
});

userRouter.delete('/:id', validator.params(paramsQuerySchema), async (req, res) => {
    try {
        const user = await userService.deleteUser(req.params.id);
        return !user[0] ? notFoundError(res) : res
            .status(StatusCodes.OK)
            .send(ReasonPhrases.OK);
    } catch (error) {
        return commonError(res, error);
    }
});

export { userRouter };
