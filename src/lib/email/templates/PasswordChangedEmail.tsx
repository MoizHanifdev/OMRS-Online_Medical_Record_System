import * as React from 'react';

export function PasswordChangedEmail({ ip, device, date }: { ip: string; device: string; date: string }) {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>Your password has been changed</h1>
      <p>This is a confirmation that your password was successfully changed.</p>
      <ul>
        <li>Date: {date}</li>
        <li>IP Address: {ip}</li>
        <li>Device: {device}</li>
      </ul>
      <p style={{ color: 'red' }}>If this wasn&apos;t you, contact us immediately.</p>
    </div>
  );
}
