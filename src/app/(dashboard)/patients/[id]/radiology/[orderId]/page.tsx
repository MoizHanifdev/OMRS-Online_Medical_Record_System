'use client';

import { useState } from 'react';
import { ChevronLeft, Expand, ZoomIn, ZoomOut, RotateCw, Contrast, Type, Move, Download, LayoutGrid } from 'lucide-react';
import Link from 'next/link';

export default function RadiologyViewerPage({ params }: { params: { id: string, orderId: string } }) {
  const [activeTool, setActiveTool] = useState('move');

  const tools = [
    { id: 'move', icon: Move, label: 'Pan' },
    { id: 'zoom', icon: ZoomIn, label: 'Zoom' },
    { id: 'window', icon: Contrast, label: 'Window/Level' },
    { id: 'rotate', icon: RotateCw, label: 'Rotate' },
    { id: 'text', icon: Type, label: 'Annotate' },
  ];

  return (
    <div className="flex flex-col h-screen bg-black overflow-hidden text-gray-300">
      {/* Top Navigation - Dark Mode */}
      <div className="h-14 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4 shrink-0 z-10">
        <div className="flex items-center gap-4">
          <Link href={`/patients/${params.id}/radiology`} className="flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors">
            <ChevronLeft className="w-4 h-4" /> Exit Viewer
          </Link>
          <div className="h-4 w-px bg-gray-700" />
          <div className="flex flex-col">
            <h1 className="font-bold text-sm text-white leading-tight">Robert Fox • Chest X-Ray</h1>
            <p className="text-[10px] text-gray-500 font-mono">RAD-20260510-9X8Y • May 10, 2026</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded transition-colors" title="Download Image"><Download className="w-4 h-4" /></button>
          <button className="p-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded transition-colors" title="Hanging Protocol"><LayoutGrid className="w-4 h-4" /></button>
          <button className="p-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded transition-colors" title="Full Screen"><Expand className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Toolbar */}
        <div className="w-14 bg-gray-900 border-r border-gray-800 flex flex-col items-center py-4 gap-4 shrink-0">
          {tools.map(tool => (
            <button 
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`p-2.5 rounded-lg transition-colors ${activeTool === tool.id ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
              title={tool.label}
            >
              <tool.icon className="w-5 h-5" />
            </button>
          ))}
        </div>

        {/* Series Thumbnail Strip */}
        <div className="w-40 bg-gray-950 border-r border-gray-800 flex flex-col p-2 gap-2 overflow-y-auto custom-scrollbar shrink-0">
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 px-1">Series (2)</div>
          
          <div className="bg-gray-800 border-2 border-blue-500 rounded-lg p-1 cursor-pointer">
            <div className="aspect-square bg-gray-700 rounded mb-1 flex items-center justify-center text-xs font-mono">PA View</div>
            <div className="text-[10px] text-gray-400 px-1 truncate">Series 1 • 1 img</div>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-1 cursor-pointer hover:bg-gray-800 transition-colors">
            <div className="aspect-square bg-gray-800 rounded mb-1 flex items-center justify-center text-xs font-mono text-gray-500">Lateral</div>
            <div className="text-[10px] text-gray-500 px-1 truncate">Series 2 • 1 img</div>
          </div>
        </div>

        {/* Main Viewer Area */}
        <div className="flex-1 bg-black relative flex items-center justify-center overflow-hidden">
          {/* DICOM Overlay Information */}
          <div className="absolute top-4 left-4 text-green-500 font-mono text-[10px] sm:text-xs z-10 pointer-events-none drop-shadow-md">
            <p>Robert Fox</p>
            <p>OMRS-2026-001</p>
            <p>DOB: 12/05/1983</p>
          </div>
          <div className="absolute top-4 right-4 text-green-500 font-mono text-[10px] sm:text-xs z-10 text-right pointer-events-none drop-shadow-md">
            <p>OMRS Medical Center</p>
            <p>Study Date: 20260510</p>
            <p>Chest X-Ray</p>
          </div>
          <div className="absolute bottom-4 left-4 text-green-500 font-mono text-[10px] sm:text-xs z-10 pointer-events-none drop-shadow-md">
            <p>Zoom: 100%</p>
            <p>Angle: 0</p>
          </div>
          <div className="absolute bottom-4 right-4 text-green-500 font-mono text-[10px] sm:text-xs z-10 text-right pointer-events-none drop-shadow-md">
            <p>W: 2500 L: 500</p>
            <p>Thickness: 1.0mm</p>
          </div>

          {/* Placeholder for actual image */}
          <div className="w-full h-full flex flex-col items-center justify-center opacity-30 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-64 h-64 text-white stroke-current stroke-1 fill-none">
              <path d="M30 20 Q 50 10 70 20 T 70 80 Q 50 90 30 80 T 30 20 Z" />
              <path d="M40 30 Q 50 25 60 30 T 60 70 Q 50 75 40 70 T 40 30 Z" opacity="0.5"/>
              <line x1="50" y1="20" x2="50" y2="80" strokeDasharray="2 2" />
              <line x1="30" y1="50" x2="70" y2="50" strokeDasharray="2 2" />
            </svg>
            <p className="mt-4 font-mono text-sm tracking-widest text-gray-400">CORNERSTONE DICOM CANVAS</p>
          </div>
        </div>

        {/* Right Panel - Report (25%) */}
        <div className="w-1/4 bg-gray-900 border-l border-gray-800 flex flex-col h-full shrink-0">
          <div className="p-4 border-b border-gray-800 flex items-center justify-between">
            <h2 className="font-bold text-sm text-white">Radiology Report</h2>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-green-500/10 text-green-500 px-2 py-0.5 rounded">Signed</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar text-sm space-y-4">
            <div>
              <h3 className="font-bold text-gray-300 text-xs uppercase tracking-wider mb-1">Clinical Indication</h3>
              <p className="text-gray-400">Cough x 2 weeks, low-grade fever. R/O pneumonia.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-300 text-xs uppercase tracking-wider mb-1">Findings</h3>
              <p className="text-gray-400 leading-relaxed">
                The cardiomediastinal silhouette is within normal limits. 
                There is no focal consolidation, pleural effusion, or pneumothorax. 
                The osseous structures are intact.
              </p>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
              <h3 className="font-bold text-white text-xs uppercase tracking-wider mb-1">Impression</h3>
              <p className="text-white font-medium">No acute cardiopulmonary abnormality.</p>
            </div>
            <div className="pt-4 border-t border-gray-800 mt-4">
              <p className="text-xs text-gray-500">Electronically signed by:</p>
              <p className="font-bold text-gray-300">Dr. Sarah Smith, MD</p>
              <p className="text-[10px] text-gray-500">May 10, 2026 • 14:32 EST</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
