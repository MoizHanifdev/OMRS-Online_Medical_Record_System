import * as React from 'react';

export function VerifyEmail({ verifyUrl }: { verifyUrl: string }) {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>Verify your email address</h1>
      <p>Please click the button below to verify your email address. This link expires in 10 minutes.</p>
      <a href={verifyUrl} style={{ padding: '10px 20px', background: '#0066cc', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
        Verify Email
      </a>
    </div>
  );
}
