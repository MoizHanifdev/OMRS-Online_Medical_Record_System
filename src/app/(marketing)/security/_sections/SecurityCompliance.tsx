import { Shield, Lock, FileCheck, Server } from 'lucide-react';

export function SecurityCompliance() {
  const features = [
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      desc: 'All PHI (Protected Health Information) is encrypted at rest using AES-256 and in transit using TLS 1.3.'
    },
    {
      icon: Shield,
      title: 'Role-Based Access Control',
      desc: 'Granular permissions ensure staff only see the data they need to perform their duties.'
    },
    {
      icon: FileCheck,
      title: 'Immutable Audit Logs',
      desc: 'Every read, write, and delete is recorded with a cryptographic hash chain to prevent tampering.'
    },
    {
      icon: Server,
      title: 'Reliable Infrastructure',
      desc: 'Hosted on top-tier cloud providers with multi-region redundancy and automated daily backups.'
    }
  ];

  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl font-bold mb-4">Enterprise-Grade Security</h2>
        <p className="text-xl text-muted-foreground">We treat your patients&apos; data with the same level of security as financial institutions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feat, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
              <feat.icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold mb-2">{feat.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
