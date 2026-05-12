import { auth } from '@/auth/config';
import { redirect } from 'next/navigation';
import { Search, Filter, Plus, Users, Download, Upload } from 'lucide-react';
import Link from 'next/link';
import { PatientListTable } from './_components/PatientListTable';

export default async function PatientsListPage() {
  const session = await auth();
  if (!session?.user) redirect('/login');

  // Stub data for the patient list
  const patients = [
    { id: '1', mrn: 'OMRS-2026-001', name: 'Robert Fox', age: 42, gender: 'Male', bloodGroup: 'O+', phone: '+1 555-0192', city: 'New York', lastVisit: '2 days ago', nextAppointment: 'In 3 days', status: 'Active', tags: ['VIP', 'Diabetic'] },
    { id: '2', mrn: 'OMRS-2026-002', name: 'Sarah Chen', age: 28, gender: 'Female', bloodGroup: 'A-', phone: '+1 555-0145', city: 'San Francisco', lastVisit: '1 week ago', nextAppointment: null, status: 'Active', tags: ['High Risk'] },
    { id: '3', mrn: 'OMRS-2026-003', name: 'John Doe', age: 65, gender: 'Male', bloodGroup: 'B+', phone: '+1 555-0178', city: 'Chicago', lastVisit: '1 month ago', nextAppointment: 'Tomorrow', status: 'Active', tags: ['Geriatric'] },
  ];

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
          <p className="text-muted-foreground mt-1">Manage and view 12,450 patients.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-border bg-card rounded-lg text-sm font-medium hover:bg-muted transition-colors hidden sm:flex items-center gap-2">
            <Upload className="w-4 h-4" /> Import CSV
          </button>
          <button className="px-4 py-2 border border-border bg-card rounded-lg text-sm font-medium hover:bg-muted transition-colors hidden sm:flex items-center gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <Link href="/patients/new" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> Register New Patient
          </Link>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-3 rounded-2xl border border-border shadow-sm">
        <div className="w-full md:w-96 relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search by name, MRN, phone, email..." 
            className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-transparent focus:border-primary rounded-xl text-sm outline-none transition-all"
          />
        </div>
        <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-muted/50 hover:bg-muted rounded-xl text-sm font-medium transition-colors">
            <Filter className="w-4 h-4" /> Filters
          </button>
          <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-xl">
            <button className="p-1.5 bg-card shadow-sm rounded-lg text-foreground"><Users className="w-4 h-4" /></button>
            <button className="p-1.5 hover:bg-card/50 rounded-lg text-muted-foreground"><div className="w-4 h-4 grid grid-cols-2 gap-0.5"><div className="bg-current rounded-[1px]"/><div className="bg-current rounded-[1px]"/><div className="bg-current rounded-[1px]"/><div className="bg-current rounded-[1px]"/></div></button>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <PatientListTable data={patients} />
      </div>
    </div>
  );
}
