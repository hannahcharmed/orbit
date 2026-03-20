'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import {
  LayoutDashboard,
  TrendingUp,
  GitBranch,
  Star,
  Zap,
  Eye,
  Brain,
  Users,
  Settings,
  Bell,
  LogOut,
  MoreHorizontal,
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/analytics', label: 'Analytics', icon: TrendingUp },
  { href: '/orbit-path', label: 'Orbit Path', icon: GitBranch },
  { href: '/constellation', label: 'Constellation', icon: Star },
  { href: '/escape-velocity', label: 'Escape Velocity', icon: Zap },
  { href: '/dark-matter', label: 'Dark Matter', icon: Eye },
  { href: '/ai-coach', label: 'AI Coach', icon: Brain },
  { href: '/mission-control', label: 'Mission Control', icon: Users },
];

const mobileNavItems = [
  { href: '/', label: 'Home', icon: LayoutDashboard },
  { href: '/analytics', label: 'Analytics', icon: TrendingUp },
  { href: '/escape-velocity', label: 'Velocity', icon: Zap },
  { href: '/dark-matter', label: 'Trends', icon: Eye },
  { href: '/ai-coach', label: 'AI', icon: Brain },
];

function OrbitLogo() {
  return (
    <div className="flex items-center gap-2.5 px-6 py-5 border-b border-border-default">
      <svg width="28" height="28" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="48" cy="48" r="34" stroke="#A78BFA" strokeWidth="3.5" strokeLinecap="round"
          strokeDasharray="180 34" strokeDashoffset="20" fill="none" opacity="1" />
        <circle cx="48" cy="48" r="34" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round"
          strokeDasharray="160 54" strokeDashoffset="30" fill="none" opacity="0.45" />
        <circle cx="48" cy="48" r="34" stroke="#A78BFA" strokeWidth="0.8" strokeLinecap="round"
          fill="none" opacity="0.18" />
        <circle cx="75" cy="48" r="5.5" fill="#A78BFA" />
        <circle cx="75" cy="48" r="9" stroke="#A78BFA" strokeWidth="0.5" fill="none" opacity="0.3" />
      </svg>
      <span className="font-serif text-starlight tracking-[4px] text-sm font-normal opacity-95">
        ORBIT
      </span>
    </div>
  );
}

export function Navigation() {
  const pathname = usePathname();
  const { user, unreadCount, logout } = useAuth();

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden md:flex flex-col w-56 min-h-screen bg-space-black border-r border-border-default flex-shrink-0">
        <OrbitLogo />

        <div className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group ${
                  isActive
                    ? 'bg-orbit-blue/15 text-orbit-blue'
                    : 'text-text-secondary hover:text-starlight hover:bg-nebula-navy/40'
                }`}
              >
                <Icon
                  size={16}
                  strokeWidth={1.5}
                  className={isActive ? 'text-orbit-blue' : 'text-text-tertiary group-hover:text-starlight'}
                />
                <span className="text-xs font-medium">{label}</span>
                {isActive && (
                  <div className="ml-auto w-1 h-4 bg-orbit-blue rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Bottom section — real links */}
        <div className="p-3 border-t border-border-default space-y-0.5">
          <Link
            href="/notifications"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
              pathname === '/notifications'
                ? 'bg-orbit-blue/15 text-orbit-blue'
                : 'text-text-secondary hover:text-starlight hover:bg-nebula-navy/40'
            }`}
          >
            <Bell size={16} strokeWidth={1.5} className="text-text-tertiary" />
            <span className="text-xs font-medium">Notifications</span>
            {unreadCount > 0 && (
              <span className="ml-auto bg-amber text-deep-void text-[9px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                {unreadCount}
              </span>
            )}
          </Link>
          <Link
            href="/settings"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
              pathname === '/settings'
                ? 'bg-orbit-blue/15 text-orbit-blue'
                : 'text-text-secondary hover:text-starlight hover:bg-nebula-navy/40'
            }`}
          >
            <Settings size={16} strokeWidth={1.5} className="text-text-tertiary" />
            <span className="text-xs font-medium">Settings</span>
          </Link>
        </div>

        {/* User avatar + logout */}
        <div className="p-4 border-t border-border-default flex items-center gap-3">
          <Link href="/settings" className="flex items-center gap-3 flex-1 min-w-0 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orbit-blue to-nova-violet flex items-center justify-center text-xs font-semibold text-white flex-shrink-0">
              {user?.avatarInitials ?? 'JA'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-starlight truncate group-hover:text-orbit-blue transition-colors">{user?.name ?? 'Jordan Avery'}</p>
              <p className="text-[9px] text-text-quaternary truncate">{user?.handle ?? '@jordan.fit'}</p>
            </div>
          </Link>
          <button
            onClick={logout}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-text-quaternary hover:text-alert-red hover:bg-error-alert-bg transition-all flex-shrink-0"
            title="Sign out"
          >
            <LogOut size={13} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-notification-bg border-t border-border-default backdrop-blur-md">
        <div className="flex items-center justify-around px-2 py-2">
          {mobileNavItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center gap-1 px-2 py-1 min-w-[44px]"
              >
                <Icon
                  size={18}
                  strokeWidth={1.5}
                  className={isActive ? 'text-orbit-blue' : 'text-text-quaternary'}
                />
                {isActive
                  ? <div className="w-1 h-1 rounded-full bg-orbit-blue" />
                  : <span className="text-[7px] text-text-quaternary">{label}</span>
                }
              </Link>
            );
          })}
          {/* More menu — goes to notifications on mobile */}
          <Link href="/notifications" className="flex flex-col items-center gap-1 px-2 py-1 min-w-[44px] relative">
            <MoreHorizontal
              size={18}
              strokeWidth={1.5}
              className={pathname === '/notifications' ? 'text-orbit-blue' : 'text-text-quaternary'}
            />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-1 w-2 h-2 bg-amber rounded-full" />
            )}
            <span className="text-[7px] text-text-quaternary">More</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
