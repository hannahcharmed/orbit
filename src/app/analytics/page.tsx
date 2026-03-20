'use client';

import { PageHeader } from '@/components/PageHeader';
import { StatCard } from '@/components/StatCard';
import { MiniSparkline } from '@/components/MiniSparkline';
import { TrendingUp, TrendingDown, Users, Heart, Bookmark, Eye } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

const engagementTimeSeries = [
  { date: 'Jan 1', ig: 5.1, tt: 6.8, yt: 3.9 },
  { date: 'Jan 8', ig: 5.4, tt: 7.2, yt: 4.1 },
  { date: 'Jan 15', ig: 4.9, tt: 6.9, yt: 3.8 },
  { date: 'Jan 22', ig: 5.8, tt: 7.8, yt: 4.4 },
  { date: 'Jan 29', ig: 6.2, tt: 8.1, yt: 4.6 },
  { date: 'Feb 5', ig: 5.9, tt: 7.6, yt: 4.3 },
  { date: 'Feb 12', ig: 6.8, tt: 8.4, yt: 4.9 },
  { date: 'Feb 19', ig: 7.1, tt: 8.9, yt: 5.1 },
  { date: 'Feb 26', ig: 6.4, tt: 8.2, yt: 4.7 },
  { date: 'Mar 5', ig: 7.4, tt: 9.1, yt: 5.3 },
  { date: 'Mar 12', ig: 7.8, tt: 9.4, yt: 5.6 },
  { date: 'Mar 19', ig: 7.1, tt: 8.7, yt: 5.4 },
];

const reachData = [
  { date: 'Jan 1', reach: 312 },
  { date: 'Jan 8', reach: 341 },
  { date: 'Jan 15', reach: 328 },
  { date: 'Jan 22', reach: 389 },
  { date: 'Jan 29', reach: 421 },
  { date: 'Feb 5', reach: 408 },
  { date: 'Feb 12', reach: 462 },
  { date: 'Feb 19', reach: 511 },
  { date: 'Feb 26', reach: 487 },
  { date: 'Mar 5', reach: 578 },
  { date: 'Mar 12', reach: 631 },
  { date: 'Mar 19', reach: 618 },
];

const contentTypeData = [
  { type: 'Reels', engagement: 7.8, reach: 89 },
  { type: 'Carousels', engagement: 7.2, reach: 72 },
  { type: 'Videos', engagement: 6.4, reach: 65 },
  { type: 'Static', engagement: 4.1, reach: 41 },
  { type: 'Stories', engagement: 3.2, reach: 28 },
];

const customTooltipStyle = {
  background: '#0D1228',
  border: '1px solid #1A2150',
  borderRadius: '8px',
  padding: '10px 14px',
  fontSize: '11px',
  color: '#E8F0FF',
};

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div style={customTooltipStyle}>
        <p className="text-text-quaternary text-[10px] mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.dataKey} style={{ color: p.color }}>
            {p.name}: {typeof p.value === 'number' ? p.value.toFixed(1) : p.value}
            {p.unit || ''}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export default function Analytics() {
  return (
    <div className="min-h-screen bg-deep-void">
      <div className="px-4 md:px-8 py-6 max-w-7xl mx-auto space-y-6">
        <PageHeader
          eyebrow="Analytics"
          title="Performance Overview"
          subtitle="Cross-platform · 90-day window · Last synced 4 min ago"
        />

        {/* Period selector */}
        <div className="flex items-center gap-2">
          {['7d', '28d', '90d', 'Custom'].map((p) => (
            <button
              key={p}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                p === '90d'
                  ? 'bg-orbit-blue/20 text-orbit-blue border border-orbit-blue/30'
                  : 'text-text-secondary hover:text-starlight bg-card-bg border border-border-default'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard label="Total Reach" value="847K" delta="+18.2%" positive icon={<Eye size={14} strokeWidth={1.5} />} sparkData={[42,51,47,62,68,75,91,88,95,102,118,112]} sparkColor="#6C63FF" />
          <StatCard label="Avg Engagement" value="6.8%" delta="+1.2pp" positive icon={<Heart size={14} strokeWidth={1.5} />} sparkData={[5.1,5.4,4.9,5.8,6.2,5.9,6.8,7.1,6.4,7.4,7.8,7.1]} sparkColor="#4ADE80" />
          <StatCard label="New Followers" value="+12.4K" delta="+34.1%" positive icon={<Users size={14} strokeWidth={1.5} />} sparkData={[82,91,87,104,118,112,138,145,131,162,178,169]} sparkColor="#A78BFA" />
          <StatCard label="Saves & Shares" value="42.1K" delta="+24.7%" positive icon={<Bookmark size={14} strokeWidth={1.5} />} sparkData={[18,22,19,27,31,28,35,38,33,42,48,44]} sparkColor="#EF9F27" />
        </div>

        {/* Engagement rate chart */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-label mb-1">Engagement Rate</p>
              <h2 className="font-serif text-xl text-starlight">By platform over time</h2>
            </div>
            <div className="flex items-center gap-3 text-[10px]">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-[#E1306C] inline-block rounded" />Instagram</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-white inline-block rounded" />TikTok</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-[#FF0000] inline-block rounded" />YouTube</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={engagementTimeSeries} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="igGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E1306C" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#E1306C" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="ttGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffffff" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="ytGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF0000" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#FF0000" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1A2150" vertical={false} />
              <XAxis dataKey="date" tick={{ fill: '#4A5280', fontSize: 9 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: '#4A5280', fontSize: 9 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="ig" name="Instagram" stroke="#E1306C" strokeWidth={1.5} fill="url(#igGrad)" dot={false} />
              <Area type="monotone" dataKey="tt" name="TikTok" stroke="#ffffff" strokeWidth={1.5} fill="url(#ttGrad)" dot={false} />
              <Area type="monotone" dataKey="yt" name="YouTube" stroke="#FF0000" strokeWidth={1.5} fill="url(#ytGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Reach chart */}
        <div className="card p-5">
          <div className="mb-5">
            <p className="text-label mb-1">Total Reach</p>
            <h2 className="font-serif text-xl text-starlight">Weekly combined reach (thousands)</h2>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={reachData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="reachGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#6C63FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1A2150" vertical={false} />
              <XAxis dataKey="date" tick={{ fill: '#4A5280', fontSize: 9 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: '#4A5280', fontSize: 9 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}K`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="reach" name="Reach" stroke="#6C63FF" strokeWidth={2} fill="url(#reachGrad)" dot={false} unit="K" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Content type breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="card p-5">
            <p className="text-label mb-1">Content Performance</p>
            <h2 className="font-serif text-xl text-starlight mb-5">By format</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={contentTypeData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1A2150" vertical={false} />
                <XAxis dataKey="type" tick={{ fill: '#4A5280', fontSize: 9 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fill: '#4A5280', fontSize: 9 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="engagement" name="Engagement" fill="#6C63FF" radius={[3, 3, 0, 0]} maxBarSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Platform detail table */}
          <div className="card p-5">
            <p className="text-label mb-1">Platform Detail</p>
            <h2 className="font-serif text-xl text-starlight mb-5">28-day summary</h2>
            <div className="space-y-3">
              {[
                { name: 'Instagram', followers: '284K', delta: '+2.1K', eng: '7.1%', reach: '412K', posts: 18, color: '#E1306C' },
                { name: 'TikTok', followers: '521K', delta: '+8.4K', eng: '6.3%', reach: '891K', posts: 24, color: '#010101', border: '#333' },
                { name: 'YouTube', followers: '42K', delta: '+1.9K', eng: '4.8%', reach: '94K', posts: 6, color: '#FF0000' },
              ].map((p) => (
                <div key={p.name} className="flex items-center gap-3 py-2.5 border-b border-border-default last:border-0">
                  <div
                    className="w-7 h-7 rounded-lg flex-shrink-0"
                    style={{ background: p.color, border: p.border ? `1px solid ${p.border}` : undefined }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-starlight">{p.name}</span>
                      <span className="text-[9px] text-success">{p.delta}</span>
                    </div>
                    <span className="text-[9px] text-text-quaternary">{p.followers} followers · {p.posts} posts</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-success">{p.eng}</p>
                    <p className="text-[9px] text-text-quaternary">{p.reach}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Best posting times */}
        <div className="card p-5">
          <p className="text-label mb-1">Optimal Posting Times</p>
          <h2 className="font-serif text-xl text-starlight mb-5">Your audience engagement window</h2>
          <div className="grid grid-cols-7 gap-1">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, di) => (
              <div key={day} className="space-y-1">
                <div className="text-[9px] text-text-quaternary text-center mb-2">{day}</div>
                {Array.from({ length: 8 }, (_, hi) => {
                  const hour = hi * 3;
                  const intensity = Math.random();
                  const isPeak = (di === 2 || di === 3) && (hi === 2 || hi === 3 || hi === 4);
                  const isLow = di === 1;
                  const bg = isPeak ? '#6C63FF' : isLow ? '#1A2150' : `rgba(108, 99, 255, ${intensity * 0.5})`;
                  return (
                    <div
                      key={hi}
                      className="h-6 rounded-sm transition-all hover:scale-105 cursor-pointer"
                      style={{ background: bg }}
                      title={`${day} ${hour}:00`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1 mt-3 justify-end">
            <span className="text-[9px] text-text-quaternary mr-1">Low</span>
            <div className="w-3 h-3 rounded-sm bg-nebula-navy" />
            <div className="w-3 h-3 rounded-sm" style={{ background: 'rgba(108,99,255,0.3)' }} />
            <div className="w-3 h-3 rounded-sm" style={{ background: 'rgba(108,99,255,0.6)' }} />
            <div className="w-3 h-3 rounded-sm bg-orbit-blue" />
            <span className="text-[9px] text-text-quaternary ml-1">Peak</span>
          </div>
        </div>
      </div>
    </div>
  );
}
