'use client';

import { useState } from 'react';
import { Search, Plus, Filter, FileText, ArrowRight, BookOpen, Star, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function ClinicalGuidelinesPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const guidelines = [
    { id: 'GL-1', title: 'Type 2 Diabetes Management', category: 'Endocrinology', type: 'Disease Management', version: 'v2.3', evidence: 'Level I', lastReviewed: 'Jan 15, 2026', usage: 1432, status: 'Active' },
    { id: 'GL-2', title: 'Sepsis Recognition & Bundle', category: 'Emergency Medicine', type: 'Emergency Pathway', version: 'v4.1', evidence: 'Level I', lastReviewed: 'Mar 10, 2026', usage: 845, status: 'Active' },
    { id: 'GL-3', title: 'Post-MI Care Plan', category: 'Cardiology', type: 'Disease Management', version: 'v1.5', evidence: 'Level II', lastReviewed: 'Nov 20, 2025', usage: 612, status: 'Active' },
    { id: 'GL-4', title: 'Asthma Exacerbation Pathway', category: 'Pulmonology', type: 'Emergency Pathway', version: 'v3.0', evidence: 'Level I', lastReviewed: 'May 01, 2026', usage: 920, status: 'Active' },
    { id: 'GL-5', title: 'Hypertension Protocol', category: 'General Medicine', type: 'Preventive Care', version: 'v1.8', evidence: 'Level II', lastReviewed: 'Dec 05, 2024', usage: 2150, status: 'Review Due' }
  ];

  const getEvidenceColor = (level: string) => {
    switch (level) {
      case 'Level I': return 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20';
      case 'Level II': return 'bg-blue-500/10 text-blue-700 border-blue-500/20';
      case 'Level III': return 'bg-amber-500/10 text-amber-700 border-amber-500/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Clinical Guidelines</h2>
          <p className="text-muted-foreground">Standardized evidence-based protocols</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-border bg-card rounded-lg text-sm font-medium hover:bg-muted flex items-center gap-2">
            Import Guidelines
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 flex items-center gap-2 shadow-sm">
            <Plus className="w-4 h-4" /> New Guideline
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-3 rounded-2xl border border-border shadow-sm">
        <div className="flex overflow-x-auto scrollbar-hide gap-2 w-full md:w-auto pb-2 md:pb-0">
          {['All', 'Disease Management', 'Emergency Pathway', 'Preventive Care', 'Protocols'].map(filter => (
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
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64 shrink-0">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
            <input type="text" placeholder="Search guidelines..." className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-transparent focus:border-primary rounded-xl text-sm outline-none transition-all" />
          </div>
          <button className="p-2 border border-border bg-muted/50 rounded-xl text-muted-foreground hover:text-foreground">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {guidelines.map(gl => (
          <div key={gl.id} className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-muted text-muted-foreground px-2 py-0.5 rounded flex items-center gap-1">
                    <BookOpen className="w-3 h-3" /> {gl.category}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getEvidenceColor(gl.evidence)}`}>
                    {gl.evidence} Evidence
                  </span>
                  {gl.status === 'Review Due' && (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-700 px-2 py-0.5 rounded border border-amber-500/20 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Review Due
                    </span>
                  )}
                </div>
                <div className="text-xs font-mono font-medium bg-muted/50 px-2 py-1 rounded">{gl.version}</div>
              </div>
              
              <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors leading-tight mb-2">
                {gl.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">Standardized evidence-based protocol for {gl.title.toLowerCase()}. Includes goals of care, recommended interventions, and escalation criteria.</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border mt-2">
              <div className="flex gap-4 text-xs text-muted-foreground font-medium">
                <span>Last reviewed: <span className="text-foreground">{gl.lastReviewed}</span></span>
                <span>Applied <span className="text-foreground font-bold">{gl.usage}</span> times</span>
              </div>
              <button className="text-sm font-semibold text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                View Protocol <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
