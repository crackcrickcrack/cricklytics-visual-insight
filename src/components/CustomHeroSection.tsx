
import React from 'react';
import { Button } from '@/components/ui/button';

const CustomHeroSection: React.FC = () => {
  return (
    <div className="hero-pattern relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Abstract shapes */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-cricket-purple/20 filter blur-3xl animate-float"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-cricket-blue/20 filter blur-3xl"></div>
        <div className="absolute top-40 left-1/3 w-64 h-64 rounded-full bg-cricket-green/20 filter blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="text-white animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="inline-block px-4 py-1 mb-6 bg-cricket-purple/20 border border-cricket-purple/30 rounded-full">
              <p className="text-sm font-medium text-white/90">2025 CRICKET PREMIER LEAGUE</p>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
              Live the<br/>
              <span className="bg-gradient-to-r from-cricket-purple via-cricket-blue to-cricket-green bg-clip-text text-transparent">Cricket Action</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl">
              Experience real-time analytics, player insights, and match predictions with our cutting-edge cricket platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-cricket-purple hover:bg-cricket-purple/90 text-white font-bold px-8 py-6 rounded-xl text-base">
                Live Matches
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-white/20 hover:bg-white/10 text-white font-bold px-8 py-6 rounded-xl text-base">
                Player Stats
              </Button>
            </div>
          </div>

          <div className="relative hidden lg:block animate-fade-up" style={{ animationDelay: '0.6s' }}>
            <div className="relative h-[500px]">
              {/* Cricket ball design */}
              <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-cricket-purple/30 backdrop-blur-lg border border-white/10 animate-float overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1531891570158-e71b35a485bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&h=764&q=80')] bg-cover bg-center opacity-70 mix-blend-overlay"></div>
                </div>
              </div>
              
              {/* Featured player card */}
              <div className="absolute bottom-0 left-0 w-80 bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                <div className="h-60 overflow-hidden">
                  <img 
                    src="https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316500/316555.png" 
                    alt="Featured Player" 
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-white font-bold text-xl">Virat Kohli</h3>
                      <p className="text-white/70 text-sm">Batting Average: 57.32</p>
                    </div>
                    <div className="bg-cricket-blue rounded-full h-10 w-10 flex items-center justify-center text-white font-bold text-sm">
                      IND
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between">
                    <div className="text-center">
                      <p className="text-white font-bold text-lg">43</p>
                      <p className="text-white/70 text-xs">100s</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-bold text-lg">65</p>
                      <p className="text-white/70 text-xs">50s</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-bold text-lg">12K+</p>
                      <p className="text-white/70 text-xs">Runs</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Live match indicator */}
              <div className="absolute top-60 right-40 animate-pulse-slow">
                <div className="bg-gradient-to-br from-cricket-green to-cricket-blue p-5 rounded-2xl text-white backdrop-blur-lg border border-white/10 shadow-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="font-bold uppercase text-xs tracking-wider">Live Match</span>
                  </div>
                  <p className="font-bold">IND vs AUS</p>
                  <p className="text-xs text-white/80">India: 276/4 (42.3 ov)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Slanted bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-background clip-diagonal"></div>
    </div>
  );
};

export default CustomHeroSection;
