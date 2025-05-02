
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { useTheme } from '@/components/ThemeProvider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LiveMatchCard from '@/components/LiveMatchCard';

// Mock data for matches
const liveMatches = [
  {
    id: '1',
    teams: [
      { name: 'India', shortName: 'IND', score: '276', wickets: 4, overs: 42.3 },
      { name: 'Australia', shortName: 'AUS' }
    ],
    format: 'ODI',
    venue: 'Melbourne Cricket Ground',
    status: 'India batting',
    isLive: true
  },
  {
    id: '2',
    teams: [
      { name: 'England', shortName: 'ENG', score: '175', wickets: 10, overs: 32.4 },
      { name: 'South Africa', shortName: 'SA', score: '112', wickets: 3, overs: 21.0 }
    ],
    format: 'ODI',
    venue: 'Lords, London',
    status: 'South Africa batting',
    isLive: true
  },
  {
    id: '3',
    teams: [
      { name: 'New Zealand', shortName: 'NZ', score: '242', wickets: 10, overs: 50.0 },
      { name: 'Pakistan', shortName: 'PAK', score: '243', wickets: 6, overs: 47.5 }
    ],
    format: 'T20',
    venue: 'Hagley Oval',
    status: 'Pakistan won by 4 wickets',
    isLive: false
  },
  {
    id: '4',
    teams: [
      { name: 'Bangladesh', shortName: 'BAN', score: '156', wickets: 10, overs: 41.2 },
      { name: 'Sri Lanka', shortName: 'SL', score: '157', wickets: 3, overs: 30.1 }
    ],
    format: 'ODI',
    venue: 'Dhaka',
    status: 'Sri Lanka won by 7 wickets',
    isLive: false
  }
];

const upcomingMatches = [
  {
    id: '5',
    teams: [
      { name: 'West Indies', shortName: 'WI' },
      { name: 'Afghanistan', shortName: 'AFG' }
    ],
    format: 'T20',
    venue: 'Kingston, Jamaica',
    status: 'Starting in 2 days',
    isLive: false
  },
  {
    id: '6',
    teams: [
      { name: 'India', shortName: 'IND' },
      { name: 'New Zealand', shortName: 'NZ' }
    ],
    format: 'Test',
    venue: 'Eden Gardens, Kolkata',
    status: 'Starting in 5 days',
    isLive: false
  },
  {
    id: '7',
    teams: [
      { name: 'Australia', shortName: 'AUS' },
      { name: 'England', shortName: 'ENG' }
    ],
    format: 'ODI',
    venue: 'The Oval, London',
    status: 'Starting tomorrow',
    isLive: false
  }
];

const recentMatches = [
  {
    id: '8',
    teams: [
      { name: 'Pakistan', shortName: 'PAK', score: '302', wickets: 8, overs: 50.0 },
      { name: 'South Africa', shortName: 'SA', score: '294', wickets: 10, overs: 49.3 }
    ],
    format: 'ODI',
    venue: 'Rawalpindi',
    status: 'Pakistan won by 8 runs',
    isLive: false
  },
  {
    id: '9',
    teams: [
      { name: 'India', shortName: 'IND', score: '415', wickets: 8, overs: 50.0 },
      { name: 'Sri Lanka', shortName: 'SL', score: '217', wickets: 10, overs: 43.2 }
    ],
    format: 'ODI',
    venue: 'Colombo',
    status: 'India won by 198 runs',
    isLive: false
  },
  {
    id: '10',
    teams: [
      { name: 'England', shortName: 'ENG', score: '241', wickets: 8, overs: 50.0 },
      { name: 'New Zealand', shortName: 'NZ', score: '241', wickets: 10, overs: 50.0 }
    ],
    format: 'ODI',
    venue: 'Lords, London',
    status: 'Match tied, England won on boundary count',
    isLive: false
  }
];

const Matches = () => {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar toggleTheme={toggleTheme} isDark={isDark} />
      
      <main className="flex-1 pt-20 pb-10 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8">Cricket Matches</h1>
          
          <Tabs defaultValue="live" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="live">Live Matches</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="recent">Recent Results</TabsTrigger>
            </TabsList>
            
            <TabsContent value="live" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {liveMatches.map((match) => (
                  <LiveMatchCard key={match.id} match={match} />
                ))}
              </div>
              
              {/* Live Match Detail */}
              <Card className="mt-8">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Match Highlights: India vs Australia</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-3">Latest Updates</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                          Over 42.3: Kohli hits a boundary, moves to 87
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                          Over 42.1: New batsman Rahul takes strike
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                          Over 41.6: WICKET! Sharma out caught behind
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                          Over 41.2: Sharma hits a massive six!
                        </li>
                      </ul>
                      
                      <div className="mt-6">
                        <h3 className="font-medium mb-3">Key Stats</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="border rounded-lg p-3">
                            <p className="text-sm text-muted-foreground">Run Rate</p>
                            <p className="font-semibold text-lg">6.49</p>
                          </div>
                          <div className="border rounded-lg p-3">
                            <p className="text-sm text-muted-foreground">Required Rate</p>
                            <p className="font-semibold text-lg">7.21</p>
                          </div>
                          <div className="border rounded-lg p-3">
                            <p className="text-sm text-muted-foreground">Partnership</p>
                            <p className="font-semibold text-lg">87 (68)</p>
                          </div>
                          <div className="border rounded-lg p-3">
                            <p className="text-sm text-muted-foreground">Last 5 Overs</p>
                            <p className="font-semibold text-lg">42-1</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">Batsmen</h3>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="py-2 px-2 text-left">Batsman</th>
                            <th className="py-2 px-2 text-right">R</th>
                            <th className="py-2 px-2 text-right">B</th>
                            <th className="py-2 px-2 text-right">4s</th>
                            <th className="py-2 px-2 text-right">6s</th>
                            <th className="py-2 px-2 text-right">SR</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2 px-2 font-medium">Virat Kohli*</td>
                            <td className="py-2 px-2 text-right">87</td>
                            <td className="py-2 px-2 text-right">93</td>
                            <td className="py-2 px-2 text-right">9</td>
                            <td className="py-2 px-2 text-right">2</td>
                            <td className="py-2 px-2 text-right">93.55</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 px-2 font-medium">KL Rahul</td>
                            <td className="py-2 px-2 text-right">0</td>
                            <td className="py-2 px-2 text-right">1</td>
                            <td className="py-2 px-2 text-right">0</td>
                            <td className="py-2 px-2 text-right">0</td>
                            <td className="py-2 px-2 text-right">0.00</td>
                          </tr>
                        </tbody>
                      </table>
                      
                      <h3 className="font-medium mb-3 mt-6">Bowlers</h3>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="py-2 px-2 text-left">Bowler</th>
                            <th className="py-2 px-2 text-right">O</th>
                            <th className="py-2 px-2 text-right">M</th>
                            <th className="py-2 px-2 text-right">R</th>
                            <th className="py-2 px-2 text-right">W</th>
                            <th className="py-2 px-2 text-right">Econ</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2 px-2 font-medium">Pat Cummins*</td>
                            <td className="py-2 px-2 text-right">8.3</td>
                            <td className="py-2 px-2 text-right">0</td>
                            <td className="py-2 px-2 text-right">57</td>
                            <td className="py-2 px-2 text-right">1</td>
                            <td className="py-2 px-2 text-right">6.71</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 px-2 font-medium">Mitchell Starc</td>
                            <td className="py-2 px-2 text-right">9</td>
                            <td className="py-2 px-2 text-right">0</td>
                            <td className="py-2 px-2 text-right">63</td>
                            <td className="py-2 px-2 text-right">2</td>
                            <td className="py-2 px-2 text-right">7.00</td>
                          </tr>
                        </tbody>
                      </table>
                      
                      <div className="mt-6 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-400 mb-1">Win Probability</h4>
                        <div className="flex items-center">
                          <div className="h-2 rounded-l-full bg-cricket-green" style={{ width: '62%' }}></div>
                          <div className="h-2 rounded-r-full bg-cricket-blue" style={{ width: '38%' }}></div>
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                          <span>India: 62%</span>
                          <span>Australia: 38%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="upcoming" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingMatches.map((match) => (
                  <LiveMatchCard key={match.id} match={match} />
                ))}
              </div>
              
              <Card className="mt-8">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Match Preview: India vs New Zealand</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">
                    The upcoming Test match between India and New Zealand at Eden Gardens promises to be an exciting 
                    contest with both teams in great form. India will look to capitalize on their home advantage while 
                    New Zealand will hope for an upset.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div>
                      <h3 className="font-medium mb-3">Key Player Matchups</h3>
                      <ul className="space-y-3">
                        <li className="flex justify-between items-center border-b pb-2">
                          <div>
                            <p className="font-medium">Virat Kohli vs Tim Southee</p>
                            <p className="text-sm text-muted-foreground">12 innings, 4 dismissals</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">187 runs</p>
                            <p className="text-sm text-muted-foreground">SR: 64.7</p>
                          </div>
                        </li>
                        <li className="flex justify-between items-center border-b pb-2">
                          <div>
                            <p className="font-medium">Kane Williamson vs R Ashwin</p>
                            <p className="text-sm text-muted-foreground">8 innings, 5 dismissals</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">143 runs</p>
                            <p className="text-sm text-muted-foreground">SR: 42.3</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">Venue Stats</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center border-b pb-2">
                          <p>Average 1st Innings Score</p>
                          <p className="font-medium">324</p>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                          <p>Highest Chase</p>
                          <p className="font-medium">276</p>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                          <p>Toss Win-Match Win %</p>
                          <p className="font-medium">64%</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p>Pitch Tendency</p>
                          <p className="font-medium">Spin-friendly</p>
                        </div>
                      </div>
                      
                      <div className="mt-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <h4 className="text-sm font-medium text-green-800 dark:text-green-400 mb-1">AI Prediction</h4>
                        <p className="text-sm">Based on recent form and historical data at this venue, India has a 67% chance of winning this Test match.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="recent" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentMatches.map((match) => (
                  <LiveMatchCard key={match.id} match={match} />
                ))}
              </div>
              
              <Card className="mt-8">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Match Analysis: England vs New Zealand</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">
                    The thrilling World Cup final between England and New Zealand ended in a tie, with England winning on boundary count. 
                    This match will be remembered as one of the greatest ODI matches in cricket history.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div>
                      <h3 className="font-medium mb-3">Match Highlights</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-cricket-green rounded-full mt-1.5 mr-2"></span>
                          <p>Ben Stokes heroic 84* kept England in the match when wickets were falling</p>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-cricket-green rounded-full mt-1.5 mr-2"></span>
                          <p>The Super Over also ended in a tie with both teams scoring 15 runs</p>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-cricket-green rounded-full mt-1.5 mr-2"></span>
                          <p>England hit 26 boundaries compared to New Zealand's 17, giving them the victory</p>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-cricket-green rounded-full mt-1.5 mr-2"></span>
                          <p>Kane Williamson was named Player of the Tournament for his 578 runs</p>
                        </li>
                      </ul>
                      
                      <div className="mt-6">
                        <h3 className="font-medium mb-3">Top Performances</h3>
                        <div className="space-y-3">
                          <div className="p-3 border rounded-lg">
                            <div className="flex justify-between">
                              <p className="font-medium">Ben Stokes (ENG)</p>
                              <p>84* (98)</p>
                            </div>
                            <p className="text-sm text-muted-foreground">Also took 0/20 in 3 overs</p>
                          </div>
                          <div className="p-3 border rounded-lg">
                            <div className="flex justify-between">
                              <p className="font-medium">Henry Nicholls (NZ)</p>
                              <p>55 (77)</p>
                            </div>
                            <p className="text-sm text-muted-foreground">Highest score for New Zealand</p>
                          </div>
                          <div className="p-3 border rounded-lg">
                            <div className="flex justify-between">
                              <p className="font-medium">Chris Woakes (ENG)</p>
                              <p>3/37 (9)</p>
                            </div>
                            <p className="text-sm text-muted-foreground">Best bowling figures in the match</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">Match Stats</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm mb-1">Total Runs</p>
                          <div className="flex h-4 rounded-full overflow-hidden">
                            <div className="bg-cricket-blue text-xs flex items-center justify-center text-white" style={{ width: '50%' }}>241</div>
                            <div className="bg-cricket-green text-xs flex items-center justify-center text-white" style={{ width: '50%' }}>241</div>
                          </div>
                          <div className="flex justify-between text-xs mt-1">
                            <span>England</span>
                            <span>New Zealand</span>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm mb-1">Boundaries</p>
                          <div className="flex h-4 rounded-full overflow-hidden">
                            <div className="bg-cricket-blue text-xs flex items-center justify-center text-white" style={{ width: '60%' }}>26</div>
                            <div className="bg-cricket-green text-xs flex items-center justify-center text-white" style={{ width: '40%' }}>17</div>
                          </div>
                          <div className="flex justify-between text-xs mt-1">
                            <span>England</span>
                            <span>New Zealand</span>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm mb-1">Wickets</p>
                          <div className="flex h-4 rounded-full overflow-hidden">
                            <div className="bg-cricket-blue text-xs flex items-center justify-center text-white" style={{ width: '45%' }}>8</div>
                            <div className="bg-cricket-green text-xs flex items-center justify-center text-white" style={{ width: '55%' }}>10</div>
                          </div>
                          <div className="flex justify-between text-xs mt-1">
                            <span>England</span>
                            <span>New Zealand</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="font-medium mb-3">Historical Context</h3>
                        <p className="text-sm">
                          This was England's first World Cup victory after reaching the final four times previously. 
                          The match is regarded as the greatest ODI ever played due to its dramatic finish and the 
                          unprecedented method of determining the winner after both the match and Super Over ended in ties.
                        </p>
                      </div>
                    </div>
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

export default Matches;
