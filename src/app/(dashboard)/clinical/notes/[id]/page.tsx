'use client';

import { Printer, Download, Share2, Send, Edit, FileText, Activity, ShieldCheck, History } from 'lucide-react';
import Link from 'next/link';

export default function NoteViewPage({ params }: { params: { id: string } }) {
  const noteId = params.id;

  return (
    <div className="flex flex-col h-screen bg-muted/20 overflow-hidden">
      {/* Top Navigation */}
      <div className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/patients/1/notes" className="text-sm font-semibold text-muted-foreground hover:text-foreground">Back to Notes</Link>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-700 px-2 py-0.5 rounded border border-blue-500/20">Progress Note</span>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-700 px-2 py-0.5 rounded border border-emerald-500/20">Signed</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors" title="Print"><Printer className="w-5 h-5" /></button>
          <button className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors" title="Download PDF"><Download className="w-5 h-5" /></button>
          <button className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors" title="Share"><Share2 className="w-5 h-5" /></button>
          <div className="h-4 w-px bg-border mx-2" />
          <button className="px-4 py-2 bg-background border border-border text-foreground rounded-lg text-sm font-semibold hover:bg-muted flex items-center gap-2 shadow-sm transition-colors">
            <Send className="w-4 h-4" /> Route
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 flex items-center gap-2 shadow-sm transition-colors">
            <Edit className="w-4 h-4" /> Amend Note
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-12">
        <div className="max-w-3xl mx-auto bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          
          {/* Note Header / Meta */}
          <div className="px-8 py-6 border-b border-border bg-muted/10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2 leading-tight">Follow-up for Pneumonia</h1>
                <div className="flex gap-4 text-sm font-medium text-muted-foreground">
                  <span>May 11, 2026 at 09:30 AM</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg leading-tight text-foreground">Robert Fox</p>
                <p className="text-xs font-mono text-muted-foreground">OMRS-2026-001</p>
                <p className="text-xs text-muted-foreground">42y Male • DOB: 12/05/1983</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-card p-3 rounded-lg border border-border">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">SS</div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Author</p>
                <p className="font-semibold text-foreground">Dr. Sarah Smith, MD</p>
              </div>
            </div>
          </div>

          {/* Note Content (Rendered HTML) */}
          <div className="p-8 prose prose-sm sm:prose-base dark:prose-invert max-w-none">
            <h3 className="text-foreground border-b border-border pb-1 mb-4 mt-0 uppercase text-sm tracking-wider font-bold">Subjective</h3>
            <p className="text-foreground leading-relaxed">Patient returns today for follow up of community acquired pneumonia. Reports feeling 80% better since starting Amoxicillin. Cough has decreased significantly and sputum is now clear. Denies fever, chills, or shortness of breath.</p>
            
            {/* Embedded Snapshot Rendered view */}
            <div className="my-6 border border-border rounded-xl overflow-hidden shadow-sm select-none not-prose">
              <div className="bg-blue-500/10 px-4 py-2 border-b border-border flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 flex items-center gap-1"><Activity className="w-3 h-3" /> Vital Signs Snapshot</span>
                <span className="text-[10px] text-muted-foreground">May 11, 2026 09:15 AM</span>
              </div>
              <div className="bg-card p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div><span className="text-xs text-muted-foreground block">BP</span><span className="font-bold text-foreground">120/80</span></div>
                <div><span className="text-xs text-muted-foreground block">HR</span><span className="font-bold text-foreground">72 bpm</span></div>
                <div><span className="text-xs text-muted-foreground block">Temp</span><span className="font-bold text-foreground">98.6 °F</span></div>
                <div><span className="text-xs text-muted-foreground block">SpO2</span><span className="font-bold text-foreground">99%</span></div>
              </div>
            </div>

            <h3 className="text-foreground border-b border-border pb-1 mb-4 mt-8 uppercase text-sm tracking-wider font-bold">Objective</h3>
            <p className="text-foreground leading-relaxed">General: Well appearing, in no acute distress.</p>
            <p className="text-foreground leading-relaxed">Resp: Clear to auscultation bilaterally. No wheezes, rales, or rhonchi. Symmetric expansion.</p>
            
            <h3 className="text-foreground border-b border-border pb-1 mb-4 mt-8 uppercase text-sm tracking-wider font-bold">Assessment</h3>
            <p className="text-foreground leading-relaxed">1. <span className="bg-muted px-1.5 py-0.5 rounded text-primary font-medium cursor-pointer hover:bg-muted/80 inline-flex items-center gap-1"><FileText className="w-3 h-3" /> Pneumonia (J15.9)</span> - Resolving.</p>
            
            <h3 className="text-foreground border-b border-border pb-1 mb-4 mt-8 uppercase text-sm tracking-wider font-bold">Plan</h3>
            <p className="text-foreground leading-relaxed">- Complete current antibiotic course (3 days remaining).</p>
            <p className="text-foreground leading-relaxed">- Follow up PRN.</p>
          </div>

          {/* Signature Block */}
          <div className="border-t-2 border-border p-8 bg-muted/10 relative overflow-hidden">
            {/* Visual Signed Stamp */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none rotate-[-15deg]">
              <div className="border-4 border-emerald-600 text-emerald-600 rounded-lg p-2 font-bold text-4xl uppercase tracking-widest inline-block transform">
                Signed
              </div>
            </div>

            <div className="relative z-10 w-1/2">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-2">Electronically Signed By</p>
              <div className="h-12 border-b border-dashed border-gray-400 mb-2 flex items-end pb-1 text-xl font-[signature] text-foreground">
                Sarah Smith
              </div>
              <p className="font-bold text-foreground">Dr. Sarah Smith, MD</p>
              <p className="text-xs text-muted-foreground">Signed on May 11, 2026 at 09:42 AM</p>
              
              <div className="mt-4 flex items-center gap-2 text-[10px] text-emerald-700 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded inline-flex font-mono">
                <ShieldCheck className="w-3 h-3" /> Hash verified: a8f4...9c2b
              </div>
            </div>
          </div>
        </div>

        {/* Audit Trail Section */}
        <div className="max-w-3xl mx-auto mt-6 bg-card border border-border rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-bold flex items-center gap-2 mb-4 border-b border-border pb-2"><History className="w-4 h-4" /> Audit Trail</h3>
          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-primary bg-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
              <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-lg border border-border bg-muted/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-foreground">Note Signed</span>
                  <span className="text-[10px] text-muted-foreground">09:42 AM</span>
                </div>
                <p className="text-[10px] text-muted-foreground">Dr. Sarah Smith</p>
              </div>
            </div>
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-border bg-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
              <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-lg border border-transparent hover:border-border transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-foreground">Note Created</span>
                  <span className="text-[10px] text-muted-foreground">09:30 AM</span>
                </div>
                <p className="text-[10px] text-muted-foreground">Dr. Sarah Smith</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
