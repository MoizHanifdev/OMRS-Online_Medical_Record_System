'use client';

import { Search, Filter, Plus, MoreVertical, ShieldAlert, Mail, UserX, CheckCircle2, Lock, ShieldCheck, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function AdminUserManagementPage() {
  const users = [
    { id: 'U-101', name: 'Dr. Sarah Smith', email: 'sarah.smith@omrs.hospital.com', role: 'Doctor', dept: 'Cardiology', status: 'Active', mfa: true, lastLogin: '10 mins ago' },
    { id: 'U-102', name: 'Nurse Aisha', email: 'aisha@omrs.hospital.com', role: 'Nurse', dept: 'ICU', status: 'Active', mfa: true, lastLogin: '1 hour ago' },
    { id: 'U-103', name: 'Michael Admin', email: 'admin@omrs.hospital.com', role: 'Admin', dept: 'IT', status: 'Active', mfa: true, lastLogin: '2 days ago' },
    { id: 'U-104', name: 'Dr. John Doe', email: 'johndoe@omrs.hospital.com', role: 'Doctor', dept: 'Neurology', status: 'Suspended', mfa: false, lastLogin: '3 months ago' },
    { id: 'U-105', name: 'Jane Reception', email: 'jane@omrs.hospital.com', role: 'Receptionist', dept: 'Front Desk', status: 'Pending', mfa: false, lastLogin: 'Never' }
  ];

  const getRoleBadge = (role: string) => {
    switch(role) {
      case 'Admin': return 'bg-purple-500/10 text-purple-700 border-purple-500/20';
      case 'Doctor': return 'bg-blue-500/10 text-blue-700 border-blue-500/20';
      case 'Nurse': return 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-500/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return 'text-emerald-600 bg-emerald-500/10';
      case 'Suspended': return 'text-red-600 bg-red-500/10';
      case 'Pending': return 'text-amber-600 bg-amber-500/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-muted/10 overflow-hidden">
      
      {/* Top Header */}
      <div className="p-6 bg-card border-b border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0 shadow-sm z-10">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
          <p className="text-muted-foreground">Manage staff access, roles, and security policies.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative w-64 hidden md:block">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
            <input type="text" placeholder="Search by name or email..." className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-transparent focus:border-primary rounded-xl text-sm outline-none transition-all" />
          </div>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 flex items-center gap-2 shadow-sm">
            <Plus className="w-4 h-4" /> Invite User
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-background min-w-0 overflow-hidden p-6">
        
        {/* Bulk Actions / Filters Bar */}
        <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex gap-2">
            <select className="px-3 py-1.5 bg-card border border-border rounded-lg text-sm font-semibold outline-none focus:border-primary">
              <option>All Roles</option>
              <option>Admin</option>
              <option>Doctor</option>
              <option>Nurse</option>
              <option>Receptionist</option>
            </select>
            <select className="px-3 py-1.5 bg-card border border-border rounded-lg text-sm font-semibold outline-none focus:border-primary">
              <option>All Statuses</option>
              <option>Active</option>
              <option>Suspended</option>
              <option>Pending</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-sm font-bold text-muted-foreground hover:bg-muted rounded transition-colors disabled:opacity-50" disabled>Suspend Selected</button>
            <button className="px-3 py-1.5 text-sm font-bold text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50" disabled>Force Reset Auth</button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="flex-1 overflow-auto custom-scrollbar">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-muted/30 border-b border-border sticky top-0 z-10 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-6 py-4 font-semibold w-12"><input type="checkbox" className="rounded" /></th>
                  <th className="px-6 py-4 font-semibold">User</th>
                  <th className="px-6 py-4 font-semibold">Role & Dept</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Security</th>
                  <th className="px-6 py-4 font-semibold">Last Login</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-muted/10 transition-colors group">
                    <td className="px-6 py-4"><input type="checkbox" className="rounded" /></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold">{user.name}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1"><Mail className="w-3 h-3" /> {user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getRoleBadge(user.role)}`}>
                        {user.role}
                      </span>
                      <div className="text-xs text-muted-foreground mt-1">{user.dept}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {user.mfa ? (
                        <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold"><ShieldCheck className="w-4 h-4" /> 2FA On</div>
                      ) : (
                        <div className="flex items-center gap-1 text-amber-600 text-xs font-bold"><AlertTriangle className="w-4 h-4" /> 2FA Off</div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-semibold text-muted-foreground">
                      {user.lastLogin}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Footer */}
          <div className="p-4 border-t border-border bg-muted/20 flex justify-between items-center text-sm font-semibold shrink-0">
            <span className="text-muted-foreground">Showing 1-5 of 84 users</span>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 border border-border bg-card rounded hover:bg-muted disabled:opacity-50">Previous</button>
              <button className="px-3 py-1.5 border border-border bg-card rounded hover:bg-muted">Next</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
