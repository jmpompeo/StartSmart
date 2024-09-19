const express = require('express');
const { getAllPlayers, getPlayerById, comparePlayers } = require('../controllers/playerController');

const router = express.Router();

// Get all players
router.get('/', getAllPlayers);

// Get player by ID
router.get('/:id', getPlayerById);

// Compare two players
router.post('/compare', comparePlayers);

module.exports = router;