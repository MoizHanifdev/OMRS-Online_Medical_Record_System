'use client';

import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users, Plus, Download, ChevronLeft, ChevronRight, Video, Stethoscope, UserPlus } from 'lucide-react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default function AppointmentsHub() {
  const [view, setView] = useState<'month' | 'week' | 'day'>('week');
  const [date, setDate] = useState(new Date());

  const events = [
    {
      id: 1,
      title: 'Robert Fox - Follow-up',
      start: new Date(new Date().setHours(10, 0, 0, 0)),
      end: new Date(new Date().setHours(10, 30, 0, 0)),
      type: 'in-person',
      status: 'scheduled'
    },
    {
      id: 2,
      title: 'Esther Howard - Telemedicine',
      start: new Date(new Date().setHours(11, 30, 0, 0)),
      end: new Date(new Date().setHours(12, 0, 0, 0)),
      type: 'video',
      status: 'confirmed'
    },
    {
      id: 3,
      title: 'Wade Warren - Initial Consult',
      start: new Date(new Date().setHours(14, 0, 0, 0)),
      end: new Date(new Date().setHours(15, 0, 0, 0)),
      type: 'in-person',
      status: 'checked-in'
    }
  ];

  const eventStyleGetter = (event: any) => {
    let backgroundColor = '#3b82f6'; // default blue
    if (event.status === 'confirmed') backgroundColor = '#10b981'; // emerald
    if (event.status === 'checked-in') backgroundColor = '#f59e0b'; // amber
    
    return {
      style: {
        backgroundColor,
        borderRadius: '6px',
        opacity: 0.9,
        color: 'white',
        border: 'none',
        display: 'block'
      }
    };
  };

  return (
    <div className="flex flex-col h-screen bg-muted/10 overflow-hidden">
      {/* Top Header */}
      <div className="p-6 bg-card border-b border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0 shadow-sm z-10">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Appointments</h2>
          <p className="text-muted-foreground">12 today, 45 this week</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <div className="flex bg-muted/30 p-1 rounded-lg border border-border">
            {['month', 'week', 'day'].map((v) => (
              <button 
                key={v}
                onClick={() => setView(v as any)}
                className={`px-4 py-1.5 rounded-md text-sm font-semibold capitalize transition-all ${view === v ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {v}
              </button>
            ))}
          </div>

          <div className="h-6 w-px bg-border hidden md:block"></div>

          <button className="px-4 py-2 border border-border bg-card rounded-lg text-sm font-medium hover:bg-muted flex items-center gap-2 whitespace-nowrap">
            <Download className="w-4 h-4" /> iCal
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 flex items-center gap-2 shadow-sm whitespace-nowrap">
            <Plus className="w-4 h-4" /> Book Appointment
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Filters */}
        <div className="w-64 border-r border-border bg-card p-4 hidden lg:flex flex-col gap-6 overflow-y-auto">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Calendar</h3>
            <div className="flex items-center justify-between mb-4">
              <button className="p-1 hover:bg-muted rounded"><ChevronLeft className="w-4 h-4" /></button>
              <span className="font-semibold text-sm">{moment(date).format('MMMM YYYY')}</span>
              <button className="p-1 hover:bg-muted rounded"><ChevronRight className="w-4 h-4" /></button>
            </div>
            {/* Mini calendar stub */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d} className="font-bold text-muted-foreground py-1">{d}</div>)}
              {Array.from({length: 31}).map((_, i) => (
                <button key={i} className={`py-1 rounded hover:bg-muted ${i+1 === new Date().getDate() ? 'bg-primary text-primary-foreground font-bold hover:bg-primary/90' : ''}`}>{i+1}</button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Doctors</h3>
            <div className="space-y-2">
              {['Dr. Sarah Smith', 'Dr. John Doe', 'Dr. Emily Chen'].map(doc => (
                <label key={doc} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-primary focus:ring-primary" />
                  {doc}
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Legend</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold"><div className="w-3 h-3 rounded bg-blue-500"></div> Scheduled</div>
              <div className="flex items-center gap-2 text-xs font-semibold"><div className="w-3 h-3 rounded bg-emerald-500"></div> Confirmed</div>
              <div className="flex items-center gap-2 text-xs font-semibold"><div className="w-3 h-3 rounded bg-amber-500"></div> Checked In</div>
              <div className="flex items-center gap-2 text-xs font-semibold"><div className="w-3 h-3 rounded bg-gray-400"></div> Completed</div>
            </div>
          </div>
        </div>

        {/* Main Calendar Area */}
        <div className="flex-1 bg-background p-4 relative overflow-y-auto">
          {/* react-big-calendar requires explicit height */}
          <div className="h-[800px]">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              view={view}
              onView={(v) => setView(v as any)}
              date={date}
              onNavigate={setDate}
              eventPropGetter={eventStyleGetter}
              className="font-sans text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
