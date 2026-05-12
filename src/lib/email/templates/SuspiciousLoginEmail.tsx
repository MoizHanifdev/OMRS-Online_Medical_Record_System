import * as React from 'react';

export function SuspiciousLoginEmail({ ip, device, location, date }: { ip: string; device: string; location: string; date: string }) {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1 style={{ color: 'orange' }}>Suspicious sign-in blocked or flagged</h1>
      <p>We detected highly unusual activity on your account.</p>
      <ul>
        <li>Date: {date}</li>
        <li>IP Address: {ip}</li>
        <li>Device: {device}</li>
        <li>Location: {location}</li>
      </ul>
      <a href={`${process.env.NEXT_PUBLIC_APP_URL}/settings/sessions`} style={{ padding: '10px 20px', background: '#d32f2f', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
        Review your sessions
      </a>
    </div>
  );
}
