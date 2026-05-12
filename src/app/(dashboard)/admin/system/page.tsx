'use client';

import { Activity, Database, Server, AlertTriangle, Clock, RefreshCw, Zap, ShieldCheck } from 'lucide-react';

export default function SystemHealthPage() {
  const kpis = [
    { title: 'System Status', value: 'Healthy', icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { title: 'API Request Rate', value: '450 / sec', icon: Activity, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { title: 'Error Rate (24h)', value: '0.04%', icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { title: 'Avg Response Time', value: '112 ms', icon: Zap, color: 'text-purple-500', bg: 'bg-purple-500/10' }
  ];

  const jobs = [
    { name: 'Audit Hash Chain Verification', schedule: 'Daily at 02:00 AM', lastRun: 'Today, 02:00 AM', status: 'Success', duration: '45s' },
    { name: 'Materialized View Refresh', schedule: 'Every 6 hours', lastRun: 'Today, 06:00 AM', status: 'Success', duration: '12m' },
    { name: 'Reminder Delivery Service', schedule: 'Every 15 minutes', lastRun: 'Today, 10:30 AM', status: 'Success', duration: '2s' },
    { name: 'Data Export Worker', schedule: 'On-demand', lastRun: 'Yesterday, 14:20', status: 'Success', duration: '4m' },
    { name: 'Database Backup (S3)', schedule: 'Daily at 03:00 AM', lastRun: 'Today, 03:00 AM', status: 'Failed', duration: '1ms' }
  ];

  const dbCollections = [
    { name: 'AuditLogs', docs: '1.2M', size: '4.5 GB' },
    { name: 'Patients', docs: '45.2K', size: '1.2 GB' },
    { name: 'ClinicalNotes', docs: '320K', size: '2.8 GB' },
    { name: 'Appointments', docs: '180K', size: '850 MB' },
    { name: 'Messages', docs: '850K', size: '3.1 GB' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">System Health & Ops</h2>
          <p className="text-muted-foreground flex items-center gap-2">
            Live monitoring of platform performance and background workers.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-border bg-card rounded-lg text-sm font-medium hover:bg-muted flex items-center gap-2 shadow-sm">
            <RefreshCw className="w-4 h-4" /> Refresh Data
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
            </div>
            {/* Sparkline mockup */}
            <div className="absolute bottom-0 left-0 w-full h-8 opacity-10 flex items-end">
               <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full fill-current text-primary">
                 <path d="M0 20 L0 15 Q10 10 20 18 T40 10 T60 5 T80 8 T100 2 L100 20 Z" />
               </svg>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Background Jobs */}
        <div className="bg-card border border-border rounded-xl shadow-sm flex flex-col">
          <div className="p-5 border-b border-border flex justify-between items-center bg-muted/20">
            <h3 className="font-bold flex items-center gap-2"><Server className="w-5 h-5 text-primary" /> Background Workers</h3>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-muted/10 border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 font-semibold">Job Name</th>
                  <th className="px-5 py-3 font-semibold">Schedule</th>
                  <th className="px-5 py-3 font-semibold">Last Run</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {jobs.map((job, i) => (
                  <tr key={i} className="hover:bg-muted/10 transition-colors">
                    <td className="px-5 py-4 font-bold">{job.name}</td>
                    <td className="px-5 py-4 text-muted-foreground text-xs font-mono">{job.schedule}</td>
                    <td className="px-5 py-4">
                      <div className="font-semibold">{job.lastRun}</div>
                      <div className="text-xs text-muted-foreground">{job.duration} duration</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                        job.status === 'Success' ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20' : 'bg-red-500/10 text-red-700 border-red-500/20'
                      }`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button className="px-3 py-1.5 text-xs font-bold border border-border bg-background rounded hover:bg-muted transition-colors">Run Now</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Database Stats */}
        <div className="bg-card border border-border rounded-xl shadow-sm flex flex-col">
          <div className="p-5 border-b border-border flex justify-between items-center bg-muted/20">
            <h3 className="font-bold flex items-center gap-2"><Database className="w-5 h-5 text-primary" /> Database Telemetry</h3>
            <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded">MongoDB</span>
          </div>
          <div className="p-5 space-y-6">
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-muted/30 border border-border rounded-lg p-4 text-center">
                 <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Total Storage Size</p>
                 <p className="text-2xl font-black">12.4 GB</p>
               </div>
               <div className="bg-muted/30 border border-border rounded-lg p-4 text-center">
                 <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Index Size</p>
                 <p className="text-2xl font-black">2.1 GB</p>
               </div>
            </div>

            <div>
              <h4 className="text-sm font-bold mb-3 uppercase tracking-wider text-muted-foreground">Top Collections by Size</h4>
              <div className="space-y-4">
                {dbCollections.map((col, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm font-bold mb-1">
                      <span>{col.name} <span className="text-xs text-muted-foreground ml-1">({col.docs} docs)</span></span>
                      <span>{col.size}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{width: `${(parseFloat(col.size) / 4.5) * 100}%`}}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
