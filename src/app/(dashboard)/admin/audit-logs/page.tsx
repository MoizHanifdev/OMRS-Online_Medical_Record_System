'use client';

import { Search, Filter, Download, ShieldCheck, AlertTriangle, Eye, RefreshCw, FileText, Activity } from 'lucide-react';
import Link from 'next/link';

export default function AuditLogsPage() {
  const logs = [
    { id: 'AL-9284', time: 'May 12, 10:24 AM', actor: 'Dr. Sarah Smith', role: 'Doctor', action: 'UPDATE', entity: 'Patient Record', details: 'Updated problem list for Robert Fox', severity: 'INFO', ip: '192.168.1.45', hash: 'Valid' },
    { id: 'AL-9283', time: 'May 12, 10:22 AM', actor: 'Dr. Sarah Smith', role: 'Doctor', action: 'READ', entity: 'Patient Record', details: 'Viewed patient Robert Fox', severity: 'DEBUG', ip: '192.168.1.45', hash: 'Valid' },
    { id: 'AL-9282', time: 'May 12, 09:15 AM', actor: 'Nurse Aisha', role: 'Nurse', action: 'CREATE', entity: 'Vitals', details: 'Logged vitals for Esther Howard', severity: 'INFO', ip: '192.168.1.112', hash: 'Valid' },
    { id: 'AL-9281', time: 'May 12, 08:30 AM', actor: 'System Worker', role: 'System', action: 'EXPORT', entity: 'Compliance Report', details: 'Generated daily HIPAA access report', severity: 'WARNING', ip: '127.0.0.1', hash: 'Valid' },
    { id: 'AL-9280', time: 'May 11, 11:45 PM', actor: 'Unknown', role: 'None', action: 'LOGIN_FAILED', entity: 'Auth', details: '5 failed login attempts for admin@omrs.com', severity: 'CRITICAL', ip: '45.22.109.12', hash: 'Valid' }
  ];

  const getActionColor = (action: string) => {
    switch(action) {
      case 'CREATE': return 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20';
      case 'UPDATE': return 'bg-blue-500/10 text-blue-700 border-blue-500/20';
      case 'DELETE': return 'bg-red-500/10 text-red-700 border-red-500/20';
      case 'READ': return 'bg-gray-500/10 text-gray-700 border-gray-500/20';
      case 'LOGIN_FAILED': return 'bg-red-500 text-white border-red-600';
      default: return 'bg-amber-500/10 text-amber-700 border-amber-500/20';
    }
  };

  const getSeverityColor = (sev: string) => {
    switch(sev) {
      case 'CRITICAL': return 'text-red-600 font-bold';
      case 'WARNING': return 'text-amber-600 font-bold';
      case 'INFO': return 'text-blue-600';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-muted/10 overflow-hidden">
      
      {/* Top Header */}
      <div className="p-6 bg-card border-b border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0 shadow-sm z-10">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">System Audit Logs</h2>
          <p className="text-muted-foreground">Immutable record of all system activity and data access.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 rounded-lg text-sm font-bold shadow-sm">
            <ShieldCheck className="w-4 h-4" /> Hash Chain Valid
          </div>
          <button className="px-4 py-2 border border-border bg-card rounded-lg text-sm font-medium hover:bg-muted flex items-center gap-2 shadow-sm">
            <RefreshCw className="w-4 h-4" /> Verify Chain
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 flex items-center gap-2 shadow-sm">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar - Filters */}
        <div className="w-72 bg-card border-r border-border p-6 flex flex-col gap-6 overflow-y-auto hidden lg:flex">
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Quick Filters</h3>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
              <input type="text" placeholder="Search NLP (e.g. 'logins yesterday')" className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-transparent focus:border-primary rounded-xl text-sm outline-none transition-all" />
            </div>
            <div className="relative">
              <Filter className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
              <select className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-transparent focus:border-primary rounded-xl text-sm font-semibold outline-none transition-all appearance-none">
                <option>Last 24 Hours</option>
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Custom Range...</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Action Type</h3>
            {['CREATE', 'READ', 'UPDATE', 'DELETE', 'EXPORT', 'LOGIN'].map(action => (
              <label key={action} className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" className="rounded text-primary focus:ring-primary w-4 h-4" />
                <span className="font-semibold">{action}</span>
              </label>
            ))}
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Severity</h3>
            {['CRITICAL', 'WARNING', 'INFO', 'DEBUG'].map(sev => (
              <label key={sev} className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" defaultChecked={sev !== 'DEBUG'} className="rounded text-primary focus:ring-primary w-4 h-4" />
                <span className="font-semibold">{sev}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Audit Table Area */}
        <div className="flex-1 flex flex-col bg-background min-w-0">
          
          <div className="flex-1 overflow-auto custom-scrollbar">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-card border-b border-border sticky top-0 z-10 shadow-sm text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-6 py-4 font-semibold">Timestamp</th>
                  <th className="px-6 py-4 font-semibold">Actor</th>
                  <th className="px-6 py-4 font-semibold">Action</th>
                  <th className="px-6 py-4 font-semibold">Entity</th>
                  <th className="px-6 py-4 font-semibold w-full">Details</th>
                  <th className="px-6 py-4 font-semibold">Severity</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-muted/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-mono text-xs text-muted-foreground mb-0.5">{log.id}</div>
                      <div className="font-semibold">{log.time}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold">{log.actor}</div>
                      <div className="text-xs text-muted-foreground">{log.role} • {log.ip}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border ${getActionColor(log.action)}`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold">{log.entity}</td>
                    <td className="px-6 py-4 max-w-xs truncate">{log.details}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs ${getSeverityColor(log.severity)}`}>{log.severity}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 bg-background border border-border rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground shadow-sm transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-card border-t border-border flex justify-between items-center text-sm font-semibold shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <span className="text-muted-foreground">Showing 1-5 of 124,592 entries</span>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 border border-border rounded hover:bg-muted disabled:opacity-50">Previous</button>
              <button className="px-3 py-1.5 border border-border rounded hover:bg-muted">Next</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
