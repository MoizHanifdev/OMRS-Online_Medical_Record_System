'use client';

import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { Search, User, FileText, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
      
      <div className="relative w-full max-w-2xl bg-card border border-border shadow-2xl rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(var(--primary),0.1)]">
        <Command label="Global Command Menu" className="w-full flex flex-col">
          <div className="flex items-center border-b border-border px-4 py-3">
            <Search className="w-5 h-5 text-muted-foreground mr-3" />
            <Command.Input 
              autoFocus
              value={search}
              onValueChange={setSearch}
              placeholder="Search patients, notes, or jump to anywhere..." 
              className="flex-1 bg-transparent outline-none text-foreground text-lg placeholder:text-muted-foreground"
            />
            <kbd className="hidden sm:inline-flex items-center gap-1 rounded bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">ESC</kbd>
          </div>

          <Command.List className="max-h-[60vh] overflow-y-auto p-2">
            <Command.Empty className="py-12 text-center text-muted-foreground">
              No results found for &quot;{search}&quot;
            </Command.Empty>

            <Command.Group heading="Navigation" className="text-xs font-semibold text-muted-foreground px-2 py-1.5">
              <Command.Item 
                onSelect={() => { router.push('/dashboard'); setOpen(false); }}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-foreground cursor-pointer hover:bg-primary/10 hover:text-primary aria-selected:bg-primary/10 aria-selected:text-primary transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"><User className="w-4 h-4" /></div>
                Go to Patients
              </Command.Item>
              <Command.Item 
                onSelect={() => { router.push('/appointments'); setOpen(false); }}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-foreground cursor-pointer hover:bg-primary/10 hover:text-primary aria-selected:bg-primary/10 aria-selected:text-primary transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"><Calendar className="w-4 h-4" /></div>
                Go to Appointments
              </Command.Item>
            </Command.Group>

            {/* Stub for dynamic search results */}
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
