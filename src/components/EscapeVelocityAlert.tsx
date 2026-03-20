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
        className="relative rounded-xl p-4 cursor-pointer group transition-all duration-200 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255,176,32,0.05) 0%, rgba(8,8,8,0.95) 55%)',
          border: '1px solid rgba(255,176,32,0.2)',
          boxShadow: '0 4px 28px rgba(0,0,0,0.5), 0 0 40px rgba(255,176,32,0.05)',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = 'rgba(255,176,32,0.38)';
          el.style.boxShadow = '0 8px 44px rgba(0,0,0,0.6), 0 0 60px rgba(255,176,32,0.1)';
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = 'rgba(255,176,32,0.2)';
          el.style.boxShadow = '0 4px 28px rgba(0,0,0,0.5), 0 0 40px rgba(255,176,32,0.05)';
        }}
      >
        {/* HUD corner brackets — amber */}
        <div className="absolute top-0 left-0 w-3 h-3 pointer-events-none"
          style={{ borderTop: '1px solid rgba(255,176,32,0.55)', borderLeft: '1px solid rgba(255,176,32,0.55)' }} />
        <div className="absolute bottom-0 right-0 w-3 h-3 pointer-events-none"
          style={{ borderBottom: '1px solid rgba(255,176,32,0.55)', borderRight: '1px solid rgba(255,176,32,0.55)' }} />

        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded flex-shrink-0 flex items-center justify-center"
            style={{
              background: 'rgba(255,176,32,0.08)',
              border: '1px solid rgba(255,176,32,0.22)',
              boxShadow: '0 0 20px rgba(255,176,32,0.2)',
              borderRadius: 4,
            }}>
            <Zap size={16} strokeWidth={1.5} className="text-amber animate-glow-breathe"
              fill="#FFB020" fillOpacity={0.2} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="pill-amber">ESCAPE VELOCITY · ACTIVE</span>
              <div className="flex items-center gap-1 font-mono text-[8px] ml-auto"
                style={{ color: 'rgba(255,176,32,0.5)' }}>
                <Clock size={8} />
                <span>{hoursLeft}h remaining</span>
              </div>
            </div>

            <p className="font-sans text-xs font-500 text-starlight mb-1.5 truncate">{postTitle}</p>

            <div className="flex items-center gap-3 text-[10px]" style={{ color: 'rgba(106,122,156,1)' }}>
              <span className="font-sans">
                <span className="font-display font-700 text-amber text-base"
                  style={{ textShadow: '0 0 16px rgba(255,176,32,0.6)' }}>
                  {multiplier}×
                </span>
                {' '}baseline
              </span>
              <span style={{ color: 'rgba(46,56,88,1)' }}>·</span>
              <span className="font-sans">{platform}</span>
              <span style={{ color: 'rgba(46,56,88,1)' }}>·</span>
              <span className="font-sans">{timeAgo}</span>
            </div>
          </div>

          <ChevronRight size={13} className="flex-shrink-0 mt-0.5 transition-all duration-200 group-hover:translate-x-1"
            style={{ color: 'rgba(255,176,32,0.35)' }} />
        </div>
      </div>
    </Link>
  );
}
