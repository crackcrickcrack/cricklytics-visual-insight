import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useTheme } from '@/components/ThemeProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for live matches
const liveMatches = [
  {
    id: '1',
    teams: [
      { name: 'India', shortName: 'IND', score: '276', wickets: 4, overs: 42.3 },
      { name: 'Australia', shortName: 'AUS' }
    ],
    format: "ODI" as const,
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
    format: "ODI" as const,
    venue: 'Lords, London',
    status: 'South Africa batting',
    isLive: true
  }
];

// Mock data for featured articles
const featuredArticles = [
  {
    id: '1',
    title: 'The Evolution of T20 Cricket: A Data-Driven Analysis',
    excerpt: 'How data analytics is reshaping the shortest format of the game',
    image: '/images/t20-analysis.jpg',
    category: 'Analysis',
    readTime: '5 min read'
  },
  {
    id: '2',
    title: 'Breaking Down Virat Kohli\'s Comeback',
    excerpt: 'A statistical deep dive into the Indian captain\'s recent form',
    image: '/images/kohli-analysis.jpg',
    category: 'Player Analysis',
    readTime: '4 min read'
  }
];

// Mock data for performance trends
const performanceTrends = [
  { month: 'Jan', runs: 87, wickets: 12 },
  { month: 'Feb', runs: 53, wickets: 8 },
  { month: 'Mar', runs: 104, wickets: 15 },
  { month: 'Apr', runs: 76, wickets: 10 },
  { month: 'May', runs: 122, wickets: 18 },
  { month: 'Jun', runs: 45, wickets: 7 }
];

const Index = () => {
  const { isDark, toggleTheme } = useTheme();

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/images/placeholder.jpg';
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar toggleTheme={toggleTheme} isDark={isDark} />

      {/* Hero Section with Live Scores */}
      <section className="relative pt-20 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Live Scores */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Live Matches</h2>
              <div className="space-y-4">
                {liveMatches.map((match) => (
                  <Card key={match.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-muted-foreground">{match.format}</span>
                        <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">LIVE</span>
                      </div>
                      <div className="space-y-4">
                        {match.teams.map((team, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                                <span className="text-xs font-medium">{team.shortName}</span>
                              </div>
                              <span className="font-medium">{team.name}</span>
                            </div>
                            {team.score && (
                              <div className="text-right">
                                <span className="font-bold">{team.score}</span>
                                <span className="text-muted-foreground ml-2">({team.wickets}/{team.overs})</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-sm text-muted-foreground">{match.venue}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Featured Articles */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Featured Analysis</h2>
              <div className="space-y-4">
                {featuredArticles.map((article) => (
                  <Card key={article.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="aspect-video relative mb-4 rounded-lg overflow-hidden bg-muted">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-muted-foreground">Image Placeholder</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">{article.category}</span>
                        <span className="text-xs text-muted-foreground">{article.readTime}</span>
                      </div>
                      <h3 className="font-semibold mb-2">{article.title}</h3>
                      <p className="text-sm text-muted-foreground">{article.excerpt}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Analytics Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Advanced Analytics</h2>
            <Link to="/dashboard">
              <Button variant="outline">View All Analytics</Button>
            </Link>
          </div>

          <Tabs defaultValue="batting" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="batting">Batting</TabsTrigger>
              <TabsTrigger value="bowling">Bowling</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
            </TabsList>

            <TabsContent value="batting">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceTrends}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="month" />
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
                          yAxisId="right"
                          type="monotone"
                          dataKey="wickets"
                          stroke="#FFD700"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Highest Score</h3>
                <p className="text-3xl font-bold text-primary">264</p>
                <p className="text-sm text-muted-foreground">Rohit Sharma vs Sri Lanka</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Best Bowling</h3>
                <p className="text-3xl font-bold text-primary">8/19</p>
                <p className="text-sm text-muted-foreground">Stuart Broad vs Australia</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Fastest Century</h3>
                <p className="text-3xl font-bold text-primary">31 balls</p>
                <p className="text-sm text-muted-foreground">AB de Villiers vs West Indies</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
