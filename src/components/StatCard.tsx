'use client';

import { MiniSparkline } from './MiniSparkline';

interface StatCardProps {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
  icon?: React.ReactNode;
  sparkData?: number[];
  sparkColor?: string;
}

export function StatCard({ label, value, delta, positive, icon, sparkData, sparkColor }: StatCardProps) {
  return (
    <div
      className="card p-4 flex flex-col gap-3 cursor-default"
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = 'rgba(255,255,255,0.1)';
        el.style.boxShadow = '0 8px 40px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.06) inset';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = 'rgba(255,255,255,0.06)';
        el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.04) inset';
      }}
    >
      <div className="flex items-center justify-between">
        <p className="text-label">{label}</p>
        {icon && (
          <span className="text-text-quaternary">{icon}</span>
        )}
      </div>
      <div>
        <span className="font-serif text-2xl text-starlight">{value}</span>
        <span className={`ml-2 font-mono text-[9px] font-medium ${positive ? 'text-success' : 'text-alert-red'}`}>
          {delta}
        </span>
      </div>
      {sparkData && (
        <MiniSparkline data={sparkData} color={sparkColor || '#5B6EFF'} height={32} />
      )}
    </div>
  );
}
