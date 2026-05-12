'use client';

import { useState } from 'react';
import { Search, ChevronRight, Activity, Plus, Check, Info, Trash2, Calendar as CalendarIcon, Clock, ShieldAlert, X } from 'lucide-react';
import Link from 'next/link';

export default function NewLabOrderPage() {
  const [selectedTests, setSelectedTests] = useState<{id: string, name: string, code: string}[]>([]);

  const toggleTest = (test: {id: string, name: string, code: string}) => {
    if (selectedTests.find(t => t.id === test.id)) {
      setSelectedTests(selectedTests.filter(t => t.id !== test.id));
    } else {
      setSelectedTests([...selectedTests, test]);
    }
  };

  const addPanel = (tests: {id: string, name: string, code: string}[]) => {
    const newTests = tests.filter(t => !selectedTests.find(st => st.id === t.id));
    setSelectedTests([...selectedTests, ...newTests]);
  };

  return (
    <div className="flex flex-col h-screen bg-muted/20 overflow-hidden">
      {/* Top Navigation */}
      <div className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/patients/1" className="text-sm font-semibold text-muted-foreground hover:text-foreground">Cancel</Link>
          <div className="h-4 w-px bg-border" />
          <h1 className="font-bold text-lg">New Lab Order</h1>
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
        {selectedTests.some(t => t.name.includes('Glucose') || t.name.includes('Lipid')) && (
          <div className="bg-amber-500/10 border border-amber-500/20 text-amber-700 px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-bold">
            <Clock className="w-4 h-4" /> Fasting Required (8-12 hours)
          </div>
        )}
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Pane - Catalog (30%) */}
        <div className="w-1/3 flex flex-col h-full border-r border-border bg-card">
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
              <input type="text" placeholder="Search 80+ tests..." className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm outline-none focus:border-primary transition-colors font-medium" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
            {[
              { category: 'Biochemistry', tests: [{ id: 't1', name: 'Glucose, Fasting', code: 'GLU' }, { id: 't2', name: 'HbA1c', code: 'A1C' }] },
              { category: 'Hematology', tests: [{ id: 't3', name: 'Complete Blood Count', code: 'CBC' }, { id: 't4', name: 'ESR', code: 'ESR' }] },
              { category: 'Lipid Profile', tests: [{ id: 't5', name: 'Cholesterol, Total', code: 'CHOL' }, { id: 't6', name: 'Triglycerides', code: 'TRIG' }] }
            ].map(group => (
              <div key={group.category} className="mb-2">
                <div className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-muted-foreground hover:bg-muted/50 rounded-lg cursor-pointer">
                  <ChevronRight className="w-4 h-4" /> {group.category}
                </div>
                <div className="pl-6 space-y-1 mt-1">
                  {group.tests.map(test => {
                    const isSelected = selectedTests.some(t => t.id === test.id);
                    return (
                      <div key={test.id} onClick={() => toggleTest(test)} className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors ${isSelected ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-muted text-foreground'}`}>
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded border flex items-center justify-center ${isSelected ? 'bg-primary border-primary text-primary-foreground' : 'border-border bg-background'}`}>
                            {isSelected && <Check className="w-3 h-3" />}
                          </div>
                          {test.name}
                        </div>
                        <Info className="w-4 h-4 text-muted-foreground/50 hover:text-primary" />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center Pane - Selection (40%) */}
        <div className="w-2/5 flex flex-col h-full border-r border-border bg-muted/10">
          <div className="p-4 border-b border-border bg-card">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Panel Shortcuts</h3>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => addPanel([{id:'t3', name:'CBC', code:'CBC'}])} className="text-xs font-semibold px-3 py-1.5 bg-background border border-border hover:border-primary/50 hover:bg-primary/5 rounded-lg transition-colors">CBC</button>
              <button onClick={() => addPanel([{id:'t1', name:'Glucose', code:'GLU'},{id:'t2', name:'HbA1c', code:'A1C'}])} className="text-xs font-semibold px-3 py-1.5 bg-background border border-border hover:border-primary/50 hover:bg-primary/5 rounded-lg transition-colors">Diabetic Panel</button>
              <button onClick={() => addPanel([{id:'t5', name:'Cholesterol', code:'CHOL'},{id:'t6', name:'Trigs', code:'TRIG'}])} className="text-xs font-semibold px-3 py-1.5 bg-background border border-border hover:border-primary/50 hover:bg-primary/5 rounded-lg transition-colors">Lipid Panel</button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Selected Tests</h3>
              <span className="text-xs font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded-full">{selectedTests.length}</span>
            </div>
            
            {selectedTests.length === 0 ? (
              <div className="h-40 flex flex-col items-center justify-center text-center text-muted-foreground border-2 border-dashed border-border rounded-xl">
                <Activity className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-sm">Select tests from the catalog<br/>or use a panel shortcut</p>
              </div>
            ) : (
              <div className="space-y-2">
                {selectedTests.map((test, index) => (
                  <div key={test.id} className="bg-card border border-border rounded-xl p-3 flex items-center justify-between shadow-sm group">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-muted-foreground w-4">{index + 1}.</span>
                      <div>
                        <p className="font-semibold text-sm">{test.name}</p>
                        <p className="text-[10px] font-mono text-muted-foreground">{test.code}</p>
                      </div>
                    </div>
                    <button onClick={() => toggleTest(test)} className="text-muted-foreground hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
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
              <textarea placeholder="Reason for tests..." className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm outline-none focus:border-primary transition-colors min-h-[80px]" />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">ICD-10 Diagnoses</label>
              <div className="p-3 border border-border rounded-lg bg-background flex flex-wrap gap-2">
                <span className="bg-muted px-2 py-1 rounded text-xs font-medium flex items-center gap-1 cursor-pointer">Type 2 Diabetes <X className="w-3 h-3 text-muted-foreground" /></span>
                <input type="text" placeholder="Add diagnosis..." className="text-sm bg-transparent outline-none min-w-[120px]" />
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <div className="bg-muted/30 border border-border rounded-xl p-4">
                <h4 className="text-sm font-bold mb-3 flex items-center justify-between">Estimated Cost <span className="text-muted-foreground text-xs font-normal">Self-Pay</span></h4>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-bold tracking-tight">${selectedTests.length * 15}</span>
                  <span className="text-xs text-muted-foreground mb-1">Total out of pocket</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
