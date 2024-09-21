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

        const playerDataArray = response.data;

        if (!Array.isArray(playerDataArray) || playerDataArray.length === 0) {
            throw new Error(`No data found for player: ${playerId}`);
        }

        // Find the data for the most current week
        const currentWeekData = playerDataArray.reduce((prev, curr) => {
            return curr.EVENT_WEEK > prev.EVENT_WEEK ? curr : prev;
        });

        return {
            fullName: currentWeekData.FULL_NAME,
            position: currentWeekData.POSITION,
            nextOpponent: currentWeekData.OPPONENT_NAME,
            opponentRank: currentWeekData.OPPOSITION_RANK,
            projectedPoints: currentWeekData.OUTSIDE_PROJECTION,
            currentWeek: currentWeekData.EVENT_WEEK
        };

    } catch (error) {
        console.error(`Error fetching player: ${playerId}`);
        throw new Error(`Error fetching data for player ID ${playerId}`);
    }
};

module.exports = {
    fetchAllPlayers,
    fetchPlayerById
};