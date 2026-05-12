import * as React from 'react';

export function AccountLockedEmail({ reason, durationMinutes }: { reason: string; durationMinutes: number }) {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1 style={{ color: 'red' }}>Your OMRS account has been locked</h1>
      <p>Your account was locked due to: {reason}.</p>
      <p>The lock will expire in {durationMinutes} minutes.</p>
      <a href={`${process.env.NEXT_PUBLIC_APP_URL}/support`} style={{ padding: '10px 20px', background: '#666', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
        Contact support
      </a>
    </div>
  );
}
