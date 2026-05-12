'use client';

import { AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';

export function AllergyWarningBanner({ allergens }: { allergens: string[] }) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-red-500/10 border-l-4 border-red-500 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <AlertTriangle className="w-5 h-5 text-red-500 animate-pulse" />
        <div>
          <p className="text-sm text-foreground">
            <span className="font-bold text-red-600 dark:text-red-400">LIFE-THREATENING ALLERGIES:</span> {allergens.join(', ')}
          </p>
        </div>
      </div>
      <button onClick={() => setVisible(false)} className="text-muted-foreground hover:text-foreground">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
