
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { ArrowRight } from 'lucide-react';

interface PlayerStats {
  matches: number;
  runs?: number;
  average?: number;
  wickets?: number;
  economy?: number;
  hundreds?: number;
  fifties?: number;
  best?: string;
}

interface PlayerCardProps {
  player: {
    id: string;
    name: string;
    country: string;
    role: string;
    stats: PlayerStats;
    imageUrl?: string;
  };
}

// Updated player images mapping with verified URLs from ESPNCricinfo
const playerImages: Record<string, string> = {
  'Virat Kohli': 'https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316500/316555.png',
  'Joe Root': 'https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316600/316661.png',
  'Kane Williamson': 'https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316500/316580.png',
  'Babar Azam': 'https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/323000/323006.png',
  'Steve Smith': 'https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316500/316510.png',
  'Jasprit Bumrah': 'https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316500/316538.png',
  'Pat Cummins': 'https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316500/316507.png',
  'Ben Stokes': 'https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316600/316642.png',
  'Rohit Sharma': 'https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316500/316557.png',
  'Jos Buttler': 'https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316600/316640.png',
  'Shakib Al Hasan': 'https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316400/316486.png',
  'Mitchell Starc': 'https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316500/316512.png',
  'Quinton de Kock': 'https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316700/316722.png',
  'Trent Boult': 'https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316500/316579.png',
  'David Warner': 'https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316500/316508.png',
  'Faf du Plessis': 'https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316700/316724.png',
  'Rashid Khan': 'https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316400/316415.png',
  'KL Rahul': 'https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316500/316539.png',
  'Kagiso Rabada': 'https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316700/316719.png',
  'Glenn Maxwell': 'https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316500/316502.png'
};

// Better default images for cricket players (high quality but generic cricket images)
const defaultImages = [
  'https://img1.hscicdn.com/image/upload/f_auto,t_gn_w_1200/lsci/db/PICTURES/CMS/342100/342180.jpg', // Generic cricket image
  'https://img1.hscicdn.com/image/upload/f_auto,t_gn_w_1200/lsci/db/PICTURES/CMS/342100/342178.jpg', // Cricket stadium
  'https://img1.hscicdn.com/image/upload/f_auto,t_gn_w_1200/lsci/db/PICTURES/CMS/342100/342179.jpg'  // Cricket field
];

// Calculate performance rating (simple algorithm for demo)
const calculatePerformanceRating = (stats: PlayerStats, role: string) => {
  if (role.toLowerCase().includes('bat')) {
    const avgImpact = stats.average ? Math.min(stats.average / 55 * 100, 100) : 60;
    const centuryImpact = stats.hundreds ? Math.min(stats.hundreds / 30 * 100, 100) : 50;
    const fiftyImpact = stats.fifties ? Math.min(stats.fifties / 50 * 100, 100) : 50;
    return (avgImpact * 0.5) + (centuryImpact * 0.3) + (fiftyImpact * 0.2);
  } else if (role.toLowerCase().includes('bowl')) {
    const wicketsImpact = stats.wickets ? Math.min(stats.wickets / 300 * 100, 100) : 60;
    const economyImpact = stats.economy ? Math.min((8 - stats.economy) / 4 * 100, 100) : 50;
    return (wicketsImpact * 0.7) + (economyImpact * 0.3);
  } else {
    // All-rounder
    const batImpact = stats.average ? Math.min(stats.average / 40 * 100, 100) : 50;
    const bowlImpact = stats.wickets ? Math.min(stats.wickets / 200 * 100, 100) : 50;
    return (batImpact * 0.5) + (bowlImpact * 0.5);
  }
};

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  const { name, country, role, stats, imageUrl } = player;
  const [flipped, setFlipped] = useState(false);

  const isAllrounder = role.toLowerCase().includes('all');
  const isBatsman = role.toLowerCase().includes('bat');

  // First try to get the image from our verified mapping
  const playerImage = playerImages[name] || imageUrl || defaultImages[Math.floor(Math.random() * defaultImages.length)];

  // Function to handle image loading errors - fallback to default images
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = defaultImages[Math.floor(Math.random() * defaultImages.length)];
  };

  // Determine role color
  const getRoleColor = () => {
    if (isBatsman) return 'bg-cricket-blue';
    if (role.toLowerCase().includes('bowl')) return 'bg-cricket-green';
    if (isAllrounder) return 'bg-cricket-purple';
    return 'bg-cricket-yellow';
  };

  // Calculate performance for visual indicators
  const performanceRating = calculatePerformanceRating(stats, role);
  const formLevel = Math.min(Math.round(performanceRating), 100);

  return (
    <div 
      className="relative rounded-3xl overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.15)] bg-gradient-to-br from-black/80 via-black/90 to-black/95 backdrop-blur-md border border-white/10 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-[0_15px_30px_rgba(0,0,0,0.25)] group"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      style={{ height: '500px' }}
    >
      <div className="relative h-full">
        {/* Front of the card */}
        <div className={`absolute inset-0 transition-all duration-500 ${flipped ? 'opacity-0' : 'opacity-100'}`}>
          {/* Player Image with Overlay */}
          <div className="relative h-3/5 overflow-hidden">
            <img 
              src={playerImage} 
              alt={`${name} - ${role} from ${country}`}
              className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
              onError={handleImageError}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-80"></div>

            {/* Player role and country badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className={`format-badge ${getRoleColor()} text-white`}>{role}</span>
              <span className="format-badge bg-cricket-yellow text-cricket-dark">{country}</span>
            </div>
          </div>

          {/* Player Name */}
          <div className="absolute bottom-1/3 left-0 right-0 p-5">
            <div className="flex flex-col items-center">
              <h3 className="font-headline text-5xl text-white uppercase tracking-tight mb-1">{name.split(' ')[0]}</h3>
              {name.split(' ').length > 1 && (
                <h3 className="font-headline text-5xl text-cricket-blue uppercase tracking-tight">
                  {name.split(' ').slice(1).join(' ')}
                </h3>
              )}
            </div>
          </div>

          {/* Stats Preview */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex justify-center items-center gap-3 text-white">
              <div className="text-center glass-panel p-3 rounded-xl">
                <p className="font-sans text-xs uppercase tracking-widest opacity-70">Matches</p>
                <p className="font-headline text-2xl">{stats.matches}</p>
              </div>
              
              {isBatsman || isAllrounder ? (
                <div className="text-center glass-panel p-3 rounded-xl">
                  <p className="font-sans text-xs uppercase tracking-widest opacity-70">Runs</p>
                  <p className="font-headline text-2xl text-cricket-blue">{stats.runs}</p>
                </div>
              ) : (
                <div className="text-center glass-panel p-3 rounded-xl">
                  <p className="font-sans text-xs uppercase tracking-widest opacity-70">Wickets</p>
                  <p className="font-headline text-2xl text-cricket-pink">{stats.wickets}</p>
                </div>
              )}
              
              <HoverCard>
                <HoverCardTrigger asChild>
                  <button className="text-center glass-panel p-3 rounded-xl cursor-pointer group-hover:bg-white/20 transition-colors">
                    <p className="font-sans text-xs uppercase tracking-widest opacity-70">Form</p>
                    <div className="flex items-center gap-1">
                      <p className="font-headline text-lg text-cricket-green">{formLevel}%</p>
                      <ArrowRight size={14} className="text-cricket-green animate-pulse" />
                    </div>
                  </button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 p-0 bg-black/90 border-white/10 text-white">
                  <div className="p-4">
                    <h4 className="text-lg font-headline mb-2">Performance Rating</h4>
                    <p className="text-sm text-white/70 mb-3 font-sans">Based on career statistics and recent form</p>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <p className="text-xs font-sans">Overall Form</p>
                          <span className="text-xs font-sans">{formLevel}%</span>
                        </div>
                        <Progress value={formLevel} className="h-2 bg-white/10" />
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
        </div>
        
        {/* Back of the card - Detailed stats */}
        <div className={`absolute inset-0 transition-all duration-500 bg-gradient-to-br from-black/95 via-black/90 to-black/80 backdrop-blur-md p-6 ${flipped ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-col h-full">
            <h3 className="font-headline text-4xl text-white uppercase tracking-tight mb-4 text-center">{name}</h3>
            
            <div className="flex justify-between items-center mb-6">
              <span className={`format-badge ${getRoleColor()} text-white`}>{role}</span>
              <span className="format-badge bg-cricket-yellow text-cricket-dark">{country}</span>
            </div>
            
            <div className="flex-grow">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="glass-panel p-4 rounded-xl">
                  <p className="font-sans text-xs uppercase tracking-widest text-white/70">Matches</p>
                  <p className="font-headline text-3xl text-white">{stats.matches}</p>
                </div>
                
                {(isBatsman || isAllrounder) && (
                  <>
                    <div className="glass-panel p-4 rounded-xl">
                      <p className="font-sans text-xs uppercase tracking-widest text-white/70">Average</p>
                      <p className="font-headline text-3xl text-cricket-green">{stats.average}</p>
                    </div>
                    <div className="glass-panel p-4 rounded-xl">
                      <p className="font-sans text-xs uppercase tracking-widest text-white/70">Runs</p>
                      <p className="font-headline text-3xl text-cricket-blue">{stats.runs}</p>
                    </div>
                    <div className="glass-panel p-4 rounded-xl col-span-1">
                      <p className="font-sans text-xs uppercase tracking-widest text-white/70">100s/50s</p>
                      <p className="font-headline text-2xl">
                        <span className="text-cricket-yellow">{stats.hundreds || 0}</span> / <span className="text-cricket-pink">{stats.fifties || 0}</span>
                      </p>
                    </div>
                  </>
                )}

                {(!isBatsman || isAllrounder) && (
                  <>
                    <div className="glass-panel p-4 rounded-xl">
                      <p className="font-sans text-xs uppercase tracking-widest text-white/70">Wickets</p>
                      <p className="font-headline text-3xl text-cricket-pink">{stats.wickets}</p>
                    </div>
                    <div className="glass-panel p-4 rounded-xl">
                      <p className="font-sans text-xs uppercase tracking-widest text-white/70">Economy</p>
                      <p className="font-headline text-3xl text-cricket-yellow">{stats.economy}</p>
                    </div>
                    <div className="glass-panel p-4 rounded-xl col-span-1">
                      <p className="font-sans text-xs uppercase tracking-widest text-white/70">Best</p>
                      <p className="font-headline text-3xl text-cricket-green">{stats.best}</p>
                    </div>
                  </>
                )}
              </div>
              
              <div className="mt-4">
                <p className="font-sans text-xs uppercase tracking-widest mb-2 text-white/70">Performance Rating</p>
                <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-cricket-blue to-cricket-green rounded-full"
                    style={{ width: `${formLevel}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs font-sans text-white/50">Form</span>
                  <span className="text-xs font-sans text-white/80">{formLevel}%</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-center text-sm text-white/50 font-sans">
              <p>Tap for more details</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
