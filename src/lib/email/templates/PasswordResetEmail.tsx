import * as React from 'react';

export function PasswordResetEmail({ resetUrl }: { resetUrl: string }) {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>Reset your OMRS password</h1>
      <p>Please click the button below to reset your password. This link expires in 1 hour.</p>
      <a href={resetUrl} style={{ padding: '10px 20px', background: '#0066cc', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
        Reset Password
      </a>
      <p style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>If you didn&apos;t request this, ignore this email or contact support.</p>
    </div>
  );
}
