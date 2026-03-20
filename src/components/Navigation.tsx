'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

function OrbitLogo() {
  return (
    <div className="flex items-center gap-2.5 px-6 py-5 border-b border-border-default">
      <svg width="28" height="28" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Orbital arcs */}
        <circle cx="48" cy="48" r="34" stroke="#A78BFA" strokeWidth="3.5" strokeLinecap="round"
          strokeDasharray="180 34" strokeDashoffset="20" fill="none" opacity="1" />
        <circle cx="48" cy="48" r="34" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round"
          strokeDasharray="160 54" strokeDashoffset="30" fill="none" opacity="0.45" />
        <circle cx="48" cy="48" r="34" stroke="#A78BFA" strokeWidth="0.8" strokeLinecap="round"
          fill="none" opacity="0.18" />
        <circle cx="48" cy="48" r="34" stroke="#A78BFA" strokeWidth="0.4" strokeLinecap="round"
          fill="none" opacity="0.07" />
        {/* Data point dot */}
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

        {/* Bottom section */}
        <div className="p-3 border-t border-border-default space-y-0.5">
          <Link
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:text-starlight hover:bg-nebula-navy/40 transition-all"
          >
            <Bell size={16} strokeWidth={1.5} className="text-text-tertiary" />
            <span className="text-xs font-medium">Notifications</span>
            <span className="ml-auto bg-amber text-deep-void text-[9px] font-bold px-1.5 py-0.5 rounded-full">3</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:text-starlight hover:bg-nebula-navy/40 transition-all"
          >
            <Settings size={16} strokeWidth={1.5} className="text-text-tertiary" />
            <span className="text-xs font-medium">Settings</span>
          </Link>
        </div>

        {/* User avatar */}
        <div className="p-4 border-t border-border-default flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orbit-blue to-nova-violet flex items-center justify-center text-xs font-semibold text-white flex-shrink-0">
            JA
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-starlight truncate">Jordan Avery</p>
            <p className="text-[9px] text-text-quaternary truncate">@jordan.fit</p>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-success flex-shrink-0" />
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-notification-bg border-t border-border-default backdrop-blur-md">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.slice(0, 5).map(({ href, label, icon: Icon }) => {
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
                {isActive && <div className="w-1 h-1 rounded-full bg-orbit-blue" />}
                {!isActive && (
                  <span className="text-[7px] text-text-quaternary">{label.split(' ')[0]}</span>
                )}
              </Link>
            );
          })}
          <Link href="/mission-control" className="flex flex-col items-center gap-1 px-2 py-1 min-w-[44px]">
            <Users size={18} strokeWidth={1.5} className={pathname === '/mission-control' ? 'text-orbit-blue' : 'text-text-quaternary'} />
            <span className="text-[7px] text-text-quaternary">More</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
