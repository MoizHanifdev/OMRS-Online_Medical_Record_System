import { redirect } from 'next/navigation';
import { auth } from '@/auth/config';
import { DashboardSidebar } from './_components/DashboardSidebar';
import { DashboardTopbar } from './_components/DashboardTopbar';
import { PageTransitionWrapper } from '@/components/transitions/PageTransitionWrapper';
import { CommandPalette } from './_components/CommandPalette';
import { EmailVerificationBanner } from './_components/EmailVerificationBanner';
import { SessionTimeoutModal } from '@/components/auth/SessionTimeoutModal';
import { RealtimeProvider } from '@/lib/notifications/realtime';
import { MobileBottomNav } from './_components/MobileBottomNav';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect('/login');

  return (
    <RealtimeProvider>
      <div className="h-screen flex bg-background overflow-hidden">
        <DashboardSidebar role={session.user.role} userId={session.user.id} />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardTopbar user={session.user} />
          {!session.user.isEmailVerified && <EmailVerificationBanner />}
          <main className="flex-1 overflow-y-auto bg-muted/20 relative">
            <PageTransitionWrapper>{children}</PageTransitionWrapper>
          </main>
          <MobileBottomNav role={session.user.role} />
        </div>
      </div>
      <CommandPalette />
      <SessionTimeoutModal />
    </RealtimeProvider>
  );
}
