'use client';

import { useState } from 'react';
import { Search, Image as ImageIcon } from 'lucide-react';

export default function RadiologyQueuePage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const queue = [
    { id: 'RAD-20260511-X1', patient: 'Robert Fox', modality: 'X-Ray', bodyPart: 'Chest', priority: 'STAT', waiting: '20 min', status: 'Pending Upload', doctor: 'Dr. Sarah Smith' },
    { id: 'RAD-20260511-C2', patient: 'Esther Howard', modality: 'CT', bodyPart: 'Head w/o contrast', priority: 'Urgent', waiting: '1 hr', status: 'Pending Report', doctor: 'Dr. John Doe' },
    { id: 'RAD-20260511-U3', patient: 'Wade Warren', modality: 'Ultrasound', bodyPart: 'Abdomen', priority: 'Routine', waiting: '2 hrs', status: 'Pending Upload', doctor: 'Dr. Emily Chen' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Radiology Queue</h2>
          <p className="text-muted-foreground">{queue.length} studies pending action</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-3 rounded-2xl border border-border shadow-sm">
        <div className="flex overflow-x-auto scrollbar-hide gap-2 w-full md:w-auto pb-2 md:pb-0">
          {['All', 'X-Ray', 'CT', 'MRI', 'Ultrasound'].map(filter => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeFilter === filter 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        
        <div className="w-full md:w-64 relative shrink-0">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
          <input type="text" placeholder="Search orders..." className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-transparent focus:border-primary rounded-xl text-sm outline-none transition-all" />
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-muted/30 border-b border-border text-muted-foreground text-xs uppercase tracking-wider">
              <tr>
                <th className="px-5 py-4 font-semibold">Order #</th>
                <th className="px-5 py-4 font-semibold">Patient</th>
                <th className="px-5 py-4 font-semibold">Modality & Body Part</th>
                <th className="px-5 py-4 font-semibold">Priority</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 font-semibold w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {queue.map(order => (
                <tr key={order.id} className="hover:bg-muted/10 transition-colors group cursor-pointer" onClick={() => window.location.href=`/radiology/orders/${order.id}`}>
                  <td className="px-5 py-4 font-mono text-xs">{order.id}</td>
                  <td className="px-5 py-4 font-bold">{order.patient}</td>
                  <td className="px-5 py-4">
                    <span className="font-semibold">{order.modality}</span> <span className="text-muted-foreground">{order.bodyPart}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border ${order.priority === 'STAT' ? 'bg-red-500/10 border-red-500/20 text-red-600 animate-pulse' : order.priority === 'Urgent' ? 'bg-amber-500/10 border-amber-500/20 text-amber-700' : 'bg-muted border-transparent text-muted-foreground'}`}>
                      {order.priority}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${order.status === 'Pending Upload' ? 'text-blue-600 bg-blue-500/10 px-2 py-1 rounded' : 'text-amber-600 bg-amber-500/10 px-2 py-1 rounded'}`}>{order.status}</span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button className="px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded text-xs font-semibold transition-colors opacity-0 group-hover:opacity-100">
                      Open
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
