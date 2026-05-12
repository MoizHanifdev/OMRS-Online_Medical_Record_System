import { auth } from '@/auth/config';
import { redirect } from 'next/navigation';
import { AdminDashboard } from './_dashboards/AdminDashboard';
import { DoctorDashboard } from './_dashboards/DoctorDashboard';
import { NurseDashboard } from './_dashboards/NurseDashboard';
import { ReceptionistDashboard } from './_dashboards/ReceptionistDashboard';
import { LabTechDashboard } from './_dashboards/LabTechDashboard';
import { PatientDashboard } from './_dashboards/PatientDashboard';

export default async function DashboardRootPage() {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const { role } = session.user;

  // We can eventually wrap these in a `<Suspense>` boundary and fetch initial data here.
  switch (role) {
    case 'ADMIN': return <AdminDashboard user={session.user} />;
    case 'DOCTOR': return <DoctorDashboard user={session.user} />;
    case 'NURSE': return <NurseDashboard user={session.user} />;
    case 'RECEPTIONIST': return <ReceptionistDashboard user={session.user} />;
    case 'LAB_TECHNICIAN': return <LabTechDashboard user={session.user} />;
    case 'PATIENT': return <PatientDashboard user={session.user} />;
    default: return <div>Unknown role</div>;
  }
}
