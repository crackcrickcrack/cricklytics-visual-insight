
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useTheme } from '@/components/ThemeProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import RadarPlayerChart from '@/components/RadarPlayerChart';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

// Mock player data
const playerOptions = [
  { id: '1', name: 'Virat Kohli', country: 'India' },
  { id: '2', name: 'Joe Root', country: 'England' },
  { id: '3', name: 'Kane Williamson', country: 'New Zealand' },
  { id: '4', name: 'Babar Azam', country: 'Pakistan' },
  { id: '5', name: 'Steve Smith', country: 'Australia' },
  { id: '6', name: 'Jasprit Bumrah', country: 'India' },
  { id: '7', name: 'Pat Cummins', country: 'Australia' },
  { id: '8', name: 'Ben Stokes', country: 'England' },
];

// Mock player detailed data
const playerData: Record<string, {
  name: string;
  skills: { name: string; value: number }[];
  color: string;
  stats: Record<string, string | number>;
  recentForm: { match: string; score: string; result: string }[];
  venueStats: { name: string; value: number }[];
}> = {
  '1': {
    name: "Virat Kohli",
    skills: [
      { name: "Batting", value: 95 },
      { name: "Running", value: 92 },
      { name: "Fielding", value: 88 },
      { name: "Technique", value: 96 },
      { name: "Power", value: 85 },
      { name: "Consistency", value: 94 },
    ],
    color: "#007C41",
    stats: {
      matches: 274,
      runs: 12898,
      average: 57.32,
      strikeRate: 92.84,
      hundreds: 43,
      fifties: 65,
      bestScore: "183"
    },
    recentForm: [
      { match: "vs AUS", score: "87", result: "W" },
      { match: "vs ENG", score: "124", result: "W" },
      { match: "vs NZ", score: "43", result: "L" },
      { match: "vs SA", score: "76", result: "W" },
      { match: "vs WI", score: "32", result: "W" },
    ],
    venueStats: [
      { name: 'Home', value: 6789 },
      { name: 'Away', value: 4932 },
      { name: 'Neutral', value: 1177 },
    ]
  },
  '2': {
    name: "Joe Root",
    skills: [
      { name: "Batting", value: 91 },
      { name: "Running", value: 85 },
      { name: "Fielding", value: 83 },
      { name: "Technique", value: 97 },
      { name: "Power", value: 76 },
      { name: "Consistency", value: 89 },
    ],
    color: "#0A192F",
    stats: {
      matches: 163,
      runs: 6207,
      average: 50.05,
      strikeRate: 87.31,
      hundreds: 16,
      fifties: 36,
      bestScore: "154"
    },
    recentForm: [
      { match: "vs IND", score: "64", result: "L" },
      { match: "vs AUS", score: "89", result: "W" },
      { match: "vs PAK", score: "103", result: "W" },
      { match: "vs SA", score: "32", result: "L" },
      { match: "vs WI", score: "78", result: "W" },
    ],
    venueStats: [
      { name: 'Home', value: 3487 },
      { name: 'Away', value: 2209 },
      { name: 'Neutral', value: 511 },
    ]
  },
  '3': {
    name: "Kane Williamson",
    skills: [
      { name: "Batting", value: 90 },
      { name: "Running", value: 88 },
      { name: "Fielding", value: 85 },
      { name: "Technique", value: 98 },
      { name: "Power", value: 78 },
      { name: "Consistency", value: 92 },
    ],
    color: "#000000",
    stats: {
      matches: 151,
      runs: 6173,
      average: 52.77,
      strikeRate: 81.84,
      hundreds: 13,
      fifties: 33,
      bestScore: "251"
    },
    recentForm: [
      { match: "vs ENG", score: "132", result: "W" },
      { match: "vs IND", score: "57", result: "L" },
      { match: "vs AUS", score: "45", result: "L" },
      { match: "vs SA", score: "91", result: "W" },
      { match: "vs PAK", score: "104", result: "W" },
    ],
    venueStats: [
      { name: 'Home', value: 3246 },
      { name: 'Away', value: 2127 },
      { name: 'Neutral', value: 800 },
    ]
  },
  '4': {
    name: "Babar Azam",
    skills: [
      { name: "Batting", value: 93 },
      { name: "Running", value: 90 },
      { name: "Fielding", value: 82 },
      { name: "Technique", value: 95 },
      { name: "Power", value: 84 },
      { name: "Consistency", value: 88 },
    ],
    color: "#01411C",
    stats: {
      matches: 95,
      runs: 3696,
      average: 48.63,
      strikeRate: 87.24,
      hundreds: 9,
      fifties: 24,
      bestScore: "158"
    },
    recentForm: [
      { match: "vs SA", score: "103", result: "W" },
      { match: "vs NZ", score: "71", result: "W" },
      { match: "vs ENG", score: "84", result: "L" },
      { match: "vs AUS", score: "34", result: "L" },
      { match: "vs WI", score: "114", result: "W" },
    ],
    venueStats: [
      { name: 'Home', value: 1587 },
      { name: 'Away', value: 1432 },
      { name: 'Neutral', value: 677 },
    ]
  },
  '5': {
    name: "Steve Smith",
    skills: [
      { name: "Batting", value: 94 },
      { name: "Running", value: 84 },
      { name: "Fielding", value: 87 },
      { name: "Technique", value: 96 },
      { name: "Power", value: 82 },
      { name: "Consistency", value: 91 },
    ],
    color: "#FFCD00",
    stats: {
      matches: 168,
      runs: 8161,
      average: 59.57,
      strikeRate: 76.33,
      hundreds: 27,
      fifties: 30,
      bestScore: "239"
    },
    recentForm: [
      { match: "vs IND", score: "131", result: "W" },
      { match: "vs PAK", score: "78", result: "W" },
      { match: "vs NZ", score: "85", result: "W" },
      { match: "vs ENG", score: "144", result: "W" },
      { match: "vs SA", score: "32", result: "L" },
    ],
    venueStats: [
      { name: 'Home', value: 4107 },
      { name: 'Away', value: 3698 },
      { name: 'Neutral', value: 356 },
    ]
  },
  '6': {
    name: "Jasprit Bumrah",
    skills: [
      { name: "Bowling", value: 95 },
      { name: "Speed", value: 92 },
      { name: "Accuracy", value: 94 },
      { name: "Variation", value: 96 },
      { name: "Fielding", value: 82 },
      { name: "Batting", value: 40 },
    ],
    color: "#007C41",
    stats: {
      matches: 82,
      wickets: 141,
      average: 22.14,
      economy: 3.62,
      fiveWickets: 6,
      best: "6/27"
    },
    recentForm: [
      { match: "vs AUS", score: "3/42", result: "W" },
      { match: "vs ENG", score: "4/25", result: "W" },
      { match: "vs NZ", score: "2/39", result: "L" },
      { match: "vs SA", score: "5/32", result: "W" },
      { match: "vs WI", score: "3/28", result: "W" },
    ],
    venueStats: [
      { name: 'Home', value: 68 },
      { name: 'Away', value: 59 },
      { name: 'Neutral', value: 14 },
    ]
  },
  '7': {
    name: "Pat Cummins",
    skills: [
      { name: "Bowling", value: 94 },
      { name: "Speed", value: 91 },
      { name: "Accuracy", value: 93 },
      { name: "Variation", value: 88 },
      { name: "Fielding", value: 85 },
      { name: "Batting", value: 65 },
    ],
    color: "#FFCD00",
    stats: {
      matches: 93,
      wickets: 164,
      average: 21.67,
      economy: 3.12,
      fiveWickets: 8,
      best: "6/23"
    },
    recentForm: [
      { match: "vs IND", score: "4/39", result: "W" },
      { match: "vs PAK", score: "2/42", result: "W" },
      { match: "vs NZ", score: "3/38", result: "W" },
      { match: "vs ENG", score: "5/28", result: "W" },
      { match: "vs SA", score: "1/52", result: "L" },
    ],
    venueStats: [
      { name: 'Home', value: 87 },
      { name: 'Away', value: 66 },
      { name: 'Neutral', value: 11 },
    ]
  },
  '8': {
    name: "Ben Stokes",
    skills: [
      { name: "Batting", value: 88 },
      { name: "Bowling", value: 85 },
      { name: "Fielding", value: 90 },
      { name: "Power", value: 93 },
      { name: "Leadership", value: 92 },
      { name: "Consistency", value: 84 },
    ],
    color: "#0A192F",
    stats: {
      matches: 89,
      runs: 3068,
      average: 36.52,
      strikeRate: 86.71,
      hundreds: 12,
      fifties: 28,
      wickets: 195,
      bowlAverage: 32.18,
      economy: 3.71,
      best: "6/22"
    },
    recentForm: [
      { match: "vs IND", score: "82 & 2/45", result: "L" },
      { match: "vs AUS", score: "103 & 1/56", result: "W" },
      { match: "vs PAK", score: "67 & 3/23", result: "W" },
      { match: "vs SA", score: "46 & 0/61", result: "L" },
      { match: "vs WI", score: "155 & 2/34", result: "W" },
    ],
    venueStats: [
      { name: 'Home', value: 1754 },
      { name: 'Away', value: 1134 },
      { name: 'Neutral', value: 180 },
    ]
  },
};

const Compare = () => {
  const { isDark, toggleTheme } = useTheme();
  const [player1, setPlayer1] = useState<string>('1');
  const [player2, setPlayer2] = useState<string>('2');
  const [error, setError] = useState<string | null>(null);
  
  // Validate selected players exist in data
  useEffect(() => {
    if (!playerData[player1]) {
      setPlayer1('1'); // Reset to default if invalid
      setError("Selected player 1 not found in data");
    } else if (!playerData[player2]) {
      setPlayer2('2'); // Reset to default if invalid
      setError("Selected player 2 not found in data");
    } else {
      setError(null);
    }
  }, [player1, player2]);

  // Convert stats to chart data
  const getStatComparisonData = () => {
    if (!playerData[player1] || !playerData[player2]) {
      return [];
    }
    
    const p1 = playerData[player1];
    const p2 = playerData[player2];
    
    // Create common stats for both players
    const commonStats = [];
    
    // Add basic stats both players have
    if ('matches' in p1.stats && 'matches' in p2.stats) {
      commonStats.push({
        name: 'Matches',
        [p1.name]: Number(p1.stats.matches),
        [p2.name]: Number(p2.stats.matches),
      });
    }
    
    // Add batting stats if both are batsmen or all-rounders
    if ('runs' in p1.stats && 'runs' in p2.stats) {
      commonStats.push({
        name: 'Runs',
        [p1.name]: Number(p1.stats.runs)/100, // Scaled down for visualization
        [p2.name]: Number(p2.stats.runs)/100,
      });
    }
    
    if ('average' in p1.stats && 'average' in p2.stats) {
      commonStats.push({
        name: 'Average',
        [p1.name]: Number(p1.stats.average),
        [p2.name]: Number(p2.stats.average),
      });
    }
    
    if ('strikeRate' in p1.stats && 'strikeRate' in p2.stats) {
      commonStats.push({
        name: 'Strike Rate',
        [p1.name]: Number(p1.stats.strikeRate),
        [p2.name]: Number(p2.stats.strikeRate),
      });
    }
    
    if ('hundreds' in p1.stats && 'hundreds' in p2.stats) {
      commonStats.push({
        name: '100s',
        [p1.name]: Number(p1.stats.hundreds),
        [p2.name]: Number(p2.stats.hundreds),
      });
    }
    
    if ('fifties' in p1.stats && 'fifties' in p2.stats) {
      commonStats.push({
        name: '50s',
        [p1.name]: Number(p1.stats.fifties),
        [p2.name]: Number(p2.stats.fifties),
      });
    }
    
    // Add bowling stats if both are bowlers or all-rounders
    if ('wickets' in p1.stats && 'wickets' in p2.stats) {
      commonStats.push({
        name: 'Wickets',
        [p1.name]: Number(p1.stats.wickets),
        [p2.name]: Number(p2.stats.wickets),
      });
    }
    
    if ('economy' in p1.stats && 'economy' in p2.stats) {
      commonStats.push({
        name: 'Economy',
        [p1.name]: Number(p1.stats.economy),
        [p2.name]: Number(p2.stats.economy),
      });
    }
    
    return commonStats;
  };

  const player1Data = playerData[player1];
  const player2Data = playerData[player2];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar toggleTheme={toggleTheme} isDark={isDark} />
      
      <main className="flex-1 pt-20 pb-10 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8">Player Comparison Tool</h1>
          
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error}
              </AlertDescription>
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
                
                {player1Data && (
                  <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
                    {Object.entries(player1Data.stats).map(([key, value]) => (
                      <div key={key}>
                        <p className="text-sm text-muted-foreground capitalize">{key}</p>
                        <p className="font-semibold">{String(value)}</p>
                      </div>
                    ))}
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
                
                {player2Data && (
                  <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
                    {Object.entries(player2Data.stats).map(([key, value]) => (
                      <div key={key}>
                        <p className="text-sm text-muted-foreground capitalize">{key}</p>
                        <p className="font-semibold">{String(value)}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Comparison Visualizations */}
          {player1Data && player2Data && (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold mb-4">Comparison Analysis</h2>
              
              {/* Radar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Skills Comparison</CardTitle>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <RadarPlayerChart 
                    player={player1Data} 
                    secondPlayer={player2Data} 
                    title={`${player1Data.name} vs ${player2Data.name}`}
                  />
                </CardContent>
              </Card>
              
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
                        formatter={(value: any, name: string) => {
                          if (name === 'Runs') {
                            return [Number(value) * 100, name]; // Unscale for display
                          }
                          return [value, name];
                        }}
                      />
                      <Legend />
                      <Bar dataKey={player1Data.name} fill={player1Data.color} />
                      <Bar dataKey={player2Data.name} fill={player2Data.color} />
                    </BarChart>
                  </ResponsiveContainer>
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
                            match.result === 'W' ? 'bg-green-500' : match.result === 'L' ? 'bg-red-500' : 'bg-yellow-500'
                          }`}></div>
                          <span className="flex-1">{match.match}</span>
                          <span className="font-semibold">{match.score}</span>
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
                            match.result === 'W' ? 'bg-green-500' : match.result === 'L' ? 'bg-red-500' : 'bg-yellow-500'
                          }`}></div>
                          <span className="flex-1">{match.match}</span>
                          <span className="font-semibold">{match.score}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Venue Stats Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{player1Data.name}'s Venue Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={player1Data.venueStats}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {player1Data.venueStats.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={['#007C41', '#0A192F', '#FFD700'][index % 3]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value} runs`, 'Runs']}
                          contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            borderRadius: '0.5rem',
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{player2Data.name}'s Venue Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={player2Data.venueStats}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {player2Data.venueStats.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={['#007C41', '#0A192F', '#FFD700'][index % 3]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value} runs`, 'Runs']}
                          contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            borderRadius: '0.5rem',
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
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
        </div>
      </main>
    </div>
  );
};

export default Compare;
