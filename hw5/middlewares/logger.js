const debug = require('debug')('app:logger');

const Logger = (req, res, next) => {
    debug(`${req.method} ${req.url}\n params: ${JSON.stringify(req.params)}, body: ${JSON.stringify(req.body)}`);
    next();
};

export { Logger };
