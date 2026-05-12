'use client';

import { useState } from 'react';
import { FileText, Calendar, Clock, BarChart3, Settings, Play, Users, Activity, FileSpreadsheet, Plus, Download } from 'lucide-react';

export default function ReportsLibraryPage() {
  const [activeTab, setActiveTab] = useState('Templates');

  const templates = [
    { id: 'R1', title: 'Population Health Summary', desc: 'Aggregate stats on demographics, top diseases, and visit volume.', icon: Users, type: 'Clinical', runs: 45 },
    { id: 'R2', title: 'Quality Metrics (HEDIS)', desc: 'Compliance rates for standard quality measures.', icon: Activity, type: 'Clinical', runs: 112 },
    { id: 'R3', title: 'Doctor Productivity', desc: 'Patients seen, notes signed, and average time per encounter.', icon: BarChart3, type: 'Operational', runs: 89 },
    { id: 'R4', title: 'Monthly No-Show Analysis', desc: 'Breakdown of missed appointments by department.', icon: Calendar, type: 'Operational', runs: 24 }
  ];

  const scheduled = [
    { id: 'S1', title: 'Weekly Productivity Report', template: 'Doctor Productivity', schedule: 'Every Monday at 08:00', nextRun: 'Tomorrow, 08:00 AM', status: 'Active' },
    { id: 'S2', title: 'Monthly Quality Review', template: 'Quality Metrics (HEDIS)', schedule: '1st of every month', nextRun: 'June 1, 00:00 AM', status: 'Active' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Reports & Exports</h2>
          <p className="text-muted-foreground">Generate, schedule, and download structured reports.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-border bg-card rounded-lg text-sm font-medium hover:bg-muted flex items-center gap-2">
            <Plus className="w-4 h-4" /> Custom Report
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        {['Templates', 'My Reports', 'Scheduled'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === tab 
                ? 'border-primary text-primary' 
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Templates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pt-4">
          {templates.map(tpl => (
            <div key={tpl.id} className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all flex flex-col justify-between cursor-pointer group">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <tpl.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-muted text-muted-foreground px-2 py-0.5 rounded">
                    {tpl.type}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors mb-2">{tpl.title}</h3>
                <p className="text-sm text-muted-foreground mb-6">{tpl.desc}</p>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-border">
                <span className="text-xs font-semibold text-muted-foreground">{tpl.runs} past runs</span>
                <button className="px-4 py-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1">
                  Generate <Play className="w-3 h-3 fill-current" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'Scheduled' && (
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden mt-4">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/30 border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-semibold">Report Name</th>
                <th className="px-5 py-3 font-semibold">Template</th>
                <th className="px-5 py-3 font-semibold">Schedule</th>
                <th className="px-5 py-3 font-semibold">Next Run</th>
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {scheduled.map(s => (
                <tr key={s.id} className="hover:bg-muted/10 transition-colors">
                  <td className="px-5 py-4 font-bold">{s.title}</td>
                  <td className="px-5 py-4 text-muted-foreground">{s.template}</td>
                  <td className="px-5 py-4"><span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> {s.schedule}</span></td>
                  <td className="px-5 py-4 text-xs font-semibold">{s.nextRun}</td>
                  <td className="px-5 py-4 text-right">
                    <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"><Settings className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
