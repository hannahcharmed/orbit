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
    <div className="px-5 py-5 flex items-center gap-3"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="relative flex-shrink-0">
        <svg width="28" height="28" viewBox="0 0 96 96" fill="none">
          <circle cx="48" cy="48" r="34" stroke="#9B7FFF" strokeWidth="3" strokeLinecap="round"
            strokeDasharray="175 40" strokeDashoffset="20" fill="none" />
          <circle cx="48" cy="48" r="34" stroke="#3D7AFF" strokeWidth="1.5" strokeLinecap="round"
            strokeDasharray="145 65" strokeDashoffset="38" fill="none" opacity="0.5" />
          <circle cx="48" cy="48" r="34" stroke="#00E5FF" strokeWidth="0.6"
            fill="none" opacity="0.18" />
          <circle cx="76" cy="48" r="5" fill="#9B7FFF" />
          <circle cx="76" cy="48" r="9" stroke="#9B7FFF" strokeWidth="0.5" fill="none" opacity="0.3" />
        </svg>
      </div>
      <div>
        <span className="font-display font-bold text-starlight tracking-[4px] text-sm block">
          ORBIT
        </span>
        <span className="font-display text-[10px] text-text-secondary">
          Intelligence
        </span>
      </div>
    </div>
  );
}

function NavItem({ href, label, icon: Icon, isActive }: { href: string; label: string; icon: React.ElementType; isActive: boolean }) {
  return (
    <Link
      href={href}
      className="relative flex items-center gap-3 px-3 py-2.5 rounded-lg mx-1 transition-all duration-200 group cursor-pointer"
      style={isActive ? {
        background: 'rgba(0,229,255,0.07)',
        borderLeft: '2px solid rgba(0,229,255,0.65)',
        paddingLeft: '10px',
      } : {
        borderLeft: '2px solid transparent',
        paddingLeft: '10px',
      }}
    >
      <Icon
        size={15}
        strokeWidth={isActive ? 2 : 1.5}
        className="flex-shrink-0 transition-colors duration-200"
        style={{ color: isActive ? '#00E5FF' : '#566480' }}
      />
      <span
        className="font-sans text-[13px] transition-colors duration-200"
        style={{
          color: isActive ? '#DDE8FF' : '#6A7A9C',
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
      {/* Desktop sidebar */}
      <nav className="hidden md:flex flex-col w-56 min-h-screen flex-shrink-0"
        style={{
          background: 'linear-gradient(180deg, rgba(6,9,18,0.98) 0%, rgba(4,6,14,0.99) 100%)',
          borderRight: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <OrbitLogo />

        <div className="flex-1 px-1 py-3 space-y-0.5 overflow-y-auto">
          {navItems.map(({ href, label, icon }) => (
            <NavItem key={href} href={href} label={label} icon={icon} isActive={pathname === href} />
          ))}
        </div>

        <div className="px-1 pb-2" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="pt-2 space-y-0.5">
            <NavItem href="/notifications" label="Notifications" icon={Bell} isActive={pathname === '/notifications'} />
            {unreadCount > 0 && (
              <div className="absolute right-4 mt-[-32px]">
                <span className="w-1.5 h-1.5 bg-amber rounded-full inline-block"
                  style={{ boxShadow: '0 0 6px rgba(255,176,32,0.8)' }} />
              </div>
            )}
            <NavItem href="/settings" label="Settings" icon={Settings} isActive={pathname === '/settings'} />
          </div>
        </div>

        {/* User panel */}
        <div className="p-4 flex items-center gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <Link href="/settings" className="flex items-center gap-3 flex-1 min-w-0 group cursor-pointer">
            <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center font-display text-[11px] font-bold text-white"
              style={{
                background: 'linear-gradient(135deg, #3D7AFF 0%, #9B7FFF 100%)',
              }}
            >
              {user?.avatarInitials ?? 'JA'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-sans text-[13px] font-medium text-starlight truncate group-hover:text-orbit-blue transition-colors">
                {user?.name ?? 'Jordan Avery'}
              </p>
              <p className="font-mono text-[10px] text-text-secondary truncate">
                {user?.handle ?? '@jordan.fit'}
              </p>
            </div>
          </Link>
          <button
            onClick={logout}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all flex-shrink-0 cursor-pointer"
            style={{ color: '#4A5575', border: '1px solid rgba(255,255,255,0.07)' }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.color = '#FF3E6C';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,62,108,0.3)';
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,62,108,0.06)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.color = '#4A5575';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.07)';
              (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
            }}
            title="Sign out"
          >
            <LogOut size={13} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl"
        style={{
          background: 'rgba(4,6,14,0.96)',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 -4px 24px rgba(0,0,0,0.5)',
        }}
      >
        <div className="flex items-center justify-around px-2 py-2">
          {mobileNavItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link key={href} href={href}
                className="flex flex-col items-center gap-1 px-3 py-2 min-w-[52px] rounded-lg cursor-pointer transition-colors duration-200"
                style={isActive ? { background: 'rgba(0,229,255,0.06)' } : {}}>
                <Icon
                  size={18}
                  strokeWidth={isActive ? 2 : 1.5}
                  style={{ color: isActive ? '#00E5FF' : '#566480' }}
                />
                <span
                  className="font-display text-[10px] tracking-wide"
                  style={{ color: isActive ? '#00E5FF' : '#566480' }}
                >
                  {label}
                </span>
              </Link>
            );
          })}
          <Link href="/notifications"
            className="flex flex-col items-center gap-1 px-3 py-2 min-w-[52px] rounded-lg cursor-pointer transition-colors duration-200 relative"
            style={pathname === '/notifications' ? { background: 'rgba(0,229,255,0.06)' } : {}}>
            <div className="relative">
              <Bell
                size={18}
                strokeWidth={pathname === '/notifications' ? 2 : 1.5}
                style={{ color: pathname === '/notifications' ? '#00E5FF' : '#566480' }}
              />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-amber rounded-full"
                  style={{ boxShadow: '0 0 5px rgba(255,176,32,0.8)' }} />
              )}
            </div>
            <span
              className="font-display text-[10px] tracking-wide"
              style={{ color: pathname === '/notifications' ? '#00E5FF' : '#566480' }}
            >
              Alerts
            </span>
          </Link>
        </div>
      </nav>
    </>
  );
}
