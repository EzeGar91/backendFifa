const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Player = sequelize.define('player', {
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
  }
}, {
  tableName: 'players', // 🔴 Muy importante
  timestamps: false     // Si tu tabla no tiene createdAt/updatedAt
});


module.exports = Player;
