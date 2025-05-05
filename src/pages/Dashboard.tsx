import React from 'react';
import Navbar from '@/components/Navbar';
import { useTheme } from '@/components/ThemeProvider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';

const Dashboard = () => {
  const { isDark, toggleTheme } = useTheme();
  
  // Mock data for advanced analytics
  const battingPerformance = [
    { name: 'Jan', runs: 87, average: 43.5, strikeRate: 142.3 },
    { name: 'Feb', runs: 53, average: 26.5, strikeRate: 138.7 },
    { name: 'Mar', runs: 104, average: 52.0, strikeRate: 145.2 },
    { name: 'Apr', runs: 76, average: 38.0, strikeRate: 140.1 },
    { name: 'May', runs: 122, average: 61.0, strikeRate: 148.9 },
    { name: 'Jun', runs: 45, average: 22.5, strikeRate: 136.8 },
  ];
  
  const bowlingAnalysis = [
    { name: 'Pace', value: 145, wickets: 12, economy: 7.2 },
    { name: 'Spin', value: 95, wickets: 8, economy: 6.8 },
    { name: 'Yorker', value: 150, wickets: 15, economy: 8.1 },
    { name: 'Bouncer', value: 140, wickets: 10, economy: 7.5 },
    { name: 'Slower', value: 110, wickets: 7, economy: 6.5 },
  ];
  
  const playerComparison = [
    { name: 'Batting', player1: 85, player2: 78 },
    { name: 'Bowling', player1: 45, player2: 92 },
    { name: 'Fielding', player1: 88, player2: 82 },
    { name: 'Running', player1: 92, player2: 85 },
    { name: 'Technique', player1: 90, player2: 88 },
    { name: 'Consistency', player1: 88, player2: 84 },
  ];

  const shotAnalysis = [
    { x: 120, y: 85, z: 20, shot: 'Cover Drive' },
    { x: 95, y: 92, z: 15, shot: 'Pull Shot' },
    { x: 110, y: 78, z: 18, shot: 'Square Cut' },
    { x: 85, y: 88, z: 12, shot: 'Sweep' },
    { x: 130, y: 82, z: 25, shot: 'Straight Drive' },
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar toggleTheme={toggleTheme} isDark={isDark} />
      
      <main className="flex-1 pt-20 pb-10 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h1 className="text-3xl font-bold mb-4 md:mb-0">Advanced Analytics Dashboard</h1>
            
            <div className="flex flex-wrap gap-3">
              <Select defaultValue="odi">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="odi">ODI</SelectItem>
                  <SelectItem value="test">Test</SelectItem>
                  <SelectItem value="t20">T20</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="2023">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                </SelectContent>
              </Select>
              
              <Input 
                placeholder="Search player..." 
                className="w-[200px]" 
              />
            </div>
          </div>
          
          <Tabs defaultValue="batting" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="batting">Batting Analysis</TabsTrigger>
              <TabsTrigger value="bowling">Bowling Analysis</TabsTrigger>
              <TabsTrigger value="comparison">Player Comparison</TabsTrigger>
              <TabsTrigger value="shot">Shot Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="batting" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Batting Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={battingPerformance}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="runs"
                          stroke="#007C41"
                          strokeWidth={2}
                        />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="average"
                          stroke="#FFD700"
                          strokeWidth={2}
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="strikeRate"
                          stroke="#FF6B6B"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bowling" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Bowling Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={bowlingAnalysis}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Bar
                          yAxisId="left"
                          dataKey="wickets"
                          fill="#007C41"
                          radius={[4, 4, 0, 0]}
                        />
                        <Bar
                          yAxisId="right"
                          dataKey="economy"
                          fill="#FFD700"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="comparison" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Player Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart outerRadius={90} data={playerComparison}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="name" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar
                          name="Player 1"
                          dataKey="player1"
                          stroke="#007C41"
                          fill="#007C41"
                          fillOpacity={0.6}
                        />
                        <Radar
                          name="Player 2"
                          dataKey="player2"
                          stroke="#FFD700"
                          fill="#FFD700"
                          fillOpacity={0.6}
                        />
                        <Legend />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shot" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Shot Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis type="number" dataKey="x" name="Power" unit="%" />
                        <YAxis type="number" dataKey="y" name="Control" unit="%" />
                        <ZAxis type="number" dataKey="z" range={[50, 400]} name="Success Rate" unit="%" />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Legend />
                        <Scatter name="Shot Analysis" data={shotAnalysis} fill="#007C41">
                          {shotAnalysis.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.z > 20 ? '#007C41' : '#FFD700'} />
                          ))}
                        </Scatter>
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
