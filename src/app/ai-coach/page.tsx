'use client';

import { PageHeader } from '@/components/PageHeader';
import { AIInsightCard } from '@/components/AIInsightCard';
import { Brain, ThumbsUp, ThumbsDown, Send, Star, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const weeklyDigest = [
  {
    priority: 1,
    title: 'Post Thursday 7pm — your peak engagement window',
    detail: 'Based on 16 weeks of your data, Thursday 6–8pm ET is your highest-reach window. Your last 4 Thursday evening posts averaged 8.2% engagement vs 5.4% overall.',
    type: 'timing',
    effort: 'Low effort',
    impact: 'High impact',
  },
  {
    priority: 2,
    title: 'Switch Tuesday content to Wednesday',
    detail: 'Tuesday underperforms by 34% vs your midweek peak. Shifting same content to Wednesday would increase estimated reach by ~28K based on audience activity patterns.',
    type: 'timing',
    effort: 'Low effort',
    impact: 'High impact',
  },
  {
    priority: 3,
    title: 'Create a carousel follow-up to your HIIT breakout post',
    detail: 'Your escape velocity HIIT reel has 8,241 saves. A complementary carousel with "Step-by-step breakdown" will ride the algorithm boost and convert those saves into follows.',
    type: 'content',
    effort: 'Medium effort',
    impact: 'Very high impact',
  },
  {
    priority: 4,
    title: 'Respond to comments within 4 hours of posting',
    detail: 'You respond to 34% of comments. Top-tier creators in your niche respond to 71%. Instagram\'s algorithm weights early comment engagement heavily — even 20 responses in hour 1 makes a measurable difference.',
    type: 'engagement',
    effort: 'Low effort',
    impact: 'High impact',
  },
  {
    priority: 5,
    title: 'Use "Energy (Remix)" audio before it peaks',
    detail: 'Dark Matter flagged this audio at 2.1M uses with 840% growth. You have ~8 days before it saturates. Your HIIT content format is perfectly suited to this audio\'s BPM and energy.',
    type: 'content',
    effort: 'Low effort',
    impact: 'High impact',
  },
];

const typeColors: Record<string, string> = {
  timing: '#6C63FF',
  content: '#A78BFA',
  engagement: '#4ADE80',
};

export default function AICoach() {
  const [question, setQuestion] = useState('');
  const [feedback, setFeedback] = useState<Record<number, 'up' | 'down'>>({});
  const [conversation, setConversation] = useState<Message[]>([]);
  const [isAsking, setIsAsking] = useState(false);
  const [askError, setAskError] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  const askCoach = async (q: string) => {
    if (!q.trim() || isAsking) return;
    setAskError('');
    setQuestion('');

    const userMsg: Message = { role: 'user', content: q };
    setConversation(prev => [...prev, userMsg]);
    setIsAsking(true);

    try {
      const res = await fetch('/api/insights/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          conversationHistory: conversation.slice(-6).map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed');
      setConversation(prev => [...prev, { role: 'assistant', content: data.answer }]);
    } catch (err: any) {
      setAskError(err.message || 'Something went wrong — please try again');
      setConversation(prev => prev.slice(0, -1)); // Remove the user message on error
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className="min-h-screen bg-deep-void">
      <div className="px-4 md:px-8 py-6 max-w-7xl mx-auto space-y-6">
        <div className="flex items-start justify-between">
          <PageHeader
            eyebrow="AI Coach"
            title="Personalized Intelligence"
            subtitle="Every insight references your specific data — no generic advice"
          />
          <span className="pill-violet mt-1 flex-shrink-0">Pro</span>
        </div>

        {/* Coach intro */}
        <div className="card-ai p-4 rounded-xl flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-nova-violet/20 border border-nova-violet/30 flex items-center justify-center flex-shrink-0">
            <Brain size={18} strokeWidth={1.5} className="text-nova-violet" />
          </div>
          <div>
            <p className="text-xs font-medium text-starlight mb-1">Orbit AI — Trained on your 18 months of data</p>
            <p className="text-[10px] text-text-secondary leading-relaxed">
              I&apos;ve analyzed 284 posts across Instagram, TikTok, and YouTube. Here are this week&apos;s priority actions ranked by impact-to-effort ratio. Every recommendation references your actual performance data.
            </p>
          </div>
        </div>

        {/* Weekly digest */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-label mb-1">Weekly Digest</p>
              <h2 className="font-serif text-xl text-starlight">Priority actions for this week</h2>
            </div>
            <div className="flex items-center gap-1 text-[9px] text-text-quaternary">
              <Clock size={10} />
              <span>Refreshed Monday</span>
            </div>
          </div>
          <div className="space-y-3">
            {weeklyDigest.map((item, i) => (
              <div key={i} className="card p-4 hover:border-nebula-navy/60 transition-all">
                <div className="flex items-start gap-3">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 font-mono text-[10px] font-medium"
                    style={{
                      background: `${typeColors[item.type]}18`,
                      border: `1px solid ${typeColors[item.type]}30`,
                      color: typeColors[item.type],
                    }}
                  >
                    {item.priority}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-medium text-starlight mb-1.5">{item.title}</h3>
                    <p className="text-[10px] text-text-secondary leading-relaxed mb-3">{item.detail}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] text-text-quaternary bg-nebula-navy/50 border border-border-default px-2 py-0.5 rounded-full">
                          {item.effort}
                        </span>
                        <span className="text-[8px] text-success bg-success/10 border border-success/20 px-2 py-0.5 rounded-full">
                          {item.impact}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className={`w-6 h-6 rounded-md flex items-center justify-center transition-all ${
                            feedback[i] === 'up' ? 'bg-success/20 border border-success/30' : 'bg-nebula-navy/40 border border-border-default hover:border-success/30'
                          }`}
                          onClick={() => setFeedback(f => ({ ...f, [i]: 'up' }))}
                        >
                          <ThumbsUp size={10} className={feedback[i] === 'up' ? 'text-success' : 'text-text-quaternary'} />
                        </button>
                        <button
                          className={`w-6 h-6 rounded-md flex items-center justify-center transition-all ${
                            feedback[i] === 'down' ? 'bg-alert-red/20 border border-alert-red/30' : 'bg-nebula-navy/40 border border-border-default hover:border-alert-red/30'
                          }`}
                          onClick={() => setFeedback(f => ({ ...f, [i]: 'down' }))}
                        >
                          <ThumbsDown size={10} className={feedback[i] === 'down' ? 'text-alert-red' : 'text-text-quaternary'} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content analysis section */}
        <div className="card p-5">
          <p className="text-label mb-1">Content Analysis</p>
          <h2 className="font-serif text-xl text-starlight mb-4">What&apos;s working for you</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { metric: 'Best format', value: 'Carousels', note: '7.2% avg eng vs 4.1% single img', icon: <Star size={14} />, color: '#A78BFA' },
              { metric: 'Best day', value: 'Thursday', note: '8.2% avg engagement', icon: <Clock size={14} />, color: '#6C63FF' },
              { metric: 'Best theme', value: 'HIIT workouts', note: '2.4× your baseline saves', icon: <TrendingUp size={14} />, color: '#4ADE80' },
            ].map((item) => (
              <div key={item.metric} className="p-3 rounded-lg bg-space-black border border-border-default text-center">
                <div className="flex items-center justify-center mb-2" style={{ color: item.color }}>
                  {item.icon}
                </div>
                <p className="text-[9px] text-text-quaternary uppercase tracking-wider mb-1">{item.metric}</p>
                <p className="font-serif text-base text-starlight">{item.value}</p>
                <p className="text-[9px] text-text-secondary mt-1">{item.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ask the coach — live API */}
        <div className="card-ai rounded-xl overflow-hidden">
          <div className="flex items-center gap-2 p-5 pb-4 border-b border-border-purple/30">
            <Brain size={14} strokeWidth={1.5} className="text-nova-violet" />
            <span className="pill-violet">Ask the Coach</span>
            <span className="ml-auto text-[9px] text-text-faint">Powered by Claude</span>
          </div>

          {/* Conversation thread */}
          {conversation.length > 0 && (
            <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
              {conversation.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full bg-nova-violet/20 border border-nova-violet/30 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                      <Brain size={10} className="text-nova-violet" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] px-3 py-2.5 rounded-xl text-[11px] leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-orbit-blue/20 border border-orbit-blue/30 text-starlight rounded-br-sm'
                        : 'bg-space-black border border-border-purple/30 text-text-secondary rounded-bl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isAsking && (
                <div className="flex justify-start">
                  <div className="w-6 h-6 rounded-full bg-nova-violet/20 border border-nova-violet/30 flex items-center justify-center flex-shrink-0 mr-2">
                    <Brain size={10} className="text-nova-violet animate-pulse" />
                  </div>
                  <div className="bg-space-black border border-border-purple/30 px-3 py-2.5 rounded-xl rounded-bl-sm">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-nova-violet/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-nova-violet/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-nova-violet/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          )}

          {/* Starter questions — shown when no conversation yet */}
          {conversation.length === 0 && (
            <div className="p-4 space-y-2">
              <p className="text-[10px] text-text-secondary mb-3 leading-relaxed">
                Ask anything about your content strategy. Every answer references your actual data.
              </p>
              {[
                'Why did my follower growth slow last month?',
                'What content should I post this week?',
                'How do I improve my save rate?',
              ].map((q) => (
                <button
                  key={q}
                  className="w-full text-left text-[10px] text-text-secondary hover:text-starlight p-3 rounded-lg border border-border-purple/30 hover:border-nova-violet/30 bg-deep-void transition-all"
                  onClick={() => askCoach(q)}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Error */}
          {askError && (
            <div className="mx-4 mb-3 flex items-center gap-2 p-2.5 rounded-lg bg-error-alert-bg border border-border-error/40">
              <AlertCircle size={12} className="text-alert-red flex-shrink-0" />
              <p className="text-[10px] text-alert-red">{askError}</p>
            </div>
          )}

          {/* Input */}
          <div className="p-4 pt-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={question}
                onChange={e => setQuestion(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && askCoach(question)}
                placeholder="Ask about your content strategy..."
                disabled={isAsking}
                className="flex-1 bg-deep-void border border-border-purple/40 rounded-lg px-3 py-2.5 text-xs text-starlight placeholder:text-text-faint focus:outline-none focus:border-nova-violet/50 transition-all disabled:opacity-50"
              />
              <button
                onClick={() => askCoach(question)}
                disabled={!question.trim() || isAsking}
                className="w-10 h-10 rounded-lg bg-orbit-blue flex items-center justify-center flex-shrink-0 hover:bg-orbit-blue/80 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send size={14} strokeWidth={1.5} className="text-white" />
              </button>
            </div>
          </div>
        </div>

        <AIInsightCard
          type="diagnostic"
          title="Your engagement rate peaked at 9.4% — here's the formula"
          body="Analyzing your top 20 posts, the formula is: (1) Pattern interrupt hook in first 0.5 seconds, (2) Trending audio adopted pre-peak, (3) Thursday/Friday posting, (4) Carousels or structured reels with text overlays, (5) Reply to first 10 comments within 30 minutes. Your escape velocity HIIT post hit all 5 criteria."
          action="Apply this formula to next post →"
        />
      </div>
    </div>
  );
}
