
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { useTheme } from '@/components/ThemeProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import RadarPlayerChart from '@/components/RadarPlayerChart';

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
  // Add data for other players similarly
};

const Compare = () => {
  const { isDark, toggleTheme } = useTheme();
  const [player1, setPlayer1] = useState('1');  // Default to Virat Kohli
  const [player2, setPlayer2] = useState('2');  // Default to Joe Root

  // Convert stats to chart data
  const getStatComparisonData = () => {
    const p1 = playerData[player1];
    const p2 = playerData[player2];
    
    return [
      {
        name: 'Matches',
        [p1.name]: Number(p1.stats.matches),
        [p2.name]: Number(p2.stats.matches),
      },
      {
        name: 'Runs',
        [p1.name]: Number(p1.stats.runs)/100, // Scaled down for visualization
        [p2.name]: Number(p2.stats.runs)/100,
      },
      {
        name: 'Average',
        [p1.name]: Number(p1.stats.average),
        [p2.name]: Number(p2.stats.average),
      },
      {
        name: 'Strike Rate',
        [p1.name]: Number(p1.stats.strikeRate),
        [p2.name]: Number(p2.stats.strikeRate),
      },
      {
        name: '100s',
        [p1.name]: Number(p1.stats.hundreds),
        [p2.name]: Number(p2.stats.hundreds),
      },
      {
        name: '50s',
        [p1.name]: Number(p1.stats.fifties),
        [p2.name]: Number(p2.stats.fifties),
      },
    ];
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar toggleTheme={toggleTheme} isDark={isDark} />
      
      <main className="flex-1 pt-20 pb-10 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8">Player Comparison Tool</h1>
          
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
                
                {player1 && (
                  <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
                    {Object.entries(playerData[player1].stats).map(([key, value]) => (
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
                
                {player2 && (
                  <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
                    {Object.entries(playerData[player2].stats).map(([key, value]) => (
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
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold mb-4">Comparison Analysis</h2>
            
            {/* Radar Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Skills Comparison</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <RadarPlayerChart 
                  player={playerData[player1]} 
                  secondPlayer={playerData[player2]} 
                  title={`${playerData[player1].name} vs ${playerData[player2].name}`}
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
                      formatter={(value, name) => {
                        if (name === 'Runs') {
                          return [Number(value) * 100, name]; // Unscale for display
                        }
                        return [value, name];
                      }}
                    />
                    <Legend />
                    <Bar dataKey={playerData[player1].name} fill={playerData[player1].color} />
                    <Bar dataKey={playerData[player2].name} fill={playerData[player2].color} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            {/* Recent Form Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{playerData[player1].name}'s Recent Form</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {playerData[player1].recentForm.map((match, index) => (
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
                  <CardTitle className="text-lg">{playerData[player2].name}'s Recent Form</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {playerData[player2].recentForm.map((match, index) => (
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
                  <CardTitle className="text-lg">{playerData[player1].name}'s Venue Stats</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={playerData[player1].venueStats}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {playerData[player1].venueStats.map((entry, index) => (
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
                  <CardTitle className="text-lg">{playerData[player2].name}'s Venue Stats</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={playerData[player2].venueStats}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {playerData[player2].venueStats.map((entry, index) => (
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
                Based on form analysis, {playerData[player1].name} is performing 15% better in recent matches compared to {playerData[player2].name}, particularly against pace bowling. However, {playerData[player2].name} has a 22% higher scoring rate against spin bowling.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Compare;
