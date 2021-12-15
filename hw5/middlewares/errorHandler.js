import process from 'process';
import { winston } from './winstonLogger';
import { writeSync } from 'fs';
// import { BaseError } from 'sequelize';

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

const returnError = (err, req, res, next) => {
    const { message = '', statusCode = 500 } = err;

    res.status(statusCode).send(message);
};

// const isOperationalError = error => {
//     return error instanceof BaseError && error.isOperational;
// };

process.on('unhandledRejection', error => {
    throw new Error(error);
});

process.on('uncaughtException', (error, origin) => {
    logError(error, origin);

    // if (!isOperationalError(error)) {
    //     process.exit(1);
    // }
});

/* case 1 - promise Promise Rejected */
// const PTest = () => new Promise((resolve, reject) => {
//     reject('Promise Rejected');
// });
//
// const fakePromise = PTest();
// fakePromise.then(() => {
//     console.log('Promise Resolved');
// });
//
// fakePromise.catch((err) => {
//     console.log(err);
// });

/* case 2 - non existent function */
// nonexistentFunc();

export {
    logError,
    logErrorMiddleware,
    returnError
};
