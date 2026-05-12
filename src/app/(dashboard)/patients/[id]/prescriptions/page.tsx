'use client';

import { useState } from 'react';
import { Plus, Search, FileText, Printer, Eye } from 'lucide-react';
import { BaseWidget } from '@/components/widgets/BaseWidget';
import Link from 'next/link';

export default function PrescriptionsTab({ params }: { params: { id: string } }) {
  const patientId = params.id;

  const prescriptions = [
    { id: 'RX-20260421-1A9B', date: '2 days ago', doctor: 'Dr. Sarah Smith', items: 3, status: 'Active', diagnosis: 'Type 2 Diabetes, Hypertension' },
    { id: 'RX-20260115-4F2C', date: '3 months ago', doctor: 'Dr. John Doe', items: 1, status: 'Completed', diagnosis: 'Acute Bronchitis' },
    { id: 'RX-20251102-9D8E', date: '6 months ago', doctor: 'Dr. Sarah Smith', items: 2, status: 'Completed', diagnosis: 'Hyperlipidemia' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Prescription History</h2>
          <p className="text-muted-foreground">{prescriptions.length} total prescriptions</p>
        </div>
        <div className="flex gap-2">
          <Link href={`/clinical/prescriptions/new?patientId=${patientId}`} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 flex items-center gap-2 shadow-sm">
            <Plus className="w-4 h-4" /> New Prescription
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-3 rounded-2xl border border-border shadow-sm">
        <div className="w-full md:w-64 relative shrink-0">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
          <input type="text" placeholder="Search by Rx # or drug..." className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-transparent focus:border-primary rounded-xl text-sm outline-none transition-all" />
        </div>
      </div>

      <div className="space-y-4">
        {prescriptions.map(rx => (
          <div key={rx.id} className="bg-card border border-border rounded-xl p-5 shadow-sm hover:border-primary/30 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-sm font-bold bg-muted px-2 py-1 rounded text-foreground">{rx.id}</span>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${rx.status === 'Active' ? 'bg-green-500/10 text-green-700' : 'bg-muted text-muted-foreground'}`}>{rx.status}</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm mt-4">
                <div>
                  <span className="text-xs text-muted-foreground block mb-0.5">Date Issued</span>
                  <span className="font-medium">{rx.date}</span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block mb-0.5">Prescribed By</span>
                  <span className="font-medium">{rx.doctor}</span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block mb-0.5">Items</span>
                  <span className="font-medium">{rx.items} medications</span>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground mt-3 italic">For: {rx.diagnosis}</p>
            </div>
            
            <div className="flex items-center gap-2 md:flex-col shrink-0">
              <button className="w-full text-xs font-semibold px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors flex items-center justify-center gap-2">
                <Eye className="w-4 h-4" /> View Details
              </button>
              <button className="w-full text-xs font-semibold px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors flex items-center justify-center gap-2">
                <Printer className="w-4 h-4" /> Print Copy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
