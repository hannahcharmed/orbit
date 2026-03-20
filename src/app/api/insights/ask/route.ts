import { NextRequest } from 'next/server';
import { errorResponse, successResponse } from '@/lib/api-helpers';
import type { InsightAskRequest, InsightAskResponse, ConversationMessage } from '@/types/api';

const MAX_QUESTION_LENGTH = 1000;
const MAX_HISTORY_TURNS = 6;

// ---------------------------------------------------------------------------
// System prompt — grounds AI in creator-specific data context
// ---------------------------------------------------------------------------

function buildSystemPrompt(context: Record<string, unknown>): string {
  return `You are Orbit AI, a specialized creator intelligence coach built into the Orbit analytics platform. You are NOT a general assistant — you are a data-driven strategist who analyzes creator performance data and gives specific, actionable recommendations.

CREATOR CONTEXT:
${JSON.stringify(context, null, 2)}

RULES:
1. Every response MUST reference specific data points from the creator context above
2. Never give generic advice ("post more consistently") without tying it to their actual numbers
3. Keep responses concise — 2–4 short paragraphs maximum
4. Be direct and confident, like a world-class strategist, not a hedging chatbot
5. If asked about something outside your data scope, acknowledge your data scope clearly
6. End with one specific, immediately actionable next step

TONE: Direct, data-driven, confident. You are a brilliant analyst, not a cheerleader.`;
}

// Demo creator context — in production this is fetched from the database
const DEMO_CREATOR_CONTEXT = {
  creator: {
    name: 'Jordan Avery',
    handle: '@jordan.fit',
    niche: 'Fitness',
    tier: '100K–500K followers',
    gravityScore: 74,
    gravityDelta: '+6 vs last period',
    nicheRank: '#14 of 840 similar creators',
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
      syncStatus: 'DELAYED_48H',
    },
  },
  performance: {
    bestDay: 'Thursday (8.2% avg engagement)',
    worstDay: 'Tuesday (34% below average)',
    bestFormat: 'Carousels (7.2% eng vs 4.1% single image)',
    bestTheme: 'HIIT workouts (2.4× baseline saves)',
    commentResponseRate: '34% (top 10% benchmark = 71%)',
    saveRate: '4.2% (top 10% benchmark = 7.1%)',
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
    projectedMilestone: '300K Instagram followers ~34 days out',
    engagementTrend: '6.8% trending toward 7.4% in 30 days',
  },
  darkMatter: {
    topSignal: 'Silent workout format — momentum 0.94',
    trendingAudio: 'Energy (Remix) — 8 days to peak',
    risingHashtag: '#coldmorning — 890% WoW growth',
  },
  gapsVsTop10Pct: {
    saveRate: '+2.9pp needed',
    commentResponse: '+37pp needed',
    postingFrequency: '+1.9 posts/week needed',
  },
} as const;

// ---------------------------------------------------------------------------
// Realistic demo responses (no API key required)
// ---------------------------------------------------------------------------

function getDemoResponse(question: string): string {
  const q = question.toLowerCase();

  if (q.includes('tuesday') || (q.includes('slow') && q.includes('growth'))) {
    return `Your Tuesday underperformance is a clear, repeatable pattern across 16 weeks of data. Tuesday posts average **4.1% engagement** vs your **7.8% Thursday peak** — a 34% gap costing you ~28K reach per post.\n\nThe cause is audience activity, not content quality. Your Instagram analytics show peak story views on Thursday 6–8pm ET and Wednesday 7–9pm ET. Tuesday morning posts land when only **31% of your audience is active**.\n\n**Next step:** Move your next Tuesday post to Thursday evening and measure the delta — same content, likely 1.5–2× more reach.`;
  }
  if (q.includes('save')) {
    return `Your save rate sits at **4.2%** — 2.9pp below the top 10% of fitness creators at your tier (7.1%). Saves are your highest-value signal because they drive algorithmic amplification on Instagram more than likes.\n\nYour carousels save at **6.8%** vs single images at **1.9%**. The pattern in your top-saved posts: they're all reference content people return to — exercise breakdowns, meal prep structures, supplement protocols.\n\n**Next step:** Convert your escape velocity HIIT reel into a companion carousel with step-by-step instructions. It already has 8,241 saves; a carousel version compounds that.`;
  }
  if (q.includes('engag')) {
    return `Your **6.8% engagement rate** puts you in the top 18% of your niche. The path to top 10% (9.2%) runs through two specific levers in your data.\n\nFirst, your comment response rate is **34%** vs the top-10% benchmark of **71%**. Posts where you replied within 30 minutes averaged **11.4% engagement** vs **5.9%** for posts with no early replies.\n\nSecond, your escape velocity HIIT reel hit 9.4% by combining: pattern interrupt hook + pre-peak audio + Thursday evening posting.\n\n**Next step:** Set a 30-minute timer after your next post. Reply to the first 15 comments — this alone should move engagement by 0.8–1.2pp within 3–4 posts.`;
  }
  if (q.includes('content') || q.includes('post') || q.includes('week')) {
    return `Based on your current momentum, here's your optimal week:\n\n**Thursday (priority):** Post a carousel version of your HIIT reel. The escape velocity event is still active — you have ~44 hours to ride the algorithm boost. Carousels from breakout reels average 2.3× the saves.\n\n**Shift Tuesday → Wednesday:** Wednesday posts average 6.9% engagement vs Tuesday's 4.1%. Same content, 68% more reach.\n\n**Dark Matter signal:** Use "Energy (Remix)" audio on your next Reel within 8 days — 2.1M uses, 840% growth, still early.\n\n**Next step:** Draft the HIIT carousel today. Start with the hook: "The 5 mistakes ruining your HIIT results."`;
  }
  return `Looking at your data, the highest-leverage opportunity right now is the active escape velocity event on your HIIT reel (3.2× baseline, 46h window) combined with the Thursday 7pm posting window that consistently drives your peak engagement.\n\nYour Gravity Score reached **74 (+6)**, ranking you **#14 of 840** similar creators. The gap to top 10% narrows to comment response rate (34% vs 71% benchmark) and save rate (4.2% vs 7.1% benchmark).\n\n**Next step:** Post a carousel follow-up to the HIIT reel today, and spend 20 minutes responding to the top comments on the original post before the algorithm window closes.`;
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  // --- Boundary validation --------------------------------------------------
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return errorResponse(400, 'INVALID_JSON', 'Request body must be valid JSON');
  }

  if (!body || typeof body !== 'object') {
    return errorResponse(400, 'INVALID_BODY', 'Request body must be a JSON object');
  }

  const { question, conversationHistory } = body as Partial<InsightAskRequest>;

  if (!question || typeof question !== 'string') {
    return errorResponse(422, 'VALIDATION_ERROR', 'question is required', 'question');
  }
  if (question.trim().length === 0) {
    return errorResponse(422, 'VALIDATION_ERROR', 'question must not be blank', 'question');
  }
  if (question.length > MAX_QUESTION_LENGTH) {
    return errorResponse(
      422, 'VALIDATION_ERROR',
      `question must be ${MAX_QUESTION_LENGTH} characters or fewer`, 'question',
      { maxLength: MAX_QUESTION_LENGTH, received: question.length },
    );
  }

  // Validate conversation history if provided
  let validatedHistory: ConversationMessage[] = [];
  if (conversationHistory !== undefined) {
    if (!Array.isArray(conversationHistory)) {
      return errorResponse(422, 'VALIDATION_ERROR', 'conversationHistory must be an array', 'conversationHistory');
    }
    // Cap at MAX_HISTORY_TURNS, take most recent, validate shape
    validatedHistory = conversationHistory
      .slice(-MAX_HISTORY_TURNS)
      .filter((m): m is ConversationMessage =>
        m !== null &&
        typeof m === 'object' &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.length > 0 &&
        m.content.length <= MAX_QUESTION_LENGTH * 4,
      );
  }

  // --- Call Claude API or return demo response ------------------------------
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    const answer = getDemoResponse(question);
    const responseBody: InsightAskResponse = {
      answer,
      model: 'orbit-ai-demo',
      note: 'Set ANTHROPIC_API_KEY to enable live AI responses',
    };
    return successResponse(responseBody);
  }

  try {
    const messages = [
      ...validatedHistory,
      { role: 'user' as const, content: question },
    ];

    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
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

    if (!anthropicRes.ok) {
      // Log internally, never surface raw API errors to client
      const errText = await anthropicRes.text();
      console.error('[insights/ask] Anthropic API error:', anthropicRes.status, errText);
      return errorResponse(502, 'AI_UNAVAILABLE', 'AI service temporarily unavailable — please try again');
    }

    const aiData = await anthropicRes.json() as {
      content?: Array<{ type: string; text: string }>;
      model?: string;
      usage?: { input_tokens: number; output_tokens: number };
    };

    const answer = aiData.content?.find(c => c.type === 'text')?.text ?? '';
    if (!answer) {
      return errorResponse(502, 'AI_EMPTY_RESPONSE', 'AI returned an empty response — please try again');
    }

    const responseBody: InsightAskResponse = {
      answer,
      model: aiData.model ?? 'claude-opus-4-6',
      usage: aiData.usage,
    };
    return successResponse(responseBody);

  } catch (err) {
    console.error('[insights/ask] Unexpected error:', err);
    return errorResponse(500, 'INTERNAL_ERROR', 'An unexpected error occurred');
  }
}
