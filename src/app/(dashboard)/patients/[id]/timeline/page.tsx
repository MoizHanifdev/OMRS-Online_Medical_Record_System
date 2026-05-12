import { BaseWidget } from '@/components/widgets/BaseWidget';
import { ActivitySquare, Pill, FileText, Calendar, Filter } from 'lucide-react';

export default function TimelineTab() {
  const events = [
    { id: 1, type: 'note', icon: FileText, title: 'Note Signed', desc: 'Progress note signed by Dr. Sarah Smith', time: '10:30 AM', color: 'text-blue-600 bg-blue-100', date: 'Today' },
    { id: 2, type: 'vitals', icon: ActivitySquare, title: 'Vitals Recorded', desc: 'BP: 120/80, HR: 72 bpm. Recorded by Nurse Joy', time: '10:00 AM', color: 'text-green-600 bg-green-100', date: 'Today' },
    { id: 3, type: 'medication', icon: Pill, title: 'Prescription Renewed', desc: 'Metformin 500mg, 30 days', time: '4:15 PM', color: 'text-purple-600 bg-purple-100', date: 'Yesterday' },
    { id: 4, type: 'appointment', icon: Calendar, title: 'Appointment Completed', desc: 'Routine follow-up with Dr. Smith', time: '2:00 PM', color: 'text-amber-600 bg-amber-100', date: 'Yesterday' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Timeline</h2>
          <p className="text-muted-foreground">Comprehensive history of all events.</p>
        </div>
        <button className="px-4 py-2 border border-border bg-card rounded-lg text-sm font-medium hover:bg-muted flex items-center gap-2">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm min-h-[500px]">
        <div className="relative border-l-2 border-border ml-4 md:ml-[120px] space-y-8 pb-8">
          
          {['Today', 'Yesterday'].map(dateGroup => (
            <div key={dateGroup} className="relative">
              {/* Date Header */}
              <div className="absolute -left-4 md:-left-[120px] top-0 bg-background px-2 py-1 rounded border border-border text-xs font-bold uppercase text-muted-foreground w-24 text-center md:text-right md:w-[100px] shadow-sm z-10">
                {dateGroup}
              </div>

              <div className="space-y-8 pt-8 md:pt-0">
                {events.filter(e => e.date === dateGroup).map((event) => {
                  const Icon = event.icon;
                  return (
                    <div key={event.id} className="relative pl-8 md:pl-10 group">
                      {/* Node */}
                      <div className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full border-4 border-background flex items-center justify-center shadow-sm ${event.color.split(' ')[1] || ''}`}>
                        <div className={`w-2 h-2 rounded-full ${(event.color.split(' ')[0] || '').replace('text-', 'bg-')}`} />
                      </div>
                      
                      {/* Content Card */}
                      <div className="bg-muted/30 border border-border rounded-xl p-4 hover:border-primary/30 transition-colors shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded flex items-center justify-center ${event.color}`}>
                              <Icon className="w-3 h-3" />
                            </div>
                            <h4 className="font-semibold text-foreground">{event.title}</h4>
                          </div>
                          <span className="text-xs font-medium text-muted-foreground">{event.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{event.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
}
