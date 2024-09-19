const axios = require('axios');

// URL to get all players
const playersUrl = 'https://watsonfantasyfootball.espn.com/espnpartner/dallas/players/players_ESPNFantasyFootball_2024.json';

// Fetch all players(to get their ID's)
const fetchAllPlayers = async () => {
    try {
        const response = await axios.get(playersUrl);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching players');
    }
};

// Fetch player by ID
const fetchPlayerById = async (playerId) => {
    try {
        const playerUrl = `https://watsonfantasyfootball.espn.com/espnpartner/dallas/players/players_${playerId}_ESPNFantasyFootball_2024.json`;
        const response = await axios.get(playerUrl);
        const playerData = response.data;

        return {
            fullName: playerData.FULL_NAME,
            position: playerData.POSITION,
            nextOpponent: playerData.OPPONENT_NAME,
            opponentRank: playerData.OPPONENT_RANK,
            
        }
    } catch (error) {
        throw new Error(`Error fetching data for player ID ${playerId}`);
    }
};

module.exports = {
    fetchAllPlayers,
    fetchPlayerById
};