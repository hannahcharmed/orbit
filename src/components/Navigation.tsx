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
  { href: '/ai-coach', label: 'AI Coach', icon: Brain },
];

function OrbitLogo() {
  return (
    <div className="px-5 py-5 flex items-center gap-3">
      <div className="relative flex-shrink-0">
        <svg width="26" height="26" viewBox="0 0 96 96" fill="none">
          <circle cx="48" cy="48" r="34" stroke="#A78BFA" strokeWidth="2.5" strokeLinecap="round"
            strokeDasharray="175 40" strokeDashoffset="20" fill="none" opacity="0.9" />
          <circle cx="48" cy="48" r="34" stroke="#5B8DFF" strokeWidth="1.5" strokeLinecap="round"
            strokeDasharray="145 65" strokeDashoffset="38" fill="none" opacity="0.5" />
          <circle cx="76" cy="48" r="5" fill="#A78BFA" />
        </svg>
      </div>
      <div>
        <span className="font-display font-bold text-starlight tracking-[4px] text-sm block">
          ORBIT
        </span>
        <span className="font-display text-[10px]" style={{ color: '#4A5A7A' }}>
          Intelligence
        </span>
      </div>
    </div>
  );
}

function NavItem({ href, label, icon: Icon, isActive }: {
  href: string; label: string; icon: React.ElementType; isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl mx-2 transition-all duration-200 cursor-pointer"
      style={isActive ? {
        background: 'rgba(91,141,255,0.10)',
        boxShadow: '0 2px 12px rgba(91,141,255,0.12), 0 1px 0 rgba(255,255,255,0.05) inset',
      } : {}}
    >
      <Icon
        size={15}
        strokeWidth={isActive ? 2 : 1.5}
        style={{ color: isActive ? '#93B4FF' : '#4A5A7A' }}
        className="flex-shrink-0 transition-colors duration-200"
      />
      <span
        className="font-sans text-[13px] transition-colors duration-200"
        style={{
          color: isActive ? '#E8EDFF' : '#5E6E8C',
          fontWeight: isActive ? 500 : 400,
        }}
      >
        {label}
      </span>
    </Link>
  );
}

export function Navigation() {
  const pathname = usePathname();
  const { user, unreadCount, logout } = useAuth();

  return (
    <>
      {/* Desktop sidebar — no border, elevated via shadow */}
      <nav
        className="hidden md:flex flex-col w-56 min-h-screen flex-shrink-0"
        style={{
          background: 'rgba(5, 8, 20, 0.82)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: '4px 0 48px rgba(0,0,0,0.35)',
        }}
      >
        <OrbitLogo />

        <div className="flex-1 py-3 space-y-0.5 overflow-y-auto">
          {navItems.map(({ href, label, icon }) => (
            <NavItem key={href} href={href} label={label} icon={icon} isActive={pathname === href} />
          ))}
        </div>

        <div className="pb-2">
          {/* Soft divider — opacity fade, no hard line */}
          <div className="mx-4 mb-2" style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)' }} />
          <div className="space-y-0.5">
            <div className="relative">
              <NavItem href="/notifications" label="Notifications" icon={Bell} isActive={pathname === '/notifications'} />
              {unreadCount > 0 && (
                <span
                  className="absolute right-5 top-3 w-1.5 h-1.5 rounded-full"
                  style={{ background: '#FBBF24', boxShadow: '0 0 8px rgba(251,191,36,0.7)' }}
                />
              )}
            </div>
            <NavItem href="/settings" label="Settings" icon={Settings} isActive={pathname === '/settings'} />
          </div>
        </div>

        {/* User panel */}
        <div className="p-4">
          <div className="mx-2 mb-3" style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)' }} />
          <div className="flex items-center gap-3">
            <Link href="/settings" className="flex items-center gap-3 flex-1 min-w-0 group cursor-pointer">
              <div
                className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center font-display text-[11px] font-bold text-white"
                style={{
                  background: 'linear-gradient(135deg, #4A7AFF 0%, #9B6BE0 100%)',
                  boxShadow: '0 4px 16px rgba(74,122,255,0.35)',
                }}
              >
                {user?.avatarInitials ?? 'JA'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-sans text-[13px] font-medium text-starlight truncate group-hover:text-orbit-blue transition-colors">
                  {user?.name ?? 'Jordan Avery'}
                </p>
                <p className="font-mono text-[10px] truncate" style={{ color: '#4A5A7A' }}>
                  {user?.handle ?? '@jordan.fit'}
                </p>
              </div>
            </Link>
            <button
              onClick={logout}
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all flex-shrink-0 cursor-pointer"
              style={{ color: '#4A5A7A', background: 'rgba(255,255,255,0.04)' }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.color = '#F87171';
                el.style.background = 'rgba(248,113,113,0.08)';
                el.style.boxShadow = '0 0 16px rgba(248,113,113,0.15)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.color = '#4A5A7A';
                el.style.background = 'rgba(255,255,255,0.04)';
                el.style.boxShadow = 'none';
              }}
              title="Sign out"
            >
              <LogOut size={13} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile bottom nav — aurora frosted glass */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50"
        style={{
          background: 'rgba(4,6,16,0.92)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.45)',
        }}
      >
        <div className="flex items-center justify-around px-2 py-2">
          {mobileNavItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center gap-1 px-3 py-2 min-w-[52px] rounded-xl cursor-pointer transition-all duration-200"
                style={isActive ? {
                  background: 'rgba(91,141,255,0.10)',
                  boxShadow: '0 2px 12px rgba(91,141,255,0.10)',
                } : {}}
              >
                <Icon
                  size={18}
                  strokeWidth={isActive ? 2 : 1.5}
                  style={{ color: isActive ? '#93B4FF' : '#4A5A7A' }}
                />
                <span
                  className="font-display text-[10px] tracking-wide"
                  style={{ color: isActive ? '#93B4FF' : '#4A5A7A' }}
                >
                  {label}
                </span>
              </Link>
            );
          })}
          <Link
            href="/notifications"
            className="flex flex-col items-center gap-1 px-3 py-2 min-w-[52px] rounded-xl cursor-pointer transition-all duration-200 relative"
            style={pathname === '/notifications' ? {
              background: 'rgba(91,141,255,0.10)',
              boxShadow: '0 2px 12px rgba(91,141,255,0.10)',
            } : {}}
          >
            <div className="relative">
              <Bell
                size={18}
                strokeWidth={pathname === '/notifications' ? 2 : 1.5}
                style={{ color: pathname === '/notifications' ? '#93B4FF' : '#4A5A7A' }}
              />
              {unreadCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full"
                  style={{ background: '#FBBF24', boxShadow: '0 0 6px rgba(251,191,36,0.8)' }}
                />
              )}
            </div>
            <span
              className="font-display text-[10px] tracking-wide"
              style={{ color: pathname === '/notifications' ? '#93B4FF' : '#4A5A7A' }}
            >
              Alerts
            </span>
          </Link>
        </div>
      </nav>
    </>
  );
}
