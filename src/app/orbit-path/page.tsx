'use client';

import { PageHeader } from '@/components/PageHeader';
import { AIInsightCard } from '@/components/AIInsightCard';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, ArrowUpRight } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Area,
  AreaChart,
  ComposedChart,
  ReferenceArea,
} from 'recharts';

const trajectoryData = [
  { date: 'Dec', followers: 218, projected: null },
  { date: 'Jan', followers: 234, projected: null },
  { date: 'Feb', followers: 251, projected: null },
  { date: 'Mar 1', followers: 268, projected: null },
  { date: 'Mar 10', followers: 281, projected: null },
  { date: 'Mar 20', followers: 284, projected: 284 },
  { date: 'Apr', followers: null, projected: 297 },
  { date: 'May', followers: null, projected: 318 },
  { date: 'Jun', followers: null, projected: 332 },
];

const engagementTrajectory = [
  { date: 'Oct', actual: 4.8, projected: null },
  { date: 'Nov', actual: 5.2, projected: null },
  { date: 'Dec', actual: 5.1, projected: null },
  { date: 'Jan', actual: 5.6, projected: null },
  { date: 'Feb', actual: 6.2, projected: null },
  { date: 'Mar', actual: 6.8, projected: 6.8 },
  { date: 'Apr', actual: null, projected: 7.2 },
  { date: 'May', actual: null, projected: 7.6 },
  { date: 'Jun', actual: null, projected: 8.1 },
];

const inflectionPoints = [
  { date: 'Feb 3', event: 'Switched to carousel format', impact: '+18% engagement', positive: true },
  { date: 'Feb 18', event: 'Collaborated with @fitcoach.emma', impact: '+24K reach spike', positive: true },
  { date: 'Mar 5', event: 'Posted during platform algorithm shift', impact: '-12% reach 5-day period', positive: false },
  { date: 'Mar 12', event: 'Dark Matter audio trend adoption', impact: '+31% reel views', positive: true },
];

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card-bg border border-border-default rounded-lg p-3 text-xs">
        <p className="text-text-quaternary mb-1">{label}</p>
        {payload.map((p: any) => p.value !== null && (
          <p key={p.dataKey} style={{ color: p.color || '#E8F0FF' }}>
            {p.name === 'projected' ? '⟶ Projected: ' : '● Actual: '}
            {typeof p.value === 'number' ? p.value.toFixed(1) : p.value}
            {p.unit || ''}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export default function OrbitPath() {
  return (
    <div className="min-h-screen bg-deep-void">
      <div className="px-4 md:px-8 py-6 max-w-7xl mx-auto space-y-6">
        <PageHeader
          eyebrow="Orbit Path"
          title="Trajectory Intelligence"
          subtitle="ML-powered growth projections · Updated daily"
        />

        {/* Momentum status */}
        <div className="rounded-xl p-4 border border-success/30 bg-success-alert-bg flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-success/15 border border-success/30 flex items-center justify-center flex-shrink-0">
            <CheckCircle size={16} strokeWidth={1.5} className="text-success" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-starlight">Positive momentum detected</p>
            <p className="text-[10px] text-text-secondary mt-0.5">Your trajectory is trending 2.3× above creators at similar follower tier. Keep this cadence.</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="font-serif text-2xl text-success">↗</p>
          </div>
        </div>

        {/* 90-day projections */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: '30-day', value: '+13K', sub: 'projected followers', color: '#A78BFA' },
            { label: '60-day', value: '+28K', sub: 'projected followers', color: '#6C63FF' },
            { label: '90-day', value: '+48K', sub: 'projected followers', color: '#4ADE80' },
          ].map((proj) => (
            <div key={proj.label} className="card p-4 text-center">
              <p className="text-label mb-2">{proj.label}</p>
              <p className="font-serif text-2xl md:text-3xl" style={{ color: proj.color }}>{proj.value}</p>
              <p className="text-[9px] text-text-quaternary mt-1">{proj.sub}</p>
            </div>
          ))}
        </div>

        {/* Follower trajectory chart */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-label mb-1">Follower Trajectory</p>
              <h2 className="font-serif text-xl text-starlight">Actual vs projected (Instagram)</h2>
            </div>
            <div className="flex items-center gap-3 text-[10px]">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-orbit-blue inline-block rounded" />Actual</span>
              <span className="flex items-center gap-1.5 opacity-70"><span className="w-2.5 h-0.5 bg-nova-violet border-dashed inline-block rounded" />Projected</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={trajectoryData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1A2150" vertical={false} />
              <XAxis dataKey="date" tick={{ fill: '#4A5280', fontSize: 9 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: '#4A5280', fontSize: 9 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}K`} domain={[200, 350]} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine x="Mar 20" stroke="#1A2150" strokeDasharray="4 4" label={{ value: 'Today', fill: '#4A5280', fontSize: 8, position: 'top' }} />
              <Line type="monotone" dataKey="followers" name="actual" stroke="#6C63FF" strokeWidth={2} dot={false} connectNulls={false} />
              <Line type="monotone" dataKey="projected" name="projected" stroke="#A78BFA" strokeWidth={1.5} strokeDasharray="6 3" dot={false} connectNulls />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Engagement trajectory */}
        <div className="card p-5">
          <div className="mb-5">
            <p className="text-label mb-1">Engagement Rate Trajectory</p>
            <h2 className="font-serif text-xl text-starlight">6-month trend & projection</h2>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <ComposedChart data={engagementTrajectory} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="engGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#4ADE80" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1A2150" vertical={false} />
              <XAxis dataKey="date" tick={{ fill: '#4A5280', fontSize: 9 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: '#4A5280', fontSize: 9 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} domain={[4, 9]} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine x="Mar" stroke="#1A2150" strokeDasharray="4 4" />
              <Area type="monotone" dataKey="actual" stroke="#4ADE80" strokeWidth={2} fill="url(#engGrad)" dot={false} connectNulls={false} />
              <Line type="monotone" dataKey="projected" stroke="#4ADE80" strokeWidth={1.5} strokeDasharray="6 3" dot={false} connectNulls />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Platform decay alerts */}
        <div className="card p-5">
          <p className="text-label mb-1">Platform Signals</p>
          <h2 className="font-serif text-xl text-starlight mb-4">Trajectory by platform</h2>
          <div className="space-y-3">
            {[
              { platform: 'Instagram', trend: 'accelerating', delta: '+2.3%', dir: 'up', color: '#E1306C', note: 'Reels momentum driving above-baseline growth' },
              { platform: 'TikTok', trend: 'stable', delta: '+0.4%', dir: 'up', color: '#ffffff', note: 'Consistent posting cadence maintaining position' },
              { platform: 'YouTube', trend: 'declining', delta: '-0.8%', dir: 'down', color: '#FF0000', note: 'Publishing frequency dropped to 1.5x/week. Recommend returning to 3x.' },
            ].map((p) => (
              <div key={p.platform} className="flex items-start gap-3 py-3 border-b border-border-default last:border-0">
                <div className="w-7 h-7 rounded-lg flex-shrink-0 mt-0.5" style={{ background: p.color === '#ffffff' ? '#111' : p.color, border: '1px solid #333' }} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-starlight">{p.platform}</span>
                    <span className={`text-[9px] font-medium px-2 py-0.5 rounded-full ${
                      p.trend === 'accelerating' ? 'text-success bg-success/10' :
                      p.trend === 'declining' ? 'text-alert-red bg-alert-red/10' :
                      'text-text-secondary bg-nebula-navy/50'
                    }`}>{p.trend}</span>
                  </div>
                  <p className="text-[10px] text-text-secondary mt-1">{p.note}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {p.dir === 'up'
                    ? <TrendingUp size={14} className="text-success" />
                    : <TrendingDown size={14} className="text-alert-red" />
                  }
                  <span className={`text-xs font-medium ${p.dir === 'up' ? 'text-success' : 'text-alert-red'}`}>{p.delta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inflection points */}
        <div className="card p-5">
          <p className="text-label mb-1">Inflection Points</p>
          <h2 className="font-serif text-xl text-starlight mb-4">What changed your trajectory</h2>
          <div className="space-y-3">
            {inflectionPoints.map((pt, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2 ${pt.positive ? 'bg-success' : 'bg-alert-red'}`} />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[9px] text-text-quaternary mb-0.5">{pt.date}</p>
                      <p className="text-xs text-starlight">{pt.event}</p>
                    </div>
                    <span className={`text-[10px] font-medium flex-shrink-0 ${pt.positive ? 'text-success' : 'text-alert-red'}`}>
                      {pt.impact}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI insight */}
        <AIInsightCard
          type="strategic"
          title="Your trajectory suggests a follower milestone in 34 days"
          body="Based on your current growth velocity of 440 followers/day (up from 280/day last month), you're on track to cross 300K Instagram followers on or around April 23. This is an ideal milestone to leverage for brand partnership outreach."
          action="Generate brand outreach brief →"
        />
      </div>
    </div>
  );
}
