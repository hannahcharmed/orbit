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
        el.style.borderColor = 'rgba(255,255,255,0.09)';
        el.style.boxShadow = '0 8px 44px rgba(0,0,0,0.65), 0 0 30px rgba(0,229,255,0.05), 0 1px 0 rgba(255,255,255,0.06) inset';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = 'rgba(255,255,255,0.055)';
        el.style.boxShadow = '0 4px 28px rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.04) inset';
      }}
    >
      <div className="flex items-center justify-between">
        <p className="text-label">{label}</p>
        {icon && (
          <span style={{ color: 'rgba(0,229,255,0.35)' }}>{icon}</span>
        )}
      </div>
      <div>
        {/* Chakra Petch for the data value — angular, tech readout feel */}
        <span className="font-display font-700 text-2xl text-starlight tracking-wide"
          style={{ textShadow: '0 0 20px rgba(221,232,255,0.15)' }}>
          {value}
        </span>
        <span className={`ml-2 font-mono text-[9px] ${positive ? 'text-success' : 'text-alert-red'}`}
          style={{ filter: positive ? 'drop-shadow(0 0 4px rgba(0,255,148,0.5))' : 'drop-shadow(0 0 4px rgba(255,62,108,0.5))' }}>
          {delta}
        </span>
      </div>
      {sparkData && (
        <MiniSparkline data={sparkData} color={sparkColor || '#3D7AFF'} height={32} />
      )}
    </div>
  );
}
