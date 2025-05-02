
import React from 'react';
import { Card } from '@/components/ui/card';

interface Team {
  name: string;
  shortName: string;
  score?: string;
  wickets?: number;
  overs?: number;
}

export interface LiveMatchCardProps {
  match: {
    id: string;
    teams: Team[];  
    format: "T20" | "ODI" | "Test";
    venue: string;
    status: string;
    isLive: boolean;
  };
}

const LiveMatchCard: React.FC<LiveMatchCardProps> = ({ match }) => {
  const { teams, format, venue, status, isLive } = match;
  
  // Ensure we have access to both teams safely
  const team1 = teams[0] || { name: '', shortName: '' };
  const team2 = teams[1] || { name: '', shortName: '' };

  // Format-specific colors
  const formatColors = {
    "T20": "from-cricket-pink to-cricket-purple",
    "ODI": "from-cricket-blue to-cricket-green",
    "Test": "from-cricket-green to-cricket-blue"
  };

  // Format-specific backgrounds
  const formatBgs = {
    "T20": "bg-cricket-purple",
    "ODI": "bg-cricket-blue",
    "Test": "bg-cricket-green"
  };
  
  return (
    <Card className="overflow-hidden card-shine group hover:shadow-2xl transition-all duration-300 rounded-2xl border-0 shadow-lg">
      <div className={`p-3 bg-gradient-to-r ${formatColors[format]} text-white flex justify-between items-center`}>
        <span className="font-extrabold tracking-wider uppercase">{format}</span>
        {isLive && (
          <div className="flex items-center bg-white/20 rounded-full px-2 py-0.5">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-1"></span>
            <span className="font-semibold text-sm uppercase tracking-wide">LIVE</span>
          </div>
        )}
      </div>
      
      <div className="bg-white dark:bg-card p-5">
        <div className="mb-6 space-y-5">
          {/* Team 1 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 ${formatBgs[format]} rounded-xl flex items-center justify-center text-white font-bold`}>
                {team1.shortName}
              </div>
              <div className="text-left">
                <span className="font-bold text-lg">{team1.name}</span>
                {team1.score && (
                  <p className="font-extrabold text-xl mt-0.5">
                    {team1.score}/{team1.wickets} 
                    <span className="text-xs font-normal ml-1">({team1.overs} ov)</span>
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div className="text-center font-bold text-sm text-muted-foreground">
            VS
          </div>
          
          {/* Team 2 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 ${formatBgs[format]}/80 rounded-xl flex items-center justify-center text-white font-bold`}>
                {team2.shortName}
              </div>
              <div className="text-left">
                <span className="font-bold text-lg">{team2.name}</span>
                {team2.score && (
                  <p className="font-extrabold text-xl mt-0.5">
                    {team2.score}/{team2.wickets} 
                    <span className="text-xs font-normal ml-1">({team2.overs} ov)</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground truncate max-w-[60%]">{venue}</span>
            <span className={`text-sm font-bold ${isLive ? "text-cricket-green" : "text-muted-foreground"}`}>{status}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LiveMatchCard;
