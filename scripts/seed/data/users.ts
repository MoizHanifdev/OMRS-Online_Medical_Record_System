import { User, DoctorProfile, PatientProfile } from '../../../src/lib/models/index';
import { faker } from '@faker-js/faker';

export async function seedUsers() {
  console.log('Seeding users and profiles...');

  // 1 Admin
  const admin = await User.create({
    email: 'admin@omrs.local',
    password: 'Password123!',
    name: { first: 'System', last: 'Admin' },
    role: 'ADMIN',
    isActive: true,
    isEmailVerified: true,
  });

  // 10 Doctors
  const doctors = [];
  const specs = ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'General Medicine'];
  for (let i = 0; i < 10; i++) {
    const doc = await User.create({
      email: faker.internet.email({ provider: 'omrs.local' }).toLowerCase(),
      password: 'Password123!',
      name: { first: faker.person.firstName(), last: faker.person.lastName() },
      role: 'DOCTOR',
      isActive: true,
      isEmailVerified: true,
    });
    doctors.push(doc);

    await DoctorProfile.create({
      userId: doc._id,
      licenseNumber: `LIC-${faker.string.numeric(6)}`,
      specialization: specs[i % specs.length],
      yearsOfExperience: faker.number.int({ min: 1, max: 30 }),
      consultationFee: faker.number.int({ min: 50, max: 200 }),
      languages: ['English', 'Spanish'],
      workingHours: [
        { day: 'Monday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      ],
      appointmentSlotDuration: 30,
      acceptingNewPatients: true,
    });
  }

  // 5 Nurses
  const nurses = [];
  for (let i = 0; i < 5; i++) {
    nurses.push(await User.create({
      email: faker.internet.email({ provider: 'omrs.local' }).toLowerCase(),
      password: 'Password123!',
      name: { first: faker.person.firstName(), last: faker.person.lastName() },
      role: 'NURSE',
      isActive: true,
    }));
  }

  // 50 Patients
  const patients = [];
  for (let i = 0; i < 50; i++) {
    const pUser = await User.create({
      email: faker.internet.email().toLowerCase(),
      password: 'Password123!',
      name: { first: faker.person.firstName(), last: faker.person.lastName() },
      role: 'PATIENT',
      isActive: true,
    });
    patients.push(pUser);

    await PatientProfile.create({
      userId: pUser._id,
      dateOfBirth: faker.date.birthdate({ min: 1, max: 90, mode: 'age' }),
      gender: faker.helpers.arrayElement(['MALE', 'FEMALE']),
      bloodGroup: faker.helpers.arrayElement(['A+', 'O+', 'B+', 'AB-', 'O-']),
      emergencyContact: {
        name: faker.person.fullName(),
        phone: faker.phone.number(),
      },
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        country: 'USA',
        coordinates: { type: 'Point', coordinates: [faker.location.longitude(), faker.location.latitude()] },
      },
      physicalAttributes: {
        height: faker.number.int({ min: 150, max: 190 }),
        weight: faker.number.int({ min: 50, max: 100 }),
      }
    });
  }

  return { admin, doctors, nurses, patients };
}
