import { createValidator } from 'express-joi-validation';


import { GroupModel } from '../models/group.model';
import { UserGroupModel } from '../models/userGroup.model';
import { GroupService } from '../services/group.service';
import { paramsQuerySchema } from '../configs/validators';
import { commonError, notFoundError } from './error.handling';

const express = require('express');
const groupRouter = express.Router({
    mergeParams: true
});
const debug = require('debug')('app:group.routes');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const validator = createValidator({});

const groupService = new GroupService(GroupModel, UserGroupModel);

groupRouter.get('/:id',  async (req, res) => {
    try {
        const group = await groupService.getGroupById(req.params.id);
        return group ? res
            .status(StatusCodes.OK)
            .send(group) : notFoundError(res);
    } catch (error) {
        debug(`Method: getGroupById;\nArguments: ${req.params.id}`);
        return commonError(res, error);
    }
});

groupRouter.get('/', async (req, res) => {
    try {
        const result = await groupService.getAllGroups();

        return result.length ? res
            .status(StatusCodes.OK)
            .send(result) : notFoundError(res);
    } catch (error) {
        debug('Method: getAllGroups;');
        return commonError(res, error);
    }
});

groupRouter.post('/', async (req, res) => {
    try {
        await groupService.createGroup(req.body);
        return res
            .status(StatusCodes.OK)
            .send(ReasonPhrases.CREATED);
    } catch (error) {
        debug(`Method: createGroup;\nArguments: ${JSON.stringify(req.body)}`);
        return commonError(res, error);
    }
});

groupRouter.put('/:id', async (req, res) => {
    try {
        const group = await groupService.updateGroup(req.body, req.params.id);

        return !group[0] ? notFoundError(res) : res
            .status(StatusCodes.OK)
            .send(ReasonPhrases.OK);
    } catch (error) {
        debug(`Method: updateGroup;\nArguments: ${JSON.stringify(req.body)}, ${req.params.id}`);
        return commonError(res, error);
    }
});

groupRouter.delete('/:id', validator.params(paramsQuerySchema), async (req, res) => {
    try {
        const group = await groupService.deleteGroup(req.params.id);

        return !group ? notFoundError(res) : res
            .status(StatusCodes.OK)
            .send(ReasonPhrases.OK);
    } catch (error) {
        debug(`Method: deleteGroup;\nArguments: ${req.params.id}`);
        return commonError(res, error);
    }
});

export { groupRouter };
