import { BaseWidget } from '@/components/widgets/BaseWidget';
import { Upload, Folder, File, Download, MoreVertical, Search, Plus } from 'lucide-react';

export default function DocumentsTab() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Documents</h2>
          <p className="text-muted-foreground">8 files stored for this patient.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-border bg-card rounded-lg text-sm font-medium hover:bg-muted flex items-center gap-2">
            <Folder className="w-4 h-4" /> New Folder
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 flex items-center gap-2">
            <Upload className="w-4 h-4" /> Upload Files
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Folder Tree */}
        <div className="md:col-span-1 space-y-2">
          <div className="relative mb-4">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
            <input type="text" placeholder="Search files..." className="w-full pl-9 pr-4 py-2 bg-card border border-border rounded-lg text-sm outline-none" />
          </div>
          
          <div className="space-y-1">
            <button className="w-full flex items-center gap-2 px-3 py-2 bg-primary/10 text-primary font-medium rounded-lg text-sm">
              <Folder className="w-4 h-4 opacity-50" fill="currentColor" /> All Documents
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-muted text-muted-foreground font-medium rounded-lg text-sm">
              <Folder className="w-4 h-4" /> Insurance (2)
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-muted text-muted-foreground font-medium rounded-lg text-sm">
              <Folder className="w-4 h-4" /> Referrals (1)
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-muted text-muted-foreground font-medium rounded-lg text-sm">
              <Folder className="w-4 h-4" /> Lab Reports (5)
            </button>
          </div>
        </div>

        {/* File Grid */}
        <div className="md:col-span-3">
          <BaseWidget title="All Documents" isEmpty={false} className="min-h-[500px]">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-border text-muted-foreground">
                  <tr>
                    <th className="px-4 py-2 font-medium">Name</th>
                    <th className="px-4 py-2 font-medium">Date Uploaded</th>
                    <th className="px-4 py-2 font-medium">Size</th>
                    <th className="px-4 py-2 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { name: 'Insurance_Card_Front.jpg', date: 'Oct 12, 2025', size: '2.4 MB', type: 'image' },
                    { name: 'Insurance_Card_Back.jpg', date: 'Oct 12, 2025', size: '1.8 MB', type: 'image' },
                    { name: 'Cardiology_Referral_Notes.pdf', date: 'Sep 05, 2025', size: '450 KB', type: 'pdf' },
                    { name: 'Blood_Panel_Results_Aug.pdf', date: 'Aug 20, 2025', size: '1.2 MB', type: 'pdf' },
                  ].map((file, i) => (
                    <tr key={i} className="hover:bg-muted/50 transition-colors group">
                      <td className="px-4 py-3 flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-muted flex items-center justify-center shrink-0">
                          <File className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <span className="font-medium text-foreground">{file.name}</span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{file.date}</td>
                      <td className="px-4 py-3 text-muted-foreground">{file.size}</td>
                      <td className="px-4 py-3 text-right">
                        <button className="p-1.5 text-muted-foreground hover:text-foreground rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-muted-foreground hover:text-foreground rounded opacity-0 group-hover:opacity-100 transition-opacity ml-1">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </BaseWidget>
        </div>
      </div>
    </div>
  );
}
