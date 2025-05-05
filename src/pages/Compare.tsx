import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useTheme } from '@/components/ThemeProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';
import RadarPlayerChart from '@/components/RadarPlayerChart';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import PlayerCard from '@/components/PlayerCard';

// Updated player options with current players and image URLs
const playerOptions = [
{ id: '1', name: 'Virat Kohli', country: 'India', role: 'Batsman', imageUrl: '/images/players/virat-kohli.jpg' },
{ id: '2', name: 'Joe Root', country: 'England', role: 'Batsman', imageUrl: '/images/players/joe-root.jpg' },
{ id: '3', name: 'Kane Williamson', country: 'New Zealand', role: 'Batsman', imageUrl: '/images/players/kane-williamson.jpg' },
{ id: '4', name: 'Babar Azam', country: 'Pakistan', role: 'Batsman', imageUrl: '/images/players/babar-azam.jpg' },
{ id: '5', name: 'Steve Smith', country: 'Australia', role: 'Batsman', imageUrl: '/images/players/steve-smith.jpg' },
{ id: '6', name: 'Jasprit Bumrah', country: 'India', role: 'Bowler', imageUrl: '/images/players/jasprit-bumrah.jpg' },
{ id: '7', name: 'Pat Cummins', country: 'Australia', role: 'Bowler', imageUrl: '/images/players/pat-cummins.jpg' },
{ id: '8', name: 'Ben Stokes', country: 'England', role: 'All-rounder', imageUrl: '/images/players/ben-stokes.jpg' },
];

// Update the recentForm type to include venue
type RecentForm = {
  match: string;
  score: string;
  result: string;
  venue?: string;
};

// Update the PlayerData type to use the new RecentForm type
type PlayerData = {
  name: string;
  skills: { name: string; value: number }[];
  color: string;
  stats: Record<string, string | number>;
  recentForm: RecentForm[];
  venueStats: { name: string; value: number }[];
  batting?: {
    byPhase: {
      powerplay: { runs: number; average: number; strikeRate: number };
      middle: { runs: number; average: number; strikeRate: number };
      death: { runs: number; average: number; strikeRate: number };
    };
    shotAnalysis: { shot: string; success: number; runs: number }[];
  };
};

// Update the playerData object to include venue in recentForm
const playerData: Record<string, PlayerData> = {
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
runs: 13848,
average: 57.32,
strikeRate: 93.62,
hundreds: 50,
fifties: 72,
bestScore: "254*"
},
recentForm: [
{ match: "vs AUS", score: "121", result: "W", venue: "MCG" },
{ match: "vs ENG", score: "76", result: "W", venue: "Lords" },
{ match: "vs NZ", score: "45", result: "L", venue: "Eden Park" },
{ match: "vs SA", score: "83", result: "W", venue: "Wanderers" },
{ match: "vs WI", score: "38", result: "W", venue: "Kensington Oval" },
],
venueStats: [
{ name: 'Home', value: 7765 },
{ name: 'Away', value: 5142 },
{ name: 'Neutral', value: 941 },
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
matches: 198,
runs: 11416,
average: 50.29,
strikeRate: 55.86,
hundreds: 31,
fifties: 62,
bestScore: "254"
},
recentForm: [
{ match: "vs IND", score: "86", result: "L", venue: "MCG" },
{ match: "vs AUS", score: "118", result: "W", venue: "Lords" },
{ match: "vs PAK", score: "103", result: "W", venue: "MCG" },
{ match: "vs NZ", score: "57", result: "L", venue: "Eden Park" },
{ match: "vs WI", score: "153", result: "W", venue: "MCG" },
],
venueStats: [
{ name: 'Home', value: 6084 },
{ name: 'Away', value: 4892 },
{ name: 'Neutral', value: 440 },
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
matches: 172,
runs: 8263,
average: 53.31,
strikeRate: 51.34,
hundreds: 28,
fifties: 33,
bestScore: "251"
},
recentForm: [
{ match: "vs ENG", score: "132", result: "W", venue: "MCG" },
{ match: "vs IND", score: "57", result: "L", venue: "MCG" },
{ match: "vs AUS", score: "45", result: "L", venue: "Eden Park" },
{ match: "vs SA", score: "91", result: "W", venue: "MCG" },
{ match: "vs PAK", score: "104", result: "W", venue: "MCG" },
],
venueStats: [
{ name: 'Home', value: 4562 },
{ name: 'Away', value: 3127 },
{ name: 'Neutral', value: 574 },
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
matches: 126,
runs: 5986,
average: 47.50,
strikeRate: 55.44,
hundreds: 12,
fifties: 26,
bestScore: "196"
},
recentForm: [
{ match: "vs SA", score: "103", result: "W", venue: "MCG" },
{ match: "vs NZ", score: "71", result: "W", venue: "MCG" },
{ match: "vs ENG", score: "84", result: "L", venue: "MCG" },
{ match: "vs AUS", score: "34", result: "L", venue: "MCG" },
{ match: "vs WI", score: "114", result: "W", venue: "MCG" },
],
venueStats: [
{ name: 'Home', value: 2587 },
{ name: 'Away', value: 2432 },
{ name: 'Neutral', value: 967 },
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
matches: 178,
runs: 9514,
average: 58.01,
strikeRate: 54.83,
hundreds: 32,
fifties: 39,
bestScore: "239"
},
recentForm: [
{ match: "vs IND", score: "131", result: "W", venue: "MCG" },
{ match: "vs PAK", score: "78", result: "W", venue: "MCG" },
{ match: "vs NZ", score: "85", result: "W", venue: "MCG" },
{ match: "vs ENG", score: "144", result: "W", venue: "MCG" },
{ match: "vs SA", score: "32", result: "L", venue: "MCG" },
],
venueStats: [
{ name: 'Home', value: 5107 },
{ name: 'Away', value: 3998 },
{ name: 'Neutral', value: 409 },
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
matches: 92,
wickets: 368,
average: 20.28,
economy: 2.69,
fiveWickets: 10,
best: "6/27"
},
recentForm: [
{ match: "vs AUS", score: "5/42", result: "W", venue: "MCG" },
{ match: "vs ENG", score: "4/25", result: "W", venue: "MCG" },
{ match: "vs NZ", score: "2/39", result: "L", venue: "Eden Park" },
{ match: "vs SA", score: "5/32", result: "W", venue: "MCG" },
{ match: "vs WI", score: "3/28", result: "W", venue: "MCG" },
],
venueStats: [
{ name: 'Home', value: 156 },
{ name: 'Away', value: 178 },
{ name: 'Neutral', value: 34 },
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
matches: 115,
wickets: 385,
average: 21.67,
economy: 2.76,
fiveWickets: 9,
best: "6/23"
},
recentForm: [
{ match: "vs IND", score: "4/39", result: "W", venue: "MCG" },
{ match: "vs PAK", score: "2/42", result: "W", venue: "MCG" },
{ match: "vs NZ", score: "3/38", result: "W", venue: "MCG" },
{ match: "vs ENG", score: "5/28", result: "W", venue: "MCG" },
{ match: "vs SA", score: "1/52", result: "L", venue: "MCG" },
],
venueStats: [
{ name: 'Home', value: 187 },
{ name: 'Away', value: 166 },
{ name: 'Neutral', value: 32 },
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
matches: 167,
runs: 6117,
average: 35.18,
strikeRate: 57.40,
hundreds: 13,
fifties: 31,
wickets: 197,
bowlAverage: 31.73,
economy: 3.24,
best: "6/22"
},
recentForm: [
{ match: "vs IND", score: "82 & 2/45", result: "L", venue: "MCG" },
{ match: "vs AUS", score: "103 & 1/56", result: "W", venue: "MCG" },
{ match: "vs PAK", score: "67 & 3/23", result: "W", venue: "MCG" },
{ match: "vs SA", score: "46 & 0/61", result: "L", venue: "MCG" },
{ match: "vs WI", score: "155 & 2/34", result: "W", venue: "MCG" },
],
venueStats: [
{ name: 'Home', value: 3754 },
{ name: 'Away', value: 2134 },
{ name: 'Neutral', value: 229 },
]
},
};

// Define the PlayerStats type
type PlayerStats = {
  matches: number;
  runs?: number;
  average?: number;
  wickets?: number;
  economy?: number;
  hundreds?: number;
  fifties?: number;
  best?: string;
};

const Compare = () => {
const { isDark, toggleTheme } = useTheme();
const [player1, setPlayer1] = useState<string>('1');
const [player2, setPlayer2] = useState<string>('2');
const [activeTab, setActiveTab] = useState('overall');
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

// Get player data safely
const player1Data = playerData[player1];
const player2Data = playerData[player2];

// Prepare player cards data
const getPlayerCardData = (playerId: string) => {
if (!playerData[playerId]) return null;

const player = playerData[playerId];
const playerOption = playerOptions.find(p => p.id === playerId);
const isBowler = 'wickets' in player.stats;

return {
id: playerId,
name: player.name,
country: playerOption?.country || '',
role: isBowler ? 
('runs' in player.stats ? 'All-Rounder' : 'Bowler') : 
'Batsman',
imageUrl: playerOption?.imageUrl,
stats: {
matches: Number(player.stats.matches),
runs: 'runs' in player.stats ? Number(player.stats.runs) : undefined,
average: 'average' in player.stats ? Number(player.stats.average) : undefined,
wickets: 'wickets' in player.stats ? Number(player.stats.wickets) : undefined,
economy: 'economy' in player.stats ? Number(player.stats.economy) : undefined,
hundreds: 'hundreds' in player.stats ? Number(player.stats.hundreds) : undefined,
fifties: 'fifties' in player.stats ? Number(player.stats.fifties) : undefined,
best: 'best' in player.stats ? String(player.stats.best) : 
'bestScore' in player.stats ? String(player.stats.bestScore) : undefined,
} as PlayerStats
};

// Update the getPhaseComparisonData function to handle optional batting data
const getPhaseComparisonData = () => {
const p1 = playerData[player1];
const p2 = playerData[player2];

if (!p1.batting || !p2.batting) {
return [];
}

return [
{
name: 'Powerplay',
[p1.name]: p1.batting.byPhase.powerplay.average,
[p2.name]: p2.batting.byPhase.powerplay.average,
},
{
name: 'Middle Overs',
[p1.name]: p1.batting.byPhase.middle.average,
[p2.name]: p2.batting.byPhase.middle.average,
},
{
name: 'Death Overs',
[p1.name]: p1.batting.byPhase.death.average,
[p2.name]: p2.batting.byPhase.death.average,
},
];
};

// Update the getShotAnalysisData function to handle optional batting data
const getShotAnalysisData = () => {
const p1 = playerData[player1];
const p2 = playerData[player2];

if (!p1.batting || !p2.batting) {
return [];
}

return p1.batting.shotAnalysis.map((shot, index) => ({
shot: shot.shot,
[p1.name]: shot.success,
[p2.name]: p2.batting!.shotAnalysis[index].success,
}));
};

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

{player1Data && getPlayerCardData(player1) && (
<div className="mt-4">
<PlayerCard 
  player={{
    id: player1,
    name: player1Data.name,
    country: playerOptions.find(p => p.id === player1)?.country || '',
    role: playerOptions.find(p => p.id === player1)?.role || '',
    stats: {
      matches: Number(player1Data.stats.matches),
      runs: 'runs' in player1Data.stats ? Number(player1Data.stats.runs) : undefined,
      average: 'average' in player1Data.stats ? Number(player1Data.stats.average) : undefined,
      wickets: 'wickets' in player1Data.stats ? Number(player1Data.stats.wickets) : undefined,
      economy: 'economy' in player1Data.stats ? Number(player1Data.stats.economy) : undefined,
      hundreds: 'hundreds' in player1Data.stats ? Number(player1Data.stats.hundreds) : undefined,
      fifties: 'fifties' in player1Data.stats ? Number(player1Data.stats.fifties) : undefined,
      best: 'best' in player1Data.stats ? String(player1Data.stats.best) : 
            'bestScore' in player1Data.stats ? String(player1Data.stats.bestScore) : undefined,
    } as PlayerStats,
    imageUrl: playerOptions.find(p => p.id === player1)?.imageUrl
  }} 
/>
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
<PlayerCard 
  player={{
    id: player2,
    name: player2Data.name,
    country: playerOptions.find(p => p.id === player2)?.country || '',
    role: playerOptions.find(p => p.id === player2)?.role || '',
    stats: {
      matches: Number(player2Data.stats.matches),
      runs: 'runs' in player2Data.stats ? Number(player2Data.stats.runs) : undefined,
      average: 'average' in player2Data.stats ? Number(player2Data.stats.average) : undefined,
      wickets: 'wickets' in player2Data.stats ? Number(player2Data.stats.wickets) : undefined,
      economy: 'economy' in player2Data.stats ? Number(player2Data.stats.economy) : undefined,
      hundreds: 'hundreds' in player2Data.stats ? Number(player2Data.stats.hundreds) : undefined,
      fifties: 'fifties' in player2Data.stats ? Number(player2Data.stats.fifties) : undefined,
      best: 'best' in player2Data.stats ? String(player2Data.stats.best) : 
            'bestScore' in player2Data.stats ? String(player2Data.stats.bestScore) : undefined,
    } as PlayerStats,
    imageUrl: playerOptions.find(p => p.id === player2)?.imageUrl
  }} 
/>
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
<div>
  <p className="font-medium">{match.match}</p>
  <p className="text-sm text-muted-foreground">{match.venue || 'Unknown'}</p>
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
match.result === 'W' ? 'bg-green-500' : match.result === 'L' ? 'bg-red-500' : 'bg-yellow-500'
}`}></div>
<div>
  <p className="font-medium">{match.match}</p>
  <p className="text-sm text-muted-foreground">{match.venue || 'Unknown'}</p>
</div>
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

<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
<TabsList className="grid w-full grid-cols-4 mb-8">
<TabsTrigger value="overall">Overall Stats</TabsTrigger>
<TabsTrigger value="phases">Phase Analysis</TabsTrigger>
<TabsTrigger value="shots">Shot Analysis</TabsTrigger>
<TabsTrigger value="form">Recent Form</TabsTrigger>
</TabsList>

<TabsContent value="overall" className="space-y-8">
<Card>
<CardHeader>
<CardTitle>Overall Batting Comparison</CardTitle>
</CardHeader>
<CardContent>
<div className="h-[400px]">
<ResponsiveContainer width="100%" height="100%">
<BarChart data={[
{
name: 'Runs',
[playerData[player1].name]: 
playerData[player1].stats.runs,
[playerData[player2].name]: 
playerData[player2].stats.runs,
},
{
name: 'Average',
[playerData[player1].name]: 
playerData[player1].stats.average,
[playerData[player2].name]: 
playerData[player2].stats.average,
},
{
name: 'Strike Rate',
[playerData[player1].name]: 
playerData[player1].stats.strikeRate,
[playerData[player2].name]: 
playerData[player2].stats.strikeRate,
},
]}>
<CartesianGrid strokeDasharray="3 3" opacity={0.2} />
<XAxis dataKey="name" />
<YAxis />
<Tooltip />
<Legend />
<Bar
dataKey={playerData[player1].name}
fill={playerData[player1].color}
radius={[4, 4, 0, 0]}
/>
<Bar
dataKey={playerData[player2].name}
fill={playerData[player2].color}
radius={[4, 4, 0, 0]}
/>
</BarChart>
</ResponsiveContainer>
</div>
</CardContent>
</Card>
</TabsContent>

<TabsContent value="phases" className="space-y-8">
<Card>
<CardHeader>
<CardTitle>Phase-wise Performance</CardTitle>
</CardHeader>
<CardContent>
<div className="h-[400px]">
<ResponsiveContainer width="100%" height="100%">
<LineChart data={getPhaseComparisonData()}>
<CartesianGrid strokeDasharray="3 3" opacity={0.2} />
<XAxis dataKey="name" />
<YAxis />
<Tooltip />
<Legend />
<Line
type="monotone"
dataKey={playerData[player1].name}
stroke={playerData[player1].color}
strokeWidth={2}
/>
<Line
type="monotone"
dataKey={playerData[player2].name}
stroke={playerData[player2].color}
strokeWidth={2}
/>
</LineChart>
</ResponsiveContainer>
</div>
</CardContent>
</Card>
</TabsContent>

<TabsContent value="shots" className="space-y-8">
<Card>
<CardHeader>
<CardTitle>Shot Analysis</CardTitle>
</CardHeader>
<CardContent>
<div className="h-[400px]">
<ResponsiveContainer width="100%" height="100%">
<ScatterChart>
<CartesianGrid strokeDasharray="3 3" opacity={0.2} />
<XAxis type="number" dataKey={playerData[player1].name} name="Success Rate" unit="%" />
<YAxis type="number" dataKey={playerData[player2].name} name="Success Rate" unit="%" />
<Tooltip cursor={{ strokeDasharray: '3 3' }} />
<Legend />
<Scatter
name="Shot Comparison"
data={getShotAnalysisData()}
fill={playerData[player1].color}
/>
</ScatterChart>
</ResponsiveContainer>
</div>
</CardContent>
</Card>
</TabsContent>

<TabsContent value="form" className="space-y-8">
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
<Card>
<CardHeader>
<CardTitle>{playerData[player1].name}'s Recent Form</CardTitle>
</CardHeader>
<CardContent>
<div className="space-y-4">
{playerData[player1].recentForm.map((match, index) => (
<div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
<div>
<p className="font-medium">{match.match}</p>
<p className="text-sm text-muted-foreground">{match.venue || 'Unknown'}</p>
</div>
<div className="text-right">
<p className="font-bold">{match.score}</p>
<p className={`text-sm ${match.result === 'W' ? 'text-green-500' : 'text-red-500'}`}>
{match.result === 'W' ? 'Won' : 'Lost'}
</p>
</div>
</div>
))}
</div>
</CardContent>
</Card>

<Card>
<CardHeader>
<CardTitle>{playerData[player2].name}'s Recent Form</CardTitle>
</CardHeader>
<CardContent>
<div className="space-y-4">
{playerData[player2].recentForm.map((match, index) => (
<div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
<div>
<p className="font-medium">{match.match}</p>
<p className="text-sm text-muted-foreground">{match.venue || 'Unknown'}</p>
</div>
<div className="text-right">
<p className="font-bold">{match.score}</p>
<p className={`text-sm ${match.result === 'W' ? 'text-green-500' : 'text-red-500'}`}>
{match.result === 'W' ? 'Won' : 'Lost'}
</p>
</div>
</div>
))}
</div>
</CardContent>
</Card>
</div>
</TabsContent>
</Tabs>
</div>
</main>
</div>
);
};

export default Compare;
