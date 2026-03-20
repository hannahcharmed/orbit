import { NextRequest, NextResponse } from 'next/server';

// System prompt that grounds the AI in the creator's data context
function buildSystemPrompt(creatorContext: Record<string, unknown>) {
  return `You are Orbit AI, a specialized creator intelligence coach built into the Orbit analytics platform. You are NOT a general assistant — you are a data-driven strategist who analyzes creator performance data and gives specific, actionable recommendations.

CREATOR CONTEXT:
${JSON.stringify(creatorContext, null, 2)}

RULES:
1. Every response MUST reference specific data points from the creator context above
2. Never give generic advice ("post more consistently") without tying it to their actual numbers
3. Keep responses concise — 2–4 short paragraphs maximum
4. Be direct and confident, like a world-class strategist, not a hedging chatbot
5. If asked about something outside your data (e.g., brand deals, legal), acknowledge your data scope
6. Format key numbers in bold when referencing them
7. End with one specific, actionable next step

TONE: Direct, data-driven, confident. You're a brilliant analyst, not a cheerleader.`;
}

// Demo creator context (in production this comes from the database)
const DEMO_CREATOR_CONTEXT = {
  creator: {
    name: 'Jordan Avery',
    handle: '@jordan.fit',
    niche: 'Fitness',
    tier: '100K–500K followers',
    gravityScore: 74,
    gravityDelta: '+6 vs last period',
    niche_rank: '#14 of 840 similar creators',
  },
  platforms: {
    instagram: {
      followers: 284000,
      followerGrowth28d: '+2100',
      avgEngagementRate: '7.1%',
      totalReach28d: '412K',
      postsLast28d: 18,
      topFormat: 'Reels',
    },
    tiktok: {
      followers: 521000,
      followerGrowth28d: '+8400',
      avgEngagementRate: '6.3%',
      totalReach28d: '891K',
      postsLast28d: 24,
    },
    youtube: {
      subscribers: 42000,
      avgEngagementRate: '4.8%',
      totalViews28d: '94K',
      postsLast28d: 6,
      status: 'WARNING: sync delayed 48h',
    },
  },
  performance: {
    bestDay: 'Thursday (8.2% avg engagement)',
    worstDay: 'Tuesday (34% below average)',
    bestFormat: 'Carousels (7.2% eng vs 4.1% single image)',
    bestTheme: 'HIIT workouts (2.4× baseline saves)',
    commentResponseRate: '34% (top 10% = 71%)',
    saveRate: '4.2% (top 10% = 7.1%)',
  },
  recentBreakout: {
    post: 'Morning HIIT Circuit — No Equipment',
    platform: 'Instagram Reel',
    multiplier: '3.2× baseline',
    reach: '127.4K',
    saves: 8241,
    hoursAgo: 2,
    successFactors: ['Pattern interrupt hook', 'Pre-peak trending audio', 'Thursday 7pm posting'],
  },
  trajectory: {
    status: 'Accelerating',
    followerVelocity: '440/day (up from 280/day last month)',
    projectedMilestone: '300K Instagram followers in ~34 days',
    engagementTrend: '6.8% → trending toward 7.4% in 30 days',
  },
  darkMatter: {
    topSignal: 'Silent workout format — momentum 0.94',
    trendingAudio: 'Energy (Remix) — 8 days to peak',
    risingHashtag: '#coldmorning — 890% WoW growth',
  },
  gaps_vs_top10pct: {
    saveRate: 'Need +2.9pp',
    commentResponse: 'Need +37pp',
    postingFrequency: 'Need +1.9 posts/week',
  },
};

export async function POST(req: NextRequest) {
  try {
    const { question, conversationHistory = [] } = await req.json();

    if (!question?.trim()) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;

    // If no API key, return a realistic demo response
    if (!apiKey) {
      const demoResponse = getDemoResponse(question);
      return NextResponse.json({
        answer: demoResponse,
        model: 'orbit-ai-demo',
        note: 'Set ANTHROPIC_API_KEY to enable live AI responses',
      });
    }

    // Build messages array with conversation history
    const messages = [
      ...conversationHistory.slice(-6), // Keep last 6 turns for context
      { role: 'user', content: question },
    ];

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-6',
        max_tokens: 600,
        system: buildSystemPrompt(DEMO_CREATOR_CONTEXT),
        messages,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('[insights/ask] Anthropic error:', errText);
      return NextResponse.json(
        { error: 'AI service temporarily unavailable', details: errText },
        { status: 502 }
      );
    }

    const data = await response.json();
    const answer = data.content?.[0]?.text ?? '';

    return NextResponse.json({
      answer,
      model: data.model,
      usage: data.usage,
    });
  } catch (err) {
    console.error('[insights/ask]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Realistic demo responses keyed on question patterns
function getDemoResponse(question: string): string {
  const q = question.toLowerCase();

  if (q.includes('tuesday') || q.includes('slow') || q.includes('growth')) {
    return `Your Tuesday underperformance is a clear pattern in your data. Over the past 16 weeks, Tuesday posts average **4.1% engagement** vs your **7.8% Thursday peak** — a **34% gap** that's costing you roughly 28K reach per post.\n\nThe cause is your audience's activity window, not your content quality. Your Instagram analytics show peak story views on Thursday 6–8pm ET and Wednesday 7–9pm ET. Tuesday morning posts (your current habit) hit when only **31% of your audience is active**.\n\n**Next step:** Move your next two Tuesday posts to Thursday evening and measure the delta. You'll likely see a 1.5–2× reach increase with identical content.`;
  }

  if (q.includes('save') || q.includes('saves')) {
    return `Your save rate sits at **4.2%** — solid, but **2.9 percentage points below the top 10%** of fitness creators in your tier (7.1%). Saves are your highest-value signal because they drive algorithmic amplification on Instagram more than likes.\n\nYour **carousels save at 6.8%** while single images save at only **1.9%**. The pattern in your top-saved posts: they're all "reference content" — things people want to come back to (exercise breakdowns, meal prep structures, supplement protocols).\n\n**Next step:** Convert your next 2 Reels into companion carousels with step-by-step instructions. Your HIIT reel is the perfect candidate — it already has 8,241 saves; a carousel version will compound that.`;
  }

  if (q.includes('engagement') || q.includes('engag')) {
    return `Your engagement rate of **6.8%** is already in the top 18% of your niche. The path to top 10% (9.2%) runs through two specific levers in your data.\n\nFirst, your **comment response rate is 34%** vs the top-10% benchmark of **71%**. Instagram's algorithm weights early comment engagement heavily — your posts that got comments replied to within 30 minutes averaged **11.4% engagement** vs **5.9%** for posts where you didn't respond.\n\nSecond, your escape velocity HIIT reel hit **9.4% engagement** by combining three factors: pattern interrupt hook, pre-peak trending audio, and Thursday evening posting.\n\n**Next step:** Set a 30-minute timer after your next post drops. Reply to the first 15 comments — this alone should move your engagement rate by 0.8–1.2pp within 3–4 posts.`;
  }

  if (q.includes('content') || q.includes('post') || q.includes('week')) {
    return `Based on your current momentum, here's your optimal week:\n\n**Thursday (priority):** Post a carousel version of your HIIT reel. Your escape velocity event is still hot — you have ~44 hours to ride the algorithm boost. Carousels from breakout reels average **2.3× the saves**.\n\n**Tuesday → shift to Wednesday:** Your Wednesday posts average **6.9% engagement** vs Tuesday's **4.1%**. Same effort, 68% more reach.\n\n**Dark Matter signal:** Use "Energy (Remix)" audio on your next Reel within 8 days. It's at 2.1M uses with **840% growth** — you're still early.\n\n**Next step:** Draft the HIIT carousel today. I can generate the slide structure based on your top-performing content patterns.`;
  }

  return `Looking at your data, the highest-leverage opportunity right now is your **escape velocity event** on the HIIT reel (3.2× baseline, 46h window) combined with the **Thursday 7pm posting window** that consistently drives your peak engagement.\n\nYour Gravity Score hit **74 (+6)** this period, ranking you **#14 of 840** similar creators. The gap to top 10% narrows to comment response rate (34% vs 71% benchmark) and save rate (4.2% vs 7.1% benchmark).\n\n**Next step:** Your most impactful action in the next 48 hours is posting a carousel follow-up to the HIIT reel and responding to the top 50 comments on the original post within the next 4 hours.`;
}
