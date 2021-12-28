import process from 'process';
import { winston } from './winstonLogger';
import { writeSync } from 'fs';

const logError = (err = {}, origin) => {
    const { message = err || 'Unexpected error', statusCode = 500, stack } = err;
    const errorMessage = `

Caught exception: ${message}.
StatusCode: ${statusCode}.
Exception origin: ${origin}.
Error stack: ${stack}

`;

    winston.error(errorMessage);
    writeSync(
        process.stderr.fd,
        errorMessage
    );
};

const logErrorMiddleware = (err, req, res, next) => {
    logError(err);
    next(err);
};

process.on('unhandledRejection', error => {
    throw new Error(error);
});

process.on('uncaughtException', (error, origin) => {
    logError(error, origin);
});

export {
    logError,
    logErrorMiddleware
};
