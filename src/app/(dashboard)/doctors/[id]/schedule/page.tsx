'use client';

import { useState } from 'react';
import { Clock, Calendar, Check, Save, ShieldCheck, Sun, Moon, Coffee, AlertCircle } from 'lucide-react';

export default function DoctorScheduleManagementPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('Working Hours');

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Schedule Management</h2>
          <p className="text-muted-foreground">Configure your working hours, breaks, and time off.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 flex items-center gap-2 shadow-sm">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </div>

      <div className="flex border-b border-border bg-card px-2 rounded-t-xl">
        {['Working Hours', 'Time Off / Blocks', 'Appointment Settings'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-4 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === tab 
                ? 'border-primary text-primary' 
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-card border border-border rounded-b-xl rounded-tr-xl shadow-sm overflow-hidden p-6">
        
        {activeTab === 'Working Hours' && (
          <div className="space-y-6">
            <div className="bg-blue-500/10 border border-blue-500/20 text-blue-700 p-4 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
              <div className="text-sm">
                <p className="font-bold mb-1">Standard Working Hours</p>
                <p>These hours dictate when patients and staff can book appointments with you. Any changes will not affect existing bookings.</p>
              </div>
            </div>

            <div className="space-y-4">
              {daysOfWeek.map((day, idx) => (
                <div key={day} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-border rounded-xl bg-muted/5 hover:bg-muted/20 transition-colors">
                  <div className="w-32 flex items-center gap-3">
                    <input type="checkbox" defaultChecked={idx < 5} className="rounded text-primary w-4 h-4 focus:ring-primary" />
                    <span className={`font-bold ${idx < 5 ? 'text-foreground' : 'text-muted-foreground'}`}>{day}</span>
                  </div>
                  
                  {idx < 5 ? (
                    <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Sun className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
                          <select className="pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm font-semibold outline-none focus:border-primary">
                            <option>08:00 AM</option>
                            <option selected>09:00 AM</option>
                            <option>10:00 AM</option>
                          </select>
                        </div>
                        <span className="text-muted-foreground font-semibold">to</span>
                        <div className="relative">
                          <Moon className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
                          <select className="pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm font-semibold outline-none focus:border-primary">
                            <option>04:00 PM</option>
                            <option selected>05:00 PM</option>
                            <option>06:00 PM</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="h-6 w-px bg-border hidden sm:block"></div>
                      
                      <div className="flex items-center gap-2">
                        <Coffee className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-semibold text-muted-foreground">Break:</span>
                        <select className="px-3 py-1 bg-background border border-border rounded-lg text-xs font-semibold outline-none">
                          <option>12:00 PM - 01:00 PM</option>
                          <option>01:00 PM - 02:00 PM</option>
                        </select>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 text-sm font-semibold text-muted-foreground">
                      Not scheduled to work
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Appointment Settings' && (
          <div className="space-y-8 max-w-2xl">
            
            <div className="space-y-4">
              <h3 className="font-bold text-lg flex items-center gap-2">Default Durations</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-muted-foreground">New Patient Consult</label>
                  <select className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm font-semibold outline-none focus:border-primary">
                    <option>15 minutes</option>
                    <option>30 minutes</option>
                    <option selected>60 minutes</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-muted-foreground">Follow-up Visit</label>
                  <select className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm font-semibold outline-none focus:border-primary">
                    <option selected>15 minutes</option>
                    <option>30 minutes</option>
                    <option>45 minutes</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-muted-foreground">Telemedicine Consult</label>
                  <select className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm font-semibold outline-none focus:border-primary">
                    <option selected>20 minutes</option>
                    <option>30 minutes</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-muted-foreground">Buffer Between Visits</label>
                  <select className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm font-semibold outline-none focus:border-primary">
                    <option>0 minutes</option>
                    <option selected>5 minutes</option>
                    <option>10 minutes</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-border">
              <h3 className="font-bold text-lg">Scheduling Rules</h3>
              
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted/5 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-primary w-4 h-4 focus:ring-primary mt-0.5" />
                  <div>
                    <p className="font-bold text-sm">Allow Patient Self-Scheduling</p>
                    <p className="text-xs text-muted-foreground">Patients can book open slots via the patient portal</p>
                  </div>
                </label>
                
                <label className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted/5 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-primary w-4 h-4 focus:ring-primary mt-0.5" />
                  <div>
                    <p className="font-bold text-sm">Allow Double Booking (Overbook)</p>
                    <p className="text-xs text-muted-foreground">Receptionists can double-book up to 2 patients per slot</p>
                  </div>
                </label>
                
                <label className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted/5 cursor-pointer">
                  <input type="checkbox" className="rounded text-primary w-4 h-4 focus:ring-primary mt-0.5" />
                  <div>
                    <p className="font-bold text-sm">Require Manual Approval</p>
                    <p className="text-xs text-muted-foreground">You must manually approve self-scheduled appointments</p>
                  </div>
                </label>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
