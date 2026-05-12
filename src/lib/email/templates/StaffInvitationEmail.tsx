import * as React from 'react';

export function StaffInvitationEmail({ name, role, setupUrl }: { name: string; role: string; setupUrl: string }) {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>You&apos;re invited to join OMRS</h1>
      <p>Dr. {name}, you&apos;ve been invited as a {role}.</p>
      <a href={setupUrl} style={{ padding: '10px 20px', background: '#0066cc', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
        Set up your account
      </a>
      <p style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>This link expires in 24 hours.</p>
    </div>
  );
}
