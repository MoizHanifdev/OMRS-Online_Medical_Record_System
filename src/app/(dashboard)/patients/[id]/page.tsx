import { BaseWidget } from '@/components/widgets/BaseWidget';
import { ActivitySquare, Pill, CheckCircle2, ChevronRight, Activity, Calendar, FileText } from 'lucide-react';
import Link from 'next/link';

export default function PatientOverviewTab({ params }: { params: { id: string } }) {
  const patientId = params.id;

  return (
    <div className="space-y-6">
      {/* Row 1: Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          <BaseWidget title="Active Problems" className="min-h-[250px]">
            <div className="space-y-3 mt-2">
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <span className="font-semibold flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"/> Type 2 Diabetes</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <span className="font-semibold flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-500"/> Hypertension</span>
              </div>
            </div>
            <div className="mt-4 text-center">
              <Link href={`/patients/${patientId}/problems`} className="text-sm font-semibold text-primary hover:underline">View all</Link>
            </div>
          </BaseWidget>

          <BaseWidget title="Active Medications" className="min-h-[250px]">
            <div className="space-y-3 mt-2">
              <div className="flex justify-between items-start pb-2 border-b border-border">
                <div>
                  <p className="font-semibold text-sm">Metformin 500mg</p>
                  <p className="text-xs text-muted-foreground">Take 1 tablet twice daily</p>
                </div>
              </div>
              <div className="flex justify-between items-start pb-2 border-b border-border">
                <div>
                  <p className="font-semibold text-sm">Lisinopril 10mg</p>
                  <p className="text-xs text-muted-foreground">Take 1 tablet daily</p>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <Link href={`/patients/${patientId}/medications`} className="text-sm font-semibold text-primary hover:underline">View all</Link>
            </div>
          </BaseWidget>

          <BaseWidget title="Care Plan Progress" className="min-h-[250px]">
            <div className="flex flex-col items-center justify-center h-full pt-4">
              <div className="relative w-24 h-24 flex items-center justify-center mb-2">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-muted" />
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="251" strokeDashoffset="62" className="text-green-500" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold">75%</span>
                </div>
              </div>
              <p className="text-sm font-medium text-center">3 of 4 goals met</p>
              <Link href={`/patients/${patientId}/care-plans`} className="text-xs font-semibold text-primary hover:underline mt-4">View Plan</Link>
            </div>
          </BaseWidget>
        </div>

        {/* Quick Stats Micro KPIs */}
        <BaseWidget title="Patient Stats" className="min-h-[250px]">
          <div className="space-y-4 mt-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Visits this year</span>
              <span className="font-bold">4</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Days since last visit</span>
              <span className="font-bold">2</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Prescriptions</span>
              <span className="font-bold">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Documents on file</span>
              <span className="font-bold">8</span>
            </div>
          </div>
        </BaseWidget>
      </div>

      {/* Row 2: Vitals & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BaseWidget title="Latest Vitals Snapshot" className="min-h-[300px]" headerRight={<button className="text-xs font-semibold text-primary">Record</button>}>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="p-4 bg-muted/30 border border-border rounded-xl">
              <p className="text-xs text-muted-foreground mb-1 uppercase font-semibold">Blood Pressure</p>
              <p className="text-2xl font-bold">120<span className="text-muted-foreground text-lg">/80</span></p>
              <p className="text-[10px] text-green-500 mt-1">Normal</p>
            </div>
            <div className="p-4 bg-muted/30 border border-border rounded-xl">
              <p className="text-xs text-muted-foreground mb-1 uppercase font-semibold">Heart Rate</p>
              <p className="text-2xl font-bold">72 <span className="text-sm text-muted-foreground font-normal">bpm</span></p>
              <p className="text-[10px] text-muted-foreground mt-1">Resting</p>
            </div>
            <div className="p-4 bg-muted/30 border border-border rounded-xl">
              <p className="text-xs text-muted-foreground mb-1 uppercase font-semibold">Weight</p>
              <p className="text-2xl font-bold">78.5 <span className="text-sm text-muted-foreground font-normal">kg</span></p>
            </div>
            <div className="p-4 bg-muted/30 border border-border rounded-xl">
              <p className="text-xs text-muted-foreground mb-1 uppercase font-semibold">BMI</p>
              <p className="text-2xl font-bold">24.2</p>
              <p className="text-[10px] text-green-500 mt-1">Normal Weight</p>
            </div>
          </div>
        </BaseWidget>

        <BaseWidget title="Recent Activity" className="min-h-[300px]">
          <div className="space-y-4 mt-2">
            {[
              { icon: FileText, title: 'Note Signed', desc: 'Progress note signed by Dr. Sarah Smith', time: '2 days ago' },
              { icon: Activity, title: 'Vitals Recorded', desc: 'Recorded by Nurse Joy', time: '2 days ago' },
              { icon: Pill, title: 'Prescription Renewed', desc: 'Metformin 500mg', time: '1 month ago' },
            ].map((activity, i) => {
              const Icon = activity.icon;
              return (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.desc} • {activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6">
            <Link href={`/patients/${patientId}/timeline`} className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
              View full timeline <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </BaseWidget>
      </div>
    </div>
  );
}
