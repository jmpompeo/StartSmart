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
        console.log(`Fetching player ${playerId}`);

        const player = await fetchPlayerById(playerId);
        console.log(`Player data:`, player);
        
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
        const player1 = allPlayers.find(player => player.FULL_NAME.toLowerCase() === player1Name.toLowerCase());
        const player2 = allPlayers.find(player => player.FULL_NAME.toLowerCase() === player2Name.toLowerCase());

        if (!player1 || !player2) {
            return res.status(404).json({message: 'One or both players not found'});
        }

        // Fetch detailed player stats by their ID's
        const player1Id = player1.PLAYERID;
        const player2Id = player2.PLAYERID;

        const player1Data = await fetchPlayerById(player1Id);
        const player2Data = await fetchPlayerById(player2Id);

        // Compare opposition rank
        let recommendedPlayer;
        const rankDifference = Math.abs(player1Data.opponentRank - player2Data.opponentRank);

        if (player1Data.opponentRank > player2Data.opponentRank) {
            recommendedPlayer = player1Data;
        } else if (player2Data.opponentRank > player1Data.opponentRank) {
            recommendedPlayer = player2Data;
        } else if (rankDifference <= 3) {
            recommendedPlayer = player1Data.projectedPoints > player2Data.projectedPoints ? player1Data : player2Data
        }

        res.status(200).json({
            recommendedPlayer: recommendedPlayer
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