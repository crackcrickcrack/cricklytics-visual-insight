
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CustomHeroSection: React.FC = () => {
  return (
    <div className="hero-pattern relative overflow-hidden min-h-screen flex items-center">
      {/* Dynamic background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[10%] right-[10%] w-96 h-96 rounded-full bg-mesh-1 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-[10%] left-[10%] w-96 h-96 rounded-full bg-mesh-2 opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-mesh-3 opacity-10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-white">
            <div className="inline-flex items-center bg-cricket-blue/20 border border-cricket-blue/30 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-cricket-blue rounded-full animate-pulse mr-2"></span>
              <p className="text-sm font-medium uppercase tracking-wider">CRICKET PREMIER LEAGUE 2025</p>
            </div>
            
            <h1 className="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight leading-none mb-6">
              WITNESS THE<br />
              <span className="text-gradient-to-r from-cricket-yellow via-cricket-green to-cricket-blue inline-block text-transparent bg-clip-text bg-gradient-to-r from-cricket-yellow via-cricket-green to-cricket-blue">CRICKET FEVER</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl">
              Experience the thrill of cricket like never before with real-time analytics, 
              interactive stats, and immersive match coverage.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/matches">
                <button className="cricket-button-primary">
                  LIVE MATCHES
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link to="/dashboard">
                <button className="cricket-button-outline">
                  PLAYER STATS
                </button>
              </Link>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            {/* Player card with perspective design */}
            <div className="relative h-[600px]">
              <div className="absolute top-0 right-0 w-80 h-[480px] rounded-3xl overflow-hidden transform rotate-6 shadow-2xl origin-bottom-left transition-all duration-700 hover:rotate-0 hover:scale-105">
                <div className="w-full h-full bg-gradient-to-br from-cricket-blue to-cricket-purple p-0.5">
                  <div className="w-full h-full bg-cricket-dark rounded-3xl overflow-hidden">
                    <div className="h-3/4 overflow-hidden">
                      <img 
                        src="https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316500/316555.png" 
                        alt="Virat Kohli"
                        className="w-full h-full object-cover object-top transform scale-125"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4 text-white">
                      <div className="flex justify-between items-center">
                        <h3 className="font-display text-2xl uppercase tracking-wider">KOHLI</h3>
                        <span className="bg-cricket-blue rounded-full h-8 w-8 flex items-center justify-center text-white font-bold text-xs">IND</span>
                      </div>
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        <div className="text-center">
                          <p className="font-display text-xl text-cricket-green">50</p>
                          <p className="text-xs text-white/70 uppercase">100s</p>
                        </div>
                        <div className="text-center">
                          <p className="font-display text-xl text-cricket-yellow">72</p>
                          <p className="text-xs text-white/70 uppercase">50s</p>
                        </div>
                        <div className="text-center">
                          <p className="font-display text-xl text-cricket-pink">13K+</p>
                          <p className="text-xs text-white/70 uppercase">Runs</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Live match indicator */}
              <div className="absolute bottom-0 left-0 glass-panel p-5 animate-pulse-slow transform transition-all duration-500 hover:translate-y-[-10px]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="font-action uppercase tracking-wider text-sm">LIVE MATCH</span>
                </div>
                <p className="font-display text-xl text-white uppercase">IND vs AUS</p>
                <p className="text-sm text-white/80">India: 276/4 (42.3 ov)</p>
              </div>
              
              {/* Stats card */}
              <div className="absolute top-[40%] right-[60%] glass-panel p-4 transform rotate-[-6deg] transition-all duration-500 hover:rotate-0">
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-headline text-cricket-yellow">93.5</span>
                  <span className="text-xs uppercase tracking-wider text-white/70">Strike Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slanted bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-background slant-edge"></div>
    </div>
  );
};

export default CustomHeroSection;
