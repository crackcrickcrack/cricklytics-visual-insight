
import React from 'react';

interface StatHighlightProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

const StatHighlight: React.FC<StatHighlightProps> = ({ title, value, icon, trend, trendValue }) => {
  return (
    <div className="cricket-card p-5">
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">{title}</h3>
        {icon && <div className="text-cricket-green">{icon}</div>}
      </div>
      <div className="mt-3">
        <div className="stat-value font-extrabold">{value}</div>
        
        {(trend && trendValue) && (
          <div className={`flex items-center mt-2 text-sm ${
            trend === 'up' 
              ? 'text-cricket-green' 
              : trend === 'down' 
                ? 'text-cricket-pink' 
                : 'text-cricket-yellow'
          }`}>
            {trend === 'up' ? (
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
              </svg>
            ) : trend === 'down' ? (
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            ) : (
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14" />
              </svg>
            )}
            <span className="font-medium">{trendValue}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatHighlight;
