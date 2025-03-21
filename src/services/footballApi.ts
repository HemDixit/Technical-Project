import axios from 'axios';

const footballApi = axios.create({
  baseURL: 'https://v3.football.api-sports.io',
  headers: {
    'x-apisports-key': '4bcbda405acce23ac75a8d70825b4f7c'
  }
});

export const searchPlayers = async (name: string) => {
  try {
    const response = await footballApi.get('/players', {
      params: {
        search: name,
        league: '39', // Premier League
        season: '2023'
      }
    });
    
    // Transform the response to include player images from API
    const players = response.data.response.map(player => ({
      ...player,
      player: {
        ...player.player,
        photo: `https://media.api-sports.io/football/players/${player.player.id}.png`
      }
    }));
    
    return players;
  } catch (error) {
    console.error('Error fetching players:', error);
    return [];
  }
};

export const getPlayerStats = async (playerId: number) => {
  try {
    const response = await footballApi.get('/players', {
      params: {
        id: playerId,
        season: '2023'
      }
    });
    
    const player = response.data.response[0];
    if (player) {
      player.player.photo = `https://media.api-sports.io/football/players/${player.player.id}.png`;
    }
    
    return player;
  } catch (error) {
    console.error('Error fetching player stats:', error);
    return null;
  }
};