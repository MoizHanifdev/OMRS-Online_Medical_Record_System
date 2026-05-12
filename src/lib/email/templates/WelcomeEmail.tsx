import * as React from 'react';

export function WelcomeEmail({ firstName }: { firstName: string }) {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>Welcome to OMRS, {firstName}!</h1>
      <p>Your account is ready. You can now access your centralized medical records.</p>
      <a href={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`} style={{ padding: '10px 20px', background: '#0066cc', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
        Go to Dashboard
      </a>
    </div>
  );
}
