
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
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm p-5 transition-all duration-300 hover:border-white/20 hover:shadow-lg">
      <div className="flex justify-between items-start">
        <h3 className="font-action text-sm uppercase tracking-wider opacity-70">{title}</h3>
        {icon && <div className="text-cricket-green">{icon}</div>}
      </div>
      <div className="mt-4">
        <div className="font-headline text-4xl text-cricket-blue dark:text-cricket-green">{value}</div>
        
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
            <span className="font-medium font-action uppercase tracking-wider text-xs">{trendValue}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatHighlight;
