
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

// Updated player images mapping with verified URLs for popular cricketers
const playerImages: Record<string, string> = {
  'Virat Kohli': 'https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/316500/316555.png',
  'Joe Root': 'https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/316600/316661.png',
  'Kane Williamson': 'https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/316500/316580.png',
  'Babar Azam': 'https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/323000/323006.png',
  'Steve Smith': 'https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/316500/316510.png',
  'Jasprit Bumrah': 'https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/316500/316538.png',
  'Pat Cummins': 'https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/316500/316507.png',
  'Ben Stokes': 'https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/316600/316642.png',
  'Rohit Sharma': 'https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/316500/316557.png',
  'Jos Buttler': 'https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/316600/316640.png',
  'Shakib Al Hasan': 'https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/316400/316486.png',
  'Mitchell Starc': 'https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/316500/316512.png',
  'Quinton de Kock': 'https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/316700/316722.png',
  'Trent Boult': 'https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/316500/316579.png',
  'David Warner': 'https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/316500/316508.png',
  'Faf du Plessis': 'https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/316700/316724.png',
  'Rashid Khan': 'https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/316400/316415.png',
  'KL Rahul': 'https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/316500/316539.png',
  'Kagiso Rabada': 'https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/316700/316719.png',
  'Glenn Maxwell': 'https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/316500/316502.png'
};

// Better default images for cricket players (high quality but generic cricket images)
const defaultImages = [
  'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800&q=80', // Cricket bat and ball
  'https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800&q=80', // Cricket stadium
  'https://images.unsplash.com/photo-1484900937517-bed4cfa6e178?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800&q=80'  // Cricket field
];

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  const { name, country, role, stats, imageUrl } = player;
  
  const isAllrounder = role.toLowerCase().includes('all');
  const isBatsman = role.toLowerCase().includes('bat');
  
  // First try to get the image from our verified mapping
  // If not found, use provided imageUrl or fallback to a default cricket image
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
  
  return (
    <Card className="overflow-hidden card-shine hover:shadow-2xl transition-all duration-300 rounded-2xl border-0 shadow-lg group">
      <div className="grid grid-cols-1 relative">
        {/* Player Image with Overlay */}
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={playerImage} 
            alt={`${name} - ${role} from ${country}`}
            className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-700"
            onError={handleImageError}
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
                <p className="font-bold text-2xl">{stats.hundreds || 0}/{stats.fifties || 0}</p>
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
