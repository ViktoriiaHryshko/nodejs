import express from 'express';
import { createValidator } from 'express-joi-validation';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { bodyQuerySchema, paramsQuerySchema, searchQuerySchema } from './validators';
import { createUser, deleteById, getUserById, searchUser, updateUser } from './fakeDb';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = 3000;
const router = express.Router();
const validator = createValidator({});

const handleError = res => res
    .status(StatusCodes.NOT_FOUND)
    .send({
        error: ReasonPhrases.NOT_FOUND
    });

router.get('/user/:id', (req, res) => {
    const user = getUserById(+req.params.id);

    return user ? res
        .status(StatusCodes.OK)
        .send(user) : handleError(res);
});

router.get('/users', validator.query(searchQuerySchema), (req, res) => {
    const query = req.query.query;
    const limit = req.query.limit || 5;
    const users = searchUser(query, limit);

    return users.length ? res
        .status(StatusCodes.OK)
        .send(users) : handleError(res);
});

router.post('/user', validator.body(bodyQuerySchema), (req, res) => {
    createUser(req.body);
    res
        .status(StatusCodes.OK)
        .send(ReasonPhrases.CREATED);
});

router.put('/user/:id', validator.body(bodyQuerySchema), (req, res) => (
    updateUser(req) ? handleError(res) : res.status(StatusCodes.OK).send(ReasonPhrases.OK)));

router.delete('/user/:id', validator.params(paramsQuerySchema), (req, res) => (
    deleteById(+req.params.id) ? res.status(StatusCodes.OK).send(ReasonPhrases.OK) : handleError(res)));

router.get('/', (req, res) => res
    .status(StatusCodes.OK)
    .send('Homework 2')
);

app.use('/', router);
app.listen(port, () => {
    console.log(`Homework2 app listening at http://localhost:${port}`);
});
