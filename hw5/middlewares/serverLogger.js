import { winston } from './winstonLogger';

const ServerLogger = (req, res, next) => {
    winston.info(`${req.method} ${req.url} params: ${JSON.stringify(req.params)}, body: ${JSON.stringify(req.body)}`);
    next();
};

export { ServerLogger };
