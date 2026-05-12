'use client';

import { useState } from 'react';
import { Plus, Users, Activity, FileText, Download } from 'lucide-react';
import { BaseWidget } from '@/components/widgets/BaseWidget';

export default function HistoryTab() {
  const [activeTab, setActiveTab] = useState<'family' | 'surgical'>('family');

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="bg-muted p-1 rounded-xl flex items-center">
          <button 
            onClick={() => setActiveTab('family')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'family' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Family History
          </button>
          <button 
            onClick={() => setActiveTab('surgical')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'surgical' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Surgical History
          </button>
        </div>

        <div className="flex gap-2">
          {activeTab === 'family' && (
            <button className="px-4 py-2 border border-border bg-card rounded-lg text-sm font-medium hover:bg-muted flex items-center gap-2">
              <Download className="w-4 h-4" /> Export Genogram
            </button>
          )}
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Record
          </button>
        </div>
      </div>

      {activeTab === 'family' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Immediate Family</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { relation: 'Mother', name: 'Alice Fox', status: 'Deceased (Age 65)', cause: 'Myocardial Infarction', conditions: ['Hypertension', 'Type 2 Diabetes'], gender: 'F' },
                { relation: 'Father', name: 'James Fox', status: 'Alive (Age 72)', cause: null, conditions: ['Hyperlipidemia'], gender: 'M' },
                { relation: 'Brother', name: 'Michael Fox', status: 'Alive (Age 40)', cause: null, conditions: ['None reported'], gender: 'M' }
              ].map((member, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-4 shadow-sm hover:border-primary/30 transition-colors group">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${member.gender === 'F' ? 'bg-pink-500/10 text-pink-600' : 'bg-blue-500/10 text-blue-600'}`}>
                        {member.gender}
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground leading-tight">{member.relation}</h4>
                        <p className="text-xs text-muted-foreground">{member.name}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm mt-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span className={`font-semibold ${member.status.includes('Deceased') ? 'text-foreground' : 'text-green-600'}`}>{member.status}</span>
                    </div>
                    {member.cause && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cause:</span>
                        <span className="font-medium text-foreground">{member.cause}</span>
                      </div>
                    )}
                    <div className="mt-2 pt-2 border-t border-border">
                      <p className="text-xs text-muted-foreground mb-1 font-semibold uppercase">Conditions:</p>
                      <div className="flex flex-wrap gap-1">
                        {member.conditions.map(c => (
                          <span key={c} className="text-[10px] font-bold uppercase tracking-wider bg-muted text-foreground px-2 py-1 rounded">{c}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <BaseWidget title="Hereditary Risk Analysis" className="sticky top-24">
              <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-foreground flex items-center gap-2 mb-1"><Activity className="w-4 h-4 text-primary" /> Elevated Risk</h4>
                  <p className="text-xs text-muted-foreground">Based on family history, patient has elevated risk for:</p>
                  <ul className="list-disc pl-5 mt-2 text-sm font-semibold text-foreground space-y-1 marker:text-primary">
                    <li>Cardiovascular Disease</li>
                    <li>Type 2 Diabetes</li>
                  </ul>
                </div>
                <div className="pt-3 border-t border-primary/10">
                  <p className="text-xs text-muted-foreground">Recommended actions:</p>
                  <div className="mt-2 space-y-2">
                    <button className="w-full text-left text-xs px-3 py-2 bg-background border border-border rounded-lg hover:bg-muted transition-colors font-medium">Add to Problem List as Risk Factor</button>
                    <button className="w-full text-left text-xs px-3 py-2 bg-background border border-border rounded-lg hover:bg-muted transition-colors font-medium">Order Annual Lipid Panel</button>
                  </div>
                </div>
              </div>
            </BaseWidget>
          </div>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm min-h-[500px]">
          <div className="relative border-l-2 border-border ml-4 md:ml-[120px] space-y-8 pb-8">
            
            {['2022', '2015'].map(year => (
              <div key={year} className="relative">
                {/* Date Header */}
                <div className="absolute -left-4 md:-left-[120px] top-0 bg-background px-2 py-1 rounded border border-border text-xs font-bold uppercase text-muted-foreground w-24 text-center md:text-right md:w-[100px] shadow-sm z-10">
                  {year}
                </div>

                <div className="space-y-8 pt-8 md:pt-0">
                  <div className="relative pl-8 md:pl-10 group">
                    {/* Node */}
                    <div className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full border-4 border-background flex items-center justify-center shadow-sm bg-blue-100`}>
                      <div className={`w-2 h-2 rounded-full bg-blue-600`} />
                    </div>
                    
                    {/* Content Card */}
                    <div className="bg-muted/30 border border-border rounded-xl p-5 hover:border-primary/30 transition-colors shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
                        <div>
                          <h4 className="font-bold text-foreground text-lg">{year === '2022' ? 'Appendectomy (Laparoscopic)' : 'Tonsillectomy'}</h4>
                          <span className="text-xs font-medium text-muted-foreground font-mono bg-muted px-1.5 py-0.5 rounded mt-1 inline-block">CPT: {year === '2022' ? '44970' : '42826'}</span>
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider bg-green-500/10 text-green-700 px-2 py-1 rounded w-fit">Successful</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-y-2 text-sm mb-4">
                        <div>
                          <span className="text-muted-foreground text-xs block mb-0.5">Surgeon</span>
                          <span className="font-medium">Dr. Robert Wilson</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground text-xs block mb-0.5">Hospital</span>
                          <span className="font-medium">Mercy General</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground text-xs block mb-0.5">Anesthesia</span>
                          <span className="font-medium">General</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground text-xs block mb-0.5">Date</span>
                          <span className="font-medium">{year === '2022' ? 'Nov 12, 2022' : 'Aug 05, 2015'}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-border flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs font-medium text-primary hover:underline cursor-pointer">View Operative Report</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
          </div>
        </div>
      )}
    </div>
  );
}
