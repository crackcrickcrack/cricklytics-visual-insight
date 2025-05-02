
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
    "T20": "bg-cricket-orange",
    "ODI": "bg-cricket-blue",
    "Test": "bg-cricket-green"
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 rounded-xl border-0 shadow-md">
      <div className={`p-2 ${formatColors[format]} text-white flex justify-between items-center`}>
        <span className="font-bold">{format}</span>
        {isLive && (
          <div className="flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse-slow mr-1"></span>
            <span className="font-medium">LIVE</span>
          </div>
        )}
      </div>
      
      <div className="p-5 bg-gradient-to-br from-white to-secondary/20 dark:from-card dark:to-secondary/10">
        <div className="mb-6 border-b border-dashed border-muted pb-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full ${formatColors[format]} flex items-center justify-center text-white font-bold`}>
                {team1.shortName.substring(0, 2)}
              </div>
              <div>
                <span className="font-semibold text-lg">{team1.name}</span>
                {team1.score && (
                  <p className="font-bold text-sm">
                    {team1.score}/{team1.wickets} 
                    <span className="text-xs font-normal ml-1">({team1.overs} ov)</span>
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full ${formatColors[format]}/80 flex items-center justify-center text-white font-bold`}>
                {team2.shortName.substring(0, 2)}
              </div>
              <div>
                <span className="font-semibold text-lg">{team2.name}</span>
                {team2.score && (
                  <p className="font-bold text-sm">
                    {team2.score}/{team2.wickets} 
                    <span className="text-xs font-normal ml-1">({team2.overs} ov)</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground">
          <div className="flex justify-between">
            <span className="truncate max-w-[60%]">{venue}</span>
            <span className={isLive ? "text-cricket-green font-medium" : ""}>{status}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LiveMatchCard;
