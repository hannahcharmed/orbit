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
    <div className="px-5 py-5 flex items-center gap-3"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="relative flex-shrink-0">
        <svg width="28" height="28" viewBox="0 0 96 96" fill="none"
          className="animate-glow-breathe">
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
        <span className="font-display font-700 text-starlight tracking-[4px] text-sm block">
          ORBIT
        </span>
        <span className="font-display text-[9px] text-text-quaternary">
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
      className={`relative flex items-center gap-3 px-3 py-2.5 transition-all duration-200 group overflow-hidden`}
      style={isActive ? {
        background: 'linear-gradient(90deg, rgba(0,229,255,0.08) 0%, rgba(61,122,255,0.04) 80%, transparent 100%)',
        borderLeft: '2px solid rgba(0,229,255,0.7)',
      } : {
        borderLeft: '2px solid transparent',
      }}
    >
      {isActive && (
        /* Active glow bloom */
        <div className="absolute left-0 top-0 bottom-0 w-8 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at left, rgba(0,229,255,0.08), transparent 70%)' }} />
      )}
      <Icon
        size={14}
        strokeWidth={isActive ? 2 : 1.5}
        className="flex-shrink-0 transition-colors"
        style={{ color: isActive ? '#00E5FF' : 'rgba(46,56,88,1)' }}
      />
      <span className="font-sans text-[12px] font-500 transition-colors"
        style={{ color: isActive ? '#00E5FF' : 'rgba(106,122,156,1)' }}>
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
          borderRight: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <OrbitLogo />

        <div className="flex-1 px-2 py-3 space-y-0 overflow-y-auto">
          {navItems.map(({ href, label, icon }) => (
            <NavItem key={href} href={href} label={label} icon={icon} isActive={pathname === href} />
          ))}
        </div>

        <div className="px-2 pb-2" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="pt-2 space-y-0">
            <NavItem href="/notifications" label="Notifications" icon={Bell} isActive={pathname === '/notifications'} />
            <NavItem href="/settings" label="Settings" icon={Settings} isActive={pathname === '/settings'} />
          </div>
        </div>

        {/* Operator panel */}
        <div className="p-4 flex items-center gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <Link href="/settings" className="flex items-center gap-3 flex-1 min-w-0 group">
            <div className="w-8 h-8 rounded-sm flex-shrink-0 flex items-center justify-center font-display text-[10px] font-700 text-white"
              style={{
                background: 'linear-gradient(135deg, #3D7AFF 0%, #9B7FFF 100%)',
                boxShadow: '0 0 16px rgba(61,122,255,0.45)',
                clipPath: 'polygon(0 10%, 10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%)',
              }}
            >
              {user?.avatarInitials ?? 'JA'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-sans text-xs font-500 text-starlight truncate group-hover:text-orbit-blue transition-colors">
                {user?.name ?? 'Jordan Avery'}
              </p>
              <p className="font-mono text-[9px] text-text-quaternary truncate">
                {user?.handle ?? '@jordan.fit'}
              </p>
            </div>
          </Link>
          <button
            onClick={logout}
            className="w-7 h-7 rounded flex items-center justify-center transition-all flex-shrink-0"
            style={{ color: 'rgba(46,56,88,1)', border: '1px solid rgba(255,255,255,0.05)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#FF3E6C'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,62,108,0.3)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(46,56,88,1)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.05)'; }}
            title="Sign out"
          >
            <LogOut size={12} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl"
        style={{
          background: 'rgba(4,6,14,0.94)',
          borderTop: '1px solid rgba(0,229,255,0.1)',
          boxShadow: '0 -4px 30px rgba(0,0,0,0.5)',
        }}
      >
        <div className="flex items-center justify-around px-2 py-2">
          {mobileNavItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link key={href} href={href}
                className="flex flex-col items-center gap-1 px-3 py-1.5 min-w-[44px]">
                <Icon size={18} strokeWidth={isActive ? 2 : 1.5}
                  style={{ color: isActive ? '#00E5FF' : 'rgba(46,56,88,1)',
                    filter: isActive ? 'drop-shadow(0 0 6px rgba(0,229,255,0.7))' : 'none' }} />
                {isActive
                  ? <div className="w-1 h-1 bg-cyan-pulse rounded-full"
                      style={{ boxShadow: '0 0 6px rgba(0,229,255,0.9)' }} />
                  : <span className="font-display text-[7px] tracking-wide"
                      style={{ color: 'rgba(46,56,88,1)' }}>{label}</span>
                }
              </Link>
            );
          })}
          <Link href="/notifications" className="flex flex-col items-center gap-1 px-3 py-1.5 min-w-[44px] relative">
            <MoreHorizontal size={18} strokeWidth={1.5}
              style={{ color: pathname === '/notifications' ? '#00E5FF' : 'rgba(46,56,88,1)' }} />
            {unreadCount > 0 && (
              <span className="absolute top-0.5 right-2 w-1.5 h-1.5 bg-amber rounded-full"
                style={{ boxShadow: '0 0 6px rgba(255,176,32,0.8)' }} />
            )}
            <span className="font-display text-[7px] tracking-wide"
              style={{ color: 'rgba(46,56,88,1)' }}>More</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
