
import React from 'react';

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
    "T20": "bg-cricket-pink",
    "ODI": "bg-cricket-blue",
    "Test": "bg-cricket-green"
  };
  
  return (
    <div className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-white/5 bg-card hover:border-white/10 group">
      <div className={`p-4 bg-gradient-to-r ${formatColors[format]} text-white flex justify-between items-center`}>
        <span className="font-action text-lg tracking-widest uppercase">{format}</span>
        {isLive && (
          <div className="flex items-center bg-white/20 rounded-full px-3 py-1">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></span>
            <span className="font-action uppercase tracking-wider text-sm">LIVE</span>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="mb-6 space-y-6">
          {/* Team 1 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 ${formatBgs[format]} rounded-xl flex items-center justify-center text-white font-headline text-2xl`}>
                {team1.shortName}
              </div>
              <div className="text-left">
                <span className="font-display uppercase tracking-wide text-lg block">{team1.name}</span>
                {team1.score && (
                  <p className="font-headline text-2xl mt-1">
                    {team1.score}/{team1.wickets} 
                    <span className="text-xs font-medium ml-2 opacity-70">({team1.overs} ov)</span>
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div className="text-center font-bold text-xs text-muted-foreground uppercase tracking-widest">
            VERSUS
          </div>
          
          {/* Team 2 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 ${formatBgs[format]}/80 rounded-xl flex items-center justify-center text-white font-headline text-2xl`}>
                {team2.shortName}
              </div>
              <div className="text-left">
                <span className="font-display uppercase tracking-wide text-lg block">{team2.name}</span>
                {team2.score && (
                  <p className="font-headline text-2xl mt-1">
                    {team2.score}/{team2.wickets}
                    <span className="text-xs font-medium ml-2 opacity-70">({team2.overs} ov)</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground truncate max-w-[60%]">{venue}</span>
            <span className={`text-sm font-action tracking-wider uppercase ${isLive ? "text-cricket-green" : "text-muted-foreground"}`}>{status}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMatchCard;
