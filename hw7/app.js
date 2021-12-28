import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import { logErrorMiddleware } from './middlewares/errorHandler';
import { router } from './routes/app.routes';
import { PORT } from './configs/constants';
import { sequelize } from './data-access/sequelize';
import { ServerLogger } from './middlewares/serverLogger';
import { winston } from './middlewares/winstonLogger';
import { CorsOptions } from './middlewares/cors';

const app = express();

dotenv.config();

winston.info('booting app');

app.use(cookieParser());
app.use(cors(CorsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(ServerLogger);
app.use(logErrorMiddleware);

const startServer = appRouter => {
    app.use('/', appRouter);
    app.listen(PORT, () => {
        winston.info(`Homework app listening at http://localhost:${PORT}`);
    });
};

sequelize
    .authenticate()
    .then(() => {
        startServer(router);
        winston.info('Connection has been established successfully.');
    })
    .catch(err => {
        winston.error(`Unable to connect to the database: ${JSON.stringify(err)}`);
    });
