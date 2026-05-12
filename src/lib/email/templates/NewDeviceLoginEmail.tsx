import * as React from 'react';

export function NewDeviceLoginEmail({ ip, device, location, date }: { ip: string; device: string; location: string; date: string }) {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>New sign-in to your OMRS account</h1>
      <p>We noticed a new sign-in to your account from an unrecognized device.</p>
      <ul>
        <li>Date: {date}</li>
        <li>IP Address: {ip}</li>
        <li>Device: {device}</li>
        <li>Location: {location}</li>
      </ul>
      <p style={{ color: 'red' }}>If this wasn&apos;t you, secure your account immediately.</p>
    </div>
  );
}
