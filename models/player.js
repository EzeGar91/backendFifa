const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Player = sequelize.define('player', {
  // Información básica
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
  position: {
    type: DataTypes.STRING
  },
  overall: {
    type: DataTypes.INTEGER
  },
  // Skills principales
  pace: {
    type: DataTypes.INTEGER
  },
  shooting: {
    type: DataTypes.INTEGER
  },
  passing: {
    type: DataTypes.INTEGER
  },
  dribbling: {
    type: DataTypes.INTEGER
  },
  defending: {
    type: DataTypes.INTEGER
  },
  physical: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'players', // 🔴 Muy importante
  timestamps: false     // Si tu tabla no tiene createdAt/updatedAt
});


module.exports = Player;
