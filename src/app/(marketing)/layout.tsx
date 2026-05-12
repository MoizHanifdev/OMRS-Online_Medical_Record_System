import React from 'react';
import { MarketingNavbar } from './_components/MarketingNavbar';
import { MarketingFooter } from './_components/MarketingFooter';
import { ScrollProvider } from './_providers/ScrollProvider';
import { CookieBanner } from './_components/CookieBanner';
import { BackToTopButton } from './_components/BackToTopButton';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <ScrollProvider>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <MarketingNavbar />
        <main className="flex-1">
          {children}
        </main>
        <MarketingFooter />
        <CookieBanner />
        <BackToTopButton />
      </div>
    </ScrollProvider>
  );
}
