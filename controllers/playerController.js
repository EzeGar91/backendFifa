const Player = require('../models/Player');
const { validationResult } = require('express-validator');

exports.getAllPlayers = async (req, res) => {
  const players = await Player.findAll();
  res.json(players);
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
