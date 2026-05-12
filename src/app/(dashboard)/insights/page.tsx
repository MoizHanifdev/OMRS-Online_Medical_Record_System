'use client';

import { Activity, AlertTriangle, UserX, TrendingDown, DollarSign, BrainCircuit, ShieldAlert, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import Link from 'next/link';

export default function PredictiveInsightsPage() {
  const insightCategories = [
    {
      id: 'deterioration',
      title: 'Clinical Deterioration (NEWS2)',
      desc: 'Real-time early warning scores identifying patients at risk of sudden clinical decline based on vital signs.',
      icon: Activity,
      color: 'text-red-500',
      bg: 'bg-red-500/10',
      status: 'Live',
      metrics: { flagged: 3, accuracy: 'Real-time' },
      patients: [
        { name: 'Albert Flores', score: 8, severity: 'Critical', action: 'Immediate assessment required' },
        { name: 'Bessie Cooper', score: 5, severity: 'High Risk', action: 'Increase monitoring frequency' }
      ]
    },
    {
      id: 'care-gaps',
      title: 'Care Gap Detection',
      desc: 'Rule-based engine identifying chronic disease patients missing guideline-recommended screenings and follow-ups.',
      icon: ShieldAlert,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
      status: 'Live',
      metrics: { flagged: 24, accuracy: 'Rule-based' },
      patients: [
        { name: 'Dianne Russell', score: 'Diabetic', severity: 'Overdue HbA1c', action: 'Schedule Lab Visit' },
        { name: 'Guy Hawkins', score: 'Hypertensive', severity: 'No BP in 6 mos', action: 'Call Patient' }
      ]
    },
    {
      id: 'readmission',
      title: '30-Day Readmission Risk',
      desc: 'Predicts the likelihood of a patient returning to the hospital within 30 days of discharge.',
      icon: TrendingDown,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
      status: 'AI Stub',
      metrics: { flagged: 8, accuracy: '0.85 AUC' },
      patients: [
        { name: 'Jerome Bell', score: '82%', severity: 'High Risk', action: 'Schedule 48h follow-up' }
      ]
    },
    {
      id: 'no-show',
      title: 'Appointment No-Show Risk',
      desc: 'Identifies patients likely to miss their upcoming appointments to optimize scheduling and outreach.',
      icon: UserX,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
      status: 'AI Stub',
      metrics: { flagged: 12, accuracy: '0.78 AUC' },
      patients: []
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">AI & Predictive Insights</h2>
          <p className="text-muted-foreground flex items-center gap-2">
            Proactive intelligence identifying risks before they escalate <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-border bg-card rounded-lg text-sm font-medium hover:bg-muted flex items-center gap-2">
            <BrainCircuit className="w-4 h-4" /> Model Settings
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {insightCategories.map(cat => (
          <div key={cat.id} className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col relative group">
            
            <div className="p-6 border-b border-border">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-xl ${cat.bg} flex items-center justify-center ${cat.color}`}>
                  <cat.icon className="w-6 h-6" />
                </div>
                <div className="flex gap-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                    cat.status === 'Live' ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20' : 'bg-muted text-muted-foreground border-border'
                  }`}>
                    {cat.status}
                  </span>
                </div>
              </div>
              
              <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{cat.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 min-h-[40px]">{cat.desc}</p>
              
              <div className="flex gap-6 text-sm">
                <div><span className="font-bold text-foreground">{cat.metrics.flagged}</span> <span className="text-muted-foreground">Actionable</span></div>
                <div><span className="font-bold text-foreground">{cat.metrics.accuracy}</span> <span className="text-muted-foreground">Engine</span></div>
              </div>
            </div>

            <div className="flex-1 bg-muted/5 p-0">
              {cat.patients.length > 0 ? (
                <div className="divide-y divide-border">
                  {cat.patients.map((p, i) => (
                    <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                      <div>
                        <p className="font-bold text-sm text-foreground">{p.name}</p>
                        <p className="text-xs font-semibold text-muted-foreground mt-0.5">{p.severity} • {p.action}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-sm font-black ${cat.color}`}>{p.score}</span>
                        <button className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"><ChevronRight className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center flex flex-col items-center justify-center h-full opacity-50">
                   <CheckCircle2 className="w-8 h-8 text-emerald-500 mb-2" />
                   <p className="text-sm font-bold text-foreground">No critical insights flagged</p>
                   <p className="text-xs text-muted-foreground">All monitored patients are stable.</p>
                </div>
              )}
            </div>
            
            {cat.patients.length > 0 && (
              <div className="p-3 border-t border-border bg-card text-center">
                <button className="text-xs font-bold text-primary hover:underline">View all {cat.metrics.flagged} flagged patients</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
