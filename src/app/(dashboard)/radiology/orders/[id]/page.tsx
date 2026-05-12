'use client';

import { useState } from 'react';
import { UploadCloud, FileText, Check, Save, ChevronLeft, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function RadiologyResultEntryPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'upload' | 'report'>('upload');

  return (
    <div className="flex flex-col h-screen bg-muted/20 overflow-hidden">
      {/* Top Navigation */}
      <div className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/radiology/queue" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
            <ChevronLeft className="w-4 h-4" /> Back to Queue
          </Link>
          <div className="h-4 w-px bg-border" />
          <h1 className="font-bold text-lg font-mono">RAD-20260511-X1</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground flex items-center gap-2"><Save className="w-4 h-4" /> Save Draft</button>
          <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 flex items-center gap-2 shadow-sm">
            <Check className="w-4 h-4" /> Sign Report
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Pane - Context & Uploads (35%) */}
        <div className="w-[35%] flex flex-col h-full border-r border-border bg-card">
          <div className="p-6 border-b border-border">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Study Context</h2>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">RF</div>
              <div>
                <h2 className="font-bold text-lg leading-tight">Robert Fox</h2>
                <p className="text-sm text-muted-foreground">OMRS-2026-001 • 42y Male</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Modality:</span> <span className="font-bold">X-Ray (Chest)</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Ordering Dr:</span> <span className="font-medium">Dr. Sarah Smith</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Indication:</span> <span className="font-medium">Cough x 2 weeks</span></div>
            </div>
          </div>

          <div className="flex flex-col flex-1">
            <div className="flex border-b border-border">
              <button onClick={() => setActiveTab('upload')} className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'upload' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:bg-muted/50'}`}>Images</button>
              <button onClick={() => setActiveTab('report')} className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'report' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:bg-muted/50'}`}>Report</button>
            </div>
            
            {activeTab === 'upload' && (
              <div className="p-6 flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-4">
                <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer bg-muted/10">
                  <UploadCloud className="w-10 h-10 text-muted-foreground mb-3" />
                  <p className="font-bold text-sm">Drop DICOM or image files here</p>
                  <p className="text-xs text-muted-foreground mt-1">Maximum 50MB per file</p>
                  <button className="mt-4 px-4 py-2 bg-background border border-border rounded-lg text-xs font-semibold">Browse Files</button>
                </div>
                
                <h3 className="font-bold text-sm mt-4">Uploaded Images (2)</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 bg-muted/30 border border-border rounded-lg">
                    <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center text-[10px] text-gray-500 font-mono">PA</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate">chest_pa.dcm</p>
                      <p className="text-xs text-muted-foreground">4.2 MB • DICOM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-muted/30 border border-border rounded-lg">
                    <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center text-[10px] text-gray-500 font-mono">LAT</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate">chest_lat.dcm</p>
                      <p className="text-xs text-muted-foreground">3.8 MB • DICOM</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'report' && (
              <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Template</label>
                    <select className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm outline-none focus:border-primary transition-colors">
                      <option>Chest X-Ray (Normal)</option>
                      <option>Chest X-Ray (Pneumonia)</option>
                      <option>Blank</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Findings</label>
                    <textarea defaultValue="The cardiomediastinal silhouette is within normal limits. There is no focal consolidation, pleural effusion, or pneumothorax. The osseous structures are intact." className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm outline-none focus:border-primary transition-colors min-h-[150px]" />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Impression</label>
                    <textarea defaultValue="No acute cardiopulmonary abnormality." className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm font-bold outline-none focus:border-primary transition-colors min-h-[80px]" />
                  </div>
                  <div className="flex items-center gap-2 mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <input type="checkbox" id="critical" className="w-4 h-4 rounded text-red-500 focus:ring-red-500 focus:ring-offset-background border-border bg-background" />
                    <label htmlFor="critical" className="text-sm font-bold text-red-700 flex items-center gap-1 cursor-pointer"><ShieldAlert className="w-4 h-4" /> Mark as Critical Finding</label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Pane - Viewer Preview (65%) */}
        <div className="w-[65%] bg-black relative flex items-center justify-center">
          <div className="absolute top-4 left-4 text-green-500 font-mono text-xs z-10 pointer-events-none drop-shadow-md">
            <p>Robert Fox</p>
            <p>Chest X-Ray</p>
          </div>
          <div className="w-full h-full flex flex-col items-center justify-center opacity-30">
            <svg viewBox="0 0 100 100" className="w-48 h-48 text-white stroke-current stroke-1 fill-none">
              <path d="M30 20 Q 50 10 70 20 T 70 80 Q 50 90 30 80 T 30 20 Z" />
              <line x1="50" y1="20" x2="50" y2="80" strokeDasharray="2 2" />
            </svg>
            <p className="mt-4 font-mono text-sm tracking-widest text-gray-400">IMAGE PREVIEW</p>
          </div>
        </div>
      </div>
    </div>
  );
}
