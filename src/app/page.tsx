'use client';

import { GravityScoreRing } from '@/components/GravityScoreRing';
import { StatCard } from '@/components/StatCard';
import { AIInsightCard } from '@/components/AIInsightCard';
import { EscapeVelocityAlert } from '@/components/EscapeVelocityAlert';
import { PageHeader } from '@/components/PageHeader';
import { Bell, TrendingUp, Users, Heart, Bookmark, MessageCircle, ArrowUpRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const engagementData = [3.2, 3.8, 3.1, 4.2, 4.8, 4.1, 5.3, 5.1, 4.9, 5.8, 6.2, 5.9, 6.8, 7.1, 6.4, 7.8];
const reachData = [42, 38, 51, 47, 62, 58, 71, 68, 75, 82, 79, 91, 88, 95, 102, 118];

export default function Dashboard() {
  return (
    <div className="min-h-screen">
      {/* Mobile header */}
      <div
        className="md:hidden flex items-center justify-between px-4 pt-12 pb-4"
        style={{
          background: 'rgba(3,7,15,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 1px 0 rgba(255,255,255,0.04)',
        }}
      >
        <div>
          <p className="font-display text-[9px] uppercase tracking-[0.2em]" style={{ color: '#4A5A7A' }}>Good morning</p>
          <h1 className="font-display text-sm font-semibold text-starlight mt-0.5">Jordan Avery</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="w-8 h-8 rounded-xl flex items-center justify-center relative transition-all cursor-pointer"
            style={{
              background: 'rgba(255,255,255,0.05)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
            }}
          >
            <Bell size={14} strokeWidth={1.5} style={{ color: '#5E6E8C' }} />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full"
              style={{ background: '#FBBF24', boxShadow: '0 0 6px rgba(251,191,36,0.7)' }} />
          </button>
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-display font-bold text-white"
            style={{
              background: 'linear-gradient(135deg, #4A7AFF 0%, #9B6BE0 100%)',
              boxShadow: '0 4px 16px rgba(74,122,255,0.4)',
            }}
          >
            JA
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 py-6 max-w-7xl mx-auto space-y-6">

        {/* Desktop header */}
        <div className="hidden md:block will-enter animate-enter-up">
          <PageHeader
            eyebrow="Dashboard"
            title="Creator Intelligence"
            subtitle="March 20, 2026 · Last synced 4 min ago"
          />
        </div>

        {/* Period selector */}
        <div className="flex items-center gap-2 will-enter animate-enter-up stagger-1">
          {['7d', '28d', '90d'].map((p) => (
            <button
              key={p}
              className="px-3 py-1.5 rounded-lg font-display text-[9px] font-semibold tracking-wide uppercase transition-all cursor-pointer"
              style={p === '28d' ? {
                color: '#93B4FF',
                background: 'rgba(91,141,255,0.12)',
                boxShadow: '0 2px 12px rgba(91,141,255,0.15), 0 1px 0 rgba(255,255,255,0.05) inset',
              } : {
                color: '#5E6E8C',
                background: 'rgba(255,255,255,0.04)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              }}
            >
              {p}
            </button>
          ))}
          <div className="ml-auto font-mono text-[9px]" style={{ color: '#4A5A7A' }}>
            vs prev period <span className="text-success font-semibold">+12.4%</span>
          </div>
        </div>

        {/* Gravity Score + Stats row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 will-enter animate-enter-up stagger-2">
          {/* Gravity Score Card */}
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
              <p className="font-sans text-[10px] mb-3" style={{ color: '#5E6E8C' }}>vs 68 last period</p>
              <div className="space-y-2">
                {[
                  { label: 'Return viewers', val: 82 },
                  { label: 'Save depth',      val: 68 },
                  { label: 'Comment quality', val: 71 },
                  { label: 'Cross-platform',  val: 65 },
                  { label: 'Velocity',         val: 79 },
                ].map((item) => (
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

          {/* Stats grid */}
          <div className="col-span-1 lg:col-span-2 grid grid-cols-2 gap-3">
            <StatCard label="Total Reach"    value="847K"  delta="+18.2%" positive icon={<Users       size={14} strokeWidth={1.5} />} sparkData={reachData}                                                sparkColor="#5B8DFF" />
            <StatCard label="Avg Engagement" value="6.8%"  delta="+1.2pp" positive icon={<Heart       size={14} strokeWidth={1.5} />} sparkData={engagementData}                                          sparkColor="#34D399" />
            <StatCard label="Saves & Shares" value="42.1K" delta="+24.7%" positive icon={<Bookmark    size={14} strokeWidth={1.5} />} sparkData={[18,22,19,27,31,28,35,38,33,42]}                        sparkColor="#A78BFA" />
            <StatCard label="Comments"       value="8,340" delta="-3.1%"  positive={false} icon={<MessageCircle size={14} strokeWidth={1.5} />} sparkData={[92,88,95,89,87,84,90,86,83,80]} sparkColor="#F87171" />
          </div>
        </div>

        {/* Escape Velocity Alert */}
        <div className="will-enter animate-enter-up stagger-3">
          <EscapeVelocityAlert
            postTitle="Morning HIIT Circuit — No Equipment"
            multiplier={3.2}
            timeAgo="2 hours ago"
            platform="Instagram"
            hoursLeft={46}
          />
        </div>

        {/* AI Insights */}
        <div className="will-enter animate-enter-up stagger-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-label mb-1.5">Orbit AI</p>
              <h2 className="font-serif text-lg text-starlight">This week&apos;s intelligence</h2>
            </div>
            <Link href="/ai-coach" className="flex items-center gap-1 font-display text-[9px] font-semibold tracking-wide uppercase text-orbit-blue hover:text-nova-violet transition-colors">
              View all <ChevronRight size={11} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <AIInsightCard
              type="diagnostic"
              title="Your Tuesday posts underperform by 34%"
              body="Based on 16 weeks of data, content posted Tuesday 6–9am gets 34% less reach than your Wed/Thu peak. Your audience engagement window peaks Thursday 7pm ET."
              action="Reschedule Tuesday content →"
            />
            <AIInsightCard
              type="strategic"
              title="Carousel format is your growth lever"
              body="Your carousel posts average 7.2% engagement vs 4.1% for single images. The top-performing carousels share a pattern: 8–10 slides, fitness tip format, slide 1 hook text."
              action="Generate carousel brief →"
            />
          </div>
        </div>

        {/* Platform breakdown */}
        <div className="card p-5 will-enter animate-enter-up stagger-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-label mb-1.5">Platform Breakdown</p>
              <h2 className="font-serif text-lg text-starlight">28-day performance</h2>
            </div>
            <Link href="/analytics" className="font-display text-[9px] font-semibold tracking-wide uppercase text-orbit-blue hover:text-nova-violet transition-colors flex items-center gap-1">
              Full analytics <ChevronRight size={11} />
            </Link>
          </div>
          <div className="space-y-4">
            {[
              { platform: 'Instagram', followers: '284K', eng: '7.1%', reach: '412K', color: '#E1306C', pct: 78 },
              { platform: 'TikTok',    followers: '521K', eng: '6.3%', reach: '891K', color: '#FFFFFF',  pct: 100 },
              { platform: 'YouTube',   followers: '42K',  eng: '4.8%', reach: '94K',  color: '#FF0000', pct: 32 },
            ].map((p) => (
              <div key={p.platform} className="flex items-center gap-4">
                <div
                  className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center font-display text-[10px] font-bold"
                  style={{
                    background: `${p.color}18`,
                    color: p.color,
                    boxShadow: `0 4px 16px ${p.color}20`,
                  }}
                >
                  {p.platform[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-display text-[10px] font-semibold text-starlight">{p.platform}</span>
                    <div className="flex items-center gap-3 font-mono text-[9px]" style={{ color: '#5E6E8C' }}>
                      <span>{p.followers}</span>
                      <span className="text-success">{p.eng}</span>
                      <span className="hidden sm:inline">{p.reach} reach</span>
                    </div>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill-blue transition-all duration-700" style={{ width: `${p.pct}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top content */}
        <div className="will-enter animate-enter-up stagger-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-label mb-1.5">Top Content</p>
              <h2 className="font-serif text-lg text-starlight">Last 28 days</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { title: 'Morning HIIT Circuit — No Equipment',     platform: 'Instagram', type: 'Reel',  eng: '9.4%', reach: '127K', saves: '8.2K',  color: '#E1306C' },
              { title: '5-Day Meal Prep for Muscle Gain',         platform: 'TikTok',    type: 'Video', eng: '8.1%', reach: '94K',  saves: '12.1K', color: '#4CC9F0' },
              { title: 'The Supplement Stack I Actually Use',     platform: 'YouTube',   type: 'Short', eng: '6.9%', reach: '41K',  saves: '3.7K',  color: '#F87171' },
            ].map((post, i) => (
              <div
                key={i}
                className="card p-4 group cursor-pointer"
              >
                <div
                  className="w-full h-24 rounded-xl mb-3 flex items-center justify-center overflow-hidden relative"
                  style={{ background: `linear-gradient(135deg, ${post.color}16, ${post.color}06)` }}
                >
                  <TrendingUp size={22} strokeWidth={1} style={{ color: '#2A3450' }} />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${post.color}12, transparent 70%)` }}
                  />
                </div>
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: post.color, boxShadow: `0 0 6px ${post.color}60` }} />
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
        </div>

        {/* Posting heatmap */}
        <div className="card p-5 will-enter animate-enter-up stagger-7">
          <p className="text-label mb-1.5">Posting Consistency</p>
          <h2 className="font-serif text-lg text-starlight mb-4">Last 12 weeks</h2>
          <PostingHeatmap />
        </div>
      </div>
    </div>
  );
}

function PostingHeatmap() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weeks = 12;

  const data = Array.from({ length: weeks }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => {
      const base = [1, 0, 2, 2, 1, 0, 0][d];
      const noise = Math.random() > 0.7 ? 1 : 0;
      return Math.min(base + noise, 3);
    })
  );

  const colors = [
    'rgba(255,255,255,0.04)',
    'rgba(91,141,255,0.22)',
    'rgba(91,141,255,0.50)',
    'rgba(91,141,255,0.85)',
  ];
  const glows = [
    'none',
    '0 0 5px rgba(91,141,255,0.15)',
    '0 0 8px rgba(91,141,255,0.30)',
    '0 0 12px rgba(91,141,255,0.55)',
  ];

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-1 min-w-0">
        <div className="flex flex-col gap-1 mr-2">
          {days.map(d => (
            <div key={d} className="h-3 flex items-center font-display text-[8px] w-6 uppercase tracking-wide" style={{ color: '#4A5A7A' }}>{d}</div>
          ))}
        </div>
        <div className="flex gap-1 flex-1">
          {data.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1 flex-1 min-w-[12px]">
              {week.map((val, di) => (
                <div
                  key={di}
                  className="h-3 rounded transition-all duration-200 hover:scale-110 cursor-pointer"
                  style={{ background: colors[val], boxShadow: glows[val] }}
                  title={`${val} post${val !== 1 ? 's' : ''}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-1 mt-3 justify-end">
        <span className="font-display text-[8px] mr-1 uppercase tracking-wide" style={{ color: '#4A5A7A' }}>Less</span>
        {colors.map((c, i) => (
          <div key={i} className="w-3 h-3 rounded" style={{ background: c, boxShadow: glows[i] }} />
        ))}
        <span className="font-display text-[8px] ml-1 uppercase tracking-wide" style={{ color: '#4A5A7A' }}>More</span>
      </div>
    </div>
  );
}
