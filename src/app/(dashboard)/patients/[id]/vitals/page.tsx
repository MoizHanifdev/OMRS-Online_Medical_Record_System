'use client';

import { useState } from 'react';
import { Plus, BarChart2, List, Calendar as CalendarIcon, Download, AlertTriangle } from 'lucide-react';
import { BaseWidget } from '@/components/widgets/BaseWidget';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts';

export default function VitalsTab() {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  
  const hasCriticalAlert = false;

  // Stub data for charts
  const bpData = [
    { date: 'Jan 1', sys: 130, dia: 85 },
    { date: 'Jan 15', sys: 128, dia: 82 },
    { date: 'Feb 1', sys: 125, dia: 80 },
    { date: 'Feb 15', sys: 122, dia: 78 },
    { date: 'Mar 1', sys: 120, dia: 80 },
    { date: 'Mar 15', sys: 118, dia: 76 },
  ];

  const weightData = [
    { date: 'Jan 1', weight: 82.5, bmi: 25.4 },
    { date: 'Jan 15', weight: 81.8, bmi: 25.2 },
    { date: 'Feb 1', weight: 81.0, bmi: 25.0 },
    { date: 'Feb 15', weight: 80.5, bmi: 24.8 },
    { date: 'Mar 1', weight: 79.8, bmi: 24.6 },
    { date: 'Mar 15', weight: 78.5, bmi: 24.2 },
  ];

  return (
    <div className="space-y-6">
      {/* Critical Alert Banner */}
      {hasCriticalAlert && (
        <div className="bg-red-500/10 border-l-4 border-red-500 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 animate-pulse" />
            <p className="text-sm font-bold text-red-700 dark:text-red-400">CRITICAL VITAL SIGN: SpO2 88% recorded 2 hours ago.</p>
          </div>
          <button className="text-xs bg-card px-3 py-1 rounded border border-red-500/30 font-bold hover:bg-muted transition-colors">Acknowledge</button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Vital Signs</h2>
          <p className="text-muted-foreground">Last recorded: 2 days ago</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* View Switcher */}
          <div className="flex bg-muted/50 p-1 rounded-xl border border-border">
            <button 
              onClick={() => setViewMode('chart')}
              className={`p-1.5 rounded-lg flex items-center justify-center transition-colors ${viewMode === 'chart' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:bg-card/50'}`}
              title="Chart View"
            >
              <BarChart2 className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg flex items-center justify-center transition-colors ${viewMode === 'table' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:bg-card/50'}`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <div className="h-6 w-px bg-border hidden sm:block" />

          <button className="px-3 py-2 bg-card border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" /> Last 90 Days
          </button>
          <button className="p-2 bg-card border border-border rounded-lg text-muted-foreground hover:text-foreground transition-colors hidden sm:block" title="Export">
            <Download className="w-4 h-4" />
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 flex items-center gap-2 ml-auto lg:ml-0">
            <Plus className="w-4 h-4" /> Record Vitals
          </button>
        </div>
      </div>

      {/* Latest Vitals Summary Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {[
          { name: 'BP', val: '120/80', unit: 'mmHg', trend: 'down', status: 'normal' },
          { name: 'HR', val: '72', unit: 'bpm', trend: 'stable', status: 'normal' },
          { name: 'Temp', val: '36.8', unit: '°C', trend: 'up', status: 'normal' },
          { name: 'SpO2', val: '98', unit: '%', trend: 'stable', status: 'normal' },
          { name: 'RR', val: '16', unit: 'breaths/min', trend: 'stable', status: 'normal' },
          { name: 'Weight', val: '78.5', unit: 'kg', trend: 'down', status: 'normal' },
          { name: 'BMI', val: '24.2', unit: '', trend: 'down', status: 'normal' },
          { name: 'Pain', val: '0', unit: '/10', trend: 'stable', status: 'normal' },
        ].map(vital => (
          <div key={vital.name} className="bg-card border border-border rounded-xl p-3 shadow-sm flex flex-col justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase">{vital.name}</span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-xl font-bold">{vital.val}</span>
              <span className="text-[10px] text-muted-foreground">{vital.unit}</span>
            </div>
            {vital.name === 'BP' && <span className="text-[9px] mt-1 text-green-600 bg-green-500/10 px-1.5 py-0.5 rounded w-fit uppercase font-bold">Normal</span>}
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      {viewMode === 'chart' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* BP Chart */}
          <BaseWidget title="Blood Pressure Trend" className="min-h-[350px]">
            <div className="h-[280px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={bpData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  {/* Normal Range Band */}
                  <ReferenceArea y1={90} y2={120} fill="hsl(var(--primary))" fillOpacity={0.05} />
                  <ReferenceArea y1={60} y2={80} fill="hsl(var(--primary))" fillOpacity={0.05} />
                  
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} domain={[50, 160]} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }} />
                  
                  <Line type="monotone" dataKey="sys" name="Systolic" stroke="#ef4444" strokeWidth={2} dot={{ r: 4, strokeWidth: 2, fill: 'hsl(var(--background))' }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="dia" name="Diastolic" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4, strokeWidth: 2, fill: 'hsl(var(--background))' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </BaseWidget>

          {/* Weight & BMI Chart */}
          <BaseWidget title="Weight & BMI Trend" className="min-h-[350px]">
            <div className="h-[280px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weightData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} domain={['dataMin - 5', 'dataMax + 5']} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} domain={[20, 30]} />
                  
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }} />
                  
                  <Line yAxisId="left" type="monotone" dataKey="weight" name="Weight (kg)" stroke="#10b981" strokeWidth={2} dot={{ r: 4, strokeWidth: 2, fill: 'hsl(var(--background))' }} />
                  <Line yAxisId="right" type="monotone" dataKey="bmi" name="BMI" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4, strokeWidth: 2, fill: 'hsl(var(--background))' }} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </BaseWidget>
        </div>
      ) : (
        <BaseWidget title="Vitals Log" isEmpty={false}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="border-b border-border text-muted-foreground bg-muted/20">
                <tr>
                  <th className="px-4 py-3 font-medium">Date & Time</th>
                  <th className="px-4 py-3 font-medium">BP (mmHg)</th>
                  <th className="px-4 py-3 font-medium">HR (bpm)</th>
                  <th className="px-4 py-3 font-medium">Temp (°C)</th>
                  <th className="px-4 py-3 font-medium">SpO2 (%)</th>
                  <th className="px-4 py-3 font-medium">Weight (kg)</th>
                  <th className="px-4 py-3 font-medium">Recorded By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[...bpData].reverse().map((data, i) => (
                  <tr key={i} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">{data.date}, 10:00 AM</td>
                    <td className="px-4 py-3 font-medium">{data.sys}/{data.dia}</td>
                    <td className="px-4 py-3">72</td>
                    <td className="px-4 py-3">36.8</td>
                    <td className="px-4 py-3">98</td>
                    <td className="px-4 py-3">{weightData[weightData.length - 1 - i]?.weight ?? '-'}</td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">Nurse Joy</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </BaseWidget>
      )}
    </div>
  );
}
