import { AuthService } from '../services/auth.service';
import { commonError } from './error.handling';
import { winston } from '../middlewares/winstonLogger';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';

const express = require('express');
const authRouter = express.Router({
    mergeParams: true
});

const authService = new AuthService(UserModel);

authRouter.post('/',  async (req, res) => {
    try {
        const user = await authService.auth(req.body);

        if (!user) {
            res.status(403).send({
                success: false,
                message: 'Bad username/password'
            });
        }

        const payload = { 'sub': user.id, 'isActive': !user.isDeleted };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 20 });

        // localStorage.setItem('token', token);

        return res
            .status(StatusCodes.OK)
            .send({ token });
    } catch (error) {
        winston.error(`Method: getAuthById; Arguments: ${req.params.id}`);
        return commonError(res, error);
    }
});

export { authRouter };
