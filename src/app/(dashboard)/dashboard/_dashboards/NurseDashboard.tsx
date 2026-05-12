'use client';

import { Activity, Pill, Users, CheckSquare } from 'lucide-react';
import { StatCard } from '@/components/widgets/stats/StatCard';
import { BaseWidget } from '@/components/widgets/BaseWidget';

export function NurseDashboard({ user }: { user: any }) {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Good morning, {user.name.split(' ')[0]}</h1>
        <p className="text-muted-foreground">You have 12 assigned patients today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Assigned Patients" value={12} icon={<Users className="w-5 h-5" />} color="blue" />
        <StatCard label="Vitals Due Now" value={3} icon={<Activity className="w-5 h-5" />} color="red" />
        <StatCard label="Medications Due (2h)" value={5} icon={<Pill className="w-5 h-5" />} color="amber" />
        <StatCard label="Tasks Pending" value={8} icon={<CheckSquare className="w-5 h-5" />} color="primary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BaseWidget title="Medications Due" className="min-h-[300px]">
          <div className="space-y-3">
            {[
              { time: '10:00 AM', med: 'Metoprolol 50mg', pat: 'John Doe', bed: 'Room 204' },
              { time: '10:30 AM', med: 'Insulin Glargine 10u', pat: 'Sarah Chen', bed: 'Room 210' },
              { time: '11:00 AM', med: 'Amoxicillin 500mg', pat: 'Michael Ross', bed: 'Room 215' }
            ].map((m, i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-border rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 text-center text-sm font-bold text-amber-600 bg-amber-100 rounded-lg py-1">{m.time.split(' ')[0]}</div>
                  <div>
                    <p className="font-semibold">{m.pat} <span className="text-xs text-muted-foreground font-normal">({m.bed})</span></p>
                    <p className="text-sm text-muted-foreground">{m.med}</p>
                  </div>
                </div>
                <button className="px-3 py-1.5 bg-muted text-sm font-medium rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors">Administer</button>
              </div>
            ))}
          </div>
        </BaseWidget>

        <BaseWidget title="Vitals Queue" className="min-h-[300px]">
          <div className="space-y-3">
            {[
              { pat: 'Emma Watson', bed: 'Room 201', status: 'Due 15 mins ago', urgent: true },
              { pat: 'James Wilson', bed: 'Room 208', status: 'Due in 10 mins', urgent: false },
              { pat: 'Robert Fox', bed: 'Room 212', status: 'Due in 45 mins', urgent: false }
            ].map((v, i) => (
              <div key={i} className={`flex items-center justify-between p-4 border rounded-xl ${v.urgent ? 'border-red-200 bg-red-50 dark:bg-red-950/20' : 'border-border'}`}>
                <div>
                  <p className="font-semibold">{v.pat} <span className="text-xs text-muted-foreground font-normal">({v.bed})</span></p>
                  <p className={`text-sm ${v.urgent ? 'text-red-600 font-medium' : 'text-muted-foreground'}`}>{v.status}</p>
                </div>
                <button className="px-3 py-1.5 border border-border bg-card text-sm font-medium rounded-lg hover:bg-muted transition-colors">Record Vitals</button>
              </div>
            ))}
          </div>
        </BaseWidget>
      </div>
    </div>
  );
}
