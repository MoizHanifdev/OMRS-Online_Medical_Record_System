'use client';

import { useState } from 'react';
import { AlertTriangle, Check, Printer, Save, ChevronLeft, Barcode, FlaskConical, Beaker, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function LabResultEntryPage({ params }: { params: { id: string } }) {
  const orderId = params.id;
  const [criticalFlag, setCriticalFlag] = useState(false);

  const tests = [
    { id: 't1', name: 'Glucose, Random', code: 'GLU', range: '70-99', unit: 'mg/dL', type: 'numeric' },
    { id: 't2', name: 'Sodium', code: 'NA', range: '135-145', unit: 'mEq/L', type: 'numeric' },
    { id: 't3', name: 'Potassium', code: 'K', range: '3.5-5.1', unit: 'mEq/L', type: 'numeric' },
    { id: 't4', name: 'Hepatitis B Surface Antigen', code: 'HBSAG', range: 'Negative', unit: '', type: 'qualitative', options: ['Negative', 'Positive', 'Equivocal'] }
  ];

  const handleResultChange = (testId: string, value: string) => {
    // Stub logic to trigger critical flag for demo
    if (testId === 't1' && (parseInt(value) < 50 || parseInt(value) > 400)) {
      setCriticalFlag(true);
    } else if (testId === 't1') {
      setCriticalFlag(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-muted/20 overflow-hidden">
      {/* Top Navigation */}
      <div className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/lab/queue" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
            <ChevronLeft className="w-4 h-4" /> Back to Queue
          </Link>
          <div className="h-4 w-px bg-border" />
          <h1 className="font-bold text-lg font-mono">LAB-20260511-A1</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground flex items-center gap-2"><Save className="w-4 h-4" /> Save Draft</button>
          <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 flex items-center gap-2 shadow-sm">
            <Check className="w-4 h-4" /> Verify & Release
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Pane - Context (30%) */}
        <div className="w-1/3 flex flex-col h-full border-r border-border bg-card">
          <div className="p-6 border-b border-border">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Patient Context</h2>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">RF</div>
              <div>
                <h2 className="font-bold text-lg leading-tight">Robert Fox</h2>
                <p className="text-sm text-muted-foreground">OMRS-2026-001 • 42y Male</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Ordering Dr:</span> <span className="font-medium">Dr. Sarah Smith</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Priority:</span> <span className="font-bold text-red-600 bg-red-500/10 px-2 py-0.5 rounded">STAT</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Indication:</span> <span className="font-medium">Altered mental status</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Time Waiting:</span> <span className="font-bold text-red-600">45 mins</span></div>
            </div>
          </div>
          
          <div className="p-6 border-b border-border">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Specimen Information</h2>
            <div className="bg-muted/30 border border-border rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Beaker className="w-5 h-5 text-primary" />
                  <span className="font-bold">Blood (Serum)</span>
                </div>
                <button className="p-1.5 bg-background border border-border rounded text-muted-foreground hover:text-foreground" title="Print Label"><Printer className="w-4 h-4" /></button>
              </div>
              <div>
                <span className="text-xs text-muted-foreground block mb-1">Specimen Barcode</span>
                <div className="bg-background border border-border p-2 rounded flex items-center gap-2 font-mono text-sm justify-center">
                  <Barcode className="w-5 h-5" /> |||| | || ||| || |||
                </div>
              </div>
              <div className="space-y-2 text-sm pt-2 border-t border-border">
                <div className="flex justify-between"><span className="text-muted-foreground">Collection Time:</span> <span className="font-medium">10:15 AM</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Collected By:</span> <span className="font-medium">Alex (Tech)</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Pane - Results Entry (70%) */}
        <div className="w-2/3 flex flex-col h-full bg-muted/10 overflow-y-auto custom-scrollbar relative">
          
          {criticalFlag && (
            <div className="sticky top-0 z-20 bg-red-500 text-white p-4 flex items-start gap-3 shadow-md animate-in slide-in-from-top">
              <ShieldAlert className="w-6 h-6 shrink-0 animate-pulse" />
              <div>
                <p className="font-bold text-lg leading-tight">Critical Value Detected</p>
                <p className="text-sm text-red-100">Releasing these results will trigger an immediate URGENT notification to Dr. Sarah Smith. Secondary verification recommended.</p>
              </div>
            </div>
          )}

          <div className="p-8 max-w-4xl mx-auto w-full">
            <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-border bg-muted/30 flex items-center gap-3">
                <FlaskConical className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-lg">Result Entry Form</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/10 border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-6 py-3 font-semibold w-1/3">Test Name</th>
                      <th className="px-6 py-3 font-semibold">Result</th>
                      <th className="px-6 py-3 font-semibold w-32">Unit</th>
                      <th className="px-6 py-3 font-semibold w-1/4">Reference</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {tests.map(test => (
                      <tr key={test.id} className="hover:bg-muted/10 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-bold text-foreground">{test.name}</p>
                          <p className="text-[10px] font-mono text-muted-foreground mt-0.5">{test.code}</p>
                        </td>
                        <td className="px-6 py-4">
                          {test.type === 'numeric' ? (
                            <input 
                              type="number" 
                              onChange={(e) => handleResultChange(test.id, e.target.value)}
                              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm font-bold outline-none focus:border-primary transition-colors" 
                            />
                          ) : (
                            <select className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm font-bold outline-none focus:border-primary transition-colors">
                              <option value="">Select...</option>
                              {test.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                          )}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">{test.unit}</td>
                        <td className="px-6 py-4 text-xs text-muted-foreground">{test.range}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="p-6 border-t border-border bg-muted/10">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Lab Tech Notes</label>
                <textarea placeholder="Optional notes for the ordering physician regarding sample quality or testing conditions..." className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm outline-none focus:border-primary transition-colors min-h-[80px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
