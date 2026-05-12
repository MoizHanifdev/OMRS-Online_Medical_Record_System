import { Problem, Allergy, Medication, VitalSign, LabOrder, RadiologyOrder, PatientProfile, User } from '../../../src/lib/models/index';
import { faker } from '@faker-js/faker';
import { getRandomItem } from '../utils';

export async function seedClinicalData(patients: any[], doctors: any[], nurses: any[]) {
  console.log('Seeding clinical data...');

  const patientProfiles = await PatientProfile.find();

  for (const profile of patientProfiles) {
    const doc = getRandomItem(doctors);
    const nurse = getRandomItem(nurses);

    // Vitals
    for (let i = 0; i < 3; i++) {
      await VitalSign.create({
        patientId: profile._id,
        recordedBy: nurse._id,
        recordedAt: faker.date.recent({ days: 30 }),
        vitals: {
          systolicBP: faker.number.int({ min: 110, max: 140 }),
          diastolicBP: faker.number.int({ min: 70, max: 90 }),
          heartRate: faker.number.int({ min: 60, max: 100 }),
          temperature: { value: faker.number.float({ min: 36.5, max: 37.5 }), site: 'ORAL' },
          oxygenSaturation: faker.number.int({ min: 95, max: 100 }),
          weight: profile.physicalAttributes?.weight,
          height: profile.physicalAttributes?.height,
        }
      });
    }

    // Problems
    if (Math.random() > 0.5) {
      await Problem.create({
        patientId: profile._id,
        recordedBy: doc._id,
        status: 'ACTIVE',
        severity: 'MODERATE',
        onsetDate: faker.date.past({ years: 1 }),
        icd10Description: faker.helpers.arrayElement(['Essential (primary) hypertension', 'Type 2 diabetes mellitus', 'Asthma']),
      });
    }

    // Allergies
    if (Math.random() > 0.7) {
      await Allergy.create({
        patientId: profile._id,
        allergen: faker.helpers.arrayElement(['Penicillin', 'Peanuts', 'Latex']),
        severity: faker.helpers.arrayElement(['MILD', 'MODERATE', 'SEVERE']),
        recordedBy: nurse._id,
      });
    }

    // Medications
    if (Math.random() > 0.5) {
      await Medication.create({
        patientId: profile._id,
        drugName: faker.helpers.arrayElement(['Lisinopril', 'Metformin', 'Albuterol']),
        dosage: '10mg',
        frequency: 'OD',
        startDate: faker.date.recent({ days: 60 }),
        status: 'ACTIVE',
        prescribedBy: doc._id,
      });
    }
  }
}
