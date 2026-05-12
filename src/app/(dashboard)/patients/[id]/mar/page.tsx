'use client';

import { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Check, PauseCircle, XCircle, Info } from 'lucide-react';

export default function MARTab({ params }: { params: { id: string } }) {
  const patientId = params.id;
  const [viewMode, setViewMode] = useState<'8h' | '24h'>('24h');

  // Stub data for MAR grid
  const medications = [
    { id: 1, name: 'Lisinopril', dose: '10mg', route: 'PO', frequency: 'OD', times: [{ time: '09:00', status: 'administered', by: 'NJ' }] },
    { id: 2, name: 'Metformin', dose: '500mg', route: 'PO', frequency: 'BD', times: [{ time: '09:00', status: 'administered', by: 'NJ' }, { time: '21:00', status: 'scheduled' }] },
    { id: 3, name: 'Ceftriaxone', dose: '1g', route: 'IVPB', frequency: 'Q12H', times: [{ time: '08:00', status: 'administered', by: 'NJ' }, { time: '20:00', status: 'scheduled' }] },
    { id: 4, name: 'Heparin', dose: '5000 units', route: 'SC', frequency: 'Q12H', times: [{ time: '09:00', status: 'held', reason: 'Abnormal PTT' }, { time: '21:00', status: 'scheduled' }] },
  ];

  const prnMeds = [
    { id: 5, name: 'Oxycodone', dose: '5mg', route: 'PO', frequency: 'Q6H PRN', indication: 'Pain > 5', lastGiven: 'Yesterday, 22:00' },
    { id: 6, name: 'Ondansetron', dose: '4mg', route: 'IV', frequency: 'Q8H PRN', indication: 'Nausea', lastGiven: 'Not given yet' },
  ];

  const timeSlots24h = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];

  const getCellContent = (timeSlot: string, timesArray: any[]) => {
    const entry = timesArray.find(t => {
      // Simplistic matching for demo
      if (!t || typeof t.time !== 'string') return false;
      const h = parseInt(t.time.split(':')[0] || '0');
      const slotH = parseInt(timeSlot.split(':')[0] || '0');
      return h >= slotH && h < slotH + 3;
    });

    if (!entry) return null;

    if (entry.status === 'administered') return (
      <div className="bg-green-500/10 border border-green-500/20 text-green-700 rounded p-1 text-center cursor-pointer hover:bg-green-500/20 transition-colors">
        <Check className="w-4 h-4 mx-auto mb-0.5" />
        <span className="text-[10px] font-bold">{entry.time}</span>
        <span className="text-[9px] block text-green-600/70">{entry.by}</span>
      </div>
    );

    if (entry.status === 'held') return (
      <div className="bg-amber-500/10 border border-amber-500/20 text-amber-700 rounded p-1 text-center cursor-pointer hover:bg-amber-500/20 transition-colors" title={entry.reason}>
        <PauseCircle className="w-4 h-4 mx-auto mb-0.5" />
        <span className="text-[10px] font-bold">{entry.time}</span>
        <span className="text-[9px] block text-amber-600/70">HELD</span>
      </div>
    );

    if (entry.status === 'scheduled') return (
      <div className="bg-muted border border-border text-foreground rounded p-1 text-center cursor-pointer hover:bg-primary/10 hover:border-primary/30 transition-colors group relative">
        <span className="text-[10px] font-bold block mt-1">{entry.time}</span>
        <span className="text-[9px] block text-muted-foreground group-hover:text-primary">DUE</span>
        
        {/* Hover action popup */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card border border-border shadow-lg rounded-lg p-1 hidden group-hover:flex gap-1 z-10">
          <button className="p-1.5 bg-green-500 text-white rounded hover:bg-green-600" title="Administer"><Check className="w-3 h-3" /></button>
          <button className="p-1.5 bg-amber-500 text-white rounded hover:bg-amber-600" title="Hold"><PauseCircle className="w-3 h-3" /></button>
          <button className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600" title="Refuse"><XCircle className="w-3 h-3" /></button>
        </div>
      </div>
    );

    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card p-4 rounded-2xl border border-border shadow-sm">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Medication Administration Record</h2>
          <p className="text-sm text-muted-foreground mt-1">Track and document medication administration.</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex items-center bg-muted/50 rounded-xl border border-border p-1">
            <button className="p-2 hover:bg-card rounded-lg text-muted-foreground"><ChevronLeft className="w-4 h-4" /></button>
            <div className="px-4 py-1.5 text-sm font-bold flex items-center gap-2 text-foreground">
              <CalendarIcon className="w-4 h-4 text-primary" /> Today, May 11
            </div>
            <button className="p-2 hover:bg-card rounded-lg text-muted-foreground"><ChevronRight className="w-4 h-4" /></button>
          </div>
          
          <div className="flex bg-muted/50 p-1 rounded-xl border border-border hidden sm:flex">
            <button 
              onClick={() => setViewMode('8h')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${viewMode === '8h' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:bg-card/50'}`}
            >
              8-Hour Shift
            </button>
            <button 
              onClick={() => setViewMode('24h')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${viewMode === '24h' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:bg-card/50'}`}
            >
              24-Hour Day
            </button>
          </div>
        </div>
      </div>

      {/* MAR Grid */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-muted/30">
              <tr>
                <th className="px-4 py-3 font-semibold border-b border-border border-r w-[250px] shrink-0 sticky left-0 bg-muted/30 z-10 backdrop-blur-md">Medication</th>
                {timeSlots24h.map(time => (
                  <th key={time} className="px-2 py-3 text-center text-xs font-bold text-muted-foreground border-b border-border border-r last:border-r-0 min-w-[80px]">
                    {time}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {medications.map((med) => (
                <tr key={med.id} className="hover:bg-muted/10 transition-colors">
                  <td className="px-4 py-4 border-r border-border sticky left-0 bg-card z-10">
                    <h4 className="font-bold text-foreground">{med.name}</h4>
                    <p className="text-xs font-medium mt-1">{med.dose} • {med.route}</p>
                    <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-wider bg-muted text-muted-foreground px-1.5 py-0.5 rounded">{med.frequency}</span>
                  </td>
                  
                  {timeSlots24h.map(time => (
                    <td key={time} className="px-2 py-2 border-r border-border last:border-r-0 align-top">
                      {getCellContent(time, med.times)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PRN Section */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm p-6">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Info className="w-5 h-5 text-primary" /> PRN (As Needed) Medications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prnMeds.map(med => (
            <div key={med.id} className="border border-border rounded-xl p-4 flex justify-between items-center bg-muted/10">
              <div>
                <h4 className="font-bold text-foreground">{med.name} <span className="text-sm font-medium ml-1 text-muted-foreground">{med.dose} {med.route}</span></h4>
                <p className="text-xs text-muted-foreground mt-1 font-medium bg-background px-2 py-0.5 rounded inline-block border border-border">For: {med.indication}</p>
                <p className="text-xs text-muted-foreground mt-2">Last given: {med.lastGiven}</p>
              </div>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
                Administer
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 items-center justify-center pt-4 text-xs font-medium text-muted-foreground">
        <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-green-500/20 border border-green-500/50 flex items-center justify-center"><Check className="w-2 h-2 text-green-700" /></div> Administered</span>
        <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-amber-500/20 border border-amber-500/50 flex items-center justify-center"><PauseCircle className="w-2 h-2 text-amber-700" /></div> Held</span>
        <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-red-500/20 border border-red-500/50 flex items-center justify-center"><XCircle className="w-2 h-2 text-red-700" /></div> Refused</span>
        <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-muted border border-border flex items-center justify-center"></div> Scheduled / Due</span>
      </div>
    </div>
  );
}
