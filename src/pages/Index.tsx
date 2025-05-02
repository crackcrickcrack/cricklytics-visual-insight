import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import LiveMatchCard from '@/components/LiveMatchCard';
import PlayerCard from '@/components/PlayerCard';
import InsightCard from '@/components/InsightCard';
import StatHighlight from '@/components/StatHighlight';
import { useTheme } from '@/components/ThemeProvider';
import PerformanceChart from '@/components/PerformanceChart';
import RadarPlayerChart from '@/components/RadarPlayerChart';

// Mock data
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
  },
  {
    id: '3',
    teams: [
      { name: 'New Zealand', shortName: 'NZ', score: '242', wickets: 10, overs: 50.0 },
      { name: 'Pakistan', shortName: 'PAK', score: '243', wickets: 6, overs: 47.5 }
    ],
    format: "T20" as const,
    venue: 'Hagley Oval',
    status: 'Pakistan won by 4 wickets',
    isLive: false
  }
];

const topPlayers = [
  {
    id: '1',
    name: 'Virat Kohli',
    country: 'India',
    role: 'Batsman',
    imageUrl: 'https://images.unsplash.com/photo-1531891570158-e71b35a485bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
    stats: {
      matches: 274,
      runs: 12898,
      average: 57.32,
      hundreds: 43,
      fifties: 65
    }
  },
  {
    id: '2',
    name: 'Jasprit Bumrah',
    country: 'India',
    role: 'Bowler',
    imageUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    stats: {
      matches: 128,
      wickets: 269,
      economy: 4.39,
      best: '6/19'
    }
  },
  {
    id: '3',
    name: 'Ben Stokes',
    country: 'England',
    role: 'All-rounder',
    imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    stats: {
      matches: 178,
      runs: 5619,
      average: 38.22,
      wickets: 174,
      economy: 5.67,
      best: '5/61'
    }
  }
];

const insights = [
  {
    title: "Kohli's Form Analysis",
    content: "Virat Kohli has averaged 68.5 in the last 10 ODIs, significantly higher than his career average of 57.3.",
    category: 'batting' as const,
    timestamp: '2 hours ago'
  },
  {
    title: "Bumrah's Death Bowling",
    content: "Jasprit Bumrah has conceded only 5.2 runs per over in the death overs (41-50) in the last 15 matches.",
    category: 'bowling' as const,
    timestamp: '3 hours ago'
  },
  {
    title: "India vs Australia Prediction",
    content: "Based on current form and historical data, India has a 62% chance of winning today's match.",
    category: 'prediction' as const,
    timestamp: '5 hours ago'
  }
];

const performanceData = [
  { date: '2023-01', value: 87, opponent: 'vs AUS' },
  { date: '2023-02', value: 53, opponent: 'vs NZ' },
  { date: '2023-03', value: 104, opponent: 'vs ENG' },
  { date: '2023-04', value: 76, opponent: 'vs SA' },
  { date: '2023-05', value: 122, opponent: 'vs WI' },
  { date: '2023-06', value: 45, opponent: 'vs SL' },
];

const playerSkills = {
  name: "Virat Kohli",
  skills: [
    { name: "Batting", value: 95 },
    { name: "Running", value: 92 },
    { name: "Fielding", value: 88 },
    { name: "Technique", value: 96 },
    { name: "Power", value: 85 },
    { name: "Consistency", value: 94 },
  ],
  color: "#007C41"
};

const Index = () => {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <div className="min-h-screen flex flex-col bg-secondary/10">
      <Navbar toggleTheme={toggleTheme} isDark={isDark} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Live Matches Section */}
        <section className="py-12 px-4 bg-white dark:bg-background">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-cricket-blue to-cricket-green bg-clip-text text-transparent">Live Matches</h2>
              <a href="/matches" className="text-cricket-green hover:underline text-sm font-medium flex items-center">
                <span>View All</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {liveMatches.map((match) => (
                <LiveMatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Top Performers */}
        <section className="py-12 px-4 bg-secondary/10 dark:bg-secondary/5">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-cricket-green to-cricket-blue bg-clip-text text-transparent">Top Performers</h2>
              <a href="/players" className="text-cricket-green hover:underline text-sm font-medium flex items-center">
                <span>View All Players</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {topPlayers.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Stats & Insights Section */}
        <section className="py-12 px-4 bg-white dark:bg-background">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-cricket-blue to-cricket-green bg-clip-text text-transparent">Stats & Insights</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Stats */}
              <div className="lg:col-span-2 bg-white dark:bg-card p-6 rounded-xl shadow-md">
                <div className="mb-8">
                  <PerformanceChart 
                    title="Kohli's Recent Performance" 
                    data={performanceData}
                    dataKey="value"
                    color="#007C41"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  <StatHighlight 
                    title="Highest Score Today" 
                    value="122"
                    trend="up"
                    trendValue="+18 from prev. match"
                  />
                  <StatHighlight 
                    title="Most Wickets" 
                    value="4"
                    trend="neutral"
                    trendValue="Same as prev. match"
                  />
                  <StatHighlight 
                    title="Highest Strike Rate" 
                    value="187.5"
                    trend="up"
                    trendValue="+23.4 from avg"
                  />
                </div>
                <div className="mb-4">
                  <RadarPlayerChart player={playerSkills} />
                </div>
              </div>
              
              {/* Right Column - Insights */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">Latest Insights</h3>
                <div className="bg-white dark:bg-card p-6 rounded-xl shadow-md">
                  {insights.map((insight, idx) => (
                    <InsightCard 
                      key={idx}
                      title={insight.title}
                      content={insight.content}
                      category={insight.category}
                      timestamp={insight.timestamp}
                    />
                  ))}
                  <div className="bg-cricket-blue/5 border border-cricket-blue/20 rounded-lg p-4 mt-4">
                    <h4 className="font-medium mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-cricket-green" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      AI Prediction
                    </h4>
                    <p className="text-sm">Based on historical data and current form, our AI predicts Virat Kohli has a 72% chance of scoring 50+ runs in today's match.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <a href="/dashboard" className="inline-block bg-gradient-to-r from-cricket-blue to-cricket-green text-white px-8 py-4 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
                Explore Complete Statistics Dashboard
              </a>
            </div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-cricket-blue via-cricket-blue to-cricket-green text-white">
          <div className="container mx-auto max-w-xl text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="mb-8 text-lg opacity-90">Get the latest cricket insights, match predictions and player analysis straight to your inbox.</p>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-lg flex-grow text-foreground shadow-lg"
              />
              <button className="bg-cricket-yellow text-cricket-blue px-6 py-3 rounded-lg font-bold hover:bg-cricket-yellow/90 transition-colors shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="bg-cricket-blue text-white py-12 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold text-2xl mb-4">Cricklytics</h3>
                <p className="text-sm text-gray-300">Advanced cricket analytics platform for fans, fantasy players, and data enthusiasts.</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><a href="/" className="hover:text-white">Home</a></li>
                  <li><a href="/dashboard" className="hover:text-white">Stats Dashboard</a></li>
                  <li><a href="/compare" className="hover:text-white">Player Comparison</a></li>
                  <li><a href="/matches" className="hover:text-white">Live Matches</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-4">Resources</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><a href="#" className="hover:text-white">API Documentation</a></li>
                  <li><a href="#" className="hover:text-white">Data Sources</a></li>
                  <li><a href="#" className="hover:text-white">FAQs</a></li>
                  <li><a href="#" className="hover:text-white">Blog</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-4">Connect With Us</h4>
                <div className="flex space-x-4 mb-4">
                  <a href="#" className="text-gray-300 hover:text-white">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white">
                    <span className="sr-only">Facebook</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white">
                    <span className="sr-only">Instagram</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.01-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.045-1.064.218-1.504.344-1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                </div>
                <p className="text-sm text-gray-300">© 2023 Cricklytics. All rights reserved.</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/20 text-center">
            <p className="text-sm text-gray-300">© 2023 Cricklytics. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
