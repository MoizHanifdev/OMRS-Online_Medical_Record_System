'use client';

import { Pill, ActivitySquare, Calendar, FlaskConical } from 'lucide-react';
import { StatCard } from '@/components/widgets/stats/StatCard';
import { BaseWidget } from '@/components/widgets/BaseWidget';

export function PatientDashboard({ user }: { user: any }) {
  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Patient Hero Card */}
      <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm">
        <div className="w-24 h-24 bg-primary/10 rounded-full border-4 border-background flex items-center justify-center text-4xl shadow-lg shrink-0">
          👤
        </div>
        <div className="text-center md:text-left flex-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{user.name}</h1>
          <p className="text-muted-foreground font-mono mt-1">MRN: OMRS-2026-9921</p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-4">
            <span className="px-3 py-1 bg-muted rounded-full text-sm font-medium">32 years old</span>
            <span className="px-3 py-1 bg-muted rounded-full text-sm font-medium">Male</span>
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-bold">O+ Blood Type</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full md:w-auto">
          <button className="px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors">
            Book Appointment
          </button>
          <button className="px-6 py-2 border border-border bg-card font-semibold rounded-xl hover:bg-muted transition-colors">
            Message Doctor
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Active Medications" value={2} icon={<Pill className="w-5 h-5" />} color="blue" />
        <StatCard label="Active Problems" value={1} icon={<ActivitySquare className="w-5 h-5" />} color="amber" />
        <StatCard label="Next Appt (Days)" value={14} icon={<Calendar className="w-5 h-5" />} color="primary" />
        <StatCard label="Recent Labs" value={3} icon={<FlaskConical className="w-5 h-5" />} color="green" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BaseWidget title="Active Medications" className="min-h-[250px]">
          <div className="space-y-4 mt-2">
            {[
              { m: 'Metformin 500mg', s: 'Take 1 tablet by mouth twice daily' },
              { m: 'Lisinopril 10mg', s: 'Take 1 tablet by mouth daily' },
            ].map((med, i) => (
              <div key={i} className="flex items-center gap-4 p-4 border border-border rounded-xl">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">💊</div>
                <div className="flex-1">
                  <p className="font-semibold">{med.m}</p>
                  <p className="text-sm text-muted-foreground">{med.s}</p>
                </div>
                <button className="text-xs font-semibold text-primary hover:underline">Refill</button>
              </div>
            ))}
          </div>
        </BaseWidget>

        <BaseWidget title="Upcoming Appointments" className="min-h-[250px]">
          <div className="p-4 bg-muted/30 border border-border rounded-xl mt-2">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-bold text-lg">Dr. Sarah Chen</p>
                <p className="text-sm text-muted-foreground">General Practice • Follow-up</p>
              </div>
              <div className="text-center bg-card border border-border rounded-lg px-3 py-1 shadow-sm">
                <p className="text-xs font-bold text-red-500 uppercase">May</p>
                <p className="text-xl font-black">25</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <Calendar className="w-4 h-4 text-primary" />
              10:30 AM - 11:00 AM
            </div>
          </div>
        </BaseWidget>
      </div>
    </div>
  );
}
