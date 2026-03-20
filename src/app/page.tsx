'use client';

import { GravityScoreRing } from '@/components/GravityScoreRing';
import { StatCard } from '@/components/StatCard';
import { AIInsightCard } from '@/components/AIInsightCard';
import { EscapeVelocityAlert } from '@/components/EscapeVelocityAlert';
import { PageHeader } from '@/components/PageHeader';
import { MiniSparkline } from '@/components/MiniSparkline';
import { Bell, TrendingUp, Users, Heart, Bookmark, MessageCircle, ArrowUpRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const engagementData = [3.2, 3.8, 3.1, 4.2, 4.8, 4.1, 5.3, 5.1, 4.9, 5.8, 6.2, 5.9, 6.8, 7.1, 6.4, 7.8];
const reachData = [42, 38, 51, 47, 62, 58, 71, 68, 75, 82, 79, 91, 88, 95, 102, 118];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-deep-void">
      {/* Mobile header */}
      <div className="md:hidden flex items-center justify-between px-4 pt-12 pb-4 bg-space-black border-b border-border-default">
        <div>
          <p className="text-[9px] text-text-quaternary uppercase tracking-widest">Good morning</p>
          <h1 className="text-sm font-medium text-starlight">Jordan Avery</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-lg bg-card-bg border border-border-default flex items-center justify-center relative">
            <Bell size={14} strokeWidth={1.5} className="text-text-tertiary" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-amber rounded-full" />
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orbit-blue to-nova-violet flex items-center justify-center text-[10px] font-semibold text-white">
            JA
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 py-6 max-w-7xl mx-auto space-y-6">
        {/* Desktop header */}
        <div className="hidden md:block">
          <PageHeader
            eyebrow="Dashboard"
            title="Creator Intelligence"
            subtitle="March 20, 2026 · Last synced 4 min ago"
          />
        </div>

        {/* Period selector */}
        <div className="flex items-center gap-2">
          {['7d', '28d', '90d'].map((p) => (
            <button
              key={p}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                p === '28d'
                  ? 'bg-orbit-blue/20 text-orbit-blue border border-orbit-blue/30'
                  : 'text-text-secondary hover:text-starlight bg-card-bg border border-border-default'
              }`}
            >
              {p}
            </button>
          ))}
          <div className="ml-auto text-[10px] text-text-quaternary">
            vs prev period <span className="text-success">+12.4%</span>
          </div>
        </div>

        {/* Gravity Score + Stats row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Gravity Score Card */}
          <div className="card p-5 flex items-center gap-5 col-span-1 glow-violet">
            <GravityScoreRing score={74} size={100} />
            <div className="flex-1 min-w-0">
              <p className="text-label mb-1">Gravity Score™</p>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-serif text-4xl text-starlight">74</span>
                <span className="text-xs text-success flex items-center gap-0.5">
                  <ArrowUpRight size={12} />+6
                </span>
              </div>
              <p className="text-[10px] text-text-secondary mb-3">vs 68 last period</p>
              {/* Component breakdown */}
              <div className="space-y-1.5">
                {[
                  { label: 'Return viewers', val: 82, pct: '30%' },
                  { label: 'Save depth', val: 68, pct: '25%' },
                  { label: 'Comment quality', val: 71, pct: '20%' },
                  { label: 'Cross-platform', val: 65, pct: '15%' },
                  { label: 'Velocity', val: 79, pct: '10%' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <span className="text-[8px] text-text-quaternary w-20 truncate">{item.label}</span>
                    <div className="progress-track flex-1">
                      <div
                        className="progress-fill-violet"
                        style={{ width: `${item.val}%` }}
                      />
                    </div>
                    <span className="text-[8px] font-mono text-text-faint w-4 text-right">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="col-span-1 lg:col-span-2 grid grid-cols-2 gap-3">
            <StatCard
              label="Total Reach"
              value="847K"
              delta="+18.2%"
              positive
              icon={<Users size={14} strokeWidth={1.5} />}
              sparkData={reachData}
              sparkColor="#6C63FF"
            />
            <StatCard
              label="Avg Engagement"
              value="6.8%"
              delta="+1.2pp"
              positive
              icon={<Heart size={14} strokeWidth={1.5} />}
              sparkData={engagementData}
              sparkColor="#4ADE80"
            />
            <StatCard
              label="Saves & Shares"
              value="42.1K"
              delta="+24.7%"
              positive
              icon={<Bookmark size={14} strokeWidth={1.5} />}
              sparkData={[18, 22, 19, 27, 31, 28, 35, 38, 33, 42]}
              sparkColor="#A78BFA"
            />
            <StatCard
              label="Comments"
              value="8,340"
              delta="-3.1%"
              positive={false}
              icon={<MessageCircle size={14} strokeWidth={1.5} />}
              sparkData={[92, 88, 95, 89, 87, 84, 90, 86, 83, 80]}
              sparkColor="#F09595"
            />
          </div>
        </div>

        {/* Escape Velocity Alert */}
        <EscapeVelocityAlert
          postTitle="Morning HIIT Circuit — No Equipment"
          multiplier={3.2}
          timeAgo="2 hours ago"
          platform="Instagram"
          hoursLeft={46}
        />

        {/* AI Insights */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-label">Orbit AI</p>
              <h2 className="font-serif text-lg text-starlight mt-0.5">This week&apos;s intelligence</h2>
            </div>
            <Link href="/ai-coach" className="flex items-center gap-1 text-xs text-orbit-blue hover:text-nova-violet transition-colors">
              View all <ChevronRight size={12} />
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
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-label">Platform Breakdown</p>
              <h2 className="font-serif text-lg text-starlight mt-0.5">28-day performance</h2>
            </div>
            <Link href="/analytics" className="text-xs text-orbit-blue hover:text-nova-violet transition-colors flex items-center gap-1">
              Full analytics <ChevronRight size={12} />
            </Link>
          </div>

          <div className="space-y-4">
            {[
              { platform: 'Instagram', followers: '284K', eng: '7.1%', reach: '412K', color: '#E1306C', pct: 78 },
              { platform: 'TikTok', followers: '521K', eng: '6.3%', reach: '891K', color: '#010101', pct: 100, border: '#fff' },
              { platform: 'YouTube', followers: '42K', eng: '4.8%', reach: '94K', color: '#FF0000', pct: 32 },
            ].map((p) => (
              <div key={p.platform} className="flex items-center gap-4">
                <div
                  className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: p.color, border: p.border ? `1px solid ${p.border}` : undefined }}
                >
                  {p.platform[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-starlight">{p.platform}</span>
                    <div className="flex items-center gap-3 text-[10px] text-text-secondary">
                      <span>{p.followers}</span>
                      <span className="text-success">{p.eng}</span>
                      <span className="hidden sm:inline">{p.reach} reach</span>
                    </div>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill-blue" style={{ width: `${p.pct}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top content */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-label">Top Content</p>
              <h2 className="font-serif text-lg text-starlight mt-0.5">Last 28 days</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              {
                title: 'Morning HIIT Circuit — No Equipment',
                platform: 'Instagram',
                type: 'Reel',
                eng: '9.4%',
                reach: '127K',
                saves: '8.2K',
                color: '#E1306C',
              },
              {
                title: '5-Day Meal Prep for Muscle Gain',
                platform: 'TikTok',
                type: 'Video',
                eng: '8.1%',
                reach: '94K',
                saves: '12.1K',
                color: '#010101',
              },
              {
                title: 'The Supplement Stack I Actually Use',
                platform: 'YouTube',
                type: 'Short',
                eng: '6.9%',
                reach: '41K',
                saves: '3.7K',
                color: '#FF0000',
              },
            ].map((post, i) => (
              <div key={i} className="card p-4 hover:border-nebula-navy transition-all duration-200">
                <div
                  className="w-full h-24 rounded-lg mb-3 flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${post.color}22, ${post.color}11)`, border: `1px solid ${post.color}33` }}
                >
                  <TrendingUp size={24} strokeWidth={1} className="text-text-quaternary" />
                </div>
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-3 h-3 rounded-sm" style={{ background: post.color }} />
                  <span className="text-[9px] text-text-quaternary">{post.platform}</span>
                  <span className="text-[9px] text-text-faint">·</span>
                  <span className="text-[9px] text-text-quaternary">{post.type}</span>
                </div>
                <p className="text-xs font-medium text-starlight mb-3 line-clamp-2">{post.title}</p>
                <div className="flex items-center justify-between text-[10px] text-text-secondary">
                  <span><span className="text-success">{post.eng}</span> eng</span>
                  <span>{post.reach} reach</span>
                  <span>{post.saves} saves</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Posting heatmap */}
        <div className="card p-5">
          <p className="text-label mb-1">Posting Consistency</p>
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

  // Generate synthetic heatmap data
  const data = Array.from({ length: weeks }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => {
      const base = [1, 0, 2, 2, 1, 0, 0][d];
      const noise = Math.random() > 0.7 ? 1 : 0;
      return Math.min(base + noise, 3);
    })
  );

  const colors = ['#1A2150', '#3D3A9E', '#6C63FF', '#A78BFA'];

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-1 min-w-0">
        <div className="flex flex-col gap-1 mr-2">
          {days.map(d => (
            <div key={d} className="h-3 flex items-center text-[9px] text-text-quaternary w-6">{d}</div>
          ))}
        </div>
        <div className="flex gap-1 flex-1">
          {data.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1 flex-1 min-w-[12px]">
              {week.map((val, di) => (
                <div
                  key={di}
                  className="h-3 rounded-sm transition-all duration-200 hover:scale-110 cursor-pointer"
                  style={{ background: colors[val] }}
                  title={`${val} post${val !== 1 ? 's' : ''}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-1 mt-3 justify-end">
        <span className="text-[9px] text-text-quaternary mr-1">Less</span>
        {colors.map((c, i) => (
          <div key={i} className="w-3 h-3 rounded-sm" style={{ background: c }} />
        ))}
        <span className="text-[9px] text-text-quaternary ml-1">More</span>
      </div>
    </div>
  );
}
