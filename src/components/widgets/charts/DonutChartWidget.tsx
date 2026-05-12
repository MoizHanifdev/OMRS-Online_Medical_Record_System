'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { BaseWidget } from '../BaseWidget';

interface DonutChartWidgetProps {
  title: string;
  description?: string;
  data: { name: string; value: number; color: string }[];
  className?: string;
  totalLabel?: string;
}

export function DonutChartWidget({ title, description, data, className, totalLabel }: DonutChartWidgetProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <BaseWidget title={title} description={description} className={className}>
      <div className="w-full h-full min-h-[300px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="80%"
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                borderColor: 'hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))'
              }}
              itemStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
          <span className="text-3xl font-bold text-foreground">{total}</span>
          <span className="text-xs text-muted-foreground">{totalLabel || 'Total'}</span>
        </div>
      </div>
    </BaseWidget>
  );
}
