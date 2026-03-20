'use client';

import { PageHeader } from '@/components/PageHeader';
import { AIInsightCard } from '@/components/AIInsightCard';
import { Star, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ZAxis,
} from 'recharts';

const radarData = [
  { metric: 'Engagement', you: 82, median: 58, top10: 91 },
  { metric: 'Consistency', you: 74, median: 61, top10: 88 },
  { metric: 'Save Rate', you: 69, median: 52, top10: 84 },
  { metric: 'Growth', you: 78, median: 55, top10: 92 },
  { metric: 'Comment Quality', you: 71, median: 49, top10: 86 },
  { metric: 'Cross-Platform', you: 65, median: 44, top10: 79 },
];

const constellationDots = [
  { x: 42, y: 51, z: 8, label: 'you', isYou: true },
  { x: 28, y: 38, z: 5 }, { x: 55, y: 62, z: 6 }, { x: 31, y: 44, z: 4 },
  { x: 68, y: 71, z: 7 }, { x: 19, y: 29, z: 3 }, { x: 74, y: 78, z: 8 },
  { x: 52, y: 58, z: 5 }, { x: 38, y: 47, z: 4 }, { x: 61, y: 65, z: 6 },
  { x: 22, y: 35, z: 3 }, { x: 48, y: 54, z: 5 }, { x: 34, y: 41, z: 4 },
  { x: 71, y: 74, z: 7 }, { x: 26, y: 33, z: 3 }, { x: 58, y: 66, z: 6 },
  { x: 15, y: 24, z: 3 }, { x: 63, y: 69, z: 6 }, { x: 44, y: 50, z: 5 },
  { x: 81, y: 84, z: 8 }, { x: 77, y: 81, z: 9 }, { x: 85, y: 88, z: 9 },
];

const gapMetrics = [
  { metric: 'Save rate', you: 4.2, top10: 7.1, unit: '%', gap: '+2.9pp needed' },
  { metric: 'Posting frequency', you: 4.2, top10: 6.1, unit: 'posts/wk', gap: '+1.9/wk needed' },
  { metric: 'Story engagement', you: 2.8, top10: 5.4, unit: '%', gap: '+2.6pp needed' },
  { metric: 'Comment response rate', you: 34, top10: 71, unit: '%', gap: '+37pp needed' },
  { metric: 'Multi-platform activity', you: 2, top10: 3, unit: ' platforms', gap: '+1 platform needed' },
];

function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const d = payload[0]?.payload;
    return (
      <div className="bg-card-bg border border-border-default rounded-lg p-2 text-[10px]">
        {d?.isYou ? <span className="text-orbit-blue font-medium">You</span> : <span className="text-text-secondary">Peer creator</span>}
      </div>
    );
  }
  return null;
}

export default function Constellation() {
  return (
    <div className="min-h-screen bg-deep-void">
      <div className="px-4 md:px-8 py-6 max-w-7xl mx-auto space-y-6">
        <PageHeader
          eyebrow="Constellation"
          title="Peer Benchmarking"
          subtitle="Matched against 840 similar fitness creators · Updated weekly"
        />

        {/* Rank hero */}
        <div className="card-ai p-6 rounded-xl text-center glow-violet">
          <p className="text-label mb-3">Your niche rank</p>
          <div className="flex items-baseline justify-center gap-2 mb-2">
            <span className="font-serif" style={{ fontSize: '64px', color: '#A78BFA', lineHeight: 1 }}>#14</span>
          </div>
          <p className="text-sm text-text-secondary">of <span className="text-starlight font-medium">840</span> similar creators</p>
          <div className="flex items-center justify-center gap-1.5 mt-2">
            <span className="text-[10px] text-success flex items-center gap-0.5"><ArrowUpRight size={10} />Up 3 from last week</span>
          </div>
          <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-text-secondary">
            <span>Fitness • Lifestyle</span>
            <span>·</span>
            <span>100K–500K tier</span>
            <span>·</span>
            <span>Top 1.7%</span>
          </div>
        </div>

        {/* Performance radar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="card p-5">
            <p className="text-label mb-1">Performance Radar</p>
            <h2 className="font-serif text-xl text-starlight mb-4">You vs peers</h2>
            <div className="flex items-center gap-3 mb-4 text-[10px]">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-orbit-blue inline-block rounded" />You</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-nova-violet inline-block rounded opacity-60" />Peer median</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-success inline-block rounded opacity-50" />Top 10%</span>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke="#1A2150" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: '#4A5280', fontSize: 9 }} />
                <Radar name="Top 10%" dataKey="top10" stroke="#4ADE80" fill="#4ADE80" fillOpacity={0.1} strokeWidth={1} strokeDasharray="4 2" />
                <Radar name="Peer median" dataKey="median" stroke="#A78BFA" fill="#A78BFA" fillOpacity={0.12} strokeWidth={1} />
                <Radar name="You" dataKey="you" stroke="#6C63FF" fill="#6C63FF" fillOpacity={0.25} strokeWidth={2} />
                <Tooltip formatter={(val) => `${val}/100`} contentStyle={{ background: '#0D1228', border: '1px solid #1A2150', borderRadius: '8px', fontSize: '11px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Constellation scatter */}
          <div className="card p-5">
            <p className="text-label mb-1">Constellation Map</p>
            <h2 className="font-serif text-xl text-starlight mb-4">Your position in the niche</h2>
            <div className="relative">
              <ResponsiveContainer width="100%" height={240}>
                <ScatterChart margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1A2150" />
                  <XAxis type="number" dataKey="x" name="Engagement" tick={{ fill: '#4A5280', fontSize: 9 }} tickLine={false} axisLine={false} domain={[0, 100]} label={{ value: 'Engagement', position: 'insideBottom', fill: '#4A5280', fontSize: 8, offset: -5 }} />
                  <YAxis type="number" dataKey="y" name="Growth" tick={{ fill: '#4A5280', fontSize: 9 }} tickLine={false} axisLine={false} domain={[0, 100]} label={{ value: 'Growth', angle: -90, position: 'insideLeft', fill: '#4A5280', fontSize: 8 }} />
                  <ZAxis type="number" dataKey="z" range={[30, 120]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Scatter
                    data={constellationDots.filter(d => !d.isYou)}
                    fill="#A78BFA"
                    fillOpacity={0.3}
                  />
                  <Scatter
                    data={constellationDots.filter(d => d.isYou)}
                    fill="#6C63FF"
                    fillOpacity={1}
                  />
                </ScatterChart>
              </ResponsiveContainer>
              {/* You label */}
              <div
                className="absolute text-[8px] text-orbit-blue font-medium"
                style={{ left: '43%', top: '38%', transform: 'translate(-50%, -50%)' }}
              >
                ← You
              </div>
            </div>
          </div>
        </div>

        {/* Benchmark metrics */}
        <div className="card p-5">
          <p className="text-label mb-1">Key Benchmarks</p>
          <h2 className="font-serif text-xl text-starlight mb-4">You vs peer median</h2>
          <div className="space-y-4">
            {[
              { label: 'Engagement rate', you: 6.8, median: 4.9, top10: 9.2, unit: '%', positive: true },
              { label: 'Follower growth (28d)', you: 4.4, median: 2.1, top10: 7.8, unit: '%', positive: true },
              { label: 'Save rate', you: 4.2, median: 2.8, top10: 7.1, unit: '%', positive: true },
              { label: 'Post frequency', you: 4.2, median: 5.1, top10: 6.4, unit: '/wk', positive: false },
              { label: 'Story views (avg)', you: 12400, median: 9800, top10: 28000, unit: '', positive: true },
            ].map((m) => (
              <div key={m.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-starlight">{m.label}</span>
                  <div className="flex items-center gap-3 text-[10px]">
                    <span className="text-text-quaternary">Median: <span className="text-text-secondary">{m.median}{m.unit}</span></span>
                    <span className={`font-medium ${m.positive ? 'text-success' : 'text-alert-red'} flex items-center gap-0.5`}>
                      {m.positive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                      You: {m.you}{m.unit}
                    </span>
                  </div>
                </div>
                <div className="relative progress-track">
                  {/* Median marker */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-nebula-navy z-10"
                    style={{ left: `${(m.median / m.top10) * 100}%` }}
                  />
                  {/* Your fill */}
                  <div
                    className={`${m.positive ? 'progress-fill-green' : 'progress-fill-blue'}`}
                    style={{ width: `${Math.min((m.you / m.top10) * 100, 100)}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[8px] text-text-faint">0{m.unit}</span>
                  <span className="text-[8px] text-text-faint">Top 10%: {m.top10}{m.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gap analysis */}
        <div className="card-ai p-5 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="pill-violet">Orbit AI · Gap Analysis</span>
          </div>
          <p className="text-label mb-1">Gap Analysis</p>
          <h2 className="font-serif text-xl text-starlight mb-4">To reach top 10%</h2>
          <div className="space-y-3">
            {gapMetrics.map((g, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border-purple/30 last:border-0">
                <div>
                  <p className="text-xs text-starlight">{g.metric}</p>
                  <p className="text-[9px] text-text-secondary mt-0.5">
                    You: <span className="text-text-tertiary">{g.you}{g.unit}</span> → Top 10%: <span className="text-nova-violet">{g.top10}{g.unit}</span>
                  </p>
                </div>
                <span className="text-[9px] text-amber bg-amber/10 border border-amber/20 px-2 py-1 rounded-full">{g.gap}</span>
              </div>
            ))}
          </div>
          <button className="btn-secondary w-full mt-4 justify-center text-xs">
            Generate improvement plan
          </button>
        </div>

        <AIInsightCard
          type="strategic"
          title="Your comment response rate is your biggest gap vs top 10%"
          body="Top 10% creators in your niche respond to 71% of comments within 4 hours. You're at 34%. Research consistently shows comment engagement is the #1 algorithm signal on Instagram. Even 15 min/day of comment engagement could move you 8-12 positions up."
          action="Set comment reminder schedule →"
        />
      </div>
    </div>
  );
}
