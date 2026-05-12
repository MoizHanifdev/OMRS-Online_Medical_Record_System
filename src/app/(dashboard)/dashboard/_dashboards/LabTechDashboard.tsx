'use client';

import { FlaskConical, Activity, CheckCircle, Clock } from 'lucide-react';
import { StatCard } from '@/components/widgets/stats/StatCard';
import { BaseWidget } from '@/components/widgets/BaseWidget';

export function LabTechDashboard({ user }: { user: any }) {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Good morning, {user.name.split(' ')[0]}</h1>
        <p className="text-muted-foreground">You have 15 pending orders. 3 are STAT priority.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Pending Orders" value={15} icon={<Clock className="w-5 h-5" />} color="amber" />
        <StatCard label="STAT Priority" value={3} icon={<Activity className="w-5 h-5" />} color="red" />
        <StatCard label="In Progress" value={8} icon={<FlaskConical className="w-5 h-5" />} color="blue" />
        <StatCard label="Completed Today" value={42} icon={<CheckCircle className="w-5 h-5" />} color="green" />
      </div>

      <BaseWidget title="Lab Queue" className="min-h-[400px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-4 py-3 font-medium">Order ID</th>
                <th className="px-4 py-3 font-medium">Priority</th>
                <th className="px-4 py-3 font-medium">Patient</th>
                <th className="px-4 py-3 font-medium">Test Panel</th>
                <th className="px-4 py-3 font-medium">Time Elapsed</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { id: 'ORD-1042', p: 'STAT', pat: 'Robert Fox', test: 'Basic Metabolic Panel', time: '15 mins' },
                { id: 'ORD-1043', p: 'STAT', pat: 'Alice Cooper', test: 'Complete Blood Count', time: '10 mins' },
                { id: 'ORD-1044', p: 'Urgent', pat: 'John Doe', test: 'Lipid Panel', time: '45 mins' },
                { id: 'ORD-1045', p: 'Routine', pat: 'Sarah Chen', test: 'Thyroid Function', time: '2 hours' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-muted/30">
                  <td className="px-4 py-3 font-mono text-xs">{row.id}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${row.p === 'STAT' ? 'bg-red-100 text-red-700' : row.p === 'Urgent' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                      {row.p}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium">{row.pat}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.test}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.time}</td>
                  <td className="px-4 py-3">
                    <button className="text-primary font-medium hover:underline">Start Test</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </BaseWidget>
    </div>
  );
}
