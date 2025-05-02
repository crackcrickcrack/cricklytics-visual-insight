
import React from 'react';
import Navbar from '@/components/Navbar';
import { useTheme } from '@/components/ThemeProvider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const { isDark, toggleTheme } = useTheme();
  
  // Mock data for dashboard
  const battingPerformance = [
    { name: 'Jan', runs: 87, average: 43.5 },
    { name: 'Feb', runs: 53, average: 26.5 },
    { name: 'Mar', runs: 104, average: 52.0 },
    { name: 'Apr', runs: 76, average: 38.0 },
    { name: 'May', runs: 122, average: 61.0 },
    { name: 'Jun', runs: 45, average: 22.5 },
  ];
  
  const venuePerformance = [
    { name: 'MCG', value: 425 },
    { name: 'SCG', value: 318 },
    { name: 'Eden Gardens', value: 387 },
    { name: 'Lord\'s', value: 245 },
    { name: 'Wankhede', value: 301 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  const playerSkills = [
    { subject: 'Batting', A: 85, B: 65, fullMark: 100 },
    { subject: 'Bowling', A: 45, B: 95, fullMark: 100 },
    { subject: 'Fielding', A: 78, B: 82, fullMark: 100 },
    { subject: 'Running', A: 92, B: 88, fullMark: 100 },
    { subject: 'Technique', A: 90, B: 75, fullMark: 100 },
    { subject: 'Consistency', A: 88, B: 70, fullMark: 100 },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar toggleTheme={toggleTheme} isDark={isDark} />
      
      <main className="flex-1 pt-20 pb-10 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h1 className="text-3xl font-bold mb-4 md:mb-0">Statistics Dashboard</h1>
            
            <div className="flex flex-wrap gap-3">
              <div className="w-full sm:w-auto">
                <Select defaultValue="odi">
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="Format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="odi">ODI</SelectItem>
                    <SelectItem value="test">Test</SelectItem>
                    <SelectItem value="t20">T20</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full sm:w-auto">
                <Select defaultValue="2023">
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Input 
                placeholder="Search player..." 
                className="w-full sm:w-auto sm:min-w-[200px]" 
              />
            </div>
          </div>
          
          <Tabs defaultValue="batting" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="batting">Batting</TabsTrigger>
              <TabsTrigger value="bowling">Bowling</TabsTrigger>
              <TabsTrigger value="allrounders">All-rounders</TabsTrigger>
              <TabsTrigger value="teams">Teams</TabsTrigger>
            </TabsList>
            
            <TabsContent value="batting" className="space-y-8">
              {/* Performance over time */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Batting Performance Over Time</CardTitle>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={battingPerformance}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          borderRadius: '0.5rem',
                          border: '1px solid #e2e8f0',
                          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                        }}
                      />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="runs"
                        stroke="#007C41"
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                      />
                      <Line 
                        yAxisId="right" 
                        type="monotone" 
                        dataKey="average" 
                        stroke="#FFD700" 
                        strokeWidth={2} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Venue Performance */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Runs by Venue</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={venuePerformance}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {venuePerformance.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
                
                {/* Player Comparison */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Player Comparison</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart outerRadius={90} data={playerSkills}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar
                          name="Virat Kohli"
                          dataKey="A"
                          stroke="#007C41"
                          fill="#007C41"
                          fillOpacity={0.6}
                        />
                        <Radar
                          name="Joe Root"
                          dataKey="B"
                          stroke="#FFD700"
                          fill="#FFD700"
                          fillOpacity={0.6}
                        />
                        <Legend />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            borderRadius: '0.5rem',
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                          }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {/* Batting Stats Table */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Top Batsmen Rankings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-secondary">
                            <th className="py-3 px-4 text-left">Rank</th>
                            <th className="py-3 px-4 text-left">Player</th>
                            <th className="py-3 px-4 text-left">Country</th>
                            <th className="py-3 px-4 text-left">Matches</th>
                            <th className="py-3 px-4 text-left">Runs</th>
                            <th className="py-3 px-4 text-left">Average</th>
                            <th className="py-3 px-4 text-left">Strike Rate</th>
                            <th className="py-3 px-4 text-left">100s/50s</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4">1</td>
                            <td className="py-3 px-4 font-medium">Virat Kohli</td>
                            <td className="py-3 px-4">India</td>
                            <td className="py-3 px-4">274</td>
                            <td className="py-3 px-4">12898</td>
                            <td className="py-3 px-4 font-medium">57.32</td>
                            <td className="py-3 px-4">92.84</td>
                            <td className="py-3 px-4">43/65</td>
                          </tr>
                          <tr className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4">2</td>
                            <td className="py-3 px-4 font-medium">Joe Root</td>
                            <td className="py-3 px-4">England</td>
                            <td className="py-3 px-4">163</td>
                            <td className="py-3 px-4">6207</td>
                            <td className="py-3 px-4 font-medium">50.05</td>
                            <td className="py-3 px-4">87.31</td>
                            <td className="py-3 px-4">16/36</td>
                          </tr>
                          <tr className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4">3</td>
                            <td className="py-3 px-4 font-medium">Kane Williamson</td>
                            <td className="py-3 px-4">New Zealand</td>
                            <td className="py-3 px-4">158</td>
                            <td className="py-3 px-4">6554</td>
                            <td className="py-3 px-4 font-medium">47.83</td>
                            <td className="py-3 px-4">81.21</td>
                            <td className="py-3 px-4">13/42</td>
                          </tr>
                          <tr className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4">4</td>
                            <td className="py-3 px-4 font-medium">Babar Azam</td>
                            <td className="py-3 px-4">Pakistan</td>
                            <td className="py-3 px-4">102</td>
                            <td className="py-3 px-4">4793</td>
                            <td className="py-3 px-4 font-medium">58.45</td>
                            <td className="py-3 px-4">89.24</td>
                            <td className="py-3 px-4">17/26</td>
                          </tr>
                          <tr className="hover:bg-muted/50">
                            <td className="py-3 px-4">5</td>
                            <td className="py-3 px-4 font-medium">Rohit Sharma</td>
                            <td className="py-3 px-4">India</td>
                            <td className="py-3 px-4">241</td>
                            <td className="py-3 px-4">9837</td>
                            <td className="py-3 px-4 font-medium">48.70</td>
                            <td className="py-3 px-4">91.54</td>
                            <td className="py-3 px-4">29/48</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="bowling">
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-muted-foreground">Bowling statistics will be displayed here</h3>
                <p className="text-sm text-muted-foreground mt-2">Switch tabs to view different statistics</p>
              </div>
            </TabsContent>
            
            <TabsContent value="allrounders">
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-muted-foreground">All-rounders statistics will be displayed here</h3>
                <p className="text-sm text-muted-foreground mt-2">Switch tabs to view different statistics</p>
              </div>
            </TabsContent>
            
            <TabsContent value="teams">
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-muted-foreground">Teams statistics will be displayed here</h3>
                <p className="text-sm text-muted-foreground mt-2">Switch tabs to view different statistics</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
