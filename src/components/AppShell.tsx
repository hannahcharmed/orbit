'use client';

import { usePathname } from 'next/navigation';
import { Navigation } from './Navigation';

// Pages that render without the nav shell (login, onboarding, etc.)
const SHELL_EXCLUDED = ['/login'];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showShell = !SHELL_EXCLUDED.includes(pathname);

  if (!showShell) {
    // Login page — full width, no nav
    return <>{children}</>;
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
