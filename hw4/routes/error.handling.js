import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export const notFoundError = res => res
    .status(StatusCodes.NOT_FOUND)
    .send(ReasonPhrases.NOT_FOUND);

export const commonError = (res, error) => {
    const { errors = [] }  = error;
    const { message = 'Unknown error!' } = errors.length && errors[0];

    return res
        .status(StatusCodes.NOT_FOUND)
        .send(message);
};
