'use client';

import { useState } from 'react';
import { Search, Plus, Filter, FileText, ArrowRight, Save, Clock, Download, X, Settings, Users, Activity, Heart, Syringe, FileDigit } from 'lucide-react';

export default function AdvancedSearchPage() {
  const [filters, setFilters] = useState([
    { id: 1, category: 'Demographics', field: 'Age', operator: '>=', value: '40', color: 'bg-blue-500' },
    { id: 2, category: 'Problems', field: 'Diagnosis', operator: 'contains', value: 'Diabetes Type 2', color: 'bg-red-500' },
    { id: 3, category: 'Labs', field: 'HbA1c', operator: '>', value: '7.0%', color: 'bg-amber-500' }
  ]);

  const [activeResults, setActiveResults] = useState(247);
  const [isQuerying, setIsQuerying] = useState(false);

  const mockResults = [
    { id: 'OMRS-2026-001', name: 'Robert Fox', age: 42, gender: 'M', lastVisit: 'May 11, 2026', primaryDx: 'Type 2 Diabetes', hba1c: '8.2%' },
    { id: 'OMRS-2026-045', name: 'Esther Howard', age: 55, gender: 'F', lastVisit: 'May 05, 2026', primaryDx: 'Type 2 Diabetes', hba1c: '7.8%' },
    { id: 'OMRS-2026-112', name: 'Wade Warren', age: 61, gender: 'M', lastVisit: 'Apr 28, 2026', primaryDx: 'Type 2 Diabetes, HTN', hba1c: '9.1%' }
  ];

  return (
    <div className="flex flex-col h-screen bg-muted/10 overflow-hidden">
      {/* Top Navigation */}
      <div className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary"><Search className="w-4 h-4" /></div>
          <h1 className="font-bold text-lg">Advanced Patient Search</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground flex items-center gap-2">Saved Searches</button>
          <button className="px-4 py-2 bg-background border border-border text-foreground rounded-lg text-sm font-semibold hover:bg-muted flex items-center gap-2 shadow-sm transition-colors">
            <Save className="w-4 h-4" /> Save Cohort
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 flex items-center gap-2 shadow-sm transition-colors">
            <Download className="w-4 h-4" /> Export Data
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col md:flex-row">
        
        {/* Left Pane - Query Builder (65%) */}
        <div className="w-full md:w-[65%] border-r border-border bg-card flex flex-col min-h-0">
          <div className="p-6 border-b border-border">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Query Builder</h2>
            
            <div className="bg-muted/20 border border-border rounded-xl p-6 min-h-[200px]">
              {/* AND Group Container */}
              <div className="relative border-l-2 border-primary/30 pl-4 space-y-3">
                <div className="absolute -left-3 -top-2 bg-background border border-border text-[10px] font-bold px-2 py-0.5 rounded text-muted-foreground uppercase tracking-wider">Match ALL of the following (AND)</div>
                
                {filters.map((f) => (
                  <div key={f.id} className="flex items-center gap-2 pt-2">
                    <div className="flex bg-background border border-border rounded-lg shadow-sm text-sm overflow-hidden items-center">
                      <div className={`px-3 py-1.5 text-white font-bold text-xs flex items-center gap-1 ${f.color}`}>
                        {f.category === 'Demographics' ? <Users className="w-3 h-3" /> : f.category === 'Problems' ? <Activity className="w-3 h-3" /> : <Syringe className="w-3 h-3" />}
                        {f.category}
                      </div>
                      <div className="px-3 py-1.5 border-r border-border font-medium bg-muted/30">{f.field}</div>
                      <div className="px-3 py-1.5 border-r border-border font-bold text-primary bg-primary/5">{f.operator}</div>
                      <div className="px-3 py-1.5 font-bold">{f.value}</div>
                      <button className="px-3 py-1.5 hover:bg-red-500/10 hover:text-red-600 transition-colors border-l border-border"><X className="w-3 h-3" /></button>
                    </div>
                  </div>
                ))}

                <div className="pt-2">
                  <button className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20 border-dashed">
                    <Plus className="w-4 h-4" /> Add Filter
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> Last executed 2 mins ago</p>
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 flex items-center gap-2 shadow-sm transition-colors">
                <Search className="w-4 h-4" /> Run Query
              </button>
            </div>
          </div>

          {/* Results Table */}
          <div className="flex-1 bg-background overflow-hidden flex flex-col min-h-[300px]">
            <div className="p-4 border-b border-border bg-card flex justify-between items-center">
              <h3 className="font-bold">Matching Patients</h3>
              <div className="flex gap-2">
                <button className="p-1.5 border border-border bg-muted/50 rounded text-muted-foreground hover:text-foreground"><Settings className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-muted/30 border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-5 py-3 font-semibold w-8"><input type="checkbox" className="rounded" /></th>
                    <th className="px-5 py-3 font-semibold">MRN</th>
                    <th className="px-5 py-3 font-semibold">Patient Name</th>
                    <th className="px-5 py-3 font-semibold">Age/Gender</th>
                    <th className="px-5 py-3 font-semibold">Primary Dx</th>
                    <th className="px-5 py-3 font-semibold">Last HbA1c</th>
                    <th className="px-5 py-3 font-semibold">Last Visit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {mockResults.map((p, i) => (
                    <tr key={i} className="hover:bg-muted/10 transition-colors cursor-pointer" onClick={() => window.location.href=`/patients/${p.id.split('-')[2]}`}>
                      <td className="px-5 py-3"><input type="checkbox" className="rounded" onClick={(e) => e.stopPropagation()} /></td>
                      <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{p.id}</td>
                      <td className="px-5 py-3 font-bold">{p.name}</td>
                      <td className="px-5 py-3">{p.age} {p.gender}</td>
                      <td className="px-5 py-3"><span className="text-[10px] font-bold uppercase bg-muted text-muted-foreground px-2 py-0.5 rounded">{p.primaryDx}</span></td>
                      <td className="px-5 py-3 font-semibold text-amber-600">{p.hba1c}</td>
                      <td className="px-5 py-3 text-xs text-muted-foreground">{p.lastVisit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-border text-center text-xs text-muted-foreground bg-muted/5 mt-auto">
              Showing 1-3 of {activeResults} results
            </div>
          </div>
        </div>

        {/* Right Pane - Preview & Analytics (35%) */}
        <div className="w-full md:w-[35%] bg-card flex flex-col min-h-[400px]">
          <div className="p-8 border-b border-border text-center bg-gradient-to-b from-primary/5 to-transparent">
             <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">Patients Matching Criteria</h3>
             <div className="text-6xl font-black text-primary drop-shadow-sm">{activeResults}</div>
             <p className="text-xs font-semibold text-emerald-600 mt-2 bg-emerald-500/10 border border-emerald-500/20 inline-block px-2 py-1 rounded-full">~4.5% of total population</p>
          </div>
          
          <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-1">
            <h3 className="font-bold border-b border-border pb-2 flex items-center gap-2"><Activity className="w-4 h-4 text-primary" /> Cohort Breakdown</h3>
            
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Gender Distribution</p>
              <div className="flex h-4 rounded-full overflow-hidden mb-2">
                <div className="bg-blue-500 h-full" style={{width: '55%'}}></div>
                <div className="bg-pink-500 h-full" style={{width: '45%'}}></div>
              </div>
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-blue-700">Male (55%)</span>
                <span className="text-pink-700">Female (45%)</span>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Top Comorbidities</p>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1"><span>Hypertension</span><span>142 pts</span></div>
                  <div className="w-full bg-muted rounded-full h-1.5"><div className="bg-primary h-full rounded-full" style={{width: '57%'}}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1"><span>Hyperlipidemia</span><span>98 pts</span></div>
                  <div className="w-full bg-muted rounded-full h-1.5"><div className="bg-primary h-full rounded-full" style={{width: '39%'}}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1"><span>Obesity</span><span>85 pts</span></div>
                  <div className="w-full bg-muted rounded-full h-1.5"><div className="bg-primary h-full rounded-full" style={{width: '34%'}}></div></div>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-border">
              <button className="w-full px-4 py-2 bg-muted/50 border border-border text-foreground rounded-lg text-sm font-semibold hover:bg-muted transition-colors">
                View Full Analytics for Cohort <ArrowRight className="w-4 h-4 inline ml-1" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
