'use client';

import { Users, UserPlus, Calendar, ClipboardCheck } from 'lucide-react';
import { StatCard } from '@/components/widgets/stats/StatCard';
import { BaseWidget } from '@/components/widgets/BaseWidget';

export function ReceptionistDashboard({ user }: { user: any }) {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Good morning, {user.name.split(' ')[0]}</h1>
        <p className="text-muted-foreground">4 check-ins waiting, 42 appointments today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Check-ins Waiting" value={4} icon={<ClipboardCheck className="w-5 h-5" />} color="amber" />
        <StatCard label="Appointments Today" value={42} icon={<Calendar className="w-5 h-5" />} color="primary" />
        <StatCard label="New Registrations (Week)" value={18} icon={<UserPlus className="w-5 h-5" />} color="blue" />
        <StatCard label="No-Shows (Week)" value={2} icon={<Users className="w-5 h-5" />} color="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BaseWidget title="Quick Patient Lookup" className="lg:col-span-2 min-h-[200px]">
          <div className="flex items-center gap-2 mb-6">
            <input 
              type="text" 
              placeholder="Search by name, MRN, or phone number..." 
              className="flex-1 px-4 py-3 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
            />
            <button className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors">
              Search
            </button>
          </div>
          <div className="flex gap-4">
            <button className="flex-1 py-4 border border-dashed border-primary/50 text-primary rounded-xl hover:bg-primary/5 font-medium transition-colors flex flex-col items-center justify-center gap-2">
              <UserPlus className="w-6 h-6" />
              Register New Patient
            </button>
            <button className="flex-1 py-4 border border-dashed border-border rounded-xl hover:bg-muted font-medium transition-colors flex flex-col items-center justify-center gap-2">
              <Calendar className="w-6 h-6 text-muted-foreground" />
              Walk-in Appointment
            </button>
          </div>
        </BaseWidget>

        <BaseWidget title="Waiting Room" className="min-h-[200px]">
          <div className="space-y-3">
            {[
              { pat: 'Alice Smith', arr: '09:15 AM', doc: 'Dr. Chen' },
              { pat: 'Bob Jones', arr: '09:20 AM', doc: 'Dr. Park' },
              { pat: 'Charlie Brown', arr: '09:35 AM', doc: 'Dr. Chen' },
            ].map((w, i) => (
              <div key={i} className="flex justify-between items-center p-3 border border-border rounded-xl">
                <div>
                  <p className="font-semibold text-sm">{w.pat}</p>
                  <p className="text-xs text-muted-foreground">Waiting for {w.doc}</p>
                </div>
                <div className="text-xs font-medium text-amber-600 bg-amber-100 px-2 py-1 rounded">
                  {w.arr}
                </div>
              </div>
            ))}
          </div>
        </BaseWidget>
      </div>
    </div>
  );
}
