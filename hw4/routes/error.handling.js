import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export const notFoundError = res => res
    .status(StatusCodes.NOT_FOUND)
    .send(ReasonPhrases.NOT_FOUND);

export const commonError = (res, error) => {
    if (!error.errors) error.errors = [{ message: '' }];
    if (!error.original) error.original = { detail: '' };

    const { errors: [{ message }], original: { detail = 'Unknown error!' } } = error;
    const errorMessage = `ERROR! ${detail} ${message}`;

    return res
        .status(StatusCodes.NOT_FOUND)
        .send(errorMessage);
};
