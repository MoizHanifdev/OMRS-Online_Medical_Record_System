'use client';

import { useState } from 'react';
import { Plus, Search, MoreVertical, AlertCircle, FileText, Activity } from 'lucide-react';
import { BaseWidget } from '@/components/widgets/BaseWidget';

export default function ProblemsTab() {
  const [activeFilter, setActiveFilter] = useState('All');

  const problems = [
    { id: 1, icd: 'E11.9', title: 'Type 2 diabetes mellitus without complications', status: 'Active', severity: 'Severe', date: 'Jan 15, 2025', doctor: 'Dr. Sarah Smith' },
    { id: 2, icd: 'I10', title: 'Essential (primary) hypertension', status: 'Chronic', severity: 'Moderate', date: 'Mar 10, 2024', doctor: 'Dr. John Doe' },
    { id: 3, icd: 'J45.909', title: 'Unspecified asthma, uncomplicated', status: 'In Remission', severity: 'Mild', date: 'Feb 20, 2022', doctor: 'Dr. Alice Brown' },
    { id: 4, icd: 'J01.90', title: 'Acute sinusitis, unspecified', status: 'Resolved', severity: 'Mild', date: 'Dec 05, 2023', doctor: 'Dr. Sarah Smith' },
  ];

  const filteredProblems = activeFilter === 'All' 
    ? problems 
    : problems.filter(p => p.status === activeFilter);

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'Critical': return 'border-pink-500 bg-pink-500/10 text-pink-700';
      case 'Severe': return 'border-red-500 bg-red-500/10 text-red-700';
      case 'Moderate': return 'border-amber-500 bg-amber-500/10 text-amber-700';
      case 'Mild': return 'border-green-500 bg-green-500/10 text-green-700';
      default: return 'border-border bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Problem List</h2>
          <p className="text-muted-foreground">1 active, 1 chronic, 1 resolved</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-border bg-card rounded-lg text-sm font-medium hover:bg-muted flex items-center gap-2">
            Print List
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Problem
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-3 rounded-2xl border border-border shadow-sm">
        <div className="flex overflow-x-auto scrollbar-hide gap-2 w-full md:w-auto pb-2 md:pb-0">
          {['All', 'Active', 'Chronic', 'In Remission', 'Recurrent', 'Resolved'].map(filter => (
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
          <input type="text" placeholder="Search problems..." className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-transparent focus:border-primary rounded-xl text-sm outline-none transition-all" />
        </div>
      </div>

      {/* Grouped List (Stubbed grouping for simplicity) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProblems.map(problem => (
          <div key={problem.id} className={`bg-card rounded-2xl p-5 border-l-4 shadow-sm hover:shadow-md transition-all group ${getSeverityColor(problem.severity).split(' ')[0]}`}>
            <div className="flex justify-between items-start mb-3">
              <span className="font-mono text-xs bg-muted text-muted-foreground px-2 py-1 rounded cursor-pointer hover:bg-muted/80">{problem.icd}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-background px-2 py-1 rounded border border-border">{problem.status}</span>
            </div>
            
            <h3 className="font-semibold text-foreground text-lg leading-tight mb-3">{problem.title}</h3>
            
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${getSeverityColor(problem.severity)}`}>
                {problem.severity}
              </span>
              <span className="text-xs text-muted-foreground">Onset: {problem.date}</span>
            </div>
            
            <div className="flex items-center justify-between border-t border-border pt-4 mt-auto">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">{problem.doctor.charAt(4)}</div>
                <span className="text-xs text-muted-foreground">{problem.doctor}</span>
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
}
