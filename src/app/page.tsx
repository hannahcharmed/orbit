'use client';

import { GravityScoreRing } from '@/components/GravityScoreRing';
import { StatCard } from '@/components/StatCard';
import { AIInsightCard } from '@/components/AIInsightCard';
import { EscapeVelocityAlert } from '@/components/EscapeVelocityAlert';
import { PageHeader } from '@/components/PageHeader';
import { MiniSparkline } from '@/components/MiniSparkline';
import {
  Bell, TrendingUp, Users, Heart, Bookmark, MessageCircle,
  ArrowUpRight, ArrowDownRight, ChevronRight, Eye, MousePointer, Clock, Layers,
} from 'lucide-react';
import Link from 'next/link';

// ─── Seed data ────────────────────────────────────────────────────────────────
const engagementData  = [3.2, 3.8, 3.1, 4.2, 4.8, 4.1, 5.3, 5.1, 4.9, 5.8, 6.2, 5.9, 6.8, 7.1, 6.4, 7.8];
const reachData       = [42, 38, 51, 47, 62, 58, 71, 68, 75, 82, 79, 91, 88, 95, 102, 118];
const gravityHistory  = [61, 63, 60, 65, 67, 64, 68, 70, 72, 74];
const savesData       = [18, 22, 19, 27, 31, 28, 35, 38, 33, 42];
const commentsData    = [92, 88, 95, 89, 87, 84, 90, 86, 83, 80];

// ─── Engagement Funnel ────────────────────────────────────────────────────────
function EngagementFunnel() {
  const stages = [
    { label: 'Impressions',   fmt: '2.1M',  pct: 100, color: '#5B8DFF' },
    { label: 'Profile Views', fmt: '124K',  pct: 59,  color: '#7B8FFF', conv: '5.9%' },
    { label: 'Saves',         fmt: '42.1K', pct: 38,  color: '#A78BFA', conv: '33.9%' },
    { label: 'Comments',      fmt: '8.3K',  pct: 22,  color: '#C47BE0', conv: '19.8%' },
    { label: 'New Follows',   fmt: '3.2K',  pct: 10,  color: '#2DD4BF', conv: '38.4%' },
  ];
  return (
    <div className="space-y-2">
      {stages.map((s, i) => (
        <div key={s.label} className="flex items-center gap-3">
          <div className="flex-1 flex justify-center relative">
            <div
              className="relative h-9 rounded-xl flex items-center justify-center gap-2 transition-all duration-200"
              style={{
                width: `${s.pct}%`,
                background: `${s.color}14`,
                boxShadow: `0 2px 16px ${s.color}18`,
              }}
            >
              <span className="font-mono text-[11px] font-semibold" style={{ color: s.color }}>{s.fmt}</span>
              <span className="font-sans text-[9px] hidden sm:inline" style={{ color: `${s.color}99` }}>{s.label}</span>
            </div>
          </div>
          <div className="w-20 flex-shrink-0 text-right">
            <p className="font-sans text-[10px] font-medium" style={{ color: '#8896B0' }}>{s.label}</p>
            {s.conv && <p className="font-mono text-[9px]" style={{ color: '#4A5A7A' }}>{s.conv} CVR</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Behavior Signals ────────────────────────────────────────────────────────
function BehaviorSignals() {
  const signals = [
    { icon: Clock,       label: 'Avg View Time',   value: '0:47',  sub: '+8s vs last period',  color: '#5B8DFF', pos: true },
    { icon: Eye,         label: 'Scroll Depth',    value: '68%',   sub: '+4pp vs last period',  color: '#A78BFA', pos: true },
    { icon: MousePointer,label: 'Profile Tap Rate', value: '5.9%',  sub: '+1.2pp vs last period',color: '#2DD4BF', pos: true },
    { icon: Layers,      label: 'Save Rate',       value: '4.97%', sub: '-0.3pp vs last period', color: '#FBBF24', pos: false },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {signals.map(({ icon: Icon, label, value, sub, color, pos }) => (
        <div key={label} className="card p-3.5 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-label">{label}</p>
            <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${color}14`, boxShadow: `0 0 10px ${color}18` }}>
              <Icon size={11} strokeWidth={1.5} style={{ color }} />
            </div>
          </div>
          <p className="font-display text-xl font-bold" style={{ color: '#E8EDFF' }}>{value}</p>
          <p className="font-sans text-[9px]" style={{ color: pos ? '#34D399' : '#F87171' }}>{sub}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Engagement Heatmap (Day × Time-of-Day) ───────────────────────────────────
function EngagementHeatmap() {
  const days  = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const slots = ['12a', '3a', '6a', '9a', '12p', '3p', '6p', '9p'];

  // Simulated engagement intensity 0-4 per cell
  const matrix: number[][] = [
    [0, 0, 0, 0, 1, 2, 3, 3], // Mon
    [0, 0, 0, 0, 0, 1, 2, 4], // Tue
    [0, 0, 0, 1, 1, 3, 4, 3], // Wed
    [0, 0, 0, 2, 1, 3, 4, 4], // Thu — peak day
    [0, 0, 0, 0, 1, 2, 4, 3], // Fri
    [0, 0, 0, 0, 2, 2, 3, 2], // Sat
    [0, 0, 0, 0, 1, 1, 2, 3], // Sun
  ];

  const bg    = ['rgba(255,255,255,0.03)', 'rgba(91,141,255,0.20)', 'rgba(167,139,250,0.42)', 'rgba(45,212,191,0.65)', 'rgba(45,212,191,0.92)'];
  const glow  = ['none', 'none', '0 0 8px rgba(167,139,250,0.25)', '0 0 10px rgba(45,212,191,0.35)', '0 0 14px rgba(45,212,191,0.55)'];
  const labels = ['None', 'Low', 'Mid', 'High', 'Peak'];

  return (
    <div>
      {/* Time slot headers */}
      <div className="flex gap-1 mb-1.5 ml-10">
        {slots.map(s => (
          <div key={s} className="flex-1 text-center font-mono text-[8px]" style={{ color: '#4A5A7A' }}>{s}</div>
        ))}
      </div>

      {/* Grid */}
      <div className="space-y-1">
        {matrix.map((row, di) => (
          <div key={days[di]} className="flex items-center gap-1">
            <span className="w-8 font-sans text-[9px] text-right flex-shrink-0" style={{ color: '#4A5A7A' }}>{days[di]}</span>
            {row.map((val, ti) => (
              <div
                key={ti}
                className="flex-1 h-7 rounded-lg cursor-default transition-all duration-200 hover:scale-105"
                style={{ background: bg[val], boxShadow: glow[val] }}
                title={`${days[di]} ${slots[ti]}: ${labels[val]} engagement`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-3 justify-end">
        <span className="font-sans text-[8px]" style={{ color: '#4A5A7A' }}>Engagement:</span>
        {bg.map((c, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="w-4 h-4 rounded" style={{ background: c, boxShadow: glow[i] }} />
            <span className="font-sans text-[8px]" style={{ color: '#4A5A7A' }}>{labels[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Posting Calendar ─────────────────────────────────────────────────────────
function PostingCalendar() {
  const days  = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weeks = 12;
  const data  = Array.from({ length: weeks }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => {
      const base  = [1, 0, 2, 2, 1, 0, 0][d];
      const noise = Math.random() > 0.7 ? 1 : 0;
      return Math.min(base + noise, 3);
    })
  );
  const bg   = ['rgba(255,255,255,0.04)', 'rgba(91,141,255,0.22)', 'rgba(91,141,255,0.52)', 'rgba(91,141,255,0.88)'];
  const glow = ['none', 'none', '0 0 6px rgba(91,141,255,0.28)', '0 0 10px rgba(91,141,255,0.52)'];

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-1 min-w-0">
        <div className="flex flex-col gap-1 mr-2">
          {days.map(d => (
            <div key={d} className="h-3 flex items-center font-sans text-[8px] w-6 uppercase" style={{ color: '#4A5A7A' }}>{d}</div>
          ))}
        </div>
        <div className="flex gap-1 flex-1">
          {data.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1 flex-1 min-w-[12px]">
              {week.map((val, di) => (
                <div key={di} className="h-3 rounded transition-all duration-200 hover:scale-110 cursor-default"
                  style={{ background: bg[val], boxShadow: glow[val] }} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-1.5 mt-3 justify-end">
        <span className="font-sans text-[8px] mr-1" style={{ color: '#4A5A7A' }}>Posts:</span>
        {bg.map((c, i) => (
          <div key={i} className="w-3 h-3 rounded" style={{ background: c, boxShadow: glow[i] }} />
        ))}
      </div>
    </div>
  );
}

// ─── Comparative Analysis ─────────────────────────────────────────────────────
function ComparativeAnalysis() {
  const metrics = [
    { label: 'Total Reach',    curr: '847K',  prev: '716K',  delta: '+18.2%', pos: true,  data: reachData },
    { label: 'Avg Engagement', curr: '6.8%',  prev: '5.6%',  delta: '+1.2pp', pos: true,  data: engagementData },
    { label: 'Saves & Shares', curr: '42.1K', prev: '33.8K', delta: '+24.7%', pos: true,  data: savesData },
    { label: 'Comments',       curr: '8.3K',  prev: '8.6K',  delta: '-3.1%',  pos: false, data: commentsData },
  ];

  const platforms = [
    { name: 'Instagram', curr: 78,  prev: 65,  eng: '7.1%', color: '#E1306C' },
    { name: 'TikTok',    curr: 100, prev: 100, eng: '6.3%', color: '#4CC9F0' },
    { name: 'YouTube',   curr: 32,  prev: 38,  eng: '4.8%', color: '#F87171' },
  ];

  return (
    <div className="space-y-4">
      {/* Period-over-period metric rows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {metrics.map(({ label, curr, prev, delta, pos, data }) => (
          <div key={label} className="card p-4 space-y-2">
            <p className="text-label">{label}</p>
            <div className="flex items-end justify-between gap-2">
              <div>
                <p className="font-display text-lg font-bold text-starlight leading-none">{curr}</p>
                <p className="font-sans text-[9px] mt-0.5" style={{ color: '#4A5A7A' }}>vs {prev}</p>
              </div>
              <span className="font-mono text-[10px] font-semibold flex items-center gap-0.5"
                style={{ color: pos ? '#34D399' : '#F87171' }}>
                {pos ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
                {delta}
              </span>
            </div>
            <div className="h-8">
              <MiniSparkline data={data} color={pos ? '#5B8DFF' : '#F87171'} height={32} />
            </div>
          </div>
        ))}
      </div>

      {/* Platform side-by-side: this period vs last */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-label mb-1">Platform Comparison</p>
            <h3 className="font-serif text-base text-starlight">This 28d vs previous 28d</h3>
          </div>
          <div className="flex items-center gap-3 font-sans text-[9px]" style={{ color: '#4A5A7A' }}>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-sm inline-block" style={{ background: 'rgba(91,141,255,0.65)' }} />
              This period
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-sm inline-block" style={{ background: 'rgba(255,255,255,0.12)' }} />
              Last period
            </span>
          </div>
        </div>

        <div className="space-y-5">
          {platforms.map(p => (
            <div key={p.name}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg flex-shrink-0 flex items-center justify-center font-display text-[9px] font-bold"
                    style={{ background: `${p.color}20`, color: p.color }}>
                    {p.name[0]}
                  </div>
                  <span className="font-sans text-[11px] font-medium text-starlight">{p.name}</span>
                </div>
                <span className="font-mono text-[9px]"
                  style={{ color: p.curr >= p.prev ? '#34D399' : '#F87171' }}>
                  {p.curr >= p.prev ? '▲' : '▼'} {Math.abs(p.curr - p.prev)}pp &nbsp;·&nbsp; {p.eng} eng
                </span>
              </div>
              {/* Stacked bars */}
              <div className="space-y-1">
                <div className="progress-track">
                  <div className="transition-all duration-700 h-full rounded-sm"
                    style={{ width: `${p.curr}%`, background: `linear-gradient(90deg, ${p.color}99, ${p.color}cc)` }} />
                </div>
                <div className="progress-track">
                  <div className="transition-all duration-700 h-full rounded-sm"
                    style={{ width: `${p.prev}%`, background: 'rgba(255,255,255,0.10)' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
export default function Dashboard() {
  return (
    <div className="min-h-screen">
      {/* Mobile header */}
      <div className="md:hidden flex items-center justify-between px-4 pt-12 pb-4"
        style={{ background: 'rgba(3,7,15,0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', boxShadow: '0 1px 0 rgba(255,255,255,0.04)' }}>
        <div>
          <p className="font-display text-[9px] uppercase tracking-[0.2em]" style={{ color: '#4A5A7A' }}>Good morning</p>
          <h1 className="font-display text-sm font-semibold text-starlight mt-0.5">Jordan Avery</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-xl flex items-center justify-center relative transition-all cursor-pointer"
            style={{ background: 'rgba(255,255,255,0.05)', boxShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>
            <Bell size={14} strokeWidth={1.5} style={{ color: '#5E6E8C' }} />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full"
              style={{ background: '#FBBF24', boxShadow: '0 0 6px rgba(251,191,36,0.7)' }} />
          </button>
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-display font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #4A7AFF 0%, #9B6BE0 100%)', boxShadow: '0 4px 16px rgba(74,122,255,0.4)' }}>
            JA
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 py-6 max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="hidden md:block will-enter animate-enter-up">
          <PageHeader eyebrow="Dashboard" title="Creator Intelligence" subtitle="March 20, 2026 · Last synced 4 min ago" />
        </div>

        {/* Period selector */}
        <div className="flex items-center gap-2 will-enter animate-enter-up stagger-1">
          {['7d', '28d', '90d'].map(p => (
            <button key={p} className="px-3 py-1.5 rounded-lg font-display text-[9px] font-semibold tracking-wide uppercase transition-all cursor-pointer"
              style={p === '28d' ? {
                color: '#93B4FF', background: 'rgba(91,141,255,0.12)',
                boxShadow: '0 2px 12px rgba(91,141,255,0.15), 0 1px 0 rgba(255,255,255,0.05) inset',
              } : { color: '#5E6E8C', background: 'rgba(255,255,255,0.04)', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
              {p}
            </button>
          ))}
          <div className="ml-auto font-mono text-[9px]" style={{ color: '#4A5A7A' }}>
            vs prev period <span className="text-success font-semibold">+12.4%</span>
          </div>
        </div>

        {/* Gravity Score + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 will-enter animate-enter-up stagger-2">
          <div className="card p-5 flex items-center gap-5 col-span-1 glow-violet">
            <GravityScoreRing score={74} size={100} />
            <div className="flex-1 min-w-0">
              <p className="text-label mb-1.5">Gravity Score™</p>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-serif text-4xl text-starlight leading-none">74</span>
                <span className="text-xs text-success flex items-center gap-0.5 font-sans">
                  <ArrowUpRight size={12} />+6
                </span>
              </div>
              <p className="font-sans text-[10px] mb-2" style={{ color: '#5E6E8C' }}>vs 68 last period</p>
              {/* 10-week Gravity trend */}
              <div className="mb-3">
                <MiniSparkline data={gravityHistory} color="#A78BFA" height={28} />
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Return viewers', val: 82 },
                  { label: 'Save depth',      val: 68 },
                  { label: 'Comment quality', val: 71 },
                  { label: 'Cross-platform',  val: 65 },
                  { label: 'Velocity',         val: 79 },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2">
                    <span className="font-display text-[7px] w-20 truncate uppercase tracking-wide" style={{ color: '#4A5A7A' }}>{item.label}</span>
                    <div className="progress-track flex-1">
                      <div className="progress-fill-violet transition-all duration-700" style={{ width: `${item.val}%` }} />
                    </div>
                    <span className="font-mono text-[8px] w-5 text-right" style={{ color: '#2A3860' }}>{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-2 grid grid-cols-2 gap-3">
            <StatCard label="Total Reach"    value="847K"  delta="+18.2%" positive icon={<Users        size={14} strokeWidth={1.5} />} sparkData={reachData}      sparkColor="#5B8DFF" />
            <StatCard label="Avg Engagement" value="6.8%"  delta="+1.2pp" positive icon={<Heart        size={14} strokeWidth={1.5} />} sparkData={engagementData} sparkColor="#34D399" />
            <StatCard label="Saves & Shares" value="42.1K" delta="+24.7%" positive icon={<Bookmark     size={14} strokeWidth={1.5} />} sparkData={savesData}      sparkColor="#A78BFA" />
            <StatCard label="Comments"       value="8,340" delta="-3.1%"  positive={false} icon={<MessageCircle size={14} strokeWidth={1.5} />} sparkData={commentsData} sparkColor="#F87171" />
          </div>
        </div>

        {/* Escape Velocity Alert */}
        <div className="will-enter animate-enter-up stagger-3">
          <EscapeVelocityAlert postTitle="Morning HIIT Circuit — No Equipment" multiplier={3.2} timeAgo="2 hours ago" platform="Instagram" hoursLeft={46} />
        </div>

        {/* ── Comparative Analysis ── */}
        <section className="will-enter animate-enter-up stagger-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-label mb-1">Comparative Analysis</p>
              <h2 className="font-serif text-lg text-starlight">This 28d vs previous period</h2>
            </div>
            <Link href="/analytics" className="flex items-center gap-1 font-display text-[9px] font-semibold tracking-wide uppercase text-orbit-blue hover:text-nova-violet transition-colors">
              Deep dive <ChevronRight size={11} />
            </Link>
          </div>
          <ComparativeAnalysis />
        </section>

        {/* ── User Behavior Analytics ── */}
        <section className="will-enter animate-enter-up stagger-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-label mb-1">User Behavior Analytics</p>
              <h2 className="font-serif text-lg text-starlight">Audience journey · last 28 days</h2>
            </div>
          </div>

          {/* Behavior signals */}
          <BehaviorSignals />

          {/* Funnel */}
          <div className="card p-5">
            <p className="text-label mb-1">Engagement Funnel</p>
            <h3 className="font-serif text-base text-starlight mb-5">Impressions → Follows</h3>
            <EngagementFunnel />
          </div>
        </section>

        {/* ── Engagement Heatmap ── */}
        <section className="will-enter animate-enter-up stagger-6 space-y-4">
          <div>
            <p className="text-label mb-1">Heatmap Analysis</p>
            <h2 className="font-serif text-lg text-starlight">When your audience is most active</h2>
          </div>

          <div className="card p-5">
            <p className="text-label mb-1">Engagement by Day &amp; Hour</p>
            <p className="font-sans text-[11px] mb-4" style={{ color: '#5E6E8C' }}>
              Peak: <span style={{ color: '#2DD4BF' }}>Thu–Fri 6–9pm ET</span> &nbsp;·&nbsp; Lowest: <span style={{ color: '#5E6E8C' }}>Mon–Tue 12–6am</span>
            </p>
            <EngagementHeatmap />
          </div>

          <div className="card p-5">
            <p className="text-label mb-1">Posting Consistency</p>
            <h3 className="font-serif text-base text-starlight mb-4">Last 12 weeks</h3>
            <PostingCalendar />
          </div>
        </section>

        {/* AI Insights */}
        <section className="will-enter animate-enter-up stagger-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-label mb-1">Orbit AI</p>
              <h2 className="font-serif text-lg text-starlight">This week&apos;s intelligence</h2>
            </div>
            <Link href="/ai-coach" className="flex items-center gap-1 font-display text-[9px] font-semibold tracking-wide uppercase text-orbit-blue hover:text-nova-violet transition-colors">
              View all <ChevronRight size={11} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <AIInsightCard type="diagnostic" title="Your Tuesday posts underperform by 34%"
              body="Based on 16 weeks of data, content posted Tuesday 6–9am gets 34% less reach than your Wed/Thu peak. Your audience engagement window peaks Thursday 7pm ET."
              action="Reschedule Tuesday content →" />
            <AIInsightCard type="strategic" title="Carousel format is your growth lever"
              body="Your carousel posts average 7.2% engagement vs 4.1% for single images. The top-performing carousels share a pattern: 8–10 slides, fitness tip format, slide 1 hook text."
              action="Generate carousel brief →" />
          </div>
        </section>

        {/* Top Content */}
        <section className="will-enter animate-enter-up stagger-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-label mb-1">Top Content</p>
              <h2 className="font-serif text-lg text-starlight">Last 28 days</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { title: 'Morning HIIT Circuit — No Equipment',  platform: 'Instagram', type: 'Reel',  eng: '9.4%', reach: '127K', saves: '8.2K',  color: '#E1306C' },
              { title: '5-Day Meal Prep for Muscle Gain',      platform: 'TikTok',    type: 'Video', eng: '8.1%', reach: '94K',  saves: '12.1K', color: '#4CC9F0' },
              { title: 'The Supplement Stack I Actually Use',  platform: 'YouTube',   type: 'Short', eng: '6.9%', reach: '41K',  saves: '3.7K',  color: '#F87171' },
            ].map((post, i) => (
              <div key={i} className="card p-4 group cursor-pointer">
                <div className="w-full h-20 rounded-xl mb-3 flex items-center justify-center overflow-hidden relative"
                  style={{ background: `linear-gradient(135deg, ${post.color}16, ${post.color}06)` }}>
                  <TrendingUp size={20} strokeWidth={1} style={{ color: '#2A3450' }} />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${post.color}12, transparent 70%)` }} />
                </div>
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: post.color, boxShadow: `0 0 5px ${post.color}60` }} />
                  <span className="font-display text-[8px] uppercase tracking-wide" style={{ color: '#4A5A7A' }}>{post.platform}</span>
                  <span className="text-[8px]" style={{ color: '#2A3450' }}>·</span>
                  <span className="font-display text-[8px] uppercase tracking-wide" style={{ color: '#4A5A7A' }}>{post.type}</span>
                </div>
                <p className="font-sans text-xs font-medium text-starlight mb-3 line-clamp-2 leading-snug">{post.title}</p>
                <div className="flex items-center justify-between font-mono text-[9px]" style={{ color: '#5E6E8C' }}>
                  <span><span className="text-success">{post.eng}</span> eng</span>
                  <span>{post.reach} reach</span>
                  <span>{post.saves} saves</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
