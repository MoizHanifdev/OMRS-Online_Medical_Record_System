'use client';

import { Calendar, FileText, Pill, Users } from 'lucide-react';
import { StatCard } from '@/components/widgets/stats/StatCard';
import { BaseWidget } from '@/components/widgets/BaseWidget';

export function DoctorDashboard({ user }: { user: any }) {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Good morning, Dr. {user.name.split(' ')[1] || user.name.split(' ')[0]}</h1>
          <p className="text-muted-foreground">You have 8 appointments today. First one is in 45 minutes.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90">
          + New Encounter
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="My Active Patients" value={342} icon={<Users className="w-5 h-5" />} color="blue" />
        <StatCard label="Today's Appointments" value={8} icon={<Calendar className="w-5 h-5" />} color="primary" />
        <StatCard label="Pending Lab Results" value={12} icon={<Pill className="w-5 h-5" />} color="amber" />
        <StatCard label="Unsigned Notes" value={3} icon={<FileText className="w-5 h-5" />} color="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BaseWidget title="Today's Schedule" className="lg:col-span-2 min-h-[400px]">
          <div className="space-y-0 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {[
              { t: '09:00 AM', name: 'Sarah Chen', type: 'Annual Checkup', status: 'Checked In' },
              { t: '09:45 AM', name: 'Michael Ross', type: 'Follow up - Hypertension', status: 'Waiting' },
              { t: '10:30 AM', name: 'Emma Watson', type: 'Lab Review', status: 'Scheduled' },
              { t: '11:15 AM', name: 'James Wilson', type: 'New Patient', status: 'Scheduled' },
            ].map((apt, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active py-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-background bg-muted text-xs font-semibold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow z-10">
                  {apt.t.split(':')[0]}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card border border-border p-4 rounded-xl shadow-sm flex flex-col">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-foreground">{apt.name}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${apt.status === 'Checked In' ? 'bg-green-100 text-green-700' : apt.status === 'Waiting' ? 'bg-amber-100 text-amber-700' : 'bg-muted text-muted-foreground'}`}>{apt.status}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{apt.type} • {apt.t}</span>
                </div>
              </div>
            ))}
          </div>
        </BaseWidget>

        <div className="space-y-6">
          <BaseWidget title="Critical Alerts" isEmpty={false} className="min-h-[200px] border-red-500/20">
            <div className="space-y-3">
              <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded-xl">
                <div className="flex gap-2 items-center mb-1">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="font-semibold text-sm text-red-700 dark:text-red-400">Critical Lab Result</span>
                </div>
                <p className="text-xs text-foreground mb-1">Patient: <strong>Robert Fox</strong></p>
                <p className="text-xs text-muted-foreground">Potassium level: 6.8 mmol/L (High)</p>
              </div>
            </div>
          </BaseWidget>

          <BaseWidget title="Pending Notes" className="min-h-[200px]">
            <div className="space-y-3">
              {[
                { p: 'Alice Cooper', d: 'Yesterday, 4:30 PM', t: 'Progress Note' },
                { p: 'John Doe', d: 'Yesterday, 2:15 PM', t: 'Initial Consultation' }
              ].map((n, i) => (
                <div key={i} className="flex justify-between items-center p-3 border border-border rounded-xl">
                  <div>
                    <p className="text-sm font-semibold">{n.p}</p>
                    <p className="text-xs text-muted-foreground">{n.t} • {n.d}</p>
                  </div>
                  <button className="text-xs font-semibold text-primary hover:underline">Sign</button>
                </div>
              ))}
            </div>
          </BaseWidget>
        </div>
      </div>
    </div>
  );
}
