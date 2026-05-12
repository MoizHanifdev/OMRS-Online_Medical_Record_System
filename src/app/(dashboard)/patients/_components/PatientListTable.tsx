'use client';

import { useRouter } from 'next/navigation';
import { MoreVertical } from 'lucide-react';

export function PatientListTable({ data }: { data: any[] }) {
  const router = useRouter();

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted/30 border-b border-border">
          <tr>
            <th className="px-4 py-3 w-10"><input type="checkbox" className="rounded border-input text-primary focus:ring-primary" /></th>
            <th className="px-4 py-3 font-semibold">Patient</th>
            <th className="px-4 py-3 font-semibold">MRN</th>
            <th className="px-4 py-3 font-semibold">Age/Gender</th>
            <th className="px-4 py-3 font-semibold">Phone</th>
            <th className="px-4 py-3 font-semibold">Last Visit</th>
            <th className="px-4 py-3 font-semibold">Tags</th>
            <th className="px-4 py-3 w-10"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((patient) => (
            <tr 
              key={patient.id} 
              className="hover:bg-muted/30 transition-colors group cursor-pointer"
              onClick={() => router.push(`/patients/${patient.id}`)}
            >
              <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                <input type="checkbox" className="rounded border-input text-primary focus:ring-primary" />
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                    {patient.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground group-hover:text-primary transition-colors">{patient.name}</div>
                    <div className="text-xs text-muted-foreground">{patient.city}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 font-mono text-xs">{patient.mrn}</td>
              <td className="px-4 py-4">
                <span className="text-muted-foreground">{patient.age}y • {patient.gender.charAt(0)}</span>
              </td>
              <td className="px-4 py-4 text-muted-foreground">{patient.phone}</td>
              <td className="px-4 py-4 text-muted-foreground">{patient.lastVisit}</td>
              <td className="px-4 py-4">
                <div className="flex gap-1 flex-wrap">
                  {patient.tags.map((tag: string) => (
                    <span key={tag} className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-muted text-muted-foreground uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-4 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                <button className="p-1 hover:bg-muted rounded text-muted-foreground">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
