
import React from 'react';
import { Card } from '@/components/ui/card';

interface Team {
  name: string;
  shortName: string;
  score?: string;
  wickets?: number;
  overs?: number;
}

interface LiveMatchCardProps {
  match: {
    id: string;
    teams: [Team, Team];
    format: 'T20' | 'ODI' | 'Test';
    venue: string;
    status: string;
    isLive: boolean;
  };
}

const LiveMatchCard: React.FC<LiveMatchCardProps> = ({ match }) => {
  const { teams, format, venue, status, isLive } = match;
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-1 bg-cricket-blue text-white text-xs flex justify-between items-center">
        <span className="font-medium">{format}</span>
        {isLive && (
          <div className="flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse-slow mr-1"></span>
            <span>LIVE</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
              {teams[0].shortName.substring(0, 2)}
            </div>
            <span className="font-semibold">{teams[0].name}</span>
          </div>
          <div className="text-right">
            {teams[0].score && (
              <span className="font-bold">
                {teams[0].score}/{teams[0].wickets} 
                <span className="text-sm font-normal ml-1">({teams[0].overs})</span>
              </span>
            )}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
              {teams[1].shortName.substring(0, 2)}
            </div>
            <span className="font-semibold">{teams[1].name}</span>
          </div>
          <div className="text-right">
            {teams[1].score && (
              <span className="font-bold">
                {teams[1].score}/{teams[1].wickets} 
                <span className="text-sm font-normal ml-1">({teams[1].overs})</span>
              </span>
            )}
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t text-sm text-muted-foreground">
          <div className="flex justify-between">
            <span>{venue}</span>
            <span className={isLive ? "text-cricket-green font-medium" : ""}>{status}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LiveMatchCard;
