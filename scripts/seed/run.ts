import { connectDB } from '../../src/lib/db/mongoose';
import { clearDatabase } from './utils';
import { seedUsers } from './data/users';
import { seedClinicalData } from './data/clinical';
import mongoose from 'mongoose';

async function run() {
  try {
    console.log('Connecting to database...');
    await connectDB();
    
    await clearDatabase();
    
    const { doctors, nurses, patients } = await seedUsers();
    await seedClinicalData(patients, doctors, nurses);

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

run();
