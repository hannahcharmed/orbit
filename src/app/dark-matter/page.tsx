'use client';

import { PageHeader } from '@/components/PageHeader';
import { AIInsightCard } from '@/components/AIInsightCard';
import { Eye, TrendingUp, Music, Hash, Video, FileText, Flame, ChevronRight, Bell } from 'lucide-react';

const audioTrends = [
  { rank: 1, name: 'Energy (Remix) — DNDM', uses: '2.1M', growth: '+840%', daysLeft: 8, hot: true },
  { rank: 2, name: 'In My Head — Migos', uses: '1.4M', growth: '+620%', daysLeft: 12, hot: true },
  { rank: 3, name: 'Alpha Mindset — Lo-Fi Study', uses: '890K', growth: '+380%', daysLeft: 18 },
  { rank: 4, name: 'Morning Routine Beats', uses: '641K', growth: '+290%', daysLeft: 22 },
  { rank: 5, name: 'Workout Pump Playlist 2026', uses: '512K', growth: '+210%', daysLeft: 31 },
];

const hashtagTrends = [
  { tag: '#morningmovement', posts: '84K', growth: '+480%', niche: 'Fitness morning routine' },
  { tag: '#proteinbowl2026', posts: '31K', growth: '+620%', niche: 'Nutrition / meal prep' },
  { tag: '#10minuteabs', posts: '127K', growth: '+340%', niche: 'Quick workouts' },
  { tag: '#gymgirl', posts: '290K', growth: '+180%', niche: 'Female fitness identity' },
  { tag: '#coldmorning', posts: '22K', growth: '+890%', niche: 'Wellness / cold plunge' },
];

const formatTrends = [
  { format: 'Silent workout (text-only)', platform: 'TikTok + Instagram', score: 0.94, note: 'Captions driving retention without audio. 60-sec format.' },
  { format: '1-minute recipe reels', platform: 'Instagram', score: 0.91, note: 'Quick meal prep with text overlay. Very high save rate format.' },
  { format: 'Before/after transformation (90 days)', platform: 'All platforms', score: 0.88, note: 'Authentic progress stories outperforming aspirational content.' },
  { format: 'Myth-busting carousel', platform: 'Instagram', score: 0.87, note: '"Everyone says X but..." hook format. High share rate, educational angle.' },
];

function MomentumBar({ score }: { score: number }) {
  return (
    <div className="progress-track flex-shrink-0 w-24">
      <div
        className="h-full rounded-full transition-all"
        style={{
          width: `${score * 100}%`,
          background: score > 0.9 ? '#A78BFA' : score > 0.8 ? '#6C63FF' : '#3D3A9E',
        }}
      />
    </div>
  );
}

export default function DarkMatter() {
  return (
    <div className="min-h-screen bg-deep-void">
      <div className="px-4 md:px-8 py-6 max-w-7xl mx-auto space-y-6">
        <PageHeader
          eyebrow="Dark Matter"
          title="Trend Intelligence"
          subtitle="Pre-viral signals filtered to fitness & lifestyle · Updated in real-time"
        />

        {/* Briefing header */}
        <div className="card-ai p-4 rounded-xl flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-nova-violet/15 border border-nova-violet/30 flex items-center justify-center flex-shrink-0">
            <Eye size={16} strokeWidth={1.5} className="text-nova-violet" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="pill-violet">Weekly Dark Matter Briefing</span>
              <span className="text-[9px] text-text-quaternary">Mon, Mar 20</span>
            </div>
            <p className="text-xs text-starlight font-medium mb-1">5 signals tracking in your niche this week</p>
            <p className="text-[10px] text-text-secondary">2–3 weeks ahead of mainstream visibility. Act now for first-mover advantage.</p>
          </div>
          <button className="flex-shrink-0 w-8 h-8 rounded-lg bg-nova-violet/15 border border-nova-violet/30 flex items-center justify-center">
            <Bell size={13} strokeWidth={1.5} className="text-nova-violet" />
          </button>
        </div>

        {/* Critical signal alert */}
        <div className="rounded-xl p-4 border border-nova-violet/40 bg-dark-alert-bg">
          <div className="flex items-center gap-2 mb-2">
            <Flame size={14} className="text-nova-violet" strokeWidth={1.5} />
            <span className="text-[9px] font-medium text-nova-violet uppercase tracking-wider">Critical signal · Momentum 0.94</span>
          </div>
          <p className="text-sm font-medium text-starlight mb-1">Silent workout videos are breaking on TikTok & Instagram</p>
          <p className="text-[10px] text-text-secondary leading-relaxed mb-3">
            Zero-audio workout reels with text-only instruction are showing 2.1× higher completion rates than audio-driven content. Early adopters are seeing 40–60% save rate uplift. This format aligns perfectly with your existing HIIT content style.
          </p>
          <button className="btn-primary text-xs py-2">
            <FileText size={12} />
            Generate content brief
          </button>
        </div>

        {/* Trending audio */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Music size={14} strokeWidth={1.5} className="text-text-tertiary" />
            <div>
              <p className="text-label">Trending Audio</p>
              <h2 className="font-serif text-xl text-starlight">Rising in fitness niche</h2>
            </div>
          </div>
          <div className="space-y-3">
            {audioTrends.map((audio) => (
              <div key={audio.rank} className="flex items-center gap-3 py-2 border-b border-border-default last:border-0">
                <span className="font-mono text-[10px] text-text-faint w-4 flex-shrink-0">{String(audio.rank).padStart(2, '0')}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-medium text-starlight truncate">{audio.name}</p>
                    {audio.hot && (
                      <span className="text-[8px] text-amber bg-amber/10 border border-amber/20 px-1.5 py-0.5 rounded-full flex-shrink-0 flex items-center gap-0.5">
                        <Flame size={7} />HOT
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-[9px] text-text-quaternary">
                    <span>{audio.uses} uses</span>
                    <span className="text-success">{audio.growth}</span>
                    <span>·</span>
                    <span>~{audio.daysLeft} days to peak</span>
                  </div>
                </div>
                <button className="flex-shrink-0 text-[10px] text-orbit-blue hover:text-nova-violet transition-colors">
                  Use →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Hashtag trends */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Hash size={14} strokeWidth={1.5} className="text-text-tertiary" />
            <div>
              <p className="text-label">Hashtag Momentum</p>
              <h2 className="font-serif text-xl text-starlight">Emerging in your niche</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {hashtagTrends.map((ht) => (
              <div key={ht.tag} className="p-3 bg-space-black rounded-lg border border-border-default hover:border-nebula-navy/80 transition-all">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-medium text-orbit-blue">{ht.tag}</p>
                    <p className="text-[9px] text-text-quaternary mt-0.5">{ht.niche}</p>
                  </div>
                  <span className="text-[10px] text-success flex-shrink-0">{ht.growth}</span>
                </div>
                <p className="text-[9px] text-text-faint mt-2">{ht.posts} posts · growing</p>
              </div>
            ))}
          </div>
        </div>

        {/* Format momentum */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Video size={14} strokeWidth={1.5} className="text-text-tertiary" />
            <div>
              <p className="text-label">Format Momentum</p>
              <h2 className="font-serif text-xl text-starlight">Content formats gaining traction</h2>
            </div>
          </div>
          <div className="space-y-4">
            {formatTrends.map((f, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <p className="text-xs font-medium text-starlight">{f.format}</p>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <MomentumBar score={f.score} />
                      <span className="font-mono text-[9px] text-nova-violet">{f.score}</span>
                    </div>
                  </div>
                  <p className="text-[9px] text-text-secondary">{f.note}</p>
                  <p className="text-[8px] text-text-faint mt-1">Platforms: {f.platform}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content brief generator */}
        <div className="card-ai p-5 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="pill-violet">Orbit AI · Content Brief</span>
          </div>
          <h2 className="font-serif text-xl text-starlight mb-2">Generate content brief</h2>
          <p className="text-[10px] text-text-secondary mb-4 leading-relaxed">
            Select a trend signal and Orbit will generate a ready-to-execute content brief — hook, format, audio, hashtags, and optimal posting time.
          </p>
          <div className="space-y-2 mb-4">
            {['Silent workout (momentum: 0.94)', 'Myth-busting carousel', 'Trending audio: Energy (Remix)'].map((opt) => (
              <label key={opt} className="flex items-center gap-3 p-3 rounded-lg border border-border-purple/40 hover:border-nova-violet/40 cursor-pointer bg-deep-void transition-all">
                <input type="radio" name="brief" className="accent-orbit-blue" />
                <span className="text-xs text-starlight">{opt}</span>
              </label>
            ))}
          </div>
          <button className="btn-primary w-full justify-center text-xs py-3">
            <FileText size={13} />
            Generate brief for this signal
          </button>
        </div>

        <AIInsightCard
          type="trend"
          title="The 'cold plunge + morning routine' content cluster is peaking"
          body="Cross-platform data shows #coldmorning content is at 890% week-over-week growth but only 22K total posts — it's still early. Your existing morning routine content established credibility in this space. A cold plunge-focused video this week could ride this wave to breakout territory."
          action="Create cold plunge content brief →"
        />
      </div>
    </div>
  );
}
