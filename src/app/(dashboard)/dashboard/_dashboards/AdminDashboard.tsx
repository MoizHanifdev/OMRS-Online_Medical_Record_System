'use client';

import { Users, UserPlus, Calendar, Activity } from 'lucide-react';
import { StatCard } from '@/components/widgets/stats/StatCard';
import { BaseWidget } from '@/components/widgets/BaseWidget';
import { LineChartWidget } from '@/components/widgets/charts/LineChartWidget';
import { DonutChartWidget } from '@/components/widgets/charts/DonutChartWidget';

export function AdminDashboard({ user }: { user: any }) {
  const lineChartData = [
    { name: 'Jan', patients: 400 },
    { name: 'Feb', patients: 550 },
    { name: 'Mar', patients: 450 },
    { name: 'Apr', patients: 700 },
    { name: 'May', patients: 650 },
    { name: 'Jun', patients: 850 },
  ];

  const donutChartData = [
    { name: 'Doctors', value: 85, color: '#3b82f6' },
    { name: 'Nurses', value: 142, color: '#10b981' },
    { name: 'Receptionists', value: 45, color: '#f59e0b' },
    { name: 'Lab Techs', value: 30, color: '#8b5cf6' },
    { name: 'Admins', value: 10, color: '#ef4444' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Good morning, {user.name.split(' ')[0]} ☀</h1>
          <p className="text-muted-foreground">Here&apos;s your system overview for {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}.</p>
        </div>
        <button className="px-4 py-2 border border-border bg-card rounded-lg text-sm font-medium hover:bg-muted transition-colors">
          Customize Dashboard
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          label="Total Patients" 
          value={12450} 
          icon={<Users className="w-5 h-5" />} 
          color="blue"
          trend={{ value: 12, isPositive: true, text: 'last month' }}
        />
        <StatCard 
          label="Total Staff" 
          value={312} 
          icon={<UserPlus className="w-5 h-5" />} 
          color="primary"
          trend={{ value: 2, isPositive: true, text: 'last month' }}
        />
        <StatCard 
          label="Today's Appointments" 
          value={284} 
          icon={<Calendar className="w-5 h-5" />} 
          color="amber"
        />
        <StatCard 
          label="Active Lab Orders" 
          value={89} 
          icon={<Activity className="w-5 h-5" />} 
          color="red"
          trend={{ value: 5, isPositive: false, text: 'yesterday' }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <LineChartWidget 
          title="Patient Registrations" 
          description="New patients added over the last 6 months"
          data={lineChartData}
          lines={[{ dataKey: 'patients', color: '#3b82f6', name: 'New Patients' }]}
          xAxisKey="name"
          className="lg:col-span-2 min-h-[350px]"
        />
        
        <DonutChartWidget 
          title="Staff Distribution"
          data={donutChartData}
          totalLabel="Total Staff"
          className="lg:col-span-1 min-h-[350px]"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BaseWidget title="Recent System Activity" className="lg:col-span-2 min-h-[300px]">
          <div className="space-y-4">
            {[
              { a: 'Dr. Smith', text: 'signed a clinical note for patient OMRS-001', t: '2 mins ago' },
              { a: 'System', text: 'completed daily encrypted backup', t: '15 mins ago' },
              { a: 'Nurse Joy', text: 'recorded critical vitals for patient OMRS-042', t: '1 hour ago' },
              { a: 'Receptionist Admin', text: 'registered 5 new patients', t: '2 hours ago' },
            ].map((log, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs shrink-0 font-bold text-muted-foreground">{log.a[0]}</div>
                <div className="flex-1 border-b border-border pb-4">
                  <p className="text-sm"><span className="font-semibold text-foreground">{log.a}</span> <span className="text-muted-foreground">{log.text}</span></p>
                  <p className="text-xs text-muted-foreground mt-1">{log.t}</p>
                </div>
              </div>
            ))}
          </div>
        </BaseWidget>
        
        <BaseWidget title="System Health" className="lg:col-span-1 min-h-[300px]">
          <div className="space-y-8 mt-4">
            <div>
              <div className="flex justify-between text-sm mb-2"><span className="font-medium text-foreground">Database Connection</span><span className="text-green-500 font-bold flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />Online</span></div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden"><div className="w-full h-full bg-green-500" /></div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2"><span className="font-medium text-foreground">API Latency</span><span className="text-muted-foreground">42ms avg</span></div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden"><div className="w-[15%] h-full bg-blue-500" /></div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2"><span className="font-medium text-foreground">Storage Used</span><span className="text-muted-foreground">64%</span></div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden"><div className="w-[64%] h-full bg-amber-500" /></div>
            </div>
          </div>
        </BaseWidget>
      </div>
    </div>
  );
}
