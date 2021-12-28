import { userRouter } from './user.routes';
import { groupRouter } from './group.routes';
import { userGroupRouter } from './userGroup.routes';
import { authRouter } from './auth.routes';
import { CheckToken } from '../middlewares/checkToken';

const express = require('express');
const router = express.Router();

const { StatusCodes } = require('http-status-codes');

router.use('/auth', authRouter);
router.use('/user', CheckToken, userRouter);
router.use('/group', CheckToken, groupRouter);
router.use('/user-group', CheckToken, userGroupRouter);

router.get('/', (req, res) => res
    .status(StatusCodes.OK)
    .send('Homework 6')
);

export { router };
