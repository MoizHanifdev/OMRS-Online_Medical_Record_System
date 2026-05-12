import React from 'react';
import { MoreHorizontal, Maximize2, RefreshCw, Download } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface BaseWidgetProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  onRefresh?: () => void;
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  actionMenu?: React.ReactNode;
  headerRight?: React.ReactNode;
}

export function BaseWidget({
  title, description, children, className, onRefresh, isLoading, isError, isEmpty, actionMenu, headerRight
}: BaseWidgetProps) {
  return (
    <div className={cn("bg-card border border-border rounded-2xl shadow-sm flex flex-col overflow-hidden", className)}>
      <div className="px-5 py-4 border-b border-border flex justify-between items-start bg-muted/10">
        <div>
          <h3 className="font-semibold text-foreground tracking-tight">{title}</h3>
          {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
        </div>
        <div className="flex items-center gap-2">
          {headerRight}
          {onRefresh && (
            <button onClick={onRefresh} className="p-1 text-muted-foreground hover:text-foreground rounded">
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
          {actionMenu}
        </div>
      </div>
      
      <div className="flex-1 p-5 relative overflow-hidden flex flex-col">
        {isLoading ? (
          <div className="absolute inset-0 bg-card/50 backdrop-blur-sm z-10 flex items-center justify-center">
            <RefreshCw className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : isError ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-3">!</div>
            <p className="text-sm font-medium text-foreground">Failed to load data</p>
            {onRefresh && <button onClick={onRefresh} className="text-xs text-primary mt-2">Try again</button>}
          </div>
        ) : isEmpty ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-4 text-muted-foreground">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-3">∅</div>
            <p className="text-sm">No data available</p>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
