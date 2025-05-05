
import React from 'react';
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

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  const { name, country, role, stats, imageUrl } = player;

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

  return (
    <div className="rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group transform hover:-translate-y-2 bg-gradient-to-br from-cricket-dark via-cricket-dark to-cricket-dark/80">
      <div className="relative">
        {/* Player Image with Overlay */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <img 
            src={playerImage} 
            alt={`${name} - ${role} from ${country}`}
            className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-700"
            onError={handleImageError}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cricket-dark via-cricket-dark/60 to-transparent opacity-90"></div>

          {/* Player role and country badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className={`format-badge ${getRoleColor()} text-white`}>{role}</span>
            <span className="format-badge bg-cricket-yellow text-cricket-dark">{country}</span>
          </div>

          {/* Player Name Badge */}
          <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
            <div className="flex flex-col items-start">
              <h3 className="font-headline text-4xl text-white uppercase tracking-tight">{name.split(' ')[0]}</h3>
              {name.split(' ').length > 1 && (
                <h3 className="font-headline text-4xl text-cricket-blue uppercase tracking-tight">
                  {name.split(' ').slice(1).join(' ')}
                </h3>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 bg-gradient-to-b from-cricket-dark/50 to-cricket-dark text-white">
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center glass-panel p-3 rounded-xl">
            <p className="font-action text-xs uppercase tracking-widest opacity-70">Matches</p>
            <p className="font-headline text-2xl">{stats.matches}</p>
          </div>

          {(isBatsman || isAllrounder) && (
            <>
              <div className="text-center glass-panel p-3 rounded-xl">
                <p className="font-action text-xs uppercase tracking-widest opacity-70">Runs</p>
                <p className="font-headline text-2xl text-cricket-blue">{stats.runs}</p>
              </div>
              <div className="text-center glass-panel p-3 rounded-xl">
                <p className="font-action text-xs uppercase tracking-widest opacity-70">Average</p>
                <p className="font-headline text-2xl text-cricket-green">{stats.average}</p>
              </div>
              <div className="text-center glass-panel p-3 rounded-xl col-span-3">
                <p className="font-action text-xs uppercase tracking-widest opacity-70">100s/50s</p>
                <p className="font-headline text-2xl">
                  <span className="text-cricket-yellow">{stats.hundreds || 0}</span> / <span className="text-cricket-pink">{stats.fifties || 0}</span>
                </p>
              </div>
            </>
          )}

          {(!isBatsman || isAllrounder) && (
            <>
              <div className="text-center glass-panel p-3 rounded-xl">
                <p className="font-action text-xs uppercase tracking-widest opacity-70">Wickets</p>
                <p className="font-headline text-2xl text-cricket-pink">{stats.wickets}</p>
              </div>
              <div className="text-center glass-panel p-3 rounded-xl">
                <p className="font-action text-xs uppercase tracking-widest opacity-70">Economy</p>
                <p className="font-headline text-2xl text-cricket-yellow">{stats.economy}</p>
              </div>
              <div className="text-center glass-panel p-3 rounded-xl col-span-3">
                <p className="font-action text-xs uppercase tracking-widest opacity-70">Best</p>
                <p className="font-headline text-2xl text-cricket-green">{stats.best}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
