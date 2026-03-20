'use client';

import { Brain, Lightbulb, TrendingUp, AlertTriangle } from 'lucide-react';

interface AIInsightCardProps {
  type: 'diagnostic' | 'strategic' | 'trend' | 'warning';
  title: string;
  body: string;
  action?: string;
}

const typeConfig = {
  diagnostic: { icon: Brain,          color: '#A78BFA', glow: 'rgba(167,139,250,0.18)', label: 'Diagnostic' },
  strategic:  { icon: Lightbulb,      color: '#5B6EFF', glow: 'rgba(91,110,255,0.18)',  label: 'Strategic'  },
  trend:      { icon: TrendingUp,     color: '#39D98A', glow: 'rgba(57,217,138,0.15)',  label: 'Trend'      },
  warning:    { icon: AlertTriangle,  color: '#F5A623', glow: 'rgba(245,166,35,0.15)',  label: 'Alert'      },
};

export function AIInsightCard({ type, title, body, action }: AIInsightCardProps) {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div
      className="card-ai p-4 rounded-xl transition-all duration-200 cursor-default"
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = `${config.color}28`;
        el.style.boxShadow = `0 8px 32px rgba(0,0,0,0.5), 0 0 40px ${config.glow}`;
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = 'rgba(167,139,250,0.12)';
        el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.5), 0 0 40px rgba(167,139,250,0.04) inset';
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{
            background: `${config.color}14`,
            border: `1px solid ${config.color}28`,
            boxShadow: `0 0 16px ${config.glow}`,
          }}
        >
          <Icon size={14} strokeWidth={1.5} style={{ color: config.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="font-display text-[7px] font-600 uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{
                color: config.color,
                background: `${config.color}12`,
                border: `1px solid ${config.color}25`,
              }}
            >
              Orbit AI · {config.label}
            </span>
          </div>
          <h3 className="font-sans text-xs font-medium text-starlight mb-1.5 leading-snug">{title}</h3>
          <p className="font-sans text-[11px] text-text-secondary leading-relaxed">{body}</p>
          {action && (
            <button className="mt-3 font-display text-[9px] font-600 tracking-wide uppercase transition-colors flex items-center gap-1"
              style={{ color: config.color }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.75'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
            >
              {action}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
