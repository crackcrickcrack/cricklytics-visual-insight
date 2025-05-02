import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PerformanceChartProps {
title: string;
data: Array<{
date: string;
value: number;
opponent?: string;
}>;
dataKey: string;
color: string;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ 
title, 
data, 
dataKey, 
color 
}) => {
// Check if data is valid
const isValidData = Array.isArray(data) && data.length > 0;

return (
<Card>
<CardHeader className="pb-2">
<CardTitle className="text-base font-medium">{title}</CardTitle>
</CardHeader>
<CardContent className="p-0 h-[250px]">
{isValidData ? (
<ResponsiveContainer width="100%" height="100%">
<LineChart
data={data}
margin={{
top: 5,
right: 30,
left: 20,
bottom: 5,
}}
>
<CartesianGrid strokeDasharray="3 3" opacity={0.2} />
<XAxis dataKey="date" />
<YAxis />
<Tooltip 
contentStyle={{
backgroundColor: 'rgba(255, 255, 255, 0.9)',
borderRadius: '0.5rem',
border: '1px solid #e2e8f0',
boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
}}
formatter={(value, name, props) => {
const opponent = props.payload.opponent;
return [`${value} runs${opponent ? ` (${opponent})` : ''}`, name];
}}
/>
<Legend />
<Line
type="monotone"
dataKey={dataKey}
stroke={color}
activeDot={{ r: 8 }}
strokeWidth={2}
/>
</LineChart>
</ResponsiveContainer>
) : (
<div className="h-full flex items-center justify-center">
<p className="text-muted-foreground">No data available</p>
</div>
)}
</CardContent>
</Card>
);
};

export default PerformanceChart;
