'use client';

import React from 'react';
import CountUp from 'react-countup';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface StatCardProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
    text: string;
  };
  color?: 'primary' | 'blue' | 'green' | 'amber' | 'red';
  isLoading?: boolean;
}

const colorMap = {
  primary: 'bg-primary/10 text-primary',
  blue: 'bg-blue-500/10 text-blue-500',
  green: 'bg-green-500/10 text-green-500',
  amber: 'bg-amber-500/10 text-amber-500',
  red: 'bg-red-500/10 text-red-500',
};

export function StatCard({ label, value, prefix = '', suffix = '', icon, trend, color = 'primary', isLoading }: StatCardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 flex flex-col shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", colorMap[color])}>
          {icon}
        </div>
        {trend && (
          <div className={cn("flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full", trend.isPositive ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600')}>
            {trend.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {trend.value}%
          </div>
        )}
      </div>
      
      <div className="mt-auto">
        <h3 className="text-3xl font-bold tracking-tight text-foreground flex items-baseline gap-1">
          {prefix}
          {isLoading ? (
            <span className="w-16 h-8 bg-muted rounded animate-pulse inline-block" />
          ) : (
            <CountUp end={value} duration={1.5} separator="," useEasing />
          )}
          {suffix}
        </h3>
        <p className="text-sm font-medium text-muted-foreground mt-1">{label}</p>
        
        {trend && (
          <p className="text-xs text-muted-foreground mt-2">
            vs. {trend.text}
          </p>
        )}
      </div>
    </div>
  );
}
