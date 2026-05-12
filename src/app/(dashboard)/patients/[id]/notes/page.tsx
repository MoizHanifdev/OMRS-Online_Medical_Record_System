'use client';

import { useState } from 'react';
import { Plus, Search, FileText, Download, MoreVertical, Filter, Stethoscope, FileUp, Hash } from 'lucide-react';
import Link from 'next/link';
import { BaseWidget } from '@/components/widgets/BaseWidget';

export default function NotesTab({ params }: { params: { id: string } }) {
  const patientId = params.id;
  const [activeFilter, setActiveFilter] = useState('All');

  const notes = [
    { id: 'NOTE-1', type: 'Progress Note', status: 'Signed', date: 'Today, 09:30 AM', author: 'Dr. Sarah Smith', body: 'Patient presents with worsening cough for 2 weeks. Productive of yellow sputum. Denies fever. Vitals stable...', attachments: 0, comments: 0 },
    { id: 'NOTE-2', type: 'Admission Note', status: 'Draft', date: 'Yesterday, 14:15 PM', author: 'Dr. Sarah Smith', body: '42yo male admitted from ED with suspected community acquired pneumonia. History of asthma. Current meds include Albuterol...', attachments: 1, comments: 2 },
    { id: 'NOTE-3', type: 'Consultation Note', status: 'Pending Cosign', date: 'May 08, 2026', author: 'Dr. James Resident', body: 'Consultation for uncontrolled hypertension. Patient reports poor adherence to Lisinopril due to dry cough. Blood pressure elevated today...', attachments: 0, comments: 1 },
    { id: 'NOTE-4', type: 'Procedure Note', status: 'Amended', date: 'May 01, 2026', author: 'Dr. John Doe', body: 'Incision and drainage of abscess on right thigh. Local anesthesia with 1% lidocaine. 10cc purulent fluid drained. Packed with iodoform...', attachments: 2, comments: 0 }
  ];

  const getTypeStyle = (type: string) => {
    switch(type) {
      case 'Progress Note': return 'bg-blue-500/10 text-blue-700 border-blue-500/20';
      case 'Admission Note': return 'bg-green-500/10 text-green-700 border-green-500/20';
      case 'Consultation Note': return 'bg-teal-500/10 text-teal-700 border-teal-500/20';
      case 'Procedure Note': return 'bg-orange-500/10 text-orange-700 border-orange-500/20';
      case 'Discharge Note': return 'bg-purple-500/10 text-purple-700 border-purple-500/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'Draft': return 'bg-gray-500/10 text-gray-700 border-gray-500/20';
      case 'Signed': return 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20';
      case 'Pending Cosign': return 'bg-amber-500/10 text-amber-700 border-amber-500/20';
      case 'Amended': return 'bg-blue-500/10 text-blue-700 border-blue-500/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Clinical Notes</h2>
          <p className="text-muted-foreground">{notes.length} total, 1 draft, 1 pending</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-border bg-card rounded-lg text-sm font-medium hover:bg-muted flex items-center gap-2">
            <FileUp className="w-4 h-4" /> Import Document
          </button>
          <Link href={`/clinical/notes/new?patientId=${patientId}&type=PROGRESS`} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 flex items-center gap-2 shadow-sm">
            <Plus className="w-4 h-4" /> New Note
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-3 rounded-2xl border border-border shadow-sm">
        <div className="flex overflow-x-auto scrollbar-hide gap-2 w-full md:w-auto pb-2 md:pb-0">
          {['All', 'Progress', 'Admission', 'Procedure', 'Drafts'].map(filter => (
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
            <input type="text" placeholder="Search full text..." className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-transparent focus:border-primary rounded-xl text-sm outline-none transition-all" />
          </div>
          <button className="p-2 border border-border bg-muted/50 rounded-xl text-muted-foreground hover:text-foreground">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {notes.map(note => (
          <div key={note.id} className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group cursor-pointer relative overflow-hidden" onClick={() => window.location.href=`/clinical/notes/${note.id}`}>
            
            {/* Visual indicator line for status */}
            {note.status === 'Draft' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-400" />}
            {note.status === 'Pending Cosign' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500" />}
            
            <div className="flex justify-between items-start mb-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border ${getTypeStyle(note.type)}`}>{note.type}</span>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border flex items-center gap-1 ${getStatusStyle(note.status)}`}>
                  {note.status}
                </span>
                <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                  <Hash className="w-3 h-3" /> {note.id}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-foreground">{note.date}</span>
                <button className="p-1 text-muted-foreground hover:text-foreground rounded"><MoreVertical className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="mb-3">
              <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors leading-tight mb-1">
                {note.type === 'Progress Note' ? 'Follow-up for Pneumonia' : note.type}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{note.body}</p>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-border">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-[10px]"><Stethoscope className="w-3 h-3" /></div>
                <span className="text-xs font-semibold text-foreground">{note.author}</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                {note.attachments > 0 && <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> {note.attachments} files</span>}
                {note.comments > 0 && <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[8px]">{note.comments}</span> comments</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
