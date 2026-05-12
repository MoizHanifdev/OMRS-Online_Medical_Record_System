'use client';

import { useState } from 'react';
import { ChevronRight, ShieldAlert, AlertTriangle, Check, Plus, Trash2, Calendar as CalendarIcon, Clock, Accessibility } from 'lucide-react';
import Link from 'next/link';

export default function NewRadiologyOrderPage() {
  const [selectedModality, setSelectedModality] = useState('X-Ray');
  const [selectedBodyPart, setSelectedBodyPart] = useState('Chest');
  const [requiresContrast, setRequiresContrast] = useState(false);

  const modalities = ['X-Ray', 'CT Scan', 'MRI', 'Ultrasound', 'Mammogram', 'DEXA', 'Fluoroscopy', 'Nuclear Medicine'];
  
  return (
    <div className="flex flex-col h-screen bg-muted/20 overflow-hidden">
      {/* Top Navigation */}
      <div className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/patients/1" className="text-sm font-semibold text-muted-foreground hover:text-foreground">Cancel</Link>
          <div className="h-4 w-px bg-border" />
          <h1 className="font-bold text-lg">New Radiology Order</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground">Save Draft</button>
          <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 flex items-center gap-2 shadow-sm">
            Submit Order
          </button>
        </div>
      </div>

      {/* Patient Banner */}
      <div className="bg-card border-b border-border p-4 shrink-0 flex justify-between items-center z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">RF</div>
          <div>
            <h2 className="font-bold leading-tight">Robert Fox</h2>
            <p className="text-xs text-muted-foreground font-mono">OMRS-2026-001 • 42y Male</p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Pane - Modality & Body Part (30%) */}
        <div className="w-1/3 flex flex-col h-full border-r border-border bg-card overflow-y-auto custom-scrollbar">
          <div className="p-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">1. Select Modality</h3>
            <div className="grid grid-cols-2 gap-2 mb-8">
              {modalities.map(mod => (
                <button 
                  key={mod} 
                  onClick={() => setSelectedModality(mod)}
                  className={`px-3 py-2 text-sm font-semibold rounded-lg border text-left transition-colors ${selectedModality === mod ? 'bg-primary/10 border-primary text-primary' : 'bg-background border-border hover:bg-muted text-foreground'}`}
                >
                  {mod}
                </button>
              ))}
            </div>

            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">2. Select Body Part</h3>
            
            {/* Visual Human Body Selector Stub */}
            <div className="bg-muted/30 border border-border rounded-xl p-4 mb-4 flex justify-center">
               <div className="relative w-32 h-64 border-2 border-dashed border-muted-foreground/30 rounded-full flex items-center justify-center text-muted-foreground opacity-50">
                 <Accessibility className="w-24 h-24" />
                 <span className="absolute top-1/4 text-[10px] font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded">Chest</span>
               </div>
            </div>

            <select className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm outline-none focus:border-primary transition-colors" value={selectedBodyPart} onChange={(e) => setSelectedBodyPart(e.target.value)}>
              <option value="Head">Head / Brain</option>
              <option value="Neck">Neck</option>
              <option value="Chest">Chest / Thorax</option>
              <option value="Abdomen">Abdomen</option>
              <option value="Pelvis">Pelvis</option>
              <option value="Spine">Spine</option>
              <option value="Upper Extremity">Upper Extremity</option>
              <option value="Lower Extremity">Lower Extremity</option>
            </select>
          </div>
        </div>

        {/* Center Pane - Specifics & Contrast (40%) */}
        <div className="w-2/5 flex flex-col h-full border-r border-border bg-muted/10 overflow-y-auto custom-scrollbar">
          <div className="p-6 space-y-6">
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-lg mb-1">{selectedModality} {selectedBodyPart}</h3>
              <p className="text-xs text-muted-foreground mb-4">Select protocol and views</p>
              
              <div className="space-y-2">
                <label className="flex items-center gap-2 p-3 border border-border rounded-lg bg-background cursor-pointer hover:bg-muted/50 transition-colors">
                  <input type="radio" name="protocol" defaultChecked className="w-4 h-4 text-primary focus:ring-primary border-border" />
                  <span className="text-sm font-medium">Standard Views (PA and Lateral)</span>
                </label>
                <label className="flex items-center gap-2 p-3 border border-border rounded-lg bg-background cursor-pointer hover:bg-muted/50 transition-colors">
                  <input type="radio" name="protocol" className="w-4 h-4 text-primary focus:ring-primary border-border" />
                  <span className="text-sm font-medium">Single View (AP or PA)</span>
                </label>
                <label className="flex items-center gap-2 p-3 border border-border rounded-lg bg-background cursor-pointer hover:bg-muted/50 transition-colors">
                  <input type="radio" name="protocol" className="w-4 h-4 text-primary focus:ring-primary border-border" />
                  <span className="text-sm font-medium">Portable (AP only)</span>
                </label>
              </div>
            </div>

            {selectedModality === 'CT Scan' || selectedModality === 'MRI' ? (
              <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold">Contrast Required?</h3>
                  <div className="flex bg-muted/50 p-1 rounded-xl border border-border">
                    <button onClick={() => setRequiresContrast(false)} className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-colors ${!requiresContrast ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:bg-card/50'}`}>No</button>
                    <button onClick={() => setRequiresContrast(true)} className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-colors ${requiresContrast ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:bg-card/50'}`}>Yes</button>
                  </div>
                </div>

                {requiresContrast && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                    <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-amber-700">Contrast Warning</p>
                        <p className="text-xs text-amber-600 mt-1">Patient&apos;s last eGFR is 45 mL/min (Stage 3 CKD). Consult radiology regarding contrast-induced nephropathy risk before proceeding.</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Contrast Agent</label>
                      <select className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm outline-none focus:border-primary transition-colors">
                        <option>IV Contrast (Iodinated)</option>
                        <option>Oral Contrast (Barium)</option>
                        <option>Both IV and Oral</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            ) : null}

          </div>
        </div>

        {/* Right Pane - Metadata (30%) */}
        <div className="w-[30%] flex flex-col h-full bg-card overflow-y-auto custom-scrollbar">
          <div className="p-6 space-y-6">
            <h3 className="font-bold text-lg border-b border-border pb-2">Order Details</h3>
            
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Priority</label>
              <div className="flex bg-muted/50 p-1 rounded-xl border border-border">
                <button className="flex-1 px-3 py-1.5 rounded-lg text-sm font-bold bg-card text-foreground shadow-sm">Routine</button>
                <button className="flex-1 px-3 py-1.5 rounded-lg text-sm font-bold text-muted-foreground hover:text-amber-600 transition-colors">Urgent</button>
                <button className="flex-1 px-3 py-1.5 rounded-lg text-sm font-bold text-muted-foreground hover:text-red-600 transition-colors">STAT</button>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Clinical Indication <span className="text-red-500">*</span></label>
              <textarea placeholder="Specific reason for study (e.g. Cough x 2 weeks, R/O pneumonia)..." className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm outline-none focus:border-primary transition-colors min-h-[100px]" />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Compare with Previous Studies</label>
              <div className="p-3 border border-border rounded-lg bg-background flex flex-wrap gap-2 text-sm text-muted-foreground">
                <label className="flex items-center gap-2 cursor-pointer w-full">
                  <input type="checkbox" className="rounded border-border text-primary focus:ring-primary" />
                  Chest X-Ray (Dec 15, 2025)
                </label>
                <label className="flex items-center gap-2 cursor-pointer w-full">
                  <input type="checkbox" className="rounded border-border text-primary focus:ring-primary" />
                  Chest X-Ray (Aug 01, 2025)
                </label>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
