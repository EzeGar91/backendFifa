const Player = require('../models/player');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

exports.getAllPlayers = async (req, res) => {
  try {
    const players = await Player.findAll({
      attributes: [
        'id',
        'long_name',
        'age',
        'nationality_name',
        'club_name',
        'player_positions',
        'overall',
        'potential',
        'value_eur',
        'wage_eur',
        'height_cm',
        'weight_kg',
        'preferred_foot',
        'work_rate'
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
      whereClause.long_name = {
        [Op.like]: `%${name}%`
      };
    }

    if (club) {
      whereClause.club_name = {
        [Op.like]: `%${club}%`
      };
    }

    if (position) {
      whereClause.player_positions = {
        [Op.like]: `%${position}%`
      };
    }

    const players = await Player.findAll({
      where: whereClause,
      attributes: [
        'id',
        'long_name',
        'age',
        'nationality_name',
        'club_name',
        'player_positions',
        'overall',
        'potential',
        'value_eur',
        'wage_eur',
        'height_cm',
        'weight_kg',
        'preferred_foot',
        'work_rate'
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
      whereConditions.push('long_name LIKE ?');
      params.push(`%${name}%`);
    }
    
    if (club) {
      whereConditions.push('club_name LIKE ?');
      params.push(`%${club}%`);
    }
    
    if (position) {
      whereConditions.push('player_positions LIKE ?');
      params.push(`%${position}%`);
    }
    
    const whereClause = whereConditions.length > 0 ? 'WHERE ' + whereConditions.join(' AND ') : '';
    
    const query = `
      SELECT id, long_name, age, nationality_name, club_name, player_positions, 
             overall, potential, value_eur, wage_eur, height_cm, weight_kg, 
             preferred_foot, work_rate 
      FROM players 
      ${whereClause}
    `;
    
    const sequelize = require('../config/db');
    const results = await sequelize.query(query, {
      replacements: params,
      type: sequelize.QueryTypes.SELECT
    });

    // Crear CSV con headers mejorados
    let csv = 'ID,Nombre Completo,Edad,Nacionalidad,Club,Posición,Overall,Potencial,Valor (EUR),Salario (EUR),Altura (cm),Peso (kg),Pie Preferido,Ritmo de Trabajo\n';
    
    results.forEach(player => {
      csv += `${player.id},"${player.long_name}",${player.age},"${player.nationality_name}","${player.club_name}","${player.player_positions}",${player.overall},${player.potential || ''},${player.value_eur || ''},${player.wage_eur || ''},${player.height_cm || ''},${player.weight_kg || ''},"${player.preferred_foot || ''}","${player.work_rate || ''}"\n`;
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
