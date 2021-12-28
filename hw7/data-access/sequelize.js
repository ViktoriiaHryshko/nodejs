import dotenv from 'dotenv';

const { Sequelize } = require('sequelize');

dotenv.config();

const { DB_NAME, USER_NAME, PASSWORD, host, dialect, port } = process.env;
const sequelize = new Sequelize(DB_NAME, USER_NAME, PASSWORD, { host, dialect, port });

sequelize.sync();

export { sequelize };
