'use client';

import { KeyRound, ShieldCheck, Smartphone, Laptop, AlertTriangle, Fingerprint, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function SecurityOverviewPage() {
  const cards = [
    {
      title: 'Password',
      desc: 'Last changed 45 days ago',
      icon: KeyRound,
      status: 'Good',
      statusColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      action: 'Change Password',
      href: '/settings/security/password'
    },
    {
      title: 'Two-Factor Authentication (2FA)',
      desc: 'Authenticator app configured',
      icon: ShieldCheck,
      status: 'Enabled',
      statusColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      action: 'Manage 2FA',
      href: '/settings/security/two-factor'
    },
    {
      title: 'Passkeys',
      desc: 'Passwordless login with biometrics',
      icon: Fingerprint,
      status: '1 Key',
      statusColor: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
      action: 'Manage Passkeys',
      href: '/settings/security/passkeys'
    },
    {
      title: 'Active Sessions',
      desc: 'Devices currently logged into your account',
      icon: Laptop,
      status: '2 Devices',
      statusColor: 'text-muted-foreground bg-muted border-border',
      action: 'Review Sessions',
      href: '/settings/security/sessions'
    },
    {
      title: 'Login Activity',
      desc: 'Recent sign-ins to your account',
      icon: AlertTriangle,
      status: 'No Issues',
      statusColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      action: 'View Log',
      href: '/settings/security/login-activity'
    },
    {
      title: 'Trusted Devices',
      desc: 'Devices that skip 2FA',
      icon: Smartphone,
      status: '1 Device',
      statusColor: 'text-muted-foreground bg-muted border-border',
      action: 'Manage Devices',
      href: '/settings/security/trusted-devices'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Security & Sign-In</h2>
          <p className="text-muted-foreground">Manage your account security and authentication methods.</p>
        </div>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-lg text-primary flex items-center gap-2"><ShieldCheck className="w-5 h-5" /> Account Highly Secure</h3>
          <p className="text-sm text-muted-foreground mt-1">You have strong authentication enabled. No further action is required at this time.</p>
        </div>
        <div className="w-full md:w-48 bg-muted rounded-full h-2">
          <div className="bg-emerald-500 h-full rounded-full" style={{width: '100%'}}></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card, i) => (
          <Link key={i} href={card.href} className="bg-card border border-border rounded-xl p-5 hover:bg-muted/30 hover:border-primary/30 transition-all group flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <card.icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${card.statusColor}`}>
                {card.status}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{card.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{card.desc}</p>
            </div>
            <div className="flex items-center text-sm font-bold text-primary pt-3 border-t border-border group-hover:underline">
              {card.action} <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
