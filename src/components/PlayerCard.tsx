
import React from 'react';
import { Card } from '@/components/ui/card';

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

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  const { name, country, role, stats, imageUrl } = player;
  
  const isAllrounder = role.toLowerCase().includes('all');
  const isBatsman = role.toLowerCase().includes('bat');
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 bg-cricket-blue">
          <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-cricket-blue to-cricket-green p-2">
            <div className="w-full h-full rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
              {imageUrl ? (
                <img 
                  src={imageUrl} 
                  alt={name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-3xl font-bold text-white">
                  {name.charAt(0)}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="p-4 md:w-2/3">
          <h3 className="font-bold text-lg mb-1">{name}</h3>
          <div className="flex gap-2 mb-3">
            <span className="px-2 py-1 bg-secondary text-xs rounded-full">{country}</span>
            <span className="px-2 py-1 bg-secondary text-xs rounded-full">{role}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
            <div>
              <p className="text-sm text-muted-foreground">Matches</p>
              <p className="font-semibold">{stats.matches}</p>
            </div>
            
            {(isBatsman || isAllrounder) && (
              <>
                <div>
                  <p className="text-sm text-muted-foreground">Runs</p>
                  <p className="font-semibold">{stats.runs}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Average</p>
                  <p className="font-semibold">{stats.average}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">100s/50s</p>
                  <p className="font-semibold">{stats.hundreds}/{stats.fifties}</p>
                </div>
              </>
            )}
            
            {(!isBatsman || isAllrounder) && (
              <>
                <div>
                  <p className="text-sm text-muted-foreground">Wickets</p>
                  <p className="font-semibold">{stats.wickets}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Economy</p>
                  <p className="font-semibold">{stats.economy}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Best</p>
                  <p className="font-semibold">{stats.best}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PlayerCard;
