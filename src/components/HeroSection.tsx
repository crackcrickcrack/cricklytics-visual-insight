
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="hero-pattern text-white pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            <span className="text-cricket-yellow">Cricket</span> Analytics
            <br /> 
            <span className="text-cricket-green">Reimagined</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90 animate-fade-up">
            Dive deep into cricket insights with real-time stats, 
            comprehensive player analytics, and predictive performance metrics
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/dashboard">
              <Button size="lg" className="bg-cricket-green hover:bg-cricket-green/90">
                Explore Stats
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/compare">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Compare Players
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="mt-16 md:mt-24 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Feature Box 1 */}
          <div className="cricket-card bg-white/10 backdrop-blur-sm border-white/20 text-white animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cricket-yellow/20 mb-4 mx-auto">
              <svg className="h-6 w-6 text-cricket-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">Real-time Analytics</h3>
            <p className="text-sm text-center opacity-80">
              Live match statistics updated in real-time with advanced visualization
            </p>
          </div>
          
          {/* Feature Box 2 */}
          <div className="cricket-card bg-white/10 backdrop-blur-sm border-white/20 text-white animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cricket-green/20 mb-4 mx-auto">
              <svg className="h-6 w-6 text-cricket-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">Player Insights</h3>
            <p className="text-sm text-center opacity-80">
              Comprehensive player stats and performance analytics across formats
            </p>
          </div>
          
          {/* Feature Box 3 */}
          <div className="cricket-card bg-white/10 backdrop-blur-sm border-white/20 text-white animate-fade-up" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cricket-orange/20 mb-4 mx-auto">
              <svg className="h-6 w-6 text-cricket-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">Predictive Models</h3>
            <p className="text-sm text-center opacity-80">
              AI-powered performance predictions and match outcome forecasts
            </p>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default HeroSection;
