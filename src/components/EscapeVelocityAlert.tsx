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
        className="rounded-xl p-4 cursor-pointer group transition-all duration-200"
        style={{
          background: 'linear-gradient(135deg, rgba(245,166,35,0.06) 0%, rgba(20,15,0,0.95) 60%)',
          border: '1px solid rgba(245,166,35,0.22)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.4), 0 0 40px rgba(245,166,35,0.06)',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = 'rgba(245,166,35,0.38)';
          el.style.boxShadow = '0 8px 40px rgba(0,0,0,0.5), 0 0 60px rgba(245,166,35,0.1)';
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = 'rgba(245,166,35,0.22)';
          el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4), 0 0 40px rgba(245,166,35,0.06)';
        }}
      >
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              background: 'rgba(245,166,35,0.1)',
              border: '1px solid rgba(245,166,35,0.25)',
              boxShadow: '0 0 20px rgba(245,166,35,0.2)',
            }}
          >
            <Zap size={16} strokeWidth={1.5} className="text-amber animate-glow-breathe" fill="#F5A623" fillOpacity={0.25} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="pill-amber">Escape Velocity · Active</span>
              <div className="flex items-center gap-1 font-mono text-[8px] text-text-quaternary ml-auto">
                <Clock size={9} />
                <span>{hoursLeft}h remaining</span>
              </div>
            </div>
            <p className="font-sans text-xs font-medium text-starlight mb-1.5 truncate">{postTitle}</p>
            <div className="flex items-center gap-3 font-sans text-[10px] text-text-secondary">
              <span>
                <span className="font-serif text-amber text-base"
                  style={{ textShadow: '0 0 16px rgba(245,166,35,0.5)' }}>
                  {multiplier}×
                </span>
                {' '}baseline engagement
              </span>
              <span className="text-text-faint">·</span>
              <span>{platform}</span>
              <span className="text-text-faint">·</span>
              <span>{timeAgo}</span>
            </div>
          </div>
          <ChevronRight size={14} className="text-text-quaternary group-hover:text-amber transition-colors flex-shrink-0 mt-1" />
        </div>
      </div>
    </Link>
  );
}
