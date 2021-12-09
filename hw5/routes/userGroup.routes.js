import { UserGroupModel } from '../models/userGroup.model';
import { UserGroupService } from '../services/userGroup.service';
import { commonError, notFoundError } from './error.handling';

const express = require('express');
const userGroupRouter = express.Router({
    mergeParams: true
});

const debug = require('debug')('app:userGroup.routes');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const userGroupService = new UserGroupService(UserGroupModel);

userGroupRouter.get('/:id',  async (req, res) => {
    try {
        const group = await userGroupService.getUserGroupById(req.params.id);
        return group ? res
            .status(StatusCodes.OK)
            .send(group) : notFoundError(res);
    } catch (error) {
        debug(`Method: getUserGroupById;\nArguments: ${req.params.id}`);
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
        debug('Method: getAllUserGroups;');
        return commonError(res, error);
    }
});

userGroupRouter.post('/', async (req, res) => {
    try {
        const { groupId, userId } = req.body;
        await userGroupService.addUsersToGroup(groupId, userId);
        return res
            .status(StatusCodes.OK)
            .send(ReasonPhrases.CREATED);
    } catch (error) {
        debug(`Method: addUsersToGroup;\nArguments: ${req.body.groupId}, ${req.body.userId}`);
        return commonError(res, error);
    }
});

export { userGroupRouter };
