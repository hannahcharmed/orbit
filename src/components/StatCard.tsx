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
    <div className="card p-4 flex flex-col gap-3 hover:border-nebula-navy/60 transition-all duration-200">
      <div className="flex items-center justify-between">
        <p className="text-label">{label}</p>
        {icon && (
          <span className="text-text-tertiary">{icon}</span>
        )}
      </div>
      <div>
        <span className="font-serif text-2xl text-starlight">{value}</span>
        <span className={`ml-2 text-[10px] font-medium ${positive ? 'text-success' : 'text-alert-red'}`}>
          {delta}
        </span>
      </div>
      {sparkData && (
        <MiniSparkline data={sparkData} color={sparkColor || '#6C63FF'} height={32} />
      )}
    </div>
  );
}
