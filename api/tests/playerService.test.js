const { fetchPlayerById } = require('../src/services/playerService');
const axios = require('axios');

// Mock axios
jest.mock('axios');

describe('fetchPlayerById', () => {
  it('should fetch player data for a given player ID', async () => {
    // Mock response for axios
    const playerId = '12345';
    const mockResponse = {
      data: [
        {
          FULL_NAME: 'Aaron Rodgers',
          POSITION: 'QB',
          OPPONENT_NAME: 'Team A',
          OPPOSITION_RANK: 10,
          OUTSIDE_PROJECTION: 20,
          EVENT_WEEK: 1
        }
      ]
    };

    axios.get.mockResolvedValue(mockResponse);

    // Call fetchPlayerById and assert result
    const playerData = await fetchPlayerById(playerId);
    
    expect(playerData).toEqual({
      fullName: 'Aaron Rodgers',
      position: 'QB',
      nextOpponent: 'Team A',
      opponentRank: 10,
      projectedPoints: 20,
      currentWeek: 1
    });
  });

  it('should throw an error if player data is not found', async () => {
    // Mock a failed response
    const playerId = '67890';
    axios.get.mockRejectedValue(new Error('Player not found'));

    await expect(fetchPlayerById(playerId)).rejects.toThrow('Error fetching data for player ID 67890');
  });
});
