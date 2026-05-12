'use client';

import { Search, UserCheck, AlertTriangle, Clock, CreditCard, FileSignature, CheckCircle2 } from 'lucide-react';

export default function CheckInQueuePage() {
  const queue = [
    { id: 1, name: 'Eleanor Pena', time: '09:00 AM', status: 'Late', waitTime: '15m late', doc: 'Dr. Smith', type: 'Follow-up' },
    { id: 2, name: 'Guy Hawkins', time: '09:15 AM', status: 'Arriving', waitTime: 'In 2m', doc: 'Dr. Smith', type: 'Consultation' },
    { id: 3, name: 'Kristin Watson', time: '09:30 AM', status: 'Expected', waitTime: 'In 17m', doc: 'Dr. Doe', type: 'Annual Exam' },
    { id: 4, name: 'Cody Fisher', time: '09:45 AM', status: 'Checked In', waitTime: 'Waiting 10m', doc: 'Dr. Chen', type: 'Telemedicine (Kiosk)' }
  ];

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'Late': return 'bg-red-500/10 text-red-700 border-red-500/20';
      case 'Arriving': return 'bg-amber-500/10 text-amber-700 border-amber-500/20';
      case 'Expected': return 'bg-blue-500/10 text-blue-700 border-blue-500/20';
      case 'Checked In': return 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Check-In Queue</h2>
          <p className="text-muted-foreground">Manage today&apos;s arrivals and patient check-ins</p>
        </div>
        <div className="flex gap-2">
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
            <input type="text" placeholder="Search patient..." className="w-full pl-9 pr-4 py-2 bg-card border border-border focus:border-primary rounded-xl text-sm outline-none transition-all shadow-sm" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Queue List */}
        <div className="lg:col-span-1 bg-card border border-border rounded-xl shadow-sm flex flex-col min-h-[600px]">
          <div className="p-4 border-b border-border flex justify-between items-center bg-muted/20">
            <h3 className="font-bold">Arrivals Board</h3>
            <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded">24 Today</span>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-border p-2">
            {queue.map(item => (
              <div key={item.id} className="p-3 hover:bg-muted/30 rounded-lg cursor-pointer transition-colors group">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">{item.name}</h4>
                  <span className="text-xs font-bold text-foreground">{item.time}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getStatusStyle(item.status)}`}>
                    {item.status}
                  </span>
                  <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1"><Clock className="w-3 h-3" /> {item.waitTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Check-In Detail / Action Area */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl shadow-sm flex flex-col p-8 items-center justify-center relative overflow-hidden">
          
          {/* Active Patient Mockup */}
          <div className="w-full max-w-lg">
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-full bg-primary/10 border-4 border-background shadow-lg flex items-center justify-center text-primary mx-auto mb-4">
                <UserCheck className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold">Guy Hawkins</h2>
              <p className="text-muted-foreground">09:15 AM • Consultation with Dr. Smith</p>
            </div>

            <div className="space-y-4">
              <div className="bg-muted/10 border border-border rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center"><UserCheck className="w-5 h-5" /></div>
                  <div>
                    <p className="font-bold">Identity Verification</p>
                    <p className="text-xs text-muted-foreground">Verify photo ID on file</p>
                  </div>
                </div>
                <button className="px-3 py-1 bg-background border border-border rounded text-xs font-bold hover:bg-muted">Verify</button>
              </div>

              <div className="bg-muted/10 border border-border rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center"><FileSignature className="w-5 h-5" /></div>
                  <div>
                    <p className="font-bold">Consent Forms</p>
                    <p className="text-xs text-muted-foreground">Missing HIPAA Acknowledgment</p>
                  </div>
                </div>
                <button className="px-3 py-1 bg-amber-500/10 text-amber-700 border border-amber-500/20 rounded text-xs font-bold hover:bg-amber-500/20">Sign Now</button>
              </div>

              <div className="bg-muted/10 border border-border rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center"><CreditCard className="w-5 h-5" /></div>
                  <div>
                    <p className="font-bold">Co-Pay Collection</p>
                    <p className="text-xs text-muted-foreground">$25.00 due for today&apos;s visit</p>
                  </div>
                </div>
                <button className="px-3 py-1 bg-background border border-border rounded text-xs font-bold hover:bg-muted">Collect $25</button>
              </div>
            </div>

            <button className="w-full mt-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold shadow-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 text-lg">
              <CheckCircle2 className="w-5 h-5" /> Complete Check-In
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
