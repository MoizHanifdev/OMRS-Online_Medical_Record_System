import Link from 'next/link';
import { Home, Search, FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
            <FileQuestion className="w-12 h-12 text-primary" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-foreground">404</h1>
          <h2 className="text-xl font-bold text-muted-foreground">Page Not Found</h2>
          <p className="text-muted-foreground mt-2">
            The page you&apos;re looking for doesn&apos;t exist, has been moved, or you might not have permission to view it.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link 
            href="/dashboard"
            className="py-2.5 px-6 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <Home className="w-4 h-4" /> Go to Dashboard
          </Link>
          <button 
            className="py-2.5 px-6 bg-card border border-border text-foreground font-bold rounded-lg hover:bg-muted flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <Search className="w-4 h-4" /> Global Search
          </button>
        </div>
      </div>
    </div>
  );
}
