'use client';

import { Activity, AlertTriangle, ListTodo, Users, CheckCircle2, Search, Filter, Phone, Mail, ChevronRight, FileWarning } from 'lucide-react';
import Link from 'next/link';

export default function CareCoordinatorDashboardPage() {
  const kpis = [
    { label: 'Active Care Plans', value: '142', icon: Activity, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Goals Due This Week', value: '28', icon: TargetIcon, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Overdue Interventions', value: '15', icon: ListTodo, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: 'Patients at Risk', value: '8', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10' }
  ];

  const upcomingInterventions = [
    { id: 1, patient: 'Robert Fox', task: 'Blood pressure check', time: '10:00 AM', status: 'Pending' },
    { id: 2, patient: 'Esther Howard', task: 'Diabetic foot exam', time: '11:30 AM', status: 'Pending' },
    { id: 3, patient: 'Wade Warren', task: 'Follow-up phone call', time: '02:00 PM', status: 'Pending' }
  ];

  const careGaps = [
    { id: 1, patient: 'Eleanor Pena', gap: 'HbA1c overdue (>6 mos)', lastVisit: '8 mos ago', risk: 'High' },
    { id: 2, patient: 'Courtney Henry', gap: 'No lipid panel in 1 yr', lastVisit: '14 mos ago', risk: 'Medium' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Care Coordinator Dashboard</h2>
          <p className="text-muted-foreground">Manage your assigned patients and care gaps</p>
        </div>
        <div className="flex gap-2">
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
            <input type="text" placeholder="Find patient..." className="w-full pl-9 pr-4 py-2 bg-card border border-border focus:border-primary rounded-xl text-sm outline-none transition-all shadow-sm" />
          </div>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-card border border-border rounded-xl p-5 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full ${kpi.bg} flex items-center justify-center ${kpi.color}`}>
              <kpi.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-muted-foreground">{kpi.label}</p>
              <p className="text-2xl font-black text-foreground">{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Today's Interventions */}
        <div className="bg-card border border-border rounded-xl shadow-sm flex flex-col">
          <div className="px-5 py-4 border-b border-border flex justify-between items-center">
            <h3 className="font-bold text-lg flex items-center gap-2"><ListTodo className="w-5 h-5 text-primary" /> Today&apos;s Interventions</h3>
            <span className="text-xs font-bold bg-muted px-2 py-1 rounded text-muted-foreground">My Queue</span>
          </div>
          <div className="flex-1 p-0 overflow-hidden flex flex-col">
            <div className="divide-y divide-border overflow-y-auto">
              {upcomingInterventions.map(item => (
                <div key={item.id} className="p-4 hover:bg-muted/30 transition-colors flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="text-sm font-bold w-20 shrink-0">{item.time}</div>
                    <div className="w-px h-8 bg-border"></div>
                    <div>
                      <p className="font-bold text-foreground group-hover:text-primary transition-colors">{item.patient}</p>
                      <p className="text-sm text-muted-foreground">{item.task}</p>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded text-xs font-semibold transition-colors">
                    Log Now
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="px-5 py-3 border-t border-border bg-muted/10 text-center">
            <button className="text-sm font-semibold text-primary hover:underline">View All Schedule</button>
          </div>
        </div>

        {/* Care Gaps Analysis */}
        <div className="bg-card border border-border rounded-xl shadow-sm flex flex-col">
          <div className="px-5 py-4 border-b border-border flex justify-between items-center">
            <h3 className="font-bold text-lg flex items-center gap-2"><FileWarning className="w-5 h-5 text-amber-500" /> Care Gaps Identified</h3>
            <span className="text-xs font-bold bg-amber-500/10 text-amber-700 border border-amber-500/20 px-2 py-1 rounded">Needs Action</span>
          </div>
          <div className="flex-1 p-4 space-y-3">
            <p className="text-sm text-muted-foreground mb-4">The system has identified chronic care patients assigned to you who are missing guideline-recommended screenings.</p>
            
            {careGaps.map(gap => (
              <div key={gap.id} className="bg-muted/20 border border-border rounded-lg p-4 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${gap.risk === 'High' ? 'bg-red-500/10 text-red-700 border-red-500/20' : 'bg-amber-500/10 text-amber-700 border-amber-500/20'}`}>
                      {gap.risk} Risk
                    </span>
                  </div>
                  <h4 className="font-bold text-foreground mb-0.5">{gap.patient}</h4>
                  <p className="text-sm font-semibold text-amber-600 mb-1">{gap.gap}</p>
                  <p className="text-xs text-muted-foreground">Last clinical visit: {gap.lastVisit}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="p-2 border border-border bg-background rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Call Patient"><Phone className="w-4 h-4" /></button>
                  <button className="p-2 border border-border bg-background rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Message via Portal"><Mail className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// Target icon since it was not exported from lucide-react directly
function TargetIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
