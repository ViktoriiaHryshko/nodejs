const { Sequelize } = require('sequelize');
const { SequelizeConfig } = require('../configs/db.config');

const { dbName, userName, password, dbConnection } = SequelizeConfig;
const sequelize = new Sequelize(dbName, userName, password, dbConnection);

sequelize.sync();

export { sequelize };
