import express from 'express';
import { router } from './routes/app.routes';
import { PORT } from './configs/constants';
import { sequelize } from './data-access/sequelize';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const startServer = appRouter => {
    app.use('/', appRouter);
    app.listen(PORT, () => {
        console.log(`Homework4 app listening at http://localhost:${PORT}`);
    });
};

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        startServer(router);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
