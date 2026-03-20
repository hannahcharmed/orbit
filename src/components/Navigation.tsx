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
    <div className="flex items-center gap-3 px-5 py-5 border-b border-white/[0.05]">
      {/* Orbit mark — three concentric arcs + planet dot */}
      <div className="relative flex-shrink-0">
        <svg width="30" height="30" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg"
          className="animate-glow-breathe">
          <circle cx="48" cy="48" r="34" stroke="#A78BFA" strokeWidth="3" strokeLinecap="round"
            strokeDasharray="175 40" strokeDashoffset="20" fill="none" />
          <circle cx="48" cy="48" r="34" stroke="#5B6EFF" strokeWidth="1.5" strokeLinecap="round"
            strokeDasharray="150 60" strokeDashoffset="35" fill="none" opacity="0.5" />
          <circle cx="48" cy="48" r="34" stroke="#00D4FF" strokeWidth="0.6"
            fill="none" opacity="0.2" />
          <circle cx="76" cy="48" r="5" fill="#A78BFA" />
          <circle cx="76" cy="48" r="9" stroke="#A78BFA" strokeWidth="0.6" fill="none" opacity="0.35" />
        </svg>
      </div>
      <div>
        <span className="font-display text-starlight tracking-[5px] text-sm font-700 opacity-95 block">
          ORBIT
        </span>
        <span className="font-display text-[7px] tracking-[0.2em] text-text-quaternary uppercase">
          Intelligence
        </span>
      </div>
    </div>
  );
}

export function Navigation() {
  const pathname = usePathname();
  const { user, unreadCount, logout } = useAuth();

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden md:flex flex-col w-56 min-h-screen flex-shrink-0"
        style={{
          background: 'linear-gradient(180deg, rgba(10,13,24,0.97) 0%, rgba(7,9,18,0.99) 100%)',
          borderRight: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <OrbitLogo />

        <div className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon }, i) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group overflow-hidden ${
                  isActive ? '' : 'hover:bg-white/[0.04]'
                }`}
                style={isActive ? {
                  background: 'linear-gradient(90deg, rgba(91,110,255,0.15) 0%, rgba(91,110,255,0.04) 100%)',
                  borderLeft: '2px solid rgba(91,110,255,0.7)',
                } : { borderLeft: '2px solid transparent' }}
              >
                {isActive && (
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ boxShadow: 'inset 0 0 20px rgba(91,110,255,0.06)' }} />
                )}
                <Icon
                  size={15}
                  strokeWidth={isActive ? 2 : 1.5}
                  className={isActive
                    ? 'text-orbit-blue flex-shrink-0'
                    : 'text-text-quaternary group-hover:text-text-secondary transition-colors flex-shrink-0'}
                />
                <span className={`font-display text-[10px] font-600 tracking-wide transition-colors ${
                  isActive ? 'text-orbit-blue' : 'text-text-secondary group-hover:text-starlight'
                }`}>
                  {label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Bottom section */}
        <div className="p-3 space-y-0.5" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <Link
            href="/notifications"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group overflow-hidden ${
              pathname === '/notifications' ? '' : 'hover:bg-white/[0.04]'
            }`}
            style={pathname === '/notifications' ? {
              background: 'linear-gradient(90deg, rgba(91,110,255,0.15) 0%, rgba(91,110,255,0.04) 100%)',
              borderLeft: '2px solid rgba(91,110,255,0.7)',
            } : { borderLeft: '2px solid transparent' }}
          >
            <Bell size={15} strokeWidth={1.5}
              className={pathname === '/notifications' ? 'text-orbit-blue' : 'text-text-quaternary group-hover:text-text-secondary transition-colors'} />
            <span className={`font-display text-[10px] font-600 tracking-wide transition-colors ${
              pathname === '/notifications' ? 'text-orbit-blue' : 'text-text-secondary group-hover:text-starlight'
            }`}>
              Notifications
            </span>
            {unreadCount > 0 && (
              <span className="ml-auto bg-amber text-deep-void text-[8px] font-display font-700 px-1.5 py-0.5 rounded-full min-w-[16px] text-center">
                {unreadCount}
              </span>
            )}
          </Link>
          <Link
            href="/settings"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${
              pathname === '/settings' ? '' : 'hover:bg-white/[0.04]'
            }`}
            style={pathname === '/settings' ? {
              background: 'linear-gradient(90deg, rgba(91,110,255,0.15) 0%, rgba(91,110,255,0.04) 100%)',
              borderLeft: '2px solid rgba(91,110,255,0.7)',
            } : { borderLeft: '2px solid transparent' }}
          >
            <Settings size={15} strokeWidth={1.5}
              className={pathname === '/settings' ? 'text-orbit-blue' : 'text-text-quaternary group-hover:text-text-secondary transition-colors'} />
            <span className={`font-display text-[10px] font-600 tracking-wide transition-colors ${
              pathname === '/settings' ? 'text-orbit-blue' : 'text-text-secondary group-hover:text-starlight'
            }`}>
              Settings
            </span>
          </Link>
        </div>

        {/* User profile */}
        <div className="p-4 flex items-center gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <Link href="/settings" className="flex items-center gap-3 flex-1 min-w-0 group">
            <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[11px] font-display font-700 text-white"
              style={{
                background: 'linear-gradient(135deg, #5B6EFF 0%, #A78BFA 100%)',
                boxShadow: '0 0 16px rgba(91,110,255,0.4)',
              }}
            >
              {user?.avatarInitials ?? 'JA'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display text-[10px] font-600 text-starlight truncate group-hover:text-orbit-blue transition-colors">
                {user?.name ?? 'Jordan Avery'}
              </p>
              <p className="text-[8px] text-text-faint truncate">{user?.handle ?? '@jordan.fit'}</p>
            </div>
          </Link>
          <button
            onClick={logout}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-text-faint hover:text-alert-red hover:bg-alert-red/10 transition-all flex-shrink-0"
            title="Sign out"
          >
            <LogOut size={12} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl"
        style={{
          background: 'rgba(8,10,20,0.92)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="flex items-center justify-around px-2 py-2">
          {mobileNavItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center gap-1 px-3 py-1.5 min-w-[44px] relative"
              >
                <Icon
                  size={19}
                  strokeWidth={isActive ? 2 : 1.5}
                  className={isActive ? 'text-orbit-blue' : 'text-text-quaternary'}
                />
                {isActive
                  ? <div className="w-1 h-1 rounded-full bg-orbit-blue" style={{ boxShadow: '0 0 6px rgba(91,110,255,0.8)' }} />
                  : <span className="font-display text-[7px] tracking-wide text-text-quaternary">{label}</span>
                }
              </Link>
            );
          })}
          <Link href="/notifications" className="flex flex-col items-center gap-1 px-3 py-1.5 min-w-[44px] relative">
            <MoreHorizontal
              size={19}
              strokeWidth={1.5}
              className={pathname === '/notifications' ? 'text-orbit-blue' : 'text-text-quaternary'}
            />
            {unreadCount > 0 && (
              <span className="absolute top-0.5 right-2 w-1.5 h-1.5 bg-amber rounded-full"
                style={{ boxShadow: '0 0 6px rgba(245,166,35,0.7)' }} />
            )}
            <span className="font-display text-[7px] tracking-wide text-text-quaternary">More</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
