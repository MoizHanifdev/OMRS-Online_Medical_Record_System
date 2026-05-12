'use client';

import { useState } from 'react';
import { mockPatient, initialProblems, mockAllergies, mockMedications, mockVitals } from './demoData';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

type Tab = 'Overview' | 'Problems' | 'Vitals' | 'Medications' | 'Notes';

export function DemoWidget() {
  const [activeTab, setActiveTab] = useState<Tab>('Overview');
  const [problems, setProblems] = useState(initialProblems);
  const [noteSigned, setNoteSigned] = useState(false);
  const [showAddProblem, setShowAddProblem] = useState(false);
  const [newProblem, setNewProblem] = useState('');

  const handleReset = () => {
    setProblems(initialProblems);
    setNoteSigned(false);
    setActiveTab('Overview');
  };

  const handleSignNote = () => {
    setNoteSigned(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleAddProblem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProblem) return;
    setProblems([...problems, { id: Date.now().toString(), name: newProblem, severity: 'Medium', date: new Date().toISOString().split('T')[0] ?? '' }]);
    setNewProblem('');
    setShowAddProblem(false);
  };

  return (
    <div className="h-full flex bg-background text-foreground text-sm">
      {/* Sidebar */}
      <div className="w-48 md:w-56 border-r border-border bg-muted/10 flex flex-col shrink-0">
        <div className="p-4 border-b border-border text-center">
          <img src={mockPatient.avatar} alt="Patient" className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-primary/20" />
          <h3 className="font-bold">{mockPatient.name}</h3>
          <p className="text-xs text-muted-foreground">{mockPatient.mrn}</p>
          <div className="flex justify-center gap-2 mt-2 text-xs">
            <span className="px-1.5 py-0.5 bg-muted rounded">{mockPatient.age} y/o</span>
            <span className="px-1.5 py-0.5 bg-muted rounded">{mockPatient.bloodType}</span>
          </div>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {(['Overview', 'Problems', 'Vitals', 'Medications', 'Notes'] as Tab[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                activeTab === tab ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted text-muted-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <button onClick={handleReset} className="w-full text-xs text-muted-foreground hover:text-foreground">
            Reset Demo Data
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-background overflow-hidden relative">
        <div className="p-4 border-b border-border flex justify-between items-center bg-card">
          <h2 className="text-lg font-bold">{activeTab}</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'Overview' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-border rounded-xl p-4">
                    <h3 className="font-semibold text-red-500 mb-2">Allergies</h3>
                    <ul className="space-y-2">
                      {mockAllergies.map(a => (
                        <li key={a.id} className="text-sm">
                          <span className="font-medium">{a.substance}</span> — <span className="text-muted-foreground">{a.reaction}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border border-border rounded-xl p-4">
                    <h3 className="font-semibold mb-2">Recent Vitals</h3>
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-bold">{mockVitals[mockVitals.length-1]?.bp?.[0]}/{mockVitals[mockVitals.length-1]?.bp?.[1]}</span>
                      <span className="text-muted-foreground mb-1">mmHg</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Problems' && (
                <div>
                  <div className="flex justify-end mb-4">
                    <button onClick={() => setShowAddProblem(true)} className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded-lg hover:bg-primary/90 transition-colors">
                      + Add Problem
                    </button>
                  </div>
                  <div className="border border-border rounded-xl overflow-hidden">
                    <table className="w-full text-left">
                      <thead className="bg-muted/50 border-b border-border">
                        <tr>
                          <th className="p-3 font-medium text-muted-foreground">Condition</th>
                          <th className="p-3 font-medium text-muted-foreground">Severity</th>
                          <th className="p-3 font-medium text-muted-foreground">Date Logged</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {problems.map((p, i) => (
                          <motion.tr
                            key={p.id}
                            initial={i >= initialProblems.length ? { opacity: 0, backgroundColor: 'hsl(var(--primary)/0.2)' } : {}}
                            animate={{ opacity: 1, backgroundColor: 'transparent' }}
                            transition={{ duration: 1 }}
                          >
                            <td className="p-3 font-medium">{p.name}</td>
                            <td className="p-3">
                              <span className={`px-2 py-1 rounded text-xs ${p.severity === 'High' ? 'bg-red-100 text-red-700' : p.severity === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                                {p.severity}
                              </span>
                            </td>
                            <td className="p-3 text-muted-foreground">{p.date}</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'Medications' && (
                <div className="space-y-3">
                  {mockMedications.map(m => (
                    <div key={m.id} className="p-4 border border-border rounded-xl flex justify-between items-center hover:bg-muted/30 transition-colors">
                      <div>
                        <div className="font-semibold">{m.name}</div>
                        <div className="text-muted-foreground text-xs mt-1">{m.sig}</div>
                      </div>
                      <button className="px-3 py-1.5 bg-muted text-foreground text-xs font-semibold rounded-lg hover:bg-muted/80">
                        View Rx
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'Notes' && (
                <div className="border border-border rounded-xl p-6 bg-card relative">
                  <h3 className="font-bold text-lg mb-4 border-b border-border pb-2">Progress Note - Today</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p><strong className="text-foreground">S:</strong> Patient reports feeling well. Blood sugars have been stable. No chest pain or shortness of breath.</p>
                    <p><strong className="text-foreground">O:</strong> BP 120/80. Heart regular rate and rhythm. Lungs clear.</p>
                    <p><strong className="text-foreground">A:</strong> Type 2 DM, well controlled. HTN, at goal.</p>
                    <p><strong className="text-foreground">P:</strong> Continue current medications. Follow up in 3 months.</p>
                  </div>
                  
                  <div className="mt-8 flex justify-end">
                    {!noteSigned ? (
                      <button onClick={handleSignNote} className="px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all">
                        Sign & Lock Note
                      </button>
                    ) : (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2 text-green-600 font-bold border-2 border-green-600 px-4 py-2 rounded-lg rotate-[-5deg]">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                        Digitally Signed by Dr. Jenkins
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'Vitals' && (
                <div className="border border-border rounded-xl p-6 h-64 flex items-end justify-between px-12 pb-8 bg-muted/10 relative">
                  <div className="absolute top-4 left-4 font-semibold">Blood Pressure Trend</div>
                  {mockVitals.map((v, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 group relative">
                      <div className="absolute bottom-full mb-2 bg-foreground text-background text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                        {v.bp[0]}/{v.bp[1]} mmHg
                      </div>
                      <div className="w-12 bg-primary/20 rounded-t-sm relative flex items-end justify-center group-hover:bg-primary/30 transition-colors" style={{ height: `${v.bp[0]}px` }}>
                        <div className="w-full bg-primary/60 rounded-t-sm absolute bottom-0" style={{ height: `${v.bp[1]}px` }}></div>
                      </div>
                      <div className="text-xs text-muted-foreground">{v.date}</div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Modal Overlay for Add Problem */}
        <AnimatePresence>
          {showAddProblem && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <motion.form
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleAddProblem}
                className="bg-card p-6 rounded-xl border border-border shadow-2xl w-full max-w-sm"
              >
                <h3 className="font-bold text-lg mb-4">Add Problem</h3>
                <input
                  type="text"
                  autoFocus
                  required
                  placeholder="E.g., Migraine"
                  value={newProblem}
                  onChange={(e) => setNewProblem(e.target.value)}
                  className="w-full p-2 border border-input rounded-lg mb-4 bg-background focus:ring-2 focus:ring-primary"
                />
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setShowAddProblem(false)} className="px-3 py-1.5 rounded-lg hover:bg-muted text-sm font-medium">Cancel</button>
                  <button type="submit" className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90">Save</button>
                </div>
              </motion.form>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
