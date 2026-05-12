'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BaseWidget } from '../BaseWidget';

interface LineChartWidgetProps {
  title: string;
  description?: string;
  data: any[];
  lines: { dataKey: string; color: string; name: string }[];
  xAxisKey: string;
  className?: string;
}

export function LineChartWidget({ title, description, data, lines, xAxisKey, className }: LineChartWidgetProps) {
  return (
    <BaseWidget title={title} description={description} className={className}>
      <div className="w-full h-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis 
              dataKey={xAxisKey} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                borderColor: 'hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                color: 'hsl(var(--foreground))'
              }}
              itemStyle={{ color: 'hsl(var(--foreground))' }}
            />
            {lines.map((line, i) => (
              <Line 
                key={i}
                type="monotone" 
                dataKey={line.dataKey} 
                name={line.name}
                stroke={line.color} 
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2, fill: 'hsl(var(--background))' }}
                activeDot={{ r: 6, strokeWidth: 0, fill: line.color }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </BaseWidget>
  );
}
