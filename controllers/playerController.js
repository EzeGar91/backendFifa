const Player = require('../models/player');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

exports.getAllPlayers = async (req, res) => {
  try {
    const players = await Player.findAll();
    res.json(players);
  } catch (error) {
    console.error('Error getting players:', error);
    res.status(500).json({ error: 'Error getting players' });
  }
};

exports.searchPlayers = async (req, res) => {
  try {
    const { name, club, position } = req.query;
    const whereClause = {};

    if (name) {
      whereClause.name = {
        [Op.like]: `%${name}%`
      };
    }

    if (club) {
      whereClause.club = {
        [Op.like]: `%${club}%`
      };
    }

    if (position) {
      whereClause.position = position;
    }

    const players = await Player.findAll({
      where: whereClause
    });

    res.json(players);
  } catch (error) {
    console.error('Error searching players:', error);
    res.status(500).json({ error: 'Error searching players' });
  }
};

exports.exportPlayersCSV = async (req, res) => {
  try {
    const { name, club, position } = req.query;
    const whereClause = {};

    if (name) {
      whereClause.name = {
        [Op.like]: `%${name}%`
      };
    }

    if (club) {
      whereClause.club = {
        [Op.like]: `%${club}%`
      };
    }

    if (position) {
      whereClause.position = position;
    }

    const players = await Player.findAll({
      where: whereClause
    });

    // Crear CSV
    let csv = 'id,name,age,nationality,club,position,overall\n';
    players.forEach(player => {
      csv += `${player.id},${player.name},${player.age},${player.nationality},${player.club},${player.position},${player.overall}\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=jugadores.csv');
    res.send(csv);
  } catch (error) {
    console.error('Error exporting players:', error);
    res.status(500).json({ error: 'Error exporting players' });
  }
};

exports.createPlayer = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const newPlayer = await Player.create(req.body);
  res.status(201).json(newPlayer);
};

exports.getPlayerById = async (req, res) => {
  const player = await Player.findByPk(req.params.id);
  if (!player) return res.status(404).json({ error: 'Player not found' });
  res.json(player);
};

exports.updatePlayer = async (req, res) => {
  const player = await Player.findByPk(req.params.id);
  if (!player) return res.status(404).json({ error: 'Player not found' });

  await player.update(req.body);
  res.json(player);
};

exports.deletePlayer = async (req, res) => {
  const player = await Player.findByPk(req.params.id);
  if (!player) return res.status(404).json({ error: 'Player not found' });

  await player.destroy();
  res.json({ message: 'Player deleted' });
};
