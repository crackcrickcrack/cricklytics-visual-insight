
import axios from 'axios';

// Use Vite's environment variables
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_API_URL || 'https://api.cricapi.com/v1';

// Debug logging
console.log('API Configuration:', {
  hasApiKey: !!API_KEY,
  baseUrl: BASE_URL,
  env: import.meta.env
});

interface PlayerStats {
  matches: number;
  runs: number;
  average: number;
  strikeRate: number;
  hundreds: number;
  fifties: number;
}

interface PlayerData {
  name: string;
  country: string;
  role: string;
  stats: PlayerStats;
  color: string;
  imageUrl: string;
  batting?: {
    phases: {
      powerplay: { runs: number; average: number; strikeRate: number };
      middle: { runs: number; average: number; strikeRate: number };
      death: { runs: number; average: number; strikeRate: number };
    };
    shots: {
      name: string;
      runs: number;
      average: number;
      strikeRate: number;
    }[];
  };
  recentForm: {
    match: string;
    runs: number;
    balls: number;
    venue: string;
  }[];
}

// Mock player data to use when API isn't accessible
const mockPlayerData: Record<string, PlayerData> = {
  '1': {
    name: 'Virat Kohli',
    country: 'IND',
    role: 'Batsman',
    stats: {
      matches: 102,
      runs: 3932,
      average: 52.8,
      strikeRate: 138.2,
      hundreds: 5,
      fifties: 30,
    },
    color: '#1E40AF',
    imageUrl: '/images/players/virat-kohli.jpg',
    batting: {
      phases: {
        powerplay: { runs: 1200, average: 48.5, strikeRate: 132.6 },
        middle: { runs: 1800, average: 56.2, strikeRate: 135.8 },
        death: { runs: 932, average: 60.1, strikeRate: 181.5 },
      },
      shots: [
        { name: 'Cover Drive', runs: 650, average: 65.0, strikeRate: 145.2 },
        { name: 'Pull Shot', runs: 520, average: 58.5, strikeRate: 165.3 },
        { name: 'Straight Drive', runs: 450, average: 62.3, strikeRate: 140.1 },
      ],
    },
    recentForm: [
      { match: 'IND vs AUS', runs: 82, balls: 51, venue: 'Sydney Cricket Ground' },
      { match: 'IND vs ENG', runs: 56, balls: 32, venue: 'Lords' },
      { match: 'IND vs NZ', runs: 124, balls: 70, venue: 'Eden Gardens' },
      { match: 'IND vs SA', runs: 45, balls: 28, venue: 'Newlands' },
      { match: 'IND vs WI', runs: 78, balls: 46, venue: 'Sabina Park' },
    ],
  },
  '2': {
    name: 'Joe Root',
    country: 'ENG',
    role: 'Batsman',
    stats: {
      matches: 96,
      runs: 3528,
      average: 48.3,
      strikeRate: 132.5,
      hundreds: 3,
      fifties: 28,
    },
    color: '#0A192F',
    imageUrl: '/images/players/joe-root.jpg',
    batting: {
      phases: {
        powerplay: { runs: 980, average: 45.2, strikeRate: 128.4 },
        middle: { runs: 1780, average: 52.1, strikeRate: 130.5 },
        death: { runs: 768, average: 55.8, strikeRate: 165.2 },
      },
      shots: [
        { name: 'Late Cut', runs: 580, average: 58.0, strikeRate: 135.6 },
        { name: 'Sweep Shot', runs: 620, average: 62.0, strikeRate: 140.2 },
        { name: 'Drive', runs: 480, average: 56.2, strikeRate: 132.5 },
      ],
    },
    recentForm: [
      { match: 'ENG vs AUS', runs: 65, balls: 42, venue: 'Melbourne Cricket Ground' },
      { match: 'ENG vs IND', runs: 92, balls: 58, venue: 'Oval' },
      { match: 'ENG vs NZ', runs: 38, balls: 25, venue: 'Lords' },
      { match: 'ENG vs PAK', runs: 112, balls: 71, venue: 'Trent Bridge' },
      { match: 'ENG vs WI', runs: 55, balls: 35, venue: 'Barbados' },
    ],
  },
  '3': {
    name: 'Steve Smith',
    country: 'AUS',
    role: 'Batsman',
    stats: {
      matches: 92,
      runs: 3428,
      average: 51.2,
      strikeRate: 130.6,
      hundreds: 3,
      fifties: 26,
    },
    color: '#1F2937',
    imageUrl: '/images/players/steve-smith.jpg',
    batting: {
      phases: {
        powerplay: { runs: 880, average: 44.0, strikeRate: 125.8 },
        middle: { runs: 1780, average: 54.8, strikeRate: 135.2 },
        death: { runs: 768, average: 56.2, strikeRate: 168.7 },
      },
      shots: [
        { name: 'Pull Shot', runs: 620, average: 62.0, strikeRate: 152.3 },
        { name: 'Cover Drive', runs: 540, average: 60.0, strikeRate: 142.1 },
        { name: 'Flick', runs: 460, average: 57.5, strikeRate: 145.8 },
      ],
    },
    recentForm: [
      { match: 'AUS vs ENG', runs: 88, balls: 52, venue: 'WACA' },
      { match: 'AUS vs IND', runs: 105, balls: 65, venue: 'Sydney Cricket Ground' },
      { match: 'AUS vs NZ', runs: 62, balls: 40, venue: 'Adelaide Oval' },
      { match: 'AUS vs SA', runs: 34, balls: 22, venue: 'The Gabba' },
      { match: 'AUS vs WI', runs: 76, balls: 48, venue: 'MCG' },
    ],
  },
  '4': {
    name: 'Kane Williamson',
    country: 'NZ',
    role: 'Batsman',
    stats: {
      matches: 88,
      runs: 3120,
      average: 47.8,
      strikeRate: 128.4,
      hundreds: 2,
      fifties: 25,
    },
    color: '#1E3A8A',
    imageUrl: '/images/players/kane-williamson.jpg',
    batting: {
      phases: {
        powerplay: { runs: 850, average: 42.5, strikeRate: 121.5 },
        middle: { runs: 1620, average: 51.2, strikeRate: 129.8 },
        death: { runs: 650, average: 52.5, strikeRate: 160.2 },
      },
      shots: [
        { name: 'Cut Shot', runs: 580, average: 58.0, strikeRate: 142.5 },
        { name: 'Cover Drive', runs: 510, average: 56.7, strikeRate: 138.6 },
        { name: 'Pull Shot', runs: 420, average: 52.5, strikeRate: 145.8 },
      ],
    },
    recentForm: [
      { match: 'NZ vs AUS', runs: 56, balls: 38, venue: 'Eden Park' },
      { match: 'NZ vs ENG', runs: 78, balls: 52, venue: 'Hagley Oval' },
      { match: 'NZ vs IND', runs: 45, balls: 32, venue: 'Basin Reserve' },
      { match: 'NZ vs PAK', runs: 102, balls: 68, venue: 'Seddon Park' },
      { match: 'NZ vs SA', runs: 67, balls: 45, venue: 'Bay Oval' },
    ],
  },
  '5': {
    name: 'Rohit Sharma',
    country: 'IND',
    role: 'Batsman',
    stats: {
      matches: 96,
      runs: 3690,
      average: 48.6,
      strikeRate: 140.2,
      hundreds: 4,
      fifties: 28,
    },
    color: '#1E40AF',
    imageUrl: '/images/players/rohit-sharma.jpg',
    batting: {
      phases: {
        powerplay: { runs: 1420, average: 52.5, strikeRate: 135.8 },
        middle: { runs: 1650, average: 50.2, strikeRate: 138.6 },
        death: { runs: 620, average: 54.8, strikeRate: 176.5 },
      },
      shots: [
        { name: 'Pull Shot', runs: 820, average: 68.3, strikeRate: 168.5 },
        { name: 'Cover Drive', runs: 580, average: 58.0, strikeRate: 148.2 },
        { name: 'Straight Drive', runs: 450, average: 56.2, strikeRate: 142.8 },
      ],
    },
    recentForm: [
      { match: 'IND vs AUS', runs: 90, balls: 56, venue: 'Wankhede Stadium' },
      { match: 'IND vs ENG', runs: 65, balls: 42, venue: 'Narendra Modi Stadium' },
      { match: 'IND vs NZ', runs: 48, balls: 32, venue: 'M. Chinnaswamy Stadium' },
      { match: 'IND vs SA', runs: 118, balls: 72, venue: 'MA Chidambaram Stadium' },
      { match: 'IND vs WI', runs: 52, balls: 38, venue: 'Feroz Shah Kotla' },
    ],
  },
  '6': {
    name: 'David Warner',
    country: 'AUS',
    role: 'Batsman',
    stats: {
      matches: 94,
      runs: 3580,
      average: 49.8,
      strikeRate: 142.5,
      hundreds: 4,
      fifties: 25,
    },
    color: '#1F2937',
    imageUrl: '/images/players/david-warner.jpg',
    batting: {
      phases: {
        powerplay: { runs: 1520, average: 55.8, strikeRate: 145.8 },
        middle: { runs: 1480, average: 47.2, strikeRate: 138.6 },
        death: { runs: 580, average: 52.5, strikeRate: 182.5 },
      },
      shots: [
        { name: 'Pull Shot', runs: 780, average: 65.0, strikeRate: 172.5 },
        { name: 'Cut Shot', runs: 680, average: 62.0, strikeRate: 158.6 },
        { name: 'Lofted Drive', runs: 520, average: 58.0, strikeRate: 165.8 },
      ],
    },
    recentForm: [
      { match: 'AUS vs ENG', runs: 75, balls: 42, venue: 'SCG' },
      { match: 'AUS vs IND', runs: 52, balls: 35, venue: 'MCG' },
      { match: 'AUS vs NZ', runs: 124, balls: 68, venue: 'Adelaide Oval' },
      { match: 'AUS vs PAK', runs: 48, balls: 32, venue: 'The Gabba' },
      { match: 'AUS vs SA', runs: 85, balls: 52, venue: 'Perth Stadium' },
    ],
  },
  '7': {
    name: 'Babar Azam',
    country: 'PAK',
    role: 'Batsman',
    stats: {
      matches: 82,
      runs: 3180,
      average: 50.5,
      strikeRate: 136.8,
      hundreds: 3,
      fifties: 24,
    },
    color: '#064E3B',
    imageUrl: '/images/players/babar-azam.jpg',
    batting: {
      phases: {
        powerplay: { runs: 980, average: 46.5, strikeRate: 128.5 },
        middle: { runs: 1680, average: 52.5, strikeRate: 136.8 },
        death: { runs: 520, average: 48.2, strikeRate: 165.2 },
      },
      shots: [
        { name: 'Cover Drive', runs: 820, average: 68.3, strikeRate: 148.5 },
        { name: 'Flick', runs: 580, average: 58.0, strikeRate: 142.5 },
        { name: 'Straight Drive', runs: 480, average: 55.2, strikeRate: 138.6 },
      ],
    },
    recentForm: [
      { match: 'PAK vs AUS', runs: 82, balls: 52, venue: 'Gaddafi Stadium' },
      { match: 'PAK vs ENG', runs: 110, balls: 65, venue: 'National Stadium' },
      { match: 'PAK vs IND', runs: 65, balls: 42, venue: 'Dubai International Stadium' },
      { match: 'PAK vs NZ', runs: 48, balls: 32, venue: 'Rawalpindi Cricket Stadium' },
      { match: 'PAK vs SA', runs: 72, balls: 48, venue: 'Lahore' },
    ],
  },
  '8': {
    name: 'Quinton de Kock',
    country: 'SA',
    role: 'Batsman',
    stats: {
      matches: 86,
      runs: 3080,
      average: 46.8,
      strikeRate: 138.5,
      hundreds: 2,
      fifties: 24,
    },
    color: '#7F1D1D',
    imageUrl: '/images/players/quinton-de-kock.jpg',
    batting: {
      phases: {
        powerplay: { runs: 1280, average: 48.5, strikeRate: 142.5 },
        middle: { runs: 1320, average: 45.8, strikeRate: 135.8 },
        death: { runs: 480, average: 42.5, strikeRate: 168.5 },
      },
      shots: [
        { name: 'Pull Shot', runs: 680, average: 62.0, strikeRate: 158.5 },
        { name: 'Cut Shot', runs: 620, average: 58.0, strikeRate: 152.8 },
        { name: 'Cover Drive', runs: 480, average: 52.5, strikeRate: 138.6 },
      ],
    },
    recentForm: [
      { match: 'SA vs AUS', runs: 68, balls: 45, venue: 'The Wanderers' },
      { match: 'SA vs ENG', runs: 52, balls: 38, venue: 'Newlands' },
      { match: 'SA vs IND', runs: 94, balls: 58, venue: 'SuperSport Park' },
      { match: 'SA vs NZ', runs: 42, balls: 28, venue: 'St George\'s Park' },
      { match: 'SA vs PAK', runs: 78, balls: 52, venue: 'Kingsmead' },
    ],
  },
};

export const cricketApi = {
  async getPlayerStats(playerId: string): Promise<PlayerData | null> {
    try {
      // Try to use the API first
      if (!API_KEY) {
        console.error('API key is not configured. Using mock data.');
        return mockPlayerData[playerId] || null;
      }

      console.log('Fetching player stats for ID:', playerId);
      
      try {
        const response = await axios.get(`${BASE_URL}/players`, {
          params: {
            apikey: API_KEY,
            id: playerId,
          },
        });
        
        console.log('API Response:', response.data);
        
        const data = response.data as { data?: Array<any> };
        if (!data.data || data.data.length === 0) {
          console.log('No data returned from API, using mock data');
          return mockPlayerData[playerId] || null;
        }

        const player = data.data[0];
        
        // Transform API response to match our PlayerData interface
        return {
          name: player.name,
          country: player.country,
          role: player.role,
          stats: {
            matches: player.stats?.matches || 0,
            runs: player.stats?.runs || 0,
            average: player.stats?.average || 0,
            strikeRate: player.stats?.strikeRate || 0,
            hundreds: player.stats?.hundreds || 0,
            fifties: player.stats?.fifties || 0,
          },
          color: getPlayerColor(player.country),
          imageUrl: player.imageUrl || `/images/players/${player.name.toLowerCase().replace(' ', '-')}.jpg`,
          batting: {
            phases: {
              powerplay: {
                runs: player.stats?.powerplayRuns || 0,
                average: player.stats?.powerplayAverage || 0,
                strikeRate: player.stats?.powerplayStrikeRate || 0,
              },
              middle: {
                runs: player.stats?.middleRuns || 0,
                average: player.stats?.middleAverage || 0,
                strikeRate: player.stats?.middleStrikeRate || 0,
              },
              death: {
                runs: player.stats?.deathRuns || 0,
                average: player.stats?.deathAverage || 0,
                strikeRate: player.stats?.deathStrikeRate || 0,
              },
            },
            shots: player.stats?.shots || [],
          },
          recentForm: await cricketApi.getRecentForm(playerId),
        };
      } catch (error) {
        console.log('API error, falling back to mock data');
        return mockPlayerData[playerId] || null;
      }
    } catch (error: any) {
      console.error('Error in getPlayerStats:', error.message);
      // Fallback to mock data on any error
      return mockPlayerData[playerId] || null;
    }
  },

  async getRecentForm(playerId: string) {
    try {
      if (!API_KEY) {
        console.error('API key is not configured. Using mock data.');
        return mockPlayerData[playerId]?.recentForm || [];
      }

      console.log('Fetching recent form for player ID:', playerId);
      try {
        const response = await axios.get(`${BASE_URL}/matches`, {
          params: {
            apikey: API_KEY,
            playerId: playerId,
            limit: 5,
          },
        });
        
        console.log('Recent Form Response:', response.data);
        
        const data = response.data as { data?: Array<{ teams: string[], runs?: number, balls?: number, venue?: string }> };
        if (!data.data || data.data.length === 0) {
          console.log('No recent form data from API, using mock data');
          return mockPlayerData[playerId]?.recentForm || [];
        }
        
        return data.data.map(match => ({
          match: `${match.teams[0]} vs ${match.teams[1]}`,
          runs: match.runs || 0,
          balls: match.balls || 0,
          venue: match.venue || 'Unknown',
        }));
      } catch (error) {
        console.log('API error for recent form, falling back to mock data');
        return mockPlayerData[playerId]?.recentForm || [];
      }
    } catch (error: any) {
      console.error('Error in getRecentForm:', error.message);
      // Fallback to mock data on any error
      return mockPlayerData[playerId]?.recentForm || [];
    }
  },
};

// Helper function to get player color based on country
function getPlayerColor(country: string): string {
  const colors: Record<string, string> = {
    'IND': '#1E40AF', // Blue
    'ENG': '#0A192F', // Dark Blue
    'AUS': '#1F2937', // Dark Gray
    'NZ': '#1E3A8A', // Navy
    'PAK': '#064E3B', // Dark Green
    'SA': '#7F1D1D', // Dark Red
    'WI': '#78350F', // Brown
    'SL': '#1E3A8A', // Navy
    'BAN': '#064E3B', // Dark Green
    'AFG': '#7F1D1D', // Dark Red
  };

  return colors[country] || '#1E40AF'; // Default to blue if country not found
}
