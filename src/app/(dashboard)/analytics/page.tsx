'use client';

import { Users, Activity, HeartPulse, Stethoscope, ArrowUpRight, ArrowDownRight, Download, Filter, Maximize2, MoreVertical, RefreshCw } from 'lucide-react';

export default function PopulationAnalyticsDashboard() {
  const kpis = [
    { title: 'Total Active Patients', value: '5,248', trend: '+12%', isPositive: true, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { title: 'Visits This Month', value: '1,842', trend: '+5%', isPositive: true, icon: Stethoscope, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { title: 'Active Care Plans', value: '845', trend: '+18%', isPositive: true, icon: Activity, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { title: '30-Day Readmissions', value: '4.2%', trend: '-1.1%', isPositive: true, icon: HeartPulse, color: 'text-amber-500', bg: 'bg-amber-500/10' } // lower is better
  ];

  const topDiseases = [
    { name: 'Essential Hypertension', count: 1245, pct: 24 },
    { name: 'Type 2 Diabetes Mellitus', count: 980, pct: 19 },
    { name: 'Hyperlipidemia', count: 850, pct: 16 },
    { name: 'Asthma', count: 420, pct: 8 },
    { name: 'Osteoarthritis', count: 310, pct: 6 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Population Analytics</h2>
          <p className="text-muted-foreground flex items-center gap-2">
            Data refreshed 2 hours ago <button className="p-1 hover:bg-muted rounded"><RefreshCw className="w-3 h-3" /></button>
          </p>
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-2 border border-border bg-card rounded-lg text-sm font-medium hover:bg-muted outline-none">
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>Year to Date</option>
            <option>Custom Range...</option>
          </select>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 flex items-center gap-2 shadow-sm">
            <Download className="w-4 h-4" /> Export Dashboard
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm font-bold text-muted-foreground">{kpi.title}</p>
              <div className={`w-8 h-8 rounded-full ${kpi.bg} flex items-center justify-center ${kpi.color}`}>
                <kpi.icon className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-end gap-3">
              <h3 className="text-3xl font-black text-foreground">{kpi.value}</h3>
              <div className={`flex items-center gap-0.5 text-sm font-bold pb-1 ${kpi.isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                {kpi.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {kpi.trend}
              </div>
            </div>
            
            {/* Sparkline mockup */}
            <div className="absolute bottom-0 left-0 w-full h-8 opacity-20 flex items-end">
               <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full fill-current text-primary">
                 <path d="M0 20 L0 15 Q10 10 20 18 T40 10 T60 5 T80 8 T100 2 L100 20 Z" />
               </svg>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Top Disease Burden */}
        <div className="lg:col-span-1 bg-card border border-border rounded-xl shadow-sm flex flex-col">
          <div className="p-5 border-b border-border flex justify-between items-center">
            <h3 className="font-bold text-lg">Top Disease Burden</h3>
            <button className="p-1 text-muted-foreground hover:bg-muted rounded"><MoreVertical className="w-4 h-4" /></button>
          </div>
          <div className="p-5 flex-1 flex flex-col justify-center space-y-5">
            {topDiseases.map((d, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm font-bold mb-1">
                  <span className="truncate pr-2">{d.name}</span>
                  <span className="text-muted-foreground shrink-0">{d.count} ({d.pct}%)</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{width: `${d.pct}%`}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clinical Activity Trend */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl shadow-sm flex flex-col">
          <div className="p-5 border-b border-border flex justify-between items-center">
            <h3 className="font-bold text-lg">Clinical Activity (Visits vs Notes vs Orders)</h3>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Visits</span>
              <span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground"><div className="w-2 h-2 rounded-full bg-purple-500"></div> Notes</span>
              <button className="p-1 text-muted-foreground hover:bg-muted rounded ml-2"><Maximize2 className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="p-5 flex-1 flex items-center justify-center min-h-[300px]">
             {/* Stub for a line chart (Recharts/Nivo) */}
             <div className="w-full h-full relative">
               <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                 <g className="grid-lines stroke-border stroke-1" strokeDasharray="2 2">
                   <line x1="0" y1="10" x2="100" y2="10" />
                   <line x1="0" y1="20" x2="100" y2="20" />
                   <line x1="0" y1="30" x2="100" y2="30" />
                   <line x1="0" y1="40" x2="100" y2="40" />
                 </g>
                 
                 <path d="M0 45 L10 35 L20 40 L30 25 L40 30 L50 15 L60 20 L70 10 L80 15 L90 5 L100 10" fill="none" className="stroke-blue-500 stroke-2" />
                 <path d="M0 48 L10 40 L20 42 L30 35 L40 38 L50 25 L60 30 L70 15 L80 20 L90 15 L100 20" fill="none" className="stroke-purple-500 stroke-[1.5]" />
               </svg>
             </div>
          </div>
        </div>

        {/* Quality Metrics Highlights */}
        <div className="lg:col-span-3 bg-card border border-border rounded-xl shadow-sm flex flex-col">
          <div className="p-5 border-b border-border flex justify-between items-center">
            <h3 className="font-bold text-lg">Quality Metrics (HEDIS Equivalents)</h3>
            <button className="text-sm font-semibold text-primary hover:underline">View All Metrics</button>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-muted/10 border border-border rounded-lg p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Diabetes Control</p>
              <h4 className="font-semibold mb-2 line-clamp-1">HbA1c &lt; 8.0% Control Rate</h4>
              <div className="flex items-end gap-3 mb-3">
                <span className="text-3xl font-black text-foreground">68%</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 mb-1">Target: 75%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2"><div className="bg-amber-500 h-full rounded-full" style={{width: '68%'}}></div></div>
            </div>

            <div className="bg-muted/10 border border-border rounded-lg p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Hypertension Control</p>
              <h4 className="font-semibold mb-2 line-clamp-1">BP &lt; 140/90 Control Rate</h4>
              <div className="flex items-end gap-3 mb-3">
                <span className="text-3xl font-black text-foreground">72%</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 mb-1">Target: 70%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2"><div className="bg-emerald-500 h-full rounded-full" style={{width: '72%'}}></div></div>
            </div>

            <div className="bg-muted/10 border border-border rounded-lg p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Preventive Screenings</p>
              <h4 className="font-semibold mb-2 line-clamp-1">Colorectal Cancer Screening</h4>
              <div className="flex items-end gap-3 mb-3">
                <span className="text-3xl font-black text-foreground">55%</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 mb-1">Target: 80%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2"><div className="bg-red-500 h-full rounded-full" style={{width: '55%'}}></div></div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
