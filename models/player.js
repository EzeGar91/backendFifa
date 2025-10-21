const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Player = sequelize.define('Player', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER
  },
  nationality: {
    type: DataTypes.STRING
  },
  club: {
    type: DataTypes.STRING
  },
  overall: {
    type: DataTypes.INTEGER
  }
});

module.exports = Player;
