const Player = require('../models/player');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

exports.getAllPlayers = async (req, res) => {
  try {
    const players = await Player.findAll({
      attributes: [
        'id',
        'name',
        'age',
        'nationality',
        'club',
        'position',
        'overall',
        'pace',
        'shooting',
        'passing',
        'dribbling',
        'defending',
        'physical'
      ]
    });
    
    // Agregar headers para mejor visualización
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Respuesta con información adicional
    res.json({
      success: true,
      count: players.length,
      data: players
    });
  } catch (error) {
    console.error('Error getting players:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error getting players',
      details: error.message 
    });
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
      whereClause.position = {
        [Op.like]: `%${position}%`
      };
    }

    const players = await Player.findAll({
      where: whereClause,
      attributes: [
        'id',
        'name',
        'age',
        'nationality',
        'club',
        'position',
        'overall',
        'pace',
        'shooting',
        'passing',
        'dribbling',
        'defending',
        'physical'
      ]
    });

    res.json({
      success: true,
      count: players.length,
      data: players
    });
  } catch (error) {
    console.error('Error searching players:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error searching players',
      details: error.message 
    });
  }
};

exports.exportPlayersCSV = async (req, res) => {
  try {
    const { name, club, position } = req.query;
    
    // Construir la consulta SQL dinámicamente
    let whereConditions = [];
    let params = [];
    
    if (name) {
      whereConditions.push('name LIKE ?');
      params.push(`%${name}%`);
    }
    
    if (club) {
      whereConditions.push('club LIKE ?');
      params.push(`%${club}%`);
    }
    
    if (position) {
      whereConditions.push('position LIKE ?');
      params.push(`%${position}%`);
    }
    
    const whereClause = whereConditions.length > 0 ? 'WHERE ' + whereConditions.join(' AND ') : '';
    
    const query = `
      SELECT id, name, age, nationality, club, position, 
             overall, pace, shooting, passing, dribbling, defending, physical 
      FROM players 
      ${whereClause}
    `;
    
    const sequelize = require('../config/db');
    const results = await sequelize.query(query, {
      replacements: params,
      type: sequelize.QueryTypes.SELECT
    });

    // Crear CSV con headers mejorados
    let csv = 'ID,Nombre,Edad,Nacionalidad,Club,Posición,Overall,Pace,Shooting,Passing,Dribbling,Defending,Physical\n';
    
    results.forEach(player => {
      csv += `${player.id},"${player.name}",${player.age},"${player.nationality}","${player.club}","${player.position}",${player.overall},${player.pace || ''},${player.shooting || ''},${player.passing || ''},${player.dribbling || ''},${player.defending || ''},${player.physical || ''}\n`;
    });

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename=jugadores_fifa.csv');
    res.send(csv);
  } catch (error) {
    console.error('Error exporting players:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error exporting players',
      details: error.message 
    });
  }
};

exports.createPlayer = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const newPlayer = await Player.create(req.body);
  res.status(201).json(newPlayer);
};

exports.getPlayerById = async (req, res) => {
  try {
    const player = await Player.findByPk(req.params.id, {
      attributes: [
        'id',
        'name',
        'age',
        'nationality',
        'club',
        'position',
        'overall',
        'pace',
        'shooting',
        'passing',
        'dribbling',
        'defending',
        'physical'
      ]
    });
    
    if (!player) {
      return res.status(404).json({ 
        success: false,
        error: 'Player not found' 
      });
    }

    // Agregar headers para mejor visualización
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    res.json({
      success: true,
      data: player
    });
  } catch (error) {
    console.error('Error getting player by ID:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error getting player', 
      details: error.message 
    });
  }
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
