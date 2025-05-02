
import React from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
  'Ben Stokes': 'https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316600/316642.png'
};

// Default player images for fallback
const defaultImages = [
  'https://images.unsplash.com/photo-1531891570158-e71b35a485bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&h=764&q=80',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=800&q=80',
  'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&h=870&q=80'
];

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  const { name, country, role, stats, imageUrl } = player;
  
  const isAllrounder = role.toLowerCase().includes('all');
  const isBatsman = role.toLowerCase().includes('bat');
  
  // Get player image from mapping or use provided imageUrl or fallback
  const playerImage = playerImages[name] || imageUrl || defaultImages[Math.floor(Math.random() * defaultImages.length)];

  // Determine role color
  const getRoleColor = () => {
    if (isBatsman) return 'bg-cricket-blue';
    if (role.toLowerCase().includes('bowl')) return 'bg-cricket-green';
    if (isAllrounder) return 'bg-cricket-purple';
    return 'bg-cricket-yellow';
  };
  
  return (
    <Card className="overflow-hidden card-shine hover:shadow-2xl transition-all duration-300 rounded-2xl border-0 shadow-lg group">
      <div className="grid grid-cols-1 relative">
        {/* Player Image with Overlay */}
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={playerImage} 
            alt={name}
            className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cricket-dark via-cricket-dark/40 to-transparent opacity-80"></div>
          
          {/* Player Name Badge */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex flex-col items-start">
              <div className="flex gap-2 mb-2">
                <span className={`px-2 py-1 ${getRoleColor()} text-xs font-bold uppercase tracking-wider rounded-full text-white`}>{role}</span>
                <span className="px-2 py-1 bg-cricket-yellow/90 text-xs font-bold uppercase tracking-wider rounded-full text-cricket-dark">{country}</span>
              </div>
              <h3 className="font-bold text-3xl text-white">{name}</h3>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-5 bg-white dark:bg-card">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="text-center bg-gradient-to-br from-muted/50 to-muted rounded-xl p-3">
            <p className="text-xs uppercase font-bold tracking-wide opacity-70">Matches</p>
            <p className="font-bold text-2xl">{stats.matches}</p>
          </div>
          
          {(isBatsman || isAllrounder) && (
            <>
              <div className="text-center bg-gradient-to-br from-muted/50 to-muted rounded-xl p-3">
                <p className="text-xs uppercase font-bold tracking-wide opacity-70">Runs</p>
                <p className="font-bold text-2xl">{stats.runs}</p>
              </div>
              <div className="text-center bg-gradient-to-br from-muted/50 to-muted rounded-xl p-3">
                <p className="text-xs uppercase font-bold tracking-wide opacity-70">Average</p>
                <p className="font-bold text-2xl">{stats.average}</p>
              </div>
              <div className="text-center bg-gradient-to-br from-muted/50 to-muted rounded-xl p-3">
                <p className="text-xs uppercase font-bold tracking-wide opacity-70">100s/50s</p>
                <p className="font-bold text-2xl">{stats.hundreds}/{stats.fifties}</p>
              </div>
            </>
          )}
          
          {(!isBatsman || isAllrounder) && (
            <>
              <div className="text-center bg-gradient-to-br from-muted/50 to-muted rounded-xl p-3">
                <p className="text-xs uppercase font-bold tracking-wide opacity-70">Wickets</p>
                <p className="font-bold text-2xl">{stats.wickets}</p>
              </div>
              <div className="text-center bg-gradient-to-br from-muted/50 to-muted rounded-xl p-3">
                <p className="text-xs uppercase font-bold tracking-wide opacity-70">Economy</p>
                <p className="font-bold text-2xl">{stats.economy}</p>
              </div>
              <div className="text-center bg-gradient-to-br from-muted/50 to-muted rounded-xl p-3">
                <p className="text-xs uppercase font-bold tracking-wide opacity-70">Best</p>
                <p className="font-bold text-2xl">{stats.best}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default PlayerCard;
