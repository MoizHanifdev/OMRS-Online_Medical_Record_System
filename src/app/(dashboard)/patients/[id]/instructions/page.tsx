'use client';

import { useState } from 'react';
import { Plus, Search, Filter, BookHeart, FileCheck, Languages, Printer, Send, Clock, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function PatientInstructionsPage({ params }: { params: { id: string } }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const instructions = [
    { id: 'INST-1', title: 'Diabetic Diet Guidelines', type: 'Lifestyle', date: 'May 11, 2026', author: 'Dietitian Mary', lang: 'EN, UR', ackStatus: 'Pending', reqAck: true },
    { id: 'INST-2', title: 'How to use your Lantus Pen', type: 'Medication', date: 'Jan 10, 2026', author: 'Nurse Aisha', lang: 'EN', ackStatus: 'Acknowledged', reqAck: true, ackDate: 'Jan 10, 2026' },
    { id: 'INST-3', title: 'Pneumonia Recovery Guide', type: 'Post-Discharge', date: 'Nov 15, 2025', author: 'Dr. Sarah Smith', lang: 'EN, UR', ackStatus: 'Not Required', reqAck: false },
    { id: 'INST-4', title: 'Pre-surgery Fasting Instructions', type: 'Pre-Procedure', date: 'Aug 05, 2025', author: 'Surgical Team', lang: 'EN', ackStatus: 'Acknowledged', reqAck: true, ackDate: 'Aug 06, 2025' }
  ];

  const getTypeStyle = (type: string) => {
    switch(type) {
      case 'Lifestyle': return 'bg-purple-500/10 text-purple-700 border-purple-500/20';
      case 'Medication': return 'bg-blue-500/10 text-blue-700 border-blue-500/20';
      case 'Post-Discharge': return 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20';
      case 'Pre-Procedure': return 'bg-orange-500/10 text-orange-700 border-orange-500/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Patient Instructions</h2>
          <p className="text-muted-foreground">Educational materials and care guides</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 flex items-center gap-2 shadow-sm">
            <Plus className="w-4 h-4" /> New Instruction
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-3 rounded-2xl border border-border shadow-sm">
        <div className="flex overflow-x-auto scrollbar-hide gap-2 w-full md:w-auto pb-2 md:pb-0">
          {['All', 'Pre-Procedure', 'Post-Discharge', 'Medication', 'Lifestyle', 'Pending Ack'].map(filter => (
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
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64 shrink-0">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
            <input type="text" placeholder="Search instructions..." className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-transparent focus:border-primary rounded-xl text-sm outline-none transition-all" />
          </div>
          <button className="p-2 border border-border bg-muted/50 rounded-xl text-muted-foreground hover:text-foreground">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {instructions.map(inst => (
          <div key={inst.id} className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group flex flex-col justify-between cursor-pointer">
            
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getTypeStyle(inst.type)}`}>
                  {inst.type}
                </span>
                
                {inst.reqAck ? (
                  inst.ackStatus === 'Pending' ? (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-700 px-2 py-0.5 rounded border border-amber-500/20 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Pending Ack
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-700 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
                      <FileCheck className="w-3 h-3" /> Acknowledged
                    </span>
                  )
                ) : null}
              </div>
              
              <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors leading-tight mb-2">
                {inst.title}
              </h3>
              
              <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium mb-4">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {inst.date}</span>
                <span className="flex items-center gap-1"><Languages className="w-3 h-3" /> {inst.lang}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <span className="text-xs font-semibold text-foreground">By {inst.author}</span>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button className="p-1.5 text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted rounded transition-colors" title="Print"><Printer className="w-4 h-4" /></button>
                 <button className="p-1.5 text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted rounded transition-colors" title="Send to Patient Portal"><Send className="w-4 h-4" /></button>
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
