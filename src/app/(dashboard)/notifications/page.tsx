import { auth } from '@/auth/config';
import { redirect } from 'next/navigation';
import { Bell, Search, CheckCircle2, AlertCircle, Calendar, Pill, FileText } from 'lucide-react';
import { BaseWidget } from '@/components/widgets/BaseWidget';

export default async function NotificationsPage() {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const notifications = [
    { id: 1, type: 'CRITICAL', title: 'Critical Lab Result', desc: 'Patient Robert Fox Potassium 6.8 mmol/L (High)', time: '2 mins ago', read: false, icon: AlertCircle, color: 'text-red-600 bg-red-100' },
    { id: 2, type: 'APPOINTMENT', title: 'Appointment Canceled', desc: 'Emma Watson canceled their 2:00 PM appointment', time: '1 hour ago', read: false, icon: Calendar, color: 'text-amber-600 bg-amber-100' },
    { id: 3, type: 'CLINICAL', title: 'Note Signed', desc: 'Dr. Smith signed the progress note for John Doe', time: '3 hours ago', read: true, icon: FileText, color: 'text-blue-600 bg-blue-100' },
    { id: 4, type: 'MEDICATION', title: 'Refill Request', desc: 'Pharmacy requested refill for Lisinopril 10mg (Sarah Chen)', time: '5 hours ago', read: true, icon: Pill, color: 'text-purple-600 bg-purple-100' },
    { id: 5, type: 'SYSTEM', title: 'System Update', desc: 'OMRS will undergo scheduled maintenance at 2 AM EST', time: '1 day ago', read: true, icon: Bell, color: 'text-slate-600 bg-slate-100' },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground mt-1">Manage your alerts and messages.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-border bg-card rounded-lg text-sm font-medium hover:bg-muted transition-colors flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Mark all as read
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="md:col-span-1 space-y-6">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-9 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          <div className="space-y-1">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">Filters</h3>
            <button className="w-full text-left px-3 py-2 rounded-lg bg-primary/10 text-primary font-medium text-sm">All Notifications</button>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted text-muted-foreground font-medium text-sm">Unread (2)</button>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted text-muted-foreground font-medium text-sm">Critical</button>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted text-muted-foreground font-medium text-sm">Clinical</button>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted text-muted-foreground font-medium text-sm">System</button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="md:col-span-3">
          <BaseWidget title="Inbox" isEmpty={false} className="min-h-[500px]">
            <div className="space-y-2">
              {notifications.map((n) => {
                const Icon = n.icon;
                return (
                  <div key={n.id} className={`flex items-start gap-4 p-4 rounded-xl border transition-colors cursor-pointer group ${n.read ? 'border-border bg-card hover:bg-muted/50' : 'border-primary/20 bg-primary/5 hover:bg-primary/10'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${n.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className={`text-sm truncate ${n.read ? 'font-medium text-foreground' : 'font-bold text-foreground'}`}>
                          {n.title}
                        </h4>
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{n.time}</span>
                      </div>
                      <p className={`text-sm ${n.read ? 'text-muted-foreground' : 'text-foreground font-medium'}`}>{n.desc}</p>
                    </div>
                    {!n.read && (
                      <div className="w-2.5 h-2.5 bg-primary rounded-full shrink-0 mt-1.5" />
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 flex justify-center">
              <button className="px-4 py-2 border border-border bg-card rounded-lg text-sm font-medium hover:bg-muted transition-colors">
                Load More
              </button>
            </div>
          </BaseWidget>
        </div>
      </div>
    </div>
  );
}
