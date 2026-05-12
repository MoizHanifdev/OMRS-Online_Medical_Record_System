import React from 'react';
import { AuthBrandPanel } from './_components/AuthBrandPanel';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <AuthBrandPanel />
      <main className="flex items-center justify-center p-6 md:p-12 lg:p-16 relative">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>
    </div>
  );
}
