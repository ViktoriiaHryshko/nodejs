import { createValidator } from 'express-joi-validation';
import { UserModel } from '../models/user.model';
import { UserService } from '../services/user.service';
import { paramsQuerySchema, searchQuerySchema } from '../configs/validators';
import { commonError, notFoundError } from './error.handling';

const express = require('express');
const userRouter = express.Router({
    mergeParams: true
});
const debug = require('debug')('app:user.routes');

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
        debug(`Method: getUserById;\nArguments: ${req.params.id}`);
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
        debug(`Method: getUsersByQuery;\nArguments: ${JSON.stringify(req.query)}`);
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
        debug(`Method: createUser;\nArguments: ${JSON.stringify(req.body)}`);
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
        debug(`Method: updateUser;\nArguments: ${JSON.stringify(req.body)}, ${req.params.id}`);
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
        debug(`Method: deleteUser;\nArguments: ${req.params.id}`);
        return commonError(res, error);
    }
});

export { userRouter };
