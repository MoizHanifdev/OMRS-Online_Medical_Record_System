'use client';

import { useState } from 'react';
import { Plus, AlertTriangle, FileText, MoreVertical, ShieldAlert } from 'lucide-react';
import { BaseWidget } from '@/components/widgets/BaseWidget';
import Link from 'next/link';

export default function MedicationsTab({ params }: { params: { id: string } }) {
  const patientId = params.id;
  const activeMeds = [
    { id: 1, name: 'Lisinopril', generic: 'lisinopril', class: 'Cardiovascular', dose: '10mg', frequency: 'OD', route: 'PO', duration: '30 days', date: '5 days ago', refills: 2, doctor: 'Dr. Sarah Smith', interactions: 1, isHighAlert: false },
    { id: 2, name: 'Metformin', generic: 'metformin', class: 'Antidiabetic', dose: '500mg', frequency: 'BD', route: 'PO', duration: '90 days', date: '2 months ago', refills: 1, doctor: 'Dr. Sarah Smith', interactions: 0, isHighAlert: false },
    { id: 3, name: 'Warfarin', generic: 'warfarin', class: 'Anticoagulant', dose: '5mg', frequency: 'OD', route: 'PO', duration: '30 days', date: '2 weeks ago', refills: 0, doctor: 'Dr. John Doe', interactions: 1, isHighAlert: true },
    { id: 4, name: 'Atorvastatin', generic: 'atorvastatin', class: 'Cardiovascular', dose: '40mg', frequency: 'OD', route: 'PO', duration: 'Ongoing', date: '6 months ago', refills: 3, doctor: 'Dr. Sarah Smith', interactions: 0, isHighAlert: false },
    { id: 5, name: 'Ibuprofen', generic: 'ibuprofen', class: 'Pain/Analgesia', dose: '400mg', frequency: 'PRN', route: 'PO', duration: '7 days', date: '1 day ago', refills: 0, doctor: 'Dr. Emily Chen', interactions: 1, isHighAlert: false },
    { id: 6, name: 'Oxycodone', generic: 'oxycodone', class: 'Pain/Analgesia', dose: '5mg', frequency: 'Q6H PRN', route: 'PO', duration: '5 days', date: '1 day ago', refills: 0, doctor: 'Dr. Emily Chen', interactions: 0, isHighAlert: true, controlled: 'C-II' },
  ];

  const pastMeds = [
    { id: 7, name: 'Amoxicillin', generic: 'amoxicillin', class: 'Antibiotics', dose: '500mg', frequency: 'TID', route: 'PO', duration: '10 days', stopped: 'Jan 15, 2026', reason: 'Treatment complete' }
  ];

  const isPolypharmacy = activeMeds.length > 5;

  return (
    <div className="space-y-6">
      {/* Polypharmacy Warning */}
      {isPolypharmacy && (
        <div className="bg-amber-500/10 border-l-4 border-amber-500 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <div>
              <p className="text-sm font-bold text-amber-700 dark:text-amber-400">Polypharmacy Alert</p>
              <p className="text-xs text-foreground">Patient is on {activeMeds.length} active medications. Consider review for deprescribing.</p>
            </div>
          </div>
          <button className="text-xs bg-card px-3 py-1 rounded border border-border font-medium hover:bg-muted transition-colors">Run Reconciliation</button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Medications</h2>
          <p className="text-muted-foreground">{activeMeds.length} active, {pastMeds.length} discontinued</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-border bg-card rounded-lg text-sm font-medium hover:bg-muted flex items-center gap-2">
            Print List
          </button>
          <Link href={`/clinical/prescriptions/new?patientId=${patientId}`} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 flex items-center gap-2 shadow-sm">
            <Plus className="w-4 h-4" /> New Prescription
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <h3 className="font-bold text-lg">Active Medications</h3>
          
          <div className="space-y-4">
            {activeMeds.map(med => (
              <div key={med.id} className="bg-card border border-border rounded-xl p-4 shadow-sm hover:border-primary/30 transition-colors relative">
                {med.interactions > 0 && (
                  <div className="absolute -top-2 -right-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm flex items-center gap-1 cursor-pointer hover:bg-amber-600 transition-colors">
                    <AlertTriangle className="w-3 h-3" /> {med.interactions} Interaction
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-lg text-foreground">{med.name}</h4>
                      <span className="text-xs italic text-muted-foreground">{med.generic}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-muted px-2 py-0.5 rounded text-muted-foreground">{med.class}</span>
                      {med.isHighAlert && <span className="text-[10px] font-bold uppercase tracking-wider bg-red-500/10 text-red-600 px-2 py-0.5 rounded flex items-center gap-1"><ShieldAlert className="w-3 h-3" /> High Alert</span>}
                      {med.controlled && <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-600 px-2 py-0.5 rounded">{med.controlled}</span>}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-2 mt-4 text-sm bg-muted/20 p-3 rounded-lg">
                  <div><span className="text-muted-foreground text-xs block">Dose</span><span className="font-medium">{med.dose}</span></div>
                  <div><span className="text-muted-foreground text-xs block">Frequency</span><span className="font-medium">{med.frequency}</span></div>
                  <div><span className="text-muted-foreground text-xs block">Route</span><span className="font-medium">{med.route}</span></div>
                  <div><span className="text-muted-foreground text-xs block">Duration</span><span className="font-medium">{med.duration}</span></div>
                </div>

                <div className="flex items-center justify-between border-t border-border pt-4 mt-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">{med.doctor.charAt(4)}</div>
                      <span className="text-xs text-muted-foreground">{med.doctor}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Started: {med.date}</span>
                    {med.refills > 0 && <span className="text-xs text-green-600 font-medium">Refills: {med.refills}</span>}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="text-xs font-semibold px-3 py-1.5 border border-border rounded-lg hover:bg-muted transition-colors">Discontinue</button>
                    <button className="text-xs font-semibold px-3 py-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">Renew</button>
                    <button className="p-1.5 text-muted-foreground hover:text-foreground rounded"><MoreVertical className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h3 className="font-bold text-lg mt-8 pt-6 border-t border-border text-muted-foreground">Past Medications</h3>
          <div className="space-y-4">
            {pastMeds.map(med => (
              <div key={med.id} className="bg-muted/10 border border-border rounded-xl p-4 opacity-70 hover:opacity-100 transition-opacity">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-foreground line-through decoration-muted-foreground/50">{med.name} <span className="text-xs italic text-muted-foreground font-normal">{med.generic}</span></h4>
                    <p className="text-xs text-muted-foreground mt-1">{med.dose} • {med.frequency} • {med.duration}</p>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">Stopped: {med.stopped}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <BaseWidget title="Drug Interactions" className="sticky top-24">
            <div className="space-y-3 mt-2">
              <div className="p-3 bg-red-500/5 border border-red-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <ShieldAlert className="w-4 h-4 text-red-500" />
                  <span className="text-xs font-bold text-red-700">MAJOR INTERACTION</span>
                </div>
                <p className="text-sm font-semibold text-foreground mb-1">Warfarin + Ibuprofen</p>
                <p className="text-xs text-red-600/80 leading-relaxed">Increased risk of bleeding. NSAIDs inhibit platelet function and can cause gastric mucosal damage.</p>
              </div>
              <button className="w-full text-xs font-semibold px-3 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors">Acknowledge Alert</button>
            </div>
          </BaseWidget>
        </div>
      </div>
    </div>
  );
}
