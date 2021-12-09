import express from 'express';
import { router } from './routes/app.routes';
import { PORT } from './configs/constants';
import { sequelize } from './data-access/sequelize';
import { Logger } from './middlewares/logger';

const app = express();
const debug = require('debug')('app:server');

debug('booting %s app');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(Logger);

const startServer = appRouter => {
    app.use('/', appRouter);
    app.listen(PORT, () => {
        debug(`Homework app listening at http://localhost:${PORT}`);
    });
};

(async () => {
    try {
        await sequelize.authenticate();
        debug('\nConnection has been established successfully.\n');

        startServer(router);
    } catch (error) {
        debug('Unable to connect to the database:', error);
    }
})();
