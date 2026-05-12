export const mockPatient = {
  name: "Sarah Chen",
  mrn: "OMRS-2026-000247",
  age: 42,
  gender: "Female",
  dob: "1984-05-12",
  bloodType: "A+",
  avatar: "https://i.pravatar.cc/150?u=sarah"
};

export const initialProblems = [
  { id: '1', name: 'Type 2 Diabetes Mellitus', severity: 'High', date: '2023-01-15' },
  { id: '2', name: 'Essential Hypertension', severity: 'Medium', date: '2023-06-20' },
  { id: '3', name: 'Asthma', severity: 'Low', date: '2015-04-10' }
];

export const mockAllergies = [
  { id: '1', substance: 'Penicillin', severity: 'LIFE_THREATENING', reaction: 'Anaphylaxis' },
  { id: '2', substance: 'Sulfa Drugs', severity: 'MODERATE', reaction: 'Rash' }
];

export const mockMedications = [
  { id: '1', name: 'Metformin 500mg', sig: 'Take 1 tablet by mouth twice daily' },
  { id: '2', name: 'Lisinopril 10mg', sig: 'Take 1 tablet by mouth daily' },
  { id: '3', name: 'Albuterol Inhaler', sig: '2 puffs every 4-6 hours as needed' },
  { id: '4', name: 'Atorvastatin 20mg', sig: 'Take 1 tablet by mouth at bedtime' }
];

export const mockVitals = [
  { date: 'Oct 1', bp: [130, 85], hr: 72 },
  { date: 'Oct 15', bp: [128, 82], hr: 75 },
  { date: 'Nov 1', bp: [125, 80], hr: 70 },
  { date: 'Nov 15', bp: [122, 78], hr: 68 },
  { date: 'Dec 1', bp: [120, 80], hr: 72 },
];
