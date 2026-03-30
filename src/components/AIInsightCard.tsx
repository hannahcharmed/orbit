'use client';

import { Brain, Lightbulb, TrendingUp, AlertTriangle } from 'lucide-react';

interface AIInsightCardProps {
  type: 'diagnostic' | 'strategic' | 'trend' | 'warning';
  title: string;
  body: string;
  action?: string;
}

const typeConfig = {
  diagnostic: { icon: Brain,         color: '#A78BFA', glow: 'rgba(167,139,250,0.18)', label: 'Diagnostic' },
  strategic:  { icon: Lightbulb,     color: '#5B8DFF', glow: 'rgba(91,141,255,0.18)',  label: 'Strategic'  },
  trend:      { icon: TrendingUp,    color: '#34D399', glow: 'rgba(52,211,153,0.15)',  label: 'Trend'      },
  warning:    { icon: AlertTriangle, color: '#FBBF24', glow: 'rgba(251,191,36,0.15)',  label: 'Alert'      },
};

export function AIInsightCard({ type, title, body, action }: AIInsightCardProps) {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div
      className="card-ai p-4 rounded-2xl transition-all duration-200 cursor-default"
    >
      <div className="flex items-start gap-3">
        {/* Icon tile — no border, shadow only */}
        <div
          className="w-8 h-8 flex items-center justify-center flex-shrink-0 rounded-xl"
          style={{
            background: `${config.color}12`,
            boxShadow: `0 4px 16px ${config.glow}, 0 0 0 0 transparent`,
          }}
        >
          <Icon size={13} strokeWidth={1.5} style={{ color: config.color }} />
        </div>

        <div className="flex-1 min-w-0">
          {/* Type badge */}
          <div className="flex items-center gap-2 mb-2">
            <span
              className="font-display text-[7px] font-600 uppercase tracking-wider px-1.5 py-0.5 rounded"
              style={{
                color: config.color,
                background: `${config.color}12`,
              }}
            >
              AI · {config.label}
            </span>
          </div>

          <h3 className="font-sans text-xs font-medium text-starlight mb-1.5 leading-snug">{title}</h3>
          <p className="font-sans text-[10.5px] leading-relaxed" style={{ color: '#5E6E8C' }}>{body}</p>

          {action && (
            <button
              className="mt-3 font-display text-[8px] font-semibold tracking-[0.12em] uppercase flex items-center gap-1 transition-all cursor-pointer"
              style={{ color: config.color }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.filter = `drop-shadow(0 0 6px ${config.color})`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.filter = 'none';
              }}
            >
              {action}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
