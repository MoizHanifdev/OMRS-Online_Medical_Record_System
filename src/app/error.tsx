'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home, Mail } from 'lucide-react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full bg-card border border-border rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        <div className="bg-red-500/10 border-b border-red-500/20 p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-red-700">Oops! Something went wrong</h2>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="space-y-2 text-center">
            <p className="text-muted-foreground text-sm">
              We encountered an unexpected error while trying to process your request. Our team has been notified.
            </p>
            {error.digest && (
              <p className="text-xs font-mono text-muted-foreground bg-muted p-2 rounded">
                Error ID: {error.digest}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => reset()}
              className="w-full py-2.5 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <RefreshCw className="w-4 h-4" /> Try Again
            </button>
            <Link 
              href="/dashboard"
              className="w-full py-2.5 bg-card border border-border font-bold rounded-lg hover:bg-muted flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <Home className="w-4 h-4" /> Go to Dashboard
            </Link>
          </div>
        </div>

        <div className="bg-muted/30 p-4 border-t border-border text-center">
          <a href="mailto:support@omrs.health" className="text-xs font-semibold text-primary hover:underline flex items-center justify-center gap-1">
            <Mail className="w-3 h-3" /> Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
