
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface InsightCardProps {
  title: string;
  content: string;
  category: 'batting' | 'bowling' | 'team' | 'prediction';
  timestamp: string;
}

const InsightCard: React.FC<InsightCardProps> = ({ 
  title, content, category, timestamp 
}) => {
  const getCategoryColor = () => {
    switch (category) {
      case 'batting': return 'text-cricket-yellow bg-cricket-yellow/10';
      case 'bowling': return 'text-cricket-green bg-cricket-green/10';
      case 'team': return 'text-cricket-blue bg-cricket-blue/10';
      case 'prediction': return 'text-cricket-purple bg-cricket-purple/10';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const getCategoryIcon = () => {
    switch (category) {
      case 'batting':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5z" />
          </svg>
        );
      case 'bowling':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v8m-4-4h8" />
          </svg>
        );
      case 'team':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'prediction':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 card-shine">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-lg">{title}</h3>
          <div className={`flex items-center justify-center p-2 rounded-full ${getCategoryColor()}`}>
            {getCategoryIcon()}
          </div>
        </div>
        
        <p className="text-base text-muted-foreground mb-4">{content}</p>
        
        <div className="flex justify-between items-center text-sm text-muted-foreground mt-4 pt-4 border-t border-border">
          <span className="capitalize px-3 py-1 rounded-full bg-muted">{category}</span>
          <span>{timestamp}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightCard;
