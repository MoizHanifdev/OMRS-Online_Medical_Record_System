import React from 'react';
import { PatientHero } from './_components/PatientHero';
import { PatientTabBar } from './_components/PatientTabBar';
import { AllergyWarningBanner } from './_components/AllergyWarningBanner';

export default function PatientDetailLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  // Stub patient data
  const patient = {
    id: params.id,
    name: params.id === '1' ? 'Robert Fox' : 'Sarah Chen',
    mrn: `OMRS-2026-00${params.id}`,
    age: 42,
    gender: 'Male',
    bloodGroup: 'O+',
    phone: '+1 555-0192',
    tags: ['VIP', 'Diabetic'],
    hasSevereAllergies: true,
    lastVisit: '2 days ago',
    nextAppointment: 'In 3 days at 10:00 AM',
    primaryDoctor: 'Dr. Sarah Smith',
    insuranceProvider: 'BlueCross',
    insurancePolicy: '•••• 4421'
  };

  return (
    <div className="flex flex-col min-h-full">
      {patient.hasSevereAllergies && (
        <AllergyWarningBanner allergens={['Penicillin', 'Shellfish']} />
      )}
      
      <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full space-y-6">
        <PatientHero patient={patient} />
        
        {/* Quick Stats Row */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <div className="px-4 py-2 bg-card border border-border rounded-xl text-sm whitespace-nowrap shadow-sm hover:border-primary transition-colors cursor-pointer">
            <span className="text-muted-foreground mr-2">Active Problems</span>
            <span className="font-bold text-foreground">3</span>
          </div>
          <div className="px-4 py-2 bg-card border border-border rounded-xl text-sm whitespace-nowrap shadow-sm hover:border-primary transition-colors cursor-pointer">
            <span className="text-muted-foreground mr-2">Active Medications</span>
            <span className="font-bold text-foreground">5</span>
          </div>
          <div className="px-4 py-2 bg-card border border-border rounded-xl text-sm whitespace-nowrap shadow-sm hover:border-red-500 transition-colors cursor-pointer">
            <span className="text-muted-foreground mr-2">Allergies</span>
            <span className="font-bold text-red-600">2</span>
          </div>
          <div className="px-4 py-2 bg-card border border-border rounded-xl text-sm whitespace-nowrap shadow-sm hover:border-primary transition-colors cursor-pointer">
            <span className="text-muted-foreground mr-2">Total Notes</span>
            <span className="font-bold text-foreground">12</span>
          </div>
        </div>

        <PatientTabBar patientId={patient.id} />
        
        <div className="pt-2">
          {children}
        </div>
      </div>
    </div>
  );
}
