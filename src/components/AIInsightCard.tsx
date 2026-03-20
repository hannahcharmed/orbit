'use client';

import { Brain, Lightbulb, TrendingUp, AlertTriangle } from 'lucide-react';

interface AIInsightCardProps {
  type: 'diagnostic' | 'strategic' | 'trend' | 'warning';
  title: string;
  body: string;
  action?: string;
}

const typeConfig = {
  diagnostic: { icon: Brain, color: '#A78BFA', label: 'Diagnostic' },
  strategic: { icon: Lightbulb, color: '#6C63FF', label: 'Strategic' },
  trend: { icon: TrendingUp, color: '#4ADE80', label: 'Trend' },
  warning: { icon: AlertTriangle, color: '#EF9F27', label: 'Alert' },
};

export function AIInsightCard({ type, title, body, action }: AIInsightCardProps) {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div className="card-ai p-4 rounded-xl hover:border-border-purple/60 transition-all duration-200">
      <div className="flex items-start gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: `${config.color}18`, border: `1px solid ${config.color}30` }}
        >
          <Icon size={14} strokeWidth={1.5} style={{ color: config.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="text-[8px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{
                color: config.color,
                background: `${config.color}18`,
                border: `1px solid ${config.color}30`,
              }}
            >
              Orbit AI · {config.label}
            </span>
          </div>
          <h3 className="text-xs font-medium text-starlight mb-1.5 leading-snug">{title}</h3>
          <p className="text-[11px] text-text-secondary leading-relaxed">{body}</p>
          {action && (
            <button
              className="mt-3 text-[11px] text-nova-violet hover:text-orbit-blue transition-colors flex items-center gap-1 font-medium"
            >
              {action}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
