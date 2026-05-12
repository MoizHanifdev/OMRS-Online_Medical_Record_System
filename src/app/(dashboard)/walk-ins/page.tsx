'use client';

import { Users, Clock, AlertCircle, Plus, ChevronRight, Activity, CalendarPlus } from 'lucide-react';

export default function WalkInQueuePage() {
  const doctors = [
    { id: 1, name: 'Dr. Sarah Smith', status: 'Available', load: 45, nextAvailable: 'Now' },
    { id: 2, name: 'Dr. John Doe', status: 'Busy', load: 85, nextAvailable: '11:15 AM' },
    { id: 3, name: 'Dr. Emily Chen', status: 'At Capacity', load: 100, nextAvailable: '02:00 PM' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Walk-In Management</h2>
          <p className="text-muted-foreground">Manage unscheduled patient arrivals</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 flex items-center gap-2 shadow-sm">
            <Plus className="w-4 h-4" /> Add Walk-In Patient
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Walk-In Waiting List */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl shadow-sm flex flex-col">
          <div className="p-4 border-b border-border flex justify-between items-center bg-muted/20">
            <h3 className="font-bold flex items-center gap-2"><Users className="w-5 h-5 text-primary" /> Current Waiting Room</h3>
            <span className="text-xs font-bold bg-amber-500/10 text-amber-700 px-2 py-0.5 rounded border border-amber-500/20">3 Waiting</span>
          </div>
          <div className="p-0 flex-1">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/10 border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 font-semibold">Patient</th>
                  <th className="px-5 py-3 font-semibold">Arrival Time</th>
                  <th className="px-5 py-3 font-semibold">Wait Time</th>
                  <th className="px-5 py-3 font-semibold">Triage / Reason</th>
                  <th className="px-5 py-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {/* Mock rows */}
                <tr className="hover:bg-muted/10 transition-colors">
                  <td className="px-5 py-4 font-bold">Leslie Alexander</td>
                  <td className="px-5 py-4 text-muted-foreground">08:45 AM</td>
                  <td className="px-5 py-4 font-bold text-red-600">45 mins</td>
                  <td className="px-5 py-4">
                    <span className="text-[10px] font-bold uppercase bg-red-500/10 text-red-700 px-2 py-0.5 rounded border border-red-500/20">High</span>
                    <p className="text-xs text-muted-foreground mt-1">Severe migraine</p>
                  </td>
                  <td className="px-5 py-4">
                    <button className="px-3 py-1.5 bg-background border border-border hover:bg-muted rounded text-xs font-bold transition-colors shadow-sm">Assign Room</button>
                  </td>
                </tr>
                <tr className="hover:bg-muted/10 transition-colors">
                  <td className="px-5 py-4 font-bold">Cameron Williamson</td>
                  <td className="px-5 py-4 text-muted-foreground">09:10 AM</td>
                  <td className="px-5 py-4 font-bold text-amber-600">20 mins</td>
                  <td className="px-5 py-4">
                    <span className="text-[10px] font-bold uppercase bg-amber-500/10 text-amber-700 px-2 py-0.5 rounded border border-amber-500/20">Medium</span>
                    <p className="text-xs text-muted-foreground mt-1">Minor cut</p>
                  </td>
                  <td className="px-5 py-4">
                    <button className="px-3 py-1.5 bg-background border border-border hover:bg-muted rounded text-xs font-bold transition-colors shadow-sm">Assign Room</button>
                  </td>
                </tr>
                <tr className="hover:bg-muted/10 transition-colors">
                  <td className="px-5 py-4 font-bold">Jenny Wilson</td>
                  <td className="px-5 py-4 text-muted-foreground">09:25 AM</td>
                  <td className="px-5 py-4 font-bold text-emerald-600">5 mins</td>
                  <td className="px-5 py-4">
                    <span className="text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-700 px-2 py-0.5 rounded border border-emerald-500/20">Low</span>
                    <p className="text-xs text-muted-foreground mt-1">Medication refill request</p>
                  </td>
                  <td className="px-5 py-4">
                    <button className="px-3 py-1.5 bg-background border border-border hover:bg-muted rounded text-xs font-bold transition-colors shadow-sm">Assign Room</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Doctor Availability Board */}
        <div className="lg:col-span-1 bg-card border border-border rounded-xl shadow-sm flex flex-col">
          <div className="p-4 border-b border-border flex justify-between items-center bg-muted/20">
            <h3 className="font-bold flex items-center gap-2"><Activity className="w-5 h-5 text-primary" /> Doctor Capacity</h3>
          </div>
          <div className="flex-1 p-4 space-y-4">
            <p className="text-sm text-muted-foreground mb-2">Drag walk-in patients to an available doctor to insert them into the schedule.</p>
            
            {doctors.map(doc => (
              <div key={doc.id} className="border border-border rounded-lg p-4 bg-background">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold">{doc.name}</h4>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                    doc.status === 'Available' ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20' : 
                    doc.status === 'Busy' ? 'bg-amber-500/10 text-amber-700 border-amber-500/20' : 
                    'bg-red-500/10 text-red-700 border-red-500/20'
                  }`}>
                    {doc.status}
                  </span>
                </div>
                
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-muted-foreground">Current Load</span>
                    <span>{doc.load}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                    <div className={`h-full rounded-full ${doc.load < 50 ? 'bg-emerald-500' : doc.load < 90 ? 'bg-amber-500' : 'bg-red-500'}`} style={{width: `${doc.load}%`}}></div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-border mt-3 text-xs">
                  <span className="text-muted-foreground font-semibold flex items-center gap-1"><Clock className="w-3 h-3" /> Next slot: {doc.nextAvailable}</span>
                  {doc.status !== 'At Capacity' && (
                    <button className="text-primary font-bold hover:underline flex items-center">Insert <ChevronRight className="w-3 h-3" /></button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
