import { userRouter } from './user.routes';
import { groupRouter } from './group.routes';
import { userGroupRouter } from './userGroup.routes';

const express = require('express');
const router = express.Router();

const { StatusCodes } = require('http-status-codes');

router.use('/user', userRouter);
router.use('/group', groupRouter);
router.use('/user-group', userGroupRouter);

router.get('/', (req, res) => res
    .status(StatusCodes.OK)
    .send('Homework 4')
);

export { router };
