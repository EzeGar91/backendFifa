const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  'fifa_players',
  'root',
  'asd123',
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: console.log
  }
);

module.exports = sequelize;
