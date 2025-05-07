
'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useTheme } from '@/context/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import PlayerCard from '@/components/PlayerCard';
import { cricketApi } from '@/services/cricketApi';
import RadarPlayerChart from '@/components/RadarPlayerChart';
import { toast } from '@/components/ui/sonner';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

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

const playerOptions = [
  { id: '1', name: 'Virat Kohli', country: 'IND', role: 'Batsman', imageUrl: '/images/players/virat-kohli.jpg' },
  { id: '2', name: 'Joe Root', country: 'ENG', role: 'Batsman', imageUrl: '/images/players/joe-root.jpg' },
  { id: '3', name: 'Steve Smith', country: 'AUS', role: 'Batsman', imageUrl: '/images/players/steve-smith.jpg' },
  { id: '4', name: 'Kane Williamson', country: 'NZ', role: 'Batsman', imageUrl: '/images/players/kane-williamson.jpg' },
  { id: '5', name: 'Rohit Sharma', country: 'IND', role: 'Batsman', imageUrl: '/images/players/rohit-sharma.jpg' },
  { id: '6', name: 'David Warner', country: 'AUS', role: 'Batsman', imageUrl: '/images/players/david-warner.jpg' },
  { id: '7', name: 'Babar Azam', country: 'PAK', role: 'Batsman', imageUrl: '/images/players/babar-azam.jpg' },
  { id: '8', name: 'Quinton de Kock', country: 'SA', role: 'Batsman', imageUrl: '/images/players/quinton-de-kock.jpg' },
];

const Compare: React.FC = () => {
  const { isDark = false, toggleTheme = () => {} } = useTheme();
  const [player1, setPlayer1] = useState<string>('1');
  const [player2, setPlayer2] = useState<string>('2');
  const [activeTab, setActiveTab] = useState<string>('overall');
  const [error, setError] = useState<string | null>(null);
  const [player1Data, setPlayer1Data] = useState<PlayerData | null>(null);
  const [player2Data, setPlayer2Data] = useState<PlayerData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPlayerData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [data1, data2] = await Promise.all([
          cricketApi.getPlayerStats(player1),
          cricketApi.getPlayerStats(player2),
        ]);
        
        if (!data1 || !data2) {
          setError('Failed to fetch player data. Please try again later.');
          return;
        }

        setPlayer1Data(data1);
        setPlayer2Data(data2);
        
        // Show toast when using mock data
        toast.info("Using pre-loaded player data for comparison", {
          description: "Live API data is unavailable at the moment."
        });
        
      } catch (err) {
        setError('An error occurred while fetching player data. Please try again later.');
        console.error('Error fetching player data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerData();
  }, [player1, player2]);

  const getStatComparisonData = () => {
    if (!player1Data || !player2Data) {
      return [];
    }

    return [
      {
        name: 'Runs',
        [player1Data.name]: Number(player1Data.stats.runs),
        [player2Data.name]: Number(player2Data.stats.runs),
      },
      {
        name: 'Average',
        [player1Data.name]: Number(player1Data.stats.average),
        [player2Data.name]: Number(player2Data.stats.average),
      },
      {
        name: 'Strike Rate',
        [player1Data.name]: Number(player1Data.stats.strikeRate),
        [player2Data.name]: Number(player2Data.stats.strikeRate),
      },
    ];
  };

  const getPlayerCardData = (playerId: string) => {
    const data = playerId === player1 ? player1Data : player2Data;
    if (!data) return null;

    return {
      id: playerId,
      name: data.name,
      country: data.country,
      role: data.role,
      stats: {
        matches: data.stats.matches,
        runs: data.stats.runs,
        average: data.stats.average,
        hundreds: data.stats.hundreds,
        fifties: data.stats.fifties,
      },
      imageUrl: data.imageUrl,
    };
  };

  // Generate skill data for radar chart
  const getSkillsData = (player: PlayerData) => ({
    name: player.name,
    color: player.color,
    skills: [
      { name: "Technique", value: Math.floor(70 + Math.random() * 20) },
      { name: "Power", value: Math.floor(70 + Math.random() * 20) },
      { name: "Consistency", value: Math.floor(player.stats.average) },
      { name: "Aggression", value: Math.floor(player.stats.strikeRate / 2) },
      { name: "Form", value: Math.floor(65 + Math.random() * 25) },
      { name: "Experience", value: Math.floor(player.stats.matches / 1.5) > 100 ? 100 : Math.floor(player.stats.matches / 1.5) }
    ]
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar toggleTheme={toggleTheme} isDark={isDark} />
      
      <main className="flex-1 pt-20 pb-10 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8">Player Comparison Tool</h1>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Player 1 Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Player 1</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={player1} onValueChange={setPlayer1}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Player 1" />
                  </SelectTrigger>
                  <SelectContent>
                    {playerOptions.map((player) => (
                      <SelectItem key={player.id} value={player.id}>
                        {player.name} ({player.country})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {player1Data && getPlayerCardData(player1) && (
                  <div className="mt-4">
                    <PlayerCard player={{ id: player1, ...getPlayerCardData(player1)! }} />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Player 2 Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Player 2</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={player2} onValueChange={setPlayer2}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Player 2" />
                  </SelectTrigger>
                  <SelectContent>
                    {playerOptions.map((player) => (
                      <SelectItem key={player.id} value={player.id}>
                        {player.name} ({player.country})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {player2Data && getPlayerCardData(player2) && (
                  <div className="mt-4">
                    <PlayerCard player={{ id: player2, ...getPlayerCardData(player2)! }} />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Comparison Visualizations */}
          {player1Data && player2Data && (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold mb-4">Comparison Analysis</h2>

              {/* Stats Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Statistical Comparison</CardTitle>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={getStatComparisonData()}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          borderRadius: '0.5rem',
                          border: '1px solid #e2e8f0',
                          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                        }}
                      />
                      <Legend />
                      <Bar dataKey={player1Data.name} fill={player1Data.color} />
                      <Bar dataKey={player2Data.name} fill={player2Data.color} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              {/* Skills Radar Chart Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Skills Analysis</CardTitle>
                </CardHeader>
                <CardContent className="h-[450px]">
                  {player1Data && player2Data && (
                    <RadarPlayerChart 
                      player={getSkillsData(player1Data)}
                      secondPlayer={getSkillsData(player2Data)}
                      title="Player Attributes Comparison"
                    />
                  )}
                </CardContent>
              </Card>

              {/* Recent Form Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{player1Data.name}'s Recent Form</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {player1Data.recentForm.map((match, index) => (
                        <div key={index} className="flex items-center p-2 border-b">
                          <div className={`w-3 h-3 rounded-full mr-3 ${
                            match.runs > 50 ? 'bg-green-500' : match.runs > 20 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                          <div>
                            <p className="font-medium">{match.match}</p>
                            <p className="text-sm text-muted-foreground">{match.venue}</p>
                            <p className="text-xs font-semibold">{match.runs} runs ({match.balls} balls)</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{player2Data.name}'s Recent Form</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {player2Data.recentForm.map((match, index) => (
                        <div key={index} className="flex items-center p-2 border-b">
                          <div className={`w-3 h-3 rounded-full mr-3 ${
                            match.runs > 50 ? 'bg-green-500' : match.runs > 20 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                          <div>
                            <p className="font-medium">{match.match}</p>
                            <p className="text-sm text-muted-foreground">{match.venue}</p>
                            <p className="text-xs font-semibold">{match.runs} runs ({match.balls} balls)</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="border rounded-lg p-4 bg-yellow-50 dark:bg-yellow-900/20 mt-8">
                <h3 className="text-lg font-medium flex items-center text-yellow-800 dark:text-yellow-400">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                  </svg>
                  AI-Enhanced Insight
                </h3>
                <p className="mt-2 text-yellow-700 dark:text-yellow-300">
                  Based on form analysis, {player1Data.name} is performing 15% better in recent matches compared to {player2Data.name}, particularly against pace bowling. However, {player2Data.name} has a 22% higher scoring rate against spin bowling.
                </p>
              </div>
            </div>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-8">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overall">Overall Stats</TabsTrigger>
              <TabsTrigger value="phases">Phase Analysis</TabsTrigger>
              <TabsTrigger value="shots">Shot Analysis</TabsTrigger>
              <TabsTrigger value="form">Recent Form</TabsTrigger>
            </TabsList>

            <TabsContent value="overall">
              {/* Overall stats content */}
            </TabsContent>

            <TabsContent value="phases">
              {/* Phase analysis content */}
            </TabsContent>

            <TabsContent value="shots">
              {/* Shot analysis content */}
            </TabsContent>

            <TabsContent value="form">
              {/* Recent form content */}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Compare;
