
import React from 'react';
import { BarChart, TrendingUp, Target } from 'lucide-react';

interface InsightCardProps {
  title: string;
  content: string;
  category: 'batting' | 'bowling' | 'prediction';
  timestamp: string;
}

const InsightCard: React.FC<InsightCardProps> = ({ title, content, category, timestamp }) => {
  const getIcon = () => {
    switch (category) {
      case 'batting':
        return <BarChart size={18} className="text-cricket-blue" />;
      case 'bowling':
        return <TrendingUp size={18} className="text-cricket-green" />;
      case 'prediction':
        return <Target size={18} className="text-cricket-purple" />;
      default:
        return <BarChart size={18} className="text-cricket-blue" />;
    }
  };

  const getBgColor = () => {
    switch (category) {
      case 'batting':
        return 'border-l-4 border-l-cricket-blue';
      case 'bowling':
        return 'border-l-4 border-l-cricket-green';
      case 'prediction':
        return 'border-l-4 border-l-cricket-purple';
      default:
        return 'border-l-4 border-l-cricket-blue';
    }
  };

  return (
    <div className={`data-card ${getBgColor()}`}>
      <div className="flex items-start">
        <div className="p-2 rounded-md bg-gray-50">
          {getIcon()}
        </div>
        <div className="ml-3 flex-1">
          <h3 className="font-medium text-base">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{content}</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-gray-500">{timestamp}</span>
            <button className="text-cricket-navy hover:text-cricket-blue text-xs font-medium transition-colors">Read More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightCard;
