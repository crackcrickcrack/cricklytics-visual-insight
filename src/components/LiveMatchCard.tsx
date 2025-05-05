
import React from 'react';
import { Clock } from 'lucide-react';

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
    teams: Team[];
    format: 'T20' | 'ODI' | 'Test';
    venue: string;
    status: string;
    isLive: boolean;
  };
}

const getFormatColor = (format: 'T20' | 'ODI' | 'Test') => {
  switch (format) {
    case 'T20':
      return 'bg-cricket-purple text-white';
    case 'ODI':
      return 'bg-cricket-blue text-white';
    case 'Test':
      return 'bg-cricket-navy text-white';
    default:
      return 'bg-cricket-green text-white';
  }
};

const LiveMatchCard: React.FC<LiveMatchCardProps> = ({ match }) => {
  const { teams, format, venue, status, isLive } = match;

  return (
    <div className="data-card overflow-hidden">
      {/* Header with format and status */}
      <div className="flex justify-between items-center mb-4">
        <span className={`format-badge ${getFormatColor(format)}`}>{format}</span>
        {isLive ? (
          <div className="flex items-center">
            <span className="flex h-2 w-2 rounded-full bg-red-500 mr-1 animate-pulse"></span>
            <span className="text-xs font-medium text-red-500">LIVE</span>
          </div>
        ) : (
          <div className="flex items-center text-gray-500">
            <Clock size={12} className="mr-1" />
            <span className="text-xs">Completed</span>
          </div>
        )}
      </div>
      
      {/* Teams */}
      <div className="space-y-4">
        {teams.map((team, index) => (
          <div key={team.shortName} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold">
                {team.shortName}
              </div>
              <span className="ml-2 font-medium">{team.name}</span>
            </div>
            {team.score && (
              <div className="text-right">
                <div className="font-display text-lg">{team.score}/{team.wickets}</div>
                {team.overs && <div className="text-xs text-gray-500">{team.overs} overs</div>}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Venue and status */}
      <div className="mt-4 pt-4 border-t">
        <p className="text-xs text-gray-500">{venue}</p>
        <p className="text-sm font-medium mt-1">{status}</p>
      </div>
    </div>
  );
};

export default LiveMatchCard;
