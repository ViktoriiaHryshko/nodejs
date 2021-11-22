const express = require('express');
const userGroupRouter = express.Router({
    mergeParams: true
});

import { UserGroupModel } from '../models/userGroup.model';
import { UserGroupService } from '../services/userGroup.service';
import { commonError, notFoundError } from './error.handling';

const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const userGroupService = new UserGroupService(UserGroupModel);

userGroupRouter.get('/:id',  async (req, res) => {
    try {
        const group = await userGroupService.getUserGroupById(req.params.id);
        return group ? res
            .status(StatusCodes.OK)
            .send(group) : notFoundError(res);
    } catch (error) {
        return commonError(res, error);
    }
});

userGroupRouter.get('/', async (req, res) => {
    try {
        const result = await userGroupService.getAllUserGroups();

        return result.length ? res
            .status(StatusCodes.OK)
            .send(result) : notFoundError(res);
    } catch (error) {
        return commonError(res, error);
    }
});

userGroupRouter.post('/', async (req, res) => {
    try {
        await userGroupService.createUserGroup(req.body);
        return res
            .status(StatusCodes.OK)
            .send(ReasonPhrases.CREATED);
    } catch (error) {
        return commonError(res, error);
    }
});

export { userGroupRouter };
