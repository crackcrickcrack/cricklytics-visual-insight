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

export const cricketApi = {
  async getPlayerStats(playerId: string): Promise<PlayerData | null> {
    try {
      if (!API_KEY) {
        console.error('API key is not configured. Please check your .env file.');
        return null;
      }

      console.log('Fetching player stats for ID:', playerId);
      const response = await axios.get(`${BASE_URL}/players`, {
        params: {
          apikey: API_KEY,
          id: playerId,
        },
      });

      console.log('API Response:', response.data);

      const data = response.data as { data?: Array<any> };
      if (!data.data || data.data.length === 0) {
        console.error('No player data found for ID:', playerId);
        return null;
      }

      const player = data.data[0];
      
      // Transform API response to match our PlayerData interface
      return {
        name: player.name,
        country: player.country,
        role: player.role,
        stats: {
          matches: player.stats.matches || 0,
          runs: player.stats.runs || 0,
          average: player.stats.average || 0,
          strikeRate: player.stats.strikeRate || 0,
          hundreds: player.stats.hundreds || 0,
          fifties: player.stats.fifties || 0,
        },
        color: getPlayerColor(player.country),
        imageUrl: player.imageUrl || `/images/players/${player.name.toLowerCase().replace(' ', '-')}.jpg`,
        batting: {
          phases: {
            powerplay: {
              runs: player.stats.powerplayRuns || 0,
              average: player.stats.powerplayAverage || 0,
              strikeRate: player.stats.powerplayStrikeRate || 0,
            },
            middle: {
              runs: player.stats.middleRuns || 0,
              average: player.stats.middleAverage || 0,
              strikeRate: player.stats.middleStrikeRate || 0,
            },
            death: {
              runs: player.stats.deathRuns || 0,
              average: player.stats.deathAverage || 0,
              strikeRate: player.stats.deathStrikeRate || 0,
            },
          },
          shots: player.stats.shots || [],
        },
        recentForm: await cricketApi.getRecentForm(playerId),
      };
    } catch (error: any) {
      console.error('API Error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          params: error.config?.params,
        }
      });
      return null;
    }
  },

  async getRecentForm(playerId: string) {
    try {
      if (!API_KEY) {
        console.error('API key is not configured. Please check your .env file.');
        return [];
      }

      console.log('Fetching recent form for player ID:', playerId);
      const response = await axios.get(`${BASE_URL}/matches`, {
        params: {
          apikey: API_KEY,
          playerId: playerId,
          limit: 5,
        },
      });

      console.log('Recent Form Response:', response.data);

      const data = response.data as { data: Array<{ teams: string[], runs?: number, balls?: number, venue?: string }> };
      return data.data.map(match => ({
        match: `${match.teams[0]} vs ${match.teams[1]}`,
        runs: match.runs || 0,
        balls: match.balls || 0,
        venue: match.venue || 'Unknown',
      }));
    } catch (error: any) {
      console.error('API Error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          params: error.config?.params,
        }
      });
      return [];
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
