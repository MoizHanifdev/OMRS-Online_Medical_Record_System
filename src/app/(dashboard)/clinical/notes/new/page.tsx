'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, Save, CheckCircle, FileText, Clock, AlertTriangle, Stethoscope, ChevronRight, Activity, FlaskConical, Pill, Image as ImageIcon, Mic } from 'lucide-react';
import Link from 'next/link';

export default function NewNoteEditorPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');
  const [content, setContent] = useState('');

  // Mock autosave
  useEffect(() => {
    if (content) {
      setSaveStatus('saving');
      const timer = setTimeout(() => setSaveStatus('saved'), 1000);
      return () => clearTimeout(timer);
    }
  }, [content]);

  return (
    <div className="flex flex-col h-screen bg-muted/10 overflow-hidden">
      {/* Header */}
      <div className="h-16 bg-card border-b border-border flex items-center justify-between px-4 sm:px-6 shrink-0 z-20 shadow-sm relative">
        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
          <Link href="/patients/1/notes" className="text-sm font-semibold text-muted-foreground hover:text-foreground hidden sm:block">Cancel</Link>
          <div className="h-4 w-px bg-border hidden sm:block" />
          <div className="flex flex-col">
            <h1 className="font-bold text-sm sm:text-lg truncate">New Progress Note</h1>
            <p className="text-[10px] sm:text-xs text-muted-foreground font-mono">Robert Fox • OMRS-2026-001</p>
          </div>
        </div>

        {/* Autosave Indicator */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-muted/50 border border-border">
          {saveStatus === 'saving' ? (
            <><div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" /> Saving...</>
          ) : (
            <><CheckCircle className="w-3 h-3 text-green-500" /> Saved</>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground border border-border rounded-lg bg-card shadow-sm hidden md:block">
            Use Template
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 flex items-center gap-2 shadow-sm">
            Sign & Lock
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Editor Area (75%) */}
        <div className={`flex flex-col h-full transition-all duration-300 ${isSidebarOpen ? 'w-full lg:w-3/4' : 'w-full'} border-r border-border bg-background relative`}>
          
          {/* Mock Tiptap Toolbar */}
          <div className="h-12 bg-card border-b border-border flex items-center px-4 gap-1 overflow-x-auto scrollbar-hide shrink-0 shadow-sm z-10">
            <select className="text-xs font-semibold bg-transparent outline-none border-r border-border pr-2 mr-2 py-1 cursor-pointer hover:bg-muted/50 rounded">
              <option>Paragraph</option>
              <option>Heading 1</option>
              <option>Heading 2</option>
            </select>
            <div className="flex items-center gap-0.5 border-r border-border pr-2 mr-2">
              <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted font-bold text-sm">B</button>
              <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted italic text-sm">I</button>
              <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted underline text-sm">U</button>
            </div>
            <div className="flex items-center gap-0.5 border-r border-border pr-2 mr-2">
              <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted text-sm" title="Insert Snapshot"><Activity className="w-4 h-4 text-blue-500" /></button>
              <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted text-sm" title="Voice Dictation"><Mic className="w-4 h-4 text-red-500" /></button>
            </div>
            <div className="text-xs font-medium text-muted-foreground ml-auto bg-muted/50 px-2 py-1 rounded">
              Type <span className="font-bold text-foreground">/</span> for commands
            </div>
          </div>

          {/* Editor Canvas */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-12">
            <div className="max-w-3xl mx-auto">
              
              {/* Note Metadata Block */}
              <div className="mb-8 space-y-4">
                <input type="text" placeholder="Note Title (e.g., Follow-up for Hypertension)" className="w-full text-2xl sm:text-3xl font-bold bg-transparent outline-none border-b border-transparent hover:border-border focus:border-primary transition-colors pb-2 placeholder:text-muted-foreground/40" />
                <div className="flex gap-4 text-sm font-medium text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Today, {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  <span className="flex items-center gap-1"><Stethoscope className="w-4 h-4" /> Dr. Sarah Smith</span>
                </div>
              </div>

              {/* Mock Tiptap Content Area */}
              <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none focus:outline-none min-h-[400px]" contentEditable onInput={(e) => setContent(e.currentTarget.textContent || '')}>
                <h3>Subjective</h3>
                <p>Patient returns today for follow up of community acquired pneumonia. Reports feeling 80% better since starting Amoxicillin. Cough has decreased significantly and sputum is now clear. Denies fever, chills, or shortness of breath.</p>
                <p><br/></p>
                
                {/* Mock Clinical Snapshot Node */}
                <div contentEditable={false} className="my-6 border border-border rounded-xl overflow-hidden shadow-sm select-none">
                  <div className="bg-blue-500/10 px-4 py-2 border-b border-border flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 flex items-center gap-1"><Activity className="w-3 h-3" /> Vital Signs Snapshot</span>
                    <span className="text-[10px] text-muted-foreground">Taken 10 mins ago</span>
                  </div>
                  <div className="bg-card p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                    <div><span className="text-xs text-muted-foreground block">BP</span><span className="font-bold text-foreground">120/80</span></div>
                    <div><span className="text-xs text-muted-foreground block">HR</span><span className="font-bold text-foreground">72 bpm</span></div>
                    <div><span className="text-xs text-muted-foreground block">Temp</span><span className="font-bold text-foreground">98.6 °F</span></div>
                    <div><span className="text-xs text-muted-foreground block">SpO2</span><span className="font-bold text-foreground">99%</span></div>
                  </div>
                </div>

                <h3>Objective</h3>
                <p>General: Well appearing, in no acute distress.</p>
                <p>Resp: Clear to auscultation bilaterally. No wheezes, rales, or rhonchi. Symmetric expansion.</p>
                <p><br/></p>
                <h3>Assessment</h3>
                <p>1. <span className="bg-muted px-1 rounded text-primary cursor-pointer hover:bg-muted/80">#Pneumonia</span> - Resolving.</p>
                <p><br/></p>
                <h3>Plan</h3>
                <p>- Complete current antibiotic course (3 days remaining).</p>
                <p>- Follow up PRN.</p>
              </div>

            </div>
          </div>
          
          {/* Toggle Sidebar Button (Mobile) */}
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="lg:hidden absolute bottom-4 right-4 w-12 h-12 bg-primary text-white rounded-full shadow-lg flex items-center justify-center z-20"
          >
            <ChevronLeft className={`w-6 h-6 transition-transform ${!isSidebarOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Right Pane - Context Sidebar (25%) */}
        <div className={`w-full lg:w-1/4 h-full bg-card overflow-y-auto custom-scrollbar flex-col absolute lg:relative right-0 transition-transform duration-300 z-10 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
          <div className="p-4 border-b border-border sticky top-0 bg-card z-10 flex justify-between items-center">
            <h2 className="font-bold text-sm uppercase tracking-wider">Patient Context</h2>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-muted-foreground"><ChevronRight className="w-5 h-5" /></button>
          </div>

          <div className="p-4 space-y-6">
            {/* Allergies */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-red-500" /> Allergies</h3>
              <div className="space-y-1 text-sm">
                <div className="p-2 bg-red-500/10 border border-red-500/20 text-red-700 rounded flex justify-between items-center">
                  <span className="font-semibold">Penicillin</span>
                  <span className="text-[10px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded">High</span>
                </div>
              </div>
            </div>

            {/* Active Problems */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1"><FileText className="w-3 h-3" /> Active Problems</h3>
              <div className="space-y-2 text-sm border border-border rounded-lg p-3 bg-muted/10">
                <p className="font-medium text-foreground">Type 2 Diabetes Mellitus</p>
                <p className="font-medium text-foreground">Essential Hypertension</p>
                <p className="font-medium text-foreground">Community Acquired Pneumonia</p>
              </div>
            </div>

            {/* Meds */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1"><Pill className="w-3 h-3" /> Active Medications</h3>
              <div className="space-y-2 text-sm border border-border rounded-lg p-3 bg-muted/10">
                <div className="flex justify-between items-start border-b border-border pb-2">
                  <span className="font-semibold text-foreground leading-tight">Metformin <span className="block text-xs font-normal text-muted-foreground">500mg BD</span></span>
                </div>
                <div className="flex justify-between items-start border-b border-border pb-2 pt-1">
                  <span className="font-semibold text-foreground leading-tight">Lisinopril <span className="block text-xs font-normal text-muted-foreground">10mg OD</span></span>
                </div>
                <div className="flex justify-between items-start pt-1">
                  <span className="font-semibold text-foreground leading-tight">Amoxicillin <span className="block text-xs font-normal text-muted-foreground">500mg TID (3 days left)</span></span>
                </div>
              </div>
            </div>

            {/* Recent Labs */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1"><FlaskConical className="w-3 h-3" /> Recent Labs</h3>
              <div className="space-y-2 text-sm border border-border rounded-lg p-3 bg-muted/10">
                <div className="flex justify-between text-xs mb-1"><span className="text-muted-foreground">Today</span></div>
                <div className="flex justify-between items-center"><span className="font-medium">WBC</span> <span className="font-bold text-foreground">11.2 <span className="text-[10px] bg-red-500/10 text-red-600 px-1 rounded ml-1">H</span></span></div>
                <div className="flex justify-between items-center"><span className="font-medium">Glucose</span> <span className="font-bold text-foreground">95</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
