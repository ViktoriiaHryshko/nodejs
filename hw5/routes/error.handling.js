import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { winston } from '../middlewares/winstonLogger';

export const notFoundError = res => {
    winston.warn('Empty response from the model: NOT_FOUND;');

    return res
        .status(StatusCodes.NOT_FOUND)
        .send(ReasonPhrases.NOT_FOUND);
};

export const commonError = (res, error) => {
    if (!error.errors) error.errors = [{ message: '' }];
    if (!error.original) error.original = { detail: '' };

    const { errors: [{ message }], original: { detail = 'Unknown error!' } } = error;
    const errorMessage = `ERROR! ${detail} ${message}`;

    winston.error(errorMessage);

    return res
        .status(StatusCodes.NOT_FOUND)
        .send(errorMessage);
};
