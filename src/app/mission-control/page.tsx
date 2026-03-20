'use client';

import { PageHeader } from '@/components/PageHeader';
import { MiniSparkline } from '@/components/MiniSparkline';
import { Users, Zap, TrendingUp, TrendingDown, FileText, Bell, ChevronRight, Star } from 'lucide-react';

const creators = [
  {
    name: 'Jordan Avery',
    handle: '@jordan.fit',
    niche: 'Fitness',
    tier: '100K–500K',
    gravity: 74,
    gravityDelta: '+6',
    followers: '284K',
    eng: '6.8%',
    trajectory: 'accelerating',
    escapeVelocity: true,
    spark: [52, 58, 61, 64, 68, 71, 69, 74, 72, 74],
    color: '#6C63FF',
  },
  {
    name: 'Maya Chen',
    handle: '@mayaonwellness',
    niche: 'Wellness',
    tier: '500K–1M',
    gravity: 81,
    gravityDelta: '+2',
    followers: '621K',
    eng: '5.9%',
    trajectory: 'stable',
    escapeVelocity: false,
    spark: [79, 80, 79, 81, 80, 81, 80, 81, 81, 81],
    color: '#A78BFA',
  },
  {
    name: 'Alex Torres',
    handle: '@alexlifts',
    niche: 'Bodybuilding',
    tier: '10K–100K',
    gravity: 62,
    gravityDelta: '-3',
    followers: '47K',
    eng: '4.2%',
    trajectory: 'declining',
    escapeVelocity: false,
    spark: [71, 69, 67, 65, 64, 62, 61, 63, 62, 62],
    color: '#F09595',
  },
  {
    name: 'Priya Sharma',
    handle: '@priyafit',
    niche: 'Yoga',
    tier: '100K–500K',
    gravity: 69,
    gravityDelta: '+4',
    followers: '188K',
    eng: '7.4%',
    trajectory: 'accelerating',
    escapeVelocity: false,
    spark: [61, 63, 65, 64, 66, 67, 68, 68, 69, 69],
    color: '#4ADE80',
  },
  {
    name: 'Sam Rivera',
    handle: '@samrunsfar',
    niche: 'Running',
    tier: '10K–100K',
    gravity: 58,
    gravityDelta: '+1',
    followers: '31K',
    eng: '5.1%',
    trajectory: 'stable',
    escapeVelocity: false,
    spark: [54, 57, 56, 58, 57, 58, 58, 58, 58, 58],
    color: '#EF9F27',
  },
];

const alerts = [
  { creator: 'Jordan Avery', type: 'escape_velocity', msg: 'HIIT reel at 3.2× baseline — 46h to capitalize', time: '2h ago', color: '#EF9F27' },
  { creator: 'Alex Torres', type: 'decay', msg: 'Gravity Score declining 3 consecutive days — review posting frequency', time: '6h ago', color: '#F09595' },
  { creator: 'Priya Sharma', type: 'milestone', msg: 'Crossed 100K followers milestone on Instagram', time: '1d ago', color: '#4ADE80' },
  { creator: 'Maya Chen', type: 'sync', msg: 'YouTube data sync 48h delayed — API quota limit reached', time: '2d ago', color: '#EF9F27' },
];

export default function MissionControl() {
  return (
    <div className="min-h-screen bg-deep-void">
      <div className="px-4 md:px-8 py-6 max-w-7xl mx-auto space-y-6">
        <div className="flex items-start justify-between">
          <PageHeader
            eyebrow="Mission Control"
            title="Roster Overview"
            subtitle="Agency view · 5 creators under management · Agency tier"
          />
          <button className="btn-primary text-xs py-2 flex-shrink-0 mt-1">
            <FileText size={12} />
            Export report
          </button>
        </div>

        {/* Roster summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'Roster size', value: '5', sub: 'creators', color: '#6C63FF' },
            { label: 'Avg Gravity', value: '68.8', sub: '↑ from 65.2', color: '#A78BFA' },
            { label: 'Active alerts', value: '4', sub: '1 urgent', color: '#EF9F27' },
            { label: 'Avg engagement', value: '5.9%', sub: '↑ 0.4pp', color: '#4ADE80' },
          ].map((s) => (
            <div key={s.label} className="card p-4 text-center">
              <p className="text-label mb-2">{s.label}</p>
              <p className="font-serif text-2xl" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[9px] text-text-quaternary mt-1">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Unified alert feed */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Bell size={14} strokeWidth={1.5} className="text-text-tertiary" />
            <div>
              <p className="text-label">Alert Feed</p>
              <h2 className="font-serif text-xl text-starlight">Unified across all creators</h2>
            </div>
          </div>
          <div className="space-y-2">
            {alerts.map((alert, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-lg border transition-all hover:border-nebula-navy/60"
                style={{ borderColor: `${alert.color}30`, background: `${alert.color}08` }}
              >
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: alert.color }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-medium text-text-secondary">{alert.creator}</span>
                    <span className="text-[8px] text-text-faint">·</span>
                    <span className="text-[8px] text-text-faint">{alert.time}</span>
                  </div>
                  <p className="text-[10px] text-starlight mt-0.5">{alert.msg}</p>
                </div>
                <ChevronRight size={12} className="text-text-faint flex-shrink-0 mt-0.5" />
              </div>
            ))}
          </div>
        </div>

        {/* Roster grid */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-label mb-1">Creator Roster</p>
              <h2 className="font-serif text-xl text-starlight">Gravity score trajectory</h2>
            </div>
            <div className="flex items-center gap-2">
              <select className="bg-card-bg border border-border-default rounded-lg px-2 py-1.5 text-[10px] text-text-secondary focus:outline-none focus:border-orbit-blue/50">
                <option>Sort: Gravity score</option>
                <option>Sort: Engagement</option>
                <option>Sort: Growth</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            {creators.map((creator) => (
              <div
                key={creator.handle}
                className="card p-4 hover:border-nebula-navy/60 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${creator.color}88, ${creator.color}44)`, border: `1px solid ${creator.color}40` }}
                  >
                    {creator.name.split(' ').map(n => n[0]).join('')}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-starlight">{creator.name}</span>
                      {creator.escapeVelocity && (
                        <span className="flex items-center gap-0.5 text-[8px] text-amber bg-amber/10 border border-amber/20 px-1.5 py-0.5 rounded-full">
                          <Zap size={7} />EV
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[9px] text-text-quaternary mt-0.5">
                      <span>{creator.handle}</span>
                      <span>·</span>
                      <span>{creator.niche}</span>
                      <span>·</span>
                      <span>{creator.tier}</span>
                    </div>
                  </div>

                  {/* Gravity score */}
                  <div className="text-center flex-shrink-0 hidden sm:block">
                    <p className="font-serif text-xl" style={{ color: creator.color }}>{creator.gravity}</p>
                    <p className="text-[8px] text-text-quaternary">Gravity</p>
                    <p className={`text-[9px] font-medium ${parseInt(creator.gravityDelta) >= 0 ? 'text-success' : 'text-alert-red'}`}>
                      {creator.gravityDelta}
                    </p>
                  </div>

                  {/* Sparkline */}
                  <div className="w-24 flex-shrink-0 hidden md:block">
                    <MiniSparkline data={creator.spark} color={creator.color} height={28} />
                  </div>

                  {/* Metrics */}
                  <div className="flex items-center gap-4 flex-shrink-0 hidden lg:flex">
                    <div className="text-right">
                      <p className="text-xs font-medium text-starlight">{creator.followers}</p>
                      <p className="text-[8px] text-text-quaternary">followers</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-success">{creator.eng}</p>
                      <p className="text-[8px] text-text-quaternary">engagement</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {creator.trajectory === 'accelerating'
                        ? <TrendingUp size={14} className="text-success" />
                        : creator.trajectory === 'declining'
                        ? <TrendingDown size={14} className="text-alert-red" />
                        : <span className="text-[10px] text-text-secondary">→</span>
                      }
                    </div>
                  </div>

                  <ChevronRight size={14} className="text-text-faint group-hover:text-text-secondary transition-colors flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brand deal report generator */}
        <div className="card-ai p-5 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <FileText size={14} strokeWidth={1.5} className="text-nova-violet" />
            <span className="pill-violet">Brand Deal Report Generator</span>
          </div>
          <h2 className="font-serif text-xl text-starlight mb-2">Auto-generate brand deal reports</h2>
          <p className="text-[10px] text-text-secondary mb-4 leading-relaxed">
            Select a creator and generate a white-label PDF report with Gravity Score, engagement benchmarks, audience demographics, and content performance — in under 60 seconds.
          </p>
          <div className="flex gap-2 mb-4">
            <select className="flex-1 bg-deep-void border border-border-default rounded-lg px-3 py-2.5 text-xs text-starlight focus:outline-none focus:border-orbit-blue/50">
              <option>Select creator...</option>
              {creators.map(c => <option key={c.handle}>{c.name}</option>)}
            </select>
            <button className="btn-primary text-xs py-2.5 flex-shrink-0">
              <FileText size={12} />
              Generate PDF
            </button>
          </div>
          <p className="text-[9px] text-text-faint">Reports include: Gravity Score™, platform breakdown, top content, audience demographics, benchmarks vs niche peers</p>
        </div>
      </div>
    </div>
  );
}
