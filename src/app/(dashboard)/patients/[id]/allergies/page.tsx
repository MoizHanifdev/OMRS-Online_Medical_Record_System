'use client';

import { useState } from 'react';
import { Plus, Search, MoreVertical, AlertTriangle, ShieldAlert } from 'lucide-react';
import { BaseWidget } from '@/components/widgets/BaseWidget';

export default function AllergiesTab() {
  const [activeFilter, setActiveFilter] = useState('All');

  const allergies = [
    { id: 1, allergen: 'Penicillin', type: 'Drug', severity: 'Life-Threatening', reactions: ['Anaphylaxis'], date: 'Verified Jan 2025', doctor: 'Dr. Sarah Smith' },
    { id: 2, allergen: 'Shellfish', type: 'Food', severity: 'Life-Threatening', reactions: ['Throat Swelling', 'Hives'], date: 'Verified Mar 2023', doctor: 'Dr. John Doe' },
    { id: 3, allergen: 'Latex', type: 'Latex', severity: 'Moderate', reactions: ['Contact Dermatitis'], date: 'Unverified', doctor: 'Self-Reported' },
    { id: 4, allergen: 'Pollen', type: 'Environmental', severity: 'Mild', reactions: ['Sneezing', 'Watery Eyes'], date: 'Unverified', doctor: 'Self-Reported' },
  ];

  const filteredAllergies = activeFilter === 'All' 
    ? allergies 
    : allergies.filter(a => a.type === activeFilter);

  const getSeverityStyles = (severity: string) => {
    switch(severity) {
      case 'Life-Threatening': return 'border-red-500 bg-red-500/10 text-red-700 shadow-[0_0_15px_rgba(239,68,68,0.2)]';
      case 'Severe': return 'border-orange-500 bg-orange-500/10 text-orange-700';
      case 'Moderate': return 'border-amber-500 bg-amber-500/10 text-amber-700';
      case 'Mild': return 'border-green-500 bg-green-500/10 text-green-700';
      default: return 'border-border bg-muted text-muted-foreground';
    }
  };

  const hasLifeThreatening = allergies.some(a => a.severity === 'Life-Threatening');

  return (
    <div className="space-y-6">
      {/* Life-Threatening Banner */}
      {hasLifeThreatening && (
        <div className="bg-gradient-to-r from-red-500/20 to-red-500/5 border-l-4 border-red-500 rounded-r-xl p-4 flex items-center gap-3">
          <ShieldAlert className="w-6 h-6 text-red-500 animate-pulse" />
          <div>
            <h3 className="font-bold text-red-600 dark:text-red-400">Life-Threatening Allergies Present</h3>
            <p className="text-sm text-foreground">Extreme caution required when prescribing or administering: <span className="font-bold">Penicillin, Shellfish</span></p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Allergies & Adverse Reactions</h2>
          <p className="text-muted-foreground">4 total, 2 life-threatening</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-border bg-card rounded-lg text-sm font-medium hover:bg-muted flex items-center gap-2">
            Print Allergy Card
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Record Allergy
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-3 rounded-2xl border border-border shadow-sm">
        <div className="flex overflow-x-auto scrollbar-hide gap-2 w-full md:w-auto pb-2 md:pb-0">
          {['All', 'Drug', 'Food', 'Environmental', 'Latex', 'Insect'].map(filter => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeFilter === filter 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="w-full md:w-64 relative shrink-0">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
          <input type="text" placeholder="Search allergies..." className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-transparent focus:border-primary rounded-xl text-sm outline-none transition-all" />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-8">
          {/* Groups */}
          {['Life-Threatening', 'Moderate', 'Mild'].map(severity => {
            const groupAllergies = filteredAllergies.filter(a => a.severity === severity);
            if (groupAllergies.length === 0) return null;

            return (
              <div key={severity} className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  {severity} <span className="bg-muted px-2 py-0.5 rounded-full">{groupAllergies.length}</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {groupAllergies.map(allergy => (
                    <div key={allergy.id} className={`bg-card rounded-2xl p-5 border-l-4 shadow-sm hover:shadow-md transition-all group ${getSeverityStyles(allergy.severity).split(' ')[0]} ${allergy.severity === 'Life-Threatening' ? 'border border-red-500/30 ring-1 ring-red-500/10' : 'border border-border'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          {allergy.severity === 'Life-Threatening' && <AlertTriangle className="w-4 h-4 text-red-500" />}
                          <h3 className="font-bold text-foreground text-lg">{allergy.allergen}</h3>
                        </div>
                        {allergy.date.startsWith('Verified') && (
                          <div className="bg-green-500/10 text-green-600 text-[10px] font-bold uppercase px-2 py-1 rounded flex items-center gap-1">✓ Verified</div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-muted text-muted-foreground px-2 py-0.5 rounded">{allergy.type}</span>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${getSeverityStyles(allergy.severity)}`}>
                          {allergy.severity}
                        </span>
                      </div>

                      <div className="mb-4">
                        <p className="text-xs text-muted-foreground font-semibold mb-1">Reactions:</p>
                        <div className="flex flex-wrap gap-1">
                          {allergy.reactions.map(r => (
                            <span key={r} className="text-xs bg-background border border-border px-2 py-1 rounded-md text-foreground">{r}</span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between border-t border-border pt-4 mt-auto">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-muted-foreground">{allergy.date}</span>
                          <span className="text-xs font-medium text-foreground">{allergy.doctor}</span>
                        </div>
                        <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Sidebar: Cross Reactivity Panel */}
        <div className="lg:col-span-1">
          <BaseWidget title="Drug Cross-Reactivity" className="sticky top-24">
            <div className="mt-4 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
              <h4 className="text-sm font-bold text-orange-700 flex items-center gap-2 mb-2"><AlertTriangle className="w-4 h-4" /> Avoid Prescribing</h4>
              <p className="text-xs text-orange-600/80 mb-3">Based on active allergies, the following drug classes carry significant risk of adverse reactions:</p>
              
              <ul className="space-y-3">
                <li className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-foreground">Cephalosporins</span>
                  <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded border border-border w-fit">Moderate Risk (Cross-reacts with Penicillin)</span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-foreground">Carbapenems</span>
                  <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded border border-border w-fit">Low Risk (Cross-reacts with Penicillin)</span>
                </li>
              </ul>
            </div>
            
            <button className="w-full mt-4 px-4 py-2 border border-border bg-background rounded-lg text-sm font-medium hover:bg-muted transition-colors text-center">
              Run Interaction Check
            </button>
          </BaseWidget>
        </div>
      </div>
    </div>
  );
}
