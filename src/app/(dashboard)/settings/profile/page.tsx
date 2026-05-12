'use client';

import { useState } from 'react';
import { Camera, Mail, Phone, MapPin, Save, User, FileText, CheckCircle2 } from 'lucide-react';

export default function ProfileSettingsPage() {
  const [isDirty, setIsDirty] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Profile Settings</h2>
          <p className="text-muted-foreground">Manage your personal information and public profile.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column - Avatar & Quick Info */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-card border border-border rounded-xl p-6 text-center shadow-sm relative overflow-hidden group">
            <div className="w-32 h-32 mx-auto rounded-full bg-primary/10 border-4 border-background shadow-md flex items-center justify-center text-primary text-4xl font-bold relative mb-4">
              JD
              <button className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white">
                <Camera className="w-8 h-8" />
              </button>
            </div>
            <h3 className="font-bold text-lg">Dr. John Doe</h3>
            <p className="text-sm text-muted-foreground mb-4">Cardiologist</p>
            <div className="flex flex-col gap-2">
              <button className="w-full py-2 bg-muted hover:bg-muted/80 text-foreground font-semibold rounded-lg text-sm transition-colors">Change Photo</button>
              <button className="w-full py-2 text-red-600 hover:bg-red-50 font-semibold rounded-lg text-sm transition-colors">Remove Photo</button>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Profile Completion</h4>
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span className="text-emerald-600">85% Complete</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mb-4">
              <div className="bg-emerald-500 h-full rounded-full" style={{width: '85%'}}></div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">Add your DEA number and languages spoken to complete your profile.</p>
          </div>
        </div>

        {/* Right Column - Forms */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Basic Info */}
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border bg-muted/20">
              <h3 className="font-bold flex items-center gap-2"><User className="w-4 h-4 text-primary" /> Basic Information</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-muted-foreground">First Name</label>
                  <input type="text" defaultValue="John" onChange={() => setIsDirty(true)} className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm font-semibold outline-none focus:border-primary" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-muted-foreground">Last Name</label>
                  <input type="text" defaultValue="Doe" onChange={() => setIsDirty(true)} className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm font-semibold outline-none focus:border-primary" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-muted-foreground">Title</label>
                  <select onChange={() => setIsDirty(true)} className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm font-semibold outline-none focus:border-primary">
                    <option selected>Dr.</option>
                    <option>Mr.</option>
                    <option>Mrs.</option>
                    <option>Prof.</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-muted-foreground">Pronouns</label>
                  <select onChange={() => setIsDirty(true)} className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm font-semibold outline-none focus:border-primary">
                    <option selected>He/Him</option>
                    <option>She/Her</option>
                    <option>They/Them</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-muted-foreground">Bio</label>
                <textarea 
                  rows={4} 
                  defaultValue="Board-certified cardiologist with 15+ years of experience specializing in preventive cardiology and heart failure management." 
                  onChange={() => setIsDirty(true)} 
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium outline-none focus:border-primary resize-none custom-scrollbar" 
                />
                <p className="text-xs text-muted-foreground text-right">124 / 500 characters</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border bg-muted/20">
              <h3 className="font-bold flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> Contact Information</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-muted-foreground flex justify-between">
                  Primary Email
                  <span className="text-emerald-600 flex items-center gap-1 text-xs"><CheckCircle2 className="w-3 h-3" /> Verified</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                  <input type="email" defaultValue="johndoe@omrs.hospital.com" onChange={() => setIsDirty(true)} className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm font-semibold outline-none focus:border-primary" />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-muted-foreground flex justify-between">
                  Phone Number
                  <span className="text-emerald-600 flex items-center gap-1 text-xs"><CheckCircle2 className="w-3 h-3" /> Verified</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                  <input type="tel" defaultValue="+1 (555) 123-4567" onChange={() => setIsDirty(true)} className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm font-semibold outline-none focus:border-primary" />
                </div>
              </div>
            </div>
          </div>

          {/* Doctor Specific Fields */}
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border bg-muted/20">
              <h3 className="font-bold flex items-center gap-2"><FileText className="w-4 h-4 text-primary" /> Professional Details</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-muted-foreground flex justify-between">
                  Medical License Number
                  <span className="text-emerald-600 flex items-center gap-1 text-xs"><CheckCircle2 className="w-3 h-3" /> Validated</span>
                </label>
                <input type="text" defaultValue="MD-987654321" readOnly className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-sm font-mono font-semibold text-muted-foreground outline-none cursor-not-allowed" />
                <p className="text-xs text-muted-foreground">To update your license number, please contact Administration.</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-muted-foreground">Specializations</label>
                  <div className="flex flex-wrap gap-2 p-2 border border-border rounded-lg bg-background min-h-[42px]">
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1">Cardiology <button className="hover:text-primary/70">×</button></span>
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1">Internal Med <button className="hover:text-primary/70">×</button></span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-muted-foreground">Languages</label>
                  <input type="text" placeholder="e.g. English, Spanish" onChange={() => setIsDirty(true)} className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm font-semibold outline-none focus:border-primary" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Sticky Save Bar */}
      {isDirty && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-card border border-border shadow-xl rounded-2xl p-4 flex items-center gap-6 z-50 animate-in slide-in-from-bottom-10">
          <p className="font-bold text-sm text-foreground">Unsaved changes</p>
          <div className="flex gap-2">
            <button onClick={() => setIsDirty(false)} className="px-4 py-2 text-sm font-bold text-muted-foreground hover:bg-muted rounded-lg transition-colors">Discard</button>
            <button onClick={() => setIsDirty(false)} className="px-6 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2">
              <Save className="w-4 h-4" /> Save Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
