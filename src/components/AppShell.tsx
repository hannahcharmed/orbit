'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Navigation } from './Navigation';
import { useAuth } from '@/lib/auth-context';

// Pages that render without the nav shell (login, onboarding, etc.)
const SHELL_EXCLUDED = ['/login'];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const showShell = !SHELL_EXCLUDED.includes(pathname);

  useEffect(() => {
    if (!isLoading && !isAuthenticated && showShell) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, showShell, router]);

  if (!showShell) {
    // Login page — full width, no nav
    return <>{children}</>;
  }

  if (isLoading || !isAuthenticated) {
    // Show blank while auth state resolves / redirect fires
    return <div className="min-h-screen bg-deep-void" />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Navigation />
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        {children}
      </main>
    </div>
  );
}
