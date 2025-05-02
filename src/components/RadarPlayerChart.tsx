
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts';

interface PlayerSkillProps {
  player: {
    name: string;
    skills: Array<{
      name: string;
      value: number;
    }>;
    color: string;
  };
  secondPlayer?: {
    name: string;
    skills: Array<{
      name: string;
      value: number;
    }>;
    color: string;
  };
  title?: string;
}

const RadarPlayerChart: React.FC<PlayerSkillProps> = ({ 
  player, 
  secondPlayer,
  title = "Player Skills" 
}) => {
  // Merge the skills data from both players if secondPlayer exists
  const data = player.skills.map((skill, index) => {
    const obj: Record<string, any> = {
      subject: skill.name,
      [player.name]: skill.value,
      fullMark: 100,
    };
    
    if (secondPlayer && secondPlayer.skills[index]) {
      obj[secondPlayer.name] = secondPlayer.skills[index].value;
    }
    
    return obj;
  });

  return (
    <Card className="w-full h-[350px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#64748b' }} />
            <Radar
              name={player.name}
              dataKey={player.name}
              stroke={player.color}
              fill={player.color}
              fillOpacity={0.5}
            />
            {secondPlayer && (
              <Radar
                name={secondPlayer.name}
                dataKey={secondPlayer.name}
                stroke={secondPlayer.color}
                fill={secondPlayer.color}
                fillOpacity={0.5}
              />
            )}
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '0.5rem',
                border: '1px solid #e2e8f0',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RadarPlayerChart;
