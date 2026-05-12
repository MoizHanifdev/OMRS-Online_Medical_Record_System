'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { NAV_BY_ROLE, Role } from '@/lib/dashboard/nav';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export function DashboardSidebar({ role, userId }: { role: Role; userId: string }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const navItems = NAV_BY_ROLE[role];

  useEffect(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    if (saved === 'true') setCollapsed(true);
  }, []);

  const toggleCollapse = () => {
    const val = !collapsed;
    setCollapsed(val);
    localStorage.setItem('sidebar-collapsed', String(val));
  };

  return (
    <div 
      className={cn(
        "hidden lg:flex flex-col border-r border-border bg-card transition-all duration-300 relative z-20 shadow-sm",
        collapsed ? "w-[72px]" : "w-[280px]"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-border shrink-0">
        <Link href="/dashboard" className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold shrink-0">
            O
          </div>
          {!collapsed && (
            <span className="font-bold text-xl tracking-tight text-foreground whitespace-nowrap">
              OMRS
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link 
              key={item.href} 
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors group",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-nav-pill"
                  className="absolute inset-0 bg-primary/10 rounded-xl"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className="w-5 h-5 shrink-0 z-10" />
              {!collapsed && (
                <span className="truncate z-10 flex-1">{item.label}</span>
              )}
              {!collapsed && item.badge && (
                <span className="z-10 bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {item.badge === 'count' ? '3' : ''}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-border flex justify-end">
        <button 
          onClick={toggleCollapse}
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
