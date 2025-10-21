const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');
const { validatePlayer } = require('../validators/playerValidator');

// CRUD básico
router.get('/', playerController.getAllPlayers);
router.post('/', validatePlayer, playerController.createPlayer);
router.get('/:id', playerController.getPlayerById);
router.put('/:id', validatePlayer, playerController.updatePlayer);
router.delete('/:id', playerController.deletePlayer);

module.exports = router;
