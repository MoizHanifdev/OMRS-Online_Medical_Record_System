'use client';

import { NAV_BY_ROLE, Role } from '@/lib/dashboard/nav';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';

export function MobileBottomNav({ role }: { role: Role }) {
  const pathname = usePathname();
  const navItems = NAV_BY_ROLE[role].slice(0, 5); // Take top 5 for mobile

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-card border-t border-border flex items-center justify-around px-2 pb-safe z-40">
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
        const Icon = item.icon;
        
        return (
          <Link 
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors relative",
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {isActive && (
              <div className="absolute top-0 w-8 h-1 bg-primary rounded-b-full" />
            )}
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-medium truncate w-full text-center px-1">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
