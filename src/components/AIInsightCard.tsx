'use client';

import { Brain, Lightbulb, TrendingUp, AlertTriangle } from 'lucide-react';

interface AIInsightCardProps {
  type: 'diagnostic' | 'strategic' | 'trend' | 'warning';
  title: string;
  body: string;
  action?: string;
}

const typeConfig = {
  diagnostic: { icon: Brain,         color: '#9B7FFF', glow: 'rgba(155,127,255,0.2)', label: 'Diagnostic' },
  strategic:  { icon: Lightbulb,     color: '#3D7AFF', glow: 'rgba(61,122,255,0.2)',  label: 'Strategic'  },
  trend:      { icon: TrendingUp,    color: '#00FF94', glow: 'rgba(0,255,148,0.15)',  label: 'Trend'      },
  warning:    { icon: AlertTriangle, color: '#FFB020', glow: 'rgba(255,176,32,0.15)', label: 'Alert'      },
};

export function AIInsightCard({ type, title, body, action }: AIInsightCardProps) {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div
      className="card-ai p-4 rounded-xl transition-all duration-200 cursor-default"
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = `${config.color}22`;
        el.style.boxShadow = `0 8px 36px rgba(0,0,0,0.6), 0 0 40px ${config.glow}`;
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = 'rgba(155,127,255,0.13)';
        el.style.boxShadow = '0 4px 28px rgba(0,0,0,0.6)';
      }}
    >
      <div className="flex items-start gap-3">
        {/* Icon tile */}
        <div className="w-8 h-8 flex items-center justify-center flex-shrink-0"
          style={{
            background: `${config.color}10`,
            border: `1px solid ${config.color}28`,
            borderRadius: 4,
            boxShadow: `0 0 16px ${config.glow}`,
          }}>
          <Icon size={13} strokeWidth={1.5} style={{ color: config.color }} />
        </div>

        <div className="flex-1 min-w-0">
          {/* Type badge */}
          <div className="flex items-center gap-2 mb-2">
            <span className="font-display text-[7px] font-600 uppercase tracking-wider px-1.5 py-0.5"
              style={{
                color: config.color,
                background: `${config.color}10`,
                border: `1px solid ${config.color}22`,
                borderRadius: 2,
              }}>
              AI · {config.label}
            </span>
          </div>

          <h3 className="font-sans text-xs font-500 text-starlight mb-1.5 leading-snug">{title}</h3>
          <p className="font-sans text-[10.5px] leading-relaxed" style={{ color: 'rgba(106,122,156,1)' }}>{body}</p>

          {action && (
            <button
              className="mt-3 font-display text-[8px] font-600 tracking-[0.12em] uppercase flex items-center gap-1 transition-all"
              style={{ color: config.color }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.filter = `drop-shadow(0 0 6px ${config.color})`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.filter = 'none'; }}
            >
              {action}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
