'use client';

import { useState } from 'react';
import { Target, CheckCircle2, Circle, AlertCircle, TrendingUp, Calendar, Users, FileText, Printer, MoreVertical, Plus, Clock, Activity, Share2, ListTodo } from 'lucide-react';
import Link from 'next/link';

export default function CarePlanDashboardPage({ params }: { params: { id: string, planId: string } }) {
  const [activeTab, setActiveTab] = useState('Overview');

  const goals = [
    { id: 'g1', text: 'Achieve HbA1c < 7.0%', target: 'HbA1c < 7.0%', current: '8.2%', status: 'In Progress', due: 'July 10, 2026', linked: 'HbA1c Lab Test' },
    { id: 'g2', text: 'Maintain fasting glucose 80-130 mg/dL', target: '80-130 mg/dL', current: '145 mg/dL', status: 'In Progress', due: 'Ongoing', linked: 'Fasting Glucose' },
    { id: 'g3', text: 'Complete diabetic eye exam', target: 'Exam documented', current: 'Pending', status: 'Not Met', due: 'May 30, 2026', linked: 'Referral' },
    { id: 'g4', text: 'Patient demonstrates proper insulin technique', target: 'Verified by nurse', current: 'Verified', status: 'Met', due: 'Feb 15, 2026', linked: 'Education' }
  ];

  const interventions = [
    { id: 'i1', text: 'Check blood glucose 2x daily (morning/evening)', frequency: 'Twice daily', role: 'Patient', adherence: 85, lastLog: 'Today, 08:00 AM', status: 'Active' },
    { id: 'i2', text: 'Administer Lantus 10 units subcutaneously QHS', frequency: 'Daily (Evening)', role: 'Patient', adherence: 90, lastLog: 'Yesterday, 09:30 PM', status: 'Active' },
    { id: 'i3', text: 'Diabetic foot exam', frequency: 'Every visit', role: 'Doctor/Nurse', adherence: 100, lastLog: 'Feb 15, 2026', status: 'Active' },
    { id: 'i4', text: 'Diabetes nutrition counseling', frequency: 'Once', role: 'Dietitian', adherence: null, lastLog: 'Not scheduled', status: 'Pending' }
  ];

  return (
    <div className="flex flex-col h-screen bg-muted/10 overflow-hidden">
      {/* Top Header */}
      <div className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <Link href={`/patients/${params.id}/care-plans`} className="text-sm font-semibold text-muted-foreground hover:text-foreground">Back to Care Plans</Link>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-700 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1"><Activity className="w-3 h-3" /> Active</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors" title="Print Plan"><Printer className="w-5 h-5" /></button>
          <button className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors" title="Share via Patient Portal"><Share2 className="w-5 h-5" /></button>
          <div className="h-4 w-px bg-border mx-2" />
          <button className="px-4 py-2 bg-background border border-border text-foreground rounded-lg text-sm font-semibold hover:bg-muted flex items-center gap-2 shadow-sm transition-colors">
            Edit Plan
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Care Plan Hero Section */}
        <div className="bg-card border-b border-border px-8 py-8 shadow-sm">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 items-center md:items-start justify-between">
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-foreground leading-tight">Type 2 Diabetes Management</h1>
              </div>
              <p className="text-sm text-muted-foreground font-medium mb-6">Patient: Robert Fox (OMRS-2026-001) • Derived from <Link href="#" className="text-primary hover:underline">Diabetes T2 Guideline v2.3</Link></p>
              
              <div className="flex gap-6 mb-6">
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Start Date</p>
                  <p className="font-semibold">Jan 10, 2026</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Target End Date</p>
                  <p className="font-semibold">Dec 31, 2026</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Care Team</p>
                  <div className="flex -space-x-2 mt-1">
                    <div className="w-6 h-6 rounded-full bg-primary/20 border-2 border-card flex items-center justify-center text-[8px] font-bold text-primary z-20" title="Dr. Sarah Smith (Primary)">SS</div>
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 border-2 border-card flex items-center justify-center text-[8px] font-bold text-blue-700 z-10" title="Nurse Aisha">NA</div>
                    <div className="w-6 h-6 rounded-full bg-orange-500/20 border-2 border-card flex items-center justify-center text-[8px] font-bold text-orange-700 z-0" title="Dietitian Mary">MD</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Overall Progress Ring */}
            <div className="flex items-center gap-6 bg-muted/10 p-5 rounded-2xl border border-border shadow-inner min-w-[250px]">
              <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-muted stroke-current" strokeWidth="3.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-primary stroke-current" strokeWidth="3.5" strokeDasharray="65, 100" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold text-foreground">65%</span>
                  <span className="text-[8px] font-bold uppercase tracking-wider text-muted-foreground">Complete</span>
                </div>
              </div>
              <div className="space-y-3 flex-1">
                <div>
                  <div className="flex justify-between text-xs mb-1"><span className="font-bold text-muted-foreground">Goals</span><span className="font-bold text-foreground">1 / 4 Met</span></div>
                  <div className="w-full bg-muted rounded-full h-1.5"><div className="bg-emerald-500 h-1.5 rounded-full" style={{width: '25%'}}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1"><span className="font-bold text-muted-foreground">Interventions</span><span className="font-bold text-foreground">88% Adherence</span></div>
                  <div className="w-full bg-muted rounded-full h-1.5"><div className="bg-blue-500 h-1.5 rounded-full" style={{width: '88%'}}></div></div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Main Content Tabs */}
        <div className="max-w-5xl mx-auto mt-6 px-8 pb-12">
          
          {/* Goals Section */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2"><Target className="w-5 h-5 text-primary" /> Care Goals</h2>
              <button className="text-sm font-semibold text-primary hover:underline flex items-center gap-1"><Plus className="w-4 h-4" /> Add Goal</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goals.map(goal => (
                <div key={goal.id} className={`bg-card border rounded-xl p-5 shadow-sm transition-all ${goal.status === 'Met' ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-border'}`}>
                  <div className="flex justify-between items-start mb-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                      goal.status === 'Met' ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20' : 
                      goal.status === 'Not Met' ? 'bg-amber-500/10 text-amber-700 border-amber-500/20' : 
                      'bg-blue-500/10 text-blue-700 border-blue-500/20'
                    }`}>
                      {goal.status}
                    </span>
                    <span className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Due {goal.due}
                    </span>
                  </div>
                  
                  <h3 className={`font-bold text-base mb-4 ${goal.status === 'Met' ? 'text-emerald-900 line-through opacity-70' : 'text-foreground'}`}>{goal.text}</h3>
                  
                  <div className="space-y-3 mt-auto">
                    {goal.status !== 'Met' && (
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground font-medium">Target: {goal.target}</span>
                          <span className="font-bold text-foreground">Current: {goal.current}</span>
                        </div>
                        {/* Mock Progress Bar calculation */}
                        <div className="w-full bg-muted rounded-full h-2 relative overflow-hidden">
                           <div className="absolute top-0 left-0 h-full bg-blue-500 rounded-full" style={{width: '60%'}}></div>
                        </div>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-3 border-t border-border">
                      <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1"><Activity className="w-3 h-3" /> Linked: {goal.linked}</span>
                      <button className={`text-xs font-bold px-3 py-1 rounded border ${goal.status === 'Met' ? 'bg-emerald-500 text-white border-transparent' : 'bg-background hover:bg-muted text-foreground border-border'}`}>
                        {goal.status === 'Met' ? '✓ Achieved' : 'Mark as Met'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interventions Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2"><ListTodo className="w-5 h-5 text-primary" /> Interventions & Tasks</h2>
              <button className="text-sm font-semibold text-primary hover:underline flex items-center gap-1"><Plus className="w-4 h-4" /> Add Intervention</button>
            </div>

            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/30 border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Intervention</th>
                    <th className="px-5 py-3 font-semibold">Frequency</th>
                    <th className="px-5 py-3 font-semibold">Responsible</th>
                    <th className="px-5 py-3 font-semibold text-center">Adherence</th>
                    <th className="px-5 py-3 font-semibold text-right">Last Log</th>
                    <th className="px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {interventions.map(inv => (
                    <tr key={inv.id} className="hover:bg-muted/10 transition-colors">
                      <td className="px-5 py-4 font-semibold max-w-xs truncate">{inv.text}</td>
                      <td className="px-5 py-4 text-muted-foreground">{inv.frequency}</td>
                      <td className="px-5 py-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-muted text-muted-foreground px-2 py-1 rounded">{inv.role}</span>
                      </td>
                      <td className="px-5 py-4">
                        {inv.adherence ? (
                           <div className="flex items-center gap-2 justify-center">
                             <div className="w-16 bg-muted rounded-full h-1.5"><div className={`h-1.5 rounded-full ${inv.adherence > 80 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{width: `${inv.adherence}%`}}></div></div>
                             <span className={`text-xs font-bold ${inv.adherence > 80 ? 'text-emerald-600' : 'text-amber-600'}`}>{inv.adherence}%</span>
                           </div>
                        ) : (
                          <span className="text-xs text-muted-foreground text-center block">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-xs text-muted-foreground text-right">{inv.lastLog}</td>
                      <td className="px-5 py-4 text-right">
                        <button className="px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded text-xs font-semibold transition-colors whitespace-nowrap">
                          Log Now
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
