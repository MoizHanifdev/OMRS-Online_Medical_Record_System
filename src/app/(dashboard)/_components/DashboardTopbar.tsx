'use client';

import { Menu, Search } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { NotificationBell } from './NotificationBell';
import { ThemeToggle } from '@/components/ThemeToggle';
import Link from 'next/link';

export function DashboardTopbar({ user }: { user: any }) {
  const pathname = usePathname();
  
  // Basic Breadcrumb generation
  const segments = pathname.split('/').filter(Boolean);

  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-xl sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 shadow-sm">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Trigger (Stub) */}
        <button className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground">
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumbs */}
        <nav className="hidden sm:flex items-center text-sm font-medium text-muted-foreground">
          <Link href="/dashboard" className="hover:text-foreground transition-colors">Home</Link>
          {segments.map((segment, idx) => {
            if (segment === 'dashboard') return null; // skip root
            const isLast = idx === segments.length - 1;
            const title = segment.charAt(0).toUpperCase() + segment.slice(1);
            return (
              <div key={segment} className="flex items-center">
                <span className="mx-2 opacity-50">/</span>
                <span className={isLast ? "text-foreground font-semibold" : ""}>{title}</span>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Global Search Trigger */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <button 
          onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
          className="w-full flex items-center gap-2 px-4 py-2 bg-muted/50 border border-border hover:bg-muted rounded-full text-sm text-muted-foreground transition-colors group"
        >
          <Search className="w-4 h-4 group-hover:text-foreground transition-colors" />
          <span className="flex-1 text-left">Search anything...</span>
          <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <NotificationBell />
        <ThemeToggle />
        
        {/* User Menu Trigger */}
        <button className="flex items-center gap-2 pl-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={`https://i.pravatar.cc/150?u=${user.id}`} 
            alt={user.name} 
            className="w-8 h-8 rounded-full border border-border bg-muted" 
          />
        </button>
      </div>
    </header>
  );
}
