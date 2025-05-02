
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
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 rounded-xl border-0 shadow-md">
      <div className="grid grid-cols-1 relative">
        {/* Player Image with Overlay */}
        <div className="relative aspect-[3/2] overflow-hidden">
          <img 
            src={playerImage} 
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>
        </div>
        
        {/* Player Info Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 text-white">
          <div className="flex justify-between items-end mb-2">
            <div>
              <h3 className="font-bold text-2xl mb-1">{name}</h3>
              <div className="flex gap-2">
                <span className="px-2 py-0.5 bg-cricket-green/90 text-xs font-medium rounded-full">{country}</span>
                <span className="px-2 py-0.5 bg-cricket-blue/90 text-xs font-medium rounded-full">{role}</span>
              </div>
            </div>
            
            <Avatar className="w-14 h-14 border-2 border-white">
              <AvatarImage src={playerImage} alt={name} />
              <AvatarFallback className="bg-cricket-blue text-white font-bold">
                {name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
      
      <div className="p-5 bg-white dark:bg-card">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">
          <div className="text-center bg-secondary/30 rounded-lg p-2">
            <p className="text-xs text-muted-foreground uppercase font-medium">Matches</p>
            <p className="font-bold text-lg">{stats.matches}</p>
          </div>
          
          {(isBatsman || isAllrounder) && (
            <>
              <div className="text-center bg-secondary/30 rounded-lg p-2">
                <p className="text-xs text-muted-foreground uppercase font-medium">Runs</p>
                <p className="font-bold text-lg">{stats.runs}</p>
              </div>
              <div className="text-center bg-secondary/30 rounded-lg p-2">
                <p className="text-xs text-muted-foreground uppercase font-medium">Average</p>
                <p className="font-bold text-lg">{stats.average}</p>
              </div>
              <div className="text-center bg-secondary/30 rounded-lg p-2">
                <p className="text-xs text-muted-foreground uppercase font-medium">100s/50s</p>
                <p className="font-bold text-lg">{stats.hundreds}/{stats.fifties}</p>
              </div>
            </>
          )}
          
          {(!isBatsman || isAllrounder) && (
            <>
              <div className="text-center bg-secondary/30 rounded-lg p-2">
                <p className="text-xs text-muted-foreground uppercase font-medium">Wickets</p>
                <p className="font-bold text-lg">{stats.wickets}</p>
              </div>
              <div className="text-center bg-secondary/30 rounded-lg p-2">
                <p className="text-xs text-muted-foreground uppercase font-medium">Economy</p>
                <p className="font-bold text-lg">{stats.economy}</p>
              </div>
              <div className="text-center bg-secondary/30 rounded-lg p-2">
                <p className="text-xs text-muted-foreground uppercase font-medium">Best</p>
                <p className="font-bold text-lg">{stats.best}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default PlayerCard;
