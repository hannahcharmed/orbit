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
      <div className="rounded-xl p-4 border border-amber/30 bg-warning-alert-bg hover:border-amber/50 transition-all duration-200 cursor-pointer group">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber/15 border border-amber/30 flex items-center justify-center flex-shrink-0">
            <Zap size={16} strokeWidth={1.5} className="text-amber" fill="#EF9F27" fillOpacity={0.3} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="pill-amber text-[9px]">ESCAPE VELOCITY · ACTIVE</span>
              <div className="flex items-center gap-1 text-[9px] text-text-quaternary ml-auto">
                <Clock size={9} />
                <span>{hoursLeft}h remaining</span>
              </div>
            </div>
            <p className="text-xs font-medium text-starlight mb-1 truncate">{postTitle}</p>
            <div className="flex items-center gap-3 text-[10px] text-text-secondary">
              <span>
                <span className="font-serif text-amber text-base">{multiplier}×</span>
                {' '}baseline engagement
              </span>
              <span>·</span>
              <span>{platform}</span>
              <span>·</span>
              <span>{timeAgo}</span>
            </div>
          </div>
          <ChevronRight size={14} className="text-text-quaternary group-hover:text-amber transition-colors flex-shrink-0 mt-1" />
        </div>
      </div>
    </Link>
  );
}
