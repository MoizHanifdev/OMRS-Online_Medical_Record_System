'use client';

import { MoreVertical, Copy, ActivitySquare, Pill, FileText, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export function PatientHero({ patient }: { patient: any }) {
  return (
    <div className="bg-card border border-border rounded-3xl p-6 flex flex-col xl:flex-row gap-6 shadow-sm relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      {/* Identity Section */}
      <div className="flex items-center gap-6 xl:w-1/3 shrink-0">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-4xl font-bold text-primary ring-4 ring-background shadow-md">
            {patient.name.charAt(0)}
          </div>
          {patient.hasSevereAllergies && (
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-red-500 rounded-full border-2 border-card flex items-center justify-center text-white text-[10px] font-bold animate-pulse" title="Severe Allergies">
              !
            </div>
          )}
        </div>
        
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-foreground">{patient.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-mono text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded cursor-pointer hover:text-foreground transition-colors flex items-center gap-1" title="Click to copy">
              {patient.mrn} <Copy className="w-3 h-3" />
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className="px-2.5 py-1 bg-muted rounded-full text-xs font-medium">{patient.age}y • {patient.gender.charAt(0)}</span>
            <span className="px-2.5 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">{patient.bloodGroup}</span>
            {patient.tags.map((tag: string) => (
              <span key={tag} className="px-2.5 py-1 border border-border rounded-full text-xs font-bold uppercase">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Info Grid */}
      <div className="flex-1 grid grid-cols-2 gap-4 border-t xl:border-t-0 xl:border-l border-border pt-4 xl:pt-0 xl:pl-6">
        <div>
          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Last Visit</p>
          <p className="text-sm font-medium">{patient.lastVisit}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Next Appointment</p>
          <p className="text-sm font-medium">{patient.nextAppointment}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Primary Doctor</p>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px]">S</div>
            <p className="text-sm font-medium">{patient.primaryDoctor}</p>
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Insurance</p>
          <p className="text-sm font-medium">{patient.insuranceProvider} <span className="text-muted-foreground font-mono">{patient.insurancePolicy}</span></p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-start xl:items-center gap-2 shrink-0 border-t xl:border-t-0 xl:border-l border-border pt-4 xl:pt-0 xl:pl-6">
        <div className="flex flex-col sm:flex-row xl:flex-col 2xl:flex-row gap-2 w-full">
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors flex-1 shadow-sm">
            <FileText className="w-4 h-4" /> New Note
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-border bg-card font-medium rounded-xl hover:bg-muted transition-colors flex-1 shadow-sm">
            <Calendar className="w-4 h-4" /> Schedule
          </button>
        </div>
        <button className="p-2 border border-border bg-card rounded-xl hover:bg-muted transition-colors">
          <MoreVertical className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}
