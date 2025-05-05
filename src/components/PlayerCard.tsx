import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, ChevronRight, BarChart2 } from 'lucide-react';

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

// Player images mapping
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

// Default images
const defaultImages = [
  'https://img1.hscicdn.com/image/upload/f_auto,t_gn_w_1200/lsci/db/PICTURES/CMS/342100/342180.jpg',
  'https://img1.hscicdn.com/image/upload/f_auto,t_gn_w_1200/lsci/db/PICTURES/CMS/342100/342178.jpg',
  'https://img1.hscicdn.com/image/upload/f_auto,t_gn_w_1200/lsci/db/PICTURES/CMS/342100/342179.jpg'
];

// Calculate performance rating
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
  
  const isAllrounder = role.toLowerCase().includes('all');
  const isBatsman = role.toLowerCase().includes('bat');

  // Get player image or fallback to default
  const playerImage = playerImages[name] || imageUrl || defaultImages[Math.floor(Math.random() * defaultImages.length)];

  // Function to handle image loading errors
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
    <div className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
      {/* Header with image and basic info */}
      <div className="flex items-center p-4 border-b">
        <div className="w-16 h-16 rounded-full overflow-hidden border">
          <img 
            src={playerImage} 
            alt={`${name} - ${role} from ${country}`}
            className="w-full h-full object-cover"
            onError={handleImageError}
            loading="lazy"
          />
        </div>
        <div className="ml-4 flex-1">
          <h3 className="font-display text-xl text-cricket-navy">{name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className={`format-badge ${getRoleColor()} text-white`}>{role}</span>
            <span className="format-badge bg-gray-100 text-gray-800">{country}</span>
          </div>
        </div>
        <div className="ml-auto">
          <span className="inline-flex items-center px-2 py-1 rounded bg-gray-100">
            <BarChart2 size={14} className="mr-1 text-cricket-navy" />
            <span className="text-sm font-medium">{formLevel}</span>
          </span>
        </div>
      </div>

      {/* Stats section */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="border rounded p-2">
            <p className="text-xs text-gray-500 uppercase">Matches</p>
            <p className="text-lg font-display text-cricket-navy">{stats.matches}</p>
          </div>
          
          {isBatsman || isAllrounder ? (
            <div className="border rounded p-2">
              <p className="text-xs text-gray-500 uppercase">Runs</p>
              <p className="text-lg font-display text-cricket-blue">{stats.runs}</p>
            </div>
          ) : (
            <div className="border rounded p-2">
              <p className="text-xs text-gray-500 uppercase">Wickets</p>
              <p className="text-lg font-display text-cricket-green">{stats.wickets}</p>
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          {(isBatsman || isAllrounder) && stats.average && (
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs text-gray-500 uppercase">Batting Average</span>
                <span className="text-xs font-medium">{stats.average}</span>
              </div>
              <Progress value={(stats.average / 60) * 100} className="h-1.5" />
            </div>
          )}
          
          {(isBatsman || isAllrounder) && stats.hundreds && (
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs text-gray-500 uppercase">Centuries</span>
                <span className="text-xs font-medium">{stats.hundreds}</span>
              </div>
              <Progress value={(stats.hundreds / 30) * 100} className="h-1.5" />
            </div>
          )}
          
          {(!isBatsman || isAllrounder) && stats.economy && (
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs text-gray-500 uppercase">Economy</span>
                <span className="text-xs font-medium">{stats.economy}</span>
              </div>
              <Progress value={((8 - stats.economy) / 4) * 100} className="h-1.5" />
            </div>
          )}
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs text-gray-500 uppercase">Form Rating</span>
              <span className="text-xs font-medium">{formLevel}%</span>
            </div>
            <Progress value={formLevel} className="h-1.5" />
          </div>
        </div>
      </div>
      
      {/* Footer with action */}
      <div className="border-t p-3">
        <button className="w-full flex items-center justify-center text-sm font-medium text-cricket-navy hover:text-cricket-blue transition-colors">
          <span>View Full Profile</span>
          <ChevronRight size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default PlayerCard;
