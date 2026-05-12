'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const tabs = [
  { id: '', label: 'Overview' },
  { id: 'problems', label: 'Problems' },
  { id: 'allergies', label: 'Allergies', badge: '2' },
  { id: 'vitals', label: 'Vitals' },
  { id: 'medications', label: 'Medications' },
  { id: 'labs', label: 'Labs' },
  { id: 'radiology', label: 'Radiology' },
  { id: 'notes', label: 'Notes', badge: '3' },
  { id: 'history', label: 'History' },
  { id: 'care-plans', label: 'Care Plans' },
  { id: 'documents', label: 'Documents' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'insurance', label: 'Insurance' },
];

export function PatientTabBar({ patientId }: { patientId: string }) {
  const pathname = usePathname();
  
  // Extract current tab from pathname
  // e.g., /patients/1/timeline -> 'timeline'
  const segments = pathname.split('/');
  const currentTab = segments[segments.length - 1] === patientId ? '' : segments[segments.length - 1];

  return (
    <div className="border-b border-border sticky top-16 z-20 bg-background/80 backdrop-blur-xl -mx-4 px-4 sm:mx-0 sm:px-0">
      <div className="flex overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          const href = `/patients/${patientId}${tab.id ? `/${tab.id}` : ''}`;
          
          return (
            <Link
              key={tab.id}
              href={href}
              className={`relative flex items-center px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
              {tab.badge && (
                <span className={`ml-2 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  {tab.badge}
                </span>
              )}
              {isActive && (
                <motion.div
                  layoutId="patient-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
