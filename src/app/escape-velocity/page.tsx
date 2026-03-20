'use client';

import { PageHeader } from '@/components/PageHeader';
import { AIInsightCard } from '@/components/AIInsightCard';
import { Zap, Clock, CheckCircle, ArrowUpRight, Play, BookOpen, Copy } from 'lucide-react';

const activeEvent = {
  postTitle: 'Morning HIIT Circuit — No Equipment',
  platform: 'Instagram',
  type: 'Reel',
  postedAt: '2 hours ago',
  multiplier: 3.2,
  reach: 127400,
  engagement: 9.4,
  saves: 8241,
  shares: 3102,
  comments: 847,
  hoursLeft: 46,
  factors: [
    { label: 'Hook text on slide 1', impact: 'High', detail: '"Most people do HIIT wrong" — pattern interrupt + curiosity gap performed 2.4× better than your usual hooks' },
    { label: 'Audio selection', impact: 'High', detail: 'Used trending audio "Energy" (2.1M uses) before it peaked — Dark Matter flagged it 18 days ago' },
    { label: 'Posting time', impact: 'Medium', detail: 'Posted Thursday 7pm ET — your highest-engagement window. 23% better reach than your average posting time' },
  ],
  playbook: [
    'Post a follow-up "Part 2" reel within 24–36 hours while the algorithm is boosting your profile',
    'Engage with every comment in the next 8 hours (you have 847 comments — even responding to top 50 helps)',
    'Create a carousel version with step-by-step breakdowns of each exercise for saves',
    'Pin this post to your profile grid immediately',
    'Add to your Instagram Story with a direct CTA to save the original reel',
  ],
};

const pastEvents = [
  { title: '5-Day Meal Prep', platform: 'TikTok', mult: 2.8, date: 'Mar 1', status: 'actioned', reach: '+94K' },
  { title: 'Cold Plunge Protocol', platform: 'Instagram', mult: 2.6, date: 'Feb 18', status: 'actioned', reach: '+68K' },
  { title: 'Supplement Stack Review', platform: 'YouTube', mult: 2.5, date: 'Feb 3', status: 'expired', reach: '+31K' },
];

export default function EscapeVelocity() {
  return (
    <div className="min-h-screen bg-deep-void">
      <div className="px-4 md:px-8 py-6 max-w-7xl mx-auto space-y-6">
        <PageHeader
          eyebrow="Escape Velocity"
          title="Breakout Detection"
          subtitle="Real-time alerts when posts exceed 2.5× baseline engagement"
        />

        {/* Active alert banner */}
        <div className="rounded-xl p-5 border border-amber/40 bg-warning-alert-bg glow-blue">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber/20 border border-amber/30 flex items-center justify-center flex-shrink-0">
              <Zap size={20} strokeWidth={1.5} className="text-amber" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className="pill-amber">LIVE · ACTIVE</span>
                <div className="flex items-center gap-1 text-[10px] text-text-quaternary">
                  <Clock size={10} />
                  <span>{activeEvent.hoursLeft} hours remaining to capitalize</span>
                </div>
              </div>
              <h2 className="font-serif text-xl text-starlight mb-1">{activeEvent.postTitle}</h2>
              <p className="text-[10px] text-text-secondary">{activeEvent.platform} · {activeEvent.type} · Posted {activeEvent.postedAt}</p>

              {/* Multiplier hero */}
              <div className="flex items-baseline gap-2 mt-4">
                <span className="font-serif text-5xl text-amber">{activeEvent.multiplier}×</span>
                <span className="text-sm text-text-secondary">baseline engagement</span>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-4 gap-3 mt-5 pt-4 border-t border-amber/20">
            {[
              { label: 'Reach', val: '127.4K', delta: '+214%' },
              { label: 'Engagement', val: '9.4%', delta: '+4.2pp' },
              { label: 'Saves', val: '8,241', delta: '+380%' },
              { label: 'Shares', val: '3,102', delta: '+290%' },
            ].map((m) => (
              <div key={m.label} className="text-center">
                <p className="font-serif text-xl text-starlight">{m.val}</p>
                <p className="text-[8px] text-text-quaternary mt-0.5">{m.label}</p>
                <p className="text-[9px] text-success">{m.delta}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why this broke out */}
        <div className="card p-5">
          <p className="text-label mb-1">AI Analysis</p>
          <h2 className="font-serif text-xl text-starlight mb-4">Why this post broke out</h2>
          <div className="space-y-3">
            {activeEvent.factors.map((f, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-dark-void rounded-lg border border-border-default">
                <div className="w-6 h-6 rounded-full bg-orbit-blue/20 border border-orbit-blue/30 flex items-center justify-center flex-shrink-0 text-[9px] font-medium text-orbit-blue">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-starlight">{f.label}</span>
                    <span className={`text-[8px] px-2 py-0.5 rounded-full ${
                      f.impact === 'High'
                        ? 'text-success bg-success/10 border border-success/20'
                        : 'text-amber bg-amber/10 border border-amber/20'
                    }`}>
                      {f.impact} impact
                    </span>
                  </div>
                  <p className="text-[10px] text-text-secondary leading-relaxed">{f.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 48-hour playbook */}
        <div className="card-ai p-5 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={14} className="text-nova-violet" strokeWidth={1.5} />
            <span className="pill-violet">48-Hour Replication Playbook</span>
          </div>
          <p className="text-[10px] text-text-secondary mb-4 leading-relaxed">
            These are your specific next steps to capitalize on this escape velocity event before momentum expires.
          </p>
          <div className="space-y-3">
            {activeEvent.playbook.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-nova-violet/20 border border-nova-violet/30 flex items-center justify-center flex-shrink-0 text-[8px] text-nova-violet font-medium">
                  {i + 1}
                </div>
                <p className="text-[11px] text-starlight leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-5">
            <button className="btn-primary flex-1 justify-center text-xs py-2.5">
              <Play size={12} />
              Start playbook
            </button>
            <button className="btn-secondary flex-1 justify-center text-xs py-2.5">
              <Copy size={12} />
              Copy steps
            </button>
          </div>
        </div>

        {/* Pattern recognition */}
        <AIInsightCard
          type="strategic"
          title="Pattern detected across your 3 escape velocity events"
          body="All 3 of your breakout posts share: (1) hook text using pattern interrupt technique, (2) trending audio adopted before the peak, (3) Thursday or Friday posting. Your breakouts are not random — they follow a repeatable formula you can apply deliberately."
          action="Save as content template →"
        />

        {/* Past events */}
        <div className="card p-5">
          <p className="text-label mb-1">Event History</p>
          <h2 className="font-serif text-xl text-starlight mb-4">Previous escape velocity events</h2>
          <div className="space-y-3">
            {pastEvents.map((e, i) => (
              <div key={i} className="flex items-center gap-3 py-3 border-b border-border-default last:border-0">
                <div className="w-8 h-8 rounded-lg bg-amber/10 border border-amber/20 flex items-center justify-center flex-shrink-0">
                  <Zap size={14} strokeWidth={1.5} className="text-amber" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-starlight truncate">{e.title}</p>
                  <p className="text-[9px] text-text-quaternary">{e.platform} · {e.date}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-serif text-base text-amber">{e.mult}×</p>
                  <p className="text-[9px] text-success">{e.reach}</p>
                </div>
                <span className={`text-[8px] px-2 py-1 rounded-full flex-shrink-0 ${
                  e.status === 'actioned'
                    ? 'text-success bg-success/10 border border-success/20'
                    : 'text-text-quaternary bg-nebula-navy/50 border border-border-default'
                }`}>
                  {e.status}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 text-center">
            <p className="text-[10px] text-text-secondary">
              Capitalization rate: <span className="text-success font-medium">67%</span>
              <span className="text-text-quaternary"> (target: 35%)</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
