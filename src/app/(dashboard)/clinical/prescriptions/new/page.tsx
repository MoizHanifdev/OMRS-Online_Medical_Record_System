'use client';

import { useState } from 'react';
import { ShieldAlert, AlertTriangle, Check, Search, Plus, Trash2, X, Info } from 'lucide-react';
import Link from 'next/link';

export default function NewPrescriptionPage() {
  const [medications, setMedications] = useState([
    { id: 1, drug: '', dosage: '', frequency: '', duration: '', route: 'PO' }
  ]);
  const [activeWarnings, setActiveWarnings] = useState(true); // Toggle for demo

  return (
    <div className="flex flex-col h-screen bg-muted/20 overflow-hidden">
      {/* Top Navigation */}
      <div className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/patients/1" className="text-sm font-semibold text-muted-foreground hover:text-foreground">Cancel</Link>
          <div className="h-4 w-px bg-border" />
          <h1 className="font-bold text-lg">New Prescription</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground">Save as Draft</button>
          <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 flex items-center gap-2 shadow-sm">
            Sign & Issue
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Pane - Form (60%) */}
        <div className="w-full lg:w-[60%] flex flex-col h-full overflow-y-auto bg-background custom-scrollbar">
          
          {/* Patient Context Banner */}
          <div className="bg-card border-b border-border p-6 sticky top-0 z-10 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">RF</div>
                <div>
                  <h2 className="font-bold text-lg leading-tight">Robert Fox</h2>
                  <p className="text-xs text-muted-foreground font-mono">OMRS-2026-001 • 42y Male</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Latest eGFR</p>
                <p className="font-bold text-amber-600">45 mL/min <span className="text-xs font-normal">(Stage 3 CKD)</span></p>
              </div>
            </div>
            
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5 animate-pulse" />
              <div>
                <p className="text-sm font-bold text-red-700">Allergies Present</p>
                <p className="text-xs text-red-600/80">Penicillin (Life-Threatening), Shellfish (Moderate)</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Medications List */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Medications</h3>
              
              {medications.map((med, i) => (
                <div key={med.id} className="bg-card border border-border rounded-xl p-5 shadow-sm relative group">
                  <button className="absolute top-4 right-4 text-muted-foreground hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Drug Search */}
                    <div className="md:col-span-12">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Drug Name</label>
                      <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
                        <input type="text" placeholder="Search drug database..." defaultValue={i === 0 ? 'Metformin' : ''} className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm outline-none focus:border-primary transition-colors font-medium" />
                      </div>
                    </div>
                    
                    {/* Dosage */}
                    <div className="md:col-span-3">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Dosage</label>
                      <input type="text" placeholder="e.g., 500mg" defaultValue={i === 0 ? '500mg' : ''} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm outline-none focus:border-primary transition-colors" />
                    </div>
                    
                    {/* Route */}
                    <div className="md:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Route</label>
                      <select defaultValue="PO" className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm outline-none focus:border-primary transition-colors">
                        <option value="PO">PO</option>
                        <option value="IV">IV</option>
                        <option value="IM">IM</option>
                        <option value="SC">SC</option>
                        <option value="TOP">Topical</option>
                      </select>
                    </div>

                    {/* Frequency */}
                    <div className="md:col-span-4">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Frequency</label>
                      <select defaultValue={i === 0 ? 'BD' : 'OD'} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm outline-none focus:border-primary transition-colors">
                        <option value="OD">OD (Once daily)</option>
                        <option value="BD">BD (Twice daily)</option>
                        <option value="TID">TID (Three times daily)</option>
                        <option value="QID">QID (Four times daily)</option>
                        <option value="PRN">PRN (As needed)</option>
                      </select>
                    </div>

                    {/* Duration */}
                    <div className="md:col-span-3">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Duration</label>
                      <input type="text" placeholder="e.g., 30 days" defaultValue={i === 0 ? '30 days' : ''} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm outline-none focus:border-primary transition-colors" />
                    </div>

                    {/* Instructions */}
                    <div className="md:col-span-12 mt-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Special Instructions</label>
                      <input type="text" placeholder="e.g., Take with food" defaultValue={i === 0 ? 'Take with food' : ''} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm outline-none focus:border-primary transition-colors" />
                    </div>
                  </div>
                </div>
              ))}
              
              <button 
                onClick={() => setMedications([...medications, { id: Date.now(), drug: '', dosage: '', frequency: '', duration: '', route: 'PO' }])}
                className="w-full py-3 border-2 border-dashed border-border rounded-xl text-sm font-bold text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Medication
              </button>
            </div>

            <div className="space-y-4 pt-6 border-t border-border">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Diagnosis / Indication</label>
                <input type="text" placeholder="Search ICD-10 codes..." defaultValue="Type 2 diabetes mellitus (E11.9)" className="w-full px-3 py-2 bg-card border border-border rounded-lg text-sm outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Doctor&apos;s Notes</label>
                <textarea placeholder="Optional notes for pharmacy or record..." className="w-full px-3 py-2 bg-card border border-border rounded-lg text-sm outline-none focus:border-primary transition-colors min-h-[80px]" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Pane - Preview & Alerts (40%) */}
        <div className="hidden lg:flex w-[40%] flex-col border-l border-border bg-muted/30">
          
          {/* Safety Alerts Sidebar */}
          {activeWarnings && (
            <div className="p-4 bg-background border-b border-border shadow-sm">
              <h3 className="font-bold text-sm mb-3 flex items-center gap-2"><ShieldAlert className="w-4 h-4 text-amber-500" /> Safety Checks</h3>
              <div className="space-y-2">
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-bold text-amber-700">RENAL ADJUSTMENT NEEDED</span>
                  </div>
                  <p className="text-xs text-amber-700/90">Patient eGFR is 45 mL/min. Metformin dose should not exceed 1000mg/day.</p>
                </div>
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Info className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-bold text-blue-700">SUGGESTION</span>
                  </div>
                  <p className="text-xs text-blue-700/90">Generic substitution is permitted per formulary.</p>
                </div>
              </div>
            </div>
          )}

          {/* Rx Preview */}
          <div className="flex-1 overflow-y-auto p-8 flex justify-center items-start custom-scrollbar">
            <div className="bg-white w-full max-w-md shadow-lg rounded border border-gray-200 min-h-[600px] p-8 text-black font-sans relative">
              {/* Header */}
              <div className="border-b-2 border-black pb-4 mb-4 text-center">
                <h2 className="text-xl font-bold tracking-tight">OMRS Medical Center</h2>
                <p className="text-xs text-gray-600">123 Health Ave, Medical District, NY 10001</p>
                <p className="text-xs text-gray-600">Ph: (555) 123-4567 | Fax: (555) 123-4568</p>
              </div>

              {/* Patient Info */}
              <div className="flex justify-between text-sm mb-6 pb-4 border-b border-gray-200">
                <div>
                  <p className="font-bold">Robert Fox</p>
                  <p className="text-xs text-gray-600">DOB: 12/05/1983 (42y)</p>
                  <p className="text-xs text-gray-600">MRN: OMRS-2026-001</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-600">Date: {new Date().toLocaleDateString()}</p>
                </div>
              </div>

              {/* Rx Symbol */}
              <div className="text-4xl font-serif font-bold italic mb-6">℞</div>

              {/* Items */}
              <div className="space-y-6">
                <div className="pl-4">
                  <p className="font-bold text-lg">Metformin <span className="font-normal text-sm text-gray-600">500mg</span></p>
                  <p className="text-sm mt-1 leading-relaxed"><span className="font-semibold">Sig:</span> Take 1 tablet by mouth twice daily for 30 days.</p>
                  <p className="text-sm mt-1 italic text-gray-700">Take with food.</p>
                  <div className="flex justify-between items-center mt-2 text-xs font-semibold">
                    <span>Dispense: 60 tablets</span>
                    <span>Refills: 0</span>
                  </div>
                </div>
              </div>

              {/* Footer / Signature */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex justify-between items-end border-t border-gray-300 pt-4">
                  <div className="w-1/2">
                    <p className="text-xs text-gray-500 mb-1">Prescriber Signature</p>
                    <div className="h-10 border-b border-gray-400 border-dashed"></div>
                    <p className="font-bold text-sm mt-1">Dr. Sarah Smith, MD</p>
                    <p className="text-xs text-gray-600">License: #MD123456</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-mono text-gray-500 bg-gray-100 p-1 rounded">RX-PREVIEW</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
