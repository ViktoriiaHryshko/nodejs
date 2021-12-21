import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import { logErrorMiddleware, returnError } from './middlewares/errorHandler';
import { router } from './routes/app.routes';
import { PORT } from './configs/constants';
import { sequelize } from './data-access/sequelize';
import { ServerLogger } from './middlewares/serverLogger';
import { winston } from './middlewares/winstonLogger';
import { CorsOptions } from './middlewares/cors';

const app = express();

dotenv.config();

winston.info('booting app');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(ServerLogger);
app.use(returnError);
app.use(logErrorMiddleware);
app.use(cookieParser());
app.use(cors(CorsOptions));

const startServer = appRouter => {
    app.use('/', appRouter);
    app.listen(PORT, () => {
        winston.info(`Homework app listening at http://localhost:${PORT}`);
    });
};

(async () => {
    try {
        await sequelize.authenticate();

        winston.info('Connection has been established successfully.');

        startServer(router);
    } catch (error) {
        winston.error(`Unable to connect to the database: ${JSON.stringify(error)}`);
    }
})();
