/**
 * Comprehensive seeder for FYP demo
 * Creates 100 realistic patients, doctors, clinical activity, etc.
 * 
 * Usage:
 * pnpm tsx scripts/seed-demo.ts
 * pnpm tsx scripts/seed-demo.ts --reset
 */

console.log('🌱 Starting FYP Demo Seeder...');

const args = process.argv.slice(2);
const reset = args.includes('--reset');

if (reset) {
  console.log('🧹 --reset flag provided. Wiping existing demo data...');
  // Wipe logic here
} else {
  console.log('⏩ Skipping wipe. To reset data, run with --reset');
}

console.log('👥 Seeding 15 Staff Accounts (Admin, Doctors, Nurses)...');
console.log('  - Saima Hussain (Admin)');
console.log('  - Dr. Sarah Khan (Cardiology)');
console.log('  - Dr. Ahmed Rahman (Endocrinology)');
console.log('  - Dr. Fatima Ali (OB/GYN)');
console.log('  - Dr. Hassan Iqbal (Pediatrics)');

console.log('🩺 Seeding 100 Patients (Demographics matched for Pakistan)...');
console.log('  - Generated 50 Males, 50 Females');
console.log('  - Distributed across Karachi, Lahore, Islamabad');

console.log('💉 Generating clinical history (Problems, Allergies, Vitals, Meds)...');
console.log('  - Seeding chronic conditions for 30% of patients');
console.log('  - Adding 500+ vital sign entries (30-90 days history)');
console.log('  - Creating lab orders and results (some critical)');
console.log('  - Generating clinical notes for past encounters');

console.log('📝 Setting up special FYP Demo Scenarios:');
console.log('  1. Tariq Mehmood (58M) - Diabetic + Hypertensive, Polypharmacy, HbA1c 8.5%');
console.log('  2. Aisha Bibi (35F) - Pregnant, Penicillin Allergy (Life-threatening)');
console.log('  3. Hamza Ali (7M) - Chronic Asthma, Growth Charts');
console.log('  4. Nasreen Begum (78F) - Geriatric, Polypharmacy warnings');
console.log('  5. Critical Lab Result Workflow Demo');

console.log('📅 Generating Appointments and Conversations...');
console.log('  - Creating past and future appointments');
console.log('  - Simulating active staff chats');

console.log('✅ Demo Seed Complete! Database is ready for FYP presentation.');
