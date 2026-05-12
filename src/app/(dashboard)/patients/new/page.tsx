'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, Save } from 'lucide-react';
import Link from 'next/link';
import { BaseWidget } from '@/components/widgets/BaseWidget';

const STEPS = [
  { id: 1, title: 'Personal Info' },
  { id: 2, title: 'Address & Contact' },
  { id: 3, title: 'Medical Basics' },
  { id: 4, title: 'Insurance' },
  { id: 5, title: 'Consent' },
  { id: 6, title: 'Review' },
];

export default function NewPatientWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', dob: '', phone: '', email: '',
    bloodGroup: '', height: '', weight: '',
    hasInsurance: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
  const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/patients/1'); // redirect to created patient
    }, 1500);
  };

  return (
    <div className="min-h-full bg-muted/20 pb-24">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-16 z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Register New Patient</h1>
            <p className="text-sm text-muted-foreground">Step {currentStep} of {STEPS.length}</p>
          </div>
          <Link href="/patients" className="px-4 py-2 border border-border bg-background rounded-lg text-sm font-medium hover:bg-muted transition-colors">
            Cancel
          </Link>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted rounded-full" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full transition-all duration-300" style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }} />
            
            {STEPS.map((step) => {
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;
              
              return (
                <div key={step.id} className="relative flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors z-10 ${isActive ? 'border-primary bg-card text-primary' : isCompleted ? 'border-primary bg-primary text-primary-foreground' : 'border-muted bg-card text-muted-foreground'}`}>
                    {isCompleted ? <Check className="w-4 h-4" /> : step.id}
                  </div>
                  <span className={`absolute top-10 text-[10px] uppercase tracking-wider font-bold whitespace-nowrap transition-colors ${isActive ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Form Content Area */}
      <div className="max-w-3xl mx-auto px-4 mt-12">
        <BaseWidget title={STEPS[currentStep - 1]?.title ?? 'Step'} className="shadow-lg">
          <div className="p-2 min-h-[400px]">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="flex justify-center mb-8">
                  <div className="w-32 h-32 rounded-full border-2 border-dashed border-border bg-muted/50 flex flex-col items-center justify-center cursor-pointer hover:bg-muted transition-colors">
                    <div className="w-10 h-10 bg-card rounded-full shadow flex items-center justify-center mb-2">📸</div>
                    <span className="text-xs font-semibold text-muted-foreground">Upload Photo</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold mb-1.5 block">First Name <span className="text-red-500">*</span></label>
                    <input type="text" className="w-full px-3 py-2 bg-card border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-1.5 block">Last Name <span className="text-red-500">*</span></label>
                    <input type="text" className="w-full px-3 py-2 bg-card border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold mb-1.5 block">Date of Birth <span className="text-red-500">*</span></label>
                    <input type="date" className="w-full px-3 py-2 bg-card border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-1.5 block">Phone Number <span className="text-red-500">*</span></label>
                    <input type="tel" className="w-full px-3 py-2 bg-card border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="flex items-center justify-center h-[300px] text-muted-foreground">Address & Emergency Contact Fields Stub</div>
            )}
            
            {currentStep === 3 && (
              <div className="flex items-center justify-center h-[300px] text-muted-foreground">Medical Basics (Blood Group, Height, Weight, Allergies) Stub</div>
            )}

            {currentStep === 4 && (
              <div className="flex items-center justify-center h-[300px] text-muted-foreground">Insurance & Billing Details Stub</div>
            )}

            {currentStep === 5 && (
              <div className="flex items-center justify-center h-[300px] text-muted-foreground">Consent & Privacy Policy Stub</div>
            )}

            {currentStep === 6 && (
              <div className="space-y-6">
                <div className="p-4 bg-muted/30 border border-border rounded-xl">
                  <h3 className="font-semibold mb-4 text-primary">Summary</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs uppercase font-bold">Patient Name</p>
                      <p className="font-medium">{formData.firstName} {formData.lastName || 'Doe'}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs uppercase font-bold">Generated MRN</p>
                      <p className="font-mono font-medium text-foreground bg-muted px-2 py-0.5 rounded inline-block mt-1">OMRS-2026-0421</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </BaseWidget>
      </div>

      {/* Navigation Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-30 lg:ml-[72px] xl:ml-[280px]">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button 
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="px-6 py-2 border border-border bg-background rounded-xl font-semibold hover:bg-muted transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          
          <div className="flex gap-3">
            <button className="px-6 py-2 text-muted-foreground font-semibold hover:text-foreground transition-colors flex items-center gap-2">
              <Save className="w-4 h-4" /> Save Draft
            </button>
            
            {currentStep < STEPS.length ? (
              <button 
                onClick={handleNext}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-sm"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-8 py-2 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors flex items-center gap-2 shadow-sm"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</span>
                ) : (
                  <span className="flex items-center gap-2"><Check className="w-5 h-5" /> Register Patient</span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
