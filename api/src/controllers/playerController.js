const { fetchAllPlayers, fetchPlayerById } = require('../services/playerService');

// GET all players(to get player ID's)
const getAllPlayers = async (req, res, next) => {
    try {
        const players = await fetchAllPlayers();
        res.status(200).json(players);
    } catch (error) {
        next(error);
    }

};

// Get player by ID
const getPlayerById = async (req, res, next) => {
    try {
        const playerId = req.params.id;
        const player = await fetchPlayerById(playerId);
        if (!player) {
            return res.status(404).json({message: 'player not found'});
        }
        res.status(200).json(player);
    } catch (error) {
        next(error);
    }
};

// POST Compare two players
const comparePlayers = async (req, res, next) => {
    const { player1Name, player2Name } = req.body;

    try {
        const allPlayers = await fetchAllPlayers();

        // Find player ID's by their names
        const player1 = allPlayers.find(player => player.FULL_NAME === player1Name);
        const player2 = allPlayers.find(player => player.FULL_NAME === player2Name);

        if (!player1 || !player2) {
            return res.status(404).json({message: 'One or both players not found'});
        }

        // Fetch detailed player stats by their ID's
        const player1Data = await fetchPlayerById(player1.id);
        const player2Data = await fetchPlayerById(player2.id);

        res.status(200).json({
            player1: player1Data,
            player2: player2Data
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllPlayers,
    getPlayerById,
    comparePlayers
};