import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const debug = require('debug')('app:error.handling');

export const notFoundError = res => {
    debug('Error: NOT_FOUND;');

    return res
        .status(StatusCodes.NOT_FOUND)
        .send(ReasonPhrases.NOT_FOUND);
};

export const commonError = (res, error) => {
    if (!error.errors) error.errors = [{ message: '' }];
    if (!error.original) error.original = { detail: '' };

    const { errors: [{ message }], original: { detail = 'Unknown error!' } } = error;
    const errorMessage = `ERROR! ${detail} ${message}`;

    debug(errorMessage);

    return res
        .status(StatusCodes.NOT_FOUND)
        .send(errorMessage);
};
