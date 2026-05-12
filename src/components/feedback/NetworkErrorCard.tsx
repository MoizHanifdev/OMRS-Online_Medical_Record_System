'use client';

import { WifiOff, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';

export function NetworkErrorCard({ onRetry }: { onRetry?: () => void }) {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    if (onRetry) onRetry();
    setTimeout(() => setIsRetrying(false), 1000);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col items-center justify-center text-center space-y-4 py-12">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
        <WifiOff className="w-8 h-8 text-muted-foreground" />
      </div>
      <div>
        <h3 className="font-bold text-lg mb-1">Network Connection Lost</h3>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
          We couldn&apos;t reach the server. Please check your internet connection and try again.
        </p>
      </div>
      <button 
        onClick={handleRetry}
        disabled={isRetrying}
        className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2 disabled:opacity-70"
      >
        <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} /> 
        {isRetrying ? 'Retrying...' : 'Retry Connection'}
      </button>
    </div>
  );
}
