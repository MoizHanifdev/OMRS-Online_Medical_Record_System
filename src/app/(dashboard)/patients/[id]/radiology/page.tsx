'use client';

import { useState } from 'react';
import { Plus, Search, FileImage, Download, Activity, MoreVertical, Eye, FileText } from 'lucide-react';
import { BaseWidget } from '@/components/widgets/BaseWidget';
import Link from 'next/link';

export default function RadiologyTab({ params }: { params: { id: string } }) {
  const patientId = params.id;
  const [activeModality, setActiveModality] = useState('All');

  const studies = [
    { id: 'RAD-20260510-9X8Y', date: 'May 10, 2026', modality: 'Chest X-Ray', bodyPart: 'Chest', status: 'Reported', findings: 'Normal', doctor: 'Dr. Sarah Smith', images: 2 },
    { id: 'RAD-20251215-7Z6W', date: 'Dec 15, 2025', modality: 'CT Scan', bodyPart: 'Abdomen', status: 'Reported', findings: 'Abnormal', doctor: 'Dr. John Doe', images: 120 },
    { id: 'RAD-20250801-5V4U', date: 'Aug 01, 2025', modality: 'Ultrasound', bodyPart: 'Right Knee', status: 'Reported', findings: 'Normal', doctor: 'Dr. Sarah Smith', images: 15 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Radiology Imaging</h2>
          <p className="text-muted-foreground">{studies.length} studies available</p>
        </div>
        <div className="flex gap-2">
          <Link href={`/clinical/radiology-orders/new?patientId=${patientId}`} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 flex items-center gap-2 shadow-sm">
            <Plus className="w-4 h-4" /> Order Imaging
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-3 rounded-2xl border border-border shadow-sm">
        <div className="flex overflow-x-auto scrollbar-hide gap-2 w-full md:w-auto pb-2 md:pb-0">
          {['All', 'X-Ray', 'CT', 'MRI', 'Ultrasound'].map(filter => (
            <button 
              key={filter}
              onClick={() => setActiveModality(filter)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeModality === filter 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        
        <div className="w-full md:w-64 relative shrink-0">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
          <input type="text" placeholder="Search studies..." className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-transparent focus:border-primary rounded-xl text-sm outline-none transition-all" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {studies.map(study => (
            <div key={study.id} className="bg-card border border-border rounded-xl p-5 shadow-sm hover:border-primary/30 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <FileImage className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-foreground text-lg">{study.modality} {study.bodyPart}</h3>
                    {study.findings === 'Abnormal' && <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-700 px-2 py-0.5 rounded">Abnormal Findings</span>}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-3">
                    <span className="font-mono bg-muted px-1.5 py-0.5 rounded text-foreground">{study.id}</span>
                    <span>{study.date}</span>
                    <span>•</span>
                    <span>{study.images} Images</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 font-medium">Ordered by: {study.doctor}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 shrink-0 md:flex-col w-full md:w-auto mt-2 md:mt-0">
                <Link href={`/patients/${patientId}/radiology/${study.id}`} className="w-full text-xs font-semibold px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors flex items-center justify-center gap-2">
                  <Eye className="w-4 h-4" /> View Images
                </Link>
                <button className="w-full text-xs font-semibold px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors flex items-center justify-center gap-2">
                  <FileText className="w-4 h-4" /> Read Report
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <BaseWidget title="Radiation Exposure" className="sticky top-24">
            <div className="mt-4 p-4 bg-muted/30 border border-border rounded-xl text-center">
              <Activity className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-3xl font-bold text-foreground tracking-tight">4.2 <span className="text-sm font-normal text-muted-foreground">mSv</span></p>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1">Cumulative Dose (2026)</p>
              <div className="w-full bg-border h-2 rounded-full mt-4 overflow-hidden">
                <div className="bg-green-500 h-full w-[20%]" />
              </div>
              <p className="text-[10px] text-muted-foreground mt-2">Well within safe annual limits.</p>
            </div>
          </BaseWidget>
        </div>
      </div>
    </div>
  );
}
