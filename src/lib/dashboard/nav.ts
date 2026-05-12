import { 
  LayoutDashboard, Users, FileText, Pill, FlaskConical, Activity, 
  Calendar, Stethoscope, Microscope, BarChart3, Settings, ShieldCheck, 
  CheckSquare, ClipboardList, ScanLine, UserPlus, ClipboardCheck, 
  MessageSquare, CheckCircle, ActivitySquare
} from 'lucide-react';

export type Role = 'ADMIN' | 'DOCTOR' | 'NURSE' | 'RECEPTIONIST' | 'LAB_TECHNICIAN' | 'PATIENT';

export interface NavItem {
  label: string;
  href: string;
  icon: any; // LucideIcon
  badge?: 'count' | 'today-count' | 'due-count' | 'unsigned-count' | 'pending-count' | 'unread-count' | string;
  children?: NavItem[];
}

export const NAV_BY_ROLE: Record<Role, NavItem[]> = {
  ADMIN: [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Patients', href: '/patients', icon: Users, badge: 'count' },
    { label: 'Staff', href: '/admin/users', icon: Stethoscope },
    { label: 'Clinical', href: '/clinical', icon: FileText, children: [
      { label: 'Problems', href: '/clinical/problems', icon: ActivitySquare },
      { label: 'Medications', href: '/clinical/medications', icon: Pill },
      { label: 'Notes', href: '/clinical/notes', icon: FileText },
    ]},
    { label: 'Lab & Radiology', href: '/lab', icon: FlaskConical },
    { label: 'Appointments', href: '/appointments', icon: Calendar },
    { label: 'Analytics', href: '/analytics', icon: BarChart3 },
    { label: 'Audit Logs', href: '/admin/audit-logs', icon: ShieldCheck },
    { label: 'Settings', href: '/settings', icon: Settings },
  ],
  DOCTOR: [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'My Patients', href: '/patients', icon: Users },
    { label: 'Appointments', href: '/appointments', icon: Calendar, badge: 'today-count' },
    { label: 'Notes', href: '/clinical/notes', icon: FileText, badge: 'unsigned-count' },
    { label: 'Prescriptions', href: '/clinical/prescriptions', icon: Pill },
    { label: 'Lab Orders', href: '/lab/orders', icon: FlaskConical },
    { label: 'Radiology', href: '/radiology', icon: ScanLine },
    { label: 'Analytics', href: '/analytics', icon: BarChart3 },
    { label: 'Settings', href: '/settings', icon: Settings },
  ],
  NURSE: [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Patients', href: '/patients', icon: Users },
    { label: 'Vitals Queue', href: '/clinical/vitals', icon: Activity, badge: 'due-count' },
    { label: 'Medications', href: '/clinical/medications', icon: Pill, badge: 'due-count' },
    { label: 'Care Plans', href: '/clinical/care-plans', icon: ClipboardList },
    { label: 'Tasks', href: '/tasks', icon: CheckSquare, badge: 'count' },
    { label: 'Settings', href: '/settings', icon: Settings },
  ],
  RECEPTIONIST: [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Patients', href: '/patients', icon: Users },
    { label: 'Register New', href: '/patients/new', icon: UserPlus },
    { label: 'Appointments', href: '/appointments', icon: Calendar },
    { label: 'Check-ins', href: '/check-ins', icon: ClipboardCheck, badge: 'today-count' },
    { label: 'Settings', href: '/settings', icon: Settings },
  ],
  LAB_TECHNICIAN: [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Lab Queue', href: '/lab/queue', icon: FlaskConical, badge: 'pending-count' },
    { label: 'Radiology Queue', href: '/radiology/queue', icon: ScanLine, badge: 'pending-count' },
    { label: 'Completed', href: '/lab/completed', icon: CheckCircle },
    { label: 'Settings', href: '/settings', icon: Settings },
  ],
  PATIENT: [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'My Records', href: '/my-records', icon: FileText },
    { label: 'Medications', href: '/my-medications', icon: Pill },
    { label: 'Lab Results', href: '/my-lab-results', icon: FlaskConical },
    { label: 'Appointments', href: '/my-appointments', icon: Calendar },
    { label: 'Messages', href: '/messages', icon: MessageSquare, badge: 'unread-count' },
    { label: 'Settings', href: '/settings', icon: Settings },
  ],
};
