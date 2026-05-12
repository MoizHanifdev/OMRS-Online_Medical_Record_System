'use client';

import { useState } from 'react';
import { Plus, Search, FileText, Download, AlertTriangle, TrendingUp, MoreVertical, FlaskConical } from 'lucide-react';
import { BaseWidget } from '@/components/widgets/BaseWidget';
import Link from 'next/link';

export default function LabsTab({ params }: { params: { id: string } }) {
  const patientId = params.id;
  const [viewMode, setViewMode] = useState<'grouped' | 'table'>('grouped');

  const criticalResults = [
    { id: 1, test: 'Glucose, Random', value: '38', unit: 'mg/dL', range: '70-99', time: '15 mins ago' }
  ];

  const labOrders = [
    {
      id: 'LAB-20260511-A1B2',
      date: 'May 11, 2026',
      status: 'Completed',
      priority: 'STAT',
      doctor: 'Dr. Sarah Smith',
      tests: [
        { name: 'Glucose, Random', result: '38', unit: 'mg/dL', range: '70-99', flag: 'CRITICAL_LOW' },
        { name: 'Sodium', result: '136', unit: 'mEq/L', range: '135-145', flag: 'NORMAL' },
        { name: 'Potassium', result: '4.2', unit: 'mEq/L', range: '3.5-5.1', flag: 'NORMAL' },
      ]
    },
    {
      id: 'LAB-20260401-C3D4',
      date: 'Apr 01, 2026',
      status: 'Completed',
      priority: 'Routine',
      doctor: 'Dr. John Doe',
      tests: [
        { name: 'HbA1c', result: '7.8', unit: '%', range: '< 5.7', flag: 'HIGH' },
        { name: 'Cholesterol, Total', result: '210', unit: 'mg/dL', range: '< 200', flag: 'HIGH' },
      ]
    }
  ];

  const getFlagStyle = (flag: string) => {
    switch(flag) {
      case 'CRITICAL_LOW': 
      case 'CRITICAL_HIGH': return 'bg-red-500 text-white animate-pulse border-red-600';
      case 'HIGH': return 'bg-red-500/10 text-red-700 border-red-500/20';
      case 'LOW': return 'bg-blue-500/10 text-blue-700 border-blue-500/20';
      case 'NORMAL': return 'bg-green-500/10 text-green-700 border-green-500/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="space-y-6">
      {/* Critical Banner */}
      {criticalResults.length > 0 && (
        <div className="bg-red-500/10 border-l-4 border-red-500 px-4 py-3 flex items-start sm:items-center justify-between flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 animate-pulse shrink-0" />
            <div>
              <p className="text-sm font-bold text-red-700 dark:text-red-400">Critical Lab Results Detected</p>
              <div className="text-xs text-foreground mt-0.5">
                {criticalResults.map(cr => (
                  <span key={cr.id} className="mr-3 font-semibold">{cr.test}: <span className="text-red-600 font-bold">{cr.value} {cr.unit}</span> ({cr.time})</span>
                ))}
              </div>
            </div>
          </div>
          <button className="text-xs bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600 transition-colors shadow-sm shrink-0 w-full sm:w-auto">
            Acknowledge
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Laboratory Results</h2>
          <p className="text-muted-foreground">{labOrders.length} orders completed</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-border bg-card rounded-lg text-sm font-medium hover:bg-muted flex items-center gap-2">
            <Download className="w-4 h-4" /> Export
          </button>
          <Link href={`/clinical/lab-orders/new?patientId=${patientId}`} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 flex items-center gap-2 shadow-sm">
            <Plus className="w-4 h-4" /> Order Lab
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-3 rounded-2xl border border-border shadow-sm">
        <div className="flex bg-muted/50 p-1 rounded-xl border border-border">
          <button 
            onClick={() => setViewMode('grouped')}
            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-colors ${viewMode === 'grouped' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:bg-card/50'}`}
          >
            By Order
          </button>
          <button 
            onClick={() => setViewMode('table')}
            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-colors ${viewMode === 'table' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:bg-card/50'}`}
          >
            All Results
          </button>
        </div>
        
        <div className="w-full md:w-64 relative shrink-0">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
          <input type="text" placeholder="Search tests..." className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-transparent focus:border-primary rounded-xl text-sm outline-none transition-all" />
        </div>
      </div>

      <div className="space-y-6">
        {labOrders.map(order => (
          <div key={order.id} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:border-primary/30 transition-colors">
            <div className="bg-muted/30 px-5 py-4 border-b border-border flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <div className="flex items-center gap-3">
                <FlaskConical className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="font-bold text-foreground">{order.date}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-mono text-muted-foreground">{order.id}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded">{order.priority}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground font-medium">Ordered by: {order.doctor}</span>
                <button className="text-muted-foreground hover:text-foreground"><MoreVertical className="w-4 h-4" /></button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="border-b border-border text-muted-foreground text-xs uppercase tracking-wider bg-card">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Test Name</th>
                    <th className="px-5 py-3 font-semibold">Result</th>
                    <th className="px-5 py-3 font-semibold">Range</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                    <th className="px-5 py-3 font-semibold w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {order.tests.map((test, i) => (
                    <tr key={i} className="hover:bg-muted/10 transition-colors">
                      <td className="px-5 py-3 font-medium text-foreground">{test.name}</td>
                      <td className="px-5 py-3 font-bold">{test.result} <span className="text-muted-foreground text-xs font-normal">{test.unit}</span></td>
                      <td className="px-5 py-3 text-muted-foreground text-xs">{test.range}</td>
                      <td className="px-5 py-3">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border ${getFlagStyle(test.flag)}`}>
                          {test.flag.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <button className="p-1.5 text-primary hover:bg-primary/10 rounded-lg transition-colors" title="View Trend">
                          <TrendingUp className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
