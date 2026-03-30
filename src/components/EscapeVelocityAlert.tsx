'use client';

import { Zap, ChevronRight, Clock } from 'lucide-react';
import Link from 'next/link';

interface EscapeVelocityAlertProps {
  postTitle: string;
  multiplier: number;
  timeAgo: string;
  platform: string;
  hoursLeft: number;
}

export function EscapeVelocityAlert({ postTitle, multiplier, timeAgo, platform, hoursLeft }: EscapeVelocityAlertProps) {
  return (
    <Link href="/escape-velocity">
      <div
        className="relative rounded-2xl p-4 cursor-pointer group transition-all duration-250 overflow-hidden"
        style={{
          background: 'rgba(30, 18, 6, 0.70)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow:
            '0 1px 0 rgba(251,191,36,0.06) inset, 0 4px 24px rgba(0,0,0,0.45), 0 0 40px rgba(251,191,36,0.06)',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.boxShadow =
            '0 1px 0 rgba(251,191,36,0.09) inset, 0 12px 48px rgba(0,0,0,0.55), 0 0 60px rgba(251,191,36,0.10)';
          el.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.boxShadow =
            '0 1px 0 rgba(251,191,36,0.06) inset, 0 4px 24px rgba(0,0,0,0.45), 0 0 40px rgba(251,191,36,0.06)';
          el.style.transform = 'translateY(0)';
        }}
      >
        <div className="flex items-start gap-3">
          <div
            className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center"
            style={{
              background: 'rgba(251,191,36,0.10)',
              boxShadow: '0 0 20px rgba(251,191,36,0.15)',
            }}
          >
            <Zap size={16} strokeWidth={1.5} style={{ color: '#FBBF24' }} fill="#FBBF24" fillOpacity={0.25} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="pill-amber">ESCAPE VELOCITY · ACTIVE</span>
              <div className="flex items-center gap-1 font-mono text-[9px] ml-auto" style={{ color: 'rgba(251,191,36,0.5)' }}>
                <Clock size={8} />
                <span>{hoursLeft}h remaining</span>
              </div>
            </div>

            <p className="font-sans text-xs font-medium text-starlight mb-1.5 truncate">{postTitle}</p>

            <div className="flex items-center gap-3 text-[10px]" style={{ color: '#5E6E8C' }}>
              <span className="font-sans">
                <span className="font-display font-bold text-amber text-base" style={{ textShadow: '0 0 20px rgba(251,191,36,0.5)' }}>
                  {multiplier}×
                </span>
                {' '}baseline
              </span>
              <span style={{ color: '#2A3450' }}>·</span>
              <span className="font-sans">{platform}</span>
              <span style={{ color: '#2A3450' }}>·</span>
              <span className="font-sans">{timeAgo}</span>
            </div>
          </div>

          <ChevronRight
            size={13}
            className="flex-shrink-0 mt-0.5 transition-transform duration-200 group-hover:translate-x-1"
            style={{ color: 'rgba(251,191,36,0.35)' }}
          />
        </div>
      </div>
    </Link>
  );
}
