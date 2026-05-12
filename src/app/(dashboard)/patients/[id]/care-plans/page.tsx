'use client';

import { Plus, CheckCircle2, ListTodo, Activity, Clock, ShieldCheck, Stethoscope } from 'lucide-react';
import Link from 'next/link';

export default function PatientCarePlansPage({ params }: { params: { id: string } }) {
  const patientId = params.id;

  const carePlans = [
    { 
      id: 'CP-1', 
      title: 'Type 2 Diabetes Management', 
      status: 'Active', 
      guideline: 'Diabetes T2 Guideline v2.3', 
      startDate: 'Jan 10, 2026', 
      progress: 60, 
      goalsMet: 3, 
      goalsTotal: 5,
      team: ['Dr. Sarah Smith', 'Nurse Aisha'],
      lastActivity: '2 days ago'
    },
    { 
      id: 'CP-2', 
      title: 'Hypertension Protocol', 
      status: 'Active', 
      guideline: 'Hypertension Guideline v1.8', 
      startDate: 'Mar 15, 2026', 
      progress: 85, 
      goalsMet: 5, 
      goalsTotal: 6,
      team: ['Dr. Sarah Smith'],
      lastActivity: 'Today'
    },
    { 
      id: 'CP-3', 
      title: 'Post-Op Wound Care', 
      status: 'Completed', 
      startDate: 'Nov 01, 2025', 
      progress: 100, 
      goalsMet: 2, 
      goalsTotal: 2,
      team: ['Dr. John Doe', 'Wound Care Team'],
      lastActivity: 'Completed on Nov 15, 2025'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Care Plans</h2>
          <p className="text-muted-foreground">Active and historical care pathways</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-border bg-card rounded-lg text-sm font-medium hover:bg-muted flex items-center gap-2">
            <Activity className="w-4 h-4" /> Apply Guideline
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 flex items-center gap-2 shadow-sm">
            <Plus className="w-4 h-4" /> Custom Care Plan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {carePlans.map(plan => (
          <div key={plan.id} className={`bg-card border rounded-xl p-5 shadow-sm transition-all group cursor-pointer relative overflow-hidden ${plan.status === 'Completed' ? 'border-border/50 opacity-80' : 'border-border hover:shadow-md hover:border-primary/30'}`} onClick={() => window.location.href=`/patients/${patientId}/care-plans/${plan.id}`}>
            
            {/* Background progress indicator subtle */}
            {plan.status === 'Active' && (
              <div className="absolute top-0 left-0 h-1 bg-muted w-full">
                <div className="h-full bg-primary" style={{ width: `${plan.progress}%` }}></div>
              </div>
            )}

            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${plan.status === 'Active' ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20' : 'bg-gray-500/10 text-gray-700 border-gray-500/20'}`}>
                    {plan.status}
                  </span>
                  {plan.guideline && (
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-medium bg-muted/50 px-2 py-0.5 rounded">
                      <ShieldCheck className="w-3 h-3" /> Derived from Guideline
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors leading-tight">
                  {plan.title}
                </h3>
              </div>
            </div>

            {/* Progress Circular Mockup + Stats */}
            <div className="flex items-center gap-6 mb-6 bg-muted/20 p-3 rounded-lg border border-border/50">
              <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-muted stroke-current" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className={`${plan.progress === 100 ? 'text-emerald-500' : 'text-primary'} stroke-current`} strokeWidth="3" strokeDasharray={`${plan.progress}, 100`} fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">
                  {plan.progress}%
                </div>
              </div>
              
              <div className="flex-1 grid grid-cols-2 gap-2">
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1 mb-0.5"><CheckCircle2 className="w-3 h-3" /> Goals</p>
                  <p className="text-sm font-semibold text-foreground">{plan.goalsMet} / {plan.goalsTotal} met</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1 mb-0.5"><Clock className="w-3 h-3" /> Started</p>
                  <p className="text-sm font-semibold text-foreground">{plan.startDate}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-border">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-primary/20 border-2 border-card flex items-center justify-center text-[8px] font-bold text-primary z-10">SS</div>
                  {plan.team.length > 1 && <div className="w-6 h-6 rounded-full bg-blue-500/20 border-2 border-card flex items-center justify-center text-[8px] font-bold text-blue-700 z-0">NA</div>}
                </div>
                <span className="text-xs text-muted-foreground font-medium">{plan.team.length} care team members</span>
              </div>
              <span className="text-[10px] font-medium text-muted-foreground bg-muted px-2 py-1 rounded">Activity: {plan.lastActivity}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
